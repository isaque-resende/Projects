// Cidade alta: a chegada (a câmera apresenta a praça e os pontos de interesse) e a lembrança do pátio do sumo
// sacerdote: Pedro junto ao braseiro, as três negações, o galo, o olhar do Senhor e o choro (Mc 14.66-72; Lc 22.54-62).
// Jesus não aparece: no olhar, a câmera fica onde ele estava, do lado da casa, olhando Pedro. O roteiro está em
// fase-cidade/roteiro.md; as cenas da manhã (Maria, Pedro e João, as mulheres) estão em npcs.js.
import * as THREE from 'three';
import { pos, lerpAng } from '../../limpo-motor/atores.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, renderer, LAY, DE, sun, hemi, V3 } from './estado.js';
import { terreno } from './cenario.js';
import { ator, anda } from './gente.js';
import { nPedro, nServa, nAldeao, nMoco, nGuarda } from './modelos.js';
import { CONVERSAS, serva } from './npcs.js';
import { roda } from './cine.js';
import { jog } from './jogador.js';

const DEG = 180 / Math.PI;
const LEMB = criaLembranca(renderer.domElement);
const L = { fase: '', sub: '', t: 0 };
const naTerra = (x, z, dy = 0) => V3(x, terreno(x, z) + dy, z);
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + 1.5); p.y += dy; return p; };
const p3 = (k, dy = 0) => naTerra(LAY[k][0], LAY[k][2], dy);
const BRAS = p3('braseiro'), CAIFAS = p3('caifas'), CEN = p3('cenaculo'), GENAT = p3('genat'), PONTE = p3('ponte');

// ---------- a chegada (vindo do templo, pelo viaduto) ----------
if (!DE) {
  roda([
    { alvo: () => V3(-4, terreno(-4, -38) + 1.5, -38), dist: 26, el: 42, yaw: 30, corte: true, k: 1.2, kd: 0.6, titulo: 'A cidade alta', dur: 3.8,
      aoEntrar: () => setTimeout(() => fala('Domingo, de manhã cedo. Uma praça da cidade alta: a oeste, o palácio de Herodes; ao norte, a Porta de Genat; ao sul, a casa onde os discípulos estão escondidos.'), 600) },
    { alvo: () => CEN.clone().setY(CEN.y + 2.5), dist: 14, el: 18, yaw: 165, corte: true, k: 2, kd: 1, titulo: 'A casa da sala de cima', dur: 3.2, aoEntrar: () => fala('') },
    { alvo: () => BRAS.clone().setY(BRAS.y + 1), dist: 9, el: 22, yaw: 230, corte: true, k: 2, kd: 1, titulo: 'O pátio do sumo sacerdote', dur: 3.2 },
    { alvo: () => GENAT.clone().add(V3(0, 1.8, 1.5)), dist: 15, el: 13, yaw: 0, corte: true, k: 2, kd: 1, titulo: 'A Porta de Genat: para o Gólgota', dur: 3.0 },
  ], () => fala(''), { aoPular: () => fala('') });
}

// ---------- a noite de quinta ----------
const NOITE = { salvo: null };
function noite(on) {
  if (on) { NOITE.salvo = { bg: scene.background, fog: scene.fog.color.clone(), h: hemi.intensity, s: sun.intensity, sc: sun.color.clone() }; scene.background = new THREE.Color(0x0d1426); scene.fog.color.set(0x0d1426); hemi.intensity = 0.45; sun.intensity = 0.6; sun.color.set(0x9fb4e8); }
  else if (NOITE.salvo) { const s = NOITE.salvo; scene.background = s.bg; scene.fog.color.copy(s.fog); hemi.intensity = s.h; sun.intensity = s.s; sun.color.copy(s.sc); NOITE.salvo = null; }
}
const FOGO = new THREE.PointLight(0xff8a3a, 0, 9, 1.4); scene.add(FOGO);

// ---------- Pedro no pátio (Mc 14.66-72; Lc 22.54-62) ----------
const PEDRO = ator(nPedro, 1.72, 0, 0, 0, 'Parado'), SERVA = ator(nServa, 1.6, 0, 0, 0, 'Parado');
const SERVOS = [ator(nAldeao, 1.7, 0, 0, 0, 'Parado'), ator(nMoco, 1.68, 0, 0, 0, 'Parado'), ator(nGuarda, 1.72, 0, 0, 0, 'Parado')];
for (const st of [PEDRO, SERVA, ...SERVOS]) st.o.visible = false;
const roda_ = (a, r) => BRAS.clone().add(V3(Math.cos(a) * r, 0, Math.sin(a) * r));
const olhaPara = (st, p) => { st.o.rotation.y = Math.atan2(p.x - st.o.position.x, p.z - st.o.position.z); };
const poe = (st, p) => { st.o.position.copy(p); st.o.position.y = terreno(p.x, p.z); st.o.visible = true; olhaPara(st, BRAS); st.toca('Parado'); };
const DE_CASA = CAIFAS.clone().lerp(BRAS, 0.25);       // de onde ele olhou (do lado da casa)
function montaPedro() {
  jog.o.visible = false; serva.o.visible = false; noite(true); FOGO.position.copy(BRAS).add(V3(0, 0.8, 0)); FOGO.intensity = 6;
  poe(PEDRO, roda_(0.4, 1.3)); SERVOS.forEach((st, i) => poe(st, roda_(1.8 + i * 1.5, 1.4)));
  poe(SERVA, roda_(-2.2, 4.5)); SERVA.i = 0;
  L.sub = 'fogo'; L.t = 0; fala('E Pedro estava embaixo, no pátio, aquentando-se ao lume. (Mc 14.66-67)');
}
function desfazPedro() { for (const st of [PEDRO, SERVA, ...SERVOS]) st.o.visible = false; noite(false); FOGO.intensity = 0; jog.o.visible = true; serva.o.visible = true; fala(''); }
const FALAS = [   // [quando (s desde o começo), sub, legenda]
  [3.5, 'serva', 'Uma das criadas, vendo Pedro, disse: “Tu também estavas com Jesus, o Nazareno.” (Mc 14.67)'],
  [7.5, 'nega1', 'Pedro: “Não o conheço, nem sei o que dizes.” (Mc 14.68)'],
  [11.0, 'nega2', '“Este é um deles.” E ele negou outra vez. (Mc 14.69-70)'],
  [15.0, 'nega3', '“Verdadeiramente és um deles, porque és galileu.” E ele começou a praguejar: “Não conheço esse homem de quem falais.” (Mc 14.70-71)'],
  [20.0, 'galo', 'E o galo cantou pela segunda vez. (Mc 14.72)'],
  [23.0, 'olhar', 'E, virando-se o Senhor, olhou para Pedro. (Lc 22.61)'],
  [27.5, 'chora', 'E Pedro lembrou-se da palavra: “Antes que o galo cante duas vezes, três vezes me negarás.” E, saindo dali, chorou amargamente. (Mc 14.72; Lc 22.62)'],
];
function pedroPasso(dt) {
  const T = (L.t += dt);
  FOGO.intensity = 6 + Math.sin(T * 9) * 0.8 + Math.sin(T * 23) * 0.4;
  while (L.k < FALAS.length && T >= FALAS[L.k][0]) { const [, sub, txt] = FALAS[L.k++]; L.sub = sub; fala(txt); }
  if (L.sub !== 'fogo' && SERVA.i === 0) { if (anda(SERVA, roda_(0.0, 2.0), dt, 1.1)) { SERVA.i = 1; SERVA.toca('Conversando'); } SERVA.o.position.y = terreno(SERVA.o.position.x, SERVA.o.position.z); }
  if (SERVA.i === 1) lerpAng(SERVA.o, Math.atan2(PEDRO.o.position.x - SERVA.o.position.x, PEDRO.o.position.z - SERVA.o.position.z), Math.min(1, dt * 5));
  if (['nega1', 'nega2', 'nega3'].includes(L.sub)) { PEDRO.toca('Conversando'); lerpAng(PEDRO.o, Math.atan2(SERVA.o.position.x - PEDRO.o.position.x, SERVA.o.position.z - PEDRO.o.position.z), Math.min(1, dt * 4)); }
  if (L.sub === 'nega2' || L.sub === 'nega3') for (const st of SERVOS) lerpAng(st.o, Math.atan2(PEDRO.o.position.x - st.o.position.x, PEDRO.o.position.z - st.o.position.z), Math.min(1, dt * 3));
  if (L.sub === 'galo' || L.sub === 'olhar') { PEDRO.toca('Parado'); lerpAng(PEDRO.o, Math.atan2(DE_CASA.x - PEDRO.o.position.x, DE_CASA.z - PEDRO.o.position.z), Math.min(1, dt * 3)); }
  if (L.sub === 'chora') { anda(PEDRO, BRAS.clone().add(V3(-7, 0, -3)), dt, 0.8); PEDRO.o.position.y = terreno(PEDRO.o.position.x, PEDRO.o.position.z); }
  if (T > 33 && !L.saindo) { L.saindo = true; LEMB.sai(() => { desfazPedro(); L.sub = ''; L.fase = ''; }); }
}
function cenaPedro() {
  L.fase = 'pedro'; L.sub = 'entra'; L.saindo = false; L.k = 0;
  const yCasa = Math.atan2(DE_CASA.x - BRAS.x, DE_CASA.z - BRAS.z) * DEG;
  roda([
    { alvo: () => BRAS.clone().setY(BRAS.y + 1), dist: 7, el: 18, yaw: 230, k: 2, ate: () => L.sub === 'fogo' },
    { alvo: () => BRAS.clone().setY(BRAS.y + 1.1), dist: 6.5, el: 14, yaw: 230, corte: true, k: 1.5, kd: 1, ate: () => L.sub === 'serva' },
    { alvo: () => cab(PEDRO, -0.2)().lerp(cab(SERVA, -0.2)(), 0.4), dist: 4, el: 8, yaw: () => Math.atan2(PEDRO.o.position.x - SERVA.o.position.x, PEDRO.o.position.z - SERVA.o.position.z) * DEG + 30, k: 2, kd: 1.4, ate: () => L.sub === 'nega3' },
    { alvo: cab(PEDRO, -0.15), dist: 2.8, el: 6, yaw: () => PEDRO.o.rotation.y * DEG + 25, k: 2, kd: 1.5, ate: () => L.sub === 'galo' },
    { alvo: () => BRAS.clone().setY(BRAS.y + 2.5), dist: 10, el: 22, yaw: 230, corte: true, k: 1.5, kd: 0.8, ate: () => L.sub === 'olhar' },
    // do lado da casa, onde ele estava: olhando Pedro (a lente fecha)
    { alvo: cab(PEDRO, -0.1), dist: DE_CASA.distanceTo(BRAS) + 1, el: 3, yaw: yCasa, corte: true, fixo: true, zoom: 0.55, k: 2, kd: 2, ate: () => L.sub === 'chora' },
    { alvo: cab(PEDRO, -0.3), dist: 6, el: 12, yaw: () => PEDRO.o.rotation.y * DEG + 160, k: 1.4, kd: 0.8, ate: () => L.sub === '' },
  ], () => {}, { aoPular: () => { if (LEMB.on) { LEMB.desliga(); desfazPedro(); } L.sub = ''; L.fase = ''; } });
  setTimeout(() => LEMB.entra('Quinta-feira, de noite', montaPedro), 400);
}
CONVERSAS.find((c) => c.nome === 'o braseiro').cena = cenaPedro;

function lembrancasPasso(dt) { if (L.fase === 'pedro' && LEMB.on) pedroPasso(dt); }

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __PEDRO: cenaPedro, __LEMB: LEMB, __L: L });
export { lembrancasPasso, L };
