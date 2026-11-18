// Betfagé: a base da fase. Tela e luz, o layout que vem do Blender, o estado do jogo e os obstáculos.
// Todos os outros módulos partem daqui.
// céu do diorama: verde-água claro em cima, creme embaixo
import * as THREE from 'three';
import { criaBase } from '../../limpo-motor/base.js';
import { criaColisao } from '../../limpo-motor/colisao.js';
import { criaUI } from '../../limpo-motor/ui.js';

const CEU = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#cfe6e0'); gr.addColorStop(0.55, '#e9ead6'); gr.addColorStop(1, '#f6dcc0'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
const { renderer, scene, hemi, sun, rnd, texChao } = criaBase({
  fundo: CEU, neblina: [0xe4e6d4, 60, 110], ceu: [0xe2f0ff, 0xc9b088, 1.45], sol: [0xfff0d6, 2.9], alcanceSombra: 100, semente: 23,
});

// curva suave de 0 a 1, e um atalho para criar pontos
const sm = (a, b, x) => { let k = (x - a) / (b - a); k = k < 0 ? 0 : k > 1 ? 1 : k; return k * k * (3 - 2 * k); };
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- layout exportado do Blender (betfage_layout.json) ----------
const LAY = await (await fetch('../fase-betfage/betfage_layout.json?v=25')).json();
const S = LAY.S;
// coordenadas do diorama: a = rumo ao canto direito, b = rumo ao canto esquerdo (0,0 = canto da frente)
const AB = (x, z) => [(S / 2 - z) / S, (S / 2 - x) / S];
const XZ = (a, b) => [S / 2 - b * S, S / 2 - a * S];

// ---------- estado do jogo: o que muda enquanto se joga (vários módulos leem e escrevem aqui) ----------
const E = {
  fora: false,            // true = o jogador não comanda (pergunta na tela, transição)
  alvoToque: null,        // ponto do chão tocado: o jogador anda até lá
  TRILHA: [],             // o caminho até o ponto tocado, desviando dos obstáculos
  jogVy: 0, jogNoChao: true,   // pulo e queda
  dist: 0, distAlvo: 0,   // distância da câmera (zoom) e para onde ela vai
  saida: null,            // 'alto' ou 'baixo' quando o jogador chega a uma ponta da estrada
};

// ---------- obstáculos e interface (do motor comum) ----------
const { CAIXAS, CIRC, bate, caixaDe } = criaColisao();
CIRC.push(...LAY.obst.map(([x, z, r]) => ({ x, z, r })));
const { botao, fade, fala } = criaUI(E);

export { LAY, scene, texChao, rnd, V3, sm, caixaDe, CIRC, AB, XZ, S, E, renderer, bate, fala, botao, fade, sun, CAIXAS };
