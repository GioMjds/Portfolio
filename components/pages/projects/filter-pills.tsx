'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Filter } from 'lucide-react';
import { type ProjectStatus } from '@/constants';

type FilterType = 'all' | ProjectStatus;

interface Filters {
  label: string;
  value: FilterType;
}

const filters: Filters[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Completed', value: 'finished' },
  { label: 'In Progress', value: 'in-development' },
  { label: 'Planned', value: 'pending' },
];

interface FilterPillsProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

export function FilterPills({
  activeFilter,
  setActiveFilter,
}: FilterPillsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: 0.6 }}
      className="mb-12 flex flex-wrap items-center justify-center gap-3"
      aria-label="Project filters"
    >
      <h3 className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="size-4" />
        <span className="font-medium">Filter:</span>
      </h3>
      <ul className="flex flex-wrap items-center justify-center gap-3" role="list">
        {filters.map((filter) => (
          <li key={filter.value}>
            <button
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={activeFilter === filter.value}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.value
                  ? 'border-primary/50 bg-primary/10 text-primary shadow-lg shadow-primary/25'
                  : 'border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:bg-card hover:text-foreground'
              }`}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
