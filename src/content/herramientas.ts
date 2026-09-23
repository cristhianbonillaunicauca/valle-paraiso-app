import type {
  Conectividad,
  Dificultad,
  Habilidad,
  Precio,
  Producto,
  SalaId,
  TipoHerramienta,
} from "@/content/taxonomia";

/**
 * FUENTE: "1. Banco de herramientas digitales - Valle Paraíso" (93 recursos,
 * 11 categorías). Nombre, descripción, enlace, licencia y aplicación en la
 * enseñanza del inglés se tomaron de ese archivo.
 *
 * CLASIFICACIÓN ORIENTATIVA: habilidades, conectividad y dificultad son una
 * clasificación editorial para alimentar los filtros del Explorador (no
 * vienen del Excel). Se pueden ajustar editando la fila correspondiente.
 *   Conectividad: 0 = Sin internet (software instalable), 1 = Baja,
 *                 2 = Media, 3 = Alta (video en línea, trabajo en la nube).
 *   Dificultad:   1 = Básica, 2 = Intermedia, 3 = Avanzada.
 *   Precio:       G = Gratis, F = Freemium, P = Pago.
 *   Habilidades:  S L R W V G P I (Speaking, Listening, Reading, Writing,
 *                 Vocabulary, Grammar, Pronunciation, Integrated Skills).
 */

export interface Herramienta {
  id: string;
  nombre: string;
  categoria: string;
  tipo: TipoHerramienta;
  sala: SalaId | null;
  descripcion: string;
  url: string;
  licencia: string;
  aplicacion: string;
  precio: Precio;
  conectividad: Conectividad;
  dificultad: Dificultad;
  habilidades: Habilidad[];
  productos: Producto[];
  /** Todas las herramientas son adaptables a cualquier nivel MCER. */
  niveles: "A1-C2";
}

type Row = [
  nombre: string,
  url: string,
  precio: "G" | "F" | "P",
  conectividad: 0 | 1 | 2 | 3,
  dificultad: 1 | 2 | 3,
  habilidades: string,
  licencia: string,
  descripcion: string,
  aplicacion: string,
];

interface Categoria {
  categoria: string;
  tipo: TipoHerramienta;
  sala: SalaId | null;
  productos: Producto[];
  rows: Row[];
}

const DATA: Categoria[] = [
  {
    categoria: "Diseño gráfico",
    tipo: "Diseño",
    sala: "texto-imagen",
    productos: ["Imagen", "Infografía", "Material imprimible"],
    rows: [
      ["Canva para Educación", "https://www.canva.com/es_419/educacion/", "F", 2, 1, "VWS", "Freemium (gratis para docentes verificados; funciones Pro de pago)", "Plataforma de diseño gráfico en línea con miles de plantillas, banco de imágenes propio y editor de arrastrar y soltar. Su versión educativa es gratuita para docentes y estudiantes verificados.", "Crear pósteres de vocabulario, infografías de reglas gramaticales, tarjetas ilustradas y apoyos visuales para exposiciones orales."],
      ["Piktochart", "https://piktochart.com/", "F", 2, 1, "VGR", "Freemium", "Generador de infografías, informes visuales y presentaciones a partir de plantillas editables.", "Resumir visualmente los tiempos verbales, comparar campos de vocabulario o construir líneas de tiempo de la lengua inglesa."],
      ["Adobe Express", "https://www.adobe.com/express/", "F", 2, 1, "W", "Freemium (cuenta gratuita; funciones Premium de pago)", "Editor gráfico y de video en línea para crear publicaciones, pósteres, videos cortos y collages a partir de plantillas.", "Producir piezas publicitarias ficticias, tarjetas o campañas de concientización como proyecto de escritura persuasiva."],
      ["Pixlr", "https://pixlr.com/", "F", 2, 2, "SV", "Freemium", "Editor de fotografías en línea con recorte, retoque, capas y eliminación de fondo asistida por IA.", "Editar imágenes para portafolios digitales y preparar material para actividades de \"describe the picture\"."],
      ["ThingLink", "https://www.thinglink.com/", "F", 2, 2, "VPL", "Freemium", "Plataforma para convertir imágenes, videos y modelos 360° en contenido interactivo con etiquetas de texto, audio, enlaces o video.", "Crear imágenes interactivas de vocabulario (objetos, lugares, partes del cuerpo) con audio de pronunciación incorporado."],
      ["Storyboard That", "https://www.storyboardthat.com/", "F", 2, 1, "WRG", "Freemium (prueba gratuita; suscripción escolar de pago)", "Creador de historietas y guiones gráficos con biblioteca de personajes, escenas y objetos prediseñados.", "Practicar la secuenciación narrativa, el \"reported speech\" y los conectores temporales mediante historietas."],
      ["Make Beliefs Comix", "https://www.makebeliefscomix.com/", "G", 1, 1, "WS", "Gratuito", "Generador sencillo de tiras cómicas en línea, sin registro, con personajes, globos de diálogo y fondos predefinidos.", "Practicar diálogos cortos y expresiones idiomáticas en un formato lúdico y de bajo riesgo para estudiantes tímidos."],
      ["Comic Master", "http://www.comicmaster.org.uk/", "G", 1, 1, "W", "Gratuito", "Aplicación para crear novelas gráficas cortas eligiendo fondos, personajes, accesorios y texto, con opción de imprimir.", "Desarrollar la escritura creativa y el uso de diálogos en inglés al construir historias ilustradas."],
    ],
  },
  {
    categoria: "Audio",
    tipo: "Audio",
    sala: "audio",
    productos: ["Audio", "Podcast"],
    rows: [
      ["Audacity", "https://www.audacityteam.org/", "G", 0, 2, "SLP", "Software libre / código abierto (GNU GPL)", "Editor y grabador de audio multipista de código abierto para Windows, macOS y Linux.", "Grabar y editar podcasts estudiantiles, ejercicios de pronunciación, dictados y proyectos de radio en inglés."],
      ["Ardour", "https://www.ardour.org/", "G", 0, 3, "L", "Software libre / código abierto (GNU GPL)", "Estación de trabajo de audio digital (DAW) de código abierto para grabación, edición y mezcla multipista.", "Producir bandas sonoras o efectos de sonido para los proyectos audiovisuales de la clase de inglés."],
      ["Soundtrap for Education", "https://www.soundtrap.com/edu", "F", 2, 2, "SL", "Freemium (plan educativo institucional de pago)", "Estudio de grabación en línea pensado para el aula; permite grabar voz y música de forma colaborativa desde el navegador.", "Crear podcasts colaborativos, jingles publicitarios o audiolibros grupales en inglés."],
      ["GarageBand", "https://www.apple.com/mac/garageband/", "G", 0, 2, "S", "Gratuito (solo dispositivos Apple)", "Aplicación de creación musical y grabación de audio de Apple, preinstalada en Mac e iOS.", "Grabar narraciones, canciones o \"radio ads\" en inglés como producto final de una unidad temática."],
      ["Vocaroo", "https://vocaroo.com/", "G", 1, 1, "SPL", "Gratuito", "Grabadora de voz en línea, sin registro, que genera un enlace o archivo descargable en segundos.", "Recibir tareas orales cortas, practicar pronunciación de forma autónoma y dar retroalimentación asincrónica."],
      ["Online Voice Recorder", "https://online-voice-recorder.com/", "G", 1, 1, "SP", "Gratuito", "Herramienta web para grabar audio desde el micrófono del computador y exportarlo en MP3.", "Registrar exámenes orales o autoevaluaciones de pronunciación sin instalar software adicional."],
      ["NaturalReader", "https://www.naturalreaders.com/", "F", 2, 1, "LPR", "Freemium", "Conversor de texto a voz con voces naturales en varios acentos del inglés (web, escritorio y extensión).", "Modelar la pronunciación de un texto, apoyar a estudiantes con dificultades lectoras y crear material de escucha personalizado."],
      ["Google Translate (texto a voz)", "https://translate.google.com/", "G", 1, 1, "PV", "Gratuito", "Traductor que permite escuchar la pronunciación de palabras y frases en inglés mediante texto a voz.", "Verificar la pronunciación de palabras nuevas, comparar acentos británico y americano y generar clips cortos de práctica."],
    ],
  },
  {
    categoria: "Video",
    tipo: "Video",
    sala: "video",
    productos: ["Video"],
    rows: [
      ["DaVinci Resolve", "https://www.blackmagicdesign.com/products/davinciresolve/", "F", 0, 3, "SL", "Freemium (versión gratuita muy completa; versión Studio de pago)", "Suite profesional de edición de video, corrección de color y posproducción de audio.", "Editar proyectos audiovisuales avanzados, como cortometrajes o documentales en inglés."],
      ["OpenShot", "https://www.openshot.org/es/", "G", 0, 2, "S", "Software libre / código abierto (GPL)", "Editor de video multiplataforma, gratuito y de código abierto, con interfaz sencilla para principiantes.", "Editar videos cortos de práctica oral, resúmenes de lectura en video o proyectos colaborativos."],
      ["Blender", "https://www.blender.org/", "G", 0, 3, "V", "Software libre / código abierto (GPL)", "Suite de creación 3D de código abierto que incluye un editor de video funcional.", "Crear animaciones 3D o videos explicativos como proyecto final de una unidad de vocabulario técnico."],
      ["CapCut", "https://www.capcut.com/", "F", 2, 1, "SW", "Freemium", "Editor de video para computador y móvil con plantillas, subtítulos automáticos y efectos.", "Producir videos cortos narrados en inglés con subtítulos automáticos que refuerzan la relación entre sonido y escritura."],
      ["WeVideo", "https://www.wevideo.com/", "F", 3, 2, "I", "Freemium (plan educativo de pago)", "Editor de video en la nube pensado para el aula, con trabajo colaborativo en tiempo real.", "Desarrollar proyectos de video colaborativos sobre contenidos de clase (aprendizaje integrado de contenidos y lengua)."],
      ["Powtoon", "https://www.powtoon.com/", "F", 3, 2, "SW", "Freemium", "Plataforma para crear videos animados y presentaciones con personajes, transiciones y plantillas.", "Explicar procesos o contar historias animadas en inglés para practicar la narrativa y la secuencia temporal."],
      ["Animoto", "https://animoto.com/", "F", 3, 1, "S", "Freemium", "Herramienta que transforma fotos, clips y música en videos de forma automática a partir de plantillas.", "Crear videos de presentación personal, resúmenes de proyectos o \"digital storytelling\" en inglés."],
      ["ScreenPal", "https://screenpal.com/", "F", 2, 1, "GW", "Freemium", "Grabación de pantalla, edición y alojamiento de video, muy usada para videotutoriales y aula invertida.", "Grabar retroalimentación oral sobre trabajos escritos o explicar reglas gramaticales en videotutoriales."],
      ["Explain Everything", "https://explaineverything.com/", "F", 2, 2, "GR", "Freemium", "Pizarra interactiva y grabador de pantalla que combina voz, escritura y anotaciones en tiempo real.", "Crear tutoriales multimedia y registrar paso a paso la resolución de ejercicios de gramática o comprensión lectora."],
      ["Loom", "https://www.loom.com/", "F", 2, 1, "WS", "Freemium", "Grabación de pantalla y cámara para crear videos explicativos cortos que se comparten con un enlace.", "Enviar retroalimentación oral y visual sobre las producciones escritas de los estudiantes de forma ágil."],
    ],
  },
  {
    categoria: "Presentaciones",
    tipo: "Presentaciones",
    sala: "presentaciones",
    productos: ["Presentación"],
    rows: [
      ["Prezi", "https://prezi.com/", "F", 2, 2, "S", "Freemium", "Plataforma de presentaciones no lineales basada en un lienzo con zoom.", "Presentar proyectos o exposiciones orales con una estructura visual que apoye la organización del discurso."],
      ["Genially", "https://www.genially.com/es/", "F", 2, 2, "VGR", "Freemium", "Herramienta para crear presentaciones, infografías y contenidos interactivos y animados sin programar.", "Diseñar presentaciones interactivas de vocabulario, escape rooms gramaticales y guías de lectura con actividades incrustadas."],
      ["Microsoft PowerPoint", "https://www.microsoft.com/es-es/microsoft-365/powerpoint", "P", 0, 1, "SV", "De pago (incluido en Microsoft 365; versión web gratuita limitada)", "Software de presentaciones de Microsoft Office con plantillas, animaciones y narrador integrado.", "Estructurar exposiciones orales, apoyar visualmente el vocabulario nuevo y practicar el discurso público en inglés."],
      ["Google Slides", "https://www.google.com/slides/about/", "G", 2, 1, "SW", "Gratuito (requiere cuenta de Google)", "Presentaciones en la nube con edición colaborativa en tiempo real e integración con Google Classroom.", "Trabajar proyectos grupales de presentación y dar retroalimentación mediante comentarios en inglés."],
      ["Slidesgo", "https://slidesgo.com/", "G", 2, 1, "S", "Gratuito con atribución (planes premium disponibles)", "Repositorio de plantillas gratuitas para Google Slides y PowerPoint, organizadas por tema y estilo.", "Ahorrar tiempo de diseño al preparar clases y ofrecer plantillas atractivas para presentar proyectos."],
      ["Knovio", "https://www.knovio.com/", "F", 3, 2, "S", "Freemium", "Plataforma para grabar presentaciones en video combinando diapositivas e imagen del presentador.", "Practicar la exposición oral grabada como preparación para presentaciones en vivo o como evaluación asincrónica."],
      ["SlideShare", "https://www.slideshare.net/", "G", 2, 1, "R", "Gratuito con registro", "Plataforma para publicar y compartir presentaciones, documentos e infografías.", "Explorar presentaciones sobre temas de interés como fuente de lectura y modelo para los estudiantes."],
      ["PhotoPeach", "https://photopeach.com/", "F", 2, 1, "V", "Freemium", "Generador de presentaciones musicales a partir de fotografías, con textos y música de fondo.", "Crear presentaciones cortas ilustradas para practicar vocabulario descriptivo y narración simple."],
    ],
  },
  {
    categoria: "Bancos de imágenes",
    tipo: "Diseño",
    sala: "texto-imagen",
    productos: ["Imagen", "Material imprimible"],
    rows: [
      ["Unsplash", "https://unsplash.com/", "G", 2, 1, "VSW", "Licencia Unsplash (uso libre y gratuito)", "Banco de fotografías de alta calidad con licencia que permite su uso sin atribución.", "Ilustrar guías de trabajo, presentaciones y actividades de descripción de imágenes en inglés."],
      ["Pixabay", "https://pixabay.com/es/", "G", 2, 1, "V", "Licencia Pixabay (uso libre y gratuito)", "Repositorio de imágenes, ilustraciones, vectores y videos gratuitos, sin necesidad de atribución.", "Buscar imágenes por categoría temática para crear material de vocabulario o comprensión visual."],
      ["Pexels", "https://www.pexels.com/es-es/", "G", 2, 1, "V", "Licencia Pexels (uso libre y gratuito)", "Banco de fotografías y videos gratuitos con buscador por color, orientación y tamaño.", "Obtener imágenes de alta calidad para tarjetas de vocabulario, pósteres y presentaciones."],
      ["Flickr Creative Commons", "https://www.flickr.com/creativecommons/", "G", 2, 1, "RS", "Creative Commons (variable según autor; verificar cada foto)", "Millones de fotografías con distintas licencias Creative Commons, filtrables por tipo de uso.", "Encontrar fotografías culturales de países de habla inglesa para actividades de comprensión cultural."],
      ["Wikimedia Commons (imágenes)", "https://commons.wikimedia.org/", "G", 2, 1, "R", "CC0 / Creative Commons (variable según archivo)", "Repositorio de medios libres con millones de imágenes, mapas y diagramas.", "Buscar imágenes históricas, mapas y diagramas para actividades CLIL en inglés."],
      ["Freepik", "https://www.freepik.com/", "F", 2, 1, "V", "Gratuito con atribución / Premium de pago", "Banco de vectores, fotografías, íconos y plantillas; el uso gratuito requiere atribución.", "Descargar íconos y vectores para fichas de vocabulario e infografías."],
      ["Openclipart", "https://openclipart.org/", "G", 1, 1, "V", "Dominio público (CC0)", "Colección de clipart e ilustraciones vectoriales simples en dominio público.", "Obtener íconos sencillos para exámenes, guías y tarjetas de vocabulario en niveles iniciales."],
    ],
  },
  {
    categoria: "Bancos de audio",
    tipo: "Audio",
    sala: "audio",
    productos: ["Audio", "Podcast"],
    rows: [
      ["Free Music Archive", "https://freemusicarchive.org/", "G", 2, 1, "L", "Creative Commons (variable según pista)", "Biblioteca de más de cien mil canciones filtrables por licencia Creative Commons.", "Musicalizar videos y podcasts estudiantiles respetando los derechos de autor."],
      ["Freesound", "https://freesound.org/", "G", 2, 1, "LS", "Creative Commons (variable según autor)", "Repositorio colaborativo de sonidos y efectos ambientales bajo licencias Creative Commons.", "Ambientar historias sonoras, podcasts o dramatizaciones en inglés con efectos realistas."],
      ["ccMixter", "http://ccmixter.org/", "G", 2, 1, "L", "Creative Commons BY (variable según pista)", "Comunidad de músicos que comparte y remezcla música bajo licencias Creative Commons.", "Seleccionar música de fondo para proyectos audiovisuales sin infringir derechos de autor."],
      ["Jamendo", "https://www.jamendo.com/", "G", 2, 1, "L", "Creative Commons BY-NC-ND (variable según artista)", "Comunidad de música libre de artistas independientes con descarga gratuita.", "Encontrar música ambiental para presentaciones o videos escolares sin fines comerciales."],
      ["Musopen", "https://musopen.org/", "G", 2, 1, "RW", "Dominio público / CC0", "Grabaciones de música clásica en dominio público para escuchar, descargar y reutilizar.", "Usar música clásica como fondo para lecturas dramatizadas o escritura creativa."],
      ["Purple Planet Music", "https://www.purple-planet.com/", "G", 2, 1, "L", "Creative Commons BY", "Música original gratuita con atribución al autor.", "Musicalizar proyectos de video y presentaciones citando correctamente a los autores."],
      ["YouTube Audio Library", "https://www.youtube.com/audiolibrary", "G", 2, 1, "L", "Gratuito (uso condicionado a videos de YouTube en varias pistas)", "Biblioteca de música y efectos gratuitos pensada para videos publicados en YouTube.", "Musicalizar los videos finales que los estudiantes publiquen como parte de proyectos de clase."],
      ["Incompetech", "https://incompetech.com/music/", "G", 2, 1, "W", "Creative Commons BY / BY-SA", "Catálogo de música instrumental original en WAV, MP3 y OGG sin registro.", "Seleccionar bandas sonoras temáticas (aventura, suspenso, humor) para narraciones."],
      ["Pixabay Music", "https://pixabay.com/music/", "G", 2, 1, "L", "Licencia Pixabay (uso libre y gratuito)", "Música y efectos de sonido de uso libre y sin atribución.", "Complementar videos y podcasts estudiantiles con música libre de derechos."],
    ],
  },
  {
    categoria: "Bancos de video",
    tipo: "Video",
    sala: "video",
    productos: ["Video"],
    rows: [
      ["Pixabay Videos", "https://pixabay.com/es/videos/", "G", 3, 1, "LS", "Licencia Pixabay (uso libre y gratuito)", "Clips en 4K y HD de corta duración organizados por categorías.", "Ilustrar temas de vocabulario o contextualizar actividades de comprensión con video sin diálogo."],
      ["Pexels Videos", "https://www.pexels.com/es-es/videos/", "G", 3, 1, "S", "Licencia Pexels (uso libre y gratuito)", "Videos de stock gratuitos de corta duración para proyectos personales y comerciales.", "Obtener clips de apoyo para actividades de storytelling o descripción de escenas."],
      ["Videvo", "https://www.videvo.net/", "G", 3, 1, "S", "Creative Commons BY 3.0", "Videos de stock y gráficos en movimiento gratuitos con atribución al autor.", "Editar proyectos audiovisuales estudiantiles citando correctamente la fuente."],
      ["Videezy", "https://www.videezy.com/", "G", 3, 1, "S", "Variable según el autor (algunos videos con licencia CC)", "Banco de videos gratuitos en alta definición organizado en cientos de categorías.", "Buscar metraje temático (naturaleza, ciudad, deportes) para videos narrados en inglés."],
      ["Mazwai", "https://mazwai.com/", "G", 3, 2, "S", "Creative Commons 3.0", "Colección curada de videoclips artísticos de alta calidad.", "Incorporar metraje cinematográfico en proyectos audiovisuales avanzados."],
      ["Vidsplay", "https://www.vidsplay.com/", "G", 3, 1, "S", "Gratuito con atribución", "Videos gratuitos que pueden descargarse, editarse y remezclarse citando la fuente.", "Complementar presentaciones y proyectos de video con metraje temático variado."],
      ["Wikimedia Commons (video)", "https://commons.wikimedia.org/wiki/Category:Video", "G", 3, 1, "L", "CC0 / Creative Commons (variable según archivo)", "Sección de video del repositorio multimedia libre de Wikimedia.", "Buscar material histórico o documental para actividades CLIL."],
      ["Vimeo Creative Commons", "https://vimeo.com/creativecommons", "G", 3, 1, "L", "Creative Commons (variable según autor)", "Videos publicados en Vimeo bajo licencias Creative Commons.", "Encontrar cortometrajes en inglés para actividades de comprensión audiovisual avanzada."],
    ],
  },
  {
    categoria: "Recursos Educativos Abiertos",
    tipo: "Recursos abiertos",
    sala: null,
    productos: ["Actividad interactiva", "Material imprimible"],
    rows: [
      ["British Council LearnEnglish", "https://learnenglish.britishcouncil.org/", "G", 2, 1, "IGVLR", "Gratuito", "Portal oficial del British Council con actividades gratuitas de gramática, vocabulario, escucha y lectura por nivel.", "Asignar práctica autónoma diferenciada por nivel y complementar la clase con audios auténticos."],
      ["BBC Learning English", "https://www.bbc.co.uk/learningenglish", "G", 2, 1, "LPGV", "Gratuito", "Lecciones de inglés general y de negocios, videos, podcasts y ejercicios de gramática, vocabulario y pronunciación.", "Trabajar comprensión auditiva con acentos británicos y actualidad adaptada a estudiantes."],
      ["VOA Learning English", "https://learningenglish.voanews.com/", "G", 2, 1, "LR", "Gratuito", "Noticias, podcasts y videos en inglés sencillo para estudiantes de inglés como lengua extranjera.", "Contextualizar el aprendizaje con noticias reales a velocidad y vocabulario controlados."],
      ["ISLCollective", "https://es.islcollective.com/", "G", 2, 1, "GV", "Gratuito con registro", "Comunidad de docentes de inglés que comparte fichas, presentaciones y materiales imprimibles.", "Descargar fichas y presentaciones ya elaboradas para reforzar gramática y vocabulario."],
      ["Randall's ESL Cyber Listening Lab", "https://www.esl-lab.com/", "G", 2, 1, "L", "Gratuito", "Grabaciones organizadas por nivel de dificultad con ejercicios de comprensión.", "Practicar comprensión auditiva progresiva con preguntas autocalificables."],
      ["ELLLO", "https://www.elllo.org/", "G", 2, 1, "L", "Gratuito", "Biblioteca de lecciones de escucha con hablantes de diferentes acentos y nacionalidades.", "Exponer a los estudiantes a la variedad de acentos del inglés, con transcripciones descargables."],
      ["TeacherTube", "https://www.teachertube.com/", "G", 3, 1, "GV", "Gratuito con registro", "Plataforma de videos educativos para docentes y estudiantes.", "Encontrar videos instruccionales de gramática y vocabulario elaborados por otros docentes."],
      ["OER Commons", "https://oercommons.org/", "G", 2, 1, "I", "Creative Commons (variable según recurso)", "Biblioteca de recursos educativos abiertos revisados por la comunidad: planes de clase, actividades y cursos.", "Adaptar unidades didácticas y planes de lección abiertos para la enseñanza del inglés."],
      ["Internet Archive", "https://archive.org/", "G", 2, 1, "LR", "Gratuito / Creative Commons (variable según ítem)", "Biblioteca digital con millones de libros, películas, audios y páginas web históricas.", "Acceder a películas de dominio público, audiolibros clásicos y grabaciones históricas en inglés."],
      ["Wikibooks", "https://es.wikibooks.org/", "G", 1, 1, "G", "CC BY-SA", "Libros de texto, manuales y guías de aprendizaje libres creados colaborativamente.", "Consultar o adaptar manuales colaborativos de gramática inglesa."],
      ["Agenda Web", "https://www.agendaweb.org/", "G", 1, 1, "GVLR", "Gratuito", "Cientos de ejercicios gratuitos de inglés por tema, con autocorrección inmediata.", "Asignar práctica extra y autónoma por tema gramatical o campo léxico."],
    ],
  },
  {
    categoria: "Inteligencia Artificial",
    tipo: "Inteligencia Artificial",
    sala: null,
    productos: ["Actividad interactiva", "Evaluación", "Material imprimible"],
    rows: [
      ["ChatGPT", "https://chatgpt.com/", "F", 2, 1, "SWG", "Freemium (versión gratuita con límites; suscripción de pago)", "Asistente conversacional de IA generativa capaz de redactar, corregir, resumir, traducir y simular conversaciones.", "Practicar conversación escrita simulada, generar ejemplos gramaticales y crear preguntas de comprensión sobre un texto."],
      ["Claude", "https://claude.ai/", "F", 2, 1, "W", "Freemium (versión gratuita con límites; planes de pago)", "Asistente de IA conversacional orientado a la redacción, el análisis y la revisión de textos extensos.", "Retroalimentar borradores de escritura, generar rúbricas o adaptar un texto a distintos niveles de inglés."],
      ["Grammarly", "https://www.grammarly.com/", "F", 2, 1, "WG", "Freemium", "Asistente de escritura con IA que revisa ortografía, gramática, puntuación, estilo y tono.", "Dar retroalimentación inmediata sobre los errores más frecuentes en los textos de los estudiantes."],
      ["QuillBot", "https://quillbot.com/", "F", 2, 1, "W", "Freemium", "Herramienta de IA para parafrasear, resumir y revisar gramática.", "Enseñar estrategias de paráfrasis y comparar distintas formas de expresar la misma idea."],
      ["ELSA Speak", "https://elsaspeak.com/", "F", 2, 1, "PS", "Freemium", "Aplicación de IA especializada en pronunciación del inglés con retroalimentación instantánea.", "Practicar pronunciación de manera autónoma con corrección inmediata."],
      ["MagicSchool AI", "https://www.magicschool.ai/", "F", 2, 1, "I", "Freemium (nivel gratuito amplio; planes institucionales de pago)", "Plataforma de IA para docentes con herramientas para planear clases, diferenciar contenidos y generar evaluaciones.", "Generar planes de clase, rúbricas, cuestionarios y textos adaptados a distintos niveles en minutos."],
      ["Diffit", "https://web.diffit.me/", "F", 2, 1, "RV", "Freemium", "Adapta cualquier texto a distintos niveles de lectura y genera resúmenes, vocabulario y preguntas.", "Diferenciar un mismo texto para distintos niveles de inglés dentro de un mismo grupo."],
      ["Otter.ai", "https://otter.ai/", "F", 2, 1, "SL", "Freemium", "Transcribe automáticamente audio y video a texto en tiempo real.", "Transcribir presentaciones orales para su revisión escrita o generar subtítulos de grabaciones."],
      ["Speechify", "https://speechify.com/", "F", 2, 1, "LR", "Freemium", "Texto a voz con IA, voces naturales en varios acentos del inglés y velocidad ajustable.", "Convertir lecturas en audio para apoyar a estudiantes con dificultades lectoras o practicar escucha."],
    ],
  },
  {
    categoria: "Evaluación",
    tipo: "Evaluación",
    sala: "presentaciones",
    productos: ["Quiz", "Evaluación"],
    rows: [
      ["Socrative", "https://www.socrative.com/", "F", 2, 1, "I", "Freemium", "Evaluación formativa en tiempo real con cuestionarios, encuestas rápidas y \"exit tickets\".", "Verificar la comprensión de una clase con preguntas rápidas y resultados instantáneos."],
      ["Plickers", "https://www.plickers.com/", "F", 1, 1, "I", "Freemium", "Evaluación formativa con tarjetas impresas que escanea la cámara del docente; los estudiantes no necesitan dispositivo.", "Aplicar evaluaciones formativas rápidas en aulas sin dispositivos individuales."],
      ["Google Forms", "https://www.google.com/forms/about/", "G", 1, 1, "GV", "Gratuito (requiere cuenta de Google)", "Formularios, encuestas y cuestionarios autocalificables con resultados en hoja de cálculo.", "Diseñar exámenes cortos de gramática y vocabulario con calificación automática."],
      ["That Quiz", "https://www.thatquiz.org/", "G", 1, 1, "I", "Gratuito", "Plataforma para crear pruebas con distintos tipos de pregunta y calificación configurable.", "Evaluar el progreso con exámenes que se resuelven en casa y se califican automáticamente."],
      ["Rubistar", "http://rubistar.4teachers.org/", "G", 1, 1, "SW", "Gratuito con registro", "Generador de rúbricas con criterios y niveles de desempeño.", "Elaborar rúbricas claras para evaluar producciones orales y escritas en inglés."],
      ["Hot Potatoes", "https://hotpot.uvic.ca/", "G", 0, 2, "GV", "Gratuito para uso educativo no comercial", "Programas para crear ejercicios interactivos: opción múltiple, crucigramas, emparejamiento y completar espacios.", "Generar ejercicios autoevaluables de gramática y vocabulario que funcionan sin conexión."],
      ["Quizizz", "https://quizizz.com/", "F", 2, 1, "VG", "Freemium", "Cuestionarios interactivos con elementos de juego e informes detallados por estudiante.", "Evaluar vocabulario y gramática con informes que evidencian los errores más frecuentes del grupo."],
    ],
  },
  {
    categoria: "Gamificación",
    tipo: "Gamificación",
    sala: "presentaciones",
    productos: ["Juego", "Quiz", "Actividad interactiva"],
    rows: [
      ["Kahoot!", "https://kahoot.com/", "F", 2, 1, "VG", "Freemium", "Cuestionarios en vivo tipo concurso respondidos desde los dispositivos de los estudiantes.", "Repasar vocabulario y gramática de forma competitiva al cierre de una unidad."],
      ["Wordwall", "https://wordwall.net/", "F", 2, 1, "V", "Freemium", "Generador de juegos educativos interactivos (memoria, rueda aleatoria, laberinto) a partir de plantillas.", "Convertir listas de vocabulario en juegos autoevaluables individuales o en pareja."],
      ["Educaplay", "https://es.educaplay.com/", "F", 2, 1, "VG", "Freemium", "Actividades interactivas como crucigramas, sopas de letras, mapas y cuestionarios compartibles.", "Diseñar práctica de vocabulario y gramática en formato de juego, adaptable a distintos niveles."],
      ["Cerebriti", "https://www.cerebriti.com/", "F", 2, 1, "V", "Freemium", "Plataforma en español para crear y jugar juegos educativos sobre cualquier tema.", "Diseñar juegos de vocabulario o cultura adaptados al contexto de los estudiantes."],
      ["Quizlet", "https://quizlet.com/", "F", 2, 1, "V", "Freemium", "Flashcards digitales con modos de juego para memorizar vocabulario.", "Practicar vocabulario y definiciones con juegos de memoria contra el tiempo."],
      ["Duolingo", "https://www.duolingo.com/", "F", 2, 1, "I", "Freemium", "Aplicación gamificada de idiomas con lecciones cortas, puntos, rachas y ligas.", "Asignar práctica autónoma diaria fuera del horario de clase."],
      ["Trace Effects", "https://americanenglish.state.gov/trace-effects", "G", 3, 2, "LR", "Gratuito", "Videojuego narrativo en 3D con materiales y guía docente en el portal American English.", "Motivar la comprensión de instrucciones y la toma de decisiones en inglés con una narrativa inmersiva."],
      ["Blooket", "https://www.blooket.com/", "F", 2, 1, "VG", "Freemium", "Cuestionarios gamificados con distintos modos de juego (carreras, batallas, torres).", "Repasar vocabulario y gramática con dinámicas variadas que mantienen la motivación."],
    ],
  },
];

const HAB: Record<string, Habilidad> = {
  S: "Speaking",
  L: "Listening",
  R: "Reading",
  W: "Writing",
  V: "Vocabulary",
  G: "Grammar",
  P: "Pronunciation",
  I: "Integrated Skills",
};
const PRECIO: Record<Row[2], Precio> = { G: "Gratis", F: "Freemium", P: "Pago" };
const CONEX: Conectividad[] = ["Sin internet", "Baja", "Media", "Alta"];
const DIF: Dificultad[] = ["Básica", "Básica", "Intermedia", "Avanzada"];

export function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const HERRAMIENTAS: Herramienta[] = DATA.flatMap((cat) =>
  cat.rows.map(([nombre, url, precio, conex, dif, habs, licencia, descripcion, aplicacion]) => ({
    id: slugify(nombre),
    nombre,
    categoria: cat.categoria,
    tipo: cat.tipo,
    sala: cat.sala,
    descripcion,
    url,
    licencia,
    aplicacion,
    precio: PRECIO[precio],
    conectividad: CONEX[conex],
    dificultad: DIF[dif],
    habilidades: habs.split("").map((c) => HAB[c]),
    productos: cat.productos,
    niveles: "A1-C2" as const,
  }))
);

export const CATEGORIAS_HERRAMIENTAS = DATA.map((c) => c.categoria);

export function herramientaById(id: string) {
  return HERRAMIENTAS.find((h) => h.id === id);
}
