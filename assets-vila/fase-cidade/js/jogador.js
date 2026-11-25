// Cidade alta: o jogador, a câmera e os controles.
// A câmera é a mesma das outras fases: de quina, de cima (~30°), lente fechada, seguindo o jogador; daqui ela fica a
// leste-sudeste dele e olha para oeste-noroeste: o palácio, as torres e a Porta de Genat.
// Muros e tetos que tapam a vista ficam transparentes (cenario.js). Por enquanto há a câmera livre (camlivre.js).
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { criaCamLivre } from '../../limpo-motor/camlivre.js';
import { V3, LAY, E, DE, renderer, sm, scene } from './estado.js';
import { gJog } from './modelos.js';
import { terreno } from './cenario.js';
import { ator } from './gente.js';

// de onde começa: na rua do viaduto, entrando na praça (vindo do templo); ?de=genat, na Porta de Genat; ?de=cenaculo,
// junto à casa do cenáculo
const ARVS = [];
const ini = DE === 'genat' ? [LAY.genat[0], 0, LAY.genat[2] + 2.5] : DE === 'cenaculo' ? [LAY.cenaculo[0] + 2.5, 0, LAY.cenaculo[2] - 1.0] : [LAY.ponte[0] - 9.5, 0, LAY.ponte[2]];
const d0 = DE === 'genat' ? V3(0, 0, 1) : DE === 'cenaculo' ? V3(0, 0, -1) : V3(-1, 0, 0.35).normalize();
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
const QUINA = V3(1, 0.8165, 0.45).normalize();        // a leste-sudeste e acima (30°): olha o palácio e a Porta de Genat
const PERTO = V3(1, 0.45, 0.45).normalize();           // conversando: mais baixa e mais perto
const CAM = { pos: V3(), olho: V3(), braco: 1, off: V3(), offO: V3(), perto: 0, giro: 0 };
// A câmera gira aos poucos perto das fachadas que olham para o outro lado: a frente do cenáculo (a escada, as portas e
// a mulher) olha para o norte; o portão e o pátio do sumo sacerdote, para o oeste. Longe delas, volta à quina de sempre.
const cfr = LAY.caifas_r;
const FOCOS = [
  { x: LAY.cenaculo[0] - 5, z: LAY.cenaculo[2] - 4, r: 12, dir: [0.55, -0.83] },
  { x: (cfr[0] + cfr[1]) / 2 - 3, z: (cfr[2] + cfr[3]) / 2, r: 11, dir: [-0.6, 0.8] },
];
const YAW0 = Math.atan2(QUINA.x, QUINA.z), EIXO_Y = V3(0, 1, 0);
// a câmera desvia das paredes: se uma casa ou muro fica entre ela e o jogador, procura (aos poucos) outro ângulo, mais
// alto ou um pouco girado, de onde ele apareça; se nenhum servir, fica o triângulo amarelo
const RC = new THREE.Raycaster(); let OBST = null; const DESVIO = { yaw: 0, el: 0, ay: 0, ae: 0, t: 0 };
const CANDS = [[0, 0], [0, 14], [22, 10], [-22, 10], [0, 28], [40, 18], [-40, 18], [0, 42], [70, 25], [-70, 25]].map(([a, b]) => [a * Math.PI / 180, b * Math.PI / 180]);
function obstaculos() {
  if (OBST) return OBST; OBST = [];
  scene.traverse((o) => {
    if (!o.isMesh || o.isSkinnedMesh || /Chao|Ruas|Patio_|Escada_|Gabata/.test(o.name)) return;
    for (let p = o; p; p = p.parent) if (p.name === 'Jerusalem') return;
    const m = Array.isArray(o.material) ? o.material[0] : o.material; if (!m || m.transparent || m.depthWrite === false) return;
    OBST.push(o);
  });
  return OBST;
}
function vira(dir, yaw, el) {
  const h = Math.hypot(dir.x, dir.z), e = Math.min(1.35, Math.atan2(dir.y, h) + el), a = Math.atan2(dir.x, dir.z) + yaw;
  return dir.set(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
}
function desvio(pj, dir, d, dt) {
  DESVIO.t -= dt;
  if (DESVIO.t <= 0) {
    DESVIO.t = 0.15;
    const h = V3(pj.x, pj.y + 1.3, pj.z), L = Math.min(d, 22), ob = obstaculos();
    for (const [a, b] of CANDS) {
      const q = vira(dir.clone(), a, b); RC.set(h, q); RC.far = L;
      if (!RC.intersectObjects(ob, false).length) { DESVIO.ay = a; DESVIO.ae = b; break; }
    }
  }
  DESVIO.yaw += (DESVIO.ay - DESVIO.yaw) * Math.min(1, dt * 1.8); DESVIO.el += (DESVIO.ae - DESVIO.el) * Math.min(1, dt * 1.8);
  return vira(dir, DESVIO.yaw, DESVIO.el);
}
function giroAlvo(pj) {
  let g = 0, wm = 0;
  for (const f of FOCOS) {
    const w = 1 - sm(f.r * 0.45, f.r, Math.hypot(pj.x - f.x, pj.z - f.z)); if (w <= wm) continue;
    let d = Math.atan2(f.dir[0], f.dir[1]) - YAW0; d = Math.atan2(Math.sin(d), Math.cos(d)); wm = w; g = d * w;
  }
  return g;
}
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
  CAM.giro += (giroAlvo(pj) - CAM.giro) * Math.min(1, dt * 1.2);
  const k = CAM.perto, dir = livre.aplica(QUINA.clone().lerp(PERTO, k).normalize().applyAxisAngle(EIXO_Y, CAM.giro));
  const d = E.dist * (1 - k) + 9 * k;
  desvio(pj, dir, d, dt);
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
    const alvo = 1;      // nada fica transparente: o que tapa o jogador fica como está, e o triângulo amarelo o mostra
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

export { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, livre, obstaculos };
