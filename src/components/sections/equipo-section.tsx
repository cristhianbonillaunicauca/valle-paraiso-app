import type { EquipoRow } from "@/lib/database.types";
import { colorHex } from "@/lib/colors";
import { Reveal } from "@/components/reveal";
import { Avatar } from "@/components/avatar";

export function EquipoSection({ equipo }: { equipo: EquipoRow[] }) {
  const lead = equipo.find((e) => e.rol_tipo === "conferencista");
  const talleristas = equipo
    .filter((e) => e.rol_tipo === "tallerista")
    .sort((a, b) => (a.sala ?? 0) - (b.sala ?? 0));

  return (
    <section id="equipo" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal className="mb-12 max-w-2xl">
          <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal">
            Equipo académico
          </div>
          <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-semibold text-navy">
            Quiénes lideran el Taller 1
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Un conferencista principal y cuatro talleristas especializados, uno por cada sala
            práctica.
          </p>
        </Reveal>

        {lead && (
          <Reveal className="mb-10">
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-card p-8 sm:flex-row sm:items-center">
              <Avatar name={lead.nombre} photoUrl={lead.foto_url} size={88} />
              <div>
                <h3 className="font-display text-xl font-semibold text-navy">{lead.nombre}</h3>
                <div className="mb-2 font-mono text-xs font-semibold uppercase tracking-wide text-teal">
                  {lead.rol_o_especialidad}
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-muted">{lead.bio}</p>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {talleristas.map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-card p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <Avatar name={t.nombre} color={t.color} photoUrl={t.foto_url} size={72} />
                </div>
                <span
                  className="mb-3 inline-block rounded-full px-3 py-1 font-mono text-[11px] font-semibold text-white"
                  style={{ background: colorHex(t.color) }}
                >
                  Sala {t.sala}
                </span>
                <h4 className="font-display text-base font-semibold text-navy">{t.nombre}</h4>
                <div className="mb-2 text-xs font-semibold text-muted">{t.rol_o_especialidad}</div>
                <p className="text-sm leading-relaxed text-muted">{t.bio}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
