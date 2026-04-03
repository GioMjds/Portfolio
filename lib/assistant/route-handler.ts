import 'server-only';

import { NextResponse } from 'next/server';
import { getPortfolioKnowledge } from '@/lib/assistant/knowledge';
import { buildAssistantPrompt } from '@/lib/assistant/prompt';
import { selectRelevantKnowledge } from '@/lib/assistant/relevance';
import {
  requestAssistantAnswer,
  MissingGeminiApiKeyError,
} from '@/lib/assistant/gemini';
import type {
  AssistantChatMessage,
  AssistantChatRequest,
  AssistantChatResponse,
  AssistantSafetyFlag,
} from '@/lib/assistant/types';

const RATE_LIMIT_WINDOW_MS = 8_000;
const MAX_HISTORY_ITEMS = 10;
const recentRequests = new Map<string, number>();

function getClientFingerprint(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  const userAgent = req.headers.get('user-agent') ?? '';

  const ip =
    forwardedFor?.split(',')[0]?.trim() ||
    realIp?.trim() ||
    '';

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
  if (!Array.isArray(history)) {
    return [];
  }

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

  if (!payload || typeof payload.message !== 'string' || !payload.message.trim()) {
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
    const answer = await requestAssistantAnswer(prompt);
    const offScope = /I can(?:not|'t) answer|outside the provided/i.test(answer);
    const response: AssistantChatResponse = {
      answer,
      usedSections: relevance.usedSections,
      safetyFlags: offScope
        ? Array.from(new Set([...safetyFlags, 'out_of_scope_refusal']))
        : safetyFlags,
    };

    console.info('[assistant-chat] response-success', {
      requestId,
      answerChars: answer.length,
      safetyFlags: response.safetyFlags,
    });

    return NextResponse.json(response, { status: 200 });
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

    console.error('[assistant-chat] provider-failure', {
      requestId,
      route,
      ...buildErrorDetails(error),
    });

    return NextResponse.json(
      {
        ...refusalResponse('provider_fallback'),
        answer:
          "I'm having trouble reaching the AI provider right now. Please try again in a moment.",
      } satisfies AssistantChatResponse,
      { status: 200 },
    );
  }
}
