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
import {
  createAbsoluteUrl,
  createPageMetadata,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/lib/site';
import { getProjects } from '@/lib/projects-data';

export const metadata: Metadata = createPageMetadata({
  title: 'Gio Majadas | Personal Portfolio',
  description:
    'Explore Gio Majadas projects, skills, and experience in modern web development, mobile app development, and AI-powered product delivery.',
  pathname: '/',
});

function normalizeKey(name: string): string {
  return name.toLowerCase().replace(/[\s.\-_]/g, '');
}

export default async function Home() {
  const allProjects = await getProjects();
  const skillProjects: Record<string, { id: number; name: string }[]> = {};

  for (const project of allProjects) {
    for (const stack of project.stacks) {
      const key = normalizeKey(stack.name);
      if (!skillProjects[key]) {
        skillProjects[key] = [];
      }
      if (!skillProjects[key].some((p) => p.id === project.projectId)) {
        skillProjects[key].push({
          id: project.projectId,
          name: project.projectName,
        });
      }
    }
  }

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
