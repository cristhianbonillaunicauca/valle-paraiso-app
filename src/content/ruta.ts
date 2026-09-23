/**
 * "Tu Ruta de Innovación Docente". El progreso se guarda en el navegador
 * (localStorage) porque el sitio no tiene inicio de sesión. Para guardarlo
 * en la nube haría falta autenticación (por ejemplo Supabase Auth).
 */
export interface PasoRuta {
  id: string;
  titulo: string;
  descripcion: string;
  href: string;
  cta: string;
}

export const PASOS_RUTA: PasoRuta[] = [
  { id: "explorar-ia", titulo: "Explora IA para educación", descripcion: "Recorre las herramientas de IA del explorador y guarda las que quieras probar.", href: "/explorar?tipo=Inteligencia+Artificial", cta: "Ver herramientas de IA" },
  { id: "prompting", titulo: "Aprende sobre prompting", descripcion: "Lee el microtutorial y genera tu primer prompt con el generador.", href: "/aprende#mejores-prompts", cta: "Abrir tutorial" },
  { id: "texto-imagen", titulo: "Crea texto e imágenes", descripcion: "Diseña una infografía, flashcards o una lectura graduada para tu grupo.", href: "/explorar?sala=texto-imagen", cta: "Ir a Texto e imagen" },
  { id: "audio", titulo: "Diseña actividades con audio", descripcion: "Graba un podcast corto o una actividad de listening.", href: "/explorar?sala=audio", cta: "Ir a Audio" },
  { id: "interactivas", titulo: "Construye experiencias interactivas", descripcion: "Crea un quiz, un juego o una presentación con momentos de participación.", href: "/explorar?sala=presentaciones", cta: "Ir a Presentaciones" },
  { id: "video", titulo: "Crea videos educativos", descripcion: "Escribe un guion con storyboard y graba una videoclase corta.", href: "/explorar?sala=video", cta: "Ir a Video" },
  { id: "compartir", titulo: "Comparte tu experiencia", descripcion: "Lleva tu recurso al aula y compártelo con otros docentes del programa.", href: "/experiencias", cta: "Ver experiencias" },
];

export interface Insignia {
  id: string;
  nombre: string;
  descripcion: string;
  /** Pasos que deben estar completos para obtenerla. */
  requiere: string[];
}

export const INSIGNIAS: Insignia[] = [
  { id: "explorador-ia", nombre: "Docente Explorador de IA", descripcion: "Diste el primer paso en la ruta.", requiere: ["explorar-ia"] },
  { id: "disenador-prompts", nombre: "Diseñador de Prompts", descripcion: "Aprendiste a conversar con la IA de forma intencional.", requiere: ["prompting"] },
  { id: "disenador-recursos", nombre: "Diseñador de Recursos Digitales", descripcion: "Creaste recursos visuales y de audio.", requiere: ["texto-imagen", "audio"] },
  { id: "creador-multimedia", nombre: "Creador Multimedia", descripcion: "Produjiste audio y video para tu clase.", requiere: ["audio", "video"] },
  { id: "innovador", nombre: "Innovador Educativo", descripcion: "Llevaste la IA a experiencias interactivas.", requiere: ["explorar-ia", "prompting", "interactivas"] },
  { id: "docente-creador", nombre: "Docente Creador", descripcion: "Completaste toda la ruta.", requiere: PASOS_RUTA.map((p) => p.id) },
];
