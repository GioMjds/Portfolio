# Accessibility, Metadata, and Discoverability Design

**Date:** 2026-04-03  
**Project:** giomjds-portfolio  
**Category:** Lighthouse Accessibility (mobile + desktop), WCAG 2.2 AA baseline

## Problem Statement

The portfolio needs a structured, maintainable accessibility and discoverability foundation that can reliably achieve Lighthouse Accessibility **100** on mobile and desktop across all public pages, while remaining aligned with WCAG 2.2 AA and modern metadata/crawler conventions.

Current implementation already has useful foundations, but it also has gaps and conflicts:

1. `app/layout.tsx` sets restrictive viewport values (`maximumScale: 1`, `userScalable: false`) that conflict with accessible zoom expectations.
2. Robots and sitemap exist in both static (`public/robots.txt`, `public/sitemap.xml`) and dynamic (`public/robots.ts`, `public/sitemap.ts`) forms, creating governance ambiguity.
3. Global metadata and JSON-LD exist but are minimal; route-level metadata is present but not fully standardized for canonical/open graph consistency.
4. Shared interactive UI surfaces (especially `ChatPanel`) require explicit accessibility hardening for keyboard/focus/announcements across devices.

## Goals

1. Achieve and preserve Lighthouse Accessibility score **100** (mobile + desktop) for:
   - `/`
   - `/about`
   - `/projects`
   - `/projects/[projectID]`
   - `/certificates`
   - `/contact`
2. Enforce WCAG 2.2 AA baseline behavior for semantics, keyboard flow, focus visibility, zoom, and contrast-sensitive interactions.
3. Standardize metadata, structured data, crawler files, and machine-readable discoverability assets.
4. Add both automated and manual quality gates to prevent regressions.

## Non-Goals

1. Chasing WCAG AAA as a strict requirement.
2. Rebuilding page designs or content strategy unrelated to accessibility/discoverability compliance.
3. Introducing unrelated framework/config refactors outside the scope above.

## Chosen Approach

Selected approach: **Standards-first layered plan**.

This approach organizes work into four coordinated layers:

1. **Accessibility semantics layer** (WCAG/ARIA behaviors in shared and route components)
2. **Metadata and structured-data layer** (global and route-specific SEO/social/schema)
3. **Crawler/discoverability asset layer** (`robots`, `sitemap`, `manifest`, `llms.txt`)
4. **Verification layer** (automated Lighthouse/axe + manual WCAG checks)

Why this approach:

1. It targets the Lighthouse score objective without optimizing only for tool heuristics.
2. It keeps conformance requirements explicit and durable for future content changes.
3. It removes duplicated ownership boundaries that often cause regressions.

## Architecture and Component Plan

### 1. Global document and metadata architecture

Primary file: `app/layout.tsx`

Planned structure:

1. Keep global metadata ownership in root layout (`title` template, defaults, `metadataBase`, canonical baseline, robots defaults, social defaults, icons).
2. Remove zoom-lock viewport restrictions and allow user scaling.
3. Keep global Person JSON-LD, but normalize schema payload shape and ensure valid serialization.
4. Maintain language and shell-level semantics (`<html lang="en">`, one `<main>` region) while introducing a skip-link pattern at shell level.

### 2. Route metadata normalization

Primary files:

- `app/page.tsx`
- `app/about/page.tsx`
- `app/projects/page.tsx`
- `app/projects/[projectID]/page.tsx`
- `app/certificates/page.tsx`
- `app/contact/page.tsx`

Plan:

1. Keep route-level title/description ownership in each page.
2. Add consistent canonical handling through metadata alternates where required.
3. Ensure dynamic project routes emit deterministic metadata for both valid and not-found states.
4. Add route-specific structured-data where meaningful (for example breadcrumbs/item lists for content-heavy routes).

### 3. Shared UI accessibility hardening

Primary files:

- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`
- `components/layout/ChatPanel.tsx`

Plan:

1. Verify/strengthen semantic landmarks and labels (navigation and footer naming where needed).
2. Add/verify keyboard-first interaction paths and visible focus states.
3. Add shell-level skip navigation support to main content.
4. Harden chat behavior for assistive tech:
   - dialog-like semantics and accessible naming when expanded,
   - predictable keyboard handling (including dismissal flow),
   - explicit status/state announcements that are not color-only.
5. Confirm decorative elements remain hidden from assistive technology (`aria-hidden` where appropriate).

### 4. Discoverability assets governance

Primary files:

- `public/robots.ts`
- `public/sitemap.ts`
- `public/manifest.json`
- `public/llms.txt`
- `public/robots.txt` (to be reconciled)
- `public/sitemap.xml` (to be reconciled)

Plan:

1. Set a single authority per crawler asset type and remove conflicting duplicates.
2. Prefer framework-driven generation for robots/sitemap to keep route inventory synchronized.
3. Keep manifest installability-safe and remove unsupported handlers unless backed by implemented routes.
4. Keep `llms.txt` concise, truthful, and aligned to publicly available portfolio content.

## Data Flow

### Metadata and schema flow

1. Request hits route.
2. Root layout metadata provides global defaults.
3. Route metadata overrides page-specific values.
4. JSON-LD payloads are injected in the final document head/body where declared.
5. Crawlers receive canonical, robots directives, and social/schema hints consistently.

### Discoverability file flow

1. Route inventory and project source data define sitemap entries.
2. Metadata route generation outputs canonical crawler views.
3. `robots` references sitemap endpoint.
4. `llms.txt` references high-value, public pages and capability descriptions.

## Error Handling and Reliability

1. Dynamic route metadata for missing projects continues to return explicit not-found metadata.
2. Accessibility-related interaction failures must not silently fail; user-facing controls stay operable with fallback labels/messages.
3. If crawler asset generation fails validation, release is blocked until fixed rather than shipping conflicting outputs.

## Verification Strategy

### Automated gates

1. Lighthouse CI for mobile and desktop accessibility category on key routes.
2. Axe-based checks for critical semantic/ARIA violations.
3. Merge blocking on score drops or critical accessibility findings.

### Manual checks

1. Keyboard-only navigation across global shell and each route.
2. Screen reader pass for main landmarks, chat interactions, form feedback, and navigation labels.
3. Zoom to 200% and reflow verification.
4. Contrast spot checks for interactive and muted text tokens.
5. Reduced-motion behavior confirmation for animated surfaces.

## Delivery Order

1. Baseline audit + issue inventory per route/component.
2. Root metadata/viewport/schema corrections.
3. Shared component accessibility hardening (navbar/footer/chat/skip link).
4. Robots/sitemap/manifest/llms governance cleanup.
5. Automated CI checks + manual checklist codification.
6. Final Lighthouse run and remediation loop until thresholds are met.

## Risks and Mitigations

1. **Risk:** Lighthouse score variability between runs/devices.  
   **Mitigation:** Use stable CI profile and fixed route audit set.
2. **Risk:** Duplicate crawler files causing inconsistent indexing behavior.  
   **Mitigation:** Enforce one source of truth and remove conflicting artifacts.
3. **Risk:** Accessibility regressions from future content changes.  
   **Mitigation:** Keep automated gates and checklist as release requirements.

## Acceptance Criteria

1. Lighthouse Accessibility score is 100 on mobile and desktop for all in-scope routes.
2. Viewport behavior allows user zoom and does not block accessibility resizing behavior.
3. Shared UI is keyboard-operable, focus-visible, and semantically clear.
4. Metadata/JSON-LD/canonical outputs are consistent and valid across routes.
5. Robots, sitemap, manifest, and llms assets are non-conflicting and production-consistent.
6. Automated and manual accessibility checks are documented and enforced.
