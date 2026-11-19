'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, type UseFormSetError } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import {
  contactFormSchema,
  type ContactApiErrorResponse,
  type ContactApiResponse,
  type ContactFormValues,
} from '@/lib/contact/schema';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';

type SubmissionPhase = 'idle' | 'sending' | 'success' | 'error';

interface SubmissionState {
  phase: SubmissionPhase;
  message: string;
  requestId?: string;
}

type ContactFieldName = 'name' | 'email' | 'subject' | 'message';

interface ContactFieldConfig {
  name: ContactFieldName;
  label: string;
  placeholder: string;
  /** Shares a row with the next half-width field from `sm` up. */
  half?: boolean;
  description?: string;
  input?: {
    type?: string;
    inputMode?: 'email' | 'text';
    autoComplete?: string;
  };
  textarea?: {
    rows: number;
  };
}

const initialSubmissionState: SubmissionState = {
  phase: 'idle',
  message: '',
};

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  companyWebsite: '',
};

const CONTACT_FIELDS = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Your name',
    input: { autoComplete: 'name' },
    half: true,
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'you@example.com',
    input: { type: 'email', inputMode: 'email', autoComplete: 'email' },
    half: true,
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'Project inquiry',
  },
  {
    name: 'message',
    label: 'Message',
    placeholder: 'Tell me about your project, timeline, and goals...',
    description: 'At least 20 characters. Context helps me give a useful reply.',
    textarea: { rows: 7 },
  },
] satisfies readonly ContactFieldConfig[];

function applyServerFieldErrors(
  fieldErrors: NonNullable<ContactApiErrorResponse['fieldErrors']>,
  setError: UseFormSetError<ContactFormValues>,
) {
  const entries = Object.entries(fieldErrors) as Array<
    [keyof ContactFormValues, string[] | undefined]
  >;

  for (const [fieldName, messages] of entries) {
    const firstMessage = messages?.[0];
    if (firstMessage) {
      setError(fieldName, { type: 'server', message: firstMessage });
    }
  }
}

function getErrorMessage(
  response: ContactApiResponse,
  fallback: string,
): string {
  if (response.ok) return fallback;
  return response.message || fallback;
}

function SubmissionAlert({ state }: { state: SubmissionState }) {
  const title =
    state.phase === 'success'
      ? 'Message sent successfully'
      : state.phase === 'error'
        ? 'Send failed'
        : 'Sending';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Alert variant={state.phase === 'error' ? 'destructive' : 'default'}>
        {state.phase === 'success' && <CheckCircle2 className="size-4" />}
        {state.phase === 'error' && <AlertCircle className="size-4" />}
        {state.phase === 'sending' && <Spinner className="size-4" />}
        <AlertTitle>{title}</AlertTitle>
        <p className="text-sm text-muted-foreground">
          {state.message}
          {state.requestId ? ` Reference: ${state.requestId}.` : ''}
        </p>
      </Alert>
    </motion.div>
  );
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>(
    initialSubmissionState,
  );
  const [isPending, startTransition] = useTransition();
  const [optimisticSubmissionState, addOptimisticSubmissionState] =
    useOptimistic(
      submissionState,
      (currentState: SubmissionState, patch: Partial<SubmissionState>) => ({
        ...currentState,
        ...patch,
      }),
    );

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: standardSchemaResolver(contactFormSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const isSending = optimisticSubmissionState.phase === 'sending' || isPending;

  const submitContactForm = async (values: ContactFormValues) => {
    setSubmissionState({
      phase: 'sending',
      message: 'Sending your message...',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const body = (await response.json()) as ContactApiResponse;

      if (!response.ok || !body.ok) {
        if (!body.ok && body.fieldErrors) {
          applyServerFieldErrors(body.fieldErrors, setError);
        }
        setSubmissionState({
          phase: 'error',
          message: getErrorMessage(
            body,
            'We could not send your message right now. Please try again.',
          ),
        });
        return;
      }

      setSubmissionState({
        phase: 'success',
        message: body.message,
        requestId: body.requestId,
      });
    } catch (error) {
      console.error('[contact-form] submit-failed', {
        error: error instanceof Error ? error.message : String(error),
      });
      setSubmissionState({
        phase: 'error',
        message:
          'Network error while sending your message. Please check your connection and retry.',
      });
    }
  };

  const onSubmit = handleSubmit((values) => {
    clearErrors();
    startTransition(() => {
      addOptimisticSubmissionState({
        phase: 'sending',
        message: 'Sending your message...',
      });
      void submitContactForm(values);
    });
  });

  const resetSubmissionState = () => setSubmissionState(initialSubmissionState);

  const submitButtonLabel = isSending
    ? 'Sending...'
    : optimisticSubmissionState.phase === 'error'
      ? 'Retry send'
      : 'Send message';

  return (
    <section
      aria-labelledby="contact-form-title"
      className="overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-2xl shadow-foreground/5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
          <span className="size-2.5 rounded-full bg-border" />
        </span>
        <span className="mx-auto font-mono text-xs text-muted-foreground">
          new-message
        </span>
      </div>

      <div className="p-6 sm:p-8">
        <h2
          id="contact-form-title"
          className="font-heading text-2xl font-bold tracking-tight"
        >
          Send a message
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill it out and I&apos;ll get back to you as soon as I can.
        </p>

        <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
            {...register('companyWebsite')}
          />

          <FieldGroup className="grid gap-5 sm:grid-cols-2">
            {CONTACT_FIELDS.map((field) => {
              const id = `contact-${field.name}`;
              const error = errors[field.name];
              const invalid = Boolean(error);

              return (
                <Field
                  key={field.name}
                  data-invalid={invalid}
                  className={cn(!('half' in field && field.half) && 'sm:col-span-2')}
                >
                  <FieldLabel htmlFor={id}>{field.label}</FieldLabel>
                  <FieldContent>
                    {field.textarea ? (
                      <Textarea
                        id={id}
                        rows={field.textarea.rows}
                        placeholder={field.placeholder}
                        aria-invalid={invalid}
                        disabled={isSending}
                        className="bg-background/60"
                        {...register(field.name)}
                      />
                    ) : (
                      <Input
                        {...field.input}
                        id={id}
                        placeholder={field.placeholder}
                        aria-invalid={invalid}
                        disabled={isSending}
                        className="h-11 bg-background/60"
                        {...register(field.name)}
                      />
                    )}
                    {'description' in field ? (
                      <FieldDescription>{field.description}</FieldDescription>
                    ) : null}
                    <FieldError errors={[error]} />
                  </FieldContent>
                </Field>
              );
            })}
          </FieldGroup>

          <AnimatePresence mode="wait">
            {optimisticSubmissionState.phase !== 'idle' ? (
              <SubmissionAlert key="alert" state={optimisticSubmissionState} />
            ) : null}
          </AnimatePresence>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="submit"
              size="lg"
              disabled={isSending}
              className="w-full gap-2 sm:w-auto"
            >
              {isSending ? <Spinner /> : <Send className="size-4" />}
              {submitButtonLabel}
            </Button>

            {optimisticSubmissionState.phase === 'success' ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={resetSubmissionState}
                className="w-full sm:w-auto"
              >
                Send another
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
