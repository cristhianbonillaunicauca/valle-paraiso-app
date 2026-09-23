/**
 * Algunos enlaces guardados en Supabase (tabla memoria_items) apuntan a
 * anclas de la versión anterior de una sola página (#documentos, #bancos,
 * #programa). Aquí se traducen a las nuevas rutas para que ningún enlace
 * quede roto, sin tener que editar la base de datos.
 */
const LEGACY: Record<string, string> = {
  "#documentos": "/biblioteca",
  "#bancos": "/biblioteca",
  "#programa": "/#agenda",
  "#salas": "/#crear",
  "#equipo": "/#equipo",
  "#memorias": "/memorias",
};

export function resolveLink(link: string | null | undefined): string | null {
  if (!link) return null;
  return LEGACY[link] ?? link;
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

/** Visor en línea para archivos de Office públicos (docx, xlsx, pptx). */
export function officePreviewUrl(fileUrl: string) {
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`;
}

/** Para archivos de Google Drive: /view -> /preview (vista embebible). */
export function drivePreviewUrl(link: string) {
  return link.replace(/\/view(\?.*)?$/, "/preview");
}
