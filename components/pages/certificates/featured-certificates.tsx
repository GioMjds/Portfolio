'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
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
import { containerVariants, itemVariants } from '@/utils';

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
      <motion.section
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div className="space-y-2 text-center" variants={itemVariants}>
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Featured Credentials
          </h2>
          <p className="text-muted-foreground">
            A curated set of certifications that best represent current
            strengths.
          </p>
        </motion.div>
        <motion.ul
          className="grid gap-6 md:grid-cols-2"
          role="list"
          variants={containerVariants}
        >
          {featured.map((certificate) => (
            <motion.li key={certificate.name} variants={itemVariants}>
              <CertificateCard
                certificate={certificate}
                onPreview={setSelected}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
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
