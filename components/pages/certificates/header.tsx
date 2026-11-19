'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCertificateStats, type Certificate } from '@/constants';
import { EASE_OUT } from '@/lib/ease';
import { useIntroTimeline } from '@/lib/hooks/use-intro-timeline';

interface HeaderProps {
  certificates: Certificate[];
}

/**
 * Counts up from 0 once in view. The server renders the final value, so
 * no-JS and reduced-motion readers always see the real number.
 */
function CountUp({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!inView || reduce || !el) return;
    const controls = animate(0, value, {
      duration: 1.4,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function Header({ certificates }: HeaderProps) {
  const scope = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stats = getCertificateStats(certificates);
  const firstYear = Math.min(...certificates.map((c) => c.year));

  const tiles = [
    { label: 'Certificates', value: stats.totalCertificates },
    { label: 'Issuers', value: stats.uniqueIssuers },
    { label: 'Featured', value: stats.featuredCount },
    {
      label: `Years, since ${firstYear}`,
      value: stats.latestYear - firstYear + 1,
    },
  ];

  useIntroTimeline(scope, headingRef);

  return (
    <header ref={scope} className="pt-8 text-center sm:pt-4">
      <div data-intro-item data-intro="badge" className="mb-6 flex justify-center">
        <Badge
          variant="outline"
          className="gap-2 border-brand/30 bg-background/60 px-4 py-2 text-sm backdrop-blur-sm"
        >
          <BadgeCheck className="size-4 text-brand" aria-hidden="true" />
          Credentials &amp; certifications
        </Badge>
      </div>

      <h1
        ref={headingRef}
        data-intro-item
        className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
      >
        <span className="block">Receipts for</span>
        <span className="mt-2 block pb-2 text-muted-foreground">
          the learning.
        </span>
      </h1>

      <p
        data-intro-item
        data-intro="rest"
        className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl"
      >
        Courses, summits, webinars, and an academic recognition, collected
        since {firstYear}. The highlights come first; the full paper trail is
        right below.
      </p>

      <dl
        data-intro-item
        data-intro="rest"
        className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {tiles.map((tile, i) => (
          <div
            key={tile.label}
            className="rounded-2xl border border-border/70 bg-card/70 px-4 py-5 backdrop-blur-sm"
          >
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {tile.label}
            </dt>
            <dd className="mt-2 font-heading text-4xl font-bold tracking-tight">
              <CountUp value={tile.value} delay={0.6 + i * 0.1} />
            </dd>
          </div>
        ))}
      </dl>

      <p
        data-intro-item
        data-intro="rest"
        className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground"
      >
        <span>Most from</span>
        {stats.topIssuers.map((issuer) => (
          <Badge key={issuer} variant="secondary" className="font-normal">
            {issuer}
          </Badge>
        ))}
      </p>
    </header>
  );
}
