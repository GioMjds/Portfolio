'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '@/lib/ease';

/**
 * Section break between homepage chapters: a hairline that draws outward
 * from a centre node as it scrolls into view. Decorative.
 */
export function ChapterDivider() {
  const reduce = useReducedMotion();
  const line = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE_OUT } },
  };

  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mx-auto flex max-w-2xl items-center gap-3 px-4"
    >
      <motion.span
        variants={line}
        className="h-px flex-1 origin-right bg-linear-to-l from-border to-transparent"
      />
      <motion.span
        variants={{
          hidden: { scale: 0, rotate: 0 },
          visible: {
            scale: 1,
            rotate: 45,
            transition: { duration: 0.6, ease: EASE_OUT },
          },
        }}
        className="size-1.5 bg-brand"
      />
      <motion.span
        variants={line}
        className="h-px flex-1 origin-left bg-linear-to-r from-border to-transparent"
      />
    </motion.div>
  );
}
