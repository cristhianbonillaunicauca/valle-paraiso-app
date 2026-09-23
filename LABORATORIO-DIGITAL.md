# Laboratorio Digital para Docentes · Guía de edición

## Rutas del sitio

| Ruta | Contenido |
|---|---|
| `/` | Portada: ¿Qué quieres crear hoy?, accesos rápidos, destacados del día, agenda interactiva, impacto, ruta y equipo |
| `/explorar` | Explorador de 93 herramientas y 100 prompts con filtros (URL compartible) |
| `/prompts` | Generador de prompts y Banco de 100 prompts |
| `/aprende` | 8 microtutoriales con "Ahora inténtalo tú" |
| `/biblioteca` | Documentos, bancos, presentaciones y evidencias, con vista previa y descargas reales |
| `/memorias` | Memorias del programa (A) y enlace a Experiencias docentes (B) |
| `/experiencias` | Galería de experiencias docentes con filtros |
| `/valle` | Valle Paraíso en Acción: 42 municipios |
| `/ruta` | Ruta de innovación con insignias |
| `/guardados` | Mis recursos guardados |
| `/buscar` | Búsqueda global agrupada |

## Dónde se edita cada contenido

- **Supabase (sin tocar código):** programa, cronograma, salas, equipo, documentos, bancos, memorias, contacto.
- **`src/content/herramientas.ts`:** las 93 herramientas (fuente: Banco de herramientas digitales).
- **`src/content/prompts.ts`:** los 100 prompts (fuente: Banco de 100 Prompts de IA).
- **`src/content/tutoriales.ts`:** microtutoriales. El campo `videoUrl` queda listo para videos.
- **`src/content/impacto.ts`:** indicadores. `null` se muestra como "Dato pendiente". Nunca inventar cifras.
- **`src/content/experiencias.ts`:** experiencias publicadas (solo con autorización) y enlace del formulario.
- **`src/content/municipios.ts`:** datos verificados por municipio.
- **`src/content/site.ts`:** menú, redes sociales y enlace de política de privacidad.
- **`src/content/ruta.ts`:** pasos de la ruta e insignias.

## Qué funciona sin servidor propio

Favoritos, progreso de la ruta e insignias se guardan en el navegador (localStorage).
Para sincronizarlos entre dispositivos haría falta autenticación (por ejemplo, Supabase Auth).
