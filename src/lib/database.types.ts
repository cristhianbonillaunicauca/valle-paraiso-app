// Tipos manuales que reflejan supabase/schema.sql, con la misma forma que
// genera "npx supabase gen types typescript". Si cambias el esquema en
// Supabase, actualiza este archivo a mano o corre ese comando para
// regenerarlo automáticamente contra tu proyecto real.
//
// Nota: cada tabla se escribe en forma explícita (Row/Insert/Update/
// Relationships) en vez de con un helper genérico compartido — un alias
// genérico con parámetros por defecto que se referencian entre sí
// (`Insert = Partial<Row>`) puede confundir la inferencia de TypeScript
// en @supabase/postgrest-js y degradar el tipo resultante a `never`.

export type RolEquipo = "conferencista" | "tallerista";
export type TipoRecurso = "documento" | "banco";

export interface ProgramaRow {
  id: number;
  parrafos: string[];
}

export interface PilarRow {
  id: number;
  titulo: string;
  descripcion: string;
  orden: number;
}

export interface CronogramaRow {
  id: number;
  hora: string;
  label: string;
  tipo: string;
  orden: number;
}

export interface SalaRow {
  id: number;
  numero: number;
  color: string;
  nombre: string;
  resumen: string;
  orden: number;
}

export interface EquipoRow {
  id: number;
  rol_tipo: RolEquipo;
  sala: number | null;
  color: string | null;
  nombre: string;
  rol_o_especialidad: string;
  bio: string;
  foto_url: string | null;
  orden: number;
}

export interface DocumentoRow {
  id: number;
  titulo: string;
  tipo: string;
  descripcion: string;
  archivo_path: string;
  orden: number;
}

export interface BancoRow {
  id: number;
  titulo: string;
  cantidad: string;
  descripcion: string;
  archivo_path: string;
  orden: number;
}

export interface DescargaRow {
  id: string;
  recurso_tipo: TipoRecurso;
  recurso_id: number;
  created_at: string;
}
export interface DescargaInsert {
  recurso_tipo: TipoRecurso;
  recurso_id: number;
}

export interface DescargaConteoRow {
  recurso_tipo: TipoRecurso;
  recurso_id: number;
  total: number;
}

export interface MemoriaTabRow {
  id: string;
  label: string;
  tree: boolean;
  orden: number;
}

export interface MemoriaGroupRow {
  id: number;
  tab_id: string;
  titulo: string;
  nota: string | null;
  chips: string[] | null;
  orden: number;
}

export interface MemoriaItemRow {
  id: number;
  group_id: number;
  nombre: string;
  disponible: boolean;
  link: string | null;
  orden: number;
}

export interface ContactoRow {
  id: number;
  entidad: string | null;
  correo: string | null;
  telefono: string | null;
}

export interface MemoriasConfigRow {
  id: number;
  intro: string;
}

export interface Database {
  public: {
    Tables: {
      programa: {
        Row: ProgramaRow;
        Insert: Partial<ProgramaRow>;
        Update: Partial<ProgramaRow>;
        Relationships: [];
      };
      pilares: {
        Row: PilarRow;
        Insert: Partial<PilarRow>;
        Update: Partial<PilarRow>;
        Relationships: [];
      };
      cronograma: {
        Row: CronogramaRow;
        Insert: Partial<CronogramaRow>;
        Update: Partial<CronogramaRow>;
        Relationships: [];
      };
      salas: {
        Row: SalaRow;
        Insert: Partial<SalaRow>;
        Update: Partial<SalaRow>;
        Relationships: [];
      };
      equipo: {
        Row: EquipoRow;
        Insert: Partial<EquipoRow>;
        Update: Partial<EquipoRow>;
        Relationships: [];
      };
      documentos: {
        Row: DocumentoRow;
        Insert: Partial<DocumentoRow>;
        Update: Partial<DocumentoRow>;
        Relationships: [];
      };
      bancos: {
        Row: BancoRow;
        Insert: Partial<BancoRow>;
        Update: Partial<BancoRow>;
        Relationships: [];
      };
      descargas: {
        Row: DescargaRow;
        Insert: DescargaInsert;
        Update: Partial<DescargaInsert>;
        Relationships: [];
      };
      memoria_tabs: {
        Row: MemoriaTabRow;
        Insert: Partial<MemoriaTabRow>;
        Update: Partial<MemoriaTabRow>;
        Relationships: [];
      };
      memoria_groups: {
        Row: MemoriaGroupRow;
        Insert: Partial<MemoriaGroupRow>;
        Update: Partial<MemoriaGroupRow>;
        Relationships: [];
      };
      memoria_items: {
        Row: MemoriaItemRow;
        Insert: Partial<MemoriaItemRow>;
        Update: Partial<MemoriaItemRow>;
        Relationships: [];
      };
      contacto: {
        Row: ContactoRow;
        Insert: Partial<ContactoRow>;
        Update: Partial<ContactoRow>;
        Relationships: [];
      };
      memorias_config: {
        Row: MemoriasConfigRow;
        Insert: Partial<MemoriasConfigRow>;
        Update: Partial<MemoriasConfigRow>;
        Relationships: [];
      };
    };
    Views: {
      descargas_conteo: {
        Row: DescargaConteoRow;
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
