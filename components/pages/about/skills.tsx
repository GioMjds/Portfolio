'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { fadeInUpVariants } from '@/utils';
import { skillCategories, skills } from '@/constants';
import { Badge } from '@/components/ui/badge';
import { Code2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Code2 className="size-3" />
            Tech Stack
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Technologies I&apos;ve been working with to bring ideas to life.
          </p>
        </motion.div>

        <div className="space-y-10">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: categoryIndex * 0.1,
                  },
                },
              }}
            >
              <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
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
                      <Card className="group cursor-default overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-md">
                        <CardContent className="flex items-center gap-3 px-4 py-3">
                          <div className="relative size-6 transition-transform duration-300 group-hover:scale-110">
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              fill
                              loading="lazy"
                              sizes="24px"
                              className="object-contain dark:brightness-110"
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
