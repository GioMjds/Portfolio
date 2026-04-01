'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  skills,
  skillCategories,
  quickFacts,
  journeyMilestones,
} from '@/constants/about';
import { services } from '@/constants/services';
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Heart,
  MapPin,
  Briefcase,
  Calendar,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  Code2,
  GraduationCap,
  Briefcase,
  Heart,
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Badge
                variant="outline"
                className="gap-2 border-primary/30 bg-primary/5 px-4 py-3"
              >
                <MapPin className="size-3" />
                Laguna, Philippines
              </Badge>

              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                About{' '}
                <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Me
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;m{' '}
                <span className="font-semibold text-foreground">
                  Gio Majadas
                </span>
                , a passionate software developer with a love for building
                modern, user-centric web applications. I specialize in
                full-stack development with a focus on creating seamless digital
                experiences.
              </p>

              <p className="text-muted-foreground">
                With hands-on experience in React, Next.js, Django, and various
                modern technologies, I enjoy turning complex problems into
                elegant solutions. When I&apos;m not coding, you&apos;ll find me
                exploring new technologies, contributing to open-source, or
                enjoying a good cup of coffee.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild className="gap-2">
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/contact">
                    Get in Touch
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Profile Image Placeholder */}
            <motion.div
              variants={itemVariants}
              className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0"
            >
              <Image
                src="/giomjds1.jpg"
                alt="GioMjds's GitHub image"
                width={1200}
                height={800}
                loading="lazy"
                className="rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Separator className="mx-auto max-w-2xl" />

      {/* Quick Facts */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickFacts.map((fact) => {
              const Icon = iconMap[fact.iconName];
              return (
                <motion.div key={fact.label} variants={itemVariants}>
                  <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{fact.value}</p>
                        <p className="text-sm text-muted-foreground">
                          {fact.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <Separator className="mx-auto max-w-2xl" />

      {/* Skills Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <Badge variant="outline" className="mb-4 gap-1">
              <Code2 className="size-3" />
              Tech Stack
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Skills & Technologies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Technologies I&apos;ve been working with to bring ideas to life.
            </p>
          </motion.div>

          <div className="space-y-10">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: categoryIndex * 0.1,
                    },
                  },
                }}
              >
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.3 },
                          },
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card className="group cursor-default overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                          <CardContent className="flex items-center gap-3 px-4 py-3">
                            <div className="relative size-6 transition-transform duration-300 group-hover:scale-110">
                              <Image
                                src={skill.icon}
                                alt={skill.name}
                                fill
                                className="object-contain dark:brightness-110"
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-2xl" />

      {/* Services Offered */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <Badge variant="outline" className="mb-4 gap-1">
              <Briefcase className="size-3" />
              Services
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              What I Offer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Comprehensive development services to bring your vision to life.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4">
                      <h3 className="mb-2 font-heading text-xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div>
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Key Features
                        </h4>
                        <ul className="space-y-1.5">
                          {service.features.slice(0, 4).map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                          {service.features.length > 4 && (
                            <li className="text-xs text-muted-foreground/70">
                              +{service.features.length - 4} more...
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  {/* Hover effect */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Separator className="mx-auto max-w-2xl" />

      {/* Timeline/Journey Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="mb-12 text-center"
          >
            <Badge variant="outline" className="mb-4 gap-1">
              <Calendar className="size-3" />
              Journey
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              My Journey
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Key milestones in my development career.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="relative space-y-8"
          >
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border sm:left-1/2 sm:-translate-x-1/2" />

            {journeyMilestones.map((milestone, index) => {
              const Icon = iconMap[milestone.iconName];
              return (
                <motion.div
                  key={milestone.year}
                  variants={itemVariants}
                  className={`relative flex items-start gap-6 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background sm:left-1/2">
                    <Icon className="size-4 text-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                    }`}
                  >
                    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardContent className="p-5">
                        <Badge variant="secondary" className="mb-2">
                          {milestone.year}
                        </Badge>
                        <h3 className="mb-2 font-heading text-lg font-semibold">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card">
              <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:p-12">
                <Badge variant="secondary" className="gap-1">
                  <Heart className="size-3" />
                  Let&apos;s Connect
                </Badge>
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  Interested in Working Together?
                </h2>
                <p className="max-w-lg text-muted-foreground">
                  I&apos;m always open to discussing new projects, creative
                  ideas, or opportunities to be part of your vision.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/contact">
                      Start a Conversation
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link
                      href="https://github.com/giomjds"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/programming-icons-svg/github-original.svg"
                        alt="GitHub"
                        width={16}
                        height={16}
                        className="dark:invert"
                      />
                      View GitHub
                    </Link>
                  </Button>
                </div>
              </CardContent>
              {/* Decorative gradient orbs */}
              <div className="pointer-events-none absolute -right-24 -top-24 size-48 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 size-48 rounded-full bg-primary/10 blur-3xl" />
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
