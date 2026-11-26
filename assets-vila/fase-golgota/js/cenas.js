// Gólgota: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro está em fase-golgota/roteiro.md.
//  1. Chegada: o lugar da Caveira e os pontos de interesse (as cruzes, o sepulcro, a estrada de Emaús, onde Cléopas
//     espera).
//  2. As cruzes: a lembrança da sexta: junto à cruz, a mãe e o discípulo; "Mulher, eis aí o teu filho"; "Está
//     consumado" (Jo 19.25-30). A câmera fica no alto da cruz do meio, olhando para baixo; ele não aparece.
//  3. A pedra: a lembrança da sexta à tarde: José e Nicodemos rolam a pedra; as mulheres assentadas defronte
//     (Mt 27.59-61). E a madrugada de domingo: o terremoto, o anjo revolve a pedra, os guardas caem (Mt 28.2-4).
//  4. Cléopas, à beira da estrada de Emaús, como combinado em Betânia: conversam e seguem (Lc 24.13).
import * as THREE from 'three';
import { pos, lerpAng } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, renderer, LAY, DE, sun, hemi, conversa } from './estado.js';
import { terreno, TERRENO, TUM, AMOS } from './cenario.js';
import { ator, anda } from './gente.js';
import { nJoao, nMaria, nSoldado, nSoldado2, nMae, nOutra, nJose, nNicodemos, gCleo } from './modelos.js';
import { CONVERSAS, soldadoHorto, soldadoGolgota, maria } from './npcs.js';
import { jog, camera, CAM } from './jogador.js';

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const CINE = criaCine({ camera, E, chao: (x, z) => terreno(x, z), obstaculos: malhasAltas(scene, [TERRENO]), deOnde: () => ({ alvo: CAM.olho.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);
const CENA = { fase: '', sub: '', t: 0, emaus: null };
let AGENDA = []; const depois = (s, fn) => AGENDA.push({ s, fn });
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + 1.5); p.y += dy; return p; };
const naTerra = (x, z, dy = 0) => V3(x, terreno(x, z) + dy, z);
const yawDe = (de, para) => Math.atan2(para.x - de.x, para.z - de.z) * DEG;
const YAW_QUINA = Math.atan2(1, 0.3) * DEG;
const poe = (st, p, olhar) => { st.o.position.copy(p); st.o.position.y = terreno(p.x, p.z); st.o.visible = true; if (olhar) st.o.rotation.y = Math.atan2(olhar.x - p.x, olhar.z - p.z); };
const [cx, cy, cz] = LAY.cruzes, CRUZ = V3(cx, cy, cz);
const SEP = TUM.boca.clone(), F = TUM.frente.clone(), LAT = V3(-F.z, 0, F.x);
const iCleo = AMOS.length - 16, CLEO_P = AMOS[iCleo].clone(); CLEO_P.y = terreno(CLEO_P.x, CLEO_P.z);
// ---------- a escuridão (sexta, da hora sexta à nona) e o tremor ----------
const ESC = { salvo: null }, TREMOR = { f: 0 };
function escuro(on, cor = 0x231c16) {
  if (on) { ESC.salvo = { bg: scene.background, fog: scene.fog.color.clone(), s: sun.intensity, h: hemi.intensity }; scene.background = new THREE.Color(cor); scene.fog.color.set(cor); sun.intensity = 0.6; hemi.intensity = 0.55; }
  else if (ESC.salvo) { const s = ESC.salvo; scene.background = s.bg; scene.fog.color.copy(s.fog); sun.intensity = s.s; hemi.intensity = s.h; ESC.salvo = null; }
}
function tremor() { if (TREMOR.f > 0) camera.position.add(V3((Math.random() - 0.5) * TREMOR.f * 6, (Math.random() - 0.5) * TREMOR.f * 4, (Math.random() - 0.5) * TREMOR.f * 6)); }

// ---------- 4. Cléopas, à espera na estrada de Emaús ----------
const cleopas = ator(gCleo, 1.72, CLEO_P.x, CLEO_P.z, 0, 'Parado');
{ const a = AMOS[iCleo - 6]; cleopas.o.rotation.y = Math.atan2(a.x - CLEO_P.x, a.z - CLEO_P.z); }      // olhando para quem vem da cidade
const FALAS_CLEO = [
  'Você veio! Eu já estava ficando aflito.',
  'Escute: algumas mulheres do nosso grupo foram de madrugada ao sepulcro e não acharam o corpo. Voltaram dizendo que viram anjos, que dizem que ele vive (Lc 24.22-23).',
  'Alguns dos nossos foram lá e acharam tudo como as mulheres disseram; mas a ele não viram (Lc 24.24).',
  { txt: 'E você, o que viu pelo caminho?', op: [['Os lençóis no sepulcro vazio', []], ['Ainda não sei o que pensar', []]] },
  'Eu também não. Vamos para Emaús: são uns sessenta estádios (Lc 24.13). No caminho conversamos sobre tudo isso que aconteceu (Lc 24.14).',
];
function cenaCleopas() {
  CENA.fase = 'cleopas';
  const dois = () => cab(cleopas, -0.2)().lerp(cab(jog, -0.2)(), 0.5);
  CINE.roda([
    { alvo: () => cab(cleopas, -0.3)(), dist: 7, el: 10, yaw: () => yawDe(cleopas.o.position, jog.o.position) + 25, corte: true, k: 2.5, ate: () => CENA.sub === 'fala' },
    { alvo: dois, dist: 4.2, el: 8, yaw: () => yawDe(cleopas.o.position, jog.o.position) + 75, k: 2, kd: 1.5, ate: () => CENA.sub === 'fim' },
  ], () => { CENA.fase = 'livre'; if (CENA.emaus) CENA.emaus(); }, { aoPular: () => { CENA.sub = 'fim'; } });
  CENA.sub = 'vem';
}
function cleopasPasso(dt) {
  if (CENA.sub === 'vem') {
    lerpAng(jog.o, Math.atan2(cleopas.o.position.x - jog.o.position.x, cleopas.o.position.z - jog.o.position.z), Math.min(1, dt * 4)); jog.toca('Parado');
    const alvo = jog.o.position.clone().addScaledVector(cleopas.o.position.clone().sub(jog.o.position).setY(0).normalize(), 1.4);
    if (anda(cleopas, alvo, dt, 2.2)) { cleopas.toca('Conversando'); CENA.sub = 'fala'; conversa('Cléopas', FALAS_CLEO, () => { cleopas.toca('Parado'); CENA.sub = 'fim'; }); }
    cleopas.o.position.y = terreno(cleopas.o.position.x, cleopas.o.position.z);
  } else if (CENA.sub === 'fala') lerpAng(cleopas.o, Math.atan2(jog.o.position.x - cleopas.o.position.x, jog.o.position.z - cleopas.o.position.z), Math.min(1, dt * 4));
}

// ---------- 1. chegada ----------
if (DE !== 'emaus' && DE !== 'sepulcro') {
  CENA.fase = 'chegada';
  CINE.roda([
    { alvo: () => CRUZ.clone().setY(CRUZ.y + 2), dist: 40, el: 18, yaw: YAW_QUINA, k: 1.2, kd: 0.6, titulo: 'O lugar chamado Caveira', dur: 3.8,
      aoEntrar: () => depois(0.6, () => fala('Domingo, ao nascer do sol. Fora da porta da cidade, à beira da estrada, numa pedreira velha, fica o lugar chamado Caveira.')) },
    { alvo: () => CRUZ.clone().setY(CRUZ.y + 2.5), dist: 12, el: 10, yaw: YAW_QUINA - 10, corte: true, k: 2, kd: 1, titulo: 'As cruzes', dur: 3.0, aoEntrar: () => fala('') },
    { alvo: () => SEP.clone().setY(SEP.y + 1.3), dist: 10, el: 14, yaw: Math.atan2(F.x, F.z) * DEG + 20, corte: true, k: 2, kd: 1, titulo: 'O sepulcro no horto', dur: 3.0 },
    { alvo: cab(cleopas, -0.2), dist: 6, el: 10, yaw: () => cleopas.o.rotation.y * DEG + 25, corte: true, k: 2, kd: 1, titulo: 'A estrada de Emaús: Cléopas espera', dur: 3.2 },
  ], () => { fala(''); CENA.fase = 'livre'; }, { aoPular: () => { AGENDA = []; } });
} else CENA.fase = 'livre';

// ---------- 2. as cruzes (Jo 19.25-30) ----------
const MAE = ator(nMae, 1.55, 0, 0, 0, 'Parado'), JOAO = ator(nJoao, 1.66, 0, 0, 0, 'Parado'), MADA = ator(nMaria, 1.5, 0, 0, 0, 'Parado'), OUTRA = ator(nOutra, 1.55, 0, 0, 0, 'Parado');
for (const st of [MAE, JOAO, MADA, OUTRA]) st.o.visible = false;
const CIMA = CRUZ.clone().setY(CRUZ.y + 3.3);         // onde ele estava, no alto da cruz do meio
const PE_CRUZ = (l, f) => naTerra(CRUZ.x + 2.0 + f, CRUZ.z + l);
function montaCruzes() {
  jog.o.visible = false; soldadoGolgota.o.visible = false; escuro(true);
  poe(MAE, PE_CRUZ(-0.4, 0), CRUZ); poe(JOAO, PE_CRUZ(0.45, 0.2), CRUZ); poe(MADA, PE_CRUZ(-1.3, 0.7), CRUZ); poe(OUTRA, PE_CRUZ(1.3, 0.9), CRUZ);
  CENA.sub = 'junto'; CENA.t = 0; fala('Junto à cruz de Jesus estavam sua mãe, a irmã de sua mãe, Maria, mulher de Clopas, e Maria Madalena. (Jo 19.25)');
}
function desfazCruzes() { for (const st of [MAE, JOAO, MADA, OUTRA]) st.o.visible = false; escuro(false); TREMOR.f = 0; jog.o.visible = true; soldadoGolgota.o.visible = true; fala(''); }
function cruzesPasso(dt) {
  const T = (CENA.t += dt);
  if (CENA.sub === 'junto' && T > 4.5) { CENA.sub = 'mulher'; CENA.t = 0; fala('“Mulher, eis aí o teu filho.” (Jo 19.26)'); }
  else if (CENA.sub === 'mulher' && T > 3.2) { CENA.sub = 'mae'; CENA.t = 0; fala('E disse ao discípulo: “Eis aí tua mãe.” E desde aquela hora o discípulo a recebeu em sua casa. (Jo 19.27)'); lerpAng(JOAO.o, Math.atan2(MAE.o.position.x - JOAO.o.position.x, MAE.o.position.z - JOAO.o.position.z), 1); }
  else if (CENA.sub === 'mae' && T > 5.0) { CENA.sub = 'consumado'; CENA.t = 0; fala('“Está consumado.” E, inclinando a cabeça, entregou o espírito. (Jo 19.30)'); }
  else if (CENA.sub === 'consumado') {
    TREMOR.f = T > 1.5 && T < 5 ? 0.05 : 0;
    if (T > 1.5 && !CENA.f1) { CENA.f1 = true; fala('E a terra tremeu, e fenderam-se as pedras. (Mt 27.51)'); }
    if (T > 6.0 && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazCruzes(); CENA.sub = ''; CENA.fase = 'livre'; }); }
  }
}
function cenaCruzes() {
  CENA.fase = 'cruzes'; CENA.sub = 'entra'; CENA.saindo = false; CENA.f1 = false;
  const grupo = () => PE_CRUZ(0, 0.3).setY(terreno(CRUZ.x + 2.3, CRUZ.z) + 1.1);
  const dGrupo = () => CIMA.distanceTo(grupo());
  CINE.roda([
    { alvo: () => CRUZ.clone().setY(CRUZ.y + 2), dist: 10, el: 12, yaw: YAW_QUINA, k: 2, ate: () => CENA.sub === 'junto' },
    // de baixo: as cruzes contra o céu escuro, e eles ao pé
    { alvo: () => CRUZ.clone().setY(CRUZ.y + 2.2), dist: 9, el: 4, yaw: YAW_QUINA + 15, corte: true, fixo: true, k: 1.5, kd: 0.6, ate: () => CENA.sub === 'mulher' },
    // do alto da cruz, olhando para baixo: a mãe e o discípulo
    { alvo: grupo, dist: dGrupo(), el: -Math.asin((CIMA.y - grupo().y) / dGrupo()) * DEG, yaw: yawDe(grupo(), CIMA), corte: true, fixo: true, k: 3, kd: 3, ate: () => CENA.sub === 'consumado' },
    { alvo: () => CRUZ.clone().setY(CRUZ.y + 2.6), dist: 13, el: 6, yaw: YAW_QUINA - 20, corte: true, fixo: true, k: 1, kd: 0.5, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazCruzes(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.5, () => LEMB.entra('Sexta-feira, à hora nona', montaCruzes));
}

// ---------- 3. a pedra (Mt 27.59-61; 28.2-4) ----------
const JOSE = ator(nJose, 1.74, 0, 0, 0, 'Parado'), NICO = ator(nNicodemos, 1.72, 0, 0, 0, 'Parado');
const GUARDAS = [ator(nSoldado, 1.74, 0, 0, 0, 'Parado'), ator(nSoldado2, 1.72, 0, 0, 0, 'Parado')];
for (const st of [JOSE, NICO, ...GUARDAS]) { st.o.visible = false; st.o.rotation.order = 'YXZ'; }
const PEDRA = TUM.pedra, P_ABERTA = PEDRA.position.clone(), Q_ABERTA = PEDRA.quaternion.clone();
const P_FECHADA = V3(0, P_ABERTA.y, P_ABERTA.z);      // diante da porta (no espaço do túmulo)
const RAIO = (() => { const b = new THREE.Box3().setFromObject(PEDRA); return (b.max.y - b.min.y) / 2 / (TUM.tum.scale.y || 1); })();
const LUZ_ANJO = new THREE.PointLight(0xfff6dc, 0, 16, 1.2); scene.add(LUZ_ANJO);
// k: 0 aberta (como está), 1 fechada; a pedra rola girando sobre si
function pedra(k) {
  PEDRA.position.lerpVectors(P_ABERTA, P_FECHADA, k);
  const rolou = (P_FECHADA.x - P_ABERTA.x) * k;
  PEDRA.quaternion.copy(Q_ABERTA).multiply(new THREE.Quaternion().setFromAxisAngle(V3(0, 0, 1), -rolou / Math.max(0.3, RAIO)));
}
const ladoPedra = Math.sign(P_ABERTA.x || 1);      // de que lado a pedra fica aberta
const NO_TUM = (lx, lz) => { const p = V3(lx, 0, lz).applyMatrix4(TUM.tum.matrixWorld); p.y = terreno(p.x, p.z); return p; };
function montaPedra() {
  jog.o.visible = false; maria.o.visible = false; soldadoHorto.o.visible = false; escuro(true, 0x5a3b26); sun.intensity = 1.1;      // o fim da tarde
  pedra(0); CENA.k = 0;
  poe(JOSE, NO_TUM(P_ABERTA.x + ladoPedra * 1.2, 0.9), SEP); poe(NICO, NO_TUM(P_ABERTA.x + ladoPedra * 1.3, 1.8), SEP);
  poe(MADA, SEP.clone().addScaledVector(F, 7).addScaledVector(LAT, -1.2), SEP); poe(OUTRA, SEP.clone().addScaledVector(F, 7.3).addScaledVector(LAT, 0.2), SEP);
  CENA.sub = 'rola'; CENA.t = 0; fala('José tomou o corpo, envolveu-o num lençol limpo e o pôs no seu sepulcro novo, aberto em rocha. (Mt 27.59-60)');
}
function desfazPedra() {
  for (const st of [JOSE, NICO, MADA, OUTRA, ...GUARDAS]) { st.o.visible = false; st.o.rotation.x = 0; }
  pedra(0); LUZ_ANJO.intensity = 0; escuro(false); TREMOR.f = 0; jog.o.visible = true; maria.o.visible = true; soldadoHorto.o.visible = true; fala('');
}
function pedraPasso(dt) {
  const T = (CENA.t += dt);
  if (CENA.sub === 'rola') {
    CENA.k = Math.min(1, CENA.k + dt / 3.2); pedra(THREE.MathUtils.smoothstep(CENA.k, 0, 1));
    for (const [i, st] of [JOSE, NICO].entries()) { const p = NO_TUM(PEDRA.position.x + ladoPedra * (RAIO + 0.45), 0.9 + i * 0.9); anda(st, p, dt, 0.8, 'Andar'); const c = PEDRA.getWorldPosition(V3()); st.o.rotation.y = Math.atan2(c.x - st.o.position.x, c.z - st.o.position.z); }
    if (T > 3.0 && !CENA.f1) { CENA.f1 = true; fala('…e, rolando uma grande pedra para a porta do sepulcro, retirou-se. (Mt 27.60)'); }
    if (T > 5.5) { CENA.sub = 'mulheres'; CENA.t = 0; JOSE.toca('Parado'); NICO.toca('Parado'); fala('E estavam ali Maria Madalena e a outra Maria, assentadas defronte do sepulcro. (Mt 27.61)'); }
  } else if (CENA.sub === 'mulheres' && T > 4.5) {
    // a madrugada do domingo: a guarda diante da pedra selada
    CENA.sub = 'guarda'; CENA.t = 0; escuro(false); escuro(true, 0x101a30); sun.intensity = 0.5; hemi.intensity = 0.45;
    for (const st of [JOSE, NICO, MADA, OUTRA]) st.o.visible = false;
    poe(GUARDAS[0], SEP.clone().addScaledVector(F, 2.6).addScaledVector(LAT, -1.4)); poe(GUARDAS[1], SEP.clone().addScaledVector(F, 3.0).addScaledVector(LAT, 1.3));
    for (const g of GUARDAS) g.o.rotation.set(0, Math.atan2(F.x, F.z), 0);
    fala('No domingo, de madrugada, a pedra selada e a guarda diante dela. (Mt 27.66)');
  } else if (CENA.sub === 'guarda' && T > 3.5) { CENA.sub = 'terremoto'; CENA.t = 0; fala('E eis que houve um grande terremoto, porque um anjo do Senhor, descendo do céu, chegou, removeu a pedra e sentou-se sobre ela. (Mt 28.2)'); }
  else if (CENA.sub === 'terremoto') {
    TREMOR.f = T < 4 ? 0.06 : 0;
    LUZ_ANJO.position.copy(SEP).addScaledVector(F, 1.2).add(V3(0, 2.6, 0)); LUZ_ANJO.intensity += (30 - LUZ_ANJO.intensity) * Math.min(1, dt * 2);
    CENA.k = Math.max(0, CENA.k - dt / 2.4); pedra(THREE.MathUtils.smoothstep(CENA.k, 0, 1));
    for (const [i, g] of GUARDAS.entries()) { const k = THREE.MathUtils.smoothstep(T, 1.2 + i * 0.3, 2.4 + i * 0.3); g.o.rotation.x = -Math.PI / 2 * k; g.o.position.y = terreno(g.o.position.x, g.o.position.z) + 0.15 * k; }
    if (T > 3.2 && !CENA.f2) { CENA.f2 = true; fala('E os guardas, com medo dele, ficaram muito assombrados, e como mortos. (Mt 28.4)'); }
    if (T > 7.5 && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazPedra(); CENA.sub = ''; CENA.fase = 'livre'; }); }
  }
}
function cenaPedra() {
  CENA.fase = 'pedra'; CENA.sub = 'entra'; CENA.saindo = false; CENA.f1 = CENA.f2 = false;
  const yF = Math.atan2(F.x, F.z) * DEG;
  CINE.roda([
    { alvo: () => SEP.clone().setY(SEP.y + 1.2), dist: 8, el: 14, yaw: yF + 20, k: 2, ate: () => CENA.sub === 'rola' },
    { alvo: () => PEDRA.getWorldPosition(V3()).lerp(SEP, 0.3).setY(SEP.y + 1.1), dist: 7, el: 10, yaw: yF + 30 * ladoPedra, corte: true, fixo: true, k: 1.5, kd: 1, ate: () => CENA.sub === 'mulheres' },
    // as mulheres, vistas da porta do sepulcro
    { alvo: () => SEP.clone().addScaledVector(F, 7).setY(terreno(SEP.x + F.x * 7, SEP.z + F.z * 7) + 0.9), dist: 5, el: 10, yaw: yF + 180, corte: true, k: 1.5, kd: 0.8, ate: () => CENA.sub === 'guarda' },
    { alvo: () => SEP.clone().setY(SEP.y + 1.3), dist: 10, el: 10, yaw: yF + 15, corte: true, fixo: true, k: 2, kd: 0.6, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazPedra(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.5, () => LEMB.entra('Sexta-feira, ao fim da tarde', montaPedra));
}
CONVERSAS.find((c) => c.nome === 'as cruzes').cena = cenaCruzes;
CONVERSAS.find((c) => c.nome === 'a pedra rolada').cena = cenaPedra;

function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (CENA.fase === 'livre' && !E.cine && !E.fora && !CENA.cleoFeito && jog.o.position.distanceTo(cleopas.o.position) < 9) { CENA.cleoFeito = true; cenaCleopas(); }
  if (CENA.fase === 'cleopas') cleopasPasso(dt);
  if (!LEMB.on) return;
  if (CENA.fase === 'cruzes') cruzesPasso(dt);
  else if (CENA.fase === 'pedra') pedraPasso(dt);
}

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __CRUZES: cenaCruzes, __PEDRA: cenaPedra, __CENA: CENA, __LEMB: LEMB, __FL: { mae: MAE, joao: JOAO, jose: JOSE, cleopas } });
export { cenasPasso, tremor, CINE, CENA, cleopas };
