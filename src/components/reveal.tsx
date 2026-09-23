import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Aparición suave al hacer scroll usando solo CSS (ver `.reveal` en
 * globals.css). A diferencia de la versión anterior con Framer Motion, el
 * contenido es visible desde el primer render: no depende de JavaScript,
 * no penaliza el LCP y respeta "reducir movimiento".
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
