'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { statusConfig } from '@/utils';
import { motion } from 'motion/react';
import type { Projects } from '@/constants';

interface RelatedProjectsProps {
  projects: Projects[];
  currentProjectId: number;
}

export function RelatedProjects({
  projects,
  currentProjectId,
}: RelatedProjectsProps) {
  const relatedProjects = projects
    .filter((p) => p.projectId !== currentProjectId)
    .slice(0, 3);

  return (
    <>
      <Separator className="my-16" />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        aria-labelledby="related-projects-heading"
      >
        <h2
          id="related-projects-heading"
          className="mb-8 text-center font-heading text-3xl font-bold"
        >
          More Projects
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {relatedProjects.map((relatedProject) => {
            const RelatedStatusIcon = statusConfig[relatedProject.status].icon;
            return (
              <li key={relatedProject.projectId}>
                <Link href={`/projects/${relatedProject.projectId}`}>
                  <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={relatedProject.image}
                        alt={relatedProject.projectName}
                        fill
                        loading="lazy"
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
              </li>
            );
          })}
        </ul>
      </motion.section>
    </>
  );
}
