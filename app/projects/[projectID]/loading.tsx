import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

/**
 * Mirrors ProjectDetailWrapper: header, screenshot gallery, case study +
 * features beside the stack/info/links aside, then related projects.
 * Colours are theme tokens (--skeleton-* in globals.css), so this stays a
 * Server Component and never flashes the wrong theme. The library already
 * stops the shimmer under prefers-reduced-motion.
 */
export default function Loading() {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div
        role="status"
        aria-label="Loading project"
        className="relative min-h-screen overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          {/* Back button */}
          <div className="mb-8">
            <Skeleton width={140} height={32} borderRadius={8} />
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Skeleton width={148} height={34} borderRadius={999} />
              <Skeleton width={116} height={34} borderRadius={999} />
            </div>
            <Skeleton
              width="78%"
              borderRadius={10}
              className="mb-4 h-10 sm:h-12 md:h-15"
            />
            <div className="max-w-3xl">
              <Skeleton height={22} width="95%" borderRadius={6} />
              <Skeleton height={22} width="70%" borderRadius={6} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Skeleton width={164} height={40} borderRadius={10} />
              <Skeleton width={164} height={40} borderRadius={10} />
            </div>
          </header>

          <Separator className="mb-12" />

          {/* Screenshot gallery */}
          <section className="mb-12">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={170} height={30} borderRadius={6} />
                </div>
                <Skeleton
                  width={300}
                  height={14}
                  borderRadius={4}
                  className="mt-2 max-w-[70vw]"
                />
              </div>
              <Skeleton width={72} height={14} borderRadius={4} />
            </div>
            <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
              <Skeleton borderRadius={0} className="aspect-video" />
              <div className="flex items-center justify-between gap-3 border-t border-border/50 px-4 py-3">
                <Skeleton width={180} height={16} borderRadius={4} />
                <Skeleton width={88} height={28} borderRadius={8} />
              </div>
            </div>
            <div className="mt-3 flex gap-2 overflow-hidden pb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                // Fixed size: the library's unlayered CSS forces width: 100%,
                // which beats Tailwind width utilities.
                <Skeleton
                  key={i}
                  width={128}
                  height={72}
                  borderRadius={6}
                  containerClassName="shrink-0"
                />
              ))}
            </div>
          </section>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Case study + features */}
            <div className="space-y-8 lg:col-span-2">
              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <Skeleton
                    width={190}
                    height={30}
                    borderRadius={6}
                    className="mb-6"
                  />
                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton width={36} height={36} borderRadius={8} />
                        <div className="flex-1">
                          <Skeleton
                            width={72}
                            height={12}
                            borderRadius={4}
                            className="mb-2"
                          />
                          <Skeleton height={16} borderRadius={4} />
                          <Skeleton height={16} width="85%" borderRadius={4} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={130} height={30} borderRadius={6} />
                  </div>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3"
                      >
                        <Skeleton circle width={16} height={16} />
                        <div className="flex-1">
                          <Skeleton height={14} borderRadius={4} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Aside: tech stack, info, links */}
            <div className="space-y-8">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Skeleton circle width={20} height={20} />
                    <Skeleton width={96} height={26} borderRadius={6} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        width={86}
                        height={38}
                        borderRadius={8}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Skeleton
                    width={120}
                    height={26}
                    borderRadius={6}
                    className="mb-4"
                  />
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
                      >
                        <Skeleton width={72} height={14} borderRadius={4} />
                        <Skeleton width={56} height={22} borderRadius={6} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Skeleton
                    width={56}
                    height={26}
                    borderRadius={6}
                    className="mb-4"
                  />
                  <div className="space-y-2">
                    <Skeleton height={36} borderRadius={8} />
                    <Skeleton height={36} borderRadius={8} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related projects */}
          <Separator className="my-16" />
          <section>
            <div className="mb-8 flex justify-center">
              <Skeleton width={220} height={36} borderRadius={8} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="h-full overflow-hidden border-border/50 bg-card py-0"
                >
                  <Skeleton borderRadius={0} className="aspect-video" />
                  <CardContent className="p-5">
                    <Skeleton height={22} borderRadius={6} className="mb-2" />
                    <Skeleton height={14} borderRadius={4} />
                    <Skeleton height={14} width="80%" borderRadius={4} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
        <span className="sr-only">Loading project details…</span>
      </div>
    </SkeletonTheme>
  );
}
