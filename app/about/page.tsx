import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import {
  CallToAction,
  Hero,
  Services,
  Skills,
  Timeline,
} from '@/components/pages/about';
import { skills } from '@/constants/about';
import { getProjects } from '@/lib/projects-data';
import { buildSkillProjects } from '@/lib/skill-projects';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'Learn about Gio Majadas background, technical strengths, development services, and milestones as a full-stack software developer.',
  pathname: '/about',
});

export default async function AboutPage() {
  const skillProjects = buildSkillProjects(skills, await getProjects());

  return (
    <section className="relative" aria-label="About page content">
      <Hero />
      <Separator className="mx-auto max-w-5xl" />
      <Skills skillProjects={skillProjects} />
      <Separator className="mx-auto max-w-5xl" />
      <Services />
      <Separator className="mx-auto max-w-5xl" />
      <Timeline />
      <CallToAction />
    </section>
  );
}
