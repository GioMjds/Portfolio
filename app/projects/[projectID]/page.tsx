import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailWrapper } from '@/components/pages/projects/[projectID]';
import { getProjectById, getProjects } from '@/lib/projects-data';
import { createAbsoluteUrl, createPageMetadata, SITE_NAME } from '@/lib/site';

function normalizeProjectPath(projectID: string): `/${string}` | '/' {
  const isNumericParam = /^\d{1,10}$/.test(projectID);
  return isNumericParam ? (`/projects/${projectID}` as const) : '/projects';
}

export async function generateMetadata({
  params,
}: PageProps<'/projects/[projectID]'>): Promise<Metadata> {
  const { projectID } = await params;
  const normalizedPath = normalizeProjectPath(projectID);
  const project = await getProjectById(Number(projectID));

  if (!project) {
    return createPageMetadata({
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
      pathname: normalizedPath,
      type: 'article',
    });
  }

  return createPageMetadata({
    title: project.projectName,
    description: project.description,
    pathname: `/projects/${project.projectId}`,
    type: 'article',
  });
}

export default async function ProjectDetailPage({
  params,
}: PageProps<'/projects/[projectID]'>) {
  const { projectID } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectById(Number(projectID)),
    getProjects(),
  ]);

  if (!project) notFound();

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.projectName,
    description: project.description,
    url: createAbsoluteUrl(`/projects/${project.projectId}`),
    creator: {
      '@type': 'Person',
      name: 'Gio Majadas',
      url: createAbsoluteUrl('/'),
    },
    publisher: {
      '@type': 'Person',
      name: 'Gio Majadas',
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: `${SITE_NAME} projects`,
      url: createAbsoluteUrl('/projects'),
    },
    keywords: project.stacks.map((stack) => stack.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailWrapper project={project} allProjects={allProjects} />
    </>
  );
}
