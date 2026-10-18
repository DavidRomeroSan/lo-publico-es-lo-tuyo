// Pictogramas de lo público: línea gruesa, 64×64, color heredado.
export const IC = {
  hospital: '<rect x="10" y="20" width="44" height="36" rx="3"/><path d="M6 22 32 8l26 14"/><path d="M32 28v16M24 36h16"/><path d="M27 56v-6h10v6"/>',
  bus: '<rect x="12" y="8" width="40" height="42" rx="7"/><path d="M12 30h40M12 18h40"/><circle cx="22" cy="40" r="2.5"/><circle cx="42" cy="40" r="2.5"/><path d="M18 50v6M46 50v6"/>',
  school: '<path d="M6 28 32 12l26 16"/><path d="M12 25v31h40V25"/><path d="M27 56V44h10v12"/><path d="M32 12V4l8 3-8 3"/><circle cx="32" cy="31" r="4"/>',
  book: '<path d="M32 16c-6-5-15-6-24-5v38c9-1 18 0 24 5 6-5 15-6 24-5V11c-9-1-18 0-24 5Z"/><path d="M32 16v38"/>',
  cap: '<path d="M4 24 32 12l28 12-28 12Z"/><path d="M16 30v12c8 7 24 7 32 0V30"/><path d="M56 26v14"/>',
  fire: '<path d="M32 58c-11 0-18-8-18-17 0-12 12-18 12-30 6 4 9 10 9 15 3-2 4-6 4-9 7 6 11 14 11 24 0 9-7 17-18 17Z"/><path d="M32 58c-5 0-8-4-8-8 0-5 5-8 6-13 4 3 10 7 10 13 0 4-3 8-8 8Z"/>',
  house: '<path d="M6 30 32 8l26 22"/><path d="M13 25v31h38V25"/><circle cx="32" cy="38" r="5"/><path d="M32 43v7"/>',
  swim: '<circle cx="42" cy="18" r="5"/><path d="M8 26l14-6 10 10"/><path d="M4 42c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4 5 4 6 4"/><path d="M4 54c5 0 5-4 10-4s5 4 10 4 5-4 10-4 5 4 10 4 5-4 10-4 5 4 6 4"/>',
  ball: '<circle cx="32" cy="32" r="24"/><path d="M32 22l9 7-3 11H26l-3-11Z"/><path d="M32 8v14M41 29l14-4M38 40l8 12M26 40l-8 12M23 29 9 25"/>',
  music: '<path d="M24 46V12l28-6v34"/><circle cx="17" cy="46" r="7"/><circle cx="45" cy="40" r="7"/><path d="M24 22l28-6"/>',
  tree: '<path d="M32 58V34"/><path d="M32 6c-11 0-18 9-18 18 0 8 6 14 14 14h8c8 0 14-6 14-14 0-9-7-18-18-18Z"/><path d="M32 42l-8-6M32 46l8-7"/>',
  lamp: '<path d="M24 58h16M32 58V14c0-5 4-8 9-8h7"/><path d="M42 6v4c0 3 3 6 6 6s6-3 6-6V6"/><path d="M48 22v3M54 20l2 2M42 20l-2 2"/>',
  train: '<rect x="14" y="6" width="36" height="40" rx="8"/><path d="M14 26h36"/><circle cx="24" cy="36" r="2.5"/><circle cx="40" cy="36" r="2.5"/><path d="M20 58l6-12M44 58l-6-12M22 52h20"/>',
  heart: '<path d="M32 54S8 40 8 23c0-8 6-14 13-14 5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 6 13 14 0 17-24 31-24 31Z"/>',
  baby: '<circle cx="32" cy="22" r="12"/><path d="M27 21h.5M37 21h.5M28 27c2 2 6 2 8 0"/><path d="M14 58c0-10 8-18 18-18s18 8 18 18"/><path d="M32 10c0-3 2-5 5-5"/>',
  shield: '<path d="M32 6 10 14v16c0 14 10 24 22 28 12-4 22-14 22-28V14Z"/><path d="M22 32l7 7 13-14"/>',
  city: '<path d="M6 58h52"/><rect x="10" y="26" width="14" height="32"/><rect x="26" y="10" width="14" height="48"/><rect x="42" y="32" width="12" height="26"/><path d="M15 34h4M15 42h4M31 18h4M31 26h4M31 34h4M47 40h3"/>',
  hands: '<path d="M8 40l10-10c3-3 7-3 10 0l4 4 4-4c3-3 7-3 10 0l10 10"/><path d="M14 46l18 12 18-12"/><path d="M32 10v12M24 14l4 6M40 14l-4 6"/>'
};

const ATTR = 'fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';

export const svg = (k) => `<svg viewBox="0 0 64 64" ${ATTR}>${IC[k] || IC.heart}</svg>`;
export const ico = (k, cls = '') => `<span class="ico ${cls}" aria-hidden="true">${svg(k)}</span>`;
export const ROW = ['hospital', 'school', 'bus', 'fire', 'house', 'swim', 'book', 'tree', 'lamp', 'music'];

// SVG autónomo para pintar en canvas
export function svgDataUrl(k, color = '#fff') {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="128" height="128" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${IC[k] || IC.heart}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
}
