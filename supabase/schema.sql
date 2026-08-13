-- =========================================================================
-- Valle Paraíso Bilingüe · Taller 1 — esquema de Supabase
-- =========================================================================
-- Cómo usar: Supabase Dashboard → SQL Editor → pega este archivo completo
-- → Run. Luego corre supabase/seed.sql para cargar el contenido inicial.
--
-- Diseño: no hay autenticación de usuarios (sitio "sin login"). Todo el
-- contenido es de lectura pública vía la llave anónima; Row Level Security
-- se usa para permitir SOLO lectura en las tablas de contenido, y lectura +
-- inserción en `descargas` (para poder registrar descargas sin login).
-- La edición de contenido se hace directamente desde el Table Editor del
-- dashboard de Supabase (con tu sesión de administrador, que ignora RLS).
-- =========================================================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. PROGRAMA (fila única con los párrafos introductorios)
-- -------------------------------------------------------------------------
create table if not exists programa (
  id int primary key default 1,
  parrafos text[] not null default '{}',
  constraint programa_singleton check (id = 1)
);

create table if not exists pilares (
  id serial primary key,
  titulo text not null,
  descripcion text not null,
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 2. CRONOGRAMA
-- -------------------------------------------------------------------------
create table if not exists cronograma (
  id serial primary key,
  hora text not null,
  label text not null,
  tipo text not null default 'neutro'
    check (tipo in ('neutro','navy','teal','orange','blue','red')),
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 3. LAS 4 SALAS
-- -------------------------------------------------------------------------
create table if not exists salas (
  id serial primary key,
  numero int not null,
  color text not null check (color in ('teal','orange','blue','red')),
  nombre text not null,
  resumen text not null,
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 4. EQUIPO (conferencista + talleristas en una sola tabla)
-- -------------------------------------------------------------------------
create table if not exists equipo (
  id serial primary key,
  rol_tipo text not null check (rol_tipo in ('conferencista','tallerista')),
  sala int,                         -- solo aplica a talleristas
  color text,                       -- solo aplica a talleristas
  nombre text not null,
  rol_o_especialidad text not null,
  bio text not null,
  foto_url text,                    -- URL pública en Supabase Storage, o NULL
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 5. DOCUMENTOS OFICIALES
-- -------------------------------------------------------------------------
create table if not exists documentos (
  id serial primary key,
  titulo text not null,
  tipo text not null check (tipo in ('PDF','DOCX','PPTX','XLSX')),
  descripcion text not null,
  archivo_path text not null,       -- ruta dentro del bucket "docs"
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 6. BANCOS DE RECURSOS
-- -------------------------------------------------------------------------
create table if not exists bancos (
  id serial primary key,
  titulo text not null,
  cantidad text not null,           -- texto libre: "93 recursos", "500+ recursos"...
  descripcion text not null,
  archivo_path text not null,       -- ruta dentro del bucket "docs"
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 7. DESCARGAS (para la gráfica de "Documentos más descargados")
-- -------------------------------------------------------------------------
create table if not exists descargas (
  id uuid primary key default gen_random_uuid(),
  recurso_tipo text not null check (recurso_tipo in ('documento','banco')),
  recurso_id int not null,
  created_at timestamptz not null default now()
);

create index if not exists descargas_recurso_idx on descargas (recurso_tipo, recurso_id);

create or replace view descargas_conteo as
  select recurso_tipo, recurso_id, count(*)::int as total
  from descargas
  group by recurso_tipo, recurso_id;

-- Habilita actualizaciones en vivo (Supabase Realtime) para la gráfica.
alter publication supabase_realtime add table descargas;

-- -------------------------------------------------------------------------
-- 8. MEMORIAS DIGITALES (intro + pestañas + grupos + items)
-- -------------------------------------------------------------------------
create table if not exists memorias_config (
  id int primary key default 1,
  intro text not null default '',
  constraint memorias_config_singleton check (id = 1)
);

create table if not exists memoria_tabs (
  id text primary key,              -- 'material', 'bancos', 'productos'...
  label text not null,
  tree boolean not null default false,
  orden int not null default 0
);

create table if not exists memoria_groups (
  id serial primary key,
  tab_id text not null references memoria_tabs(id) on delete cascade,
  titulo text not null,
  nota text,
  chips text[],
  orden int not null default 0
);

create table if not exists memoria_items (
  id serial primary key,
  group_id int not null references memoria_groups(id) on delete cascade,
  nombre text not null,
  disponible boolean not null default false,
  link text,
  orden int not null default 0
);

-- -------------------------------------------------------------------------
-- 9. CONTACTO (footer)
-- -------------------------------------------------------------------------
create table if not exists contacto (
  id int primary key default 1,
  entidad text,
  correo text,
  telefono text,
  constraint contacto_singleton check (id = 1)
);

-- =========================================================================
-- ROW LEVEL SECURITY — lectura pública en todo, inserción pública solo en
-- `descargas` (necesaria para registrar descargas sin pedir login).
-- =========================================================================
alter table programa        enable row level security;
alter table pilares         enable row level security;
alter table cronograma      enable row level security;
alter table salas           enable row level security;
alter table equipo          enable row level security;
alter table documentos      enable row level security;
alter table bancos          enable row level security;
alter table descargas       enable row level security;
alter table memorias_config enable row level security;
alter table memoria_tabs    enable row level security;
alter table memoria_groups  enable row level security;
alter table memoria_items   enable row level security;
alter table contacto        enable row level security;

create policy "lectura pública" on programa        for select using (true);
create policy "lectura pública" on pilares         for select using (true);
create policy "lectura pública" on cronograma      for select using (true);
create policy "lectura pública" on salas           for select using (true);
create policy "lectura pública" on equipo          for select using (true);
create policy "lectura pública" on documentos      for select using (true);
create policy "lectura pública" on bancos          for select using (true);
create policy "lectura pública" on memorias_config for select using (true);
create policy "lectura pública" on memoria_tabs    for select using (true);
create policy "lectura pública" on memoria_groups  for select using (true);
create policy "lectura pública" on memoria_items   for select using (true);
create policy "lectura pública" on contacto        for select using (true);

create policy "lectura pública de conteos" on descargas for select using (true);
create policy "cualquiera puede registrar una descarga" on descargas
  for insert with check (true);

-- La vista descargas_conteo hereda RLS de la tabla `descargas` porque se
-- creó sin la opción security_definer (comportamiento estándar en PG15+).
