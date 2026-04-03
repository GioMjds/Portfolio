'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Clock3, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/components/pages/contact/contact-form';
import { cardVariants, containerVariants, itemVariants } from '@/utils';

export function ContactPageShell() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <motion.section
          className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]"
          aria-label="Contact introduction and form"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <article className="space-y-6">
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="gap-2 border-primary/30 bg-primary/5 px-4 py-3"
              >
                <MessageSquare className="size-3" />
                Contact
              </Badge>
            </motion.div>

            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
                Let&apos;s work on your next
                <span className="block bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pb-1">
                  web experience.
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                I&apos;m open to freelance projects and collaborative
                opportunities. Share your project goals, timeline, and
                requirements, and I&apos;ll reply with practical next steps.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-3 sm:grid-cols-2"
              variants={containerVariants}
            >
              <motion.div variants={cardVariants}>
                <Card className="border-border/60 bg-card/60 py-4">
                  <CardContent className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      <Clock3 className="size-4 text-primary" />
                      Response time
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Typically within 1-2 business days.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="border-border/60 bg-card/60 py-4">
                  <CardContent className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      <ShieldCheck className="size-4 text-primary" />
                      Reliable delivery
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Messages are validated and securely delivered.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-sm text-muted-foreground"
              variants={itemVariants}
            >
              Prefer email directly?{' '}
              <Link
                className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                href="mailto:giomjds@gmail.com"
              >
                <Mail className="size-4" />
                giomjds@gmail.com
              </Link>
            </motion.p>
          </article>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number] }}
          >
            <ContactForm />
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
