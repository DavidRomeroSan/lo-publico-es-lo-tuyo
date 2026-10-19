// Preguntas de la versión A, con ramas (`when`) y opciones dinámicas.
export const isStudent = (a) => a.sit === 'estudio' || a.sit === 'ambos';
const upTo = (n) => [['Ninguno', 0], ['Uno', 1], ['Dos', 2], ['Tres', 3]].slice(0, (n || 1) + 1);

export const Q = [
  { k: 'edad', s: 'Sobre ti', i: 'heart', t: '¿Cuántos años tienes?', o: [['16 o 17', 17], ['18 a 23', 20], ['24 a 30', 27], ['31 a 38', 34], ['39 a 45', 42], ['46 a 64', 55], ['65 o más', 70]] },
  { k: 'sit', s: 'Sobre ti', i: 'hands', t: '¿Qué haces ahora mismo?', o: (a) => [['Estudio', 'estudio'], ['Trabajo', 'trabajo'], ['Estudio y trabajo', 'ambos'], ['Busco trabajo', 'paro'], ['Cuido de mi casa o familia', 'casa']].concat(a.edad >= 55 ? [['Estoy jubilado o jubilada', 'jubilado']] : []) },
  { k: 'estudia', s: 'Tus estudios', i: 'cap', when: isStudent, t: '¿Dónde estudias?', o: [['Instituto público (ESO o Bachillerato)', 'inst'], ['FP pública', 'fp'], ['Universidad pública', 'uni'], ['En un centro privado o concertado', 'otra']] },
  { k: 'paro', s: 'Tu trabajo', i: 'hands', when: (a) => a.sit === 'paro', t: '¿Cuántos meses has cobrado paro o subsidio este año?', o: [['Ninguno', 0], ['1 a 3', 2], ['4 a 6', 5], ['7 a 12', 10]] },
  { k: 'pensF', s: 'Los tuyos', i: 'hands', t: '¿Cuántas personas de tu familia cobran una pensión?', sub: 'Padres, abuelos o tú, si estás jubilado. De jubilación, viudedad o invalidez.', o: [['Nadie', 0], ['Una', 1], ['Dos', 2], ['Tres o más', 3]] },
  { k: 'dep', s: 'Los tuyos', i: 'heart', t: '¿Alguien de tu familia recibe ayuda por dependencia?', sub: 'Ayuda a domicilio, centro de día, residencia o una prestación por cuidar a un familiar.', two: true, o: [['Sí', 1], ['No', 0]] },
  { k: 'estudios', s: 'Tus estudios', i: 'school', when: (a) => !isStudent(a), multi: true, t: '¿Dónde estudiaste?', sub: 'Marca todo lo que corresponda.', o: [['Colegio o instituto público', 'cole'], ['FP pública', 'fp'], ['Universidad pública', 'uni'], ['Nada de esto', 'none']] },
  { k: 'vivienda', s: 'Tu casa', i: 'house', t: '¿Cómo vives?', o: [['Con mi familia', 'familia'], ['De alquiler', 'alquiler'], ['En un piso compartido', 'compartido'], ['En una vivienda pública o protegida', 'publica'], ['En una casa en propiedad', 'propiedad']] },
  { k: 'bono', s: 'Tu casa', i: 'house', when: (a) => (a.vivienda === 'alquiler' || a.vivienda === 'compartido') && a.edad <= 34, t: '¿Te ha llegado el Bono Alquiler Joven?', sub: 'Hasta 250 € al mes para menores de 36 años.', two: true, o: [['Sí', 1], ['No', 0]] },
  { k: 'adultos', s: 'Tu casa', i: 'house', t: '¿Cuántos adultos vivís en casa?', sub: 'Contándote a ti.', o: [['Solo yo', 1], ['Dos', 2], ['Tres', 3], ['Cuatro o más', 4]] },
  { k: 'nhijos', s: 'Tu familia', i: 'baby', when: (a) => a.edad >= 24, t: '¿Tienes hijos que vivan contigo?', o: [['No', 0], ['Uno', 1], ['Dos', 2], ['Tres o más', 3]] },
  { k: 'hijosUso', s: 'Tus hijos', i: 'school', when: (a) => (a.nhijos || 0) > 0, multi: true, t: '¿Qué usan tus hijos de lo público?', sub: 'Marca todo lo que corresponda.', o: [['Escuela infantil pública', 'infantil'], ['Colegio o instituto público', 'cole'], ['Extraescolares o deporte municipal', 'extra'], ['Pediatra de la pública', 'pediatra'], ['Ha nacido uno este año', 'bebe'], ['Nada de esto', 'none']] },
  { k: 'visitas', s: 'Tu salud', i: 'hospital', t: '¿Cuántas veces has ido al médico este año?', sub: 'Médico de familia, especialista y pruebas, contando llamadas.', o: [['Ninguna', 0], ['1 a 5', 3], ['6 a 15', 10], ['Más de 15', 20]] },
  { k: 'salud2', s: 'Tu salud', i: 'heart', multi: true, t: '¿Has necesitado algo de esto?', sub: 'Marca todo lo que corresponda. Nadie más lo verá: se queda en tu móvil.', o: [['Urgencias', 'urg'], ['Una operación o un ingreso', 'ing'], ['Psicólogo o psiquiatra por la pública', 'psico'], ['Nada de esto', 'none']] },
  { k: 'emerg', s: 'Emergencias', i: 'fire', t: '¿Te han ayudado bomberos, protección civil o la UME?', o: [['No, por suerte', ''], ['Un incendio forestal cerca de casa', 'incendio'], ['Una inundación o una DANA', 'dana'], ['Otra emergencia (incendio en casa, accidente…)', 'otra']] },
  { k: 'transp', s: 'Tu día a día', i: 'bus', t: '¿Usas el transporte público?', sub: 'Bus, metro, cercanías, tranvía.', o: [['Nunca', 'nunca'], ['Algunas veces al mes', 'aveces'], ['Casi a diario', 'diario']] },
  { k: 'deporte', s: 'Tu tiempo libre', i: 'swim', multi: true, t: '¿Qué deporte público haces?', sub: 'Marca todo lo que corresponda.', o: [['Gimnasio o piscina municipal', 'gym'], ['Un club o escuela deportiva municipal', 'club'], ['Pistas públicas (fútbol, pádel, calistenia…)', 'pistas'], ['Nada de esto', 'none']] },
  { k: 'cultura', s: 'Tu tiempo libre', i: 'music', multi: true, t: '¿Qué cultura pública has disfrutado este año?', sub: 'Marca todo lo que corresponda.', o: [['Un museo o una exposición', 'museo'], ['Teatro, danza o un concierto', 'escena'], ['Un monumento o yacimiento', 'patri'], ['Fiestas, cine de verano o actividades de tu ayuntamiento', 'fiestas'], ['Talleres o clubes en la biblioteca', 'biblio'], ['Nada de esto', 'none']] },
  { k: 'worker', s: 'Una más', i: 'heart', open: true, t: '¿Qué trabajador público te ha marcado este año?', sub: 'No suma euros. Suma otra cosa. Elige uno o escribe el tuyo.', o: [['Una enfermera o enfermero', 'enfermera'], ['Una profe', 'profe'], ['Una médica o médico', 'medica'], ['Una bombera o bombero', 'bombero'], ['Quien conduce mi autobús', 'bus']] }
];

export const WORKER = {
  enfermera: ['Gracias, enfermera.', 'Por cogerte la mano cuando tenías miedo y no dejarte sola ni un momento.', 'hospital'],
  profe: ['Gracias, profe.', 'Por ver en ti algo que ni tú sabías que tenías. Eso no se olvida nunca.', 'school'],
  medica: ['Gracias, doctora.', 'Por contarte la verdad con calma y quedarse a tu lado mientras la escuchabas.', 'hospital'],
  bombero: ['Gracias, bombera.', 'Por correr hacia el fuego cuando todos huían, para que tú pudieras volver a casa.', 'fire'],
  psico: ['Gracias, psicóloga.', 'Por ayudarte a ponerle palabras a lo que dolía y a volver a respirar.', 'heart'],
  bus: ['Gracias, conductor.', 'Por llevarte de vuelta a casa cada noche, también las que llovía y estabas rota.', 'bus'],
  monitora: ['Gracias, monitora.', 'Por enseñarte que se puede volver a intentar, largo tras largo.', 'swim'],
  barrendera: ['Gracias, compañero.', 'Por cuidar tu calle cada madrugada sin que nadie le vea.', 'lamp']
};

export const GRP_ICO = { Sanidad: 'hospital', Educación: 'school', Protección: 'hands', Vivienda: 'house', Transporte: 'bus', Cultura: 'music', Deporte: 'swim', Emergencias: 'fire' };

export const CLUB = {
  Vivienda: ['Club Llave', 'Tener techo a un precio justo no debería ser suerte. Este año, lo público te ha echado una mano con la llave.'],
  Educación: ['Club Pupitre', 'Cada curso, cada clase, cada profe. Tu futuro, y el de los tuyos, lo pagamos entre todos.'],
  Emergencias: ['Club de Guardia', 'Cuando el fuego o el agua llegaron, alguien llegó antes. Eso es lo público.'],
  Deporte: ['Club Vestuario', 'Polideportivo, piscina, pista. Tu forma de cuidarte también es pública.'],
  Cultura: ['Club Primera Fila', 'Museos, conciertos, fiestas. Vives la cultura más que la mayoría.'],
  Transporte: ['Club Andén', 'Cientos de viajes al año. Tu ciudad se mueve, y tú con ella.'],
  Protección: ['Club Red', 'Cuando más falta hacía, había una red debajo. Eso también es lo público.'],
  Sanidad: ['Club Bata Blanca', 'Este año te ha tocado cuidarte, y alguien ha estado ahí cada vez.']
};
// Peso de cada grupo al elegir club (equilibra para que no gane siempre la sanidad)
export const CLUB_W = { Vivienda: 6, Educación: 1.6, Emergencias: 9, Deporte: 2.4, Cultura: 2.6, Transporte: 1.6, Protección: 1, Sanidad: 0.6 };

// Versión B: clubes por etapa (emancipación media 30,2 años; primer hijo 31,5 años)
export const CLUB_B = {
  'Club Pupitre': ['school', 'Tu vida pública ahora se mide en cursos. Cada uno, 7.943 € que ponemos entre todos.'],
  'Club Primera Fila': ['music', 'Es la edad en la que más cultura se vive: conciertos, museos, fiestas. Y la de la carrera o la FP.'],
  'Club Llave': ['house', 'En España la gente se emancipa, de media, a los 30,2 años. Es la edad del primer alquiler y de la ayuda al alquiler joven.'],
  'Club Cuna': ['baby', 'El primer hijo llega, de media, a los 31,5 años. Con él, el pediatra, la escuela infantil y las 19 semanas de permiso.'],
  'Club Bata Blanca': ['hospital', 'El centro de salud ya forma parte de tu agenda, y tus hijos ya tiran de instituto y universidad.'],
  'Club Red': ['hands', 'Pensión, médico, centro de mayores: lo que aportaste toda la vida ahora te sostiene.']
};


// Pasa las respuestas condensadas a las variables que usa el cálculo.
export function deriveA(A) {
  const D = { ...A };
  const n = D.nhijos || 0;
  const u = D.hijosUso || [];
  D.hijos = n > 0 ? 1 : 0;
  if (D.hijos) {
    D.infantil = u.includes('infantil') ? 1 : 0;
    D.cole = u.includes('cole') ? n : 0;
    D.extra = u.includes('extra') ? 1 : 0;
    D.pediatra = u.includes('pediatra') ? 6 : 0;
    D.bebe = u.includes('bebe') ? 1 : 0;
  }
  const v = D.visitas || 0;
  D.medico = Math.round(v * 0.65);
  D.esp = Math.round(v * 0.35);
  const s2 = D.salud2 || [];
  D.gordo = s2.includes('urg') && s2.includes('ing') ? 'ambas' : s2.includes('urg') ? 'urg' : s2.includes('ing') ? 'ing' : '';
  D.psico = s2.includes('psico') ? 8 : 0;
  const c = (D.cultura || []).filter((x) => x !== 'none').length;
  D.culturaN = c === 0 ? 0 : c === 1 ? 2 : c <= 3 ? 7 : 14;
  return D;
}
