'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RevealHeading } from '@/components/motion/reveal-heading';
import { scaleInVariants } from '@/utils/variants';

export function CallToAction() {
  return (
    <section className="pt-8 pb-16 sm:pb-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={scaleInVariants}
        className="cta-orbit mx-auto max-w-5xl rounded-3xl p-px shadow-2xl shadow-foreground/5"
      >
        <div className="relative overflow-hidden rounded-[calc(var(--radius-3xl)-1px)] bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full"
            style={{
              background:
                'radial-gradient(closest-side, color-mix(in oklch, var(--brand) 14%, transparent), transparent)',
            }}
          />
          <p className="relative mb-5 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-brand tabular-nums">03</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            Theory, meet practice
          </p>
          <RevealHeading
            text="Certificates show what I studied."
            className="relative mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl"
          />
          <p className="relative mx-auto mt-5 max-w-lg text-pretty text-muted-foreground sm:text-lg">
            The projects show what I built with it. Go see the receipts in
            action, or say hi.
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="group gap-2">
              <Link href="/projects">
                See the projects
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
