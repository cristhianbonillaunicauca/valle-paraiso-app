import { HERRAMIENTAS } from "@/content/herramientas";
import { PROMPTS } from "@/content/prompts";
import { TUTORIALES } from "@/content/tutoriales";
import { matches } from "@/lib/text";

export type SearchGroup = "Herramientas" | "Prompts" | "Tutoriales" | "Recursos" | "Experiencias";

export interface SearchHit {
  group: SearchGroup;
  id: string;
  titulo: string;
  detalle: string;
  href: string;
}

/** Busca en el contenido estático del sitio (no requiere red). */
export function searchStatic(q: string, limitPerGroup = 5): SearchHit[] {
  if (!q.trim()) return [];
  const tools = HERRAMIENTAS.filter((h) =>
    matches(q, h.nombre, h.categoria, h.descripcion, h.aplicacion, h.habilidades.join(" "))
  )
    .slice(0, limitPerGroup)
    .map<SearchHit>((h) => ({
      group: "Herramientas",
      id: h.id,
      titulo: h.nombre,
      detalle: `${h.categoria} · ${h.precio}`,
      href: `/explorar?q=${encodeURIComponent(h.nombre)}`,
    }));
  const prompts = PROMPTS.filter((p) =>
    matches(q, p.titulo, p.tema, p.subgrupo, p.bloque, p.nivel, p.texto)
  )
    .slice(0, limitPerGroup)
    .map<SearchHit>((p) => ({
      group: "Prompts",
      id: p.id,
      titulo: `${p.numero}. ${p.titulo}`,
      detalle: `${p.bloque}${p.nivel ? ` · ${p.nivel}` : ""}${p.tema ? ` · ${p.tema}` : ""}`,
      href: `/prompts?q=${encodeURIComponent(p.titulo)}#banco`,
    }));
  const tutos = TUTORIALES.filter((t) => matches(q, t.titulo, t.resumen, t.pasos.join(" ")))
    .slice(0, limitPerGroup)
    .map<SearchHit>((t) => ({
      group: "Tutoriales",
      id: t.id,
      titulo: t.titulo,
      detalle: `${t.minutos} min · ${t.dificultad}`,
      href: `/aprende#${t.id}`,
    }));
  return [...tools, ...prompts, ...tutos];
}
