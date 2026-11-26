// Monte das Oliveiras: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro está em fase-oliveiras/roteiro.md.
//  1. Chegada (de Betfagé): os olivais e o alto do monte.
//  2. O mirante, no cume: Jerusalém aparece do outro lado do vale; "vendo a cidade, chorou sobre ela" (Lc 19.41). Na
//     descida, a câmera já mostra o ponto de interesse: a laje de pedra defronte do templo.
//  3. A laje: a lembrança do sermão no monte (Mc 13). Jesus, assentado, não aparece: a câmera fica no lugar dele, com
//     Pedro, Tiago, João e André diante dele e o templo atrás deles.
import * as THREE from 'three';
import { lerpAng, pos } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, renderer, LAY, DE } from './estado.js';
import { terreno, AMOS, iCume, PAN, TERRENO } from './cenario.js';
import { ator, chao, empresta } from './gente.js';
import { nPedro, nJoao, nTiago, nAndre } from './modelos.js';
import { jog, camera, CAM, iInicio } from './jogador.js';

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const CINE = criaCine({ camera, E, chao: (x, z) => terreno(x, z), obstaculos: malhasAltas(scene, [TERRENO, PAN.mesh]), deOnde: () => ({ alvo: CAM.olho.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);
const CENA = { fase: '', sub: '', t: 0 };
let AGENDA = []; const depois = (s, fn) => AGENDA.push({ s, fn });
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + 1.5); p.y += dy; return p; };
const ponto = (i, dy = 0) => { const a = AMOS[Math.max(0, Math.min(AMOS.length - 1, i))]; return V3(a.x, terreno(a.x, a.z) + dy, a.z); };
const yawDe = (de, para) => Math.atan2(para.x - de.x, para.z - de.z) * DEG;      // graus: a câmera fica do lado de "para"
const TEMPLO = PAN.alvo;
const [CX, CY, CZ] = LAY.cume, CUME = V3(CX, terreno(CX, CZ), CZ);
const [LX, , LZ] = LAY.pregacao, LAJE = V3(LX, terreno(LX, LZ), LZ);
const YAW_QUINA = Math.atan2(1, 0.35) * DEG;     // o lado de onde a câmera do jogo olha (leste-sudeste)

// ---------- 1. chegada ----------
if (DE !== 'cume' && DE !== 'getsemani') {
  CENA.fase = 'chegada';
  CINE.roda([
    { alvo: () => ponto(iInicio + 28, 2), dist: 32, el: 24, yaw: YAW_QUINA, k: 1.2, kd: 0.7, titulo: 'Monte das Oliveiras', dur: 3.6,
      aoEntrar: () => depois(0.6, () => fala('A estrada sobe o Monte das Oliveiras, entre os olivais.')) },
    { alvo: () => CUME.clone().setY(CUME.y + 1.5), dist: 24, el: 18, yaw: YAW_QUINA - 10, corte: true, k: 2, kd: 1, titulo: 'O alto do monte', dur: 3.0 },
  ], () => { fala(''); CENA.fase = 'livre'; }, { aoPular: () => { AGENDA = []; } });
} else CENA.fase = 'livre';

// ---------- 2. o mirante ----------
const dTemplo = (p) => Math.hypot(TEMPLO.x - p.x, TEMPLO.z - p.z);
function cenaMirante() {
  CENA.fase = 'mirante';
  const yCid = () => yawDe(TEMPLO, jog.o.position);      // a câmera do lado do jogador, olhando a cidade
  CINE.roda([
    // atrás dele, baixa: ele e a cidade lá longe
    { alvo: () => cab(jog, -0.1)().lerp(TEMPLO, 0.004), dist: 3.4, el: 6, yaw: () => yCid() + 18, corte: true, k: 3, dur: 2.6,
      aoEntrar: () => fala('Jerusalém.') },
    // a cidade, de perto (a lente fecha): o templo do outro lado do vale
    { alvo: () => TEMPLO.clone(), dist: dTemplo(CUME) + 2, el: 1.5, yaw: () => yCid(), corte: true, fixo: true, zoom: 0.32, k: 3, kd: 0.6, titulo: 'Jerusalém', dur: 4.2,
      aoEntrar: () => fala('Do outro lado do vale do Cedrom, o templo brilha ao sol.') },
    { alvo: () => TEMPLO.clone(), dist: dTemplo(CUME) + 2, el: 1.5, yaw: () => yCid(), fixo: true, zoom: 0.62, k: 3, kd: 0.5, dur: 4.2,
      aoEntrar: () => fala('“E, quando ia chegando, vendo a cidade, chorou sobre ela.” (Lc 19.41)') },
    // o ponto de interesse da descida
    { alvo: () => LAJE.clone().setY(LAJE.y + 0.8), dist: 11, el: 24, yaw: YAW_QUINA, corte: true, k: 2, titulo: 'O lugar do sermão, defronte do templo', dur: 3.4,
      aoEntrar: () => fala('Desça até a laje de pedra.') },
  ], () => { fala(''); CENA.fase = 'livre'; }, { aoPular: () => { fala(''); } });
}

// ---------- 3. a lembrança do sermão no monte (Mc 13) ----------
const W = TEMPLO.clone().sub(LAJE).setY(0).normalize(), L = V3(-W.z, 0, W.x);
const DISC = [[nPedro, 1.72, -1.5], [nTiago, 1.7, -0.5], [nJoao, 1.66, 0.5], [nAndre, 1.68, 1.5]].map(([m, h, l]) => {
  const st = ator(m, h, 0, 0, 0, 'Parado'); empresta(st, ['Ajoelhar', 'Agachado']); st.o.visible = false; st.l = l; return st; });
const [PEDRO] = DISC;
function montaSermao() {
  jog.o.visible = false;
  for (const st of DISC) {
    const p = LAJE.clone().addScaledVector(W, 1.9 + Math.abs(st.l) * 0.35).addScaledVector(L, st.l * 1.05);
    st.o.position.copy(p); chao(st); st.o.rotation.y = Math.atan2(LAJE.x - p.x, LAJE.z - p.z); st.o.visible = true; st.toca('Ajoelhar'); if (st.A.Ajoelhar) st.A.Ajoelhar.time = 1.0 + Math.random() * 2;      // (ajoelhados, firmes no chão: agachados pareciam suspensos)
  }
  CENA.sub = 'assentados'; CENA.t = 0; fala('Estando ele assentado no Monte das Oliveiras, defronte do templo, Pedro, Tiago, João e André lhe perguntaram em particular (Mc 13.3)');
}
function desfazSermao() { for (const st of DISC) st.o.visible = false; jog.o.visible = true; fala(''); }
const FALAS = [   // [quando, sub, legenda]
  [5.0, 'pedro', 'Pedro: “Dize-nos, quando serão essas coisas, e que sinal haverá?” (Mc 13.4)'],
  [9.5, 'templo', '“Não ficará pedra sobre pedra que não seja derribada.” (Mc 13.2)'],
  [14.0, 'ceu', '“O céu e a terra passarão, mas as minhas palavras não passarão.” (Mc 13.31)'],
  [18.5, 'vigiai', '“E as coisas que vos digo, digo-as a todos: Vigiai.” (Mc 13.37)'],
];
function sermaoPasso(dt) {
  const T = (CENA.t += dt);
  // (o clipe ajoelha, fica e levanta: fica no trecho de joelhos, entre 1 s e 3,6 s)
  for (const st of DISC) { const a = st.A.Ajoelhar; if (a && st.atual === 'Ajoelhar' && a.time > 3.6) a.time = 1.0; }
  for (const [q, sub, txt] of FALAS) if (T >= q && CENA.ultimo !== sub) { if (FALAS.findIndex((f) => f[1] === sub) > FALAS.findIndex((f) => f[1] === CENA.ultimo)) { CENA.ultimo = sub; CENA.sub = sub; fala(txt); PEDRO.toca(sub === 'pedro' ? 'Conversando' : 'Ajoelhar'); } }
  if (T > 23 && CENA.sub !== 'volta') { CENA.sub = 'volta'; LEMB.sai(() => { desfazSermao(); CENA.sub = ''; CENA.fase = 'livre'; E.pregacao = true; fala('Vigiai.'); depois(3, () => fala('')); }); }
}
function cenaSermao() {
  CENA.fase = 'sermao'; CENA.sub = 'entra'; CENA.ultimo = '';
  const yPov = Math.atan2(-W.x, -W.z) * DEG;     // a câmera no lugar de Jesus, olhando os quatro (e o templo atrás deles)
  const grupo = () => LAJE.clone().addScaledVector(W, 2.1).setY(LAJE.y + 0.75);
  CINE.roda([
    { alvo: () => LAJE.clone().setY(LAJE.y + 0.8), dist: 7, el: 18, yaw: YAW_QUINA, k: 2, ate: () => CENA.sub === 'assentados' },
    { alvo: grupo, dist: 3.6, el: 9, yaw: yPov, corte: true, fixo: true, k: 2, kd: 1.5, ate: () => CENA.sub === 'pedro' },
    { alvo: cab(PEDRO, -0.15), dist: 2.6, el: 6, yaw: yPov - 22, fixo: true, k: 2, kd: 1.5, ate: () => CENA.sub === 'templo' },
    { alvo: () => TEMPLO.clone(), dist: dTemplo(LAJE) + 1.5, el: 1.5, yaw: yawDe(TEMPLO, LAJE), corte: true, fixo: true, zoom: 0.35, k: 3, kd: 0.5, ate: () => CENA.sub === 'ceu' },
    { alvo: grupo, dist: 6.5, el: 16, yaw: yPov + 35, corte: true, fixo: true, k: 1.2, kd: 0.8, ate: () => CENA.sub === 'vigiai' },
    { alvo: grupo, dist: 4.2, el: 10, yaw: yPov, fixo: true, k: 1, kd: 0.6, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazSermao(); } CENA.sub = ''; CENA.fase = 'livre'; E.pregacao = true; } });
  depois(0.5, () => LEMB.entra('Na terça-feira', montaSermao));
}

function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (CENA.fase === 'sermao' && LEMB.on) sermaoPasso(dt);
}

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __SERMAO: cenaSermao, __CENA: CENA, __LEMB: LEMB, __FL: Object.fromEntries(DISC.map((s, i) => ['d' + i, s])) });
export { cenasPasso, cenaMirante, cenaSermao, CINE, CENA };
