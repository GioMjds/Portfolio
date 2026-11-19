import Link from 'next/link';
import type { Route } from 'next';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Clock,
  Download,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/constants';
import { socialMediaLinks } from '@/utils';
import { LocalTime } from './LocalTime';

/** Only profiles that are actually configured. */
const SOCIALS = socialMediaLinks.filter((link) => link.href !== '#');

const columnTitle =
  'font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-card/60 backdrop-blur-sm">
      {/* Brand hairline across the top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/60 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          {/* Sign-off */}
          <section aria-labelledby="footer-cta-title" className="md:col-span-2 lg:col-span-1">
            <p className={columnTitle}>{'// end of page'}</p>
            <h2
              id="footer-cta-title"
              className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              Got an idea?
              <span className="block text-muted-foreground">
                Let&apos;s ship it.
              </span>
            </h2>
            <p className="mt-4 max-w-sm text-sm text-pretty text-muted-foreground">
              I build full-stack web apps from idea to deploy. Freelance or
              full-time, I&apos;d like to hear what you&apos;re working on.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="lg" className="group gap-2">
                <Link href="/contact">
                  Start a conversation
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <a href="/Gio_Majadas_Resume.pdf" download>
                  <Download className="size-4" aria-hidden="true" />
                  Resume
                </a>
              </Button>
            </div>
          </section>

          {/* Pages */}
          <nav aria-labelledby="footer-nav-title">
            <p id="footer-nav-title" className={columnTitle}>
              Navigate
            </p>
            <ul className="mt-4 space-y-1">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href as Route}
                    className="group inline-flex min-h-9 items-center gap-1.5 text-sm text-foreground/80 transition-colors duration-200 hover:text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-0 bg-brand transition-[width] duration-300 group-hover:w-3 motion-reduce:transition-none"
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Profiles */}
          <section aria-labelledby="footer-social-title">
            <p id="footer-social-title" className={columnTitle}>
              Elsewhere
            </p>
            {SOCIALS.length > 0 ? (
              <ul className="mt-4 space-y-1">
                {SOCIALS.map(({ href, label, icon }) => (
                  <li key={label}>
                    {/* Plain <a>: env-configured external URLs aren't typed routes. */}
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-9 items-center gap-2.5 text-sm text-foreground/80 transition-colors duration-200 hover:text-foreground [&_svg]:size-4"
                    >
                      <span className="text-muted-foreground transition-colors group-hover:text-brand">
                        {icon}
                      </span>
                      {label}
                      <ArrowUpRight
                        className="text-muted-foreground opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Links coming soon.
              </p>
            )}
          </section>

          {/* Status */}
          <section aria-labelledby="footer-status-title">
            <p id="footer-status-title" className={columnTitle}>
              Right now
            </p>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-2.5">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                </span>
                Open to work
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
                Philippines
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>
                  <LocalTime /> <span className="text-muted-foreground">PHT</span>
                </span>
              </li>
            </ul>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Gio Majadas. Designed &amp; developed by me.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Next.js · Tailwind CSS · motion · GSAP
          </p>
          {/* "#top" scrolls to the top of the document per the HTML spec. */}
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-border/70 px-4 text-sm text-foreground/80 transition-colors hover:border-brand/50 hover:text-foreground"
          >
            Back to top
            <ArrowUp
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Giant wordmark, cropped by the footer's bottom edge */}
      <p
        aria-hidden="true"
        className="footer-wordmark pointer-events-none -mb-[0.22em] text-center font-heading text-[clamp(4.5rem,21vw,17rem)] leading-none font-bold tracking-tighter select-none"
      >
        <span className="bg-linear-to-b from-foreground/14 to-foreground/0 bg-clip-text text-transparent">
          Gio
        </span>
        <span className="bg-linear-to-b from-brand/30 to-brand/0 bg-clip-text text-transparent">
          Mjds
        </span>
      </p>
    </footer>
  );
}
