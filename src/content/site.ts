export const SITE = {
  url: "https://www.tallervalleparaiso2.com",
  nombre: "Valle Paraíso Bilingüe",
  subtitulo: "Laboratorio Digital para Docentes",
  descripcion:
    "Explora, crea, adapta y comparte recursos educativos para la enseñanza del inglés con TIC e Inteligencia Artificial. Programa Valle Paraíso Bilingüe, Valle del Cauca.",
  /** Redes oficiales: agregar cuando existan, por ejemplo { nombre: "Facebook", url: "https://..." }. */
  redes: [] as { nombre: string; url: string }[],
  /** Enlace a la política de privacidad institucional, cuando exista. */
  privacidadUrl: "",
};

export const NAV_PRINCIPAL = [
  { href: "/explorar", label: "Explorar recursos" },
  { href: "/prompts", label: "Generador de prompts" },
  { href: "/aprende", label: "Aprende" },
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/experiencias", label: "Experiencias" },
];

export const NAV_MAS = [
  { href: "/certificado", label: "Generar certificado" },
  { href: "/memorias", label: "Memorias del programa" },
  { href: "/valle", label: "Valle en Acción" },
  { href: "/#impacto", label: "Impacto" },
  { href: "/ruta", label: "Mi ruta e insignias" },
  { href: "/guardados", label: "Mis recursos guardados" },
];
