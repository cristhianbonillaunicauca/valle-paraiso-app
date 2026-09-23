import type { PromptBanco } from "@/content/prompts";

export const GRADOS = ["Primaria", "Secundaria", "Media", "Adultos", "Universidad"] as const;
export const ACTIVIDADES = ["Role-play", "Debate", "Quiz", "Proyecto", "Juego", "Comprensión lectora", "Listening", "Escritura", "Presentación", "Otro"] as const;
export const DURACIONES = ["10", "20", "30", "45", "60", "90"] as const;
export const PRODUCTOS_GEN = ["Actividad", "Worksheet", "Audio", "Imagen", "Presentación", "Video", "Evaluación"] as const;
export const HABILIDADES_GEN = ["Speaking", "Listening", "Reading", "Writing", "Vocabulary", "Grammar", "Pronunciation"] as const;
export const NIVELES_GEN = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export interface PromptParams {
  nivel: string;
  grado: string;
  habilidad: string;
  tema: string;
  actividad: string;
  duracion: string;
  producto: string;
  valle: boolean;
  bajaConectividad: boolean;
  inclusion: boolean;
}

export const DEFAULT_PARAMS: PromptParams = {
  nivel: "A2",
  grado: "Secundaria",
  habilidad: "Speaking",
  tema: "",
  actividad: "Role-play",
  duracion: "45",
  producto: "Actividad",
  valle: true,
  bajaConectividad: false,
  inclusion: false,
};

const GRADO_TXT: Record<string, string> = {
  Primaria: "estudiantes de básica primaria",
  Secundaria: "estudiantes de básica secundaria",
  Media: "estudiantes de educación media (grados 10.° y 11.°)",
  Adultos: "estudiantes adultos",
  Universidad: "estudiantes universitarios",
};

const ENTREGABLE: Record<string, string> = {
  Actividad: "la actividad completa lista para aplicar, con instrucciones para el docente y para los estudiantes",
  Worksheet: "una hoja de trabajo imprimible con ejercicios graduados y la clave de respuestas por separado",
  Audio: "el guion del audio con marcas de pausa y énfasis, más las preguntas para antes, durante y después de escuchar",
  Imagen: "el texto del recurso visual y una descripción detallada de la imagen para generarla o buscarla en un banco libre",
  Presentación: "el esquema diapositiva por diapositiva (título, contenido, recurso visual y momento de interacción)",
  Video: "el guion del video y un storyboard en tabla (escena, imagen, narración, recurso visual)",
  Evaluación: "los ítems de evaluación con clave de respuestas y una rúbrica con descriptores observables",
};

function tema(p: PromptParams) {
  return p.tema.trim() ? `"${p.tema.trim()}"` : "[escribe aquí el tema]";
}

function contexto(p: PromptParams) {
  const parts: string[] = [];
  if (p.valle) parts.push("Contextualiza ejemplos, nombres y situaciones en el Valle del Cauca (Colombia), con respeto por la diversidad cultural de sus comunidades.");
  if (p.bajaConectividad) parts.push("La institución tiene baja conectividad: la actividad debe poder desarrollarse sin internet o con materiales impresos.");
  if (p.inclusion) parts.push("Aplica principios de Diseño Universal para el Aprendizaje (DUA): instrucciones divididas en pasos cortos, apoyo visual y opciones de respuesta.");
  return parts;
}

/**
 * Tres estructuras de prompt. "Generar otro" rota entre ellas para que el
 * docente compare enfoques; todas usan los mismos parámetros.
 */
export function buildPrompt(p: PromptParams, variante = 0, base?: PromptBanco): string {
  const ctx = contexto(p);
  const v = ((variante % 3) + 3) % 3;

  if (base) {
    return [
      "Actúa como docente experto/a en la enseñanza del inglés como lengua extranjera y en diseño instruccional.",
      "Adapta el siguiente prompt a mi contexto y luego ejecútalo:",
      "",
      `"${base.texto}"`,
      "",
      "Mi contexto:",
      `- Nivel MCER: ${p.nivel}`,
      `- Población: ${GRADO_TXT[p.grado] ?? p.grado}`,
      `- Habilidad principal: ${p.habilidad}`,
      p.tema.trim() ? `- Tema: ${tema(p)}` : "- Tema: el mismo del prompt original",
      `- Duración disponible: ${p.duracion} minutos`,
      ...ctx.map((c) => `- ${c}`),
      "",
      "Entrega el resultado listo para usar en clase y señala qué ajustes hiciste frente al prompt original.",
    ].join("\n");
  }

  if (v === 0) {
    return [
      "Actúa como docente experto/a en la enseñanza del inglés como lengua extranjera y en diseño instruccional.",
      "",
      `Diseña una actividad de tipo ${p.actividad.toLowerCase()} de ${p.duracion} minutos, nivel ${p.nivel} del MCER, para ${GRADO_TXT[p.grado] ?? p.grado}, centrada en la habilidad de ${p.habilidad}, sobre el tema ${tema(p)}.`,
      ...(ctx.length ? ["", ...ctx] : []),
      "",
      "Incluye:",
      "1. Un objetivo de aprendizaje en formato \"Students will be able to...\".",
      `2. Vocabulario y estructuras objetivo acordes al nivel ${p.nivel}.`,
      "3. La secuencia paso a paso con tiempos: antes, durante y después.",
      `4. Instrucciones para los estudiantes en inglés sencillo (nivel ${p.nivel}).`,
      `5. Como producto final: ${ENTREGABLE[p.producto] ?? "el material listo para usar"}.`,
      "6. Criterios de evaluación o una rúbrica breve.",
      "7. Una adaptación para estudiantes que necesitan más apoyo y un reto para quienes avanzan más rápido.",
      "",
      "Cuando sea pertinente, relaciona la actividad con los Derechos Básicos de Aprendizaje y el Currículo Sugerido de Inglés del MEN. Usa tablas cuando facilite la lectura.",
    ].join("\n");
  }

  if (v === 1) {
    return [
      "Eres mi asistente de planeación para la clase de inglés. Vamos a trabajar paso a paso.",
      "",
      "Datos de mi clase:",
      `- Nivel MCER: ${p.nivel}`,
      `- Población: ${GRADO_TXT[p.grado] ?? p.grado}`,
      `- Habilidad: ${p.habilidad}`,
      `- Tema: ${tema(p)}`,
      `- Tipo de actividad: ${p.actividad}`,
      `- Duración: ${p.duracion} minutos`,
      `- Producto que necesito: ${p.producto}`,
      ...ctx.map((c) => `- ${c}`),
      "",
      "Antes de crear el material, hazme máximo 3 preguntas que te ayuden a ajustarlo a mis estudiantes. Después de mis respuestas, entrega:",
      `a) ${ENTREGABLE[p.producto] ?? "el material listo para usar"};`,
      "b) la secuencia de la clase con tiempos;",
      "c) una forma rápida de verificar el aprendizaje al cierre (exit ticket).",
    ].join("\n");
  }

  return [
    `ROL: Docente de inglés y diseñador/a instruccional.`,
    `TAREA: Crear ${p.producto.toLowerCase() === "actividad" ? "una actividad" : `un recurso de tipo ${p.producto.toLowerCase()}`} (${p.actividad.toLowerCase()}) sobre ${tema(p)} para practicar ${p.habilidad}.`,
    `AUDIENCIA: ${GRADO_TXT[p.grado] ?? p.grado}, nivel ${p.nivel} del MCER.`,
    `TIEMPO: ${p.duracion} minutos.`,
    ...(ctx.length ? [`CONTEXTO: ${ctx.join(" ")}`] : []),
    `ENTREGA: ${ENTREGABLE[p.producto] ?? "Material listo para usar"}.`,
    "FORMATO: Títulos claros, tablas cuando ayuden y lenguaje en inglés adecuado al nivel. Al final, 3 recomendaciones para el docente.",
  ].join("\n");
}
