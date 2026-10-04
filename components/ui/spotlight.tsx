'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightProps {
  className?: string;
}

/**
 * Cursor-following glow. Render it as the first child of a `relative`,
 * `overflow-hidden` container: it listens on that parent and paints a soft
 * radial gradient behind the (positioned) content.
 *
 * Disabled for touch / coarse pointers and `prefers-reduced-motion`.
 * Only a CSS variable and opacity change per frame: no layout work.
 */
export function Spotlight({ className }: SpotlightProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const host = glow?.parentElement;
    if (!glow || !host) return;

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!canHover.matches || reduceMotion.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    function paint() {
      frame = 0;
      glow?.style.setProperty('--mx', `${x}px`);
      glow?.style.setProperty('--my', `${y}px`);
    }

    function onMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !glow || !host) return;
      const rect = host.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      glow.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(paint);
    }

    function onLeave() {
      if (glow) glow.style.opacity = '0';
    }

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500',
        className,
      )}
      style={{
        background:
          'radial-gradient(520px circle at var(--mx, 50%) var(--my, 30%), color-mix(in oklab, var(--primary) 16%, transparent), transparent 70%)',
      }}
    />
  );
}
