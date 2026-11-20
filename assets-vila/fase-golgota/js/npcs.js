// Gólgota: quem está no horto na manhã do domingo (Jo 20.1-13).
//   - Pedro e o outro discípulo chegam correndo pela estrada, vindos da Porta de Genat (a cena começa na cidade alta).
//     O outro chega primeiro e para na porta, sem entrar; Pedro chega e entra; depois o outro entra também, "e viu, e
//     creu"; e os dois voltam para casa (Jo 20.4-10). A cena se repete.
//   - Maria Madalena fica do lado de fora, junto ao sepulcro, chorando (Jo 20.11): dá para conversar com ela.
import { LAY, V3, CIRC, fala } from './estado.js';
import { nPedro, nJoao, nMaria } from './modelos.js';
import { AMOS } from './cenario.js';
import { ator, anda } from './gente.js';

const CONVERSAS = [];
const [sx, , sz] = LAY.sepulcro, [ox, , oz] = LAY.olhar;
// ---------- Maria Madalena, chorando do lado de fora ----------
const maria = ator(nMaria, 1.5, sx + 2.6, sz + 3.2, -Math.PI / 2 - 0.5, 'Parado'); CIRC.push({ x: sx + 2.6, z: sz + 3.2, r: 0.35 });
CONVERSAS.push({ nome: 'Maria Madalena', o: maria.o, r: 2.4, falas: [
  'Ela está chorando junto ao sepulcro. Levanta os olhos para você.',
  '“Levaram o meu Senhor, e não sei onde o puseram.” (Jo 20.13)',
  'Viemos de madrugada, ainda escuro, trazendo os aromas para ungir o corpo. E a pedra já estava revolvida (Mc 16.1-4; Jo 20.1).',
  'Pedro e o outro discípulo vieram correndo. Entraram, viram os lençóis… e voltaram para casa. Eu fico aqui.',
] });

// ---------- Pedro e João (Jo 20.3-10) ----------
// o caminho: pela estrada, desde a ponta sudeste, até a entrada do horto, e pelo caminho do horto até a porta do sepulcro
const C0 = LAY.caminho[0], iC = AMOS.reduce((m, a, i) => (Math.hypot(a.x - C0[0], a.z - C0[1]) < Math.hypot(AMOS[m].x - C0[0], AMOS[m].z - C0[1]) ? i : m), 0);
const ROTA = [...AMOS.filter((a, i) => i >= 6 && i < iC && i % 8 === 0).map((a) => V3(a.x, 0, a.z)), ...LAY.caminho.filter((p, i) => i % 3 === 0).map(([x, z]) => V3(x, 0, z)), V3(ox, 0, oz)];
const PORTA = V3(sx + 0.2, 0, sz);
const pedro = ator(nPedro, 1.68, ROTA[0].x, ROTA[0].z, 0, 'Correr'), joao = ator(nJoao, 1.71, ROTA[0].x, ROTA[0].z, 0, 'Correr');
for (const st of [pedro, joao]) st.o.visible = false;
const CENA = { fase: 'espera', t: 2, iP: 0, iJ: 0, viu: {} };
function legendaPerto(chave, txt, pj, st) {
  if (CENA.viu[chave] || Math.hypot(st.o.position.x - pj.x, st.o.position.z - pj.z) > 24) return;
  CENA.viu[chave] = true; fala(txt); setTimeout(() => fala(''), 9000);
}
function cenaPasso(dt, pj) {
  CENA.t -= dt;
  if (CENA.fase === 'espera') {
    if (CENA.t > 0) return;
    CENA.fase = 'correm'; CENA.iP = CENA.iJ = 1; pedro.o.position.copy(ROTA[0]); joao.o.position.copy(ROTA[0]).add(V3(0.7, 0, 0.5)); pedro.o.visible = joao.o.visible = true; return;
  }
  if (CENA.fase === 'correm') {
    // o outro discípulo corre mais depressa (Jo 20.4)
    if (CENA.iJ < ROTA.length) { if (anda(joao, ROTA[CENA.iJ], dt, 4.8)) CENA.iJ++; joao.toca('Correr'); }
    else { joao.toca('Parado'); legendaPerto('joao', 'O outro discípulo chegou primeiro ao sepulcro; e, abaixando-se, viu ali os lençóis; todavia não entrou. (Jo 20.4-5)', pj, joao); }
    if (CENA.iP < ROTA.length) { if (anda(pedro, ROTA[CENA.iP], dt, 3.9)) CENA.iP++; pedro.toca('Correr'); }
    else if (anda(pedro, PORTA, dt, 1.0)) {
      pedro.o.visible = false; CENA.fase = 'dentro1'; CENA.t = 4;
      legendaPerto('pedro', 'Chegou Simão Pedro, que o seguia, e entrou no sepulcro, e viu os lençóis, e o lenço enrolado num lugar à parte. (Jo 20.6-7)', pj, joao);
    }
    return;
  }
  if (CENA.fase === 'dentro1') {
    if (CENA.t > 0) return;
    if (anda(joao, PORTA, dt, 1.0)) { joao.o.visible = false; CENA.fase = 'dentro2'; CENA.t = 9; legendaPerto('creu', 'Então entrou também o outro discípulo, que chegara primeiro ao sepulcro, e viu, e creu. (Jo 20.8)', pj, maria); }
    return;
  }
  if (CENA.fase === 'dentro2') {
    if (CENA.t > 0) return;
    CENA.fase = 'voltam'; CENA.iP = CENA.iJ = ROTA.length - 1; pedro.o.position.copy(ROTA[ROTA.length - 1]); joao.o.position.copy(ROTA[ROTA.length - 1]).add(V3(0.6, 0, 0.6)); pedro.o.visible = joao.o.visible = true;
    legendaPerto('volta', 'E os discípulos tornaram para casa. (Jo 20.10)', pj, pedro);
    return;
  }
  if (CENA.fase === 'voltam') {
    if (CENA.iP >= 0 && anda(pedro, ROTA[CENA.iP], dt, 1.2)) CENA.iP--;
    if (CENA.iJ >= 0 && anda(joao, ROTA[CENA.iJ].clone().add(V3(0.6, 0, 0.6)), dt, 1.2)) CENA.iJ--;
    if (CENA.iP < 0 && CENA.iJ < 0) { pedro.o.visible = joao.o.visible = false; CENA.fase = 'espera'; CENA.t = 45; }
  }
}


// ---------- as coisas para olhar (entram na mesma lista das conversas, com outro verbo e sem nome no título) ----------
const coisa = (nome, x, z, falas, r = 2.2, verbo = 'olhar ' + nome) => CONVERSAS.push({ nome, titulo: '', verbo, o: { position: { x, z }, visible: true }, falas, r });
const [gx, , gz] = LAY.golgota;
coisa('as cruzes', gx, gz - 2.0, [
  'As três cruzes, vazias, no alto do rochedo. Os corpos foram tirados na sexta, antes do sábado (Jo 19.31).',
  '“Pai, perdoa-lhes, porque não sabem o que fazem” (Lc 23.34).',
  'A um dos malfeitores: “Em verdade te digo que hoje estarás comigo no Paraíso” (Lc 23.43).',
  'À sua mãe: “Mulher, eis aí o teu filho.” Ao discípulo: “Eis aí tua mãe” (Jo 19.26-27).',
  '“Eli, Eli, lemá sabactâni?”, isto é: “Deus meu, Deus meu, por que me desamparaste?” (Mc 15.34; Sl 22.1).',
  '“Tenho sede” (Jo 19.28).',
  '“Está consumado” (Jo 19.30).',
  '“Pai, nas tuas mãos entrego o meu espírito” (Lc 23.46).',
], 2.6);
coisa('o letreiro', gx, gz + 2.0, [
  'No alto da cruz do meio, uma tábua com letras em três línguas: “JESUS NAZARENO, REI DOS JUDEUS”, em hebraico, grego e latim (Jo 19.19-20).',
  'Os principais sacerdotes pediram a Pilatos: “Não escrevas: Rei dos judeus, mas que ele disse: Sou o rei dos judeus.” Pilatos respondeu: “O que escrevi, escrevi” (Jo 19.21-22).',
], 2.2, 'ler o letreiro');
coisa('a pedra rolada', sx + 1.6, sz - 2.6, [
  'A pedra redonda que fechava o sepulcro, rolada para o lado. Era muito grande (Mc 16.4).',
  'Os principais sacerdotes tinham mandado selar a pedra e pôr uma guarda (Mt 27.66). Mas houve um grande terremoto: um anjo do Senhor desceu do céu, revolveu a pedra e se assentou sobre ela; e os guardas ficaram como mortos (Mt 28.2-4).',
], 1.8, 'olhar a pedra');
coisa('os túmulos antigos', -32.5, 15.0, [
  'Túmulos antigos, cavados na parede da pedreira, fechados com pedras quadradas.',
  'Quando ele expirou, a terra tremeu, as pedras se fenderam, e os sepulcros se abriram; e muitos corpos de santos que dormiam foram ressuscitados, e, saindo dos sepulcros, depois da ressurreição dele, entraram na cidade santa e apareceram a muitos (Mt 27.51-53).',
], 3.0, 'olhar os túmulos');

function npcsPasso(dt, pj) { cenaPasso(dt, pj); }

export { CONVERSAS, CENA, npcsPasso, maria, pedro, joao };
