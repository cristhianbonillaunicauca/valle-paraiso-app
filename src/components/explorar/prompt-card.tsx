"use client";

import { useState } from "react";
import Link from "next/link";
import type { PromptBanco } from "@/content/prompts";
import { salaById } from "@/content/salas";
import { inkHex } from "@/lib/colors";
import { CopyButton } from "@/components/shared/copy-button";
import { SaveButton } from "@/components/shared/save-button";
import { useRuta } from "@/lib/progress";

export function PromptCard({ p }: { p: PromptBanco }) {
  const [expanded, setExpanded] = useState(false);
  const sala = salaById(p.sala);
  const ink = inkHex(sala?.color);
  const { complete } = useRuta();
  const long = p.texto.length > 260;

  return (
    <article className="lift flex h-full flex-col rounded-2xl border border-line bg-card p-5" aria-labelledby={`p-${p.id}`}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full px-2.5 py-1 font-mono text-[11px] font-semibold" style={{ background: `${ink}14`, color: ink }}>
            {p.bloque}
          </span>
          <span className="rounded-full bg-paper-deep px-2.5 py-1 font-mono text-[11px] font-semibold text-ink">
            {p.nivel ?? "Todos los niveles"}
          </span>
        </div>
        <SaveButton compact item={{ kind: "prompt", id: p.id, titulo: `${p.numero}. ${p.titulo}`, href: `/prompts?q=${encodeURIComponent(p.titulo)}#banco`, detalle: p.texto }} />
      </div>
      <h3 id={`p-${p.id}`} className="mb-1 font-display text-lg font-semibold text-navy">
        <span className="font-mono text-sm text-muted">{p.numero}.</span> {p.titulo}
      </h3>
      <p className="mb-3 text-xs text-muted">
        {p.subgrupo}
        {p.tema ? ` · ${p.tema}` : ""}
      </p>
      <p className={`mb-2 text-sm leading-relaxed text-ink ${expanded || !long ? "" : "line-clamp-5"}`}>{p.texto}</p>
      {long && (
        <button type="button" onClick={() => setExpanded((v) => !v)} className="mb-3 self-start text-[13px] font-semibold text-teal-ink hover:underline" aria-expanded={expanded}>
          {expanded ? "Ver menos" : "Ver completo"}
        </button>
      )}
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <CopyButton text={p.texto} onCopied={() => complete("prompting")} className="flex-1" />
        <Link href={`/prompts?adaptar=${p.id}#generador`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line-strong px-4 text-sm font-semibold text-navy hover:bg-paper-deep">
          Adaptar
        </Link>
      </div>
    </article>
  );
}
