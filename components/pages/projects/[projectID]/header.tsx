'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { headerVariants, itemVariants, statusConfig } from '@/utils';
import { ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { GithubIcon } from '@/utils';
import type { Projects } from '@/constants';

interface HeaderProps {
  project: Projects;
}

export function Header({ project }: HeaderProps) {
  const StatusIcon = statusConfig[project.status].icon;

  return (
    <>
      <motion.div variants={itemVariants} className="mb-8">
        <Button asChild variant="ghost" size="sm" className="gap-2">
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </Button>
      </motion.div>

      <motion.header variants={headerVariants} className="mb-12">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-primary/5 px-3 py-4 backdrop-blur-sm"
          >
            <Sparkles className="size-3.5" />
            <span className="text-sm font-medium">Project Details</span>
          </Badge>
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm ${statusConfig[project.status].bg} ${statusConfig[project.status].border}`}
          >
            <StatusIcon
              className={`size-3.5 ${statusConfig[project.status].color}`}
            />
            <span
              className={`text-sm font-semibold ${statusConfig[project.status].color}`}
            >
              {statusConfig[project.status].label}
            </span>
          </div>
        </div>

        <h1 className="mb-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {project.projectName}
        </h1>

        <p className="max-w-3xl text-lg text-muted-foreground sm:text-xl">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveLink && (
            <Button
              asChild
              size="lg"
              className="gap-2 shadow-lg shadow-primary/25"
            >
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="size-4" />
                View Live Demo
              </Link>
            </Button>
          )}
          {project.githubLink && (
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="size-4" />
                View on GitHub
              </Link>
            </Button>
          )}
        </div>
      </motion.header>
    </>
  );
}
