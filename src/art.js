// Ilustraciones planas de los servicios públicos. Una escena por servicio, 240×240.
// Paleta fija (tinta, blanco, rosa, rojo, oro) sobre un círculo de fondo que cambia con la lámina.
const T = '#17100F'; const W = '#FFFFFF'; const R = '#FFE1E4'; const RD = '#E1001A'; const Y = '#FFC83D';

const heart = (x, y, s, f) => `<path transform="translate(${x} ${y}) scale(${s})" fill="${f}" d="M0 10C-14-2-18-14-9-19-4-21 0-17 0-14 0-17 4-21 9-19 18-14 14-2 0 10Z"/>`;
const spark = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" fill="${W}" d="M0-9 2.5-2.5 9 0 2.5 2.5 0 9-2.5 2.5-9 0-2.5-2.5Z"/>`;
const ground = (c = T) => `<rect x="24" y="192" width="192" height="9" rx="4.5" fill="${c}"/>`;

function windows(x, y, cols, rows, w, h, gx, gy, f) {
  let s = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) s += `<rect x="${x + c * (w + gx)}" y="${y + r * (h + gy)}" width="${w}" height="${h}" rx="2" fill="${f}"/>`;
  return s;
}

const SCENES = {
  hospital: () => `
    <rect x="44" y="84" width="152" height="108" rx="8" fill="${W}"/>
    <rect x="44" y="84" width="152" height="20" rx="8" fill="${R}"/>
    ${windows(62, 116, 3, 1, 28, 26, 14, 0, R)}
    <rect x="104" y="146" width="32" height="46" rx="4" fill="${T}"/>
    <circle cx="120" cy="60" r="34" fill="${W}"/>
    <rect x="109" y="40" width="22" height="40" rx="4" fill="${RD}"/><rect x="100" y="49" width="40" height="22" rx="4" fill="${RD}"/>
    ${heart(190, 52, 1.4, Y)}${spark(46, 56)}${ground()}`,
  school: () => `
    <rect x="40" y="104" width="160" height="88" fill="${W}"/>
    <path d="M28 106 120 48l92 58Z" fill="${T}"/>
    <circle cx="120" cy="84" r="14" fill="${W}"/><path d="M120 75v10l7 4" stroke="${T}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M120 48V20" stroke="${T}" stroke-width="4"/><path d="M120 20h26l-6 8 6 8h-26Z" fill="${Y}"/>
    <rect x="102" y="140" width="36" height="52" rx="4" fill="${RD}"/>
    ${windows(54, 122, 1, 1, 34, 28, 0, 0, R)}${windows(152, 122, 1, 1, 34, 28, 0, 0, R)}
    ${spark(206, 40)}${ground()}`,
  bus: () => `
    <rect x="26" y="84" width="188" height="96" rx="20" fill="${Y}"/>
    ${windows(42, 98, 4, 1, 32, 34, 12, 0, T)}
    <rect x="26" y="144" width="188" height="12" fill="${RD}"/>
    <circle cx="74" cy="182" r="19" fill="${T}"/><circle cx="74" cy="182" r="8" fill="${W}"/>
    <circle cx="170" cy="182" r="19" fill="${T}"/><circle cx="170" cy="182" r="8" fill="${W}"/>
    <rect x="198" y="152" width="14" height="10" rx="3" fill="${W}"/>
    <path d="M40 60h60" stroke="${W}" stroke-width="6" stroke-linecap="round"/><path d="M52 44h36" stroke="${W}" stroke-width="6" stroke-linecap="round"/>
    ${ground()}`,
  fire: () => `
    <path d="M120 22c12 36 62 58 62 116 0 40-28 68-62 68s-62-28-62-68c0-26 14-42 26-58 4 18 12 26 20 22-8-28 0-56 16-80Z" fill="${Y}"/>
    <path d="M120 98c8 26 34 40 34 66 0 20-14 34-34 34s-34-14-34-34c0-18 14-30 20-44 4 10 8 14 12 10-2-12-2-22 2-32Z" fill="${W}"/>
    <path d="M120 150c4 12 16 18 16 30 0 10-7 16-16 16s-16-6-16-16c0-12 12-18 16-30Z" fill="${RD}"/>
    ${spark(44, 70)}${spark(204, 100, .8)}`,
  house: () => `
    <rect x="156" y="52" width="22" height="42" fill="${T}"/>
    <rect x="46" y="106" width="148" height="86" fill="${W}"/>
    <path d="M26 114 120 38l94 76Z" fill="${T}"/>
    <rect x="100" y="140" width="40" height="52" rx="5" fill="${RD}"/><circle cx="130" cy="167" r="3.5" fill="${Y}"/>
    ${windows(60, 124, 1, 1, 28, 28, 0, 0, R)}${windows(152, 124, 1, 1, 28, 28, 0, 0, R)}
    <circle cx="196" cy="48" r="13" fill="${Y}"/><circle cx="196" cy="48" r="5" style="fill:var(--blobc)"/><rect x="190" y="58" width="12" height="4" fill="${Y}" transform="rotate(50 196 48) translate(0 8)"/>
    ${ground()}`,
  swim: () => `
    <circle cx="190" cy="62" r="20" fill="${Y}"/>
    <rect x="28" y="116" width="184" height="84" rx="16" fill="${W}"/>
    <path d="M40 146q11-11 22 0t22 0 22 0 22 0 22 0 22 0" stroke="${RD}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M40 174q11-11 22 0t22 0 22 0 22 0 22 0 22 0" stroke="${RD}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M28 124h184" stroke="${RD}" stroke-width="5" stroke-dasharray="3 12" stroke-linecap="round"/>
    <circle cx="86" cy="104" r="15" fill="${Y}"/><path d="M71 104a15 15 0 0 1 30 0Z" fill="${RD}"/>
    <path d="M96 116q22-4 40-30" stroke="${T}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="170" cy="100" r="21" fill="none" stroke="${RD}" stroke-width="11"/><circle cx="170" cy="100" r="21" fill="none" stroke="${W}" stroke-width="11" stroke-dasharray="16 16"/>`,
  book: () => `
    <path d="M120 86c-26-18-58-20-86-10v102c28-8 60-6 86 12Z" fill="${W}"/>
    <path d="M120 86c26-18 58-20 86-10v102c-28-8-60-6-86 12Z" fill="${R}"/>
    <path d="M52 104c18-4 38-2 56 8M52 124c18-4 38-2 56 8M52 144c18-4 38-2 56 8M132 112c18-10 38-12 56-8M132 132c18-10 38-12 56-8" stroke="${T}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M120 22 178 46 120 70 62 46Z" fill="${T}"/><path d="M88 60v18c18 12 46 12 64 0V60" fill="${T}"/>
    <path d="M178 46v26" stroke="${Y}" stroke-width="4"/><circle cx="178" cy="76" r="6" fill="${Y}"/>
    ${spark(36, 40)}`,
  tree: () => `
    <circle cx="192" cy="50" r="18" fill="${Y}"/>
    <rect x="108" y="126" width="24" height="68" rx="4" fill="${T}"/>
    <circle cx="120" cy="80" r="48" fill="${W}"/><circle cx="76" cy="112" r="32" fill="${W}"/><circle cx="164" cy="112" r="32" fill="${W}"/>
    <circle cx="104" cy="70" r="14" fill="${R}"/><circle cx="148" cy="98" r="12" fill="${R}"/><circle cx="72" cy="112" r="10" fill="${R}"/>
    <rect x="150" y="166" width="62" height="8" rx="3" fill="${T}"/><rect x="156" y="174" width="6" height="20" fill="${T}"/><rect x="200" y="174" width="6" height="20" fill="${T}"/>
    ${ground()}`,
  lamp: () => `
    <path d="M142 56 206 200H108Z" fill="${Y}" opacity=".35"/>
    <rect x="94" y="188" width="46" height="12" rx="4" fill="${T}"/>
    <rect x="112" y="64" width="10" height="128" fill="${T}"/>
    <path d="M117 68q0-30 34-30" stroke="${T}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M134 32h46l-8 22h-30Z" fill="${T}"/><rect x="144" y="54" width="26" height="8" rx="3" fill="${Y}"/>
    ${spark(50, 70)}${spark(70, 130, .7)}${spark(196, 36, .8)}`,
  music: () => `
    <circle cx="106" cy="136" r="66" fill="${T}"/>
    <circle cx="106" cy="136" r="52" fill="none" stroke="#3a2c2a" stroke-width="3"/><circle cx="106" cy="136" r="40" fill="none" stroke="#3a2c2a" stroke-width="3"/>
    <circle cx="106" cy="136" r="24" fill="${RD}"/><circle cx="106" cy="136" r="5" fill="${W}"/>
    <rect x="174" y="34" width="9" height="72" fill="${W}"/><ellipse cx="164" cy="108" rx="17" ry="13" fill="${W}" transform="rotate(-20 164 108)"/>
    <path d="M183 36q32 10 22 44" stroke="${W}" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${spark(46, 48)}${spark(214, 130, .8)}`,
  city: () => {
    const b = (x, y, w, f) => `<rect x="${x}" y="${y}" width="${w}" height="${192 - y}" fill="${f}"/>`;
    return `${b(30, 112, 46, W)}${b(80, 62, 50, T)}${b(134, 92, 38, R)}${b(176, 126, 36, W)}
    <path d="M105 62V36" stroke="${T}" stroke-width="4"/><circle cx="105" cy="34" r="5" fill="${RD}"/>
    ${windows(38, 122, 3, 4, 8, 10, 6, 8, Y)}${windows(90, 74, 3, 6, 10, 10, 6, 8, Y)}${windows(142, 102, 2, 5, 10, 10, 6, 8, Y)}${windows(184, 136, 2, 3, 10, 10, 6, 8, Y)}
    ${spark(200, 56)}${ground()}`;
  },
  heart: () => `
    <path d="M120 200C58 160 32 122 32 84c0-27 20-44 46-44 18 0 33 10 42 25 9-15 24-25 42-25 26 0 46 17 46 44 0 38-26 76-88 116Z" fill="${W}"/>
    <path d="M62 78c0-12 8-20 20-20" stroke="${R}" stroke-width="9" fill="none" stroke-linecap="round"/>
    ${heart(196, 44, 1.2, Y)}${heart(44, 170, .9, Y)}${spark(210, 150)}`,
  hands: () => `
    ${heart(120, 84, 3.4, W)}
    <path d="M26 150q34-22 66 0l28 14 28-14q32-22 66 0l-10 40q-84 36-168 0Z" fill="${Y}"/>
    <path d="M44 176q76 24 152 0" stroke="${T}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/>
    ${spark(40, 70)}${spark(206, 62, .8)}`
};
const ALIAS = { baby: 'school', cap: 'book', ball: 'swim', train: 'bus', shield: 'hands' };

// Devuelve el SVG; blob = color del círculo de fondo (por defecto, el de la lámina).
export function artSvg(k, blob = 'var(--blob, #9E0013)') {
  const scene = (SCENES[k] || SCENES[ALIAS[k]] || SCENES.heart)();
  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="--blobc:${blob}"><circle cx="120" cy="122" r="108" style="fill:${blob}"/>${scene}</svg>`;
}
export const art = (k, cls = '') => `<span class="art ${cls}" aria-hidden="true">${artSvg(k)}</span>`;

export function artDataUrl(k, blob = '#9E0013') {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(artSvg(k, blob).replace(' xmlns', ' width="480" height="480" xmlns'));
}
export const TILES = ['hospital', 'school', 'bus', 'fire', 'house', 'swim', 'book', 'tree', 'lamp', 'music', 'city', 'hands'];
