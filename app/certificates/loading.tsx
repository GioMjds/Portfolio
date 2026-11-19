import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

/**
 * Mirrors app/certificates/page.tsx: header with stat tiles, featured card
 * grid, then the year-grouped archive with topic filters. Colours are theme
 * tokens (--skeleton-* in globals.css); the library already stops the
 * shimmer under prefers-reduced-motion.
 */
export default function Loading() {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div role="status" aria-label="Loading certificates" className="relative">
        <div
          aria-hidden="true"
          className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8"
        >
          {/* Header */}
          <header className="pt-8 text-center sm:pt-4">
            <div className="mb-6 flex justify-center">
              <Skeleton width={240} height={36} borderRadius={999} />
            </div>
            <div className="mx-auto max-w-3xl">
              <Skeleton
                width="70%"
                borderRadius={12}
                className="h-10 sm:h-12 md:h-15 lg:h-18"
              />
              <Skeleton
                width="55%"
                borderRadius={12}
                className="mt-2 h-10 sm:h-12 md:h-15 lg:h-18"
              />
            </div>
            <div className="mx-auto mt-5 max-w-2xl">
              <Skeleton height={22} width="95%" borderRadius={6} />
              <Skeleton height={22} width="75%" borderRadius={6} />
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border/70 bg-card/70 px-4 py-5"
                >
                  <Skeleton width="60%" height={12} borderRadius={4} />
                  <Skeleton
                    width={56}
                    height={36}
                    borderRadius={8}
                    className="mt-3"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Skeleton width={70} height={16} borderRadius={4} />
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} width={110} height={22} borderRadius={999} />
              ))}
            </div>
          </header>

          {/* Featured */}
          <section className="py-16 sm:py-24">
            <SectionIntroSkeleton />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/80"
                >
                  <div className="p-3 pb-0">
                    <Skeleton borderRadius={12} className="aspect-16/10" />
                  </div>
                  <div className="p-5">
                    <Skeleton width="55%" height={12} borderRadius={4} />
                    <Skeleton height={20} borderRadius={6} className="mt-3" />
                    <Skeleton height={20} width="70%" borderRadius={6} />
                    <div className="mt-5 flex items-end justify-between">
                      <Skeleton width={96} height={26} borderRadius={999} />
                      <div className="flex gap-1.5">
                        <Skeleton width={28} height={28} borderRadius={6} />
                        <Skeleton width={28} height={28} borderRadius={6} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Archive */}
          <section className="py-16 sm:py-24">
            <SectionIntroSkeleton />
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {[64, 96, 88, 96, 92, 64, 104, 120].map((width, i) => (
                <Skeleton key={i} width={width} height={44} borderRadius={999} />
              ))}
            </div>
            <div className="space-y-14">
              {Array.from({ length: 2 }).map((_, group) => (
                <div
                  key={group}
                  className="grid gap-5 lg:grid-cols-[10rem_1fr] lg:gap-10"
                >
                  <div className="flex items-baseline gap-3 lg:block">
                    <Skeleton width={110} height={44} borderRadius={8} />
                    <Skeleton
                      width={96}
                      height={12}
                      borderRadius={4}
                      className="lg:mt-3"
                    />
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 rounded-xl border border-border/70 bg-card/70 p-3"
                      >
                        <Skeleton
                          width={96}
                          height={60}
                          borderRadius={6}
                          containerClassName="shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <Skeleton width="45%" height={12} borderRadius={4} />
                          <Skeleton height={16} borderRadius={4} className="mt-2" />
                          <Skeleton width="60%" height={14} borderRadius={4} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
        <span className="sr-only">Loading certificates…</span>
      </div>
    </SkeletonTheme>
  );
}

/** Eyebrow, two-word-ish title, and lede, centred like SectionIntro. */
function SectionIntroSkeleton() {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <Skeleton width={160} height={12} borderRadius={4} />
      <Skeleton
        width={360}
        borderRadius={10}
        className="mt-5 h-9 max-w-[80vw] sm:h-10 md:h-12"
      />
      <Skeleton
        width={480}
        height={18}
        borderRadius={6}
        className="mt-4 max-w-[85vw]"
      />
    </div>
  );
}
