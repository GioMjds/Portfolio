# Copilot instructions for this repository

## Build, lint, and run commands
- `pnpm dev` starts the Next.js dev server.
- `pnpm build` creates the production build.
- `pnpm start` runs the production build.
- `pnpm lint` runs ESLint (`eslint.config.mjs` with Next core-web-vitals + TypeScript rules).

## Test commands
- There is currently no test runner configured in this repo (`package.json` has no `test` script, and no Jest/Vitest/Playwright config is present).
- A single-test command is not available yet. Do not invent one in future Copilot sessions.

## High-level architecture
- This is a Next.js 16 App Router project. Route entries are `app/**/page.tsx`.
- `app/layout.tsx` is the application shell: global metadata, global CSS import, Google font setup, and `<ThemeProvider>` wrapping shared `<Navbar />` / `<Footer />` around route content.
- The dynamic route `app/projects/[projectID]/page.tsx` uses awaited route params (`params: Promise<{ projectID: string }>`).
- Reusable UI primitives live in `components/ui/*` (shadcn + Radix-based components). Prefer composing these before adding new primitives.
- Theme behavior is centralized through `components/theme-provider.tsx` (`next-themes`) and `components/theme-switcher.tsx` (click + keyboard toggle).
- Shared utility helpers go in `lib/` (`lib/utils.ts` exposes `cn()` for class merging).

## Key repository conventions
- Treat this codebase as **not standard Next.js defaults**. Follow `AGENTS.md`: consult docs in `node_modules/next/dist/docs/` before framework-specific changes.
- Use the `@/*` path alias from `tsconfig.json` (for example `@/components/...`, `@/lib/utils`).
- Default to Server Components in `app/`; only add `"use client"` when hooks/event handlers/browser APIs are needed.
- Use `cn()` from `lib/utils.ts` instead of manual class string assembly for conditional Tailwind classes.
- Styling conventions are Tailwind CSS v4 + `tw-animate-css` + `shadcn/tailwind.css`, with theme tokens in `app/globals.css`.
- Keep `next.config.ts` conventions intact unless explicitly changing behavior: `reactCompiler: true`, `typedRoutes: true`, global COOP header, and restricted `images.remotePatterns`.
