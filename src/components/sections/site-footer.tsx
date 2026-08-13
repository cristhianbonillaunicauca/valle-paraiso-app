import Image from "next/image";
import type { ContactoRow } from "@/lib/database.types";

export function SiteFooter({ contacto }: { contacto: ContactoRow }) {
  const items: { key: string; node: React.ReactNode }[] = [];
  if (contacto.entidad) items.push({ key: "entidad", node: contacto.entidad });
  if (contacto.correo)
    items.push({
      key: "correo",
      node: (
        <a href={`mailto:${contacto.correo}`} className="hover:text-teal">
          {contacto.correo}
        </a>
      ),
    });
  if (contacto.telefono) items.push({ key: "telefono", node: contacto.telefono });

  return (
    <footer id="contacto" className="border-t border-line bg-navy-deep py-16 text-white/80">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <Image src="/logo.png" alt="" width={36} height={36} className="rounded-full" />
              <strong className="font-display text-lg text-white">Valle Paraíso Bilingüe</strong>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Programa de fortalecimiento de competencias digitales para docentes de inglés del
              departamento del Valle del Cauca.
            </p>
          </div>

          <div>
            <h5 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-white/50">
              Contacto
            </h5>
            <ul className="space-y-2 text-sm">
              {items.length > 0 ? (
                items.map((it) => <li key={it.key}>{it.node}</li>)
              ) : (
                <li className="text-white/40">Agregue su correo y teléfono en la tabla `contacto`</li>
              )}
            </ul>
          </div>

          <div>
            <h5 className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-white/50">
              Navegación
            </h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#programa" className="hover:text-teal">Programa</a></li>
              <li><a href="#equipo" className="hover:text-teal">Equipo</a></li>
              <li><a href="#documentos" className="hover:text-teal">Documentos</a></li>
              <li><a href="#bancos" className="hover:text-teal">Bancos de recursos</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <span>{contacto.entidad}</span>
          <span>Todos los derechos reservados</span>
        </div>
      </div>
    </footer>
  );
}
