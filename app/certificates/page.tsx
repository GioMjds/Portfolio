import type { Metadata } from 'next';
import {
  CallToAction,
  CertificatesArchive,
  FeaturedCertificates,
  Header,
} from '@/components/pages/certificates';
import { certificates } from '@/constants';

export const metadata: Metadata = {
  title: "My Certificates",
  description:
    'Review verified certificates and credentials that highlight my learning journey across frontend, backend, databases, analytics, AI, and cybersecurity.',
};

export default function CertificatesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Header certificates={certificates} />
        <FeaturedCertificates certificates={certificates} />
        <CertificatesArchive certificates={certificates} />
        <CallToAction />
      </div>
    </div>
  );
}
