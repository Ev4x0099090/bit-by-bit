# Bit by Bit

Computer Science, one idea at a time. By Learning Lab.

An independent Cambridge O Level Computer Science (2210) learning resource with 96 guided lessons, 859 active questions, visual activities and practice across studied topics. It is not endorsed by Cambridge.

## Stack

- Next.js 16 and React on Vercel
- Supabase Auth for student accounts
- Supabase PostgreSQL for completions and attempts
- A Supabase Edge Function verifies the student and marks answers before storing them

Lessons are public. Signing in is required for account progress and automatic marking of coding exercises.

## Paper 2 practice

The separate Paper 2 tab includes one complete October/November paper per year from 2020 to 2025: 2210/22 for 2020–2021 and 2210/23 for 2022–2025. All 108 marked question parts are included. The 2020–2022 papers retain their original /50 totals and pre-release scenarios; 2023–2025 are /75. Older query-by-example tasks are labelled as earlier-syllabus content.

Questions use native text/tables and vector figures from the original questions. PDFs and paper screenshots are not hosted. CodeMirror provides syntax highlighting, indentation, undo and aligned line numbers. Diagram answers store editable shapes, gates and connections. Code is not executed.

Groq's `openai/gpt-oss-120b` marks against trusted server-side Cambridge schemes. Criteria, integer mark limits, evidence and totals are validated on the server; blank and selected fixed-response parts are marked without a model call. The final result uses the matching component thresholds, shows raw marks and an estimated A–E grade, and offers feedback plus example/correct answers. Flagged results need teacher review. Component grades do not include A*.

Default entry resumes unfinished work or randomly selects an untried paper. After more than one attempt, history appears with raw marks, grades and Review/Continue actions. Explicitly starting an untried paper preserves other unfinished attempts. Completed papers are skipped. Marking saves progress question by question and can resume after rate limits or reloads.

Nineteen lessons also include writing exercises and short prerequisite explanations. Guest drafts stay on the device; signed-in drafts, results and resume positions are stored in separate RLS-protected tables. They do not overwrite existing objective mastery.

## Development

Use Node.js 22.13 or later. Run `npm ci`, copy `.env.example` to `.env.local`, and set the project's public Supabase URL and publishable key. Never put a secret/service-role key in browser variables or source control.

Run `npm run dev` and open http://127.0.0.1:5173. Run `npm test` for grading, teaching and backend tests. Run `npm run build` for a production build.

## Supabase

Apply the versioned SQL migrations with the Supabase CLI or MCP. Deploy `supabase/functions/learning-progress` and `supabase/functions/paper-practice` with all their relative dependencies and deno.json. `npm run build` regenerates both marking banks before building. Deploy the updated function after changing assessed questions or marking rules.

Set `GROQ_API_KEY` only in Supabase Edge Function secrets. Never place it in browser variables, Vercel public variables or source control. Paper marking is limited atomically to five requests per minute and fifty per day per student; provider-wide limits also apply. Partial results and drafts survive provider errors. The client cannot write its own marks, rubrics or grade.

The function verifies every bearer token with Supabase Auth. Gateway legacy JWT verification is disabled to support asymmetric signing keys; this does not make progress public. RLS allows students to read only their own rows. Only the verified backend writes scores, and an atomic per-student limit restricts submissions to 30 per minute.

Set Supabase Auth's Site URL to the production Vercel URL. Allow that origin's `/auth/callback` and `/auth/confirm` URLs (and localhost callbacks only for development). Enable a custom SMTP sender before opening public email registration. Confirmation and password recovery links must return to this app. Google sign-in is optional and is displayed only when `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true` after the provider is configured.

## Vercel

Import this repository with the Next.js preset. Add the variables from `.env.example` to the desired Vercel environments before building. Production must use the same Supabase project as the deployed backend. Keep production publicly readable and preview deployment access as desired.

No secret database key is required in Vercel: the Edge Function uses Supabase's built-in backend credentials. Do not commit `.env.local`, authentication state, or deployment secrets.

## Existing progress

The original Sites deployment and its Cloudflare data are separate from this new Supabase project. This migration preserves lesson/question IDs and archived prompts, but does not automatically map ChatGPT identities to new Supabase accounts. Existing student data must be transferred only after identifying the matching account; never copy one student's progress into another account.
