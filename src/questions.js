// Preguntas de la versión A, con ramas (`when`) y opciones dinámicas.
export const isStudent = (a) => a.sit === 'estudio' || a.sit === 'ambos';
const upTo = (n) => [['Ninguno', 0], ['Uno', 1], ['Dos', 2], ['Tres', 3]].slice(0, (n || 1) + 1);

export const Q = [
  { k: 'ciudad', s: 'Sobre ti', i: 'city', t: '¿Dónde vives?', o: [['Madrid', 'madrid'], ['Barcelona', 'barcelona'], ['Bilbao', 'bilbao'], ['Vitoria-Gasteiz', 'vitoria'], ['En otra ciudad o pueblo', 'otra']] },
  { k: 'edad', s: 'Sobre ti', i: 'heart', t: '¿Cuántos años tienes?', o: [['16 o 17', 17], ['18 a 24', 21], ['25 a 30', 28], ['31 a 38', 34], ['39 a 45', 42], ['46 a 64', 55], ['65 o más', 70]] },
  { k: 'sit', s: 'Sobre ti', i: 'hands', t: '¿Qué haces ahora mismo?', o: (a) => [['Estudio', 'estudio'], ['Trabajo', 'trabajo'], ['Estudio y trabajo', 'ambos'], ['Busco trabajo', 'paro'], ['Cuido de mi casa o familia', 'casa']].concat(a.edad >= 55 ? [['Estoy jubilado o jubilada', 'jubilado']] : []) },
  { k: 'estudia', s: 'Tus estudios', i: 'cap', when: isStudent, t: '¿Dónde estudias?', o: [['Instituto público (ESO o Bachillerato)', 'inst'], ['FP pública', 'fp'], ['Universidad pública', 'uni'], ['En un centro privado o concertado', 'otra']] },
  { k: 'paro', s: 'Tu trabajo', i: 'hands', when: (a) => a.sit === 'paro', t: '¿Cuántos meses has cobrado paro o subsidio este año?', o: [['Ninguno', 0], ['1 a 3', 2], ['4 a 6', 5], ['7 a 12', 10]] },
  { k: 'pension', s: 'Tu pensión', i: 'hands', when: (a) => a.sit === 'jubilado', t: '¿Cobras una pensión?', two: true, o: [['Sí', 1], ['No', 0]] },
  { k: 'estudios', s: 'Tus estudios', i: 'school', when: (a) => !isStudent(a), multi: true, t: '¿Dónde estudiaste?', sub: 'Marca todo lo que corresponda.', o: [['Colegio o instituto público', 'cole'], ['FP pública', 'fp'], ['Universidad pública', 'uni'], ['Nada de esto', 'none']] },
  { k: 'vivienda', s: 'Tu casa', i: 'house', t: '¿Cómo vives?', o: [['Con mi familia', 'familia'], ['De alquiler', 'alquiler'], ['En un piso compartido', 'compartido'], ['En una vivienda pública o protegida', 'publica'], ['En una casa en propiedad', 'propiedad']] },
  { k: 'bono', s: 'Tu casa', i: 'house', when: (a) => (a.vivienda === 'alquiler' || a.vivienda === 'compartido') && a.edad <= 34, t: '¿Te ha llegado el Bono Alquiler Joven?', sub: 'Hasta 250 € al mes para menores de 36 años.', two: true, o: [['Sí', 1], ['No', 0]] },
  { k: 'adultos', s: 'Tu casa', i: 'house', t: '¿Cuántos adultos vivís en casa?', sub: 'Contándote a ti.', o: [['Solo yo', 1], ['Dos', 2], ['Tres', 3], ['Cuatro o más', 4]] },
  { k: 'hijos', s: 'Tu familia', i: 'baby', when: (a) => a.edad >= 21, t: '¿Tienes hijos que vivan contigo?', two: true, o: [['Sí', 1], ['No', 0]] },
  { k: 'nhijos', s: 'Tus hijos', i: 'baby', when: (a) => a.hijos === 1, t: '¿Cuántos?', o: [['Uno', 1], ['Dos', 2], ['Tres o más', 3]] },
  { k: 'bebe', s: 'Tus hijos', i: 'baby', when: (a) => a.hijos === 1, t: '¿Ha nacido alguno este año?', two: true, o: [['Sí', 1], ['No', 0]] },
  { k: 'infantil', s: 'Tus hijos', i: 'baby', when: (a) => a.hijos === 1, t: '¿Cuántos van a una escuela infantil pública?', sub: 'De 0 a 3 años.', o: (a) => upTo(a.nhijos) },
  { k: 'cole', s: 'Tus hijos', i: 'school', when: (a) => a.hijos === 1, t: '¿Cuántos van a un colegio o instituto público?', o: (a) => upTo(a.nhijos) },
  { k: 'extra', s: 'Tus hijos', i: 'ball', when: (a) => a.hijos === 1, t: '¿Cuántos hacen extraescolares o escuela deportiva municipal?', sub: 'Fútbol, natación, música, robótica…', o: (a) => upTo(a.nhijos) },
  { k: 'pediatra', s: 'Tus hijos', i: 'hospital', when: (a) => a.hijos === 1, t: '¿Cuántas veces habéis ido al pediatra este año?', sub: 'Sumando a todos.', o: [['Ninguna', 0], ['1 a 3', 2], ['4 a 8', 6], ['Más de 8', 10]] },
  { k: 'medico', s: 'Tu salud', i: 'hospital', t: '¿Cuántas veces has ido al médico de familia?', sub: 'Este año, contando llamadas.', o: [['Ninguna', 0], ['1 a 3', 2], ['4 a 10', 7], ['Más de 10', 12]] },
  { k: 'esp', s: 'Tu salud', i: 'hospital', t: '¿Y al especialista o a hacerte pruebas?', sub: 'Dermatólogo, ginecóloga, análisis, radiografías…', o: [['Ninguna', 0], ['1 o 2', 2], ['3 a 5', 4], ['Más de 5', 7]] },
  { k: 'psico', s: 'Tu salud', i: 'heart', t: '¿Has ido al psicólogo o al psiquiatra por la pública?', sub: 'Nadie más lo verá. Se queda en tu móvil.', o: [['No', 0], ['1 a 5 sesiones', 3], ['6 a 15', 10], ['Más de 15', 20]] },
  { k: 'gordo', s: 'Tu salud', i: 'hospital', t: '¿Este año te ha tocado algo gordo?', o: [['Nada', ''], ['Urgencias', 'urg'], ['Una operación o un ingreso', 'ing'], ['Las dos cosas', 'ambas']] },
  { k: 'emerg', s: 'Emergencias', i: 'fire', t: '¿Te han ayudado bomberos, protección civil o la UME?', o: [['No, por suerte', ''], ['Un incendio forestal cerca de casa', 'incendio'], ['Una inundación o una DANA', 'dana'], ['Otra emergencia (incendio en casa, accidente…)', 'otra']] },
  { k: 'transp', s: 'Tu día a día', i: 'bus', t: '¿Usas el transporte público?', sub: 'Bus, metro, cercanías, tranvía.', o: [['Nunca', 'nunca'], ['Algunas veces al mes', 'aveces'], ['Casi a diario', 'diario']] },
  { k: 'deporte', s: 'Tu tiempo libre', i: 'swim', multi: true, t: '¿Qué deporte público haces?', sub: 'Marca todo lo que corresponda.', o: [['Gimnasio o piscina municipal', 'gym'], ['Un club o escuela deportiva municipal', 'club'], ['Pistas públicas (fútbol, pádel, calistenia…)', 'pistas'], ['Nada de esto', 'none']] },
  { k: 'cultura', s: 'Tu tiempo libre', i: 'music', multi: true, t: '¿Qué cultura pública has disfrutado este año?', sub: 'Marca todo lo que corresponda.', o: [['Un museo o una exposición', 'museo'], ['Teatro, danza o un concierto', 'escena'], ['Un monumento o yacimiento', 'patri'], ['Fiestas, cine de verano o actividades de tu ayuntamiento', 'fiestas'], ['Talleres o clubes en la biblioteca', 'biblio'], ['Nada de esto', 'none']] },
  { k: 'culturaN', s: 'Tu tiempo libre', i: 'music', when: (a) => a.cultura && a.cultura.length && a.cultura[0] !== 'none', t: '¿Cuántas veces en total?', o: [['1 a 3', 2], ['4 a 10', 7], ['Más de 10', 14]] },
  { k: 'worker', s: 'Una más', i: 'heart', t: '¿Qué trabajador público te ha marcado este año?', sub: 'No suma euros. Suma otra cosa.', o: [['Una enfermera o enfermero', 'enfermera'], ['Una profe', 'profe'], ['Una médica o médico', 'medica'], ['Una bombera o bombero', 'bombero'], ['La psicóloga', 'psico'], ['El conductor del autobús', 'bus'], ['La monitora del polideportivo', 'monitora'], ['Quien barre mi calle', 'barrendera']] }
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
