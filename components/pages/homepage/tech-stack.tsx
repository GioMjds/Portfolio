'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { skills, skillCategories, type Skill } from '@/constants/about';
import type { SkillProject } from '@/lib/skill-projects';
import { cn } from '@/lib/utils';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';

interface TechStackProps {
  /** Skill name -> projects that use it. Skills without projects are absent. */
  skillProjects: Record<string, SkillProject[]>;
}

function SkillContent({ skill }: { skill: Skill }) {
  return (
    <>
      {/* Decorative: the adjacent text already names the skill. */}
      <Image
        src={skill.icon}
        alt=""
        width={24}
        height={24}
        className="shrink-0"
      />
      <span className="text-sm font-medium">{skill.name}</span>
    </>
  );
}

export function TechStack({ skillProjects }: TechStackProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const transformOpacityStyle = useMemo(
    () => ({ willChange: 'transform, opacity' }),
    [],
  );

  const groupedSkills = useMemo(() => {
    return skillCategories.map((category) => ({
      category,
      items: skills.filter((skill) => skill.category === category),
    }));
  }, []);

  const selectedProjects = selected ? (skillProjects[selected] ?? []) : [];
  const selectedSkill = useMemo(
    () => (selected ? skills.find((s) => s.name === selected) : null),
    [selected],
  );

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && selected !== null) {
      setSelected(null);
    }
  }

  return (
    <section className="px-4 py-16 sm:py-24" onKeyDown={handleKeyDown}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Sparkles className="size-3" />
            Tech Stack
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A curated set of languages, frameworks, and tools I use to build
            modern, performant applications.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground/80">
            Select a skill with a project count to see where I used it.
          </p>
        </motion.div>

        <div className="space-y-10">
          {groupedSkills.map(({ category, items }) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={staggerContainerVariants}
            >
              <motion.h3
                variants={fadeInUpVariants}
                className="font-heading mb-4 text-lg font-semibold text-foreground"
              >
                {category}
              </motion.h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((skill) => {
                  const hasProjects = Boolean(skillProjects[skill.name]);
                  const isSelected = selected === skill.name;

                  return (
                    <motion.div
                      key={skill.name}
                      variants={fadeInUpVariants}
                      style={transformOpacityStyle}
                    >
                      <Card
                        className={cn(
                          'group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5',
                          hasProjects && 'py-0',
                          isSelected && 'bg-primary/5 ring-2 ring-primary',
                          selected !== null && !isSelected && 'opacity-40',
                        )}
                      >
                        {hasProjects ? (
                          <CardContent className="p-0">
                            <button
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() =>
                                setSelected(isSelected ? null : skill.name)
                              }
                              className="flex w-full cursor-pointer items-center gap-3 rounded-[inherit] px-3 py-9 text-left outline-none focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-ring/60"
                            >
                              <SkillContent skill={skill} />
                              <span
                                aria-hidden
                                className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium tabular-nums text-primary"
                              >
                                {skillProjects[skill.name].length}
                              </span>
                              <span className="sr-only">
                                , used in {skillProjects[skill.name].length}{' '}
                                {skillProjects[skill.name].length === 1
                                  ? 'project'
                                  : 'projects'}
                              </span>
                            </button>
                          </CardContent>
                        ) : (
                          <CardContent className="flex items-center gap-3 p-3">
                            <SkillContent skill={skill} />
                          </CardContent>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right-side Drawer displaying projects built with the selected skill */}
        <Drawer
          open={selected !== null}
          onOpenChange={(open) => {
            if (!open) setSelected(null);
          }}
          direction="right"
        >
          <DrawerContent
            className="data-[vaul-drawer-direction=right]:sm:max-w-md h-full flex flex-col bg-popover/95 backdrop-blur-md border-l border-border/80 shadow-2xl"
          >
            <DrawerHeader className="border-b border-border/50 px-6 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {selectedSkill && (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-background/80 shadow-xs">
                      <Image
                        src={selectedSkill.icon}
                        alt={`${selectedSkill.name} icon`}
                        width={24}
                        height={24}
                        className="shrink-0"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <DrawerTitle className="truncate text-lg font-bold">
                        {selected}
                      </DrawerTitle>
                      {selectedProjects.length > 0 && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
                          {selectedProjects.length}
                        </span>
                      )}
                    </div>
                    <DrawerDescription className="text-xs text-muted-foreground">
                      {selectedProjects.length}{' '}
                      {selectedProjects.length === 1 ? 'project' : 'projects'} built
                      with this technology
                    </DrawerDescription>
                  </div>
                </div>

                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 rounded-full hover:bg-muted"
                    aria-label="Close drawer"
                  >
                    <X className="size-4" />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {selectedProjects.length === 0 ? (
                <div className="flex h-48 flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-muted-foreground">
                    No public projects currently tagged with {selected}.
                  </p>
                </div>
              ) : (
                selectedProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden border-border/60 bg-card/60 transition-all duration-300 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      onClick={() => setSelected(null)}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[inherit]"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image
                          src={project.image}
                          alt={`${project.name} preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, 420px"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {project.status && (
                          <span className="absolute top-2.5 right-2.5 rounded-full border border-border/40 bg-background/85 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase text-foreground shadow-xs backdrop-blur-md">
                            {project.status.replace('-', ' ')}
                          </span>
                        )}
                      </div>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-base leading-snug text-foreground group-hover:text-primary transition-colors">
                            {project.name}
                          </h4>
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="pt-2 flex items-center justify-between border-t border-border/40 text-xs font-medium text-primary">
                          <span>View project details</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))
              )}
            </div>

            <DrawerFooter className="border-t border-border/50 px-6 py-4 flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/projects" onClick={() => setSelected(null)}>
                  View All Projects
                  <ArrowUpRight className="size-4 ml-1" />
                </Link>
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </section>
  );
}
