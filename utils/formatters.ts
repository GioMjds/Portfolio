import { ProjectStatus } from '@/constants';
import { Archive, CheckCircle2, Clock, Code2 } from 'lucide-react';

export const statusConfig: Record<
  ProjectStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    /** Icon colour. Labels use text-foreground so they read over screenshots. */
    color: string;
    bg: string;
    border: string;
  }
> = {
  finished: {
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-background/90',
    border: 'border-border',
  },
  'in-development': {
    label: 'In Progress',
    icon: Code2,
    color: 'text-brand',
    bg: 'bg-background/90',
    border: 'border-border',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-muted-foreground',
    bg: 'bg-background/90',
    border: 'border-border',
  },
  archived: {
    label: 'Archived',
    icon: Archive,
    color: 'text-muted-foreground',
    bg: 'bg-background/90',
    border: 'border-border',
  },
};

export function getStatusIcon(status: ProjectStatus) {
  return statusConfig[status].icon;
}

