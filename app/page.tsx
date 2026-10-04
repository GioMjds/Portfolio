import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import {
  CallToAction,
  Hero,
  Highlights,
  TechStack,
  FlagshipShowcase,
  ExperienceTimeline,
  GithubStats,
} from '@/components/pages/homepage';
import { skills } from '@/constants/about';
import { getProjects } from '@/lib/projects-data';
import { buildSkillProjects } from '@/lib/skill-projects';
import {
  createAbsoluteUrl,
  createPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Gio Majadas | Personal Portfolio',
  description:
    'Explore Gio Majadas projects, skills, and experience in modern web development, mobile app development, and AI-powered product delivery.',
  pathname: '/',
});

export default async function Home() {
  const skillProjects = buildSkillProjects(skills, await getProjects());

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
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero />
      <Separator className="mx-auto max-w-2xl" />
      <Highlights />
      <Separator className="mx-auto max-w-2xl" />
      <TechStack skillProjects={skillProjects} />
      <Separator className="mx-auto max-w-2xl" />
      <FlagshipShowcase />
      <Separator className="mx-auto max-w-2xl" />
      <ExperienceTimeline />
      <Separator className="mx-auto max-w-2xl" />
      <GithubStats />
      <Separator className="mx-auto max-w-2xl" />
      <CallToAction />
    </section>
  );
}
