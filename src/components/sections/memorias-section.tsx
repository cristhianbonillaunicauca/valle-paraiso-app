"use client";

import { Check, Clock } from "lucide-react";
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

function StatusPill({ ok }: { ok: boolean }) {
  return ok ? (
    <Badge variant="success" className="gap-1">
      <Check size={12} /> Disponible
    </Badge>
  ) : (
    <Badge variant="pending" className="gap-1">
      <Clock size={12} /> Después del taller
    </Badge>
  );
}

function MemoGroup({ group }: { group: MemoriaGroupWithItems }) {
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="mb-2 font-display text-base font-semibold text-navy">{group.titulo}</h4>
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
        {group.items.map((it) => (
          <div key={it.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-sm font-medium text-ink">
              {it.link ? (
                <a href={it.link} className="hover:text-teal">
                  {it.nombre}
                </a>
              ) : (
                it.nombre
              )}
            </span>
            <StatusPill ok={it.disponible} />
          </div>
        ))}
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
    <section id="memorias" className="bg-paper-deep py-20 md:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <Reveal className="mb-10 max-w-2xl">
          <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-navy">
            Cierre del taller
          </div>
          <h2 className="mb-3 text-[clamp(24px,3vw,32px)] font-semibold text-navy">
            Memorias Digitales del Taller
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">{intro}</p>
        </Reveal>

        <Reveal>
          <Tabs defaultValue={tabs[0].id}>
            <TabsList>
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <div className="rounded-2xl border border-line bg-card p-6 md:p-8">
                  {t.groups.map((g) => (
                    <MemoGroup key={g.id} group={g} />
                  ))}
                  {t.tree && (
                    <pre className="mt-6 overflow-x-auto rounded-xl bg-navy-deep p-5 font-mono text-xs leading-relaxed text-white/90">
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
