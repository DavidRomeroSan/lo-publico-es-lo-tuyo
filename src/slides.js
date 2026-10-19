// Construye las láminas (stories) de cada versión.
import { P, NOVES, US, FACTS, SITE } from './data.js';
import { ico, ROW } from './icons.js';
import { art } from './art.js';
import { isStudent, WORKER, GRP_ICO, CLUB, CLUB_B } from './questions.js';
import { pickFacts, randomFacts } from './compute.js';

export const eur = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' }).format(Math.round(n)) + ' €';
export const usd = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0, useGrouping: 'always' }).format(Math.round(n)) + ' $';
const int = (n) => new Intl.NumberFormat('es-ES', { useGrouping: 'always' }).format(Math.round(n));
const dec = (n) => new Intl.NumberFormat('es-ES', { maximumFractionDigits: 1 }).format(n);
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const Y = SITE.year;

const pctBars = (vida, vt) => `<div class="pct">${vida.filter((x) => x[1] > 0).sort((x, y) => y[1] - x[1]).map(([l, v]) => {
  const p = Math.round((v / vt) * 100);
  return `<div><div class="row"><span>${l}</span><span>${p}%</span></div><div class="track"><i style="width:${Math.max(3, p)}%"></i></div></div>`;
}).join('')}</div>`;

const factsBlock = (F) => `<div class="facts">${F.map(([i, b, t]) => `<div>${ico(i)}<span><b>${b}</b>${t}</span></div>`).join('')}</div>`;

const closing = `<div class="mosaic">${['hospital', 'school', 'bus', 'house', 'tree', 'fire'].map((k) => art(k, 'tile')).join('')}</div><h2 class="disp l">Antes de conocer el mundo, ya había algo cuidando de ti.</h2><p class="eyebrow">${SITE.lema}</p>`;

const cardSlide = `<p class="eyebrow acc">Compártelo</p><div class="cardtabs" id="cardTabs"></div><div id="cardBox" class="cardbox"><p class="small">Preparando tus tarjetas…</p></div>
  <div class="cardactions"><button class="btn" id="shareBtn" type="button">Compartir esta</button><button class="btn ghost" id="dlBtn" type="button">Descargar</button><button class="btn ghost" id="shareAllBtn" type="button">Compartir todas</button></div>`;
const pctLines = (vida, vt) => vida.filter((x) => x[1] > 0).sort((x, y) => y[1] - x[1]).slice(0, 5).map(([l, v]) => [l, Math.round((v / vt) * 100) + ' %']);

export function buildA(r, a) {
  const SL = [];
  const city = r.c.n;
  SL.push(['red', `${art('heart')}<p class="year">${Y}</p><h2 class="disp l">Tu año en lo público</h2><p>Lo hemos calculado con lo que nos has contado y con precios reales de ${city}.</p>`]);
  SL.push(['ink', `${art('lamp')}<p class="eyebrow">Este año</p><p class="big">${int(r.veces)}</p><p>veces que lo público ha estado ahí: te ha atendido, te ha llevado, te ha enseñado, te ha cuidado. Y cada día ha encendido tu calle y ha recogido tu basura.</p>`]);

  if (a.emerg) {
    const t = {
      incendio: ['El fuego llegó cerca de casa.', 'Y antes llegaron ellos: bomberos forestales, brigadas, medios aéreos. Gente que se juega la vida por lo tuyo.'],
      dana: ['El agua entró donde no debía.', 'Y llegaron ellos: bomberos, UME, protección civil. Achicando, rescatando, sin mirar el reloj.'],
      otra: ['Pasó algo que nadie espera.', 'Y en minutos había alguien llamando a tu puerta para ayudarte.']
    }[a.emerg];
    SL.push(['red', `${art('fire')}<p class="eyebrow">Este año te salvaron</p><h2 class="disp l">${t[0]}</h2><p>${t[1]}</p><p class="small">Lo que vale eso no cabe en una cifra.</p>`]);
  }

  {
    const T = r.top; const top = T[0];
    const money = (x) => (x.est ? '≈ ' : '') + eur(x.v);
    SL.push(['white', `${art(GRP_ICO[top.grp] || 'heart')}<p class="eyebrow acc">Tu nº 1 del año</p><h2 class="disp xl">${top.label}</h2><p>${top.est ? `Es lo que lo público pone por ti cada año, lo notes o no: <b class="acc">${money(top)}</b>.` : `Sin lo público, solo esto te habría costado <b class="acc">${eur(top.v)}</b> en ${city}.`}</p>`]);
    const max = T[0].v; const sum = T.reduce((t, x) => t + x.v, 0);
    SL.push(['red', `<p class="eyebrow">Lo más importante</p><h2 class="disp l">Tu top 5 de lo público</h2><ol class="rank">${T.map((x, i) => `<li class="${i === 0 ? 'first' : ''}"><span class="n">${i + 1}</span>${ico(GRP_ICO[x.grp] || 'heart')}<span class="name">${x.label}</span><span class="eur">${money(x)}</span><span class="bar"><i style="width:${Math.max(6, Math.sqrt(x.v / max) * 100)}%"></i></span></li>`).join('')}</ol><p class="lg">Entre los cinco: <b class="acc">${eur(sum)}</b> al año.</p><p class="small">Precios privados de ${city}. Con ≈, estimación con el gasto público medio por persona (IGAE 2024).</p>`]);
  }

  SL.push(['ink', `${art('city')}<p class="eyebrow">Lo que no ves</p><p class="big m">${eur(NOVES)}</p><p>pone lo público cada año por ti en cosas que usas sin darte cuenta.</p><div class="split"><div><span>Seguridad, bomberos y emergencias</span><span>${eur(P.seguridad)}</span></div><div><span>Agua, alumbrado, residuos y medio ambiente</span><span>${eur(P.ciudad)}</span></div><div><span>Cultura, ocio y deporte</span><span>${eur(P.ocio)}</span></div></div><p class="small">Gasto público por habitante en 2024 (IGAE).</p>`]);

  SL.push(['pink', `${art('city', 'sm')}<p class="eyebrow acc">Lo público ha mejorado</p>${factsBlock(pickFacts(a, r))}`]);

  const cl = CLUB[r.club];
  SL.push(['ink', `${art(GRP_ICO[r.club] || 'heart')}<p class="eyebrow">Tu club</p><h2 class="disp xl"><span class="acc">${cl[0]}</span></h2><p>${cl[1]}</p>`]);

  if (a.hijos && (a.cole || a.infantil)) {
    const vidaHijo = 3 * P.infantil * r.c.f + 15 * P.colePriv * r.c.f;
    const n = Math.max(1, (a.cole || 0) + (a.infantil || 0));
    SL.push(['red', `${art('school')}<p class="eyebrow">Tus hijos en lo público</p><p class="big m">${eur(vidaHijo)}</p><p>te costaría criar a cada hijo en la privada en ${city}, de los 0 a los 18, solo en escuela infantil y colegio.</p>${n > 1 ? `<p>Con ${n} en la pública: <b class="acc">${eur(n * vidaHijo)}</b>.</p>` : ''}`]);
  }

  if (a.pensF || a.dep) {
    SL.push(['ink', `${art('hands')}<p class="eyebrow">Los tuyos</p>${a.pensF ? `<p class="big m">${eur(r.famV)}</p><p>pone lo público cada año en las pensiones de tu familia (${a.pensF}), con la pensión media de jubilación.</p>` : '<h2 class="disp xl">No están solos</h2>'}${a.dep ? `<p>${a.pensF ? 'Y en' : 'En'} los cuidados: 1,65 millones de personas reciben ya una prestación de dependencia. Es la cifra más alta de la historia.</p>` : ''}<p class="small">Pensión media de jubilación, abril de 2026. Beneficiarios de dependencia, primer trimestre de 2026.</p>`]);
  }

  if (a.worker === 'otro' && a.workerTxt) {
    SL.push(['white', `${art('heart')}<p class="eyebrow acc">Tu persona del año</p><h2 class="disp l">${esc(a.workerTxt)}</h2><p class="lg">No suma euros. Suma otra cosa. Y está ahí porque lo sostenemos entre todos.</p>`]);
  } else {
    const w = WORKER[a.worker] || WORKER.enfermera;
    SL.push(['white', `${art(w[2])}<p class="eyebrow acc">Tu persona del año</p><h2 class="disp l">${w[0]}</h2><p class="lg">${w[1]}</p>`]);
  }

  SL.push(['red', `${art('heart', 'sm')}<p class="year">${Y}</p><p class="eyebrow">Lo público te ha salvado de pagar</p><p class="big m">${eur(r.personal)}</p><p>este año, solo a ti. Sin lo público, esto habría salido de tu bolsillo.</p>`]);
  if ((a.adultos || 1) > 1 || r.kids > 0 || r.famV > 0) {
    SL.push(['pink', `${art('house')}<p class="eyebrow acc">Y a tu casa</p><p class="big m acc-text">${eur(r.casa)}</p><div class="split"><div><span>Tú</span><span>${eur(r.personal)}</span></div>${Object.values(r.K).map((x) => `<div><span>${x.label}</span><span>${eur(x.v)}</span></div>`).join('')}${r.famV ? `<div><span>Pensiones de tu familia (${a.pensF})</span><span>${eur(r.famV)}</span></div>` : ''}${r.otros ? `<div><span>${r.otros} adulto${r.otros > 1 ? 's' : ''} más (gasto público medio)</span><span>${eur(r.otrosV)}</span></div>` : ''}</div>`]);
  }

  const vt = r.vidaTotal;
  SL.push(['ink', `${art('book', 'sm')}<p class="eyebrow">Tus ${a.edad} años en lo público</p><p class="big m">${eur(vt)}</p><p>ha puesto lo público por ti desde que naciste.</p>${pctBars(r.vida, vt)}<p class="small">Gasto público medio por persona y año, más tus años de estudio en la pública.</p>`]);

  const us = [];
  const fam = (a.adultos || 1) > 1 || a.hijos;
  us.push([fam ? 'Seguro médico de tu familia, cada año' : 'Tu seguro médico, cada año', fam ? US.seguroFam : US.seguro]);
  if ((isStudent(a) && a.estudia === 'uni') || (a.estudios || []).includes('uni') || a.edad <= 24) us.push(['Una carrera en una universidad privada (4 años)', 4 * US.uniPriv]);
  if (a.infantil) us.push([`Guardería (${a.infantil}), cada año`, a.infantil * US.guarde]);
  if (a.bebe) us.push(['Un parto sin seguro (mediana)', US.parto]);
  const usT = us.reduce((s, x) => s + x[1], 0);
  SL.push(['red', `${art('hospital', 'sm')}<p class="eyebrow">Si vivieras en Estados Unidos</p><p class="big m">${usd(usT)}</p><div class="split">${us.map(([l, v]) => `<div><span>${l}</span><span>${usd(v)}</span></div>`).join('')}</div>${a.bebe ? '<p>Y de permiso pagado por nacimiento, por ley federal: cero semanas. Aquí son 19 por progenitor.</p>' : ''}<p class="small">Seguro: prima media de empresa (KFF 2025). Universidad: matrícula media en privadas (College Board 2025-26).</p>`]);

  SL.push(['red', closing]);
  SL.push(['white', cardSlide]);

  const foot = `Precios privados de ${city} y gasto público medio`;
  const cards = [
    { id: 'mi-ano', label: 'Mi año', eyebrow: 'Lo público me ha salvado de pagar', total: eur(r.personal), lines: r.top.slice(0, 4).map((x) => [x.label, (x.est ? '≈ ' : '') + eur(x.v)]), tag: cl[0], icons: [GRP_ICO[r.club] || 'heart'], foot },
    { id: 'mi-top5', label: 'Mi top 5', eyebrow: 'Mi top 5 de lo público', total: eur(r.top.reduce((t, x) => t + x.v, 0)), lines: r.top.map((x) => [x.label, (x.est ? '≈ ' : '') + eur(x.v)]), tag: 'Mi top 5', icons: [GRP_ICO[r.top[0].grp] || 'heart'], foot },
    { id: 'mi-vida', label: 'Mi vida', eyebrow: `Mis ${a.edad} años en lo público`, total: eur(vt), lines: pctLines(r.vida, vt), tag: 'Desde que nací', icons: ['book'], foot: 'Gasto público medio por persona y año' },
    { id: 'eeuu', label: 'EE. UU.', eyebrow: 'Si viviera en Estados Unidos', total: usd(usT), lines: us.slice(0, 4).map(([l, v]) => [l, usd(v)]), tag: 'Aquí no lo pago', icons: ['hospital'], foot: 'KFF 2025 y College Board 2025-26' }
  ];
  return { slides: SL, cards };
}

export function buildB(r) {
  const SL = [];
  const n = esc(r.name);
  const vt = r.vidaTotal;
  const cb = CLUB_B[r.club];
  const quien = r.sex === 'mujer' ? `Las mujeres de ${r.age} años` : r.sex === 'hombre' ? `Los hombres de ${r.age} años` : `La gente de ${r.age} años`;
  SL.push(['red', `${art('heart')}<p class="year">${Y}</p><h2 class="disp l">${n}, esta es tu vida en lo público</h2><p>Lo hemos estimado con las medias de gente como tú.</p>`]);
  SL.push(['ink', `${art('hands')}<p class="eyebrow">En tus ${r.age} años</p><p class="big m">${eur(vt)}</p><p>ha puesto lo público por ti desde que naciste.</p>`]);
  SL.push(['pink', `${art('book', 'sm')}<p class="eyebrow acc">Lo que más has usado</p>${pctBars(r.vida, vt)}<p class="small">Reparto de lo que lo público ha puesto por ti, de los 0 a los ${r.age} años.</p>`]);
  const vs = Math.round((r.visitas / 5.1 - 1) * 100);
  SL.push(['white', `${art('hospital')}<p class="eyebrow acc">Gente como tú</p><p class="big m acc-text">${dec(r.visitas)}</p><p>visitas al médico de familia al año. ${quien} van un ${Math.abs(vs)} % ${vs >= 0 ? 'más' : 'menos'} que la media española.</p><p class="small">Estimación orientativa por edad y sexo.</p>`]);
  const facts = randomFacts(3, { prefer: r.age <= 24 ? 'Educación' : 'Sanidad' });
  SL.push(['pink', `<p class="eyebrow acc">Lo público ha mejorado</p>${factsBlock(facts)}`]);
  SL.push(['ink', `${art(cb[0])}<p class="eyebrow">Tu club</p><h2 class="disp xl"><span class="acc">${r.club}</span></h2><p>${cb[1]}</p>`]);
  if (r.serv) SL.push(['white', `${art('heart')}<p class="eyebrow acc">Tu servicio favorito</p><h2 class="disp l">«${esc(r.serv)}»</h2><p>No lo cambiarías por nada. Y está ahí porque lo sostenemos entre todos.</p>`]);
  SL.push(['red', `${art('heart', 'sm')}<p class="year">${Y}</p><p class="eyebrow">Este año, lo público ha puesto por ti</p><p class="big m">${eur(r.year)}</p><div class="split"><div><span>Tenerte cubierto en sanidad</span><span>${eur(P.saludPC)}</span></div>${r.enCole ? `<div><span>Tu plaza en el instituto</span><span>${eur(P.alumno)}</span></div>` : ''}<div><span>Seguridad y emergencias</span><span>${eur(P.seguridad)}</span></div><div><span>Agua, alumbrado y residuos</span><span>${eur(P.ciudad)}</span></div><div><span>Cultura y deporte</span><span>${eur(P.ocio)}</span></div></div>`]);
  const us = [];
  if (r.age < 26) { us.push(['Una carrera en una universidad privada (4 años)', 4 * US.uniPriv]); us.push(['Tu seguro médico desde los 26, cada año', US.seguro]); }
  else { us.push([`Tu seguro médico de los 26 a los ${r.age}`, (r.age - 26 + 1) * US.seguro]); us.push(['Una carrera en una universidad privada (4 años)', 4 * US.uniPriv]); }
  const usT = us.reduce((s, x) => s + x[1], 0);
  SL.push(['ink', `${art('hospital', 'sm')}<p class="eyebrow">Si vivieras en Estados Unidos</p><p class="big m">${usd(usT)}</p><div class="split">${us.map(([l, v]) => `<div><span>${l}</span><span>${usd(v)}</span></div>`).join('')}</div><p class="small">Allí puedes estar en el seguro de tus padres hasta los 26. Después, 9.325 $ al año de media (KFF 2025). Matrícula privada media: 45.000 $ al año (College Board).</p>`]);
  SL.push(['red', closing]);
  SL.push(['white', cardSlide]);

  const split = [['Sanidad', P.saludPC], ['Seguridad y emergencias', P.seguridad], ['Agua, alumbrado y residuos', P.ciudad], ['Cultura y deporte', P.ocio]];
  const cards = [
    { id: 'mi-ano', label: 'Mi año', eyebrow: `${r.name.slice(0, 20)} · este año`, total: eur(r.year), lines: split.map(([l, v]) => [l, eur(v)]), tag: r.club, icons: [cb[0]], foot: 'Estimación con gasto público medio' },
    { id: 'mi-vida', label: 'Mi vida', eyebrow: `${r.name.slice(0, 20)} · mi vida en lo público`, total: eur(vt), lines: [...pctLines(r.vida, vt), ...(r.serv ? [['No lo cambio', r.serv.slice(0, 26)]] : [])].slice(0, 5), tag: 'Desde que nací', icons: ['book'], foot: 'Estimación con gasto público medio' },
    { id: 'eeuu', label: 'EE. UU.', eyebrow: 'Si viviera en Estados Unidos', total: usd(usT), lines: us.map(([l, v]) => [l, usd(v)]), tag: 'Aquí no lo pago', icons: ['hospital'], foot: 'KFF 2025 y College Board' }
  ];
  return { slides: SL, cards };
}
