/**
 * Indicadores de "Impacto del Programa". Un valor en `null` se muestra como
 * "Dato pendiente": NUNCA se inventan cifras. Para publicar un dato, reemplace
 * `null` por el número verificado y, si aplica, cambie `sufijo` (por ej. "+").
 *
 * Los indicadores con `fuente: "auto"` se calculan solos:
 *  - "descargas": conteo real de la tabla `descargas` en Supabase.
 *  - "prompts" y "herramientas": tamaño de los bancos publicados en el sitio.
 */
export interface Indicador {
  id: string;
  etiqueta: string;
  valor: number | null;
  sufijo?: string;
  fuente: "manual" | "auto";
  nota?: string;
}

export const INDICADORES: Indicador[] = [
  { id: "docentes", etiqueta: "Docentes participantes en el Taller 1", valor: 360, fuente: "manual" },
  { id: "municipios", etiqueta: "Municipios participantes", valor: null, fuente: "manual" },
  { id: "recursos-creados", etiqueta: "Recursos creados por docentes", valor: null, fuente: "manual" },
  { id: "prompts", etiqueta: "Prompts educativos disponibles", valor: null, fuente: "auto" },
  { id: "herramientas", etiqueta: "Herramientas digitales curadas", valor: null, fuente: "auto" },
  { id: "descargas", etiqueta: "Descargas de materiales", valor: null, sufijo: "+", fuente: "auto", nota: "Actualizado en vivo" },
  { id: "experiencias", etiqueta: "Experiencias de aula publicadas", valor: null, fuente: "manual" },
  { id: "salas", etiqueta: "Laboratorios / salas", valor: 4, fuente: "manual" },
  { id: "talleres", etiqueta: "Talleres del programa", valor: 5, fuente: "manual" },
];
