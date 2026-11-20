// Getsêmani: com quem se conversa e o que se olha no jardim e no vale, na manhã do domingo.
// Na quinta à noite, depois da ceia, Jesus veio aqui com os discípulos, "como de costume" (Lc 22.39); orou, e foi preso
// aqui (Jo 18.1-12). O guarda do olival viu tudo.
import { dialogo, LAY, CIRC } from './estado.js';
import { nGuarda } from './modelos.js';
import { ator } from './gente.js';
import { PRENSA } from './cenario.js';
import { criaInteracoes } from '../../limpo-motor/interacoes.js';

const INT = criaInteracoes(dialogo);
const [gx, , gz] = LAY.portao, [ox, , oz] = LAY.oito, [tx, , tz] = LAY.tres, [cx, , cz] = LAY.cedrom;

// ---------- o guarda do olival, junto ao portão ----------
const guarda = ator(nGuarda, 1.7, gx - 3.0, gz + 3.2, -Math.PI / 2 + 0.4, 'Parado'); CIRC.push({ x: gx - 3.0, z: gz + 3.2, r: 0.35 });
INT.pessoa('O guarda do olival', guarda, [
  'Eu cuido destas oliveiras e da prensa. O rabi da Galileia vinha muito aqui à noite, com os discípulos (Jo 18.2).',
  'Na quinta, já tarde, veio uma multidão com lanternas, tochas e armas: soldados, guardas do templo, servos do sumo sacerdote. Judas vinha na frente (Jo 18.3).',
  'Ele foi ao encontro deles e perguntou: “A quem buscais?” Disseram: “A Jesus Nazareno.” Ele disse: “Sou eu.” E eles recuaram e caíram por terra (Jo 18.4-6).',
  'Um dos discípulos puxou a espada e cortou a orelha de um servo. O rabi tocou a orelha e o curou (Lc 22.50-51). Depois o amarraram e o levaram.',
  'Todos os discípulos fugiram (Mc 14.50). Um rapaz que o seguia, enrolado só num lençol, largou o lençol e fugiu nu (Mc 14.51-52). O lençol ficou ali, no chão.',
], { r: 2.6 });

// ---------- as coisas ----------
INT.coisa('a prensa de azeite', PRENSA.position.x, PRENSA.position.z, [
  'A prensa de azeite, na boca da gruta. A azeitona é esmagada sob a pedra, e depois espremida sob o peso da viga, até sair tudo.',
  'Getsêmani quer dizer “prensa de azeite”. Foi aqui que ele, em agonia, orou: “Pai, se queres, passa de mim este cálice” (Lc 22.42-44).',
], { r: 4.0 });
INT.coisa('o lugar dos oito', ox, oz, [
  'Pedras baixas, numa roda: aqui os discípulos ficaram sentados.',
  '“Assentai-vos aqui, enquanto vou além orar” (Mt 26.36).',
], { r: 3.4, verbo: 'olhar o lugar' });
INT.coisa('a oliveira dos três', tx, tz, [
  'Debaixo desta oliveira ficaram Pedro, Tiago e João.',
  'Ele voltou e os achou dormindo, e disse a Pedro: “Então nem uma hora pudestes vigiar comigo? Vigiai e orai, para que não entreis em tentação; na verdade, o espírito está pronto, mas a carne é fraca” (Mt 26.40-41).',
], { r: 3.0, verbo: 'olhar a oliveira' });
INT.coisa('o portão do jardim', gx + 1.5, gz, [
  'O portão na mureta.',
  '“E Judas, que o traía, também conhecia aquele lugar, porque Jesus muitas vezes se ajuntava ali com os seus discípulos” (Jo 18.2). Na quinta, ele deu um sinal: “O que eu beijar, esse é” (Mt 26.48).',
], { r: 2.2, verbo: 'olhar o portão' });
INT.coisa('o ribeiro de Cedrom', cx, cz, [
  'O leito do Cedrom, seco nesta época: só corre água nas chuvas do inverno.',
  'Mil anos atrás, Davi passou este ribeiro chorando, fugindo de Absalão, com a cabeça coberta e os pés descalços, e subiu o Monte das Oliveiras (2Sm 15.23, 30).',
  'Na quinta à noite, o Filho de Davi passou por aqui, para o jardim; horas depois, voltou preso (Jo 18.1, 12).',
], { r: 4.0, verbo: 'olhar o ribeiro' });
INT.coisa('os túmulos do vale', -50.0, 19.5, [
  'Os monumentos de pedra no pé do Monte das Oliveiras: a coluna com o teto em cone, a fachada de colunas, o bloco com a pirâmide. O povo diz que um é a coluna de Absalão (2Sm 18.18), outro o túmulo do profeta Zacarias.',
  'Jesus disse aos escribas e fariseus: “Edificais os sepulcros dos profetas e adornais os monumentos dos justos… vós sois filhos dos que mataram os profetas” (Mt 23.29-31).',
], { r: 6.0, verbo: 'olhar os túmulos' });

export { INT, guarda };
