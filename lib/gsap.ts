/**
 * Single entry point for GSAP. Import from here, never from 'gsap' directly,
 * so plugins are registered exactly once.
 *
 * Client-only: import this module only from files marked "use client".
 * GSAP owns scroll-driven sequences (ScrollTrigger) and split-text headline
 * timelines (SplitText). Everything else animates with `motion`. Never
 * animate the same element with both libraries.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Media queries for `gsap.matchMedia()`. Build every GSAP animation under
 * `motionOK`, so reduced-motion users get the final, static state.
 */
export const MEDIA = {
  motionOK: '(prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
} as const;

/** Shared easing, in line with motion's EASE_OUT feel. */
export const GSAP_EASE = 'expo.out';

export { gsap, ScrollTrigger, SplitText, useGSAP };
