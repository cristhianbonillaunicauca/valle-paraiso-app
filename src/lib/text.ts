/** Normaliza texto para búsquedas: minúsculas y sin tildes. */
export function norm(s: string | null | undefined) {
  return (s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** true si todas las palabras de la consulta aparecen en el texto. */
export function matches(query: string, ...fields: (string | null | undefined)[]) {
  const q = norm(query).trim();
  if (!q) return true;
  const hay = norm(fields.join(" "));
  return q.split(/\s+/).every((w) => hay.includes(w));
}
