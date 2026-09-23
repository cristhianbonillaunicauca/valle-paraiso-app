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
  { id: "169GsSb-AJxDIdryLZEhMgWazEGj9GeRp", alt: "Equipo del proyecto Valle Paraíso Bilingüe" },
  { id: "1Ug-YvTGgnWcjhmYzEydXViqEaTNwxcIs", alt: "Equipo del proyecto Valle Paraíso Bilingüe" },
  { id: "1Lm8qAEKxxMumxuA97Vd4gYiaSOKj-j_a", alt: "Territorio del Valle del Cauca" },
  { id: "1a77CwWiMcy0hcTL7zlvBLD5S6pXqyKki", alt: "Territorio del Valle del Cauca" },
  { id: "1VRUN4qHyGcrvyWZ0hHz_9iiyDAa0FF4I", alt: "Territorio del Valle del Cauca" },
  { id: "1QivSgXfjCL9PdEVzo7Yf9Rnl8_D5cJaK", alt: "Territorio del Valle del Cauca" },
  { id: "1L1724aqwKlCiPdsXTT8X2UwDWlKLO5zq", alt: "Docentes en formación" },
  { id: "1SB7J4DewCrNpBcxsmwqDZ2pby4oPgMyH", alt: "Docentes en formación" },
  { id: "1spgdb8He8V4mA5w9_6-cJiCN2hljheWh", alt: "Docentes en formación" },
  { id: "1Z89jpIs5GWehXcD1txXfsoTNy1jO7nLv", alt: "Docentes en formación" },
  { id: "1y6URX84NUCD_adZJ2nsr8tnVlaBi3MpH", alt: "Docentes en formación" },
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
