import type { Metadata } from 'next';
import {
  CallToAction,
  CertificatesArchive,
  FeaturedCertificates,
  Header,
} from '@/components/pages/certificates';
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
    <section className="relative min-h-screen overflow-hidden" aria-label="Certificates page content">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Header certificates={certificates} />
        <FeaturedCertificates certificates={certificates} />
        <CertificatesArchive certificates={certificates} />
        <CallToAction />
      </div>
    </section>
  );
}
