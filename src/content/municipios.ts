/**
 * Los 42 municipios del departamento del Valle del Cauca y la participación
 * en el Taller 1.
 *
 * FUENTE: base de inscritos del Taller 1 (BD talleres), sin los registros con
 * estado RETIRA. "docentes" es el número de docentes inscritos por municipio
 * e "instituciones" lista cada institución con su número de docentes. Los
 * corregimientos de Riofrío (Fenicia, Portugal, Salónica) se agrupan en Riofrío.
 */
export interface DatosMunicipio {
  docentes: number;
  /** [nombre de la institución, docentes inscritos] */
  instituciones: [string, number][];
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

export const DATOS_MUNICIPIOS: Record<string, DatosMunicipio> = {
  "Alcalá": { docentes: 3, instituciones: [["I.E. San Jose", 3]] },
  "Andalucía": { docentes: 3, instituciones: [["I.E. Agricola Campoalegre", 3]] },
  "Ansermanuevo": { docentes: 10, instituciones: [["I.E. El Placer", 4], ["I.E. Santa Ana de los Caballeros", 3], ["I.E. Santa Ines", 3]] },
  "Argelia": { docentes: 1, instituciones: [["I.E. Gilberto Alzate Avendaño", 1]] },
  "Bolívar": { docentes: 16, instituciones: [["I.E. Betania", 3], ["I.E. Manuel Dolores Mondragón", 3], ["I.E. Naranjal", 3], ["I.E. Primavera", 4], ["I.E. Rodrigo Lloreda Caicedo", 3]] },
  "Bugalagrande": { docentes: 12, instituciones: [["I.E. Antonio Nariño", 3], ["I.E. Ceilan", 3], ["I.E. Diego Rengifo Salazar", 3], ["I.E. Mariano Gonzalez", 3]] },
  "Caicedonia": { docentes: 13, instituciones: [["I.E. Bolivariano", 4], ["I.E. Normal Superior Maria Inmaculada", 3], ["I.E. Rural Caicedonia", 3], ["I.E. Sagrado Corazon de Jesus", 3]] },
  "Calima (El Darién)": { docentes: 7, instituciones: [["I.E. Gimnasio del Calima", 3], ["I.E. Jhon F. Kennedy", 1], ["I.E. Pablo VI", 3]] },
  "Candelaria": { docentes: 19, instituciones: [["I.E. Inmaculada Concepcion", 3], ["I.E. Marino Renjifo Salcedo", 3], ["I.E. Nuestra Señora de la Candelaria", 5], ["I.E. Panebianco Americano", 3], ["I.E. Rosendo Mondragon Fejido", 2], ["I.E. Santa Rita de Cassia", 3]] },
  "Dagua": { docentes: 36, instituciones: [["I.E. Camilo Torres", 3], ["I.E. Cristóbal Colón", 3], ["I.E. El Palmar", 7], ["I.E. El Queremal", 3], ["I.E. Gimnasio del Dagua", 4], ["I.E. Guillermo Valencia", 4], ["I.E. Miguel Antonio Caro", 3], ["I.E. Pedro Fermín de Vargas", 3], ["I.E. San Pedro Claver", 3], ["I.E. Santa Teresita del Niño Jesús", 3]] },
  "El Cairo": { docentes: 3, instituciones: [["I.E. La Presentacion", 3]] },
  "El Cerrito": { docentes: 19, instituciones: [["I.E. Hernando Borrero Cuadros", 4], ["I.E. Jorge Isaacs de El Placer", 3], ["I.E. Sagrado Corazon", 10], ["I.E. Santa Elena", 2]] },
  "El Dovio": { docentes: 6, instituciones: [["I.E. de la Nación Embera del Valle del Cauca IENEV", 3], ["I.E. José María Falla", 3]] },
  "El Águila": { docentes: 6, instituciones: [["I.E. Justiniano Ecavarria", 3], ["I.E. Santa Marta", 3]] },
  "Florida": { docentes: 21, instituciones: [["I.E. Absalon Torres Camacho", 5], ["I.E. Atanasio Girardot", 3], ["I.E. Ciudad Florida", 5], ["I.E. Jose Maria Cordoba", 4], ["I.E. Las Americas", 4]] },
  "Ginebra": { docentes: 10, instituciones: [["I.E. Ginebra La Salle", 3], ["I.E. Inmaculada Concepción", 3], ["I.E. Manuela Beltran", 4]] },
  "Guacarí": { docentes: 16, instituciones: [["I.E. General Santander", 3], ["I.E. Jose Celestino Mutis", 4], ["I.E. Jose Ignacio Ospina", 3], ["I.E. Pedro Vicente Abadia", 3], ["I.E. Simon Bolivar", 3]] },
  "La Cumbre": { docentes: 12, instituciones: [["I.E. Francisco de Paula Santander", 3], ["I.E. La Libertad", 3], ["I.E. Maria Auxiliadora", 3], ["I.E. San Pío X", 3]] },
  "La Unión": { docentes: 13, instituciones: [["I.E. Argemiro Escobar Cardona", 4], ["I.E. Magdalena Ortega", 3], ["I.E. Quebrada Grande", 3], ["I.E. San Jose", 3]] },
  "La Victoria": { docentes: 10, instituciones: [["I.E. Nuestra Señora de la Paz", 3], ["I.E. San Jose", 4], ["I.E. Santa Teresita", 3]] },
  "Obando": { docentes: 6, instituciones: [["I.E. Policarpa Salavarrieta", 3], ["I.E. San Jose", 3]] },
  "Pradera": { docentes: 13, instituciones: [["I.E. Alfredo Posada Correa", 3], ["I.E. Ateneo", 3], ["I.E. Francisco Antonio Zea", 3], ["I.E. Marco Fidel Suarez", 1], ["I.E. Mercedes Abrego", 3]] },
  "Restrepo": { docentes: 12, instituciones: [["I.E. José Acevedo y Gómez", 3], ["I.E. José Felix Restrepo", 3], ["I.E. Julio Fernandez Medina", 3], ["I.E. Teodoro Múnera Hincapié", 3]] },
  "Riofrío": { docentes: 12, instituciones: [["I.E. Alfredo Garrido Tovar", 3], ["I.E. Camilo Torres", 3], ["I.E. Hernando Llorente Arroyo", 3], ["I.E. Nemesio Rodríguez Escobar", 3]] },
  "Roldanillo": { docentes: 21, instituciones: [["C.E. Rodrigo Lloreda Caicedo", 10], ["I.E. Belisario Peña Piñeiro", 3], ["I.E. Normal Superior Jorge Isaacs", 2], ["I.E. Normal Superior Nuestra Señora de Chiquinquira", 6]] },
  "San Pedro": { docentes: 6, instituciones: [["I.E. Jose Antonio Aguilera", 3], ["I.E. Miguel Antonio Caro", 3]] },
  "Sevilla": { docentes: 22, instituciones: [["I.E. Benjamin Herrera", 3], ["I.E. Heraclio Uribe Uribe", 3], ["I.E. Jorge Eliecer Gaitan", 3], ["I.E. Maria Auxiliadora", 4], ["I.E. Santa Barbara", 3], ["I.E. Santa Teresita", 3], ["I.E. Sevilla", 3]] },
  "Toro": { docentes: 7, instituciones: [["I.E. Nuestra Señora de la Consolacion", 3], ["I.E. Tecnica Agropecuaria", 4]] },
  "Trujillo": { docentes: 12, instituciones: [["I.E. Antonio José de Sucre", 3], ["I.E. Cristóbal Colon", 3], ["I.E. Manuel María Mallarino", 3], ["I.E. San Isidro", 3]] },
  "Ulloa": { docentes: 3, instituciones: [["I.E. Maria Inmaculada", 3]] },
  "Versalles": { docentes: 3, instituciones: [["I.E. Carlos Holguín Sardi", 3]] },
  "Vijes": { docentes: 3, instituciones: [["I.E. Antonio Jose de Sucre", 3]] },
  "Yotoco": { docentes: 8, instituciones: [["I.E. Gabriela Mistral", 3], ["I.E. San Juan Bosco", 5]] },
  "Zarzal": { docentes: 12, instituciones: [["I.E. Antonio Nariño", 3], ["I.E. Efrain Varela Vaca", 3], ["I.E. Luis Gabriel Umaña", 3], ["I.E. Normal Superior Nuestra Señora de las Mercedes", 3]] },
};

export const TOTAL_INSTITUCIONES = Object.values(DATOS_MUNICIPIOS).reduce((s, m) => s + m.instituciones.length, 0);
export const TOTAL_INSCRITOS = Object.values(DATOS_MUNICIPIOS).reduce((s, m) => s + m.docentes, 0);
