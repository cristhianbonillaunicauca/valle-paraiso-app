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

function lev(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

function titulo(w: string) {
  const l = w.toLocaleLowerCase("es");
  if (PARTICULAS.has(l)) return l;
  return l.charAt(0).toLocaleUpperCase("es") + l.slice(1);
}

/**
 * Nombre completo tal como está en la base, pero con la ortografía que
 * escribió el docente cuando coincide (tildes, ñ) o cuando corrige un error
 * menor de digitación de la base (p. ej. OSOSRIO -> Osorio).
 */
export function nombreParaCertificado(d: DocenteVerificado, escrito: string) {
  const tipeados = escrito.split(/\s+/).filter(Boolean).map((t) => t.replace(/[^\p{L}'-]/gu, "")).filter(Boolean);
  const usados = new Set<number>();
  const base = `${d.nombres} ${d.apellidos}`.split(/\s+/).filter(Boolean);
  return base
    .map((tok) => {
      const n = norm(tok);
      let idx = tipeados.findIndex((t, i) => !usados.has(i) && norm(t) === n);
      if (idx >= 0) {
        usados.add(idx);
        // Igual salvo tildes: se conserva la versión que sí las tenga.
        const conTilde = (w: string) => /[^\x00-\x7F]/.test(w);
        return titulo(conTilde(tipeados[idx]) || !conTilde(tok) ? tipeados[idx] : tok);
      }
      if (n.length >= 4) {
        const max = n.length >= 6 ? 2 : 1;
        idx = tipeados.findIndex((t, i) => !usados.has(i) && norm(t).length >= 4 && lev(norm(t), n) <= max);
      }
      if (idx >= 0) {
        usados.add(idx);
        return titulo(tipeados[idx]);
      }
      return titulo(tok);
    })
    .join(" ");
}

export function formatoCedula(c: string) {
  return c.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
