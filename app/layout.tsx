import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar, Footer, ChatPanel } from '@/components/layout';
import { cn } from '@/lib/utils';
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  SITE_URL,
} from '@/lib/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  applicationName: SITE_NAME,
  referrer: 'strict-origin-when-cross-origin',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#05050d' },
  ],
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gio Majadas',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  jobTitle: 'Software Developer',
  image: `${SITE_URL}/giomjds1.jpg`,
  sameAs: ['https://github.com/GioMjds', 'https://linkedin.com/in/giomjds'],
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
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatPanel />
        </ThemeProvider>
      </body>
    </html>
  );
}
