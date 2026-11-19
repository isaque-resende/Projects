// Monte das Oliveiras: o jogador, a câmera e os controles.
// A câmera tem três jeitos:
//   subida  — começa alta e longe e, conforme o jogador sobe, desce para perto da nuca, olhando a estrada à frente;
//   revela  — no cume o jogador para, a câmera olha o horizonte e Jerusalém aparece (main.js conduz);
//   descida — por trás e um pouco acima, sempre olhando para o oeste: a cidade fica no horizonte enquanto se desce.
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { V3, LAY, E, DE, renderer, sm } from './estado.js';
import { gJog } from './modelos.js';
import { AMOS, iCume, terreno } from './cenario.js';
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
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.3, 420);
const DMIN = 5, DMAX = 16;
const DESCE = V3(1, 0.52, 0.16).normalize();          // da descida: atrás (leste), acima e um pouco de lado
const CAM = { pos: V3(), olho: V3(), T: d0.clone() };
// subida: quanto da aproximação já foi feito (0 no pé, 1 a três quartos do caminho até o cume)
const iPerto = iInicio + (iCume - iInicio) * 0.72;
function camSubida(i, dt, pj) {
  const k = sm(iInicio, iPerto, i);
  CAM.T.lerp(dirEm(Math.min(i, iCume - 2), 10), Math.min(1, dt * 1.5)).normalize();
  const dist = 15 + (4.4 - 15) * k, alt = 8.5 + (2.15 - 8.5) * k, frente = 1 + 5 * k, olhoY = 1.0 + 0.55 * k;
  const alvo = pj.clone().addScaledVector(CAM.T, -dist); alvo.y = pj.y + alt;
  alvo.y = Math.max(alvo.y, terreno(alvo.x, alvo.z) + 0.8);                      // nunca entra no morro
  return [alvo, pj.clone().addScaledVector(CAM.T, frente).add(V3(0, olhoY, 0))];
}
function camDescida(pj) {
  const alvo = pj.clone().addScaledVector(DESCE, E.dist); alvo.y = Math.max(alvo.y, terreno(alvo.x, alvo.z) + 1.0);
  // quanto mais baixo na descida, mais a câmera levanta o olhar: a cidade, do outro lado do vale, fica mais alta
  return [alvo, pj.clone().add(V3(-3.5, 1.3 + Math.min(2.4, Math.max(0, LAY.cume[1] - pj.y) * 0.14), 0))];
}
// revelação: logo atrás da cabeça, olhando o templo no horizonte
function camRevela(pj) {
  const atras = CAM.T.clone().negate();
  return [pj.clone().addScaledVector(atras, 2.4).add(V3(0, 2.3, 0)), V3(LAY.vista[0], LAY.vista[1] - 7, LAY.vista[2])];
}
function camPasso(i, dt, pj, primeira = false) {
  const [alvo, olho] = E.modo === 'subida' ? camSubida(i, dt, pj) : E.modo === 'revela' ? camRevela(pj) : camDescida(pj);
  const r = primeira ? 1 : Math.min(1, dt * (E.modo === 'revela' ? 0.9 : 3));
  CAM.pos.lerp(alvo, r); CAM.olho.lerp(olho, primeira ? 1 : Math.min(1, dt * (E.modo === 'revela' ? 0.9 : 4)));
  camera.position.copy(CAM.pos); camera.lookAt(CAM.olho);
}

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX], toqueCurtoAciona: false });
const { tecla, JOY, toqueTela } = ctl;
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, dirEm, iInicio };
