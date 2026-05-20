# Convert Hirelo from dummy data to a real app

Today every page (dashboard, jobs, candidates, analytics, settings) reads from a hardcoded array in `src/lib/dummy-data.ts`. Nothing persists, every user sees the same data, and there's no login. This plan replaces all of that with real authentication, a real database, and real CRUD.

## What you'll be able to do after this

- Sign up / log in with email + password (and stay logged in)
- Post jobs, edit them, close them — your jobs only
- Add candidates to a job, move them through the pipeline (Applied → Hired)
- See dashboard stats and analytics computed from your real data
- Invite teammates and manage workspace settings

## Scope by page

| Page | Today (dummy) | After |
|---|---|---|
| `/` landing | Static marketing copy | Unchanged (still marketing) |
| `/onboarding` | UI only, no save | Creates the user's workspace on submit |
| `/dashboard` | Hardcoded stats + recent items | Real counts + recent jobs/applicants from DB |
| `/jobs` | Static list of 6 | User's real jobs, searchable, paginated |
| `/jobs/new` | Form does nothing | Inserts a job, redirects to its detail page |
| `/jobs/$id` | Reads dummy array | Real job + its candidates; edit + close actions |
| `/candidates` | Static 24 candidates | Real candidates across all your jobs, filter by stage/source |
| `/candidates/$id` | Reads dummy array | Real candidate, edit details, change stage, add notes |
| `/analytics` | Hardcoded charts | Charts computed from your jobs/candidates |
| `/settings` | Static team list | Real team members + invites; profile edit |

## Data model

```text
workspaces      (id, name, created_by, created_at)
workspace_members (workspace_id, user_id, role)   role: admin | recruiter | hiring_manager
profiles        (id = auth user id, full_name, avatar_url)
user_roles      (user_id, role)                   app-wide role, separate table for security
jobs            (id, workspace_id, title, department, location, type, status, salary, posted_on, created_by)
candidates      (id, workspace_id, job_id, name, email, phone, source, stage, applied_date)
candidate_notes (id, candidate_id, author_id, body, created_at)
invites         (id, workspace_id, email, role, token, expires_at)
```

Row-Level Security on every table: users only see rows in workspaces they belong to. Roles live in `user_roles` (never on `profiles`) per the security rules.

## Build order

1. **Backend foundation** — enable Lovable Cloud, create the schema above with RLS, seed nothing.
2. **Auth** — `/login` and `/signup` routes, session persistence, redirect rules. `/onboarding` becomes the post-signup workspace-creation step.
3. **Route protection** — move all app pages under an `_authenticated` layout that redirects to `/login` when no session.
4. **Jobs CRUD** — list, create, detail, edit, close. Replace `jobs.tsx` reads with server functions.
5. **Candidates CRUD** — list, create, detail, stage change, notes. Replace `candidates.tsx` reads.
6. **Dashboard + analytics** — swap hardcoded numbers for aggregations (counts, group-by stage, group-by source, monthly applications).
7. **Settings + team** — profile edit, list members, send invites, accept invite flow.
8. **Cleanup** — delete `src/lib/dummy-data.ts` and every import of it.

Each step ships a working slice; the app stays usable throughout (old dummy pages keep working until their replacement lands).

## Technical notes

- Backend: Lovable Cloud (Postgres + auth + storage), accessed via TanStack Start `createServerFn` with `requireSupabaseAuth` middleware. No edge functions.
- Data fetching: TanStack Query (`ensureQueryData` in loaders, `useSuspenseQuery` in components) per the project's existing pattern.
- Mutations: `useMutation` + `queryClient.invalidateQueries` on success.
- Prerendering: drop the per-id prerender lists from `vite.config.ts` — detail pages become per-user dynamic. Keep `/` prerendered.
- Validation: Zod schemas on every server-fn `inputValidator`.
- The `Platform`, `Stage`, and `JobStatus` types stay; they move from `dummy-data.ts` into `src/lib/types.ts`.

## Out of scope (ask separately if you want these)

- Resume file uploads / parsing
- Email sending for invites (we'll generate invite links you copy/paste for now)
- Public careers page where candidates self-apply
- Importing candidates from LinkedIn/Indeed APIs
- Billing / plans
