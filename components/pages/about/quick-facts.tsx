'use client';

import { motion } from 'motion/react';
import { quickFacts } from '@/constants';
import { containerVariants, iconMap, itemVariants } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';

export function QuickFacts() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {quickFacts.map((fact) => {
            const Icon = iconMap[fact.iconName];
            return (
              <motion.div key={fact.label} variants={itemVariants}>
                <Card className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{fact.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {fact.label}
                      </p>
                    </div>
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
