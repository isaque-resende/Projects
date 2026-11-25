// Cidade alta: liga os controles às ações e roda o laço do jogo. Aqui ficam os lugares (as legendas), as conversas e a
// cena de Jo 20.1-4 (npcs.js), as casas que somem quando tapam a vista e as duas saídas: o viaduto (de volta ao templo)
// e a Porta de Genat (o Gólgota, logo fora do muro).
import * as THREE from 'three';
import { E, LAY, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao, conversa } from './estado.js';
import { terreno, SOL_DIR, oclusoresPasso } from './cenario.js';
import { MIX } from './gente.js';
import { CONVERSAS, npcsPasso, CENA } from './npcs.js';
import { pertoDe } from '../../limpo-motor/conversa.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM } from './jogador.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';

// ---------- os lugares: ao chegar perto de cada um, uma legenda (uma vez) ----------
const P = (k) => [LAY[k][0], LAY[k][2]];
const [px, pz] = P('ponte'), [gx, gz] = P('genat'), [mx, mz] = P('mercado'), [bx, bz] = P('gabata'), [cx, cz] = P('caifas'), [nx, nz] = P('cenaculo');
const LUG = [
  { x: mx, z: mz, r: 6, txt: 'Umas barracas de mercado. A cidade ainda está cheia de gente que veio para a Páscoa.' },
  { x: bx, z: bz, r: 7, txt: 'O palácio de Herodes, onde o governador fica na festa: o pretório (Jo 18.28). Na frente, o Pavimento, em hebraico Gabatá: ali Pilatos se assentou no tribunal (Jo 19.13).' },
  { x: cx, z: cz, r: 5, txt: 'A casa do sumo sacerdote, com o portão aberto para o pátio. Pedro seguiu Jesus de longe até aqui, e ficou do lado de fora, à porta (Jo 18.15-16).' },
  { x: nx, z: nz, r: 7, txt: 'Uma casa com uma grande sala no andar de cima (Mc 14.15). Ali os discípulos estão reunidos, com as portas fechadas (Jo 20.19). Uma mulher guarda a porta de baixo.' },
  { x: gx, z: gz, r: 6, txt: 'A Porta de Genat, a “porta do Jardim”. Lá fora, junto à estrada, perto da cidade, fica o Gólgota (Jo 19.20).' },
];
let falando = 0;
function legenda(txt, seg = 9) { fala(txt); const n = ++falando; setTimeout(() => { if (n === falando) fala(''); }, seg * 1000); }
function lugares(pj) {
  if (E.fora) return;
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
  conversa(n.titulo ?? n.nome, n.falas, () => { CAM.conversa = false; n.ouviu = true; if (n.aoFim) n.aoFim(); });
}

// ---------- o botão de ação e as saídas ----------
function acionar() {
  if (E.fora) return;
  if (quem) { conversar(); return; }
  if (E.genat) { perguntaGolgota(); return; }
  if (E.ponte) perguntaTemplo();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
function volta(x, z) { jog.o.position.set(x, terreno(x, z), z); E.alvoToque = null; }
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }
function perguntaTemplo() { dialogo('', 'Deseja voltar ao templo, pelo viaduto?', [['Ainda não', () => volta(px - 3.0, pz), '#a8957a'], ['Sim', () => sair('De volta ao templo…', '../fase-templo/?de=cidade')]]); }
function perguntaGolgota() { dialogo('', 'Deseja sair pela Porta de Genat, para o Gólgota e o sepulcro?', [['Ainda não', () => volta(gx, gz + 2.5), '#a8957a'], ['Sim', () => sair('Pela Porta de Genat, para fora da cidade…', '../fase-golgota/')]]); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; legenda('Domingo, de manhã cedo. Uma praça da cidade alta: a oeste, o palácio de Herodes; ao norte, a Porta de Genat; ao sul, a casa onde os discípulos estão escondidos.', 8); }, 900);
}, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true;
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  const pj = jog.o.position;
  npcsPasso(dt, pj);
  camera.getWorldDirection(fw); fw.setY(0).normalize(); rt.set(-fw.z, 0, fw.x);
  mv.set(0, 0, 0);
  if (!E.fora) {
    if (tecla.KeyW || tecla.ArrowUp) mv.add(fw); if (tecla.KeyS || tecla.ArrowDown) mv.sub(fw);
    if (tecla.KeyD || tecla.ArrowRight) mv.add(rt); if (tecla.KeyA || tecla.ArrowLeft) mv.sub(rt);
    if (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.15) mv.addScaledVector(fw, -JOY.y).addScaledVector(rt, JOY.x);
    if (mv.lengthSq() > 0) E.alvoToque = null;
    else if (E.alvoToque) { mv.subVectors(E.alvoToque, jog.o.position).setY(0); if (mv.length() < 0.15) { E.alvoToque = null; mv.set(0, 0, 0); } }
  }
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
  quem = E.fora ? null : pertoDe(CONVERSAS.filter((n) => !n.oculto && n.o.visible !== false), pj);
  E.ponte = pj.x > px - 0.5 && Math.abs(pj.z - pz) < 3.0;
  E.genat = CENA.livre && Math.hypot(pj.x - gx, pj.z - (gz - 1.4)) < 1.9;
  const saida = E.ponte || E.genat;
  if (saida && !E.fora && !E.perguntou) { E.perguntou = true; (E.genat ? perguntaGolgota : perguntaTemplo)(); }
  if (!saida) E.perguntou = false;
  const txt = quem && !E.fora ? (quem.verbo || 'conversar com ' + quem.nome.toLowerCase()) : E.genat ? 'sair pela Porta de Genat' : E.ponte ? 'voltar ao templo' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (quem ? 'olhar' : 'ir') : '');

  // casas que tapam a vista, câmera e sol
  oclusoresPasso(pj, dt, camera.position);
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(dt, pj, primeira); primeira = false;
  sun.position.copy(pj).addScaledVector(SOL_DIR, 40); sun.target.position.copy(pj);
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, LAY, CONVERSAS, CENA, acionar, conversar, INT: { L: CONVERSAS } };
