'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

/**
 * Thin reading-progress bar pinned to the top of the viewport. Pages that
 * don't scroll stay at 0 and show nothing. Under reduced motion it tracks
 * scroll position directly instead of springing.
 */
export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-brand"
      style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
    />
  );
}
