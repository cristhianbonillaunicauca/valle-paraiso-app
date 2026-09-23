/**
 * Los 42 municipios del departamento del Valle del Cauca.
 * Los datos de participación empiezan vacíos (null): se completan cuando la
 * coordinación del programa los verifique. Nada aquí es una estimación.
 */
export interface DatosMunicipio {
  docentes: number | null;
  recursos: number | null;
  experiencias: number | null;
  fotosUrl?: string;
}

export const MUNICIPIOS: string[] = [
  "Alcalá", "Andalucía", "Ansermanuevo", "Argelia", "Bolívar", "Buenaventura",
  "Buga", "Bugalagrande", "Caicedonia", "Cali", "Calima (El Darién)", "Candelaria",
  "Cartago", "Dagua", "El Águila", "El Cairo", "El Cerrito", "El Dovio",
  "Florida", "Ginebra", "Guacarí", "Jamundí", "La Cumbre", "La Unión",
  "La Victoria", "Obando", "Palmira", "Pradera", "Restrepo", "Riofrío",
  "Roldanillo", "San Pedro", "Sevilla", "Toro", "Trujillo", "Tuluá",
  "Ulloa", "Versalles", "Vijes", "Yotoco", "Yumbo", "Zarzal",
];

/** Complete aquí los datos verificados por municipio. */
export const DATOS_MUNICIPIOS: Record<string, DatosMunicipio> = {};
