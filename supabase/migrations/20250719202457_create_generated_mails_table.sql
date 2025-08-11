create table mails (
  id uuid primary key default gen_random_uuid(),
  userId uuid default gen_random_uuid(),
  tone text,
  core text,
  context text,
  generated text,
  created timestamp with time zone default now()
);