// Betfagé: com quem se conversa e o que se olha na aldeia, na manhã do domingo.
// Daqui Jesus mandou dois discípulos buscar a jumenta e o jumentinho, na semana passada (Mt 21.1-7; Mc 11.1-7). No
// caminho de Betânia, na segunda-feira, teve fome e foi a uma figueira só com folhas; no dia seguinte ela estava seca
// desde as raízes (Mc 11.12-14, 20-21). E é o tempo da colheita da cevada: o primeiro feixe, as primícias, é levado ao
// sacerdote "no dia seguinte ao sábado" (Lv 23.10-11) — hoje.
import { E, LAY } from './estado.js';
import { criaUI } from '../../limpo-motor/ui.js';
import { criaInteracoes } from '../../limpo-motor/interacoes.js';
import { jumenta, conv1, conv2, andante } from './aldeia.js';
import { ceifeiro, atadeira, carregador } from './ceifa.js';
import { debulhador, joeiradeira } from './eira.js';

const { dialogo } = criaUI(E);
const INT = criaInteracoes(dialogo);

// ---------- as pessoas ----------
INT.pessoa('O dono da jumenta', conv1, [
  'Foram os seus companheiros, não foram? Na semana passada vieram dois e começaram a desamarrar a minha jumenta e o jumentinho.',
  'Perguntei: “Por que desprendeis o jumentinho?” E eles disseram: “O Senhor precisa dele” (Lc 19.33-34). Deixei. Não sei explicar por quê.',
  'Depois vi a multidão estendendo as capas no caminho, e ele montado no jumentinho, descendo para a cidade.',
]);
INT.pessoa('O vizinho', conv2, [
  'O profeta Zacarias já tinha dito: “Eis que o teu rei virá a ti, justo e salvador, pobre, e montado sobre um jumento, sobre um jumentinho” (Zc 9.9).',
  'Um rei montado num jumentinho… e na sexta o crucificaram. Eu não entendo.',
]);
INT.pessoa('O ceifeiro', ceifeiro, [
  'É a cevada, a primeira que amadurece. Depois vem o trigo, perto de Pentecostes.',
  'Hoje, no dia seguinte ao sábado da Páscoa, os sacerdotes levantam diante do Senhor o primeiro feixe, as primícias da colheita (Lv 23.10-11). Antes disso ninguém come do grão novo (Lv 23.14).',
], { r: 2.8 });
INT.pessoa('A moça dos feixes', atadeira, [
  'Eu amarro os feixes. E deixo umas espigas para trás, para os pobres, como manda a Lei (Lv 23.22; Rt 2.15-16).',
], { r: 2.6 });
INT.pessoa('O carregador', carregador, [
  'O boi puxa a carroça até a eira. Lá eles malham e jogam ao vento, para separar o grão da palha.',
], { r: 2.6 });
INT.pessoa('O homem da eira', debulhador, [
  'Com o forcado a gente joga a palha para o alto, e o vento leva; o grão cai aqui (Sl 1.4).',
  'João, o que batizava no Jordão, dizia que viria um com a pá na mão, para limpar a sua eira e recolher o trigo no celeiro (Mt 3.12).',
], { r: 2.6 });
INT.pessoa('A mulher da eira', joeiradeira, [
  'Peneirando o grão. Dá trabalho, mas o pão sai limpo.',
], { r: 2.6 });
INT.pessoa('Um caminhante', andante, [
  'Vou para Jerusalém. Ainda tem muito peregrino na cidade, por causa da festa.',
]);

// ---------- as coisas ----------
INT.pessoa('a jumenta e o jumentinho', jumenta, [
  'Uma jumenta amarrada, e um jumentinho com ela, “sobre o qual ainda não montou homem algum” (Mc 11.2).',
  '“E trouxeram o jumentinho a Jesus, e lançaram sobre ele as suas vestes, e assentou-se sobre ele” (Mc 11.7).',
], { r: 3.0, verbo: 'olhar a jumenta e o jumentinho', titulo: '' });
const [fx, fz] = LAY.figseca;
INT.coisa('a figueira seca', fx, fz, [
  'Uma figueira seca desde as raízes.',
  'Na segunda-feira, vindo de Betânia, Jesus teve fome; viu de longe uma figueira com folhas, mas não achou nela senão folhas. E disse: “Nunca mais coma alguém fruto de ti.” No dia seguinte, viram que ela estava seca desde as raízes (Mc 11.12-14, 20).',
  'E Jesus disse: “Tende fé em Deus” (Mc 11.22).',
], { r: 3.2 });
const e = LAY.eira;
INT.coisa('a eira', e.x, e.z, ['A eira: um chão de pedra batida, redondo, no alto, onde passa o vento. Aqui se malha o grão e se separa a palha.'], { r: e.r + 1.2 });
const c = LAY.campo;
INT.coisa('a cevada', (c.x0 + c.x1) / 2, c.z1 + 1.5, [
  'A cevada madura, a primeira colheita do ano.',
  'As primícias da colheita são oferecidas no dia seguinte ao sábado da Páscoa (Lv 23.10-11). “Mas agora Cristo ressuscitou dos mortos, e foi feito as primícias dos que dormem” (1Co 15.20).',
], { r: 3.0 });

export { INT };
