import Link from "next/link";
import { BookOpen, Brain, ClipboardCheck, GraduationCap, Headphones, Lightbulb, MessagesSquare, PenLine, Wrench } from "lucide-react";

const ACCESOS = [
  { label: "Crear una actividad con IA", href: "/prompts#generador", Icon: Brain },
  { label: "Encontrar un prompt", href: "/prompts#banco", Icon: PenLine },
  { label: "Buscar una herramienta digital", href: "/explorar", Icon: Wrench },
  { label: "Descargar una guía", href: "/biblioteca?cat=Gu%C3%ADas", Icon: BookOpen },
  { label: "Ver ejemplos de otros docentes", href: "/experiencias", Icon: Lightbulb },
  { label: "Aprender a usar una herramienta", href: "/aprende", Icon: GraduationCap },
  { label: "Crear una actividad de listening", href: "/prompts?habilidad=Listening#banco", Icon: Headphones },
  { label: "Diseñar una actividad de speaking", href: "/prompts?habilidad=Speaking#banco", Icon: MessagesSquare },
  { label: "Diseñar una evaluación", href: "/explorar?tipo=Evaluaci%C3%B3n", Icon: ClipboardCheck },
];

export function AccesosRapidos() {
  return (
    <section aria-labelledby="accesos-title" className="border-y border-line bg-paper-deep py-12 md:py-16">
      <div className="mx-auto max-w-[1180px] px-5">
        <h2 id="accesos-title" className="mb-6 text-[clamp(20px,2.4vw,26px)] font-semibold text-navy">
          Accesos rápidos para docentes
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ACCESOS.map(({ label, href, Icon }) => (
            <li key={href + label}>
              <Link href={href} className="lift group flex min-h-14 items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 text-[15px] font-semibold text-ink">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy/[0.07] text-navy transition-colors group-hover:bg-teal-ink group-hover:text-white" aria-hidden>
                  <Icon size={18} />
                </span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
