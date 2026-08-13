/**
 * Paleta de color oficial del sitio (misma paleta que el index.html original).
 * Se usa tanto en Tailwind (ver globals.css) como en JS/TS para casos donde
 * necesitamos el valor hexadecimal real: gráficas de Recharts, estilos en
 * línea dinámicos (acentos por tarjeta, puntos del cronograma, etc.)
 */
export const COLORS = {
  navy: "#1D3060",
  navyDeep: "#0E1930",
  teal: "#00958A",
  orange: "#E8971F",
  blue: "#0A5A8C",
  red: "#D6371E",
  gold: "#B8860B",
  neutro: "#5B6478",
} as const;

export type ColorKey = keyof typeof COLORS;

/** Devuelve el hex de una clave de color; si no existe, cae en navy. */
export function colorHex(key?: string | null): string {
  if (key && key in COLORS) return COLORS[key as ColorKey];
  return COLORS.navy;
}

/** Rotación de acentos usada en las tarjetas de "Bancos de recursos". */
export const BANCO_ACCENTS: ColorKey[] = ["teal", "orange", "blue"];
