// Motor comum: o diretor das cenas. Enquanto uma cena corre, a câmera deixa o jogador e segue quem está agindo, plano a
// plano: abre no lugar, chega perto num zoom rápido, afasta-se acompanhando quem corre... Barras pretas em cima e
// embaixo; o jogador não anda (E.cine), e pode pular a cena.
//   const CINE = criaCine({ camera, E, chao, obstaculos, deOnde, fovCena });
//   CINE.roda([plano, plano, ...], aoFim, { aoPular });    // entra na fila
//   no laço:  if (!CINE.passo(dt)) { ...a câmera de sempre... }
// Cada plano: { alvo: () => ponto que a câmera olha, dist, el (graus acima), yaw (graus: de que lado fica a câmera;
//   0 = ao sul do alvo (+z), 90 = a leste (+x), 180 = ao norte) ou yaw: () => graus, zoom (1 = lente da cena; menor
//   fecha), k (rapidez de seguir o alvo e virar), kd (rapidez de chegar à distância), dur (segundos) ou ate: () => true
//   para passar ao seguinte, corte: true (salta, sem transição), titulo: 'texto' (letreiro no canto enquanto dura),
//   livre: true (não desvia de paredes nem sobe acima do chão: cenas em cenários à parte, como dentro de casa),
//   fixo: true (não desvia de paredes: o enquadramento é exato, como diante da pedra do túmulo),
//   aoEntrar: () => {} (roda quando o plano começa) }.
// Se uma parede tapa o alvo, a câmera procura, aos poucos, um ângulo vizinho de onde ele apareça.
//   chao(x, z): altura do chão (a câmera fica sempre acima); obstaculos(): malhas que podem tapar o alvo;
//   deOnde(): { alvo, pos } de onde a câmera do jogo está (a cena parte dali); fovCena: a lente das cenas (graus).
import * as THREE from 'three';

const RAD = Math.PI / 180;
const DESV = [[0, 0], [25, 0], [-25, 0], [0, 15], [50, 8], [-50, 8], [0, 30], [80, 15], [-80, 15], [120, 12], [-120, 12], [180, 12]].map(([a, b]) => [a * RAD, b * RAD]);
const ang = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const suave = (k, dt) => 1 - Math.exp(-k * dt);
const dirDe = (yaw, el) => new THREE.Vector3(Math.sin(yaw) * Math.cos(el), Math.sin(el), Math.cos(yaw) * Math.cos(el));

export function criaCine({ camera, E, chao = () => -1e9, obstaculos = () => [], deOnde, fovCena = null }) {
  const RC = new THREE.Raycaster();
  // o primeiro obstáculo de "de" na direção dir (até L), medido nos dois sentidos: muros e telhados têm face só do
  // lado de fora, e um raio que sai de dentro deles passa sem bater
  function primeiro(de, dir, L) {
    const ob = obstaculos(); RC.set(de, dir); RC.far = L; const a = RC.intersectObjects(ob, false)[0];
    RC.set(de.clone().addScaledVector(dir, L), dir.clone().negate()); RC.far = L; const vs = RC.intersectObjects(ob, false);
    const d = Math.min(a ? a.distance : Infinity, vs.length ? L - vs[vs.length - 1].distance : Infinity);
    return d < Infinity ? { distance: d } : null;
  }
  const C = { ativo: false, fila: [], seq: null, i: 0, t: 0, alvo: new THREE.Vector3(), yaw: 0, el: 0, dist: 10, zoom: 1, fovJogo: 0, pula: false,
    dy: 0, de: 0, dyA: 0, deA: 0, tD: 0, cortou: 0, corteVolta: false, encA: 1e9, Dc: null };

  // barras pretas, o botão de pular e o letreiro
  const barra = (lado) => { const d = document.createElement('div');
    Object.assign(d.style, { position: 'fixed', left: 0, right: 0, [lado]: 0, height: '0', background: '#000', transition: 'height .6s ease', zIndex: 4, pointerEvents: 'none' });
    document.body.appendChild(d); return d; };
  const B1 = barra('top'), B2 = barra('bottom');
  const PULA = document.createElement('button'); PULA.textContent = 'Pular cena ›';
  Object.assign(PULA.style, { position: 'fixed', right: '12px', bottom: 'calc(9vh + 10px + env(safe-area-inset-bottom))', padding: '8px 14px', border: 0, borderRadius: '10px', background: '#fdf6e3cc', color: '#4a3520', font: '14px system-ui', display: 'none', zIndex: 9 });
  PULA.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); C.pula = true; });
  document.body.appendChild(PULA);
  const TIT = document.createElement('div');
  Object.assign(TIT.style, { position: 'fixed', left: '18px', top: 'calc(8vh + 14px)', color: '#fdf6e3', font: '600 19px Georgia, serif', letterSpacing: '0.04em', textShadow: '0 2px 8px #000c', opacity: 0, transition: 'opacity .5s', zIndex: 5, pointerEvents: 'none' });
  document.body.appendChild(TIT);
  const titulo = (s) => { if (s) { TIT.textContent = s; TIT.style.opacity = 1; } else TIT.style.opacity = 0; };
  const barras = (on) => { B1.style.height = B2.style.height = on ? '8vh' : '0'; PULA.style.display = on ? 'block' : 'none'; if (!on) titulo(''); };

  const yawDe = (p) => (typeof p.yaw === 'function' ? p.yaw() : p.yaw) * RAD;
  // roda uma sequência de planos (se já há uma rodando, entra na fila); aoFim, quando acaba ou é pulada
  function roda(planos, aoFim, o = {}) { C.fila.push({ planos, aoFim, aoPular: o.aoPular }); }
  function comeca(seq) {
    C.seq = seq; C.i = 0; C.t = 0; C.ativo = true; C.pula = false; E.cine = true; E.alvoToque = null;
    C.fovJogo = camera.fov;
    const d0 = deOnde(); C.alvo.copy(d0.alvo); const d = d0.pos.clone().sub(C.alvo);
    C.dist = d.length(); C.yaw = Math.atan2(d.x, d.z); C.el = Math.asin(THREE.MathUtils.clamp(d.y / C.dist, -1, 1));
    C.zoom = C.fovJogo / (fovCena || C.fovJogo);
    C.dy = C.de = C.dyA = C.deA = 0; C.encA = 1e9; C.Dc = null; C.tD = 0;
    barras(true); C.cortou = 2; entra(seq.planos[0]);
  }
  function entra(p) {
    C.t = 0; if (!p) return;
    if (p.aoEntrar) p.aoEntrar();
    titulo(p.titulo || '');
    if (p.corte) { C.cortou = 2; C.alvo.copy(p.alvo()); C.dist = p.dist; C.yaw = yawDe(p); C.el = p.el * RAD; C.zoom = p.zoom ?? 1; C.dy = C.de = C.dyA = C.deA = 0; C.encA = 1e9; C.Dc = null; C.tD = 0; }
  }
  function acaba(pulou) {
    const seq = C.seq; C.seq = null; C.ativo = false; E.cine = false; barras(false);
    camera.fov = C.fovJogo; camera.updateProjectionMatrix();
    C.corteVolta = true;     // a câmera do jogo volta num corte (passar devagar pelo meio do cenário não fica bonito)
    if (seq) { if (pulou && seq.aoPular) seq.aoPular(); if (seq.aoFim) seq.aoFim(); }
  }

  // a cada quadro: devolve true se a câmera é da cena
  function passo(dt) {
    if (!C.ativo && C.fila.length && !E.semCena) comeca(C.fila.shift());
    if (!C.ativo) return false;
    if (C.pula) { acaba(true); return false; }
    let p = C.seq.planos[C.i];
    C.t += dt;
    if (p && ((p.dur != null && C.t >= p.dur) || (p.ate && p.ate()))) { C.i++; p = C.seq.planos[C.i]; entra(p); }
    if (!p) { acaba(false); return false; }
    const k = p.k ?? 3, kd = p.kd ?? 2;
    C.alvo.lerp(p.alvo(), suave(k * 1.5, dt));
    C.yaw += ang(yawDe(p) - C.yaw) * suave(k, dt);
    C.el += (p.el * RAD - C.el) * suave(k, dt);
    C.dist += (p.dist - C.dist) * suave(kd, dt);
    C.zoom += ((p.zoom ?? 1) - C.zoom) * suave(kd, dt);
    // tela em pé (celular): a câmera chega um pouco mais perto, para quem age não ficar pequeno (sem cortar quem está ao lado)
    const fa = Math.min(1, 0.75 + 0.25 * camera.aspect), D = C.dist * fa;
    // se algo tapa o alvo, procura um ângulo vizinho
    if (!p.livre && !p.fixo && (C.tD -= dt) <= 0) {
      C.tD = 0.2; const ob = obstaculos(); let livre_ = false, melhor = null;
      for (const [a, b] of DESV) {
        const q = dirDe(C.yaw + a, Math.min(1.3, C.el + b)); const h = primeiro(C.alvo, q, Math.max(0.5, D - 0.3));
        if (!h) { C.dyA = a; C.deA = b; livre_ = true; break; }
        if (!melhor || h.distance > melhor.d) melhor = { a, b, d: h.distance };
      }
      // nenhum ângulo livre: o de mais espaço, e a câmera chega mais perto, para a frente do que tapa
      if (!livre_ && melhor) { C.dyA = melhor.a; C.deA = melhor.b; C.encA = Math.max(0.9, melhor.d - 0.5); }
      else C.encA = 1e9;
    }
    if (p.livre || p.fixo) { C.dyA = C.deA = 0; C.encA = 1e9; }
    C.dy += (C.dyA - C.dy) * suave(3.5, dt); C.de += (C.deA - C.de) * suave(3.5, dt);
    // e, a cada quadro, a linha de verdade entre a câmera e o alvo: se algo entra no meio (a câmera ainda virando, quem
    // está em cena andando), ela chega mais perto, para a frente do que tapa
    let encAgora = 1e9;
    if (!p.livre && !p.fixo) { const h = primeiro(C.alvo, dirDe(C.yaw + C.dy, Math.min(1.3, C.el + C.de)), D); if (h && h.distance > 1.2) encAgora = h.distance - 0.75; }      // (folga maior que o plano de corte da lente)
    const Dalvo = Math.min(D, C.encA, encAgora); C.Dc = C.Dc == null ? Dalvo : C.Dc + (Dalvo - C.Dc) * suave(Dalvo < C.Dc ? 9 : 3, dt);
    const pos = C.alvo.clone().addScaledVector(dirDe(C.yaw + C.dy, Math.min(1.3, C.el + C.de)), C.Dc);
    if (!p.livre) pos.y = Math.max(pos.y, chao(pos.x, pos.z) + 0.8);
    camera.position.copy(pos); camera.lookAt(C.alvo);
    camera.fov = (fovCena || C.fovJogo) * C.zoom; camera.updateProjectionMatrix();
    if (C.cortou > 0) C.cortou--;
    return true;
  }
  // dali se vê o alvo? (para a cena escolher de que lado pôr a câmera)
  function ve(alvo, yawGraus, elGraus, d) { return !primeiro(alvo, dirDe(yawGraus * RAD, elGraus * RAD), d * Math.min(1, 0.75 + 0.25 * camera.aspect) + 0.5); }
  return { roda, passo, titulo, ve, pular: () => { if (C.ativo) C.pula = true; }, C };
}

// as malhas que podem tapar quem está em cena: as altas do cenário (casas, muros, rochas, árvores), não as pessoas nem o
// chão (ignora: malhas ou grupos de fora, como o terreno). Refeita a cada segundo: as árvores de perto do jogador são
// postas e trocadas enquanto ele anda (layout.js), e uma lista feita uma vez só não as via.
export function malhasAltas(scene, ignora = []) {
  let L = null, quando = 0;
  return () => {
    const agora = performance.now(); if (L && agora - quando < 1000) return L; quando = agora;
    L = []; const b = new THREE.Box3(), fora = new Set(ignora);
    const ve = (o) => {
      if (o.userData.mx || fora.has(o)) return;
      if (o.isInstancedMesh) { o.geometry.computeBoundingBox(); const g = o.geometry.boundingBox; if (g.max.y - g.min.y > 0.7) L.push(o); }
      else if (o.isMesh && !o.isSkinnedMesh) { b.setFromObject(o); if (b.min.y > -30 && b.max.y - b.min.y > 0.7) L.push(o); }      // (inclusive as malhas grandes que juntam muitas árvores, como as tamareiras de Betânia)
      for (const c of o.children) ve(c);
    };
    ve(scene); return L;
  };
}
