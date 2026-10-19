import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FACTS } from '../src/data.js';
import { computeA, computeB, stageB, pickFacts, randomFacts } from '../src/compute.js';

const base = { ciudad: 'madrid', edad: 28, sit: 'trabajo', estudios: ['cole'], vivienda: 'familia', adultos: 1, medico: 0, esp: 0, psico: 0, gordo: '', emerg: '', transp: 'nunca', deporte: ['none'], cultura: ['none'], worker: 'profe' };

test('sin usar nada, el año incluye lo que no ves', () => {
  const r = computeA(base);
  assert.equal(r.personal, 1461);
  assert.equal(r.ranked.length, 0);
});

test('un incendio da siempre el Club de Guardia', () => {
  const r = computeA({ ...base, emerg: 'incendio', medico: 12, esp: 7 });
  assert.equal(r.club, 'Emergencias');
});

test('vivienda pública gana a la sanidad corriente', () => {
  const r = computeA({ ...base, vivienda: 'publica', medico: 7, esp: 2 });
  assert.equal(r.club, 'Vivienda');
});

test('universitaria en Madrid: carrera privada menos matrícula pública', () => {
  const r = computeA({ ...base, edad: 21, sit: 'estudio', estudia: 'uni' });
  assert.equal(r.L.estud.v, 15000 - 1620);
});

test('hijos suman al hogar', () => {
  const r = computeA({ ...base, edad: 34, hijos: 1, nhijos: 2, cole: 2, infantil: 0, extra: 0, pediatra: 0, adultos: 2 });
  assert.ok(r.casa > r.personal + 20000);
});

test('ciudad cambia los precios', () => {
  const m = computeA({ ...base, medico: 7 });
  const v = computeA({ ...base, ciudad: 'vitoria', medico: 7 });
  assert.ok(v.L.medico.v < m.L.medico.v);
});

test('etapas de la versión B', () => {
  assert.equal(stageB(16), 'Club Pupitre');
  assert.equal(stageB(22), 'Club Primera Fila');
  assert.equal(stageB(30), 'Club Llave');
  assert.equal(stageB(31), 'Club Cuna');
  const r = computeB('Ana', 'mujer', 30, '');
  assert.ok(r.vidaTotal > 200000);
});

test('sin ciudad se usa la media de las grandes ciudades', () => {
  const r = computeA({ ...base, ciudad: undefined, medico: 2 });
  assert.equal(r.c.n, 'las grandes ciudades');
});

test('las pensiones de la familia suman a la casa y no a ti', () => {
  const r = computeA({ ...base, pensF: 2 });
  assert.equal(r.personal, 1461);
  assert.equal(r.famV, 2 * 21976);
  assert.equal(r.casa, 1461 + 2 * 21976);
});

test('el top 5 siempre tiene cinco, ordenado y con una entrada por servicio', () => {
  const vacio = computeA(base);
  assert.equal(vacio.top.length, 5);
  const lleno = computeA({ ...base, visitas: 10, medico: 7, esp: 4, psico: 8, gordo: 'ambas', transp: 'diario', deporte: ['gym'], cultura: ['museo'], culturaN: 7, emerg: 'dana' });
  [vacio, lleno].forEach((r) => {
    for (let i = 1; i < r.top.length; i++) assert.ok(r.top[i - 1].v >= r.top[i].v);
    const g = r.top.map((x) => x.grp + x.label);
    assert.equal(new Set(g).size, g.length);
    assert.equal(r.top.filter((x) => x.grp === 'Sanidad').length <= 1, true);
  });
});

test('la batería tiene 15 datos y se eligen 3 de áreas distintas', () => {
  assert.equal(Object.keys(FACTS).length, 15);
  for (let i = 0; i < 50; i++) {
    const f = randomFacts(3, { prefer: 'Sanidad' });
    assert.equal(f.length, 3);
    assert.equal(f[0][3], 'Sanidad');
    assert.equal(new Set(f.map((x) => x[3])).size, 3);
  }
  assert.equal(pickFacts({}, computeA(base)).length, 3);
});
