/**
 * El bucket "docs" de Supabase Storage se crea como público (ver README),
 * así que la URL pública es determinística y no requiere una llamada extra
 * al cliente para construirla — sirve tanto en Server como Client Components.
 */
const BUCKET = "docs";

export function getFileUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return "#";
  return `${base}/storage/v1/object/public/${BUCKET}/${path}`;
}
