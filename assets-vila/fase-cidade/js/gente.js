// Cidade alta: criação dos atores (motor comum), assentados no relevo.
import { criaAtores, maos } from '../../limpo-motor/atores.js';
import { scene, rnd } from './estado.js';
import { terreno } from './cenario.js';

const chao = (st) => { const x = st.o.position.x, z = st.o.position.z, r = 0.14; st.o.position.y = Math.max(terreno(x, z), terreno(x + r, z), terreno(x - r, z), terreno(x, z + r), terreno(x, z - r)); };
const { MIX, ator: ator0, anda, corpo } = criaAtores({ scene, rnd, alturaChao: terreno, assenta: chao, chegou: 0.06 });
// cada ator guarda as suas malhas: a sombra só fica ligada nos que estão perto do jogador (são ~15 mil triângulos cada,
// e a passada de sombra desenha todos de novo)
const ATORES = [];
// (desenhados depois dos vãos das portas: dentro do vão aparecem por inteiro, até a escuridão do fundo)
function ator(...a) { const st = ator0(...a); st.malhas = []; st.o.traverse((m) => { if (m.isMesh) { st.malhas.push(m); m.renderOrder = 3; } }); ATORES.push(st); return st; }
let tSombra = 0;
function sombrasPerto(dt, p, raio = 12) {
  if ((tSombra -= dt) > 0) return; tSombra = 0.25;
  for (const st of ATORES) { const s = Math.hypot(st.o.position.x - p.x, st.o.position.z - p.z) < raio; if (st.malhas[0] && st.malhas[0].castShadow !== s) for (const m of st.malhas) m.castShadow = s; }
}

export { MIX, ator, anda, ATORES, sombrasPerto, corpo, maos };
