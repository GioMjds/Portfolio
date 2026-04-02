'use client';

import { useState } from 'react';
import { type ProjectStatus } from '@/constants';
import { FilterPills } from './filter-pills';
import { Projects } from './projects';

export type FilterType = 'all' | ProjectStatus;

export function ProjectsContainer() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  return (
    <>
      <FilterPills
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Projects activeFilter={activeFilter} />
    </>
  );
}
