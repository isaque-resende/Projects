import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// =====================================================================================
//  Personagem: judeu do séc. I. Corpo base (rosto, olhos, sobrancelhas) + cabelo longo e barba
//  re-ligados ao mesmo esqueleto + vestes geradas por código a partir da malha do corpo:
//  túnica de linho (kethoneth), cinto/faixa, manto listrado com franjas (tallit/himation), sandálias.
//  As vestes herdam os pesos de pele do corpo, então seguem todas as animações.
// =====================================================================================

const ARM = /^(upperarm|lowerarm|hand|thumb|index|middle|ring|pinky)/;
const HANDS = /^(hand|thumb|index|middle|ring|pinky)/;
const HEAD = /^(neck|Head)/;

// ---------------- texturas de tecido (canvas) ----------------
function canvasTexture(w, h, draw, { srgb = true, repeat = [1, 1] } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d'); draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); t.anisotropy = 4;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();

// tecelagem: ruído fino + fios horizontais/verticais
function weave(ctx, w, h, base, amp, threads = 2) {
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const o = (y * w + x) * 4;
    const t = ((x % threads === 0) ? -1 : 0) + ((y % threads === 0) ? -1 : 0);
    const n = (rnd() - 0.5) * amp + t * amp * 0.35;
    d[o] = Math.max(0, Math.min(255, d[o] + n)); d[o + 1] = Math.max(0, Math.min(255, d[o + 1] + n)); d[o + 2] = Math.max(0, Math.min(255, d[o + 2] + n));
  }
  ctx.putImageData(img, 0, 0);
}
function linenTex() {
  return canvasTexture(256, 256, (ctx, w, h) => {
    ctx.fillStyle = '#ece3cc'; ctx.fillRect(0, 0, w, h);
    // manchas suaves de uso
    for (let i = 0; i < 18; i++) { ctx.fillStyle = `rgba(170,150,110,${0.04 + rnd() * 0.05})`; ctx.beginPath(); ctx.ellipse(rnd() * w, rnd() * h, 20 + rnd() * 40, 10 + rnd() * 30, rnd() * 3, 0, 7); ctx.fill(); }
    weave(ctx, w, h, 0, 9, 2);
  });
}
function weaveNormal() {
  return canvasTexture(128, 128, (ctx, w, h) => {
    const img = ctx.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const o = (y * w + x) * 4;
      const nx = ((x + (y >> 1)) % 2 ? 10 : -10) + (rnd() - 0.5) * 8;
      const ny = ((y + (x >> 1)) % 2 ? 10 : -10) + (rnd() - 0.5) * 8;
      img.data[o] = 128 + nx; img.data[o + 1] = 128 + ny; img.data[o + 2] = 240; img.data[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, { srgb: false, repeat: [1, 1] });
}
// manto: lã marrom com listras escuras no comprimento e franjas (tzitzit) nas duas pontas
function mantleTex() {
  return canvasTexture(256, 512, (ctx, w, h) => {
    ctx.fillStyle = '#8a5a33'; ctx.fillRect(0, 0, w, h);
    const stripes = [[0.06, 0.05, '#5a361b'], [0.16, 0.02, '#e2cfa4'], [0.2, 0.03, '#5a361b'], [0.46, 0.08, '#6e4424'], [0.72, 0.03, '#5a361b'], [0.77, 0.02, '#e2cfa4'], [0.86, 0.05, '#5a361b']];
    for (const [x, sw, c] of stripes) { ctx.fillStyle = c; ctx.fillRect(x * w, 0, sw * w, h); }
    // faixas transversais perto das pontas (borda tecida)
    for (const yy of [0.075, 0.105, 0.895, 0.925]) { ctx.fillStyle = '#4a2c15'; ctx.fillRect(0, yy * h, w, h * 0.012); }
    weave(ctx, w, h, 0, 30, 2);
    // franjas: fios soltos com transparência nas pontas (alphaTest)
    const fr = Math.round(h * 0.06);
    for (const [y0, dir] of [[0, 1], [h - 1, -1]]) {
      ctx.clearRect(0, dir > 0 ? 0 : h - fr, w, fr);
      for (let x = 0; x < w; x += 4) {
        const len = fr * (0.65 + rnd() * 0.35);
        ctx.fillStyle = rnd() < 0.15 ? '#e8dcc0' : '#7a4c28';
        ctx.fillRect(x + 1, dir > 0 ? fr - len : h - fr, 2, len);
      }
    }
  });
}
// versão em tons de cinza do manto, para tingir cada pessoa com uma cor
let neutralCache = null;
export function neutralMantle() {
  if (neutralCache) return neutralCache;
  const src = mantleTex().image, c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const x = c.getContext('2d'); x.drawImage(src, 0, 0);
  const img = x.getImageData(0, 0, c.width, c.height), d = img.data;
  for (let i = 0; i < d.length; i += 4) { const l = Math.min(255, (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) * 1.9); d[i] = d[i + 1] = d[i + 2] = l; }
  x.putImageData(img, 0, 0);
  neutralCache = new THREE.CanvasTexture(c); neutralCache.wrapS = neutralCache.wrapT = THREE.RepeatWrapping; neutralCache.colorSpace = THREE.SRGBColorSpace;
  return neutralCache;
}
function sashTex() {
  return canvasTexture(128, 64, (ctx, w, h) => {
    ctx.fillStyle = '#a0723f'; ctx.fillRect(0, 0, w, h);
    for (const [y, hh, c] of [[0.1, 0.12, '#6b4322'], [0.42, 0.16, '#c49a5c'], [0.78, 0.12, '#6b4322']]) { ctx.fillStyle = c; ctx.fillRect(0, y * h, w, hh * h); }
    weave(ctx, w, h, 0, 26, 2);
  });
}
function leatherTex() {
  return canvasTexture(64, 64, (ctx, w, h) => { ctx.fillStyle = '#6a4022'; ctx.fillRect(0, 0, w, h); weave(ctx, w, h, 0, 30, 3); });
}

// ---------------- análise do corpo ----------------
function analyze(body) {
  const g = body.geometry;
  const P = g.attributes.position, N = g.attributes.normal, SI = g.attributes.skinIndex, SW = g.attributes.skinWeight, UV = g.attributes.uv;
  const names = body.skeleton.bones.map((b) => b.name);
  const n = P.count, dom = new Array(n), pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = P.getX(i); pos[i * 3 + 1] = P.getY(i); pos[i * 3 + 2] = P.getZ(i);
    const ws = [SW.getX(i), SW.getY(i), SW.getZ(i), SW.getW(i)], is = [SI.getX(i), SI.getY(i), SI.getZ(i), SI.getW(i)];
    let b = 0; for (let k = 1; k < 4; k++) if (ws[k] > ws[b]) b = k;
    dom[i] = names[is[b]] || '';
  }
  // posição de cada osso na pose de ligação (T-pose), no espaço da malha
  const bone = {};
  body.skeleton.bones.forEach((bn, i) => { bone[bn.name] = new THREE.Vector3().setFromMatrixPosition(body.skeleton.boneInverses[i].clone().invert()); });
  return { g, P, N, SI, SW, UV, names, n, dom, pos, bone };
}

// grade espacial para vizinhos mais próximos
function makeGrid(info, accept, cell = 0.05) {
  const map = new Map(), key = (x, y, z) => `${x},${y},${z}`;
  for (let i = 0; i < info.n; i++) {
    if (!accept(i)) continue;
    const k = key(Math.floor(info.pos[i * 3] / cell), Math.floor(info.pos[i * 3 + 1] / cell), Math.floor(info.pos[i * 3 + 2] / cell));
    (map.get(k) ?? map.set(k, []).get(k)).push(i);
  }
  return { map, cell, key };
}
function knn(info, grid, x, y, z, k = 6) {
  const cx = Math.floor(x / grid.cell), cy = Math.floor(y / grid.cell), cz = Math.floor(z / grid.cell);
  const found = [];
  for (let r = 0; r < 12 && found.length < k; r++) {
    for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let c = -r; c <= r; c++) {
      if (Math.max(Math.abs(a), Math.abs(b), Math.abs(c)) !== r) continue;
      const list = grid.map.get(grid.key(cx + a, cy + b, cz + c)); if (!list) continue;
      for (const i of list) found.push([i, Math.hypot(info.pos[i * 3] - x, info.pos[i * 3 + 1] - y, info.pos[i * 3 + 2] - z)]);
    }
    if (found.length >= k) { r++; /* um anel extra para garantir os mais próximos */
      for (let a = -r; a <= r; a++) for (let b = -r; b <= r; b++) for (let c = -r; c <= r; c++) {
        if (Math.max(Math.abs(a), Math.abs(b), Math.abs(c)) !== r) continue;
        const list = grid.map.get(grid.key(cx + a, cy + b, cz + c)); if (!list) continue;
        for (const i of list) found.push([i, Math.hypot(info.pos[i * 3] - x, info.pos[i * 3 + 1] - y, info.pos[i * 3 + 2] - z)]);
      }
      break;
    }
  }
  found.sort((p, q) => p[1] - q[1]);
  return found.slice(0, k);
}
// transfere pesos de pele: média ponderada dos vizinhos, mantém os 4 ossos mais fortes
function transferWeights(info, grid, positions, k = 6) {
  const n = positions.length / 3, si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
  const comps = (attr, i) => [attr.getX(i), attr.getY(i), attr.getZ(i), attr.getW(i)];
  for (let v = 0; v < n; v++) {
    const near = knn(info, grid, positions[v * 3], positions[v * 3 + 1], positions[v * 3 + 2], k);
    const acc = new Map();
    for (const [i, d] of near) {
      const w = 1 / ((d + 0.01) ** 2), is = comps(info.SI, i), ws = comps(info.SW, i);
      for (let c = 0; c < 4; c++) if (ws[c] > 0) acc.set(is[c], (acc.get(is[c]) || 0) + w * ws[c]);
    }
    const top = [...acc].sort((a, b) => b[1] - a[1]).slice(0, 4);
    const sum = top.reduce((s, t) => s + t[1], 0) || 1;
    top.forEach(([b, w], c) => { si[v * 4 + c] = b; sw[v * 4 + c] = w / sum; });
  }
  return { si, sw };
}

// recorte de seção transversal: raio máximo por ângulo em volta do eixo Y
function polarSection(info, y, band, accept, bins = 40, center) {
  const r = new Float32Array(bins).fill(-1);
  let cx = 0, cz = 0, cnt = 0;
  const pick = [];
  for (let i = 0; i < info.n; i++) {
    const yy = info.pos[i * 3 + 1]; if (Math.abs(yy - y) > band || !accept(i)) continue;
    pick.push(i); cx += info.pos[i * 3]; cz += info.pos[i * 3 + 2]; cnt++;
  }
  if (!cnt) return null;
  if (center) { cx = center[0]; cz = center[1]; } else { cx /= cnt; cz /= cnt; }
  for (const i of pick) {
    const dx = info.pos[i * 3] - cx, dz = info.pos[i * 3 + 2] - cz;
    const a = (Math.atan2(dz, dx) + Math.PI * 2) % (Math.PI * 2), b = Math.floor(a / (Math.PI * 2) * bins) % bins;
    r[b] = Math.max(r[b], Math.hypot(dx, dz));
  }
  // preenche ângulos vazios interpolando vizinhos
  for (let pass = 0; pass < bins; pass++) {
    let changed = false;
    for (let b = 0; b < bins; b++) if (r[b] < 0) {
      const p = r[(b + bins - 1) % bins], q = r[(b + 1) % bins];
      if (p >= 0 || q >= 0) { r[b] = p >= 0 && q >= 0 ? (p + q) / 2 : Math.max(p, q); changed = true; }
    }
    if (!changed) break;
  }
  // convexifica levemente (o pano passa por cima das reentrâncias)
  const out = Float32Array.from(r);
  for (let b = 0; b < bins; b++) out[b] = Math.max(r[b], (r[(b + bins - 1) % bins] + r[(b + 1) % bins]) / 2);
  return { r: out, cx, cz, bins };
}
const sampleBins = (sec, ang) => {
  const f = (((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * sec.bins;
  const a = Math.floor(f) % sec.bins, b = (a + 1) % sec.bins, t = f - Math.floor(f);
  return sec.r[a] * (1 - t) + sec.r[b] * t;
};

// monta uma SkinnedMesh a partir de arrays e de pesos
function skinned(info, body, { positions, uvs, index, si, sw }, material) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
  g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
  g.setIndex(index);
  g.computeVertexNormals();
  const m = new THREE.SkinnedMesh(g, material);
  m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false;
  m.position.copy(body.position); m.quaternion.copy(body.quaternion); m.scale.copy(body.scale);
  body.parent.add(m);
  m.bind(body.skeleton, body.bindMatrix);
  (body.userData.garments ??= []).push(m);
  return m;
}
// grade (linhas x colunas) -> triângulos
function gridIndex(rows, cols, wrap) {
  const idx = [], C = wrap ? cols : cols - 1;
  for (let r = 0; r < rows - 1; r++) for (let c = 0; c < C; c++) {
    const a = r * cols + c, b = r * cols + ((c + 1) % cols), d = (r + 1) * cols + c, e = (r + 1) * cols + ((c + 1) % cols);
    idx.push(a, d, b, b, d, e);
  }
  return idx;
}

// ---------------- peças ----------------
// parte de cima da túnica + mangas: "infla" a própria malha do corpo (pesos idênticos)
function tunicTop(info, body, mat) {
  const B = info.bone, elbowX = Math.abs(B.lowerarm_l.x), wristX = Math.abs(B.hand_l.x), shX = Math.abs(B.upperarm_l.x);
  const cuffX = elbowX + (wristX - elbowX) * 0.45;
  const neckY = B.neck_01.y + 0.015, hipY = B.pelvis.y - 0.12;
  const pickV = (i) => {
    const d = info.dom[i], x = Math.abs(info.pos[i * 3]), y = info.pos[i * 3 + 1];
    if (HANDS.test(d) || HEAD.test(d) && y > neckY) return false;
    if (y > neckY) return false;
    if (y < hipY) return false;
    if (x > cuffX) return false;
    return true;
  };
  const off = (i) => {
    const x = Math.abs(info.pos[i * 3]);
    if (x > shX + 0.04) return 0.022 + 0.04 * Math.min(1, (x - shX) / (cuffX - shX)); // manga larga
    return 0.03;
  };
  const tri = info.g.index.array, map = new Map(), positions = [], uvs = [], si = [], sw = [], index = [];
  const vid = (i) => {
    if (map.has(i)) return map.get(i);
    const k = positions.length / 3, o = off(i);
    positions.push(info.pos[i * 3] + info.N.getX(i) * o, info.pos[i * 3 + 1] + info.N.getY(i) * o, info.pos[i * 3 + 2] + info.N.getZ(i) * o);
    uvs.push(info.pos[i * 3] * 1.5, info.pos[i * 3 + 1] * 1.5 + info.pos[i * 3 + 2] * 1.5);
    si.push(info.SI.getX(i), info.SI.getY(i), info.SI.getZ(i), info.SI.getW(i));
    sw.push(info.SW.getX(i), info.SW.getY(i), info.SW.getZ(i), info.SW.getW(i));
    map.set(i, k); orig.push(i); return k;
  };
  const orig = [];
  for (let t = 0; t < tri.length; t += 3) {
    const [a, b, c] = [tri[t], tri[t + 1], tri[t + 2]];
    if (pickV(a) && pickV(b) && pickV(c)) index.push(vid(a), vid(b), vid(c));
  }
  // tecido não marca músculo: suaviza o tronco (Laplaciano), preservando bordas (gola, punho, cintura)
  const nV = positions.length / 3, nb = Array.from({ length: nV }, () => new Set()), edgeCount = new Map();
  for (let t = 0; t < index.length; t += 3) for (let e = 0; e < 3; e++) {
    const a = index[t + e], b = index[t + (e + 1) % 3]; nb[a].add(b); nb[b].add(a);
    const k = a < b ? `${a}_${b}` : `${b}_${a}`; edgeCount.set(k, (edgeCount.get(k) || 0) + 1);
  }
  const border = new Uint8Array(nV);
  for (const [k, c] of edgeCount) if (c === 1) { const [a, b] = k.split('_').map(Number); border[a] = border[b] = 1; }
  const P0 = Float32Array.from(positions);
  for (let it = 0; it < 10; it++) {
    const cur = Float32Array.from(positions);
    for (let v = 0; v < nV; v++) {
      if (border[v] || !nb[v].size) continue;
      const x = Math.abs(P0[v * 3]); const k = x > shX + 0.06 ? 0.25 : 0.6; // mangas: suaviza menos
      let ax = 0, ay = 0, az = 0; for (const u of nb[v]) { ax += cur[u * 3]; ay += cur[u * 3 + 1]; az += cur[u * 3 + 2]; }
      const n = nb[v].size;
      positions[v * 3] += (ax / n - cur[v * 3]) * k; positions[v * 3 + 1] += (ay / n - cur[v * 3 + 1]) * k; positions[v * 3 + 2] += (az / n - cur[v * 3 + 2]) * k;
    }
  }
  // a suavização encolhe ombros e peito: empurra de volta para ficar sempre por fora da pele
  for (let v = 0; v < nV; v++) {
    const i = orig[v], nx = info.N.getX(i), ny = info.N.getY(i), nz = info.N.getZ(i);
    const d = (positions[v * 3] - info.pos[i * 3]) * nx + (positions[v * 3 + 1] - info.pos[i * 3 + 1]) * ny + (positions[v * 3 + 2] - info.pos[i * 3 + 2]) * nz;
    const need = 0.026 - d;
    if (need > 0) { positions[v * 3] += nx * need; positions[v * 3 + 1] += ny * need; positions[v * 3 + 2] += nz * need; }
  }
  return skinned(info, body, { positions, uvs, index, si: new Uint16Array(si), sw: new Float32Array(sw) }, mat);
}

// saia da túnica até o tornozelo: anéis medidos no corpo, com caimento e dobras
function tunicSkirt(info, body, grid, mat) {
  const B = info.bone;
  const yTop = B.pelvis.y + 0.1, yHem = B.foot_l.y + 0.05;
  const rows = 30, cols = 44;
  const legAccept = (i) => !ARM.test(info.dom[i]) && !HEAD.test(info.dom[i]) && !/^clavicle/.test(info.dom[i]);
  const secs = [];
  for (let r = 0; r < rows; r++) {
    const y = yTop + (yHem - yTop) * (r / (rows - 1));
    secs.push(polarSection(info, y, 0.035, legAccept, cols, [0, 0.0]) || secs[secs.length - 1]);
  }
  const radius = [];
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1), row = [];
    for (let c = 0; c < cols; c++) {
      const ang = (c / cols) * Math.PI * 2;
      let rad = sampleBins(secs[r], ang);
      if (r > 0) rad = Math.max(rad, radius[r - 1][c] * 0.995); // pano cai: não estreita ao descer
      row.push(rad);
    }
    // suaviza em volta
    const sm = row.map((v, c) => (row[(c + cols - 1) % cols] + 2 * v + row[(c + 1) % cols]) / 4);
    radius.push(sm);
  }
  const positions = [], uvs = [];
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1), y = yTop + (yHem - yTop) * t;
    for (let c = 0; c < cols; c++) {
      const ang = (c / cols) * Math.PI * 2;
      const fold = 1 + (0.02 + 0.07 * t) * Math.sin(ang * 7 + 0.6) * 0.5 + 0.018 * t * Math.sin(ang * 13);
      const rad = (radius[r][c] + 0.045 + 0.12 * t * t) * fold;
      positions.push(Math.cos(ang) * rad, y, Math.sin(ang) * rad);
      uvs.push(c / cols * 2.5, t * 1.6);
    }
  }
  const { si, sw } = transferWeights(info, grid, positions, 8);
  const pelvis = info.names.indexOf('pelvis');
  for (let v = 0; v < positions.length / 3; v++) {
    const t = Math.floor(v / cols) / (rows - 1), k = 0.32 - 0.2 * t; // topo mais preso ao quadril
    const acc = new Map();
    for (let c = 0; c < 4; c++) if (sw[v * 4 + c] > 0) acc.set(si[v * 4 + c], (acc.get(si[v * 4 + c]) || 0) + sw[v * 4 + c] * (1 - k));
    acc.set(pelvis, (acc.get(pelvis) || 0) + k);
    const top = [...acc].sort((a, b) => b[1] - a[1]).slice(0, 4), sum = top.reduce((q, e) => q + e[1], 0);
    for (let c = 0; c < 4; c++) { si[v * 4 + c] = top[c] ? top[c][0] : 0; sw[v * 4 + c] = top[c] ? top[c][1] / sum : 0; }
  }
  const m = skinned(info, body, { positions, uvs, index: gridIndex(rows, cols, true), si, sw }, mat);
  m.userData.radius = (y, ang) => { // raio externo da saia (para pendurar o cinto)
    const t = THREE.MathUtils.clamp((y - yTop) / (yHem - yTop), 0, 1), r = Math.round(t * (rows - 1));
    const c = Math.round((((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * cols) % cols;
    return (radius[r][c] + 0.045 + 0.12 * t * t);
  };
  m.userData.yTop = yTop;
  return m;
}

// cinto/faixa com as pontas caindo à frente
function sash(info, body, grid, mat, skirt) {
  const B = info.bone, y0 = B.pelvis.y + 0.07, h = 0.1, cols = 40, rows = 4;
  const torso = (i) => !ARM.test(info.dom[i]) && !HEAD.test(info.dom[i]);
  const positions = [], uvs = [];
  for (let r = 0; r < rows; r++) {
    const y = y0 + h * (r / (rows - 1) - 0.5), sec = polarSection(info, y, 0.03, torso, cols, [0, 0]);
    for (let c = 0; c < cols; c++) {
      const ang = (c / cols) * Math.PI * 2, rad = Math.max(sampleBins(sec, ang) + 0.05, skirt.userData.radius(skirt.userData.yTop, ang) + 0.012);
      positions.push(Math.cos(ang) * rad, y, Math.sin(ang) * rad); uvs.push(c / cols * 6, r / (rows - 1));
    }
  }
  const idx = gridIndex(rows, cols, true);
  // pontas: duas tiras penduradas na frente-esquerda
  for (const [a0, len] of [[1.05, 0.42], [1.25, 0.34]]) {
    const base = positions.length / 3, R = 8, C = 3;
    for (let r = 0; r < R; r++) {
      const y = y0 - h / 2 - len * (r / (R - 1));
      for (let c = 0; c < C; c++) {
        const ang = a0 + (c - 1) * 0.06, rad = skirt.userData.radius(y, ang) + 0.016;
        positions.push(Math.cos(ang) * rad, y, Math.sin(ang) * rad); uvs.push(c / (C - 1), 1 + r * 0.6);
      }
    }
    for (let r = 0; r < R - 1; r++) for (let c = 0; c < C - 1; c++) {
      const a = base + r * C + c; idx.push(a, a + C, a + 1, a + 1, a + C, a + C + 1);
    }
  }
  const { si, sw } = transferWeights(info, grid, positions, 8);
  return skinned(info, body, { positions, uvs, index: idx, si, sw }, mat);
}

// manto: painel por cima do ombro esquerdo (frente e costas até o joelho) + faixa diagonal em volta do tronco
function mantle(info, body, grid, mat) {
  const B = info.bone;
  const torso = (i) => !ARM.test(info.dom[i]) && !/^Head/.test(info.dom[i]);
  const parts = [];
  // --- (a) painel sobre o ombro esquerdo (+x) ---
  {
    const xs = [], cols = 9, rows = 46, kneeY = B.calf_l.y + 0.06;
    for (let c = 0; c < cols; c++) xs.push(0.035 + (0.235 - 0.035) * (c / (cols - 1)));
    const grid2 = [];
    for (const X of xs) {
      // perfil YZ da fatia: frente (z máx) e costas (z mín) por altura, topo (y máx)
      const H = 60, front = new Float32Array(H).fill(-9), back = new Float32Array(H).fill(9);
      let topY = 0, topZ = 0;
      for (let i = 0; i < info.n; i++) {
        const x = info.pos[i * 3], y = info.pos[i * 3 + 1], z = info.pos[i * 3 + 2];
        if (Math.abs(x - X) > 0.03 || y < 0.3 || !(torso(i) || /^upperarm/.test(info.dom[i]) && x < 0.26)) continue;
        if (/^Head/.test(info.dom[i])) continue;
        const b = Math.min(H - 1, Math.floor(y / 1.8 * H));
        front[b] = Math.max(front[b], z); back[b] = Math.min(back[b], z);
        if (y > topY && !/^neck/.test(info.dom[i])) { topY = y; topZ = z; }
      }
      // caimento: do ponto mais saliente pra baixo o pano cai reto
      for (let b = H - 2; b >= 0; b--) { if (front[b + 1] > -9) front[b] = Math.max(front[b], front[b + 1] - 0.004); if (back[b + 1] < 9) back[b] = Math.min(back[b], back[b + 1] + 0.004); }
      const m = 0.045 + 0.02 * (X - 0.035) / 0.2;
      const path = [];
      const fy = (y) => front[Math.min(H - 1, Math.max(0, Math.floor(y / 1.8 * H)))] + m;
      const by = (y) => back[Math.min(H - 1, Math.max(0, Math.floor(y / 1.8 * H)))] - m;
      const yS = topY - 0.1;
      for (let y = kneeY; y <= yS; y += 0.03) path.push([y, fy(y)]);
      // arco por cima do ombro
      const zf = fy(yS), zb = by(yS), cz = (zf + zb) / 2, rz = (zf - zb) / 2, ry = topY + m - yS;
      for (let k = 1; k < 12; k++) { const a = (k / 12) * Math.PI; path.push([yS + Math.sin(a) * ry, cz + Math.cos(a) * rz]); }
      for (let y = yS; y >= kneeY - 0.04; y -= 0.03) path.push([y, by(y)]);
      // reamostra com espaçamento uniforme
      const L = [0]; for (let k = 1; k < path.length; k++) L.push(L[k - 1] + Math.hypot(path[k][0] - path[k - 1][0], path[k][1] - path[k - 1][1]));
      const total = L[L.length - 1], col = [];
      for (let r = 0; r < rows; r++) {
        const s = (r / (rows - 1)) * total; let k = 1; while (k < L.length - 1 && L[k] < s) k++;
        const t = (s - L[k - 1]) / Math.max(1e-6, L[k] - L[k - 1]);
        col.push([X, path[k - 1][0] + (path[k][0] - path[k - 1][0]) * t, path[k - 1][1] + (path[k][1] - path[k - 1][1]) * t]);
      }
      grid2.push(col);
    }
    const positions = [], uvs = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const p = grid2[c][r]; positions.push(p[0], p[1], p[2]); uvs.push(c / (cols - 1), r / (rows - 1));
    }
    const { si, sw } = transferWeights(info, grid, positions, 8);
    parts.push(skinned(info, body, { positions, uvs, index: gridIndex(rows, cols, false), si, sw }, mat));
  }
  // --- (b) faixa diagonal: da axila esquerda até o quadril direito, frente e costas ---
  {
    const cols = 48, rows = 7, yHigh = B.spine_03.y + 0.02, yLow = B.pelvis.y - 0.02, bandH = 0.3;
    const positions = [], uvs = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const ang = (c / cols) * Math.PI * 2; // 0 = +x (lado esquerdo do personagem)
      const yc = yLow + (yHigh - yLow) * (1 + Math.cos(ang)) / 2;
      const y = yc + bandH * (r / (rows - 1) - 0.5) * (0.85 + 0.15 * Math.cos(ang));
      const sec = polarSection(info, y, 0.03, torso, 40, [0, 0]);
      const rad = (sec ? sampleBins(sec, ang) : 0.18) + 0.06 + 0.012 * Math.sin(ang * 9 + r);
      positions.push(Math.cos(ang) * rad, y, Math.sin(ang) * rad); uvs.push(r / (rows - 1) * 0.5 + 0.25, c / cols * 2.2);
    }
    const { si, sw } = transferWeights(info, grid, positions, 8);
    parts.push(skinned(info, body, { positions, uvs, index: gridIndex(rows, cols, true), si, sw }, mat));
  }
  return parts;
}

// sandálias: sola sob cada pé + tiras de couro (anéis da própria malha do pé)
function sandals(info, body, grid, mat) {
  const out = [];
  for (const side of ['l', 'r']) {
    const foot = new RegExp(`^(foot|ball)_${side}`);
    let minX = 9, maxX = -9, minZ = 9, maxZ = -9, minY = 9;
    for (let i = 0; i < info.n; i++) if (foot.test(info.dom[i])) {
      const x = info.pos[i * 3], y = info.pos[i * 3 + 1], z = info.pos[i * 3 + 2];
      if (y < 0.05) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z); }
      minY = Math.min(minY, y);
    }
    // sola: caixa arredondada em planta (oval) com espessura
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2, ax = (maxX - minX) / 2 + 0.012, az = (maxZ - minZ) / 2 + 0.015;
    const seg = 20, positions = [], uvs = [], index = [];
    const yb = minY - 0.018, yt = minY + 0.006;
    for (const y of [yt, yb]) for (let k = 0; k < seg; k++) {
      const a = k / seg * Math.PI * 2; const sx = Math.cos(a), sz = Math.sin(a);
      const shape = 1 - 0.18 * Math.max(0, -sz); // calcanhar um pouco mais estreito
      positions.push(cx + sx * ax * shape, y, cz + sz * az); uvs.push(sx * 0.5 + 0.5, sz * 0.5 + 0.5);
    }
    const c0 = positions.length / 3; positions.push(cx, yt, cz, cx, yb, cz); uvs.push(0.5, 0.5, 0.5, 0.5);
    for (let k = 0; k < seg; k++) {
      const a = k, b = (k + 1) % seg;
      index.push(c0, b, a);                 // topo
      index.push(c0 + 1, seg + a, seg + b); // base
      index.push(a, b, seg + a, b, seg + b, seg + a); // lateral
    }
    const { si, sw } = transferWeights(info, grid, positions, 6);
    out.push(skinned(info, body, { positions, uvs, index, si, sw }, mat));
  }
  // tiras: faixas finas da malha do pé/tornozelo, infladas
  const B = info.bone, ankleY = B.foot_l.y;
  const bands = [[ankleY - 0.01, ankleY + 0.025], [0.035, 0.055]];
  const pickV = (i) => {
    const d = info.dom[i]; if (!/^(foot|ball|calf)_/.test(d)) return false;
    const y = info.pos[i * 3 + 1];
    return bands.some(([a, b]) => y >= a && y <= b);
  };
  const tri = info.g.index.array, map = new Map(), positions = [], uvs = [], si = [], sw = [], index = [];
  const vid = (i) => {
    if (map.has(i)) return map.get(i);
    const k = positions.length / 3, o = 0.008;
    positions.push(info.pos[i * 3] + info.N.getX(i) * o, info.pos[i * 3 + 1] + info.N.getY(i) * o, info.pos[i * 3 + 2] + info.N.getZ(i) * o);
    uvs.push(info.pos[i * 3] * 8, info.pos[i * 3 + 1] * 8);
    si.push(info.SI.getX(i), info.SI.getY(i), info.SI.getZ(i), info.SI.getW(i)); sw.push(info.SW.getX(i), info.SW.getY(i), info.SW.getZ(i), info.SW.getW(i));
    map.set(i, k); return k;
  };
  for (let t = 0; t < tri.length; t += 3) { const [a, b, c] = [tri[t], tri[t + 1], tri[t + 2]]; if (pickV(a) && pickV(b) && pickV(c)) index.push(vid(a), vid(b), vid(c)); }
  out.push(skinned(info, body, { positions, uvs, index, si: new Uint16Array(si), sw: new Float32Array(sw) }, mat));
  return out;
}

function headCover(info, body, mat) {
  const B = info.bone; let top = 0;
  for (let i = 0; i < info.n; i++) if (/^Head/.test(info.dom[i])) top = Math.max(top, info.pos[i * 3 + 1]);
  const hz = B.Head.z, neckY = B.spine_03.y - 0.03;
  const pickV = (i) => {
    const d = info.dom[i], y = info.pos[i * 3 + 1], z = info.pos[i * 3 + 2], x = Math.abs(info.pos[i * 3]);
    if (!/^(Head|neck|spine_03|spine_02|clavicle|upperarm)/.test(d) || y < neckY || x > 0.24) return false;
    if (z > hz + 0.035 && y < top - 0.045 && y > B.Head.y - 0.06 && x < 0.075) return false; // rosto
    return true;
  };
  const tri = info.g.index.array, map = new Map(), positions = [], uvs = [], si = [], sw = [], index = [];
  const vid = (i) => {
    if (map.has(i)) return map.get(i);
    const k = positions.length / 3, y = info.pos[i * 3 + 1], o = y > B.Head.y - 0.02 ? 0.05 : 0.055;
    positions.push(info.pos[i * 3] + info.N.getX(i) * o, y + info.N.getY(i) * o, info.pos[i * 3 + 2] + info.N.getZ(i) * o);
    uvs.push(info.pos[i * 3] * 2 + 0.5, y * 2);
    si.push(info.SI.getX(i), info.SI.getY(i), info.SI.getZ(i), info.SI.getW(i)); sw.push(info.SW.getX(i), info.SW.getY(i), info.SW.getZ(i), info.SW.getW(i));
    map.set(i, k); return k;
  };
  for (let t = 0; t < tri.length; t += 3) { const [a, b, c] = [tri[t], tri[t + 1], tri[t + 2]]; if (pickV(a) && pickV(b) && pickV(c)) index.push(vid(a), vid(b), vid(c)); }
  return skinned(info, body, { positions, uvs, index, si: new Uint16Array(si), sw: new Float32Array(sw) }, mat);
}

// afunda o corpo onde há roupa por cima (a pele não atravessa o tecido nas animações)
function hideUnderClothes(info, body) {
  const B = info.bone, elbowX = Math.abs(B.lowerarm_l.x), wristX = Math.abs(B.hand_l.x), cuffX = elbowX + (wristX - elbowX) * 0.4;
  const P = body.geometry.attributes.position, neckY = B.neck_01.y - 0.01, ankle = B.foot_l.y + 0.08;
  for (let i = 0; i < info.n; i++) {
    const d = info.dom[i], x = Math.abs(info.pos[i * 3]), y = info.pos[i * 3 + 1];
    if (HANDS.test(d) || /^(Head|neck|foot|ball)/.test(d) || y > neckY || y < ankle || x > cuffX) continue;
    const k = /^thigh/.test(d) ? 0.065 : /^calf/.test(d) ? (y > ankle + 0.12 ? 0.035 : 0.01) : 0.028;
    P.setXYZ(i, info.pos[i * 3] - info.N.getX(i) * k, y - info.N.getY(i) * k, info.pos[i * 3 + 2] - info.N.getZ(i) * k);
  }
  P.needsUpdate = true;
}

// junta as peças de roupa de mesmo material numa só malha (menos draw calls)
function mergeGarments(body) {
  const groups = new Map();
  for (const m of body.userData.garments || []) (groups.get(m.material) ?? groups.set(m.material, []).get(m.material)).push(m);
  for (const [mat, list] of groups) {
    if (list.length < 2) continue;
    const g = mergeGeometries(list.map((m) => m.geometry), false);
    const merged = new THREE.SkinnedMesh(g, mat);
    merged.castShadow = true; merged.receiveShadow = true; merged.frustumCulled = false;
    merged.position.copy(body.position); merged.quaternion.copy(body.quaternion); merged.scale.copy(body.scale);
    body.parent.add(merged); merged.bind(body.skeleton, body.bindMatrix);
    for (const m of list) { m.removeFromParent(); m.geometry.dispose(); }
  }
  body.userData.garments = [];
}

// liga uma malha com esqueleto próprio (cabelo/barba) aos ossos do corpo, pelo nome
function rebind(srcRoot, body, tint, part) {
  const meshes = [];
  srcRoot.traverse((o) => { if (o.isSkinnedMesh) meshes.push(o); });
  const byName = {}; body.skeleton.bones.forEach((b) => { byName[b.name] = b; });
  for (const src of meshes) {
    const bones = src.skeleton.bones.map((b) => byName[b.name] || byName.Head);
    const skel = new THREE.Skeleton(bones, src.skeleton.boneInverses.map((m) => m.clone()));
    const mat = src.material.clone();
    if (tint) { mat.color = new THREE.Color(tint); mat.roughness = 0.75; }
    mat.side = THREE.DoubleSide; mat.alphaTest = Math.max(mat.alphaTest || 0, 0.35); mat.transparent = false;
    const m = new THREE.SkinnedMesh(src.geometry, mat);
    m.castShadow = true; m.frustumCulled = false; m.userData.part = part;
    m.position.copy(body.position); m.quaternion.copy(body.quaternion); m.scale.copy(body.scale);
    body.parent.add(m);
    m.bind(skel, body.bindMatrix);
  }
}

export function buildHero({ baseGltf, hairGltf, beardGltf, female = false, cover = false, colors = {} }) {
  const root = baseGltf.scene;
  root.updateMatrixWorld(true);
  let body = null;
  root.traverse((o) => { if (o.isSkinnedMesh && (!body || o.geometry.attributes.position.count > body.geometry.attributes.position.count)) body = o; });
  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });

  const info = analyze(body);
  const normal = weaveNormal();
  const linen = new THREE.MeshStandardMaterial({ name: 'tunic', map: linenTex(), normalMap: normal, normalScale: new THREE.Vector2(0.12, 0.12), roughness: 0.92, side: THREE.DoubleSide, color: colors.tunic ?? 0xffffff });
  const wool = new THREE.MeshStandardMaterial({ name: 'mantle', map: mantleTex(), normalMap: normal, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.96, side: THREE.DoubleSide, alphaTest: 0.5, color: colors.mantle ?? 0xffffff });
  const sashM = new THREE.MeshStandardMaterial({ name: 'sash', map: sashTex(), normalMap: normal, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.9, side: THREE.DoubleSide, color: colors.sash ?? 0xffffff });
  const leather = new THREE.MeshStandardMaterial({ name: 'leather', map: leatherTex(), roughness: 0.65 });
  const veil = new THREE.MeshStandardMaterial({ name: 'veil', map: linenTex(), normalMap: normal, normalScale: new THREE.Vector2(0.2, 0.2), roughness: 0.95, side: THREE.DoubleSide, color: colors.veil ?? 0x9fb0c8 });

  const all = (i) => !HANDS.test(info.dom[i]) && !/^Head/.test(info.dom[i]);
  const grid = makeGrid(info, all);
  const torsoGrid = makeGrid(info, (i) => /^(spine|pelvis|clavicle|neck)/.test(info.dom[i]));
  const legsGrid = makeGrid(info, (i) => /^(pelvis|spine_01|thigh|calf|foot|ball)/.test(info.dom[i]));

  tunicTop(info, body, linen);
  const skirt = tunicSkirt(info, body, legsGrid, linen);
  sash(info, body, grid, sashM, skirt);
  mantle(info, body, torsoGrid, wool);
  sandals(info, body, makeGrid(info, (i) => /^(foot|ball|calf)_/.test(info.dom[i]), 0.03), leather);
  if (cover) headCover(info, body, veil);
  hideUnderClothes(info, body);
  mergeGarments(body);

  const hairC = colors.hair ?? 0x2a1a10;
  if (hairGltf && !cover) rebind(hairGltf.scene, body, hairC, 'hair');
  if (beardGltf) rebind(beardGltf.scene, body, hairC, 'beard');
  root.traverse((o) => { if (o.isMesh && /Hair/.test(o.material?.name || '')) { o.material = o.material.clone(); o.material.color = new THREE.Color(hairC); } });
  root.userData.body = body;
  return root;
}
