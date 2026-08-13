import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

/**
 * Cliente de Supabase para el servidor (Server Components, generación estática).
 * No hay autenticación de usuarios en este sitio ("sin login"), así que basta
 * con la llave anónima + Row Level Security configurado en supabase/schema.sql
 * para exponer solo lectura pública de contenido.
 */
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Faltan NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Copia .env.local.example a .env.local y completa los valores de tu proyecto Supabase."
    );
  }

  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
}
