'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { projects } from '@/constants/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Code2,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, statusConfig } from '@/utils';

// Animation variants
const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function ProjectDetailPage({
  params,
}: PageProps<'/projects/[projectID]'>) {
  const { projectID } = use(params);
  const shouldReduceMotion = useReducedMotion();

  const project = projects.find((p) => p.projectId === Number(projectID));

  if (!project) notFound();

  const StatusIcon = statusConfig[project.status].icon;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute right-0 top-0 size-125 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 size-100 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
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

        <Separator className="mb-12" />

        {/* Main Content Grid */}
        <motion.div
          variants={staggerContainerVariants}
          className="grid gap-8 lg:grid-cols-3"
        >
          {/* Left Column - Image & Tech Stack */}
          <motion.div
            variants={itemVariants}
            className="space-y-8 lg:col-span-2"
          >
            {/* Project Image */}
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.projectName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Card>

            {/* Features Section */}
            {project.features && project.features.length > 0 && (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center gap-2 font-heading text-2xl font-bold">
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
          </motion.div>

          {/* Right Column - Tech Stack & Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Tech Stack */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-bold">
                  <Code2 className="size-5 text-primary" />
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.stacks.map((stack, index) => (
                    <motion.div
                      key={stack.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : index * 0.05,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={{
                        scale: shouldReduceMotion ? 1 : 1.05,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                      className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2"
                    >
                      <div className="relative size-5">
                        <Image
                          src={stack.icon}
                          alt={stack.name}
                          fill
                          className="object-contain dark:brightness-110"
                        />
                      </div>
                      <span className="text-sm font-medium">{stack.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Info Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="mb-4 font-heading text-xl font-bold">
                  Project Info
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
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
                    <span className="font-medium">
                      {project.stacks.length} tools
                    </span>
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
                </div>
              </CardContent>
            </Card>

            {/* Links Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="mb-4 font-heading text-xl font-bold">Links</h2>
                <div className="space-y-2">
                  {project.liveLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="size-4" />
                        GitHub Repository
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Related Projects */}
        <Separator className="my-16" />
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-8 text-center font-heading text-3xl font-bold">
            More Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => p.projectId !== project.projectId)
              .slice(0, 3)
              .map((relatedProject) => {
                const RelatedStatusIcon =
                  statusConfig[relatedProject.status].icon;
                return (
                  <motion.div
                    key={relatedProject.projectId}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    whileHover={{
                      y: shouldReduceMotion ? 0 : -8,
                      transition: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                  >
                    <Link href={`/projects/${relatedProject.projectId}`}>
                      <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <Image
                            src={relatedProject.image}
                            alt={relatedProject.projectName}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute right-3 top-3">
                            <div
                              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 backdrop-blur-xl ${statusConfig[relatedProject.status].bg} ${statusConfig[relatedProject.status].border}`}
                            >
                              <RelatedStatusIcon
                                className={`size-3 ${statusConfig[relatedProject.status].color}`}
                              />
                              <span
                                className={`text-xs font-semibold ${statusConfig[relatedProject.status].color}`}
                              >
                                {statusConfig[relatedProject.status].label}
                              </span>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="mb-2 font-heading text-lg font-semibold line-clamp-1 group-hover:text-primary">
                            {relatedProject.projectName}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedProject.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
