"use client";

import { cn } from "@/lib/utils";

/**
 * Grupo de filtros tipo "chip" (selección múltiple). Accesible: cada chip
 * es un botón con aria-pressed; el grupo tiene nombre accesible.
 */
export function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  counts,
}: {
  label: string;
  options: readonly T[];
  value: T[];
  onChange: (next: T[]) => void;
  counts?: Partial<Record<T, number>>;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = value.includes(opt);
          const count = counts?.[opt];
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? value.filter((v) => v !== opt) : [...value, opt])}
              className={cn(
                "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold transition-colors",
                active
                  ? "border-navy bg-navy text-white"
                  : "border-line-strong bg-card text-ink hover:border-navy/50"
              )}
            >
              {opt}
              {count !== undefined && (
                <span className={cn("font-mono text-[11px]", active ? "text-white/75" : "text-muted")}>{count}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
