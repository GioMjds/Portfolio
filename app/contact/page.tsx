import type { Metadata } from 'next';
import { ContactPageShell } from '@/components/pages/contact';
import { createPageMetadata } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Get in touch with Gio Majadas for freelance projects, collaborations, and full-stack web development opportunities.',
  pathname: '/contact',
});

export default function ContactPage() {
  return (
    // No overflow-hidden: it would break the sticky intro column.
    <section className="relative min-h-screen" aria-label="Contact page content">
      <ContactPageShell />
    </section>
  );
}
