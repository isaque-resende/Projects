// Betesda: quem está no tanque. Os enfermos sentados nas esteiras debaixo dos alpendres (Jo 5.3), alguns parentes de pé
// junto deles, um cego encostado numa coluna, o pastor com o cordeiro junto ao curral e as ovelhas dentro dele, e
// gente passando pela estrada e entrando pela Porta das Ovelhas. Cada um que fala tem a sua conversa (CONVERSAS).
import * as THREE from 'three';
import { LAY, V3, CIRC, rnd, scene } from './estado.js';
import { gOve, nBarbudo, nMagro, nRobusto, nLenco, nRapaz, nCarreg, nPastor, nFaixa, nAldeao } from './modelos.js';
import { terreno, AMOS } from './cenario.js';
import { ator, anda } from './gente.js';
import { giraMundo } from '../../limpo-motor/atores.js';

const DECK = LAY.deck;
const CONVERSAS = [];       // { nome, o, falas, r }
// deita um ator na esteira: de costas, a cabeça para o lado do giro dado (a esteira corre ao longo dele)
function deita(st, x, z, g) {
  const o = st.o; o.rotation.set(0, 0, 0); o.updateMatrixWorld(true);
  o.rotation.order = 'YXZ'; o.rotation.y = g + Math.PI / 2; o.rotation.x = -Math.PI / 2;
  const cab = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), o.rotation.y);     // para onde vai a cabeça
  o.position.set(x - cab.x * 0.85, DECK, z - cab.z * 0.85); o.updateMatrixWorld(true);
  const b = new THREE.Box3().setFromObject(o); o.position.y += DECK + 0.06 - b.min.y;
  CIRC.push({ x, z, r: 0.75 });
}
// senta um ator na esteira, recostado, com as pernas estendidas e as mãos no colo (o boneco não tem pose de deitado:
// a pose é montada osso a osso, sem clipe)
const _a = new THREE.Vector3(), _b = new THREE.Vector3();
function alinhaOsso(osso, filho, dir) {
  osso.getWorldPosition(_a); filho.getWorldPosition(_b);
  giraMundo(osso, new THREE.Quaternion().setFromUnitVectors(_b.sub(_a).normalize(), dir.clone().normalize()));
}
function senta(st, x, z, g) {
  const o = st.o; o.rotation.set(0, g, 0); o.position.set(x - Math.sin(g) * 0.45, DECK, z - Math.cos(g) * 0.45); o.updateMatrixWorld(true);      // o quadril atrás do meio da esteira
  for (const a of Object.values(st.A)) a.stop();
  const G = (n) => o.getObjectByName(n);
  const f = V3(Math.sin(g), 0, Math.cos(g)), esq = V3(Math.cos(g), 0, -Math.sin(g));
  const sp = G('spine_02'); if (sp) giraMundo(sp, new THREE.Quaternion().setFromAxisAngle(esq, -0.32));        // recostado
  for (const [l, k] of [['l', 1], ['r', -1]]) {                                                                // as pernas, para a frente
    const th = G('thigh_' + l), ca = G('calf_' + l), ft = G('foot_' + l);
    if (th && ca) alinhaOsso(th, ca, f.clone().add(V3(0, -0.14, 0)).addScaledVector(esq, 0.02 * k));
    if (ca && ft) alinhaOsso(ca, ft, f.clone().add(V3(0, -0.1, 0)).addScaledVector(esq, -0.02 * k));
    if (ft) ft.scale.setScalar(0.01);                                                                          // os pés ficam debaixo da manta
  }
  for (const [l, k] of [['l', 1], ['r', -1]]) {                                                                // os braços: junto do corpo, as mãos no colo
    const ua = G('upperarm_' + l), la = G('lowerarm_' + l), ha = G('hand_' + l);
    if (ua && la) alinhaOsso(ua, la, V3(0, -1, 0).addScaledVector(f, 0.35).addScaledVector(esq, 0.15 * k));
    if (la && ha) alinhaOsso(la, ha, f.clone().add(V3(0, 0.05, 0)).addScaledVector(esq, -0.25 * k));      // os antebraços por cima da manta
  }
  o.updateMatrixWorld(true);
  const quadril = G('thigh_l') || G('pelvis');
  if (quadril) { quadril.getWorldPosition(_a); o.position.y -= _a.y - (DECK + 0.16); }                        // o quadril na esteira
  // a manta de lã listrada por cima das pernas
  o.updateMatrixWorld(true); if (quadril) quadril.getWorldPosition(_a);
  { const qd = G('thigh_r'); if (qd && G('thigh_l')) { qd.getWorldPosition(_b); _a.lerp(_b, 0.5); } }          // o meio entre os dois quadris
  const manta = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.3, 1.3, 10), MAT_MANTA); manta.castShadow = true; manta.receiveShadow = true;      // as pernas cobertas: um volume arredondado
  manta.rotation.order = 'YXZ'; manta.rotation.set(Math.PI / 2, g, 0); manta.scale.set(1, 1, 0.9);
  manta.position.set(_a.x + f.x * 0.7, DECK + 0.08, _a.z + f.z * 0.7); scene.add(manta);      // cobre das coxas até depois dos pés
  CIRC.push({ x, z, r: 0.75 });
}
// as esteiras de junco (a do paralítico, vazia, fica só o lugar) e a manta dos enfermos: as texturas do usuário
const texJ = (arq, rx, ry) => { const t = new THREE.TextureLoader().load('../fase-betesda/' + arq); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); return t; };
const MAT_ESTEIRA = new THREE.MeshStandardMaterial({ map: texJ('esteira.jpg', 1, 2), roughness: 1 });
const MAT_MANTA = new THREE.MeshStandardMaterial({ map: texJ('manta.jpg', 1, 1), roughness: 1 });
for (const [x, z, g, quem] of LAY.esteiras) {
  if (!quem) continue;
  const e = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.03, 1.95), MAT_ESTEIRA); e.position.set(x, DECK + 0.015, z); e.rotation.y = g + Math.PI / 2; e.receiveShadow = true; scene.add(e);
}
const DOENTES = [nBarbudo, nMagro, nRobusto, nRapaz, nCarreg, nLenco];
const enfermos = [];
LAY.esteiras.forEach(([x, z, g, quem], i) => {
  if (!quem) return;                                        // a esteira que falta: a do paralítico (Jo 5.9)
  const n = DOENTES[i % DOENTES.length], st = ator(n, n === nLenco ? 1.52 : 1.66, x, z, 0, 'Parado'); senta(st, x, z, g + Math.PI / 2); enfermos.push(st);
});
// o velho do alpendre do norte conversa (o primeiro da lista)
if (enfermos[0]) CONVERSAS.push({ nome: 'Um enfermo', o: enfermos[0].o, r: 2.4, falas: [
  'Faz anos que espero aqui. Quando a água se agita, quem desce primeiro sai curado. Mas eu não tenho ninguém que me ponha no tanque.',
  'Você ouviu falar do homem que ficou aqui trinta e oito anos? Ficava ali, perto da escadaria do sul.',
  'Um rabi de Nazaré parou diante dele e disse: “Levanta-te, toma o teu leito e anda.” E ele se levantou, enrolou a esteira e saiu andando. Num sábado!',
  'Dizem que o crucificaram na sexta, fora da cidade… Se aquele homem estivesse aqui hoje, eu também me levantaria.',
] });
// parentes de pé junto de alguns enfermos (trazem água e pão)
const parentes = [];
for (const [i, n, h] of [[2, nFaixa, 1.6], [7, nAldeao, 1.7], [11, nLenco, 1.5]]) {
  const e = LAY.esteiras[i]; if (!e || !e[3]) continue;
  const [x, z, g] = e, lado = V3(Math.sin(g), 0, Math.cos(g));
  const px = x + lado.x * 1.1 + 0.5, pz = z + lado.z * 1.1 + 0.5;
  const st = ator(n, h, px, pz, Math.atan2(x - px, z - pz), 'Conversando'); st.o.position.y = DECK; parentes.push(st); CIRC.push({ x: px, z: pz, r: 0.35 });
}
if (parentes[0]) CONVERSAS.push({ nome: 'Uma mulher', o: parentes[0].o, r: 2.0, falas: [
  'Trago água e pão para o meu irmão todos os dias. Ele não anda desde menino.',
  'Aqui todo mundo espera a água se mexer. Eu espero que alguém tenha misericórdia dele.',
] });
// o cego, encostado numa coluna do alpendre do leste
const [cx0, cx1, cz0, cz1] = LAY.complexo;
const cego = ator(nCarreg, 1.6, cx1 - 0.9, -20.0, -Math.PI / 2, 'Parado'); cego.o.position.y = DECK; CIRC.push({ x: cx1 - 0.9, z: -20, r: 0.35 });
CONVERSAS.push({ nome: 'Um cego', o: cego.o, r: 2.0, falas: [
  'Não vejo o seu rosto, mas ouço que você não é daqui. Veio para a festa?',
  'Na semana passada a cidade inteira gritava “Hosana” pela estrada do Monte das Oliveiras. Na sexta, gritavam outra coisa.',
] });

// o curral, junto à Porta das Ovelhas: o pastor (com o cordeiro nos braços) e as ovelhas
const [qx, qz, qhx, qhz] = LAY.cercado;
const pastor = ator(nPastor, 1.62, qx - 1.0, qz + qhz + 1.2, Math.PI, 'Parado'); CIRC.push({ x: qx - 1.0, z: qz + qhz + 1.2, r: 0.4 });
CONVERSAS.push({ nome: 'O pastor', o: pastor.o, r: 2.2, falas: [
  'Estas são para o templo. Entram pela Porta das Ovelhas, e os sacerdotes escolhem as que não têm defeito.',
  'Na Páscoa passaram milhares por aqui: um cordeiro para cada casa, como mandou Moisés.',
  'Lá no Jordão, um profeta apontou para um homem e disse: “Eis o Cordeiro de Deus, que tira o pecado do mundo.” Nunca esqueci isso.',
] });
const AREA_OV = { x: qx, z: qz, rx: qhx - 0.8, rz: qhz - 0.8 };
const ovelhas = [];
for (let i = 0; i < 7; i++) {
  const x = qx + (rnd() * 2 - 1) * AREA_OV.rx, z = qz + (rnd() * 2 - 1) * AREA_OV.rz;
  const o = ator(gOve, 0.8, x, z, rnd() * 6.28, rnd() < 0.6 ? 'Comer' : 'Parado'); o.alvo = null; o.espera = rnd() * 4; ovelhas.push(o);
}
// quem passa: alguém vem pela estrada do leste e entra pela Porta das Ovelhas, e volta
const passante = ator(nMagro, 1.7, AMOS[4].x, AMOS[4].z, -Math.PI / 2, 'Andar');
const PORTA_IN = V3(LAY.porta[0], 0, LAY.porta[2] + 0.5);
const ROTA_P = [...AMOS.filter((a, i) => i % 6 === 0 && a.x > LAY.porta[0] + 1).map((a) => a.clone()), V3(LAY.porta[0], 0, 3.8), PORTA_IN];
const PAS = { i: 1, ida: true, espera: 0 };


// ---------- as coisas para olhar (entram na mesma lista das conversas, com outro verbo e sem nome no título) ----------
const coisa = (nome, x, z, falas, r = 2.2, verbo = 'olhar ' + nome) => CONVERSAS.push({ nome, titulo: '', verbo, o: { position: { x, z }, visible: true }, falas, r });
const [tq, , tqz] = LAY.tanque, [pa, , paz] = LAY.paralitico, [po, , poz] = LAY.porta, [cu, , cuz] = LAY.curral;
coisa('a água do tanque', tq, tqz, [
  'A água verde dos tanques, parada.',
  'Dizia-se que, de tempos em tempos, um anjo descia e agitava a água, e o primeiro que entrasse depois disso ficava são (Jo 5.4).',
  'O paralítico disse a Jesus: “Senhor, não tenho homem algum que, quando a água é agitada, me ponha no tanque; mas, enquanto eu vou, desce outro antes de mim” (Jo 5.7).',
], 3.0);
coisa('o lugar do paralítico', pa, paz, [
  'Aqui não há esteira. Era o lugar de um homem que estava enfermo havia trinta e oito anos (Jo 5.5).',
  'Jesus perguntou: “Queres ficar são?” E disse: “Levanta-te, toma o teu leito e anda.” Logo aquele homem ficou são, tomou o seu leito e andou. E aquele dia era sábado (Jo 5.6-9).',
  'Depois Jesus o achou no templo e lhe disse: “Eis que já estás são; não peques mais, para que não te suceda alguma coisa pior” (Jo 5.14).',
], 1.6, 'olhar o lugar');
coisa('a Porta das Ovelhas', po, poz - 2.5, [
  'A Porta das Ovelhas: o sumo sacerdote Eliasibe e os sacerdotes a reconstruíram e a consagraram, no tempo de Neemias (Ne 3.1).',
  'Jesus disse: “Eu sou a porta; se alguém entrar por mim, salvar-se-á, e entrará, e sairá, e achará pastagens” (Jo 10.9).',
], 2.4);
coisa('o curral', cu, cuz, [
  'As ovelhas do curral esperam a vez de entrar no templo.',
  '“Aquele que entra pela porta é o pastor das ovelhas. A este o porteiro abre, e as ovelhas ouvem a sua voz, e chama pelo nome às suas ovelhas, e as traz para fora” (Jo 10.2-3).',
], 3.5);

function npcsPasso(dt) {
  for (const o of ovelhas) {
    if (o.espera > 0) { o.espera -= dt; continue; }
    if (!o.alvo) { o.alvo = V3(AREA_OV.x + (rnd() * 2 - 1) * AREA_OV.rx, 0, AREA_OV.z + (rnd() * 2 - 1) * AREA_OV.rz); }
    if (anda(o, o.alvo, dt, 0.35)) { o.alvo = null; o.espera = 2 + rnd() * 5; o.toca(rnd() < 0.7 ? 'Comer' : 'Parado'); }
  }
  if (PAS.espera > 0) { PAS.espera -= dt; passante.toca('Parado'); return; }
  const alvo = ROTA_P[PAS.i];
  if (anda(passante, alvo, dt, 1.1)) {
    if (PAS.ida) { if (PAS.i < ROTA_P.length - 1) PAS.i++; else { PAS.ida = false; PAS.espera = 3; passante.o.visible = false; } }
    else { passante.o.visible = true; if (PAS.i > 0) PAS.i--; else { PAS.ida = true; PAS.espera = 2; } }
  }
}

export { CONVERSAS, enfermos, pastor, ovelhas, cego, passante, npcsPasso };
