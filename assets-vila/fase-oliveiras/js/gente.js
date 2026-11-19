// Monte das Oliveiras: criação dos atores (motor comum), assentados no relevo, e os clipes emprestados do discípulo.
import * as THREE from 'three';
import { criaAtores } from '../../limpo-motor/atores.js';
import { scene, rnd } from './estado.js';
import { terreno } from './cenario.js';
import { gJog } from './modelos.js';

const chao = (st) => { const x = st.o.position.x, z = st.o.position.z, r = 0.14; st.o.position.y = Math.max(terreno(x, z), terreno(x + r, z), terreno(x - r, z), terreno(x, z + r), terreno(x, z - r)); };
const { MIX, ator, anda } = criaAtores({ scene, rnd, alturaChao: terreno, assenta: chao, chegou: 0.06 });

// Os personagens da vila têm o mesmo esqueleto do discípulo jogável (mesmos ossos, mesma pose de repouso),
// então os clipes dele servem neles. As rotações vão como estão; o quadril (pelvis) vai pela diferença em relação
// ao repouso, na escala de cada um (o discípulo é mais baixo): assim quem empurra abaixa o quadril e não flutua.
const osso = (raiz, nome) => { let r = null; raiz.traverse((o) => { if (!r && o.name === nome) r = o; }); return r; };
function empresta(st, nomes) {
  const pJ = osso(gJog.scene, 'pelvis'), pN = osso(st.o, 'pelvis');
  const rJ = pJ ? pJ.position.clone() : null, rN = pN ? pN.position.clone() : null;
  const k = rJ && rN ? rN.length() / rJ.length() : 1;
  for (const n of nomes) {
    const c = gJog.animations.find((a) => a.name === n); if (!c) continue;
    const tr = c.tracks.filter((t) => t.name.endsWith('.quaternion'));
    const tp = c.tracks.find((t) => t.name === 'pelvis.position');
    if (tp && rJ) {
      const v = tp.values.slice();
      for (let i = 0; i < v.length; i += 3) { v[i] = rN.x + (v[i] - rJ.x) * k; v[i + 1] = rN.y + (v[i + 1] - rJ.y) * k; v[i + 2] = rN.z + (v[i + 2] - rJ.z) * k; }
      tr.push(new THREE.VectorKeyframeTrack('pelvis.position', tp.times, v));
    }
    st.A[n] = st.o.userData.mx.clipAction(new THREE.AnimationClip(n, c.duration, tr));
  }
}

export { MIX, ator, anda, chao, empresta };
