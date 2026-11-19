// Monte das Oliveiras: criação dos atores (motor comum), assentados no relevo, e os clipes emprestados do discípulo.
import * as THREE from 'three';
import { criaAtores } from '../../limpo-motor/atores.js';
import { scene, rnd } from './estado.js';
import { terreno } from './cenario.js';
import { gJog } from './modelos.js';

const chao = (st) => { const x = st.o.position.x, z = st.o.position.z, r = 0.14; st.o.position.y = Math.max(terreno(x, z), terreno(x + r, z), terreno(x - r, z), terreno(x, z + r), terreno(x, z - r)); };
const { MIX, ator, anda } = criaAtores({ scene, rnd, alturaChao: terreno, assenta: chao, chegou: 0.06 });

// Os personagens da vila têm o mesmo esqueleto do discípulo jogável (mesmos ossos, mesma pose de repouso),
// então os clipes dele servem neles. Só as rotações vão: a altura do quadril fica a de cada um.
function empresta(st, nomes) {
  for (const n of nomes) {
    const c = gJog.animations.find((a) => a.name === n); if (!c) continue;
    const so = new THREE.AnimationClip(n, c.duration, c.tracks.filter((t) => t.name.endsWith('.quaternion')));
    st.A[n] = st.o.userData.mx.clipAction(so);
  }
}

export { MIX, ator, anda, chao, empresta };
