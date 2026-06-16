'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { skills, skillCategories } from '@/constants/about';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';

export function TechStack() {
  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  const groupedSkills = useMemo(() => {
    return skillCategories.map((category) => ({
      category,
      items: skills.filter((skill) => skill.category === category),
    }));
  }, []);

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
            <Sparkles className="size-3" />
            Tech Stack
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A curated set of languages, frameworks, and tools I use to build
            modern, performant applications.
          </p>
        </motion.div>

        <div className="space-y-10">
          {groupedSkills.map(({ category, items }) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainerVariants}
            >
              <motion.h3
                variants={fadeInUpVariants}
                className="font-heading mb-4 text-lg font-semibold text-foreground"
              >
                {category}
              </motion.h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeInUpVariants}
                    style={transformOpacityStyle}
                  >
                    <Card className="group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                      <CardContent className="flex items-center gap-3 p-3">
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={24}
                          height={24}
                          className="shrink-0"
                        />
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
