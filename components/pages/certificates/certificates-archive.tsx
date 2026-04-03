'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  type Certificate,
  getFeaturedCertificates,
  sortCertificatesByYear,
} from '@/constants';
import { containerVariants, itemVariants } from '@/utils';
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
      <motion.section
        className="space-y-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div className="space-y-2 text-center" variants={itemVariants}>
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            Full Certificate Archive
          </h2>
          <p className="text-muted-foreground">
            Explore the complete credential history when you need deeper proof.
          </p>
        </motion.div>

        <motion.div className="flex justify-center" variants={itemVariants}>
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
        </motion.div>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              role="list"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              variants={containerVariants}
            >
              {archiveCertificates.map((certificate) => (
                <motion.li key={certificate.name} variants={itemVariants}>
                  <CertificateCard
                    certificate={certificate}
                    onPreview={setSelected}
                  />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
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
