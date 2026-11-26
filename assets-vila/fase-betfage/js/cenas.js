// Betfagé: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro está em fase-betfage/roteiro.md.
//  1. Chegada: a câmera apresenta a aldeia e os pontos de interesse (os jumentos, a figueira seca, o alto da estrada).
//  2. Os jumentos: ao olhar, a lembrança da semana passada: dois discípulos desamarram a jumenta e o jumentinho, o dono
//     pergunta, "O Senhor precisa dele", e eles os levam (Mc 11.1-7; Lc 19.29-35).
//  3. A figueira: ao olhar, a lembrança da segunda-feira: a figueira com folhas e sem fruto, a palavra de Jesus, e no
//     dia seguinte a árvore seca desde as raízes (Mc 11.12-14, 20-22). Jesus não aparece: a câmera fica onde ele estava.
import * as THREE from 'three';
import { lerpAng, pos, maos } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, fade, renderer, LAY, sm } from './estado.js';
import { terreno, AMOS, TERRENO } from './cenario.js';
import { ator, corpo, anda, chao } from './gente.js';
import { nPedro, nJoao, gFigs } from './modelos.js';
import { jumenta, jumentinho, ESTACA, JUM, conv1, tMax } from './aldeia.js';
import { jog, camera, foco, CENTRO, DMAX, DMIN, DJOGO } from './jogador.js';
import { caminho } from './caminho.js';
import { FIGSECA } from './plantas.js';
import { INT } from './interacoes.js';

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const DO_MONTE = new URLSearchParams(location.search).get('de') === 'oliveiras';
const CINE = criaCine({ camera, E, chao: (x, z) => terreno(x, z), obstaculos: malhasAltas(scene, [TERRENO]), deOnde: () => ({ alvo: foco.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);
const CENA = { fase: '', sub: '', t: 0 };

// ---------- ajudantes ----------
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + st.alt * 0.9); p.y += dy; return p; };
const meio = (L, y = 1.1) => () => { const p = V3(); for (const s of L) p.add(s.o.position); p.multiplyScalar(1 / L.length); return p.setY(p.y + y); };
const olha = (st, p, dt, k = 5) => lerpAng(st.o, Math.atan2(p.x - st.o.position.x, p.z - st.o.position.z), Math.min(1, dt * k));
// segue uma trilha de pontos; devolve true no fim
const segue = (st, L, dt, vel) => { if (st.i >= L.length) return true; if (anda(st, L[st.i], dt, vel)) st.i++; return st.i >= L.length; };
let AGENDA = []; const depois = (s, fn) => AGENDA.push({ s, fn });
const pontoEstrada = (i) => { const p = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))]; return V3(p.x, 0, p.z); };
const maisPerto = (p) => { let m = 0, dm = 1e9; AMOS.forEach((q, i) => { const d = Math.hypot(q.x - p.x, q.z - p.z); if (d < dm) { dm = d; m = i; } }); return m; };

// ---------- 1. chegada: a aldeia e os pontos de interesse ----------
const [FX, FZ] = LAY.figseca, FIG = V3(FX, terreno(FX, FZ), FZ);
const ALTO = pontoEstrada(Math.round(tMax * AMOS.length) - 4); ALTO.y = terreno(ALTO.x, ALTO.z);
const JUMS = () => jumenta.o.position.clone().lerp(jumentinho.o.position, 0.4).setY(jumenta.o.position.y + 0.7);
const yawDe = (de, para) => Math.atan2(para.x - de.x, para.z - de.z) * DEG;     // graus: de que lado (de "para" vista de "de")
function fimChegada() { fala(''); CENA.fase = 'livre'; }
if (!DO_MONTE) {
  CENA.fase = 'chegada';
  CINE.roda([
    { alvo: () => CENTRO.clone(), dist: 46, el: 32, yaw: 45, k: 1.2, kd: 0.6, titulo: 'Betfagé', dur: 3.6,
      aoEntrar: () => depois(0.8, () => fala('Betfagé, a aldeia dos figos verdes, no caminho de Jerusalém.')) },
    { alvo: JUMS, dist: 7.5, el: 20, yaw: 45, corte: true, k: 2, kd: 1.4, titulo: 'A jumenta e o jumentinho', dur: 3.2, aoEntrar: () => fala('') },
    { alvo: () => FIG.clone().setY(FIG.y + 2.2), dist: 11, el: 12, yaw: 60, corte: true, k: 2, kd: 1.2, titulo: 'A figueira seca', dur: 3.2 },
    { alvo: () => ALTO.clone().setY(ALTO.y + 1.5), dist: 16, el: 22, yaw: 30, corte: true, k: 2, kd: 1.2, titulo: 'O alto da estrada: o Monte das Oliveiras', dur: 3.0,
      aoEntrar: () => fala('Suba a estrada até o alto do monte.') },
  ], fimChegada, { aoPular: () => { AGENDA = []; } });
} else { CENA.fase = 'livre'; E.distAlvo = Math.min(E.distAlvo, DJOGO()); E.abrindo = true; }      // voltando do monte: só fecha a câmera

// ---------- 2. os jumentos: a lembrança da semana passada ----------
const D1 = corpo(ator(nPedro, 1.72, 0, 0, 0, 'Parado')), D2 = ator(nJoao, 1.68, 0, 0, 0, 'Parado');
for (const st of [D1, D2]) st.o.visible = false;
const JM = {};        // como estava antes da lembrança
const PERTO_EST = ESTACA.clone().add(V3(-0.75, 0, 0.55));
const iJ = maisPerto(ESTACA);
function montaJumentos() {
  JM.dono = [conv1.o.position.clone(), conv1.o.rotation.y]; JM.ja = [jumenta.o.position.clone(), jumenta.o.rotation.y]; JM.jo = [jumentinho.o.position.clone(), jumentinho.o.rotation.y];
  jog.o.visible = false;
  const ini = pontoEstrada(iJ - 9); D1.o.position.copy(ini); D2.o.position.copy(ini).add(V3(0.7, 0, 0.5)); chao(D1); chao(D2);
  D1.o.visible = D2.o.visible = true; D1.i = D2.i = 0;
  D1.L = caminho(ini, PERTO_EST); if (!D1.L.length) D1.L = [PERTO_EST]; HIST.length = 0;
  CENA.sub = 'vem'; CENA.t = 0; fala('“Ide à aldeia que está defronte de vós; achareis preso um jumentinho…” (Mc 11.2)');
}
function desfazJumentos() {
  D1.o.visible = D2.o.visible = false; maos(D1, V3(), V3(), 1, 0);
  conv1.o.position.copy(JM.dono[0]); conv1.o.rotation.y = JM.dono[1]; conv1.toca('Conversando');
  jumenta.o.position.copy(JM.ja[0]); jumenta.o.rotation.y = JM.ja[1]; jumentinho.o.position.copy(JM.jo[0]); jumentinho.o.rotation.y = JM.jo[1];
  jumenta.toca('Parado'); jumentinho.toca('Comer'); JUM.solto = false; jog.o.visible = true; fala('');
}
const HIST = [];      // por onde Pedro passou (João e os jumentos vão atrás dele, na mesma trilha)
function atras(st, s, vel, dt) { const a = HIST[Math.max(0, HIST.length - 1 - Math.round(s / dt))]; if (a && st.o.position.distanceTo(a) > 0.15) anda(st, a, dt, vel); else st.toca('Parado'); }
function jumentosPasso(dt) {
  const T = (CENA.t += dt); if (D1.o.visible) HIST.push(D1.o.position.clone());
  if (CENA.sub === 'vem') {
    const a = segue(D1, D1.L, dt, 1.5); atras(D2, 0.9, 1.5, dt);
    if (T > 3.2) fala('');
    if (a && D2.o.position.distanceTo(D1.o.position) < 1.6) { CENA.sub = 'solta'; CENA.t = 0; D1.toca('Parado'); D2.toca('Parado'); }
  } else if (CENA.sub === 'solta') {
    olha(D1, ESTACA, dt); olha(D2, jumentinho.o.position, dt);
    // o dono vem ver
    if (T > 1.2) { const alvo = D1.o.position.clone().add(V3(-1.2, 0, -0.6)); if (!anda(conv1, alvo, dt, 1.4)) conv1.toca('Andar'); else { conv1.toca('Parado'); olha(conv1, D1.o.position, dt); } }
    if (T > 2.0 && !CENA.f1) { CENA.f1 = true; fala('O dono: “Por que desprendeis o jumentinho?” (Lc 19.33)'); }
    if (T > 4.6 && !CENA.f2) { CENA.f2 = true; olha(D1, conv1.o.position, 1); D1.toca('Conversando'); fala('“O Senhor precisa dele.” (Lc 19.34)'); }
    if (T > 7.0) { CENA.sub = 'levam'; CENA.t = 0; fala(''); JUM.solto = true; D1.toca('Parado'); D1.i = 0; HIST.length = 0;
      const fim = pontoEstrada(iJ + 16); D1.L = caminho(D1.o.position, fim); if (!D1.L.length) D1.L = [fim]; }
  } else if (CENA.sub === 'levam') {
    segue(D1, D1.L, dt, 1.25); atras(jumenta, 1.1, 1.3, dt); atras(jumentinho, 1.9, 1.3, dt); atras(D2, 2.7, 1.3, dt);
    olha(conv1, D1.o.position, dt, 2);
    if (T > 5.5) { CENA.sub = 'volta'; LEMB.sai(() => { desfazJumentos(); CENA.sub = ''; CENA.fase = 'livre'; INT.usa(INT.L.find((i) => i.nome === 'a jumenta e o jumentinho')); }); }
  }
}
function cenaJumentos() {
  CENA.fase = 'jumentos'; CENA.sub = 'entra'; CENA.f1 = CENA.f2 = false;
  CINE.roda([
    // o pátio é cercado de muros: os planos são do alto, do lado de onde o diorama é visto (como a câmera do jogo)
    { alvo: JUMS, dist: 8, el: 34, yaw: 45, k: 2, ate: () => CENA.sub === 'vem' },
    { alvo: meio([D1, D2]), dist: 10, el: 36, yaw: 40, corte: true, k: 2, kd: 1.4, ate: () => CENA.sub === 'solta' },
    { alvo: () => meio([D1, jumentinho], 1.0)().lerp(cab(conv1, -0.3)(), 0.25), dist: 8.5, el: 44, yaw: 35, k: 2, kd: 1.5, ate: () => CENA.sub === 'levam' },
    { alvo: meio([D1, jumenta, jumentinho], 0.9), dist: 12, el: 46, yaw: 45, k: 1.6, kd: 1, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazJumentos(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.6, () => LEMB.entra('Na semana passada', montaJumentos));
}

// ---------- 3. a figueira: a lembrança da segunda-feira ----------
const FOLHA = gFigs.scene.getObjectByName('Figueira4_Grande_SemFruta') || gFigs.scene.children[0];
const VIVA = FOLHA.clone(true); VIVA.position.set(0, 0, 0); VIVA.rotation.set(0, 0, 0);
{ const g = new THREE.Group(); g.add(VIVA); const b0 = new THREE.Box3().setFromObject(FIGSECA), b1 = new THREE.Box3().setFromObject(VIVA);
  VIVA.scale.multiplyScalar((b0.max.y - b0.min.y) / Math.max(0.1, b1.max.y - b1.min.y) * 1.05); }
VIVA.position.set(FX, terreno(FX, FZ) - 0.05, FZ); VIVA.visible = false; scene.add(VIVA);
const MAT_FOLHAS = [];
VIVA.traverse((m) => { if (m.isMesh) { m.castShadow = m.receiveShadow = true; m.material = m.material.clone(); if (/folh/i.test(m.material.name)) MAT_FOLHAS.push([m, m.material, m.material.color.clone()]); } });
const SECO = new THREE.Color(0x8a6a3c);
// folhas que caem quando ela seca
const QUEDA = []; { const geo = new THREE.CircleGeometry(0.09, 4), mat = new THREE.MeshStandardMaterial({ color: 0x7d8a3a, roughness: 1, side: THREE.DoubleSide, flatShading: true });
  for (let i = 0; i < 26; i++) { const f = new THREE.Mesh(geo, mat); f.visible = false; scene.add(f); QUEDA.push({ f, v: V3(), t: 0 }); } QUEDA.mat = mat; }
const PEDRO = D1, JOAO = D2;
const FRENTE_FIG = (() => { const i = maisPerto(FIG); const a = pontoEstrada(i - 3), b = pontoEstrada(i); return b.sub(a).setY(0).normalize(); })();     // o rumo da estrada ali
const POV = () => FIG.clone().addScaledVector(FRENTE_FIG, -6.5);     // de onde Jesus vinha
function montaFigueira() {
  jog.o.visible = false; FIGSECA.visible = false; VIVA.visible = true; VIVA.scale.multiplyScalar(1);
  for (const [m, mat, c] of MAT_FOLHAS) mat.color.copy(c);
  const p0 = POV(), lat = V3(-FRENTE_FIG.z, 0, FRENTE_FIG.x);
  PEDRO.o.position.copy(p0).addScaledVector(lat, 1.1).addScaledVector(FRENTE_FIG, 1.2); JOAO.o.position.copy(p0).addScaledVector(lat, -1.1).addScaledVector(FRENTE_FIG, 0.8);
  for (const st of [PEDRO, JOAO]) { chao(st); st.o.visible = true; st.o.rotation.y = Math.atan2(FRENTE_FIG.x, FRENTE_FIG.z); st.i = 0; }
  PEDRO.L = [FIG.clone().addScaledVector(lat, 1.3).addScaledVector(FRENTE_FIG, -2.3)]; JOAO.L = [FIG.clone().addScaledVector(lat, -1.4).addScaledVector(FRENTE_FIG, -2.6)];
  CENA.sub = 'chega'; CENA.t = 0; fala('Jesus teve fome. Viu de longe uma figueira com folhas… (Mc 11.13)');
}
function desfazFigueira() {
  for (const st of [PEDRO, JOAO]) st.o.visible = false;
  VIVA.visible = false; FIGSECA.visible = true; FIGSECA.rotation.z = 0; for (const q of QUEDA) q.f.visible = false; jog.o.visible = true; fala('');
}
function figueiraPasso(dt) {
  const T = (CENA.t += dt);
  if (CENA.sub === 'chega') {
    segue(PEDRO, PEDRO.L, dt, 1.1); segue(JOAO, JOAO.L, dt, 1.05);
    if (T > 3.0 && !CENA.f1) { CENA.f1 = true; fala('…mas, chegando a ela, não achou nela senão folhas (Mc 11.13).'); }
    if (T > 5.6) { CENA.sub = 'palavra'; CENA.t = 0; fala('“Nunca mais coma alguém fruto de ti.” (Mc 11.14)'); for (const st of [PEDRO, JOAO]) st.toca('Parado'); }
  } else if (CENA.sub === 'palavra') {
    for (const st of [PEDRO, JOAO]) olha(st, FIG, dt, 3);
    if (T > 3.0) { CENA.sub = 'seca'; CENA.t = 0; fala('No dia seguinte, de manhã… (Mc 11.20)'); }
  } else if (CENA.sub === 'seca') {
    // as folhas murcham e caem; no fim, só os galhos secos
    const k = THREE.MathUtils.clamp(T / 2.6, 0, 1);
    for (const [m, mat, c] of MAT_FOLHAS) mat.color.copy(c).lerp(SECO, k);
    QUEDA.mat.color.set(0x7d8a3a).lerp(SECO, k);
    for (const q of QUEDA) {
      if (!q.f.visible && T < 2.6 && Math.random() < dt * 4) { q.f.visible = true; q.t = 0; const a = Math.random() * 6.28, r = Math.random() * 1.8; q.f.position.set(FX + Math.cos(a) * r, FIG.y + 2.2 + Math.random() * 1.6, FZ + Math.sin(a) * r); q.v.set((Math.random() - 0.5) * 0.4, -0.6 - Math.random() * 0.4, (Math.random() - 0.5) * 0.4); }
      if (q.f.visible) { q.t += dt; q.f.position.addScaledVector(q.v, dt); q.f.rotation.x += dt * 3; q.f.rotation.y += dt * 2; const y = terreno(q.f.position.x, q.f.position.z) + 0.04; if (q.f.position.y < y) { q.f.position.y = y; q.v.set(0, 0, 0); } }
    }
    if (T > 2.9 && VIVA.visible) { VIVA.visible = false; FIGSECA.visible = true; }
    if (T > 3.6) { CENA.sub = 'pedro'; CENA.t = 0; PEDRO.toca('Conversando'); fala('Pedro: “Mestre, eis que a figueira que amaldiçoaste se secou.” (Mc 11.21)'); }
  } else if (CENA.sub === 'pedro') {
    olha(PEDRO, POV(), dt, 3);
    if (T > 3.4 && !CENA.f2) { CENA.f2 = true; PEDRO.toca('Parado'); fala('“Tende fé em Deus.” (Mc 11.22)'); }
    if (T > 6.0) { CENA.sub = 'volta'; LEMB.sai(() => { desfazFigueira(); CENA.sub = ''; CENA.fase = 'livre'; INT.usa(INT.L.find((i) => i.nome === 'a figueira seca')); }); }
  }
}
function cenaFigueira() {
  CENA.fase = 'figueira'; CENA.sub = 'entra'; CENA.f1 = CENA.f2 = false;
  const yF = Math.atan2(-FRENTE_FIG.x, -FRENTE_FIG.z) * DEG;      // a câmera do lado de onde a estrada vem
  CINE.roda([
    { alvo: () => FIG.clone().setY(FIG.y + 2), dist: 9, el: 14, yaw: yF + 30, k: 2, ate: () => CENA.sub === 'chega' },
    // de onde Jesus estava, chegando perto da árvore
    { alvo: () => FIG.clone().setY(FIG.y + 2.0), dist: 8, el: 5, yaw: yF, corte: true, fixo: true, k: 2, kd: 0.25, ate: () => CENA.sub === 'palavra' },
    { alvo: () => FIG.clone().setY(FIG.y + 2.2), dist: 5.2, el: 9, yaw: yF, fixo: true, zoom: 0.85, k: 1.5, kd: 0.8, ate: () => CENA.sub === 'seca' },
    { alvo: () => FIG.clone().setY(FIG.y + 1.9), dist: 9, el: 13, yaw: yF + 55, k: 0.9, kd: 0.8, ate: () => CENA.sub === 'pedro' },
    { alvo: () => cab(PEDRO, -0.2)().lerp(FIG.clone().setY(FIG.y + 1.6), 0.3), dist: 5, el: 8, yaw: () => yawDe(PEDRO.o.position, POV()) + 15, k: 2, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazFigueira(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.6, () => LEMB.entra('Segunda-feira, vindo de Betânia', montaFigueira));
}

// as duas lembranças começam ao olhar os jumentos ou a figueira (a primeira vez); depois, só as falas
INT.L.find((i) => i.nome === 'a jumenta e o jumentinho').cena = cenaJumentos;
INT.L.find((i) => i.nome === 'a figueira seca').cena = cenaFigueira;

function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (CENA.fase === 'jumentos' && LEMB.on) jumentosPasso(dt);
  else if (CENA.fase === 'figueira' && LEMB.on) figueiraPasso(dt);
  if (CENA.fase === 'jumentos' && CENA.sub === 'solta' && D1.o.visible) {      // a mão de Pedro no nó da corda
    const n = ESTACA.clone().add(V3(0, 0.95, 0)); maos(D1, n.clone().add(V3(-0.06, 0, 0)), n.clone().add(V3(0.06, 0, 0)), dt, CENA.t < 4.4 ? 1 : 0, 6);
  } else if (D1.pesoB > 0.01) maos(D1, pos(D1.os.bE[2]), pos(D1.os.bD[2]), dt, 0);
}
// a câmera do jogo volta: na distância de jogo, em cima do jogador
function voltaCamera() { E.dist = E.distAlvo = Math.min(E.distAlvo || DJOGO(), DJOGO()); foco.copy(jog.o.position.clone().lerp(CENTRO, sm(DMIN, DMAX() * 0.92, E.dist))); }

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __CENA: CENA, __LEMB: LEMB, __FL: { pedro: D1, joao: D2 } });
export { cenasPasso, voltaCamera, CINE, CENA };
