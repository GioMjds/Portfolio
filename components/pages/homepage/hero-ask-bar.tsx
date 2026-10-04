'use client';

import { useId, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { askAssistant } from '@/lib/assistant/ask-event';
import { getStarterPrompts } from '@/lib/assistant/starter-prompts';
import { fadeInUpVariants } from '@/utils/variants';

const CHIPS = getStarterPrompts('/');
const MAX_QUESTION_LENGTH = 300;

export function HeroAskBar() {
  const inputId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [draft, setDraft] = useState('');
  const canSubmit = draft.trim().length > 0;

  function ask(message: string, clearOnAccept: boolean) {
    const text = message.trim();
    if (!text) return;

    const accepted = askAssistant(text);
    if (accepted && clearOnAccept) setDraft('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(draft, true);
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? false : 'hidden'}
      animate="visible"
      variants={fadeInUpVariants}
      transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
      className="mx-auto mt-10 w-full max-w-xl"
    >
      <form onSubmit={handleSubmit}>
        <Label
          htmlFor={inputId}
          className="mb-2 justify-center text-sm text-muted-foreground"
        >
          Ask my portfolio anything
        </Label>

        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 p-1.5 pl-4 shadow-lg shadow-primary/5 backdrop-blur transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
          <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
          <Input
            id={inputId}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={MAX_QUESTION_LENGTH}
            autoComplete="off"
            placeholder="Which project shows full-stack work?"
            className="h-10 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
          <Button
            type="submit"
            size="icon-lg"
            className="shrink-0 rounded-full"
            disabled={!canSubmit}
            aria-label="Ask the portfolio assistant"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </form>

      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {CHIPS.map((chip, index) => (
          <li key={chip} className={cn(index >= 2 && 'hidden sm:block')}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-auto min-h-11 whitespace-normal rounded-full px-4 py-2 text-xs"
              onClick={() => ask(chip, false)}
            >
              {chip}
            </Button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}