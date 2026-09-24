/**
 * "El Taller en imágenes": selección curada del banco audiovisual del Taller 1
 * (carpeta de Drive "Memoria audiovisual", revisada el 24 de septiembre de 2026).
 * De 305 archivos (172 únicos tras quitar copias exactas) se eligieron fotos
 * horizontales, nítidas y sin repetir escenas. Los archivos se sirven desde
 * Google Drive, por lo que la carpeta debe seguir compartida con enlace.
 *
 * Las descripciones narran solo lo que se ve en cada imagen: no se identifica
 * a personas por nombre.
 */
export interface FotoGaleria {
  id: string;
  archivo: string;
  titulo: string;
  alt: string;
}

export interface MomentoGaleria {
  id: string;
  titulo: string;
  texto: string;
  fotos: FotoGaleria[];
}

export const GALERIA: MomentoGaleria[] = [
  {
    id: "llegamos",
    titulo: "Llegamos",
    texto: "Registro y bienvenida de los docentes en el centro de eventos Valle del Pacífico.",
    fotos: [
      { id: "1t3c9H9O-hcmnkVeZSJ5uX0dUZoFoUQUI", archivo: "339E61CF-4D0E-4FB6-A091-62A6CED351BF.jpg", titulo: "Punto de encuentro", alt: "Numerosos docentes reunidos frente a la entrada del centro de eventos, bajo una cubierta blanca y junto a palmeras." },
      { id: "1ma-QqdHg5fXZHQKFDE9ouO6CZZ0mTfwS", archivo: "DSC07763.JPG", titulo: "Mesa de registro", alt: "Docentes se acercan a una mesa de registro atendida por personal con chaleco azul que revisa listas." },
      { id: "1B7s8h3W21uF_Wm56-X2rj4kt6tPIa6Tl", archivo: "DSC07779.JPG", titulo: "Entrega de manillas", alt: "Una integrante del equipo con chaleco azul coloca la manilla de acceso a una docente." },
      { id: "1bQtwhXuAADcfBALuS1sEfZqCG4b0a44l", archivo: "DSC07787.JPG", titulo: "Bienvenida", alt: "Una integrante del equipo saluda con un apretón de manos a una docente sonriente en el vestíbulo." },
      { id: "1b87ZrNe-39iSu0iIW3LMt-FBs_4A8d8k", archivo: "DSC07800.JPG", titulo: "Docentes del Valle", alt: "Grupo de docentes posa junto al pendón de Valle Paraíso Bilingüe 2 en el vestíbulo del evento." },
    ],
  },
  {
    id: "aprendimos",
    titulo: "Nos encontramos y aprendimos",
    texto: "Plenaria de apertura con los docentes participantes en el auditorio principal.",
    fotos: [
      { id: "1KrR55hPdXvPiIurstbtwezWMaOvBlIPL", archivo: "DSC07850.JPG", titulo: "Auditorio principal", alt: "Vista general del auditorio con cientos de docentes sentados frente al escenario y una pantalla con el logo de la Gobernación." },
      { id: "1mZVhoTioC-GNykmBLFgPoRKAlJ393S3b", archivo: "DSC07853.JPG", titulo: "Plenaria", alt: "Conferencista con chaleco azul y micrófono habla en el escenario junto al pendón del programa y una pantalla con una imagen de playa." },
      { id: "1ROWJr3rk5hGmo5eVBChedBi470jgmkSd", archivo: "DSC07841.JPG", titulo: "Tomando apuntes", alt: "Docentes sentadas en el auditorio escriben en sus cuadernos mientras escuchan la plenaria." },
      { id: "1zi5JDZO0iqIacObnV1Ea4nUU7Ue2PPRs", archivo: "DSC07858.JPG", titulo: "Atención a la plenaria", alt: "Filas de docentes atentos en el auditorio durante la plenaria." },
    ],
  },
  {
    id: "participamos",
    titulo: "Participamos",
    texto: "Momentos de diálogo, preguntas y trabajo entre pares durante la jornada.",
    fotos: [
      { id: "1q0hkFHosUuc-mR1b2Yj0mqJ2wgwwbLzy", archivo: "DSC07877.JPG", titulo: "Diálogo entre colegas", alt: "Docentes conversan entre sí, sentados en sus sillas dentro del auditorio." },
      { id: "19kdqdxdFgYhuxp7I4O9hoJ_0QIEbU95k", archivo: "DSC07879.JPG", titulo: "Trabajo en grupo", alt: "Un pequeño grupo de docentes conversa sobre la actividad sentado entre las filas del auditorio." },
      { id: "1XS9Z7Sj8nPbCvvKiVlBa9kSxj77xt9mb", archivo: "DSC07882.JPG", titulo: "La voz de los docentes", alt: "Una docente toma el micrófono desde su silla para compartir una idea con el auditorio." },
      { id: "1mG5F3TMUJpnI5Eq8m35Tc0Bf_qpzbtsd", archivo: "DSC07887.JPG", titulo: "Facilitación en el auditorio", alt: "Un facilitador con chaleco azul recorre el pasillo con micrófono entre los docentes." },
    ],
  },
  {
    id: "experimentamos",
    titulo: "Experimentamos con tecnología",
    texto: "Rotación por las salas prácticas: actividades interactivas y uso de herramientas digitales desde el celular.",
    fotos: [
      { id: "1YHox3S0G0jyQnA5G-nzHqoexDKdNhpxd", archivo: "DSC07903.JPG", titulo: "Sala práctica", alt: "Una facilitadora con chaleco azul dirige la actividad frente a un grupo numeroso de docentes en una sala." },
      { id: "1gFgOzQMspU8Hv6jpqzvUQ51i499H0oSJ", archivo: "IMG_3354.JPG", titulo: "Interacción en sala", alt: "Un facilitador con chaleco azul interactúa con los docentes sentados en una sala práctica." },
      { id: "1YSJ1NGokpqWMOAI4bBQAGkK5HIGaxTCg", archivo: "IMG_3377.HEIC", titulo: "Actividad interactiva", alt: "Dos docentes responden una actividad en sus celulares; al fondo, una pantalla muestra un juego de preguntas." },
      { id: "1xoWAjfE5Di4HRiDcH-WBw1YQXNAFjz1I", archivo: "IMG_3373.HEIC", titulo: "Aprender desde el celular", alt: "Un docente con gorra usa su celular durante una actividad en la sala." },
      { id: "1ZNPc6WKKezErdzF6ExVokyAEHIGW2JZk", archivo: "IMG_3384.JPG", titulo: "Sala de trabajo", alt: "Docentes sentados frente a una pantalla con una presentación en una de las salas prácticas." },
      { id: "1rFeXmLglGMtwp27G6XtwGcyOuzZSNCym", archivo: "IMG_3389.JPG", titulo: "Presentación en sala", alt: "Docentes siguen una presentación proyectada en una pantalla en otra de las salas prácticas." },
    ],
  },
  {
    id: "cerramos",
    titulo: "Cerramos la jornada",
    texto: "Cierre del Taller 1 con el equipo académico y los docentes.",
    fotos: [
      { id: "1fkoKuRpdo9ari6vT2dQVyJFKTR2YAOfV", archivo: "DSC07921.JPG", titulo: "Equipo en el escenario", alt: "El equipo del taller, con chalecos azules, de pie en el escenario durante el cierre." },
      { id: "1IIdVWtHj6Ad3Khn53yj2XQ6iVx6DvVN3", archivo: "DSC07939.JPG", titulo: "Celebración del equipo", alt: "Integrantes del equipo celebran con los brazos en alto frente al fondo de la Gobernación del Valle." },
      { id: "1nY3LpjUXMv6aK_TtPBX-ICeRAfKlq456", archivo: "DSC07949.JPG", titulo: "Foto de cierre", alt: "Grupo de docentes y equipo posa sonriente frente al fondo institucional de la Gobernación del Valle del Cauca." },
      { id: "1RnRUJNWDx6R1rdf0VhFFQS57VAZt5ET9", archivo: "DSC07956.JPG", titulo: "Hasta el próximo taller", alt: "Docentes saludan a la cámara junto al pendón de Valle Paraíso Bilingüe 2." },
    ],
  },
];

export interface VideoGaleria {
  id: string;
  archivo: string;
  titulo: string;
  duracion: string;
  descripcion: string;
}

/** Videos cortos horizontales del banco (se cargan solo al pulsar "Ver"). */
export const VIDEOS: VideoGaleria[] = [
  { id: "1mtTqmlnBSkw9lvL0vLg-RCxDLpzceXbR", archivo: "IMG_3356.MOV", titulo: "Docentes participando", duracion: "0:13", descripcion: "Docentes levantan la mano durante una actividad en sala." },
  { id: "1j1oLpVl8tU6LD0EOuKztnQvf12qzzicn", archivo: "IMG_3372.MOV", titulo: "Actividad interactiva", duracion: "0:31", descripcion: "Sala práctica con una actividad de preguntas en pantalla." },
  { id: "1vFhtuoUvSj5h4LPgT_7sreZH7_e1MWaE", archivo: "IMG_3368.MOV", titulo: "En la sala práctica", duracion: "0:40", descripcion: "Presentación y trabajo con los docentes en una de las salas." },
  { id: "1gfieTXPrGv1RdBjIS0mK_6tX0QlJq3w9", archivo: "IMG_3399.MOV", titulo: "Jornada de la tarde", duracion: "0:50", descripcion: "Docentes en sala siguiendo la presentación proyectada." },
];

/** Carpeta completa del banco audiovisual en Google Drive. */
export const CARPETA_AUDIOVISUAL = "https://drive.google.com/drive/folders/16opa8l5QUv9g22guUsxiwsjRzh5cnn6a";

export function thumb(id: string, w = 1200) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
}
