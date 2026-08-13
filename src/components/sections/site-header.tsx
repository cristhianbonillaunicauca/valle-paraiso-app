"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#programa", label: "Programa" },
  { href: "#equipo", label: "Equipo" },
  { href: "#salas", label: "Las 4 salas" },
  { href: "#documentos", label: "Documentos" },
  { href: "#bancos", label: "Bancos" },
  { href: "#memorias", label: "Memorias" },
];

export function SiteHeader({ logoUrl }: { logoUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-paper/80 backdrop-blur transition-shadow",
        scrolled && "border-line shadow-[0_1px_2px_rgba(14,25,48,.06)]"
      )}
    >
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-5 py-3.5">
        <a href="#top" className="flex items-center gap-3">
          {logoUrl ? (
            <Image src={logoUrl} alt="" width={40} height={40} className="rounded-md" unoptimized />
          ) : (
            <div className="h-10 w-10 rounded-md bg-navy" />
          )}
          <span className="leading-tight">
            <strong className="block font-display text-base text-navy">Valle Paraíso Bilingüe</strong>
            <span className="block font-mono text-[11px] text-muted">Taller 1 de 5</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-semibold text-ink/80 transition-colors hover:text-teal">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Contacto
            </a>
          </li>
        </ul>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-navy md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-paper px-5 py-4 md:hidden">
          {[...LINKS, { href: "#contacto", label: "Contacto" }].map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-ink hover:bg-paper-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
