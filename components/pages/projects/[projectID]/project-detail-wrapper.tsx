'use client';

import { motion } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import { pageVariants, staggerContainerVariantsProject } from '@/utils';
import {
  Header,
  MainContent,
  RelatedProjects,
} from '@/components/pages/projects/[projectID]';
import type { Projects } from '@/constants';

interface ProjectDetailWrapperProps {
  project: Projects;
  allProjects: Projects[];
}

export function ProjectDetailWrapper({
  project,
  allProjects,
}: ProjectDetailWrapperProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="relative min-h-screen overflow-hidden"
      aria-label="Project detail content"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Header project={project} />

        <Separator className="mb-12" />

        <motion.div variants={staggerContainerVariantsProject}>
          <MainContent project={project} />
        </motion.div>

        <RelatedProjects
          projects={allProjects}
          currentProjectId={project.projectId}
        />
      </div>
    </motion.section>
  );
}
