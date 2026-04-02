'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  fadeInUpVariants,
  GithubIcon,
  scaleInVariants,
  staggerContainerVariants,
} from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  return (
    <section className="px-4 pb-16 sm:pb-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={scaleInVariants}
          style={transformOpacityStyle}
        >
          <Card className="relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:p-12">
              <Badge variant="secondary" className="gap-1">
                <GitBranch className="size-3" />
                Open to Collaborate
              </Badge>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Let&apos;s Build Something Amazing Together
              </h2>
              <p className="max-w-lg text-muted-foreground">
                Whether you have a project in mind or just want to chat about
                technology, I&apos;d love to hear from you.
              </p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainerVariants}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <motion.div variants={fadeInUpVariants}>
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/contact">
                      Start a Conversation
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div variants={fadeInUpVariants}>
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link
                      href="https://github.com/giomjds"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="size-4" />
                      View GitHub
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
