// Gólgota: o jogador, a câmera e os controles.
// A câmera é a mesma de Betânia, Betfagé e do Getsêmani: de quina, de cima (~30°), lente fechada, seguindo o jogador;
// daqui ela fica a leste-sudeste dele e olha para oeste: a face do Gólgota e a porta do sepulcro olham para o leste,
// para a estrada. Quando ele se abaixa na porta do sepulcro, ela vem para trás dele, baixa. Por enquanto há a câmera
// livre (camlivre.js).
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { criaCamLivre } from '../../limpo-motor/camlivre.js';
import { V3, LAY, E, DE, renderer, scene } from './estado.js';
import { gJog } from './modelos.js';
import { AMOS, terreno, ARVS, TERRENO, TUM } from './cenario.js';
import { malhasAltas } from '../../limpo-motor/cine.js';
import { criaFolga } from '../../limpo-motor/folga.js';
import { ator } from './gente.js';

// de onde começa: na ponta sudeste da estrada (vindo da Porta de Genat); ?de=emaus, na ponta noroeste; ?de=sepulcro, no horto
const dirEm = (i, n = 6) => { const a = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))], b = AMOS[Math.max(0, Math.min(AMOS.length - 1, i + n))]; return b.clone().sub(a).setY(0).normalize(); };
const perto = (x, z) => { let k = 0, m = 1e9; AMOS.forEach((a, i) => { const d = (a.x - x) ** 2 + (a.z - z) ** 2; if (d < m) { m = d; k = i; } }); return k; };
const iInicio = DE === 'emaus' ? AMOS.length - 8 : perto(44, 41);      // já fora da porta, longe o bastante dos muros para eles não taparem a câmera
let p0 = AMOS[iInicio], d0 = dirEm(iInicio);
if (DE === 'sepulcro') { p0 = V3(LAY.portao[0] - 2, 0, LAY.portao[2]); d0 = V3(-1, 0, 0); }
const jog = ator(gJog, 1.7, p0.x, p0.z, Math.atan2(d0.x, d0.z), 'Parado');

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
const QUINA = V3(1, 0.8165, 0.3).normalize();         // a leste-sudeste e acima (30°): olha o Gólgota, o horto e a parede de pedra (oeste)
const PERTO = V3(1, 0.3, 0.18).normalize();           // abaixado na porta do sepulcro: atrás (leste) e baixa
const CAM = { dentro: 0, pos: V3(), olho: V3(), braco: 1, off: V3(), offO: V3(), perto: 0 };
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
// subindo o Gólgota pelas encostas do oeste, a câmera dá a volta com o jogador: fica do lado de fora do monte, mais
// baixa, olhando para dentro (o monte atrás dele e, por cima, Jerusalém ao longe). No alto e longe do monte, volta à quina.
const [MGX, MGZ, MRW, MRE, MRZ] = LAY.monte || [0, 0, 1, 1, 1];
const smo = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const MONTE = V3(), U = V3();
CAM.monte = 0;
function pesoMonte(pj) {
  const dx = pj.x - MGX, dz = pj.z - MGZ, r = Math.hypot(dx / (dx < 0 ? MRW : MRE), dz / MRZ);
  return smo(0.38, 0.52, r) * (1 - smo(1.05, 1.3, r)) * (1 - smo(-3, 1, dx));       // nas encostas; não no alto, não do lado da estrada
}
function camAlvo(pj, dt) {
  const k = CAM.perto; let dir = livre.aplica(QUINA.clone().lerp(PERTO, k).normalize());
  CAM.monte += (pesoMonte(pj) - CAM.monte) * suave(1.5, dt);
  if (CAM.monte > 0.001) {
    U.set(pj.x - MGX, 0, pj.z - MGZ).normalize();
    MONTE.set(U.x, 0.55, U.z).normalize();
    dir = dir.clone().lerp(MONTE, CAM.monte).normalize();
  }
  const d = E.dist * (1 - k) + 5.5 * k;
  const alvo = braco(pj, pj.clone().addScaledVector(dir, d), dt);
  // olha para o jogador; abaixado, para a frente e para baixo (a boca do sepulcro)
  return [alvo, pj.clone().add(V3(-3 * k, 1.1 - 0.2 * k, 0))];
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
    const alvo = 1;      // nada fica transparente: o que tapa o jogador fica como está, e o triângulo amarelo o mostra
    if (Math.abs(alvo - a.op) < 0.005) continue;
    if (!a.mats) { a.mats = []; a.n.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); a.mats.push(m.material); } }); }
    a.op += (alvo - a.op) * Math.min(1, dt * 6); if (Math.abs(alvo - a.op) < 0.01) a.op = alvo;
    const tr = a.op < 0.999;
    for (const m of a.mats) { if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } m.opacity = a.op; }
    a.n.traverse((m) => { if (m.isMesh) m.castShadow = a.op > 0.5; });
  }
}
const FOLGA = criaFolga(malhasAltas(scene, [TERRENO])); if (globalThis.MODO_TESTE) globalThis.__FOLGA = FOLGA;
function camPasso(dt, pj, primeira = false) {
  livre.passo(dt);
  const [alvo, olho] = camAlvo(pj, primeira ? 1 : dt);
  CAM.off.lerp(alvo.sub(pj), primeira ? 1 : suave(2.5, dt)); CAM.offO.lerp(olho.sub(pj), primeira ? 1 : suave(5, dt));
  CAM.pos.copy(pj).add(CAM.off); CAM.pos.y = Math.max(CAM.pos.y, terreno(CAM.pos.x, CAM.pos.z) + 1.0);
  CAM.pos.copy(FOLGA(V3(pj.x, pj.y + 1.3, pj.z), CAM.pos, primeira ? 1 : dt));      // nada alto entre ele e a câmera (folga.js)
  CAM.olho.copy(pj).add(CAM.offO); FOLGA.mira(pj, CAM.olho);      // perto, mira o meio do corpo
  // dentro do sepulcro: a câmera na porta da câmara, olhando para dentro (o monte continua de pedra, nada fica transparente)
  CAM.dentro += ((TUM.dentro && TUM.dentro(pj.x, pj.z) ? 1 : 0) - CAM.dentro) * Math.min(1, primeira ? 1 : dt * 4);
  if (CAM.dentro > 0.001) {
    const porta = TUM.boca.clone().addScaledVector(TUM.frente, -0.7); porta.y = TUM.y + 1.45;      // logo dentro da porta, abaixo do lintel
    CAM.pos.lerp(porta, CAM.dentro); CAM.olho.lerp(V3(pj.x, pj.y + 0.8, pj.z), CAM.dentro);
  }
  camera.position.copy(CAM.pos); camera.lookAt(CAM.olho);
  abreVista(pj, primeira ? 1 : dt);
}

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX], toqueCurtoAciona: false });
const { tecla, JOY, toqueTela } = ctl;
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, dirEm, iInicio, livre };
