create table if not exists subscribers (
  email text primary key,
  consented_at text not null
);

create table if not exists events (
  id integer primary key autoincrement,
  title text not null,
  starts_on text not null,
  start_time text,
  place text not null,
  summary text not null,
  organiser text not null,
  website text,
  created_at text not null
);

create table if not exists drafts (
  month text primary key,
  body text not null,
  created_at text not null
);
