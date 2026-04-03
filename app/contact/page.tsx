import type { Metadata } from 'next';
import { ContactPageShell } from '@/components/pages/contact';

export const metadata: Metadata = {
  title: "Contact",
  description:
    'Get in touch with Gio Majadas for freelance projects, collaborations, and full-stack web development opportunities.',
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <ContactPageShell />
    </div>
  );
}
