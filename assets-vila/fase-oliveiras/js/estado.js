// Monte das Oliveiras: a base da fase. Tela e luz, o layout que vem do Blender, o estado do jogo e os obstáculos.
// Todos os outros módulos partem daqui.
import * as THREE from 'three';
import { criaBase } from '../../limpo-motor/base.js';
import { criaColisao } from '../../limpo-motor/colisao.js';
import { criaUI } from '../../limpo-motor/ui.js';

// céu: verde-água claro em cima, creme perto do horizonte (o mesmo de Betfagé)
const CEU = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#cfe6e0'); gr.addColorStop(0.55, '#e9ead6'); gr.addColorStop(1, '#f6dcc0'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
const { renderer, scene, sun, rnd, texChao } = criaBase({
  fundo: CEU, neblina: [0xe6e6d6, 70, 175], ceu: [0xe2f0ff, 0xc9b088, 1.45], sol: [0xfff0d6, 2.9], alcanceSombra: 100, semente: 31,
});

const sm = (a, b, x) => { let k = (x - a) / (b - a); k = k < 0 ? 0 : k > 1 ? 1 : k; return k * k * (3 - 2 * k); };
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- layout exportado do Blender (oliveiras_layout.json) ----------
const LAY = await (await fetch('../fase-oliveiras/oliveiras_layout.json?v=2')).json();
const DE = new URLSearchParams(location.search).get('de');      // de onde o jogador veio

// ---------- estado do jogo ----------
const E = {
  fora: false,            // true = o jogador não comanda (pergunta na tela, revelação, transição)
  alvoToque: null, TRILHA: [],
  jogVy: 0, jogNoChao: true,
  dist: 9, distAlvo: 9,   // distância da câmera na descida (a pinça muda)
  modo: 'subida',         // 'subida' (a câmera chega perto da nuca), 'revela' (Jerusalém aparece), 'descida'
  saida: null,            // 'betfage' ou 'getsemani' nas pontas da estrada
  pregacao: false,        // o jogador já passou pelo mirante (o flashback vem depois)
};

// ---------- obstáculos e interface (do motor comum) ----------
const { CAIXAS, CIRC, bate } = criaColisao();
CIRC.push(...LAY.obst.map(([x, z, r]) => ({ x, z, r })));
// muretas: uma fileira de círculos ao longo de cada módulo
for (const [x0, z0, x1, z1] of LAY.muros) { const L = Math.hypot(x1 - x0, z1 - z0); for (let s = 0; s <= L + 0.01; s += 0.6) CIRC.push({ x: x0 + (x1 - x0) * s / L, z: z0 + (z1 - z0) * s / L, r: 0.38 }); }
const { botao, fade, fala, dialogo, textoBotao } = criaUI(E);

export { LAY, DE, scene, texChao, rnd, V3, sm, CIRC, CAIXAS, E, renderer, bate, fala, botao, fade, sun, dialogo, textoBotao };
