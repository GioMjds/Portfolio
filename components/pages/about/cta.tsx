'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeInUpVariants } from '@/utils';

export function CallToAction() {
  return (
    <section className="px-4 pb-16 sm:pb-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <Card className="relative overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 via-card to-card">
            <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:p-12">
              <Badge variant="secondary" className="gap-1">
                <Heart className="size-3" />
                Let&apos;s Connect
              </Badge>
              <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                Interested in Working Together?
              </h2>
              <p className="max-w-lg text-muted-foreground">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    Start a Conversation
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link
                    href="https://github.com/giomjds"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/programming-icons-svg/github-original.svg"
                      alt="GitHub"
                      width={16}
                      height={16}
                      loading="lazy"
                      sizes="16px"
                      className="dark:invert"
                    />
                    View GitHub
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
