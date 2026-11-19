'use client';

// Project wrapper (not a beUI file): an accessible heading around TextReveal.
import type { ElementType } from 'react';
import { TextReveal } from '@/components/motion/text-reveal';

interface RevealHeadingProps {
  text: string;
  as?: Extract<ElementType, 'h1' | 'h2' | 'h3'>;
  className?: string;
}

/**
 * Section heading whose words rise in when scrolled into view. Screen readers
 * get the plain text once; the split, animated copy is aria-hidden.
 */
export function RevealHeading({ text, as: Comp = 'h2', className }: RevealHeadingProps) {
  return (
    <Comp className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <TextReveal text={text} whileInView stagger={0.06} blur={8} />
      </span>
    </Comp>
  );
}
