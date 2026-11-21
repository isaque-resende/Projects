// Templo: a base da fase. Tela e luz (a manhã do domingo), o layout que vem do Blender, o estado do jogo e os
// obstáculos. Todos os outros módulos partem daqui.
import * as THREE from 'three';
import { criaBase } from '../../limpo-motor/base.js';
import { criaColisao } from '../../limpo-motor/colisao.js';
import { criaUI } from '../../limpo-motor/ui.js';
import { criaConversa } from '../../limpo-motor/conversa.js';

const CEU = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#a9c9e4'); gr.addColorStop(0.55, '#dfe4dc'); gr.addColorStop(1, '#ecdcc2'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
const { renderer, scene, sun, hemi, rnd, texChao } = criaBase({
  fundo: CEU, neblina: [0xecdcc2, 90, 520], ceu: [0xe4eeff, 0xc2a47e, 1.35], sol: [0xffe4bd, 2.8], alcanceSombra: 70, semente: 67,
});

const sm = (a, b, x) => { let k = (x - a) / (b - a); k = k < 0 ? 0 : k > 1 ? 1 : k; return k * k * (3 - 2 * k); };
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- layout exportado do Blender (betesda_layout.json) ----------
const LAY = await (await fetch('../fase-templo/templo_layout.json?v=6')).json();
const DE = new URLSearchParams(location.search).get('de');      // ?de=cidade começa na porta do oeste; ?de=israel, no Pátio de Israel (testes)

// ---------- estado do jogo ----------
const E = {
  fora: false,            // true = o jogador não comanda (pergunta, conversa, transição)
  alvoToque: null,
  jogVy: 0, jogNoChao: true,
  dist: 30, distAlvo: 30,
  norte: false, oeste: false,     // nas saídas: a porta do norte (Betesda) e a do oeste (a cidade alta)
};

// ---------- obstáculos e interface (do motor comum) ----------
const { CAIXAS, CIRC, bate, fundo } = criaColisao(0.25);
CIRC.push(...LAY.obst.map(([x, z, r]) => ({ x, z, r })));
for (const [x0, x1, z0, z1] of LAY.caixas) CAIXAS.push({ x0, x1, z0, z1 });           // os muros, a balaustrada e o Pátio dos Sacerdotes
for (const [x0, z0, x1, z1] of LAY.muros) { const L = Math.hypot(x1 - x0, z1 - z0); for (let s = 0; s <= L + 0.01; s += 0.5) CIRC.push({ x: x0 + (x1 - x0) * s / L, z: z0 + (z1 - z0) * s / L, r: 0.3 }); }
const { botao, fade, fala, dialogo, textoBotao } = criaUI(E);
const conversa = criaConversa(dialogo);

export { LAY, DE, scene, texChao, rnd, V3, sm, CIRC, CAIXAS, E, renderer, bate, fundo, fala, botao, fade, sun, hemi, dialogo, textoBotao, conversa };
