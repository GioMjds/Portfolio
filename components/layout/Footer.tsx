import Link from 'next/link';
import type { Route } from 'next';
import { Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { socialMediaLinks } from '@/utils';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t border-border/50 bg-card"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-5xl px-4 py-12">
        <section
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Footer content"
        >
          {/* Brand Section */}
          <section
            className="sm:col-span-2 lg:col-span-2"
            aria-label="Brand summary"
          >
            <Link
              href="/"
              className="inline-block font-heading text-2xl font-bold tracking-tight"
            >
              Gio<span className="text-primary">Mjds</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Passionate software developer crafting modern web experiences with
              expertise in web development, mobile apps, and cloud computing.
            </p>
            {/* Social Links */}
            <ul
              className="mt-4 flex gap-2"
              role="list"
              aria-label="Social links"
            >
              {socialMediaLinks.map(({ href, label, icon }) => (
                <li key={href}>
                  <Button
                    asChild
                    variant="outline"
                    size="icon-sm"
                    className="transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:text-primary"
                  >
                    <Link
                      href={href as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      {icon}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </p>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href as Route}
                    className="text-sm text-foreground/80 transition-colors duration-200 hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <section aria-label="Contact information">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Get in Touch
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-foreground/80">
                Available for freelance projects and full-time opportunities.
              </p>
              <Button asChild variant="default" size="sm" className="mt-2">
                <Link href="/contact">
                  <Mail className="mr-2 size-4" />
                  Contact Me
                </Link>
              </Button>
            </div>
          </section>
        </section>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <section
          className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
          aria-label="Copyright and credits"
        >
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & Developed by Gio Majadas
          </p>
        </section>
      </div>
    </footer>
  );
}
