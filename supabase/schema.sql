-- Generic key/value flag store for the "faltas" panel (roadmap checklist,
-- warehouse pending items, unseen signals, undecided ideas).
-- Run this once in the Supabase SQL editor.

create table if not exists flags (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Row Level Security stays on; all access goes through the server (service
-- role key), never the browser, so no policies are needed for anon/authenticated.
alter table flags enable row level security;
