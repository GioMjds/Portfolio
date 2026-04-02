import type { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import { CallToAction, Hero, Highlights } from '@/components/pages/homepage';

export const metadata: Metadata = {
  title: 'Gio Majadas | Personal Portfolio',
  description:
    'Welcome to my personal portfolio! I am a passionate software developer specializing in web and mobile applications. Explore my projects, skills, and experience as I showcase my journey in the world of technology.',
};

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Separator className="mx-auto max-w-2xl" />
      <Highlights />
      <CallToAction />
    </div>
  );
}
