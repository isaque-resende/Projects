// Monte das Oliveiras: com quem se conversa e o que se olha na subida e na descida, na manhã do domingo.
import { dialogo, LAY } from './estado.js';
import { AMOS } from './cenario.js';
import { prenseiro } from './prensa.js';
import { criaInteracoes } from '../../limpo-motor/interacoes.js';

const INT = criaInteracoes(dialogo);
const naEstrada = (x) => AMOS.reduce((m, a) => (Math.abs(a.x - x) < Math.abs(m.x - x) ? a : m), AMOS[0]);

INT.pessoa('O homem da prensa', prenseiro, [
  'A azeitona vai na pia, a pedra roda por cima, e depois a massa vai para a prensa, debaixo da viga com os pesos.',
  'O primeiro azeite, o que escorre sem apertar, é o mais puro: é o que se leva para o candelabro do templo (Êx 27.20).',
  'Lá embaixo, no jardim, tem outra prensa: por isso o lugar se chama Getsêmani, “prensa de azeite”. Na quinta à noite, o rabi de vocês foi orar lá. Vi as tochas descendo depois.',
], { r: 3.2 });

const [cx, , cz] = LAY.cume;
INT.coisa('Jerusalém', cx - 2, cz, [
  'Daqui se vê a cidade inteira: os muros, o templo de pedra branca e ouro, as casas da cidade alta.',
  '“E, quando ia chegando, vendo a cidade, chorou sobre ela, dizendo: Ah! se tu conhecesses também, ao menos neste teu dia, o que à tua paz pertence!” (Lc 19.41-42)',
  '“Não deixarão em ti pedra sobre pedra, pois que não conheceste o tempo da tua visitação” (Lc 19.44).',
], { r: 4.0, verbo: 'olhar Jerusalém' });
const d = naEstrada(cx - 22);
INT.coisa('a descida', d.x, d.z, [
  'A descida do Monte das Oliveiras.',
  '“E, quando já chegava perto da descida do Monte das Oliveiras, toda a multidão dos discípulos, regozijando-se, começou a dar louvores a Deus em alta voz” (Lc 19.37).',
  'Alguns fariseus disseram: “Mestre, repreende os teus discípulos.” E ele respondeu: “Digo-vos que, se estes se calarem, as próprias pedras clamarão” (Lc 19.39-40).',
], { r: 3.0, verbo: 'olhar o caminho' });
const b = naEstrada(cx + 40);
INT.coisa('o caminho de Betfagé', b.x, b.z, [
  '“E, quando se aproximaram de Jerusalém, e chegaram a Betfagé, ao Monte das Oliveiras, enviou Jesus dois discípulos” (Mt 21.1).',
  'Por aqui subiu a multidão com os ramos, há uma semana.',
], { r: 3.0, verbo: 'olhar o caminho' });

export { INT };
