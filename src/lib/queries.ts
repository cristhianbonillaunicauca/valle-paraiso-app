import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type {
  BancoRow,
  ContactoRow,
  CronogramaRow,
  DocumentoRow,
  EquipoRow,
  MemoriaGroupRow,
  MemoriaItemRow,
  MemoriaTabRow,
  MemoriasConfigRow,
  PilarRow,
  ProgramaRow,
  SalaRow,
} from "@/lib/database.types";

export interface MemoriaGroupWithItems extends MemoriaGroupRow {
  items: MemoriaItemRow[];
}
export interface MemoriaTabWithGroups extends MemoriaTabRow {
  groups: MemoriaGroupWithItems[];
}

export interface SiteData {
  programa: ProgramaRow;
  pilares: PilarRow[];
  cronograma: CronogramaRow[];
  salas: SalaRow[];
  equipo: EquipoRow[];
  documentos: DocumentoRow[];
  bancos: BancoRow[];
  memorias: { intro: string; tabs: MemoriaTabWithGroups[] };
  contacto: ContactoRow;
}

const EMPTY_PROGRAMA: ProgramaRow = { id: 1, parrafos: [] };
const EMPTY_CONTACTO: ContactoRow = { id: 1, entidad: null, correo: null, telefono: null };
const EMPTY_MEMORIAS_CONFIG: MemoriasConfigRow = { id: 1, intro: "" };

/**
 * Trae todo el contenido del sitio desde Supabase en paralelo.
 * Si una tabla individual falla (por ejemplo, antes de correr el seed),
 * el sitio sigue renderizando con esa sección vacía en vez de tumbarse
 * por completo — así el 404/500 nunca depende de un solo dato faltante.
 */
export async function getSiteData(): Promise<SiteData> {
  const supabase = getSupabaseServerClient();

  // Cada consulta se declara en su propia constante (en vez de un único
  // array literal enorme dentro de Promise.all) para que TypeScript
  // resuelva el tipo de cada cadena .from().select()... de forma aislada.
  // Con ~12 cadenas genéricas complejas combinadas en un solo literal,
  // el checker de TS puede agotar su presupuesto de inferencia y degradar
  // alguno de los resultados a `never` de forma no determinística.
  const programaQuery = supabase.from("programa").select("*").eq("id", 1).maybeSingle();
  const pilaresQuery = supabase.from("pilares").select("*").order("orden");
  const cronogramaQuery = supabase.from("cronograma").select("*").order("orden");
  const salasQuery = supabase.from("salas").select("*").order("orden");
  const equipoQuery = supabase.from("equipo").select("*").order("orden");
  const documentosQuery = supabase.from("documentos").select("*").order("orden");
  const bancosQuery = supabase.from("bancos").select("*").order("orden");
  const memoriaTabsQuery = supabase.from("memoria_tabs").select("*").order("orden");
  const memoriaGroupsQuery = supabase.from("memoria_groups").select("*").order("orden");
  const memoriaItemsQuery = supabase.from("memoria_items").select("*").order("orden");
  const memoriasConfigQuery = supabase.from("memorias_config").select("*").eq("id", 1).maybeSingle();
  const contactoQuery = supabase.from("contacto").select("*").eq("id", 1).maybeSingle();

  const [
    programaRes,
    pilaresRes,
    cronogramaRes,
    salasRes,
    equipoRes,
    documentosRes,
    bancosRes,
    memoriaTabsRes,
    memoriaGroupsRes,
    memoriaItemsRes,
    memoriasConfigRes,
    contactoRes,
  ] = await Promise.all([
    programaQuery,
    pilaresQuery,
    cronogramaQuery,
    salasQuery,
    equipoQuery,
    documentosQuery,
    bancosQuery,
    memoriaTabsQuery,
    memoriaGroupsQuery,
    memoriaItemsQuery,
    memoriasConfigQuery,
    contactoQuery,
  ]);

  // NOTA: con 12 tablas en el esquema, el checker de TypeScript degrada
  // el tipo de `.data` de estas dos consultas puntuales a `never[]` (un
  // límite conocido de inferencia de @supabase/postgrest-js en esquemas
  // grandes, no un error real de datos). Se fuerza el tipo correcto aquí;
  // la forma real en tiempo de ejecución sigue validada por schema.sql.
  const memoriaGroups = (memoriaGroupsRes.data ?? []) as unknown as MemoriaGroupRow[];
  const memoriaItems = (memoriaItemsRes.data ?? []) as unknown as MemoriaItemRow[];

  const memoriaTabs = (memoriaTabsRes.data ?? []) as unknown as MemoriaTabRow[];
  const tabs: MemoriaTabWithGroups[] = memoriaTabs.map((tab) => ({
    ...tab,
    groups: memoriaGroups
      .filter((g) => g.tab_id === tab.id)
      .map((g) => ({
        ...g,
        items: memoriaItems.filter((it) => it.group_id === g.id),
      })),
  }));

  return {
    programa: programaRes.data ?? EMPTY_PROGRAMA,
    pilares: pilaresRes.data ?? [],
    cronograma: cronogramaRes.data ?? [],
    salas: salasRes.data ?? [],
    equipo: equipoRes.data ?? [],
    documentos: documentosRes.data ?? [],
    bancos: bancosRes.data ?? [],
    memorias: { intro: (memoriasConfigRes.data ?? EMPTY_MEMORIAS_CONFIG).intro, tabs },
    contacto: contactoRes.data ?? EMPTY_CONTACTO,
  };
}
