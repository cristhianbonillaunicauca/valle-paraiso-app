import type { Habilidad, Producto, SalaId } from "@/content/taxonomia";

/**
 * Información de cada laboratorio (sala) usada por la portada, el
 * explorador y la línea de tiempo. Los textos base (nombre y resumen) vienen
 * de la tabla `salas` de Supabase; aquí solo se agrega la capa de
 * navegación que el sitio necesita para conectar cada sala con sus
 * herramientas, prompts y tutoriales.
 */
export interface SalaMeta {
  id: SalaId;
  numero: number;
  nombre: string;
  /** Título corto usado en la portada ("¿Qué quieres crear hoy?"). */
  titulo: string;
  descripcion: string;
  /** Clave de color (ver lib/colors.ts). */
  color: "teal" | "orange" | "blue" | "red";
  productos: Producto[];
  habilidades: Habilidad[];
  /** Bloque correspondiente del Banco de 100 prompts. */
  bloquePrompts: string;
}

export const SALAS: SalaMeta[] = [
  {
    id: "texto-imagen",
    numero: 1,
    nombre: "Texto e Imagen",
    titulo: "Texto e imagen",
    descripcion:
      "Crea infografías, imágenes, flashcards, historias visuales y materiales para clase.",
    color: "teal",
    productos: ["Imagen", "Infografía", "Material imprimible"],
    habilidades: ["Reading", "Writing", "Vocabulary"],
    bloquePrompts: "Escritura y Recursos Visuales",
  },
  {
    id: "audio",
    numero: 2,
    nombre: "Audio",
    titulo: "Audio",
    descripcion:
      "Crea podcasts, ejercicios de listening, pronunciación, dictados y actividades auditivas.",
    color: "orange",
    productos: ["Audio", "Podcast"],
    habilidades: ["Listening", "Speaking", "Pronunciation"],
    bloquePrompts: "Audio",
  },
  {
    id: "presentaciones",
    numero: 3,
    nombre: "Presentaciones Interactivas",
    titulo: "Presentaciones y actividades",
    descripcion: "Diseña presentaciones, quizzes, juegos y experiencias interactivas.",
    color: "blue",
    productos: ["Presentación", "Juego", "Quiz", "Actividad interactiva"],
    habilidades: ["Integrated Skills", "Vocabulary", "Grammar"],
    bloquePrompts: "Presentaciones Interactivas",
  },
  {
    id: "video",
    numero: 4,
    nombre: "Video Educativo",
    titulo: "Video",
    descripcion:
      "Crea videoclases, explicaciones, storytelling y materiales audiovisuales.",
    color: "red",
    productos: ["Video"],
    habilidades: ["Listening", "Speaking", "Pronunciation"],
    bloquePrompts: "Video Educativo",
  },
];

export function salaById(id: string | null | undefined): SalaMeta | undefined {
  return SALAS.find((s) => s.id === id);
}
