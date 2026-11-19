import type { Metadata } from 'next';

export const SITE_URL = 'https://giomjds.vercel.app';
export const SITE_NAME = 'Gio Majadas | Personal Portfolio';
export const SITE_DESCRIPTION =
  "Welcome to my personal portfolio! I'm Gio Majadas, a passionate software developer with expertise in web development, mobile app development, and cloud computing.";
export const SITE_LOCALE = 'en_US';
export const SITE_TITLE_TEMPLATE = '%s | Gio Majadas';

interface CreatePageMetadataOptions {
  title: string;
  description: string;
  pathname: `/${string}` | '/';
  type?: 'website' | 'article';
  /** Site-relative social preview image, e.g. a project cover. */
  image?: `/${string}`;
}

export function createAbsoluteUrl(pathname: `/${string}` | '/'): string {
  return new URL(pathname, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  pathname,
  type = 'website',
  image,
}: CreatePageMetadataOptions): Metadata {
  const absoluteUrl = createAbsoluteUrl(pathname);
  const images = image ? [createAbsoluteUrl(image)] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      type,
      url: absoluteUrl,
      title,
      description,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
