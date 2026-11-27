// Betfagé: o jogador, a câmera e os controles.
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { V3, AB, LAY, XZ, S, E, renderer } from './estado.js';
import { gJog } from './modelos.js';
import { AMOS, naEstrada } from './cenario.js';
import { noCampo } from './trigal.js';
import { ator } from './gente.js';
import { tMin, tMax } from './aldeia.js';

// começa no pé da estrada; voltando do Monte das Oliveiras (?de=oliveiras), no alto, virado para a aldeia
const DO_MONTE = new URLSearchParams(location.search).get('de') === 'oliveiras';
const INICIO = (() => { const i = DO_MONTE ? Math.round(tMax * AMOS.length) - 8 : Math.round(tMin * AMOS.length) + 2; const p = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))]; return V3(p.x, 0, p.z); })();
const jog = ator(gJog, 1.7, INICIO.x, INICIO.z, DO_MONTE ? Math.PI / 4 : Math.PI + Math.PI / 4, 'Parado');
globalThis.OLHO_NPC = jog.o;      // quem os NPCs acompanham com a cabeça (atores.js)
// caminho entre a carroça e o trigal (o campo fica fora do quadrado do diorama, ao pé do morro)
const passagemTrigal = (x, z) => { const c = LAY.campo, k = LAY.carro; return x > Math.min(k.x, c.x0) - 1.5 && x < c.x0 + 4 && z > c.z1 - 1 && z < k.z + 1.5; };
// caminhos de terra do Blender (até as casas, a escada, a rampa da carroça): andáveis mesmo fora do quadrado
const dSeg = (x, z, a, b) => { const dx = b[0] - a[0], dz = b[1] - a[1], L2 = dx * dx + dz * dz || 1e-9, u = Math.max(0, Math.min(1, ((x - a[0]) * dx + (z - a[1]) * dz) / L2)); return Math.hypot(x - a[0] - dx * u, z - a[1] - dz * u); };
const naCaminho = (x, z) => (LAY.caminhos || []).some(([m, pp]) => pp.some((p, i) => i > 0 && dSeg(x, z, pp[i - 1], p) < m + 0.6));
const naArea = (x, z) => { const [a, b] = AB(x, z); return (a > -0.06 && a < 1.06 && b > -0.06 && b < 1.06) || naEstrada(x, z, 0.4) || noCampo(x, z, 1.2) || passagemTrigal(x, z) || naCaminho(x, z) || Math.hypot(x - LAY.figseca[0], z - LAY.figseca[1]) < 3.2 || (x > -5.4 && x < 4.3 && z > -19 && z < -14); };   // o último: o patamar da casa de cima, onde chega a escada do trigal   // o trigal passa da borda do diorama: dá para andar por dentro dele

// ---------- câmera: o mesmo ângulo do diorama (30°, de quina); afastada mostra tudo, perto segue o jogador ----------
const camera = new THREE.PerspectiveCamera(22, innerWidth / innerHeight, 0.5, 400);
const DIR = V3(1, 0.8165, 1).normalize();
const CENTRO = (() => { const [x, z] = XZ(0.5, 0.5); return V3(x + 1.1, 5.0, z - 1.1); })();   // um pouco para a direita da tela: cabem o forno (esquerda) e o trigal do planalto (direita)
const distTudo = () => { const largura = S * 1.5, alt = S * 1.18; const f = Math.tan(THREE.MathUtils.degToRad(11)); return Math.max(alt / 2 / f, largura / 2 / f / camera.aspect); };
E.dist = distTudo(); E.distAlvo = E.dist;
const DMIN = 14;
const DMAX = () => distTudo() * 1.08;
const DJOGO = () => distTudo() * 0.75;     // depois da abertura, a câmera fecha 25% e o jogo segue assim (a pinça ainda abre e fecha)
const foco = CENTRO.clone();

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX()], toqueCurtoAciona: false });
const { tecla, JOY, toqueTela } = ctl;
// direções na tela (frente e direita da câmera) e o passo pedido
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { naArea, jog, camera, ctl, fw, DIR, rt, mv, tecla, JOY, toqueTela, DMAX, DMIN, DJOGO, CENTRO, foco };
