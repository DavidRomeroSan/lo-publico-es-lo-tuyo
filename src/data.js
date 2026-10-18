// Cifras y fuentes de «Tu año en lo público».
// Cambiar aquí cualquier dato actualiza toda la web.

export const SITE = {
  name: 'Tu año en lo público',
  lema: 'Lo público es lo tuyo',
  year: 2026,
  // URL pública (sin barra final). Se imprime en la tarjeta compartible.
  url: 'davidromerosan.github.io/lo-publico-es-lo-tuyo',
  // Quién promueve la web. Obligatorio en campaña: rellenar antes de difundir.
  emisor: ''
};

// Precio privado de referencia por ciudad (Madrid = 1).
// m2: alquiler €/m²/mes (idealista, septiembre 2026). mat: matrícula pública anual de grado.
export const CITY = {
  madrid:    { n: 'Madrid',          f: 1.00, m2: 23.4, mat: 1620 },
  barcelona: { n: 'Barcelona',       f: 1.05, m2: 20.1, mat: 1508 },
  bilbao:    { n: 'Bilbao',          f: 0.95, m2: 15.7, mat: 1000 },
  vitoria:   { n: 'Vitoria-Gasteiz', f: 0.92, m2: 12.3, mat: 1000 },
  otra:      { n: 'tu ciudad',       f: 0.90, m2: 15.1, mat: 1000 }
};

export const P = {
  // Sanidad privada (Selectra / Doctoralia / Top Doctors; parte alta de los rangos)
  medico: 50, esp: 150, psico: 80, urg: 550, ingreso: 4500, pediatra: 90,
  parto: 8000,
  // Protección
  permiso: 10250,           // 19 semanas al salario medio INE (28.050 €/año)
  paro: 1007,               // prestación media mensual 2025
  pension: 21976,           // pensión media de jubilación × 14
  bono: 3000,               // Bono Alquiler Joven, 250 €/mes
  // Educación
  alumno: 7943,             // gasto público por alumno en la pública (2023)
  colePriv: 10000,          // colegio privado con extras, al año
  uniPriv: 15000,           // universidad privada, media anual
  uniPublica: 6671,         // transferencia pública por universitario
  infantil: 5500,           // escuela infantil privada, 500 €/mes × 11
  // Deporte
  gym: 600, club: 900, extra: 1080, pistas: 240,
  // Gasto público por habitante (IGAE 2024 / 48,6 M hab.; Sanidad 2024)
  saludPC: 2084, seguridad: 589, ciudad: 477, ocio: 395
};
export const NOVES = P.seguridad + P.ciudad + P.ocio; // 1.461 €
export const VPO_DESCUENTO = 0.4;  // supuesto: vivienda protegida un 40 % bajo mercado
export const VPO_M2 = 70;
export const MEDIA_MEDICO = 5.1;

export const US = { seguro: 9325, seguroFam: 26993, uniPriv: 45000, guarde: 13128, parto: 14000 };

// «Lo público ha mejorado»: [icono, cifra, texto]
export const FACTS = {
  Sanidad: ['hospital', '84,01 años', 'de esperanza de vida en España en 2024. Nunca habíamos vivido tanto.'],
  Educación: ['school', '12,8 %', 'de abandono escolar temprano en 2025, mínimo histórico. Hace diez años rondaba el 20 %.'],
  EducaciónGasto: ['cap', '71.349 M€', 'de gasto público en educación en 2024. Nunca se había invertido tanto.'],
  Protección: ['baby', '19 semanas', 'de permiso pagado por nacimiento para cada progenitor. En 2007, los padres tenían 13 días.'],
  Vivienda: ['house', '+47,9 %', 'ha crecido el gasto público en vivienda y servicios comunitarios entre 2020 y 2024.'],
  ViviendaBono: ['house', 'Hasta 300 €', 'al mes de ayuda al alquiler joven con el nuevo Plan Estatal 2026-2030.'],
  Transporte: ['train', '30 € al mes', 'cuesta el abono único estatal para menores de 26. 60 € para el resto.'],
  Cultura: ['music', '47,6 %', 'de la gente fue a un museo el último año. Los mejores datos de consumo cultural de la historia.'],
  Deporte: ['swim', '+43,4 %', 'ha crecido el gasto público en cultura, ocio y deporte entre 2020 y 2024.'],
  Emergencias: ['fire', 'Más de 1 millón', 'de hectáreas ardieron en la UE en 2025, récord histórico. Los equipos públicos estuvieron en primera línea.'],
  Medio: ['tree', '+44,1 %', 'ha crecido el gasto público en protección del medio ambiente entre 2020 y 2024.']
};

export const SOURCES = [
  ['Precios privados de sanidad (Selectra, con datos de Doctoralia y Top Doctors)', 'https://selectra.es/seguros/seguros-salud/precio-consulta-privada'],
  ['Consulta privada en Bilbao (SaludOnNet)', 'https://www.saludonnet.com/centros-medicos/medicina-general/ciudad/bizkaia-bilbao/1-consulta'],
  ['Parto privado (CuantoMeCuesta)', 'https://cuantomecuesta.com/es/parto/'],
  ['Colegio privado en Madrid (CuantoMeCuesta)', 'https://cuantomecuesta.com/es/colegio-privado/'],
  ['Colegio privado en Barcelona (Micole)', 'https://www.micole.net/articulos/escolarizacion-y-eleccion-de-centro/costes-y-cuotas-entender-la-financiacion/cuanto-cuesta-colegio-privado-barcelona-2026'],
  ['Universidad privada, media anual (Artículo14)', 'https://www.articulo14.es/?p=404530'],
  ['Alquiler por ciudad (idealista, septiembre 2026)', 'https://www.idealista.com/sala-de-prensa/informes-precio-vivienda/alquiler/report/'],
  ['Gasto público por funciones 2020-2024 (IGAE)', 'https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/AAPP_A/Funcional%202020-2024.pdf'],
  ['Gasto sanitario público 2024 (Ministerio de Sanidad)', 'https://www.sanidad.gob.es/gabinete/notasPrensa.do?id=6908'],
  ['Frecuentación en atención primaria (Ministerio de Sanidad)', 'https://www.sanidad.gob.es/estadEstudios/sanidadDatos/tablas/tabla17.htm'],
  ['Gasto por alumno y gasto educativo 2024 (El Español)', 'https://www.elespanol.com/observatorio-educacion/20260925/gasto-publico-educacion-espana-cae-decimas-pib-detras-media-ocde/1003744396390_0.html'],
  ['Gasto por universitario y matrícula (CYD, vía Público)', 'https://www.publico.es/sociedad/espana-cola-union-europea-inversion-universitaria.html'],
  ['Esperanza de vida 2024 (INE)', 'https://www.elobservador.com.uy/espana/sucede/la-esperanza-vida-espana-llega-los-8401-anos-una-cifra-nunca-alcanzada-n6025195'],
  ['Abandono escolar temprano 2025', 'https://rtvc.es/canarias-segunda-comunidad-mas-tasa-abandono-escolar-2025/'],
  ['Permiso por nacimiento de 19 semanas (La Moncloa)', 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/trabajo14/paginas/2025/090925-real-decreto-ley-permisos-nacimientos.aspx'],
  ['Salario medio 2023 (INE)', 'https://ine.es/dyngs/Prensa/EAES2023.htm'],
  ['Prestación media por desempleo 2025', 'https://www.elindependiente.com/economia/2025/08/24/gasto-prestaciones-desempleo-aumenta-7-primer-semestre/amp/'],
  ['Pensión media de jubilación, abril 2026 (La Moncloa)', 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/inclusion/paginas/2026/280426-inclusion-pension-media-abril.aspx'],
  ['Bono Alquiler Joven y Plan Estatal 2026-2030', 'https://www.ineaf.es/tribuna/bono-de-alquiler-joven/'],
  ['Abono único de transporte', 'https://www.elindependiente.com/economia/2025/12/16/abono-transporte-anunciado-pedro-sanchez/'],
  ['Cobertura de las tarifas de transporte (UITP)', 'https://www.uitp.org/wp-content/uploads/sites/7/2025/10/20251002_ES_Fare-Affordability_Policy-Brief_WEB.pdf'],
  ['Encuesta de Hábitos y Prácticas Culturales 2024-2025', 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/cultura/paginas/2025/081025-mejores-datos-consumo-cultural.aspx'],
  ['Incendios forestales 2025 en la UE (EFFIS)', 'https://www.lanacion.com.ar/agencias/ue-la-ue-confirma-que-2025-sera-el-ano-con-mas-hectareas-quemadas-en-incendios-forestales-desde-que-nid05122025'],
  ['Edad media de emancipación (CJE, vía idealista)', 'https://www.idealista.com/news/taxonomy/term/4675'],
  ['Edad media al primer hijo (Funcas, con datos del INE)', 'https://www.funcas.es/wp-content/uploads/2026/03/2603-I_Sociales.pdf'],
  ['EE. UU.: primas de seguro médico (KFF 2025)', 'https://www.kff.org/health-costs/press-release/2025-employer-health-benefits-survey/'],
  ['EE. UU.: matrícula universitaria (College Board 2025-26)', 'https://newsroom.collegeboard.org/trends-college-pricing-and-student-aid-report-published-tuition-prices-public-institutions-and'],
  ['EE. UU.: guardería (Child Care Aware 2024)', 'https://www.fox5dc.com/news/child-care-costs-daycare-america-2024'],
  ['EE. UU.: parto sin seguro (CoveredUSA)', 'https://coveredusa.org/es/cost/hospital-birth']
];
