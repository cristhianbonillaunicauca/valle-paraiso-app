"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

let browserClient: SupabaseClient<Database> | undefined;

/**
 * Cliente de Supabase para el navegador. Se reutiliza una sola instancia
 * (singleton) para que la suscripción realtime de las gráficas no abra
 * conexiones nuevas en cada render.
 */
export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  browserClient = createClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
  return browserClient;
}
