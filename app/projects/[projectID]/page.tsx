import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailWrapper } from '@/components/pages/projects/[projectID]';
import { getProjectById, getProjects } from '@/lib/projects-data';

export async function generateMetadata({
  params,
}: PageProps<'/projects/[projectID]'>): Promise<Metadata> {
  const { projectID } = await params;
  const project = await getProjectById(Number(projectID));

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    };
  }

  return {
    title: project.projectName,
    description: project.description,
  };
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

  return <ProjectDetailWrapper project={project} allProjects={allProjects} />;
}
