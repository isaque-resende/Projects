// Templo: liga os controles às ações e roda o laço do jogo. Aqui ficam os lugares (as legendas, com o texto bíblico e
// as notícias da época), as conversas (npcs.js), a fumaça do altar, os muros que somem quando tapam a vista e as duas
// saídas: a porta do norte (de volta a Betesda) e a do oeste (para a cidade alta, a próxima parte).
import * as THREE from 'three';
import { E, LAY, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao, conversa } from './estado.js';
import { terreno, SOL_DIR, FUMACA, oclusoresPasso } from './cenario.js';
import { MIX } from './gente.js';
import { CONVERSAS, npcsPasso } from './npcs.js';
import { pertoDe } from '../../limpo-motor/conversa.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM } from './jogador.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';
import { criaCaminho } from '../../limpo-motor/caminho.js';
import { cenasPasso, tremor, CINE } from './cenas.js';

// ---------- os lugares: ao chegar perto de cada um, uma legenda (uma vez) ----------
const P = (k) => [LAY[k][0], LAY[k][2]];
const [mx, mz] = P('mercado'), [px, pz] = P('soreg'), [sx, sz] = P('salomao'), [fx, fz] = P('formosa'), [nx, nz] = P('nicanor'), [ix, iz] = P('israel'), [ox, oz] = P('oeste'), [qx, qz] = P('norte');
const LUG = [
  { x: mx, z: mz, r: 12, txt: 'E, entrando Jesus no templo, começou a expulsar os que vendiam e compravam, e derrubou as mesas dos cambistas (Mc 11.15). Isso foi na segunda-feira. Hoje é domingo, e as mesas estão de volta.' },
  { x: px, z: pz, r: 4.5, txt: 'Na placa da balaustrada, em grego: “Nenhum estrangeiro entre além da balaustrada e do muro em volta do santuário. Quem for apanhado será culpado da própria morte.”' },
  { x: sx, z: sz, r: 9, txt: 'E Jesus andava no templo, no alpendre de Salomão. (Jo 10.23)' },
  { x: fx, z: fz, r: 5, txt: 'A Porta Formosa (At 3.2), de bronze de Corinto, abre para o Pátio das Mulheres.' },
  { x: nx + 4, z: nz, r: 4.5, txt: 'Os quinze degraus da Porta de Nicanor. Aqui os levitas cantavam os cânticos dos degraus (Sl 120-134).' },
  { x: ix, z: iz, r: 3.2, txt: 'O Pátio de Israel: até aqui vai um israelita. Além da mureta, o altar dos holocaustos, o sacrifício contínuo da manhã (Êx 29.38-39), e, no alto dos doze degraus, o santuário.' },
  { x: ix - 1.5, z: iz, r: 1.6, txt: 'Na sexta, à hora nona, quando Jesus entregou o espírito, o véu do santuário se rasgou em dois, de alto a baixo. (Mt 27.50-51)' },
];
let falando = 0;
function legenda(txt, seg = 9) { fala(txt); const n = ++falando; setTimeout(() => { if (n === falando) fala(''); }, seg * 1000); }
function lugares(pj) {
  if (E.fora || E.cine) return;
  for (const L of LUG) {
    if (L.visto) continue;
    if (Math.hypot(pj.x - L.x, pj.z - L.z) < L.r) { L.visto = true; legenda(L.txt); break; }
  }
}

// ---------- conversas ----------
let quem = null;
function conversar() {
  if (!quem) return;
  const n = quem; E.alvoToque = null; CAM.conversa = true;
  jog.o.rotation.y = Math.atan2(n.o.position.x - jog.o.position.x, n.o.position.z - jog.o.position.z);
  conversa(n.titulo ?? n.nome, n.falas, () => { CAM.conversa = false; n.ouviu = true; });
}

// ---------- o botão de ação e as saídas ----------
function acionar() {
  if (E.fora || E.cine) return;
  if (quem) { if (quem.cena && !quem.cenaFeita) { quem.cenaFeita = true; quem.cena(); return; } conversar(); return; }      // a primeira vez, a lembrança (cenas.js)
  if (E.norte) { perguntaBetesda(); return; }
  if (E.oeste) perguntaCidade();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
// tocar no chão: anda até lá, desviando de muros, colunas, árvores e da água (caminho.js)
const caminho = criaCaminho({ terreno: (x, z) => terreno(x, z), livreC: (x, z) => naArea(x, z) && fundo(x, z) <= 0 });
const rayT = new THREE.Raycaster(), ndcT = new THREE.Vector2();
ctl.aoToque = (e) => {
  if (E.fora || E.cine) return;
  ndcT.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); rayT.setFromCamera(ndcT, camera); rayT.camera = camera;
  const h = rayT.intersectObjects(scene.children, true).find((x) => x.object.visible && !x.object.isSkinnedMesh && !x.object.isSprite && x.face && x.face.normal.y > -0.2);
  if (h) { E.alvoToque = h.point.clone(); E.TRILHA = caminho(jog.o.position, E.alvoToque); }
};
function volta(x, z) { jog.o.position.set(x, terreno(x, z), z); E.alvoToque = null; }
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }
function emConstrucao(texto, depois) {
  E.fora = true; fade.textContent = texto; fade.style.opacity = 1;
  setTimeout(() => { depois(); fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; E.fora = false; }, 900); }, 2600);
}
function perguntaBetesda() { dialogo('', 'Deseja voltar a Betesda, pela porta do norte?', [['Ainda não', () => volta(qx, qz + 3), '#a8957a'], ['Sim', () => sair('De volta a Betesda…', '../fase-betesda/?de=templo')]]); }
function perguntaCidade() { dialogo('', 'Deseja sair pela porta do oeste, para a cidade alta?', [['Ainda não', () => volta(ox + 3, oz), '#a8957a'], ['Sim', () => sair('Pelo viaduto, para a cidade alta…', '../fase-cidade/')]]); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; }, 900);      // (a chegada, com a câmera mostrando o pátio: cenas.js)
}, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  npcsPasso(dt); FUMACA(dt);
  camera.getWorldDirection(fw); fw.setY(0).normalize(); rt.set(-fw.z, 0, fw.x);
  mv.set(0, 0, 0);
  if (!E.fora && !E.cine) {
    if (tecla.KeyW || tecla.ArrowUp) mv.add(fw); if (tecla.KeyS || tecla.ArrowDown) mv.sub(fw);
    if (tecla.KeyD || tecla.ArrowRight) mv.add(rt); if (tecla.KeyA || tecla.ArrowLeft) mv.sub(rt);
    if (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.15) mv.addScaledVector(fw, -JOY.y).addScaledVector(rt, JOY.x);
    if (mv.lengthSq() > 0) E.alvoToque = null;
    else if (E.alvoToque) {
      const T_ = E.TRILHA || []; while (T_.length > 1 && Math.hypot(T_[0].x - jog.o.position.x, T_[0].z - jog.o.position.z) < 0.3) T_.shift();
      mv.subVectors(T_.length ? T_[0] : E.alvoToque, jog.o.position).setY(0); if (mv.length() < 0.15 && T_.length <= 1) { E.alvoToque = null; E.TRILHA = []; mv.set(0, 0, 0); } else if (mv.length() < 0.15) T_.shift();
    }
  }
  const pj = jog.o.position;
  let andou = false;
  if (mv.lengthSq() > 0) {
    mv.normalize(); const corre = tecla.ShiftLeft || tecla.ShiftRight || (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.9) || (E.alvoToque && E.alvoToque.distanceTo(pj) > 6);
    const v = (corre ? 4.6 : 2.2) * dt, nx_ = pj.x + mv.x * v, nz_ = pj.z + mv.z * v;
    const f0 = fundo(pj.x, pj.z);
    const livre = (x, z) => { if (!naArea(x, z) || terreno(x, z) > pj.y + 0.55) return false; const f = fundo(x, z); return f <= 0 || f < f0 - 1e-4; };
    const x0 = pj.x, z0 = pj.z;
    if (livre(nx_, nz_)) { pj.x = nx_; pj.z = nz_; } else if (livre(nx_, pj.z)) pj.x = nx_; else if (livre(pj.x, nz_)) pj.z = nz_; else E.alvoToque = null;
    andou = Math.hypot(pj.x - x0, pj.z - z0) > v * 0.3;
    let d = Math.atan2(mv.x, mv.z) - jog.o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); jog.o.rotation.y += d * Math.min(1, dt * 12);
    if (andou) jog.toca(corre ? 'Correr' : 'Andar');
  }
  const chao = alturaEm(pj.x, pj.z);
  if (E.jogNoChao && pj.y - chao > 0.55) E.jogNoChao = false;
  if (E.jogNoChao) pj.y += (chao - pj.y) * Math.min(1, dt * 18);
  else { E.jogVy -= 14 * dt; pj.y += E.jogVy * dt; if (pj.y <= chao) { pj.y = chao; E.jogVy = 0; E.jogNoChao = true; } }
  if (!E.jogNoChao) jog.toca(E.jogVy > 0 ? 'Pulo_Ar' : 'Pulo_Queda');
  else if (!andou) jog.toca('Parado');
  CAM.perto += ((CAM.conversa ? 1 : 0) - CAM.perto) * Math.min(1, dt * 1.5);

  // lugares, conversas e saídas
  lugares(pj);
  quem = E.fora || E.cine ? null : pertoDe(CONVERSAS, pj); cenasPasso(dt);
  E.norte = pj.z < qz - 1.0 && Math.abs(pj.x - qx) < 2.6;
  E.oeste = pj.x < ox - 1.0 && Math.abs(pj.z - oz) < 2.6;
  const saida = E.norte || E.oeste;
  if (saida && !E.fora && !E.cine && !E.perguntou) { E.perguntou = true; (E.norte ? perguntaBetesda : perguntaCidade)(); }
  if (!saida) E.perguntou = false;
  const txt = quem && !E.fora ? (quem.verbo || 'conversar com ' + quem.nome.toLowerCase()) : E.norte ? 'voltar a Betesda' : E.oeste ? 'ir para a cidade alta' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora && !E.cine ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (quem ? 'olhar' : 'ir') : '');

  // muros e tetos, câmera e sol
  oclusoresPasso(E.cine ? CINE.C.alvo : pj, dt, camera.position);      // (numa cena, os muros que tapam quem está em cena)
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(dt, pj, primeira || CINE.C.corteVolta); primeira = false; CINE.C.corteVolta = false;
  sun.position.copy(pj).addScaledVector(SOL_DIR, 40); sun.target.position.copy(pj);
  if (CINE.passo(dt)) { const a = CINE.C.alvo; sun.position.copy(a).addScaledVector(SOL_DIR, 40); sun.target.position.copy(a); tremor(); }
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora && !E.cine);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { caminho, MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, LAY, CONVERSAS, acionar, conversar, INT: { L: CONVERSAS }, CINE };
