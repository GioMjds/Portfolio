import type { Metadata } from 'next';
import {
  CallToAction,
  ChapterDivider,
  Hero,
  Prologue,
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
      <Prologue />
      <ChapterDivider />
      <Highlights />
      <ChapterDivider />
      <TechStack skillProjects={skillProjects} />
      <ChapterDivider />
      <FlagshipShowcase />
      <ChapterDivider />
      <ExperienceTimeline />
      <ChapterDivider />
      <GithubStats />
      <CallToAction />
    </section>
  );
}
