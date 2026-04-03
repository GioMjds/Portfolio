import 'server-only';

import { cache } from 'react';
import { homepageSkillSet } from '@/constants/home';
import {
  aboutParagraph,
  coreStrengths,
  notableAchievements,
  originStory,
  personalTouch,
  positioningStatement,
  quickFacts,
  skills,
  technicalIdentity,
  valueProposition,
} from '@/constants/about';
import { projects } from '@/constants/projects';
import { certificates } from '@/constants/certifications';
import { services } from '@/constants/services';
import type { KnowledgeSlice, PortfolioKnowledge } from '@/lib/assistant/types';

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function uniqueKeywords(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.toLowerCase())
        .flatMap((value) => value.split(/[^a-z0-9.+#-]+/))
        .map((value) => value.trim())
        .filter((value) => value.length > 2),
    ),
  );
}

function joinFeatures(values: string[]): string {
  return values.map((value) => `- ${value}`).join('\n');
}

export const getPortfolioKnowledge = cache(
  async (): Promise<PortfolioKnowledge> => {
    const identitySlice: KnowledgeSlice = {
      id: 'identity-main',
      section: 'identity',
      title: 'Portfolio Identity',
      content: normalizeText(
        [
          `Positioning: ${positioningStatement}`,
          `Technical identity: ${technicalIdentity}`,
          `About: ${aboutParagraph}`,
          `Origin story: ${originStory}`,
          `Value proposition: ${valueProposition.join('; ')}`,
          `Core strengths: ${coreStrengths.join('; ')}`,
          `Notable achievements: ${notableAchievements.join('; ')}`,
          `Personal interests: ${personalTouch.interests.join(', ')}`,
          `Personal philosophy: ${personalTouch.philosophy}`,
        ].join(' '),
      ),
      keywords: uniqueKeywords([
        'gio',
        'giomjds',
        'who is this',
        'about',
        'bio',
        'background',
        positioningStatement,
        technicalIdentity,
        ...valueProposition,
        ...coreStrengths,
        ...notableAchievements,
        ...personalTouch.interests,
        personalTouch.philosophy,
      ]),
    };

    const quickFactsSlice: KnowledgeSlice = {
      id: 'identity-quick-facts',
      section: 'identity',
      title: 'Quick Facts',
      content: quickFacts
        .map((fact) => `${fact.label}: ${fact.value}`)
        .join(' | '),
      keywords: uniqueKeywords([
        'quick facts',
        'experience',
        'projects built',
        ...quickFacts.map((fact) => fact.label),
        ...quickFacts.map((fact) => fact.value),
      ]),
    };

    const skillsSlice: KnowledgeSlice = {
      id: 'skills-catalog',
      section: 'skills',
      title: 'Skills Catalog',
      content: skills
        .map((skill) => `${skill.category}: ${skill.name}`)
        .join(' | '),
      keywords: uniqueKeywords([
        'skills',
        'tech stack',
        'technologies',
        ...skills.map((skill) => skill.name),
        ...skills.map((skill) => skill.category),
        ...homepageSkillSet,
      ]),
    };

    const homepageSlice: KnowledgeSlice = {
      id: 'homepage-overview',
      section: 'homepage',
      title: 'Homepage Highlights',
      content: `Homepage skill set: ${homepageSkillSet.join(', ')}.`,
      keywords: uniqueKeywords([
        'homepage',
        'home',
        'landing',
        ...homepageSkillSet,
      ]),
    };

    const projectSlices: KnowledgeSlice[] = projects.map((project) => ({
      id: `project-${project.projectId}`,
      section: 'projects',
      title: project.projectName,
      content: normalizeText(
        [
          `Project: ${project.projectName}.`,
          `Status: ${project.status}.`,
          `Description: ${project.description}`,
          `Stacks: ${project.stacks.map((stack) => stack.name).join(', ')}`,
          project.features?.length
            ? `Key features:\n${joinFeatures(project.features)}`
            : 'Key features: not listed.',
          project.githubLink
            ? `GitHub: ${project.githubLink}`
            : 'GitHub: not listed.',
          project.liveLink
            ? `Live link: ${project.liveLink}`
            : 'Live link: not listed.',
        ].join('\n'),
      ),
      keywords: uniqueKeywords([
        'projects',
        project.projectName,
        project.description,
        project.status,
        ...project.stacks.map((stack) => stack.name),
        ...(project.features ?? []),
      ]),
    }));

    const certificationSlices: KnowledgeSlice[] = certificates.map(
      (certificate, index) => ({
        id: `certificate-${index + 1}`,
        section: 'certifications',
        title: certificate.name,
        content: normalizeText(
          `Certificate: ${certificate.name}. Related technologies: ${
            certificate.icons?.join(', ') ?? 'not listed'
          }.`,
        ),
        keywords: uniqueKeywords([
          'certifications',
          'certificates',
          'certificate',
          certificate.name,
          ...(certificate.icons ?? []),
        ]),
      }),
    );

    const serviceSlices: KnowledgeSlice[] = services.map((service, index) => ({
      id: `service-${index + 1}`,
      section: 'services',
      title: service.title,
      content: normalizeText(
        [
          `Service: ${service.title}.`,
          `Description: ${service.description}`,
          `Features: ${service.features.join('; ')}`,
          `Delivers: ${service.delivers.join('; ')}`,
        ].join(' '),
      ),
      keywords: uniqueKeywords([
        'services',
        service.title,
        service.description,
        ...service.features,
        ...service.delivers,
      ]),
    }));

    return {
      slices: [
        identitySlice,
        quickFactsSlice,
        skillsSlice,
        homepageSlice,
        ...projectSlices,
        ...certificationSlices,
        ...serviceSlices,
      ],
    };
  },
);
