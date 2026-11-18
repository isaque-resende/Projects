// Betfagé: o caminho até o ponto tocado.
// caminho até o ponto tocado: A* numa grade de 35 cm, desviando de muros, árvores, objetos, paredes e barrancos altos
import { bate, V3 } from './estado.js';
import { terreno } from './cenario.js';
import { paredeEm, alturaEm, presoEm } from './insula.js';
import { naArea } from './jogador.js';

function caminho(de, ate) {
  const P = 0.35, M = 7;
  const x0 = Math.min(de.x, ate.x) - M, z0 = Math.min(de.z, ate.z) - M;
  const W = Math.min(260, Math.ceil((Math.abs(de.x - ate.x) + 2 * M) / P)), D = Math.min(260, Math.ceil((Math.abs(de.z - ate.z) + 2 * M) / P));
  const idx = (i, k) => i * D + k, cx = (i) => x0 + i * P, cz = (k) => z0 + k * P;
  const livreC = (x, z, y) => naArea(x, z) && !bate(x, z, 0.28) && !paredeEm(x, z, y) && !presoEm(x, z, alturaEm(x, z, y));
  const si = Math.round((de.x - x0) / P), sk = Math.round((de.z - z0) / P);
  let gi = Math.round((ate.x - x0) / P), gk = Math.round((ate.z - z0) / P);
  // se o destino cai dentro de algo, usa a célula livre mais perto
  if (!livreC(cx(gi), cz(gk), ate.y)) {
    let melhor = null, dm = 1e9;
    for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) { const i = gi + a, k = gk + b; if (i < 0 || k < 0 || i >= W || k >= D) continue; if (livreC(cx(i), cz(k), ate.y) && a * a + b * b < dm) { dm = a * a + b * b; melhor = [i, k]; } }
    if (!melhor) return []; [gi, gk] = melhor;
  }
  const G = new Float32Array(W * D).fill(1e9), Y = new Float32Array(W * D), DE = new Int32Array(W * D).fill(-1), fechado = new Uint8Array(W * D);
  const aberto = [[0, si, sk]]; G[idx(si, sk)] = 0; Y[idx(si, sk)] = de.y;
  const hz = (i, k) => Math.hypot(i - gi, k - gk);
  let achou = false, passos = 0;
  while (aberto.length && passos++ < 40000) {
    let bi = 0; for (let j = 1; j < aberto.length; j++) if (aberto[j][0] < aberto[bi][0]) bi = j;
    const [, i, k] = aberto[bi]; aberto[bi] = aberto[aberto.length - 1]; aberto.pop();
    const c = idx(i, k); if (fechado[c]) continue; fechado[c] = 1;
    if (i === gi && k === gk) { achou = true; break; }
    for (const [a, b, cs] of [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]]) {
      const ni = i + a, nk = k + b; if (ni < 0 || nk < 0 || ni >= W || nk >= D) continue;
      const nc = idx(ni, nk); if (fechado[nc]) continue;
      const x = cx(ni), z = cz(nk), y = Y[c];
      if (!livreC(x, z, y) || terreno(x, z) > y + 0.55) continue;
      const ny = alturaEm(x, z, y); if (ny > y + 0.55) continue;
      const g = G[c] + cs + Math.max(0, ny - y) * 2;
      if (g < G[nc]) { G[nc] = g; Y[nc] = ny; DE[nc] = c; aberto.push([g + hz(ni, nk), ni, nk]); }
    }
  }
  if (!achou) return [];
  const pts = []; for (let c = idx(gi, gk); c !== -1; c = DE[c]) pts.push(V3(cx(Math.floor(c / D)), 0, cz(c % D)));
  pts.reverse();
  // enxuga: mantém só os pontos onde o rumo muda
  const out = []; for (let j = 1; j < pts.length; j++) { const a = pts[j - 1], b = pts[j], c2 = pts[j + 1]; if (!c2 || Math.abs((b.x - a.x) * (c2.z - b.z) - (b.z - a.z) * (c2.x - b.x)) > 1e-4) out.push(b); }
  if (out.length) out[out.length - 1] = V3(ate.x, 0, ate.z);
  return out;
}

export { caminho };
