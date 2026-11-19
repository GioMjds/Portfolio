'use client';

import { useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Trophy, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TiltCard } from '@/components/ui/tilt-card';
import {
  fadeInUpVariants,
  staggerContainerVariants,
  cardVariants,
} from '@/utils/variants';
import { projects, type Projects } from '@/constants/projects';
import { RevealHeading } from '@/components/motion/reveal-heading';
import { gsap, MEDIA, useGSAP } from '@/lib/gsap';

/** Clears the sticky navbar when pinned. */
const PIN_TOP_OFFSET = 96;

export function FlagshipShowcase() {
  const flagshipProjects = useMemo<Projects[]>(
    () => projects.filter((p) => p.problemStatement),
    [],
  );

  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Desktop + motion allowed: pin the cards and scrub them sideways as the
  // page scrolls. Everywhere else the server-rendered 2-column grid stays.
  // GSAP moves only trackRef (plain div); motion owns the cards inside it.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MEDIA.pinnable} and ${MEDIA.motionOK}`, () => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        const track = trackRef.current;
        const cards = cardsRef.current;
        if (!section || !pin || !track || !cards) return;

        section.dataset.pinned = 'true';
        const total = flagshipProjects.length;
        const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin,
            pin: true,
            start: `top top+=${PIN_TOP_OFFSET}`,
            end: () => `+=${distance()}`,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!counterRef.current) return;
              const current = Math.round(self.progress * (total - 1)) + 1;
              counterRef.current.textContent = String(current).padStart(2, '0');
            },
          },
        });
        tl.to(track, { x: () => -distance() }, 0).fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1 },
          0,
        );

        // Keyboard users: focusing a card that's off to the side scrolls the
        // page to the point where the track brings it into view.
        const onFocusIn = (event: FocusEvent) => {
          const card = (event.target as Element).closest<HTMLElement>(
            '[data-flag-card]',
          );
          const st = tl.scrollTrigger;
          const max = distance();
          if (!card || !st || max === 0) return;
          const padLeft = parseFloat(getComputedStyle(cards).paddingLeft) || 0;
          const shift = gsap.utils.clamp(0, max, card.offsetLeft - padLeft);
          window.scrollTo({
            top: st.start + (shift / max) * (st.end - st.start),
            behavior: 'instant',
          });
        };
        track.addEventListener('focusin', onFocusIn);

        return () => {
          track.removeEventListener('focusin', onFocusIn);
          delete section.dataset.pinned;
        };
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="group/flag py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Trophy className="size-3" />
            Flagship Projects
          </Badge>
          <RevealHeading
            text="Proof of Work"
            className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
          />
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Real projects with real challenges, engineered solutions, and
            measurable outcomes.
          </p>
        </motion.div>
      </div>

      {/* Pinned viewport (desktop) / plain block (everything else) */}
      <div
        ref={pinRef}
        className="group-data-pinned/flag:flex group-data-pinned/flag:h-[calc(100svh-6rem)] group-data-pinned/flag:flex-col group-data-pinned/flag:justify-center group-data-pinned/flag:overflow-clip"
      >
        <div ref={trackRef} className="relative group-data-pinned/flag:w-max">
          <motion.div
            ref={cardsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainerVariants}
            className="mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2 group-data-pinned/flag:flex group-data-pinned/flag:max-w-none group-data-pinned/flag:gap-8 group-data-pinned/flag:px-[max(1rem,calc((100vw-64rem)/2+1rem))]"
          >
            {flagshipProjects.map((project) => (
              <motion.div
                key={project.projectId}
                data-flag-card
                variants={cardVariants}
                style={transformOpacityStyle}
                className="group-data-pinned/flag:w-[min(54rem,72vw)] group-data-pinned/flag:shrink-0"
              >
                <TiltCard className="h-full">
                  <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 group-data-pinned/flag:flex-row group-data-pinned/flag:gap-0 group-data-pinned/flag:py-0">
                    {/* Landscape card when pinned: image left, content right */}
                    <div className="relative aspect-video overflow-hidden group-data-pinned/flag:aspect-auto group-data-pinned/flag:w-2/5 group-data-pinned/flag:shrink-0">
                      <Image
                        src={project.image}
                        alt={project.projectName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-heading text-lg font-semibold">
                        {project.projectName}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {project.stacks.map((stack) => (
                          <Badge
                            key={stack.name}
                            variant="secondary"
                            className="text-xs"
                          >
                            {stack.name}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Problem
                        </p>
                        <p className="mt-1 text-sm text-foreground/80">
                          {project.problemStatement}
                        </p>
                      </div>

                      {project.solutionStatement && (
                        <div className="mt-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Solution
                          </p>
                          <p className="mt-1 text-sm text-foreground/80">
                            {project.solutionStatement}
                          </p>
                        </div>
                      )}

                      {project.performanceMetric && (
                        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                          <p className="text-sm font-semibold text-primary">
                            {project.performanceMetric}
                          </p>
                        </div>
                      )}

                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-sm text-brand hover:underline"
                        >
                          View on GitHub
                          <ArrowUpRight className="size-3" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress through the pinned row (decorative) */}
        <div
          aria-hidden="true"
          className="mx-auto mt-8 hidden w-full max-w-5xl items-center gap-4 px-4 group-data-pinned/flag:flex"
        >
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            <span ref={counterRef}>01</span> /{' '}
            {String(flagshipProjects.length).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-border">
            <div ref={barRef} className="h-px origin-left scale-x-0 bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
