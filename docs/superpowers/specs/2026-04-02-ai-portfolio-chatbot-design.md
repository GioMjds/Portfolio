# AI Portfolio Chatbot Assistant Design

**Date:** 2026-04-02  
**Project:** giomjds-portfolio (Next.js 16, App Router)  
**Feature:** Global, portfolio-grounded mini AI chatbot using Gemini 2.0 Flash

## 1. Problem and Outcome

Visitors should be able to ask questions about Gio's portfolio and receive accurate, trustworthy answers grounded in site content (about, skills, projects, certifications, and related profile context). The assistant must be available across the site through the global layout and deploy safely on Vercel without exposing API secrets.

## 2. Goals and Non-Goals

### Goals
- Deliver a docked chat assistant visible across routes from `app/layout.tsx`.
- Restrict answers to curated portfolio data only.
- Call Gemini 2.0 Flash from server-side code only.
- Return transparent responses with source section tags (for trust and debuggability).
- Keep implementation compatible with current repo patterns and Vercel deployment.

### Non-Goals (v1)
- Long-term user memory/accounts.
- Embeddings/vector database retrieval.
- Streaming token-by-token responses.
- Multilingual responses.
- General-purpose chatbot behavior outside portfolio scope.

## 3. Existing Codebase Context

- Global shell is in `app/layout.tsx` and already wraps all pages with theme and shared layout.
- Portfolio content already exists in structured constants:
  - `constants/about.ts`
  - `constants/projects.ts`
  - `constants/certifications.ts`
  - `constants/services.ts`
  - `constants/home.ts`
- Server-only data loading pattern already exists (`lib/projects-data.ts` using `server-only` and `cache`), which can be mirrored for assistant knowledge loading.
- Current routes include homepage, about, projects (+ dynamic project page), certificates, and contact.

## 4. Proposed Architecture

### 4.1 High-Level Design
1. **Client chat UI** renders globally from `app/layout.tsx` as a docked bottom-right panel.
2. **Route handler API** (`app/api/assistant/chat/route.ts`) receives chat requests.
3. **Knowledge module** composes a normalized knowledge object from trusted constants.
4. **Relevance selector** picks top sections based on query + route hint.
5. **Gemini adapter** sends constrained prompt to Gemini 2.0 Flash.
6. **Response policy layer** enforces portfolio-only behavior and refusal rules.

### 4.2 Proposed Modules
- `components/assistant/chat-panel.tsx` (client): docked panel, history, input, loading, clear.
- `components/assistant/index.ts` (barrel export for layout integration).
- `app/api/assistant/chat/route.ts` (server route handler).
- `lib/assistant/knowledge.ts` (server-only normalized knowledge builder).
- `lib/assistant/relevance.ts` (server-only relevance scoring/selection).
- `lib/assistant/gemini.ts` (server-only Gemini request wrapper).
- `lib/assistant/types.ts` (shared request/response types and section enums).
- `lib/assistant/prompt.ts` (system instruction + prompt assembly).

## 5. Knowledge and Grounding Strategy

### 5.1 Source of Truth
Portfolio data comes only from curated constants in the repo. No scraping of rendered DOM and no untrusted runtime sources.

### 5.2 Normalization Shape
The knowledge builder transforms raw constants into stable sections, for example:
- `identity`: name, positioning statement, technical identity, value proposition.
- `skills`: categorized skill lists and highlights.
- `projects`: project summaries, stacks, features, status, links.
- `certifications`: certificate names and relevant tags.
- `services`: offered service areas and deliverables.
- `homepage`: headline skill set and intro statements.

### 5.3 Relevance Selection (v1)
- Input: user question + optional current route (`/`, `/about`, `/projects`, `/certificates`, etc.).
- Output: top matching section slices plus route-prioritized section.
- Initial scoring: lightweight keyword overlap + section boost by route hint.
- Fallback: if low confidence, include broad identity + top two likely sections.

This keeps prompt size controlled while improving precision compared to sending all data every time.

## 6. Prompt and Response Policy

### 6.1 System Rules
The model is instructed to:
- Answer only using provided portfolio context.
- Never invent achievements, metrics, roles, or claims not present in context.
- Explicitly refuse when context is missing or question is out of scope.
- Keep answers concise and useful for a portfolio visitor.

### 6.2 Refusal Style
When out-of-scope or unsupported, return:
- A clear short refusal.
- One or two suggestions for in-scope follow-up questions.

### 6.3 Response Contract
Route returns:
- `answer: string`
- `usedSections: string[]` (for transparency/debugging)
- `safetyFlags: string[]` (empty in normal path; populated on refusal/fallback)

## 7. UI/UX Design (Global Docked Panel)

### 7.1 Placement and Visibility
- Fixed bottom-right panel available across all pages via `app/layout.tsx`.
- Compact size with internal scroll for conversation history.
- Respect light/dark/system themes through existing theme provider.

### 7.2 Interactions
- Textarea input with Enter to send and Shift+Enter newline.
- Loading indicator during server request.
- Clear conversation action (client-local history reset).
- Starter prompt chips (for quick onboarding) based on route context.

### 7.3 Accessibility
- Keyboard focus order is predictable.
- Icon buttons have labels.
- Panel structure uses semantic regions and readable contrast.

## 8. Request Flow

1. User submits message in panel.
2. Client posts `{ message, route, history }` to `/api/assistant/chat`.
3. Route validates input and loads normalized knowledge.
4. Relevance module selects contextual slices.
5. Prompt module builds constrained Gemini input.
6. Gemini adapter calls model with server-side API key.
7. Policy layer validates output path and returns `{ answer, usedSections, safetyFlags }`.
8. Client appends assistant response to local chat history.

## 9. Error Handling and Reliability

- **Missing API key:** explicit development error; safe production fallback message.
- **Provider/network failure:** deterministic fallback response, no fabricated content.
- **Invalid request shape:** 400 with clear error payload.
- **Unexpected server error:** 500 with generic safe message; no secret leakage.
- **Abuse control (v1):** simple per-session cooldown or lightweight in-memory request throttling in route layer.

## 10. Security and Privacy

- Gemini key stored only as server environment variable (`GEMINI_API_KEY`).
- No client-side model key usage.
- No logging of secrets or sensitive headers.
- Chat history remains session-local on client for v1 (no persistence/database).

## 11. Vercel Deployment Design

- Configure env vars in Vercel project (Preview + Production).
- Keep Gemini integration inside server route/libs to ensure key isolation.
- Build remains standard Next.js App Router deployment.
- No extra infrastructure needed for v1 (no vector DB, no background workers).

## 12. Testing and Verification Strategy

Repository-aligned checks:
- `pnpm lint`
- `pnpm build`

Behavior checks:
- In-scope prompts across homepage/about/projects/certificates produce grounded answers.
- Out-of-scope prompts are refused politely.
- `usedSections` aligns with expected route and question context.
- UI remains usable in both light and dark theme.

## 13. Implementation Plan Boundaries

This design is scoped for one implementation cycle that includes:
- Global UI integration in layout.
- Server route + Gemini adapter.
- Normalized knowledge + relevance selector.
- Guardrails, fallback behavior, and basic abuse control.

Anything requiring persistent memory, retrieval infrastructure, or advanced analytics is intentionally deferred to post-v1 work.
