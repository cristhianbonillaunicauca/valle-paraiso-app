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

/** Variantes con contraste AA para texto de color o fondos con texto blanco. */
export const INK: Record<string, string> = {
  navy: "#1D3060",
  teal: "#00756C",
  orange: "#9A5B00",
  blue: "#0A5A8C",
  red: "#B02A14",
  gold: "#8A6508",
  neutro: "#4E5669",
};

/** Hex con contraste AA para una clave de color. */
export function inkHex(key?: string | null): string {
  return (key && INK[key]) || INK.navy;
}

/** Devuelve el hex de una clave de color; si no existe, cae en navy. */
export function colorHex(key?: string | null): string {
  if (key && key in COLORS) return COLORS[key as ColorKey];
  return COLORS.navy;
}

/** Rotación de acentos usada en las tarjetas de "Bancos de recursos". */
export const BANCO_ACCENTS: ColorKey[] = ["teal", "orange", "blue"];
