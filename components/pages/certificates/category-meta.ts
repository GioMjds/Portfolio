import {
  BarChart3,
  Bot,
  Briefcase,
  Database,
  LayoutTemplate,
  type LucideIcon,
  Server,
  ShieldCheck,
} from 'lucide-react';
import type { CertificateCategory } from '@/constants';

/** Display label and icon per certificate category. */
export const CATEGORY_META: Record<
  CertificateCategory,
  { label: string; icon: LucideIcon }
> = {
  frontend: { label: 'Frontend', icon: LayoutTemplate },
  backend: { label: 'Backend', icon: Server },
  database: { label: 'Database', icon: Database },
  analytics: { label: 'Analytics', icon: BarChart3 },
  ai: { label: 'AI', icon: Bot },
  career: { label: 'Career', icon: Briefcase },
  cybersecurity: { label: 'Cybersecurity', icon: ShieldCheck },
};
