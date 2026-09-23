"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useSaved, type SavedKind } from "@/lib/saved";
import { EmptyState } from "@/components/shared/empty-state";
import { CopyButton } from "@/components/shared/copy-button";

const GRUPOS: { kind: SavedKind; label: string }[] = [
  { kind: "mi-prompt", label: "Mis prompts generados" },
  { kind: "prompt", label: "Prompts del banco" },
  { kind: "herramienta", label: "Herramientas" },
  { kind: "tutorial", label: "Tutoriales" },
  { kind: "recurso", label: "Recursos de la biblioteca" },
  { kind: "experiencia", label: "Experiencias" },
];

export function Guardados() {
  const { items, remove, clear, hydrated } = useSaved();

  if (!hydrated) return <div className="skeleton h-40 w-full" aria-label="Cargando" />;

  if (items.length === 0) {
    return (
      <EmptyState title="Aún no has guardado recursos">
        Usa el botón <strong>Guardar</strong> en herramientas, prompts, tutoriales o documentos y aparecerán aquí.{" "}
        <Link href="/explorar" className="font-semibold text-teal-ink hover:underline">Explorar recursos</Link>
      </EmptyState>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{items.length} recursos guardados en este navegador</p>
        <button type="button" onClick={() => confirm("¿Quitar todos los recursos guardados?") && clear()} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted hover:text-red-ink">
          <Trash2 size={15} aria-hidden /> Vaciar lista
        </button>
      </div>
      <div className="space-y-10">
        {GRUPOS.map(({ kind, label }) => {
          const group = items.filter((i) => i.kind === kind);
          if (!group.length) return null;
          return (
            <section key={kind} aria-labelledby={`g-${kind}`}>
              <h2 id={`g-${kind}`} className="mb-3 font-display text-xl font-semibold text-navy">{label} <span className="font-mono text-sm text-muted">{group.length}</span></h2>
              <ul className="grid gap-3 md:grid-cols-2">
                {group.map((it) => (
                  <li key={`${it.kind}-${it.id}`} className="flex flex-col rounded-2xl border border-line bg-card p-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <Link href={it.href} className="font-semibold text-navy hover:text-teal-ink hover:underline" {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {it.titulo}
                      </Link>
                      <button type="button" onClick={() => remove(it.kind, it.id)} aria-label={`Quitar ${it.titulo}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-paper-deep hover:text-red-ink">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {it.detalle && (
                      <>
                        <p className="mb-3 line-clamp-4 whitespace-pre-line text-sm text-muted">{it.detalle}</p>
                        <CopyButton text={it.detalle} variant="ghost" className="self-start" />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
