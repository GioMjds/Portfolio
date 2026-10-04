'use client';

import { useRef, useState, useSyncExternalStore, type ReactNode, type HTMLAttributes } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  size?: number;
}

function subscribeFinePointer(onStoreChange: () => void) {
  const media = window.matchMedia('(pointer: fine)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getFinePointerSnapshot() {
  return window.matchMedia('(pointer: fine)').matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function Spotlight({
  children,
  className,
  size = 600,
  ...props
}: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !isFinePointer || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty('--spotlight-x', `${x}px`);
    containerRef.current.style.setProperty('--spotlight-y', `${y}px`);
  };

  const showDynamicSpotlight = !shouldReduceMotion && isFinePointer;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      {showDynamicSpotlight && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-px transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
          style={{
            background: `radial-gradient(${size}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
