// Templo: quem está no templo na manhã do domingo.
//   - no Pátio dos Sacerdotes (onde o jogador não entra): um sacerdote no alto do altar, junto ao fogo; outro que traz a
//     lenha e sobe a rampa; outro que leva a bacia da pia ao pé do altar; outro conversando junto à pia;
//   - nos quinze degraus da Porta de Nicanor: levitas cantando; na Porta Formosa, um levita de guarda;
//   - no Pátio de Israel: um homem olhando o santuário; um ofertante que traz um cordeiro até a mureta; um pobre com duas rolas;
//   - no Pátio dos Gentios: os cambistas, o vendedor de pombas, os de ovelhas e de bois, uma vendedora numa barraca, as
//     ovelhas e os bois nos currais e as pombas nas gaiolas;
//   - um homem que traz um cordeiro nos braços e outro que traz uma ovelha, da porta do norte até a Porta Formosa;
//   - no Pórtico de Salomão, um mestre ensinando, com gente em volta (Jo 10.23).
// Cada um que fala tem a sua conversa (CONVERSAS).
import * as THREE from 'three';
import { LAY, V3, CIRC, rnd, scene } from './estado.js';
import { gOve, gBoi, gPomba1, gPomba2, nSacerdote, nEscriba, nCacheado, nMercador, nAldeao, nBotoes, nMoco, nPastor, nRobusto, nBarbudo, nFaixa, nMagro } from './modelos.js';
import { terreno } from './cenario.js';
import { ator, anda } from './gente.js';

const CONVERSAS = [];
const N = LAY.niveis, EIXO = LAY.eixo, [a0, a1, b0, b1] = LAY.altar_r, YA = LAY.y_altar;
const OLHA = { norte: Math.PI, sul: 0, leste: Math.PI / 2, oeste: -Math.PI / 2 };
function poe(g, h, x, z, r, clipe, y = null, col = 0.35) {
  const st = ator(g, h, x, z, r, clipe); if (y != null) st.o.position.y = y;
  if (col) CIRC.push({ x, z, r: col });
  return st;
}

// ---------- o Pátio dos Sacerdotes: o holocausto da manhã ----------
// Um sacerdote fica no alto do altar, junto ao fogo. Outro traz a lenha da pilha do norte, contorna o altar, sobe a rampa
// e a lança no fogo ("o sacerdote acenderá lenha nele cada manhã", Lv 6.12), e volta. Outro leva a bacia de bronze da pia
// até o pé do altar e volta. Um quarto conversa junto à pia.
const AX = (a0 + a1) / 2, AZ = (b0 + b1) / 2;            // o centro do altar
const ZR0 = b1 + 9.0, ZR1 = b1;                           // a rampa: do pé (ao sul) até o alto
function yAltar(x, z, y) {                                // no alto do altar e na rampa, a altura não vem do chão
  if (Math.abs(x - AX) < 3.7 && Math.abs(z - AZ) < 3.7) return YA;
  if (Math.abs(x - AX) < 1.7 && z >= ZR1 && z <= ZR0) return N.sacerdotes + (YA - N.sacerdotes) * (ZR0 - z) / (ZR0 - ZR1);
  return y;
}
function leva(st, obj, x, y, z) {                         // um objeto preso ao corpo (na escala do mundo, apesar da escala do ator)
  const k = 1 / st.o.scale.x; obj.position.set(x * k, y * k, z * k); obj.scale.setScalar(k); st.o.add(obj); return obj;
}
const MAT_LENHA = new THREE.MeshStandardMaterial({ color: 0x7a5634, roughness: 1, flatShading: true });
const MAT_BRONZE = new THREE.MeshStandardMaterial({ color: 0x9a7038, roughness: 0.6, metalness: 0.3, flatShading: true });
function feixe(n, comp) {                                  // um feixe de toras (no ombro ou na pilha)
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, comp, 6), MAT_LENHA);
    c.rotation.x = Math.PI / 2; c.position.set((i % 3 - 1) * 0.16, Math.floor(i / 3) * 0.14, (rnd() - 0.5) * 0.15); c.castShadow = true; g.add(c);
  }
  return g;
}
const sac1 = poe(nSacerdote, 1.78, AX + 0.4, AZ + 2.2, OLHA.leste, 'Parado', YA, 0);           // no alto, junto ao fogo
const sac3 = poe(nSacerdote, 1.78, -5.2, 8.2, OLHA.oeste, 'Conversando', null, 0);               // junto à pia de bronze
// a pilha de lenha, ao norte do altar
const PILHA = V3(2.4, 0, -16.5);
{ const g = feixe(12, 1.3); g.position.set(PILHA.x, terreno(PILHA.x, PILHA.z) + 0.08, PILHA.z); g.rotation.y = Math.PI / 2; scene.add(g); }
// o que traz a lenha: da pilha, pelo lado leste do altar, até o pé da rampa, sobe e lança no fogo
const sac2 = poe(nSacerdote, 1.78, PILHA.x - 0.9, PILHA.z + 0.6, 0, 'Parado', null, 0);
const LENHA_OMBRO = leva(sac2, feixe(3, 1.0), 0.2, 1.42, 0.0);
const sac4 = poe(nSacerdote, 1.78, -6.0, 5.6, OLHA.norte, 'Parado', null, 0);
const BACIA = leva(sac4, new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.1, 0.11, 10), MAT_BRONZE), 0.0, 1.02, 0.3);
const ROTAS_ALTAR = [
  { st: sac2, vel: 0.8, ini: 4, fim: 3, R: [V3(PILHA.x - 0.9, 0, PILHA.z + 0.6), V3(3.5, 0, -12), V3(3.5, 0, ZR0 + 1.5), V3(AX, 0, ZR0 + 1.5), V3(AX, 0, ZR0), V3(AX, 0, ZR1 - 0.4), V3(AX + 0.9, 0, AZ + 2.4)],
    aoFim: () => { LENHA_OMBRO.visible = false; }, aoIni: () => { LENHA_OMBRO.visible = true; } },
  { st: sac4, vel: 0.7, ini: 5, fim: 3, R: [V3(-6.0, 0, 5.6), V3(-6.8, 0, 1.0), V3(-6.8, 0, -0.8)] },
];
for (const A of ROTAS_ALTAR) Object.assign(A, { i: 1, ida: true, espera: rnd() * 3 });
// ---------- no Pátio de Israel: quem traz a oferta até a mureta ----------
const ofertante = poe(nAldeao, 1.7, 9.2, EIXO - 0.6, OLHA.oeste, 'Parado', null, 0);
const cordeiro = ator(gOve, 0.62, 10.2, EIXO - 0.6, OLHA.oeste, 'Parado');
ROTAS_ALTAR.push(Object.assign({ st: ofertante, vel: 0.75, ini: 8, fim: 6, R: [V3(9.2, 0, EIXO - 0.6), V3(6.5, 0, EIXO - 1.8), V3(4.75, 0, EIXO - 2.9)] }, { i: 1, ida: true, espera: 2 }));
CONVERSAS.push({ nome: 'Um ofertante', o: ofertante.o, r: 2.2, falas: [
  'É um cordeiro sem defeito, de um ano (Êx 12.5). Vou entregá-lo ao sacerdote, ali na mureta; daqui para lá, só eles.',
  'Todos os dias, de manhã e à tarde, um cordeiro é oferecido aqui por todo o povo: é o holocausto contínuo (Êx 29.38-42).',
] });
const pobre = poe(nMagro, 1.72, 4.75, EIXO - 6.0, OLHA.oeste, 'Parado');
leva(pobre, new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.14, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0xc2a36c, roughness: 1, flatShading: true })), 0.0, 0.95, 0.28);
CONVERSAS.push({ nome: 'Um homem com duas rolas', o: pobre.o, r: 2.2, falas: [
  'Trouxe duas rolas. Quem não pode dar um cordeiro dá duas rolas ou dois pombinhos: a Lei pensou nos pobres (Lv 5.7; 12.8).',
  'Entrego daqui da mureta. O sacerdote leva ao altar por mim.',
] });
function altarPasso(dt) {
  for (const A of ROTAS_ALTAR) {
    if (A.espera > 0) { A.espera -= dt; A.st.toca('Parado'); }
    else if (anda(A.st, A.R[A.i], dt, A.vel)) {
      if (A.ida) { if (A.i < A.R.length - 1) A.i++; else { A.ida = false; A.espera = A.fim; if (A.aoFim) A.aoFim(); } }
      else { if (A.i > 0) A.i--; else { A.ida = true; A.espera = A.ini; if (A.aoIni) A.aoIni(); } }
    }
    const p = A.st.o.position; p.y = yAltar(p.x, p.z, p.y);
  }
  // o cordeiro vai atrás do ofertante
  const atr = ofertante.o.position.clone().add(V3(-Math.sin(ofertante.o.rotation.y) * 1.1, 0, -Math.cos(ofertante.o.rotation.y) * 1.1));
  const dC = cordeiro.o.position.distanceTo(atr);
  if (dC > 0.5) cordeiro.segue = true; else if (dC < 0.12) cordeiro.segue = false;
  if (cordeiro.segue) anda(cordeiro, atr, dt, 0.9); else cordeiro.toca('Parado');
}
// ---------- os levitas nos degraus, de frente para o Pátio das Mulheres; o guarda da Porta Formosa ----------
const [nx] = [LAY.x_nic];
// nos lados dos degraus: o meio fica livre para passar
const levitas = [[nEscriba, 12.2, EIXO - 3.4], [nCacheado, 13.6, EIXO - 2.2], [nMoco, 12.6, EIXO + 3.3]].map(([g, x, z]) => poe(g, 1.72, x, z, OLHA.leste, 'Conversando'));
CONVERSAS.push({ nome: 'Um levita', o: levitas[1].o, r: 2.4, falas: [
  'Cantamos aqui os cânticos dos degraus: quinze degraus, quinze salmos, enquanto o sacrifício da manhã sobe do altar.',
  '“Alegrei-me quando me disseram: Vamos à casa do Senhor. Os nossos pés estão dentro das tuas portas, ó Jerusalém.” (Sl 122.1-2)',
] });
const [fx, , fz] = LAY.formosa;
const guarda = poe(nEscriba, 1.75, fx + 0.6, fz - 3.6, OLHA.leste, 'Parado');
CONVERSAS.push({ nome: 'O guarda da porta', o: guarda.o, r: 2.4, falas: [
  'Esta é a Porta Formosa. Daqui para dentro só entram os filhos de Israel: as mulheres vão até o pátio delas; os homens sobem os quinze degraus até a Porta de Nicanor.',
  'Um gentio que passar da balaustrada será culpado da própria morte. Está escrito nas placas, em grego e em latim.',
] });
// ---------- no Pátio de Israel ----------
const [ix, , iz] = LAY.israel;
const adorador = poe(nBarbudo, 1.66, ix - 1.2, iz + 4.2, OLHA.oeste, 'Parado');
CONVERSAS.push({ nome: 'Um homem que ora', o: adorador.o, r: 2.4, falas: [
  'Daqui se vê o altar e o santuário. Desta mureta para lá, só os sacerdotes.',
  'Na sexta, à hora nona, na hora do sacrifício da tarde, a terra tremeu. Os sacerdotes que estavam lá dentro dizem que o véu do santuário se rasgou em dois, de alto a baixo (Mt 27.51).',
  'Ninguém fala disso em voz alta. Mas eu vim orar.',
] });

// ---------- o mercado: cambistas, pombas, ovelhas, bois e uma barraca ----------
const cambistas = [0, 3].map((i) => { const [x, z] = LAY.cambio[i]; return poe(nMercador, 1.71, x, z + 0.95, OLHA.norte, i ? 'Parado' : 'Conversando'); });
CONVERSAS.push({ nome: 'Um cambista', o: cambistas[0].o, r: 2.4, falas: [
  'Meio siclo para o templo, como manda a Lei (Êx 30.13). Mas aqui só se aceita a prata de Tiro: moeda com a cara do imperador não entra no tesouro.',
  'Eu troco o seu dinheiro, com um pequeno ágio. É o costume.',
  'Na segunda-feira, um galileu virou estas mesas e espalhou as moedas pelo chão. Disse: “A minha casa será chamada casa de oração para todas as nações; vós, porém, a fizestes covil de ladrões” (Mc 11.17).',
  'Na sexta o crucificaram. Mas as mesas, como vê, voltaram.',
] });
const [g0, g1, gz0] = LAY.gaiolas;
const pombeiro = poe(nAldeao, 1.7, g0 + 3.5, gz0 + 1.9, OLHA.norte, 'Conversando');
CONVERSAS.push({ nome: 'O vendedor de pombas', o: pombeiro.o, r: 2.4, falas: [
  'Pombas! Rolinhas! É a oferta dos pobres: quem não pode dar um cordeiro traz duas rolas ou dois pombinhos (Lv 12.8).',
  'Há uns trinta anos, contam, um casal de Nazaré comprou um par para apresentar aqui o filho primogênito (Lc 2.22-24). Gente simples, como a maioria que compra de mim.',
] });
const pombas = [];
for (let i = 0; i < 5; i++) {
  const x = g0 + 0.7 + i * 1.6, alto = (1 + (i % 3)) * 0.75;
  const p = poe(i % 2 ? gPomba2 : gPomba1, 0.24, x, gz0 + 0.5, rnd() * 6.28, 'Parado', alto, 0); pombas.push(p);
}
const [ox0, ox1, oz0, oz1] = LAY.curral_ov, [bx0, bx1, bz0, bz1] = LAY.curral_boi;
const ovelheiro = poe(nRobusto, 1.58, (ox0 + ox1) / 2, oz0 - 1.2, OLHA.norte, 'Parado');
const boieiro = poe(nMagro, 1.76, (bx0 + bx1) / 2, bz0 - 1.2, OLHA.norte, 'Conversando');
const [bxv, bzv] = LAY.barracas[2];
const vendedora = poe(nFaixa, 1.6, bxv, bzv + 1.5, OLHA.norte, 'Parado');
function rebanho(g, h, n, r, rx, rz, cx, cz, vel) {
  const L = [];
  for (let i = 0; i < n; i++) { const o = ator(g, h, cx + (rnd() * 2 - 1) * rx, cz + (rnd() * 2 - 1) * rz, rnd() * 6.28, rnd() < 0.6 ? 'Comer' : 'Parado'); o.alvo = null; o.espera = rnd() * 4; o.area = { cx, cz, rx, rz, vel }; L.push(o); }
  return L;
}
const ovelhas = rebanho(gOve, 0.8, 6, 0, (ox1 - ox0) / 2 - 1, (oz1 - oz0) / 2 - 1, (ox0 + ox1) / 2, (oz0 + oz1) / 2, 0.35);
const bois = rebanho(gBoi, 1.45, 3, 0, (bx1 - bx0) / 2 - 1.6, (bz1 - bz0) / 2 - 1.6, (bx0 + bx1) / 2, (bz0 + bz1) / 2, 0.25);

// ---------- o Pórtico de Salomão: um mestre e quem o ouve ----------
const [sx, , sz] = LAY.salomao;
const mestre = poe(nEscriba, 1.77, sx + 1.4, sz, OLHA.oeste, 'Conversando');
poe(nCacheado, 1.71, sx - 1.0, sz - 1.2, OLHA.leste + 0.4, 'Parado'); poe(nBotoes, 1.62, sx - 1.1, sz + 1.3, OLHA.leste - 0.4, 'Parado');
CONVERSAS.push({ nome: 'Um mestre da Lei', o: mestre.o, r: 2.6, falas: [
  'Esta manhã, bem cedo, alguns da guarda vieram falar com os principais sacerdotes. Vinham do sepulcro daquele Jesus de Nazaré.',
  'Os anciãos se reuniram, e deram muito dinheiro aos soldados. Agora andam dizendo que os discípulos dele vieram de noite e furtaram o corpo enquanto eles dormiam (Mt 28.11-13).',
  'Mas me diga: se dormiam, como sabem quem o levou?',
] });

// ---------- quem traz a oferta: um homem com o cordeiro nos braços e outro puxando uma ovelha ----------
const [nx_, , nz_] = LAY.norte;
const ROTA = [V3(nx_, 0, nz_ + 1), V3(-6, 0, -42), V3(0, 0, -34), V3(0, 0, -28.2), V3(27.6, 0, -27.6), V3(27.6, 0, EIXO), V3(fx - 0.3, 0, EIXO)];
const romeiro = ator(nPastor, 1.62, ROTA[1].x, ROTA[1].z, 0, 'Andar');
const puxa = ator(nMoco, 1.7, ROTA[0].x, ROTA[0].z, 0, 'Andar'), ovelhaP = ator(gOve, 0.8, ROTA[0].x, ROTA[0].z - 1.4, 0, 'Andar');
CONVERSAS.push({ nome: 'Um homem com um cordeiro', o: romeiro.o, r: 2.2, falas: [
  'Este cordeiro é uma oferta pacífica, de gratidão: o meu filho sarou da febre.',
  'Os sacerdotes o recebem lá dentro. O sangue vai ao altar, e a carne nós comemos com a família, aqui em Jerusalém (Lv 7.11-15).',
] });
const AND = [{ st: romeiro, i: 2, ida: true, espera: 0 }, { st: puxa, i: 1, ida: true, espera: 6 }];


// ---------- as coisas para olhar (entram na mesma lista das conversas, com outro verbo e sem nome no título) ----------
const coisa = (nome, x, z, falas, r = 2.2, verbo = 'olhar ' + nome) => CONVERSAS.push({ nome, titulo: '', verbo, o: { position: { x, z }, visible: true }, falas, r });
coisa('o altar', ix - 1.0, iz - 2.6, [
  'O altar dos holocaustos, de pedras brutas, com os quatro chifres; o fogo nunca se apaga (Lv 6.13).',
  'Cada manhã e cada tarde, um cordeiro de um ano, sem defeito, é oferecido aqui: o holocausto contínuo (Êx 29.38-42).',
  'João Batista, vendo Jesus, disse: “Eis o Cordeiro de Deus, que tira o pecado do mundo” (Jo 1.29).',
], 1.8);
coisa('o santuário', ix - 1.0, iz + 2.6, [
  'O santuário: o pórtico alto e branco, coberto de ouro. Lá dentro, o Lugar Santo, com o candelabro, a mesa dos pães e o altar do incenso; e, atrás do véu, o Santo dos Santos, onde só o sumo sacerdote entra, uma vez por ano (Êx 26.33; Lv 16.2).',
  'Na sexta, à hora nona, o véu do santuário se rasgou em dois, de alto a baixo (Mc 15.38).',
], 1.8);
coisa('o gazofilácio', 17.5, 5.5, [
  'As arcas das ofertas, no Pátio das Mulheres, com as bocas em forma de trombeta.',
  'Jesus, sentado aqui defronte, viu uma viúva pobre lançar duas pequenas moedas. E disse: “Esta pobre viúva deitou mais do que todos; porque todos deitaram do que lhes sobejava, mas esta, da sua pobreza, deitou tudo o que tinha, todo o seu sustento” (Mc 12.41-44).',
], 2.6, 'olhar as arcas das ofertas');
coisa('os candelabros', 14.2, 0.6, [
  'Quatro candelabros de ouro, altíssimos, cada um com quatro bacias no alto. Os jovens sacerdotes sobem pelas escadas para enchê-las de azeite (Mishná, Sukkah 5.2).',
  'Na Festa dos Tabernáculos, quando eles se acendem, a cidade inteira fica clara. Foi aqui, no lugar do gazofilácio, que ele disse: “Eu sou a luz do mundo; quem me segue não andará em trevas, mas terá a luz da vida” (Jo 8.12, 20).',
  'Agora estão apagados. Só voltam a ser acesos no outono.',
], 2.6, 'olhar os candelabros');
coisa('as mesas do mercado', LAY.mercado[0], LAY.mercado[2] - 3, [
  'As mesas dos cambistas e as gaiolas das pombas, dentro do pátio do templo.',
  'No começo, numa Páscoa, ele fez um açoite de cordas e expulsou todos do templo, as ovelhas e os bois, e disse: “Não façais da casa de meu Pai casa de negócio.” E os discípulos se lembraram: “O zelo da tua casa me devorará” (Jo 2.13-17; Sl 69.9).',
], 3.0, 'olhar o mercado');
coisa('a placa da balaustrada', LAY.soreg[0], LAY.soreg[2], [
  'Uma placa de pedra, com letras vermelhas em grego: “Nenhum estrangeiro entre além da balaustrada e do muro em volta do santuário. Quem for apanhado será culpado da própria morte.”',
  'Os profetas diziam que a casa de Deus seria chamada casa de oração para todos os povos (Is 56.7).',
], 2.0, 'ler a placa');
coisa('a Fortaleza Antônia', LAY.norte[0] - 6, LAY.norte[2] + 2.5, [
  'A Fortaleza Antônia, colada no canto do templo: daqui os soldados romanos vigiam o pátio durante as festas, para não haver tumulto.',
], 2.8, 'olhar a fortaleza');

function npcsPasso(dt) {
  altarPasso(dt);
  for (const o of [...ovelhas, ...bois]) {
    if (o.espera > 0) { o.espera -= dt; continue; }
    const a = o.area; if (!o.alvo) o.alvo = V3(a.cx + (rnd() * 2 - 1) * a.rx, 0, a.cz + (rnd() * 2 - 1) * a.rz);
    if (anda(o, o.alvo, dt, a.vel)) { o.alvo = null; o.espera = 3 + rnd() * 6; o.toca(rnd() < 0.7 ? 'Comer' : 'Parado'); }
  }
  for (const A of AND) {
    if (A.espera > 0) { A.espera -= dt; A.st.toca('Parado'); continue; }
    if (anda(A.st, ROTA[A.i], dt, 1.0)) {
      if (A.ida) { if (A.i < ROTA.length - 1) A.i++; else { A.ida = false; A.espera = 5; } }
      else { if (A.i > 0) A.i--; else { A.ida = true; A.espera = 4; } }
    }
  }
  // a ovelha vai atrás de quem a puxa
  const atras = puxa.o.position.clone().add(V3(-Math.sin(puxa.o.rotation.y) * 1.4, 0, -Math.cos(puxa.o.rotation.y) * 1.4));
  const dO = ovelhaP.o.position.distanceTo(atras);
  if (dO > 0.6) ovelhaP.segue = true; else if (dO < 0.15) ovelhaP.segue = false;
  if (ovelhaP.segue) anda(ovelhaP, atras, dt, 1.2); else ovelhaP.toca('Parado');
}

export { CONVERSAS, npcsPasso, sac1, sac2, sac3, sac4, ofertante, pobre, levitas, cambistas, ovelhas, bois, pombas, romeiro };
