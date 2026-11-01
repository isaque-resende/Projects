import * as THREE from 'three';
import { GOLGOTHA, TOMB, LOOKOUT, GETHSEMANE, VILLAGE, INTRO_HOUSE, KIDRON, roadDist } from './layout.js';
import { heightAt, fbm, tombFloor } from './terrain.js';
import { toWorld } from './city.js';

let seed = 99; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// rocha irregular (icosaedro deformado com ruído)
function boulder(kit, x, y, z, r, sy = 0.8, mat = 'cliff') {
  const g = new THREE.IcosahedronGeometry(r, 1), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const vx = p.getX(i), vy = p.getY(i), vz = p.getZ(i), n = 0.75 + fbm(vx * 0.8 + x, vz * 0.8 + vy + z, 3) * 0.6;
    p.setXYZ(i, vx * n, vy * n * sy, vz * n);
  }
  g.computeVertexNormals();
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * r * 2, uv.getY(i) * r);
  g.translate(x, y, z);
  kit.geom(mat, g);
}

// paredão rochoso: plano subdividido e deformado; "carve" afunda regiões (olhos/boca da caveira)
function cliffFace(kit, cx, cz, yaw, w, h, y0, carve = [], mat = 'cliff') {
  const g = new THREE.PlaneGeometry(w, h, 40, 22), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    let d = (fbm(x * 0.28 + cx, y * 0.3 + cz, 4) - 0.5) * 4.2 + (fbm(x * 1.2, y * 1.6, 3) - 0.5) * 1.1 + Math.sin(y * 1.7 + x * 0.3) * 0.18;
    const edge = Math.min(1, (w / 2 - Math.abs(x)) / 3);           // bordas se curvam para trás
    d -= (1 - edge) * 2.5;
    d -= Math.max(0, (y / (h / 2)) ** 3) * 1.6;                      // topo arredondado
    for (const c of carve) {
      const q = ((x - c.x) / c.rx) ** 2 + ((y - c.y) / c.ry) ** 2;
      if (q < 1) d -= c.depth * (1 - q) ** 0.7;
    }
    p.setZ(i, d);
  }
  g.computeVertexNormals();
  const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w / 6, uv.getY(i) * h / 6);
  g.translate(0, y0 + h / 2, 0); g.rotateY(yaw); g.translate(cx, 0, cz);
  kit.geom(mat, g);
}

function cross(kit, x, z, h, lean = 0) {
  const g = heightAt(x, z);
  kit.box('darkWood', x, z, 0.26, 0.26, g - 0.6, g + h, lean);
  kit.box('darkWood', x, z, 2.3, 0.22, g + h - 1.25, g + h - 0.98, lean, { solid: false });
  for (let k = 0; k < 4; k++) boulder(kit, x + Math.cos(k * 1.6) * 0.5, g + 0.05, z + Math.sin(k * 1.6) * 0.5, 0.32, 0.6, 'fieldStone');
}

// ---------------- Gólgota ----------------
function golgotha(kit, extras) {
  const { x, z } = GOLGOTHA;
  // face da caveira voltada para a estrada (sudeste)
  const yaw = 0.55, fx = x + 9, fz = z + 13.5, g = heightAt(fx + 3, fz + 4) - 1.5;
  cliffFace(kit, fx, fz, yaw, 26, 13, g, [
    { x: -4.2, y: 1.4, rx: 2.5, ry: 2.1, depth: 3.6 },   // órbitas
    { x: 4.0, y: 1.6, rx: 2.4, ry: 2.2, depth: 3.6 },
    { x: 0.2, y: -1.2, rx: 0.9, ry: 1.6, depth: 1.4 },   // cavidade nasal
    { x: 0, y: -4.2, rx: 5.5, ry: 0.7, depth: 1.2 },     // fenda da boca
  ]);
  // sombra escura dentro das órbitas
  for (const [ox, oy] of [[-4.2, 1.4], [4.0, 1.6]]) { // fundo escuro das órbitas, só se ficar dentro do morro
    const c = new THREE.CircleGeometry(1.15, 14); c.scale(1.15, 1, 1); c.translate(ox, g + 6.5 + oy, -3.3); c.rotateY(yaw); c.translate(fx, 0, fz);
    const p = c.attributes.position; let inside = true;
    for (let i = 0; i < p.count; i++) if (heightAt(p.getX(i), p.getZ(i)) < p.getY(i) + 0.3) { inside = false; break; }
    if (inside) kit.geom('void', c); else c.dispose();
  }
  kit.solids.add({ x: fx - Math.sin(yaw) * 2, z: fz - Math.cos(yaw) * 2, hx: 12.5, hz: 2.5, rot: yaw, y0: g - 2, y1: g + 12 });
  for (let i = 0; i < 12; i++) boulder(kit, fx + (rnd() - 0.5) * 22, g + 0.3, fz + 2 + rnd() * 4, 0.6 + rnd() * 1.4, 0.7);
  // topo: três cruzes vazias
  cross(kit, x - 3.4, z - 1, 4.4, 0.08); cross(kit, x, z, 5.4); cross(kit, x + 3.4, z + 0.8, 4.4, -0.06);
  // títulus sobre a cruz central
  const gc = heightAt(x, z);
  extras.golgotha = { cross: [x, gc + 1, z], top: gc, face: [fx, fz, yaw, g] };
  kit.box('wood', x, z + 0.16, 0.9, 0.06, gc + 5.55, gc + 5.95, 0, { solid: false });
  for (let i = 0; i < 18; i++) { const a = rnd() * 6.28, r = 4 + rnd() * 10; boulder(kit, x + Math.cos(a) * r, heightAt(x + Math.cos(a) * r, z + Math.sin(a) * r), z + Math.sin(a) * r, 0.4 + rnd() * 0.9, 0.6); }
}

// ---------------- sepulcro no jardim ----------------
function gardenTomb(kit, extras) {
  const X = TOMB.x, FZ = TOMB.z + 8.5;            // face voltada para o sul
  const g = tombFloor();
  const cx0 = X - 2.5, cx1 = X + 2.5, cz0 = FZ - 7.5, cz1 = FZ - 1;   // câmara interna
  const top = g + 7;
  kit.box('cliff', X - 6.5, FZ - 5, 8, 10, g - 2, top);                          // massa à esquerda
  kit.box('cliff', X + 6.5, FZ - 5, 8, 10, g - 2, top);                          // à direita
  kit.box('cliff', X, cz0 - 1.25, 5, 2.5, g - 2, top);                           // fundo
  kit.box('cliff', X, (cz0 + FZ) / 2, 5, FZ - cz0, g + 2.4, top);                // teto da câmara
  kit.box('cliff', X - 1.625, cz1 + 0.5, 1.75, 1, g - 2, g + 2.4, 0, { solid: false });   // frente, à esquerda da porta
  kit.box('cliff', X + 1.625, cz1 + 0.5, 1.75, 1, g - 2, g + 2.4, 0, { solid: false });   // à direita
  kit.box('cliff', X, cz1 + 0.5, 1.5, 1, g + 2.05, g + 2.4, 0, { solid: false });         // verga (porta baixa, mas dá para sair)
  kit.solids.add({ x: X - 1.65, z: cz1 + 0.5, hx: 0.85, hz: 0.5, rot: 0, y0: g - 2, y1: g + 2.4 });
  kit.solids.add({ x: X + 1.65, z: cz1 + 0.5, hx: 0.85, hz: 0.5, rot: 0, y0: g - 2, y1: g + 2.4 });
  kit.solids.add({ x: X, z: cz1 + 0.5, hx: 0.8, hz: 0.5, rot: 0, y0: g + 2.05, y1: g + 2.4 });
  kit.box('cliff', X, (cz0 + cz1) / 2, 5, cz1 - cz0, g - 1, g + 0.02);           // piso
  // banco funerário e nicho ao fundo
  kit.box('cliff', X - 1.75, (cz0 + cz1) / 2 - 0.4, 1.5, 4.8, g, g + 0.7);
  kit.box('cliff', X + 1.4, cz0 + 0.6, 2.2, 1.2, g, g + 0.7);
  // os lençóis de linho, dobrados (Jo 20:5-7)
  kit.box('linen', X - 1.75, cz0 + 2.4, 0.42, 1.7, g + 0.7, g + 0.78, 0.04, { solid: false });
  kit.box('linen', X - 1.7, cz0 + 1.0, 0.36, 0.28, g + 0.7, g + 0.86, -0.2, { solid: false });
  // canaleta e a grande pedra redonda rolada para o lado
  kit.box('stoneDark', X - 1.2, FZ + 0.35, 7.5, 0.7, g - 0.3, g + 0.12, 0, { solid: false });
  {
    const st = new THREE.CylinderGeometry(1.15, 1.15, 0.45, 22); st.rotateX(Math.PI / 2);
    const uv = st.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1.2, uv.getY(i) * 1.2);
    st.translate(X - 3.6, g + 1.15, FZ + 0.35); kit.geom('cliff', st);
    kit.solids.add({ x: X - 3.6, z: FZ + 0.35, hx: 1.1, hz: 0.3, rot: 0, y0: g, y1: g + 2.3 });
  }
  // contorno natural do rochedo
  for (let i = 0; i < 16; i++) boulder(kit, X + (rnd() - 0.5) * 20, top - 0.5 + rnd(), FZ - 3 - rnd() * 8, 1.4 + rnd() * 1.8, 0.6);
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) boulder(kit, X + s * (10 + rnd() * 2), g + i * 1.6, FZ - 2 - rnd() * 6, 1.5 + rnd(), 0.8);
  cliffFace(kit, X, FZ - 0.05, 0, 21, 3.2, top - 1.6, [], 'cliff');
  for (const s of [-1, 1]) cliffFace(kit, X + s * 6.6, FZ + 0.4, 0, 8.4, top - g + 1.5, g - 1.2, [], 'cliff');
  extras.tomb = { X, FZ, g, stone: [X - 3.6, g + 1.1, FZ + 0.6], linen: [X - 1.75, g + 0.8, cz0 + 1.8] };
  // luz suave lá dentro: "Ele não está aqui"
  extras.lights.push([X - 0.5, g + 1.6, cz0 + 2.5, 0xffe3b0, 7, 0.6]);
  // jardim: muro baixo, poço, banco
  const wall = (ax, az, bx, bz) => { const L = Math.hypot(bx - ax, bz - az), rot = Math.atan2(bx - ax, bz - az) + Math.PI / 2; const mx = (ax + bx) / 2, mz = (az + bz) / 2, gg = heightAt(mx, mz); kit.box('fieldStone', mx, mz, L, 0.6, gg - 0.6, gg + 0.9, rot); };
  wall(X - 22, FZ + 18, X - 4, FZ + 18); wall(X + 4, FZ + 18, X + 20, FZ + 18); wall(X + 20, FZ + 18, X + 20, FZ + 2);
  const wx = X + 9, wz = FZ + 9, wg = heightAt(wx, wz);
  kit.cyl('fieldStone', wx, wz, 1.1, wg - 0.5, wg + 0.8, { seg: 14 });
  kit.box('darkWood', wx, wz, 2.4, 0.12, wg + 2.1, wg + 2.25, 0, { solid: false });
  for (const s of [-1, 1]) kit.box('darkWood', wx + s * 1.1, wz, 0.12, 0.12, wg + 0.8, wg + 2.25, 0, { solid: false });
  kit.box('fieldStone', X - 8, FZ + 6, 2, 0.6, heightAt(X - 8, FZ + 6), heightAt(X - 8, FZ + 6) + 0.5);
  extras.gardens.push({ x: X, z: FZ + 9, r: 14 });
}

// ---------------- Monte das Oliveiras: terraço e torre de vigia ----------------
function lookout(kit, extras) {
  const { x, z } = LOOKOUT, g = heightAt(x, z) + 0.2, T = g + 1.5;
  kit.box('walls', x, z, 16, 14, g - 3, T);
  kit.stairs('walls', x - 2, z + 8.2, 4, 2.4, g - 0.4, T, Math.PI);
  // parapeito voltado para a cidade, com banco
  for (const [lx, lz, w, d] of [[-7.8, 0, 0.5, 14], [0, -6.8, 16, 0.5], [-6.1, 6.8, 3.8, 0.5], [3.8, 6.8, 8.4, 0.5], [7.8, 0, 0.5, 14]]) kit.box('walls', x + lx, z + lz, w, d, T, T + 1.0);
  kit.box('stoneDark', x - 6.6, z, 0.8, 7, T, T + 0.45, 0, { solid: false });
  // torre 5x5 com escada externa em dois lances (sul e oeste) até o terraço de cima
  const tx = x + 4, tz = z - 2.5, TH = T + 7;
  kit.box('walls', tx, tz, 5, 5, T, TH);
  kit.box('stoneDark', tx, tz, 5.4, 5.4, TH - 0.5, TH, 0, { solid: false });
  for (const [px, pz, w, d] of [[tx, tz - 2.35, 5, 0.3], [tx + 2.35, tz, 0.3, 5], [tx, tz + 2.35, 5, 0.3], [tx - 2.35, tz + 1.1, 0.3, 2.8]]) kit.box('walls', px, pz, w, d, TH, TH + 1.05);
  for (let k = -2; k <= 2; k++) for (const [ox, oz] of [[k * 1.1, -2.35], [k * 1.1, 2.35], [2.35, k * 1.1]]) kit.box('walls', tx + ox, tz + oz, 0.5, 0.45, TH + 1.05, TH + 1.6, 0, { solid: false });
  kit.box('void', tx - 2.52, tz + 1.2, 0.08, 1.1, T, T + 2.1, 0, { solid: false });
  kit.stairs('walls', tx + 0.6, tz + 3.4, 1.6, 4.4, T, T + 3.5, -Math.PI / 2);   // lance 1: lado sul, sobe para oeste
  kit.box('walls', tx - 3.7, tz + 3.4, 3.0, 1.8, T, T + 3.5);                     // patamar
  kit.stairs('walls', tx - 3.4, tz + 0.5, 1.6, 4.8, T + 3.5, TH, Math.PI);        // lance 2: lado oeste, sobe para norte
  kit.box('walls', tx - 3.4, tz - 2.2, 1.8, 0.7, T, TH);                          // chegada ao terraço da torre
  kit.box('walls', tx - 3.4, tz - 2.7, 1.8, 0.3, TH, TH + 1.05);                   // parapeitos da chegada
  kit.box('walls', tx - 4.45, tz - 2.2, 0.3, 0.7, TH, TH + 1.05);
  extras.viewpoint = [tx, TH + 1.6, tz];
}

// ---------------- Getsêmani e o vale do Cedrom ----------------
function gethsemane(kit, extras) {
  const { x, z } = GETHSEMANE, g = heightAt(x, z);
  // prensa de azeite: bacia de pedra, mó vertical, viga
  kit.cyl('fieldStone', x + 3, z + 2, 1.7, g - 0.3, g + 0.75, { seg: 18 });
  const mill = new THREE.CylinderGeometry(0.85, 0.85, 0.42, 18); mill.rotateZ(Math.PI / 2);
  mill.translate(x + 3.4, g + 1.6, z + 2); kit.geom('fieldStone', mill);
  kit.box('darkWood', x + 3, z + 2, 3.6, 0.2, g + 1.55, g + 1.75, 0.3, { solid: false });
  kit.cyl('darkWood', x + 3, z + 2, 0.15, g + 0.75, g + 2.2, { seg: 6, solid: false });
  // a pedra onde Ele orou
  boulder(kit, x - 4, g + 0.2, z - 3, 1.6, 0.45, 'fieldStone');
  // muro de pedras soltas em volta do horto
  const wall = (ax, az, bx, bz) => {
    const L = Math.hypot(bx - ax, bz - az), n = Math.ceil(L / 4);
    for (let i = 0; i < n; i++) {
      const t0 = i / n, t1 = (i + 1) / n, mx = ax + (bx - ax) * (t0 + t1) / 2, mz = az + (bz - az) * (t0 + t1) / 2, gg = heightAt(mx, mz);
      if (roadDist(mx, mz) < 2.5) continue;
      const ga = heightAt(ax + (bx - ax) * t0, az + (bz - az) * t0), gb = heightAt(ax + (bx - ax) * t1, az + (bz - az) * t1);
      kit.box('fieldStone', mx, mz, L / n + 0.1, 0.7, Math.min(ga, gb, gg) - 0.5, Math.max(ga, gb, gg) + 0.8, Math.atan2(bx - ax, bz - az) + Math.PI / 2);
    }
  };
  wall(x - 16, z - 14, x + 16, z - 14); wall(x + 16, z - 14, x + 16, z + 14); wall(x - 16, z + 14, x + 16, z + 14); wall(x - 16, z - 14, x - 16, z + 14);
  extras.groves.push({ x, z, r: 14, n: 16, old: true });

  // Monumento de Absalão (no vale do Cedrom)
  const ax = KIDRON(-34) - 12, az = -34, ag = heightAt(ax, az);
  kit.box('rock', ax, az, 6.5, 6.5, ag - 1, ag + 6.5);
  for (const [ox, oz] of [[-3.3, -1.5], [-3.3, 1.5], [3.3, -1.5], [3.3, 1.5], [-1.5, -3.3], [1.5, -3.3], [-1.5, 3.3], [1.5, 3.3]]) kit.cyl('rock', ax + ox, az + oz, 0.25, ag, ag + 5.6, { seg: 8, solid: false });
  kit.box('rock', ax, az, 6.9, 6.9, ag + 5.6, ag + 6.6, 0, { solid: false });
  kit.box('rock', ax, az, 5, 5, ag + 6.6, ag + 8.4);
  kit.cyl('rock', ax, az, 2.2, ag + 8.4, ag + 9.4, { seg: 16 });
  const cone = new THREE.ConeGeometry(2.0, 5.5, 18); const p = cone.attributes.position;
  for (let i = 0; i < p.count; i++) { const y = p.getY(i), k = 0.75 + 0.25 * ((y + 2.75) / 5.5); p.setX(i, p.getX(i) * (1 - (1 - k) * 1.2)); p.setZ(i, p.getZ(i) * (1 - (1 - k) * 1.2)); }
  cone.computeVertexNormals(); cone.translate(ax, ag + 12.15, az); kit.geom('rock', cone);
  // túmulos escavados na encosta (fachadas)
  for (let i = 0; i < 5; i++) {
    const tz = -70 + i * 13, tx = KIDRON(tz) - 18, tg = heightAt(tx, tz);
    cliffFace(kit, tx, tz, Math.PI / 2, 9, 5, tg - 1, [{ x: 0, y: -0.6, rx: 0.7, ry: 1.0, depth: 1.6 }], 'cliff');
  }
  // ponte sobre o riacho
  const bz = 22, bx = 117.8, bg = heightAt(KIDRON(bz), bz) + 0.9, br = 1.22;
  kit.box('fieldStone', bx, bz, 8.5, 4.4, bg, bg + 0.55, br);
  for (const s of [-1, 1]) { const [qx, qz] = toWorld(bx, bz, br, s * 3.8, 0); kit.box('fieldStone', qx, qz, 1.2, 4.6, bg - 2.5, bg + 0.55, br, { solid: false }); }
  // cocho de pedra
  const cx = KIDRON(56) - 7, cz = 56, cg = heightAt(cx, cz);
  kit.box('fieldStone', cx, cz, 3.2, 1.2, cg - 0.3, cg + 0.75);
  extras.pools.push([cx, cz, 2.6, 0.7, cg + 0.62]);
}

// ---------------- aldeia, campos, aprisco, eira, torre da vinha ----------------
function countryside(kit, extras) {
  // casas da aldeia (barro, pátios, fornos)
  const pts = [];
  for (let i = 0; i < 26 && pts.length < 15; i++) {
    const a = rnd() * 6.28, r = 6 + rnd() * 24, x = VILLAGE.x + Math.cos(a) * r, z = VILLAGE.z + Math.sin(a) * r;
    if (pts.some(([px, pz]) => Math.hypot(px - x, pz - z) < 9) || roadDist(x, z) < 5 || Math.hypot(x - INTRO_HOUSE.x, z - INTRO_HOUSE.z) < 11) continue;
    pts.push([x, z]);
  }
  for (const [x, z] of pts) {
    const rot = rnd() * 0.6 - 0.3 + (rnd() < 0.5 ? 0 : Math.PI / 2), w = 5 + rnd() * 2.5, d = 4.5 + rnd() * 2;
    const [g0, g1] = [Math.min(...[[-1, -1], [1, 1], [1, -1], [-1, 1]].map(([a, b]) => heightAt(...toWorld(x, z, rot, a * w / 2, b * d / 2)))), Math.max(...[[-1, -1], [1, 1], [1, -1], [-1, 1]].map(([a, b]) => heightAt(...toWorld(x, z, rot, a * w / 2, b * d / 2))))];
    const top = g1 + 3.2;
    kit.box('clay', x, z, w, d, g0 - 1, top, rot);
    kit.box('roof', x, z, w + 0.4, d + 0.4, top, top + 0.3, rot);
    let [dx, dz] = toWorld(x, z, rot, 0, d / 2 + 0.03); kit.box('void', dx, dz, 1.1, 0.08, heightAt(dx, dz) - 0.2, heightAt(dx, dz) + 2, rot, { solid: false });
    [dx, dz] = toWorld(x, z, rot, w / 2 + 0.03, 0); kit.box(rnd() < 0.4 ? 'lit' : 'void', dx, dz, 0.08, 0.5, g1 + 1.4, g1 + 2.1, rot, { solid: false });
    // pátio murado na frente
    if (rnd() < 0.7) {
      for (const [lx, lz, ww, dd] of [[-w / 2, d / 2 + 2.5, 0.4, 5], [w / 2, d / 2 + 2.5, 0.4, 5], [-w / 4 - 0.6, d / 2 + 5, w / 2 - 1.2, 0.4]]) {
        const [qx, qz] = toWorld(x, z, rot, lx, lz); const gg = heightAt(qx, qz);
        kit.box('clay', qx, qz, ww, dd, gg - 0.5, gg + 1.4, rot);
      }
      // forno (tabun) com fumaça
      const [ox, oz] = toWorld(x, z, rot, w / 2 - 1, d / 2 + 3), og = heightAt(ox, oz);
      const dome = new THREE.SphereGeometry(0.75, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2); dome.translate(ox, og, oz); kit.geom('clay', dome);
      if (rnd() < 0.5) extras.smoke.push([ox, og + 0.8, oz]);
    }
    // pérgola com parreira
    if (rnd() < 0.45) {
      const [px, pz] = toWorld(x, z, rot, -w / 2 - 1.6, 0), pg = heightAt(px, pz);
      for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const [qx, qz] = toWorld(px, pz, rot, a * 1.2, b * 1.6); kit.box('darkWood', qx, qz, 0.15, 0.15, pg, pg + 2.4, rot, { solid: false }); }
      kit.box('darkWood', px, pz, 2.6, 3.4, pg + 2.35, pg + 2.5, rot, { solid: false });
      extras.vines.push([px, pg + 2.55, pz, rot]);
    }
  }
  // aprisco com cabana do pastor
  const sx = 96, sz = 150, sg = heightAt(sx, sz);
  for (let k = 0; k < 22; k++) {
    const a0 = (k / 22) * Math.PI * 2, a1 = ((k + 1) / 22) * Math.PI * 2;
    if (k === 5 || k === 6) continue; // entrada
    const mx = sx + Math.cos((a0 + a1) / 2) * 8, mz = sz + Math.sin((a0 + a1) / 2) * 8, gg = heightAt(mx, mz);
    kit.box('fieldStone', mx, mz, 2.4, 0.7, gg - 0.5, gg + 1.25, (a0 + a1) / 2 + Math.PI / 2);
  }
  kit.box('fieldStone', sx - 10, sz - 4, 3.4, 3, heightAt(sx - 10, sz - 4) - 0.5, heightAt(sx - 10, sz - 4) + 2.2);
  kit.box('darkWood', sx - 10, sz - 4, 4, 3.6, heightAt(sx - 10, sz - 4) + 2.2, heightAt(sx - 10, sz - 4) + 2.45);
  extras.pens.push({ x: sx, z: sz, r: 6.5 });
  // eira (chão de debulha) com feixes
  const ex = 128, ez = 128, eg = heightAt(ex, ez);
  kit.cyl('paving', ex, ez, 6.5, eg - 0.4, eg + 0.15, { seg: 26 });
  kit.cyl('fieldStone', ex, ez, 6.9, eg - 0.4, eg + 0.35, { seg: 26, open: true, solid: false });
  for (let k = 0; k < 7; k++) { const a = rnd() * 6.28, r = rnd() * 4; kit.cyl('field', ex + Math.cos(a) * r, ez + Math.sin(a) * r, 0.45, eg + 0.15, eg + 1.1, { r1: 0.3, seg: 8, solid: false }); }
  // torre de vigia na vinha (redonda)
  const vx = 168, vz = 82, vg = heightAt(vx, vz);
  kit.cyl('fieldStone', vx, vz, 2.6, vg - 1, vg + 5.5, { seg: 16 });
  kit.cyl('fieldStone', vx, vz, 2.9, vg + 5.5, vg + 6.1, { seg: 16, solid: false });
  kit.box('void', vx, vz + 2.62, 0.9, 0.1, vg, vg + 1.8, 0, { solid: false });
  extras.vineyard = { x: vx, z: vz, w: 34, d: 22 };
  // terraços de pedra seca nas encostas do Monte das Oliveiras
  for (let h = 18; h < 66; h += 4.6) {
    let prev = null;
    for (let z = -110; z <= 130; z += 3) {
      let lo = 120, hi = 215; if (heightAt(lo, z) > h || heightAt(hi, z) < h) { prev = null; continue; }
      for (let it = 0; it < 18; it++) { const m = (lo + hi) / 2; if (heightAt(m, z) < h) lo = m; else hi = m; }
      const x = (lo + hi) / 2;
      if (prev && Math.hypot(prev[0] - x, prev[1] - z) < 6 && roadDist(x, z) > 3 && Math.abs(z - LOOKOUT.z) + Math.abs(x - LOOKOUT.x) > 22 && Math.hypot(x - GETHSEMANE.x, z - GETHSEMANE.z) > 18) {
        const mx = (prev[0] + x) / 2, mz = (prev[1] + z) / 2, L = Math.hypot(prev[0] - x, prev[1] - z), gg = heightAt(mx, mz);
        const ga = heightAt(prev[0], prev[1]), gb = heightAt(x, z);
        if (fbm(x * 0.05, z * 0.05 + h) > 0.36) kit.box('walls', mx, mz, L + 0.2, 0.5, Math.min(ga, gb, gg) - 0.5, Math.max(ga, gb, gg) + 0.4, Math.atan2(x - prev[0], z - prev[1]) + Math.PI / 2, { solid: false });
      }
      prev = [x, z];
    }
  }
  // marcos de pedra ao longo das estradas
  for (const [x, z] of [[-96, -104], [108, 70], [30, 176], [-200, 6], [182, -22]]) { const g = heightAt(x, z); kit.cyl('fieldStone', x, z, 0.35, g - 0.2, g + 1.4, { seg: 8 }); }
}

// ---------------- a casa em Betânia onde o discípulo acorda (com interior) ----------------
function introHouse(kit, extras) {
  const { x, z, rot } = INTRO_HOUSE, W = 5.4, D = 4.4, T = 0.35, H = 2.8;
  const P = (lx, lz) => toWorld(x, z, rot, lx, lz);
  let g = Infinity, gMax = -Infinity;
  for (let a = -1; a <= 1; a += 0.5) for (let b = -1; b <= 1; b += 0.5) { const h = heightAt(...P(a * W / 2, b * D / 2)); g = Math.min(g, h); gMax = Math.max(gMax, h); }
  const F = gMax + 0.06, top = F + H;   // piso acima do terreno em toda a casa
  const wall = (lx, lz, w, d, y0 = g - 1.2, y1 = top) => { const [wx, wz] = P(lx, lz); kit.box('clay', wx, wz, w, d, y0, y1, rot); };
  wall(0, -D / 2 - T / 2, W + 2 * T, T);                   // fundo
  wall(-W / 2 - T / 2, 0, T, D);                           // esquerda
  wall(W / 2 + T / 2, 0, T, D);                            // direita
  wall(-W / 4 - 0.35, D / 2 + T / 2, W / 2 + 0.3, T);       // frente, à esquerda da porta
  wall(W / 2 - 0.65, D / 2 + T / 2, 1.3, T);                // frente, à direita da porta
  wall(0.6, D / 2 + T / 2, 1.75, T, F + 2.15, top);         // verga
  { const [wx, wz] = P(0, 0); kit.box('clay', wx, wz, W, D, g - 1.2, F, rot); kit.box('roof', wx, wz, W + 2 * T + 0.3, D + 2 * T + 0.3, top, top + 0.3, rot); kit.box('darkWood', wx, wz, W, D, top - 0.18, top, rot, { solid: false }); }
  for (let i = -2; i <= 2; i++) { const [wx, wz] = P(i * 1.1, 0); kit.box('darkWood', wx, wz, 0.16, D + 0.6, top - 0.36, top - 0.18, rot, { solid: false }); } // vigas
  { const [wx, wz] = P(0.6, D / 2 + T + 0.05); kit.box('darkWood', wx, wz, 1.6, 0.2, F + 2.15, F + 2.35, rot, { solid: false }); }
  // janela alta na parede esquerda
  { const [wx, wz] = P(-W / 2 - T - 0.01, -0.6); kit.box('void', wx, wz, 0.05, 0.6, F + 1.6, F + 2.1, rot, { solid: false }); }
  // cama: estrado de madeira, colchão de linho, coberta listrada
  const bedL = -0.6, bedZ = -D / 2 + 0.5;
  { const [wx, wz] = P(bedL, bedZ); kit.box('darkWood', wx, wz, 2.0, 0.95, F, F + 0.38, rot);
    kit.box('linen', wx, wz, 1.95, 0.9, F + 0.38, F + 0.47, rot, { solid: false });
    const [bx, bz] = P(bedL - 0.45, bedZ); kit.box('awning', bx, bz, 1.0, 0.95, F + 0.47, F + 0.52, rot, { solid: false, uv: [0.5, 0, 0.25, 1] }); }
  // lamparina na mesinha, jarro, esteira
  { const [wx, wz] = P(W / 2 - 0.5, -D / 2 + 0.5); kit.box('darkWood', wx, wz, 0.7, 0.6, F, F + 0.6, rot);
    kit.cyl('clay', wx, wz, 0.09, F + 0.6, F + 0.68, { r1: 0.06, seg: 8, solid: false });
    extras.flames.push([wx, F + 0.74, wz, 0.12]); extras.lights.push([wx, F + 1.0, wz, 0xffb066, 9, 0.5]); }
  { const [wx, wz] = P(W / 2 - 0.45, 0.9); kit.cyl('clay', wx, wz, 0.24, F, F + 0.7, { r1: 0.14, seg: 10 }); }
  { const [wx, wz] = P(0.6, 0.6); kit.box('awning', wx, wz, 1.4, 0.9, F, F + 0.02, rot, { solid: false, uv: [0.75, 0, 0.25, 1] }); }
  // onde ele está sentado (beira da cama, olhando para a porta) e o caminho até a porta
  const yaw = rot; // local +z (para a porta) vira o "frente" do personagem
  extras.intro = {
    sit: [...P(bedL + 0.2, bedZ + 0.62), F], yaw,
    door: P(0.6, D / 2 - 0.2), out: P(0.6, D / 2 + 3.2), out2: P(0.6, D / 2 + 6.5),
    camIn: [...P(W / 2 - 0.4, D / 2 - 0.4), F + 1.7], floor: F,
    houseW: P(0, 0),
  };
}

export function buildSites(kit, extras) {
  introHouse(kit, extras);
  golgotha(kit, extras);
  gardenTomb(kit, extras);
  lookout(kit, extras);
  gethsemane(kit, extras);
  countryside(kit, extras);
}
