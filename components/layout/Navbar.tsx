'use client';

import type { Route } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'motion/react';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EASE_OUT, SPRING_LAYOUT } from '@/lib/ease';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { SharedLayoutBg } from '@/components/motion/shared-layout-bg';
import ThemeToggle from '@/components/theme-switcher';
import { GITHUB_IMAGE, navItems } from '@/constants';
import { isBirthdayToday } from '@/lib/birthday';

/** Project detail pages (/projects/[id]) still light up "Projects". */
function isActiveRoute(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 12);
    const delta = y - (scrollY.getPrevious() ?? 0);
    if (Math.abs(delta) < 6) return;
    // Tuck away while reading down; any scroll up brings it back.
    // Reduced motion keeps it put.
    setHidden(!reduce && delta > 0 && y > 160);
  });

  return (
    <TooltipProvider>
      <motion.header
        className="sticky top-0 z-50 w-full"
        initial={false}
        animate={{ y: hidden && !menuOpen ? '-110%' : '0%' }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        // Keyboard users tabbing in always get the bar back.
        onFocusCapture={() => setHidden(false)}
      >
        <div className="mx-auto max-w-5xl px-4 pt-4">
          <nav
            aria-label="Primary navigation"
            className={cn(
              'relative flex items-center justify-between gap-3 rounded-2xl border py-2 pr-2 pl-2.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300',
              scrolled
                ? 'border-border/80 bg-card/85 shadow-xl shadow-foreground/5'
                : 'border-border/50 bg-card/60 shadow-lg shadow-foreground/3',
            )}
          >
            {/* Brand hairline that lights up once the page scrolls under the bar */}
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-x-8 -bottom-px h-px bg-linear-to-r from-transparent via-brand/60 to-transparent transition-opacity duration-500',
                scrolled ? 'opacity-100' : 'opacity-0',
              )}
            />

            {/* Logo / Brand */}
            <Link
              href="/"
              className="group flex min-h-11 items-center gap-2.5 rounded-xl pr-2 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-muted ring-1 ring-border transition-shadow duration-300 group-hover:ring-2 group-hover:ring-brand/70">
                <Image
                  src={GITHUB_IMAGE}
                  alt="GioMjds's GitHub image"
                  width={36}
                  height={36}
                  loading="lazy"
                  sizes="36px"
                  className="rounded-full"
                />
              </span>
              <span className="hidden font-heading text-lg font-bold tracking-tight sm:block">
                Gio<span className="text-brand">Mjds</span>
                {isBirthdayToday() && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        className="ml-1 inline-block cursor-default animate-birthday-pulse text-sm"
                        role="img"
                        aria-label="birthday cake"
                      >
                        🎂
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>Happy Birthday, Gio!</TooltipContent>
                  </Tooltip>
                )}
              </span>
            </Link>

            {/* Desktop links: hover pill follows the pointer, ink pill marks the page */}
            <SharedLayoutBg
              as="ul"
              role="list"
              inset={0}
              className="hidden w-auto flex-row items-center gap-0.5 md:flex"
              pillClassName="rounded-full bg-muted"
            >
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = isActiveRoute(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href as Route}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative isolate flex h-9 items-center gap-2 rounded-full px-3.5 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring',
                        active
                          ? 'text-background'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active-pill"
                          transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                          className="absolute inset-0 -z-10 rounded-full bg-foreground shadow-md shadow-foreground/10"
                        />
                      )}
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </SharedLayoutBg>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <Separator
                orientation="vertical"
                className="mr-1 hidden h-6 md:block"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="hidden size-9 md:inline-flex"
                    aria-label="Download Resume"
                  >
                    <a href="/Gio_Majadas_Resume.pdf" download>
                      <Download className="size-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download Resume</TooltipContent>
              </Tooltip>
              <ThemeToggle />

              <MobileMenu
                pathname={pathname}
                open={menuOpen}
                onOpenChange={setMenuOpen}
                reduce={Boolean(reduce)}
              />
            </div>
          </nav>
        </div>
      </motion.header>
    </TooltipProvider>
  );
}

interface MobileMenuProps {
  pathname: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reduce: boolean;
}

/** Below md: a dropdown sheet with big, numbered links. Radix handles focus and Escape. */
function MobileMenu({ pathname, open, onOpenChange, reduce }: MobileMenuProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="size-11 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="top-4 max-w-[calc(100%-2rem)] translate-y-0 gap-0 overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-0 shadow-2xl backdrop-blur-xl data-open:slide-in-from-top-4 data-closed:slide-out-to-top-4 sm:max-w-[calc(100%-2rem)] motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between border-b border-border/70 py-2 pr-2 pl-5">
          <DialogTitle className="font-mono text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground">
            Menu
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-11"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </Button>
          </DialogClose>
        </div>
        <DialogDescription className="sr-only">
          Pages on this site
        </DialogDescription>

        <nav aria-label="Mobile navigation">
          <ul className="p-2">
            {navItems.map(({ href, label }, i) => {
              const active = isActiveRoute(pathname, href);
              return (
                <motion.li
                  key={href}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04, duration: 0.4, ease: EASE_OUT }}
                >
                  <DialogClose asChild>
                    <Link
                      href={href as Route}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group flex min-h-14 items-center gap-4 rounded-xl px-3 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
                        active && 'bg-muted',
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-xs tabular-nums',
                          active ? 'text-brand' : 'text-muted-foreground',
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-heading text-2xl font-semibold tracking-tight">
                        {label}
                      </span>
                      <ArrowRight
                        className="ml-auto size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </DialogClose>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border/70 p-3">
          <Button asChild variant="outline" className="h-11 w-full gap-2">
            <a href="/Gio_Majadas_Resume.pdf" download>
              <Download className="size-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
