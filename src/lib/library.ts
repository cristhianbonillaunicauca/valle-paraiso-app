import type { SiteData } from "@/lib/queries";
import { getFileUrl } from "@/lib/storage";
import { isExternal, resolveLink } from "@/lib/links";
import { norm } from "@/lib/text";

export const CATEGORIAS_BIBLIOTECA = [
  "Guías",
  "Bancos de prompts",
  "Plantillas",
  "Presentaciones",
  "Recursos TIC",
  "Galería fotográfica",
  "Videos",
  "Informes",
] as const;
export type CategoriaBiblioteca = (typeof CATEGORIAS_BIBLIOTECA)[number];

export interface LibraryItem {
  key: string;
  titulo: string;
  descripcion: string;
  categoria: CategoriaBiblioteca;
  /** DOCX, XLSX, PDF, PPTX, Carpeta, Enlace. */
  tipo: string;
  href: string | null;
  disponible: boolean;
  /** Si es descargable desde Storage, se registra la descarga. */
  tracking?: { tipo: "documento" | "banco"; id: number };
  /** Detalle de volumen (por ej. "100 prompts"). */
  cantidad?: string;
  orden: number;
}

function categoriaPorTitulo(titulo: string, fallback: CategoriaBiblioteca): CategoriaBiblioteca {
  const t = norm(titulo);
  if (t.startsWith("guia")) return "Guías";
  if (t.includes("prompt")) return "Bancos de prompts";
  if (t.includes("plantilla")) return "Plantillas";
  if (t.includes("presentacion")) return "Presentaciones";
  if (t.includes("fotograf") || t.includes("captura") || t.includes("galeria")) return "Galería fotográfica";
  if (t.includes("audiovisual") || t.includes("video")) return "Videos";
  if (t.includes("informe") || t.includes("resultado") || t.includes("encuesta")) return "Informes";
  if (t.includes("guia")) return "Guías";
  return fallback;
}

function tipoPorLink(href: string, titulo: string) {
  if (href.includes("/folders/")) return "Carpeta";
  if (href.includes("docs.google.com/document/")) return "Google Docs";
  const t = norm(titulo);
  if (t.includes("(pdf)")) return "PDF";
  if (t.includes("(powerpoint)")) return "PPTX";
  return "Enlace";
}

/** Une documentos, bancos y memorias en un solo catálogo sin duplicados. */
export function buildLibrary(data: SiteData): LibraryItem[] {
  const items: LibraryItem[] = [];
  let orden = 0;

  for (const d of data.documentos) {
    items.push({
      key: `documento-${d.id}`,
      titulo: d.titulo,
      descripcion: d.descripcion,
      categoria: categoriaPorTitulo(d.titulo, "Guías"),
      tipo: d.tipo,
      href: getFileUrl(d.archivo_path),
      disponible: true,
      tracking: { tipo: "documento", id: d.id },
      orden: orden++,
    });
  }

  for (const b of data.bancos) {
    const ext = b.archivo_path.split(".").pop()?.toUpperCase() ?? "Archivo";
    items.push({
      key: `banco-${b.id}`,
      titulo: b.titulo,
      descripcion: b.descripcion,
      categoria: categoriaPorTitulo(b.titulo, "Recursos TIC"),
      tipo: ext,
      href: getFileUrl(b.archivo_path),
      disponible: true,
      tracking: { tipo: "banco", id: b.id },
      cantidad: b.cantidad,
      orden: orden++,
    });
  }

  for (const tab of data.memorias.tabs) {
    for (const g of tab.groups) {
      for (const it of g.items) {
        const href = resolveLink(it.link);
        // Los enlaces internos solo remiten a la propia biblioteca o a la
        // portada: no se duplican aquí.
        if (href && !isExternal(href)) continue;
        items.push({
          key: `memoria-${it.id}`,
          titulo: it.nombre,
          descripcion: g.nota ?? g.titulo.replace(/^\d+\.\s*/, ""),
          categoria: categoriaPorTitulo(`${it.nombre} ${g.titulo}`, "Informes"),
          tipo: href ? tipoPorLink(href, it.nombre) : "Pendiente",
          href,
          disponible: it.disponible && !!href,
          orden: orden++,
        });
      }
    }
  }

  return items;
}
