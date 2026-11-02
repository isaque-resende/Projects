import * as THREE from 'three';

// =====================================================================================
//  Pixel art procedural: personagens (folha 3 quadros x 4 direções), árvores, chama,
//  marcador "✦" e texturas de cenário em baixa resolução (filtro nearest).
// =====================================================================================

let seed = 1;
export const srand = (s) => { seed = s; };
export const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const OUTLINE = [28, 18, 16];
function hex(c) { return [(c >> 16) & 255, (c >> 8) & 255, c & 255]; }
function shade(c, k) { const [r, g, b] = hex(c); return `rgb(${Math.min(255, r * k) | 0},${Math.min(255, g * k) | 0},${Math.min(255, b * k) | 0})`; }
const css = (c) => shade(c, 1);

// contorno escuro de 1 px em volta de tudo que não é transparente (cara de sprite)
function outline(ctx, w, h) {
  const img = ctx.getImageData(0, 0, w, h), d = img.data, src = new Uint8ClampedArray(d);
  const op = (x, y) => x >= 0 && y >= 0 && x < w && y < h && src[(y * w + x) * 4 + 3] > 128;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const o = (y * w + x) * 4;
    if (src[o + 3] > 128) continue;
    if (op(x - 1, y) || op(x + 1, y) || op(x, y - 1) || op(x, y + 1)) { d[o] = OUTLINE[0]; d[o + 1] = OUTLINE[1]; d[o + 2] = OUTLINE[2]; d[o + 3] = 255; }
  }
  ctx.putImageData(img, 0, 0);
}

export function nearestTex(canvas, { repeat = false } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestMipmapLinearFilter;
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

// ---------------- personagens: 24x32 por quadro; colunas = quadros (parado, passo A, passo B); linhas = baixo, esquerda, direita, cima
export const FW = 24, FH = 32;
export function charSheet(pal) {
  const c = document.createElement('canvas'); c.width = FW * 3; c.height = FH * 4;
  const x = c.getContext('2d');
  for (let dir = 0; dir < 4; dir++) for (let f = 0; f < 3; f++) drawChar(x, f * FW, dir * FH, dir, f, pal);
  outline(x, c.width, c.height);
  return c;
}

function drawChar(ctx, ox, oy, dir, f, p) {
  const mirror = dir === 2;
  const P = (x, y, w, h, col) => { ctx.fillStyle = col; const xx = mirror ? FW - x - w : x; ctx.fillRect(ox + xx, oy + y, w, h); };
  const side = dir === 1 || dir === 2, back = dir === 3;
  const bob = f ? 1 : 0;
  const skin = css(p.skin), skinD = shade(p.skin, 0.78), hair = css(p.hair), tun = css(p.tunic), tunD = shade(p.tunic, 0.72), tunL = shade(p.tunic, 1.12);
  const man = p.mantle != null ? css(p.mantle) : null, manD = p.mantle != null ? shade(p.mantle, 0.7) : null, manL = p.mantle != null ? shade(p.mantle, 1.25) : null;
  const sash = css(p.sash ?? 0x8a5a2a), sand = css(0x5a3a22);

  // pés / sandálias
  if (!side) {
    const l = f === 1 ? 1 : f === 2 ? -1 : 0;
    P(8, 29 + Math.max(0, l), 3, 2, sand); P(13, 29 + Math.max(0, -l), 3, 2, sand);
  } else {
    if (f === 0) P(9, 29, 4, 2, sand);
    else { P(6, 29, 3, 2, sand); P(13, 29, 3, 2, sand); }
  }
  // túnica (trapézio que alarga para baixo), luz vindo da esquerda
  for (let r = 13; r <= 28; r++) {
    const hw = side ? 4 + Math.floor((r - 13) / 5) : 5 + Math.floor((r - 13) / 4);
    const cx = side ? 11 : 12, x0 = cx - hw, w = hw * 2;
    P(x0, r - bob * (r < 27 ? 1 : 0), w, 1, tun);
    P(x0 + w - 2, r - bob * (r < 27 ? 1 : 0), 2, 1, tunD);
    P(x0, r - bob * (r < 27 ? 1 : 0), 1, 1, tunL);
  }
  if (p.long) for (let r = 27; r <= 29; r++) P(side ? 6 : 5, r, side ? 10 : 14, 1, r === 29 ? tunD : tun);
  P(side ? 7 : 6, 27, side ? 9 : 12, 1, tunD); // barra
  // faixa na cintura
  P(side ? 7 : 6, 20 - bob, side ? 9 : 12, 2, sash);
  if (!side && !back) P(12, 22 - bob, 2, 3, sash);
  // manto sobre o ombro esquerdo
  if (man) {
    if (!side && !back) {
      for (let r = 13; r <= 25; r++) { const x0 = 7 + Math.floor((r - 13) * 0.55); P(x0, r - bob, 4, 1, man); P(x0 + 1, r - bob, 1, 1, manL); }
      P(6, 13 - bob, 3, 13, man); P(6, 13 - bob, 1, 13, manD);
      for (let i = 0; i < 3; i++) P(6 + i, 26 - bob, 1, 1 + (i % 2), manD); // franjas
    } else if (back) {
      P(13, 13 - bob, 5, 14, man); P(17, 13 - bob, 1, 14, manD); P(14, 13 - bob, 1, 14, manL);
      for (let r = 13; r <= 22; r++) P(13 - Math.floor((r - 13) * 0.5), r - bob, 3, 1, man);
    } else {
      P(10, 13 - bob, 5, 13, man); P(14, 13 - bob, 1, 13, manD); P(11, 13 - bob, 1, 13, manL);
    }
  }
  // braços
  if (!side) {
    P(4, 14 - bob, 2, 8, tun); P(4, 22 - bob, 2, 1, skin); P(18, 14 - bob, 2, 8, tunD); P(18, 22 - bob, 2, 1, skinD);
  } else {
    const sw = f === 1 ? -2 : f === 2 ? 2 : 0;
    P(11 + sw, 14 - bob, 3, 7, tunD); P(11 + sw, 21 - bob, 2, 2, skin);
  }
  // pescoço e cabeça
  P(side ? 10 : 10, 12 - bob, 4, 1, skinD);
  const hy = 3 - bob;
  if (p.hood || p.veil) {
    const cov = css(p.hood ? p.mantle : p.veil), covD = shade(p.hood ? p.mantle : p.veil, 0.7), covL = shade(p.hood ? p.mantle : p.veil, 1.2);
    if (!side && !back) {
      P(7, hy - 1, 10, 11, cov); P(6, hy + 2, 1, 10, covD); P(17, hy + 2, 1, 10, covD); P(8, hy - 1, 3, 1, covL);
      P(6, hy + 9, 12, 3, cov); // cai sobre os ombros
      if (p.hood) { // rosto do estranho em sombra: só boca e barba aparecem
        P(9, hy + 3, 6, 4, '#120d0c'); P(9, hy + 7, 6, 2, shade(p.skin, 0.45)); P(10, hy + 8, 4, 2, shade(p.hair, 0.8)); P(11, hy + 8, 2, 1, '#1a0f0c');
      } else {
        P(9, hy + 3, 6, 6, skin); P(13, hy + 3, 2, 6, skinD); P(10, hy + 5, 1, 1, '#2a1a14'); P(13, hy + 5, 1, 1, '#2a1a14'); P(11, hy + 7, 2, 1, shade(p.skin, 0.6));
      }
    } else if (back) {
      P(7, hy - 1, 10, 13, cov); P(15, hy, 2, 12, covD); P(8, hy - 1, 3, 1, covL);
    } else {
      P(8, hy - 1, 9, 12, cov); P(14, hy, 3, 12, covD);
      if (p.hood) { P(7, hy + 3, 4, 5, '#120d0c'); P(7, hy + 7, 3, 2, shade(p.hair, 0.8)); }
      else { P(7, hy + 3, 4, 6, skin); P(8, hy + 5, 1, 1, '#2a1a14'); P(6, hy + 6, 1, 1, skin); }
    }
    return;
  }
  if (!side && !back) {
    P(8, hy + 1, 8, 8, skin); P(14, hy + 1, 2, 8, skinD);
    P(8, hy - 1, 8, 3, hair); P(7, hy + 1, 1, p.longHair ? 9 : 5, hair); P(16, hy + 1, 1, p.longHair ? 9 : 5, hair);
    P(10, hy + 4, 1, 1, '#24160f'); P(13, hy + 4, 1, 1, '#24160f');
    if (p.beard) { P(9, hy + 6, 6, 3, hair); P(10, hy + 9, 4, 1, hair); P(11, hy + 6, 2, 1, shade(p.skin, 0.55)); }
    else P(11, hy + 6, 2, 1, shade(p.skin, 0.6));
    if (p.cap) { P(8, hy - 2, 8, 2, css(p.cap)); P(7, hy, 10, 1, shade(p.cap, 0.7)); }
  } else if (back) {
    P(8, hy - 1, 8, 10, hair); P(7, hy + 1, 10, p.longHair ? 10 : 6, hair); P(9, hy - 1, 3, 1, shade(p.hair, 1.4));
    if (p.cap) { P(8, hy - 2, 8, 2, css(p.cap)); P(7, hy, 10, 1, shade(p.cap, 0.7)); }
  } else {
    P(8, hy + 1, 7, 8, skin); P(7, hy + 4, 1, 2, skin); // nariz
    P(9, hy + 4, 1, 1, '#24160f');
    P(9, hy - 1, 7, 3, hair); P(13, hy + 1, 3, p.longHair ? 10 : 6, hair);
    if (p.beard) { P(8, hy + 6, 4, 3, hair); P(9, hy + 9, 3, 1, hair); }
    if (p.cap) { P(8, hy - 2, 8, 2, css(p.cap)); P(7, hy, 10, 1, shade(p.cap, 0.7)); }
  }
}

// ---------------- oliveira (48x64) e cipreste (20x64)
export function treeCanvas(kind, s = 3) {
  srand(s * 977 + 3);
  const W = kind === 'cypress' ? 20 : 48, H = 64, c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'), P = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
  if (kind === 'cypress') {
    P(9, 54, 3, 10, '#4a3424');
    for (let y = 2; y < 58; y++) { const hw = Math.round(Math.sin(Math.PI * Math.pow((y - 2) / 56, 0.7)) * 8); for (let i = -hw; i < hw; i++) { const v = rnd(); P(10 + i, y, 1, 1, v < 0.18 ? '#1b2e17' : v < 0.7 ? '#2a4523' : i < -hw / 2 ? '#3f6232' : '#2f4f28'); } }
  } else {
    // tronco retorcido
    for (let y = 36; y < 64; y++) { const w = 6 + Math.floor((y - 36) / 6), cx = 24 + Math.round(Math.sin(y * 0.35) * 2); P(cx - w / 2, y, w, 1, '#6a5340'); P(cx - w / 2, y, 2, 1, '#8b7158'); P(cx + w / 2 - 2, y, 2, 1, '#4a3a2c'); }
    P(15, 61, 18, 3, '#4a3a2c');
    // copa prateada em tufos
    const blobs = [[24, 20, 15], [12, 26, 10], [36, 26, 11], [18, 13, 9], [31, 12, 9], [24, 30, 10]];
    for (const [bx, by, r] of blobs) for (let yy = -r; yy <= r; yy++) for (let xx = -r; xx <= r; xx++) {
      const d = Math.hypot(xx, yy * 1.15) + rnd() * 2.2; if (d > r) continue;
      const lit = (-xx - yy) / r + rnd() * 0.6;
      P(bx + xx, by + yy, 1, 1, lit > 0.9 ? '#b9c29a' : lit > 0.25 ? '#8a9a6a' : lit > -0.4 ? '#6b7c50' : '#4a5a38');
    }
  }
  outline(x, W, H);
  return c;
}

export function flameCanvas() {
  const c = document.createElement('canvas'); c.width = 16; c.height = 12; const x = c.getContext('2d');
  for (let f = 0; f < 2; f++) {
    const P = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(f * 8 + a, b, w, h); };
    P(2, 4 + f, 4, 7 - f, '#ff8a2a'); P(3, 2 + f, 2, 2, '#ffb84a'); P(3, 6, 2, 4, '#ffe9a0'); P(1 + f, 8, 1, 2, '#ff6a1a');
  }
  return c;
}
export function markerCanvas() {
  const c = document.createElement('canvas'); c.width = 13; c.height = 13; const x = c.getContext('2d'), P = (a, b, w, h, col) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
  P(6, 0, 1, 13, '#ffe7a6'); P(0, 6, 13, 1, '#ffe7a6'); P(5, 3, 3, 7, '#ffd47a'); P(3, 5, 7, 3, '#ffd47a'); P(6, 6, 1, 1, '#fff');
  outline(x, 13, 13); return c;
}
export function arrowCanvas() {
  const c = document.createElement('canvas'); c.width = 12; c.height = 12; const x = c.getContext('2d');
  x.fillStyle = '#ffe2a0'; for (let i = 0; i < 6; i++) x.fillRect(2 + i, 1 + i, 2, 10 - 2 * i);
  outline(x, 12, 12); return c;
}

// ---------------- texturas de cenário 32x32
function texCanvas(fn, w = 32, h = 32, s = 7) { srand(s); const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h, (a, b, ww, hh, col) => { x.fillStyle = col; x.fillRect(a, b, ww, hh); }); return c; }
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];

export function makeTextures() {
  const T = {};
  T.grass = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(i, j, 1, 1, pick(['#6f8a3c', '#7b9644', '#68833a', '#86a04a', '#6f8a3c']));
    for (let k = 0; k < 26; k++) { const i = rnd() * w | 0, j = rnd() * h | 0; P(i, j, 1, 2, '#9cb85a'); P(i + 1, j + 1, 1, 1, '#566e2e'); }
    for (let k = 0; k < 4; k++) { const i = rnd() * w | 0, j = rnd() * h | 0; P(i, j, 1, 1, pick(['#e4c34a', '#d8483a', '#f0e6d0'])); }
  }, 32, 32, 11), { repeat: true });
  T.dirtPath = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      const edge = Math.min(j, h - 1 - j); if (edge < 4 && rnd() > edge / 4) continue;
      P(i, j, 1, 1, pick(['#a8875c', '#b39266', '#9c7c52', '#b8996a']));
    }
    for (let k = 0; k < 10; k++) { const i = rnd() * w | 0, j = 6 + rnd() * 20 | 0; P(i, j, 2, 1, '#cdb48a'); P(i, j + 1, 2, 1, '#7d6242'); }
  }, 32, 32, 13), { repeat: true });
  T.paving = nearestTex(texCanvas((x, w, h, P) => {
    P(0, 0, w, h, '#6d6052');
    const tiles = [[0, 0, 16, 10], [16, 0, 16, 10], [0, 10, 11, 11], [11, 10, 12, 11], [23, 10, 9, 11], [0, 21, 18, 11], [18, 21, 14, 11]];
    for (const [a, b, ww, hh] of tiles) {
      const base = pick(['#c9b48e', '#d4c09a', '#bea883', '#cdb892']);
      P(a + 1, b + 1, ww - 1, hh - 1, base);
      P(a + 1, b + 1, ww - 1, 1, '#e6d6b2'); P(a + 1, b + hh - 1, ww - 1, 1, '#a08a66');
      for (let k = 0; k < 5; k++) P(a + 2 + (rnd() * (ww - 3) | 0), b + 2 + (rnd() * (hh - 3) | 0), 1, 1, '#a99572');
    }
  }, 32, 32, 17), { repeat: true });
  T.plaster = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(i, j, 1, 1, pick(['#e3d3b4', '#ddcba9', '#e8d9bc', '#d6c4a0']));
    for (let k = 0; k < 3; k++) { let i = rnd() * w | 0, j = rnd() * h | 0; for (let s = 0; s < 6; s++) { P(i, j, 1, 1, '#b39d78'); i += rnd() < 0.5 ? 1 : 0; j += 1; } }
    P(0, h - 3, w, 3, '#c2ad88');
  }, 32, 32, 19), { repeat: true });
  T.stone = nearestTex(texCanvas((x, w, h, P) => {
    P(0, 0, w, h, '#7a6a55');
    for (let row = 0; row < 4; row++) { const off = row % 2 ? 8 : 0; for (let col = -1; col < 3; col++) {
      const a = col * 16 + off, b = row * 8, base = pick(['#d8c39a', '#ccb68c', '#e1cda5', '#c4ad82']);
      P(a + 1, b + 1, 15, 7, base); P(a + 1, b + 1, 15, 1, '#efdfbd'); P(a + 15, b + 1, 1, 7, '#a8916a'); P(a + 1, b + 7, 15, 1, '#a8916a');
    } }
  }, 32, 32, 23), { repeat: true });
  T.wood = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) { const plank = Math.floor(j / 8); for (let i = 0; i < w; i++) P(i, j, 1, 1, j % 8 === 7 ? '#3a2616' : pick(plank % 2 ? ['#7a5232', '#6e4a2c', '#835a38'] : ['#6a4628', '#764e2e', '#5f3f24'])); }
  }, 32, 32, 29), { repeat: true });
  T.roof = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(i, j, 1, 1, pick(['#b8a27c', '#c4ae88', '#ad9672']));
    for (let k = 0; k < 8; k++) P(rnd() * w | 0, rnd() * h | 0, 2, 1, '#8e7a58');
  }, 32, 32, 31), { repeat: true });
  T.gold = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(i, j, 1, 1, pick(['#e8b84a', '#f2c860', '#d9a63c', '#ffd977']));
    for (let j = 0; j < h; j += 8) P(0, j, w, 1, '#a8742a');
  }, 32, 32, 37), { repeat: true });
  T.marble = nearestTex(texCanvas((x, w, h, P) => {
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(i, j, 1, 1, pick(['#f4eee2', '#ece4d4', '#faf6ec']));
    for (let j = 0; j < h; j += 8) P(0, j, w, 1, '#cfc3ab');
  }, 32, 32, 41), { repeat: true });
  T.awning = nearestTex(texCanvas((x, w, h, P) => { for (let i = 0; i < w; i++) P(i, 0, 1, h, Math.floor(i / 4) % 2 ? '#e8d6a8' : '#b8402e'); P(0, h - 2, w, 2, '#7a2a1e'); }, 32, 16, 43), { repeat: true });
  T.cloth = nearestTex(texCanvas((x, w, h, P) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) P(i, j, 1, 1, pick(['#3e5a7a', '#45648a', '#38506e'])); }, 16, 16, 47), { repeat: true });
  T.dark = nearestTex(texCanvas((x, w, h, P) => P(0, 0, w, h, '#120c0a'), 4, 4), { repeat: true });
  return T;
}

// pano de fundo pintado em pixel (colinas, horizonte) — W x H
export function backdropCanvas(kind) {
  return texCanvas((x, w, h, P) => {
    const sky = kind === 'dusk' ? ['#f2c98e', '#e9a978', '#c88a8a', '#8c7aa6'] : ['#f6e2b8', '#eecf9c', '#d9b98e', '#b9a6a6'];
    for (let j = 0; j < h; j++) P(0, j, w, 1, sky[Math.min(sky.length - 1, Math.floor((h - j) / h * sky.length))]);
    const layers = [['#a7a28a', 0.42], ['#8d9070', 0.55], ['#6f7c56', 0.7]];
    for (const [col, base] of layers) for (let i = 0; i < w; i++) {
      const top = Math.floor(h * base + Math.sin(i * 0.05 + base * 9) * h * 0.06 + Math.sin(i * 0.13 + base) * h * 0.03);
      P(i, top, 1, h - top, col);
      if (rnd() < 0.08 && base > 0.5) P(i, top - 2, 2, 2, '#56653f');
    }
  }, 256, 64, kind === 'dusk' ? 53 : 59);
}
