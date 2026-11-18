// Betfagé: as duas pontas da estrada. No alto, a pergunta do Monte das Oliveiras; embaixo, a volta para Betânia.
import { E, botao, fade } from './estado.js';
import { AMOS, terreno } from './cenario.js';
import { tMin, tMax } from './aldeia.js';
import { jog } from './jogador.js';
import './vida.js';     // só para manter a ordem de montagem

const PERG = document.createElement('div');
Object.assign(PERG.style, { position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', background: '#fdf6e3', color: '#4a3520', padding: '20px 22px', borderRadius: '14px', boxShadow: '0 6px 24px #0005', fontSize: '18px', textAlign: 'center', display: 'none', zIndex: 8, maxWidth: '86vw' });
PERG.innerHTML = '<div style="margin-bottom:14px">Deseja ir ao Monte das Oliveiras?</div>';
const btSim = document.createElement('button'), btNao = document.createElement('button');
for (const [b, txt, cor] of [[btSim, 'Sim', '#4a3520'], [btNao, 'Ainda não', '#a8957a']]) { b.textContent = txt; Object.assign(b.style, { margin: '0 6px', padding: '10px 18px', border: 0, borderRadius: '10px', background: cor, color: '#fdf6e3', fontSize: '16px' }); PERG.appendChild(b); }
document.body.appendChild(PERG);
// voltar para Betânia: pergunta antes (sim: escurece e volta, sem a abertura)
const PERG2 = PERG.cloneNode(false); PERG2.innerHTML = '<div style="margin-bottom:14px">Deseja voltar para Betânia?</div>';
const bS2 = btSim.cloneNode(true), bN2 = btNao.cloneNode(true); PERG2.append(bS2, bN2); document.body.appendChild(PERG2);
function perguntaBetania() { E.fora = true; E.alvoToque = null; botao.style.display = 'none'; jog.toca('Parado'); PERG2.style.display = 'block'; }
bN2.onclick = () => { PERG2.style.display = 'none'; const p = AMOS[Math.round(tMin * AMOS.length) + 6]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); E.fora = false; };
bS2.onclick = () => { PERG2.style.display = 'none'; fade.textContent = 'De volta a Betânia…'; fade.style.opacity = 1; setTimeout(() => { location.href = '../fase-betania/?de=betfage'; }, 1200); };
function pergunta() { E.fora = true; E.alvoToque = null; botao.style.display = 'none'; jog.toca('Parado'); PERG.style.display = 'block'; }
btNao.onclick = () => { PERG.style.display = 'none'; const p = AMOS[Math.round(tMax * AMOS.length) - 6]; jog.o.position.set(p.x, terreno(p.x, p.z), p.z); E.fora = false; };
btSim.onclick = () => {
  PERG.style.display = 'none';
  fade.style.transition = 'none'; fade.textContent = ''; fade.style.opacity = 1;       // corte seco
  setTimeout(() => { fade.style.transition = ''; fade.textContent = 'Monte das Oliveiras'; }, 700);
  setTimeout(() => { fade.textContent = 'Monte das Oliveiras · Jerusalém (próxima fase, em construção)'; }, 2600);
};

// o botão de ação
function acionar() {
  if (botao.style.display !== 'block' || E.fora) return;
  if (E.saida === 'alto') { pergunta(); return; }
  if (E.saida === 'baixo') perguntaBetania();
}

export { acionar, pergunta, perguntaBetania };
