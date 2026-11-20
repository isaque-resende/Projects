// Getsêmani: liga os controles às ações e roda o laço do jogo. Aqui ficam os lugares do jardim (as legendas de
// cada um, com o texto dos evangelhos), a Rocha da Agonia (ajoelhar ao lado dela), a volta ao Monte das Oliveiras e,
// do outro lado do Cedrom, a Porta das Ovelhas (a entrada para o Tanque de Betesda).
import * as THREE from 'three';
import { E, LAY, fade, fala, bate, fundo, scene, sun, renderer, CIRC, CAIXAS, dialogo, botao, textoBotao } from './estado.js';
import { terreno, AMOS, naRota, PRENSA, SOL_DIR } from './cenario.js';
import { MIX } from './gente.js';
import { ajustaLente, jog, camera, ctl, tecla, JOY, toqueTela, fw, rt, mv, naArea, alturaEm, camPasso, CAM } from './jogador.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';

// ---------- os lugares: ao chegar perto de cada um, uma legenda (uma vez) ----------
const [gx, , gz] = LAY.portao, [ox, , oz] = LAY.oito, [tx, , tz] = LAY.tres, [ax, , az] = LAY.agonia, [rx, ry, rz] = LAY.rocha;
const [cx, , cz] = LAY.cedrom, [px, , pz] = LAY.porta;
const LUG = [
  { teste: (p) => p.x < gx - 1.5, txt: 'Do outro lado do ribeiro de Cedrom havia um horto, no qual Jesus entrou com os seus discípulos. (Jo 18.1)' },
  { x: ox, z: oz, r: 4.5, txt: '“Assentai-vos aqui, enquanto vou além orar.” (Mt 26.36)' },
  { x: PRENSA.position.x, z: PRENSA.position.z, r: 6, txt: 'Uma prensa de azeite na boca da gruta. Getsêmani quer dizer isto: “prensa de azeite”.' },
  { x: tx, z: tz, r: 4, txt: '“A minha alma está cheia de tristeza até à morte; ficai aqui e vigiai comigo.” (Mt 26.38)' },
  { x: rx, z: rz, r: 10, txt: 'E apartou-se deles cerca de um tiro de pedra; e, pondo-se de joelhos, orava. (Lc 22.41)' },
  { x: cx, z: cz, r: 6, txt: 'O ribeiro de Cedrom. Na quinta à noite Jesus o atravessou para ir ao jardim (Jo 18.1); horas depois, voltou por aqui, preso.' },
  { x: px + 10, z: pz, r: 9, txt: 'A Porta das Ovelhas (Ne 3.1). Logo depois dela fica o Tanque de Betesda, com os seus cinco alpendres. (Jo 5.2)' },
];
let falando = 0;
function legenda(txt, seg = 7) { fala(txt); const n = ++falando; setTimeout(() => { if (n === falando) fala(''); }, seg * 1000); }
function lugares(pj) {
  if (E.fora) return;
  for (const L of LUG) {
    if (L.visto) continue;
    if (L.teste ? L.teste(pj) : Math.hypot(pj.x - L.x, pj.z - L.z) < L.r) { L.visto = true; legenda(L.txt); break; }
  }
}

// ---------- a Rocha da Agonia: um anel no chão, a leste dela; o botão ajoelha o jogador de frente para a rocha ----------
const anel = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.2, 40), new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: 0.35, depthWrite: false }));
anel.rotation.x = -Math.PI / 2; anel.position.set(ax, terreno(ax, az) + 0.06, az); scene.add(anel);
const AG = { perto: false, t: -1 };
const ajoelha = jog.A.Ajoelhar; if (ajoelha) { ajoelha.setLoop(THREE.LoopOnce); ajoelha.clampWhenFinished = true; }
const ORACAO = [
  [0.8, '“Pai, se queres, passa de mim este cálice; todavia não se faça a minha vontade, mas a tua.” (Lc 22.42)'],
  [8.0, 'E apareceu-lhe um anjo do céu, que o fortalecia. (Lc 22.43)'],
  [13.5, 'E, posto em agonia, orava mais intensamente. E o seu suor tornou-se como grandes gotas de sangue, que corriam até ao chão. (Lc 22.44)'],
  [23.0, 'Foi aqui, numa rocha entre as oliveiras, um tiro de pedra adiante dos discípulos.'],
];
function ajoelhar() {
  E.fora = true; E.alvoToque = null; AG.t = 0; AG.i = 0; falando++;
  jog.o.position.set(ax, terreno(ax, az), az);
  jog.o.rotation.y = Math.atan2(rx - ax, rz - az);       // de frente para a rocha (e para o templo, atrás dela)
  jog.toca('Ajoelhar');
}
function oracaoPasso(dt) {
  if (AG.t < 0) return;
  AG.t += dt; CAM.perto += (1 - CAM.perto) * Math.min(1, dt * 0.8);
  if (AG.i < ORACAO.length && AG.t > ORACAO[AG.i][0]) fala(ORACAO[AG.i++][1]);
  // o clipe Ajoelhar desce, fica e levanta (5,2 s): para no meio, de joelhos, e só no fim termina de levantar
  if (ajoelha && !AG.pausa && AG.t > 2.6) { ajoelha.paused = true; AG.pausa = true; }
  if (ajoelha && AG.pausa && AG.t > 30) { ajoelha.paused = false; AG.pausa = false; fala(''); }
  if (AG.t > 32.8) { AG.t = -1; fala(''); E.fora = false; E.orou = true; jog.toca('Parado'); }
}

// ---------- o botão de ação e a saída ----------
function acionar() {
  if (E.fora) return;
  if (AG.perto) { ajoelhar(); return; }
  if (E.porta) { perguntaPorta(); return; }
  if (E.saida) perguntaVolta();
}
ctl.aoAcionar = acionar; botao.onclick = () => acionar();
function recua() { const p = AMOS[Math.min(AMOS.length - 1, 10)]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); }
function perguntaVolta() { dialogo('', 'Deseja voltar ao Monte das Oliveiras?', [['Ainda não', () => recua(), '#a8957a'], ['Sim', () => sair('De volta ao Monte das Oliveiras…', '../fase-oliveiras/?de=getsemani')]]); }
// a Porta das Ovelhas: o Tanque de Betesda é a próxima fase (ainda não existe); por enquanto, avisa e volta um pouco
function recuaPorta() { const p = AMOS[Math.max(0, AMOS.length - 16)]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); E.alvoToque = null; }
function perguntaPorta() {
  dialogo('', 'Entrar em Jerusalém pela Porta das Ovelhas? Logo depois dela fica o Tanque de Betesda.', [['Ainda não', () => recuaPorta(), '#a8957a'], ['Sim', () => {
    E.fora = true; fade.textContent = 'O Tanque de Betesda é a próxima parte do caminho (em construção).'; fade.style.opacity = 1;
    setTimeout(() => { recuaPorta(); fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; E.fora = false; }, 900); }, 2600);
  }]]);
}
function sair(texto, url) { E.fora = true; fade.textContent = texto; fade.style.opacity = 1; setTimeout(() => { location.href = url; }, 1200); }

// ---------- chegada ----------
setTimeout(() => {
  fade.style.opacity = 0;
  setTimeout(() => { fade.textContent = ''; legenda('Domingo, muito cedo. O sol acaba de nascer atrás do Monte das Oliveiras; a trilha desce para um jardim de oliveiras.', 7); }, 900);
}, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);
const relogio = new THREE.Clock();
let primeira = true;
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
  if (AG.t < 0) {
    if (!E.jogNoChao) jog.toca(E.jogVy > 0 ? 'Pulo_Ar' : 'Pulo_Queda');
    else if (!andou) jog.toca('Parado');
    CAM.perto += (0 - CAM.perto) * Math.min(1, dt * 0.8);
  }

  // lugares, rocha, porta e saída
  lugares(pj);
  AG.perto = Math.hypot(pj.x - ax, pj.z - az) < 2.0;
  anel.material.opacity = (E.orou ? 0.16 : 0.3) + 0.1 * Math.sin(t * 1.6);
  oracaoPasso(dt);
  const [i] = naRota(pj.x, pj.z);
  E.saida = i <= 3;
  if (E.saida && !E.fora && !E.perguntou) { E.perguntou = true; perguntaVolta(); }
  if (!E.saida) E.perguntou = false;
  E.porta = pj.x < px + 1.6 && Math.abs(pj.z - pz) < 2.6;
  if (E.porta && !E.fora && !E.perguntouPorta) { E.perguntouPorta = true; perguntaPorta(); }
  if (!E.porta && Math.hypot(pj.x - px, pj.z - pz) > 6) E.perguntouPorta = false;
  const txt = AG.perto && !E.fora ? 'ajoelhar junto à rocha' : E.porta ? 'entrar pela Porta das Ovelhas' : E.saida ? 'voltar ao Monte das Oliveiras' : '';
  if (txt) textoBotao((toqueTela ? '' : 'E: ') + txt);
  botao.style.display = txt && !E.fora ? 'block' : 'none';
  ctl.marcaPino(botao.style.display === 'block' ? (AG.perto ? 'olhar' : 'ir') : '');

  // câmera e sol
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 4);
  camPasso(dt, pj, primeira); primeira = false;
  sun.position.copy(pj).addScaledVector(SOL_DIR, 40); sun.target.position.copy(pj);
  marca.passo(pj, t, CAM.pos.distanceTo(pj), !E.fora);
  renderer.render(scene, camera);
};
if (!(globalThis.MODO_TESTE && new URLSearchParams(location.search).has('parado'))) renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; ajustaLente(); });

// para os testes automáticos: abrir com ?teste (ou pelo teste.html) e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { MIX, E, jog, laco, marca, tecla, bate, alturaEm: (x, z) => terreno(x, z), chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, AG, LAY, ajoelhar, acionar, perguntaPorta };
