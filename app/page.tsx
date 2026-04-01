"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Code2,
  Laptop,
  Cloud,
  Sparkles,
  ExternalLink,
  GitBranch,
} from "lucide-react";

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

const highlights = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Building modern, responsive web applications with React, Next.js, and TypeScript.",
  },
  {
    icon: Laptop,
    title: "Mobile Apps",
    description:
      "Creating cross-platform mobile experiences with React Native and Flutter.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description:
      "Deploying scalable solutions using AWS, GCP, and modern DevOps practices.",
  },
];

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "AWS",
];

// Animation variants - memoized for performance
const heroVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  // Memoize style objects
  const transformOpacityStyle = useMemo(
    () => ({ willChange: "transform, opacity" }),
    []
  );

  return (
    <div className="relative">
      {/* Hero Section */}
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
              <span className="mt-2 block bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Gio Majadas
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUpVariants}
              style={transformOpacityStyle}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              A passionate{" "}
              <span className="font-medium text-foreground">
                software developer
              </span>{" "}
              crafting modern digital experiences. I transform ideas into
              elegant, functional applications that make a difference.
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
                <motion.div
                  key={tech}
                  variants={scaleInVariants}
                  whileHover={{
                    scale: shouldReduceMotion ? 1 : 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 17 },
                  }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                >
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

      <Separator className="mx-auto max-w-2xl" />

      {/* Highlights Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
            className="mb-12 text-center"
          >
            <Badge variant="outline" className="mb-4 gap-1">
              <Sparkles className="size-3" />
              What I Do
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Building Digital Excellence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From concept to deployment, I bring technical expertise and
              creative problem-solving to every project.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {highlights.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeInUpVariants}
                style={transformOpacityStyle}
                whileHover={{
                  y: shouldReduceMotion ? 0 : -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <motion.div
                      className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                      whileHover={{
                        scale: shouldReduceMotion ? 1 : 1.1,
                        backgroundColor: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        },
                      }}
                    >
                      <Icon className="size-6" />
                    </motion.div>
                    <h3 className="font-heading text-lg font-semibold">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                  {/* Hover gradient effect */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleInVariants}
            style={transformOpacityStyle}
          >
            <Card className="relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card">
              <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:p-12">
                <Badge variant="secondary" className="gap-1">
                  <GitBranch className="size-3" />
                  Open to Collaborate
                </Badge>
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  Let&apos;s Build Something Amazing Together
                </h2>
                <p className="max-w-lg text-muted-foreground">
                  Whether you have a project in mind or just want to chat about
                  technology, I&apos;d love to hear from you.
                </p>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainerVariants}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <motion.div variants={fadeInUpVariants}>
                    <Button asChild size="lg" className="gap-2">
                      <Link href="/contact">
                        Start a Conversation
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div variants={fadeInUpVariants}>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="gap-2"
                    >
                      <Link
                        href="https://github.com/giomjds"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GithubIcon className="size-4" />
                        View GitHub
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </CardContent>
              {/* Decorative gradient orb */}
              <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 size-48 rounded-full bg-primary/10 blur-3xl" />
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
