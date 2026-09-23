import type { Herramienta } from "@/content/herramientas";
import { PROMPTS, type PromptBanco } from "@/content/prompts";

/** Prompt del banco más afín a una herramienta (misma sala y habilidad). */
export function promptParaHerramienta(h: Herramienta): PromptBanco {
  const pool = h.sala ? PROMPTS.filter((p) => p.sala === h.sala) : PROMPTS;
  const best =
    pool.find((p) => p.habilidades.some((x) => h.habilidades.includes(x)) && p.productos.some((x) => h.productos.includes(x))) ??
    pool.find((p) => p.habilidades.some((x) => h.habilidades.includes(x))) ??
    pool[0];
  return best;
}
