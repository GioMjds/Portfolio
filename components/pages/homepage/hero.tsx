'use client';

import { useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { HeroAskBar } from './hero-ask-bar';
import { Marquee } from '@/components/motion/marquee';
import { gsap, GSAP_EASE, MEDIA, SplitText, useGSAP } from '@/lib/gsap';

const techStack = [
  'TypeScript',
  'React',
  'Next.js',
  'NestJS',
  'C#',
  'ASP.NET Core',
  'Python',
  'FastAPI',
  'SQLite',
  'ESP32',
  'Arduino',
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Intro timeline: badge → masked word reveal of the headline → copy, ask
  // bar, CTAs and stack row. Reduced motion skips it; the CSS in globals.css
  // only hides [data-intro-item] when motion is allowed.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOK, () => {
        const heading = headingRef.current;
        if (!heading) return;
        const q = gsap.utils.selector(scope);
        const badge = q('[data-intro="badge"]');
        const rest = q('[data-intro="rest"]');

        const split = SplitText.create(heading, {
          type: 'words',
          mask: 'words',
          aria: 'auto',
        });

        const tl = gsap.timeline({
          defaults: { ease: GSAP_EASE, duration: 1 },
          // Restore the original markup: no lingering masks clipping
          // descenders, and screen readers get the plain heading.
          onComplete: () => split.revert(),
        });

        tl.fromTo(badge, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 })
          .set(heading, { autoAlpha: 1 }, 0.1)
          .from(
            split.words,
            { yPercent: 110, duration: 1.1, stagger: 0.07 },
            0.1,
          )
          .fromTo(
            rest,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, stagger: 0.1 },
            0.55,
          );

        return () => split.revert();
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative overflow-hidden px-4 pb-8 pt-24 sm:pb-24 sm:pt-16"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Status Badge */}
        <div
          data-intro-item
          data-intro="badge"
          className="mb-6 flex justify-center"
        >
          <Badge
            variant="outline"
            className="gap-2 border-primary/30 bg-primary/5 p-4 text-sm backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Open to freelance and full-time work
          </Badge>
        </div>

        {/* Main Heading */}
        <div className="text-center">
          <h1
            ref={headingRef}
            data-intro-item
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">One developer.</span>
            <span className="mt-2 block pb-2 text-muted-foreground">
              Whole product.
            </span>
          </h1>
          <p
            data-intro-item
            data-intro="rest"
            className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            I&apos;m{' '}
            <span className="font-semibold text-foreground">Gio Majadas</span>.
            I design, build, and deploy full-stack web, mobile, and AI products
            on my own, from database to interface.
          </p>
        </div>

        {/* Ask my portfolio */}
        <div data-intro-item data-intro="rest">
          <HeroAskBar />
        </div>

        {/* CTA Buttons */}
        <div
          data-intro-item
          data-intro="rest"
          className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group gap-2 shadow-lg shadow-primary/25"
          >
            <Link href="/projects">
              See what I&apos;ve built
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/contact">
              Get in Touch
              <ExternalLink className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="gap-2">
            <a href="/Gio_Majadas_Resume.pdf" download>
              <Download className="size-4" />
              Download Resume
            </a>
          </Button>
        </div>

        {/* Tech Stack Pills */}
        <div data-intro-item data-intro="rest" className="mt-12">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What I ship with
          </p>
          {/* Scrolling strip; reduced motion gets the static wrapped list. */}
          <Marquee
            speed={35}
            gap="0.5rem"
            className="mx-auto max-w-3xl motion-reduce:hidden"
          >
            {techStack.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </Marquee>
          <ul className="hidden flex-wrap justify-center gap-2 motion-reduce:flex">
            {techStack.map((tech) => (
              <li key={tech}>
                <TechBadge tech={tech} />
              </li>
            ))}
          </ul>
        </div>

        {/* Scroll cue into the prologue */}
        <a
          href="#prologue"
          data-intro-item
          data-intro="rest"
          className="mx-auto mt-14 hidden w-fit flex-col items-center gap-3 rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          The story starts here
          <span
            aria-hidden="true"
            className="relative h-10 w-px overflow-hidden bg-border"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-brand motion-reduce:hidden" />
          </span>
        </a>
      </div>
    </section>
  );
}

function TechBadge({ tech }: { tech: string }) {
  return (
    <Badge
      variant="outline"
      className="border-border/70 bg-background px-3 py-1 text-sm text-foreground transition-colors duration-200 hover:bg-secondary"
    >
      {tech}
    </Badge>
  );
}
