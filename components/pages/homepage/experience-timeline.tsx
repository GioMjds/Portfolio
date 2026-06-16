'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Code2, GraduationCap, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';
import { journeyMilestones } from '@/constants/about';

const iconMap = { Code2, Briefcase, GraduationCap } as const;

export function ExperienceTimeline() {
  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <History className="size-3" />
            My Journey
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Experience Timeline
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A timeline of key milestones in my development career — from
            academics to real-world projects.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerVariants}
          className="relative mt-12"
        >
          <div
            className="absolute left-6 top-0 bottom-0 w-px bg-border/50"
            aria-hidden="true"
          />

          {journeyMilestones.map((milestone, index) => {
            const Icon = iconMap[milestone.iconName];

            return (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                style={transformOpacityStyle}
                className="relative mb-8 pl-16 last:mb-0"
              >
                <div className="absolute left-3 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <Icon className="size-3.5" />
                </div>

                <Card className="border-border/50 bg-card">
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2">
                      {milestone.year}
                    </Badge>
                    <h3 className="font-heading text-base font-semibold">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {milestone.description}
                    </p>

                    {milestone.year === '2022' && (
                      <ul className="mt-3 space-y-1 text-sm text-foreground/70">
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          <span>
                            Built <strong>PrintBit</strong> — a coin-operated
                            self-service document printing kiosk
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          <span>
                            Built <strong>Azurea</strong> — a full-stack hotel
                            management system with booking verification
                          </span>
                        </li>
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
