import type { Dificultad, SalaId } from "@/content/taxonomia";

/**
 * Microtutoriales escritos ("Aprende en pocos minutos"). Son guías de
 * lectura rápida paso a paso; el campo `videoUrl` queda listo para enlazar
 * un video corto cuando el equipo lo grabe (hoy está vacío a propósito).
 */
export interface Tutorial {
  id: string;
  titulo: string;
  minutos: number;
  dificultad: Dificultad;
  sala: SalaId | null;
  /** ids de HERRAMIENTAS (ver content/herramientas.ts). */
  herramientas: string[];
  resumen: string;
  pasos: string[];
  consejo: string;
  /** Prompt del banco relacionado para "Ahora inténtalo tú". */
  promptId: string;
  /** Parámetros sugeridos para abrir el generador precargado. */
  generador: Record<string, string>;
  videoUrl?: string;
}

export const TUTORIALES: Tutorial[] = [
  {
    id: "infografia-con-ia",
    titulo: "Cómo crear una infografía con IA",
    minutos: 3,
    dificultad: "Básica",
    sala: "texto-imagen",
    herramientas: ["chatgpt", "canva-para-educacion"],
    resumen: "Usa la IA para el contenido y Canva para el diseño: tú decides el mensaje.",
    pasos: [
      "Define el objetivo: qué vocabulario o regla debe quedar clara y para qué nivel MCER.",
      "Pide a la IA solo el contenido textual (título, 6 a 10 ideas cortas, sugerencia de íconos). Usa el prompt del banco como base.",
      "Revisa el texto: exactitud, nivel de lengua y pertinencia cultural para tu grupo.",
      "En Canva, busca una plantilla de infografía vertical y pega el contenido por bloques.",
      "Cuida la legibilidad: máximo dos tipografías, buen contraste y poco texto por bloque.",
      "Descarga en PDF para imprimir o en PNG para compartir por WhatsApp.",
    ],
    consejo: "Si tus estudiantes tienen baja conectividad, imprime la infografía en blanco y negro: diseña pensando en eso desde el inicio.",
    promptId: "prompt-31",
    generador: { habilidad: "Vocabulary", producto: "Imagen", actividad: "Otro" },
  },
  {
    id: "podcast-educativo",
    titulo: "Cómo diseñar un podcast educativo",
    minutos: 4,
    dificultad: "Básica",
    sala: "audio",
    herramientas: ["vocaroo", "audacity"],
    resumen: "Un guion corto, una grabación limpia y una pregunta de cierre bastan para empezar.",
    pasos: [
      "Elige un tema cercano a tus estudiantes y una duración corta (2 a 3 minutos).",
      "Genera el guion con IA indicando nivel, vocabulario objetivo y estructura (gancho, desarrollo, cierre).",
      "Lee el guion en voz alta y ajusta frases largas o palabras fuera del nivel.",
      "Graba en un lugar silencioso. Vocaroo sirve para grabaciones rápidas; Audacity si quieres editar.",
      "Agrega una pregunta de reflexión al final y comparte el enlace o el archivo MP3.",
      "Diseña 3 a 5 preguntas de comprensión para usar antes, durante y después de escuchar.",
    ],
    consejo: "Pide a tus estudiantes que graben su propio episodio: el podcast funciona igual de bien como producto final de speaking.",
    promptId: "prompt-1",
    generador: { habilidad: "Listening", producto: "Audio", actividad: "Listening" },
  },
  {
    id: "quiz-interactivo",
    titulo: "Cómo hacer un quiz interactivo",
    minutos: 3,
    dificultad: "Básica",
    sala: "presentaciones",
    herramientas: ["quizizz", "kahoot", "plickers"],
    resumen: "Genera preguntas con IA, revísalas y llévalas a una plataforma de juego.",
    pasos: [
      "Decide el propósito: diagnóstico, práctica o cierre de clase.",
      "Pide a la IA 10 preguntas con 4 opciones y la respuesta correcta señalada.",
      "Verifica cada pregunta: una sola respuesta correcta y distractores plausibles.",
      "Copia las preguntas en Quizizz o Kahoot. Si tu grupo no tiene dispositivos, usa Plickers.",
      "Aplica el quiz y revisa el informe: identifica las dos preguntas con más errores.",
      "Retoma esos errores en la siguiente clase con una explicación breve.",
    ],
    consejo: "Pide a la IA que entregue las preguntas en una tabla: así es más fácil copiarlas a la plataforma.",
    promptId: "prompt-66",
    generador: { actividad: "Quiz", producto: "Evaluación" },
  },
  {
    id: "imagenes-para-clase",
    titulo: "Cómo generar imágenes para clase",
    minutos: 4,
    dificultad: "Básica",
    sala: "texto-imagen",
    herramientas: ["canva-para-educacion", "pixabay", "unsplash"],
    resumen: "Primero busca en bancos libres; genera con IA solo cuando no exista la imagen.",
    pasos: [
      "Busca primero en bancos de uso libre (Pixabay, Unsplash, Pexels): son rápidos y seguros.",
      "Si necesitas algo muy específico, genera la imagen con la herramienta de IA de tu preferencia.",
      "Describe la imagen con precisión: sujeto, acción, lugar, estilo y formato (vertical u horizontal).",
      "Evita pedir personas reales o marcas; prefiere escenas y objetos genéricos.",
      "Revisa la imagen: que no tenga estereotipos, textos erróneos ni detalles confusos.",
      "Registra la fuente o herramienta usada y respeta la licencia al compartir.",
    ],
    consejo: "Para actividades de \"describe the picture\" funcionan mejor las imágenes con varias acciones ocurriendo a la vez.",
    promptId: "prompt-32",
    generador: { habilidad: "Vocabulary", producto: "Imagen" },
  },
  {
    id: "mejores-prompts",
    titulo: "Cómo crear mejores prompts",
    minutos: 5,
    dificultad: "Básica",
    sala: null,
    herramientas: ["chatgpt", "claude", "magicschool-ai"],
    resumen: "Rol, contexto, tarea, formato y criterios: cinco piezas que cambian el resultado.",
    pasos: [
      "Rol: dile a la IA desde dónde debe responder (por ejemplo, \"actúa como docente de inglés\").",
      "Contexto: nivel MCER, grado, número de estudiantes, conectividad y región.",
      "Tarea: qué necesitas exactamente, con extensión y número de ítems.",
      "Formato: tabla, lista, guion por columnas o texto para imprimir.",
      "Criterios: qué debe cumplir (vocabulario objetivo, tiempos verbales, clave de respuestas).",
      "Itera: pide ajustes concretos (\"hazlo más corto\", \"baja el nivel a A2\") en lugar de empezar de cero.",
    ],
    consejo: "Guarda tus mejores prompts en este sitio con el botón Guardar: se convierten en tu propio banco.",
    promptId: "prompt-51",
    generador: {},
  },
  {
    id: "presentacion-interactiva",
    titulo: "Cómo crear una presentación interactiva",
    minutos: 5,
    dificultad: "Intermedia",
    sala: "presentaciones",
    herramientas: ["genially", "google-slides"],
    resumen: "De la secuencia didáctica a las diapositivas con momentos de participación.",
    pasos: [
      "Pide a la IA el esquema de la secuencia: motivación, saberes previos, desarrollo, práctica y cierre.",
      "Decide dónde participan los estudiantes: preguntas, votaciones, retos o decisiones.",
      "Construye las diapositivas en Genially o Google Slides con una idea por diapositiva.",
      "Agrega interactividad: botones, enlaces entre diapositivas o un quiz final.",
      "Prueba la presentación completa en el dispositivo en que la vas a proyectar.",
      "Prepara una versión en PDF por si falla la conexión en el aula.",
    ],
    consejo: "Una presentación \"elige tu propia aventura\" se construye enlazando diapositivas: no requiere programar.",
    promptId: "prompt-59",
    generador: { producto: "Presentación", actividad: "Presentación" },
  },
  {
    id: "actividades-listening",
    titulo: "Cómo generar actividades de listening",
    minutos: 4,
    dificultad: "Básica",
    sala: "audio",
    herramientas: ["naturalreader", "vocaroo", "elllo"],
    resumen: "Guion a tu medida, audio con voz propia o sintética y preguntas en tres momentos.",
    pasos: [
      "Genera un guion corto con vocabulario del tema y el nivel de tu grupo.",
      "Conviértelo en audio: grábalo tú mismo o usa una voz de texto a voz como NaturalReader.",
      "Diseña una tarea previa (predecir vocabulario o el tema) para activar la escucha.",
      "Durante la escucha, usa preguntas de información específica o completar espacios.",
      "Después, agrega una pregunta de inferencia u opinión para ir más allá de lo literal.",
      "Complementa con audios auténticos de bancos como ELLLO para exponer a otros acentos.",
    ],
    consejo: "Deja el guion como apoyo para una segunda escucha: ayuda a estudiantes que apenas empiezan.",
    promptId: "prompt-6",
    generador: { habilidad: "Listening", actividad: "Listening", producto: "Audio" },
  },
  {
    id: "rubricas-con-ia",
    titulo: "Cómo diseñar rúbricas con IA",
    minutos: 5,
    dificultad: "Intermedia",
    sala: null,
    herramientas: ["claude", "rubistar", "magicschool-ai"],
    resumen: "Criterios claros y descriptores observables, revisados por tu criterio docente.",
    pasos: [
      "Define el producto a evaluar y su nivel (por ejemplo, un párrafo descriptivo A2).",
      "Elige de 3 a 5 criterios (contenido, organización, vocabulario, gramática, pronunciación).",
      "Pide a la IA una rúbrica en tabla con 4 niveles de desempeño y descriptores observables.",
      "Revisa que cada descriptor se pueda verificar y que no haya saltos confusos entre niveles.",
      "Comparte la rúbrica con los estudiantes antes de la tarea, en lenguaje sencillo.",
      "Úsala también para autoevaluación o coevaluación entre pares.",
    ],
    consejo: "Pide una versión de la rúbrica para estudiantes, con íconos o frases en primera persona (\"I can...\").",
    promptId: "prompt-46",
    generador: { producto: "Evaluación", actividad: "Otro" },
  },
];

export function tutorialById(id: string) {
  return TUTORIALES.find((t) => t.id === id);
}

/** Tutorial sugerido para una categoría/sala del Explorador. */
export function tutorialParaSala(sala: SalaId | null) {
  return TUTORIALES.find((t) => t.sala === sala) ?? TUTORIALES.find((t) => t.id === "mejores-prompts");
}
