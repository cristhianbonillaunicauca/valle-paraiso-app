"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Pequeño almacén sobre localStorage, sincronizado entre componentes y
 * pestañas. Si el navegador bloquea localStorage (modo privado estricto),
 * todo sigue funcionando en memoria durante la visita.
 */
const memory = new Map<string, string>();
const listeners = new Set<() => void>();

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    memory.set(key, value);
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = () => cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useLocalJSON<T>(key: string, fallback: T): [T, (next: T | ((prev: T) => T)) => void, boolean] {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => undefined as unknown as string | null
  );
  const hydrated = raw !== undefined;
  let value = fallback;
  if (raw) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = fallback;
    }
  }
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      let prev = fallback;
      const current = read(key);
      if (current) {
        try {
          prev = JSON.parse(current) as T;
        } catch {
          /* valor corrupto: se reemplaza */
        }
      }
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      // Sin cambios: no se escribe (evita renders y bucles innecesarios).
      if (resolved === prev) return;
      write(key, JSON.stringify(resolved));
    },
    // fallback es un literal estable en todos los usos
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );
  return [value, set, hydrated];
}
