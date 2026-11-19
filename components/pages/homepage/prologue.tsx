'use client';

import { useRef } from 'react';
import { positioningStatement } from '@/constants/about';
import { gsap, MEDIA, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';

/**
 * Chapter 01: a short manifesto whose words light up as the reader scrolls
 * through it. GSAP only splits the words and tracks scroll; the colour change
 * is a CSS transition on [data-lit] (globals.css). Reduced motion keeps the
 * plain, fully-lit paragraph.
 */
export function Prologue() {
  const scope = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOK, () => {
        const text = textRef.current;
        if (!text) return;

        const split = SplitText.create(text, { type: 'words', aria: 'auto' });
        const words = split.words as HTMLElement[];
        words.forEach((word) => word.setAttribute('data-lit-word', ''));

        let lit = -1;
        const paint = (progress: number) => {
          const next = Math.round(progress * words.length);
          if (next === lit) return;
          lit = next;
          words.forEach((word, i) => word.toggleAttribute('data-lit', i < lit));
        };

        const trigger = ScrollTrigger.create({
          trigger: text,
          start: 'top 85%',
          end: 'bottom 50%',
          onUpdate: (self) => paint(self.progress),
          onRefresh: (self) => paint(self.progress),
        });

        return () => {
          trigger.kill();
          split.revert();
        };
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="prologue"
      aria-labelledby="prologue-label"
      className="scroll-mt-24 px-4 py-20 sm:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="prologue-label"
          className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="text-brand tabular-nums">01</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          Prologue
        </p>
        <p
          ref={textRef}
          className="font-heading text-2xl font-semibold leading-snug tracking-tight text-pretty text-foreground sm:text-4xl md:text-[2.75rem]"
        >
          &quot;{positioningStatement}&quot;
        </p>
      </div>
    </section>
  );
}
