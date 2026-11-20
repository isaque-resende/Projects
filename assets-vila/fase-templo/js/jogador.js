// Templo: o jogador, a câmera e os controles.
// A câmera é a mesma das outras fases: de quina, de cima (~30°), lente fechada, seguindo o jogador; daqui ela fica a
// leste-nordeste dele e olha para oeste: o santuário olha para o leste, e as portas dos pátios estão no eixo leste-oeste.
// Muros e tetos que tapam a vista ficam transparentes (cenario.js). Por enquanto há a câmera livre (camlivre.js).
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { criaCamLivre } from '../../limpo-motor/camlivre.js';
import { V3, LAY, E, DE, renderer } from './estado.js';
import { gJog } from './modelos.js';
import { terreno } from './cenario.js';
import { ator } from './gente.js';

// de onde começa: na porta do norte, junto à Antônia (vindo de Betesda); ?de=cidade, na porta do oeste; ?de=israel, no Pátio de Israel
const ARVS = [];
const ini = DE === 'cidade' ? LAY.oeste : DE === 'israel' ? LAY.israel : LAY.norte;
const d0 = DE === 'cidade' ? V3(1, 0, 0) : DE === 'israel' ? V3(-1, 0, 0) : V3(0, 0, 1);
const jog = ator(gJog, 1.7, ini[0], ini[2], Math.atan2(d0.x, d0.z), 'Parado');

const [AX0, AX1, AZ0, AZ1] = LAY.area;
const naArea = (x, z) => x > AX0 && x < AX1 && z > AZ0 && z < AZ1;
const alturaEm = (x, z) => terreno(x, z);

// ---------- câmera ----------
const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 0.5, 1200);
const LENTE = { base: 30, atual: 0 };
const ajustaLente = () => {
  const h = THREE.MathUtils.degToRad(40), v = 2 * Math.atan(Math.tan(h / 2) / camera.aspect);
  LENTE.base = LENTE.atual = Math.min(58, Math.max(26, THREE.MathUtils.radToDeg(v)));
  camera.fov = LENTE.atual; camera.updateProjectionMatrix();
};
ajustaLente();
const DMIN = 8, DMAX = 90;
const QUINA = V3(1, 0.8165, -0.35).normalize();       // a leste-nordeste e acima (30°): olha o santuário e as portas (oeste)
const PERTO = V3(1, 0.45, -0.35).normalize();          // conversando, ou olhando o santuário: mais baixa e mais perto
const CAM = { pos: V3(), olho: V3(), braco: 1, off: V3(), offO: V3(), perto: 0 };
const suave = (k, dt) => 1 - Math.exp(-k * dt);
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
function camAlvo(pj, dt) {
  const k = CAM.perto, dir = livre.aplica(QUINA.clone().lerp(PERTO, k).normalize());
  const d = E.dist * (1 - k) + 9 * k;
  const alvo = braco(pj, pj.clone().addScaledVector(dir, d), dt);
  return [alvo, pj.clone().add(V3(0, 1.1 + 0.3 * k, 0))];
}
// árvore na frente: a copa entre a câmera e o jogador fica quase transparente
function tapa(a, h, c) {
  const dx = c.x - h.x, dz = c.z - h.z, L2 = dx * dx + dz * dz || 1e-6;
  const t = Math.max(0, Math.min(1, ((a.c.x - h.x) * dx + (a.c.z - h.z) * dz) / L2));
  const px = h.x + dx * t - a.c.x, pz = h.z + dz * t - a.c.z, y = h.y + (c.y - h.y) * t;
  return t > 0.04 && px * px + pz * pz < (a.r + 0.4) ** 2 && y > a.y0 - 0.3 && y < a.y1 + 0.3;
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
function camPasso(dt, pj, primeira = false) {
  livre.passo(dt);
  const [alvo, olho] = camAlvo(pj, primeira ? 1 : dt);
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

export { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, livre };
