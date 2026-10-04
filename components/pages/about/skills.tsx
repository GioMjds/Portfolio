'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInUpVariants } from '@/utils';
import { skillCategories, skills, type Level } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
    card: 'border-border/50 bg-card',
    content: 'gap-2 px-3 py-2',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-sm font-medium',
  },
  working: {
    card: 'border-border/45 bg-card/80',
    content: 'gap-2 px-3 py-1.5',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-sm',
  },
  familiar: {
    card: 'border-border/40 bg-card/60',
    content: 'gap-2 px-3 py-1.5',
    icon: 'size-6',
    sizes: '24px',
    text: 'text-sm text-muted-foreground',
  },
  exploring: {
    card: 'border-dashed border-border/40 bg-transparent',
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

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

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
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-10 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Code2 className="size-3" />
            Tech Stack
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Grouped by how much I rely on each one, so you can see exactly where
            my ceiling is.
          </p>
        </motion.div>

        <div className="space-y-6">
          {groups.map((group, groupIndex) => {
            const style = chipStyles[group.id];
            return (
              <motion.div
                key={group.id}
                role="group"
                aria-labelledby={`skill-level-${group.id}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: groupIndex * 0.1,
                    },
                  },
                }}
                className="grid gap-3 border-t border-border/40 pt-6 first:border-t-0 first:pt-0 md:grid-cols-[13rem_1fr] md:gap-6"
              >
                <div className="space-y-2 md:pt-1.5">
                  <h3
                    id={`skill-level-${group.id}`}
                    className="text-sm font-medium uppercase tracking-wider text-foreground"
                  >
                    {group.label}
                  </h3>
                  <LevelMeter filled={group.bars} />
                  <p className="text-sm leading-snug text-muted-foreground">
                    {group.description}
                  </p>
                </div>
                <div className="flex flex-wrap content-start gap-2">
                  {group.items.map((skill) => (
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
                      whileHover={{
                        scale: shouldReduceMotion ? 1 : 1.05,
                        y: shouldReduceMotion ? 0 : -2,
                      }}
                      whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                    >
                      <Card
                        className={cn(
                          'group cursor-default gap-0 overflow-hidden py-0 transition-all duration-300 hover:border-primary/30 hover:shadow-md',
                          style.card,
                        )}
                      >
                        <CardContent
                          className={cn('flex items-center', style.content)}
                        >
                          <div
                            className={cn(
                              'relative transition-transform duration-300 group-hover:scale-110',
                              style.icon,
                            )}
                          >
                            <Image
                              src={skill.icon}
                              alt=""
                              fill
                              loading="lazy"
                              sizes={style.sizes}
                              className="object-contain dark:brightness-110"
                            />
                          </div>
                          <span className={style.text}>{skill.name}</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
