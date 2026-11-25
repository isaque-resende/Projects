// Monte das Oliveiras: o jogador, a câmera e os controles.
// A câmera é a mesma de Betânia e Betfagé: de quina, de cima (~30°), lente fechada, seguindo o jogador (a sudeste
// dele). Chegando ao cume ela vai, devagar, para trás dele (leste) e mais baixa, de frente para Jerusalém, para
// contemplar a cidade; passado o cume, volta ao normal. Por enquanto há a câmera livre (camlivre.js).
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { criaCamLivre } from '../../limpo-motor/camlivre.js';
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
// lente fechada (como a do diorama): ~40° de largura; no celular em pé, o ângulo vertical abre até 58°
const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.5, 1400);
const LENTE = { base: 30, atual: 0 };
const ajustaLente = () => {
  const h = THREE.MathUtils.degToRad(40), v = 2 * Math.atan(Math.tan(h / 2) / camera.aspect);
  LENTE.base = LENTE.atual = Math.min(58, Math.max(26, THREE.MathUtils.radToDeg(v)));
  camera.fov = LENTE.atual; camera.updateProjectionMatrix();
};
ajustaLente();
const DMIN = 10, DMAX = 110;
const QUINA = V3(1, 0.8165, 0.35).normalize();        // a leste-sudeste e acima (30°), como em Betfagé: olha para oeste, para a cidade
const CUME = V3(1, 0.42, 0.06).normalize();           // no cume: atrás (leste) e baixa, de frente para a cidade
const CAM = { pos: V3(), olho: V3(), braco: 1, off: V3(), offO: V3(), cume: 0 };
const suave = (k, dt) => 1 - Math.exp(-k * dt);
// braço da câmera: se o morro fica entre o jogador e o lugar da câmera, ela chega mais perto em vez de subir
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
const livre = criaCamLivre(E, () => [DMIN, DMAX]);
// quanto a câmera está "no cume": sobe nos últimos ~25 m antes do alto e volta a zero ~30 m depois
const noCume = (i) => sm(iCume - 50, iCume - 6, i) * (1 - sm(iCume + 24, iCume + 64, i));
function camAlvo(i, pj, dt) {
  CAM.cume += (noCume(i) - CAM.cume) * suave(1.5, dt);
  const k = CAM.cume, dir = livre.aplica(QUINA.clone().lerp(CUME, k).normalize());
  const d = E.dist * (1 - k) + 13 * k;
  const alvo = braco(pj, pj.clone().addScaledVector(dir, d), dt);
  // olha para o jogador; no cume, para a frente e para cima: a cidade do outro lado do vale entra no quadro
  return [alvo, pj.clone().add(V3(-6 * k, 1.1 + 0.4 * k, 0))];
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
    const alvo = 1;      // nada fica transparente: o que tapa o jogador fica como está, e o triângulo amarelo o mostra
    if (Math.abs(alvo - a.op) < 0.005) continue;
    if (!a.mats) { a.mats = []; a.n.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); a.mats.push(m.material); } }); }
    a.op += (alvo - a.op) * Math.min(1, dt * 6); if (Math.abs(alvo - a.op) < 0.01) a.op = alvo;
    const tr = a.op < 0.999;
    for (const m of a.mats) { if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } m.opacity = a.op; }
    a.n.traverse((m) => { if (m.isMesh) m.castShadow = a.op > 0.5; });
  }
}
function camPasso(i, dt, pj, primeira = false) {
  livre.passo(dt);
  const [alvo, olho] = camAlvo(i, pj, primeira ? 1 : dt);
  // o que se suaviza é a posição da câmera EM RELAÇÃO ao jogador: ele anda e a câmera vai junto, sem tremer
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

export { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, dirEm, iInicio, livre };
