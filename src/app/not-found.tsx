import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col items-center px-5 py-24 text-center">
      <p className="mb-3 font-mono text-sm font-semibold text-teal-ink">Error 404</p>
      <h1 className="mb-4 text-[clamp(28px,4vw,40px)] font-semibold text-navy">No encontramos esta página</h1>
      <p className="mb-8 text-muted">Puede que el enlace haya cambiado con la nueva versión del sitio.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-navy px-6 font-semibold text-white" style={{ color: "#fff" }}>Ir al inicio</Link>
        <Link href="/explorar" className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 font-semibold text-navy">Explorar recursos</Link>
      </div>
    </div>
  );
}
