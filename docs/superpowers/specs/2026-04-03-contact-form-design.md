# Contact Form Page Design (Iterative UI + EmailJS)

## Problem Statement
The current `app/contact/page.tsx` is a placeholder and does not provide a usable contact experience.  
We need a production-safe contact flow that fits the portfolio style, validates inputs consistently, provides optimistic UX feedback, and sends emails through EmailJS in both development and production.

## Goals
1. Deliver a **minimal, professional** contact page aligned with existing site patterns.
2. Use `react-hook-form` + Zod for client/server-aligned validation.
3. Use an API-route-first submission flow (`POST /api/contact`) with EmailJS provider integration.
4. Apply React 19-era UX hooks for responsive submission feedback (optimistic state + transitions).
5. Include v1 abuse controls (honeypot + server-side rate limiting).
6. Provide clear success/error UX: inline success with “Send another”, inline error with retry while preserving entered values.

## Non-Goals (v1)
1. Multi-step wizard forms.
2. CAPTCHA providers (Turnstile/reCAPTCHA).
3. Database-backed message persistence.
4. Advanced analytics dashboard for contact traffic.

## Confirmed Product Decisions
1. Submission architecture: **API route proxy to EmailJS**.
2. Fields: **Name, Email, Subject, Message**.
3. Anti-spam: **Honeypot + server-side rate limiting**.
4. Success UX: **Inline success state, keep values, allow “Send another”**.
5. Failure UX: **Inline error near submit + retry button, keep values**.
6. Environment behavior: **Dedicated EmailJS dev service/template in development**.
7. Visual direction: **Minimal and professional**.

## Proposed Architecture
### 1) Page and component boundaries
- `app/contact/page.tsx` (Server Component): route metadata + page shell composition.
- `components/pages/contact/contact-page-shell.tsx` (Server Component): layout wrapper and static content.
- `components/pages/contact/contact-form.tsx` (`"use client"`): interactive form UI and submission orchestration.
- `lib/contact/schema.ts`: shared Zod schema + TypeScript inference for form payload.
- `lib/contact/rate-limit.ts`: route-level IP limiter utility.
- `lib/contact/emailjs.ts`: provider adapter for EmailJS request construction and sending.
- `app/api/contact/route.ts`: request validation, abuse checks, EmailJS invocation, response mapping.

### 2) Submission flow
1. User fills form.
2. Client runs Zod validation via `react-hook-form` resolver.
3. On submit, client posts JSON payload to `/api/contact`.
4. Route validates payload again with shared schema.
5. Route rejects honeypot or rate-limited requests.
6. Route sends provider request through EmailJS adapter (env-specific IDs).
7. Route returns normalized `{ ok, message, requestId? }`.
8. Client updates optimistic status and renders success/error state.

## React 19 + Form Strategy
### Primary hooks and usage
- `react-hook-form`: field registration, touched/dirty tracking, error mapping, submission handler.
- `useOptimistic`: immediate “submission timeline” state (`idle -> validating -> sending -> sent|error`) so the UI responds instantly.
- `useTransition`: keep UI responsive while async submit runs and to gate disabled/loading controls.

### Why not server actions in v1
Server Actions can work, but API-route-first is chosen for clearer abuse controls, easier provider abstraction, and straightforward environment handling for EmailJS credentials.

## Validation and Data Contract
Shared Zod schema (`ContactFormSchema`) for both client and route:
- `name`: 2-80 chars, trimmed.
- `email`: valid email format, trimmed + lowercased server-side.
- `subject`: 3-120 chars.
- `message`: 20-2000 chars.
- `companyWebsite` (optional honeypot): must be empty.

Server response contract:
- success: `{ ok: true, message: "Message sent successfully.", requestId: string }`
- failure: `{ ok: false, message: string, fieldErrors?: Record<string,string[]> }`

## EmailJS Integration (Dev + Production)
### Environment variables
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`
- `EMAILJS_SERVICE_ID_DEV`
- `EMAILJS_TEMPLATE_ID_DEV`
- `EMAILJS_SERVICE_ID_PROD`
- `EMAILJS_TEMPLATE_ID_PROD`
- `EMAILJS_TO_EMAIL` (optional template parameter helper)

### Selection logic
- If `NODE_ENV === "production"`: use `*_PROD` IDs.
- Otherwise: use `*_DEV` IDs.
- Route fails fast with explicit 500 response if required vars are missing.

### Provider adapter behavior
- Centralize payload mapping from app model to EmailJS template params.
- Normalize EmailJS error shapes into app-level error messages.
- Return structured result to route (`success`, `providerStatus`, `providerErrorCode`).

## Anti-Spam and Reliability
### Honeypot
- Hidden input rendered in the client form.
- If non-empty on server, return generic success-like response or hard reject (v1 decision: hard reject with generic message to avoid silent ambiguity in logs).

### Rate limiting
- Sliding window by client IP in route utility.
- Baseline: max 3 requests per 10 minutes per IP.
- For serverless constraints, keep utility pluggable so future migration to Redis/Upstash is easy.

### Error handling
- Preserve user-entered values on all failures.
- Inline error area near submit with retry action.
- Do not swallow provider failures; log server-side details and return user-safe messages.

## UI/UX Design (Minimal + Professional)
### Layout
- Desktop: balanced two-column layout (`intro/availability card` + `form card`).
- Mobile/tablet: single-column stack with form prioritized.
- Reuse shadcn primitives: `Card`, `Input`, `Textarea`, `Button`, `Field` utilities.

### Content hierarchy
- Clear title and short trust-building copy.
- Optional response-time expectation note.
- Submit section with compact status messaging area.

### State UX
- Idle: neutral submit CTA.
- Sending: disabled controls + spinner + optimistic status text.
- Success: inline success block with “Send another” button.
- Error: inline destructive message + retry CTA.

### Accessibility
- Semantic labels and described-by links for errors/help text.
- Keyboard-first submission flow and focus management.
- `aria-invalid` and `role="alert"` usage for errors.

## Iterative Delivery Plan
1. **Iteration 1: Structure + visual baseline**
   - Implement page shell, intro copy, and responsive layout scaffolding.
2. **Iteration 2: Form controls + client validation**
   - Add RHF + Zod wiring and inline field-level errors.
3. **Iteration 3: API route + EmailJS adapter**
   - Build route, env selection logic, and provider integration.
4. **Iteration 4: Anti-spam + resilience UX**
   - Add honeypot, rate limiting, inline retry/error/success states, optimistic status flow.
5. **Iteration 5: polish + production readiness**
   - Accessibility pass, metadata refinements, and env docs updates.

## Testing and Verification Strategy
1. Schema unit-level checks via route-level validation assertions (invalid payloads rejected).
2. Manual integration checks:
   - Dev env sends real email through DEV template.
   - Production config path uses PROD template IDs.
   - Honeypot and rate-limit rejection paths behave as expected.
3. UI checks for all status states (idle/sending/success/error) in light and dark themes.

## Risks and Mitigations
- **EmailJS credential misconfiguration** -> startup/read-time validation + explicit runtime errors.
- **Serverless in-memory rate-limit limitations** -> utility abstraction for future distributed store.
- **Overlapping form state sources** (`react-hook-form` + optimistic status) -> keep form values in RHF and status timeline in optimistic state only.

## Open Follow-Up (post-v1)
1. Add CAPTCHA if spam volume increases.
2. Add observability hook (request IDs + error category tracking).
3. Consider server action variant once abuse controls remain equivalent.
