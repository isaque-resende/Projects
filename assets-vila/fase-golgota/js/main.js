// Gólgota: liga os controles às ações e roda o laço do jogo. Aqui ficam os lugares (as legendas de cada um, com o
// texto dos evangelhos), Pedro e João e Maria Madalena (npcs.js), o sepulcro (abaixar-se na porta e olhar dentro, Jo 20.5-7) e as duas pontas da estrada: a
// sudeste, a volta para a cidade alta (a Porta de Genat); a noroeste, a estrada de Emaús (a próxima parte do caminho).
import * as THREE from 'three';
import { E, LAY, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao, conversa } from './estado.js';
import { terreno, AMOS, naRota, TUM, SOL_DIR } from './cenario.js';
import { MIX } from './gente.js';
import { CONVERSAS, CENA, npcsPasso } from './npcs.js';
import { pertoDe } from '../../limpo-motor/conversa.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM } from './jogador.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';
import { criaCaminho } from '../../limpo-motor/caminho.js';
import { cenasPasso, tremor, CINE, CENA as CENAS } from './cenas.js';

// ---------- os lugares: ao chegar perto de cada um, uma legenda (uma vez) ----------
const [gx, , gz] = LAY.golgota, [px, , pz] = LAY.portao, [sx, , sz] = LAY.sepulcro, [ox, , oz] = LAY.olhar, [ex, , ez] = LAY.emaus;
const LUG = [
  { x: gx, z: gz, r: 9, txt: 'E, levando ele às costas a sua cruz, saiu para o lugar chamado Caveira, que em hebraico se chama Gólgota. (Jo 19.17)' },
  { x: gx, z: gz, r: 4.5, txt: 'Ali o crucificaram, e com ele outros dois, um de cada lado, e Jesus no meio. (Jo 19.18)' },
  { x: gx + 1, z: gz - 12, r: 4, txt: 'Muitos leram o título que estava sobre a cruz, porque o lugar onde Jesus foi crucificado era perto da cidade; e estava escrito em hebraico, grego e latim. (Jo 19.20)' },
  { x: px, z: pz, r: 4, txt: 'No lugar onde fora crucificado havia um horto, e no horto um sepulcro novo, em que ainda ninguém havia sido posto. (Jo 19.41)' },
  { x: sx + 3, z: sz, r: 6, txt: 'E, olhando, viram que a pedra já estava revolvida; e era ela muito grande. (Mc 16.4)' },
  { x: ex, z: ez, r: 10, txt: 'Por esta estrada se vai a Emaús, uma aldeia a uns sessenta estádios de Jerusalém. (Lc 24.13)' },
];
let falando = 0;
function legenda(txt, seg = 8) { fala(txt); const n = ++falando; setTimeout(() => { if (n === falando) fala(''); }, seg * 1000); }
function lugares(pj) {
  if (E.fora || E.cine) return;
  for (const L of LUG) {
    if (L.visto) continue;
    if (Math.hypot(pj.x - L.x, pj.z - L.z) < L.r) { L.visto = true; legenda(L.txt); break; }
  }
}

// ---------- o sepulcro: um anel no chão, na frente da porta; o botão abaixa o jogador para olhar dentro ----------
const anel = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 40), new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: 0.35, depthWrite: false }));
anel.rotation.x = -Math.PI / 2; anel.position.set(ox, terreno(ox, oz) + 0.06, oz); scene.add(anel);
const OL = { perto: false, t: -1 };
const abaixa = jog.A.Ajoelhar; if (abaixa) { abaixa.setLoop(THREE.LoopOnce); abaixa.clampWhenFinished = true; }
const DENTRO = [
  [0.8, 'E, abaixando-se, viu no chão os lençóis; todavia não entrou. (Jo 20.5)'],
  [8.0, 'E o lenço que tinha estado sobre a sua cabeça não estava com os lençóis, mas enrolado num lugar à parte. (Jo 20.7)'],
  [15.5, '“Não está aqui, porque já ressuscitou, como havia dito. Vinde, vede o lugar onde o Senhor jazia.” (Mt 28.6)'],
];
function olhar() {
  E.fora = true; E.alvoToque = null; OL.t = 0; OL.i = 0; falando++;
  jog.o.position.set(ox, terreno(ox, oz), oz);
  jog.o.rotation.y = Math.atan2(sx - ox, sz - oz);       // de frente para a porta
  jog.toca('Ajoelhar');
}
function olharPasso(dt) {
  if (OL.t < 0) return;
  OL.t += dt; CAM.perto += (1 - CAM.perto) * Math.min(1, dt * 0.8);
  if (OL.i < DENTRO.length && OL.t > DENTRO[OL.i][0]) fala(DENTRO[OL.i++][1]);
  const quer = (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.3) || E.alvoToque || tecla.KeyW || tecla.KeyS || tecla.KeyA || tecla.KeyD || tecla.ArrowUp || tecla.ArrowDown;
  if (quer && OL.t > 1.5 && OL.t < 22.5) { OL.t = 22.5; OL.i = DENTRO.length; E.alvoToque = null; if (abaixa && OL.pausa) { abaixa.paused = false; OL.pausa = false; } }
  // o clipe Ajoelhar desce, fica e levanta (5,2 s): para no meio, abaixado, e só no fim termina de levantar
  if (abaixa && !OL.pausa && OL.t > 2.2) { abaixa.paused = true; OL.pausa = true; }
  if (abaixa && OL.pausa && OL.t > 22.5) { abaixa.paused = false; OL.pausa = false; fala(''); }
  if (OL.t > 25.3) { OL.t = -1; fala(''); E.fora = false; E.olhou = true; jog.toca('Parado'); }
}

// ---------- conversas (Maria Madalena) ----------
let quem = null;
function conversar() {
  if (!quem) return;
  const n = quem; E.alvoToque = null;
  jog.o.rotation.y = Math.atan2(n.o.position.x - jog.o.position.x, n.o.position.z - jog.o.position.z);
  conversa(n.titulo ?? n.nome, n.falas, () => { n.ouviu = true; if (n.aoFim) n.aoFim(); });
}

// ---------- o botão de ação e as pontas da estrada ----------
function acionar() {
  if (E.fora || E.cine) return;
  if (quem) { if (quem.cena && !quem.cenaFeita) { quem.cenaFeita = true; quem.cena(); return; } conversar(); return; }
  if (OL.perto) { olhar(); return; }
  if (E.emaus) { perguntaEmaus(); return; }
  if (E.cidade) perguntaCidade();
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
// a estrada de Emaús ainda não existe: por enquanto, avisa e volta um pouco
function emConstrucao(texto, i) {
  E.fora = true; fade.textContent = texto; fade.style.opacity = 1;
  setTimeout(() => { recua(i); fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; E.fora = false; }, 900); }, 2600);
}
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }
// a ponta sudeste da estrada: volta para a cidade alta (Porta de Genat) ou, por fora do muro do norte, para Betesda (de onde também se chega aqui)
function perguntaCidade() { dialogo('', 'Voltar para a cidade, pela Porta de Genat, ou seguir por fora do muro até Betesda?', [['Ainda não', () => recua(12), '#a8957a'], ['Betesda', () => sair('Para Betesda, ao longo do muro do norte…', '../fase-betesda/?de=golgota')], ['Porta de Genat', () => sair('De volta à cidade, pela Porta de Genat…', '../fase-cidade/?de=genat')]]); }
CENAS.emaus = () => perguntaEmaus();      // Cléopas, no fim da conversa (cenas.js)
function perguntaEmaus() { dialogo('', 'Deseja seguir pela estrada de Emaús?', [['Ainda não', () => recua(AMOS.length - 14), '#a8957a'], ['Sim', () => emConstrucao('A estrada de Emaús é a próxima parte do caminho (em construção).', AMOS.length - 14)]]); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; }, 900);      // (a chegada, com a câmera mostrando o lugar: cenas.js)
}, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  npcsPasso(dt, jog.o.position); TUM.passo(jog.o.position);
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
    const v = (corre ? 4.6 : 2.2) * dt, nx = pj.x + mv.x * v, nz = pj.z + mv.z * v;
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
    if (andou) jog.toca(corre ? 'Correr' : 'Andar');
  }
  const chao = alturaEm(pj.x, pj.z);
  if (E.jogNoChao && pj.y - chao > 0.55) E.jogNoChao = false;
  if (E.jogNoChao) pj.y += (chao - pj.y) * Math.min(1, dt * 18);
  else { E.jogVy -= 14 * dt; pj.y += E.jogVy * dt; if (pj.y <= chao) { pj.y = chao; E.jogVy = 0; E.jogNoChao = true; } }
  if (OL.t < 0) {
    if (!E.jogNoChao) jog.toca(E.jogVy > 0 ? 'Pulo_Ar' : 'Pulo_Queda');
    else if (!andou) jog.toca('Parado');
    CAM.perto += (0 - CAM.perto) * Math.min(1, dt * 0.8);
  }

  // lugares, sepulcro e as pontas da estrada
  lugares(pj);
  OL.perto = Math.hypot(pj.x - ox, pj.z - oz) < 1.8;
  cenasPasso(dt);
  quem = E.fora || E.cine ? null : pertoDe(CONVERSAS.filter((n) => !n.oculto && n.o.visible !== false), pj);
  anel.material.opacity = (E.olhou ? 0.16 : 0.3) + 0.1 * Math.sin(t * 1.6); anel.visible = !globalThis.EM_LEMBRANCA;
  olharPasso(dt);
  const [i, d] = naRota(pj.x, pj.z);
  E.cidade = i <= 3 && d < 4;
  E.emaus = i >= AMOS.length - 5 && d < 4;
  if ((E.cidade || E.emaus) && !E.fora && !E.cine && !E.perguntou) { E.perguntou = true; (E.cidade ? perguntaCidade : perguntaEmaus)(); }
  if (!E.cidade && !E.emaus) E.perguntou = false;
  const txt = quem && !E.fora ? (quem.verbo || 'conversar com ' + quem.nome) : OL.perto && !E.fora ? 'abaixar-se e olhar dentro' : E.emaus ? 'seguir para Emaús' : E.cidade ? 'voltar (cidade ou Betesda)' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora && !E.cine ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (OL.perto ? 'olhar' : 'ir') : '');

  // câmera e sol
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
if (globalThis.MODO_TESTE) globalThis.TESTE = { caminho, CINE, MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, OL, LAY, TUM, olhar, acionar, CONVERSAS, CENA, conversar, INT: { L: CONVERSAS } };
