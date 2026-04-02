'use client';

import { motion } from 'motion/react';
import { containerVariants, fadeInUpVariants, itemVariants } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { services } from '@/constants';
import { Card, CardContent } from '@/components/ui/card';

export function Services() {
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
            <Briefcase className="size-3" />
            Services
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            What I Offer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Comprehensive development services to bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 font-heading text-xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-4">
                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Key Features
                      </h4>
                      <ul className="space-y-1.5">
                        {service.features.slice(0, 4).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        ))}
                        {service.features.length > 4 && (
                          <li className="text-xs text-muted-foreground/70">
                            +{service.features.length - 4} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
