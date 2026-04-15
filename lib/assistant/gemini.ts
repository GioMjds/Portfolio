import 'server-only';

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
const DEFAULT_GENERATION_CONFIG = {
  temperature: 0.2,
  maxOutputTokens: 512,
  responseMimeType: 'text/plain',
};

export class MissingGeminiApiKeyError extends Error {
  constructor() {
    super('Missing GEMINI_API_KEY environment variable.');
    this.name = 'MissingGeminiApiKeyError';
  }
}

function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new MissingGeminiApiKeyError();

  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: GEMINI_MODEL });
}

function getDeltaFromChunk(
  chunkText: string,
  previousChunkText: string,
  assembledText: string,
): { delta: string; nextChunkText: string; nextAssembledText: string } {
  if (chunkText.startsWith(previousChunkText)) {
    const delta = chunkText.slice(previousChunkText.length);
    return {
      delta,
      nextChunkText: chunkText,
      nextAssembledText: assembledText + delta,
    };
  }

  // Fallback for providers that might emit non-cumulative chunks.
  return {
    delta: chunkText,
    nextChunkText: assembledText + chunkText,
    nextAssembledText: assembledText + chunkText,
  };
}

export async function requestAssistantAnswer(prompt: string): Promise<string> {
  const model = getGeminiModel();
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: DEFAULT_GENERATION_CONFIG,
  });

  const answer = result.response.text().trim();
  if (!answer) throw new Error('Gemini returned an empty response.');

  return answer;
}

export async function* streamAssistantAnswer(
  prompt: string,
): AsyncGenerator<string> {
  const model = getGeminiModel();
  const streamResult = await model.generateContentStream({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: DEFAULT_GENERATION_CONFIG,
  });

  let previousChunkText = '';
  let assembledText = '';
  let emittedAnyChunk = false;

  for await (const chunk of streamResult.stream) {
    const chunkText = chunk.text();
    if (!chunkText) continue;

    const { delta, nextChunkText, nextAssembledText } = getDeltaFromChunk(
      chunkText,
      previousChunkText,
      assembledText,
    );
    previousChunkText = nextChunkText;
    assembledText = nextAssembledText;

    if (!delta) continue;

    emittedAnyChunk = true;
    yield delta;
  }

  if (!emittedAnyChunk || !assembledText.trim()) {
    throw new Error('Gemini returned an empty streaming response.');
  }
}
