'use client';

import Image from 'next/image';
import { useState, type PointerEvent } from 'react';
import { BadgeCheck, Expand, ImageOff } from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';
import type { Certificate } from '@/constants';
import { CATEGORY_META } from './category-meta';

interface CertificateCardProps {
  certificate: Certificate;
  onPreview: (certificate: Certificate) => void;
}

/** Feeds the cursor position to the card's sheen gradient. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--x', `${event.clientX - rect.left}px`);
  el.style.setProperty('--y', `${event.clientY - rect.top}px`);
}

/**
 * Featured credential: framed certificate preview with a cursor-lit sheen.
 * The whole preview is the button that opens the full-size dialog.
 */
export function CertificateCard({
  certificate,
  onPreview,
}: CertificateCardProps) {
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const category = CATEGORY_META[certificate.category];
  const CategoryIcon = category.icon;

  return (
    <TiltCard className="h-full">
      <article
        onPointerMove={trackPointer}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-2xl hover:shadow-foreground/5"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--brand) 14%, transparent), transparent 70%)',
          }}
        />

        <div className="p-3 pb-0">
          <button
            type="button"
            onClick={() => onPreview(certificate)}
            className="relative block aspect-16/10 w-full cursor-zoom-in overflow-hidden rounded-xl border border-border/60 bg-muted/40 outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            <span className="sr-only">
              Preview {certificate.name} certificate
            </span>
            {imageUnavailable ? (
              <span className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
                <ImageOff className="size-4" aria-hidden="true" />
                Preview unavailable
              </span>
            ) : (
              <Image
                src={certificate.path}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                onError={() => setImageUnavailable(true)}
              />
            )}

            {certificate.featured && (
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-brand/40 bg-background/85 px-2.5 py-1 text-xs font-semibold backdrop-blur-md">
                <BadgeCheck className="size-3.5 text-brand" aria-hidden="true" />
                Featured
              </span>
            )}

            <span
              aria-hidden="true"
              className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5 rounded-full border border-border/60 bg-background/85 px-2.5 py-1 text-xs font-medium opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
            >
              <Expand className="size-3" />
              Full size
            </span>
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <span>{certificate.issuer}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{certificate.year}</span>
          </p>
          <h3 className="mt-2 font-heading text-lg font-semibold leading-snug tracking-tight text-pretty">
            {certificate.name}
          </h3>

          <div className="mt-auto flex items-end justify-between gap-3 pt-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-2.5 py-1 text-xs font-medium">
              <CategoryIcon className="size-3.5 text-brand" aria-hidden="true" />
              {category.label}
            </span>
            {certificate.icons && certificate.icons.length > 0 && (
              <ul
                aria-hidden="true"
                className="flex shrink-0 flex-wrap justify-end gap-1.5"
              >
                {certificate.icons.map((icon) => (
                  <li
                    key={icon}
                    className="relative size-7 rounded-md border border-border/50 bg-background/70"
                  >
                    <Image
                      src={icon}
                      alt=""
                      fill
                      sizes="28px"
                      className="object-contain p-1"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
