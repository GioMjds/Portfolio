# AGENTS.md — Engineering rules for this repository

## Mission context

This project is an **AI-powered personal portfolio** built on **Next.js 16 App Router**.  
Every change should improve one or more of these outcomes:

- stronger personal brand presentation,
- clearer project/storytelling content,
- reliable AI-assisted interactions (if added),
- fast, accessible, production-safe UX.

## Framework and platform rules (hard constraints)

1. **Treat Next.js behavior as version-specific.**  
   Before implementing framework-level changes, consult `node_modules/next/dist/docs/`.
2. **Preserve existing Next config defaults unless explicitly asked to change them:**  
   `reactCompiler: true`, `typedRoutes: true`, COOP header, and `images.remotePatterns` in `next.config.ts`.
3. **Use App Router conventions only.**  
   Keep route surfaces in `app/**/page.tsx` and layout concerns in `app/layout.tsx`.
4. **Prefer Server Components by default.**  
   Add `"use client"` only when interactivity, browser APIs, or client hooks are required.

## Architecture and composition rules

1. **Keep the global shell centralized in `app/layout.tsx`.**  
   Theme provider, shared navigation/footer, fonts, and metadata belong there.
2. **Reuse UI primitives from `components/ui/*` before creating new ones.**  
   Extend existing shadcn/Radix-based patterns instead of introducing parallel component systems.
3. **Put shared helpers in `lib/` and import via alias.**  
   Use `@/*` imports (`tsconfig.json`) consistently.
4. **Use `cn()` from `lib/utils.ts` for class composition.**  
   Do not hand-roll conditional class string merging.

## AI-powered portfolio quality rules

1. **Portfolio-first content quality:**
   Generated or assisted content must be specific, credible, and tied to real projects/skills.
2. **No fabricated achievements or metrics:**  
   Never invent client names, employment claims, impact numbers, or certifications.
3. **Deterministic UX over cleverness:**  
   For AI features, prefer predictable outputs, explicit fallbacks, and clear user feedback.
4. **Privacy and trust by default:**  
   Never hardcode or expose secrets, tokens, or personal contact data beyond intentional public profile content.

## Styling and UX rules

1. **Follow current styling stack:** Tailwind CSS v4 + `tw-animate-css` + `shadcn/tailwind.css` + design tokens in `app/globals.css`.
2. **Respect theme behavior:**  
   Dark/light/system mode should remain compatible with `next-themes` and existing theme toggle interactions.
3. **Accessibility is required, not optional:**  
   Preserve semantic HTML, keyboard usability, and readable contrast when modifying UI.

## Delivery and verification rules

1. **Run checks before handoff:**  
   - `pnpm lint`  
   - `pnpm build`
2. **If adding tests in the future, add scripts in `package.json` first and document how to run both full and single tests.**
3. **Keep changes surgical:**  
   Avoid unrelated refactors unless they directly unblock or de-risk the requested change.
