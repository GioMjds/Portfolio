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
    href: process.env.NEXT_PUBLIC_FACEBOOK_LINK || '#',
  },
  {
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_LINK || '#',
  },
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_LINK || '#',
  },
  {
    icon: <GithubIcon />,
    label: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_LINK || '#',
  },
];
