import type { Metadata } from 'next';
import {
  CallToAction,
  CertificatesArchive,
  FeaturedCertificates,
  Header,
} from '@/components/pages/certificates';
import { ChapterDivider } from '@/components/pages/homepage/chapter-divider';
import { certificates } from '@/constants';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Certificates',
  description:
    'Review verified certificates and credentials from Gio Majadas across frontend, backend, databases, AI, analytics, and cybersecurity.',
  pathname: '/certificates',
});

export default function CertificatesPage() {
  return (
    <section className="relative" aria-label="Certificates page content">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <Header certificates={certificates} />
        <FeaturedCertificates certificates={certificates} />
        <ChapterDivider />
        <CertificatesArchive certificates={certificates} />
        <CallToAction />
      </div>
    </section>
  );
}
