import { getSiteData } from "@/lib/queries";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { ProgramaSection } from "@/components/sections/programa-section";
import { SalasSection } from "@/components/sections/salas-section";
import { EquipoSection } from "@/components/sections/equipo-section";
import { DocumentosSection } from "@/components/sections/documentos-section";
import { BancosSection } from "@/components/sections/bancos-section";
import { MemoriasSection } from "@/components/sections/memorias-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { BackToTop } from "@/components/sections/back-to-top";

// El contenido vive en Supabase, así que la página se renderiza en cada
// request (nunca se cachea estática) para reflejar ediciones hechas desde
// el dashboard de inmediato.
export const dynamic = "force-dynamic";

function SetupNotice({ message }: { message: string }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-2xl font-semibold text-navy">Configura Supabase</h1>
      <p className="text-sm leading-relaxed text-muted">{message}</p>
      <p className="rounded-lg bg-paper-deep px-4 py-3 font-mono text-xs text-ink">
        cp .env.local.example .env.local
      </p>
      <p className="text-xs text-muted">
        Revisa el <code>README.md</code> para los pasos completos (crear el proyecto, correr{" "}
        <code>supabase/schema.sql</code> y <code>supabase/seed.sql</code>, y crear el bucket{" "}
        <code>docs</code>).
      </p>
    </div>
  );
}

export default async function Home() {
  let data: Awaited<ReturnType<typeof getSiteData>>;
  try {
    data = await getSiteData();
  } catch (err) {
    return <SetupNotice message={err instanceof Error ? err.message : "Error desconocido."} />;
  }

  return (
    <>
      <SiteHeader />
      <main>
        <Hero pilares={data.pilares} cronograma={data.cronograma} />
        <ProgramaSection programa={data.programa} pilares={data.pilares} cronograma={data.cronograma} />
        <SalasSection salas={data.salas} />
        <EquipoSection equipo={data.equipo} />
        <DocumentosSection documentos={data.documentos} />
        <BancosSection bancos={data.bancos} documentos={data.documentos} />
        <MemoriasSection intro={data.memorias.intro} tabs={data.memorias.tabs} />
      </main>
      <SiteFooter contacto={data.contacto} />
      <BackToTop />
    </>
  );
}
