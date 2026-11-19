'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  projects,
  type ProjectStatus,
  type Projects,
} from '@/constants/projects';
import { projectStories, type ProjectStory } from '@/constants/home';
import { EASE_OUT } from '@/lib/ease';
import { gsap, MEDIA, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';
import { GithubIcon } from '@/utils';
import { SectionIntro } from './section-intro';

const STATUS_LABEL: Record<ProjectStatus, string> = {
  finished: 'Shipped',
  'in-development': 'Still building',
  pending: 'Up next',
  archived: 'Archived',
};

// Widened lookup: `satisfies` keeps the literal keys, which a number can't index.
const stories: Partial<Record<number, ProjectStory>> = projectStories;

const flagshipChapters = projects.flatMap((project) => {
  const story = stories[project.projectId];
  return project.problemStatement && story ? [{ project, story }] : [];
});

export function FlagshipShowcase() {
  const scope = useRef<HTMLElement>(null);

  // GSAP owns only the [data-story-line] fills: each one scrubs down its
  // chapter's beats as the reader scrolls. motion owns every other element.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOK, () => {
        gsap.utils
          .toArray<HTMLElement>('[data-story-line]')
          .forEach((line) => {
            gsap.fromTo(
              line,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: line.parentElement,
                  start: 'top 70%',
                  end: 'bottom 55%',
                  scrub: 0.5,
                },
              },
            );
          });
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionIntro chapter={4} label="Proof of work" title="Proof of work">
          A few builds, told as short stories: the itch, the build, and where
          each one stands today.
        </SectionIntro>

        <ol className="space-y-24 sm:space-y-36">
          {flagshipChapters.map(({ project, story }, index) => (
            <StoryChapter
              key={project.projectId}
              project={project}
              story={story}
              index={index}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

interface StoryChapterProps {
  project: Projects;
  story: ProjectStory;
  index: number;
}

function StoryChapter({ project, story, index }: StoryChapterProps) {
  const reduce = useReducedMotion();
  const number = String(index + 1).padStart(2, '0');
  const headingId = `story-${project.projectId}`;
  const checkpoints =
    project.performanceMetric
      ?.split('|')
      .map((item) => item.trim())
      .filter(Boolean) ?? [];

  const beats = [
    { label: 'The itch', body: story.itch },
    { label: 'The build', body: story.build },
  ];

  return (
    <li>
      <article
        aria-labelledby={headingId}
        className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16"
      >
        {/* Visual: sticks beside the story on desktop */}
        <div
          className={cn(
            'lg:sticky lg:top-28',
            index % 2 === 1 && 'lg:order-last',
          )}
        >
          <motion.div
            initial={
              reduce
                ? false
                : { clipPath: 'inset(10% 10% 10% 10% round 24px)', opacity: 0 }
            }
            whileInView={{
              clipPath: 'inset(0% 0% 0% 0% round 16px)',
              opacity: 1,
            }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-foreground/5"
          >
            <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
                <span className="size-2.5 rounded-full bg-border" />
              </span>
              <span className="mx-auto truncate font-mono text-xs text-muted-foreground">
                chapter-{number} / {project.projectName}
              </span>
            </div>
            <div className="relative aspect-video overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={`${project.projectName} screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </div>
          </motion.div>

          <ul
            aria-label={`${project.projectName} tech stack`}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.stacks.map((stack) => (
              <li key={stack.name}>
                <Badge
                  variant="outline"
                  className="gap-1.5 bg-background/70 backdrop-blur-sm"
                >
                  <Image
                    src={stack.icon}
                    alt=""
                    width={14}
                    height={14}
                    className="size-3.5"
                  />
                  {stack.name}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {/* Story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerVariants}
          className="relative"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 right-0 select-none font-heading text-8xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_var(--border)] sm:text-9xl"
          >
            {number}
          </span>

          <motion.p
            variants={fadeInUpVariants}
            className="relative flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            <span className="text-brand">Chapter {number}</span>
            <span aria-hidden="true">·</span>
            <span>{STATUS_LABEL[project.status]}</span>
          </motion.p>

          <motion.h3
            id={headingId}
            variants={fadeInUpVariants}
            className="relative mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {project.projectName}
          </motion.h3>
          <motion.p
            variants={fadeInUpVariants}
            className="relative mt-2 text-sm italic text-muted-foreground"
          >
            {story.episode}
          </motion.p>
          <motion.p
            variants={fadeInUpVariants}
            className="relative mt-5 text-lg text-pretty text-foreground/90 sm:text-xl"
          >
            {story.logline}
          </motion.p>

          {/* Beats, with a progress line that fills on scroll */}
          <div className="relative mt-10 pl-8">
            <span
              aria-hidden="true"
              className="absolute top-1.5 bottom-1.5 left-[5px] w-px bg-border"
            />
            <span
              aria-hidden="true"
              data-story-line
              className="absolute top-1.5 bottom-1.5 left-[5px] w-px origin-top bg-brand"
            />
            <ol className="space-y-8">
              {beats.map((beat) => (
                <motion.li
                  key={beat.label}
                  variants={fadeInUpVariants}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-8 size-[11px] rounded-full border-2 border-brand bg-background"
                  />
                  <h4 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {beat.label}
                  </h4>
                  <p className="mt-2 leading-relaxed text-pretty text-foreground/85">
                    {beat.body}
                  </p>
                </motion.li>
              ))}
  
              {checkpoints.length > 0 && (
                <motion.li variants={fadeInUpVariants} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-8 size-[11px] rounded-full bg-brand"
                  />
                  <h4 className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Where it landed
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {checkpoints.map((checkpoint) => (
                      <li
                        key={checkpoint}
                        className="flex items-start gap-2.5 text-sm text-foreground/85"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-brand"
                        />
                        {checkpoint}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              )}
            </ol>
          </div>

          <motion.div
            variants={fadeInUpVariants}
            className="relative mt-10 flex flex-wrap gap-3"
          >
            <Button asChild className="group/cta gap-2">
              <Link href={`/projects/${project.projectId}`}>
                Read the full story
                <span className="sr-only"> of {project.projectName}</span>
                <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </Button>
            {project.githubLink && (
              <Button asChild variant="outline" className="gap-2">
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="size-4" />
                  Source
                  <span className="sr-only">
                    {' '}
                    for {project.projectName} (opens in a new tab)
                  </span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </article>
    </li>
  );
}
