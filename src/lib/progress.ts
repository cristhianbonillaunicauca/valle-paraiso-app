"use client";

import { useLocalJSON } from "@/lib/local-store";
import { INSIGNIAS, PASOS_RUTA } from "@/content/ruta";

const KEY = "vpb:ruta:v1";
const EMPTY: string[] = [];

export function useRuta() {
  const [done, setDone, hydrated] = useLocalJSON<string[]>(KEY, EMPTY);
  const toggle = (id: string) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const complete = (id: string) => setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const reset = () => setDone([]);
  const pct = Math.round((done.filter((d) => PASOS_RUTA.some((p) => p.id === d)).length / PASOS_RUTA.length) * 100);
  const insignias = INSIGNIAS.map((b) => ({ ...b, obtenida: b.requiere.every((r) => done.includes(r)) }));
  return { done, toggle, complete, reset, pct, insignias, hydrated };
}
