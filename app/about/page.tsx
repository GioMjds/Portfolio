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

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Learn more about Gio Majadas, a passionate software developer specializing in full-stack development. Discover his skills, experience, and projects.',
};

export default function AboutPage() {
  return (
    <div className="relative">
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
    </div>
  );
}
