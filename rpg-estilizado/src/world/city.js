import * as THREE from 'three';
import { TM, ANTONIA, PALACE, SILOAM, WALL, WALL_SKIP, GATES, STREETS, inPoly, inRect, roadDist, segDist } from './layout.js';
export { toWorld };
import { heightAt } from './terrain.js';

let seed = 4242; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const WALL_H = 10, WALL_T = 3.2;

const groundRange = (x, z, w, d, rot) => {
  const c = Math.cos(rot), s = Math.sin(rot); let lo = Infinity, hi = -Infinity;
  for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, 0]]) {
    const lx = a * w / 2, lz = b * d / 2, h = heightAt(x + c * lx + s * lz, z - s * lx + c * lz);
    lo = Math.min(lo, h); hi = Math.max(hi, h);
  }
  return [lo, hi];
};
// ponto local (lx,lz) de uma caixa girada -> mundo
const toWorld = (x, z, rot, lx, lz) => [x + Math.cos(rot) * lx + Math.sin(rot) * lz, z - Math.sin(rot) * lx + Math.cos(rot) * lz];

// ---------------- muralhas, torres e portões ----------------
function buildWalls(kit, extras) {
  const gates = GATES.map((g) => {
    const [ax, az] = WALL[g.seg], [bx, bz] = WALL[(g.seg + 1) % WALL.length];
    return { ...g, x: ax + (bx - ax) * g.t, z: az + (bz - az) * g.t };
  });
  extras.gates = gates;
  for (let i = 0; i < WALL.length; i++) {
    if (WALL_SKIP.has(i)) continue;
    const [ax, az] = WALL[i], [bx, bz] = WALL[(i + 1) % WALL.length];
    const L = Math.hypot(bx - ax, bz - az), dx = (bx - ax) / L, dz = (bz - az) / L, rot = Math.atan2(dx, dz) + Math.PI / 2;
    // lado de fora: normal que sai da cidade
    let nx = dz, nz = -dx; if (inPoly((ax + bx) / 2 + nx * 6, (az + bz) / 2 + nz * 6, WALL)) { nx = -nx; nz = -nz; }
    const gate = gates.find((g) => g.seg === i);
    const gT = gate ? gate.t * L : -99;
    const n = Math.ceil(L / 9);
    for (let k = 0; k < n; k++) {
      const t0 = (k / n) * L, t1 = ((k + 1) / n) * L;
      if (gate && t1 > gT - 3 && t0 < gT + 3) { // trecho do portão: dividido em volta da abertura
        for (const [a, b] of [[t0, gT - 3], [gT + 3, t1]]) if (b - a > 0.2) piece(a, b);
        continue;
      }
      piece(t0, t1);
    }
    function piece(t0, t1) {
      const mx = ax + dx * (t0 + t1) / 2, mz = az + dz * (t0 + t1) / 2, len = t1 - t0 + 0.05;
      const g0 = Math.min(heightAt(ax + dx * t0, az + dz * t0), heightAt(ax + dx * t1, az + dz * t1), heightAt(mx, mz));
      const g1 = Math.max(heightAt(ax + dx * t0, az + dz * t0), heightAt(ax + dx * t1, az + dz * t1), heightAt(mx, mz));
      const top = g1 + WALL_H;
      kit.box('walls', mx, mz, len, WALL_T, g0 - 3, top, rot);
      // talude (base inclinada) e fiada de coroamento
      kit.box('stoneDark', mx + nx * 1.9, mz + nz * 1.9, len, 0.8, g0 - 3, g0 + 1.8, rot, { solid: false });
      kit.box('walls', mx + nx * 1.75, mz + nz * 1.75, len, 0.5, top - 0.8, top - 0.3, rot, { solid: false });
      // ameias no lado de fora
      const m = Math.floor(len / 2);
      for (let j = 0; j < m; j++) {
        const t = t0 + (j + 0.5) * (len / m);
        kit.box('walls', ax + dx * t + nx * 1.3, az + dz * t + nz * 1.3, 1.1, 0.6, top, top + 1.3, rot);
      }
      // parapeito interno baixo
      kit.box('walls', mx - nx * 1.45, mz - nz * 1.45, len, 0.3, top, top + 0.5, rot, { solid: false });
    }
    // torres a cada ~36 m e nos vértices
    const nt = Math.max(1, Math.round(L / 36));
    for (let k = 0; k <= nt; k++) {
      const t = (k / nt) * L; if (gate && Math.abs(t - gT) < 9) continue;
      tower(kit, ax + dx * t + nx * 1.5, az + dz * t + nz * 1.5, rot, 8, 5.5);
    }
    if (gate) {
      // portão: duas torres, verga e arco
      for (const s of [-1, 1]) tower(kit, gate.x + dx * s * 6.5 + nx * 2, gate.z + dz * s * 6.5 + nz * 2, rot, 7, 7);
      const gg = heightAt(gate.x, gate.z), top = gg + WALL_H + 1;
      kit.box('walls', gate.x, gate.z, 6.2, WALL_T + 0.4, gg + 6.2, top, rot);
      const arch = new THREE.TorusGeometry(3.05, 0.35, 6, 16, Math.PI);
      arch.rotateY(rot + Math.PI / 2); arch.translate(gate.x + nx * 1.9, gg + 3.6, gate.z + nz * 1.9);
      kit.geom('stoneDark', arch);
      // portas de madeira abertas
      for (const s of [-1, 1]) kit.box('darkWood', gate.x + dx * s * 2.6 - nx * 0.5, gate.z + dz * s * 2.6 - nz * 0.5, 0.2, 1.4, gg, gg + 5.8, rot + s * 1.2, { solid: false });
      // escada interna até o caminho de ronda
      const sx = gate.x + dx * 13 - nx * (WALL_T / 2 + 1.4), sz = gate.z + dz * 13 - nz * (WALL_T / 2 + 1.4);
      const sg = heightAt(sx, sz), rise = gg + WALL_H - sg;
      const run = rise / 0.3 * 0.42, stairRot = Math.atan2(dx, dz);
      kit.stairs('walls', sx + dx * run / 2, sz + dz * run / 2, 2.6, run, sg, sg + rise, stairRot);
    }
  }
}
function tower(kit, x, z, rot, size, extra) {
  const [g0, g1] = groundRange(x, z, size, size, rot), top = g1 + WALL_H + extra;
  kit.box('walls', x, z, size, size, g0 - 3, top, rot);
  kit.box('stoneDark', x, z, size + 0.5, size + 0.5, top - 1.4, top - 0.9, rot, { solid: false });
  for (let a = 0; a < 4; a++) for (let m = -1; m <= 1; m++) {
    const lx = a < 2 ? (a ? 1 : -1) * (size / 2 - 0.4) : m * size / 3.2, lz = a < 2 ? m * size / 3.2 : (a === 2 ? 1 : -1) * (size / 2 - 0.4);
    const [wx, wz] = toWorld(x, z, rot, lx, lz);
    kit.box('walls', wx, wz, 1.1, 1.1, top, top + 1.3, rot, { solid: false });
  }
  for (let f = 1; f <= 2; f++) for (const s of [-1, 1]) {
    const [wx, wz] = toWorld(x, z, rot, s * (size / 2 + 0.02), 0);
    kit.box('void', wx, wz, 0.1, 0.5, g1 + f * 4.5, g1 + f * 4.5 + 1.4, rot, { solid: false });
  }
}

// ---------------- torres de Herodes e palácio ----------------
function herodsTowers(kit, extras) {
  for (const [x, z, s, h, name] of [[-142, -14, 9, 26, 'Hípico'], [-133, -30, 11, 32, 'Fasael'], [-121, -44, 8, 23, 'Mariamne']]) {
    const g = heightAt(x, z);
    kit.box('ashlar', x, z, s, s, g - 2, g + h * 0.55);                     // base maciça
    kit.box('walls', x, z, s - 1.2, s - 1.2, g + h * 0.55, g + h);
    kit.box('stoneDark', x, z, s + 0.3, s + 0.3, g + h * 0.55 - 0.3, g + h * 0.55 + 0.4, 0, { solid: false });
    for (let f = 0; f < 3; f++) for (const [ox, oz] of [[0, s / 2 - 0.58], [0, -s / 2 + 0.58], [s / 2 - 0.58, 0], [-s / 2 + 0.58, 0]]) {
      kit.box(f === 1 && name === 'Fasael' ? 'lit' : 'void', x + ox * 1.01, z + oz * 1.01, ox ? 0.1 : 1, oz ? 0.1 : 1, g + h * 0.6 + f * 3.5, g + h * 0.6 + f * 3.5 + 1.6, 0, { solid: false });
    }
    for (let k = -2; k <= 2; k++) for (const [a, b] of [[k, 1], [k, -1], [1, k], [-1, k]]) {
      kit.box('walls', x + a * (a === 1 || a === -1 ? (s - 1.2) / 2 - 0.3 : (s - 1.2) / 5.5), z + b * (b === 1 || b === -1 ? (s - 1.2) / 2 - 0.3 : (s - 1.2) / 5.5), 0.9, 0.9, g + h, g + h + 1.2, 0, { solid: false });
    }
  }
  // palácio: alas em volta de um jardim com peristilo e espelhos d'água
  const P = PALACE, g = Math.min(heightAt(P.x0, P.z0), heightAt(P.x1, P.z1), heightAt(P.x0, P.z1), heightAt(P.x1, P.z0)) - 1;
  const H = g + 12;
  kit.box('plaster', (P.x0 + P.x1) / 2, P.z0 + 5, P.x1 - P.x0, 10, g, H);
  kit.box('plaster', (P.x0 + P.x1) / 2, P.z1 - 5, P.x1 - P.x0, 10, g, H);
  kit.box('plaster', P.x0 + 4, (P.z0 + P.z1) / 2, 8, P.z1 - P.z0 - 20, g, H);
  for (const [a, b] of [[P.z0 + 10, 33], [40, P.z1 - 10]]) kit.box('walls', P.x1 - 0.8, (a + b) / 2, 1.6, b - a, g, g + 6);
  kit.box('roof', (P.x0 + P.x1) / 2, P.z0 + 5, P.x1 - P.x0 + 0.6, 10.6, H, H + 0.4);
  kit.box('roof', (P.x0 + P.x1) / 2, P.z1 - 5, P.x1 - P.x0 + 0.6, 10.6, H, H + 0.4);
  kit.box('roof', P.x0 + 4, (P.z0 + P.z1) / 2, 8.6, P.z1 - P.z0 - 20, H, H + 0.4);
  for (const z of [P.z0 + 0.05, P.z1 - 0.05, P.z0 + 10.05, P.z1 - 10.05]) for (let x = P.x0 + 3; x < P.x1 - 2; x += 3.5) {
    kit.box(rnd() < 0.2 ? 'lit' : 'void', x, z, 1, 0.12, g + 7.5, g + 9.5, 0, { solid: false });
  }
  const fl = g + 0.3;
  kit.box('paving', (P.x0 + P.x1) / 2 + 4, (P.z0 + P.z1) / 2, P.x1 - P.x0 - 8, P.z1 - P.z0 - 20, g - 1, fl);
  for (let x = P.x0 + 11; x < P.x1 - 2; x += 3.4) for (const z of [P.z0 + 12, P.z1 - 12]) {
    kit.box('marble', x, z, 0.9, 0.9, fl, fl + 0.4, 0, { solid: false });
    kit.cyl('marble', x, z, 0.3, fl + 0.4, fl + 5.6, { seg: 8 });
    kit.box('gold', x, z, 0.8, 0.8, fl + 5.6, fl + 6, 0, { solid: false });
  }
  kit.box('roof', (P.x0 + P.x1) / 2 + 4, P.z0 + 11.6, P.x1 - P.x0 - 8, 3.6, fl + 6, fl + 6.4, 0, { solid: false });
  kit.box('roof', (P.x0 + P.x1) / 2 + 4, P.z1 - 11.6, P.x1 - P.x0 - 8, 3.6, fl + 6, fl + 6.4, 0, { solid: false });
  for (const pz of [(P.z0 + P.z1) / 2 - 5, (P.z0 + P.z1) / 2 + 5]) {
    kit.box('marble', -116, pz, 14, 5, fl, fl + 0.5);
    extras.pools.push([-116, pz, 12.6, 3.6, fl + 0.38]);
  }
  extras.palaceGarden = { x0: P.x0 + 10, x1: P.x1 - 3, z0: P.z0 + 14, z1: P.z1 - 14 };
}

// ---------------- Tanque de Siloé ----------------
function siloam(kit, extras) {
  const { x, z, w, d } = SILOAM, g = heightAt(x, z), top = g + 1.2;
  // borda com degraus por fora e por dentro (banho ritual)
  for (let i = 0; i < 3; i++) kit.box('walls', x, z, w + 6 - i * 1.0, d + 6 - i * 1.0, g - 1, g + 0.4 * (i + 1));
  kit.box('walls', x, z, w + 3, d + 3, g - 1, top);
  kit.box('paving', x, z, w, d, g - 1.5, g + 0.25); // fundo raso
  for (let i = 0; i < 2; i++) kit.box('paving', x, z, w + 2 - i * 1, d + 2 - i * 1, g - 1, g + 0.25 + (2 - i) * 0.3, 0, { solid: false });
  extras.pools.push([x, z, w + 2.6, d + 2.6, g + 0.85]);
  // colunata em volta
  for (let i = 0; i <= 6; i++) for (const s of [-1, 1]) {
    const cx = x - w / 2 - 2 + (w + 4) * (i / 6);
    kit.cyl('marble', cx, z + s * (d / 2 + 4), 0.3, g, g + 4.6, { seg: 8 });
  }
  for (const s of [-1, 1]) kit.box('roof', x, z + s * (d / 2 + 4), w + 6, 2.2, g + 4.6, g + 5.1, 0, { solid: false });
}

// ---------------- casas ----------------
function house(kit, x, z, w, d, floors, rot, style, extras) {
  const [g0, g1] = groundRange(x, z, w, d, rot);
  const base = g0 - 1.5, top = g1 + floors * 3.1 + 0.4;
  kit.box(style, x, z, w, d, base, top, rot);
  kit.box('roof', x, z, w + 0.3, d + 0.3, top, top + 0.28, rot);
  // parapeito do terraço
  const p = 0.22, ph = 0.75;
  for (const [lx, lz, ww, dd] of [[0, d / 2 - p / 2, w, p], [0, -d / 2 + p / 2, w, p], [w / 2 - p / 2, 0, p, d], [-w / 2 + p / 2, 0, p, d]]) {
    const [wx, wz] = toWorld(x, z, rot, lx, lz); kit.box(style, wx, wz, ww, dd, top + 0.28, top + 0.28 + ph, rot, { solid: false });
  }
  // porta (lado +z local, voltado para a rua) com verga de madeira
  const doorX = (rnd() - 0.5) * (w - 2.4);
  let [wx, wz] = toWorld(x, z, rot, doorX, d / 2 + 0.03);
  const gd = heightAt(wx, wz);
  kit.box('void', wx, wz, 1.15, 0.08, gd - 0.2, gd + 2.15, rot, { solid: false });
  [wx, wz] = toWorld(x, z, rot, doorX, d / 2 + 0.1);
  kit.box('darkWood', wx, wz, 1.6, 0.22, gd + 2.15, gd + 2.4, rot, { solid: false });
  // janelas pequenas (algumas com luz de lamparina)
  const nwin = 1 + Math.floor(rnd() * 3);
  for (let k = 0; k < nwin; k++) {
    const side = Math.floor(rnd() * 4), f = Math.min(floors, 1 + Math.floor(rnd() * floors)), yy = g1 + f * 3.1 - 1.6;
    if (yy + 0.8 > top) continue;
    const lit = rnd() < 0.12 ? 'lit' : 'void';
    const along = (rnd() - 0.5) * 0.6;
    const [lx, lz, ww, dd] = side === 0 ? [along * w, d / 2 + 0.03, 0.55, 0.08] : side === 1 ? [along * w, -d / 2 - 0.03, 0.55, 0.08] : side === 2 ? [w / 2 + 0.03, along * d, 0.08, 0.55] : [-w / 2 - 0.03, along * d, 0.08, 0.55];
    const [qx, qz] = toWorld(x, z, rot, lx, lz);
    kit.box(lit, qx, qz, ww, dd, yy, yy + 0.8, rot, { solid: false });
  }
  // escada externa até o terraço (dá para subir)
  if (rnd() < 0.3 && floors <= 2) {
    const side = rnd() < 0.5 ? 1 : -1, run = Math.min(d - 0.6, (top - g0) / 0.3 * 0.33);
    const [sx, sz] = toWorld(x, z, rot, side * (w / 2 + 0.65), 0);
    kit.stairs(style, sx, sz, 1.2, run, g0, top + 0.28, rot + Math.PI);
  }
  // pérgola de madeira no terraço
  if (rnd() < 0.22) {
    const pw = Math.min(3.4, w - 1), pd = Math.min(3, d - 1);
    for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      const [qx, qz] = toWorld(x, z, rot, a * pw / 2 + w / 4 - 0.3, b * pd / 2);
      kit.box('darkWood', qx, qz, 0.16, 0.16, top + 0.28, top + 2.5, rot, { solid: false });
    }
    for (let k = -2; k <= 2; k++) {
      const [qx, qz] = toWorld(x, z, rot, w / 4 - 0.3 + k * pw / 5, 0);
      kit.box('darkWood', qx, qz, 0.12, pd + 0.6, top + 2.4, top + 2.55, rot, { solid: false });
    }
    if (rnd() < 0.6) { const [qx, qz] = toWorld(x, z, rot, w / 4 - 0.3, 0); kit.box('awning', qx, qz, pw, pd, top + 2.55, top + 2.6, rot, { solid: false, uv: [Math.floor(rnd() * 4) / 4, 0, 0.25, 1] }); }
  }
  // jarros de barro no terraço
  if (rnd() < 0.25) for (let k = 0; k < 3; k++) {
    const [qx, qz] = toWorld(x, z, rot, -w / 2 + 0.8 + k * 0.7, -d / 2 + 0.8);
    kit.cyl('clay', qx, qz, 0.28, top + 0.28, top + 1.05, { r1: 0.18, seg: 8, solid: false });
  }
  // toldo colorido sobre a porta
  if (rnd() < 0.18) {
    const [qx, qz] = toWorld(x, z, rot, doorX, d / 2 + 0.9);
    const pl = new THREE.PlaneGeometry(2.6, 1.8); pl.rotateX(-Math.PI / 2 + 0.35); pl.rotateY(rot);
    const uv = pl.attributes.uv, c = Math.floor(rnd() * 4) / 4; for (let i = 0; i < uv.count; i++) uv.setXY(i, c + uv.getX(i) * 0.25, uv.getY(i));
    pl.translate(qx, gd + 2.7, qz); kit.geom('awning', pl);
  }
  if (rnd() < 0.12) { const [sx, sz] = toWorld(x, z, rot, w / 2 - 0.8, -d / 2 + 0.8); extras.smoke.push([sx, top + 0.8, sz]); }
}

function buildHouses(kit, extras) {
  const step = 8.2, segs = [];
  for (let i = 0; i < WALL.length; i++) if (!WALL_SKIP.has(i)) segs.push([...WALL[i], ...WALL[(i + 1) % WALL.length]]);
  const nearWall = (x, z) => Math.min(...segs.map(([ax, az, bx, bz]) => segDist(x, z, ax, az, bx, bz)));
  const reserved = [
    (x, z) => inRect(x, z, TM, 9), (x, z) => inRect(x, z, ANTONIA, 7), (x, z) => inRect(x, z, PALACE, 6),
    (x, z) => Math.hypot(x - SILOAM.x, z - SILOAM.z) < 18, (x, z) => x > -36 && x < -14 && z > 16 && z < 60, // escada oeste
    (x, z) => x < -112 && z < -4 && z > -54,                                                               // torres de Herodes
  ];
  let count = 0;
  for (let gx = -150; gx < 92; gx += step) for (let gz = -80; gz < 142; gz += step) {
    const x = gx + (rnd() - 0.5) * 3, z = gz + (rnd() - 0.5) * 3;
    if (!inPoly(x, z, WALL) || reserved.some((f) => f(x, z))) continue;
    const w = 5.2 + rnd() * 3.2, d = 5 + rnd() * 3;
    const r = Math.max(w, d) / 2;
    if (roadDist(x, z, STREETS) < r + 0.6 || nearWall(x, z) < r + 3.6) continue;
    // a porta (lado +z local) fica de frente para a rua mais próxima
    let best = Infinity, px = x, pz = z + 1;
    for (const st of STREETS) for (let i = 0; i < st.pts.length - 1; i++) {
      const [ax, az] = st.pts[i], [bx, bz] = st.pts[i + 1], dx = bx - ax, dz = bz - az, L = dx * dx + dz * dz;
      const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / L)), qx = ax + dx * t, qz = az + dz * t, dd = Math.hypot(x - qx, z - qz);
      if (dd < best) { best = dd; px = qx; pz = qz; }
    }
    const facing = Math.atan2(px - x, pz - z);
    const rot = best < 28 ? facing + (rnd() - 0.5) * 0.08 : Math.floor(rnd() * 4) * Math.PI / 2;
    const floors = rnd() < 0.55 ? 1 : rnd() < 0.8 ? 2 : 3;
    const style = rnd() < 0.55 ? 'plaster' : rnd() < 0.75 ? 'plasterWarm' : 'walls';
    house(kit, x, z, w, d, floors, rot, style, extras);
    // anexo (casa em L com pátio)
    if (rnd() < 0.25) {
      const [ax, az] = toWorld(x, z, rot, w / 2 + 1.6, -d / 4);
      if (roadDist(ax, az, STREETS) > 3 && inPoly(ax, az, WALL)) house(kit, ax, az, 3.2, d / 2, 1, rot, style, extras);
    }
    count++;
  }
  return count;
}

// ---------------- mercado: barracas com toldos ao longo da rua principal ----------------
function market(kit) {
  for (let x = -66; x < -38; x += 4.2) for (const s of [-1, 1]) {
    if (rnd() < 0.25) continue;
    const z = 1 + s * 4.6, g = heightAt(x, z);
    kit.box('darkWood', x, z, 3, 1.2, g, g + 0.9, 0, { solid: true });
    for (const [a, b] of [[-1.4, -0.6], [1.4, -0.6], [-1.4, 0.6], [1.4, 0.6]]) kit.box('darkWood', x + a, z + b * s, 0.1, 0.1, g, g + 2.4, 0, { solid: false });
    const pl = new THREE.PlaneGeometry(3.4, 2); pl.rotateX(-Math.PI / 2 + s * 0.25);
    const uv = pl.attributes.uv, c = Math.floor(rnd() * 4) / 4; for (let i = 0; i < uv.count; i++) uv.setXY(i, c + uv.getX(i) * 0.25, uv.getY(i));
    pl.translate(x, g + 2.5, z); kit.geom('awning', pl);
    for (let k = 0; k < 4; k++) kit.cyl(pick(['clay', 'darkWood']), x - 1 + k * 0.65, z, 0.22, g + 0.9, g + 1.2, { r1: 0.28, seg: 8, solid: false });
  }
}

export function buildCity(kit, extras) {
  buildWalls(kit, extras);
  herodsTowers(kit, extras);
  siloam(kit, extras);
  market(kit);
  return buildHouses(kit, extras);
}
