'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { motion } from 'motion/react';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/ui/tilt-card';
import { quickFacts } from '@/constants';
import { containerVariants, itemVariants } from '@/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:pb-24 sm:pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
            Turning ideas into software, one project at a time.
          </h1>

          <p className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
            An aspiring Software Engineer and 4th-year BSIT student who enjoys
            building software, exploring new technologies, and turning ideas
            into practical solutions through code.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="gap-2">
              <Link href="/projects">
                View Projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer gap-2"
                >
                  <FileText className="size-4" />
                  View Resume
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 sm:max-w-5xl">
                <DialogHeader className="px-6 pt-6">
                  <DialogTitle>Gio Majadas Resume</DialogTitle>
                  <DialogDescription>
                    Preview the latest resume here, or{' '}
                    <Link
                      href={'/Gio_Majadas_Resume.pdf' as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      open it in a new tab
                    </Link>
                    .
                  </DialogDescription>
                </DialogHeader>
                <div className="h-[70vh] px-6 pb-6">
                  <iframe
                    src="/Gio_Majadas_Resume.pdf"
                    title="Gio Majadas Resume"
                    className="h-full w-full rounded-lg border bg-background"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-4">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse gap-0.5">
                <dt className="text-xs text-muted-foreground">{fact.label}</dt>
                <dd className="font-heading text-lg font-semibold tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.figure
          variants={itemVariants}
          className="mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0"
        >
          <TiltCard>
            <Image
              src="/giomjds1.jpg"
              alt="Portrait of Gio Majadas"
              width={732}
              height={732}
              priority
              sizes="(max-width: 640px) 320px, 384px"
              className="aspect-square w-full rounded-[2rem] object-cover shadow-[0_24px_48px_-24px] shadow-primary/40"
            />
          </TiltCard>
        </motion.figure>
      </motion.div>
    </section>
  );
}
