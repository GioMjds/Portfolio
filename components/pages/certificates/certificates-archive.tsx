'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  type Certificate,
  getFeaturedCertificates,
  sortCertificatesByYear,
} from '@/constants';
import { CertificateCard } from './certificate-card';
import { CertificatePreviewDialog } from './certificate-preview-dialog';

interface CertificatesArchiveProps {
  certificates: Certificate[];
}

export function CertificatesArchive({
  certificates,
}: CertificatesArchiveProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selected, setSelected] = useState<Certificate | null>(null);

  const archiveCertificates = useMemo(() => {
    const sorted = sortCertificatesByYear(certificates);
    const featuredNames = new Set(
      getFeaturedCertificates(sorted, 4).map((item) => item.name),
    );
    return sorted.filter((item) => !featuredNames.has(item.name));
  }, [certificates]);

  if (archiveCertificates.length === 0) return null;

  return (
    <>
      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Full Certificate Archive
          </h2>
          <p className="text-muted-foreground">
            Explore the complete credential history when you need deeper proof.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            {expanded
              ? 'Hide archive'
              : `Show all (${archiveCertificates.length})`}
            {expanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </div>

        {expanded && (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
            {archiveCertificates.map((certificate) => (
              <li key={certificate.name}>
                <CertificateCard
                  certificate={certificate}
                  onPreview={setSelected}
                />
              </li>
            ))}
          </ul>
        )}
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
