// Betânia: a base da fase. Tela e luz, posições que vêm do Blender, o estado do jogo e os obstáculos.
// Todos os outros módulos partem daqui.
import * as THREE from 'three';
import { criaAtores } from '../../limpo-motor/atores.js';
import { criaBase, sombra } from '../../limpo-motor/base.js';
import { criaColisao } from '../../limpo-motor/colisao.js';
import { criaUI } from '../../limpo-motor/ui.js';

const { renderer, scene, hemi, sun, rnd, tex, texChao } = criaBase({
  fundo: new THREE.Color(0xd9d2bf), neblina: [0xd9d2bf, 55, 95], ceu: [0xd6ebff, 0xc9a47a, 1.3], sol: [0xffe2b8, 3.1], alcanceSombra: 80, semente: 7,
});

// ---------- posições exportadas do Blender (betania.blend > texto EXPORTAR_PARA_O_JOGO) ----------
// sem o arquivo, cada objeto usa o valor escrito aqui como reserva
const POS = await fetch('../fase-betania/betania_posicoes.json', { cache: 'no-cache' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
const VER = POS.versao || 16;
const P = (id, x, z, r = 0, k = 1) => { const o = POS.pontos?.[id]; return { x: o?.x ?? x, z: o?.z ?? z, r: o?.r ?? r, k: o?.k ?? k, de: !!o }; };

// ---------- estado do jogo: o que muda enquanto se joga (vários módulos leem e escrevem aqui) ----------
const E = {
  fora: false,            // true = o jogador não comanda (diálogo, transição, entrando em casa)
  alvoToque: null,        // ponto do chão tocado: o jogador anda até lá
  jogVy: 0, jogNoChao: true,   // pulo e queda
  dist: 46, distAlvo: 46, // distância da câmera (zoom) e para onde ela vai
  distT: 16,              // distância da câmera dentro do túmulo e da casa
  CASA_ANIM: null,        // entrada ou saída de casa em andamento
  falaPerto: null, portaPerto: null, pedraPerto: false, tumbaPerto: false,   // o que está ao alcance do botão de ação
};

// ---------- obstáculos, personagens e interface (do motor comum) ----------
const { CAIXAS, CIRC, EXTRAS, bate, fundo } = criaColisao();
// obstáculos fixos: as formas da coleção "Colisao" do betania.blend (círculos e caixas presos a cada objeto).
// Pessoas, a pedra que rola e o muro do aprisco com porteira são criados no código, cada um no seu módulo.
if (POS.colisao) {
  for (const [x, z, r] of POS.colisao.circ) CIRC.push({ x, z, r });
  for (const [x0, x1, z0, z1] of POS.colisao.caixas) CAIXAS.push({ x0, x1, z0, z1 });
} else console.warn('betania_posicoes.json sem colisão: rode EXPORTAR_PARA_O_JOGO no Blender');
const { MIX, ator, corpo, posesBase, anda, passo } = criaAtores({ scene, rnd });
const { botao, fade, textoBotao, fala, DIAL, dialogo } = criaUI(E);

// põe um modelo na cena
function por(modelo, x, z, r = 0, k = 1, { y = 0 } = {}) {
  const n = modelo.clone(); n.position.set(x, y, z); n.rotation.y = r; n.scale.setScalar(k);
  sombra(n); scene.add(n);
  return n;
}

export { VER, texChao, scene, CIRC, P, por, EXTRAS, POS, tex, ator, corpo, anda, passo, rnd, E, renderer, botao, fade, hemi, sun, textoBotao, dialogo, fala, DIAL, MIX, bate, fundo, posesBase, CAIXAS };
