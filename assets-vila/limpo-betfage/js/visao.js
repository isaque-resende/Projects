// Betfagé: o que tampa o jogador fica transparente; e o tom creme da ínsula.
import * as THREE from 'three';
import { FADE } from './estado.js';
import { CONSTR } from './cenario.js';
import { INS } from './insula.js';
import { jog, camera } from './jogador.js';
import './saidas.js';     // só para manter a ordem de montagem

for (const o of FADE) o.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); m.material.transparent = true; m.userData.op = 1; } });
const rayCam = new THREE.Raycaster();
function atualizaFade() {
  const p = jog.o.position.clone(), y0 = p.y, tampa = new Set();
  for (const alt of [0.2, 0.9, 1.6]) {
    p.y = y0 + alt; const d = camera.position.clone().sub(p); const L = d.length(); d.normalize();
    rayCam.set(p, d); rayCam.far = L;
    for (const h of rayCam.intersectObjects(FADE, true)) { let o = h.object; while (o.parent && !FADE.includes(o)) o = o.parent; tampa.add(o); }
  }
  for (const o of FADE) {
    const alvo = tampa.has(o) ? 0.25 : 1;
    if (o.userData.opAlvo === alvo && Math.abs((o.userData.opAt ?? 1) - alvo) < 0.01) continue;
    o.userData.opAlvo = alvo; let at = 1;
    o.traverse((m) => { if (m.isMesh) { m.userData.op += (alvo - m.userData.op) * 0.15; m.material.opacity = m.userData.op; m.material.depthWrite = m.userData.op > 0.95; at = m.userData.op; } });
    o.userData.opAt = at;
  }
}

// a ínsula puxa para o creme acinzentado das pedras dos muros (o modelo veio muito avermelhado)
for (const alvo of [INS.g, ...CONSTR]) alvo.traverse((m) => {
  if (!m.isMesh) return;
  m.material.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
    float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
    diffuseColor.rgb = mix(diffuseColor.rgb, lum * vec3(1.08, 1.03, 0.9), 0.72);`); };
  m.material.customProgramCacheKey = () => 'insula-creme'; m.material.needsUpdate = true;
});

export { atualizaFade };
