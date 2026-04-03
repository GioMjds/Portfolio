import Link from 'next/link';
import { Clock3, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ContactForm } from '@/components/pages/contact/contact-form';

export function ContactPageShell() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="gap-2 border-primary/30 bg-primary/5 px-4 py-3"
            >
              <MessageSquare className="size-3" />
              Contact
            </Badge>

            <div className="space-y-4">
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
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
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
            </div>

            <p className="text-sm text-muted-foreground">
              Prefer email directly?{' '}
              <Link
                className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                href="mailto:giomjds@gmail.com"
              >
                <Mail className="size-4" />
                giomjds@gmail.com
              </Link>
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
