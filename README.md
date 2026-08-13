# Valle Paraíso Bilingüe · Taller 1 — Panel de recursos

Reescritura del sitio original (HTML estático + un objeto `SITE_DATA` embebido)
como una aplicación Next.js con el contenido leído en vivo desde Supabase.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · Supabase (Postgres + Storage + Realtime) · shadcn/ui ·
Recharts · Vercel.

---

## 1. Cómo quedó organizado el contenido

Todo lo que antes vivía en el objeto `SITE_DATA` del `index.html` ahora es
una fila editable en una tabla de Supabase. **No hay login**: el contenido
se lee con la llave pública ("anon") y se edita directamente desde el
**Table Editor** del dashboard de Supabase con tu sesión de administrador.

| Antes (`SITE_DATA.x`)       | Ahora (tabla en Supabase)                          |
|------------------------------|-----------------------------------------------------|
| `programa.parrafos/pilares`  | `programa`, `pilares`                                |
| `cronograma`                 | `cronograma`                                         |
| `salas`                      | `salas`                                              |
| `equipo.conferencista/talleristas` | `equipo` (una tabla, columna `rol_tipo`)      |
| `documentos`                 | `documentos` (+ bucket de Storage `docs`)            |
| `bancos`                     | `bancos` (+ bucket de Storage `docs`)                |
| `memorias.intro`             | `memorias_config`                                    |
| `memorias.tabs`              | `memoria_tabs` → `memoria_groups` → `memoria_items`  |
| `contacto`                   | `contacto`                                           |
| *(nuevo)*                    | `descargas` — registra cada clic de descarga, alimenta la gráfica en vivo |

Dos gráficas con Recharts, como pediste:
- **Cronograma visual** (sección Programa): línea de tiempo del día.
- **Documentos más descargados** (sección Bancos): conteo real por
  documento/banco, con **actualización en vivo** vía Supabase Realtime
  (dos pestañas abiertas a la vez se sincronizan solas).

---

## 2. Crear el proyecto de Supabase

1. Ve a [supabase.com](https://supabase.com) → **New project**.
2. Cuando esté listo, entra a **SQL Editor** y corre, en este orden:
   1. Todo el contenido de [`supabase/schema.sql`](./supabase/schema.sql) → **Run**.
      Crea las tablas, activa Row Level Security (lectura pública en todo,
      inserción pública solo en `descargas`) y habilita Realtime.
   2. Todo el contenido de [`supabase/seed.sql`](./supabase/seed.sql) → **Run**.
      Carga el mismo contenido que tenía el sitio original.
3. Ve a **Storage** → **New bucket** → nómbralo exactamente `docs` → márcalo
   como **Public bucket** → Create.
4. Sube estos archivos a la **raíz** del bucket `docs` (sin subcarpetas),
   con estos nombres exactos (son los que ya están referenciados en
   `seed.sql`):
   - `Guia_Digital_Participante_Taller1_Valle_Paraiso_Bilingue.docx`
   - `Banco_100_Prompts_IA_Taller1_Valle_Paraiso_Bilingue.docx`
   - `Banco_Plantillas_Editables_Taller1_Valle_Paraiso_Bilingue.docx`
   - `Repositorio_Recursos_Digitales_Taller1_Valle_Paraiso_Bilingue.docx`
   - `1__Banco_de_herramientas_digitales_-_Valle_Paraiso.xlsx`
   - `2__Banco_de_Recursos_de_Aprendizaje.xlsx`
   - `3__Banco_de_Recursos_y_Herramientas_Libres.xlsx`

   Si subes un archivo con otro nombre, actualiza la columna `archivo_path`
   de la fila correspondiente en `documentos` o `bancos` (Table Editor).
5. Copia tu **Project URL** y tu **anon public key**
   (Project Settings → API).

### Fotos del equipo (opcional)

Las fotos de `equipo.foto_url` quedaron en `NULL` en el seed — sin foto, el
avatar cae automáticamente a iniciales sobre un fondo de color (igual que
el `handleAvatarError` del sitio original). Para usar fotos reales: crea un
bucket público (por ejemplo `team`), sube las fotos, y pega la URL pública
completa en la columna `foto_url` de la tabla `equipo`.

---

## 3. Correr el proyecto en local

```bash
npm install
cp .env.local.example .env.local
# edita .env.local con tu Project URL y anon key
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Si ves la pantalla "Configura Supabase" en vez del sitio, revisa que
`.env.local` tenga los dos valores correctos y que hayas corrido
`schema.sql` + `seed.sql`.

---

## 4. Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub/GitLab.
2. En [vercel.com](https://vercel.com) → **Add New... → Project** → importa
   el repo.
3. En **Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (los mismos valores de tu `.env.local`)
4. Deploy. Vercel detecta Next.js automáticamente — no hace falta configurar
   nada más.

Cada vez que edites contenido desde el Table Editor de Supabase, el cambio
se ve de inmediato en el sitio (la página se renderiza en cada visita, sin
caché estática — ver `export const dynamic = "force-dynamic"` en
`src/app/page.tsx`).

---

## 5. Editar contenido del día a día

Todo se edita desde **Supabase → Table Editor**, fila por fila:
- Reordenar tarjetas: cambia la columna `orden`.
- Agregar un nuevo banco de recursos: agrega una fila en `bancos` y sube su
  archivo al bucket `docs`.
- Cambiar el texto de un párrafo, bio, o descripción: edita la celda
  directamente.
- Actualizar el correo/teléfono de contacto: edita la única fila de
  `contacto`.

No hace falta tocar código ni volver a desplegar para ningún cambio de
contenido.

---

## 6. Estructura del proyecto

```
src/
  app/
    layout.tsx          Fuentes (Fraunces/Manrope/IBM Plex Mono) + metadata
    page.tsx             Server Component: trae todo de Supabase y arma la página
    globals.css          Theme de Tailwind v4 con la paleta del sitio original
  components/
    ui/                  Primitivas estilo shadcn/ui (Button, Card, Badge, Tabs)
    sections/            Una sección del sitio por archivo
    reveal.tsx            Wrapper de Framer Motion para animación al hacer scroll
    avatar.tsx            Avatar con fallback a iniciales
  lib/
    supabase/            Clientes de Supabase (server.ts para RSC, client.ts para el navegador)
    queries.ts            Toda la lectura de datos del sitio, en paralelo
    database.types.ts     Tipos TypeScript a mano (misma forma que `supabase gen types`)
    storage.ts             Construye URLs públicas del bucket "docs"
    track-download.ts      Registra una descarga (dispara la gráfica en vivo)
    colors.ts               Paleta compartida entre Tailwind y Recharts
supabase/
  schema.sql              Tablas + Row Level Security + vista de conteos + Realtime
  seed.sql                 Contenido inicial (igual al SITE_DATA original)
```

### Nota técnica: por qué algunas consultas usan `as unknown as`

En `src/lib/queries.ts`, `src/components/sections/downloads-chart.tsx` y
`src/lib/track-download.ts` verás un cast explícito documentado con un
comentario. Con las ~12 tablas de este esquema, el chequeo de tipos de
`@supabase/postgrest-js` degrada el tipo de algunas consultas puntuales a
`never` — es un límite de inferencia de TypeScript en esquemas grandes, no
un problema de tus datos ni de tu SQL (la forma real en tiempo de
ejecución la garantiza `schema.sql`). El cast solo restaura el tipo
correcto en ese punto puntual.

---

## 7. Comandos disponibles

```bash
npm run dev      # desarrollo local
npm run build    # build de producción (Vercel lo corre automáticamente)
npm run start    # sirve el build de producción en local
npm run lint     # ESLint
```
