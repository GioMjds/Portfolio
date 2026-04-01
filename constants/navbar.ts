import { Award, FolderKanban, Home, Mail, User } from 'lucide-react';

export const GITHUB_IMAGE = process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL || '/programming-icons-svg/github-original.svg';

export const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/certificates', label: 'Certificates', icon: Award },
  { href: '/contact', label: 'Contact', icon: Mail },
];
