// Betânia: o jogador, a câmera e os controles.
import * as THREE from 'three';
import { criaControles } from '../../limpo-motor/controles.js';
import { ator, E, renderer } from './estado.js';
import { gJog } from './modelos.js';
import './rebanho.js';     // só para manter a ordem de montagem

const jog = ator(gJog, 1.7, 4, 3, Math.PI, 'Parado');
const naArea = (x, z) => (x > -30 && x < 30 && z > -21 && z < 23) || (x < -29 && x > -38 && Math.abs(z - 3.1) < 2.6);

// ---------- câmera isométrica: só segue (com limite) e faz zoom ----------
const camera = new THREE.PerspectiveCamera(24, innerWidth / innerHeight, 0.5, 300);
const DIR = new THREE.Vector3(1, 1.15, 1).normalize();
E.dist = innerHeight > innerWidth ? 62 : 46; E.distAlvo = E.dist;
const DMIN = 24, DMAX = 72;
const foco = new THREE.Vector3(0, 0, 2);

// ---------- controles (do motor comum); as ações são ligadas em main.js ----------
const ctl = criaControles({ dom: renderer.domElement, E, zoom: () => [DMIN, DMAX] });
const { tecla, JOY, toqueTela, marcaPino } = ctl;
// direções na tela (frente e direita da câmera) e o passo pedido
const fw = new THREE.Vector3(), rt = new THREE.Vector3(), mv = new THREE.Vector3();

export { jog, foco, camera, fw, DIR, rt, mv, tecla, JOY, toqueTela, marcaPino, ctl, naArea, DMIN, DMAX };
