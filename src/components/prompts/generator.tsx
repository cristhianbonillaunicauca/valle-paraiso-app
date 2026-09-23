"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Pencil, RefreshCw, Sparkles, X } from "lucide-react";
import {
  ACTIVIDADES,
  DEFAULT_PARAMS,
  DURACIONES,
  GRADOS,
  HABILIDADES_GEN,
  NIVELES_GEN,
  PRODUCTOS_GEN,
  buildPrompt,
  type PromptParams,
} from "@/lib/prompt-builder";
import { promptById } from "@/content/prompts";
import { CopyButton } from "@/components/shared/copy-button";
import { SaveButton } from "@/components/shared/save-button";
import { useRuta } from "@/lib/progress";

function Select({ id, label, value, options, onChange, suffix }: { id: string; label: string; value: string; options: readonly string[]; onChange: (v: string) => void; suffix?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="min-h-12 w-full rounded-xl border border-line-strong bg-card px-3 text-[15px] outline-none focus:border-navy">
        {options.map((o) => (
          <option key={o} value={o}>{o}{suffix ?? ""}</option>
        ))}
      </select>
    </div>
  );
}

function Check({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-line-strong bg-card px-3 text-sm font-semibold text-ink">
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-[var(--teal-ink)]" />
      {label}
    </label>
  );
}

export function PromptGenerator({ initial }: { initial: { adaptar?: string; habilidad?: string; producto?: string; actividad?: string; nivel?: string } }) {
  const base = initial.adaptar ? promptById(initial.adaptar) : undefined;
  const [params, setParams] = useState<PromptParams>(() => ({
    ...DEFAULT_PARAMS,
    ...(base?.niveles[0] ? { nivel: base.niveles[0] } : {}),
    ...(base?.habilidades[0] && (HABILIDADES_GEN as readonly string[]).includes(base.habilidades[0]) ? { habilidad: base.habilidades[0] } : {}),
    ...(initial.habilidad && (HABILIDADES_GEN as readonly string[]).includes(initial.habilidad) ? { habilidad: initial.habilidad } : {}),
    ...(initial.producto && (PRODUCTOS_GEN as readonly string[]).includes(initial.producto) ? { producto: initial.producto } : {}),
    ...(initial.actividad && (ACTIVIDADES as readonly string[]).includes(initial.actividad) ? { actividad: initial.actividad } : {}),
    ...(initial.nivel && (NIVELES_GEN as readonly string[]).includes(initial.nivel) ? { nivel: initial.nivel } : {}),
  }));
  const [adaptando, setAdaptando] = useState(!!base);
  const [variante, setVariante] = useState(0);
  const [editing, setEditing] = useState(false);
  const generated = useMemo(() => buildPrompt(params, variante, adaptando ? base : undefined), [params, variante, adaptando, base]);
  const [text, setText] = useState(generated);
  const firstField = useRef<HTMLSelectElement | null>(null);
  const { complete } = useRuta();

  useEffect(() => {
    // Al cambiar los parámetros, el texto vuelve a generarse (se descarta la edición manual).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(generated);
    setEditing(false);
  }, [generated]);

  const set = <K extends keyof PromptParams>(k: K, v: PromptParams[K]) => setParams((p) => ({ ...p, [k]: v }));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <form className="rounded-2xl border border-line bg-card p-5 md:p-6" onSubmit={(e) => e.preventDefault()} aria-label="Parámetros del prompt">
        {adaptando && base && (
          <div className="mb-5 flex items-start justify-between gap-3 rounded-xl bg-paper-deep p-4 text-sm">
            <p>
              <strong className="text-navy">Adaptando el prompt {base.numero}:</strong> {base.titulo}
            </p>
            <button type="button" onClick={() => setAdaptando(false)} className="inline-flex shrink-0 items-center gap-1 font-semibold text-teal-ink hover:underline">
              <X size={14} aria-hidden /> Crear desde cero
            </button>
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="g-nivel" className="mb-1.5 block text-sm font-semibold text-ink">Nivel MCER</label>
            <select ref={firstField} id="g-nivel" value={params.nivel} onChange={(e) => set("nivel", e.target.value)} className="min-h-12 w-full rounded-xl border border-line-strong bg-card px-3 text-[15px] outline-none focus:border-navy">
              {NIVELES_GEN.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <Select id="g-grado" label="Edad o grado" value={params.grado} options={GRADOS} onChange={(v) => set("grado", v)} />
          <Select id="g-hab" label="Habilidad" value={params.habilidad} options={HABILIDADES_GEN} onChange={(v) => set("habilidad", v)} />
          <Select id="g-act" label="Tipo de actividad" value={params.actividad} options={ACTIVIDADES} onChange={(v) => set("actividad", v)} />
          <div className="sm:col-span-2">
            <label htmlFor="g-tema" className="mb-1.5 block text-sm font-semibold text-ink">Tema</label>
            <input id="g-tema" type="text" value={params.tema} onChange={(e) => set("tema", e.target.value)} placeholder="Ej.: My hometown, healthy habits, coffee growing..." className="min-h-12 w-full rounded-xl border border-line-strong bg-card px-3 text-[15px] outline-none focus:border-navy" />
          </div>
          <Select id="g-dur" label="Duración" value={params.duracion} options={DURACIONES} onChange={(v) => set("duracion", v)} suffix=" min" />
          <Select id="g-prod" label="Tipo de producto" value={params.producto} options={PRODUCTOS_GEN} onChange={(v) => set("producto", v)} />
        </div>
        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-semibold text-ink">Contexto (opcional)</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            <Check id="g-valle" label="Valle del Cauca" checked={params.valle} onChange={(v) => set("valle", v)} />
            <Check id="g-conex" label="Baja conectividad" checked={params.bajaConectividad} onChange={(v) => set("bajaConectividad", v)} />
            <Check id="g-dua" label="Inclusión (DUA)" checked={params.inclusion} onChange={(v) => set("inclusion", v)} />
          </div>
        </fieldset>
      </form>

      <section aria-labelledby="g-result" className="flex flex-col rounded-2xl border border-navy/20 bg-navy-deep p-5 text-white md:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 id="g-result" className="inline-flex items-center gap-2 font-display text-lg text-white">
            <Sparkles size={18} aria-hidden /> Tu prompt
          </h3>
          {!adaptando && <span className="font-mono text-xs text-white/60">Versión {(variante % 3) + 1} de 3</span>}
        </div>
        <label htmlFor="g-text" className="sr-only">Prompt generado (editable)</label>
        <textarea
          id="g-text"
          value={text}
          readOnly={!editing}
          onChange={(e) => setText(e.target.value)}
          rows={16}
          className="mb-4 min-h-[320px] flex-1 resize-y rounded-xl border border-white/15 bg-white/[0.06] p-4 font-mono text-[13px] leading-relaxed text-white outline-none focus:border-white/50"
        />
        <p className="mb-4 text-sm text-white/75">
          Puedes copiar este prompt y utilizarlo en tu asistente de Inteligencia Artificial favorito. Revisa
          siempre el resultado antes de llevarlo al aula.
        </p>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={text} onCopied={() => complete("prompting")} className="bg-white !text-navy hover:bg-paper" />
          {!adaptando && (
            <button type="button" onClick={() => setVariante((v) => v + 1)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold text-white hover:bg-white/10">
              <RefreshCw size={15} aria-hidden /> Generar otro
            </button>
          )}
          <button
            type="button"
            aria-pressed={editing}
            onClick={() => {
              setEditing((v) => !v);
              setTimeout(() => document.getElementById("g-text")?.focus(), 0);
            }}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold text-white hover:bg-white/10"
          >
            <Pencil size={15} aria-hidden /> {editing ? "Listo" : "Modificar"}
          </button>
          <a
            href={`https://chatgpt.com/?q=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => complete("prompting")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold text-white hover:bg-white/10"
          >
            Usar con ChatGPT <ExternalLink size={14} aria-hidden /><span className="sr-only">(abre en una pestaña nueva)</span>
          </a>
          <a
            href={`https://claude.ai/new?q=${encodeURIComponent(text)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => complete("prompting")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-4 text-sm font-semibold text-white hover:bg-white/10"
          >
            Usar con Claude <ExternalLink size={14} aria-hidden /><span className="sr-only">(abre en una pestaña nueva)</span>
          </a>
          <SaveButton
            className="border-white/30 !text-white hover:bg-white/10"
            item={{
              kind: "mi-prompt",
              id: `gen-${text.length}-${text.slice(0, 40)}`,
              titulo: `Mi prompt: ${params.tema.trim() || params.actividad} (${params.nivel}, ${params.habilidad})`,
              href: "/prompts#generador",
              detalle: text,
            }}
          />
        </div>
      </section>
    </div>
  );
}
