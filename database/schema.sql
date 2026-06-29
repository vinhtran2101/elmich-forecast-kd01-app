create extension if not exists pgcrypto;

create table users (
  id uuid primary key default gen_random_uuid(),
  employee_code text unique,
  full_name text not null,
  email text not null unique,
  phone text,
  department text,
  title text,
  status text not null default 'active' check (status in ('active', 'inactive', 'locked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table roles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  scope_type text not null default 'custom',
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  role_id uuid not null references roles(id) on delete restrict,
  scope_note text,
  created_at timestamptz not null default now(),
  unique (user_id, role_id)
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  sort_order int not null default 0
);

create table role_permissions (
  id uuid primary key default gen_random_uuid(),
  role_id uuid not null references roles(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  permission_level text not null check (permission_level in ('full', 'scoped', 'view', 'locked')),
  data_scope text not null default 'assigned',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (role_id, module_id)
);

create table sales_channels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  region text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table channel_assignments (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references sales_channels(id) on delete cascade,
  user_id uuid not null references users(id) on delete restrict,
  role_code text not null,
  effective_from date not null default current_date,
  effective_to date,
  created_at timestamptz not null default now()
);

create table forecast_cycles (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  month int not null check (month between 1 and 12),
  year int not null,
  title text not null,
  total_deadline_at timestamptz not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'appraisal', 'approval', 'published', 'rejected')),
  note text,
  template_file_name text,
  created_by uuid references users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table forecast_tasks (
  id uuid primary key default gen_random_uuid(),
  forecast_cycle_id uuid not null references forecast_cycles(id) on delete cascade,
  channel_id uuid not null references sales_channels(id) on delete restrict,
  owner_id uuid references users(id) on delete set null,
  rsm_id uuid references users(id) on delete set null,
  director_id uuid references users(id) on delete set null,
  deadline_at timestamptz not null,
  status text not null default 'assigned',
  progress int not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (forecast_cycle_id, channel_id)
);

create table forecast_files (
  id uuid primary key default gen_random_uuid(),
  forecast_task_id uuid not null references forecast_tasks(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_size text,
  version int not null default 1,
  uploaded_by uuid references users(id) on delete set null,
  uploaded_at timestamptz not null default now(),
  note text
);

create table appraisal_reviews (
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

create table approvals (
  id uuid primary key default gen_random_uuid(),
  forecast_cycle_id uuid not null references forecast_cycles(id) on delete cascade,
  approver_id uuid references users(id) on delete set null,
  decision text not null default 'pending' check (decision in ('pending', 'approved', 'rejected')),
  comment text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_user_roles_user on user_roles(user_id);
create index idx_role_permissions_role on role_permissions(role_id);
create index idx_channel_assignments_channel on channel_assignments(channel_id);
create index idx_forecast_tasks_cycle on forecast_tasks(forecast_cycle_id);
create index idx_forecast_tasks_owner on forecast_tasks(owner_id);
create index idx_forecast_files_task on forecast_files(forecast_task_id);
create index idx_activity_logs_entity on activity_logs(entity_type, entity_id);
create index idx_activity_logs_created_at on activity_logs(created_at desc);
