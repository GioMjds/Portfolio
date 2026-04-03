import type { Metadata } from 'next';
import { Header, ProjectsContainer } from '@/components/pages/projects';
import { projects } from '@/constants/projects';
import { createAbsoluteUrl, createPageMetadata, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Explore Gio Majadas portfolio projects across web and mobile development, with stack details, features, and live links.',
  pathname: '/projects',
});

export default function ProjectsPage() {
  const projectListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} projects`,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: createAbsoluteUrl(`/projects/${project.projectId}`),
      name: project.projectName,
      description: project.description,
    })),
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      aria-label="Projects page content"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Header />
        <section aria-label="Projects listing">
          <h2 className="sr-only">Projects collection</h2>
          <ProjectsContainer />
        </section>
      </div>
    </section>
  );
}
