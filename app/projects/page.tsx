'use client';

import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, type ProjectStatus } from '@/constants/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ExternalLink,
  Filter,
  Sparkles,
  CheckCircle2,
  Clock,
  Code2,
  Archive,
} from 'lucide-react';

// Custom GitHub icon component
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

type FilterType = 'all' | ProjectStatus;

const statusConfig = {
  finished: {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  'in-development': {
    label: 'In Progress',
    icon: Code2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  pending: {
    label: 'Planned',
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  archived: {
    label: 'Archived',
    icon: Archive,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
  },
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 28,
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.status === activeFilter);
  }, [activeFilter]);

  const filters: { label: string; value: FilterType }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Completed', value: 'finished' },
    { label: 'In Progress', value: 'in-development' },
    { label: 'Planned', value: 'pending' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute right-0 top-0 size-150 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 size-125 rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 size-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/3 blur-[80px]" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="mb-16 text-center"
        >
          <div className="mb-6 flex justify-center">
            <Badge
              variant="outline"
              className="gap-2 border-primary/30 bg-primary/5 px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="size-4" />
              <span className="text-sm font-medium">Portfolio Showcase</span>
            </Badge>
          </div>

          <h1 className="mb-6 font-heading text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="block">Showcase</span>
            <span className="bg-linear-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            My project collection of web applications, tools, and experiments showcasing
            modern development journey, practices and creative problem-solving.
          </p>
        </motion.header>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: 0.6 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="size-4" />
            <span className="font-medium">Filter:</span>
          </div>
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              whileHover={{
                scale: shouldReduceMotion ? 1 : 1.05,
                transition: { type: 'spring', stiffness: 400, damping: 17 },
              }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'border-primary/50 bg-primary/10 text-primary shadow-lg shadow-primary/25'
                  : 'border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:bg-card hover:text-foreground'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
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
              <motion.div
                key={project.projectId}
                variants={cardVariants}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                  {/* Image Container */}
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.projectName}
                      fill
                      loading="eager"
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
                              loading='lazy'
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
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                      >
                        <Link href={`/projects/${project.projectId}`}>
                          View Details →
                        </Link>
                      </Button>
                    </div>
                  </CardContent>

                  {/* Decorative corner accent */}
                  <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
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
        )}
      </div>
    </div>
  );
}
