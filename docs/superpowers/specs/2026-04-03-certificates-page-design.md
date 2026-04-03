# Certificates Page Iterative UI Design

**Date:** 2026-04-03  
**Project:** giomjds-portfolio (Next.js 16, App Router)  
**Route:** `app/certificates/page.tsx`

## 1. Problem and Outcome

The current certificates page is empty and does not establish credibility.  
The target outcome is a trust-first experience that helps visitors quickly validate qualifications, view proof, and continue to relevant portfolio actions.

## 2. Approved Direction

### 2.1 Experience Strategy
- **Primary objective:** trust and credibility first.
- **Chosen structure:** curated featured certificates first, then expandable full archive.
- **Proof depth:** medium (card-first browsing with click-to-preview modal).
- **Above-the-fold trust signals:** concise stats are included.

### 2.2 Chosen Approach
Selected approach: **Credibility Story Stack**.

Flow:
1. Trust Hero with credibility summary and trust stats.
2. Featured Credentials (curated high-signal subset).
3. Expandable Full Archive (complete list on demand).
4. Certificate Preview Modal (image proof without route change).
5. Subtle conversion tail to projects/contact.

Alternatives considered:
- Filter Explorer (strong scanning, weaker narrative focus).
- Timeline Journey (strong chronology, weaker quick validation).

## 3. Proposed Component Architecture

Create/compose page-level modules in `components/pages/certificates/`:
- `header.tsx` — title, credibility statement, trust stats.
- `featured-certificates.tsx` — curated credential cards.
- `certificates-archive.tsx` — collapsed-by-default full list.
- `certificate-card.tsx` — reusable certificate card.
- `certificate-preview-dialog.tsx` — preview modal and proof context.
- `index.ts` — barrel exports.

Page composition:
- `app/certificates/page.tsx` remains a server page with metadata and top-level composition.
- Interactivity is isolated to client components (archive expansion + preview dialog behavior).

Shared UI primitives to reuse:
- `Card`, `Badge`, `Button`, `Dialog`, optional `Accordion`.

## 4. Data and Content Model

Source remains `constants/certifications.ts`, with lightweight metadata additions:
- `issuer: string`
- `year: number`
- `featured?: boolean`
- `category?: string`

Rules:
- Trust stats are derived from source data (no duplicated hardcoded metrics in UI).
- Featured list is driven by `featured: true`, with deterministic fallback to top-N when needed.
- Archive shows complete data and starts collapsed.
- Modal includes certificate title + issuer/year context.

## 5. Iterative UI Design Plan

### Iteration 1 — Foundation Credibility Layout
**Goal:** establish clear trust hierarchy and usable baseline layout.

Scope:
- Implement trust hero.
- Implement featured credentials grid.
- Implement collapsed full-archive section with expand control.
- Render certificate cards with consistent spacing and responsive behavior.

Validation focus:
- First screen clearly communicates credibility within seconds.
- Information hierarchy remains clear on mobile and desktop.

### Iteration 2 — Proof Interaction and UX Refinement
**Goal:** make evidence inspection smooth without disrupting flow.

Scope:
- Add preview dialog from card click/keyboard trigger.
- Improve card affordances (hover/focus/active states).
- Add context details in modal (issuer/year/category where present).

Validation focus:
- Visitors can inspect proof quickly and return to browsing context.
- Keyboard and screen-reader flow remains coherent.

### Iteration 3 — Trust Signal Polish and Conversion Bridge
**Goal:** strengthen credibility cues and connect to portfolio actions.

Scope:
- Tune trust stat presentation for concise scanning.
- Refine featured ordering and visual emphasis.
- Add subtle bottom CTA linking to projects/contact.

Validation focus:
- Credibility remains primary, CTA remains secondary.
- Final page feels complete and intentional across themes.

## 6. Error Handling and Accessibility

- No silent failures: missing data should render explicit fallback UI states.
- Ensure valid `alt` text for previews.
- Dialog interactions must support keyboard and close controls.
- Maintain readable contrast in light and dark themes.
- Preserve `/certificates` route compatibility with existing assistant relevance logic.

## 7. Verification Targets for Implementation Phase

- `pnpm lint`
- `pnpm build`

## 8. Scope Boundaries

In scope:
- Certificates page UX, structure, interactions, and data metadata needed for this route.

Out of scope:
- New backend services.
- Non-certificates page redesign.
- Unrelated refactors outside touched surfaces.

