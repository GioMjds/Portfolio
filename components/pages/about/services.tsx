'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { fadeInUpVariants } from '@/utils';
import { servicePrinciples, services } from '@/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

function ServiceList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <Check
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-primary"
            />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Services() {
  return (
    <section className="px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUpVariants}
          className="space-y-6 lg:sticky lg:top-28 lg:self-start"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            What I Offer
          </h2>
          <ul className="space-y-3">
            {servicePrinciples.map((value) => (
              <li
                key={value}
                className="flex items-start gap-3 leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"
                />
                {value}
              </li>
            ))}
          </ul>
        </motion.div>

        <Accordion
          type="single"
          collapsible
          defaultValue={services[0]?.title}
          className="border-y"
        >
          {services.map((service) => (
            <AccordionItem key={service.title} value={service.title}>
              <AccordionTrigger className="items-center gap-4 py-5 hover:no-underline hover:text-primary **:data-[slot=accordion-trigger-icon]:size-5">
                <span className="font-heading text-lg font-semibold sm:text-xl">
                  {service.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pb-8">
                <p className="max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <ServiceList title="What I build" items={service.features} />
                  <ServiceList title="What you get" items={service.delivers} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
