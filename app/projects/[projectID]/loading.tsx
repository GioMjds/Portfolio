import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <Skeleton width={140} height={36} borderRadius={8} />
        </div>

        {/* Header Skeleton */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Skeleton width={140} height={36} borderRadius={20} />
            <Skeleton width={110} height={32} borderRadius={20} />
          </div>

          <Skeleton height={48} width="80%" className="mb-4" borderRadius={8} />

          <Skeleton count={2} height={24} className="mb-2" borderRadius={6} />

          {/* Action Buttons Skeleton */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Skeleton width={160} height={44} borderRadius={8} />
            <Skeleton width={160} height={44} borderRadius={8} />
          </div>
        </header>

        <Separator className="mb-12" />

        {/* Main Content Grid Skeleton */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Image & Features Skeleton */}
          <div className="space-y-8 lg:col-span-2">
            {/* Project Image Skeleton */}
            <Card className="overflow-hidden border-border/50 bg-card">
              <Skeleton height={400} borderRadius={0} />
            </Card>

            {/* Features Section Skeleton */}
            <Card className="border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={140} height={28} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3"
                    >
                      <Skeleton circle width={16} height={16} />
                      <Skeleton width="100%" height={16} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tech Stack & Info Skeleton */}
          <div className="space-y-8">
            {/* Tech Stack Skeleton */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Skeleton circle width={20} height={20} />
                  <Skeleton width={100} height={24} />
                </div>
                <div className="flex flex-wrap gap-3">
                  {[...Array(5)].map((_, index) => (
                    <Skeleton
                      key={index}
                      width={90}
                      height={36}
                      borderRadius={8}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Info Card Skeleton */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Skeleton width={120} height={24} className="mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3"
                    >
                      <Skeleton width={80} height={14} />
                      <Skeleton width={60} height={20} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links Card Skeleton */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <Skeleton width={60} height={24} className="mb-4" />
                <div className="space-y-2">
                  <Skeleton width="100%" height={40} borderRadius={8} />
                  <Skeleton width="100%" height={40} borderRadius={8} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects Skeleton */}
        <Separator className="my-16" />
        <section>
          <Skeleton
            width={200}
            height={36}
            className="mx-auto mb-8"
            borderRadius={8}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <Card
                key={index}
                className="h-full overflow-hidden border-border/50 bg-card"
              >
                <Skeleton height={200} borderRadius={0} />
                <CardContent className="p-5">
                  <Skeleton height={24} className="mb-2" />
                  <Skeleton count={2} height={14} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
