// Betesda: liga os controles às ações e roda o laço do jogo. Aqui ficam os lugares (as legendas de cada um, com o texto
// do evangelho), as conversas (npcs.js) e as três saídas: a leste, a volta ao Getsêmani; ao sul, a Porta das Ovelhas, que
// leva ao pátio do templo (a próxima fase); a oeste, a estrada ao longo do muro, até o Gólgota.
import * as THREE from 'three';
import { E, LAY, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao, conversa } from './estado.js';
import { terreno, AMOS, naRota, SOL_DIR, telhadosPasso } from './cenario.js';
import { MIX } from './gente.js';
import { CONVERSAS, npcsPasso } from './npcs.js';
import { pertoDe } from '../../limpo-motor/conversa.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM } from './jogador.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';

// ---------- os lugares: ao chegar perto de cada um, uma legenda (uma vez) ----------
const [tx, , tz] = LAY.tanque, [px, , pz] = LAY.paralitico, [ox, , oz] = LAY.porta, [cx, , cz] = LAY.curral;
const [X0, X1, Z0, Z1] = LAY.complexo;
const LUG = [
  { teste: (p) => p.x < X1 + 6 && p.z < Z1 + 3 && p.z > Z0 - 3, txt: 'Junto à Porta das Ovelhas há um tanque, chamado em hebraico Betesda, o qual tem cinco alpendres. (Jo 5.2)' },
  { teste: (p) => p.x > X0 && p.x < X1 && p.z > Z0 && p.z < Z1, txt: 'Nestes jazia grande multidão de enfermos, cegos, coxos e paralíticos, esperando o movimento da água. (Jo 5.3)' },
  { x: px, z: pz, r: 2.6, txt: 'Aqui estava um homem que havia trinta e oito anos se achava enfermo. Jesus lhe disse: “Levanta-te, toma o teu leito e anda.” Logo aquele homem ficou são, tomou o seu leito e andou. (Jo 5.5-9)' },
  { x: ox, z: oz, r: 7, txt: 'A Porta das Ovelhas, que os sacerdotes edificaram e consagraram nos dias de Neemias. (Ne 3.1) Por ela entra quem vai ao templo.' },
  { x: cx, z: cz, r: 7, txt: 'As ovelhas para os sacrifícios do templo esperam aqui, junto à porta que tem o nome delas.' },
];
let falando = 0;
function legenda(txt, seg = 8) { fala(txt); const n = ++falando; setTimeout(() => { if (n === falando) fala(''); }, seg * 1000); }
function lugares(pj) {
  if (E.fora) return;
  for (const L of LUG) {
    if (L.visto) continue;
    if (L.teste ? L.teste(pj) : Math.hypot(pj.x - L.x, pj.z - L.z) < L.r) { L.visto = true; legenda(L.txt); break; }
  }
}
// o lugar do paralítico: um anel no chão, onde ficava a esteira dele
const anel = new THREE.Mesh(new THREE.RingGeometry(0.6, 0.85, 40), new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: 0.3, depthWrite: false }));
anel.rotation.x = -Math.PI / 2; anel.position.set(px, LAY.deck + 0.05, pz); scene.add(anel);

// ---------- conversas ----------
let quem = null;
function conversar() {
  if (!quem) return;
  const n = quem; E.alvoToque = null; CAM.conversa = true;
  jog.o.rotation.y = Math.atan2(n.o.position.x - jog.o.position.x, n.o.position.z - jog.o.position.z);
  conversa(n.nome, n.falas, () => { CAM.conversa = false; n.ouviu = true; });
}

// ---------- o botão de ação e as saídas ----------
function acionar() {
  if (E.fora) return;
  if (quem) { conversar(); return; }
  if (E.porta) { perguntaTemplo(); return; }
  if (E.oeste) { perguntaGolgota(); return; }
  if (E.leste) perguntaGetsemani();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
function recua(i) { const p = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); E.alvoToque = null; }
function recuaPorta() { jog.o.position.set(ox, terreno(ox, oz - 4), oz - 4); E.alvoToque = null; }
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }
function emConstrucao(texto, volta) {
  E.fora = true; fade.textContent = texto; fade.style.opacity = 1;
  setTimeout(() => { volta(); fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; E.fora = false; }, 900); }, 2600);
}
function perguntaGetsemani() { dialogo('', 'Deseja voltar ao Getsêmani, descendo ao Cedrom?', [['Ainda não', () => recua(12), '#a8957a'], ['Sim', () => sair('De volta ao Getsêmani…', '../fase-getsemani/?de=betesda')]]); }
function perguntaGolgota() { dialogo('', 'Deseja seguir pela estrada, ao longo do muro, até o Gólgota?', [['Ainda não', () => recua(AMOS.length - 14), '#a8957a'], ['Sim', () => sair('Para o Gólgota, fora da porta…', '../fase-golgota/')]]); }
function perguntaTemplo() { dialogo('', 'Deseja entrar pela Porta das Ovelhas, para o pátio do templo?', [['Ainda não', () => recuaPorta(), '#a8957a'], ['Sim', () => emConstrucao('O pátio do templo é a próxima parte do caminho (em construção).', recuaPorta)]]); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; legenda('Domingo, ainda cedo. Do Cedrom, a estrada sobe ao planalto ao norte do templo, até o muro da cidade e a Porta das Ovelhas.', 8); }, 900);
}, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  npcsPasso(dt);
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
  CAM.perto += ((CAM.conversa ? 1 : 0) - CAM.perto) * Math.min(1, dt * 1.5);

  // lugares, conversas e saídas
  lugares(pj);
  quem = E.fora ? null : pertoDe(CONVERSAS, pj);
  anel.material.opacity = 0.22 + 0.1 * Math.sin(t * 1.6);
  const [i, d] = naRota(pj.x, pj.z);
  E.leste = i <= 3 && d < 4;
  E.oeste = i >= AMOS.length - 5 && d < 4;
  E.porta = Math.hypot(pj.x - ox, pj.z - oz) < 2.2;
  const saida = E.leste || E.oeste || E.porta;
  if (saida && !E.fora && !E.perguntou) { E.perguntou = true; (E.porta ? perguntaTemplo : E.oeste ? perguntaGolgota : perguntaGetsemani)(); }
  if (!saida) E.perguntou = false;
  const txt = quem && !E.fora ? 'conversar com ' + quem.nome.toLowerCase().replace(/^(um|uma|o|a) /, (m) => m) : E.porta ? 'entrar pela Porta das Ovelhas' : E.oeste ? 'seguir para o Gólgota' : E.leste ? 'voltar ao Getsêmani' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (quem ? 'olhar' : 'ir') : '');

  // telhados, câmera e sol
  telhadosPasso(pj, dt, camera.position);
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(dt, pj, primeira); primeira = false;
  sun.position.copy(pj).addScaledVector(SOL_DIR, 40); sun.target.position.copy(pj);
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, LAY, CONVERSAS, acionar, conversar };
