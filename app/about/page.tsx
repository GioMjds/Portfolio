import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import {
  CallToAction,
  Hero,
  QuickFacts,
  Services,
  Skills,
  Timeline,
} from '@/components/pages/about';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn about Gio Majadas background, technical strengths, development services, and milestones as a full-stack software developer.',
  pathname: '/about',
});

export default function AboutPage() {
  return (
    <section className="relative" aria-label="About page content">
      <Hero />
      <Separator className="mx-auto max-w-2xl" />
      <QuickFacts />
      <Separator className="mx-auto max-w-2xl" />
      <Skills />
      <Separator className="mx-auto max-w-2xl" />
      <Services />
      <Separator className="mx-auto max-w-2xl" />
      <Timeline />
      <CallToAction />
    </section>
  );
}
