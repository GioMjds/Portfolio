import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/constants/projects';
import { ProjectDetailWrapper } from '@/components/pages/projects/[projectID]';

export async function generateMetadata({
  params,
}: PageProps<'/projects/[projectID]'>): Promise<Metadata> {
  const { projectID } = await params;

  const project = projects.find((p) => p.projectId === Number(projectID));

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

  const project = projects.find((p) => p.projectId === Number(projectID));

  if (!project) notFound();

  return <ProjectDetailWrapper project={project} allProjects={projects} />;
}
