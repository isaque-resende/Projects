// Betesda: liga os controles às ações e roda o laço do jogo. Aqui ficam os lugares (as legendas de cada um, com o texto
// do evangelho), as conversas (npcs.js) e as três saídas: a leste, a volta ao Getsêmani; ao sul, a Porta das Ovelhas, que
// leva ao pátio do templo (fase-templo); a oeste, a estrada ao longo do muro, até o Gólgota.
import * as THREE from 'three';
import { E, LAY, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao, conversa } from './estado.js';
import { terreno, AMOS, naRota, SOL_DIR, telhadosPasso } from './cenario.js';
import { MIX } from './gente.js';
import { CONVERSAS, npcsPasso, AGITA } from './npcs.js';
import { pertoDe } from '../../limpo-motor/conversa.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM } from './jogador.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';
import { criaCaminho } from '../../limpo-motor/caminho.js';
import { cenasPasso, CINE } from './cenas.js';

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
  if (E.fora || E.cine) return;
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
  conversa(n.titulo ?? n.nome, n.falas, () => { CAM.conversa = false; n.ouviu = true; });
}

// ---------- o botão de ação e as saídas ----------
function acionar() {
  if (E.fora || E.cine) return;
  if (quem) { if (quem.cena && !quem.cenaFeita) { quem.cenaFeita = true; quem.cena(); return; } conversar(); return; }      // a primeira vez, a lembrança (cenas.js)
  if (E.porta) { perguntaTemplo(); return; }
  if (E.oeste) { perguntaGolgota(); return; }
  if (E.leste) perguntaGetsemani();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
// tocar no chão: anda até lá, desviando de muros, colunas, árvores e da água (caminho.js)
const caminho = criaCaminho({ terreno: (x, z) => terreno(x, z), livreC: (x, z) => naArea(x, z) && fundo(x, z) <= 0, profundidade: fundo });
const rayT = new THREE.Raycaster(), ndcT = new THREE.Vector2();
ctl.aoToque = (e) => {
  if (E.fora || E.cine) return;
  ndcT.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); rayT.setFromCamera(ndcT, camera); rayT.camera = camera;
  const h = rayT.intersectObjects(scene.children, true).find((x) => x.object.visible && !x.object.isSkinnedMesh && !x.object.isSprite && x.face && x.face.normal.y > -0.2);
  if (h) { E.alvoToque = h.point.clone(); E.TRILHA = caminho(jog.o.position, E.alvoToque); }
};
function recua(i) { const p = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); E.alvoToque = null; }
function recuaPorta() { jog.o.position.set(ox, terreno(ox, oz - 4), oz - 4); E.alvoToque = null; }
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }
function emConstrucao(texto, volta) {
  E.fora = true; fade.textContent = texto; fade.style.opacity = 1;
  setTimeout(() => { volta(); fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; E.fora = false; }, 900); }, 2600);
}
function perguntaGetsemani() { dialogo('', 'Deseja voltar ao Getsêmani, descendo ao Cedrom?', [['Ainda não', () => recua(12), '#a8957a'], ['Sim', () => sair('De volta ao Getsêmani…', '../fase-getsemani/?de=betesda')]]); }
function perguntaGolgota() { dialogo('', 'Deseja seguir pela estrada, ao longo do muro, até o Gólgota?', [['Ainda não', () => recua(AMOS.length - 14), '#a8957a'], ['Sim', () => sair('Para o Gólgota, fora da porta…', '../fase-golgota/')]]); }
function perguntaTemplo() { dialogo('', 'Deseja entrar pela Porta das Ovelhas, para o pátio do templo?', [['Ainda não', () => recuaPorta(), '#a8957a'], ['Sim', () => sair('Para o pátio do templo…', '../fase-templo/')]]); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; }, 900);      // (a chegada, com a câmera mostrando o tanque: cenas.js)
}, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  npcsPasso(dt, jog.o.position);
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
  CAM.perto += ((CAM.conversa ? 1 : 0) - CAM.perto) * Math.min(1, dt * 1.5);

  // lugares, conversas e saídas
  lugares(pj);
  quem = E.fora || E.cine ? null : pertoDe(CONVERSAS, pj); cenasPasso(dt);
  anel.material.opacity = 0.22 + 0.1 * Math.sin(t * 1.6); anel.visible = !globalThis.EM_LEMBRANCA;
  const [i, d] = naRota(pj.x, pj.z);
  E.leste = i <= 3 && d < 4;
  E.oeste = i >= AMOS.length - 5 && d < 4;
  E.porta = Math.hypot(pj.x - ox, pj.z - oz) < 2.2;
  const saida = E.leste || E.oeste || E.porta;
  if (saida && !E.fora && !E.cine && !E.perguntou) { E.perguntou = true; (E.porta ? perguntaTemplo : E.oeste ? perguntaGolgota : perguntaGetsemani)(); }
  if (!saida) E.perguntou = false;
  const txt = quem && !E.fora ? (quem.verbo || 'conversar com ' + quem.nome.toLowerCase()) : E.porta ? 'entrar pela Porta das Ovelhas' : E.oeste ? 'seguir para o Gólgota' : E.leste ? 'voltar ao Getsêmani' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora && !E.cine ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (quem ? 'olhar' : 'ir') : '');

  // telhados, câmera e sol
  telhadosPasso(pj, dt, camera.position);
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(dt, pj, primeira || CINE.C.corteVolta); primeira = false; CINE.C.corteVolta = false;
  sun.position.copy(pj).addScaledVector(SOL_DIR, 40); sun.target.position.copy(pj);
  if (CINE.passo(dt)) { const a = CINE.C.alvo; sun.position.copy(a).addScaledVector(SOL_DIR, 40); sun.target.position.copy(a); }
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora && !E.cine);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { caminho, MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, LAY, CONVERSAS, AGITA, acionar, conversar, INT: { L: CONVERSAS }, CINE };
