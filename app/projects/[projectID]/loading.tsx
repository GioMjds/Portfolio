'use client';

import { useTheme } from 'next-themes';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SKELETON_THEME = {
  light: { base: '#e8e7f3', highlight: '#f4f3fb' },
  dark: { base: '#1d1b2e', highlight: '#252241' },
};

export default function Loading() {
  const { resolvedTheme } = useTheme();

  const { base, highlight } =
    resolvedTheme === 'dark' ? SKELETON_THEME.dark : SKELETON_THEME.light;

  return (
    <SkeletonTheme baseColor={base} highlightColor={highlight}>
      <div className="relative min-h-screen overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Skeleton width={140} height={36} borderRadius={8} />
          </div>

          {/* Header */}
          <header className="mb-12">
            {/* Status badges row */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Skeleton width={148} height={36} borderRadius={999} />
              <Skeleton width={116} height={32} borderRadius={999} />
            </div>

            {/* Title */}
            <Skeleton
              height={52}
              width="78%"
              className="mb-4"
              borderRadius={10}
            />

            {/* Description lines */}
            <Skeleton
              height={24}
              width="95%"
              className="mb-2"
              borderRadius={6}
            />
            <Skeleton height={24} width="70%" borderRadius={6} />

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Skeleton width={164} height={44} borderRadius={10} />
              <Skeleton width={164} height={44} borderRadius={10} />
            </div>
          </header>

          <Separator className="mb-12" />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column — image + features */}
            <div className="space-y-8 lg:col-span-2">
              {/* Project image */}
              <Card className="overflow-hidden border-border/50 bg-card">
                <Skeleton height={400} borderRadius={0} />
              </Card>

              {/* Features card */}
              <Card className="border-border/50 bg-card">
                <CardContent className="p-6">
                  {/* Section heading row */}
                  <div className="mb-4 flex items-center gap-2">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={130} height={28} borderRadius={6} />
                  </div>

                  {/* Feature grid */}
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

            {/* Right column — tech stack, info, links */}
            <div className="space-y-8">
              {/* Tech stack card */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Skeleton circle width={20} height={20} />
                    <Skeleton width={96} height={24} borderRadius={6} />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton
                        key={i}
                        width={86}
                        height={36}
                        borderRadius={8}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project info card */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Skeleton
                    width={120}
                    height={24}
                    className="mb-4"
                    borderRadius={6}
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

              {/* Links card */}
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Skeleton
                    width={56}
                    height={24}
                    className="mb-4"
                    borderRadius={6}
                  />
                  <div className="space-y-2">
                    <Skeleton width="100%" height={40} borderRadius={8} />
                    <Skeleton width="100%" height={40} borderRadius={8} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Projects */}
          <Separator className="my-16" />
          <section>
            {/* Section title — centred */}
            <div className="mb-8 flex justify-center">
              <Skeleton width={200} height={36} borderRadius={8} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  className="h-full overflow-hidden border-border/50 bg-card"
                >
                  <Skeleton height={200} borderRadius={0} />
                  <CardContent className="p-5">
                    <Skeleton height={22} className="mb-2" borderRadius={6} />
                    <Skeleton height={14} className="mb-1" borderRadius={4} />
                    <Skeleton height={14} width="80%" borderRadius={4} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SkeletonTheme>
  );
}
