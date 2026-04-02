'use client';

import { Badge } from '@/components/ui/badge';
import { motion, useReducedMotion } from 'motion/react';
import {
  fadeInUpVariants,
  heroVariants,
  scaleInVariants,
  staggerContainerVariants,
} from '@/utils/variants';
import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

const techStack = [
  'TypeScript',
  'React',
  'Next.js',
  'NestJS',
  'C#',
  'Python',
  'FastAPI',
  'ASP.NET Core',
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-24 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        {/* Status Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          style={transformOpacityStyle}
          className="mb-8 flex justify-center"
        >
          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-primary/5 p-4 text-sm backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Available for new opportunities
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="text-center"
        >
          <motion.h1
            variants={fadeInUpVariants}
            style={transformOpacityStyle}
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Hi, I&apos;m</span>
            <span className="mt-2 block bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pb-2">
              Gio Majadas
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUpVariants}
            style={transformOpacityStyle}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            A passionate{' '}
            <span className="font-medium text-foreground">
              software developer
            </span>{' '}
            crafting modern digital experiences. I transform ideas into elegant,
            functional applications that make a difference.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          style={transformOpacityStyle}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group gap-2 shadow-lg shadow-primary/25"
          >
            <Link href="/projects">
              View My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/contact">
              Get in Touch
              <ExternalLink className="size-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          transition={{ delay: shouldReduceMotion ? 0 : 0.6 }}
          className="mt-16"
        >
          <motion.p
            variants={fadeInUpVariants}
            className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground"
          >
            Technologies I Work With
          </motion.p>
          <motion.div
            variants={staggerContainerVariants}
            className="flex flex-wrap justify-center gap-2"
          >
            {techStack.map((tech) => (
              <motion.div key={tech} variants={scaleInVariants}>
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm transition-colors duration-200 hover:bg-secondary/80"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
