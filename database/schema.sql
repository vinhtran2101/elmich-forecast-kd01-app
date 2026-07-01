create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  employee_code text unique,
  full_name text not null,
  email text not null unique,
  phone text,
  department text,
  title text,
  status text not null default 'active' check (status in ('active', 'inactive', 'locked')),
  initials text,
  tone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  scope_type text not null default 'custom',
  scope_label text,
  risk text,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete restrict,
  scope_note text,
  created_at timestamptz not null default now(),
  unique (user_id, role_id)
);

create table if not exists modules (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  data_label text,
  sort_order int not null default 0
);

create table if not exists role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references roles(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  permission_level text not null check (permission_level in ('full', 'scoped', 'view', 'locked')),
  data_scope text not null default 'assigned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (role_id, module_id)
);

create table if not exists sales_channels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  short_name text,
  region text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  icon_key text,
  icon_tone text,
  marker text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists channel_assignments (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references sales_channels(id) on delete cascade,
  user_id uuid not null references users(id) on delete restrict,
  role_code text not null,
  effective_from date not null default current_date,
  effective_to date,
  created_at timestamptz not null default now(),
  unique (channel_id, user_id, role_code, effective_from)
);

create table if not exists forecast_cycles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  month int not null check (month between 1 and 12),
  year int not null,
  title text not null,
  total_deadline_at timestamptz not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'appraisal', 'approval', 'published', 'rejected')),
  tone text,
  note text,
  template_file_name text,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists forecast_tasks (
  id uuid primary key default gen_random_uuid(),
  forecast_cycle_id uuid not null references forecast_cycles(id) on delete cascade,
  channel_id uuid not null references sales_channels(id) on delete restrict,
  owner_id uuid references users(id) on delete set null,
  rsm_id uuid references users(id) on delete set null,
  director_id uuid references users(id) on delete set null,
  deadline_at timestamptz not null,
  status text not null default 'assigned',
  status_tone text,
  due_text text,
  progress int not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (forecast_cycle_id, channel_id)
);

create table if not exists forecast_files (
  id uuid primary key default gen_random_uuid(),
  forecast_task_id uuid not null references forecast_tasks(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_size text,
  version int not null default 1,
  uploaded_by uuid references users(id) on delete set null,
  uploaded_at timestamptz not null default now(),
  note text,
  unique (forecast_task_id, version)
);

create table if not exists appraisal_reviews (
  id uuid primary key default gen_random_uuid(),
  forecast_cycle_id uuid not null references forecast_cycles(id) on delete cascade,
  forecast_task_id uuid references forecast_tasks(id) on delete cascade,
  department text not null,
  reviewer_id uuid references users(id) on delete set null,
  decision text not null default 'pending' check (decision in ('pending', 'approved', 'rejected')),
  comment text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists approvals (
  id uuid primary key default gen_random_uuid(),
  forecast_cycle_id uuid not null references forecast_cycles(id) on delete cascade,
  approver_id uuid references users(id) on delete set null,
  decision text not null default 'pending' check (decision in ('pending', 'approved', 'rejected')),
  comment text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_user_roles_user on user_roles(user_id);
delete from user_roles
where id in (
  select id
  from (
    select id, row_number() over (partition by user_id order by created_at desc) as row_number
    from user_roles
  ) ranked_user_roles
  where row_number > 1
);
create unique index if not exists uq_user_roles_primary_user on user_roles(user_id);
create index if not exists idx_role_permissions_role on role_permissions(role_id);
create index if not exists idx_channel_assignments_channel on channel_assignments(channel_id);
create index if not exists idx_forecast_tasks_cycle on forecast_tasks(forecast_cycle_id);
create index if not exists idx_forecast_tasks_owner on forecast_tasks(owner_id);
create index if not exists idx_forecast_files_task on forecast_files(forecast_task_id);
create index if not exists idx_activity_logs_entity on activity_logs(entity_type, entity_id);
create index if not exists idx_activity_logs_created_at on activity_logs(created_at desc);
