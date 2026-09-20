"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/reveal";

/**
 * Las fotos se sirven directo desde Google Drive (endpoint público de
 * miniaturas: drive.google.com/thumbnail?id=...), no están copiadas al
 * repositorio. Es la forma más rápida de tenerlas en el sitio sin pasar
 * cada imagen por el pipeline de build, pero depende de que cada archivo
 * siga compartido como "Cualquiera con el enlace" en Drive. Si más adelante
 * se quiere independencia de Drive, lo ideal es moverlas a
 * `public/fotos/` (o al bucket "docs" de Supabase Storage) y cambiar
 * `src` por la ruta local.
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

function driveThumb(id: string, width = 1600) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

const INTERVAL_MS = 3000;

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || PHOTOS.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  if (PHOTOS.length === 0) return null;

  return (
    <section className="pt-10 pb-16 md:pt-14 md:pb-24">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal>
          <div
            className="group relative aspect-[3/1] w-full overflow-hidden rounded-2xl border border-line bg-navy-deep shadow-[0_24px_48px_-16px_rgba(14,25,48,.28)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="region"
            aria-label="Fotos del proyecto Valle Paraíso Bilingüe"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={PHOTOS[index].id}
                src={driveThumb(PHOTOS[index].id)}
                alt={PHOTOS[index].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Puntos de navegación manual */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {PHOTOS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`Ver foto ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
