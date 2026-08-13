-- =========================================================================
-- Valle Paraíso Bilingüe · Taller 1 — datos iniciales
-- =========================================================================
-- Corre esto en el SQL Editor de Supabase DESPUÉS de supabase/schema.sql.
-- Es el mismo contenido que vivía en el objeto SITE_DATA del index.html
-- original, ahora como filas editables desde el Table Editor.
--
-- Los archivos referenciados en `archivo_path` deben subirse al bucket
-- de Storage "docs" (raíz del bucket, sin subcarpetas) con exactamente
-- estos nombres — ver README.md.
-- =========================================================================

truncate table
  programa, pilares, cronograma, salas, equipo, documentos, bancos,
  descargas, memorias_config, memoria_tabs, memoria_groups, memoria_items,
  contacto
restart identity cascade;

-- -------------------------------------------------------------------------
-- Programa
-- -------------------------------------------------------------------------
insert into programa (id, parrafos) values (
  1,
  array[
    'El <strong>Taller 1</strong> abre un ciclo de cinco espacios formativos dirigidos a docentes oficiales de inglés del Valle del Cauca, articulado con el Currículo Sugerido de Inglés (CSI), los Derechos Básicos de Aprendizaje (DBA), las Mallas de Aprendizaje y el Marco Común Europeo de Referencia (MCER).',
    'La jornada combina una <strong>plenaria de fundamentación</strong> con <strong>cuatro salas prácticas</strong> en las que cada docente diseña, con apoyo de inteligencia artificial, un recurso educativo bilingüe listo para su aula.'
  ]
);

insert into pilares (titulo, descripcion, orden) values
  ('360 docentes',      'instituciones oficiales del Valle del Cauca', 1),
  ('8 horas',            'jornada académica completa', 2),
  ('4 salas',            'prácticas, más una plenaria', 3),
  ('1 de 5 talleres',    'del ciclo formativo', 4);

-- -------------------------------------------------------------------------
-- Cronograma
-- -------------------------------------------------------------------------
insert into cronograma (hora, label, tipo, orden) values
  ('8:00',  'Registro',    'neutro', 1),
  ('8:30',  'Plenaria',    'navy',   2),
  ('10:05', 'Rotación 1',  'teal',   3),
  ('11:10', 'Rotación 2',  'orange', 4),
  ('1:10',  'Rotación 3',  'blue',   5),
  ('2:15',  'Rotación 4',  'red',    6),
  ('3:15',  'Cierre',      'neutro', 7);

-- -------------------------------------------------------------------------
-- Las 4 salas
-- -------------------------------------------------------------------------
insert into salas (numero, color, nombre, resumen, orden) values
  (1, 'teal',   'Texto e Imagen',             'Infografías, cómics y guías de lectura bilingües.', 1),
  (2, 'orange', 'Audio',                      'Podcasts, dictados y práctica de pronunciación.', 2),
  (3, 'blue',   'Presentaciones Interactivas','Storytelling, gamificación y evaluación en vivo.', 3),
  (4, 'red',    'Video Educativo',            'Guiones, storyboards y videoclases con IA.', 4);

-- -------------------------------------------------------------------------
-- Equipo
-- -------------------------------------------------------------------------
-- foto_url queda en NULL: el avatar cae automáticamente a iniciales sobre
-- un fondo de color. Para usar fotos reales, súbelas al bucket público
-- "team" (o similar) y pega aquí la URL pública completa.
insert into equipo (rol_tipo, sala, color, nombre, rol_o_especialidad, bio, foto_url, orden) values
  ('conferencista', null, null,
   'Cristhian Hernán Bonilla Gutiérrez',
   'Conferencista Principal',
   'Docente universitario e investigador. Especialista en TIC para la Innovación Educativa. Magíster en Educación y Tecnología Digital. PhD© en Educación e Innovación. Diseñador instruccional y consultor en innovación educativa, tecnologías digitales e inteligencia artificial aplicada a la educación.',
   null, 1),
  ('tallerista', 1, 'teal',
   'Margarita Elizabeth Mazabuel Collazos',
   'Tallerista · Sala 1 · Texto e Imagen',
   'Diseño gráfico educativo, Canva, Genially e infografías.',
   null, 2),
  ('tallerista', 2, 'orange',
   'Jorge Mario Rincón',
   'Tallerista · Sala 2 · Audio',
   'Producción sonora, podcast educativo y pronunciación.',
   null, 3),
  ('tallerista', 3, 'blue',
   'Cristhian Hernán Bonilla Gutiérrez',
   'Tallerista · Sala 3 · Presentaciones',
   'Storytelling, gamificación y diseño instruccional.',
   null, 4),
  ('tallerista', 4, 'red',
   'María Nelly Dueñas',
   'Tallerista · Sala 4 · Video',
   'Producción audiovisual y metodología Aula Invertida.',
   null, 5);

-- -------------------------------------------------------------------------
-- Documentos oficiales
-- -------------------------------------------------------------------------
insert into documentos (titulo, tipo, descripcion, archivo_path, orden) values
  ('Guía Digital del Participante', 'DOCX',
   'Cuadernillo de trabajo para los 360 docentes en las cuatro salas.',
   'Guia_Digital_Participante_Taller1_Valle_Paraiso_Bilingue.docx', 1);

-- -------------------------------------------------------------------------
-- Bancos de recursos
-- -------------------------------------------------------------------------
insert into bancos (titulo, cantidad, descripcion, archivo_path, orden) values
  ('Banco de 100 Prompts de IA', '100 prompts',
   'Prompts complejos para Audio, Escritura, Presentaciones y Video, contextualizados al Valle del Cauca.',
   'Banco_100_Prompts_IA_Taller1_Valle_Paraiso_Bilingue.docx', 1),

  ('Banco de Plantillas Editables', '16 plantillas',
   'Tablas listas para diligenciar durante los 25 minutos de producción guiada de cada sala.',
   'Banco_Plantillas_Editables_Taller1_Valle_Paraiso_Bilingue.docx', 2),

  ('Banco de herramientas digitales - Valle Paraíso', '50 recursos',
   'Herramientas, bancos abiertos e IA verificados, con enlace directo y nivel de conectividad.',
   'Repositorio_Recursos_Digitales_Taller1_Valle_Paraiso_Bilingue.docx', 3),

  ('Banco de Herramientas Digitales - Excel Completo', '93 recursos',
   'Repositorio curado en 11 categorías (diseño gráfico, audio, video, presentaciones, bancos de imágenes/audio/video, REA, IA, evaluación y gamificación); cada herramienta incluye enlace, tipo de licencia y aplicación en la enseñanza del inglés.',
   '1__Banco_de_herramientas_digitales_-_Valle_Paraiso.xlsx', 4),

  ('Banco de Recursos de Aprendizaje y Herramientas Web 2.0', '500+ recursos',
   'Compilación en inglés de herramientas Web 2.0 y materiales de autoaprendizaje organizados por habilidad (listening, speaking, writing...), más ejemplos de docentes colombianos usando TIC en el aula.',
   '2__Banco_de_Recursos_de_Aprendizaje.xlsx', 5),

  ('Banco de Recursos y Herramientas Libres', '48 recursos',
   'Catálogo de repositorios, software y aplicaciones para acceder, editar y publicar contenidos de texto, audio y video, con enlace, licencia y breve descripción de cada uno.',
   '3__Banco_de_Recursos_y_Herramientas_Libres.xlsx', 6);

-- -------------------------------------------------------------------------
-- Memorias digitales
-- -------------------------------------------------------------------------
insert into memorias_config (id, intro) values (
  1,
  'Al finalizar el proceso de formación, se entregará a la Gobernación del Valle del Cauca un repositorio digital organizado que contendrá la totalidad de los materiales académicos y las evidencias del taller, con el propósito de facilitar su consulta, reutilización y transferencia a las instituciones educativas del departamento.'
);

insert into memoria_tabs (id, label, tree, orden) values
  ('material',      'Material y guías',                 false, 1),
  ('bancos',        'Bancos y plantillas',               false, 2),
  ('productos',     'Productos y evidencias',            false, 3),
  ('informes',      'Informes y resultados',             false, 4),
  ('organizacion',  'Organización del repositorio',      true,  5);

-- Tab "material"
insert into memoria_groups (tab_id, titulo, nota, chips, orden) values
  ('material', '1. Material académico', null, null, 1),
  ('material', '2. Guías de trabajo por sala', 'Parte del material de preparación del equipo académico.', null, 2);

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, item.nombre, item.disponible, item.link, item.orden
from memoria_groups,
  lateral (values
    ('Presentación oficial de la plenaria (PowerPoint y PDF)', false, null::text, 1),
    ('Presentaciones de las cuatro salas temáticas',           false, null,       2),
    ('Guía metodológica del taller',                           true,  '#documentos', 3),
    ('Agenda académica',                                       true,  '#programa',   4),
    ('Cronograma de actividades',                              true,  '#programa',   5)
  ) as item(nombre, disponible, link, orden)
where tab_id = 'material' and titulo = '1. Material académico';

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, item.nombre, item.disponible, item.link, item.orden
from memoria_groups,
  lateral (values
    ('Guía Sala 1 – Texto e Imagen', true, null::text, 1),
    ('Guía Sala 2 – Audio',          true, null,       2),
    ('Guía Sala 3 – Presentaciones', true, null,       3),
    ('Guía Sala 4 – Video',          true, null,       4)
  ) as item(nombre, disponible, link, orden)
where tab_id = 'material' and titulo = '2. Guías de trabajo por sala';

-- Tab "bancos"
insert into memoria_groups (tab_id, titulo, nota, chips, orden) values
  ('bancos', '3. Banco de herramientas digitales',
   'Cada herramienta incluye nombre, descripción, enlace, licencia y posibles aplicaciones en la enseñanza del inglés.',
   array['Diseño gráfico','Audio','Video','Presentaciones','Bancos de imágenes','Bancos de audio','Bancos de video','REA','Inteligencia Artificial','Evaluación','Gamificación'],
   1),
  ('bancos', '4. Banco de prompts para IA',
   'Hoy está organizado por sala (Audio, Escritura, Presentaciones, Video); la versión final de las memorias lo reorganizará por competencia comunicativa.',
   array['Reading','Listening','Speaking','Writing','Vocabulary','Grammar','Lesson Planning','Assessment','Classroom Activities','Material Design'],
   2),
  ('bancos', '5. Plantillas editables', null,
   array['Canva','PowerPoint','Google Slides','Storyboard','Infografías','Podcast','Planeación de clase','Guiones de video','Rúbricas'],
   3),
  ('bancos', '6. Recursos Educativos Abiertos (REA)', null,
   array['Imágenes','Audio','Videos','Actividades','Bibliotecas digitales','Material bilingüe'],
   4);

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Banco de herramientas digitales - Valle Paraíso', true, '#bancos', 1
from memoria_groups where tab_id = 'bancos' and titulo = '3. Banco de herramientas digitales';

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Banco de 100 Prompts de IA', true, '#bancos', 1
from memoria_groups where tab_id = 'bancos' and titulo = '4. Banco de prompts para IA';

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Banco de Plantillas Editables', true, '#bancos', 1
from memoria_groups where tab_id = 'bancos' and titulo = '5. Plantillas editables';

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Banco de Recursos y Herramientas Libres', true, '#bancos', 1
from memoria_groups where tab_id = 'bancos' and titulo = '6. Recursos Educativos Abiertos (REA)';

-- Tab "productos"
insert into memoria_groups (tab_id, titulo, nota, chips, orden) values
  ('productos', '7. Productos desarrollados durante el taller',
   'Ejemplos destacados de infografías, podcasts, presentaciones, videos educativos y recursos interactivos elaborados por los docentes — previa autorización de los participantes.',
   null, 1),
  ('productos', '8. Evidencias del evento',
   'Registro fotográfico y audiovisual, sujeto a autorización de los participantes.',
   null, 2);

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Galería de productos destacados', false, null, 1
from memoria_groups where tab_id = 'productos' and titulo = '7. Productos desarrollados durante el taller';

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, item.nombre, false, null, item.orden
from memoria_groups,
  lateral (values
    ('Registro fotográfico', 1),
    ('Evidencias audiovisuales', 2),
    ('Capturas de las actividades', 3)
  ) as item(nombre, orden)
where tab_id = 'productos' and titulo = '8. Evidencias del evento';

-- Tab "informes"
insert into memoria_groups (tab_id, titulo, nota, chips, orden) values
  ('informes', '9. Informe ejecutivo',
   'Objetivos alcanzados, número de participantes, desarrollo de la jornada, resultados obtenidos, principales aprendizajes y recomendaciones.',
   null, 1),
  ('informes', '10. Resultados de evaluación',
   'Consolidado de la encuesta de satisfacción, estadísticas generales, análisis de resultados y recomendaciones de mejora.',
   null, 2);

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Informe ejecutivo del Taller 1', false, null, 1
from memoria_groups where tab_id = 'informes' and titulo = '9. Informe ejecutivo';

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Resultados de la encuesta de satisfacción', false, null, 1
from memoria_groups where tab_id = 'informes' and titulo = '10. Resultados de evaluación';

-- Tab "organizacion" (tree:true)
insert into memoria_groups (tab_id, titulo, nota, chips, orden) values
  ('organizacion', '11. Directorio de recursos',
   'Todos los enlaces utilizados durante el taller, organizados por categoría para facilitar su consulta posterior.',
   null, 1);

insert into memoria_items (group_id, nombre, disponible, link, orden)
select id, 'Directorio consolidado de enlaces', true, '#bancos', 1
from memoria_groups where tab_id = 'organizacion' and titulo = '11. Directorio de recursos';

-- -------------------------------------------------------------------------
-- Contacto
-- -------------------------------------------------------------------------
insert into contacto (id, entidad, correo, telefono) values
  (1, 'Gobernación del Valle del Cauca · Corporación Talentum', null, null);
