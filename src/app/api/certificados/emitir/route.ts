import { NextResponse } from "next/server";
import { emitirCertificado, formatoCedula, nombreParaCertificado } from "@/lib/certificados";

export const dynamic = "force-dynamic";

const NO_COINCIDE =
  "Los datos no coinciden con los datos de la base de datos. Verifique sus nombres y su número de cédula.";

export async function POST(req: Request) {
  let body: { nombre?: unknown; cedula?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: NO_COINCIDE }, { status: 400 });
  }
  const nombre = typeof body.nombre === "string" ? body.nombre.trim().slice(0, 120) : "";
  const cedula = typeof body.cedula === "string" ? body.cedula.replace(/\D/g, "").slice(0, 15) : "";
  if (nombre.split(/\s+/).length < 2 || cedula.length < 5) {
    return NextResponse.json({ error: NO_COINCIDE }, { status: 404 });
  }
  try {
    const docente = await emitirCertificado(nombre, cedula);
    if (!docente) return NextResponse.json({ error: NO_COINCIDE }, { status: 404 });
    return NextResponse.json(
      { nombre: nombreParaCertificado(docente, nombre), cedula: formatoCedula(docente.cedula) },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "No pudimos verificar tus datos en este momento. Intenta de nuevo en unos minutos." },
      { status: 503 }
    );
  }
}
