'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function CallToAction() {
  return (
    <section>
      <Card className="border-primary/20 bg-linear-to-br from-primary/5 via-card to-card">
        <CardContent className="flex flex-col items-center gap-5 p-8 text-center sm:p-12">
          <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
            Want to see these skills in action?
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Explore project case studies where these certificates translate into
            practical engineering work and shipped outcomes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/projects">
                View projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact me</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
