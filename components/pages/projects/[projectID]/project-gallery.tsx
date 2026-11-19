'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Images,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { ProjectScreenshot } from '@/constants';

interface ProjectGalleryProps {
  projectName: string;
  screenshots: ProjectScreenshot[];
}

export function ProjectGallery({
  projectName,
  screenshots,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = screenshots.length;
  const active = screenshots[activeIndex];
  const isMobileOnly = screenshots.every((shot) => shot.device === 'mobile');

  const step = (delta: number) =>
    setActiveIndex((index) => (index + delta + total) % total);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleArrowKeys = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  return (
    <section aria-labelledby="project-gallery-heading" className="mb-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="project-gallery-heading"
            className="flex items-center gap-2 font-heading text-2xl font-bold"
          >
            <Images className="size-6 text-primary" aria-hidden="true" />
            Inside the app
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isMobileOnly
              ? 'Real screens from the app. Tap any screen to view it full size.'
              : 'Real screens from the app. Select a screen or open it full size.'}
          </p>
        </div>
        <p className="text-sm font-medium tabular-nums text-muted-foreground">
          {total} screens
        </p>
      </div>

      {isMobileOnly ? (
        <PhoneRail screenshots={screenshots} onOpen={openLightbox} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
          <div
            className="group relative aspect-video bg-muted/60"
            onKeyDown={handleArrowKeys}
          >
            <button
              type="button"
              onClick={() => openLightbox(activeIndex)}
              className="absolute inset-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              aria-label={`View "${active.caption}" full size`}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                preload={activeIndex === 0}
                sizes="(max-width: 1152px) 100vw, 1152px"
                className={cn(
                  'object-contain motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300',
                  active.device === 'mobile' && 'py-3',
                )}
              />
            </button>

            <GalleryNavButtons onStep={step} />

            <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-border/50 bg-background/80 px-2.5 py-1 text-xs font-semibold tabular-nums backdrop-blur-sm">
              {activeIndex + 1} / {total}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border/50 px-4 py-3">
            <p
              className="flex min-w-0 items-center gap-2 text-sm font-medium"
              aria-live="polite"
            >
              <DeviceIcon device={active.device} />
              <span className="truncate">{active.caption}</span>
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={() => openLightbox(activeIndex)}
            >
              <Expand className="size-3.5" aria-hidden="true" />
              Full size
            </Button>
          </div>
        </div>
      )}

      {!isMobileOnly && (
        <ul
          className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2"
          aria-label={`${projectName} screenshots`}
        >
          {screenshots.map((shot, index) => (
            <li key={shot.src} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-current={index === activeIndex}
                aria-label={`Show screen ${index + 1}: ${shot.caption}`}
                className={cn(
                  'relative block h-16 overflow-hidden rounded-md border-2 bg-muted transition-[opacity,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-20',
                  shot.device === 'mobile' ? 'aspect-9/20' : 'aspect-video',
                  index === activeIndex
                    ? 'border-primary'
                    : 'border-transparent opacity-60 hover:opacity-100',
                )}
              >
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="max-w-[min(96vw,1400px)] gap-0 overflow-hidden p-0 sm:max-w-[min(96vw,1400px)]"
          onKeyDown={handleArrowKeys}
        >
          <div className="border-b border-border/50 py-3 pl-4 pr-14 sm:pl-6">
            <DialogTitle className="text-base">{active.caption}</DialogTitle>
            <DialogDescription className="mt-1 tabular-nums">
              {projectName} · Screen {activeIndex + 1} of {total}
            </DialogDescription>
          </div>
          <div className="relative h-[75dvh] w-full bg-muted/40">
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="96vw"
              className="object-contain p-2 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200 sm:p-4"
            />
            {total > 1 && <GalleryNavButtons onStep={step} alwaysVisible />}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function PhoneRail({
  screenshots,
  onOpen,
}: {
  screenshots: ProjectScreenshot[];
  onOpen: (index: number) => void;
}) {
  const railRef = useRef<HTMLUListElement>(null);

  const scrollRail = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="relative">
      <ul
        ref={railRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 pt-1"
        aria-label="App screens"
      >
        {screenshots.map((shot, index) => (
          <li key={shot.src} className="w-44 shrink-0 snap-start sm:w-52">
            <figure>
              <button
                type="button"
                onClick={() => onOpen(index)}
                aria-label={`View "${shot.caption}" full size`}
                className="block w-full cursor-zoom-in rounded-[2rem] bg-zinc-950 p-1.5 shadow-lg ring-1 ring-border transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-1"
              >
                <span className="relative block aspect-9/20 overflow-hidden rounded-[1.6rem] bg-muted">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    preload={index === 0}
                    sizes="(max-width: 640px) 176px, 208px"
                    className="object-cover"
                  />
                </span>
              </button>
              <figcaption className="mt-3 text-center text-sm font-medium text-muted-foreground">
                {shot.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollRail(-1)}
          aria-label="Scroll screens left"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => scrollRail(1)}
          aria-label="Scroll screens right"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function GalleryNavButtons({
  onStep,
  alwaysVisible = false,
}: {
  onStep: (delta: number) => void;
  alwaysVisible?: boolean;
}) {
  // Hidden until hover/focus on pointer devices; always shown on touch so taps never miss them.
  const visibility = alwaysVisible
    ? ''
    : 'sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100';

  return (
    <>
      <Button
        variant="outline"
        size="icon-lg"
        onClick={() => onStep(-1)}
        aria-label="Previous screen"
        className={cn(
          'absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 backdrop-blur-sm transition-opacity',
          visibility,
        )}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        onClick={() => onStep(1)}
        aria-label="Next screen"
        className={cn(
          'absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/85 backdrop-blur-sm transition-opacity',
          visibility,
        )}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </Button>
    </>
  );
}

function DeviceIcon({ device }: { device: ProjectScreenshot['device'] }) {
  const Icon = device === 'mobile' ? Smartphone : Monitor;
  return (
    <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
  );
}
