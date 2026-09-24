import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/explorar", "/prompts", "/aprende", "/biblioteca", "/experiencias", "/memorias", "/galeria", "/valle", "/ruta", "/certificado", "/accesibilidad"];
  return routes.map((r) => ({
    url: `${SITE.url}${r}`,
    changeFrequency: r === "" || r === "/biblioteca" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/explorar" || r === "/prompts" ? 0.9 : 0.7,
  }));
}
