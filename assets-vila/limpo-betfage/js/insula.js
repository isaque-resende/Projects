// Betfagé: a ínsula (casas geminadas em volta de um pátio, com escada e terraços) e as alturas onde se pisa.
// a ínsula: casas geminadas em L em volta de um pátio, com escada externa; dá para subir nos terraços
import * as THREE from 'three';
import { sombra } from '../../limpo-motor/base.js';
import { LAY, scene, V3 } from './estado.js';
import { gInsula } from './modelos.js';
import { CONSTR, terreno } from './cenario.js';

const INS = { g: gInsula.scene };
INS.g.position.set(...LAY.insula.p); INS.g.rotation.y = LAY.insula.r; sombra(INS.g); scene.add(INS.g);
INS.g.updateMatrixWorld(true);
// pisos: cada célula guarda as alturas de todas as faces viradas para cima (chão, degraus, terraços);
// paredes: o trecho de altura ocupado por faces de pé. Assim o beiral não vira chão e a parede barra a passagem.
function mapaCamadas(mesh, P = 0.2) {
  mesh.updateWorldMatrix(true, false);
  const cx = new THREE.Box3().setFromObject(mesh), X0 = cx.min.x - 0.3, Z0 = cx.min.z - 0.3;
  const W = Math.ceil((cx.max.x - cx.min.x + 0.6) / P) + 1, D = Math.ceil((cx.max.z - cx.min.z + 0.6) / P) + 1;
  const PISO = Array.from({ length: W * D }, () => []), PA0 = new Float32Array(W * D).fill(1e9), PA1 = new Float32Array(W * D).fill(-1e9);
  const pos = mesh.geometry.attributes.position, idx = mesh.geometry.index, m = mesh.matrixWorld, n = idx ? idx.count : pos.count;
  const A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3(), N = new THREE.Vector3(), Q = new THREE.Vector3();
  const cel = (x, z) => { const i = Math.round((x - X0) / P), k = Math.round((z - Z0) / P); return i < 0 || k < 0 || i >= W || k >= D ? -1 : i * D + k; };
  for (let t = 0; t < n; t += 3) {
    A.fromBufferAttribute(pos, idx ? idx.getX(t) : t).applyMatrix4(m); B.fromBufferAttribute(pos, idx ? idx.getX(t + 1) : t + 1).applyMatrix4(m); C.fromBufferAttribute(pos, idx ? idx.getX(t + 2) : t + 2).applyMatrix4(m);
    N.subVectors(B, A).cross(Q.subVectors(C, A)); const area = N.length(); if (area < 1e-7) continue; N.divideScalar(area);
    const L = Math.max(A.distanceTo(B), B.distanceTo(C), C.distanceTo(A)), s = Math.max(2, Math.ceil(L / (P * 0.5)));
    if (N.y < -0.6) continue;          // face virada para baixo (fundo da escada, beiral): nem piso nem parede
    const piso = N.y > 0.6;
    for (let i = 0; i <= s; i++) for (let k = 0; k <= s - i; k++) {
      const u = i / s, v = k / s; Q.copy(A).multiplyScalar(1 - u - v).addScaledVector(B, u).addScaledVector(C, v);
      const c = cel(Q.x, Q.z); if (c < 0) continue;
      if (piso) { const l = PISO[c]; if (!l.some((y) => Math.abs(y - Q.y) < 0.08)) l.push(Q.y); }
      else { if (Q.y < PA0[c]) PA0[c] = Q.y; if (Q.y > PA1[c]) PA1[c] = Q.y; }
    }
  }
  return {
    // o piso mais alto que dá para alcançar a partir da altura y (subindo no máximo 0,55)
    piso: (x, z, y) => { const c = cel(x, z); if (c < 0) return -1e9; let b = -1e9; for (const h of PISO[c]) if (h <= y + 0.55 && h > b) b = h; return b; },
    alto: (x, z) => { const c = cel(x, z); if (c < 0) return -1e9; let b = -1e9; for (const h of PISO[c]) if (h > b) b = h; return b; },
    parede: (x, z, y) => { const c = cel(x, z); return c >= 0 && PA1[c] > y + 0.6 && PA0[c] < y + 1.5; },
  };
}
INS.cam = mapaCamadas(INS.g.getObjectByName('Insula'), 0.1);
const CAMADAS = [INS.cam];
for (const c of CONSTR) { c.updateMatrixWorld(true); c.traverse((m) => { if (m.isMesh) CAMADAS.push(mapaCamadas(m, 0.1)); }); }
const pisoEm = (x, z, y) => { let b = -1e9; for (const c of CAMADAS) { const h = c.piso(x, z, y); if (h > b) b = h; } return b; };
const paredeEm = (x, z, y) => CAMADAS.some((c) => c.parede(x, z, y));
INS.alt = (x, z) => Math.max(0, INS.cam.alto(x, z));
INS.caixa = new THREE.Box3().setFromObject(INS.g);
// pátio: o ponto de chão (sem telhado) mais perto do meio da ínsula, do lado da câmera
{
  const b = INS.caixa, y0 = LAY.insula.p[1]; let melhor = null, dm = 1e9;
  for (let x = b.min.x + 0.5; x < b.max.x; x += 0.25) for (let z = b.min.z + 0.5; z < b.max.z; z += 0.25) {
    if (INS.alt(x, z) > y0 + 0.15 || INS.alt(x + 0.6, z) > y0 + 0.15 || INS.alt(x - 0.6, z) > y0 + 0.15 || INS.alt(x, z + 0.6) > y0 + 0.15 || INS.alt(x, z - 0.6) > y0 + 0.15) continue;
    const d = Math.hypot(x - (b.min.x + b.max.x) / 2, z - (b.min.z + b.max.z) / 2); if (d < dm) { dm = d; melhor = V3(x, y0, z); }
  }
  INS.patio = melhor || V3((b.min.x + b.max.x) / 2, y0, b.max.z + 1);
}
const terrenoPe = (x, z, r = 0.16) => Math.max(terreno(x, z), terreno(x + r, z), terreno(x - r, z), terreno(x, z + r), terreno(x, z - r));
const alturaEm = (x, z, y = 1e9) => Math.max(terrenoPe(x, z), pisoEm(x, z, y));

// ---------- bolsões: pontos de onde não se sai andando ----------
// O modelo tem vãos dentro das paredes grossas e entre as peças. Quem cai num deles fica preso (só sai pulando no
// ponto certo). Ao carregar, anda-se pela construção numa grade de 10 cm: primeiro tudo o que se alcança vindo de
// fora (andando ou pulando), depois o que consegue voltar para fora só andando. O resto vira lugar proibido.
function mapaSaida(caixa, P = 0.1, M = 1) {
  const X0 = caixa.min.x - M, Z0 = caixa.min.z - M, y0 = caixa.min.y;
  const W = Math.ceil((caixa.max.x - caixa.min.x + 2 * M) / P), D = Math.ceil((caixa.max.z - caixa.min.z + 2 * M) / P);
  const id = (i, k, y) => (i * D + k) * 1000 + Math.round((y - y0) * 10 + 100);
  const passos = (i, k, y, pulo) => {
    const out = [];
    for (const [di, dk] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ni = i + di, nk = k + dk; if (ni < 0 || nk < 0 || ni >= W || nk >= D) continue;
      const nx = X0 + ni * P, nz = Z0 + nk * P;
      for (const [sobe, yp] of pulo ? [[0.55, y], [1, y + 0.97]] : [[0.55, y]]) {
        if (paredeEm(nx, nz, yp) || paredeEm(nx + di * 0.25, nz + dk * 0.25, yp)) continue;
        const ny = alturaEm(nx, nz, y + sobe - 0.55); if (ny <= y + sobe) out.push([ni, nk, ny]);
      }
    }
    return out;
  };
  // 1. o que se alcança vindo de fora
  const est = new Map(), anda = new Map(), fila = [[0, 0, alturaEm(X0, Z0)]];
  est.set(id(...fila[0]), fila[0]);
  for (let h = 0; h < fila.length; h++) {
    const s = fila[h], a = id(...s);
    anda.set(a, passos(...s, false).map((t) => id(...t)));
    for (const t of passos(...s, true)) { const kk = id(...t); if (!est.has(kk)) { est.set(kk, t); fila.push(t); } }
  }
  // 2. o que volta para fora só andando (caminho ao contrário, a partir da borda da grade)
  const volta = new Map(); for (const [a, l] of anda) for (const b of l) { if (!volta.has(b)) volta.set(b, []); volta.get(b).push(a); }
  const sai = new Set(), f2 = [];
  for (const [kk, [i, k]] of est) if (i < 3 || k < 3 || i > W - 4 || k > D - 4) { sai.add(kk); f2.push(kk); }
  for (let h = 0; h < f2.length; h++) for (const a of volta.get(f2[h]) || []) if (!sai.has(a)) { sai.add(a); f2.push(a); }
  // 3. por célula, as alturas boas e as ruins
  const cel = new Map();
  for (const [kk, [i, k, y]] of est) { const c = i * D + k; if (!cel.has(c)) cel.set(c, []); cel.get(c).push([y, sai.has(kk)]); }
  const ruim = (i, k, y) => {
    if (i < 0 || k < 0 || i >= W || k >= D) return false;
    const l = cel.get(i * D + k); if (!l) return false;
    let r = false; for (const [h, ok] of l) if (Math.abs(h - y) < 0.2) { if (ok) return false; r = true; }
    return r;
  };
  // olha as 4 células em volta do ponto: na dúvida, perto de um bolsão também não se pisa
  return (x, z, y) => {
    const i = Math.floor((x - X0) / P), k = Math.floor((z - Z0) / P);
    return ruim(i, k, y) || ruim(i + 1, k, y) || ruim(i, k + 1, y) || ruim(i + 1, k + 1, y);
  };
}
const SAIDAS = [mapaSaida(INS.caixa), ...CONSTR.map((c) => mapaSaida(new THREE.Box3().setFromObject(c)))];
// true se o ponto (na altura y onde se pisa) é um bolsão de onde não se sai andando
const presoEm = (x, z, y) => SAIDAS.some((f) => f(x, z, y));

export { INS, paredeEm, alturaEm, presoEm };
