// Cidade alta: quem está na cidade na manhã do domingo.
//   - a cena de Jo 20.1-4: Maria Madalena entra correndo pela Porta de Genat e vai até a casa onde estão os discípulos;
//     logo depois Pedro e o outro discípulo saem dela correndo, juntos, para o sepulcro, pela mesma porta (repete);
//   - uma mulher à porta da casa do cenáculo; a serva que guarda a porta do sumo sacerdote, junto ao braseiro, e as
//     galinhas no pátio; um guarda no Pavimento, na frente do palácio; um mercador no mercado; gente passando.
// Cada um que fala tem a sua conversa (CONVERSAS).
import { LAY, V3, CIRC, rnd, fala } from './estado.js';
import { gGal1, gGal2, nPedro, nJoao, nMaria, nPorteira, nServa, nGuarda, nMercador, nAldeao, nMoco } from './modelos.js';
import { ator, anda } from './gente.js';

const CONVERSAS = [];
const OLHA = { norte: Math.PI, sul: 0, leste: Math.PI / 2, oeste: -Math.PI / 2 };
const pt = (k) => V3(LAY[k][0], 0, LAY[k][2]);
function poe(g, h, x, z, r, clipe, col = 0.35) { const st = ator(g, h, x, z, r, clipe); if (col) CIRC.push({ x, z, r: col }); return st; }

// ---------- a casa do cenáculo: a mulher à porta ----------
const pc = pt('cenaculo');
const porteira = poe(nPorteira, 1.62, pc.x + 0.9, pc.z - 1.4, OLHA.leste, 'Parado');
CONVERSAS.push({ nome: 'Uma mulher à porta', o: porteira.o, r: 2.4, falas: [
  'Os discípulos estão lá em cima, na sala grande, com as portas fechadas. Têm medo (Jo 20.19).',
  'Maria de Magdala chegou agora há pouco, correndo, sem fôlego: “Levaram o Senhor do sepulcro, e não sabemos onde o puseram” (Jo 20.2).',
  'Pedro e o outro discípulo saíram correndo para lá. Pela Porta de Genat é perto: fica logo fora do muro.',
] });
// ---------- a casa do sumo sacerdote: a serva da porta, junto ao braseiro, e as galinhas ----------
const pb = pt('braseiro');
const serva = poe(nServa, 1.6, pb.x + 1.3, pb.z + 0.4, OLHA.oeste, 'Parado');
serva.o.position.y = LAY.y_patio;
CONVERSAS.push({ nome: 'A serva da porta', o: serva.o, r: 2.4, falas: [
  'Na quinta à noite, quando trouxeram o nazareno preso, um galileu ficou aqui, se aquentando neste braseiro com os servos e os guardas (Jo 18.18).',
  'Eu, que guardo a porta, perguntei: “Não és tu também dos discípulos deste homem?” Ele disse: “Não sou” (Jo 18.17).',
  'Negou três vezes, e o galo cantou. O Senhor voltou-se e olhou para ele; e ele saiu e chorou amargamente (Lc 22.61-62).',
] });
const galinhas = [];
for (let i = 0; i < 4; i++) { const g = ator(i % 2 ? gGal2 : gGal1, 0.42, pb.x + (rnd() - 0.5) * 6, pb.z + (rnd() - 0.5) * 6, rnd() * 6.28, rnd() < 0.5 ? 'Comer' : 'Parado'); g.o.position.y = LAY.y_patio; g.alvo = null; g.espera = rnd() * 3; galinhas.push(g); }
// ---------- o Pavimento: um guarda na frente do palácio ----------
const pg = pt('gabata');
const guarda = poe(nGuarda, 1.6, pg.x + 2.5, pg.z + 3.2, OLHA.leste, 'Parado');
guarda.o.position.y = LAY.gabata[1];
CONVERSAS.push({ nome: 'Um guarda do palácio', o: guarda.o, r: 2.4, falas: [
  'Aqui o governador se assentou no tribunal, no lugar chamado Pavimento, em hebraico Gabatá. Era a preparação da Páscoa, quase a hora sexta (Jo 19.13-14).',
  'Ele lavou as mãos diante da multidão: “Estou inocente do sangue deste justo.” E o povo respondeu: “O seu sangue caia sobre nós e sobre os nossos filhos” (Mt 27.24-25).',
] });
// ---------- o mercado ----------
const pm = pt('mercado');
const mercador = poe(nMercador, 1.71, pm.x - 3.0, pm.z + 1.0, OLHA.norte, 'Conversando');
CONVERSAS.push({ nome: 'Um mercador', o: mercador.o, r: 2.4, falas: [
  'Azeite, figos secos, tâmaras de Jericó! A cidade ainda está cheia de peregrinos da Páscoa.',
  'Hoje cedo só se fala de uma coisa: que o sepulcro daquele nazareno amanheceu vazio. Uns dizem que roubaram o corpo; outros dizem coisa que eu nem repito.',
] });
const passantes = [ator(nAldeao, 1.7, pm.x + 4, pm.z - 2, 0, 'Andar'), ator(nMoco, 1.7, pm.x - 6, pm.z - 3, 0, 'Andar')];
const ROTAS_P = [[pt('mercado').add(V3(6, 0, -3)), V3(LAY.ruas[1][0][0], 0, LAY.ruas[1][0][1] + 2), V3(LAY.ruas[1][0][0], 0, 30)], [pt('mercado').add(V3(-6, 0, -3)), pt('xisto').add(V3(-8, 0, 0))]];
const PAS = passantes.map((st, k) => ({ st, rota: ROTAS_P[k], i: 1, ida: true, espera: 0 }));

// ---------- Jo 20.1-4: Maria corre até a casa; Pedro e João correm até o sepulcro ----------
const pg_ = pt('genat'), r1 = LAY.ruas[0], rsul = LAY.ruas[1];
const zR = r1[2][1];                                          // a rua principal
const CAMINHO = [V3(pg_.x, 0, pg_.z), V3(pg_.x, 0, zR), V3(rsul[0][0], 0, zR), V3(rsul[0][0], 0, 44), V3(pc.x + 6, 0, pc.z + 4), V3(pc.x + 1.5, 0, pc.z)];
const maria = ator(nMaria, 1.5, CAMINHO[0].x, CAMINHO[0].z, 0, 'Correr');
const pedro = ator(nPedro, 1.68, CAMINHO[5].x, CAMINHO[5].z, 0, 'Correr'), joao = ator(nJoao, 1.71, CAMINHO[5].x, CAMINHO[5].z, 0, 'Correr');
const CENA = { fase: 'espera', t: 3, i: 0, viu: { maria: false, dois: false } };
for (const st of [maria, pedro, joao]) st.o.visible = false;
function cenaPasso(dt, pj) {
  CENA.t -= dt;
  const perto = (st) => st.o.visible && Math.hypot(st.o.position.x - pj.x, st.o.position.z - pj.z) < 22;
  if (CENA.fase === 'espera') { if (CENA.t <= 0) { CENA.fase = 'maria'; CENA.i = 1; maria.o.position.copy(CAMINHO[0]); maria.o.visible = true; } return; }
  if (CENA.fase === 'maria') {
    if (!CENA.viu.maria && perto(maria)) { CENA.viu.maria = true; fala('Maria Madalena correu e foi ter com Simão Pedro e com o outro discípulo: “Levaram o Senhor do sepulcro, e não sabemos onde o puseram.” (Jo 20.2)'); setTimeout(() => fala(''), 9000); }
    if (anda(maria, CAMINHO[CENA.i], dt, 4.2)) { maria.toca('Correr'); if (CENA.i < CAMINHO.length - 1) CENA.i++; else { maria.o.visible = false; CENA.fase = 'pausa'; CENA.t = 5; } }
    else maria.toca('Correr');
    return;
  }
  if (CENA.fase === 'pausa') { if (CENA.t <= 0) { CENA.fase = 'dois'; CENA.i = CAMINHO.length - 2; pedro.o.position.copy(CAMINHO[CAMINHO.length - 1]); joao.o.position.copy(CAMINHO[CAMINHO.length - 1]).add(V3(0.8, 0, 0.6)); pedro.o.visible = joao.o.visible = true; } return; }
  if (CENA.fase === 'dois') {
    if (!CENA.viu.dois && (perto(pedro) || perto(joao))) { CENA.viu.dois = true; fala('Pedro e o outro discípulo saíram e foram ao sepulcro. E os dois corriam juntos; mas o outro discípulo correu mais depressa do que Pedro. (Jo 20.3-4)'); setTimeout(() => fala(''), 9000); }
    const alvo = CAMINHO[CENA.i];
    const chegouJ = anda(joao, alvo.clone().add(V3(0.6, 0, 0.4)), dt, 4.6), chegouP = anda(pedro, alvo, dt, 4.0);
    joao.toca('Correr'); pedro.toca('Correr');
    if (chegouP) { if (CENA.i > 0) CENA.i--; else { pedro.o.visible = joao.o.visible = false; CENA.fase = 'espera'; CENA.t = 40; } }
  }
}


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
coisa('o palácio', pl[1] + 1.5, (pl[2] + pl[3]) / 2 - 12, [
  'O palácio de Herodes, com as três torres: o pretório, onde o governador fica durante a festa.',
  'Os principais sacerdotes não entraram no pretório, para não se contaminarem, e poderem comer a Páscoa (Jo 18.28).',
  'Pilatos perguntou a Jesus: “Tu és o rei dos judeus?” E ele respondeu: “O meu reino não é deste mundo” (Jo 18.33-36).',
], 2.6, 'olhar o palácio');

function npcsPasso(dt, pj) {
  for (const g of galinhas) {
    if (g.espera > 0) { g.espera -= dt; continue; }
    if (!g.alvo) g.alvo = V3(pb.x + (rnd() - 0.5) * 7, 0, pb.z + (rnd() - 0.5) * 7);
    if (anda(g, g.alvo, dt, 0.3)) { g.alvo = null; g.espera = 2 + rnd() * 4; g.toca(rnd() < 0.6 ? 'Comer' : 'Parado'); }
    g.o.position.y = LAY.y_patio;
  }
  for (const A of PAS) {
    if (A.espera > 0) { A.espera -= dt; A.st.toca('Parado'); continue; }
    if (anda(A.st, A.rota[A.i], dt, 1.0)) {
      if (A.ida) { if (A.i < A.rota.length - 1) A.i++; else { A.ida = false; A.espera = 4; } }
      else { if (A.i > 0) A.i--; else { A.ida = true; A.espera = 3; } }
    }
  }
  cenaPasso(dt, pj);
}

export { CONVERSAS, npcsPasso, CENA, maria, pedro, joao, porteira, serva, guarda, mercador };
