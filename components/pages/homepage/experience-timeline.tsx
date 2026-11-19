'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { journeyCommits } from '@/constants/home';
import { EASE_OUT } from '@/lib/ease';
import { gsap, MEDIA, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { SectionIntro } from './section-intro';

export function ExperienceTimeline() {
  const scope = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  // GSAP scrubs the branch line down the log; motion reveals each commit.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOK, () => {
        const line = lineRef.current;
        if (!line) return;
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: line.parentElement,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: 0.5,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionIntro chapter={5} label="The journey" title="The journey so far">
          No straight line, just a lot of commits. Here&apos;s the log, oldest
          first.
        </SectionIntro>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-xl shadow-foreground/5 backdrop-blur-sm">
          <div className="flex items-center gap-2 border-b border-border/70 px-4 py-3 font-mono text-xs text-muted-foreground">
            <span aria-hidden="true" className="text-brand">
              $
            </span>
            <span>git log --reverse journey</span>
            <span
              aria-hidden="true"
              className="h-3.5 w-1.5 animate-pulse bg-muted-foreground/60 motion-reduce:animate-none"
            />
          </div>

          <div className="relative px-5 py-8 sm:px-8">
            <span
              aria-hidden="true"
              className="absolute top-10 bottom-10 left-[29px] w-px bg-border sm:left-[41px]"
            />
            <span
              ref={lineRef}
              aria-hidden="true"
              className="absolute top-10 bottom-10 left-[29px] w-px origin-top bg-brand sm:left-[41px]"
            />

            <ol className="space-y-10">
              {journeyCommits.map((commit) => {
                const isNext = commit.type === 'next';
                return (
                  <motion.li
                    key={commit.title}
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="relative pl-10"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute top-1 left-0 flex size-[19px] items-center justify-center rounded-full border bg-card',
                        isNext
                          ? 'border-dashed border-brand'
                          : 'border-border',
                      )}
                    >
                      <span
                        className={cn(
                          'size-[7px] rounded-full',
                          isNext ? 'animate-pulse bg-brand motion-reduce:animate-none' : 'bg-foreground/70',
                        )}
                      />
                    </span>

                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
                      <span
                        className={cn(
                          'rounded-md border px-1.5 py-0.5',
                          isNext
                            ? 'border-brand/40 text-brand'
                            : 'border-border',
                        )}
                      >
                        {commit.type}
                      </span>
                      {commit.when && <span>{commit.when}</span>}
                    </p>
                    <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight sm:text-xl">
                      {commit.title}
                    </h3>
                    <p className="mt-1.5 leading-relaxed text-pretty text-muted-foreground">
                      {commit.body}
                    </p>

                    {isNext && (
                      <Link
                        href="/contact"
                        className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                      >
                        Start a conversation
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
