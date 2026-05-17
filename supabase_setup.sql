create table if not exists public.yt_subscriptions (
  visitor_id text primary key,
  channel_id text not null default 'kyento',
  created_at timestamptz not null default now()
);

alter table public.yt_subscriptions enable row level security;

grant select, insert, delete on public.yt_subscriptions to anon;

drop policy if exists "public select" on public.yt_subscriptions;
drop policy if exists "public insert" on public.yt_subscriptions;
drop policy if exists "public delete" on public.yt_subscriptions;

create policy "public select"
on public.yt_subscriptions
for select
to anon
using (true);

create policy "public insert"
on public.yt_subscriptions
for insert
to anon
with check (true);

create policy "public delete"
on public.yt_subscriptions
for delete
to anon
using (true);
