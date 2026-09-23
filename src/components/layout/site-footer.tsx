import Image from "next/image";
import Link from "next/link";
import { getContacto } from "@/lib/queries";
import { NAV_MAS, NAV_PRINCIPAL, SITE } from "@/content/site";

export async function SiteFooter() {
  const contacto = await getContacto();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy-deep text-white/80">
      <div className="mx-auto max-w-[1180px] px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-3 flex items-center gap-3">
              <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
              <strong className="font-display text-lg text-white">Valle Paraíso Bilingüe</strong>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Laboratorio Digital para Docentes: programa de fortalecimiento de competencias digitales para
              docentes de inglés del Valle del Cauca.
            </p>
          </div>

          <nav aria-label="Enlaces rápidos">
            <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-white/60">Crear y aprender</h2>
            <ul className="space-y-2 text-sm">
              {NAV_PRINCIPAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Programa">
            <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-white/60">Programa</h2>
            <ul className="space-y-2 text-sm">
              {NAV_MAS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/accesibilidad" className="hover:text-white hover:underline">Accesibilidad</Link>
              </li>
              {SITE.privacidadUrl && (
                <li>
                  <a href={SITE.privacidadUrl} className="hover:text-white hover:underline">Política de privacidad</a>
                </li>
              )}
            </ul>
          </nav>

          <div id="contacto">
            <h2 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-white/60">Contacto institucional</h2>
            <ul className="space-y-2 text-sm">
              {contacto.entidad && <li>{contacto.entidad}</li>}
              {contacto.correo && (
                <li>
                  <a href={`mailto:${contacto.correo}`} className="hover:text-white hover:underline">{contacto.correo}</a>
                </li>
              )}
              {contacto.telefono && <li>{contacto.telefono}</li>}
              {SITE.redes.map((r) => (
                <li key={r.url}>
                  <a href={r.url} className="hover:text-white hover:underline" rel="noopener">{r.nombre}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <span>
            © {year} {contacto.entidad ?? "Valle Paraíso Bilingüe"}
          </span>
          <span>Diseño instruccional y contenidos: equipo académico del Taller 1</span>
        </div>
      </div>
    </footer>
  );
}
