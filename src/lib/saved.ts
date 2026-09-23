"use client";

import { useLocalJSON } from "@/lib/local-store";

export type SavedKind = "herramienta" | "prompt" | "tutorial" | "recurso" | "experiencia" | "mi-prompt";

export interface SavedItem {
  kind: SavedKind;
  id: string;
  titulo: string;
  href: string;
  /** Texto adicional (por ejemplo, el prompt generado). */
  detalle?: string;
  savedAt: number;
}

const KEY = "vpb:guardados:v1";
const EMPTY: SavedItem[] = [];

export function useSaved() {
  const [items, setItems, hydrated] = useLocalJSON<SavedItem[]>(KEY, EMPTY);
  const isSaved = (kind: SavedKind, id: string) => items.some((i) => i.kind === kind && i.id === id);
  const toggle = (item: Omit<SavedItem, "savedAt">) =>
    setItems((prev) =>
      prev.some((i) => i.kind === item.kind && i.id === item.id)
        ? prev.filter((i) => !(i.kind === item.kind && i.id === item.id))
        : [{ ...item, savedAt: Date.now() }, ...prev]
    );
  const remove = (kind: SavedKind, id: string) =>
    setItems((prev) => prev.filter((i) => !(i.kind === kind && i.id === id)));
  const clear = () => setItems([]);
  return { items, isSaved, toggle, remove, clear, hydrated };
}
