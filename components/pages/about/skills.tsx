'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { fadeInUpVariants } from '@/utils';
import { skillCategories, skills, type Level, type Skill } from '@/constants';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { SkillProject } from '@/lib/skill-projects';
import { cn } from '@/lib/utils';

type SkillLevel = {
  id: Level;
  label: string;
  description: string;
  bars: number;
};

const levels = [
  {
    id: 'daily',
    label: 'Daily',
    description: 'My default tools. I ship with these every week.',
    bars: 5,
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    description:
      'Built real projects with these. I work without constant docs.',
    bars: 4,
  },
  {
    id: 'working',
    label: 'Working',
    description:
      'Shipped features with these. I keep the docs open and get it done.',
    bars: 3,
  },
  {
    id: 'familiar',
    label: 'Familiar',
    description:
      'Used in coursework or small projects. I can read and modify it, but I would need ramp-up time for production work.',
    bars: 2,
  },
  {
    id: 'exploring',
    label: 'Exploring',
    description:
      'Early experiments and tutorials. Learning it, but not fully comfortable yet relying on it.',
    bars: 1,
  },
] as const satisfies SkillLevel[];

type Chip = {
  card: string;
  content: string;
  icon: string;
  sizes: string;
  text: string;
};

const chipStyles = {
  daily: {
    card: 'border-primary/30 bg-primary/5',
    content: 'gap-3 px-4 py-2.5',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-base font-semibold',
  },
  comfortable: {
    card: 'border-border bg-card',
    content: 'gap-2 px-3 py-2',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-sm font-medium',
  },
  working: {
    card: 'border-border bg-card/80',
    content: 'gap-2 px-3 py-1.5',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-sm',
  },
  familiar: {
    card: 'border-border bg-card/60',
    content: 'gap-2 px-3 py-1.5',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-sm text-muted-foreground',
  },
  exploring: {
    card: 'border-dashed border-border bg-transparent',
    content: 'gap-2 px-2.5 py-1',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-xs text-muted-foreground',
  },
} as const satisfies Record<Level, Chip>;

function LevelMeter({ filled }: { filled: number }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {Array.from({ length: levels.length }, (_, i) => (
        <span
          key={i}
          className={cn(
            'h-1.5 w-4 rounded-full',
            i < filled ? 'bg-primary' : 'bg-border',
          )}
        />
      ))}
    </span>
  );
}

function ChipContent({ skill, style }: { skill: Skill; style: Chip }) {
  return (
    <>
      <span className={cn('relative shrink-0', style.icon)}>
        {/* Decorative: the adjacent text already names the skill. */}
        <Image
          src={skill.icon}
          alt=""
          fill
          loading="lazy"
          sizes={style.sizes}
          className="object-contain dark:brightness-110"
        />
      </span>
      <span className={style.text}>{skill.name}</span>
    </>
  );
}

interface SkillsProps {
  /** Skill name -> projects that use it. Skills without projects are absent. */
  skillProjects: Record<string, SkillProject[]>;
}

const chipBase = 'flex items-center rounded-lg border';

export function Skills({ skillProjects }: SkillsProps) {
  const groups = levels
    .map((level) => ({
      ...level,
      items: skills
        .filter((skill) => skill.level === level.id)
        .sort(
          (a, b) =>
            skillCategories.indexOf(a.category) -
            skillCategories.indexOf(b.category),
        )
        // constants list Firebase twice (Database + Tools); show it once
        .filter(
          (skill, i, all) => all.findIndex((s) => s.name === skill.name) === i,
        ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 space-y-4"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Skills &amp; Technologies
          </h2>
          <p className="max-w-[60ch] text-muted-foreground">
            Grouped by how much I rely on each one, so you can see exactly where
            my ceiling is. Tools with a count open the projects I built with
            them.
          </p>
        </motion.div>

        <div className="space-y-8">
          {groups.map((group) => {
            const style = chipStyles[group.id];
            return (
              <motion.div
                key={group.id}
                role="group"
                aria-labelledby={`skill-level-${group.id}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid gap-3 border-t pt-8 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-6"
              >
                <div className="space-y-2 md:pt-1.5">
                  <h3
                    id={`skill-level-${group.id}`}
                    className="font-heading text-base font-semibold text-foreground"
                  >
                    {group.label}
                  </h3>
                  <LevelMeter filled={group.bars} />
                  <p className="text-sm leading-snug text-muted-foreground">
                    {group.description}
                  </p>
                </div>
                <ul className="flex flex-wrap content-start gap-2">
                  {group.items.map((skill) => {
                    const projects = skillProjects[skill.name];
                    if (!projects) {
                      return (
                        <li
                          key={skill.name}
                          className={cn(chipBase, style.card, style.content)}
                        >
                          <ChipContent skill={skill} style={style} />
                        </li>
                      );
                    }
                    const projectWord =
                      projects.length === 1 ? 'project' : 'projects';
                    return (
                      <li key={skill.name}>
                        <Popover>
                          <PopoverTrigger
                            className={cn(
                              chipBase,
                              style.card,
                              style.content,
                              'cursor-pointer transition-colors duration-200 outline-none hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:border-primary data-[state=open]:bg-primary/10',
                            )}
                          >
                            <ChipContent skill={skill} style={style} />
                            <span
                              aria-hidden
                              className="rounded-full bg-primary/10 px-1.5 text-xs font-medium tabular-nums text-primary"
                            >
                              {projects.length}
                            </span>
                            <span className="sr-only">
                              , used in {projects.length} {projectWord}
                            </span>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-80 gap-3">
                            <PopoverHeader>
                              <PopoverTitle>Built with {skill.name}</PopoverTitle>
                              <PopoverDescription>
                                {projects.length} {projectWord} in my portfolio
                                use it.
                              </PopoverDescription>
                            </PopoverHeader>
                            <ul className="-mx-2 flex flex-col">
                              {projects.map((project) => (
                                <li key={project.id}>
                                  <Link
                                    href={`/projects/${project.id}`}
                                    className="group flex min-h-11 items-center justify-between gap-3 rounded-md px-2 py-2 outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                                  >
                                    <span className="font-medium">
                                      {project.name}
                                    </span>
                                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </PopoverContent>
                        </Popover>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
