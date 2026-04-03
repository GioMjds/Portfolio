import 'server-only';

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';

export class MissingGeminiApiKeyError extends Error {
  constructor() {
    super('Missing GEMINI_API_KEY environment variable.');
    this.name = 'MissingGeminiApiKeyError';
  }
}

export async function requestAssistantAnswer(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new MissingGeminiApiKeyError();
  }

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({ model: GEMINI_MODEL });
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 512,
      responseMimeType: 'text/plain',
    },
  });

  const answer = result.response.text().trim();
  if (!answer) {
    throw new Error('Gemini returned an empty response.');
  }

  return answer;
}

