import 'server-only';

import type {
  AssistantChatMessage,
  KnowledgeSlice,
} from '@/lib/assistant/types';

interface PromptAssemblyInput {
  message: string;
  route?: string;
  history: AssistantChatMessage[];
  slices: KnowledgeSlice[];
}

function formatContext(slices: KnowledgeSlice[]): string {
  return slices
    .map(
      (slice) =>
        `[${slice.section.toUpperCase()}] ${slice.title}\n${slice.content}`,
    )
    .join('\n\n');
}

function formatHistory(history: AssistantChatMessage[]): string {
  if (history.length === 0) {
    return 'No prior conversation history.';
  }

  return history
    .slice(-6)
    .map((entry) => `${entry.role.toUpperCase()}: ${entry.content}`)
    .join('\n');
}

export function buildAssistantPrompt(input: PromptAssemblyInput): string {
  return [
    'You are Gio Majadas Portfolio Assistant.',
    'You must answer only using the provided portfolio context.',
    'Never invent any experience, metric, certification, employer, or claim not in context.',
    'If the question is outside scope or unsupported by context, refuse politely and suggest 1-2 in-scope questions.',
    'Keep answers concise, trustworthy, and useful for portfolio visitors.',
    '',
    `Current route: ${input.route ?? 'unknown'}`,
    '',
    'Recent conversation:',
    formatHistory(input.history),
    '',
    'Portfolio context:',
    formatContext(input.slices),
    '',
    `User question: ${input.message}`,
    '',
    'Return plain text only.',
  ].join('\n');
}
