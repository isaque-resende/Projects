// Planta de Jerusalém (maquete compacta, ~1 unidade = 1 m). x = leste, z = sul, y = cima.
// O sol se põe a oeste (-x), atrás da cidade, como visto do Monte das Oliveiras.

export const TM = { x0: -20, x1: 92, z0: -60, z1: 50, y: 21 };          // plataforma do Monte do Templo
export const ANTONIA = { x0: -24, x1: 8, z0: -86, z1: -60 };             // Fortaleza Antônia
export const PALACE = { x0: -145, x1: -100, z0: 15, z1: 60 };            // palácio de Herodes
export const SILOAM = { x: 18, z: 122, w: 18, d: 10 };                   // tanque de Siloé
export const GOLGOTHA = { x: -84, z: -132, r: 22, h: 10 };               // colina da Caveira
export const TOMB = { x: -40, z: -150 };                                 // colina do sepulcro no jardim
export const LOOKOUT = { x: 180, z: -10 };                               // mirante no Monte das Oliveiras
export const GETHSEMANE = { x: 128, z: -6 };
export const VILLAGE = { x: 262, z: 40 };   // Betânia: encosta leste do Monte das Oliveiras
export const LAZARUS = { x: 292, z: 34 };   // túmulo de Lázaro, na saída leste de Betânia
export const INTRO_HOUSE = { x: 250, z: 49, rot: -Math.PI / 2 };   // porta voltada para oeste (para Jerusalém)
export const KIDRON = (z) => 114 + Math.sin(z * 0.018) * 7;              // leito do vale do Cedrom

// muralha da cidade (polígono fechado; o trecho leste é a própria plataforma do Templo)
export const WALL = [
  [-150, -80], [-24, -80], // norte até a Antônia
  // (Antônia + plataforma fazem o fechamento nordeste/leste)
  [92, -60], [92, 50],
  [72, 92], [38, 132], [-14, 142], [-72, 120], [-132, 96], [-150, 60],
];
// portas: índice do trecho da muralha e posição (0..1) ao longo dele
export const WALL_SKIP = new Set([1, 2]); // trechos fechados pela Antônia e pela plataforma do Templo
export const GATES = [
  { seg: 0, t: 0.47, name: 'Porta de Genate' },    // (-90.8,-80) saída para o Gólgota
  { seg: 9, t: 0.407, name: 'Porta de Jafa' },     // (-150, 3) oeste
  { seg: 4, t: 0.44, name: 'Porta da Fonte' },     // (57, 109.6) sudeste, para o Cedrom
  { seg: 5, t: 0.85, name: 'Porta dos Essênios' }, // (-6.2, 140.5) sul
];

// estradas e ruas (polilinhas). width = largura do leito
export const ROADS = [
  { w: 4.5, pts: [[-91, -80], [-92, -96], [-86, -110], [-70, -116], [-56, -122], [-44, -129]] },        // para o jardim e o Gólgota
  { w: 3.2, pts: [[-92, -100], [-104, -112], [-106, -128], [-98, -146], [-86, -150], [-80, -140]] },    // subida do Gólgota (pelos fundos)
  { w: 5, pts: [[57, 110], [78, 112], [100, 92], [112, 60], [116, 30], [124, 8], [140, -4], [156, -12], [168, -20], [176, -18], [180, -10]] }, // Cedrom e Oliveiras
  { w: 4.5, pts: [[-6, 141], [10, 168], [60, 182], [110, 184], [132, 176]] },                           // campos ao sul
  { w: 4.5, pts: [[-150, 3], [-190, 6], [-240, 0], [-300, -8]] },                                        // estrada de Jafa
  { w: 4, pts: [[180, -10], [204, 2], [226, 20], [242, 40], [262, 40]] },                             // pela crista até Betânia
];
export const STREETS = [
  { w: 6, pts: [[-150, 3], [-100, 2], [-60, 0], [-34, 2], [-28, 10]] },     // rua principal leste-oeste
  { w: 6, pts: [[-91, -80], [-84, -40], [-78, 0], [-64, 50], [-40, 100], [-6, 140]] }, // cardo
  { w: 5, pts: [[-34, 60], [-10, 70], [10, 92], [18, 116]] },               // cidade baixa até Siloé
  { w: 5, pts: [[-78, -40], [-50, -55], [-28, -66]] },                      // até a Antônia
  { w: 5, pts: [[-64, 50], [-30, 58], [0, 62], [20, 64]] },                 // até a escadaria sul
  { w: 5, pts: [[10, 92], [40, 100], [57, 110]] },                           // até a Porta da Fonte
];

export const PLACES = [
  { id: 'templo', name: 'Templo de Herodes', x: 36, z: -4, r: 50, spawn: [62, -42], look: [24, -7] },
  { id: 'atrio', name: 'Átrio das Mulheres', x: 60, z: -7, r: 9, spawn: [77, -7], look: [20, -7] },
  { id: 'antonia', name: 'Fortaleza Antônia', x: -8, z: -73, r: 16 },
  { id: 'golgota', name: 'Gólgota, o Lugar da Caveira', x: GOLGOTHA.x, z: GOLGOTHA.z, r: 34, spawn: [-80, -104], look: [-84, -134] },
  { id: 'sepulcro', name: 'O Sepulcro no Jardim', x: TOMB.x, z: TOMB.z + 14, r: 18, spawn: [-46, -124], look: [-40, -142] },
  { id: 'mirante', name: 'Monte das Oliveiras', x: LOOKOUT.x, z: LOOKOUT.z, r: 30, spawn: [LOOKOUT.x - 5.5, LOOKOUT.z + 1], look: [30, -7] },
  { id: 'getsemani', name: 'Getsêmani', x: GETHSEMANE.x, z: GETHSEMANE.z, r: 18, spawn: [121, 6], look: [131, -4] },
  { id: 'cedrom', name: 'Vale do Cedrom', x: 114, z: 40, r: 18 },
  { id: 'siloe', name: 'Tanque de Siloé', x: SILOAM.x, z: SILOAM.z, r: 14, spawn: [10, 108], look: [18, 124] },
  { id: 'palacio', name: 'Palácio de Herodes', x: -122, z: 30, r: 26 },
  { id: 'betania', name: 'Betânia', x: VILLAGE.x, z: VILLAGE.z, r: 34, spawn: [244, 40], look: [262, 40] },
  { id: 'cidade', name: 'Cidade Alta', x: -80, z: 10, r: 60, spawn: [-78, 4], look: [30, -6] },
];

// ---------------- utilidades geométricas ----------------
export function inPoly(x, z, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i], [xj, zj] = poly[j];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}
export function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz;
  const t = L ? Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / L)) : 0;
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}
export function lineDist(px, pz, pts) {
  let d = Infinity;
  for (let i = 0; i < pts.length - 1; i++) d = Math.min(d, segDist(px, pz, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]));
  return d;
}
// distância à estrada mais próxima, descontada a meia-largura (<0 = em cima da estrada)
export function roadDist(x, z, list = ROADS) {
  let d = Infinity;
  for (const r of list) d = Math.min(d, lineDist(x, z, r.pts) - r.w / 2);
  return d;
}
export const inRect = (x, z, r, m = 0) => x > r.x0 - m && x < r.x1 + m && z > r.z0 - m && z < r.z1 + m;
// ponto dentro da muralha (inclui plataforma e Antônia)
export const inCity = (x, z) => inPoly(x, z, WALL) || inRect(x, z, TM) || inRect(x, z, ANTONIA);
