'use client';

import type { PointerEvent } from 'react';
import { motion } from 'motion/react';
import { Bot, Cpu, Globe, Server, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';
import { SectionIntro } from './section-intro';

const highlights = [
  {
    icon: Globe,
    title: 'I build the whole thing',
    description:
      'Modern, responsive web apps, from the database schema all the way to the last hover state. No hand-offs in between.',
    span: 'lg:col-span-4',
  },
  {
    icon: Server,
    title: 'Backends that hold up',
    description:
      'Data models and APIs designed to stay simple as the features pile on.',
    span: 'lg:col-span-2',
  },
  {
    icon: Bot,
    title: 'AI where it actually helps',
    description:
      'AI features that make an app more useful. The assistant on this site is one of them.',
    span: 'lg:col-span-2',
  },
  {
    icon: WifiOff,
    title: 'Offline is a feature',
    description:
      'Apps that keep working when the connection does not, backed by local SQLite.',
    span: 'lg:col-span-2',
  },
  {
    icon: Cpu,
    title: 'Software, meet hardware',
    description:
      'Coin acceptors, printers, and serial devices. I write the code that makes them behave.',
    span: 'lg:col-span-2',
  },
];

/** Feeds the cursor position to the card's spotlight gradient. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--x', `${event.clientX - rect.left}px`);
  el.style.setProperty('--y', `${event.clientY - rect.top}px`);
}

export function Highlights() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionIntro chapter={2} label="What I do" title="The short version">
          Give me a problem and a blank repo. Here&apos;s what usually comes
          out the other side.
        </SectionIntro>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6"
        >
          {highlights.map(({ icon: Icon, title, description, span }, i) => (
            <motion.li
              key={title}
              variants={fadeInUpVariants}
              onPointerMove={trackPointer}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-foreground/5',
                i === 0 && 'sm:col-span-2',
                span,
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), color-mix(in oklch, var(--brand) 12%, transparent), transparent 70%)',
                }}
              />
              <div className="relative">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-border/70 bg-background text-foreground transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                  <Icon aria-hidden="true" className="size-5" />
                </div>
                <h3
                  className={cn(
                    'font-heading font-semibold tracking-tight',
                    i === 0 ? 'text-2xl' : 'text-lg',
                  )}
                >
                  {title}
                </h3>
                <p
                  className={cn(
                    'mt-2 text-pretty text-muted-foreground',
                    i === 0 ? 'max-w-md' : 'text-sm',
                  )}
                >
                  {description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
