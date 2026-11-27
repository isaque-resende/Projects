// Monte das Oliveiras: liga os controles às ações e roda o laço do jogo. Aqui também ficam as legendas do cume
// no cume e as duas saídas (de volta a Betfagé, no pé da subida; para o Getsêmani, no fim da descida).
import * as THREE from 'three';
import { E, LAY, DE, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao } from './estado.js';
import { terreno, AMOS, naRota, iCume, PAN } from './cenario.js';
import { MIX } from './gente.js';
import { prensaPasso, PRENSA } from './prensa.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM, dirEm } from './jogador.js';
import { PREG, pregacaoPasso, lembrar } from './pregacao.js';
import { INT } from './interacoes.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';
import { criaCaminho } from '../../limpo-motor/caminho.js';
import { cenasPasso, cenaMirante, cenaSermao, CINE } from './cenas.js';

// ---------- o botão de ação ----------
function acionar() {
  if (E.fora || E.cine) return;
  if (PREG.perto) { if (!E.pregacao) cenaSermao(); else lembrar(); return; }      // a primeira vez, a lembrança do sermão (cenas.js)
  if (E.int) { INT.usa(E.int, null, jog.o.position); return; }      // conversar / olhar (interacoes.js)
  if (E.saida === 'betfage') perguntaBetfage();
  else if (E.saida === 'getsemani') perguntaGetsemani();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
// tocar no chão: anda até lá, desviando de muros, colunas, árvores e da água (caminho.js)
const caminho = criaCaminho({ terreno: (x, z) => terreno(x, z), livreC: (x, z) => naArea(x, z) && fundo(x, z) <= 0, profundidade: fundo });
const rayT = new THREE.Raycaster(), ndcT = new THREE.Vector2();
ctl.aoToque = (e) => {
  if (E.fora || E.cine) return;
  ndcT.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); rayT.setFromCamera(ndcT, camera); rayT.camera = camera;
  const h = rayT.intersectObjects(scene.children, true).find((x) => x.object.visible && !x.object.isSkinnedMesh && !x.object.isSprite && x.face && x.face.normal.y > -0.2);
  if (h) { E.alvoToque = h.point.clone(); E.TRILHA = caminho(jog.o.position, E.alvoToque); }
};

// ---------- saídas ----------
function recua(n) { const [i] = naRota(jog.o.position.x, jog.o.position.z); const p = AMOS[Math.max(4, Math.min(AMOS.length - 5, i + n))]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); }
function perguntaBetfage() { dialogo('', 'Deseja voltar para Betfagé?', [['Ainda não', () => recua(6), '#a8957a'], ['Sim', () => sair('De volta a Betfagé…', '../fase-betfage/?de=oliveiras')]]); }
function perguntaGetsemani() {
  dialogo('', 'Deseja seguir para o Getsêmani?', [['Ainda não', () => recua(-6), '#a8957a'], ['Sim', () => sair('Descendo para o Getsêmani…', '../fase-getsemani/')]]);
}
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }

// ---------- chegada ----------
// (a câmera mostra os olivais e o alto do monte: cenas.js)
setTimeout(() => { fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; }, 900); }, 1200);

// ---------- no cume: o mirante (a cena está em cenas.js) ----------
// A cidade está sempre no lugar (cenario.js); quem a esconde é o próprio monte. Subindo, ela vai aparecendo por trás
// do cume; ao passar pelo alto, a câmera mostra Jerusalém e, depois, a laje do sermão.

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true, prensaVista = false;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
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
    mv.normalize(); const dispara = E.correndo || tecla.ShiftLeft || tecla.ShiftRight, corre = dispara || (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.9) || (E.alvoToque && E.alvoToque.distanceTo(pj) > 6);
    const v = (dispara ? 6.2 : corre ? 4.6 : 2.2) * dt, nx = pj.x + mv.x * v, nz = pj.z + mv.z * v;
    // obstáculos valem também no pulo (antes, pulando, dava para cair dentro da mureta ou da pedra); quem já está
    // encostado só dá passos que não entram mais (fundo diminui): assim nunca fica preso nem atravessa
    const f0 = fundo(pj.x, pj.z);
    const livre = (x, z) => { if (!naArea(x, z) || terreno(x, z) > pj.y + 0.55) return false; const f = fundo(x, z); return f <= 0 || f < f0 - 1e-4; };
    const x0 = pj.x, z0 = pj.z;
    if (livre(nx, nz)) { pj.x = nx; pj.z = nz; } else if (Math.abs(mv.x) > 0.2 && livre(nx, pj.z)) pj.x = nx; else if (Math.abs(mv.z) > 0.2 && livre(pj.x, nz)) pj.z = nz;
    else {      // raspando numa quina: tenta desviar um pouco para cada lado antes de desistir do toque
      let foi = false; for (const g of [0.6, -0.6, 1.2, -1.2]) { const c = Math.cos(g), s = Math.sin(g), dx = (mv.x * c + mv.z * s) * v, dz = (-mv.x * s + mv.z * c) * v; if (livre(pj.x + dx, pj.z + dz)) { pj.x += dx; pj.z += dz; foi = true; break; } }
      if (!foi) E.alvoToque = null;
    }
    andou = Math.hypot(pj.x - x0, pj.z - z0) > v * 0.3;
    let d = Math.atan2(mv.x, mv.z) - jog.o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); jog.o.rotation.y += d * Math.min(1, dt * 12);
    if (andou) jog.toca(dispara ? 'Correr' : corre ? 'Trote' : 'Andar');      // (o botão Correr, ou Shift: corre; o direcional no fim ou o toque longe: trota)
  }
  const chao = alturaEm(pj.x, pj.z);
  if (E.jogNoChao && pj.y - chao > 0.55) E.jogNoChao = false;
  if (E.jogNoChao) pj.y += (chao - pj.y) * Math.min(1, dt * 18);
  else { E.jogVy -= 14 * dt; pj.y += E.jogVy * dt; if (pj.y <= chao) { pj.y = chao; E.jogVy = 0; E.jogNoChao = true; } }
  if (!E.jogNoChao) jog.toca(E.jogVy > 0 ? 'Pulo_Ar' : 'Pulo_Queda');
  else if (!andou) jog.toca('Parado');

  // onde está na estrada: no cume, as legendas e a câmera da descida; as pontas, as saídas
  const [i] = naRota(pj.x, pj.z);
  if (E.modo === 'subida' && i >= iCume - 3) {
    E.modo = 'descida'; cenaMirante();
  }
  cenasPasso(dt);
  E.saida = i <= 3 ? 'betfage' : i >= AMOS.length - 4 ? 'getsemani' : null;
  if (E.saida && !E.fora && !E.cine && !E.perguntou) { E.perguntou = true; E.saida === 'betfage' ? perguntaBetfage() : perguntaGetsemani(); }
  if (!E.saida) E.perguntou = false;
  pregacaoPasso(pj, t);
  if (!prensaVista && !E.cine && pj.distanceTo(PRENSA.position) < 7) { prensaVista = true; fala('Uma prensa de azeite. O jardim lá embaixo leva esse nome: Getsêmani, “prensa de azeite”.'); setTimeout(() => fala(''), 6000); }
  // botão de ação
  E.int = E.fora || E.cine || PREG.perto ? null : INT.perto(pj);
  const txt = PREG.perto && !E.fora ? 'sentar diante do templo' : E.int ? E.int.verbo : E.saida === 'betfage' ? 'voltar para Betfagé' : E.saida === 'getsemani' ? 'seguir para o Getsêmani' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora && !E.cine ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (PREG.perto || E.int ? 'olhar' : 'ir') : '');

  prensaPasso(dt);

  // câmera e sol
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(i, dt, pj, primeira || CINE.C.corteVolta); primeira = false; CINE.C.corteVolta = false;
  sun.position.set(pj.x - 14, pj.y + 26, pj.z + 12); sun.target.position.copy(pj);
  if (CINE.passo(dt)) { const a = CINE.C.alvo.distanceTo(pj) < 60 ? CINE.C.alvo : pj; sun.position.set(a.x - 14, a.y + 26, a.z + 12); sun.target.position.copy(a); }
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora && !E.cine);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());     // ?teste&parado: só a lógica, sem desenhar (testes)
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { caminho, MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, iCume, PAN, PREG, lembrar, INT, CINE };
