"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Award, Download, FileImage, Loader2, RotateCcw } from "lucide-react";
import { jpegToPdf } from "@/components/certificado/pdf";

const W = 1536;
const H = 1024;
/** El fondo va en 8 franjas horizontales de 1536 x 128 (public/certificado/f0..f7.avif). */
const FRANJAS = 8;
const ALTO_FRANJA = H / FRANJAS;
const franja = (i: number) => [`/_next/image?url=%2Fcertificado%2Ff${i}.avif&w=1920&q=90`, `/certificado/f${i}.avif`];
const LINEA_FECHA = "Desarrollado el día 18 de septiembre de 2026, con una intensidad de 8 horas,";

function cargarImagen(srcs: string[]): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const intentar = (i: number) => {
      if (i >= srcs.length) return reject(new Error("fondo"));
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => intentar(i + 1);
      img.src = srcs[i];
    };
    intentar(0);
  });
}

/** Rellena un rectángulo interpolando entre la fila de arriba y la de abajo (borra texto del fondo). */
function borrar(ctx: CanvasRenderingContext2D, x0: number, x1: number, y0: number, y1: number) {
  const w = x1 - x0;
  const h = y1 - y0;
  const arriba = ctx.getImageData(x0, y0 - 1, w, 1).data;
  const abajo = ctx.getImageData(x0, y1, w, 1).data;
  const out = ctx.createImageData(w, h);
  for (let i = 0; i < h; i++) {
    const t = (i + 1) / (h + 1);
    for (let x = 0; x < w; x++) {
      const k = x * 4;
      const o = (i * w + x) * 4;
      for (let c = 0; c < 3; c++) out.data[o + c] = arriba[k + c] * (1 - t) + abajo[k + c] * t;
      out.data[o + 3] = 255;
    }
  }
  ctx.putImageData(out, x0, y0);
}

async function dibujar(canvas: HTMLCanvasElement, nombre: string, cedula: string, cargo: string | null, fuenteNombre: string, fuenteTexto: string) {
  await Promise.all([
    document.fonts.load(`84px ${fuenteNombre}`, nombre),
    document.fonts.load(`400 20px ${fuenteTexto}`, LINEA_FECHA),
    document.fonts.load(`600 20px ${fuenteTexto}`, cedula),
  ]).catch(() => undefined);
  const franjas = await Promise.all(Array.from({ length: FRANJAS }, (_, i) => cargarImagen(franja(i))));
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  franjas.forEach((img, i) => ctx.drawImage(img, 0, i * ALTO_FRANJA, W, ALTO_FRANJA));
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Gestores: se reemplaza la línea "Participó en el taller de formación docente:".
  if (cargo) {
    borrar(ctx, 500, 1040, 531, 561);
    ctx.font = `400 23.3px ${fuenteTexto}`;
    ctx.fillStyle = "#203D90";
    ctx.fillText(`Participó como ${cargo} en el taller de formación docente:`, 766, 553);
  }

  let size = 84;
  do {
    ctx.font = `${size}px ${fuenteNombre}`;
    if (ctx.measureText(nombre).width <= 860) break;
    size -= 2;
  } while (size > 40);
  ctx.fillStyle = "#0A2870";
  ctx.fillText(nombre, 768, 474);

  ctx.font = `600 20px ${fuenteTexto}`;
  ctx.fillStyle = "#142E78";
  ctx.fillText(cedula, 898, 513);

  ctx.font = `400 20.4px ${fuenteTexto}`;
  ctx.fillStyle = "#17328A";
  ctx.fillText(LINEA_FECHA, 768, 709);
}

function descargar(blob: Blob, nombreArchivo: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function archivo(nombre: string) {
  return (
    "Certificado-Taller1-" +
    nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  );
}

type Estado = "form" | "cargando" | "listo";

export function GeneradorCertificado({ fuenteNombre, fuenteTexto }: { fuenteNombre: string; fuenteTexto: string }) {
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [estado, setEstado] = useState<Estado>("form");
  const [error, setError] = useState("");
  const [datos, setDatos] = useState<{ nombre: string; cedula: string; cargo: string | null } | null>(null);
  const [preview, setPreview] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const pdf = () => {
    const c = canvasRef.current;
    if (!c || !datos) return;
    c.toBlob(
      async (b) => {
        if (!b) return;
        const jpeg = new Uint8Array(await b.arrayBuffer());
        descargar(jpegToPdf(jpeg, W, H), `${archivo(datos.nombre)}.pdf`);
      },
      "image/jpeg",
      0.95
    );
  };

  const png = () => {
    const c = canvasRef.current;
    if (!c || !datos) return;
    c.toBlob((b) => b && descargar(b, `${archivo(datos.nombre)}.png`), "image/png");
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEstado("cargando");
    try {
      const res = await fetch("/api/certificados/emitir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, cedula }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Los datos no coinciden con los datos de la base de datos.");
        setEstado("form");
        return;
      }
      const c = canvasRef.current!;
      await dibujar(c, json.nombre, json.cedula, json.cargo ?? null, fuenteNombre, fuenteTexto);
      setDatos(json);
      setPreview(c.toDataURL("image/jpeg", 0.85));
      setEstado("listo");
    } catch {
      setError("No pudimos generar el certificado. Revisa tu conexión e intenta de nuevo.");
      setEstado("form");
    }
  };

  // Descarga automática del PDF apenas queda listo.
  useEffect(() => {
    if (estado === "listo") pdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" aria-hidden />

      {estado !== "listo" ? (
        <form onSubmit={enviar} className="mx-auto max-w-xl rounded-3xl border border-line bg-card p-6 shadow-sm md:p-8" noValidate>
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white" aria-hidden>
              <Award size={24} />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-navy">Genera tu certificado</h2>
              <p className="text-sm text-muted">Escribe tus datos tal como los registraste en el taller.</p>
            </div>
          </div>

          <label htmlFor="cert-nombre" className="mb-1.5 block text-sm font-semibold text-ink">Nombres y apellidos completos</label>
          <input
            id="cert-nombre"
            type="text"
            autoComplete="name"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej.: María Fernanda Pérez Gómez"
            className="mb-4 min-h-12 w-full rounded-xl border border-line-strong bg-card px-4 text-[15px] outline-none focus:border-navy"
          />

          <label htmlFor="cert-cedula" className="mb-1.5 block text-sm font-semibold text-ink">Número de cédula</label>
          <input
            id="cert-cedula"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value.replace(/[^\d.\s]/g, ""))}
            placeholder="Sin puntos ni espacios"
            className="mb-5 min-h-12 w-full rounded-xl border border-line-strong bg-card px-4 text-[15px] outline-none focus:border-navy"
          />

          {error && (
            <p ref={errorRef} tabIndex={-1} role="alert" className="mb-5 flex gap-2 rounded-xl border border-red/30 bg-red/[0.06] p-4 text-sm font-semibold text-red-ink outline-none">
              <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={estado === "cargando" || !nombre.trim() || !cedula.trim()}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-teal-ink px-6 font-semibold text-white transition hover:brightness-110 disabled:opacity-50"
          >
            {estado === "cargando" ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden /> Verificando datos...
              </>
            ) : (
              <>
                <Award size={18} aria-hidden /> Generar certificado
              </>
            )}
          </button>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Tus datos se usan solo para verificar tu participación y registrar la descarga del certificado.
          </p>
        </form>
      ) : (
        datos && (
          <div className="animate-fade-up">
            <p role="status" className="mb-5 text-center font-semibold text-teal-ink">
              ¡Listo, {datos.nombre.split(" ")[0]}! Tu certificado se está descargando.
            </p>
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt={`Certificado de participación de ${datos.nombre}`} className="mx-auto mb-6 w-full max-w-4xl rounded-2xl border border-line shadow-lg" />
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" onClick={pdf} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-semibold text-white hover:bg-navy-deep">
                <Download size={18} aria-hidden /> Descargar PDF
              </button>
              <button type="button" onClick={png} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong bg-card px-6 font-semibold text-navy hover:bg-paper-deep">
                <FileImage size={18} aria-hidden /> Descargar imagen
              </button>
              <button
                type="button"
                onClick={() => {
                  setEstado("form");
                  setDatos(null);
                  setPreview("");
                  setNombre("");
                  setCedula("");
                }}
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold text-muted hover:text-navy"
              >
                <RotateCcw size={16} aria-hidden /> Generar otro
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
