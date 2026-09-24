import { reporteCertificados } from "@/lib/certificados";

export const dynamic = "force-dynamic";

function csv(v: string | null) {
  const s = v ?? "";
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/**
 * Informe de descargas para el administrador, en CSV. Lo consume la hoja de
 * Google Sheets con =IMPORTDATA(...). Sin el token correcto devuelve vacío.
 */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  let filas: Awaited<ReturnType<typeof reporteCertificados>> = [];
  try {
    filas = token ? await reporteCertificados(token) : [];
  } catch {
    return new Response("Error al consultar el informe", { status: 503 });
  }
  const lineas = [
    "Fecha y hora (Colombia),Nombre,Cédula,Municipio,Institución,Rol",
    ...filas.map((f) => [f.fecha_hora, f.nombre, f.cedula, f.municipio, f.institucion, f.rol].map(csv).join(",")),
  ];
  return new Response(lineas.join("\n"), {
    headers: { "Content-Type": "text/csv; charset=utf-8", "Cache-Control": "no-store" },
  });
}
