'use client';

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  type Certificate,
  getFeaturedCertificates,
  sortCertificatesByYear,
} from '@/constants';
import { SectionIntro } from '@/components/pages/homepage/section-intro';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';
import { CertificateCard } from './certificate-card';
import { CertificatePreviewDialog } from './certificate-preview-dialog';

/** Every featured credential, but never fewer than this many cards. */
const MIN_FEATURED = 4;

interface FeaturedCertificatesProps {
  certificates: Certificate[];
}

export function FeaturedCertificates({
  certificates,
}: FeaturedCertificatesProps) {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const featured = useMemo(() => {
    const count = Math.max(
      MIN_FEATURED,
      certificates.filter((item) => item.featured).length,
    );
    return getFeaturedCertificates(sortCertificatesByYear(certificates), count);
  }, [certificates]);

  return (
    <section className="py-16 sm:py-24">
      <SectionIntro chapter={1} label="Headliners" title="The ones I'm proudest of">
        Full programs and recognitions that took real hours to earn. Tap any
        certificate to see it full size.
      </SectionIntro>

      {featured.length === 0 ? (
        <Empty className="rounded-2xl border border-dashed border-border/70 bg-card/40">
          <EmptyHeader>
            <Award className="size-6 text-muted-foreground" />
            <EmptyTitle>No featured certificates yet</EmptyTitle>
            <EmptyDescription>
              Once certificates are added, top credentials will appear here
              first.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((certificate) => (
            <motion.li key={certificate.name} variants={fadeInUpVariants}>
              <CertificateCard
                certificate={certificate}
                onPreview={setSelected}
              />
            </motion.li>
          ))}
        </motion.ul>
      )}

      <CertificatePreviewDialog
        certificate={selected}
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </section>
  );
}
