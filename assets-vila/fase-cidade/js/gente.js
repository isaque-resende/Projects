// Cidade alta: criação dos atores (motor comum), assentados no relevo.
import { criaAtores } from '../../limpo-motor/atores.js';
import { scene, rnd } from './estado.js';
import { terreno } from './cenario.js';

const chao = (st) => { const x = st.o.position.x, z = st.o.position.z, r = 0.14; st.o.position.y = Math.max(terreno(x, z), terreno(x + r, z), terreno(x - r, z), terreno(x, z + r), terreno(x, z - r)); };
const { MIX, ator, anda } = criaAtores({ scene, rnd, alturaChao: terreno, assenta: chao, chegou: 0.06 });

export { MIX, ator, anda };
