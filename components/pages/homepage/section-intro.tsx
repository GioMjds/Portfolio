'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { RevealHeading } from '@/components/motion/reveal-heading';
import { cn } from '@/lib/utils';
import { fadeInUpVariants } from '@/utils/variants';

interface SectionIntroProps {
  /** Chapter number, shown as "02". */
  chapter: number;
  /** Short chapter label next to the number. */
  label: string;
  title: string;
  children?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

/** Shared homepage section header: chapter eyebrow, word-reveal title, lede. */
export function SectionIntro({
  chapter,
  label,
  title,
  children,
  align = 'center',
  className,
}: SectionIntroProps) {
  const centered = align === 'center';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeInUpVariants}
      className={cn('mb-12', centered && 'text-center', className)}
    >
      <p
        className={cn(
          'mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground',
          centered && 'justify-center',
        )}
      >
        <span className="text-brand tabular-nums">
          {String(chapter).padStart(2, '0')}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-border" />
        {label}
      </p>
      <RevealHeading
        text={title}
        className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl"
      />
      {children && (
        <div
          className={cn(
            'mt-4 max-w-2xl text-pretty text-muted-foreground sm:text-lg',
            centered && 'mx-auto',
          )}
        >
          {children}
        </div>
      )}
    </motion.div>
  );
}
