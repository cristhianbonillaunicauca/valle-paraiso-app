"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { GALERIA, VIDEOS, thumb, type FotoGaleria } from "@/content/galeria";

const TODAS: (FotoGaleria & { momento: string })[] = GALERIA.flatMap((m) => m.fotos.map((f) => ({ ...f, momento: m.titulo })));

export function Galeria() {
  const [abierta, setAbierta] = useState<number | null>(null);
  const cerrar = useCallback(() => setAbierta(null), []);
  const mover = useCallback((d: number) => setAbierta((i) => (i === null ? i : (i + d + TODAS.length) % TODAS.length)), []);

  useEffect(() => {
    if (abierta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierta, cerrar, mover]);

  const foto = abierta !== null ? TODAS[abierta] : null;

  return (
    <div>
      <ol className="space-y-14">
        {GALERIA.map((m, mi) => (
          <li key={m.id} id={m.id} className="scroll-mt-24">
            <div className="mb-5 flex items-baseline gap-3">
              <span className="font-mono text-sm font-semibold text-teal-ink">{String(mi + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-[clamp(22px,2.6vw,28px)] font-semibold text-navy">{m.titulo}</h2>
                <p className="text-sm text-muted">{m.texto}</p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {m.fotos.map((f) => {
                const idx = TODAS.findIndex((t) => t.id === f.id);
                return (
                  <li key={f.id} className="group">
                    <button type="button" onClick={() => setAbierta(idx)} className="block w-full overflow-hidden rounded-xl border border-line bg-paper-deep text-left" aria-label={`Ampliar: ${f.titulo}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={thumb(f.id, 800)} alt={f.alt} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    </button>
                    <p className="mt-2 text-sm font-semibold text-ink">{f.titulo}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      <section aria-labelledby="videos-title" className="mt-16">
        <h2 id="videos-title" className="mb-2 text-[clamp(22px,2.6vw,28px)] font-semibold text-navy">Videos de la jornada</h2>
        <p className="mb-6 text-sm text-muted">Clips cortos grabados durante el taller. Se cargan solo cuando pulsas &ldquo;Ver video&rdquo;.</p>
        <ul className="grid gap-4 md:grid-cols-2">
          {VIDEOS.map((v) => (
            <li key={v.id}>
              <VideoDrive {...v} />
            </li>
          ))}
        </ul>
      </section>

      {foto && abierta !== null && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/90 p-3" role="dialog" aria-modal="true" aria-label={foto.titulo} onClick={cerrar}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(foto.id, 1600)} alt={foto.alt} className="max-h-[78dvh] w-full rounded-xl object-contain" />
            <div className="mt-3 flex items-start justify-between gap-4 text-white">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-white/60">{foto.momento}</p>
                <p className="font-semibold">{foto.titulo}</p>
                <p className="text-sm text-white/75">{foto.alt}</p>
              </div>
              <span className="shrink-0 font-mono text-xs text-white/60">{abierta + 1} / {TODAS.length}</span>
            </div>
            <button type="button" onClick={cerrar} autoFocus aria-label="Cerrar" className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-navy"><X size={20} /></button>
            <button type="button" onClick={() => mover(-1)} aria-label="Foto anterior" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy"><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => mover(1)} aria-label="Foto siguiente" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-navy"><ChevronRight size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoDrive({ id, titulo, duracion, descripcion }: { id: string; titulo: string; duracion: string; descripcion: string }) {
  const [ver, setVer] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card">
      <div className="relative aspect-video bg-navy-deep">
        {ver ? (
          <iframe src={`https://drive.google.com/file/d/${id}/preview`} title={titulo} allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
        ) : (
          <button type="button" onClick={() => setVer(true)} className="group absolute inset-0 grid place-items-center" aria-label={`Ver video: ${titulo}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(id, 900)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80" />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-navy shadow-lg transition-transform group-hover:scale-105">
              <Play size={18} aria-hidden /> Ver video
            </span>
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <p className="font-semibold text-navy">{titulo}</p>
          <p className="text-sm text-muted">{descripcion}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-muted">{duracion}</span>
      </div>
    </div>
  );
}
