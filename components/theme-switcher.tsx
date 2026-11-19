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
      if (isTyping()) return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      if (e.key.toLowerCase() !== 'd') return;
      toggle();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  if (!mounted) return null;

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
      <Kbd className="transition-colors">D</Kbd>
    </Button>
  );
}
