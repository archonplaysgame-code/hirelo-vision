
-- ============================================================
-- ENUMS
-- ============================================================
create type public.app_role as enum ('admin', 'recruiter', 'hiring_manager');
create type public.job_status as enum ('active', 'closed');
create type public.job_type as enum ('Full-time', 'Part-time', 'Contract');
create type public.candidate_stage as enum ('Applied', 'Reviewed', 'Interview Scheduled', 'Offer Sent', 'Hired');
create type public.candidate_source as enum ('LinkedIn', 'Indeed', 'Rozee.pk', 'Mustakbil', 'Direct');

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by authenticated users"
  on public.profiles for select to authenticated using (true);
create policy "Users can update own profile"
  on public.profiles for update to authenticated using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert to authenticated with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- WORKSPACES + MEMBERS
-- ============================================================
create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'admin',
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;

-- Security-definer helpers (avoid RLS recursion)
create or replace function public.is_workspace_member(_workspace_id uuid, _user_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.workspace_members
    where workspace_id = _workspace_id and user_id = _user_id
  )
$$;

create or replace function public.current_workspace_id()
returns uuid
language sql stable security definer set search_path = public
as $$
  select workspace_id from public.workspace_members
  where user_id = auth.uid()
  order by created_at asc limit 1
$$;

create policy "Members can view their workspaces"
  on public.workspaces for select to authenticated
  using (public.is_workspace_member(id, auth.uid()));
create policy "Authenticated users can create workspaces"
  on public.workspaces for insert to authenticated
  with check (auth.uid() = created_by);
create policy "Members can update their workspaces"
  on public.workspaces for update to authenticated
  using (public.is_workspace_member(id, auth.uid()));

create policy "Members can view workspace members"
  on public.workspace_members for select to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Users can insert themselves as members"
  on public.workspace_members for insert to authenticated
  with check (user_id = auth.uid());
create policy "Members can be deleted by themselves"
  on public.workspace_members for delete to authenticated
  using (user_id = auth.uid() or public.is_workspace_member(workspace_id, auth.uid()));

-- ============================================================
-- USER_ROLES (app-wide)
-- ============================================================
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select to authenticated using (user_id = auth.uid());

-- ============================================================
-- JOBS
-- ============================================================
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  department text not null default '',
  location text not null default '',
  type public.job_type not null default 'Full-time',
  status public.job_status not null default 'active',
  salary text not null default '',
  posted_on date not null default current_date,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.jobs enable row level security;

create policy "Members can view jobs in their workspaces"
  on public.jobs for select to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Members can insert jobs in their workspaces"
  on public.jobs for insert to authenticated
  with check (public.is_workspace_member(workspace_id, auth.uid()) and created_by = auth.uid());
create policy "Members can update jobs in their workspaces"
  on public.jobs for update to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Members can delete jobs in their workspaces"
  on public.jobs for delete to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));

create index jobs_workspace_id_idx on public.jobs(workspace_id);

-- ============================================================
-- CANDIDATES
-- ============================================================
create table public.candidates (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  job_id uuid not null references public.jobs(id) on delete cascade,
  name text not null,
  email text not null default '',
  phone text not null default '',
  source public.candidate_source not null default 'Direct',
  stage public.candidate_stage not null default 'Applied',
  applied_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.candidates enable row level security;

create policy "Members can view candidates in their workspaces"
  on public.candidates for select to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Members can insert candidates in their workspaces"
  on public.candidates for insert to authenticated
  with check (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Members can update candidates in their workspaces"
  on public.candidates for update to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Members can delete candidates in their workspaces"
  on public.candidates for delete to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));

create index candidates_workspace_id_idx on public.candidates(workspace_id);
create index candidates_job_id_idx on public.candidates(job_id);

-- ============================================================
-- CANDIDATE NOTES
-- ============================================================
create table public.candidate_notes (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);
alter table public.candidate_notes enable row level security;

create or replace function public.candidate_in_my_workspace(_candidate_id uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.candidates c
    join public.workspace_members wm on wm.workspace_id = c.workspace_id
    where c.id = _candidate_id and wm.user_id = auth.uid()
  )
$$;

create policy "Members can view notes on candidates they can see"
  on public.candidate_notes for select to authenticated
  using (public.candidate_in_my_workspace(candidate_id));
create policy "Members can add notes on candidates they can see"
  on public.candidate_notes for insert to authenticated
  with check (public.candidate_in_my_workspace(candidate_id) and author_id = auth.uid());
create policy "Authors can delete their own notes"
  on public.candidate_notes for delete to authenticated
  using (author_id = auth.uid());

create index candidate_notes_candidate_id_idx on public.candidate_notes(candidate_id);

-- ============================================================
-- INVITES
-- ============================================================
create table public.invites (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  email text not null,
  role public.app_role not null default 'recruiter',
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  invited_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);
alter table public.invites enable row level security;

create policy "Members can view invites in their workspaces"
  on public.invites for select to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));
create policy "Members can create invites in their workspaces"
  on public.invites for insert to authenticated
  with check (public.is_workspace_member(workspace_id, auth.uid()) and invited_by = auth.uid());
create policy "Members can delete invites in their workspaces"
  on public.invites for delete to authenticated
  using (public.is_workspace_member(workspace_id, auth.uid()));

-- ============================================================
-- updated_at triggers
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger jobs_set_updated_at before update on public.jobs
  for each row execute function public.set_updated_at();
create trigger candidates_set_updated_at before update on public.candidates
  for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
