// Cálculos puros (sin DOM). Probados en tests/compute.test.js
import { CITY, P, NOVES, VPO_DESCUENTO, VPO_M2, MEDIA_MEDICO, FACTS } from './data.js';
import { isStudent, CLUB_W } from './questions.js';

export function computeA(a) {
  const c = CITY[a.ciudad] || CITY.otra;
  const f = c.f;
  const age = a.edad;
  const L = {};
  const add = (k, label, v, grp) => { if (v > 0) L[k] = { label, v: Math.round(v), grp }; };

  add('medico', 'Médico de familia', (a.medico || 0) * P.medico * f, 'Sanidad');
  add('esp', 'Especialistas y pruebas', (a.esp || 0) * P.esp * f, 'Sanidad');
  add('psico', 'Salud mental', (a.psico || 0) * P.psico * f, 'Sanidad');
  add('hosp', 'Urgencias y hospital', (({ urg: P.urg, ing: P.ingreso, ambas: P.urg + P.ingreso })[a.gordo] || 0) * f, 'Sanidad');
  if (isStudent(a)) {
    if (a.estudia === 'inst') add('estud', 'Tu instituto', P.colePriv * f, 'Educación');
    if (a.estudia === 'fp') add('estud', 'Tu FP', P.alumno, 'Educación');
    if (a.estudia === 'uni') add('estud', 'Tu universidad', P.uniPriv * f - c.mat, 'Educación');
  }
  add('paro', 'Tu prestación por desempleo', (a.paro || 0) * P.paro, 'Protección');
  add('pension', 'Tu pensión', (a.pension || 0) * P.pension, 'Protección');
  add('bono', 'Bono Alquiler Joven', (a.bono || 0) * P.bono, 'Vivienda');
  if (a.vivienda === 'publica') add('vpo', 'Tu vivienda pública', c.m2 * VPO_M2 * 12 * VPO_DESCUENTO, 'Vivienda');
  if (a.bebe) {
    add('parto', 'El parto', P.parto * f, 'Sanidad');
    if (a.sit === 'trabajo' || a.sit === 'ambos') add('permiso', 'Tu permiso por nacimiento', P.permiso, 'Protección');
  }
  add('transp', 'Transporte público', ({ aveces: 240, diario: 720 })[a.transp] || 0, 'Transporte');
  const dep = a.deporte || [];
  add('deporte', 'Deporte público', (dep.includes('gym') ? P.gym : 0) + (dep.includes('club') ? P.club : 0) + (dep.includes('pistas') ? P.pistas : 0), 'Deporte');
  add('cultura', 'Cultura pública', ({ 2: 395, 7: 790, 14: 1380 })[a.culturaN] || 0, 'Cultura');
  add('noves', 'Lo que no ves', NOVES, 'Ciudad');
  const personal = Object.values(L).reduce((s, x) => s + x.v, 0);

  const K = {};
  if (a.hijos) {
    if (a.infantil) K.infantil = { label: `Escuela infantil (${a.infantil})`, v: Math.round(a.infantil * P.infantil * f) };
    if (a.cole) K.cole = { label: `Cole e instituto (${a.cole})`, v: Math.round(a.cole * P.colePriv * f) };
    if (a.extra) K.extra = { label: `Extraescolares y deporte (${a.extra})`, v: Math.round(a.extra * P.extra * f) };
    if (a.pediatra) K.pediatra = { label: 'Pediatría', v: Math.round(a.pediatra * P.pediatra * f) };
    const nk = a.nhijos || 0;
    if (nk) K.base = { label: `Lo que no ven tus hijos (${nk})`, v: nk * (P.saludPC + NOVES) };
  }
  const kids = Object.values(K).reduce((s, x) => s + x.v, 0);
  const otros = Math.max(0, (a.adultos || 1) - 1);
  const otrosV = otros * (P.saludPC + NOVES);
  const casa = personal + kids + otrosV;

  // Club: grupo con más peso ponderado
  const G = {};
  Object.values(L).forEach((x) => { if (x.grp !== 'Ciudad') G[x.grp] = (G[x.grp] || 0) + x.v; });
  if (a.hijos) {
    G.Educación = (G.Educación || 0) + (K.cole ? K.cole.v : 0) + (K.infantil ? K.infantil.v : 0);
    G.Deporte = (G.Deporte || 0) + (K.extra ? K.extra.v : 0);
  }
  if (a.emerg) G.Emergencias = 1e7;
  let club = 'Sanidad'; let best = -1;
  Object.entries(G).forEach(([g, v]) => { const sc = v * (CLUB_W[g] || 1); if (sc > best) { best = sc; club = g; } });

  // Veces que lo público ha estado ahí (365 = servicios diarios: agua, alumbrado, recogida)
  const veces = (a.medico || 0) + (a.esp || 0) + (a.psico || 0) + ({ urg: 1, ing: 1, ambas: 2 }[a.gordo] || 0)
    + ({ aveces: 80, diario: 440 }[a.transp] || 0) + (a.culturaN || 0)
    + (dep.includes('gym') ? 60 : 0) + (dep.includes('club') ? 70 : 0) + (dep.includes('pistas') ? 25 : 0)
    + (a.pediatra || 0) + (isStudent(a) && a.estudia !== 'otra' ? 175 : 0) + (a.cole || 0) * 175 + (a.extra || 0) * 70 + 365;

  // Toda la vida: gasto público medio por persona y año + años de estudio en la pública
  const studiedCole = isStudent(a) ? a.estudia !== 'otra' : (a.estudios || []).includes('cole');
  const yearsCole = studiedCole ? Math.max(0, Math.min(age, 18) - 3) : 0;
  let yearsFP = 0; let yearsUni = 0;
  if (isStudent(a) && a.estudia === 'fp') yearsFP = 1;
  if (isStudent(a) && a.estudia === 'uni') yearsUni = Math.max(1, Math.min(4, age - 18));
  if (!isStudent(a) && (a.estudios || []).includes('fp')) yearsFP = 2;
  if (!isStudent(a) && (a.estudios || []).includes('uni')) yearsUni = 4;
  const yTrans = Math.max(0, age - 12);
  const vida = [
    ['Educación', (yearsCole + yearsFP) * P.alumno + yearsUni * P.uniPublica],
    ['Sanidad', age * P.saludPC + P.parto],
    ['Seguridad y emergencias', age * P.seguridad],
    ['Calles, agua y medio ambiente', age * P.ciudad],
    ['Cultura y deporte', age * P.ocio],
    ['Transporte público', yTrans * ({ aveces: 240, diario: 720 }[a.transp] || 120)]
  ];
  if (a.pension) vida.push(['Pensiones', P.pension * Math.max(1, age - 66)]);
  if (a.vivienda === 'publica') vida.push(['Vivienda', L.vpo.v]);
  const vidaTotal = vida.reduce((s, x) => s + x[1], 0);

  const ranked = Object.entries(L).filter(([k, x]) => x.v > 0 && k !== 'noves').sort((x, y) => y[1].v - x[1].v);
  return { c, L, ranked, personal, K, kids, otros, otrosV, casa, veces, vida, vidaTotal, club, G };
}

export function pickFacts(a, r) {
  const out = [];
  const push = (k) => { if (FACTS[k] && !out.includes(k)) out.push(k); };
  if (a.emerg) push('Emergencias');
  const order = Object.entries(r.G)
    .sort((x, y) => y[1] * (CLUB_W[y[0]] || 1) - x[1] * (CLUB_W[x[0]] || 1))
    .map((x) => x[0]);
  order.forEach((g) => { if (g === 'Vivienda') push(a.bono ? 'ViviendaBono' : 'Vivienda'); else push(g); });
  if (a.bebe) push('Protección');
  push('Sanidad'); push('Educación'); push('Medio');
  return out.slice(0, 3).map((k) => FACTS[k]);
}

// ---- Versión B ----
// Curva de uso sanitario por edad y sexo: supuesto anclado a la media de 5,1 visitas.
const curve = (age) => (age < 15 ? 0.8 : age < 30 ? 0.55 : age < 45 ? 0.75 : age < 65 ? 1.0 : age < 75 ? 1.6 : 2.2);
const sexF = (age, sex) => (age < 15 || age >= 75 || sex === 'nd' ? 1 : sex === 'mujer' ? 1.15 : 0.85);

export function stageB(age) {
  if (age <= 17) return 'Club Pupitre';
  if (age <= 24) return 'Club Primera Fila';
  if (age <= 30) return 'Club Llave';
  if (age <= 45) return 'Club Cuna';
  if (age <= 64) return 'Club Bata Blanca';
  return 'Club Red';
}

export function computeB(name, sex, age, serv) {
  const visitas = MEDIA_MEDICO * curve(age) * sexF(age, sex);
  const yearsCole = Math.max(0, Math.min(age, 18) - 3);
  const enCole = age <= 18;
  const vida = [
    ['Educación', yearsCole * P.alumno],
    ['Sanidad', age * P.saludPC + P.parto],
    ['Seguridad y emergencias', age * P.seguridad],
    ['Calles, agua y medio ambiente', age * P.ciudad],
    ['Cultura y deporte', age * P.ocio]
  ];
  const vidaTotal = vida.reduce((s, x) => s + x[1], 0);
  const year = P.saludPC + NOVES + (enCole ? P.alumno : 0);
  return { name, sex, age, serv, visitas, vida, vidaTotal, year, club: stageB(age), enCole };
}
