'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Trophy, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  fadeInUpVariants,
  staggerContainerVariants,
  cardVariants,
} from '@/utils/variants';
import { projects, type Projects } from '@/constants/projects';

export function FlagshipShowcase() {
  const flagshipProjects = useMemo<Projects[]>(
    () => projects.filter((p) => p.problemStatement),
    [],
  );

  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Trophy className="size-3" />
            Flagship Projects
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Proof of Work
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real projects with real challenges, engineered solutions, and
            measurable outcomes.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {flagshipProjects.map((project) => (
            <motion.div
              key={project.projectId}
              variants={cardVariants}
              style={transformOpacityStyle}
            >
              <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold">
                    {project.projectName}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.stacks.map((stack) => (
                      <Badge
                        key={stack.name}
                        variant="secondary"
                        className="text-xs"
                      >
                        {stack.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Problem
                    </p>
                    <p className="mt-1 text-sm text-foreground/80">
                      {project.problemStatement}
                    </p>
                  </div>

                  {project.solutionStatement && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Solution
                      </p>
                      <p className="mt-1 text-sm text-foreground/80">
                        {project.solutionStatement}
                      </p>
                    </div>
                  )}

                  {project.performanceMetric && (
                    <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                      <p className="text-sm font-semibold text-primary">
                        {project.performanceMetric}
                      </p>
                    </div>
                  )}

                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View on GitHub
                      <ArrowUpRight className="size-3" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
