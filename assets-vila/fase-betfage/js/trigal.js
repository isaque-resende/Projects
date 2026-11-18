// Betfagé: o trigal maduro. Milhares de pés instanciados que balançam ao vento e se abrem quando alguém passa.
import * as THREE from 'three';
import { CIMA } from '../../limpo-motor/atores.js';
import { LAY, V3, rnd, scene } from './estado.js';
import { gTrigo } from './modelos.js';
import { terreno } from './cenario.js';
import './insula.js';     // só para manter a ordem de montagem

const CAMPO = LAY.campo;
const noCampo = (x, z, m = 0) => x > CAMPO.x0 - m && x < CAMPO.x1 + m && z > CAMPO.z0 - m && z < CAMPO.z1 + m;
const KT = {}; gTrigo.scene.traverse((o) => { if (o.isMesh) KT[o.name] = o; });
const UT = { uTime: { value: 0 }, uP: { value: [V3(999, 0, 999), V3(999, 0, 999), V3(999, 0, 999), V3(999, 0, 999)] }, uRadius: { value: 1.0 } };
function matTrigo(base) {
  const m = base.clone(); m.alphaTest = 0.5; m.side = THREE.DoubleSide;
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, UT);
    sh.vertexShader = 'uniform float uTime, uRadius; uniform vec3 uP[4];\n' + sh.vertexShader.replace('#include <project_vertex>', `
      vec4 wp = vec4(transformed, 1.0);
      #ifdef USE_INSTANCING
        wp = instanceMatrix * wp; vec3 base = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      #else
        vec3 base = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
      #endif
      wp = modelMatrix * wp;
      float h = clamp(position.y / 1.1, 0.0, 1.0); float b = h * h;
      float gust = 0.6 + 0.4 * sin(uTime * 0.5 + base.x * 0.15);
      wp.x += sin(uTime * 1.7 + base.x * 0.55 + base.z * 0.35) * 0.09 * b * gust;
      wp.z += cos(uTime * 1.3 + base.x * 0.3 + base.z * 0.7) * 0.05 * b * gust;
      for (int i = 0; i < 4; i++) {
        vec2 d = base.xz - uP[i].xz; float dist = length(d);
        float k = clamp(1.0 - dist / uRadius, 0.0, 1.0); k = k * k * (3.0 - 2.0 * k);
        vec2 dir = dist > 0.001 ? d / dist : vec2(1.0, 0.0);
        wp.xz += dir * k * 0.7 * b; wp.y -= k * 0.35 * b;
      }
      vec4 mvPosition = viewMatrix * wp;
      gl_Position = projectionMatrix * mvPosition;`);
  };
  m.customProgramCacheKey = () => 'trigo4';
  return m;
}
const TRIGO = [];
{
  const listas = { Trigo_Maduro: [], Trigo_Cheio: [], Trigo_Ralo: [] };
  const STEP = 0.34;
  for (let x = CAMPO.x0 + 0.2; x <= CAMPO.x1 - 0.1; x += STEP) for (let z = CAMPO.z0 + 0.2; z <= CAMPO.z1 - 0.1; z += STEP) {
    const px = x + (rnd() - 0.5) * STEP * 0.8, pz = z + (rnd() - 0.5) * STEP * 0.8;
    const borda = Math.min(px - CAMPO.x0, CAMPO.x1 - px, pz - CAMPO.z0, CAMPO.z1 - pz);
    listas[borda < 0.5 && rnd() < 0.6 ? 'Trigo_Ralo' : (rnd() < 0.55 ? 'Trigo_Maduro' : 'Trigo_Cheio')].push([px, pz]);
  }
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), c = new THREE.Color();
  for (const [nm, lista] of Object.entries(listas)) {
    const src = KT[nm]; if (!src || !lista.length) continue;
    const inst = new THREE.InstancedMesh(src.geometry, matTrigo(src.material), lista.length);
    lista.forEach(([x, z], i) => {
      const a = rnd() * Math.PI * 2, k = 0.9 + rnd() * 0.3, y = terreno(x, z) - 0.03;
      q.setFromAxisAngle(CIMA, a); s.set(k, k * (0.95 + rnd() * 0.2), k);
      inst.setMatrixAt(i, m4.compose(p.set(x, y, z), q, s));
      const t = 0.92 + rnd() * 0.16; inst.setColorAt(i, c.setRGB(t, t * (0.97 + rnd() * 0.05), t * 0.9));
      TRIGO.push({ m: inst, i, x, z, y, a, k, ky: s.y, cortado: false });
    });
    inst.receiveShadow = true; inst.frustumCulled = false; scene.add(inst);
  }
}
const _m4 = new THREE.Matrix4(), _q4 = new THREE.Quaternion(), _s4 = new THREE.Vector3(), _p4 = new THREE.Vector3();
function poeTrigo(w, alto) {
  _q4.setFromAxisAngle(CIMA, w.a);
  if (alto) _s4.set(w.k, w.ky, w.k); else _s4.set(w.k * 0.75, 0.12, w.k * 0.75);
  w.m.setMatrixAt(w.i, _m4.compose(_p4.set(w.x, w.y, w.z), _q4, _s4)); w.m.instanceMatrix.needsUpdate = true;
}
function corta(x, z, r) { for (const w of TRIGO) if (!w.cortado && Math.hypot(w.x - x, w.z - z) < r) { w.cortado = true; poeTrigo(w, false); } }
function rebrota() { for (const w of TRIGO) if (w.cortado) { w.cortado = false; poeTrigo(w, true); } }

export { KT, CAMPO, corta, rebrota, noCampo, UT };
