import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { CallToAction, Hero, Highlights } from '@/components/pages/homepage';
import {
  createAbsoluteUrl,
  createPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Personal Portfolio',
  description:
    'Explore Gio Majadas projects, skills, and experience in modern web development, mobile app development, and AI-powered product delivery.',
  pathname: '/',
});

export default function Home() {
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: createAbsoluteUrl('/'),
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
  };

  return (
    <section className="relative" aria-label="Homepage content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <Hero />
      <Separator className="mx-auto max-w-2xl" />
      <Highlights />
      <CallToAction />
    </section>
  );
}
