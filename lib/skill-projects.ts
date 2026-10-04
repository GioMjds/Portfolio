import type { Skill } from '@/constants/about';
import type { Projects, ProjectStatus } from '@/constants/projects';

export interface SkillProject {
  id: number;
  name: string;
  image: string;
  description: string;
  status: ProjectStatus;
}

/**
 * Skill name -> extra stack names that count as the same technology.
 * Only add an entry when the two lists genuinely disagree on naming; matching
 * stays exact (case-insensitive) otherwise, so "React" never matches
 * "React Native".
 */
const STACK_ALIASES: Record<string, string[]> = {
  Express: ['Express.js'],
};

const normalize = (value: string) => value.trim().toLowerCase();

/**
 * Maps each skill to the projects whose `stacks` list it.
 * Skills with no matching project are omitted, so a missing key means "not
 * linked to any project" and the UI can leave that tile non-interactive.
 */
export function buildSkillProjects(
  skills: readonly Skill[],
  projects: readonly Projects[],
): Record<string, SkillProject[]> {
  const result: Record<string, SkillProject[]> = {};

  for (const skill of skills) {
    const accepted = new Set(
      [skill.name, ...(STACK_ALIASES[skill.name] ?? [])].map(normalize),
    );

    const matches = projects
      .filter((project) =>
        project.stacks.some((stack) => accepted.has(normalize(stack.name))),
      )
      .map((project) => ({
        id: project.projectId,
        name: project.projectName,
        image: project.image,
        description: project.description,
        status: project.status,
      }));

    if (matches.length > 0) {
      result[skill.name] = matches;
    }
  }

  return result;
}
