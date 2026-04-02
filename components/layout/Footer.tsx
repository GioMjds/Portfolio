import Link from "next/link";
import type { Route } from "next";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "https://github.com/giomjds",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://linkedin.com/in/giomjds",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "mailto:contact@giomjds.com",
    label: "Email",
    icon: Mail,
  },
];

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/50 bg-card">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2">
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
            <div className="mt-4 flex gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <Button
                  key={href}
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
                    <Icon className="size-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h3>
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
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Get in Touch
            </h3>
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
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            © {currentYear} All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Designed & Developed by Gio Majadas
          </p>
        </div>
      </div>
    </footer>
  );
}
