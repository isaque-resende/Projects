// Betânia: o que o botão de ação faz, conforme onde o jogador está.
import { dialogo, E, botao, fade } from './estado.js';
import { CAMT, TUM } from './tumulo.js';
import { NOMES } from './personagens.js';
import { jog } from './jogador.js';
import { sairTumba, CASAI, sairCasaInt, entrarTumba } from './interiores.js';

function perguntaBetfage() {
  dialogo('', 'Deseja ir para Betfagé?', [['Ainda não', () => { jog.o.position.x = Math.max(jog.o.position.x, -31); }, '#a8957a'], ['Sim', irBetfage]]);
}
function irBetfage() {
  if (E.fora) return; E.fora = true; E.alvoToque = null; botao.style.display = 'none';
  fade.style.transition = 'opacity .9s'; fade.textContent = 'A caminho de Betfagé…'; fade.style.opacity = 1;
  setTimeout(() => { location.href = '../limpo-betfage/?de=betania'; }, 1300);
}
function acionar() {
  if (botao.style.display !== 'block' || E.fora) return;
  if (CAMT.on) { sairTumba(); return; }
  if (CASAI.on) { sairCasaInt(); return; }
  if (E.tumbaPerto) { entrarTumba(); return; }
  if (E.pedraPerto && jog.o.position.x >= -30) { TUM.alvo = TUM.alvo ? 0 : 1; return; }
  if (E.falaPerto) { const n = E.falaPerto; dialogo(NOMES.get(n), '(conversa em breve)', [['Prosseguir']]); return; }
  if (E.portaPerto && jog.o.position.x >= -30) { E.CASA_ANIM = { c: E.portaPerto, e: 'abre', t: 0 }; E.fora = true; E.alvoToque = null; botao.style.display = 'none'; return; }
  perguntaBetfage();
}

export { acionar, perguntaBetfage };
