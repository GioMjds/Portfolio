'use client';

import { TicketCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { getCertificateStats, type Certificate } from '@/constants';

interface HeaderProps {
  certificates: Certificate[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
    },
  },
};

export function Header({ certificates }: HeaderProps) {
  const stats = getCertificateStats(certificates);

  return (
    <motion.header
      className="space-y-8 text-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-4">
        <motion.div variants={itemVariants}>
          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-primary/5 px-4 py-3 text-sm"
          >
            <TicketCheck className="size-3" />
            Credentials and Certifications
          </Badge>
        </motion.div>
        <motion.h1
          className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          variants={itemVariants}
        >
          Verified
          <span className="block bg-linear-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent pb-2">
            Learning Journey
          </span>
        </motion.h1>
        <motion.p
          className="mx-auto max-w-3xl text-lg text-muted-foreground"
          variants={itemVariants}
        >
          A curated and verifiable timeline of credentials across frontend,
          backend, database, AI, analytics, and cybersecurity, as well as other
          achievements that demonstrate a commitment to continuous learning and
          growth in the tech industry.
        </motion.p>
      </div>

      <motion.div
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
      >
        <motion.div
          className="rounded-xl border border-border/60 bg-card/60 p-4"
          variants={statsVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <p className="text-sm text-muted-foreground">Total certificates</p>
          <p className="font-heading text-2xl font-semibold">
            {stats.totalCertificates}
          </p>
        </motion.div>
        <motion.div
          className="rounded-xl border border-border/60 bg-card/60 p-4"
          variants={statsVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <p className="text-sm text-muted-foreground">Latest year</p>
          <p className="font-heading text-2xl font-semibold">
            {stats.latestYear}
          </p>
        </motion.div>
        <motion.div
          className="rounded-xl border border-border/60 bg-card/60 p-4"
          variants={statsVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <p className="text-sm text-muted-foreground">Featured credentials</p>
          <p className="font-heading text-2xl font-semibold">
            {stats.featuredCount}
          </p>
        </motion.div>
        <motion.div
          className="rounded-xl border border-border/60 bg-card/60 p-4"
          variants={statsVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <p className="text-sm text-muted-foreground">Top providers</p>
          <p className="text-sm font-medium text-foreground">
            {stats.topIssuers.join(', ')}
          </p>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
