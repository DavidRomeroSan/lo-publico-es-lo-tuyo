// Tarjeta compartible 1080×1920 pintada en canvas (formato stories).
import { SITE } from './data.js';
import { svgDataUrl } from './icons.js';

const RED = '#E1001A';
const DEEP = '#9E0013';
const WHITE = '#FFFFFF';
const DISPLAY = "'Archivo Variable', 'Arial Narrow', Arial, sans-serif";
const BODY = "'Source Sans 3', 'Segoe UI', Arial, sans-serif";

const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

function fitText(ctx, text, maxW, size, weight, family, stretch = 'normal') {
  let s = size;
  do {
    ctx.font = `${weight} ${stretch} ${s}px ${family}`;
    if (ctx.measureText(text).width <= maxW) break;
    s -= 4;
  } while (s > 20);
  return s;
}

export async function drawCard(card) {
  try {
    await Promise.all([
      document.fonts.load(`900 400px 'Archivo Variable'`),
      document.fonts.load(`700 40px 'Source Sans 3'`),
      document.fonts.load(`400 40px 'Source Sans 3'`)
    ]);
  } catch (e) { /* sigue con fuentes de reserva */ }

  const W = 1080; const H = 1920; const M = 90;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = RED; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = WHITE; ctx.textBaseline = 'alphabetic';

  // Pictogramas superiores
  const imgs = await Promise.all(card.icons.map((k) => loadImg(svgDataUrl(k)).catch(() => null)));
  imgs.forEach((im, i) => { if (im) ctx.drawImage(im, M + i * 130, 90, 96, 96); });

  // Año gigante
  const ys = fitText(ctx, String(SITE.year), W - 2 * M, 470, 900, DISPLAY, 'extra-condensed');
  ctx.font = `900 extra-condensed ${ys}px ${DISPLAY}`;
  ctx.fillText(String(SITE.year), M - 14, 620);

  // Eyebrow
  ctx.letterSpacing = '5px';
  const es = fitText(ctx, card.eyebrow.toUpperCase(), W - 2 * M, 40, 700, DISPLAY);
  ctx.font = `700 ${es}px ${DISPLAY}`;
  ctx.fillText(card.eyebrow.toUpperCase(), M, 730);
  ctx.letterSpacing = '0px';

  // Total
  const ts = fitText(ctx, card.total, W - 2 * M, 250, 900, DISPLAY, 'extra-condensed');
  ctx.font = `900 extra-condensed ${ts}px ${DISPLAY}`;
  ctx.fillText(card.total, M - 6, 730 + ts * 0.92);

  // Líneas
  let y = 1130;
  ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 2;
  card.lines.slice(0, 5).forEach(([l, v]) => {
    ctx.font = `700 46px ${BODY}`;
    const vw = ctx.measureText(v).width;
    ctx.textAlign = 'right'; ctx.fillText(v, W - M, y); ctx.textAlign = 'left';
    ctx.font = `400 42px ${BODY}`;
    let label = l;
    while (ctx.measureText(label).width > W - 2 * M - vw - 30 && label.length > 4) label = label.slice(0, -2);
    if (label !== l) label = label.trim() + '…';
    ctx.fillText(label, M, y);
    ctx.beginPath(); ctx.moveTo(M, y + 24); ctx.lineTo(W - M, y + 24); ctx.stroke();
    y += 88;
  });

  // Club
  const clubTxt = card.club.toUpperCase();
  const cs = fitText(ctx, clubTxt, W - 2 * M, 130, 900, DISPLAY, 'extra-condensed');
  ctx.fillStyle = DEEP; ctx.fillRect(M - 12, 1640 - cs * 0.86, ctx.measureText(clubTxt).width + 24, cs * 1.0);
  ctx.fillStyle = WHITE; ctx.font = `900 extra-condensed ${cs}px ${DISPLAY}`;
  ctx.fillText(clubTxt, M, 1640);

  // Pie
  ctx.font = `700 34px ${BODY}`;
  ctx.fillText(SITE.lema, M, 1760);
  ctx.globalAlpha = 0.9;
  ctx.font = `400 28px ${BODY}`;
  ctx.fillText(card.foot, M, 1806);
  ctx.font = `700 30px ${BODY}`;
  ctx.fillText(`Haz el tuyo en ${SITE.url}`, M, 1850);
  ctx.globalAlpha = 1;

  return new Promise((res) => cv.toBlob((b) => res(b), 'image/png'));
}

export async function shareBlob(blob) {
  const file = new File([blob], `mi-ano-en-lo-publico-${SITE.year}.png`, { type: 'image/png' });
  const data = { files: [file], title: SITE.name, text: `Mi año en lo público. Haz el tuyo: https://${SITE.url}` };
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try { await navigator.share(data); return 'shared'; } catch (e) { if (e && e.name === 'AbortError') return 'cancel'; }
  }
  downloadBlob(blob);
  return 'downloaded';
}

export function downloadBlob(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `mi-ano-en-lo-publico-${SITE.year}.png`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
