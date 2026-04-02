'use client';

import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Bot, Code2, Globe, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';
import { Card, CardContent } from '@/components/ui/card';

const highlights = [
  {
    icon: Globe,
    title: 'Full-Stack Web Development',
    description:
      'Dedicated to build modern, responsive, and production-ready web applications using the latest technologies and best practices.',
  },
  {
    icon: Code2,
    title: 'Back-End Engineering',
    description:
      'Dedicated to build robust and scalable backend systems and APIs.',
  },
  {
    icon: Bot,
    title: 'AI Integration',
    description:
      'Dedicated to implement AI features that enhance user experience and add value to applications.',
  },
];

export function Highlights() {
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
            <Sparkles className="size-3" />
            What I Do
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Building Digital Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From concept to deployment, I bring technical expertise and creative
            problem-solving to every project.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {highlights.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeInUpVariants}
              style={transformOpacityStyle}
            >
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
