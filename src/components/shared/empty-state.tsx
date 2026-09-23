import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({ title, children, icon }: { title: string; children?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-card px-6 py-12 text-center">
      <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-paper-deep text-muted" aria-hidden>
        {icon ?? <Inbox size={22} />}
      </div>
      <p className="font-display text-lg font-semibold text-navy">{title}</p>
      {children && <div className="mt-2 max-w-md text-sm leading-relaxed text-muted">{children}</div>}
    </div>
  );
}

/** Etiqueta visible para datos que aún no han sido verificados. */
export function PendingTag({ children = "Dato pendiente" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-dashed border-line-strong bg-paper-deep px-2 py-0.5 font-mono text-[11px] font-semibold text-muted">
      [{children}]
    </span>
  );
}
