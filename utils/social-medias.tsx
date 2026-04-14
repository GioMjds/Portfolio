import { ReactNode } from 'react';
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedInIcon } from '@/utils';

interface SocialMediaLink {
  icon: ReactNode;
  label: string;
  href: string;
}

export const socialMediaLinks: SocialMediaLink[] = [
  {
    icon: <FacebookIcon />,
    label: 'Facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || '#',
  },
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#',
  },
  {
    icon: <GithubIcon />,
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_URL || '#',
  },
];
