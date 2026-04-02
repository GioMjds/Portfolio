import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar, Footer } from '@/components/layout';
import { ChatPanel } from '@/components/assistant';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: {
    default: 'Gio Majadas | Personal Portfolio',
    template: '%s | Gio Majadas',
  },
  description:
    "Welcome to my personal portfolio! I'm Gio Majadas, a passionate software developer with expertise in web development, mobile app development, and cloud computing. Explore my projects, skills, and experience to see how I can contribute to your next project or team.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#05050d' },
  ],
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gio Majadas',
  description:
    "Welcome to my personal portfolio! I'm Gio Majadas, a passionate software developer with expertise in web development, mobile app development, and cloud computing. Explore my projects, skills, and experience to see how I can contribute to your next project or team.",
  url: 'https://giomjds.vercel.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn('h-full', 'antialiased', jakarta.variable, inter.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="gradient-bg" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
