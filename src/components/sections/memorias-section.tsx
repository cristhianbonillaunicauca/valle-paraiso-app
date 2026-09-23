"use client";

import { Check, Clock, ExternalLink, Link2Off } from "lucide-react";
import Link from "next/link";
import { isExternal, resolveLink } from "@/lib/links";
import type { MemoriaGroupWithItems, MemoriaTabWithGroups } from "@/lib/queries";
import { Reveal } from "@/components/reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const FOLDER_TREE = [
  "01. Presentaciones",
  "02. Guías",
  "03. Plantillas",
  "04. Banco de Herramientas",
  "05. Prompts IA",
  "06. Recursos Educativos Abiertos",
  "07. Productos Destacados",
  "08. Evidencias",
  "09. Informe Ejecutivo",
  "10. Resultados de Evaluación",
  "11. Directorio de Recursos",
];

function StatusPill({ ok, hasLink }: { ok: boolean; hasLink: boolean }) {
  if (ok && !hasLink) {
    // Antes aparecía como "Disponible" sin ningún enlace: engañoso.
    return (
      <Badge variant="neutral" className="gap-1">
        <Link2Off size={12} aria-hidden /> Enlace pendiente
      </Badge>
    );
  }
  return ok ? (
    <Badge variant="success" className="gap-1">
      <Check size={12} aria-hidden /> Disponible
    </Badge>
  ) : (
    <Badge variant="pending" className="gap-1">
      <Clock size={12} aria-hidden /> Después del taller
    </Badge>
  );
}

function MemoGroup({ group }: { group: MemoriaGroupWithItems }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="mb-2 font-display text-base font-semibold text-navy">{group.titulo}</h3>
      {group.nota && <p className="mb-3 text-sm italic text-muted">{group.nota}</p>}
      {group.chips && group.chips.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {group.chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-navy"
            >
              {c}
            </span>
          ))}
        </div>
      )}
      <div className="divide-y divide-line rounded-xl border border-line">
        {group.items.map((it) => {
          const href = resolveLink(it.link);
          return (
            <div key={it.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <span className="text-sm font-medium text-ink">
                {href ? (
                  isExternal(href) ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-teal-ink hover:underline">
                      {it.nombre} <ExternalLink size={13} aria-hidden />
                      <span className="sr-only">(abre en una pestaña nueva)</span>
                    </a>
                  ) : (
                    <Link href={href} className="font-semibold text-teal-ink hover:underline">
                      {it.nombre}
                    </Link>
                  )
                ) : (
                  it.nombre
                )}
              </span>
              <StatusPill ok={it.disponible} hasLink={!!href} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MemoriasSection({
  intro,
  tabs,
}: {
  intro: string;
  tabs: MemoriaTabWithGroups[];
}) {
  if (tabs.length === 0) return null;

  return (
    <section id="memorias" aria-label="Memorias del programa">
      <div>
        {intro && <p className="mb-6 max-w-3xl text-[15px] leading-relaxed text-muted">{intro}</p>}
        <Reveal>
          <Tabs defaultValue={tabs[0].id}>
            <TabsList className="h-auto flex-wrap">
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <div className="rounded-2xl border border-line bg-card p-5 md:p-8">
                  {t.groups.map((g) => (
                    <MemoGroup key={g.id} group={g} />
                  ))}
                  {t.tree && (
                    <pre className="mt-6 overflow-x-auto rounded-xl bg-navy-deep p-5 font-mono text-xs leading-relaxed text-white/90" aria-label="Estructura de carpetas de las memorias">
                      📁 Memorias Taller 1{"\n"}
                      {FOLDER_TREE.map((line, i) => (
                        <span key={line}>
                          {i === FOLDER_TREE.length - 1 ? "└── " : "├── "}
                          {line}
                          {"\n"}
                        </span>
                      ))}
                    </pre>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
