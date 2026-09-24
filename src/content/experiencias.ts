import type { Habilidad, Nivel, Producto } from "@/content/taxonomia";

/**
 * "Experiencias de nuestros docentes". Esta lista está vacía a propósito:
 * solo se publican productos reales con autorización de sus autores.
 *
 * Para agregar una experiencia, copie el ejemplo comentado y complete los
 * campos. Los filtros (municipio, nivel, competencia, herramienta, tipo de
 * producto) se generan automáticamente a partir de estos datos.
 */
export interface Experiencia {
  id: string;
  titulo: string;
  docente: string;
  municipio: string;
  institucion?: string;
  nivel: Nivel;
  habilidades: Habilidad[];
  herramientas: string[];
  producto: Producto;
  descripcion: string;
  /** Enlace al producto (audio, video, presentación...). */
  url?: string;
  /** Enlace a la guía o actividad asociada. */
  actividadUrl?: string;
  /** Prompt usado, si el docente lo comparte. */
  prompt?: string;
  imagen?: string;
  autorizado: true;
}

export const EXPERIENCIAS: Experiencia[] = [
  // {
  //   id: "podcast-my-hometown",
  //   titulo: "Podcast: My Hometown",
  //   docente: "[Nombre del docente]",
  //   municipio: "[Municipio]",
  //   nivel: "A2",
  //   habilidades: ["Listening", "Speaking"],
  //   herramientas: ["Vocaroo", "ChatGPT"],
  //   producto: "Podcast",
  //   descripcion: "[Descripción breve]",
  //   url: "https://...",
  //   autorizado: true,
  // },
];

/** Enlace del formulario para postular experiencias. Vacío = aún no existe. */
export const FORMULARIO_EXPERIENCIAS_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScdNWy-Jx5KV9xeFAnG7RTTM35946J34TKK4EXUXbHJ0VUFSA/viewform";
