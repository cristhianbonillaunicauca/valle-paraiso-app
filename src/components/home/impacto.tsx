"use client";

import { useEffect, useRef, useState } from "react";
import type { Indicador } from "@/content/impacto";
import { PendingTag } from "@/components/shared/empty-state";

function useCountUp(target: number | null, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run || target === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(target);
      return;
    }
    const t0 = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

function Counter({ ind, run }: { ind: Indicador; run: boolean }) {
  const n = useCountUp(ind.valor, run);
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-2 min-h-10">
        {ind.valor === null ? (
          <span className="[&>span]:border-white/30 [&>span]:bg-white/5 [&>span]:text-white/70">
            <PendingTag />
          </span>
        ) : (
          <span className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold text-white">
            {/* El valor final siempre está disponible para lectores de pantalla. */}
            <span aria-hidden>{run ? n.toLocaleString("es-CO") : "0"}</span>
            <span className="sr-only">{ind.valor.toLocaleString("es-CO")}</span>
            {ind.sufijo}
          </span>
        )}
      </div>
      <span className="text-sm leading-snug text-white/75">{ind.etiqueta}</span>
      {ind.nota && ind.valor !== null && <span className="mt-1 font-mono text-[11px] text-white/50">{ind.nota}</span>}
    </div>
  );
}

export function Impacto({ indicadores }: { indicadores: Indicador[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      {indicadores.map((ind) => (
        <Counter key={ind.id} ind={ind} run={run} />
      ))}
    </div>
  );
}
