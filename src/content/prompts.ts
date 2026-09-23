import type { Habilidad, Nivel, Producto, SalaId } from "@/content/taxonomia";
import { NIVELES } from "@/content/taxonomia";

/**
 * FUENTE: "Banco de 100 Prompts de IA · Taller 1 · Valle Paraíso Bilingüe"
 * (Cristhian Hernán Bonilla Gutiérrez). Texto de cada prompt copiado del
 * documento original. Las habilidades por subgrupo son una etiqueta para los
 * filtros del sitio.
 */

export interface PromptBanco {
  id: string;
  numero: number;
  sala: SalaId;
  bloque: string;
  subgrupo: string;
  titulo: string;
  /** Etiqueta de nivel tal como aparece en el documento ("A2", "A1-B1"...). */
  nivel: string | null;
  /** Niveles MCER expandidos para filtrar. Vacío = aplica a cualquier nivel. */
  niveles: Nivel[];
  tema: string | null;
  habilidades: Habilidad[];
  productos: Producto[];
  texto: string;
}

type P = [numero: number, titulo: string, nivel: string | null, tema: string | null, texto: string];

interface Subgrupo {
  subgrupo: string;
  habilidades: Habilidad[];
  prompts: P[];
}

interface Bloque {
  sala: SalaId;
  bloque: string;
  productos: Producto[];
  subgrupos: Subgrupo[];
}

const DATA: Bloque[] = [
  {
    sala: "audio",
    bloque: "Audio",
    productos: ["Audio", "Podcast"],
    subgrupos: [
      {
        subgrupo: "Podcasts y diálogos contextualizados",
        habilidades: ["Listening", "Speaking"],
        prompts: [
          [1, "Podcast cultural", "B1", "Tourism", "Actúa como guionista educativo de inglés. Escribe el guion de un podcast de 3 minutos, nivel B1, titulado \"Exploring the Pacific Coast of Valle del Cauca\", dirigido a estudiantes de grado noveno. Incluye una introducción con pregunta gancho, tres datos verificables sobre la biodiversidad de Buenaventura, seis palabras de vocabulario objetivo definidas en contexto, y un cierre con pregunta de reflexión. Entrega el resultado en una tabla con columnas: Tiempo, Hablante, Texto, Nota de pronunciación."],
          [2, "Diálogo de mercado", "A2", "Food and Shopping", "Genera un diálogo de 12 a 16 líneas, nivel A2, entre un turista extranjero y un vendedor de un mercado local en Cali, usando vocabulario de \"Food and Shopping\". Incluye al menos tres preguntas con \"How much...?\" y dos expresiones de cortesía. Después del diálogo, agrega 8 palabras clave con traducción al español y un ejercicio de opción múltiple de 4 preguntas."],
          [3, "Entrevista radial", "B1", "Sustainable Farming", "Escribe el guion de una entrevista radial de 2 minutos, nivel B1, entre un/a estudiante reportero/a y un/a agricultor/a de una zona rural del Valle del Cauca, sobre \"Sustainable Farming\". Incluye 5 preguntas abiertas y respuestas que empleen al menos tres tiempos verbales distintos. Resalta en negrita cada verbo conjugado que el estudiante deba identificar."],
          [4, "Diálogo intercultural", "A2", "Local Culture", "Diseña un diálogo corto (10 líneas), nivel A2, entre dos estudiantes que describen una tradición de una comunidad indígena del Valle del Cauca, integrando dos palabras en lengua propia (deja el marcador [PALABRA EN LENGUA PROPIA] para que el docente las complete con la comunidad) junto con su equivalente en inglés y español. Usa presente simple y vocabulario de \"Local Culture\"."],
          [5, "Role-play laboral", "B2", "Jobs and Careers", "Crea un guion de role-play nivel B2 (90 segundos) para una entrevista de trabajo en el sector turístico del Valle del Cauca, con vocabulario de \"Jobs and Careers\". Incluye 4 preguntas típicas de entrevista, respuestas modelo con lenguaje formal, y una nota final con 3 expresiones idiomáticas del ámbito laboral, explicadas en español."],
        ],
      },
      {
        subgrupo: "Comprensión auditiva y dictados",
        habilidades: ["Listening"],
        prompts: [
          [6, "Listening rural", "A2", "Daily Routines", "Diseña una actividad de comprensión auditiva nivel A2 sobre \"Daily Routines in a Rural School\", con un texto narrado de 100 palabras y 5 preguntas de comprensión (2 de opción múltiple, 2 de verdadero/falso, 1 de respuesta corta). Entrega también la clave de respuestas por separado."],
          [7, "Dictado básico", "A1", "My Family", "Genera un dictado nivel A1 (60 palabras) sobre \"My Family\", usando solo vocabulario de alta frecuencia y oraciones de máximo 8 palabras. Divide el dictado en 5 frases numeradas y agrega una actividad de autocorrección donde el estudiante compare su escritura con el texto original."],
          [8, "Listening inferencial", "B1", "Weather", "Crea un ejercicio de listening nivel B1 basado en un pronóstico del clima para las principales ciudades del Valle del Cauca. Incluye el guion del audio (80-100 palabras) y 6 preguntas que exijan inferencia, no solo localización literal de datos, variando entre selección múltiple y completar espacios."],
          [9, "Dictado multinivel", "A1-B1", "Healthy Habits", "Diseña tres versiones de un mismo dictado sobre \"Healthy Habits\" (niveles A1, A2 y B1) manteniendo el mismo tema pero ajustando longitud de oración, tiempos verbales y vocabulario. Presenta las tres versiones en una tabla comparativa de tres columnas."],
          [10, "Listening con mapa", "A2", "Giving Directions", "Genera el guion de un audio nivel A2 (90 segundos) que describa un recorrido por \"Places in My Community\", pensado para acompañarse de un mapa dibujado por el estudiante mientras escucha. Incluye 6 instrucciones de dirección y una lista de los lugares mencionados en orden."],
        ],
      },
      {
        subgrupo: "Pronunciación y fonética",
        habilidades: ["Pronunciation", "Speaking"],
        prompts: [
          [11, "Pares mínimos", "A2", "Food / Animals", "Genera una lista de 10 pares mínimos en inglés relevantes para hispanohablantes (por ejemplo, ship/sheep), relacionados con vocabulario de \"Food\" y \"Animals\". Para cada par incluye transcripción fonética (IPA), una oración de ejemplo por palabra y una sugerencia de actividad oral para practicar la diferencia en clase."],
          [12, "Práctica de sonidos \"th\"", "B1", "Healthy Habits", "Escribe un guion de práctica de pronunciación de 90 segundos, nivel B1, enfocado en los sonidos /θ/ y /ð/ (\"th\"), usando vocabulario de \"Healthy Habits\" (think, health, breath, weather). Incluye instrucciones articulatorias breves y un trabalenguas original de máximo 20 palabras."],
          [13, "Entonación en preguntas", "A2", "Tourist Attractions", "Diseña un guion de práctica de entonación (rising/falling) nivel A2, con 8 preguntas Yes/No y 8 preguntas Wh- sobre \"Tourist Attractions in the Valle del Cauca\", marcando con flechas (↗/↘) el patrón de entonación esperado en cada una."],
          [14, "Acentuación académica", "B1", "Environment", "Crea una lista de 12 palabras de vocabulario académico nivel B1 relacionadas con \"Environment and Biodiversity\", indicando la sílaba tónica en mayúsculas, su transcripción fonética y una actividad de agrupación por número de sílabas."],
          [15, "Modelaje accesible", "A1", "Numbers / Directions", "Escribe un guion de pronunciación accesible (para estudiantes con dificultades auditivas leves), nivel A1, sobre \"Numbers and Directions\", con frases cortas, pausas marcadas explícitamente entre palabras y sugerencias de apoyo visual (gestos o imágenes) para cada frase."],
        ],
      },
      {
        subgrupo: "Narración y storytelling sonoro",
        habilidades: ["Listening", "Reading"],
        prompts: [
          [16, "Cuento narrado", "A2", "Biodiversity", "Escribe un cuento corto narrado de 150 palabras, nivel A2, ambientado en un pueblo del Valle del Cauca sobre la biodiversidad local, usando pasado simple y al menos 8 palabras de vocabulario objetivo. Divide el texto en 4 párrafos y sugiere, para cada uno, un efecto de sonido ambiental apropiado."],
          [17, "Leyenda del Pacífico", "B1", "Local Culture", "Adapta, para narración oral, una leyenda breve y de dominio público relacionada con el Pacífico colombiano, en inglés nivel B1 (150-180 palabras), preservando el respeto por la fuente cultural y evitando apropiación indebida. Agrega 5 preguntas de comprensión y una nota sobre el origen cultural del relato para verificar con la comunidad."],
          [18, "Audiolibro por capítulos", "A2", "Adventure", "Divide una historia original de aventuras de 200 palabras, nivel A2, sobre estudiantes explorando un río del Valle del Cauca, en 4 capítulos de 50 palabras pensados para narrarse en sesiones separadas. Cada capítulo debe terminar en suspenso y proponer una pregunta predictiva."],
          [19, "Fábula ambiental", "B1", "Environment", "Escribe una fábula corta en inglés, nivel B1 (120 palabras), sobre el cuidado del medioambiente, protagonizada por animales típicos de la región andina o pacífica colombiana. Incluye diálogos breves entre personajes y una moraleja explícita al final, resaltada en cursiva."],
          [20, "Testimonio intercultural", "A2-B1", "Local Culture", "Crea el guion narrado de un testimonio ficticio de un/a joven de una comunidad indígena del Valle del Cauca describiendo un día típico, en inglés, dejando espacios marcados [LENGUA PROPIA] donde el docente pueda insertar palabras reales de la comunidad con su debida autorización y validación cultural."],
        ],
      },
      {
        subgrupo: "Evaluación oral y retroalimentación",
        habilidades: ["Speaking"],
        prompts: [
          [21, "Rúbrica de speaking", null, "Descripción de fotos", "Diseña una rúbrica de evaluación oral de 4 niveles de desempeño para una actividad de descripción de fotos sobre \"My Community\", evaluando fluidez, pronunciación, vocabulario y gramática. Preséntala en tabla, con descriptores observables y no ambiguos por nivel."],
          [22, "Banco de examinador", "B1", "Tourism", "Genera un banco de 10 preguntas de examen oral nivel B1 sobre \"Tourism in the Valle del Cauca\", organizadas en tres momentos: calentamiento (2), desarrollo (6) y cierre reflexivo (2)."],
          [23, "Plantilla de feedback", "A2", null, "Redacta una plantilla de retroalimentación oral estructurada para que un docente use tras escuchar una grabación de un estudiante nivel A2, con secciones para fortalezas, un aspecto de pronunciación a mejorar, un aspecto gramatical a mejorar y una meta concreta para la próxima grabación."],
          [24, "Autoevaluación estudiantil", "A2", "Podcast escolar", "Diseña una guía de autoevaluación oral en inglés sencillo (A2) para que el estudiante escuche su grabación de un podcast escolar y responda 5 preguntas de reflexión sobre su desempeño, con lenguaje motivador y no punitivo."],
          [25, "Examen oral diferenciado", "A1-B1", "Healthy Habits", "Crea tres variantes de una misma consigna de examen oral sobre \"Healthy Habits\" (A1, A2 y B1) manteniendo el mismo tema pero ajustando la complejidad de la pregunta y la extensión de respuesta esperada."],
        ],
      },
    ],
  },
  {
    sala: "texto-imagen",
    bloque: "Escritura y Recursos Visuales",
    productos: ["Infografía", "Imagen", "Material imprimible"],
    subgrupos: [
      {
        subgrupo: "Lecturas graduadas y comprensión lectora",
        habilidades: ["Reading"],
        prompts: [
          [26, "Lectura graduada", "A1", "A Day in Buga", "Escribe una lectura graduada nivel A1 (100 palabras) titulada \"A Day in Buga\", usando presente simple y vocabulario de alta frecuencia. Agrega 5 preguntas de comprensión literal y un ejercicio de ordenar 4 eventos cronológicamente."],
          [27, "Texto informativo", "B1", "Río Cauca", "Genera un texto informativo nivel B1 (180 palabras) sobre la importancia del río Cauca para las comunidades ribereñas, con al menos tres conectores de causa-efecto (because, therefore, as a result). Incluye un glosario de 8 términos técnicos con definiciones sencillas en inglés."],
          [28, "Comprensión inferencial", "B1", "School life", "Escribe un texto narrativo de 150 palabras, nivel B1, sobre un conflicto cotidiano en la escuela, y diseña 6 preguntas de comprensión: 2 literales, 2 inferenciales y 2 de opinión personal justificada."],
          [29, "Lectura multinivel comparada", "A1-B1", "Coffee Growing", "Redacta el mismo texto informativo sobre \"Coffee Growing in the Valle del Cauca\" en tres niveles (A1, A2, B1), manteniendo la misma estructura de tres párrafos, y preséntalos lado a lado en una tabla para facilitar la diferenciación en el aula."],
          [30, "Texto con apoyo DUA", "A2", "Local Festivals", "Adapta un texto de 120 palabras sobre \"Local Festivals\" aplicando principios de Diseño Universal para el Aprendizaje: oraciones cortas, vocabulario resaltado en negrita, sinónimos entre paréntesis para palabras complejas y un resumen de 3 líneas al inicio a modo de anticipación."],
        ],
      },
      {
        subgrupo: "Vocabulario y recursos visuales",
        habilidades: ["Vocabulary"],
        prompts: [
          [31, "Infografía de vocabulario", "A2", "Environmental Care", "Genera el contenido textual para una infografía sobre \"Environmental Care\", nivel A2, con título, 10 palabras de vocabulario (sustantivo + verbo relacionado), definición breve de cada una en inglés y sugerencia de ícono o imagen para representarla."],
          [32, "Set de flashcards", "A2", "Pacific Animals", "Crea el contenido de 15 flashcards digitales sobre \"Animals of the Pacific Region\", cada una con: palabra en inglés, traducción al español, oración de ejemplo nivel A2 y descripción breve de la imagen sugerida para el anverso."],
          [33, "Mapa semántico", "B1", "Tourism", "Diseña la estructura textual de un mapa semántico (word web) sobre \"Tourism\", nivel B1, con una palabra central y 4 categorías ramificadas (places, activities, transportation, feelings), cada una con al menos 4 palabras asociadas."],
          [34, "Colocaciones (collocations)", "B1", "Healthy Lifestyle", "Genera una lista de 12 colocaciones en inglés relacionadas con \"Healthy Lifestyle\" (por ejemplo, \"eat balanced meals\"), nivel B1, cada una con una oración de ejemplo contextualizada en el Valle del Cauca y su traducción al español."],
          [35, "Glosario bilingüe intercultural", "B1", "Biodiversity", "Elabora un glosario bilingüe (inglés-español) de 10 términos sobre la biodiversidad del Valle del Cauca, dejando una columna adicional [LENGUA PROPIA] en blanco para completarla junto con hablantes de la comunidad, respetando su autonomía sobre el conocimiento tradicional."],
        ],
      },
      {
        subgrupo: "Producción escrita guiada",
        habilidades: ["Writing"],
        prompts: [
          [36, "Andamiaje descriptivo", "A2", "My Community", "Diseña una plantilla de escritura guiada nivel A2 para que el estudiante describa su comunidad, con 5 oraciones iniciadas (\"In my community, there is...\") que deba completar, y un banco de 10 palabras de apoyo."],
          [37, "Texto de proceso", "B1", "Local Recipe", "Crea una guía paso a paso, nivel B1, para que un estudiante escriba un párrafo de instrucciones (\"How to prepare a typical dish from the Valle del Cauca\"), con conectores de secuencia (first, then, next, finally) y un ejemplo modelo de 60 palabras."],
          [38, "Carta informal", "A2", "Tourist Places", "Genera la estructura y un ejemplo modelo de una carta informal nivel A2, en la que un estudiante le cuenta a un amigo por correspondencia sobre un lugar turístico del Valle del Cauca, con saludo, cuerpo de tres ideas y despedida."],
          [39, "Escritura persuasiva", "B2", "Biodiversity", "Diseña una guía de escritura persuasiva nivel B2 sobre \"Protecting Local Biodiversity\", con estructura introducción-argumento-contraargumento-conclusión, 6 conectores de opinión y argumentación, y una lista de criterios de autoevaluación para el estudiante."],
          [40, "Diario de aprendizaje", "A2", "Reflexión semanal", "Crea una plantilla de diario de aprendizaje nivel A2 con 4 preguntas guía en inglés sencillo para que el estudiante reflexione semanalmente sobre lo aprendido en clase de inglés, evitando lenguaje evaluativo o punitivo."],
        ],
      },
      {
        subgrupo: "Recursos interculturales y bilingües",
        habilidades: ["Reading", "Writing"],
        prompts: [
          [41, "Cómic educativo bilingüe", "A2", "Local Tradition", "Escribe el guion de un cómic educativo de 6 viñetas, nivel A2, sobre una tradición cultural del Valle del Cauca, con diálogos breves en inglés y notas al pie en español para palabras culturales sin traducción directa."],
          [42, "Folleto turístico bilingüe", "B1", "Natural Attraction", "Genera el texto de un folleto turístico bilingüe (inglés-español) de una página sobre un atractivo natural del Valle del Cauca, con 4 secciones: introducción, cómo llegar, qué hacer, y una recomendación cultural."],
          [43, "Cuento intercultural", "A2", "Valores culturales", "Adapta la estructura de un cuento infantil corto (100 palabras, A2) que integre un valor cultural de una comunidad indígena o afrodescendiente del Valle del Cauca, dejando espacios marcados [LENGUA PROPIA / EXPRESIÓN LOCAL] para completarlos con la comunidad educativa correspondiente, evitando cualquier apropiación cultural no autorizada."],
          [44, "Comparación cultural", "B1", "Celebraciones", "Escribe un texto comparativo de 150 palabras, nivel B1, entre una celebración tradicional del Valle del Cauca y una celebración de un país de habla inglesa, usando estructuras comparativas (more... than, as... as) y un cuadro comparativo final."],
          [45, "Recetario bilingüe", "A2", "Plato típico", "Genera el texto de una receta bilingüe de un plato típico del Valle del Cauca, nivel A2, con lista de ingredientes en inglés y español, y 6 pasos de preparación usando el imperativo en inglés (Add, Mix, Cook)."],
        ],
      },
      {
        subgrupo: "Evaluación y retroalimentación escrita",
        habilidades: ["Writing", "Grammar"],
        prompts: [
          [46, "Rúbrica de escritura", "A2", "Párrafo descriptivo", "Diseña una rúbrica de evaluación de escritura de 4 niveles para un párrafo descriptivo nivel A2, evaluando contenido, organización, vocabulario y gramática, con descriptores claros y observables en cada celda."],
          [47, "Banco de errores comunes", "B1", null, "Genera una lista de 10 errores comunes de hispanohablantes al escribir en inglés nivel B1 (orden de adjetivos, uso de do/does, etc.), cada uno con ejemplo incorrecto, corrección y una explicación breve en español."],
          [48, "Corrección de errores", "A2", "Daily Routines", "Diseña un ejercicio de corrección de errores nivel A2 con 8 oraciones sobre \"Daily Routines\", cada una con un error gramatical intencional, para que el estudiante identifique y corrija."],
          [49, "Feedback diferenciado", "A1-B1", null, "Redacta tres modelos de comentarios de retroalimentación escrita para un mismo párrafo de un estudiante, adaptando lenguaje y enfoque para nivel A1, A2 y B1, siempre en tono constructivo y orientado a la mejora."],
          [50, "Checklist de autoevaluación", "A2", null, "Crea una lista de cotejo de autoevaluación en inglés sencillo, nivel A2, con 6 criterios para que el estudiante revise su propio texto antes de entregarlo (mayúsculas, puntuación, concordancia verbal, etc.)."],
        ],
      },
    ],
  },
  {
    sala: "presentaciones",
    bloque: "Presentaciones Interactivas",
    productos: ["Presentación", "Juego", "Quiz", "Actividad interactiva"],
    subgrupos: [
      {
        subgrupo: "Secuencias didácticas completas",
        habilidades: ["Integrated Skills"],
        prompts: [
          [51, "Secuencia completa", "B1", "Environmental Care", "Diseña el esquema de una presentación de 12 diapositivas, nivel B1, sobre \"Environmental Care in the Valle del Cauca\", con la estructura: motivación, activación de saberes previos, desarrollo (4 diapositivas), práctica guiada (3), evaluación y cierre. Indica el contenido y el recurso visual sugerido para cada diapositiva."],
          [52, "Secuencia ABP", "B1", "Sustainable Tourism", "Crea el esquema de una presentación de 10 diapositivas para introducir un proyecto de Aprendizaje Basado en Proyectos sobre \"Sustainable Tourism\", nivel B1, incluyendo una diapositiva de pregunta guía, una de cronograma y una de criterios de evaluación del producto final."],
          [53, "Secuencia gramatical", "A2", "Present Continuous", "Diseña una secuencia de 8 diapositivas para enseñar el Present Continuous en el contexto de \"A Day at a Local Market\", nivel A2, con una diapositiva de descubrimiento de la regla, ejemplos visuales y una actividad de práctica controlada."],
          [54, "Secuencia multinivel", "A1-B1", "Healthy Habits", "Genera el esquema de una presentación de 10 diapositivas sobre \"Healthy Habits\" que incluya, en tres diapositivas específicas, actividades diferenciadas de práctica para niveles A1, A2 y B1 simultáneamente, pensadas para un aula con estudiantes de niveles mixtos."],
          [55, "Cierre metacognitivo", "A2", "My Community", "Diseña una presentación de 9 diapositivas sobre \"My Community\" que cierre con una diapositiva de reflexión metacognitiva (What did I learn? What was difficult? What will I do next?) en inglés sencillo nivel A2."],
        ],
      },
      {
        subgrupo: "Gamificación",
        habilidades: ["Vocabulary", "Grammar"],
        prompts: [
          [56, "Escape Room gramatical", "B1", "Present Perfect", "Diseña un Escape Room educativo en formato de presentación, nivel B1, con 4 retos secuenciales sobre \"Present Perfect\", donde cada reto correcto revela una parte de un código final. Describe el contenido de cada reto y la lógica de desbloqueo."],
          [57, "Trivia cultural", "A2-B1", "Valle del Cauca", "Genera 15 preguntas de trivia gamificada, nivel A2-B1, sobre geografía y cultura del Valle del Cauca en inglés, organizadas en 3 rondas de dificultad creciente, con 4 opciones de respuesta cada una y la respuesta correcta señalada."],
          [58, "Juego de tablero", "A2", "Food and Drinks", "Diseña las reglas y el contenido de un juego de tablero tipo \"oca\" en formato de diapositivas, nivel A2, para repasar vocabulario de \"Food and Drinks\", con 20 casillas que incluyan preguntas, retos de mímica y casillas de avance/retroceso."],
          [59, "Aventura de decisiones", "B1", "Giving Directions", "Crea la estructura de una presentación de aventura interactiva (\"choose your own adventure\") nivel B1, en la que el estudiante viaja por el Valle del Cauca y toma decisiones en inglés que lo llevan a distintas diapositivas, integrando vocabulario de \"Giving Directions\" y \"Tourism\"."],
          [60, "Insignias y retos", "B1", "Jobs and Careers", "Diseña un sistema de insignias digitales (badges) y retos progresivos para una unidad de 4 semanas sobre \"Jobs and Careers\", nivel B1, especificando el nombre de cada insignia, el criterio para obtenerla y una diapositiva de tablero de progreso grupal."],
        ],
      },
      {
        subgrupo: "Storytelling interactivo",
        habilidades: ["Reading", "Speaking"],
        prompts: [
          [61, "Historia interactiva", "A2", "Biodiversidad", "Escribe el guion de una historia digital interactiva de 8 diapositivas, nivel A2, sobre un/a estudiante que descubre un ecosistema del Valle del Cauca, con al menos dos puntos de decisión donde el lector elige cómo continúa la historia."],
          [62, "Serie con personaje recurrente", "B1", "Guía turístico", "Diseña una serie de 3 historias cortas conectadas por un mismo personaje (un/a joven guía turístico/a), nivel B1, cada una de 5 diapositivas, para usarse en semanas consecutivas, integrando vocabulario nuevo de forma acumulativa."],
          [63, "Narrativa con mapa visual", "A2", "Giving Directions", "Crea el guion de una presentación de storytelling de 10 diapositivas, nivel A2, que narre un recorrido real por tres municipios del Valle del Cauca, integrando vocabulario de \"Giving Directions\" y una diapositiva final de mapa resumen."],
          [64, "Historia de final abierto", "B1", "Dilema ambiental", "Escribe una historia corta de 6 diapositivas, nivel B1, sobre un dilema ambiental en una comunidad rural del Valle del Cauca, terminando en un final abierto seguido de una diapositiva con 3 preguntas de discusión grupal."],
          [65, "Storytelling estudiantil", "A2", "My Family", "Diseña una plantilla de 6 diapositivas para que los propios estudiantes cuenten, en inglés nivel A2, una anécdota personal relacionada con \"My Family\", indicando claramente qué contenido va en cada diapositiva (título, personajes, problema, solución, cierre)."],
        ],
      },
      {
        subgrupo: "Evaluación formativa interactiva",
        habilidades: ["Integrated Skills"],
        prompts: [
          [66, "Quiz formativo", "B1", "Environmental Care", "Genera un cuestionario formativo de 10 preguntas, nivel B1, sobre \"Environmental Care\", combinando selección múltiple, verdadero/falso y una pregunta abierta corta, pensado para insertarse en una plataforma tipo Kahoot o Quizizz."],
          [67, "Exit ticket", "A2", "Daily Routines", "Diseña el contenido de una diapositiva de \"exit ticket\" nivel A2, con 3 preguntas rápidas para verificar la comprensión del tema \"Daily Routines\" al final de la clase, más una pregunta de autoevaluación de confianza (1 a 5)."],
          [68, "Diagnóstico gamificado", "A1-A2", "Animals", "Crea una evaluación diagnóstica gamificada de 8 preguntas en formato de diapositivas, nivel A1-A2, para medir el vocabulario previo sobre \"Animals\" antes de iniciar la unidad, con retroalimentación inmediata sugerida para cada respuesta."],
          [69, "Rúbrica visual interactiva", "A2", "Participación oral", "Diseña el contenido de una diapositiva de rúbrica visual e interactiva (con emojis o colores) para que los estudiantes autoevalúen su participación oral en una actividad grupal, nivel A2, con 4 criterios simples."],
          [70, "Coevaluación entre pares", "B1", null, "Genera una guía de coevaluación entre pares en formato de diapositiva, nivel B1, con 4 preguntas guiadas para que un estudiante retroalimente la presentación oral de un compañero de forma respetuosa y constructiva."],
        ],
      },
      {
        subgrupo: "Adaptación por niveles y diferenciación",
        habilidades: ["Integrated Skills"],
        prompts: [
          [71, "Diferenciación DUA", "A2-B1", "Simple Past", "Adapta una diapositiva de explicación gramatical sobre el Simple Past aplicando tres niveles de apoyo (DUA): una versión con apoyo visual e íconos, una con texto simplificado y ejemplos, y una de reto adicional para estudiantes avanzados."],
          [72, "Choice board", "A2-B1", "Tourism", "Diseña un \"choice board\" de 9 actividades en formato de diapositiva sobre \"Tourism in the Valle del Cauca\", nivel A2-B1, organizadas en una cuadrícula 3x3, donde el estudiante elige 3 actividades para completar según su interés."],
          [73, "Adaptación baja conectividad", "A2", "Food", "Rediseña una secuencia de 8 diapositivas sobre \"Food\" para que pueda entregarse impresa o en PDF liviano a estudiantes sin conexión permanente a Internet, manteniendo las mismas actividades pero sin depender de hipervínculos activos."],
          [74, "Escalera de dificultad", "A1-B1", "Emotions", "Diseña una \"escalera de aprendizaje\" de 5 niveles en formato de diapositivas sobre vocabulario de \"Emotions\", desde reconocimiento básico (A1) hasta uso en contexto complejo (B1), indicando el criterio de avance de un escalón a otro."],
          [75, "Apoyos razonables", "A2", "Places in the City", "Sugiere adaptaciones razonables (sin diagnosticar ni etiquetar al estudiante) para una diapositiva de vocabulario de \"Places in the City\", considerando mayor tiempo de respuesta, apoyo visual reforzado e instrucciones divididas en pasos más pequeños."],
        ],
      },
    ],
  },
  {
    sala: "video",
    bloque: "Video Educativo",
    productos: ["Video"],
    subgrupos: [
      {
        subgrupo: "Guiones y storyboards",
        habilidades: ["Listening", "Writing"],
        prompts: [
          [76, "Guion + storyboard", "A2", "Village Life", "Escribe el guion (máximo 200 palabras) y el storyboard de 6 escenas (columnas: escena, imagen, narración, recurso visual) para un video nivel A2 sobre \"A Typical Day in a Valle del Cauca Village\", siguiendo la estructura: motivación, objetivo, desarrollo, ejemplo, actividad, cierre."],
          [77, "Video gramatical", "B1", "Present Perfect vs Past", "Diseña el guion de un video explicativo de 4 minutos, nivel B1, sobre \"Present Perfect vs. Simple Past\", con al menos 3 ejemplos contextualizados en el Valle del Cauca y una actividad final para pausar el video."],
          [78, "Storyboard campaña ambiental", "B1", "Río Cauca", "Crea el storyboard (8 escenas) y guion resumido de un video de campaña escolar sobre el cuidado del río Cauca, nivel B1, en tono persuasivo, incluyendo un llamado a la acción claro en la última escena."],
          [79, "Video turístico bilingüe", "A2-B1", null, "Escribe el guion de un video turístico bilingüe (inglés-español) de 3 minutos sobre un municipio del Valle del Cauca, con la estructura: bienvenida, tres lugares destacados, recomendación gastronómica y despedida."],
          [80, "Guion para narración por IA", "A2", null, "Redacta un guion de 150 palabras, nivel A2, optimizado para ser narrado por una voz generada con inteligencia artificial (por ejemplo ElevenLabs o Copilot Voice), incluyendo marcas de pausa [PAUSA] y énfasis [ÉNFASIS] en las palabras clave del vocabulario objetivo."],
        ],
      },
      {
        subgrupo: "Aula invertida (flipped classroom)",
        habilidades: ["Listening"],
        prompts: [
          [81, "Video pre-clase", "B1", "Renewable Energy", "Diseña el guion de un video de 4 minutos para Aula Invertida, nivel B1, que los estudiantes verán antes de la clase sobre \"Renewable Energy\", terminando con 2 preguntas de comprensión que deberán responder antes de llegar al aula."],
          [82, "Video de instrucciones ABP", "B1", "Local Biodiversity", "Escribe el guion de un video de 3 minutos explicando, paso a paso, las instrucciones de un proyecto de Aprendizaje Basado en Proyectos sobre \"Local Biodiversity\", nivel B1, incluyendo cronograma, criterios de evaluación y formato de entrega."],
          [83, "Video de vocabulario previo", "A2", "Transportation", "Genera el guion de un video corto (90 segundos), nivel A2, que presente 10 palabras nuevas de \"Transportation\" antes de una clase presencial, usando repetición espaciada y ejemplos visuales sugeridos para cada palabra."],
          [84, "Video con preguntas incrustadas", "A2", "Giving Directions", "Diseña el guion de un video de 3 minutos sobre \"Giving Directions\", nivel A2, con 3 puntos de pausa marcados [PREGUNTA] donde se insertará una pregunta interactiva tipo Edpuzzle, incluyendo el contenido de cada pregunta."],
          [85, "Video de retroalimentación grupal", "B1", "My Community", "Escribe el guion de un video corto de retroalimentación grupal (2 minutos), nivel B1, en el que el docente resume los errores más comunes encontrados en las tareas de escritura sobre \"My Community\", en tono constructivo y motivador."],
        ],
      },
      {
        subgrupo: "Video interactivo con preguntas",
        habilidades: ["Listening"],
        prompts: [
          [86, "Video interactivo Edpuzzle", "B1", "Healthy Habits", "Diseña un guion de video de 5 minutos, nivel B1, sobre \"Healthy Habits\", con 5 preguntas incrustadas en momentos específicos (indica el minuto aproximado), variando entre opción múltiple y respuesta abierta corta."],
          [87, "Video de secuencia de proceso", "A2", "Coffee Processing", "Crea el guion de un video de 4 minutos, nivel A2, que narre un proceso (por ejemplo, \"How Coffee is Grown and Processed\"), con 4 preguntas de secuencia insertadas para verificar que el estudiante siga el orden correcto de los pasos."],
          [88, "Video ramificado", "B1", "At the Airport", "Diseña la estructura de un video interactivo ramificado (con al menos 2 puntos de decisión), nivel B1, sobre cómo actuar ante una situación cotidiana en un aeropuerto, especificando el contenido de cada rama."],
          [89, "Video con glosario emergente", "A2", "Food and Drinks", "Escribe el guion de un video de 3 minutos, nivel A2, sobre \"Food and Drinks\", indicando en qué momento deben aparecer subtítulos con la traducción de palabras clave (glosario emergente) para reforzar el vocabulario nuevo."],
          [90, "Video de autoevaluación", "B1", "Environment", "Genera el guion de un video de cierre de unidad (2 minutos), nivel B1, que guíe a los estudiantes en un proceso de autoevaluación oral frente a la cámara sobre lo aprendido en el tema \"Environment\", con 4 preguntas guía."],
        ],
      },
      {
        subgrupo: "Pronunciación y modelaje oral en video",
        habilidades: ["Pronunciation", "Speaking"],
        prompts: [
          [91, "Modelaje articulatorio", "A1", "Numbers and Colors", "Diseña el guion de un video de 2 minutos, nivel A1, que modele la pronunciación de 10 palabras de \"Numbers and Colors\", incluyendo instrucciones visuales sobre la posición de la boca para cada sonido difícil para hispanohablantes."],
          [92, "Práctica de entonación", "A2", "Tourist Attractions", "Escribe el guion de un video de 3 minutos, nivel A2, con 10 preguntas modelo (5 Yes/No y 5 Wh-) sobre \"Tourist Attractions\", indicando el patrón de entonación esperado y dejando pausas para que el estudiante repita en voz alta."],
          [93, "Trabalenguas y ritmo", "A2-B1", null, "Genera 5 trabalenguas originales en inglés, nivel A2-B1, enfocados en sonidos difíciles para hispanohablantes (r, th, v/b), y el guion de un video de 2 minutos que los presente con ritmo creciente de dificultad."],
          [94, "Diálogo modelo", "A2", "Restaurant", "Escribe el guion de un video de rol modelo (2 personajes) de 2 minutos, nivel A2, sobre \"Ordering Food at a Restaurant\", con marcas explícitas de entonación y pausas naturales para que sirva de modelo de pronunciación fluida."],
          [95, "Autocorrección fonética", "B1", "Jobs", "Diseña el guion de un video de 90 segundos, nivel B1, que enseñe una estrategia sencilla de autocorrección de pronunciación mediante grabación de la propia voz y comparación con un modelo, aplicado al vocabulario de \"Jobs\"."],
        ],
      },
      {
        subgrupo: "Adaptación cultural y territorial",
        habilidades: ["Speaking", "Listening"],
        prompts: [
          [96, "Mini-documental comunitario", "B1", "Tradición local", "Diseña la estructura (guion + storyboard de 8 escenas) de un mini-documental escolar, nivel B1, en el que estudiantes entrevistan a un miembro de su comunidad sobre una tradición local, en inglés, dejando espacio para insertar fragmentos en lengua propia con su debida autorización."],
          [97, "Video para zona rural dispersa", "A2", "Local Culture", "Adapta el guion de un video educativo de 3 minutos sobre \"Local Culture\" para que pueda grabarse únicamente con un teléfono celular y sin edición avanzada, nivel A2, incluyendo notas de producción sencillas (encuadre, luz natural, sonido) para un docente sin experiencia técnica."],
          [98, "Especie representativa", "B1", "Biodiversidad", "Escribe el guion de un video de 3 minutos, nivel B1, sobre una especie animal o vegetal representativa del Valle del Cauca, integrando su nombre común en español e inglés, y una reflexión final sobre su conservación."],
          [99, "Video de bienvenida bilingüe", "A2-B1", "Institución educativa", "Genera el guion de un video de bienvenida bilingüe (2 minutos) para nuevos estudiantes de una institución educativa del Valle del Cauca, presentando la institución, su entorno y tres normas de convivencia clave."],
          [100, "Cierre de ciclo intercultural", "B1", "Identidad", "Diseña el guion de un video de cierre de unidad (2-3 minutos), nivel B1, que sintetice los aprendizajes sobre \"Local Culture and Identity\", dando espacio explícito para que estudiantes de distintos contextos (urbano, rural, indígena) compartan una frase final desde su propio contexto cultural."],
        ],
      },
    ],
  },
];

function expandNiveles(nivel: string | null): Nivel[] {
  if (!nivel) return [];
  const parts = nivel.split("-").map((s) => s.trim()) as Nivel[];
  if (parts.length === 1) return NIVELES.includes(parts[0]) ? [parts[0]] : [];
  const a = NIVELES.indexOf(parts[0]);
  const b = NIVELES.indexOf(parts[1]);
  if (a < 0 || b < 0) return [];
  return NIVELES.slice(a, b + 1) as unknown as Nivel[];
}

export const PROMPTS: PromptBanco[] = DATA.flatMap((b) =>
  b.subgrupos.flatMap((sg) =>
    sg.prompts.map(([numero, titulo, nivel, tema, texto]) => ({
      id: `prompt-${numero}`,
      numero,
      sala: b.sala,
      bloque: b.bloque,
      subgrupo: sg.subgrupo,
      titulo,
      nivel,
      niveles: expandNiveles(nivel),
      tema,
      habilidades: sg.habilidades,
      productos: b.productos,
      texto,
    }))
  )
);

export const SUBGRUPOS_PROMPTS = DATA.flatMap((b) =>
  b.subgrupos.map((sg) => ({ sala: b.sala, bloque: b.bloque, subgrupo: sg.subgrupo }))
);

export function promptById(id: string) {
  return PROMPTS.find((p) => p.id === id);
}
