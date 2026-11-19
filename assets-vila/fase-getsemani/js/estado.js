// Getsêmani: a base da fase. Tela e luz (noite de lua cheia: era a Páscoa), o layout que vem do Blender,
// o estado do jogo e os obstáculos. Todos os outros módulos partem daqui.
import * as THREE from 'three';
import { criaBase } from '../../limpo-motor/base.js';
import { criaColisao } from '../../limpo-motor/colisao.js';
import { criaUI } from '../../limpo-motor/ui.js';

// céu da noite: azul fundo em cima, mais claro perto do horizonte (a lua cheia clareia o céu)
const CEU = (() => { const c = document.createElement('canvas'); c.width = 4; c.height = 256; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, '#0f1830'); gr.addColorStop(0.6, '#24304f'); gr.addColorStop(1, '#3d4866'); g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
const { renderer, scene, sun, hemi, rnd, texChao } = criaBase({
  fundo: CEU, neblina: [0x222b45, 26, 140], ceu: [0x7f93cc, 0x2a2620, 0.9], sol: [0xc8d6ff, 1.25], alcanceSombra: 100, semente: 41,
});
renderer.toneMappingExposure = 0.62;      // noite: tudo mais escuro, sem mexer nas cores pintadas

const sm = (a, b, x) => { let k = (x - a) / (b - a); k = k < 0 ? 0 : k > 1 ? 1 : k; return k * k * (3 - 2 * k); };
const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

// ---------- layout exportado do Blender (getsemani_layout.json) ----------
const LAY = await (await fetch('../fase-getsemani/getsemani_layout.json?v=1')).json();
const DE = new URLSearchParams(location.search).get('de');      // ?de=agonia começa perto da rocha (testes)

// ---------- estado do jogo ----------
const E = {
  fora: false,            // true = o jogador não comanda (pergunta, oração, transição)
  alvoToque: null,
  jogVy: 0, jogNoChao: true,
  dist: 12, distAlvo: 12,   // distância da câmera (pinça e roda)
  saida: false,           // na ponta leste da trilha: voltar ao Monte das Oliveiras
  orou: false,            // já se ajoelhou junto à rocha
};

// ---------- obstáculos e interface (do motor comum) ----------
const { CAIXAS, CIRC, bate, fundo } = criaColisao(0.25);
CIRC.push(...LAY.obst.map(([x, z, r]) => ({ x, z, r })));
// mureta: uma fileira de círculos ao longo de cada módulo
for (const [x0, z0, x1, z1] of LAY.muros) { const L = Math.hypot(x1 - x0, z1 - z0); for (let s = 0; s <= L + 0.01; s += 0.6) CIRC.push({ x: x0 + (x1 - x0) * s / L, z: z0 + (z1 - z0) * s / L, r: 0.38 }); }
const { botao, fade, fala, dialogo, textoBotao } = criaUI(E);

export { LAY, DE, scene, texChao, rnd, V3, sm, CIRC, CAIXAS, E, renderer, bate, fundo, fala, botao, fade, sun, hemi, dialogo, textoBotao };
