'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, Expand } from 'lucide-react';
import {
  type Certificate,
  type CertificateCategory,
  sortCertificatesByYear,
} from '@/constants';
import { SectionIntro } from '@/components/pages/homepage/section-intro';
import { EASE_OUT, SPRING_LAYOUT } from '@/lib/ease';
import { cn } from '@/lib/utils';
import { CATEGORY_META } from './category-meta';
import { CertificatePreviewDialog } from './certificate-preview-dialog';

type Filter = 'all' | CertificateCategory;

interface CertificatesArchiveProps {
  certificates: Certificate[];
}

/**
 * Every certificate, newest year first, filterable by topic. Year headings
 * stick beside their entries on desktop; filtering animates the list with
 * shared layout (motion).
 */
export function CertificatesArchive({ certificates }: CertificatesArchiveProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Certificate | null>(null);
  const reduce = useReducedMotion();

  const sorted = useMemo(
    () => sortCertificatesByYear(certificates),
    [certificates],
  );

  // Only topics that actually have certificates, in CATEGORY_META order.
  const filters = useMemo(() => {
    const counts = new Map<CertificateCategory, number>();
    for (const item of sorted) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    const topics = (Object.keys(CATEGORY_META) as CertificateCategory[])
      .filter((key) => counts.has(key))
      .map((key) => ({
        value: key as Filter,
        label: CATEGORY_META[key].label,
        count: counts.get(key) ?? 0,
      }));
    return [{ value: 'all' as Filter, label: 'All', count: sorted.length }, ...topics];
  }, [sorted]);

  const years = useMemo(() => {
    const visible =
      filter === 'all' ? sorted : sorted.filter((c) => c.category === filter);
    const groups = new Map<number, Certificate[]>();
    for (const item of visible) {
      groups.set(item.year, [...(groups.get(item.year) ?? []), item]);
    }
    return [...groups.entries()];
  }, [sorted, filter]);

  const visibleCount = years.reduce((sum, [, items]) => sum + items.length, 0);

  if (sorted.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <SectionIntro chapter={2} label="Paper trail" title="Everything, by year">
        Every certificate, newest first. Filter by topic if you&apos;re after
        something specific.
      </SectionIntro>

      <div
        role="group"
        aria-label="Filter certificates by topic"
        className="mb-12 flex flex-wrap justify-center gap-2"
      >
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={cn(
                'relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                active
                  ? 'border-transparent text-primary-foreground'
                  : 'border-border/70 bg-card/60 text-muted-foreground backdrop-blur-sm hover:border-brand/40 hover:text-foreground',
              )}
            >
              {active && (
                <motion.span
                  layoutId="certificate-filter-pill"
                  transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span className="relative">{item.label}</span>
              <span
                className={cn(
                  'relative rounded-full px-1.5 text-xs tabular-nums',
                  active ? 'bg-primary-foreground/15' : 'bg-muted',
                )}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visibleCount} {visibleCount === 1 ? 'certificate' : 'certificates'}
      </p>

      <div className="space-y-14">
        <AnimatePresence mode="popLayout" initial={false}>
          {years.map(([year, items]) => (
            <motion.div
              key={year}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="grid gap-5 lg:grid-cols-[10rem_1fr] lg:gap-10"
            >
              <div className="flex items-baseline gap-3 lg:sticky lg:top-28 lg:block lg:h-fit">
                <h3 className="font-heading text-4xl font-bold tracking-tight tabular-nums lg:text-5xl">
                  {year}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground lg:mt-2">
                  {items.length} {items.length === 1 ? 'credential' : 'credentials'}
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {items.map((certificate) => (
                    <motion.li
                      key={certificate.name}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    >
                      <ArchiveRow
                        certificate={certificate}
                        onPreview={setSelected}
                      />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CertificatePreviewDialog
        certificate={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </section>
  );
}

function ArchiveRow({
  certificate,
  onPreview,
}: {
  certificate: Certificate;
  onPreview: (certificate: Certificate) => void;
}) {
  const category = CATEGORY_META[certificate.category];
  const CategoryIcon = category.icon;

  return (
    <button
      type="button"
      onClick={() => onPreview(certificate)}
      aria-label={`Preview ${certificate.name}, ${certificate.issuer}${certificate.featured ? ', featured' : ''}`}
      className="group flex h-full w-full cursor-zoom-in items-center gap-4 rounded-xl border border-border/70 bg-card/70 p-3 text-left backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-200 outline-none hover:border-brand/40 hover:bg-card hover:shadow-lg hover:shadow-foreground/5 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="relative aspect-16/10 w-24 shrink-0 overflow-hidden rounded-md border border-border/60 bg-muted">
        <Image
          src={certificate.path}
          alt=""
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          <CategoryIcon className="size-3.5 text-brand" aria-hidden="true" />
          {category.label}
          {certificate.featured && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-foreground">
                <BadgeCheck className="size-3.5 text-brand" aria-hidden="true" />
                Featured
              </span>
            </>
          )}
        </span>
        <span className="mt-1 line-clamp-2 block font-medium leading-snug">
          {certificate.name}
        </span>
        <span className="mt-0.5 block truncate text-sm text-muted-foreground">
          {certificate.issuer}
        </span>
      </span>
      <Expand
        aria-hidden="true"
        className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </button>
  );
}
