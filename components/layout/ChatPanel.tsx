'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
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
import {
  scaleInVariants,
  fadeInUpVariants,
  staggerContainerVariants,
  backdropVariants,
} from '@/utils/variants';
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

/**
 * This function provides context-aware starter prompts that base in the current page route.
 *
 * The prompts are designed to encourage users to ask about relevant content for each section of the portfolio, such as projects, skills, or certifications. By tailoring the prompts to the page context, it helps guide users in engaging with the assistant and discovering key information about Gio's experience and offerings.
 *
 * Page routes and example prompts:
 * - `/about`
 * - `/projects`
 * - `/certificates`
 */
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
  const panelId = 'portfolio-assistant-panel';
  const statusId = 'portfolio-assistant-status';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatEntry[]>([GREETING]);
  const [draft, setDraft] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    panelRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', onEscape);
    return () => {
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <div className="fixed inset-0 z-50 md:inset-auto md:bottom-4 md:right-4">
            {/* Backdrop overlay for mobile */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm md:hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id={panelId}
              ref={panelRef}
              className="relative h-full w-full md:h-auto md:w-[min(calc(100vw-2rem),24rem)]"
              role="dialog"
              aria-modal="false"
              aria-label="Portfolio AI Assistant"
              tabIndex={-1}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={scaleInVariants}
            >
            <Card className="flex h-full flex-col gap-0 border-border/60 bg-card/95 shadow-xl backdrop-blur md:h-auto">
              <CardHeader className="shrink-0 border-b py-4">
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

              <CardContent className="flex min-h-0 flex-1 flex-col pb-3 pt-3">
                <ScrollArea className="flex-1 pr-3 md:h-52 md:flex-none">
                  <div className="space-y-3">
                    <p id={statusId} className="sr-only" aria-live="polite">
                      {isLoading
                        ? 'Assistant is generating a response.'
                        : 'Assistant is ready.'}
                    </p>
                    <AnimatePresence initial={false} mode="popLayout">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          className={cn(
                            'flex w-full',
                            message.role === 'user'
                              ? 'justify-end'
                              : 'justify-start',
                          )}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <div
                            className={cn(
                              'max-w-[90%] rounded-lg px-3 py-2 text-sm',
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground',
                            )}
                          >
                            <p className="whitespace-pre-wrap">
                              {message.content}
                            </p>
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
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence>
                      {isLoading ? (
                        <motion.div
                          className="flex w-full justify-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
                            <Spinner className="size-3.5" />
                            Thinking...
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                  </div>
                </ScrollArea>

                <AnimatePresence>
                  {messages.length <= 2 ? (
                    <motion.div
                      className="mt-3 flex flex-wrap gap-2"
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, height: 0 }}
                      variants={staggerContainerVariants}
                    >
                      {starterPrompts.map((prompt) => (
                        <motion.div key={prompt} variants={fadeInUpVariants}>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-auto whitespace-normal py-1.5 text-left text-xs"
                            onClick={() => sendMessage(prompt)}
                            disabled={isLoading}
                          >
                            {prompt}
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </CardContent>

              <CardFooter className="shrink-0 flex-col items-stretch gap-2 border-t pb-3 pt-3">
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
                  className='resize-none'
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
          </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.div
              key="chat-button"
              initial={hasAnimated ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                hasAnimated
                  ? { duration: 0.15, ease: 'easeOut' }
                  : { delay: 0.5, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                size="icon-lg"
                className="size-14 rounded-full shadow-xl shadow-primary/25"
                onClick={() => setIsOpen(true)}
                aria-label="Open assistant"
                aria-expanded={false}
                aria-controls={panelId}
              >
                <BotMessageSquare className="size-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
