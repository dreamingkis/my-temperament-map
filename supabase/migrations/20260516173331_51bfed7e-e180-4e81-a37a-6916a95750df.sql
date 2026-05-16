
-- roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Admins can view roles" on public.user_roles
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- intake responses
create table public.intake_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  test_type text not null check (test_type in ('basic','deep')),
  nickname text,
  age_range text,
  gender text,
  occupation text,
  concern text,
  scores jsonb not null,
  facet_scores jsonb
);
alter table public.intake_responses enable row level security;

create policy "Anyone can submit intake" on public.intake_responses
  for insert to anon, authenticated
  with check (true);

create policy "Admins can view intake" on public.intake_responses
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index on public.intake_responses (created_at desc);
