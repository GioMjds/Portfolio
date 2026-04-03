'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Home, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  containerVariants,
  glowVariants,
  itemVariants,
} from '@/utils/variants';

export default function NotFound() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24"
    >
      <motion.div
        variants={glowVariants}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-120 w-120 rounded-full bg-primary/10 blur-[120px] dark:bg-primary/15" />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-border/50 bg-card/60 shadow-lg backdrop-blur-sm"
      >
        <SearchX className="size-8 text-primary" />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="mb-2 select-none font-heading text-[9rem] font-extrabold leading-none tracking-tighter text-transparent sm:text-[12rem]"
        style={{
          WebkitTextStroke: '2px',
          WebkitTextStrokeColor: 'oklch(var(--primary) / 0.25)',
          backgroundImage:
            'linear-gradient(135deg, oklch(0.72 0.18 280), oklch(0.55 0.22 320))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        404
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="mb-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Page Not Found
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-10 max-w-md text-center text-base text-muted-foreground sm:text-lg"
      >
        Looks like this project link has gone missing — it may have been moved,
        renamed, or it never existed.
      </motion.p>

      <motion.div
        variants={itemVariants}
        aria-hidden="true"
        className="mb-10 flex items-center gap-3"
      >
        <span className="h-px w-16 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-primary/50" />
        <span className="h-px w-16 rounded-full bg-border" />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-3"
      >
        <Button asChild variant="outline" size="lg" className="gap-2">
          <Link href="/projects">
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </Button>

        <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
          <Link href="/">
            <Home className="size-4" />
            Go Home
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
