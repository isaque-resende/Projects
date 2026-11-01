import * as THREE from 'three';
import { TM, ANTONIA } from './layout.js';
import { heightAt } from './terrain.js';

// =====================================================================================
//  Monte do Templo (maquete inspirada no Templo de Herodes, séc. I)
//  plataforma com muros herodianos -> pórticos (Pórtico Real ao sul) -> Soreg -> Chel ->
//  Átrio das Mulheres -> Porta de Nicanor (15 degraus) -> Átrio de Israel/Sacerdotes (altar, pia)
//  -> Santuário (pórtico dourado, véu, videira de ouro). Fachada voltada para o leste.
// =====================================================================================

const Y0 = TM.y;                 // pátio dos gentios
const CHEL = Y0 + 1.8;           // terraço do Chel / Átrio das Mulheres
const ISRAEL = CHEL + 4.5;       // Átrio de Israel / Sacerdotes (15 degraus de Nicanor)
const PORCH = ISRAEL + 3.6;      // piso do Santuário (12 degraus)
const ZC = -7;                   // eixo leste-oeste do Templo

const minGround = (x0, x1, z0, z1) => {
  let m = Infinity;
  for (let x = x0; x <= x1; x += 4) for (let z = z0; z <= z1; z += 4) m = Math.min(m, heightAt(x, z));
  return m;
};

// coluna coríntia: base, fuste, capitel dourado, ábaco
function column(kit, x, z, y0, h, r = 0.42, gold = true) {
  kit.box('temple', x, z, r * 3, r * 3, y0, y0 + 0.45, 0, { solid: false });
  kit.cyl('marble', x, z, r, y0 + 0.45, y0 + h - 1.0, { r1: r * 0.9, seg: 10 });
  kit.cyl(gold ? 'gold' : 'temple', x, z, r * 0.9, y0 + h - 1.0, y0 + h - 0.3, { r1: r * 1.55, seg: 10, solid: false });
  kit.box('temple', x, z, r * 3.4, r * 3.4, y0 + h - 0.3, y0 + h, 0, { solid: false });
}

// folha de porta de bronze com almofadas e cravos
function bronzeDoor(kit, x, z, y0, h, rot) {
  kit.box('bronze', x, z, 0.12, 2.6, y0, y0 + h, rot, { solid: false });
  const c = Math.cos(rot), s = Math.sin(rot);
  for (const off of [-0.075, 0.075]) for (let i = 0; i < 4; i++) for (const k of [-0.6, 0.6]) {
    kit.box('gold', x + s * k + c * off, z + c * k - s * off, 0.05, 0.9, y0 + 0.5 + i * (h - 0.8) / 4, y0 + 0.5 + i * (h - 0.8) / 4 + (h - 1.4) / 4, rot, { solid: false });
  }
}
// fileira de espigões dourados (contra pássaros) ao longo de uma borda
function spikes(kit, ax, az, bx, bz, y, gap = 0.6) {
  const L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.floor(L / gap));
  for (let i = 0; i <= n; i++) {
    const t = i / n, g = new THREE.ConeGeometry(0.05, 0.55, 5);
    g.translate(ax + (bx - ax) * t, y + 0.27, az + (bz - az) * t);
    kit.geom('gold', g);
  }
}

// muro com aberturas: segmentos ao longo de x (axis 'x') ou z, aberturas [a,b] com verga a partir de hOpen
function wallWithGaps(kit, mat, axis, fixed, from, to, thick, y0, y1, gaps = [], hOpen = 7) {
  const cuts = [from, ...gaps.flat(), to];
  for (let i = 0; i < cuts.length - 1; i++) {
    const a = cuts[i], b = cuts[i + 1], solidPart = i % 2 === 0;
    const yy0 = solidPart ? y0 : y0 + hOpen;
    if (b - a <= 0.01 || yy0 >= y1) continue;
    if (axis === 'x') kit.box(mat, (a + b) / 2, fixed, b - a, thick, yy0, y1);
    else kit.box(mat, fixed, (a + b) / 2, thick, b - a, yy0, y1);
  }
}

export function buildTemple(kit, extras) {
  const { x0, x1, z0, z1 } = TM;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, W = x1 - x0, D = z1 - z0;

  // ---------------- plataforma ----------------
  const gmin = minGround(x0, x1, z0, z1) - 3;
  kit.box('ashlar', cx, cz, W, D, gmin, Y0);
  kit.box('paving', cx, cz, W - 0.2, D - 0.2, Y0 - 0.05, Y0 + 0.03, 0, { solid: false });
  // faixa de pedras salientes (fiada) e embasamento visível
  for (const [ax, az, w, d] of [[cx, z0, W + 0.6, 0.6], [cx, z1, W + 0.6, 0.6], [x0, cz, 0.6, D + 0.6], [x1, cz, 0.6, D + 0.6]]) {
    kit.box('ashlar', ax, az, w, d, Y0 - 1.2, Y0 - 0.6, 0, { solid: false });
  }

  // ---------------- pórticos ----------------
  const PH = 10, depth = 12, wallT = 1.6, top = Y0 + PH;
  // muro externo dos pórticos (com pilastras herodianas por fora)
  const southGap = [[cx - 6, cx + 6]], westGap = [[24, 34]];
  wallWithGaps(kit, 'ashlar', 'x', z0 + wallT / 2, x0, x1, wallT, Y0, top + 1.2, [], 7);            // norte
  wallWithGaps(kit, 'ashlar', 'x', z1 - wallT / 2, x0, x1, wallT, Y0, top + 6.2, southGap, 8);      // sul (Pórtico Real, mais alto)
  wallWithGaps(kit, 'ashlar', 'z', x0 + wallT / 2, z0, z1, wallT, Y0, top + 1.2, westGap, 7);       // oeste
  wallWithGaps(kit, 'ashlar', 'z', x1 - wallT / 2, z0, z1, wallT, Y0, top + 1.2, [], 7);            // leste (Pórtico de Salomão)
  for (let x = x0 + 2; x < x1 - 1; x += 3.6) {
    kit.box('ashlar', x, z0 - 0.2, 1.1, 0.4, Y0 - 9, top + 1.2, 0, { solid: false });
    if (Math.abs(x - cx) > 7) kit.box('ashlar', x, z1 + 0.2, 1.1, 0.4, Y0 - 9, top + 6.2, 0, { solid: false });
  }
  for (let z = z0 + 2; z < z1 - 1; z += 3.6) {
    kit.box('ashlar', x1 + 0.2, z, 0.4, 1.1, Y0 - 9, top + 1.2, 0, { solid: false });
    if (z < 22 || z > 36) kit.box('ashlar', x0 - 0.2, z, 0.4, 1.1, Y0 - 9, top + 1.2, 0, { solid: false });
  }
  // colunatas duplas (norte, leste, oeste) com teto de cedro
  const sp = 4;
  const portico = (axis, fixedOuter, inward, from, to) => {
    for (const off of [depth * 0.45, depth - 0.8]) {
      const f = fixedOuter + inward * off;
      for (let t = from; t <= to; t += sp) axis === 'x' ? column(kit, t, f, Y0, PH, 0.42) : column(kit, f, t, Y0, PH, 0.42);
      // arquitrave
      axis === 'x' ? kit.box('temple', (from + to) / 2, f, to - from + 1.4, 1.1, top - 0.05, top + 0.8, 0, { solid: false })
                   : kit.box('temple', f, (from + to) / 2, 1.1, to - from + 1.4, top - 0.05, top + 0.8, 0, { solid: false });
    }
    const mid = fixedOuter + inward * depth / 2;
    axis === 'x' ? (kit.box('darkWood', (from + to) / 2, mid, to - from + 2, depth, top + 0.8, top + 1.1, 0, { solid: false }), kit.box('roof', (from + to) / 2, mid, to - from + 2, depth + 0.4, top + 1.1, top + 1.6))
                 : (kit.box('darkWood', mid, (from + to) / 2, depth, to - from + 2, top + 0.8, top + 1.1, 0, { solid: false }), kit.box('roof', mid, (from + to) / 2, depth + 0.4, to - from + 2, top + 1.1, top + 1.6));
  };
  portico('x', z0 + wallT, 1, x0 + 14, x1 - 14);          // norte
  portico('z', x1 - wallT, -1, z0 + 14, z1 - 24);         // leste (Pórtico de Salomão)
  portico('z', x0 + wallT, 1, z0 + 14, z1 - 24);          // oeste
  // Pórtico Real (sul): 4 fileiras, nave central mais alta com clerestório
  {
    const zs = [z1 - wallT - 3, z1 - wallT - 8, z1 - wallT - 14, z1 - wallT - 19.5], hs = [PH, PH + 5, PH + 5, PH];
    zs.forEach((z, k) => { for (let x = x0 + 4; x <= x1 - 4; x += sp) column(kit, x, z, Y0, hs[k], k === 1 || k === 2 ? 0.55 : 0.45); });
    kit.box('darkWood', cx, z1 - wallT - 4.5, W - 4, 7, top - 0.2, top + 0.2, 0, { solid: false });
    kit.box('roof', cx, z1 - wallT - 2.6, W - 2, 6.4, top + 0.2, top + 0.8);
    kit.box('roof', cx, z1 - wallT - 17, W - 2, 6.6, top + 0.2, top + 0.8);
    // nave central: paredes do clerestório com janelas e telhado mais alto
    for (const z of [z1 - wallT - 6.4, z1 - wallT - 15.6]) {
      kit.box('temple', cx, z, W - 6, 0.9, top + 5, top + 9);
      for (let x = x0 + 6; x < x1 - 6; x += 4) kit.box('void', x, z, 1.4, 1.0, top + 6, top + 8.2, 0, { solid: false });
    }
    kit.box('darkWood', cx, z1 - wallT - 11, W - 6, 10, top + 8.8, top + 9.1, 0, { solid: false });
    kit.box('roof', cx, z1 - wallT - 11, W - 5, 10.6, top + 9.1, top + 9.8);
    spikes(kit, x0 + 3, z1 - wallT - 6, x1 - 3, z1 - wallT - 6, top + 9.8, 2.2);
  }
  // cantos: telhados de ligação
  for (const [qx, qz] of [[x0 + 7, z0 + 7], [x1 - 7, z0 + 7]]) kit.box('roof', qx, qz, 14, 14, top + 1.1, top + 1.6);

  // ---------------- Soreg (balaustrada) e Chel (terraço) ----------------
  const C = { x0: 0, x1: 74, z0: -34, z1: 20 };
  const sx0 = C.x0 - 4, sx1 = C.x1 + 4, sz0 = C.z0 - 4, sz1 = C.z1 + 4;
  const soreg = (ax, az, bx, bz) => {
    const L = Math.hypot(bx - ax, bz - az), n = Math.floor(L / 1.4);
    for (let i = 0; i <= n; i++) { const t = i / n; kit.box('temple', ax + (bx - ax) * t, az + (bz - az) * t, 0.25, 0.25, Y0, Y0 + 1.3, 0, { solid: false }); }
    const rot = Math.atan2(bx - ax, bz - az);
    kit.box('temple', (ax + bx) / 2, (az + bz) / 2, 0.3, L, Y0 + 1.15, Y0 + 1.4, rot);
    kit.box('temple', (ax + bx) / 2, (az + bz) / 2, 0.3, L, Y0 + 0.1, Y0 + 0.3, rot, { solid: false });
  };
  soreg(sx0, sz0, 50, sz0); soreg(62, sz0, sx1, sz0); // norte (abertura na escada)
  soreg(sx0, sz1, 50, sz1); soreg(62, sz1, sx1, sz1); // sul
  soreg(sx1, sz0, sx1, ZC - 9); soreg(sx1, ZC + 9, sx1, sz1);    // leste (abertura central)
  soreg(sx0, sz0, sx0, sz1);                                     // oeste
  kit.box('paving', (C.x0 + C.x1) / 2, (C.z0 + C.z1) / 2, C.x1 - C.x0, C.z1 - C.z0, Y0 - 0.5, CHEL);
  kit.stairs('paving', C.x1 + 1.5, ZC, 16, 3, Y0, CHEL, -Math.PI / 2);         // leste
  kit.stairs('paving', 56, C.z0 - 1.5, 8, 3, Y0, CHEL, 0);                     // norte
  kit.stairs('paving', 56, C.z1 + 1.5, 8, 3, Y0, CHEL, Math.PI);               // sul

  // ---------------- muros do recinto e portões ----------------
  const R = { x0: 4, x1: 70, z0: -30, z1: 16 }, WH = 12, wt = 2;
  const gateN = [[54, 59]], gateS = [[54, 59]];
  wallWithGaps(kit, 'temple', 'x', R.z0 + wt / 2, R.x0, R.x1, wt, CHEL, CHEL + WH, gateN, 8);
  wallWithGaps(kit, 'temple', 'x', R.z1 - wt / 2, R.x0, R.x1, wt, CHEL, CHEL + WH, gateS, 8);
  wallWithGaps(kit, 'temple', 'z', R.x1 - wt / 2, R.z0, R.z1, wt, CHEL, CHEL + WH, [[ZC - 3, ZC + 3]], 9); // Porta Formosa
  kit.box('temple', R.x0 + wt / 2, (R.z0 + R.z1) / 2, wt, R.z1 - R.z0, CHEL, CHEL + WH);
  // torres de portão (mais altas, com coroa dourada)
  const gateTower = (x, z, w, d) => {
    kit.box('temple', x, z, w, d, CHEL + 9, CHEL + WH + 4);
    kit.box('gold', x, z, w + 0.3, d + 0.3, CHEL + WH + 4, CHEL + WH + 4.5, 0, { solid: false });
    spikes(kit, x - w / 2, z - d / 2, x + w / 2, z - d / 2, CHEL + WH + 4.5, 1); spikes(kit, x - w / 2, z + d / 2, x + w / 2, z + d / 2, CHEL + WH + 4.5, 1);
  };
  gateTower(R.x1 - 1, ZC, 4, 10);           // Porta Formosa (leste)
  gateTower(56.5, R.z0 + 1, 9, 4); gateTower(56.5, R.z1 - 1, 9, 4);
  for (const gx of [18, 32]) for (const gz of [R.z0 + 1, R.z1 - 1]) gateTower(gx, gz, 7, 4);
  // portas de bronze coríntio da Porta Formosa (abertas)
  for (const s of [-1, 1]) bronzeDoor(kit, R.x1 - wt - 0.12, ZC + s * 4.3, CHEL, 8.4, s * 0.1);
  // cornija dourada no topo dos muros
  kit.box('gold', (R.x0 + R.x1) / 2, R.z0 - 0.15, R.x1 - R.x0, 0.4, CHEL + WH - 0.6, CHEL + WH - 0.2, 0, { solid: false });
  kit.box('gold', (R.x0 + R.x1) / 2, R.z1 + 0.15, R.x1 - R.x0, 0.4, CHEL + WH - 0.6, CHEL + WH - 0.2, 0, { solid: false });
  kit.box('gold', R.x1 + 0.15, (R.z0 + R.z1) / 2, 0.4, R.z1 - R.z0, CHEL + WH - 0.6, CHEL + WH - 0.2, 0, { solid: false });

  // ---------------- Átrio das Mulheres ----------------
  const WX = 52; // muro entre o Átrio das Mulheres e o de Israel
  // quatro câmaras de canto
  for (const [qx, qz] of [[R.x1 - 5, R.z0 + 5], [R.x1 - 5, R.z1 - 5], [WX + 5, R.z0 + 5], [WX + 5, R.z1 - 5]]) {
    kit.box('temple', qx, qz, 7, 7, CHEL, CHEL + 6.5);
    kit.box('void', qx + (qx > 60 ? -3.55 : 3.55), qz, 0.2, 1.6, CHEL, CHEL + 2.6, 0, { solid: false });
  }
  // grandes candelabros dourados (festa dos Tabernáculos)
  for (const [lx, lz] of [[WX + 6, ZC - 9], [WX + 6, ZC + 9], [R.x1 - 8, ZC - 9], [R.x1 - 8, ZC + 9]]) {
    kit.box('temple', lx, lz, 1.4, 1.4, CHEL, CHEL + 0.6);
    kit.cyl('gold', lx, lz, 0.16, CHEL + 0.6, CHEL + 11, { seg: 8 });
    for (const [ox, oz] of [[0.8, 0], [-0.8, 0], [0, 0.8], [0, -0.8]]) {
      kit.box('gold', lx + ox / 2, lz + oz / 2, Math.abs(ox) + 0.12, Math.abs(oz) + 0.12, CHEL + 10.4, CHEL + 10.55, 0, { solid: false });
      kit.cyl('gold', lx + ox, lz + oz, 0.18, CHEL + 10.55, CHEL + 10.95, { r1: 0.38, seg: 8, solid: false });
      extras.flames.push([lx + ox, CHEL + 11.25, lz + oz, 0.45]);
    }
  }
  // cofres de oferta (trombetas) junto aos muros
  for (let z = ZC - 13; z <= ZC + 13; z += 2.2) if (Math.abs(z - ZC) > 4) for (const x of [R.x1 - wt - 0.7]) kit.cyl('bronze', x, z, 0.35, CHEL, CHEL + 0.9, { r1: 0.18, seg: 8, solid: false });

  // ---------------- Porta de Nicanor e os 15 degraus semicirculares ----------------
  wallWithGaps(kit, 'temple', 'z', WX, R.z0 + wt, R.z1 - wt, 2, CHEL, CHEL + WH, [[ZC - 3, ZC + 3]], 4.5 + 7.5);
  kit.box('temple', WX, ZC, 3, 12, CHEL + 4.5 + 7.5, CHEL + WH + 5);     // casa da porta
  kit.box('gold', WX + 1.7, ZC, 0.3, 12.4, CHEL + WH + 4.4, CHEL + WH + 5, 0, { solid: false });
  spikes(kit, WX + 1.5, ZC - 6, WX + 1.5, ZC + 6, CHEL + WH + 5, 0.8);
  for (const s of [-1, 1]) bronzeDoor(kit, WX - 1.15, ZC + s * 4.3, ISRAEL, 7.2, s * 0.1);
  for (let i = 0; i < 15; i++) {
    const r = 9 - i * 0.38, y1 = CHEL + 0.3 * (i + 1);
    const g = new THREE.CylinderGeometry(r, r, y1 - CHEL + 0.5, 28, 1, false, 0, Math.PI);
    const uv = g.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * r * 3.1 / 3, uv.getY(k));
    g.translate(WX, (CHEL - 0.5 + y1) / 2, ZC);
    kit.geom('paving', g);
    kit.solids.add({ x: WX + r * 0.35, z: ZC, hx: r * 0.35, hz: r * 0.92, rot: 0, y0: CHEL - 0.5, y1 });
    kit.solids.add({ x: WX + r * 0.8, z: ZC, hx: r * 0.15, hz: r * 0.55, rot: 0, y0: CHEL - 0.5, y1 });
  }

  // ---------------- Átrio de Israel e dos Sacerdotes ----------------
  kit.box('paving', (R.x0 + WX) / 2 + 1, ZC + 0, WX - R.x0 - wt, R.z1 - R.z0 - wt * 2, CHEL - 0.2, ISRAEL);
  // grade baixa separando Israel dos sacerdotes
  for (const [za, zb] of [[R.z0 + wt, ZC - 2.5], [ZC + 2.5, R.z1 - wt]]) kit.box('temple', 47, (za + zb) / 2, 0.4, zb - za, ISRAEL, ISRAEL + 1.0);
  // câmaras ao longo dos muros (Câmara da Pedra Talhada etc.)
  for (const z of [R.z0 + wt + 3, R.z1 - wt - 3]) for (const x of [10, 18, 26]) {
    kit.box('plasterWarm', x + 2, z, 7, 5.5, ISRAEL, ISRAEL + 7);
    kit.box('void', x + 2, z + (z < 0 ? 2.8 : -2.8), 1.4, 0.1, ISRAEL, ISRAEL + 2.4, 0, { solid: false });
  }
  // altar de pedras não lavradas, com chifres e rampa ao sul
  const AX = 42, AY = ISRAEL + 4.2;
  kit.box('rock', AX, ZC, 9, 9, ISRAEL, ISRAEL + 1.6);
  kit.box('rock', AX, ZC, 8, 8, ISRAEL + 1.6, AY);
  kit.box('stoneDark', AX, ZC, 6, 6, AY, AY + 0.25, 0, { solid: false });
  for (const [ox, oz] of [[-3.6, -3.6], [3.6, -3.6], [-3.6, 3.6], [3.6, 3.6]]) kit.box('rock', AX + ox, ZC + oz, 0.8, 0.8, AY, AY + 0.9);
  kit.solids.add({ x: AX, z: ZC + 4.5 + 7, hx: 1.7, hz: 7, rot: 0, y0: ISRAEL - 0.3, y1: AY, rampAxis: 'z', rampA: AY, rampB: ISRAEL });
  // a rampa visual: uma cunha
  {
    const g = new THREE.BoxGeometry(3.4, 1, 14); const p = g.attributes.position;
    for (let k = 0; k < p.count; k++) { const z = p.getZ(k), y = p.getY(k); const t = (z + 7) / 14; p.setY(k, y > 0 ? AY - (AY - ISRAEL) * t - ISRAEL : -0.3); }
    g.computeVertexNormals(); const uv = g.attributes.uv; for (let k = 0; k < uv.count; k++) uv.setXY(k, uv.getX(k) * 2, uv.getY(k) * 2);
    g.translate(AX, ISRAEL, ZC + 4.5 + 7);
    kit.geom('rock', g);
  }
  extras.flames.push([AX - 1.2, AY + 0.6, ZC, 1.4], [AX + 1.2, AY + 0.5, ZC + 0.8, 1.1], [AX + 0.3, AY + 0.6, ZC - 1.1, 1.2]);
  extras.smoke.push([AX, AY + 1.5, ZC]);
  extras.lights.push([AX, AY + 2.5, ZC, 0xff7a2a, 26]);
  // pia de bronze (sobre bois) entre o altar e o pórtico
  kit.cyl('bronze', 38, ZC + 9, 1.2, ISRAEL, ISRAEL + 1.1, { r1: 0.8, seg: 16 });
  kit.cyl('bronze', 38, ZC + 9, 0.8, ISRAEL + 1.1, ISRAEL + 2.0, { r1: 1.7, seg: 16, solid: false });
  // área do sacrifício: colunetas, vigas de cedro, argolas
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
    const x = 38 + i * 2.6, z = R.z0 + wt + 4 + j * 3;
    kit.cyl('temple', x, z, 0.22, ISRAEL, ISRAEL + 3, { seg: 8 });
    kit.box('darkWood', x, z, 0.25, 3.2, ISRAEL + 2.8, ISRAEL + 3.1, 0, { solid: false });
  }
  for (let i = 0; i < 6; i++) kit.box('bronze', 38 + i * 1.6, R.z0 + wt + 10, 0.5, 0.5, ISRAEL, ISRAEL + 0.12, 0, { solid: false });

  // ---------------- Santuário ----------------
  const FX = 32, BX0 = 8, BX1 = 26, FZ0 = ZC - 15, FZ1 = ZC + 15, BZ0 = ZC - 10, BZ1 = ZC + 10;
  const FH = PORCH + 28, BH = PORCH + 22;
  kit.box('marble', (4 + FX) / 2, ZC, FX - 4, 30, ISRAEL - 0.2, PORCH);            // pódio
  kit.stairs('marble', FX + 1.8, ZC, 20, 3.6, ISRAEL, PORCH, -Math.PI / 2);        // 12 degraus
  // corpo (Lugar Santo + Santo dos Santos) e câmaras laterais em 3 andares
  kit.box('marble', (BX0 + BX1) / 2, ZC, BX1 - BX0, BZ1 - BZ0, PORCH, BH);
  for (const s of [-1, 1]) {
    kit.box('marble', (BX0 + BX1) / 2, ZC + s * (10 + 2.5), BX1 - BX0, 5, PORCH, PORCH + 15);
    for (let f = 0; f < 3; f++) for (let x = BX0 + 2; x < BX1 - 1; x += 3.2) kit.box('void', x, ZC + s * 15.05, 0.7, 0.1, PORCH + 2.5 + f * 4.6, PORCH + 4 + f * 4.6, 0, { solid: false });
    kit.box('gold', (BX0 + BX1) / 2, ZC + s * 15.1, BX1 - BX0, 0.3, PORCH + 14.6, PORCH + 15.2, 0, { solid: false });
  }
  kit.box('marble', BX0 - 2, ZC, 4, 30, PORCH, PORCH + 15);
  // janelas altas do corpo
  for (const s of [-1, 1]) for (let x = BX0 + 3; x < BX1 - 2; x += 4) kit.box('void', x, ZC + s * 10.05, 0.9, 0.1, PORCH + 17, PORCH + 19.5, 0, { solid: false });
  // cornija dourada do corpo + espigões
  kit.box('gold', (BX0 + BX1) / 2, ZC, BX1 - BX0 + 0.8, BZ1 - BZ0 + 0.8, BH - 1.2, BH, 0, { solid: false });
  spikes(kit, BX0, BZ0, BX1, BZ0, BH); spikes(kit, BX0, BZ1, BX1, BZ1, BH); spikes(kit, BX0, BZ0, BX0, BZ1, BH);
  // pórtico (Ulam): fachada larga e alta, abertura sem portas
  const OZ0 = ZC - 4.5, OZ1 = ZC + 4.5, OTOP = PORCH + 18;
  kit.box('marble', (BX1 + FX) / 2, (FZ0 + OZ0) / 2, FX - BX1, OZ0 - FZ0, PORCH, FH);
  kit.box('marble', (BX1 + FX) / 2, (OZ1 + FZ1) / 2, FX - BX1, FZ1 - OZ1, PORCH, FH);
  kit.box('marble', (BX1 + FX) / 2, ZC, FX - BX1, OZ1 - OZ0, OTOP, FH);
  // interior do pórtico: teto com vigas douradas
  for (let z = OZ0 + 0.6; z < OZ1; z += 1.6) kit.box('gold', (BX1 + FX) / 2, z, FX - BX1, 0.3, OTOP - 0.5, OTOP, 0, { solid: false });
  // portas de ouro abertas e o véu
  kit.box('gold', BX1 + 0.1, ZC, 0.25, 8, PORCH, PORCH + 12, 0, { solid: false });
  kit.box('void', BX1 + 0.25, ZC, 0.1, 5.6, PORCH, PORCH + 10.5, 0, { solid: false });
  for (const s of [-1, 1]) kit.box('gold', BX1 + 1.4, ZC + s * 3.7, 2.6, 0.18, PORCH, PORCH + 10.5, s * 0.6, { solid: false });
  // o véu, rasgado de alto a baixo (Mt 27:51): duas metades afastadas, mais abertas embaixo
  for (const sd of [-1, 1]) kit.box('veil', BX1 + 0.42 + 0.12 * (sd + 1), ZC + sd * 1.55, 0.06, 2.55, PORCH, PORCH + 10.3, sd * 0.1, { uv: [sd < 0 ? 0 : 0.5, 0, 0.5, 1], solid: false });
  kit.solids.add({ x: BX1 + 0.5, z: ZC, hx: 0.3, hz: 2.8, rot: 0, y0: PORCH, y1: PORCH + 10.3 });
  extras.veil = [BX1 + 1.2, PORCH, ZC];
  // videira de ouro sobre a porta: ramos, folhas e cachos
  {
    const pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40; pts.push(new THREE.Vector3(BX1 + 0.35, PORCH + 12.6 + Math.sin(t * Math.PI * 5) * 0.45, ZC - 6 + 12 * t)); }
    kit.geom('gold', new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.09, 5));
    for (let i = 0; i < 46; i++) {
      const t = i / 46, z = ZC - 6 + 12 * t, y = PORCH + 12.6 + Math.sin(t * Math.PI * 5) * 0.45 + (i % 2 ? 0.45 : -0.45);
      const leaf = new THREE.CircleGeometry(0.32, 5); leaf.rotateY(Math.PI / 2); leaf.rotateX((i * 1.7) % 1.2 - 0.6); leaf.translate(BX1 + 0.45, y, z);
      kit.geom('gold', leaf);
      if (i % 4 === 0) for (let k = 0; k < 7; k++) {
        const s = new THREE.SphereGeometry(0.11, 6, 4); s.translate(BX1 + 0.5, y - 0.35 - (k % 3) * 0.16, z + ((k * 0.37) % 0.4 - 0.2));
        kit.geom('gold', s);
      }
    }
  }
  // fachada: pilastras com capitéis de ouro, cornijas douradas, parapeito com espigões
  for (const z of [FZ0 + 0.8, FZ0 + 5.5, OZ0 - 1.4, OZ1 + 1.4, FZ1 - 5.5, FZ1 - 0.8]) {
    kit.box('marble', FX + 0.25, z, 0.5, 1.4, PORCH, FH - 3.2, 0, { solid: false });
    kit.box('gold', FX + 0.35, z, 0.7, 1.8, FH - 3.2, FH - 2.2, 0, { solid: false });
  }
  for (const y of [PORCH + 9, OTOP + 0.2]) kit.box('gold', FX + 0.2, ZC, 0.4, 30.2, y, y + 0.35, 0, { solid: false });
  kit.box('gold', FX + 0.3, ZC, 0.6, 30.6, FH - 2.2, FH - 0.6, 0, { solid: false });   // friso de ouro
  kit.box('gold', (BX1 + FX) / 2, FZ0 - 0.25, FX - BX1 + 0.6, 0.5, FH - 2.2, FH - 0.6, 0, { solid: false });
  kit.box('gold', (BX1 + FX) / 2, FZ1 + 0.25, FX - BX1 + 0.6, 0.5, FH - 2.2, FH - 0.6, 0, { solid: false });
  // moldura dourada da grande abertura
  kit.box('gold', FX + 0.2, OZ0 - 0.3, 0.4, 0.6, PORCH, OTOP + 0.6, 0, { solid: false });
  kit.box('gold', FX + 0.2, OZ1 + 0.3, 0.4, 0.6, PORCH, OTOP + 0.6, 0, { solid: false });
  kit.box('marble', (BX1 + FX) / 2, ZC, FX - BX1 + 0.4, 30.4, FH - 0.6, FH + 0.9, 0, { solid: false }); // parapeito
  spikes(kit, FX + 0.1, FZ0, FX + 0.1, FZ1, FH + 0.9, 0.75);
  spikes(kit, BX1, FZ0, FX, FZ0, FH + 0.9, 0.75); spikes(kit, BX1, FZ1, FX, FZ1, FH + 0.9, 0.75);
  // grinaldas/coroas douradas penduradas na fachada (ofertas votivas)
  for (const z of [OZ0 - 3, OZ1 + 3]) {
    const t = new THREE.TorusGeometry(0.8, 0.12, 6, 18); t.rotateY(Math.PI / 2); t.translate(FX + 0.55, OTOP - 3, z);
    kit.geom('gold', t);
  }

  // ---------------- acessos de fora ----------------
  // escadaria sul (portas de Hulda) até o Pórtico Real
  const gS = heightAt(cx, z1 + 14);
  kit.stairs('walls', cx, z1 + 7, 12, 14, gS, Y0, Math.PI);
  for (const s of [-1, 1]) kit.box('ashlar', cx + s * 6.8, z1 + 7, 1.6, 14, gS - 1, Y0 + 1.1);
  // escadaria oeste (Arco de Robinson): sobe do sul para o norte e chega ao Pórtico Real pelo oeste
  const gW = heightAt(x0 - 7, 54);
  kit.stairs('walls', x0 - 6, 44, 7, 20, gW, Y0, Math.PI);
  kit.box('ashlar', x0 - 6, 29, 8, 10, gW - 4, Y0);                // patamar
  for (let i = 0; i < 3; i++) kit.box('ashlar', x0 - 6, 54 - i * 7, 7.6, 1.4, gW - 4, gW + 2 + i * 1.5, 0, { solid: false }); // arcos de apoio
  kit.box('ashlar', x0 - 9.6, 37, 0.8, 34, gW, Y0 + 1.1);          // guarda

  // ---------------- Fortaleza Antônia ----------------
  {
    const A = ANTONIA, ax = (A.x0 + A.x1) / 2, az = (A.z0 + A.z1) / 2, g = minGround(A.x0, A.x1, A.z0, A.z1) - 2;
    const body = Y0 + 13;
    kit.box('walls', ax, az, A.x1 - A.x0, A.z1 - A.z0, g, body);
    kit.box('stoneDark', ax, az, A.x1 - A.x0 + 0.6, A.z1 - A.z0 + 0.6, body - 0.6, body, 0, { solid: false });
    const towers = [[A.x0 + 3.5, A.z0 + 3.5, 10], [A.x1 - 3.5, A.z0 + 3.5, 10], [A.x0 + 3.5, A.z1 - 3.5, 10], [A.x1 - 3.5, A.z1 - 3.5, 16]];
    for (const [tx, tz, extra] of towers) {
      kit.box('walls', tx, tz, 7, 7, g, body + extra);
      for (let k = 0; k < 4; k++) for (let m = -1; m <= 1; m++) {
        const ox = k < 2 ? (k ? 3.3 : -3.3) : m * 2.2, oz = k < 2 ? m * 2.2 : (k === 2 ? 3.3 : -3.3);
        kit.box('walls', tx + ox, tz + oz, 1.1, 1.1, body + extra, body + extra + 1.2, 0, { solid: false });
      }
      for (let f = 0; f < 3; f++) kit.box('void', tx + 3.55, tz, 0.1, 0.6, body - 6 + f * 5, body - 4.5 + f * 5, 0, { solid: false });
    }
    // ameias no corpo
    for (let x = A.x0 + 8; x < A.x1 - 7; x += 2) for (const z of [A.z0 + 0.3, A.z1 - 0.3]) kit.box('walls', x, z, 1, 0.6, body, body + 1.1, 0, { solid: false });
    // escadas da Antônia descendo ao pátio do Templo (At 21:35)
    kit.stairs('walls', A.x1 - 9, A.z1 + 4.5, 5, 9, Y0, Y0 + 6, Math.PI);
    kit.box('void', A.x1 - 9, A.z1 + 0.05, 3, 0.1, Y0 + 6, Y0 + 9, 0, { solid: false });
    kit.box('walls', A.x1 - 9, A.z1 + 0.9, 5, 1.8, Y0, Y0 + 6);
  }
  return { ZC, levels: { Y0, CHEL, ISRAEL, PORCH } };
}
