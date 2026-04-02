import { ReactNode } from 'react';
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedInIcon } from '@/utils';

interface SocialMediaLink {
  icon: ReactNode;
  href: string;
}

export const socialMediaLinks: SocialMediaLink[] = [
  {
    icon: <FacebookIcon />,
    href: process.env.NEXT_PUBLIC_FACEBOOK_LINK || '#',
  },
  {
    icon: <LinkedInIcon />,
    href: process.env.NEXT_PUBLIC_LINKEDIN_LINK || '#',
  },
  {
    icon: <InstagramIcon />,
    href: process.env.NEXT_PUBLIC_INSTAGRAM_LINK || '#',
  },
  {
    icon: <GithubIcon />,
    href: process.env.NEXT_PUBLIC_GITHUB_LINK || '#',
  },
];
