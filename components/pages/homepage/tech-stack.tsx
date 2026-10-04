'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowUpRight, X, Layers, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { skills, skillCategories, type Skill } from '@/constants/about';
import { fadeInUpVariants, staggerContainerVariants } from '@/utils/variants';
import { cn } from '@/lib/utils';
import { askAssistant } from '@/lib/assistant/ask-event';

export interface ConnectedProject {
  id: number;
  name: string;
}

interface TechStackProps {
  skillProjects?: Record<string, ConnectedProject[]>;
}

function normalizeKey(name: string): string {
  return name.toLowerCase().replace(/[\s.\-_]/g, '');
}

export function TechStack({ skillProjects = {} }: TechStackProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

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

  const connectedProjects = useMemo(() => {
    if (!selectedSkill) return [];
    const key = normalizeKey(selectedSkill.name);
    return skillProjects[key] ?? [];
  }, [selectedSkill, skillProjects]);

  // Handle Escape key to dismiss selection
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSelectedSkill(null);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleSkillClick(skill: Skill) {
    if (selectedSkill?.name === skill.name) {
      setSelectedSkill(null);
    } else {
      setSelectedSkill(skill);
    }
  }

  function handleAskAssistant(skillName: string) {
    askAssistant(
      `Tell me about Gio's hands-on experience and projects with ${skillName}.`,
    );
  }

  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="mb-8 text-center"
        >
          <Badge variant="outline" className="mb-4 gap-1">
            <Sparkles className="size-3 text-primary" />
            Interactive Tech Stack
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Technologies I Work With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-sm sm:text-base">
            Click any technology to inspect connected projects or inquire with the
            portfolio assistant.
          </p>
        </motion.div>

        {/* Live Connected Projects Preview Bar */}
        <div aria-live="polite" className="mx-auto mb-10 max-w-3xl">
          <AnimatePresence mode="wait">
            {selectedSkill ? (
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-primary/30 bg-card/90 p-4 sm:p-5 shadow-xl shadow-primary/5 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-background p-1.5 shadow-xs border border-border/50">
                      <Image
                        src={selectedSkill.icon}
                        alt={selectedSkill.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-semibold text-foreground">
                          {selectedSkill.name}
                        </h4>
                        <Badge variant="secondary" className="text-[11px]">
                          {selectedSkill.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {connectedProjects.length > 0
                          ? `${connectedProjects.length} featured project${
                              connectedProjects.length > 1 ? 's' : ''
                            } built with this technology`
                          : 'Used across specialized tools and active exploration'}
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setSelectedSkill(null)}
                    aria-label="Clear selected technology"
                    className="shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </Button>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {connectedProjects.length > 0 ? (
                    connectedProjects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="group inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/5 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:shadow-xs"
                      >
                        <Layers className="size-3 text-primary" />
                        <span>{project.name}</span>
                        <ArrowUpRight className="size-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                      </Link>
                    ))
                  ) : (
                    <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
                      <span>
                        No flagship project page is linked yet for this skill.
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAskAssistant(selectedSkill.name)}
                        className="h-8 gap-1.5 text-xs text-primary border-primary/30 hover:bg-primary/10"
                      >
                        <Bot className="size-3.5" />
                        Ask AI about {selectedSkill.name} experience
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border/70 py-2.5 text-center text-xs text-muted-foreground/80"
              >
                <Layers className="size-3.5 text-primary/70" />
                <span>Select any skill below to discover connected projects</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Grouped Skills Grid */}
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
                  const isSelected = selectedSkill?.name === skill.name;
                  const key = normalizeKey(skill.name);
                  const count = skillProjects[key]?.length ?? 0;
                  const hasSelection = selectedSkill !== null;

                  return (
                    <motion.div
                      key={skill.name}
                      variants={fadeInUpVariants}
                      style={transformOpacityStyle}
                    >
                      <button
                        type="button"
                        onClick={() => handleSkillClick(skill)}
                        aria-pressed={isSelected}
                        className={cn(
                          'w-full text-left rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                          hasSelection && !isSelected && 'opacity-40 hover:opacity-90',
                        )}
                      >
                        <Card
                          className={cn(
                            'group border-border/50 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5',
                            isSelected &&
                              'border-primary/60 bg-primary/5 shadow-md shadow-primary/10 ring-2 ring-primary/40',
                          )}
                        >
                          <CardContent className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={24}
                                height={24}
                                className="shrink-0"
                              />
                              <span
                                className={cn(
                                  'truncate text-sm font-medium transition-colors',
                                  isSelected ? 'text-primary font-semibold' : 'text-foreground',
                                )}
                              >
                                {skill.name}
                              </span>
                            </div>

                            {count > 0 && (
                              <span
                                className={cn(
                                  'ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold transition-colors',
                                  isSelected
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary',
                                )}
                              >
                                {count}
                              </span>
                            )}
                          </CardContent>
                        </Card>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
