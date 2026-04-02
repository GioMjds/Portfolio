import 'server-only';
import { cache } from 'react';
import type { Projects } from '@/constants/projects';

const loadProjects = cache(async (): Promise<Projects[]> => {
  const projectConstants = await import('@/constants/projects');
  return projectConstants.projects;
});

export async function getProjects(): Promise<Projects[]> {
  return loadProjects();
}

export const getProjectById = cache(
  async (projectId: number): Promise<Projects | null> => {
    const allProjects = await loadProjects();
    return allProjects.find((project) => project.projectId === projectId) ?? null;
  },
);
