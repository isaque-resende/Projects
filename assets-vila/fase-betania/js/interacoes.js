// Betânia: com quem se conversa e o que se olha na vila, na manhã do domingo (o primeiro dia da semana).
// Betânia é a aldeia de Marta, Maria e Lázaro, a uns quinze estádios de Jerusalém (Jo 11.1, 18). Seis dias antes da
// Páscoa, Jesus jantou aqui, e Maria ungiu os pés dele com nardo (Jo 12.1-8). Na manhã seguinte, saiu daqui para entrar
// em Jerusalém montado num jumentinho (Jo 12.12). Agora é domingo de novo: ele foi crucificado na sexta e sepultado.
import { dialogo, P } from './estado.js';
import { padeira, pisador, vendedor, lenco, marta, lazaro, cleopas, foguista, ajudante } from './personagens.js';
import { aguadeira } from './poco.js';
import { lavrador } from './lavoura.js';
import { criaInteracoes } from '../../limpo-motor/interacoes.js';

const INT = criaInteracoes(dialogo);
const INTRO = { feita: false };       // a conversa da abertura com Cléopas já aconteceu?

// ---------- as falas de Cléopas na abertura (intro.js) ----------
const ABERTURA = [
  'Você também não dormiu, não é? Eu ainda vejo a cruz quando fecho os olhos.',
  'Nós esperávamos que fosse ele quem havia de remir Israel (Lc 24.21). E agora… é o terceiro dia.',
  'Hoje volto para casa, para Emaús. Mas antes quero ver os outros, em Jerusalém.',
  'Faça o caminho com calma: Betfagé, o Monte das Oliveiras, a cidade. Depois me encontre na porta que dá para a estrada de Emaús, a oeste, fora do muro.',
];

// ---------- as pessoas ----------
INT.pessoa('Cléopas', cleopas, () => (INTRO.feita ? [
  'Vá na frente. Eu passo antes onde os outros estão reunidos.',
  'Nos encontramos na porta da cidade que dá para Emaús, do outro lado de Jerusalém. A estrada sai pela Porta de Genat, passando pelo lugar da Caveira.',
] : ABERTURA));
INT.pessoa('Marta', marta, [
  'Bom dia. Entre, se quiser: tem pão. Comer faz bem até em dia de luto.',
  'No sábado antes da Páscoa demos uma ceia para ele aqui. Eu servia, Lázaro estava à mesa, e Maria quebrou um vaso de nardo e ungiu os pés dele; a casa inteira se encheu do perfume (Jo 12.1-3).',
  'Quando Lázaro morreu, eu disse: “Senhor, se estivesses aqui, meu irmão não teria morrido.” E ele me respondeu: “Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá” (Jo 11.21-25).',
  'Eu disse a ele que cria. Ainda creio. Mesmo agora, não sei explicar como.',
]);
INT.pessoa('Lázaro', lazaro, [
  'Quatro dias eu estive ali dentro, naquele túmulo. Jesus mandou: “Tirai a pedra.” Marta ainda disse: “Senhor, já cheira mal” (Jo 11.39).',
  'Depois ouvi a voz dele: “Lázaro, vem para fora!” E eu saí, com as faixas nos pés e nas mãos, e o rosto envolto num lenço (Jo 11.43-44).',
  'Ele chorou diante da pedra (Jo 11.35). E a pedra foi tirada.',
  'Os principais sacerdotes resolveram me matar também, porque por minha causa muitos judeus iam e criam nele (Jo 12.10-11).',
  'Agora é ele que está num túmulo, com uma pedra na porta. Eu não paro de pensar nisso: a pedra do meu foi tirada.',
]);
INT.pessoa('A padeira', padeira, [
  'Pão sem fermento, ainda: é a semana dos Pães Asmos (Êx 12.15-18).',
  'Leve um pedaço para o caminho. Até Jerusalém são uns quinze estádios, menos de uma hora a pé (Jo 11.18).',
]);
INT.pessoa('O rapaz do forno', foguista, [
  'O forno está quente desde antes do sol. No sábado não se acende fogo (Êx 35.3); hoje, sim.',
]);
INT.pessoa('O homem do lagar', pisador, [
  'Uva ainda não tem: a vindima é no fim do verão. Estou limpando o lagar.',
  'Ele contou uma parábola de um homem que plantou uma vinha, fez um lagar e a arrendou… e os lavradores mataram o filho do dono (Mc 12.1-8). Fiquei pensando nisso a semana inteira.',
]);
INT.pessoa('O vendedor', vendedor, [
  'Figos secos, tâmaras, azeite! Vai para Jerusalém? Leve alguma coisa.',
  'Na semana passada, a estrada encheu de gente com ramos de palmeira, gritando “Hosana! Bendito o que vem em nome do Senhor!” (Jo 12.12-13). Saíram daqui e de Betfagé.',
]);
INT.pessoa('Uma mulher', lenco, [
  'Você é um dos que andavam com o rabi da Galileia? Tome cuidado em Jerusalém.',
  'Dizem que os chefes querem acabar de vez com o assunto.',
]);
INT.pessoa('A moça do poço', aguadeira, [
  'Quer beber? A água está fresca.',
  'Ele dizia que quem bebesse da água que ele dá nunca mais teria sede (Jo 4.14). Eu não entendia. Ainda não entendo.',
]);
INT.pessoa('O lavrador', lavrador, [
  'No sábado descansamos, conforme o mandamento (Lc 23.56). Hoje é o primeiro dia da semana: volto ao campo.',
  'Quem põe a mão no arado e olha para trás não é apto para o reino de Deus (Lc 9.62). Foi ele quem disse.',
], { r: 2.6 });
INT.pessoa('Um freguês', ajudante, [
  'Estão dizendo que os galileus vão voltar para casa depois da festa. Você também?',
]);

// ---------- as coisas ----------
// (o túmulo de Lázaro já tem as ações dele: rolar a pedra e entrar, em tumulo.js e interiores.js)
const pp = P('poco', -4.6, 4.6);
INT.coisa('o poço', pp.x + 1.6, pp.z - 1.2, ['Uma cisterna cavada na rocha: a água das chuvas do inverno, guardada para o verão.'], { r: 1.6 });
const pa = P('aprisco', 0, 0);
if (pa.x || pa.z) INT.coisa('o aprisco', pa.x, pa.z, ['O aprisco das ovelhas, com a porta.', '“Eu sou a porta das ovelhas… Eu sou o bom Pastor; o bom Pastor dá a sua vida pelas ovelhas” (Jo 10.7, 11).'], { r: 3.0 });

export { INT, INTRO, ABERTURA };
