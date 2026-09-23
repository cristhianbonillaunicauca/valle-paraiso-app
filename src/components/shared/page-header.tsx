import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-paper-deep">
      <div className="mx-auto max-w-[1180px] px-5 pb-10 pt-10 md:pb-14 md:pt-14">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal-ink">{eyebrow}</p>
        <h1 className="max-w-3xl text-[clamp(30px,4.2vw,46px)] font-semibold text-navy">{title}</h1>
        {children && <div className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{children}</div>}
        {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </header>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ?? "mb-10 max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wide text-teal-ink">{eyebrow}</p>
      )}
      <h2 id={id} className="mb-3 text-[clamp(24px,3vw,34px)] font-semibold text-navy">
        {title}
      </h2>
      {children && <div className="text-[15px] leading-relaxed text-muted md:text-base">{children}</div>}
    </div>
  );
}
