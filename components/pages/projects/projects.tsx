'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Filter } from 'lucide-react';
import {
  cardVariants,
  containerVariants,
  GithubIcon,
  statusConfig,
} from '@/utils';
import { projects, type ProjectStatus } from '@/constants';

type FilterType = 'all' | ProjectStatus;

interface ProjectsProps {
  activeFilter: FilterType;
}

export function Projects({ activeFilter }: ProjectsProps) {
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.status === activeFilter);
  }, [activeFilter]);

  if (filteredProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-24 text-center"
      >
        <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
          <Filter className="size-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-semibold">No projects found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to see more projects.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key={activeFilter}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {filteredProjects.map((project) => {
        const StatusIcon = statusConfig[project.status].icon;

        return (
          <motion.div key={project.projectId} variants={cardVariants}>
            <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.projectName}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />

                {/* Holographic status badge */}
                <div className="absolute right-3 top-3">
                  <div
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-xl ${statusConfig[project.status].bg} ${statusConfig[project.status].border}`}
                  >
                    <StatusIcon
                      className={`size-3.5 ${statusConfig[project.status].color}`}
                    />
                    <span
                      className={`text-xs font-semibold ${statusConfig[project.status].color}`}
                    >
                      {statusConfig[project.status].label}
                    </span>
                  </div>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <CardContent className="flex flex-col gap-4 p-6">
                {/* Title */}
                <div>
                  <h3 className="mb-2 font-heading text-xl font-bold tracking-tight line-clamp-1 group-hover:text-primary sm:text-2xl">
                    {project.projectName}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.stacks.slice(0, 4).map((stack) => (
                    <div
                      key={stack.name}
                      className="flex items-center gap-1.5 rounded-md border border-border/50 bg-background/50 px-2.5 py-1"
                    >
                      <div className="relative size-3.5">
                        <Image
                          src={stack.icon}
                          alt={stack.name}
                          fill
                          loading="lazy"
                          sizes="24px"
                          className="object-contain dark:brightness-110"
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {stack.name}
                      </span>
                    </div>
                  ))}
                  {project.stacks.length > 4 && (
                    <div className="flex items-center rounded-md border border-border/50 bg-background/50 px-2.5 py-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        +{project.stacks.length - 4}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {project.liveLink && (
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 gap-2 shadow-lg shadow-primary/25"
                    >
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-3.5" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="size-3.5" />
                        GitHub
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="sm" className="gap-2">
                    <Link href={`/projects/${project.projectId}`}>
                      View Details →
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
