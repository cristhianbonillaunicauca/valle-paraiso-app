"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";
import { NAV_MAS, NAV_PRINCIPAL } from "@/content/site";
import { SearchDialog } from "@/components/layout/search-dialog";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);
  const [search, setSearch] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Atajo de teclado: Ctrl/Cmd + K abre el buscador.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch(true);
      }
      if (e.key === "Escape") setMore(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!more) return;
    const onClick = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMore(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [more]);

  // Cerrar menús al navegar.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
    setMore(false);
  }, [pathname]);

  const isActive = (href: string) => href !== "/" && !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-paper/90 backdrop-blur transition-shadow",
          scrolled ? "border-line shadow-[0_1px_2px_rgba(14,25,48,.06)]" : "border-transparent"
        )}
      >
        <nav aria-label="Principal" className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-4 py-3 md:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Valle Paraíso Bilingüe, ir al inicio">
            <Image src="/logo.png" alt="" width={40} height={40} className="rounded-full" priority />
            <span className="leading-tight">
              <strong className="block font-display text-base text-navy">Valle Paraíso Bilingüe</strong>
              <span className="block font-mono text-[11px] text-muted">Laboratorio Digital para Docentes</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_PRINCIPAL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13.5px] font-semibold transition-colors",
                    isActive(l.href) ? "bg-navy/10 text-navy" : "text-ink/80 hover:text-teal-ink"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li ref={moreRef} className="relative">
              <button
                type="button"
                aria-expanded={more}
                aria-controls="menu-mas"
                onClick={() => setMore((v) => !v)}
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-[13.5px] font-semibold text-ink/80 hover:text-teal-ink"
              >
                Más <ChevronDown size={15} className={cn("transition-transform", more && "rotate-180")} aria-hidden />
              </button>
              {more && (
                <ul id="menu-mas" className="animate-fade-up absolute right-0 top-full mt-2 w-60 rounded-2xl border border-line bg-card p-2 shadow-xl">
                  {NAV_MAS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-ink hover:bg-paper-deep">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSearch(true)}
              aria-label="Buscar (Ctrl + K)"
              className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-paper-deep"
            >
              <Search size={20} />
            </button>
            <Link
              href="/prompts#generador"
              className="hidden items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
              style={{ color: "#fff" }}
            >
              <Sparkles size={16} aria-hidden /> Crear con IA
            </Link>
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-paper-deep lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <div id="menu-movil" className="animate-fade-up max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-paper px-4 pb-6 pt-3 lg:hidden">
            <Link href="/prompts#generador" className="mb-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy text-sm font-semibold text-white" style={{ color: "#fff" }}>
              <Sparkles size={16} aria-hidden /> Crear con IA
            </Link>
            <ul className="grid gap-1">
              {[{ href: "/", label: "Inicio" }, ...NAV_PRINCIPAL, ...NAV_MAS].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-xl px-3 text-[15px] font-semibold text-ink hover:bg-paper-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </>
  );
}
