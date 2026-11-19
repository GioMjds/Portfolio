'use client';

import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ActionSwapIcon } from '@/components/motion/action-swap';
import { useThemeToggle } from '@/components/motion/theme-toggle';
import { Kbd } from '@/components/ui/kbd';
import { Button } from '@/components/ui/button';

function isTyping() {
  const el = document.activeElement as HTMLElement | null;
  if (!el) return false;
  return (
    el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
  );
}

/**
 * Theme toggle: click or press `D`. The theme repaints through a View
 * Transition (beUI `useThemeToggle`); reduced motion and browsers without
 * View Transitions switch instantly.
 */
export default function ThemeToggle() {
  const { isDark, mounted, toggle } = useThemeToggle({
    variant: 'circle',
    start: 'top-right',
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Holding D auto-repeats ~30×/s; each repeat would start a full-page
      // View Transition. One press, one toggle.
      if (e.repeat || isTyping()) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (e.key.toLowerCase() !== 'd') return;
      toggle();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  // Same-size placeholder until the theme is known, so the navbar doesn't shift.
  if (!mounted) {
    return (
      <Button
        aria-hidden="true"
        tabIndex={-1}
        variant="outline"
        disabled
        className="flex items-center gap-1 p-2"
      >
        <span className="size-5" />
        <Kbd className="hidden sm:inline-flex">D</Kbd>
      </Button>
    );
  }

  return (
    <Button
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      variant="outline"
      size="default"
      onClick={toggle}
      className="flex items-center gap-1 p-2 cursor-pointer bg-background hover:bg-accent rounded-md transition-colors"
    >
      <ActionSwapIcon value={isDark ? 'dark' : 'light'} animation="blur">
        {isDark ? <Moon size={20} /> : <Sun size={20} />}
      </ActionSwapIcon>
      <Kbd className="hidden transition-colors sm:inline-flex">D</Kbd>
    </Button>
  );
}
