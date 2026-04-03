import type { Metadata } from 'next';
import { Header, ProjectsContainer } from '@/components/pages/projects';

export const metadata: Metadata = {
  title: "My Projects",
  description:
    'Explore my collection of web applications, tools, and experiments showcasing my development journey, practices, and creative problem-solving.',
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Header />
        <ProjectsContainer />
      </div>
    </div>
  );
}
