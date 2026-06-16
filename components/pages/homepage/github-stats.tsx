'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  fadeInUpVariants,
  scaleInVariants,
  staggerContainerVariants,
} from '@/utils/variants';

const GITHUB_USERNAME = 'GioMjds';

const statsCards = [
  {
    src: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=8b5cf6&text_color=a1a1aa&icon_color=8b5cf6`,
    alt: `${GITHUB_USERNAME}'s GitHub Stats`,
  },
  {
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=8b5cf6&text_color=a1a1aa`,
    alt: `${GITHUB_USERNAME}'s Top Languages`,
  },
];

export function GithubStats() {
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
            <GitBranch className="size-3" />
            Open Source
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            GitHub Activity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A snapshot of my open-source contributions and the languages I work
            with most.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerVariants}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {statsCards.map(({ src, alt }) => (
            <motion.div
              key={alt}
              variants={scaleInVariants}
              style={transformOpacityStyle}
            >
              <Card className="overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUpVariants}
          className="mt-8 text-center"
        >
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full GitHub Profile
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
