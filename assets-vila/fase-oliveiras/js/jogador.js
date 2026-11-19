// Monte das Oliveiras: o jogador, a câmera e os controles.
// A câmera tem dois jeitos (a cidade, no horizonte, só aparece por cima do cume: ninguém a anima):
//   subida  — começa alta e longe e, conforme o jogador sobe, desce para perto da nuca, olhando a estrada à frente;
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
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.3, 850);     // os montes pintados ficam a 560 m do cume
const ajustaLente = () => {
  const h = THREE.MathUtils.degToRad(58), v = 2 * Math.atan(Math.tan(h / 2) / camera.aspect);     // ~58° de largura
  LENTE.base = LENTE.atual = Math.min(64, Math.max(45, THREE.MathUtils.radToDeg(v)));
  camera.fov = LENTE.atual; camera.updateProjectionMatrix();
};
const LENTE = { base: 45, atual: 0 };
ajustaLente();
// Zoom manual (pinça no celular, roda no computador) vale em toda a fase: E.dist / PADRAO é o fator de afastamento.
const DMIN = 7, DMAX = 26, PADRAO = 14;
const zoomK = () => E.dist / PADRAO;
const DESCE = V3(1, 0.55, 0.16).normalize();          // da descida: atrás (leste), acima e um pouco de lado
const CAM = { pos: V3(), olho: V3(), T: d0.clone(), braco: 1, off: V3(), offO: V3() };
// suavização que não depende do tamanho do quadro (no celular os quadros variam muito: com min(1, dt*k) a câmera tremia)
const suave = (k, dt) => 1 - Math.exp(-k * dt);
// subida: a câmera vem de longe e alto e se aproxima até um meio-termo (atrás e acima do ombro), a ~70% do caminho
const iPerto = iInicio + (iCume - iInicio) * 0.7;
// braço da câmera: se o morro fica entre o jogador e o lugar da câmera (ou a câmera cairia dentro dele), ela chega
// mais perto em vez de subir (antes subia até 60 m e via o mapa de cima, ou entrava no morro)
// (o quanto o braço estica muda devagar: recolhe em ~0,2 s e volta em ~1 s, sem tremer nos calombos do chão)
function braco(pj, alvo, dt) {
  const h = V3(pj.x, pj.y + 1.4, pj.z), q = V3(); let t = 1, folga0 = 1e9;
  for (let k = 1; k <= 40; k++) {
    q.lerpVectors(h, alvo, k / 40); const folga = q.y - terreno(q.x, q.z) - 1.2;
    if (folga < 0) { t = Math.max(0.3, (k - 1 + folga0 / Math.max(1e-3, folga0 - folga)) / 40); break; }
    folga0 = folga;
  }
  CAM.braco += (t - CAM.braco) * suave(t < CAM.braco ? 6 : 1.2, dt);
  const c = h.clone().lerp(alvo, CAM.braco); c.y = Math.max(c.y, terreno(c.x, c.z) + 1.2);
  return c;
}
function camSubida(i, dt, pj) {
  const k = sm(iInicio, iPerto, i), z = zoomK();
  // a estrada da subida faz zigue-zague: a câmera segue o rumo geral (a corda de ~25 m à frente) e gira devagar,
  // senão balança a cada curva e o direcional (que anda para onde a câmera olha) entra no balanço
  const ia = Math.min(i, iCume - 2), ib = Math.min(iCume, ia + 50), rumo = AMOS[ib].clone().sub(AMOS[ia]).setY(0);
  if (rumo.lengthSq() > 1) CAM.T.lerp(rumo.normalize(), suave(0.6, dt)).normalize();
  const dist = (17 + (12 - 17) * k) * z, alt = (8 + (5 - 8) * k) * z;
  const alvo = pj.clone().addScaledVector(CAM.T, -dist); alvo.y = pj.y + alt;
  return [braco(pj, alvo, dt), pj.clone().addScaledVector(CAM.T, 1.2 * k).add(V3(0, 1.2 + 0.3 * k, 0))];
}
function camDescida(pj, dt) {
  const alvo = braco(pj, pj.clone().addScaledVector(DESCE, E.dist), dt);
  // mira à frente do jogador (mais longe quanto maior o zoom): o olhar fica ~17° para baixo e a cidade cabe na tela
  // mesmo com o celular deitado; mais embaixo, o olhar sobe um pouco
  return [alvo, pj.clone().add(V3(-2.2 - 0.45 * E.dist, 1.2 + Math.min(1.2, Math.max(0, LAY.cume[1] - pj.y) * 0.07), 0))];
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
  const [alvo, olho] = E.modo === 'subida' ? camSubida(i, primeira ? 1 : dt, pj) : camDescida(pj, primeira ? 1 : dt);
  // o que se suaviza é a posição da câmera EM RELAÇÃO ao jogador: ele anda e a câmera vai junto, exata, sem atraso
  // que varie de quadro para quadro (era isso que fazia Jerusalém tremer no fundo enquanto se andava)
  CAM.off.lerp(alvo.sub(pj), primeira ? 1 : suave(2.5, dt)); CAM.offO.lerp(olho.sub(pj), primeira ? 1 : suave(5, dt));
  CAM.pos.copy(pj).add(CAM.off); CAM.pos.y = Math.max(CAM.pos.y, terreno(CAM.pos.x, CAM.pos.z) + 1.0);
  CAM.olho.copy(pj).add(CAM.offO);
  camera.position.copy(CAM.pos); camera.lookAt(CAM.olho);
  abreVista(pj, primeira ? 1 : dt);
}

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX], toqueCurtoAciona: false });
const { tecla, JOY, toqueTela } = ctl;
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, dirEm, iInicio };
