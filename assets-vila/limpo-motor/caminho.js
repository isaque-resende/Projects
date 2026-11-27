// Motor comum: o caminho até o ponto tocado no chão. A* numa grade de 35 cm, desviando do que não é livre (muros,
// árvores, objetos, paredes e degraus altos). Sem caminho até o ponto, vai até o lugar alcançável mais perto dele
// (antes devolvia [] e o jogador andava em linha reta contra o muro).
//   const caminho = criaCaminho({ livreC: (x, z, y) => bool, terreno: (x, z) => y, alturaEm: (x, z, y) => y });
//   E.TRILHA = caminho(jog.o.position, ponto);
import * as THREE from 'three';

// fila de prioridade (heap binário) pelo custo: a lista varrida inteira a cada passo levava meio segundo num caminho longo
function poe(h, x) { h.push(x); let i = h.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (h[p][0] <= h[i][0]) break; [h[p], h[i]] = [h[i], h[p]]; i = p; } }
function tira(h) {
  const top = h[0], ult = h.pop(); if (h.length) { h[0] = ult; let i = 0; for (;;) { const a = 2 * i + 1, b = a + 1; let m = i;
    if (a < h.length && h[a][0] < h[m][0]) m = a; if (b < h.length && h[b][0] < h[m][0]) m = b; if (m === i) break; [h[m], h[i]] = [h[i], h[m]]; i = m; } }
  return top;
}

export function criaCaminho({ livreC, terreno, alturaEm = null, profundidade = null }) {
  const soTerreno = !alturaEm; if (!alturaEm) alturaEm = (x, z) => terreno(x, z);
  // primeiro numa grade justa em volta da linha reta; se não acha, de novo numa grade larga (para contornar um tanque,
  // um muro comprido) e fica com o que chega mais perto
  const caminho = function caminho(de, ate) {
    const a = tenta(de, ate, 7, 0.35, 12000); if (a.achou) return a.out;
    const b = tenta(de, ate, 26, 0.6, 40000);      // (células maiores: a grade larga tem muitas)
    const resta = (r) => r.out.length ? Math.hypot(r.out[r.out.length - 1].x - ate.x, r.out[r.out.length - 1].z - ate.z) : 1e9;
    return resta(b) < resta(a) - 0.3 ? b.out : a.out;
  };
  function tenta(de, ate, M, P, MAXP) {
  const x0 = Math.min(de.x, ate.x) - M, z0 = Math.min(de.z, ate.z) - M;
  const W = Math.min(260, Math.ceil((Math.abs(de.x - ate.x) + 2 * M) / P)), D = Math.min(260, Math.ceil((Math.abs(de.z - ate.z) + 2 * M) / P));
  const idx = (i, k) => i * D + k, cx = (i) => x0 + i * P, cz = (k) => z0 + k * P;
  const si = Math.round((de.x - x0) / P), sk = Math.round((de.z - z0) / P);
  let gi = Math.round((ate.x - x0) / P), gk = Math.round((ate.z - z0) / P);
  // se o destino cai dentro de algo, usa a célula livre mais perto
  if (!livreC(cx(gi), cz(gk), ate.y)) {
    let melhor = null, dm = 1e9;
    for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) { const i = gi + a, k = gk + b; if (i < 0 || k < 0 || i >= W || k >= D) continue; if (livreC(cx(i), cz(k), ate.y) && a * a + b * b < dm) { dm = a * a + b * b; melhor = [i, k]; } }
    if (melhor) [gi, gk] = melhor;      // (nenhuma livre perto: segue, e vai até o lugar alcançável mais perto)
  }
  const LV = new Uint8Array(W * D), TR = new Float32Array(W * D), G = new Float32Array(W * D).fill(1e9), Y = new Float32Array(W * D), DE = new Int32Array(W * D).fill(-1), fechado = new Uint8Array(W * D);
  const aberto = [[0, si, sk]]; G[idx(si, sk)] = 0; Y[idx(si, sk)] = de.y;
  const hz = (i, k) => Math.hypot(i - gi, k - gk);
  // quem parte de dentro da margem de um obstáculo (encostado numa coluna, numa pessoa) pode sair dela: o primeiro
  // metro em volta da partida conta como livre (antes não havia caminho nenhum, e o jogador andava reto contra o muro)
  const consulta = (c, x, z, y) => { LV[c] = livreC(x, z, y) ? 1 : solta(x, z) ? 3 : 2; TR[c] = terreno(x, z); };
  const preso = !livreC(de.x, de.z, de.y), solta = (x, z) => preso && Math.hypot(x - de.x, z - de.z) < 3.0;
  let achou = false, passos = 0, perto = idx(si, sk), dPerto = hz(si, sk);
  while (aberto.length && passos++ < MAXP) {
    const [, i, k] = tira(aberto);
    const c = idx(i, k); if (fechado[c]) continue; fechado[c] = 1;
    if (i === gi && k === gk) { achou = true; break; }
    if (hz(i, k) < dPerto) { dPerto = hz(i, k); perto = c; }
    for (const [a, b, cs] of [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414]]) {
      const ni = i + a, nk = k + b; if (ni < 0 || nk < 0 || ni >= W || nk >= D) continue;
      const nc = idx(ni, nk); if (fechado[nc]) continue;
      const x = cx(ni), z = cz(nk), y = Y[c];
      // (cada célula é consultada uma vez: a colisão e a altura do chão custam, e um vizinho é visto até oito vezes)
      if (LV[nc] === 0) consulta(nc, x, z, y);
      if (LV[nc] === 2) continue;
      // na diagonal, as duas células do lado também livres: cortando a quina, o jogador (com a margem dele) batia no
      // canto e parava
      if (a && b) { const c1 = idx(i + a, k), c2 = idx(i, k + b);
        if (LV[c1] === 0) consulta(c1, cx(i + a), cz(k), y); if (LV[c2] === 0) consulta(c2, cx(i), cz(k + b), y);
        if (LV[c1] === 2 || LV[c2] === 2 || TR[c1] > y + 0.55 || TR[c2] > y + 0.55) continue; }
      // (na saída da margem, a altura fica a da partida: pegar a do fundo do tanque impedia subir de volta ao piso)
      // (e, como no movimento do jogo, cada passo ali dentro sai um pouco mais da margem: indo mais para dentro, o jogo
      // recusava o primeiro passo e o jogador nem saía do lugar)
      if (LV[nc] === 3 && profundidade && !(profundidade(x, z) < profundidade(cx(i), cz(k)) - 1e-4)) continue;
      if (LV[nc] === 3) { const g = G[c] + cs * 1.5; if (g < G[nc]) { G[nc] = g; Y[nc] = y; DE[nc] = c; poe(aberto, [g + hz(ni, nk), ni, nk]); } continue; }
      if (TR[nc] > y + 0.55) continue;
      const ny = soTerreno ? TR[nc] : alturaEm(x, z, y); if (ny > y + 0.55) continue;
      const g = G[c] + cs + Math.max(0, ny - y) * 2;
      if (g < G[nc]) { G[nc] = g; Y[nc] = ny; DE[nc] = c; poe(aberto, [g + hz(ni, nk), ni, nk]); }
    }
  }
  if (!achou && perto === idx(si, sk)) return { out: [], achou };
  const pts = []; for (let c = achou ? idx(gi, gk) : perto; c !== -1; c = DE[c]) pts.push(new THREE.Vector3(cx(Math.floor(c / D)), 0, cz(c % D)));
  pts.reverse();
  // enxuga: mantém só os pontos onde o rumo muda
  const out = []; for (let j = 1; j < pts.length; j++) { const a = pts[j - 1], b = pts[j], c2 = pts[j + 1]; if (!c2 || Math.abs((b.x - a.x) * (c2.z - b.z) - (b.z - a.z) * (c2.x - b.x)) > 1e-4) out.push(b); }
  // o último ponto é o tocado só se dá para pisar nele (dentro de algo, o jogador empacava na borda)
  if (out.length && achou && livreC(ate.x, ate.z, ate.y)) out[out.length - 1] = new THREE.Vector3(ate.x, 0, ate.z);
  if (!out.length && pts.length) out.push(pts[pts.length - 1]);
  return { out, achou };
  }
  caminho.livreC = livreC; caminho.terreno = terreno; caminho.alturaEm = alturaEm; caminho.profundidade = profundidade;      // (para os testes)
  return caminho;
}
