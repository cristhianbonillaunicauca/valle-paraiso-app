/**
 * Taxonomía compartida por el Explorador, el Generador de prompts,
 * la Biblioteca y el buscador global. Editar aquí actualiza los filtros
 * en todo el sitio.
 */

export const NIVELES = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type Nivel = (typeof NIVELES)[number];

export const HABILIDADES = [
  "Speaking",
  "Listening",
  "Reading",
  "Writing",
  "Vocabulary",
  "Grammar",
  "Pronunciation",
  "Integrated Skills",
] as const;
export type Habilidad = (typeof HABILIDADES)[number];

export const PRODUCTOS = [
  "Imagen",
  "Infografía",
  "Audio",
  "Podcast",
  "Video",
  "Presentación",
  "Juego",
  "Quiz",
  "Evaluación",
  "Actividad interactiva",
  "Material imprimible",
] as const;
export type Producto = (typeof PRODUCTOS)[number];

export const TIPOS_HERRAMIENTA = [
  "Inteligencia Artificial",
  "Diseño",
  "Audio",
  "Video",
  "Presentaciones",
  "Evaluación",
  "Gamificación",
  "Recursos abiertos",
] as const;
export type TipoHerramienta = (typeof TIPOS_HERRAMIENTA)[number];

export const CONECTIVIDAD = ["Sin internet", "Baja", "Media", "Alta"] as const;
export type Conectividad = (typeof CONECTIVIDAD)[number];

export const PRECIOS = ["Gratis", "Freemium", "Pago"] as const;
export type Precio = (typeof PRECIOS)[number];

export const DIFICULTADES = ["Básica", "Intermedia", "Avanzada"] as const;
export type Dificultad = (typeof DIFICULTADES)[number];

/** Las cuatro salas / laboratorios del Taller 1. */
export type SalaId = "texto-imagen" | "audio" | "presentaciones" | "video";
