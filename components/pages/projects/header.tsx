'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { headerVariants } from '@/utils';

export function Header() {
  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="mb-16 text-center"
    >
      <div className="mb-6 flex justify-center">
        <Badge
          variant="outline"
          className="gap-2 border-primary/30 bg-primary/5 px-4 py-3 backdrop-blur-sm"
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
        My project collection of web applications, tools, and experiments
        showcasing modern development journey, practices and creative
        problem-solving.
      </p>
    </motion.header>
  );
}
