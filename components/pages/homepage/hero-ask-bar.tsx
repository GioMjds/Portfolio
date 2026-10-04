'use client';

import { useId } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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

type AskFormValues = {
  question: string;
};

export function HeroAskBar() {
  const inputId = useId();
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AskFormValues>({
    defaultValues: { question: '' },
    mode: 'onChange',
  });

  const question = useWatch({ control, name: 'question' }) ?? '';
  const canSubmit = question.trim().length > 0;

  function ask(message: string, clearOnAccept: boolean) {
    const text = message.trim();
    if (!text) return;

    const accepted = askAssistant(text);
    if (accepted && clearOnAccept) reset({ question: '' });
  }

  const onSubmit = handleSubmit(({ question }) => {
    ask(question, true);
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUpVariants}
      transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
      className="mx-auto mt-10 w-full max-w-xl"
    >
      <form onSubmit={onSubmit} noValidate>
        <Label
          htmlFor={inputId}
          className="mb-2 justify-center text-sm text-muted-foreground"
        >
          Ask my portfolio anything
        </Label>

        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-card/60 p-1.5 pl-4 shadow-lg shadow-primary/5 backdrop-blur transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
          <Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
          <Input
            {...register('question', {
              required: true,
              maxLength: MAX_QUESTION_LENGTH,
              validate: (value) => value.trim().length > 0,
            })}
            id={inputId}
            autoComplete="off"
            placeholder="Which project shows full-stack work?"
            aria-invalid={errors.question ? true : undefined}
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
