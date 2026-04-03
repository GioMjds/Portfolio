'use client';

import { useMemo, useState } from 'react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { Award } from 'lucide-react';
import {
  type Certificate,
  getFeaturedCertificates,
  sortCertificatesByYear,
} from '@/constants';
import { CertificateCard } from './certificate-card';
import { CertificatePreviewDialog } from './certificate-preview-dialog';

interface FeaturedCertificatesProps {
  certificates: Certificate[];
}

export function FeaturedCertificates({
  certificates,
}: FeaturedCertificatesProps) {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const featured = useMemo(() => {
    return getFeaturedCertificates(sortCertificatesByYear(certificates), 4);
  }, [certificates]);

  if (featured.length === 0) {
    return (
      <Empty className="rounded-xl border border-dashed border-border/70 bg-card/40">
        <EmptyHeader>
          <Award className="size-6 text-muted-foreground" />
          <EmptyTitle>No featured certificates yet</EmptyTitle>
          <EmptyDescription>
            Once certificates are added, top credentials will appear here first.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Featured Credentials
          </h2>
          <p className="text-muted-foreground">
            A curated set of certifications that best represent current
            strengths.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((certificate) => (
            <CertificateCard
              key={certificate.name}
              certificate={certificate}
              onPreview={setSelected}
            />
          ))}
        </div>
      </section>
      <CertificatePreviewDialog
        certificate={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) {
            setSelected(null);
          }
        }}
      />
    </>
  );
}
