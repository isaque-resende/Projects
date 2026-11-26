// Betânia: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro inteiro está em fase-betania/roteiro.md.
//  1. Madrugada, dentro da casa: ele acorda, senta, levanta, pensa e sai.
//  2. Lá fora, Cléopas vem ao encontro dele; a câmera fecha nos dois. Combinam: ele refaz o caminho da semana e
//     encontra Cléopas na saída de Jerusalém, para irem a Emaús. Cléopas sai correndo.
//  3. A câmera mostra os pontos de interesse: o túmulo de Lázaro, Lázaro e Marta.
//  4. Quando ele volta a andar, Marta vem e conversa.
//  5. Perto do túmulo, Lázaro vem e conta; no meio da conversa, a lembrança (flashback) da pedra tirada e de Lázaro
//     saindo enfaixado. A câmera fica onde Jesus estava: ele não aparece, só a voz (Jo 11.39-44).
import * as THREE from 'three';
import { lerpAng, inclina, maos, pos } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { abreVao } from '../../limpo-motor/vao.js';
import { scene, hemi, sun, fade, fala, DIAL, E, dialogo, renderer, ator, corpo, anda } from './estado.js';
import { CASAS, chaoTerra } from './casas.js';
import { cleopas, marta, lazaro } from './personagens.js';
import { nAldeao, nMoco, nLazaro, nMarta, nLenco } from './modelos.js';
import { jog, foco, camera } from './jogador.js';
import { CASAI, CEU0 } from './interiores.js';
import { TUM, pedraPasso } from './tumulo.js';
import { ground } from './cenario.js';
import { INTRO as CONV } from './interacoes.js';
import './acoes.js';     // só para manter a ordem de montagem

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const DE = new URLSearchParams(location.search).get('de');
const suave = (a, b, x) => { const k = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
const joyEl = () => document.getElementById('joy');
document.getElementById('pularIntro').style.display = 'none';      // agora a cena tem o seu "Pular cena"

// ---------- a câmera das cenas ----------
// o que pode tapar quem está em cena: as malhas altas do cenário (casas, rochas, árvores), não as pessoas nem o chão
const obstaculos = malhasAltas(scene, [ground]);
const CINE = criaCine({ camera, E, chao: (x, z) => chaoTerra(x, z), obstaculos, deOnde: () => ({ alvo: foco.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);

// ---------- ajudantes ----------
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + st.alt * 0.92); p.y += dy; return p; };
const meio = (a, b, y = 1.2) => () => a.o.position.clone().lerp(b.o.position, 0.5).setY((a.o.position.y + b.o.position.y) / 2 + y);
const rumo = (de, para) => Math.atan2(para.o.position.x - de.o.position.x, para.o.position.z - de.o.position.z) * DEG;     // graus
const dist = (a, b) => Math.hypot(a.o.position.x - b.o.position.x, a.o.position.z - b.o.position.z);
const vaiA = (st, alvo, dt, vel, clipe) => { const ok = anda(st, alvo, dt, vel, clipe); st.o.position.y = chaoTerra(st.o.position.x, st.o.position.z); return ok; };
const olha = (st, p, dt, k = 5) => lerpAng(st.o, Math.atan2(p.x - st.o.position.x, p.z - st.o.position.z), Math.min(1, dt * k));
// relógio da cena: o que acontece daqui a tantos segundos (do jogo, não do relógio da parede)
let AGENDA = [];
const depois = (s, fn) => AGENDA.push({ s, fn });

// ---------- conversa com plano e contraplano ----------
// a câmera fica por trás do ombro de quem ouve, olhando quem fala; quando o jogador responde, inverte
// (a cada fala escolhe o lado: por cima do ombro de quem ouve; se uma parede está atrás, de lado, nos dois)
const DLG = { fala: cleopas, ouve: jog, yaw: 0 };
const alvoDlg = () => cab(DLG.fala, -0.12)().lerp(cab(DLG.ouve, -0.12)(), 0.3);
function ladoDlg() {
  const r = rumo(DLG.fala, DLG.ouve), a = alvoDlg();
  const pts = [a, cab(DLG.fala, -0.12)(), cab(DLG.ouve, -0.12)(), cab(DLG.fala, -0.9)()];
  DLG.yaw = [24, -24, 60, -60, 100, -100, 150, -150].map((d) => r + d).find((y) => pts.every((q) => CINE.ve(q, y, 9, 3.6))) ?? r + 90;
}
// quem vem ao encontro: a câmera atrás do jogador, do lado de onde se vê
// (vê de onde ele parte, o jogador e o caminho entre os dois, na altura do plano: só o meio, olhado uma vez, deixava
// as tamareiras e as rochas entrarem enquanto ele anda)
function ladoVem(st, d, el = 11) {
  const r = rumo(st, jog), a = cab(st, -0.3)().lerp(cab(jog, -0.3)(), 0.25), pts = [a, cab(st, -0.3)(), cab(st, -1.0)(), cab(jog, -0.3)(), cab(st, -0.3)().lerp(cab(jog, -0.3)(), 0.6)];
  const cands = [30, -30, 55, -55, 80, -80, 110, -110, 0].map((x) => r + x);
  DLG.yawVem = cands.find((y) => pts.every((q) => CINE.ve(q, y, el, d))) ?? cands.map((y) => [y, pts.filter((q) => CINE.ve(q, y, el, d)).length]).sort((u, v) => v[1] - u[1])[0][0];
}
const planoConversa = (ate, o = {}) => ({ alvo: alvoDlg, dist: 3.6, el: 9, yaw: () => DLG.yaw, k: 2.6, kd: 2, ate, aoEntrar: ladoDlg, ...o });
function conversa(titulo, st, falas, fim) {
  const fila = [...falas];
  const passo = () => {
    DLG.fala = st; DLG.ouve = jog; ladoDlg();
    if (!fila.length) { st.toca('Parado'); if (fim) fim(); return; }
    const f = fila.shift(); st.toca('Conversando'); jog.toca('Parado');
    if (typeof f === 'string') { dialogo(titulo, f, [[fila.length ? 'Continuar' : 'Fechar', passo]]); return; }
    dialogo(titulo, f.txt, f.op.map(([rot, mais]) => [rot, () => {      // a resposta do jogador, em contraplano
      DLG.fala = jog; DLG.ouve = st; ladoDlg(); st.toca('Parado'); jog.toca('Conversando'); fala('— ' + rot);
      depois(1.5, () => { fala(''); fila.unshift(...mais); passo(); });
    }]));
  };
  passo();
}

// ---------- 1. madrugada, dentro da casa ----------
const INTRO = { on: DE !== 'betfage', t: 0, fase: 'dentro' };
const CENA = { fase: INTRO.on ? 'dentro' : 'fim', t: 0, sub: '' };
const ESTEIRA = CASAI.base.clone().add(V3(0.7, 0, -1.85));
const c0 = CASAS[0], PORTA_FORA = () => c0.mundo(c0.px + 0.2, c0.pz + 2.0), casaYaw = c0.g.rotation.y * DEG;
const ENCONTRO = () => c0.mundo(c0.px + 0.2, c0.pz + 3.25);
const ESTRADA_C = [V3(-3.5, 0, 2.6), V3(-20, 0, 2.6), V3(-37.5, 0, 3.1)];     // por onde Cléopas vai embora (a estrada, para oeste)
const CLEO0 = cleopas.o.position.clone(), CLEO_R0 = cleopas.o.rotation.y;
function luzDentro(on) {
  if (on) { scene.background = new THREE.Color(0x000000); scene.fog = null; hemi.intensity = 0.5; sun.intensity = 0.6; CASAI.luz.intensity = 12; }
  else { scene.background = CEU0.bg.clone(); scene.fog = CEU0.fog; CASAI.luz.intensity = 0; }
}
const PENSA = [[2.6, 5.0, '…Que silêncio.'], [5.0, 7.8, 'Alguma coisa está estranha desde sexta-feira.'],
  [7.8, 10.6, '“Ao terceiro dia ressuscitará”, ele disse (Lc 18.33). O que ele quis dizer?'], [10.6, 13.5, 'Hoje é o terceiro dia.']];
if (INTRO.on) {
  document.getElementById('dica').style.display = 'none';
  fade.textContent = 'Domingo, de madrugada.'; fade.style.opacity = 1;
  luzDentro(true); jog.o.rotation.order = 'YXZ';
  cleopas.o.visible = false;
} else {                                                // voltando de Betfagé: chega pela estrada, sem abertura (Cléopas já foi)
  fade.textContent = ''; fade.style.opacity = 0; cleopas.o.visible = false; CONV.feita = true;
  jog.o.position.set(-33, 0, 3.1); jog.o.rotation.y = Math.PI / 2; foco.copy(jog.o.position);
}
// fim da abertura (ou ela foi pulada): o jogo começa lá fora, na frente da casa
function fimIntro(pulou) {
  INTRO.on = false; fala(''); DIAL.style.display = 'none'; E.fora = false; AGENDA = [];
  document.getElementById('dica').style.display = ''; if (joyEl()) joyEl().style.display = '';
  if (INTRO.fase === 'dentro') luzDentro(false);
  c0.aberta = false; jog.o.visible = true; jog.o.rotation.set(0, 0, 0); jog.A.Parado.timeScale = 1; jog.toca('Parado');
  hemi.intensity = 1.3; sun.intensity = 3.1; scene.fog.color.set(0xd9d2bf); scene.background.set(0xd9d2bf);
  fade.textContent = ''; fade.style.opacity = 0;
  if (pulou && !CONV.feita) {          // pulou antes da conversa: Cléopas fica à espera, para conversar quando quiser
    cleopas.o.visible = true; cleopas.o.position.copy(CLEO0); cleopas.o.rotation.y = CLEO_R0; cleopas.toca('Parado');
    const f = PORTA_FORA(); jog.o.position.set(f.x, 0, f.z); jog.o.rotation.y = Math.atan2(CLEO0.x - f.x, CLEO0.z - f.z);
  } else cleopas.o.visible = false;
  foco.copy(jog.o.position);
  CENA.fase = 'livre'; CENA.jog0 = jog.o.position.clone();
}

// a cena da abertura: do quarto até a câmera mostrar Betânia
const RUMO_CLEO = () => { const a = ESTRADA_C[0]; return Math.atan2(a.x - cleopas.o.position.x, a.z - cleopas.o.position.z); };
if (INTRO.on) CINE.roda([
  // deitado, de perto; acorda e senta (a câmera recua); de pé, pensa; vai até a porta
  { alvo: cab(jog, -0.3), dist: 3.3, el: 40, yaw: 40, livre: true, corte: true, k: 4, ate: () => INTRO.t > 4.9 },
  { alvo: cab(jog), dist: 3.8, el: 16, yaw: 62, livre: true, k: 2.2, kd: 1.1, ate: () => INTRO.t > 7.8 },
  { alvo: cab(jog, -0.2), dist: 4.8, el: 12, yaw: 28, livre: true, k: 1.6, kd: 1.2, ate: () => INTRO.t > 13.5 },
  { alvo: cab(jog, -0.4), dist: 4.2, el: 24, yaw: 50, livre: true, k: 2.5, ate: () => INTRO.fase !== 'dentro' },      // as duas paredes ao fundo
  // corte: lá fora, a porta abre e ele sai; Cléopas vem correndo pela rua
  { alvo: () => PORTA_FORA().setY(1.3), dist: 8.5, el: 9, yaw: casaYaw + 8, corte: true, k: 2, ate: () => INTRO.chegou },
  { alvo: meio(jog, cleopas, 1.1), dist: 9.5, el: 12, yaw: casaYaw + 40, k: 2.2, kd: 1.5, ate: () => CENA.fase === 'cleopas' },
  // a câmera fecha nos dois: plano e contraplano
  planoConversa(() => CENA.fase !== 'cleopas'),
  // Cléopas sai correndo
  { alvo: cab(cleopas, -0.5), dist: 8, el: 11, yaw: () => RUMO_CLEO() * DEG + 150, k: 2.5, kd: 1.5, dur: 2.4 },
  // os pontos de interesse
  { alvo: () => TUM.lugar.clone().addScaledVector(TUM.frente, 1.6).setY(1.6), dist: 13, el: 16, yaw: Math.atan2(TUM.frente.x, TUM.frente.z) * DEG - 40, corte: true, titulo: 'O túmulo de Lázaro', k: 3, dur: 3.2 },
  { alvo: cab(lazaro, -0.15), dist: 4.6, el: 8, yaw: () => lazaro.o.rotation.y * DEG - 35, titulo: 'Lázaro', k: 2, kd: 1.3, dur: 2.8 },
  { alvo: cab(marta, -0.15), dist: 4.6, el: 8, yaw: () => marta.o.rotation.y * DEG - 18, corte: true, titulo: 'Marta', k: 2.5, dur: 2.8 },
], () => fimIntro(false), { aoPular: () => fimIntro(true) });

function introDentro(dt) {
  const T = INTRO.t, o = jog.o, c = c0;
  if (T > 2.2 && T < 2.6 && fade.style.opacity !== '0') { fade.style.opacity = 0; depois(0.9, () => { if (INTRO.on && INTRO.fase === 'dentro') fade.textContent = ''; }); }
  const p = PENSA.find(([a, b]) => T >= a && T < b); fala(p ? p[2] : '');
  // deitado (de costas, na esteira) → senta → levanta: o quadril é o pivô
  const H = 0.55, k = suave(5.0, 7.0, T), yaw = -Math.PI / 2;
  if (T < 7.6) {
    const a = -Math.PI / 2 * (1 - k), hy = 0.3 + (H - 0.3) * k;
    o.rotation.set(a, yaw, 0);
    const q = new THREE.Quaternion().setFromEuler(o.rotation), quadril = V3(0, H, 0).applyQuaternion(q);
    o.position.set(ESTEIRA.x - quadril.x, CASAI.base.y + hy - quadril.y, ESTEIRA.z - quadril.z + 0.9 * k);
    jog.A.Parado.timeScale = 0.4; jog.toca(k > 0.25 ? 'Agachado' : 'Parado');
    if (T < 5) o.rotation.z = Math.sin(T * 1.6) * 0.015;     // respira
  } else if (T < 13.5) {                              // de pé, olhando em volta
    o.rotation.set(0, yaw + Math.sin((T - 7.6) * 0.9) * 0.7, 0); o.position.set(ESTEIRA.x, CASAI.base.y, ESTEIRA.z + 0.9);
    jog.A.Parado.timeScale = 1; jog.toca('Parado');
  } else {                                            // vai até a porta
    const alvo = CASAI.entrada.clone().setY(CASAI.base.y).add(V3(0, 0, 0.6)), d = alvo.clone().sub(o.position).setY(0);
    if (d.length() > 0.12 && T < 14.8) { d.normalize(); o.position.addScaledVector(d, 1.3 * dt); lerpAng(o, Math.atan2(d.x, d.z), Math.min(1, dt * 6)); jog.toca('Andar'); }
    else {                                            // corte: lá fora, a porta abre e ele sai
      INTRO.fase = 'sai'; INTRO.t0 = T; luzDentro(false); CENA.fase = 'sai';
      hemi.intensity = 0.9; sun.intensity = 2.2; scene.background.setHSL(0.1, 0.25, 0.7); scene.fog.color.copy(scene.background);
      const d0 = c.mundo(c.px, c.pz - 0.5); o.position.set(d0.x, 0, d0.z); o.rotation.set(0, casaYaw / DEG, 0); c.aberta = true;
      // Cléopas vem pela rua, do leste
      cleopas.o.visible = true; cleopas.o.position.set(7.5, chaoTerra(7.5, 2.4), 2.4);
    }
  }
  if (CASAI.chama) CASAI.chama.scale.set(1, 0.8 + 0.3 * Math.sin(performance.now() * 0.02), 1);
}
// lá fora: sai pela porta, a porta fecha; Cléopas chega correndo; conversam; ele vai embora correndo
const FALAS_CLEO = [
  { txt: 'Ah, você também acordou. Dormiu alguma coisa?', op: [['Quase nada', []], ['Não consegui', []]] },
  'Nem eu. Fiquei a noite inteira olhando o teto. Desde sexta-feira não consigo pensar em outra coisa.',
  'A escuridão ao meio-dia (Lc 23.44). A terra tremendo (Mt 27.51). E ele dizia que ao terceiro dia ressuscitaria (Lc 18.33)… Hoje é o terceiro dia.',
  'Nós esperávamos que fosse ele quem havia de remir Israel (Lc 24.21). Eu preciso entender o que aconteceu.',
  { txt: 'Faça isso por mim: refaça o caminho desta semana. Fale com os discípulos, ouça o que eles viram, volte aos lugares por onde ele passou. Betfagé, o Monte das Oliveiras, o Getsêmani, a cidade.', op: [['Eu vou', []]] },
  'Eu vou na frente, ver os outros. Quando terminar, me encontre na saída de Jerusalém, na porta da estrada de Emaús, fora do muro. Estarei lá esperando, e seguimos juntos para Emaús.',
];
function introFora(dt) {
  const T2 = INTRO.t - INTRO.t0, o = jog.o, c = c0;
  if (CENA.fase === 'sai') {
    const fora_ = PORTA_FORA();
    if (c.ang < -1.3 || INTRO.chegou) {
      if (!INTRO.chegou) { if (vaiA(jog, fora_, dt, 1.3)) { INTRO.chegou = true; c.aberta = false; } }
      else { jog.toca('Parado'); olha(jog, cleopas.o.position, dt, 5); }
    }
    // Cléopas: corre e, perto, diminui o passo
    if (T2 > 0.6) { const d = dist(cleopas, jog); if (vaiA(cleopas, ENCONTRO(), dt, d > 3.5 ? 4.2 : 1.4) && INTRO.chegou) {
      CENA.fase = 'cleopas'; conversa('Cléopas', cleopas, FALAS_CLEO, () => { CENA.fase = 'cleopas_vai'; CONV.feita = true; cleopas.i = 0; }); } }
    const luz = suave(0, 6, T2); hemi.intensity = 0.9 + 0.4 * luz; sun.intensity = 2.2 + 0.9 * luz;
  } else if (CENA.fase === 'cleopas') { olha(cleopas, jog.o.position, dt, 4); olha(jog, cleopas.o.position, dt, 4); hemi.intensity = 1.3; sun.intensity = 3.1; }
  else if (CENA.fase === 'cleopas_vai') vaiEmbora(cleopas, dt);
}
// Cléopas corre pela estrada até sumir no fim dela
function vaiEmbora(st, dt) {
  if (!st.o.visible) return;
  if (vaiA(st, ESTRADA_C[st.i], dt, 5.0)) st.i++;
  if (st.i >= ESTRADA_C.length || st.o.position.x < -35.5) st.o.visible = false;
}

// ---------- 4. Marta vem ao encontro ----------
const MARTA0 = marta.o.position.clone(), MARTA_R0 = marta.o.rotation.y;
const LAZ0 = lazaro.o.position.clone(), LAZ_R0 = lazaro.o.rotation.y;
const VOLTAS = [];        // quem volta para o seu lugar depois da conversa: [ator, [pontos], rotação]
const DESVIO_M = V3(4.0, 0, -2.6);      // Marta contorna o forno (a padeira e o rapaz do fogo ficam no meio do caminho)
const FALAS_MARTA = [
  'Bom dia! Você também madrugou? Ninguém nesta casa dormiu direito.',
  'Leve pão antes de ir. Comer faz bem até em dia de luto.',
  'No sábado antes da Páscoa demos uma ceia para ele aqui. Eu servia, Lázaro estava à mesa, e Maria quebrou um vaso de nardo e ungiu os pés dele; a casa inteira se encheu do perfume (Jo 12.1-3).',
  'Quando Lázaro morreu, ele me disse: “Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá” (Jo 11.25). Eu disse que cria. Ainda creio, mesmo agora.',
  { txt: 'Lázaro foi ao túmulo, como faz toda manhã desde sexta. Vá falar com ele.', op: [['Vou lá', []]] },
];
function cenaMarta() {
  CENA.fase = 'marta_vem'; fala('“Espere! Bom dia!”'); depois(2.2, () => fala(''));
  CINE.roda([
    { alvo: () => cab(marta, -0.3)().lerp(cab(jog, -0.3)(), 0.25), dist: 7.5, el: 12, yaw: () => DLG.yawVem, aoEntrar: () => ladoVem(marta, 7.5, 12), corte: true, k: 2.5, ate: () => CENA.fase !== 'marta_vem' },
    planoConversa(() => CENA.fase !== 'marta_fala'),
  ], () => {}, { aoPular: () => { DIAL.style.display = 'none'; E.fora = false; fala(''); AGENDA = []; if (CENA.fase !== 'livre2') fimMarta(); } });
}
function fimMarta() { CENA.fase = 'livre2'; marta.toca('Parado'); marta.iv = 0; VOLTAS.push([marta, [DESVIO_M, MARTA0], MARTA_R0]); }

// ---------- 5. Lázaro, e a lembrança da pedra tirada ----------
const F = TUM.frente.clone(), LAT = V3(-F.z, 0, F.x), FDEG = Math.atan2(F.x, F.z) * DEG;
const BOCA = TUM.tum.getObjectByName('Tumulo_Boca').getWorldPosition(V3());      // o piso da porta da gruta
// o vão da gruta: escuro lá dentro (Lázaro aparece inteiro saindo da escuridão, sem a rocha cortá-lo)
abreVao(scene, { centro: BOCA.clone().add(V3(0, 0.85, 0)), normal: F, largura: 0.9, altura: 1.7, fundo: 2.15 });
// para onde a pedra rola (no mundo)
const ROLA = (() => { const k0 = TUM.k; const a = TUM.p0.clone(), b = TUM.p0.clone().add(V3(2.2, 0, 0).applyQuaternion(TUM.q0)); TUM.tum.localToWorld(a); TUM.tum.localToWorld(b); TUM.k = k0; return b.sub(a).setY(0).normalize(); })();
const pedraMundo = () => TUM.pedra.getWorldPosition(V3());
// o elenco da lembrança (fica escondido até lá): Marta, Maria, dois homens que rolam a pedra e Lázaro enfaixado
const FL = {
  marta: ator(nMarta, 1.62, 0, 0, 0, 'Parado'), maria: ator(nLenco, 1.6, 0, 0, 0, 'Parado'),
  h1: corpo(ator(nAldeao, 1.7, 0, 0, 0, 'Parado')), h2: corpo(ator(nMoco, 1.66, 0, 0, 0, 'Parado')),
  laz: corpo(ator(nLazaro, 1.72, 0, 0, 0, 'Parado')),
};
for (const st of Object.values(FL)) st.o.visible = false;
{ const linho = new THREE.MeshStandardMaterial({ color: 0xe8dcc2, roughness: 1, flatShading: true });
  FL.laz.o.traverse((m) => { if (m.isMesh) { m.material = linho; m.renderOrder = 3; } }); }       // as faixas de linho (Jo 11.44)
const FALAS_LAZ1 = [
  'Você veio até aqui também. Eu venho toda manhã, desde sexta.',
  'Quatro dias eu fiquei ali dentro (Jo 11.39). Quando ele chegou, mandou: “Tirai a pedra.” Marta ainda disse: “Senhor, já cheira mal.”',
  'Eu não vi nada daquilo. Eu estava morto. Me contaram depois como foi…',
];
const FALAS_LAZ2 = [
  'E então eu ouvi a voz dele, lá no escuro. E saí, com as faixas nos pés e nas mãos, e o rosto envolto num lenço (Jo 11.44).',
  'Ele chorou diante da pedra (Jo 11.35). Sabia que ia me chamar, e chorou assim mesmo.',
  'Agora é ele que está num túmulo, com uma pedra na porta. Eu não paro de pensar nisso: a pedra do meu foi tirada.',
  'Os principais sacerdotes querem me matar também, porque por minha causa muitos creram nele (Jo 12.10-11). Vá com cuidado em Jerusalém.',
];
const LZ = { k0: 0, a0: 0 };
const ponto = (f, l, y = 0) => { const p = BOCA.clone().addScaledVector(F, f).addScaledVector(LAT, l); p.y = y || chaoTerra(p.x, p.z); return p; };
const pisoBoca = (p) => { const d = (p.x - BOCA.x) * F.x + (p.z - BOCA.z) * F.z; return d < 0.1 ? BOCA.y : Math.max(chaoTerra(p.x, p.z), BOCA.y - d * 0.6); };
const poe = (st, p, olharPara) => { st.o.position.copy(p); st.o.visible = true; if (olharPara) st.o.rotation.y = Math.atan2(olharPara.x - p.x, olharPara.z - p.z); };
// os dois homens ficam do lado de onde a pedra sai, com as mãos na borda dela
const lugarHomem = (i) => pedraMundo().addScaledVector(ROLA, -(TUM.raio + 0.35)).addScaledVector(F, i ? 0.95 : 0.35).setY(0);
function montaLembranca() {
  LZ.k0 = TUM.k; LZ.a0 = TUM.alvo; TUM.k = 0; TUM.alvo = 0; pedraPasso(0);      // a pedra volta à porta já (se estava aberta, os homens nasciam dentro dela)
  jog.o.visible = false; lazaro.o.visible = false;
  const S = BOCA.clone().addScaledVector(F, 0.3);
  poe(FL.marta, ponto(2.6, 2.0), S); poe(FL.maria, ponto(3.1, 2.7), S);
  for (const [i, h] of [[0, FL.h1], [1, FL.h2]]) { const p = lugarHomem(i); p.y = chaoTerra(p.x, p.z); poe(h, p); h.o.rotation.y = Math.atan2(ROLA.x, ROLA.z); h.toca('Parado'); }
  const dentro = BOCA.clone().addScaledVector(F, -1.5); FL.laz.o.position.copy(dentro); FL.laz.o.rotation.y = Math.atan2(F.x, F.z); FL.laz.o.visible = false;
  CENA.sub = 'tirai'; CENA.t = 0; fala('“Tirai a pedra.” (Jo 11.39)');
}
function desfazLembranca() {
  for (const st of Object.values(FL)) st.o.visible = false;
  TUM.k = LZ.k0; TUM.alvo = LZ.a0; pedraPasso(0); jog.o.visible = true; lazaro.o.visible = true; fala('');
}
function cenaLazaro() {
  CENA.fase = 'lazaro'; CENA.sub = 'vem';
  const S = () => pedraMundo().addScaledVector(F, 0.7).setY(1.25);
  const yawLado = Math.atan2(F.x - ROLA.x * 0.8, F.z - ROLA.z * 0.8) * DEG;     // do lado de onde a pedra sai
  CINE.roda([
    // (baixa, por baixo das copas: o caminho do túmulo tem tamareiras, e do alto a lente passava pelas folhas)
    { alvo: () => cab(lazaro, -0.3)().lerp(cab(jog, -0.3)(), 0.25), dist: 6, el: 7, yaw: () => DLG.yawVem, aoEntrar: () => ladoVem(lazaro, 6, 7), corte: true, k: 2.5, ate: () => CENA.sub !== 'vem' },
    planoConversa(() => CENA.sub === 'tirai'),
    // a lembrança, de onde Jesus estava, diante da pedra
    { alvo: S, dist: 8.5, el: 6, yaw: FDEG, corte: true, fixo: true, k: 3, ate: () => CENA.sub === 'rola' },
    { alvo: () => S().addScaledVector(ROLA, -0.7), dist: 7.4, el: 11, yaw: yawLado, fixo: true, k: 1.4, kd: 1.2, ate: () => CENA.sub === 'chama' },
    { alvo: () => BOCA.clone().addScaledVector(F, 0.4).setY(BOCA.y + 1.2), dist: 7.5, el: 4, yaw: FDEG, fixo: true, zoom: 0.7, k: 1.6, kd: 0.5, ate: () => CENA.sub === 'desatai' },
    { alvo: () => cab(FL.laz, -0.4)().lerp(cab(FL.marta, -0.4)(), 0.35), dist: 6.5, el: 9, yaw: FDEG + 28, fixo: true, k: 1.4, kd: 1, ate: () => CENA.sub === 'fala2' },
    planoConversa(() => CENA.sub !== 'fala2', { corte: true }),
  ], () => {}, { aoPular: () => { DIAL.style.display = 'none'; E.fora = false; AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazLembranca(); } fimLazaro(); } });
}
function fimLazaro() { CENA.fase = 'fim'; CENA.sub = ''; lazaro.toca('Parado'); lazaro.iv = 0; VOLTAS.push([lazaro, [LAZ0], LAZ_R0]); }
function lembrancaPasso(dt) {
  const T = (CENA.t += dt), h = [FL.h1, FL.h2];
  if (CENA.sub === 'tirai' && T > 1.8) { CENA.sub = 'rola'; TUM.alvo = 1; fala(''); }
  else if (CENA.sub === 'rola') {
    // os homens empurram e vão junto com a pedra
    for (const [i, st] of h.entries()) vaiA(st, lugarHomem(i), dt, 0.9, 'Andar');
    if (TUM.k > 0.98) { CENA.sub = 'chama'; CENA.t = 0; fala('“Lázaro, vem para fora!” (Jo 11.43)'); for (const st of h) st.toca('Parado'); }
  } else if (CENA.sub === 'chama') {
    for (const st of h) olha(st, BOCA, dt, 3);
    if (T > 2.4) { CENA.sub = 'sai'; FL.laz.o.visible = true; fala(''); }
  } else if (CENA.sub === 'sai') {
    const chegou = anda(FL.laz, ponto(1.5, 0.2), dt, 0.62); FL.laz.o.position.y = pisoBoca(FL.laz.o.position);
    if (chegou) { CENA.sub = 'desatai'; CENA.t = 0; FL.laz.toca('Parado'); fala('“Desatai-o e deixai-o ir.” (Jo 11.44)'); }
  } else if (CENA.sub === 'desatai') {
    vaiA(FL.marta, FL.laz.o.position.clone().addScaledVector(LAT, 0.75), dt, 1.1); olha(FL.marta, FL.laz.o.position, dt);
    vaiA(FL.maria, FL.laz.o.position.clone().addScaledVector(LAT, 1.3).addScaledVector(F, 0.6), dt, 0.9);
    if (T > 3.4) { CENA.sub = 'volta'; LEMB.sai(() => { desfazLembranca(); CENA.sub = 'fala2'; conversa('Lázaro', lazaro, FALAS_LAZ2, fimLazaro); }); }
  }
}
// mãos e tronco sob medida (depois do clipe do quadro)
function cenasDepois(dt) {
  if (!LEMB.on) return;
  if (CENA.sub === 'tirai' || CENA.sub === 'rola') for (const [i, st] of [FL.h1, FL.h2].entries()) {
    const c = pedraMundo(), y = 1.05 + i * 0.3, a = c.clone().addScaledVector(ROLA, -TUM.raio * 0.72).addScaledVector(F, 0.12 + i * 0.25).setY(c.y - TUM.raio + y);
    inclina(st, 0.32); maos(st, a.clone().addScaledVector(F, 0.18), a.clone().addScaledVector(F, -0.12), dt, 1, 8);
  } else for (const st of [FL.h1, FL.h2]) maos(st, pos(st.os.bE[2]), pos(st.os.bD[2]), dt, 0);
  // Lázaro: as mãos atadas na frente
  if (FL.laz.o.visible) { const f = V3(Math.sin(FL.laz.o.rotation.y), 0, Math.cos(FL.laz.o.rotation.y)), b = FL.laz.o.position.clone().addScaledVector(f, 0.22); b.y += 0.98;
    maos(FL.laz, b.clone().addScaledVector(V3(-f.z, 0, f.x), 0.05), b.clone().addScaledVector(V3(-f.z, 0, f.x), -0.05), dt, 1, 20); }
}

// ---------- o passo das cenas: devolve true enquanto a abertura (dentro de casa) comanda a tela ----------
function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (INTRO.on) {
    INTRO.t += dt; if (joyEl()) joyEl().style.display = 'none';
    if (INTRO.fase === 'dentro') {
      introDentro(dt);
      if (!CINE.passo(dt)) { const d = 6, f0 = CASAI.centro; camera.position.copy(f0).add(V3(d, d, d)); camera.lookAt(f0); }
      sun.position.set(CASAI.centro.x - 6, CASAI.centro.y + 14, CASAI.centro.z + 8); sun.target.position.copy(CASAI.centro);
      return true;
    }
    introFora(dt);
    return false;
  }
  if (CENA.fase === 'cleopas_vai') vaiEmbora(cleopas, dt);
  // quem volta para o seu lugar
  for (let i = VOLTAS.length - 1; i >= 0; i--) { const [st, L, r] = VOLTAS[i]; if (st.iv < L.length - 1) { if (vaiA(st, L[st.iv], dt, 1.3)) st.iv++; } else if (vaiA(st, L[st.iv], dt, 1.3)) { lerpAng(st.o, r, Math.min(1, dt * 4)); if (Math.abs(Math.atan2(Math.sin(st.o.rotation.y - r), Math.cos(st.o.rotation.y - r))) < 0.02) { st.toca('Parado'); VOLTAS.splice(i, 1); } } }
  // 4. Marta: assim que ele volta a andar
  if (CENA.fase === 'livre' && !E.cine && !E.fora && CENA.jog0 && jog.o.position.distanceTo(CENA.jog0) > 0.8) cenaMarta();
  else if (CENA.fase === 'marta_vem') {
    olha(jog, marta.o.position, dt, 4); jog.toca('Parado');
    const alvo = jog.o.position.clone().addScaledVector(marta.o.position.clone().sub(jog.o.position).setY(0).normalize(), 1.35);
    if (!marta.desviou && jog.o.position.x < DESVIO_M.x) { if (vaiA(marta, DESVIO_M, dt, 2.2)) marta.desviou = true; }
    else if (vaiA(marta, alvo, dt, 2.2)) { CENA.fase = 'marta_fala'; conversa('Marta', marta, FALAS_MARTA, fimMarta); }
  } else if (CENA.fase === 'marta_fala') { olha(marta, jog.o.position, dt, 4); olha(jog, marta.o.position, dt, 4); }
  // 5. Lázaro: quando ele chega perto do túmulo
  else if (CENA.fase === 'livre2' && !E.cine && !E.fora && Math.hypot(jog.o.position.x - TUM.lugar.x, jog.o.position.z - TUM.lugar.z) < 10) cenaLazaro();
  else if (CENA.fase === 'lazaro') {
    if (CENA.sub === 'vem') {
      olha(jog, lazaro.o.position, dt, 4); jog.toca('Parado');
      const alvo = jog.o.position.clone().addScaledVector(lazaro.o.position.clone().sub(jog.o.position).setY(0).normalize(), 1.35);
      if (vaiA(lazaro, alvo, dt, 1.6)) { CENA.sub = 'fala1'; conversa('Lázaro', lazaro, FALAS_LAZ1, () => { CENA.sub = 'entra'; LEMB.entra('Algumas semanas antes', montaLembranca); }); }
    } else if (CENA.sub === 'fala1' || CENA.sub === 'fala2') { olha(lazaro, jog.o.position, dt, 4); olha(jog, lazaro.o.position, dt, 4); }
    else if (LEMB.on) lembrancaPasso(dt);
  }
  return false;
}

// para os testes
if (globalThis.MODO_TESTE) Object.assign(globalThis, { __OBST: obstaculos, __CENA: CENA, __INTRO: INTRO, __FL: FL, __LEMB: LEMB, __VOLTAS: VOLTAS });
export { cenasPasso, cenasDepois, CINE, CENA };
