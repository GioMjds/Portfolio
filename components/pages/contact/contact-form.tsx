'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm, type UseFormSetError } from 'react-hook-form';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import {
  contactFormSchema,
  type ContactApiErrorResponse,
  type ContactApiResponse,
  type ContactFormValues,
} from '@/lib/contact/schema';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

function applyServerFieldErrors(
  fieldErrors: NonNullable<ContactApiErrorResponse['fieldErrors']>,
  setError: UseFormSetError<ContactFormValues>,
) {
  const entries = Object.entries(fieldErrors) as Array<
    [keyof ContactFormValues, string[] | undefined]
  >;

  for (const [fieldName, messages] of entries) {
    const firstMessage = messages?.[0];
    if (!firstMessage) continue;
    setError(fieldName, { type: 'server', message: firstMessage });
  }
}

function getErrorMessage(
  response: ContactApiResponse,
  fallback: string,
): string {
  if (response.ok) return fallback;
  return response.message || fallback;
}

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState(
    initialSubmissionState,
  );
  const [isPending, startTransition] = useTransition();
  const [optimisticSubmissionState, addOptimisticSubmissionState] =
    useOptimistic(
      submissionState,
      (
        currentState: SubmissionState,
        patch: Partial<SubmissionState>,
      ): SubmissionState => ({
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
        headers: {
          'Content-Type': 'application/json',
        },
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

  const resetSubmissionState = () => {
    setSubmissionState(initialSubmissionState);
  };

  return (
    <Card
      className="border-border/70 bg-card/70 backdrop-blur"
      aria-labelledby="contact-form-title"
    >
      <CardHeader className="space-y-2">
        <CardTitle id="contact-form-title" className="font-heading text-2xl">
          Send a message
        </CardTitle>
        <CardDescription>
          Fill out the form and I&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={onSubmit} noValidate>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
            {...register('companyWebsite')}
          />

          <FieldGroup className="gap-5">
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="contact-name">Name</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  aria-invalid={Boolean(errors.name)}
                  disabled={isSending}
                  {...register('name')}
                />
                <FieldError errors={[errors.name]} />
              </FieldContent>
            </Field>

            <Field data-invalid={Boolean(errors.email)}>
              <FieldLabel htmlFor="contact-email">Email</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={Boolean(errors.email)}
                  disabled={isSending}
                  {...register('email')}
                />
                <FieldError errors={[errors.email]} />
              </FieldContent>
            </Field>

            <Field data-invalid={Boolean(errors.subject)}>
              <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
              <FieldContent>
                <Input
                  id="contact-subject"
                  placeholder="Project inquiry"
                  aria-invalid={Boolean(errors.subject)}
                  disabled={isSending}
                  {...register('subject')}
                />
                <FieldError errors={[errors.subject]} />
              </FieldContent>
            </Field>

            <Field data-invalid={Boolean(errors.message)}>
              <FieldLabel htmlFor="contact-message">Message</FieldLabel>
              <FieldContent>
                <Textarea
                  id="contact-message"
                  rows={7}
                  placeholder="Tell me about your project, timeline, and goals..."
                  aria-invalid={Boolean(errors.message)}
                  disabled={isSending}
                  {...register('message')}
                />
                <FieldDescription>
                  Please include enough context so I can provide a meaningful
                  reply.
                </FieldDescription>
                <FieldError errors={[errors.message]} />
              </FieldContent>
            </Field>
          </FieldGroup>

          {optimisticSubmissionState.phase !== 'idle' ? (
            <Alert
              variant={
                optimisticSubmissionState.phase === 'error'
                  ? 'destructive'
                  : 'default'
              }
            >
              {optimisticSubmissionState.phase === 'success' ? (
                <CheckCircle2 className="size-4" />
              ) : null}
              {optimisticSubmissionState.phase === 'error' ? (
                <AlertCircle className="size-4" />
              ) : null}
              {optimisticSubmissionState.phase === 'sending' ? (
                <Spinner className="size-4" />
              ) : null}
              <AlertTitle>
                {optimisticSubmissionState.phase === 'success'
                  ? 'Message sent successfully'
                  : optimisticSubmissionState.phase === 'error'
                    ? 'Send failed'
                    : 'Sending'}
              </AlertTitle>
              <p className="text-sm text-muted-foreground">
                {optimisticSubmissionState.message}
                {optimisticSubmissionState.requestId
                  ? ` Reference: ${optimisticSubmissionState.requestId}.`
                  : ''}
              </p>
            </Alert>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="submit"
              disabled={isSending}
              className="w-full gap-2 sm:w-auto"
            >
              {isSending ? <Spinner /> : <Send className="size-4" />}
              {isSending
                ? 'Sending...'
                : optimisticSubmissionState.phase === 'error'
                  ? 'Retry send'
                  : 'Send message'}
            </Button>

            {optimisticSubmissionState.phase === 'success' ? (
              <Button
                type="button"
                variant="outline"
                onClick={resetSubmissionState}
                className="w-full sm:w-auto"
              >
                Send another
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
