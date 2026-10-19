import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';
import './style.css';

import { SITE, SOURCES } from './data.js';
import { artSvg, art, TILES, DEFS } from './art.js';
import { Q, deriveA } from './questions.js';
import { computeA, computeB } from './compute.js';
import { buildA, buildB, eur } from './slides.js';
import { drawCard, shareBlobs, downloadBlob } from './share.js';

document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${DEFS}</svg>`);
const $ = (id) => document.getElementById(id);
// Encoge el contenido de una pantalla hasta que quepa sin scroll (mínimo 55 %).
function fit(el) {
  if (!el || el.hidden) return;
  el.classList.add('measuring');
  el.style.setProperty('--fit', 1);
  let z = 1;
  while (el.scrollHeight > el.clientHeight && z > 0.55) { z = Math.round((z - 0.04) * 100) / 100; el.style.setProperty('--fit', z); }
  el.classList.remove('measuring');
}
const current = () => document.querySelector('.screen:not([hidden]) .slide') || document.querySelector('.screen:not([hidden])');
window.addEventListener('resize', () => fit(current()));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fit(current()));
const SCREENS = ['home', 'quiz', 'form', 'story', 'fuentes'];
let backFromSources = 'home';
function show(id) {
  SCREENS.forEach((s) => { $(s).hidden = s !== id; });
  const el = $(id); el.scrollTop = 0;
  const focusable = el.querySelector('h1, h2');
  if (focusable) { focusable.setAttribute('tabindex', '-1'); focusable.focus({ preventScroll: true }); }
  if (id !== 'fuentes' && id !== 'story') fit(el);
}

// ---------- Portada ----------
$('homeIcons').innerHTML = `<div class="track">${[...TILES, ...TILES].map((k) => art(k, 'tile')).join('')}</div>`;
$('homeYear').textContent = SITE.year;
(() => {
  const s = { edad: 34, sit: 'trabajo', estudios: ['cole', 'uni'], vivienda: 'alquiler', bono: 1, adultos: 2, hijos: 1, nhijos: 1, bebe: 0, infantil: 0, cole: 1, extra: 1, pediatra: 4, medico: 4, esp: 2, psico: 3, gordo: 'urg', emerg: '', transp: 'diario', deporte: ['gym'], cultura: ['museo', 'fiestas'], culturaN: 7, worker: 'profe' };
  $('sampleTotal').textContent = eur(computeA(s).vidaTotal);
})();
if (SITE.emisor) { $('emisor').textContent = `Promueve: ${SITE.emisor}`; $('emisor').hidden = false; }
$('srcList').innerHTML = SOURCES.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}</a></li>`).join('');

let mode = 'A';
$('startA').addEventListener('click', () => { mode = 'A'; A = {}; hist = []; qi = 0; show('quiz'); renderQ(); });
$('startB').addEventListener('click', () => { mode = 'B'; show('form'); });
document.querySelectorAll('[data-sources]').forEach((b) => b.addEventListener('click', () => { backFromSources = SCREENS.find((s) => !$(s).hidden) || 'home'; show('fuentes'); }));
$('srcBack').addEventListener('click', () => show(backFromSources));

// ---------- Versión A ----------
let A = {}; let hist = []; let qi = 0;
const applies = (q, a) => !q.when || q.when(a);
const nextIndex = (from) => { for (let i = from + 1; i < Q.length; i++) if (applies(Q[i], A)) return i; return -1; };
const remaining = () => { let n = 0; for (let i = qi; i < Q.length; i++) if (applies(Q[i], A)) n++; return n; };

function renderQ() {
  const q = Q[qi]; const done = hist.length; const total = done + remaining();
  $('qcount').textContent = `${done + 1} / ${total}`;
  $('qprog').style.width = `${(done / total) * 100}%`;
  $('qscope').textContent = q.s;
  $('qico').innerHTML = artSvg(q.i, '#FFE1E4');
  $('qtext').textContent = q.t;
  $('qsub').textContent = q.sub || ''; $('qsub').hidden = !q.sub;
  const opts = typeof q.o === 'function' ? q.o(A) : q.o;
  const box = $('qopts'); box.className = 'opts' + (q.two ? ' two' : ''); box.innerHTML = '';
  if (q.multi) {
    let sel = Array.isArray(A[q.k]) ? A[q.k].slice() : [];
    const go = document.createElement('button'); go.className = 'btn'; go.type = 'button'; go.textContent = 'Seguir';
    const sync = () => { box.querySelectorAll('.opt').forEach((b) => { const on = sel.includes(b.dataset.v); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); go.disabled = !sel.length; };
    opts.forEach(([l, v]) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'opt multi'; b.textContent = l; b.dataset.v = v;
      b.addEventListener('click', () => {
        if (v === 'none') sel = sel.includes('none') ? [] : ['none'];
        else { sel = sel.filter((x) => x !== 'none'); sel = sel.includes(v) ? sel.filter((x) => x !== v) : sel.concat(v); }
        sync();
      });
      box.appendChild(b);
    });
    go.addEventListener('click', () => { A[q.k] = sel; advance(); });
    box.appendChild(go); sync();
  } else {
    opts.forEach(([l, v]) => {
      const b = document.createElement('button'); b.type = 'button';
      b.className = 'opt' + (A[q.k] === v ? ' on' : ''); b.textContent = l;
      b.addEventListener('click', () => { A[q.k] = v; delete A.workerTxt; b.classList.add('on'); setTimeout(advance, 150); });
      box.appendChild(b);
    });
    if (q.open) {
      const row = document.createElement('div'); row.className = 'openrow';
      row.innerHTML = '<label for="qopen">O escribe el tuyo</label><div><input id="qopen" type="text" maxlength="40" placeholder="La bibliotecaria de mi barrio" autocomplete="off"><button class="btn" type="button" id="qopengo" disabled>Seguir</button></div>';
      box.appendChild(row);
      const inp = row.querySelector('input'); const go = row.querySelector('button');
      const submit = () => { const t = inp.value.trim(); if (!t) return; A[q.k] = 'otro'; A.workerTxt = t; advance(); };
      inp.addEventListener('input', () => { go.disabled = !inp.value.trim(); });
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
      go.addEventListener('click', submit);
    }
  }
  fit($('quiz'));
}
function advance() { hist.push(qi); const n = nextIndex(qi); if (n < 0) { finishA(); return; } qi = n; renderQ(); }
$('qback').addEventListener('click', () => { if (hist.length) { qi = hist.pop(); renderQ(); } else show('home'); });
function finishA() {
  Q.forEach((q) => { if (!applies(q, A)) delete A[q.k]; });
  const D = deriveA(A);
  startStory(buildA(computeA(D), D));
}

// ---------- Versión B ----------
let SEX = null;
document.querySelectorAll('.seg .opt').forEach((b) => b.addEventListener('click', () => {
  SEX = b.dataset.v;
  document.querySelectorAll('.seg .opt').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
}));
$('fback').addEventListener('click', () => show('home'));
$('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('fname').value.trim(); const age = parseInt($('fage').value, 10); const serv = $('fserv').value.trim(); const err = $('ferr');
  if (!name) { err.textContent = 'Escribe tu nombre para personalizar el resumen.'; err.hidden = false; $('fname').focus(); return; }
  if (!SEX) { err.textContent = 'Elige una opción de sexo. Puedes no decirlo.'; err.hidden = false; return; }
  if (Number.isNaN(age) || age < 14 || age > 99) { err.textContent = 'Escribe tu edad en años, entre 14 y 99.'; err.hidden = false; $('fage').focus(); return; }
  err.hidden = true;
  startStory(buildB(computeB(name, SEX, age, serv)));
});

// ---------- Stories ----------
let slides = []; let si = 0; let cards = []; let cardBlobs = []; let cardUrls = []; let ci = 0;
function startStory(res) { slides = res.slides; cards = res.cards; cardBlobs = []; cardUrls = []; ci = 0; si = 0; show('story'); renderSlide(); }

const BG = { red: 'var(--rojo)', ink: 'var(--tinta)', pink: 'var(--rosa)', white: 'var(--papel)' };
function renderSlide() {
  const [cls, html] = slides[si];
  $('slideHost').innerHTML = `<div class="slide ${cls}" aria-live="polite">${html}</div>`;
  const story = $('story');
  story.style.color = cls === 'white' || cls === 'pink' ? 'var(--tinta)' : 'var(--papel)';
  story.style.background = BG[cls];
  $('bars').innerHTML = slides.map((_, i) => `<span class="${i <= si ? 'done' : ''}"></span>`).join('');
  const last = si === slides.length - 1;
  $('tap').hidden = last;
  $('next').textContent = last ? 'Volver a empezar' : 'Siguiente';
  $('prev').textContent = si === 0 ? 'Cambiar respuestas' : 'Atrás';
  fit(document.querySelector('#slideHost .slide'));
  if (last) prepareCard();
}
async function prepareCard() {
  const box = $('cardBox');
  $('cardTabs').innerHTML = cards.map((c, i) => `<button type="button" class="tab" data-i="${i}" aria-pressed="${i === ci}">${c.label}</button>`).join('');
  $('cardTabs').querySelectorAll('.tab').forEach((t) => t.addEventListener('click', () => { ci = +t.dataset.i; showCard(); }));
  try {
    if (!cardBlobs.length) cardBlobs = await Promise.all(cards.map((c) => drawCard(c)));
    cardUrls = cardBlobs.map((b) => URL.createObjectURL(b));
    showCard();
  } catch (e) {
    box.innerHTML = '<p class="small">No hemos podido generar la imagen en este navegador. Haz una captura de pantalla.</p>';
  }
  const sh = $('shareBtn'); const dl = $('dlBtn'); const all = $('shareAllBtn');
  const names = () => cards.map((c) => `${c.id}-${SITE.year}`);
  if (sh) sh.onclick = async () => { if (cardBlobs.length) { const r = await shareBlobs([cardBlobs[ci]], [names()[ci]]); if (r === 'downloaded') toast('Imagen descargada. Súbela a tus stories.'); } };
  if (all) all.onclick = async () => { if (cardBlobs.length) { const r = await shareBlobs(cardBlobs, names()); if (r === 'downloaded') toast('Imágenes descargadas. Súbelas a tus stories.'); } };
  if (dl) dl.onclick = () => { if (cardBlobs.length) { downloadBlob(cardBlobs[ci], names()[ci]); toast('Imagen descargada.'); } };
}
function showCard() {
  const c = cards[ci];
  $('cardBox').innerHTML = `<img src="${cardUrls[ci]}" alt="Tu tarjeta de ${SITE.year}: ${c.eyebrow} ${c.total}." width="1080" height="1920">`;
  document.querySelectorAll('#cardTabs .tab').forEach((t) => t.setAttribute('aria-pressed', +t.dataset.i === ci));
  fit(document.querySelector('#slideHost .slide'));
}
function toast(msg) { const t = $('toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { t.hidden = true; }, 3000); }

function go(d) {
  if (d < 0 && si === 0) { if (mode === 'B') { show('form'); return; } qi = hist.length ? hist.pop() : 0; show('quiz'); renderQ(); return; }
  si = Math.min(slides.length - 1, Math.max(0, si + d)); renderSlide();
}
$('next').addEventListener('click', () => { if (si === slides.length - 1) show('home'); else go(1); });
$('prev').addEventListener('click', () => go(-1));
$('tapNext').addEventListener('click', () => go(1));
$('tapPrev').addEventListener('click', () => go(-1));
document.addEventListener('keydown', (e) => { if ($('story').hidden) return; if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); });
