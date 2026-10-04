/**
 * Lightweight contract between any page component and the global ChatPanel.
 *
 * A component dispatches `ASSISTANT_ASK_EVENT` on `window`; ChatPanel (mounted
 * once in app/layout.tsx) opens itself and sends the message. The listener sets
 * `detail.accepted = true` synchronously when it takes the message, so the
 * dispatcher can tell whether the question was dropped (e.g. a reply is still
 * streaming) and keep the user's text instead of losing it.
 */
export const ASSISTANT_ASK_EVENT = 'assistant:ask';

export interface AssistantAskDetail {
  message: string;
  accepted?: boolean;
}

/** Returns true when the assistant accepted the message. */
export function askAssistant(message: string): boolean {
  const detail: AssistantAskDetail = { message, accepted: false };
  window.dispatchEvent(
    new CustomEvent<AssistantAskDetail>(ASSISTANT_ASK_EVENT, { detail }),
  );
  return detail.accepted === true;
}
