'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { PenTool, type LucideIcon } from 'lucide-react';
import { fadeInUpVariants, iconMap } from '@/utils';
import { journeyMilestones, originStory } from '@/constants';

type Entry = {
  key: string;
  label: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

// Oldest first so the story reads top to bottom; the origin has no date.
const entries: Entry[] = [
  {
    key: 'origin',
    label: 'The start',
    title: 'Designer turned developer',
    description: originStory,
    Icon: PenTool,
  },
  ...[...journeyMilestones].reverse().map((milestone) => ({
    key: milestone.year,
    label: milestone.year,
    title: milestone.title,
    description: milestone.description,
    Icon: iconMap[milestone.iconName],
  })),
];

export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 60%'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

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
            My Journey
          </h2>
          <p className="max-w-[60ch] text-muted-foreground">
            How I got from design files to deployed products.
          </p>
        </motion.div>

        <ol ref={listRef} className="relative space-y-12">
          {/* Rail: static track plus a progress line drawn by scroll. */}
          <span
            aria-hidden
            className="absolute top-5 bottom-5 left-5 w-px -translate-x-1/2 bg-border md:left-[calc(8rem+1.5rem+1.25rem)]"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: shouldReduceMotion ? 1 : progress }}
            className="absolute top-5 bottom-5 left-5 w-px origin-top -translate-x-1/2 bg-primary md:left-[calc(8rem+1.5rem+1.25rem)]"
          />

          {entries.map(({ key, label, title, description, Icon }) => (
            <motion.li
              key={key}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 md:grid-cols-[8rem_2.5rem_1fr] md:gap-x-6"
            >
              <p className="hidden pt-2 text-right font-heading text-sm font-semibold tabular-nums text-muted-foreground md:block">
                {label}
              </p>
              <span className="relative z-10 flex size-10 items-center justify-center rounded-full border border-primary/40 bg-background text-primary">
                <Icon aria-hidden className="size-4" />
              </span>
              <div className="space-y-2 pt-1.5">
                <p className="font-heading text-sm font-semibold tabular-nums text-muted-foreground md:hidden">
                  {label}
                </p>
                <h3 className="font-heading text-xl font-semibold">{title}</h3>
                <p className="max-w-[60ch] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
