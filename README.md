This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## AI Portfolio Chatbot

This project includes a global, docked AI assistant that answers only from portfolio content (about, skills, projects, certifications, services, and homepage highlights).

### Environment variables

Set these server-side variables for local and Vercel deployments:

```bash
GEMINI_API_KEY=your_gemini_api_key
# Optional override (default: gemini-2.0-flash)
GEMINI_MODEL=gemini-2.0-flash
# Optional: force verbose stream chunk logs on the server in development
ASSISTANT_STREAM_DEBUG=1
```

### API route

- `POST /api/assistant/chat` (primary)
- `POST /api/chat` (compatibility alias)

Request body:

```json
{
  "message": "What are Gio's strongest skills?",
  "route": "/about",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello!" }
  ]
}
```

Success response (default): `text/event-stream`

SSE events emitted in order:

1. `chunk` (repeated)
2. `meta` (once, near completion)
3. `done` (once)

Event payloads:

```txt
event: chunk
data: {"type":"chunk","delta":"..."}

event: meta
data: {"type":"meta","usedSections":["identity","skills"],"safetyFlags":[]}

event: done
data: {"type":"done"}
```

Error event during stream:

```txt
event: error
data: {"type":"error","message":"I'm having trouble reaching the AI provider right now. Please try again in a moment."}
```

JSON fallback response (non-stream), used when streaming cannot be initialized:

```json
{
  "answer": "...",
  "usedSections": ["identity", "skills"],
  "safetyFlags": []
}
```

### Debugging chunking and typing behavior

1. In the browser console, enable client debug logs:
   ```js
   localStorage.setItem('assistant-stream-debug', '1')
   ```
2. Reload, send a prompt, and watch console entries like:
   - `[assistant-stream][client] chunk-received` (arrival cadence and chunk size)
   - `[assistant-stream][client] stream-finished` (chunk totals vs rendered totals)
3. In DevTools Network, open `POST /api/assistant/chat` and confirm response `Content-Type` is `text/event-stream`.
4. In terminal/server logs (development), verify server-side chunk logs:
   - `[assistant-chat] stream-chunk`
   - `[assistant-chat] response-success-stream`
5. Disable client debug logs when done:
   ```js
   localStorage.removeItem('assistant-stream-debug')
   ```

### Vercel deployment notes

1. Add `GEMINI_API_KEY` in Project Settings → Environment Variables for Preview and Production.
2. Trigger a new deployment after saving env vars.
3. Verify the assistant from any route (the panel is mounted globally in `app/layout.tsx`).

## Contact Form (EmailJS)

The Contact page submits through `POST /api/contact`, which validates payloads server-side, applies honeypot + rate limiting checks, and then sends via EmailJS.

### Environment variables

Set these server-side variables for both local and Vercel deployments:

```bash
# Required (single config used in all environments)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Optional (recommended when EmailJS strict mode is enabled)
EMAILJS_PRIVATE_KEY=your_emailjs_private_key

# Optional template param helper
EMAILJS_TO_EMAIL=contact@your-domain.com
```

### Environment behavior

- The API route uses `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, and `EMAILJS_PUBLIC_KEY` as the primary configuration.
- If `EMAILJS_PRIVATE_KEY` is set, the API includes it for strict-mode compatibility.
- For backward compatibility, if `EMAILJS_SERVICE_ID` / `EMAILJS_TEMPLATE_ID` are missing, it falls back to `EMAILJS_SERVICE_ID_DEV` / `_PROD` and `EMAILJS_TEMPLATE_ID_DEV` / `_PROD`.

## Accessibility audits

The project includes Lighthouse and axe audit scripts for the accessibility target baseline:

```bash
pnpm audit:a11y
```

This command builds the app, starts a production server, and runs:

1. Lighthouse CI mobile accessibility assertions (`categories:accessibility` must be `1.0`)
2. Lighthouse CI desktop accessibility assertions (`categories:accessibility` must be `1.0`)
3. axe CLI checks for core public routes

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
