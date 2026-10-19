// Tarjeta compartible 1080×1920 pintada en canvas (formato stories).
import { SITE } from './data.js';
import { artDataUrl } from './art.js';

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
  ctx.textBaseline = 'alphabetic';

  // Fondo con luz y círculos
  const g = ctx.createRadialGradient(W * 0.85, 120, 40, W * 0.85, 120, 1100);
  g.addColorStop(0, '#FF3B4F'); g.addColorStop(1, RED);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = DEEP; ctx.beginPath(); ctx.arc(-120, 1500, 420, 0, 7); ctx.fill();
  ctx.fillStyle = WHITE;

  // Ilustraciones: una grande arriba a la derecha y tiras pequeñas
  const imgs = await Promise.all(card.icons.map((k, i) => loadImg(artDataUrl(k, i === 0 ? DEEP : '#FFE1E4')).catch(() => null)));
  if (imgs[0]) ctx.drawImage(imgs[0], 720, 24, 320, 320);

  // Año gigante
  const ys = fitText(ctx, String(SITE.year), W - 2 * M, 470, 900, DISPLAY, 'extra-condensed');
  ctx.font = `900 extra-condensed ${ys}px ${DISPLAY}`;
  ctx.fillText(String(SITE.year), M - 14, 660);

  // Eyebrow
  ctx.letterSpacing = '5px';
  const es = fitText(ctx, card.eyebrow.toUpperCase(), W - 2 * M, 40, 700, DISPLAY);
  ctx.font = `700 ${es}px ${DISPLAY}`;
  ctx.fillText(card.eyebrow.toUpperCase(), M, 770);
  ctx.letterSpacing = '0px';

  // Total
  const ts = fitText(ctx, card.total, W - 2 * M, 250, 900, DISPLAY, 'extra-condensed');
  ctx.font = `900 extra-condensed ${ts}px ${DISPLAY}`;
  ctx.fillText(card.total, M - 6, 770 + ts * 0.92);

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
  const clubTxt = (card.tag || card.club).toUpperCase();
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

export async function shareBlobs(blobs, names) {
  const files = blobs.map((b, i) => new File([b], `${names[i]}.png`, { type: 'image/png' }));
  const data = { files, title: SITE.name, text: `Mi año en lo público. Haz el tuyo: https://${SITE.url}` };
  if (navigator.canShare && navigator.canShare({ files })) {
    try { await navigator.share(data); return 'shared'; } catch (e) { if (e && e.name === 'AbortError') return 'cancel'; }
  }
  blobs.forEach((b, i) => setTimeout(() => downloadBlob(b, names[i]), i * 400));
  return 'downloaded';
}

export function downloadBlob(blob, name = `mi-ano-en-lo-publico-${SITE.year}`) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${name}.png`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
