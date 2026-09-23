import { INDICADORES, type Indicador } from "@/content/impacto";
import { PROMPTS } from "@/content/prompts";
import { HERRAMIENTAS } from "@/content/herramientas";
import { EXPERIENCIAS } from "@/content/experiencias";

/** Completa los indicadores automáticos con datos reales. */
export function resolveIndicadores(totalDescargas: number | null): Indicador[] {
  return INDICADORES.map((ind) => {
    switch (ind.id) {
      case "prompts":
        return { ...ind, valor: PROMPTS.length };
      case "herramientas":
        return { ...ind, valor: HERRAMIENTAS.length };
      case "descargas":
        return { ...ind, valor: totalDescargas };
      case "experiencias":
        return { ...ind, valor: ind.valor ?? (EXPERIENCIAS.length > 0 ? EXPERIENCIAS.length : null) };
      default:
        return ind;
    }
  });
}
