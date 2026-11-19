'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/pages/contact/contact-form';
import { useIntroTimeline } from '@/lib/hooks/use-intro-timeline';
import { socialMediaLinks } from '@/utils';

const EMAIL = 'giomjds@gmail.com';

const STEPS = [
  {
    title: 'You write',
    body: 'A few lines about the problem, the timeline, and what "done" looks like is plenty.',
  },
  {
    title: 'I reply',
    body: 'Usually within 1–2 business days, with questions or practical next steps.',
  },
  {
    title: 'We scope it',
    body: 'Together we figure out the smallest version worth shipping first.',
  },
];

/** Only profiles that are actually configured. */
const SOCIALS = socialMediaLinks.filter((link) => link.href !== '#');

export function ContactPageShell() {
  const scope = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useIntroTimeline(scope, headingRef);

  return (
    <div
      ref={scope}
      className="mx-auto grid max-w-6xl items-start gap-12 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8"
    >
      {/* Intro: sticks beside the form on desktop */}
      <div className="lg:sticky lg:top-28">
        <div data-intro-item data-intro="badge">
          <Badge
            variant="outline"
            className="gap-2 border-brand/30 bg-background/60 px-4 py-2 text-sm backdrop-blur-sm"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Open to freelance and full-time work
          </Badge>
        </div>

        <h1
          ref={headingRef}
          data-intro-item
          className="mt-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="block">Got something</span>
          <span className="mt-1 block pb-2 text-muted-foreground">
            worth building?
          </span>
        </h1>

        <p
          data-intro-item
          data-intro="rest"
          className="mt-5 max-w-xl text-lg text-pretty text-muted-foreground"
        >
          Freelance project, full-time role, or just an idea you want a second
          pair of eyes on. Tell me about it and I&apos;ll reply with practical
          next steps.
        </p>

        <ol data-intro-item data-intro="rest" className="mt-10 space-y-5">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card font-mono text-xs text-brand tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-heading font-semibold">{step.title}</p>
                <p className="mt-0.5 text-sm text-pretty text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div
          data-intro-item
          data-intro="rest"
          className="mt-10 rounded-2xl border border-border/70 bg-card/70 p-5 backdrop-blur-sm"
        >
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Rather skip the form?
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Link
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-foreground underline-offset-4 hover:text-brand hover:underline"
            >
              <Mail className="size-4 text-brand" aria-hidden="true" />
              {EMAIL}
            </Link>
            <CopyEmailButton />
          </div>

          {SOCIALS.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-border/60 pt-4">
              {SOCIALS.map((link) => (
                <li key={link.label}>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="min-h-11 gap-2 [&_svg]:size-4"
                  >
                    {/* Plain <a>: env-configured external URLs aren't typed routes. */}
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Form */}
      <div data-intro-item data-intro="rest">
        <ContactForm />
      </div>
    </div>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied): the mailto link
      // beside this button still works.
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={copy}
      className="min-h-11 gap-1.5"
    >
      {copied ? (
        <Check className="size-4 text-brand" aria-hidden="true" />
      ) : (
        <Copy className="size-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      <span className="sr-only"> email address</span>
    </Button>
  );
}
