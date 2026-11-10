create table if not exists community_events (
  id          serial primary key,
  title       text not null,
  starts_on   date not null,
  start_time  text,
  place       text not null,
  summary     text not null,
  organiser   text not null,
  website     text,
  created_at  timestamptz not null default now()
);

create index if not exists community_events_starts_on_idx
  on community_events (starts_on);

create table if not exists stay_listings (
  id          serial primary key,
  name        text not null,
  kind        text not null,
  area        text not null,
  summary     text not null,
  website     text not null,
  created_at  timestamptz not null default now()
);

create table if not exists corrections (
  id          serial primary key,
  page        text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

create table if not exists newsletter_drafts (
  id          serial primary key,
  month       text not null unique,
  body        text not null,
  created_at  timestamptz not null default now()
);
