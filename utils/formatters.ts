import { ProjectStatus } from '@/constants';
import { Archive, CheckCircle2, Clock, Code2 } from 'lucide-react';

export const statusConfig: Record<
  ProjectStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    color: string;
    bg: string;
    border: string;
  }
> = {
  finished: {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
  },
  'in-development': {
    label: 'In Progress',
    icon: Code2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  pending: {
    label: 'Planned',
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
  },
  archived: {
    label: 'Archived',
    icon: Archive,
    color: 'text-gray-500',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
  },
};
