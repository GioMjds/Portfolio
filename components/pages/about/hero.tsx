'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants } from '@/utils';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-24 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Badge
              variant="outline"
              className="gap-2 border-primary/30 bg-primary/5 px-4 py-3"
            >
              <MapPin className="size-3" />
              Laguna, Philippines
            </Badge>

            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              About{' '}
              <span className="bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Me
              </span>
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m{' '}
              <span className="font-semibold text-foreground">Gio Majadas</span>
              , a passionate software developer with a love for building modern,
              user-centric web applications. I specialize in full-stack
              development with a focus on creating seamless digital experiences.
            </p>

            <p className="text-muted-foreground">
              With hands-on experience in React, Next.js, Django, and various
              modern technologies, I enjoy turning complex problems into elegant
              solutions. When I&apos;m not coding, you&apos;ll find me exploring
              new technologies, contributing to open-source, or enjoying a good
              cup of coffee.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="gap-2">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/contact">
                  Get in Touch
                  <ExternalLink className="size-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Profile Image Placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative mx-auto aspect-square w-full max-w-sm lg:mx-0"
          >
            <Image
              src="/giomjds1.jpg"
              alt="GioMjds's GitHub image"
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
