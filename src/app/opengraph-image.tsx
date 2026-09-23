import { ImageResponse } from "next/og";

export const alt = "Valle Paraíso Bilingüe · Laboratorio Digital para Docentes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "#0E1930", color: "#fff" }}>
        <div style={{ fontSize: 26, color: "#4FD1C5", letterSpacing: 2, marginBottom: 24 }}>PROGRAMA DE FORMACIÓN DOCENTE · VALLE DEL CAUCA</div>
        <div style={{ fontSize: 80, fontWeight: 700 }}>Valle Paraíso Bilingüe</div>
        <div style={{ fontSize: 46, color: "#4FD1C5", marginTop: 8 }}>Laboratorio Digital para Docentes</div>
        <div style={{ fontSize: 28, color: "#C9D3E6", marginTop: 36 }}>Herramientas, prompts de IA y recursos para enseñar inglés</div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "#00958A" }} />
      </div>
    ),
    size
  );
}
