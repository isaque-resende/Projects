// Monte das Oliveiras: o jogador, a câmera e os controles.
// A câmera tem três jeitos:
//   subida  — começa alta e longe e, conforme o jogador sobe, desce para perto da nuca, olhando a estrada à frente;
//   revela  — no cume o jogador para, a câmera olha o horizonte e Jerusalém aparece (main.js conduz);
//   descida — por trás e um pouco acima, sempre olhando para o oeste: a cidade fica no horizonte enquanto se desce.
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { V3, LAY, E, DE, renderer, sm } from './estado.js';
import { gJog } from './modelos.js';
import { AMOS, iCume, terreno, ARVS } from './cenario.js';
import { ator } from './gente.js';
import './prensa.js';     // só para manter a ordem de montagem

// de onde começa: de Betfagé, no pé da subida; ?de=cume já no alto (Jerusalém à vista); ?de=getsemani, no fim da estrada
const iInicio = DE === 'cume' ? iCume + 4 : DE === 'getsemani' ? AMOS.length - 10 : 8;
const dirEm = (i, n = 6) => { const a = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))], b = AMOS[Math.max(0, Math.min(AMOS.length - 1, i + n))]; return b.clone().sub(a).setY(0).normalize(); };
const p0 = AMOS[iInicio], d0 = dirEm(iInicio);
const jog = ator(gJog, 1.7, p0.x, p0.z, Math.atan2(DE === 'getsemani' ? -d0.x : d0.x, DE === 'getsemani' ? -d0.z : d0.z), 'Parado');
if (DE === 'cume' || DE === 'getsemani') E.modo = 'descida';

// onde dá para andar: a faixa do monte (a área do layout); as pontas da estrada levam às outras fases
const [AX0, AX1, AZ0, AZ1] = LAY.area;
const naArea = (x, z) => x > AX0 && x < AX1 && z > AZ0 && z < AZ1;
const alturaEm = (x, z) => terreno(x, z);

// ---------- câmera ----------
// Sempre olhando para o jogador (ele fica no meio da tela, para qualquer lado que ande) e longe o bastante para
// ver o caminho em volta. No celular em pé a tela é estreita: o ângulo abre para caber a mesma largura.
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.3, 560);
const ajustaLente = () => {
  const h = THREE.MathUtils.degToRad(58), v = 2 * Math.atan(Math.tan(h / 2) / camera.aspect);     // ~58° de largura
  LENTE.base = Math.min(64, Math.max(45, THREE.MathUtils.radToDeg(v))); if (!LENTE.atual) LENTE.atual = LENTE.base;
  camera.fov = LENTE.atual; camera.updateProjectionMatrix();
};
const LENTE = { base: 45, atual: 0 };       // na revelação a lente fecha (teleobjetiva): a cidade cresce na tela sem chegar mais perto
ajustaLente();
// Zoom manual (pinça no celular, roda no computador) vale em toda a fase: E.dist / PADRAO é o fator de afastamento.
const DMIN = 7, DMAX = 32, PADRAO = 14;
const zoomK = () => E.dist / PADRAO;
const DESCE = V3(1, 0.55, 0.16).normalize();          // da descida: atrás (leste), acima e um pouco de lado
const CAM = { pos: V3(), olho: V3(), T: d0.clone() };
// subida: a câmera vem de longe e alto e se aproxima até um meio-termo (atrás e acima do ombro), a ~70% do caminho
const iPerto = iInicio + (iCume - iInicio) * 0.7;
function camSubida(i, dt, pj) {
  const k = sm(iInicio, iPerto, i), z = zoomK();
  CAM.T.lerp(dirEm(Math.min(i, iCume - 2), 10), Math.min(1, dt * 1.2)).normalize();
  const dist = (17 + (12 - 17) * k) * z, alt = (8 + (5 - 8) * k) * z;
  const alvo = pj.clone().addScaledVector(CAM.T, -dist); alvo.y = pj.y + alt;
  alvo.y = Math.max(alvo.y, terreno(alvo.x, alvo.z) + 1.6);                      // nunca entra no morro
  return [alvo, pj.clone().addScaledVector(CAM.T, 1.2 * k).add(V3(0, 1.2 + 0.3 * k, 0))];
}
function camDescida(pj) {
  const alvo = pj.clone().addScaledVector(DESCE, E.dist); alvo.y = Math.max(alvo.y, terreno(alvo.x, alvo.z) + 1.6);
  // mais embaixo, o olhar sobe um pouco: a cidade, do outro lado do vale, continua no alto da tela
  return [alvo, pj.clone().add(V3(-2.2, 1.2 + Math.min(1.2, Math.max(0, LAY.cume[1] - pj.y) * 0.07), 0))];
}
// revelação: atrás e acima do jogador, olhando por cima dele o templo, lá embaixo do outro lado do vale
function camRevela(pj) {
  const atras = CAM.T.clone().negate();
  return [pj.clone().addScaledVector(atras, 6.5).add(V3(0, 2.7, 0)), V3(LAY.vista[0], LAY.cume[1] - 8, LAY.vista[2])];
}
// Oliveira na frente: a copa que fica entre a câmera e o jogador (ou em volta da câmera) fica quase transparente,
// em vez de puxar a câmera para perto. Cada árvore ganha materiais próprios na primeira vez que precisa sumir.
function tapa(a, h, c) {
  const dx = c.x - h.x, dz = c.z - h.z, L2 = dx * dx + dz * dz || 1e-6;
  const t = Math.max(0, Math.min(1, ((a.c.x - h.x) * dx + (a.c.z - h.z) * dz) / L2));
  const px = h.x + dx * t - a.c.x, pz = h.z + dz * t - a.c.z, y = h.y + (c.y - h.y) * t;
  return t > 0.08 && px * px + pz * pz < (a.r + 0.4) ** 2 && y > a.y0 - 0.3 && y < a.y1 + 0.3;
}
function abreVista(pj, dt) {
  const h = V3(pj.x, pj.y + 1.1, pj.z), c = camera.position;
  for (const a of ARVS) {
    const alvo = tapa(a, h, c) ? 0.12 : 1;
    if (Math.abs(alvo - a.op) < 0.005) continue;
    if (!a.mats) { a.mats = []; a.n.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); a.mats.push(m.material); } }); }
    a.op += (alvo - a.op) * Math.min(1, dt * 6); if (Math.abs(alvo - a.op) < 0.01) a.op = alvo;
    const tr = a.op < 0.999;
    for (const m of a.mats) { if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } m.opacity = a.op; }
    a.n.traverse((m) => { if (m.isMesh) m.castShadow = a.op > 0.5; });
  }
}
function camPasso(i, dt, pj, primeira = false) {
  const [alvo, olho] = E.modo === 'subida' ? camSubida(i, dt, pj) : E.modo === 'revela' ? camRevela(pj) : camDescida(pj);
  const r = primeira ? 1 : Math.min(1, dt * (E.modo === 'revela' ? 0.9 : 2.5));
  CAM.pos.lerp(alvo, r); CAM.olho.lerp(olho, primeira ? 1 : Math.min(1, dt * (E.modo === 'revela' ? 0.9 : 5)));
  camera.position.copy(CAM.pos); camera.lookAt(CAM.olho);
  abreVista(pj, primeira ? 1 : dt);
  const fovAlvo = E.modo === 'revela' ? LENTE.base * 0.6 : LENTE.base;
  if (Math.abs(fovAlvo - LENTE.atual) > 0.01) { LENTE.atual += (fovAlvo - LENTE.atual) * (primeira ? 1 : Math.min(1, dt * 0.8)); camera.fov = LENTE.atual; camera.updateProjectionMatrix(); }
}

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX], toqueCurtoAciona: false });
const { tecla, JOY, toqueTela } = ctl;
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, dirEm, iInicio };
