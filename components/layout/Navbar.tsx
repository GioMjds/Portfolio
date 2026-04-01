'use client';

import type { Route } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import ThemeToggle from '@/components/theme-switcher';
import { GITHUB_IMAGE, navItems } from '@/constants';

export function Navbar() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-5xl px-4 pt-4">
          <nav className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card/80 px-4 py-3 shadow-lg shadow-primary/5 backdrop-blur-xl transition-all duration-300">
            {/* Logo / Brand */}
            <Link
              href="/"
              className="group flex items-center gap-2 transition-transform duration-200 hover:scale-105"
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:shadow-primary/25">
                <Image
                  src={GITHUB_IMAGE}
                  alt="GioMjds's GitHub image"
                  width={36}
                  height={36}
                  loading="lazy"
                  className="rounded-full"
                />
              </div>
              <span className="hidden font-heading text-lg font-bold tracking-tight sm:block">
                Gio<span className="text-primary">Mjds</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Tooltip key={href}>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant={isActive ? 'secondary' : 'ghost'}
                        size="sm"
                        className={cn(
                          'relative transition-all duration-200',
                          isActive &&
                            'bg-secondary/80 shadow-sm after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-4 after:-translate-x-1/2 after:rounded-full after:bg-primary',
                        )}
                      >
                        <Link
                          href={href as Route}
                          className="flex items-center gap-2"
                        >
                          <Icon className="size-4" />
                          <span className="hidden md:inline">{label}</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="md:hidden">
                      {label}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Separator
                orientation="vertical"
                className="hidden h-6 sm:block"
              />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    </TooltipProvider>
  );
}
