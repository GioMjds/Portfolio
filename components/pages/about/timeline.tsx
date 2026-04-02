'use client';

import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import {
  containerVariants,
  fadeInUpVariants,
  iconMap,
  itemVariants,
} from '@/utils';
import { Badge } from '@/components/ui/badge';
import { journeyMilestones } from '@/constants';
import { Card, CardContent } from '@/components/ui/card';

export function Timeline() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Calendar className="size-3" />
            Journey
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            My Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Key milestones in my development career.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="relative space-y-8"
        >
          {/* Timeline line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border sm:left-1/2 sm:-translate-x-1/2" />

          {journeyMilestones.map((milestone, index) => {
            const Icon = iconMap[milestone.iconName];
            return (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className={`relative flex items-start gap-6 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background sm:left-1/2">
                  <Icon className="size-4 text-primary" />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                  }`}
                >
                  <Card className="overflow-hidden border-border/50 bg-card">
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2">
                        {milestone.year}
                      </Badge>
                      <h3 className="mb-2 font-heading text-lg font-semibold">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
