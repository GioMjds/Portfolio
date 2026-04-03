'use client';

import { useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, BotMessageSquare, Send, Sparkles, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import type {
  AssistantChatMessage,
  AssistantChatResponse,
  AssistantSafetyFlag,
  AssistantSection,
} from '@/lib/assistant/types';

interface ChatEntry extends AssistantChatMessage {
  id: string;
  usedSections?: AssistantSection[];
  safetyFlags?: AssistantSafetyFlag[];
}

const GREETING: ChatEntry = {
  id: 'assistant-greeting',
  role: 'assistant',
  content:
    "Hi! I'm Gio's portfolio assistant. Ask me about projects, skills, certifications, services, or background.",
  usedSections: ['homepage', 'identity'],
};

function getStarterPrompts(pathname: string): string[] {
  if (pathname.startsWith('/projects')) {
    return [
      'Which project best shows full-stack experience?',
      'What technologies were used across the projects?',
      'Can you summarize the Commitly project?',
    ];
  }

  if (pathname === '/about') {
    return [
      'Who is Gio Majadas?',
      'What are Gio’s strongest technical skills?',
      'What services does Gio offer?',
    ];
  }

  if (pathname === '/certificates') {
    return [
      'What certifications are showcased here?',
      'Which certificates relate to backend development?',
      'Any certification related to cybersecurity?',
    ];
  }

  return [
    'Who is Gio Majadas?',
    'What are the highlighted skills?',
    'Which projects are best to review first?',
  ];
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ChatPanel() {
  const pathname = usePathname() ?? '/';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatEntry[]>([GREETING]);
  const [draft, setDraft] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const starterPrompts = useMemo(() => getStarterPrompts(pathname), [pathname]);
  const canSend = draft.trim().length > 0 && !isLoading;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }

  async function sendMessage(nextMessage?: string) {
    const content = (nextMessage ?? draft).trim();
    if (!content || isLoading) {
      return;
    }

    const userEntry: ChatEntry = {
      id: makeId('user'),
      role: 'user',
      content,
    };

    const nextMessages = [...messages, userEntry];
    setMessages(nextMessages);
    setDraft('');
    setIsLoading(true);
    scrollToBottom();

    try {
      const history = nextMessages.map(({ role, content: messageContent }) => ({
        role,
        content: messageContent,
      }));

      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          route: pathname,
          history,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const maybeAssistant = data as Partial<AssistantChatResponse> | null;

        if (maybeAssistant && typeof maybeAssistant.answer === 'string') {
          const assistantEntry: ChatEntry = {
            id: makeId('assistant'),
            role: 'assistant',
            content: maybeAssistant.answer,
            usedSections: maybeAssistant.usedSections,
            safetyFlags: maybeAssistant.safetyFlags,
          };

          setMessages((current) => [...current, assistantEntry]);
          return;
        }

        const fallbackError =
          data && typeof data.error === 'string'
            ? data.error
            : 'An error occurred while fetching the assistant response.';

        throw new Error(fallbackError);
      }

      const payload = data as AssistantChatResponse | null;

      if (!payload || typeof payload.answer !== 'string') {
        throw new Error('Invalid response from assistant API.');
      }

      const assistantEntry: ChatEntry = {
        id: makeId('assistant'),
        role: 'assistant',
        content: payload.answer,
        usedSections: payload.usedSections,
        safetyFlags: payload.safetyFlags,
      };

      setMessages((current) => [...current, assistantEntry]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: makeId('assistant-error'),
          role: 'assistant',
          content:
            "I'm having trouble responding right now. Please try again in a moment.",
          safetyFlags: ['provider_fallback'],
          usedSections: ['identity'],
        },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  }

  function handleClear() {
    if (isLoading) {
      return;
    }
    setMessages([GREETING]);
    setDraft('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[min(calc(100vw-2rem),24rem)]">
          <Card className="gap-0 border-border/60 bg-card/95 shadow-xl backdrop-blur">
            <CardHeader className="border-b py-4">
              <CardTitle className="flex items-center justify-between gap-2 text-sm">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  Portfolio AI Assistant
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close assistant panel"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-3 pt-3">
              <ScrollArea className="h-72 pr-3">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex w-full',
                        message.role === 'user'
                          ? 'justify-end'
                          : 'justify-start',
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[90%] rounded-lg px-3 py-2 text-sm',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground',
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        {message.role === 'assistant' &&
                        message.usedSections?.length ? (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {message.usedSections.map((section) => (
                              <Badge
                                key={`${message.id}-${section}`}
                                variant="outline"
                                className="h-4 px-1.5 text-[10px] uppercase"
                              >
                                {section}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}

                  {isLoading ? (
                    <div className="flex w-full justify-start">
                      <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                        <Spinner className="size-3.5" />
                        Thinking...
                      </div>
                    </div>
                  ) : null}
                  <div ref={bottomRef} />
                </div>
              </ScrollArea>

              {messages.length <= 2 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {starterPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-auto whitespace-normal py-1.5 text-left text-xs"
                      onClick={() => sendMessage(prompt)}
                      disabled={isLoading}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              ) : null}
            </CardContent>

            <CardFooter className="flex-col items-stretch gap-2 border-t pb-3 pt-3">
              <label htmlFor="assistant-message" className="sr-only">
                Ask the portfolio assistant
              </label>
              <Textarea
                id="assistant-message"
                rows={2}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder="Ask about skills, projects, or certifications..."
                disabled={isLoading}
              />
              <div className="flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  disabled={isLoading}
                  aria-label="Clear conversation"
                  className="text-muted-foreground"
                >
                  <Trash2 className="size-4" />
                  Clear
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => sendMessage()}
                  disabled={!canSend}
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                  Send
                </Button>
              </div>
              <p className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Bot className="size-3.5" />
                Answers are limited to portfolio content.
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : null}

      <Button
        type="button"
        size="icon-lg"
        className="mt-3 size-14 rounded-full shadow-xl shadow-primary/25"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        <BotMessageSquare className="size-6" />
      </Button>
    </div>
  );
}
