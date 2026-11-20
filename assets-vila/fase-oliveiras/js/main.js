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

// ---------- o botão de ação ----------
function acionar() {
  if (E.fora) return;
  if (PREG.perto) { lembrar(); return; }
  if (E.int) { INT.usa(E.int, null, jog.o.position); return; }      // conversar / olhar (interacoes.js)
  if (E.saida === 'betfage') perguntaBetfage();
  else if (E.saida === 'getsemani') perguntaGetsemani();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
ctl.aoToque = (e) => { ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera); const h = ray.intersectObject(scene.getObjectByName('Oliveiras_Terreno') || scene, true)[0]; if (h) E.alvoToque = h.point.clone(); };

// ---------- saídas ----------
function recua(n) { const [i] = naRota(jog.o.position.x, jog.o.position.z); const p = AMOS[Math.max(4, Math.min(AMOS.length - 5, i + n))]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); }
function perguntaBetfage() { dialogo('', 'Deseja voltar para Betfagé?', [['Ainda não', () => recua(6), '#a8957a'], ['Sim', () => sair('De volta a Betfagé…', '../fase-betfage/?de=oliveiras')]]); }
function perguntaGetsemani() {
  dialogo('', 'Deseja seguir para o Getsêmani?', [['Ainda não', () => recua(-6), '#a8957a'], ['Sim', () => sair('Descendo para o Getsêmani…', '../fase-getsemani/')]]);
}
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; if (E.modo === 'subida') { fala('A estrada sobe o Monte das Oliveiras.'); setTimeout(() => fala(''), 4500); } }, 900);
}, 1200);

// ---------- no cume: só as legendas ----------
// A cidade está sempre no lugar (cenario.js); quem a esconde é o próprio monte. Subindo, ela vai aparecendo por trás
// do cume conforme a câmera sobe; voltando, some do mesmo jeito. Nada para nem anima: ao passar pelo cume, as legendas.
const REV = { t: 0, ativo: false };
function revela(dt) {
  REV.t += dt;
  if (REV.t > 0.4 && !REV.l1) { REV.l1 = 1; fala('Jerusalém.'); }
  if (REV.t > 4.0 && !REV.l2) { REV.l2 = 1; fala('Do outro lado do vale do Cedrom, o templo brilha ao sol.'); }
  if (REV.t > 9.0) { fala(''); REV.ativo = false; }
}

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true, prensaVista = false;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  camera.getWorldDirection(fw); fw.setY(0).normalize(); rt.set(-fw.z, 0, fw.x);
  mv.set(0, 0, 0);
  if (!E.fora) {
    if (tecla.KeyW || tecla.ArrowUp) mv.add(fw); if (tecla.KeyS || tecla.ArrowDown) mv.sub(fw);
    if (tecla.KeyD || tecla.ArrowRight) mv.add(rt); if (tecla.KeyA || tecla.ArrowLeft) mv.sub(rt);
    if (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.15) mv.addScaledVector(fw, -JOY.y).addScaledVector(rt, JOY.x);
    if (mv.lengthSq() > 0) E.alvoToque = null;
    else if (E.alvoToque) { mv.subVectors(E.alvoToque, jog.o.position).setY(0); if (mv.length() < 0.15) { E.alvoToque = null; mv.set(0, 0, 0); } }
  }
  const pj = jog.o.position;
  let andou = false;
  if (mv.lengthSq() > 0) {
    mv.normalize(); const corre = tecla.ShiftLeft || tecla.ShiftRight || (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.9) || (E.alvoToque && E.alvoToque.distanceTo(pj) > 6);
    const v = (corre ? 4.6 : 2.2) * dt, nx = pj.x + mv.x * v, nz = pj.z + mv.z * v;
    // obstáculos valem também no pulo (antes, pulando, dava para cair dentro da mureta ou da pedra); quem já está
    // encostado só dá passos que não entram mais (fundo diminui): assim nunca fica preso nem atravessa
    const f0 = fundo(pj.x, pj.z);
    const livre = (x, z) => { if (!naArea(x, z) || terreno(x, z) > pj.y + 0.55) return false; const f = fundo(x, z); return f <= 0 || f < f0 - 1e-4; };
    const x0 = pj.x, z0 = pj.z;
    if (livre(nx, nz)) { pj.x = nx; pj.z = nz; } else if (livre(nx, pj.z)) pj.x = nx; else if (livre(pj.x, nz)) pj.z = nz; else E.alvoToque = null;
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

  // onde está na estrada: no cume, as legendas e a câmera da descida; as pontas, as saídas
  const [i] = naRota(pj.x, pj.z);
  if (E.modo === 'subida' && i >= iCume - 3) {
    E.modo = 'descida'; REV.ativo = true; REV.t = 0;
  }
  if (REV.ativo) revela(dt);
  E.saida = i <= 3 ? 'betfage' : i >= AMOS.length - 4 ? 'getsemani' : null;
  if (E.saida && !E.fora && !E.perguntou) { E.perguntou = true; E.saida === 'betfage' ? perguntaBetfage() : perguntaGetsemani(); }
  if (!E.saida) E.perguntou = false;
  pregacaoPasso(pj, t);
  if (!prensaVista && pj.distanceTo(PRENSA.position) < 7) { prensaVista = true; fala('Uma prensa de azeite. O jardim lá embaixo leva esse nome: Getsêmani, “prensa de azeite”.'); setTimeout(() => fala(''), 6000); }
  // botão de ação
  E.int = E.fora || PREG.perto ? null : INT.perto(pj);
  const txt = PREG.perto && !E.fora ? 'sentar diante do templo' : E.int ? E.int.verbo : E.saida === 'betfage' ? 'voltar para Betfagé' : E.saida === 'getsemani' ? 'seguir para o Getsêmani' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (PREG.perto || E.int ? 'olhar' : 'ir') : '');

  prensaPasso(dt);

  // câmera e sol
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(i, dt, pj, primeira); primeira = false;
  sun.position.set(pj.x - 14, pj.y + 26, pj.z + 12); sun.target.position.copy(pj);
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());     // ?teste&parado: só a lógica, sem desenhar (testes)
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, iCume, PAN, PREG, lembrar, INT };
