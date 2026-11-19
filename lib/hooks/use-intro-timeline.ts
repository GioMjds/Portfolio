'use client';

import type { RefObject } from 'react';
import { gsap, GSAP_EASE, MEDIA, SplitText, useGSAP } from '@/lib/gsap';

/**
 * Page-header intro shared by the certificates and contact pages (same feel
 * as the homepage hero): [data-intro="badge"] fades up, the heading's words
 * rise out of masks, then every [data-intro="rest"] follows in order.
 *
 * Mark each animated element with [data-intro-item] so globals.css hides it
 * before GSAP runs. Reduced motion skips the whole timeline.
 */
export function useIntroTimeline(
  scope: RefObject<HTMLElement | null>,
  heading: RefObject<HTMLHeadingElement | null>,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MEDIA.motionOK, () => {
        const el = heading.current;
        if (!el) return;
        const q = gsap.utils.selector(scope);
        const split = SplitText.create(el, {
          type: 'words',
          mask: 'words',
          aria: 'auto',
        });

        gsap
          .timeline({
            defaults: { ease: GSAP_EASE, duration: 1 },
            // Restore plain markup: no masks clipping descenders afterwards.
            onComplete: () => split.revert(),
          })
          .fromTo(
            q('[data-intro="badge"]'),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0 },
          )
          .set(el, { autoAlpha: 1 }, 0.1)
          .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.07 }, 0.1)
          .fromTo(
            q('[data-intro="rest"]'),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, stagger: 0.1 },
            0.5,
          );

        return () => split.revert();
      });
    },
    { scope },
  );
}
