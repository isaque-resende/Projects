// Cidade alta (a praça): quem está ali na manhã do domingo, e a cena de Jo 20.1-10 com Lc 24.1-11.
//   1. A praça está calma. A mulher à porta da casa do cenáculo conta que os discípulos estão lá em cima, com medo, e que
//      as mulheres foram de madrugada ao sepulcro.
//   2. Terminada essa conversa, Maria Madalena entra correndo pela Porta de Genat e chega à casa: “Levaram o Senhor”
//      (Jo 20.1-2). Pedro e o outro discípulo saem correndo para o sepulcro (Jo 20.3-4). Maria fica à porta.
//   3. As outras mulheres chegam, com o recado dos anjos (Lc 24.4-9); sobem, e lá em cima acham que é delírio (Lc 24.11).
//   4. Depois de conversar com o jogador, Maria volta correndo ao sepulcro (Jo 20.11): o jogador não a alcança.
//   5. Perto da Porta de Genat, o jogador dá com Pedro e João voltando (Jo 20.10): contam dos lençóis e do lenço dobrado.
//      Só então a porta fica livre, para o Gólgota (lá, Maria já viu o Senhor).
//   Vindo do Gólgota (?de=genat), tudo isso já passou: Maria está à porta e diz “Vi o Senhor” (Jo 20.18).
// Também: a serva que guarda a porta do sumo sacerdote, junto ao braseiro, e as galinhas no pátio; o soldado da túnica no
// Pavimento; um mercador; gente passando. Jesus não aparece aqui: só na estrada de Emaús.
import * as THREE from 'three';
import { LAY, DE, V3, CIRC, CAIXAS, rnd, fala, scene } from './estado.js';
import { terreno } from './cenario.js';
import { gGal1, gGal2, nPedro, nJoao, nMaria, nPorteira, nServa, nGuarda, nMercador, nAldeao, nMoco, nMarta } from './modelos.js';
import { ator, anda, sombrasPerto } from './gente.js';

const CONVERSAS = [];
const OLHA = { norte: Math.PI, sul: 0, leste: Math.PI / 2, oeste: -Math.PI / 2 };
const pt = (k) => V3(LAY[k][0], 0, LAY[k][2]);
function poe(g, h, x, z, r, clipe, col = 0.35) { const st = ator(g, h, x, z, r, clipe); if (col) CIRC.push({ x, z, r: col }); return st; }
let tLeg = 0;
function legenda(txt, seg = 9) { fala(txt); const n = ++tLeg; setTimeout(() => { if (n === tLeg) fala(''); }, seg * 1000); }
// tinge a roupa de um ator (para duas pessoas com o mesmo modelo não parecerem a mesma)
function tinge(st, c) { st.o.traverse((m) => { if (m.isMesh && m.material && m.material.color) { m.material = m.material.clone(); m.material.color.setRGB(m.material.color.r * c[0], m.material.color.g * c[1], m.material.color.b * c[2]); } }); }

const pc = pt('cenaculo'), pgn = pt('genat');
const FORA = V3(pgn.x, 0, pgn.z - 6.0);             // do lado de fora da porta (some ali)
const NA_PORTA = V3(pgn.x, 0, pgn.z + 1.0);
const PORTA_CASA = V3(pc.x, 0, pc.z + 0.4);
const crc = LAY.cenaculo_r, zE = crc[2] - 0.65;                         // a linha da escada, junto à face norte
const PORTA_CIMA = V3(LAY.porta_cima[0], 0, LAY.porta_cima[2] + 0.25);  // na porta de cima, no patamar
const DESCE = [V3(crc[0] + 9.6, 0, zE), V3(crc[0] + 0.9, 0, zE), V3(crc[0] + 0.2, 0, zE - 2.2)];   // do patamar ao pé da escada
const SOBE = [...DESCE].reverse().concat([PORTA_CIMA]);
const vira = (st, x, z) => { st.o.rotation.y = Math.atan2(x - st.o.position.x, z - st.o.position.z); };
const CENA = { fase: DE === 'genat' ? 'fim' : 'calmo', t: 0, viu: {}, livre: DE === 'genat', mariaFalou: false, iP: 0, iJ: 0, iM: 0, iC: 0, i: 0 };

// ---------- a Porta de Genat fica fechada (gente na passagem) até o jogador falar com Pedro e João ----------
const TRAVA = { x0: pgn.x - 2.6, x1: pgn.x + 2.6, z0: pgn.z - 2.2, z1: pgn.z - 1.3 };
if (!CENA.livre) CAIXAS.push(TRAVA);
function abrePorta() { CENA.livre = true; const i = CAIXAS.indexOf(TRAVA); if (i >= 0) CAIXAS.splice(i, 1); }

// ---------- a casa do cenáculo: a mulher à porta ----------
const porteira = poe(nPorteira, 1.62, pc.x + 2.2, pc.z - 0.6, OLHA.norte, 'Parado');
const cPorteira = { nome: 'Uma mulher à porta', o: porteira.o, r: 2.4, falas: [
  'Os discípulos estão lá em cima, na sala grande, com as portas fechadas. Desde sexta têm medo (Jo 20.19).',
  'Algumas mulheres saíram de madrugada, ainda escuro, levando os aromas que prepararam para o corpo (Lc 24.1). Maria de Magdala foi com elas.',
  'Ainda não voltaram. O sepulcro fica logo fora da Porta de Genat, num horto perto da cidade (Jo 19.41-42).',
], aoFim: () => { if (CENA.fase === 'calmo') { CENA.fase = 'maria_vem'; CENA.t = 2.5; } } };
CONVERSAS.push(cPorteira);
const FALAS_PORTEIRA_DEPOIS = [
  'Você viu? Maria chegou correndo, e Pedro e o outro discípulo saíram atrás dela, para o sepulcro.',
  'Lá em cima, uns dizem que roubaram o corpo; outros não dizem nada. Ninguém sabe o que pensar.',
];
if (CENA.fase === 'fim') cPorteira.falas = ['Maria voltou do sepulcro. Diz que viu o Senhor.', 'Lá em cima, eles não sabem se choram ou se riem. Pedro e João também viram o sepulcro vazio, com os lençóis.'];

// ---------- Maria Madalena ----------
const maria = ator(nMaria, 1.5, FORA.x, FORA.z, 0, 'Correr'); maria.o.visible = false;
const LUG_MARIA = V3(pc.x - 1.4, 0, pc.z - 0.9);
const cMaria = { nome: 'Maria Madalena', o: maria.o, r: 2.4, oculto: true, falas: [
  'Ela está sem fôlego, encostada à porta.',
  'Fomos de madrugada, ainda escuro, com os aromas para ungir o corpo (Mc 16.1-2). Quando cheguei, a pedra já estava revolvida do sepulcro (Jo 20.1).',
  '“Levaram o Senhor do sepulcro, e não sabemos onde o puseram” (Jo 20.2).',
  'Preciso voltar lá. Nem que seja só para ficar no lugar onde ele esteve.',
], aoFim: () => { if (CENA.fase !== 'fim') { CENA.mariaFalou = true; cMaria.oculto = true; } } };
CONVERSAS.push(cMaria);
if (CENA.fase === 'fim') {
  maria.o.position.copy(LUG_MARIA); maria.o.visible = true; maria.toca('Parado'); vira(maria, pc.x, pc.z - 8); cMaria.oculto = false;
  cMaria.falas = [
    'Maria Madalena voltou do sepulcro. Os olhos dela brilham.',
    '“Vi o Senhor!” (Jo 20.18). Ele me chamou pelo nome.',
    'Já contei aos discípulos o que ele me disse: “Subo para meu Pai e vosso Pai, meu Deus e vosso Deus” (Jo 20.17).',
  ];
}

// ---------- Pedro e o outro discípulo (João) ----------
const pedro = ator(nPedro, 1.68, PORTA_CIMA.x, PORTA_CIMA.z, 0, 'Correr'), joao = ator(nJoao, 1.71, PORTA_CIMA.x, PORTA_CIMA.z, 0, 'Correr');
for (const st of [pedro, joao]) st.o.visible = false;
const cDois = { nome: 'Pedro e João', o: pedro.o, r: 2.8, oculto: true, falas: [
  'Pedro está ofegante. O outro discípulo, João, tem os olhos acesos.',
  'Pedro: “Fomos ao sepulcro. Estava aberto, e o corpo não estava lá.”',
  'João: “Cheguei primeiro. Abaixei-me e vi os lençóis de linho no chão, mas não entrei” (Jo 20.4-5).',
  'Pedro: “Eu entrei. Os lençóis estavam ali, e o lenço que tinha estado sobre a cabeça dele não estava com os lençóis, mas enrolado num lugar à parte” (Jo 20.6-7). Quem rouba um corpo não deixa as faixas nem dobra o lenço.',
  'João: “Então eu também entrei, e vi, e cri” (Jo 20.8). Ainda não entendiam a Escritura: que era necessário que ele ressuscitasse dos mortos (Jo 20.9).',
  'Pedro: “Vamos para casa, contar aos outros” (Jo 20.10). Maria passou por nós correndo; ficou lá, à porta do sepulcro.',
], aoFim: () => { if (CENA.fase === 'dois_aqui') { CENA.fase = 'dois_casa'; cDois.oculto = true; abrePorta(); legenda('A Porta de Genat está livre. Lá fora, perto, fica o sepulcro.', 6); } } };
CONVERSAS.push(cDois);

// ---------- as outras mulheres (Lc 24.1-11; Mc 16.1; Mt 28.1-8) ----------
const mulheres = [ator(nMarta, 1.58, FORA.x, FORA.z, 0, 'Andar'), ator(nServa, 1.6, FORA.x, FORA.z, 0, 'Andar'), ator(nPorteira, 1.55, FORA.x, FORA.z, 0, 'Andar')];
tinge(mulheres[1], [0.75, 0.82, 1.0]); tinge(mulheres[2], [1.0, 0.8, 0.7]);
for (const st of mulheres) st.o.visible = false;
const LUG_M = [V3(pc.x - 2.8, 0, pc.z - 2.4), V3(pc.x - 3.8, 0, pc.z - 3.2), V3(pc.x - 2.0, 0, pc.z - 3.4)];
const cMulheres = { nome: 'As mulheres', o: mulheres[0].o, r: 2.8, oculto: true, falas: [
  'Joana, Maria, mãe de Tiago, e as outras que estavam com elas (Lc 24.10). Estão com medo e com grande alegria ao mesmo tempo (Mt 28.8).',
  'Entramos no sepulcro e não achamos o corpo do Senhor Jesus (Lc 24.3).',
  'E pararam junto de nós dois homens com vestes resplandecentes. Ficamos com medo, de rosto em terra (Lc 24.4-5).',
  'Eles disseram: “Por que buscais entre os mortos aquele que vive? Não está aqui, mas ressuscitou. Lembrai-vos de como vos falou, estando ainda na Galileia” (Lc 24.5-6).',
  'E nós nos lembramos das palavras dele (Lc 24.8). Subimos para contar aos onze. Mas lá em cima acham que é delírio, e não acreditam em nós (Lc 24.11).',
] };
CONVERSAS.push(cMulheres);

// ---------- a casa do sumo sacerdote: a serva da porta, junto ao braseiro, e as galinhas ----------
const pb = pt('braseiro');
const serva = poe(nServa, 1.6, pb.x + 1.3, pb.z + 0.4, OLHA.oeste, 'Parado');
CONVERSAS.push({ nome: 'A serva da porta', o: serva.o, r: 2.4, falas: [
  'Na quinta à noite, quando trouxeram o nazareno preso, um galileu ficou aqui, se aquentando neste braseiro com os servos e os guardas (Jo 18.18).',
  'Eu, que guardo a porta, perguntei: “Não és tu também dos discípulos deste homem?” Ele disse: “Não sou” (Jo 18.17).',
  'Negou três vezes, e o galo cantou. O Senhor voltou-se e olhou para ele; e ele saiu e chorou amargamente (Lc 22.61-62).',
] });
const BRAS = (() => {
  const g = new THREE.Group(), y = terreno(pb.x, pb.z); g.position.set(pb.x, y, pb.z); scene.add(g);
  const barro = new THREE.MeshStandardMaterial({ color: 0x9a5a38, roughness: 0.95, flatShading: true });
  const perfil = [[0.3, 0], [0.42, 0.04], [0.52, 0.2], [0.58, 0.42], [0.62, 0.5], [0.55, 0.52], [0.5, 0.44]].map(([r, h]) => new THREE.Vector2(r, h));
  const bacia = new THREE.Mesh(new THREE.LatheGeometry(perfil, 12), barro); bacia.castShadow = bacia.receiveShadow = true; g.add(bacia);
  for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.1), barro); const a = i * 2.094; p.position.set(Math.cos(a) * 0.32, 0.03, Math.sin(a) * 0.32); g.add(p); }
  const mBrasa = new THREE.MeshStandardMaterial({ color: 0x2a1408, emissive: 0xff4a10, emissiveIntensity: 1.2, roughness: 1, flatShading: true });
  const brasas = [];
  for (let i = 0; i < 16; i++) { const b = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07 + rnd() * 0.05, 0), mBrasa); const a = rnd() * 6.28, r = rnd() * 0.36; b.position.set(Math.cos(a) * r, 0.44 + rnd() * 0.05, Math.sin(a) * r); b.rotation.set(rnd() * 3, rnd() * 3, 0); g.add(b); brasas.push(b); }
  const chamas = [], cores = [0xffb347, 0xff7a1a, 0xffd27a];
  for (let i = 0; i < 6; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(0.05 + (i % 2) * 0.03, 0.26, 5), new THREE.MeshBasicMaterial({ color: cores[i % 3], transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending })); const a = i * 1.05, r = 0.08 + (i % 3) * 0.09; c.position.set(Math.cos(a) * r, 0.58, Math.sin(a) * r); c.userData.f = rnd() * 6; g.add(c); chamas.push(c); }
  let t = 0;
  return { passo(dt) { t += dt; mBrasa.emissiveIntensity = 1.0 + 0.35 * Math.sin(t * 2.1) + 0.2 * Math.sin(t * 5.3); for (const c of chamas) { const f = c.userData.f; const s = 0.7 + 0.35 * Math.sin(t * 9 + f) + 0.15 * Math.sin(t * 17 + f * 2); c.scale.set(1, s, 1); c.position.y = 0.5 + 0.13 * s; c.material.opacity = 0.55 + 0.3 * Math.sin(t * 7 + f); } } };
})();
const galinhas = [];
for (let i = 0; i < 4; i++) { const g = ator(i % 2 ? gGal2 : gGal1, 0.42, pb.x + (rnd() - 0.5) * 5, pb.z + (rnd() - 0.5) * 5, rnd() * 6.28, rnd() < 0.5 ? 'Comer' : 'Parado'); g.alvo = null; g.espera = rnd() * 3; galinhas.push(g); }
// ---------- o Pavimento: o soldado da túnica, na frente do palácio ----------
const pg = pt('gabata');
const guarda = poe(nGuarda, 1.6, pg.x + 2.5, pg.z + 3.2, OLHA.leste, 'Parado');
guarda.o.position.y = LAY.gabata[1];
CONVERSAS.push({ nome: 'O soldado da túnica', o: guarda.o, r: 2.4, falas: [
  'Aqui o governador se assentou no tribunal, no lugar chamado Pavimento, em hebraico Gabatá. Era a preparação da Páscoa, quase a hora sexta (Jo 19.13-14).',
  'Ele lavou as mãos diante da multidão: “Estou inocente do sangue deste justo.” E o povo respondeu: “O seu sangue caia sobre nós e sobre os nossos filhos” (Mt 27.24-25).',
  'Lá dentro, no pretório, a coorte inteira zombou dele. Vestiram-no de púrpura, puseram-lhe uma coroa de espinhos e batiam-lhe na cabeça com uma cana (Mc 15.16-19). Eu estava lá.',
  'A túnica? Sim, fui eu que a ganhei nas sortes. Era sem costura, tecida de alto a baixo, de uma peça só (Jo 19.23-24). Não deixamos rasgar.',
  'Está aqui, dobrada. É boa lã. Mas não consigo vesti-la. Quando a pego, lembro que ele não disse uma palavra contra nós.',
] });
// ---------- o mercado ----------
const pm = pt('mercado');
const mercador = poe(nMercador, 1.71, pm.x - 2.5, pm.z + 1.05, OLHA.sul, 'Conversando');
CONVERSAS.push({ nome: 'Um mercador', o: mercador.o, r: 2.4, falas: [
  'Azeite, figos secos, tâmaras de Jericó! A cidade ainda está cheia de peregrinos da Páscoa.',
  'Hoje cedo, uns guardas passaram por aqui correndo, para a casa do sumo sacerdote (Mt 28.11). Pareciam ter visto um fantasma.',
] });
const passantes = [ator(nAldeao, 1.7, pm.x + 2, pm.z + 4, 0, 'Andar'), ator(nMoco, 1.7, -18, -24, 0, 'Andar')];
const ROTAS_P = [[V3(pm.x + 2, 0, pm.z + 4), V3(-4, 0, -30), V3(-20, 0, -21)], [V3(-18, 0, -24), V3(-14, 0, -40), V3(LAY.ponte[0] - 4, 0, LAY.ponte[2])]];
const PAS = passantes.map((st, k) => ({ st, rota: ROTAS_P[k], i: 1, ida: true, espera: 0 }));

// ---------- a cena ----------
function cenaPasso(dt, pj) {
  CENA.t -= dt;
  mulheresPasso(dt);
  const F = CENA.fase;
  if (F === 'maria_vem') {
    if (CENA.t > 0) return;
    if (!maria.o.visible) { maria.o.position.copy(FORA); maria.o.visible = true; CENA.i = 0; legenda('Maria Madalena correu e foi ter com Simão Pedro e com o outro discípulo. (Jo 20.2)', 7); }
    const rota = [NA_PORTA, V3(pc.x - 1.0, 0, pc.z - 6), LUG_MARIA];
    if (anda(maria, rota[CENA.i], dt, 4.4)) { if (CENA.i < rota.length - 1) CENA.i++; else { maria.toca('Parado'); vira(maria, PORTA_CIMA.x, PORTA_CIMA.z); CENA.fase = 'dois_vao'; CENA.t = 4.0; legenda('Maria chama do pé da escada: “Pedro! João!”', 4); } }
    else maria.toca('Correr');
    return;
  }
  if (F === 'dois_vao') {
    if (CENA.t > 0) return;
    if (!pedro.o.visible) {
      pedro.o.position.copy(PORTA_CIMA); joao.o.position.copy(PORTA_CIMA).add(V3(-0.4, 0, 0.2)); pedro.o.visible = joao.o.visible = true; CENA.iP = CENA.iJ = 0;
      cPorteira.falas = FALAS_PORTEIRA_DEPOIS; cMaria.oculto = false;
      legenda('Pedro e o outro discípulo saíram e foram ao sepulcro. Os dois corriam juntos; mas o outro discípulo correu mais depressa do que Pedro. (Jo 20.3-4)', 9);
    }
    const rota = [...DESCE, NA_PORTA, FORA], nE = DESCE.length;
    // na escada, descem um pouco mais devagar; na praça, correm (o outro discípulo mais depressa, Jo 20.4)
    if (CENA.iJ < rota.length && anda(joao, rota[CENA.iJ].clone().add(V3(CENA.iJ >= nE ? 0.6 : 0, 0, 0)), dt, CENA.iJ < nE ? 3.0 : 5.0)) CENA.iJ++;
    if (CENA.t > -0.5) return;
    if (CENA.iP < rota.length && anda(pedro, rota[CENA.iP], dt, CENA.iP < nE ? 2.8 : 4.2)) CENA.iP++;
    joao.toca('Correr'); pedro.toca('Correr');
    if (CENA.iJ >= rota.length) joao.o.visible = false;
    if (CENA.iP >= rota.length) { pedro.o.visible = false; CENA.fase = 'maria_porta'; M.vem = true; }
    return;
  }
  if (F === 'maria_porta') { if (CENA.mariaFalou) { CENA.fase = 'maria_volta'; CENA.iM = 0; } return; }
  if (F === 'maria_volta') {
    // volta correndo ao sepulcro (Jo 20.11), mais depressa que o jogador
    const rota = [V3(pc.x - 1.0, 0, pc.z - 6), NA_PORTA, FORA];
    if (anda(maria, rota[CENA.iM], dt, 5.6)) CENA.iM++;
    maria.toca('Correr');
    if (CENA.iM >= rota.length) { maria.o.visible = false; CENA.fase = 'espera_dois'; }
    return;
  }
  if (F === 'espera_dois') {
    // o jogador chega perto da porta: Pedro e João vêm voltando (Jo 20.10)
    if (Math.hypot(pj.x - pgn.x, pj.z - pgn.z) > 10) return;
    pedro.o.position.copy(FORA); joao.o.position.copy(FORA).add(V3(0.8, 0, 0.3)); pedro.o.visible = joao.o.visible = true; CENA.fase = 'dois_voltam';
    legenda('E os discípulos tornaram para casa. (Jo 20.10)', 6);
    return;
  }
  if (F === 'dois_voltam') {
    const a = anda(pedro, V3(pgn.x - 0.5, 0, pgn.z + 1.6), dt, 1.3), b = anda(joao, V3(pgn.x + 0.6, 0, pgn.z + 1.9), dt, 1.3);
    pedro.toca(a ? 'Parado' : 'Andar'); joao.toca(b ? 'Parado' : 'Andar');
    if (a && b) { vira(pedro, pj.x, pj.z); vira(joao, pj.x, pj.z); cDois.oculto = false; CENA.fase = 'dois_aqui'; }
    return;
  }
  if (F === 'dois_aqui') { vira(pedro, pj.x, pj.z); vira(joao, pj.x, pj.z); return; }
  if (F === 'dois_casa') {
    const rota = SOBE;
    const k = Math.min(CENA.iC, rota.length - 1);
    const a = anda(pedro, rota[k], dt, 1.3); anda(joao, rota[k].clone().add(V3(k < rota.length - 1 ? -0.6 : 0, 0, 0)), dt, 1.3);
    pedro.toca('Andar'); joao.toca('Andar');
    if (a) { CENA.iC++; if (CENA.iC >= rota.length) { pedro.o.visible = joao.o.visible = false; CENA.fase = 'fim'; } }
  }
}
// as mulheres: chegam pela porta, sobem para contar (somem dentro da casa) e voltam para a porta
const M = { fase: 'fora', t: 0, i: 0, vem: false };
function poeMulheresNaPorta() { mulheres.forEach((st, k) => { st.o.position.copy(LUG_M[k]); st.o.visible = true; st.toca('Parado'); vira(st, pc.x - 2.6, pc.z - 8); }); cMulheres.oculto = false; M.fase = 'porta'; }
function mulheresPasso(dt) {
  M.t -= dt;
  if (M.fase === 'fora') { if (!M.vem) return; M.fase = 'vem'; M.t = 3; mulheres.forEach((st, k) => { st.o.position.copy(FORA).add(V3(k * 0.7 - 0.7, 0, -k * 0.6)); }); M.i = 0; return; }
  if (M.fase === 'vem') {
    if (M.t > 0) return;
    const rota = [NA_PORTA, ...SOBE];
    let todas = true;
    mulheres.forEach((st, k) => { st.o.visible = true; const alvo = rota[Math.min(M.i, rota.length - 1)].clone().add(M.i >= 1 ? V3(-k * 0.8, 0, 0) : V3(k * 0.6 - 0.6, 0, k * 0.5)); const c = anda(st, alvo, dt, 2.8 - k * 0.15); st.toca('Andar'); if (!c) todas = false; });
    if (todas) { M.i++; if (M.i >= rota.length) { mulheres.forEach((st) => { st.o.visible = false; }); M.fase = 'dentro'; M.t = 6; legenda('E, voltando do sepulcro, anunciaram todas estas coisas aos onze e a todos os demais. (Lc 24.9)', 8); } }
    return;
  }
  if (M.fase === 'dentro') {
    if (M.t > 0) return;
    poeMulheresNaPorta();
    legenda('E as suas palavras lhes pareciam como desvario, e não as creram. (Lc 24.11)', 8);
  }
}
if (CENA.fase === 'fim') poeMulheresNaPorta();

// ---------- as coisas para olhar (entram na mesma lista das conversas, com outro verbo e sem nome no título) ----------
const coisa = (nome, x, z, falas, r = 2.2, verbo = 'olhar ' + nome) => CONVERSAS.push({ nome, titulo: '', verbo, o: { position: { x, z }, visible: true }, falas, r });
coisa('o braseiro', pb.x - 1.2, pb.z, [
  'Um braseiro de barro, com as brasas ainda mornas.',
  'Os servos e os guardas acenderam um fogo de brasas, porque fazia frio, e se aquentavam; e Pedro estava com eles, aquentando-se (Jo 18.18).',
  'E, virando-se o Senhor, olhou para Pedro; e Pedro se lembrou da palavra: “Antes que o galo cante, me negarás três vezes.” E, saindo dali, chorou amargamente (Lc 22.61-62).',
], 1.6);
coisa('o tribunal', pg.x - 3.0, pg.z, [
  'O tribunal de pedra, sobre o Pavimento: daqui o governador julga.',
  'Estando ele assentado no tribunal, sua mulher mandou dizer-lhe: “Não entres na questão desse justo, porque num sonho muito sofri por causa dele” (Mt 27.19).',
  'Pilatos disse: “Eis aqui o vosso rei.” Mas eles bradaram: “Tira, tira, crucifica-o!” (Jo 19.14-15).',
], 2.4);
const cr = LAY.cenaculo_r;
coisa('a escada da sala de cima', cr[0] + 5.0, cr[2] - 2.0, [
  'A escada de fora, que sobe para a sala grande do andar de cima. A porta lá em cima está fechada.',
  '“E ele vos mostrará um grande cenáculo mobilado; aí fazei preparativos” (Lc 22.12).',
  'Na quinta à noite, ele tomou o pão, e, havendo dado graças, partiu-o e disse: “Isto é o meu corpo, que por vós é dado; fazei isto em memória de mim.” E o cálice: “Este cálice é o novo testamento no meu sangue, que é derramado por vós” (Lc 22.19-20).',
], 2.4, 'olhar a escada');
const pl = LAY.palacio;
coisa('o palácio', pl[1] + 2.2, pg.z - 6.0, [
  'O palácio de Herodes, com as três torres: o pretório, onde o governador fica durante a festa.',
  'Os principais sacerdotes não entraram no pretório, para não se contaminarem, e poderem comer a Páscoa (Jo 18.28).',
  'Pilatos perguntou a Jesus: “Tu és o rei dos judeus?” E ele respondeu: “O meu reino não é deste mundo” (Jo 18.33-36).',
], 2.6, 'olhar o palácio');

function npcsPasso(dt, pj) {
  sombrasPerto(dt, pj); BRAS.passo(dt);
  for (const g of galinhas) {
    if (g.espera > 0) { g.espera -= dt; continue; }
    if (!g.alvo) g.alvo = V3(pb.x + (rnd() - 0.5) * 6, 0, pb.z + (rnd() - 0.5) * 6);
    if (anda(g, g.alvo, dt, 0.3)) { g.alvo = null; g.espera = 2 + rnd() * 4; g.toca(rnd() < 0.6 ? 'Comer' : 'Parado'); }
  }
  for (const A of PAS) {
    if (A.espera > 0) { A.espera -= dt; A.st.toca('Parado'); continue; }
    A.st.toca('Andar');
    if (anda(A.st, A.rota[A.i], dt, 1.0)) {
      if (A.ida) { if (A.i < A.rota.length - 1) A.i++; else { A.ida = false; A.espera = 4; } }
      else { if (A.i > 0) A.i--; else { A.ida = true; A.espera = 3; } }
    }
  }
  cenaPasso(dt, pj);
}

export { CONVERSAS, npcsPasso, CENA, maria, pedro, joao, porteira, serva, guarda, mercador, mulheres };
