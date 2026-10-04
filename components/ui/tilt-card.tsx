'use client';

import type { PointerEvent, ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Keep it subtle. */
  maxTilt?: number;
}

const SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Subtle 3D tilt toward the cursor. Pointer listeners sit on the static outer
 * element, so the hit area doesn't shift while the inner element rotates.
 *
 * No-op (plain wrapper) for reduced motion; ignores touch and pen input.
 * Never changes focus order or semantics.
 */
export function TiltCard({ children, className, maxTilt = 4 }: TiltCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(
    useTransform(py, [0, 1], [maxTilt, -maxTilt]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-maxTilt, maxTilt]),
    SPRING,
  );

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  }

  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div
      className={className}
      style={{ perspective: 1000 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <motion.div style={{ rotateX, rotateY }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}
