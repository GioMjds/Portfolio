import 'server-only';

import { NextResponse } from 'next/server';
import { getPortfolioKnowledge } from '@/lib/assistant/knowledge';
import { buildAssistantPrompt } from '@/lib/assistant/prompt';
import { selectRelevantKnowledge } from '@/lib/assistant/relevance';
import {
  requestAssistantAnswer,
  streamAssistantAnswer,
  MissingGeminiApiKeyError,
} from '@/lib/assistant/gemini';
import type {
  AssistantChatMessage,
  AssistantChatRequest,
  AssistantChatResponse,
  AssistantSection,
  AssistantSafetyFlag,
  AssistantStreamEvent,
} from '@/lib/assistant/types';

const RATE_LIMIT_WINDOW_MS = 8_000;
const MAX_HISTORY_ITEMS = 10;
const recentRequests = new Map<string, number>();
const STREAM_HEADERS = {
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
} as const;
const PROVIDER_FALLBACK_MESSAGE =
  "I'm having trouble reaching the AI provider right now. Please try again in a moment.";
const SSE_EVENT_ENCODER = new TextEncoder();

function getClientFingerprint(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const userAgent = req.headers.get('user-agent') ?? '';

  const ip = forwardedFor?.split(',')[0]?.trim() || realIp?.trim() || '';

  // If we have no stable identifier at all, return empty string to signal
  // that rate limiting should be skipped for this request.
  if (!ip && !userAgent) return '';

  return userAgent ? `${ip}|${userAgent}` : ip;
}

function isRateLimited(fingerprint: string, now: number): boolean {
  if (!fingerprint) return false;

  const lastRequestAt = recentRequests.get(fingerprint);
  if (lastRequestAt && now - lastRequestAt < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  recentRequests.set(fingerprint, now);
  return false;
}

function sanitizeHistory(history: unknown): AssistantChatMessage[] {
  if (!Array.isArray(history)) return [];

  return history
    .filter(
      (entry): entry is { role: 'user' | 'assistant'; content: string } =>
        !!entry &&
        typeof entry === 'object' &&
        (entry as { role?: string }).role !== undefined &&
        (entry as { content?: string }).content !== undefined &&
        ((entry as { role: string }).role === 'user' ||
          (entry as { role: string }).role === 'assistant') &&
        typeof (entry as { content: string }).content === 'string',
    )
    .slice(-MAX_HISTORY_ITEMS);
}

function refusalResponse(flag: AssistantSafetyFlag): AssistantChatResponse {
  return {
    answer:
      "I can only answer questions grounded in Gio's portfolio content. You can ask about skills, projects, certifications, services, or background.",
    usedSections: ['identity'],
    safetyFlags: [flag],
  };
}

function buildErrorDetails(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}),
    };
  }

  return { value: String(error) };
}

function withOffScopeFlag(
  answer: string,
  safetyFlags: AssistantSafetyFlag[],
): AssistantSafetyFlag[] {
  const offScope = /I can(?:not|'t) answer|outside the provided/i.test(answer);
  if (!offScope) {
    return safetyFlags;
  }

  return Array.from(
    new Set([...safetyFlags, 'out_of_scope_refusal']),
  ) satisfies AssistantSafetyFlag[];
}

function encodeSseEvent(event: AssistantStreamEvent): Uint8Array {
  return SSE_EVENT_ENCODER.encode(
    `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`,
  );
}

interface StreamingResponseInput {
  prompt: string;
  requestId: string;
  route?: string;
  usedSections: AssistantSection[];
  safetyFlags: AssistantSafetyFlag[];
  debugStream: boolean;
}

async function createStreamingAssistantResponse(
  input: StreamingResponseInput,
): Promise<Response> {
  const iterator = streamAssistantAnswer(input.prompt);
  let firstChunk: IteratorResult<string>;

  try {
    firstChunk = await iterator.next();
  } catch (error) {
    await iterator.return?.(undefined);
    throw error;
  }

  if (firstChunk.done || !firstChunk.value) {
    await iterator.return?.(undefined);
    throw new Error('Gemini returned an empty streaming response.');
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = '';
      let chunkCount = 0;
      const pushChunk = (delta: string) => {
        if (!delta) {
          return;
        }

        chunkCount += 1;
        answer += delta;
        controller.enqueue(encodeSseEvent({ type: 'chunk', delta }));
        if (input.debugStream) {
          console.info('[assistant-chat] stream-chunk', {
            requestId: input.requestId,
            chunkCount,
            chunkChars: delta.length,
            accumulatedChars: answer.length,
          });
        }
      };

      try {
        pushChunk(firstChunk.value);

        for await (const delta of iterator) {
          pushChunk(delta);
        }

        const finalSafetyFlags = withOffScopeFlag(answer, input.safetyFlags);
        controller.enqueue(
          encodeSseEvent({
            type: 'meta',
            usedSections: input.usedSections,
            safetyFlags: finalSafetyFlags,
          }),
        );
        controller.enqueue(encodeSseEvent({ type: 'done' }));

        console.info('[assistant-chat] response-success-stream', {
          requestId: input.requestId,
          route: input.route,
          chunkCount,
          answerChars: answer.length,
          safetyFlags: finalSafetyFlags,
        });
      } catch (error) {
        console.error('[assistant-chat] provider-failure-stream', {
          requestId: input.requestId,
          route: input.route,
          chunkCount,
          answerChars: answer.length,
          ...buildErrorDetails(error),
        });

        const streamSafetyFlags = Array.from(
          new Set([...input.safetyFlags, 'provider_fallback']),
        ) satisfies AssistantSafetyFlag[];
        controller.enqueue(
          encodeSseEvent({ type: 'error', message: PROVIDER_FALLBACK_MESSAGE }),
        );
        controller.enqueue(
          encodeSseEvent({
            type: 'meta',
            usedSections: input.usedSections,
            safetyFlags: streamSafetyFlags,
          }),
        );
        controller.enqueue(encodeSseEvent({ type: 'done' }));
      } finally {
        controller.close();
        await iterator.return?.(undefined);
      }
    },
    async cancel() {
      await iterator.return?.(undefined);
    },
  });

  return new Response(stream, {
    status: 200,
    headers: STREAM_HEADERS,
  });
}

interface JsonFallbackInput {
  prompt: string;
  requestId: string;
  route?: string;
  usedSections: AssistantSection[];
  safetyFlags: AssistantSafetyFlag[];
}

async function createJsonFallbackResponse(input: JsonFallbackInput) {
  try {
    const answer = await requestAssistantAnswer(input.prompt);
    const response: AssistantChatResponse = {
      answer,
      usedSections: input.usedSections,
      safetyFlags: withOffScopeFlag(answer, input.safetyFlags),
    };

    console.info('[assistant-chat] response-success-json-fallback', {
      requestId: input.requestId,
      route: input.route,
      answerChars: answer.length,
      safetyFlags: response.safetyFlags,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof MissingGeminiApiKeyError) {
      console.error('[assistant-chat] missing-api-key', {
        requestId: input.requestId,
        route: input.route,
        nodeEnv: process.env.NODE_ENV,
      });

      return NextResponse.json(
        {
          ...refusalResponse('missing_api_key'),
          answer:
            'The assistant is not configured yet. Set `GEMINI_API_KEY` in the server environment to enable chat.',
        } satisfies AssistantChatResponse,
        { status: process.env.NODE_ENV === 'development' ? 500 : 200 },
      );
    }

    console.error('[assistant-chat] provider-failure', {
      requestId: input.requestId,
      route: input.route,
      ...buildErrorDetails(error),
    });

    return NextResponse.json(
      {
        ...refusalResponse('provider_fallback'),
        answer: PROVIDER_FALLBACK_MESSAGE,
      } satisfies AssistantChatResponse,
      { status: 200 },
    );
  }
}

export async function handleAssistantChatPost(req: Request) {
  const requestId = crypto.randomUUID();
  let payload: AssistantChatRequest;

  try {
    payload = (await req.json()) as AssistantChatRequest;
  } catch (error) {
    console.error('[assistant-chat] invalid-json', {
      requestId,
      ...buildErrorDetails(error),
    });
    return NextResponse.json(
      { error: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  if (
    !payload ||
    typeof payload.message !== 'string' ||
    !payload.message.trim()
  ) {
    console.warn('[assistant-chat] invalid-message', {
      requestId,
      hasPayload: Boolean(payload),
      messageType: typeof payload?.message,
    });
    return NextResponse.json(
      { error: 'A non-empty `message` field is required.' },
      { status: 400 },
    );
  }

  const now = Date.now();
  const fingerprint = getClientFingerprint(req);
  if (isRateLimited(fingerprint, now)) {
    console.warn('[assistant-chat] rate-limited', {
      requestId,
      fingerprint,
      route: payload.route,
    });
    return NextResponse.json(
      {
        ...refusalResponse('rate_limited'),
        answer:
          'Please wait a few seconds before sending another message so I can respond reliably.',
      } satisfies AssistantChatResponse,
      { status: 429 },
    );
  }

  const question = payload.message.trim();
  const route = typeof payload.route === 'string' ? payload.route : undefined;
  const history = sanitizeHistory(payload.history);
  const debugStream =
    process.env.NODE_ENV === 'development' &&
    (req.headers.get('x-assistant-debug-stream') === '1' ||
      process.env.ASSISTANT_STREAM_DEBUG === '1');

  console.info('[assistant-chat] request-received', {
    requestId,
    route,
    fingerprint,
    messageChars: question.length,
    historyCount: history.length,
  });

  const knowledge = await getPortfolioKnowledge();
  const relevance = selectRelevantKnowledge(knowledge.slices, question, route);
  const safetyFlags: AssistantSafetyFlag[] = [];
  if (relevance.confidence === 'low') {
    safetyFlags.push('low_context_confidence');
  }

  console.info('[assistant-chat] context-selected', {
    requestId,
    confidence: relevance.confidence,
    usedSections: relevance.usedSections,
    sliceCount: relevance.slices.length,
    totalKeywordMatches: relevance.totalKeywordMatches,
  });

  const prompt = buildAssistantPrompt({
    message: question,
    route,
    history,
    slices: relevance.slices,
  });

  try {
    return await createStreamingAssistantResponse({
      prompt,
      requestId,
      route,
      usedSections: relevance.usedSections,
      safetyFlags,
      debugStream,
    });
  } catch (error) {
    if (error instanceof MissingGeminiApiKeyError) {
      console.error('[assistant-chat] missing-api-key', {
        requestId,
        route,
        nodeEnv: process.env.NODE_ENV,
      });

      return NextResponse.json(
        {
          ...refusalResponse('missing_api_key'),
          answer:
            'The assistant is not configured yet. Set `GEMINI_API_KEY` in the server environment to enable chat.',
        } satisfies AssistantChatResponse,
        { status: process.env.NODE_ENV === 'development' ? 500 : 200 },
      );
    }

    console.warn('[assistant-chat] stream-init-fallback', {
      requestId,
      route,
      ...buildErrorDetails(error),
    });

    return createJsonFallbackResponse({
      prompt,
      requestId,
      route,
      usedSections: relevance.usedSections,
      safetyFlags,
    });
  }
}
