import { TicketCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getCertificateStats, type Certificate } from '@/constants';

interface HeaderProps {
  certificates: Certificate[];
}

export function Header({ certificates }: HeaderProps) {
  const stats = getCertificateStats(certificates);

  return (
    <header className="space-y-8 text-center">
      <div className="space-y-4">
        <Badge
          variant="outline"
          className="gap-2 border-primary/30 bg-primary/5 px-4 py-3 text-sm"
        >
          <TicketCheck className="size-3" />
          Credentials and Certifications
        </Badge>
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Verified
          <span className="block bg-linear-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent pb-2">
            Learning Journey
          </span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          A curated and verifiable timeline of credentials across frontend,
          backend, database, AI, analytics, and cybersecurity, as well as other
          achievements that demonstrate a commitment to continuous learning and
          growth in the tech industry.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/60 bg-card/60 p-4">
          <p className="text-sm text-muted-foreground">Total certificates</p>
          <p className="font-heading text-2xl font-semibold">
            {stats.totalCertificates}
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-4">
          <p className="text-sm text-muted-foreground">Latest year</p>
          <p className="font-heading text-2xl font-semibold">
            {stats.latestYear}
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-4">
          <p className="text-sm text-muted-foreground">Featured credentials</p>
          <p className="font-heading text-2xl font-semibold">
            {stats.featuredCount}
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/60 p-4">
          <p className="text-sm text-muted-foreground">Top providers</p>
          <p className="text-sm font-medium text-foreground">
            {stats.topIssuers.join(', ')}
          </p>
        </div>
      </div>
    </header>
  );
}
