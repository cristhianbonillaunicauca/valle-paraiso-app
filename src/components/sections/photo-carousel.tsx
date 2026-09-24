"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Fotos servidas desde Google Drive (miniaturas públicas). Cambios frente a
 * la versión anterior: ya no está encima del título (no compite con el
 * contenido principal), carga las imágenes de forma diferida, tiene botón de
 * pausa (WCAG 2.2.2) y no avanza sola si el usuario pidió reducir movimiento.
 */
const PHOTOS: { id: string; alt: string }[] = [
  { id: "1t3c9H9O-hcmnkVeZSJ5uX0dUZoFoUQUI", alt: "Docentes reunidos frente a la entrada del centro de eventos" },
  { id: "1ma-QqdHg5fXZHQKFDE9ouO6CZZ0mTfwS", alt: "Mesa de registro de docentes atendida por el equipo del taller" },
  { id: "1bQtwhXuAADcfBALuS1sEfZqCG4b0a44l", alt: "Integrante del equipo da la bienvenida a una docente" },
  { id: "1KrR55hPdXvPiIurstbtwezWMaOvBlIPL", alt: "Auditorio principal lleno de docentes durante la plenaria" },
  { id: "1mZVhoTioC-GNykmBLFgPoRKAlJ393S3b", alt: "Conferencista en el escenario durante la plenaria" },
  { id: "1ROWJr3rk5hGmo5eVBChedBi470jgmkSd", alt: "Docentes toman apuntes durante la plenaria" },
  { id: "19kdqdxdFgYhuxp7I4O9hoJ_0QIEbU95k", alt: "Docentes conversan en grupo dentro del auditorio" },
  { id: "1XS9Z7Sj8nPbCvvKiVlBa9kSxj77xt9mb", alt: "Una docente comparte una idea con el micrófono" },
  { id: "1YHox3S0G0jyQnA5G-nzHqoexDKdNhpxd", alt: "Facilitadora dirige una actividad en una sala práctica" },
  { id: "1YSJ1NGokpqWMOAI4bBQAGkK5HIGaxTCg", alt: "Docentes responden una actividad interactiva en sus celulares" },
  { id: "1fkoKuRpdo9ari6vT2dQVyJFKTR2YAOfV", alt: "Equipo del taller en el escenario durante el cierre" },
  { id: "1nY3LpjUXMv6aK_TtPBX-ICeRAfKlq456", alt: "Foto grupal de cierre frente al fondo de la Gobernación del Valle" },
];

function driveThumb(id: string, width = 1400) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

const INTERVAL_MS = 5000;

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  // Índices ya visitados: solo esos se montan (carga diferida).
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0, 1]));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!playing || hover) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [playing, hover]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeen((prev) => {
      const next = (index + 1) % PHOTOS.length;
      if (prev.has(index) && prev.has(next)) return prev;
      return new Set([...prev, index, next]);
    });
  }, [index]);

  const go = (d: number) => setIndex((i) => (i + d + PHOTOS.length) % PHOTOS.length);

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-navy-deep md:aspect-[21/9]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Fotografías del Taller 1"
    >
      {PHOTOS.map((p, i) =>
        seen.has(i) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.id}
            src={driveThumb(p.id)}
            alt={i === index ? p.alt : ""}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ) : null
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-navy-deep/70 to-transparent p-3">
        <div className="flex gap-1.5">
          <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy hover:bg-white">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy hover:bg-white">
            <ChevronRight size={18} />
          </button>
          <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pausar carrusel" : "Reproducir carrusel"} className="grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy hover:bg-white">
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <span className="rounded-full bg-navy-deep/60 px-3 py-1 font-mono text-xs text-white" aria-live="polite">
          {index + 1} / {PHOTOS.length}
        </span>
      </div>
    </div>
  );
}
