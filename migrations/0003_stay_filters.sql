alter table stay_listings add column if not exists bedrooms integer;
alter table stay_listings add column if not exists guests integer;
alter table stay_listings add column if not exists sea_view boolean not null default false;
alter table stay_listings add column if not exists parking boolean not null default false;
alter table stay_listings add column if not exists wifi boolean not null default false;
alter table stay_listings add column if not exists dog_friendly boolean not null default false;
alter table stay_listings add column if not exists hot_tub boolean not null default false;
