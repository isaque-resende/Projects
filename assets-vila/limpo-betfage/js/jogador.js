// Betfagé: o jogador, a câmera e os controles.
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { V3, AB, LAY, XZ, S, E, renderer } from './estado.js';
import { gJog } from './modelos.js';
import { AMOS, naEstrada } from './cenario.js';
import { noCampo } from './trigal.js';
import { ator } from './gente.js';
import { tMin } from './aldeia.js';

const INICIO = (() => { const i = Math.round(tMin * AMOS.length) + 2; const p = AMOS[Math.min(AMOS.length - 1, i)]; return V3(p.x, 0, p.z); })();
const jog = ator(gJog, 1.7, INICIO.x, INICIO.z, Math.PI + Math.PI / 4, 'Parado');
const naArea = (x, z) => { const [a, b] = AB(x, z); return (a > -0.06 && a < 1.06 && b > -0.06 && b < 1.06) || naEstrada(x, z, 0.4) || noCampo(x, z, 1.2) || Math.hypot(x - LAY.figseca[0], z - LAY.figseca[1]) < 3.2; };   // o trigal passa da borda do diorama: dá para andar por dentro dele

// ---------- câmera: o mesmo ângulo do diorama (30°, de quina); afastada mostra tudo, perto segue o jogador ----------
const camera = new THREE.PerspectiveCamera(22, innerWidth / innerHeight, 0.5, 400);
const DIR = V3(1, 0.8165, 1).normalize();
const CENTRO = (() => { const [x, z] = XZ(0.5, 0.5); return V3(x, 5.0, z); })();   // um pouco mais para a frente: os primeiros itens não ficam colados na borda
const distTudo = () => { const largura = S * 1.35, alt = S * 1.18; const f = Math.tan(THREE.MathUtils.degToRad(11)); return Math.max(alt / 2 / f, largura / 2 / f / camera.aspect); };
E.dist = distTudo(); E.distAlvo = E.dist;
const DMIN = 14;
const DMAX = () => distTudo() * 1.08;
const foco = CENTRO.clone();

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX()], toqueCurtoAciona: false });
const { tecla, JOY, toqueTela } = ctl;
// direções na tela (frente e direita da câmera) e o passo pedido
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { naArea, jog, camera, ctl, fw, DIR, rt, mv, tecla, JOY, toqueTela, DMAX, DMIN, CENTRO, foco };
