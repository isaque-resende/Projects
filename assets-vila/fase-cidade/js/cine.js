// Cidade alta: o diretor das cenas. Enquanto uma cena corre, a câmera deixa o jogador e segue quem está agindo, plano a
// plano: abre no lugar, chega perto num zoom rápido, afasta-se acompanhando quem corre... Barras pretas em cima e
// embaixo; o jogador não anda, e pode pular a cena (a cena continua, só a câmera volta para ele).
// Cada plano: { alvo: () => ponto que a câmera olha, dist, el (graus acima), yaw (graus: de que lado fica a câmera;
//   0 = ao sul do alvo, 90 = a leste, 180 = ao norte) ou yaw: () => graus, zoom (1 = lente de sempre; menor fecha),
//   k (rapidez de seguir o alvo e virar), kd (rapidez de chegar à distância), dur (segundos) ou ate: () => true para
//   passar ao seguinte, corte: true (salta, sem transição) }.
// Se uma parede tapa o alvo, a câmera procura, aos poucos, um ângulo vizinho de onde ele apareça (como a do jogador).
import * as THREE from 'three';
import { V3, E } from './estado.js';
import { terreno } from './cenario.js';
import { camera, CAM, obstaculos } from './jogador.js';

const RAD = Math.PI / 180, RC = new THREE.Raycaster();
const C = { ativo: false, fila: [], seq: null, i: 0, t: 0, alvo: V3(), yaw: 0, el: 0, dist: 10, zoom: 1, fov0: 0, pula: false,
  dy: 0, de: 0, dyA: 0, deA: 0, tD: 0, fim: 0 };
const DESV = [[0, 0], [25, 0], [-25, 0], [0, 15], [50, 8], [-50, 8], [0, 30], [80, 15], [-80, 15]].map(([a, b]) => [a * RAD, b * RAD]);

// barras pretas e o botão de pular
function barra(lado) {
  const d = document.createElement('div');
  Object.assign(d.style, { position: 'fixed', left: 0, right: 0, [lado]: 0, height: '0', background: '#000', transition: 'height .7s ease', zIndex: 4, pointerEvents: 'none' });
  document.body.appendChild(d); return d;
}
const B1 = barra('top'), B2 = barra('bottom');
const PULA = document.createElement('button');
PULA.textContent = 'Pular cena ›';
Object.assign(PULA.style, { position: 'fixed', right: '12px', bottom: 'calc(9vh + 10px + env(safe-area-inset-bottom))', padding: '8px 14px', border: 0, borderRadius: '10px', background: '#fdf6e3cc', color: '#4a3520', font: '14px system-ui', display: 'none', zIndex: 6 });
PULA.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); C.pula = true; });
document.body.appendChild(PULA);
const barras = (on) => { B1.style.height = B2.style.height = on ? '8vh' : '0'; PULA.style.display = on ? 'block' : 'none'; };

const ang = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const suave = (k, dt) => 1 - Math.exp(-k * dt);
const dirDe = (yaw, el) => V3(Math.sin(yaw) * Math.cos(el), Math.sin(el), Math.cos(yaw) * Math.cos(el));

// roda uma sequência de planos (se já há uma rodando, entra na fila); aoFim, quando acaba ou é pulada
function roda(planos, aoFim) { C.fila.push({ planos, aoFim }); }
function comeca(seq) {
  C.seq = seq; C.i = 0; C.t = 0; C.ativo = true; C.pula = false; E.cine = true; E.alvoToque = null;
  if (!C.fov0) C.fov0 = camera.fov;
  // parte de onde a câmera está
  C.alvo.copy(CAM.olho); const d = camera.position.clone().sub(C.alvo);
  C.dist = d.length(); C.yaw = Math.atan2(d.x, d.z); C.el = Math.asin(THREE.MathUtils.clamp(d.y / C.dist, -1, 1)); C.zoom = 1;
  C.dy = C.de = C.dyA = C.deA = 0;
  barras(true); C.cortou = 2; entra(seq.planos[0]);
}
function entra(p) {
  C.t = 0; if (!p) return;
  if (p.corte) C.cortou = 2;      // num corte, quem está rente à câmera pode sumir sem se ver
  if (p.corte) { C.alvo.copy(p.alvo()); C.dist = p.dist; C.yaw = yawDe(p); C.el = p.el * RAD; C.zoom = p.zoom ?? 1; C.dy = C.de = C.dyA = C.deA = 0; }
}
const yawDe = (p) => (typeof p.yaw === 'function' ? p.yaw() : p.yaw) * RAD;
function acaba() {
  const seq = C.seq; C.seq = null; C.ativo = false; E.cine = false; barras(false);
  // a câmera do jogador continua daqui, voltando aos poucos para ele
  const pj = globalThis.__pj; if (pj) { CAM.off.copy(camera.position).sub(pj); CAM.offO.copy(C.alvo).sub(pj); }
  C.fim = 1.2; C.corteVolta = true;
  if (seq && seq.aoFim) seq.aoFim();
}

// a cada quadro: devolve true se a câmera é da cena
function passo(dt, pj) {
  globalThis.__pj = pj;
  if (!C.ativo && C.fila.length && !E.fora) comeca(C.fila.shift());
  if (!C.ativo) {
    if (C.fim > 0 && C.fov0) { C.fim -= dt; camera.fov += (C.fov0 - camera.fov) * suave(4, dt); if (C.fim <= 0) camera.fov = C.fov0; camera.updateProjectionMatrix(); }
    return false;
  }
  if (C.pula) { acaba(); return false; }
  let p = C.seq.planos[C.i];
  C.t += dt;
  if (p && ((p.dur != null && C.t >= p.dur) || (p.ate && p.ate()))) { C.i++; p = C.seq.planos[C.i]; entra(p); }
  if (!p) { acaba(); return false; }
  const k = p.k ?? 3, kd = p.kd ?? 2;
  C.alvo.lerp(p.alvo(), suave(k * 1.5, dt));
  C.yaw += ang(yawDe(p) - C.yaw) * suave(k, dt);
  C.el += (p.el * RAD - C.el) * suave(k, dt);
  C.dist += (p.dist - C.dist) * suave(kd, dt);
  C.zoom += ((p.zoom ?? 1) - C.zoom) * suave(kd, dt);
  // tela em pé (celular): o quadro é estreito, então a câmera chega mais perto, para quem age não ficar pequeno
  const fa = Math.min(1, 0.4 + 0.6 * camera.aspect), D = C.dist * fa;
  // se algo tapa o alvo, procura um ângulo vizinho
  if ((C.tD -= dt) <= 0) {
    C.tD = 0.2; const ob = obstaculos();
    for (const [a, b] of DESV) {
      const q = dirDe(C.yaw + a, Math.min(1.3, C.el + b)); RC.set(C.alvo, q); RC.far = Math.max(0.5, D - 0.6);
      if (!RC.intersectObjects(ob, false).length) { C.dyA = a; C.deA = b; break; }
    }
  }
  C.dy += (C.dyA - C.dy) * suave(2.2, dt); C.de += (C.deA - C.de) * suave(2.2, dt);
  const pos = C.alvo.clone().addScaledVector(dirDe(C.yaw + C.dy, Math.min(1.3, C.el + C.de)), D);
  pos.y = Math.max(pos.y, terreno(pos.x, pos.z) + 0.8);
  camera.position.copy(pos); camera.lookAt(C.alvo);
  CAM.pos.copy(pos); CAM.olho.copy(C.alvo);
  camera.fov = C.fov0 * C.zoom; camera.updateProjectionMatrix();
  return true;
}
// a lente de sempre mudou (a tela girou)
function novaLente() { C.fov0 = camera.fov; }

export { roda, passo, novaLente, C as CINE };
