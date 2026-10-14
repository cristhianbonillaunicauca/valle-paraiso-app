import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Certificados del Taller 1. La base de docentes vive en Supabase en tablas
 * privadas (cert_docentes, cert_descargas): el navegador nunca puede leerlas.
 * Solo se accede mediante dos funciones seguras:
 *  - emitir_certificado(nombre, cedula): verifica y registra la descarga.
 *  - reporte_certificados(token): informe para el administrador.
 */
function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Faltan las variables de Supabase.");
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface DocenteVerificado {
  nombres: string;
  apellidos: string;
  cedula: string;
  /** "Gestor" o "Gestora"; null para docentes participantes. */
  cargo: string | null;
}

export async function emitirCertificado(nombre: string, cedula: string): Promise<DocenteVerificado | null> {
  const { data, error } = await client().rpc("emitir_certificado", { p_nombre: nombre, p_cedula: cedula });
  if (error) throw error;
  const rows = (data ?? []) as DocenteVerificado[];
  return rows[0] ?? null;
}

export interface FilaReporte {
  fecha_hora: string;
  nombre: string;
  cedula: string;
  municipio: string | null;
  institucion: string | null;
  rol: string;
}

export async function reporteCertificados(token: string): Promise<FilaReporte[]> {
  const { data, error } = await client().rpc("reporte_certificados", { p_token: token });
  if (error) throw error;
  return (data ?? []) as FilaReporte[];
}

/* ---------- Nombre para imprimir ---------- */

const PARTICULAS = new Set(["de", "del", "la", "las", "los", "y"]);

function norm(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function titulo(w: string) {
  const l = w.toLocaleLowerCase("es");
  if (PARTICULAS.has(l)) return l;
  return l.charAt(0).toLocaleUpperCase("es") + l.slice(1);
}

/**
 * Nombre completo tal como está en la base (la base es la fuente de verdad).
 * Del texto escrito por el docente solo se toman las tildes y la ñ cuando la
 * palabra coincide exactamente salvo por ellas; nunca se reemplaza una
 * palabra de la base por otra distinta (p. ej. TREJOS no pasa a "Trejo").
 */
export function nombreParaCertificado(d: DocenteVerificado, escrito: string) {
  const tipeados = escrito.split(/\s+/).filter(Boolean).map((t) => t.replace(/[^\p{L}'-]/gu, "")).filter(Boolean);
  const usados = new Set<number>();
  const base = `${d.nombres} ${d.apellidos}`.split(/\s+/).filter(Boolean);
  const conTilde = (w: string) => /[^\x00-\x7F]/.test(w);
  return base
    .map((tok) => {
      const n = norm(tok);
      const idx = tipeados.findIndex((t, i) => !usados.has(i) && norm(t) === n);
      if (idx >= 0) {
        usados.add(idx);
        return titulo(conTilde(tipeados[idx]) || !conTilde(tok) ? tipeados[idx] : tok);
      }
      return titulo(tok);
    })
    .join(" ");
}

export function formatoCedula(c: string) {
  return c.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
