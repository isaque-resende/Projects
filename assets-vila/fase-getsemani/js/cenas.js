// Getsêmani: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro está em fase-getsemani/roteiro.md.
//  1. Chegada (do Monte das Oliveiras): o jardim ao nascer do sol e os pontos de interesse (a rocha da agonia, a
//     oliveira onde os três dormiram).
//  2. A rocha: a lembrança da quinta à noite: a oração, o anjo, o suor como gotas de sangue (Lc 22.41-44).
//  3. A oliveira dos três: a lembrança dos discípulos dormindo, "Simão, dormes?", e as tochas chegando (Mc 14.37-42).
// Jesus não aparece: nas duas lembranças a câmera fica onde ele estava.
import * as THREE from 'three';
import { lerpAng, pos } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, renderer, LAY, DE, sun, hemi } from './estado.js';
import { terreno, TERRENO } from './cenario.js';
import { ator, chao, anda } from './gente.js';
import { nPedro, nJoao, nTiago, nGuarda } from './modelos.js';
import { jog, camera, CAM } from './jogador.js';

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const CINE = criaCine({ camera, E, chao: (x, z) => terreno(x, z), obstaculos: malhasAltas(scene, [TERRENO]), deOnde: () => ({ alvo: CAM.olho.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);
const CENA = { fase: '', sub: '', t: 0 };
let AGENDA = []; const depois = (s, fn) => AGENDA.push({ s, fn });
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + 1.5); p.y += dy; return p; };
const naTerra = (x, z, dy = 0) => V3(x, terreno(x, z) + dy, z);
const YAW_QUINA = Math.atan2(1, -0.45) * DEG;
const [rx, , rz] = LAY.rocha, [ax, , az] = LAY.agonia, [tx, , tz] = LAY.tres, [gx, , gz] = LAY.portao;
const ROCHA = naTerra(rx, rz), AGONIA = naTerra(ax, az), TRES = naTerra(tx, tz), PORTAO = naTerra(gx, gz);

// ---------- a noite das lembranças (quinta-feira) ----------
const NOITE = { salvo: null };
function noite(on) {
  if (on) {
    NOITE.salvo = { bg: scene.background, fog: scene.fog.color.clone(), near: scene.fog.near, far: scene.fog.far, h: hemi.intensity, s: sun.intensity, sc: sun.color.clone() };
    scene.background = new THREE.Color(0x0d1426); scene.fog.color.set(0x0d1426); scene.fog.near = 25; scene.fog.far = 140;
    hemi.intensity = 0.5; sun.intensity = 0.8; sun.color.set(0x9fb4e8);      // a lua cheia da Páscoa
  } else if (NOITE.salvo) {
    const s = NOITE.salvo; scene.background = s.bg; scene.fog.color.copy(s.fog); scene.fog.near = s.near; scene.fog.far = s.far;
    hemi.intensity = s.h; sun.intensity = s.s; sun.color.copy(s.sc); NOITE.salvo = null;
  }
}

// ---------- 1. chegada ----------
if (DE !== 'agonia' && DE !== 'betesda') {
  CENA.fase = 'chegada';
  CINE.roda([
    { alvo: () => V3((ax + gx) / 2, terreno((ax + gx) / 2, (az + gz) / 2) + 2, (az + gz) / 2), dist: 46, el: 26, yaw: YAW_QUINA, k: 1.2, kd: 0.6, titulo: 'Getsêmani', dur: 3.8,
      aoEntrar: () => depois(0.6, () => fala('Domingo, muito cedo. O sol nasce atrás do Monte das Oliveiras sobre um jardim de oliveiras.')) },
    { alvo: () => ROCHA.clone().setY(ROCHA.y + 0.8), dist: 8, el: 18, yaw: YAW_QUINA - 20, corte: true, k: 2, kd: 1, titulo: 'A rocha da agonia', dur: 3.2, aoEntrar: () => fala('') },
    { alvo: () => TRES.clone().setY(TRES.y + 1.2), dist: 10, el: 20, yaw: YAW_QUINA, corte: true, k: 2, kd: 1, titulo: 'Onde os discípulos dormiram', dur: 3.2 },
  ], () => { fala(''); CENA.fase = 'livre'; }, { aoPular: () => { AGENDA = []; } });
} else CENA.fase = 'livre';

// ---------- 2. a rocha: a oração na noite de quinta ----------
// as gotas: pingam no chão diante da rocha e ficam ali, escuras
const GOTAS = []; { const geo = new THREE.SphereGeometry(0.022, 5, 4), mat = new THREE.MeshStandardMaterial({ color: 0x5a0d0d, roughness: 0.6 });
  for (let i = 0; i < 18; i++) { const m = new THREE.Mesh(geo, mat); m.visible = false; scene.add(m); GOTAS.push({ m, v: 0, caiu: false }); } }
const DIR_R = ROCHA.clone().sub(AGONIA).setY(0).normalize(), LAT_R = V3(-DIR_R.z, 0, DIR_R.x);
const CHAO_G = AGONIA.clone().addScaledVector(DIR_R, 0.55);      // onde ele estava ajoelhado, junto à rocha
const ANJO = new THREE.PointLight(0xfff2cc, 0, 9, 1.4); scene.add(ANJO);
const ORACAO = [
  [0.4, 'ora', '“Pai, se queres, passa de mim este cálice; todavia não se faça a minha vontade, mas a tua.” (Lc 22.42)'],
  [7.0, 'anjo', 'E apareceu-lhe um anjo do céu, que o fortalecia. (Lc 22.43)'],
  [12.5, 'gotas', 'E, posto em agonia, orava mais intensamente. E o seu suor tornou-se como grandes gotas de sangue, que corriam até ao chão. (Lc 22.44)'],
  [19.0, 'fim', ''],
];
function montaRocha() {
  noite(true); jog.o.visible = false; for (const g of GOTAS) { g.m.visible = false; g.caiu = false; }
  CENA.sub = 'ora'; CENA.t = 0; CENA.k = 0; fala(ORACAO[0][2]);
}
function desfazRocha() { noite(false); ANJO.intensity = 0; for (const g of GOTAS) g.m.visible = false; jog.o.visible = true; fala(''); }
function rochaPasso(dt) {
  const T = (CENA.t += dt);
  while (CENA.k < ORACAO.length && T >= ORACAO[CENA.k][0]) { const [, sub, txt] = ORACAO[CENA.k++]; CENA.sub = sub; if (txt) fala(txt); }
  ANJO.position.copy(CHAO_G).add(V3(0, 3.2, 0)).addScaledVector(DIR_R, -0.6);
  ANJO.intensity += ((CENA.sub === 'anjo' ? 14 : 0) - ANJO.intensity) * Math.min(1, dt * 1.5);
  if (CENA.sub === 'gotas') for (const [i, g] of GOTAS.entries()) {
    if (!g.m.visible && T > 13.2 + i * 0.4) { g.m.visible = true; g.v = 0; g.caiu = false; g.m.position.copy(CHAO_G).addScaledVector(LAT_R, (i % 5 - 2) * 0.09).addScaledVector(DIR_R, ((i * 7) % 5 - 2) * 0.05).add(V3(0, 1.0, 0)); g.m.scale.setScalar(1); }
    if (g.m.visible && !g.caiu) { g.v += 9 * dt; g.m.position.y -= g.v * dt; const y = terreno(g.m.position.x, g.m.position.z) + 0.01; if (g.m.position.y < y) { g.m.position.y = y; g.caiu = true; g.m.scale.set(1.6, 0.25, 1.6); } }
  }
  if (CENA.sub === 'fim' && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazRocha(); CENA.sub = ''; CENA.fase = 'livre'; E.orou = true; }); }
}
function cenaRocha() {
  CENA.fase = 'rocha'; CENA.sub = 'entra'; CENA.saindo = false;
  const yPov = Math.atan2(-DIR_R.x, -DIR_R.z) * DEG;      // atrás do lugar onde ele se ajoelhou, olhando a rocha
  CINE.roda([
    { alvo: () => ROCHA.clone().setY(ROCHA.y + 0.6), dist: 6, el: 16, yaw: YAW_QUINA - 20, k: 2, ate: () => CENA.sub === 'ora' },
    // do lugar dele, de joelhos: a rocha, as oliveiras, a noite
    { alvo: () => ROCHA.clone().setY(ROCHA.y + 0.7), dist: 2.4, el: 6, yaw: yPov, corte: true, fixo: true, k: 2, kd: 0.4, ate: () => CENA.sub === 'anjo' },
    { alvo: () => ROCHA.clone().setY(ROCHA.y + 0.9), dist: 3.4, el: 16, yaw: yPov + 12, fixo: true, k: 0.8, kd: 0.5, ate: () => CENA.sub === 'gotas' },      // a luz do anjo sobre a rocha
    { alvo: () => CHAO_G.clone().add(V3(0, 0.15, 0)), dist: 1.6, el: 40, yaw: yPov + 30, corte: true, fixo: true, k: 1, kd: 0.4, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazRocha(); } CENA.sub = ''; CENA.fase = 'livre'; E.orou = true; } });
  depois(0.5, () => LEMB.entra('Quinta-feira, à noite', montaRocha));
}

// ---------- 3. a oliveira dos três: dormindo ----------
const TRES_ST = [[nPedro, 1.72, 0], [nTiago, 1.7, 1], [nJoao, 1.66, 2]].map(([m, h, i]) => { const st = ator(m, h, 0, 0, 0, 'Parado'); st.o.visible = false; st.o.rotation.order = 'YXZ'; st.i = i; return st; });
const [PEDRO] = TRES_ST;
const TOCHAS = [0, 1, 2, 3].map(() => { const g = new THREE.Group(), st = ator(nGuarda, 1.7, 0, 0, 0, 'Andar'); g.add(new THREE.PointLight(0xffa64a, 0, 10, 1.6));
  const chama = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 5), new THREE.MeshBasicMaterial({ color: 0xffb347 })); chama.position.y = 0.12; g.add(chama);
  scene.add(g); st.o.visible = false; g.visible = false; return { g, st }; });
const DIR_T = TRES.clone().sub(ROCHA).setY(0).normalize(), LAT_T = V3(-DIR_T.z, 0, DIR_T.x);     // da rocha (de onde ele veio) para a oliveira
// deitado de costas (k = 0) ou sentado (k = 1): o quadril é o pivô (como na abertura de Betânia)
function deita(st, base, yaw, k) {
  const H = 0.55, a = -Math.PI / 2 * (1 - k), hy = 0.18 + (H - 0.18) * k;
  st.o.rotation.set(a, yaw, 0);
  const q = new THREE.Quaternion().setFromEuler(st.o.rotation), quadril = V3(0, H, 0).applyQuaternion(q);
  st.o.position.set(base.x - quadril.x, base.y + hy - quadril.y, base.z - quadril.z);
}
const LUGAR3 = TRES_ST.map((st) => TRES.clone().addScaledVector(LAT_T, (st.i - 1) * 1.1).addScaledVector(DIR_T, 0.9 + (st.i % 2) * 0.5));
function montaTres() {
  noite(true); jog.o.visible = false;
  for (const [k, st] of TRES_ST.entries()) { st.o.visible = true; st.toca('Parado'); st.A.Parado.timeScale = 0.25; deita(st, LUGAR3[k], Math.atan2(LAT_T.x, LAT_T.z) + (k - 1) * 0.5, 0); }
  CENA.sub = 'dormem'; CENA.t = 0; fala('E, voltando, achou-os dormindo (Mc 14.37)');
}
function desfazTres() {
  noite(false); for (const st of TRES_ST) { st.o.visible = false; st.o.rotation.set(0, 0, 0); st.A.Parado.timeScale = 1; }
  for (const t of TOCHAS) { t.g.visible = false; t.st.o.visible = false; t.g.children[0].intensity = 0; } jog.o.visible = true; fala('');
}
function tresPasso(dt) {
  const T = (CENA.t += dt);
  if (CENA.sub === 'dormem' && T > 3.2) { CENA.sub = 'simao'; CENA.t = 0; fala('“Simão, dormes? Não pudeste vigiar uma hora?” (Mc 14.37)'); }
  else if (CENA.sub === 'simao') {
    const k = THREE.MathUtils.smoothstep(T, 1.0, 2.6); deita(PEDRO, LUGAR3[0], Math.atan2(LAT_T.x, LAT_T.z) - 0.5, k * 0.85);      // Pedro acorda e senta
    if (T > 4.2) { CENA.sub = 'vigiai'; CENA.t = 0; fala('“Vigiai e orai, para que não entreis em tentação; o espírito na verdade está pronto, mas a carne é fraca.” (Mc 14.38)'); }
  } else if (CENA.sub === 'vigiai' && T > 5.5) {
    CENA.sub = 'tochas'; CENA.t = 0; fala('“Levantai-vos, vamos; eis que está perto o que me trai.” (Mc 14.42)');
    for (const [i, t] of TOCHAS.entries()) { const p = PORTAO.clone().add(V3(2.5 + i * 0.9, 0, (i % 2) * 0.9 - 0.4)); t.st.o.position.copy(p); chao(t.st); t.st.o.visible = true; t.g.visible = true; t.g.children[0].intensity = 6; }
  } else if (CENA.sub === 'tochas') {
    for (const [i, t] of TOCHAS.entries()) { const alvo = PORTAO.clone().add(V3(-3 - i * 0.9, 0, (i % 2) * 0.9 - 0.4)); anda(t.st, alvo, dt, 1.4); const m = t.st.o.getObjectByName('hand_r'); (m ? t.g.position.copy(pos(m)).add(V3(0, 0.35, 0)) : t.g.position.copy(t.st.o.position).add(V3(0, 2, 0))); t.g.children[0].intensity = 5 + Math.sin(performance.now() * 0.02 + i) * 1.2; }
    for (const st of TRES_ST.slice(1)) { const k = THREE.MathUtils.smoothstep(T, 0.5, 2.0); deita(st, LUGAR3[st.i], Math.atan2(LAT_T.x, LAT_T.z) + (st.i - 1) * 0.5, k * 0.85); }
    if (T > 5.0 && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazTres(); CENA.sub = ''; CENA.fase = 'livre'; }); }
  }
}
function cenaTres() {
  CENA.fase = 'tres'; CENA.sub = 'entra'; CENA.saindo = false;
  const yPov = Math.atan2(-DIR_T.x, -DIR_T.z) * DEG;      // de onde ele chegou (da rocha), olhando os três
  const grupo = () => TRES.clone().addScaledVector(DIR_T, 1.0).setY(TRES.y + 0.4);
  CINE.roda([
    { alvo: () => TRES.clone().setY(TRES.y + 1.2), dist: 8, el: 18, yaw: YAW_QUINA, k: 2, ate: () => CENA.sub === 'dormem' },
    { alvo: grupo, dist: 6, el: 16, yaw: yPov, corte: true, k: 2, kd: 0.35, ate: () => CENA.sub === 'simao' },
    { alvo: cab(PEDRO, -0.1), dist: 2.8, el: 30, yaw: yPov + 40, k: 1.5, kd: 1, ate: () => CENA.sub === 'vigiai' },
    { alvo: grupo, dist: 3.6, el: 24, yaw: yPov - 25, k: 1.2, kd: 0.8, ate: () => CENA.sub === 'tochas' },
    { alvo: () => PORTAO.clone().setY(PORTAO.y + 1.4), dist: 11, el: 12, yaw: () => Math.atan2(TRES.x - PORTAO.x, TRES.z - PORTAO.z) * DEG, corte: true, k: 1.5, kd: 1, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazTres(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.5, () => LEMB.entra('Quinta-feira, perto da meia-noite', montaTres));
}

function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (!LEMB.on) return;
  if (CENA.fase === 'rocha') rochaPasso(dt);
  else if (CENA.fase === 'tres') tresPasso(dt);
}

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __ROCHA: cenaRocha, __TRES: cenaTres, __CENA: CENA, __LEMB: LEMB, __FL: Object.fromEntries(TRES_ST.map((s, i) => ['d' + i, s])) });
export { cenasPasso, cenaRocha, cenaTres, CINE, CENA };
