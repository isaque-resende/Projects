// Betesda: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro está em fase-betesda/roteiro.md.
//  1. Chegada (do Getsêmani): o tanque dos cinco alpendres e os pontos de interesse (o lugar do paralítico, a Porta das
//     Ovelhas).
//  2. O lugar do paralítico: a lembrança do sábado em que ele foi curado (Jo 5.2-9). A água se agita e outro desce antes
//     dele; "Senhor, não tenho homem algum"; "Levanta-te, toma o teu leito e anda". Jesus não aparece: a câmera fica
//     onde ele estava, de pé, olhando o homem deitado.
import * as THREE from 'three';
import { pos } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, renderer, LAY, DE } from './estado.js';
import { terreno, TERRENO } from './cenario.js';
import { ator, anda } from './gente.js';
import { nMagro, nRapaz } from './modelos.js';
import { AGITA, yEscada, zDegrau, MAT_ESTEIRA, CONVERSAS, aguadeira } from './npcs.js';
import { jog, camera, CAM } from './jogador.js';

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const CINE = criaCine({ camera, E, chao: (x, z) => terreno(x, z), obstaculos: malhasAltas(scene, [TERRENO]), deOnde: () => ({ alvo: CAM.olho.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);
const CENA = { fase: '', sub: '', t: 0 };
let AGENDA = []; const depois = (s, fn) => AGENDA.push({ s, fn });
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + 1.5); p.y += dy; return p; };
const DECK = LAY.deck, AGUA = LAY.agua;
const YAW_QUINA = Math.atan2(0.3, -0.95) * DEG;
const [tx, , tz] = LAY.tanque, [pa, , paz, pr] = LAY.paralitico, [ox, , oz] = LAY.porta;
const TANQUE = V3(tx, DECK, tz), PARAL = V3(pa, DECK, paz), PORTA = V3(ox, terreno(ox, oz), oz);

// o lado livre mais perto do pedido (o alpendre e os telhados tapavam a porta e o lugar do paralítico); fica com a
// escolha enquanto o mesmo plano dura
const LIVRE = new Map();
function livreDe(alvo, yaw0, el, d) {
  const k = yaw0 + ':' + d; if (LIVRE.has(k)) return LIVRE.get(k);
  const y = [0, 30, -30, 60, -60, 90, -90, 130, -130, 180].map((x) => yaw0 + x).find((y) => CINE.ve(alvo, y, el, d)) ?? yaw0;
  LIVRE.set(k, y); return y;
}
// ---------- 1. chegada ----------
if (DE !== 'templo' && DE !== 'golgota') {
  CENA.fase = 'chegada';
  CINE.roda([
    { alvo: () => TANQUE.clone().setY(DECK + 1), dist: 52, el: 32, yaw: YAW_QUINA, corte: true, k: 1.2, kd: 0.6, titulo: 'O Tanque de Betesda', dur: 3.8,
      aoEntrar: () => depois(0.6, () => fala('Junto à Porta das Ovelhas há um tanque, chamado em hebraico Betesda, o qual tem cinco alpendres. (Jo 5.2)')) },
    { alvo: () => PARAL.clone().setY(DECK + 0.6), dist: 8, el: 30, yaw: YAW_QUINA + 20, corte: true, k: 2, kd: 1, titulo: 'O lugar do paralítico', dur: 3.2, aoEntrar: () => fala('') },
    { alvo: () => PORTA.clone().setY(PORTA.y + 2), dist: 26, el: 50, yaw: Math.atan2(PORTA.x - TANQUE.x, PORTA.z - TANQUE.z) * 180 / Math.PI, corte: true, fixo: true,      // (de fora da porta, olhando para o tanque: de dentro, só se via o telhado do alpendre)
 k: 2, kd: 1, titulo: 'A Porta das Ovelhas: para o templo', dur: 3.0 },
  ], () => { fala(''); CENA.fase = 'livre'; }, { aoPular: () => { AGENDA = []; } });
} else CENA.fase = 'livre';

// ---------- 2. o paralítico ----------
const PARALITICO = ator(nMagro, 1.68, 0, 0, 0, 'Parado'), OUTRO = ator(nRapaz, 1.66, 0, 0, 0, 'Andar');
PARALITICO.o.visible = OUTRO.o.visible = false; PARALITICO.o.rotation.order = 'YXZ';
const ESTEIRA = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 1.9), MAT_ESTEIRA); ESTEIRA.visible = false; ESTEIRA.castShadow = ESTEIRA.receiveShadow = true; scene.add(ESTEIRA);
const ROLO = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.85, 8), MAT_ESTEIRA); ROLO.rotation.z = Math.PI / 2; ROLO.visible = false; ROLO.castShadow = true; scene.add(ROLO);
const LEITO = Math.PI / 2 - pr;      // a esteira fica ao comprido, de leste para oeste (como a marca no piso)
const PE = V3(Math.sin(LEITO), 0, Math.cos(LEITO));      // dos pés para a cabeça
// deitado (k = 0) ou sentado (k = 1), com o quadril como pivô
function deita(st, base, yaw, k) {
  const H = 0.55, a = -Math.PI / 2 * (1 - k), hy = 0.1 + (H - 0.1) * k;
  st.o.rotation.set(a, yaw, 0);
  const q = new THREE.Quaternion().setFromEuler(st.o.rotation), quadril = V3(0, H, 0).applyQuaternion(q);
  st.o.position.set(base.x - quadril.x, base.y + hy - quadril.y, base.z - quadril.z);
}
// quem desce antes dele: pela escadaria do sul, até a água
const DESCE = [V3(2.6, 0, -4.2), V3(2.6, 0, zDegrau(0) + 0.3), V3(2.6, 0, zDegrau(8)), V3(2.6, 0, zDegrau(8) - 1.6)];
const yDesce = (z) => (z > zDegrau(8) - 0.2 ? yEscada(z) : AGUA - 0.75);
// o lado da lente para quem desce: o que vê o caminho todo que falta (da escadaria até a água), não só onde ele está
function ladoRota() {
  if (LIVRE.has('20:9')) return LIVRE.get('20:9');
  const pts = [OUTRO.o.position.clone(), ...DESCE.slice(OUTRO.i || 0)].map((q) => V3(q.x, yDesce(q.z) + 1.0, q.z));
  let melhor = 20, mv = -1;
  for (const dy of [0, 30, -30, 60, -60, 90, -90, 130, -130, 180]) {
    const n = pts.filter((q) => CINE.ve(q, 20 + dy, 38, 9)).length;
    if (n > mv) { mv = n; melhor = 20 + dy; } if (n === pts.length) break;
  }
  LIVRE.set('20:9', melhor); return melhor;
}
function montaParalitico() {
  jog.o.visible = false; aguadeira.o.visible = false;      // (a mulher do jarro é de hoje: na escadaria, cruzava com quem desce)
  ESTEIRA.position.copy(PARAL).add(V3(0, 0.03, 0)); ESTEIRA.rotation.y = LEITO; ESTEIRA.visible = true;
  PARALITICO.o.visible = true; PARALITICO.toca('Parado'); PARALITICO.A.Parado.timeScale = 0.3; deita(PARALITICO, PARAL.clone().add(V3(0, 0.04, 0)), LEITO + Math.PI, 0);
  OUTRO.o.visible = true; OUTRO.o.position.copy(DESCE[0]).setY(DECK); OUTRO.i = 0;
  AGITA.ativo = 8; AGITA.x = 2.6; AGITA.z = zDegrau(8) - 2.2; AGITA.viu = true;      // a água se agita perto da escada
  CENA.sub = 'agita'; CENA.t = 0; fala('De tempos em tempos a água se agitava, e o primeiro que descia ficava são (Jo 5.4).');
}
function desfazParalitico() {
  PARALITICO.o.visible = OUTRO.o.visible = ESTEIRA.visible = ROLO.visible = false; PARALITICO.o.rotation.set(0, 0, 0); PARALITICO.A.Parado.timeScale = 1;
  jog.o.visible = true; aguadeira.o.visible = true; fala('');
}
function paraliticoPasso(dt) {
  const T = (CENA.t += dt);
  if (CENA.sub === 'agita') {
    if (OUTRO.i < DESCE.length) { if (anda(OUTRO, DESCE[OUTRO.i], dt, 2.6)) OUTRO.i++; OUTRO.o.position.y = yDesce(OUTRO.o.position.z); }
    else { OUTRO.toca('Parado'); OUTRO.o.position.y = yDesce(OUTRO.o.position.z); }
    if (T > 6.0) { CENA.sub = 'ninguem'; CENA.t = 0; OUTRO.o.visible = false; fala('“Senhor, não tenho homem algum que, quando a água é agitada, me ponha no tanque; mas, enquanto eu vou, desce outro antes de mim.” (Jo 5.7)'); }
  } else if (CENA.sub === 'ninguem' && T > 5.0) { CENA.sub = 'queres'; CENA.t = 0; fala('“Queres ficar são?” (Jo 5.6)'); }
  else if (CENA.sub === 'queres' && T > 3.0) { CENA.sub = 'levanta'; CENA.t = 0; fala('“Levanta-te, toma o teu leito e anda.” (Jo 5.8)'); }
  else if (CENA.sub === 'levanta') {
    // senta, levanta, enrola a esteira e vai
    const base = PARAL.clone().add(V3(0, 0.04, 0));
    if (T < 2.2) deita(PARALITICO, base, LEITO + Math.PI, THREE.MathUtils.smoothstep(T, 0.4, 2.0));
    else if (T < 3.2) { PARALITICO.o.rotation.set(0, LEITO + Math.PI, 0); PARALITICO.o.position.copy(PARAL).addScaledVector(PE, -0.4); PARALITICO.A.Parado.timeScale = 1; }
    else if (!ROLO.visible) { ESTEIRA.visible = false; ROLO.visible = true; fala('Logo aquele homem ficou são, tomou o seu leito e andou. (Jo 5.9)'); PARALITICO.i = 0; }
    if (ROLO.visible) {
      const alvo = PARAL.clone().addScaledVector(PE, -5.5);      // ao longo do alpendre if (!anda(PARALITICO, alvo, dt, 1.2)) PARALITICO.o.position.y = DECK; else PARALITICO.toca('Parado');
      const m = PARALITICO.o.getObjectByName('hand_r'), f = V3(Math.sin(PARALITICO.o.rotation.y), 0, Math.cos(PARALITICO.o.rotation.y));
      ROLO.position.copy(PARALITICO.o.position).add(V3(0, 1.25, 0)).addScaledVector(f, -0.05); ROLO.rotation.set(0, PARALITICO.o.rotation.y, Math.PI / 2);      // no ombro
      if (m) ROLO.position.y = Math.max(ROLO.position.y, pos(m).y + 0.2);
    }
    if (T > 8.0 && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazParalitico(); CENA.sub = ''; CENA.fase = 'livre'; }); }
  }
}
function cenaParalitico() {
  LIVRE.clear(); CENA.fase = 'paralitico'; CENA.sub = 'entra'; CENA.saindo = false;
  const yPov = LEITO * DEG;      // de pé junto aos pés da esteira, olhando o homem (e a água atrás dele)
  CINE.roda([
    { alvo: () => PARAL.clone().setY(DECK + 0.5), dist: 6, el: 26, yaw: () => livreDe(PARAL.clone().setY(DECK + 0.5), YAW_QUINA + 20, 26, 6), corte: true, k: 2, ate: () => CENA.sub === 'agita' },
    { alvo: () => OUTRO.o.position.clone().setY(OUTRO.o.position.y + 1.0), dist: 9, el: 38, yaw: ladoRota, corte: true, fixo: true, k: 1.8, kd: 1, ate: () => CENA.sub === 'ninguem' },
    { alvo: cab(PARALITICO, 0), dist: 2.2, el: 38, yaw: yPov - 30, corte: true, fixo: true, k: 2, kd: 0.6, ate: () => CENA.sub === 'queres' },
    { alvo: () => PARAL.clone().setY(DECK + 0.7), dist: 3.4, el: 34, yaw: yPov, fixo: true, k: 1.4, kd: 0.8, ate: () => CENA.sub === 'levanta' },      // (a 2 m, de cima, só se via o alto da cabeça dele)
    { alvo: cab(PARALITICO, -0.3), dist: 4.5, el: 14, yaw: yPov, k: 1.2, kd: 0.8, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazParalitico(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.5, () => LEMB.entra('Num sábado, tempos atrás', montaParalitico));
}
CONVERSAS.find((c) => c.nome === 'o lugar do paralítico').cena = cenaParalitico;

function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (CENA.fase === 'paralitico' && LEMB.on) paraliticoPasso(dt);
}

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __PARAL: cenaParalitico, __CENA: CENA, __LEMB: LEMB, __FL: { paral: PARALITICO, outro: OUTRO } });
export { cenasPasso, CINE, CENA };
