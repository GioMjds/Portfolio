'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { itemVariants, statusConfig } from '@/utils';
import {
  CheckCircle2,
  Code2,
  ExternalLink,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { GithubIcon } from '@/utils';
import type { Projects } from '@/constants';

interface MainContentProps {
  project: Projects;
}

export function MainContent({ project }: MainContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasGallery = (project.screenshots?.length ?? 0) > 0;
  const outcomes =
    project.performanceMetric
      ?.split('|')
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  return (
    <section className="grid gap-8 lg:grid-cols-3" aria-label="Project details">
      {/* Left Column - Image & Features */}
      <motion.article variants={itemVariants} className="space-y-8 lg:col-span-2">
        {/* Project Image (the gallery above replaces it when screenshots exist) */}
        {!hasGallery && (
          <Card className="overflow-hidden border-border/50 bg-card">
            <div className="relative aspect-video overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.projectName}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 66vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </Card>
        )}

        {/* Case Study */}
        {(project.problemStatement || project.solutionStatement) && (
          <Card className="border-border/50 bg-card" aria-labelledby="project-case-study-heading">
            <CardContent className="p-6">
              <h2
                id="project-case-study-heading"
                className="mb-6 font-heading text-2xl font-bold"
              >
                The Story
              </h2>
              <dl className="space-y-6">
                {project.problemStatement && (
                  <div className="flex gap-4">
                    <dt className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Target className="size-4 text-primary" aria-hidden="true" />
                      <span className="sr-only">Problem</span>
                    </dt>
                    <dd>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground" aria-hidden="true">
                        Problem
                      </p>
                      <p className="leading-relaxed text-foreground/90">
                        {project.problemStatement}
                      </p>
                    </dd>
                  </div>
                )}
                {project.solutionStatement && (
                  <div className="flex gap-4">
                    <dt className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Lightbulb className="size-4 text-primary" aria-hidden="true" />
                      <span className="sr-only">Solution</span>
                    </dt>
                    <dd>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground" aria-hidden="true">
                        Solution
                      </p>
                      <p className="leading-relaxed text-foreground/90">
                        {project.solutionStatement}
                      </p>
                    </dd>
                  </div>
                )}
                {outcomes.length > 0 && (
                  <div className="flex gap-4">
                    <dt className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="size-4 text-primary" aria-hidden="true" />
                      <span className="sr-only">Outcome</span>
                    </dt>
                    <dd className="min-w-0 flex-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground" aria-hidden="true">
                        Outcome
                      </p>
                      <ul className="grid gap-2 sm:grid-cols-3" role="list">
                        {outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium text-foreground"
                          >
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>
        )}

        {/* Features Section */}
        {project.features && project.features.length > 0 && (
          <Card className="border-border/50 bg-card" aria-labelledby="project-features-heading">
            <CardContent className="p-6">
              <h2
                id="project-features-heading"
                className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold"
              >
                <CheckCircle2 className="size-6 text-primary" />
                Key Features
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.05,
                      duration: 0.3,
                    }}
                    className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/50 p-3"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </motion.article>

      {/* Right Column - Tech Stack & Info */}
      <motion.aside variants={itemVariants} className="space-y-8" aria-label="Project metadata and links">
        {/* Tech Stack */}
        <Card
          className="border-border/50 bg-card/50 backdrop-blur-sm"
          aria-labelledby="project-stack-heading"
        >
          <CardContent className="p-6">
            <h2
              id="project-stack-heading"
              className="mb-4 flex items-center gap-2 font-heading text-xl font-bold"
            >
              <Code2 className="size-5 text-primary" />
              Tech Stack
            </h2>
            <ul className="flex flex-wrap gap-3" role="list">
              {project.stacks.map((stack) => (
                <li
                  key={stack.name}
                  className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2"
                >
                  <div className="relative size-5">
                    <Image
                      src={stack.icon}
                      alt=""
                      aria-hidden="true"
                      fill
                      loading="lazy"
                      sizes="20px"
                      className="object-contain dark:brightness-110"
                    />
                  </div>
                  <span className="text-sm font-medium">{stack.name}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Project Info Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm" aria-labelledby="project-info-heading">
          <CardContent className="p-6">
            <h2 id="project-info-heading" className="mb-4 font-heading text-xl font-bold">
              Project Info
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant="secondary"
                  className={`${statusConfig[project.status].bg} ${statusConfig[project.status].color}`}
                >
                  {statusConfig[project.status].label}
                </Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                <span className="text-sm text-muted-foreground">
                  Technologies
                </span>
                <span className="font-medium">{project.stacks.length} tools</span>
              </div>
              {project.features && (
                <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                  <span className="text-sm text-muted-foreground">
                    Features
                  </span>
                  <span className="font-medium">
                    {project.features.length} features
                  </span>
                </div>
              )}
              {hasGallery && (
                <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                  <span className="text-sm text-muted-foreground">
                    Screenshots
                  </span>
                  <a
                    href="#project-gallery-heading"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {project.screenshots?.length} screens
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Links Card */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm" aria-labelledby="project-links-heading">
          <CardContent className="p-6">
            <h2 id="project-links-heading" className="mb-4 font-heading text-xl font-bold">
              Links
            </h2>
            <div className="space-y-2">
              {project.liveLink && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    Live Demo
                  </Link>
                </Button>
              )}
              {project.githubLink && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="size-4" />
                    GitHub Repository
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.aside>
    </section>
  );
}
