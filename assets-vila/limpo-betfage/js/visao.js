// Betfagé: o tom creme da ínsula e das casas.
import { CONSTR } from './cenario.js';
import { INS } from './insula.js';
import './saidas.js';     // só para manter a ordem de montagem

// a ínsula puxa para o creme acinzentado das pedras dos muros (o modelo veio muito avermelhado)
for (const alvo of [INS.g, ...CONSTR]) alvo.traverse((m) => {
  if (!m.isMesh) return;
  m.material = m.material.clone();          // só estas: o material pode ser o mesmo de outros objetos
  m.material.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
    float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
    diffuseColor.rgb = mix(diffuseColor.rgb, lum * vec3(1.08, 1.03, 0.9), 0.72);`); };
  m.material.customProgramCacheKey = () => 'insula-creme'; m.material.needsUpdate = true;
});
