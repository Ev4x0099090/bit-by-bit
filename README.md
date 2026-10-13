# Bit by Bit

Computer Science, one idea at a time. By Learning Lab.

An independent Cambridge O Level Computer Science (2210) learning resource with 96 guided lessons, visual activities and practice across studied topics. It is not endorsed by Cambridge.

## Stack

- Next.js 16 and React on Vercel
- Supabase Auth for student accounts
- Supabase PostgreSQL for completions and attempts
- A Supabase Edge Function verifies the student and marks answers before storing them

Lessons are public. Signing in is required to save progress. Written answers use a clearly labelled student-reviewed rubric.

## Development

Use Node.js 22.13 or later. Run `npm ci`, copy `.env.example` to `.env.local`, and set the project's public Supabase URL and publishable key. Never put a secret/service-role key in browser variables or source control.

Run `npm run dev` and open http://127.0.0.1:5173. Run `npm test` for grading, teaching and backend tests. Run `npm run build` for a production build.

## Supabase

Apply the versioned SQL migrations with the Supabase CLI or MCP. Deploy `supabase/functions/learning-progress` with all five files. `npm run build` regenerates the question bank and shared marking code before building the app. Deploy the updated function after changing assessed questions or marking rules.

The function verifies every bearer token with Supabase Auth. Gateway legacy JWT verification is disabled to support asymmetric signing keys; this does not make progress public. RLS allows students to read only their own rows. Only the verified backend writes scores, and an atomic per-student limit restricts submissions to 30 per minute.

Set Supabase Auth's Site URL to the production Vercel URL. Allow that origin's `/auth/callback` and `/auth/confirm` URLs (and localhost callbacks only for development). Enable a custom SMTP sender before opening public email registration. Confirmation and password recovery links must return to this app. Google sign-in is optional and is displayed only when `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true` after the provider is configured.

## Vercel

Import this repository with the Next.js preset. Add the variables from `.env.example` to the desired Vercel environments before building. Production must use the same Supabase project as the deployed backend. Keep production publicly readable and preview deployment access as desired.

No secret database key is required in Vercel: the Edge Function uses Supabase's built-in backend credentials. Do not commit `.env.local`, authentication state, or deployment secrets.

## Existing progress

The original Sites deployment and its Cloudflare data are separate from this new Supabase project. This migration preserves lesson/question IDs and archived prompts, but does not automatically map ChatGPT identities to new Supabase accounts. Existing student data must be transferred only after identifying the matching account; never copy one student's progress into another account.
