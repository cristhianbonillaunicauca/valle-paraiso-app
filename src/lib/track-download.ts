"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { DescargaInsert, TipoRecurso } from "@/lib/database.types";

/**
 * Registra una descarga para las gráficas de "Documentos más descargados".
 * Se dispara en paralelo al clic (no usa preventDefault), así que un error
 * de red o de RLS jamás bloquea la descarga real del archivo.
 */
export function trackDownload(recursoTipo: TipoRecurso, recursoId: number) {
  const supabase = getSupabaseBrowserClient();
  const payload: DescargaInsert = { recurso_tipo: recursoTipo, recurso_id: recursoId };
  supabase
    .from("descargas")
    // Igual que en lib/queries.ts: con muchas tablas en el esquema, TS
    // degrada el tipo del payload de insert() a `never`; `payload` ya
    // quedó validado arriba contra DescargaInsert, así que el `any` de
    // aquí solo evita ese falso positivo puntual del compilador.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert(payload as any)
    .then(({ error }: { error: { message: string } | null }) => {
      if (error) console.error("No se pudo registrar la descarga:", error.message);
    });
}

