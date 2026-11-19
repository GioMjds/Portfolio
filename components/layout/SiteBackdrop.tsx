'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { useHoverCapable } from '@/lib/hooks/use-hover-capable';

/**
 * Fixed, decorative homepage background: a masked grid, slow-drifting glows
 * (CSS keyframes in globals.css) and, on mouse devices, a soft spotlight that
 * follows the cursor. The spotlight moves by transform only, once per frame.
 */
export function HomeBackdrop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const canHover = useHoverCapable();
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!canHover || reduce || !root || !spot) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      spot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      root.dataset.pointer = '';
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => delete root.dataset.pointer;

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      delete root.dataset.pointer;
    };
  }, [canHover, reduce]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="home-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="home-backdrop__grid" />
      <div className="home-backdrop__blob home-backdrop__blob--a" />
      <div className="home-backdrop__blob home-backdrop__blob--b" />
      <div className="home-backdrop__blob home-backdrop__blob--c" />
      <div ref={spotRef} className="home-backdrop__spot" />
    </div>
  );
}
