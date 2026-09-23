import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Accesibilidad",
  description: "Compromiso de accesibilidad del Laboratorio Digital Valle Paraíso Bilingüe.",
  alternates: { canonical: "/accesibilidad" },
};

export default function AccesibilidadPage() {
  return (
    <>
      <PageHeader eyebrow="Accesibilidad" title="Compromiso de accesibilidad" />
      <div className="mx-auto max-w-[760px] space-y-5 px-4 py-10 text-[15px] leading-relaxed text-ink md:px-5 md:py-14">
        <p>
          Este sitio se diseñó siguiendo las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2, nivel AA,
          como referencia. Entre las medidas aplicadas están:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Contraste de color suficiente en textos y botones.</li>
          <li>Navegación completa con teclado y foco visible en todos los elementos interactivos.</li>
          <li>Enlace para saltar directamente al contenido principal.</li>
          <li>Botones y áreas táctiles de al menos 44 × 44 píxeles en dispositivos móviles.</li>
          <li>Textos alternativos en imágenes y etiquetas en todos los campos de formulario.</li>
          <li>Carrusel con controles de pausa y animaciones que respetan la preferencia de reducir movimiento.</li>
          <li>Estructura de encabezados ordenada para lectores de pantalla.</li>
        </ul>
        <p>
          Si encuentras una barrera de acceso en cualquier página, por favor repórtala al equipo del programa a
          través de los canales de contacto institucionales indicados en el pie de página.
        </p>
      </div>
    </>
  );
}
