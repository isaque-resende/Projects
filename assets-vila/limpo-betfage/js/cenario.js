// Betfagé: o cenário que vem do Blender. Terreno, estrada e muros (betfage_cenario.glb)
// e as árvores, pedras e objetos do layout.
// ---------- cenário do Blender: terreno, estrada, muros ----------
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura } from '../../limpo-motor/terreno.js';
import { scene, texChao, LAY, rnd, V3, FADE } from './estado.js';
import { gCen, KIT } from './modelos.js';

const matTerra = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true });
let TERRENO = null;
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Betfage_Terreno')) { o.material = matTerra; TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Betfage_Estrada')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
// terreno e estrada com sombreamento suave e cor misturada entre os vértices (sem faces chapadas)
const amacia = (mesh, verdeia) => { suaviza(mesh, verdeia); mesh.material = mesh.material.clone(); mesh.material.flatShading = false; mesh.material.needsUpdate = true; };
amacia(TERRENO, true);
gCen.scene.traverse((o) => { if (o.isMesh && o.name.startsWith('Betfage_Estrada')) amacia(o, false); });
// texturas pintadas (grama e terra), projetadas de cima pelo mundo; a cor de vértice decide onde é grama e onde é terra
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
function texturiza(mesh, soTerra) {
  const m = mesh.material;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uGrama = { value: TX.grama }; sh.uniforms.uTerra = { value: TX.terra };
    sh.vertexShader = 'varying vec3 vWP; varying vec3 vWN;\n' + sh.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n vWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = 'uniform sampler2D uGrama; uniform sampler2D uTerra; varying vec3 vWP; varying vec3 vWN;\n' + sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      vec3 vc = vColor.rgb;
      vec3 tg = texture2D(uGrama, vWP.xz * 0.2).rgb;
      vec3 tt = texture2D(uTerra, vWP.xz * 0.16 + 0.37).rgb;
      float gr = ${soTerra ? '0.0' : 'smoothstep(-0.045, 0.0, vc.g - vc.r) * smoothstep(0.55, 0.8, vWN.y)'};
      float seco = ${soTerra ? '0.0' : '1.0 - smoothstep(-0.01, 0.04, vc.g - vc.r)'};
      tg = mix(tg, vec3(dot(tg, vec3(0.3, 0.59, 0.11))), 0.18) * vec3(0.9, 0.88, 0.8);              // grama menos neon
      tg = mix(tg, tg * vec3(1.15, 1.0, 0.65), seco * 0.6);                                         // capim seco amarelado
      float lt = dot(tt, vec3(0.3, 0.59, 0.11));
      vec3 terra = mix(tt, vec3(lt) * vec3(1.18, 1.02, 0.78), 0.45) * 1.05;                         // terra bege, menos laranja
      diffuseColor.rgb = mix(terra, tg, gr);`);
  };
  m.customProgramCacheKey = () => 'chao-tex-' + soTerra; m.needsUpdate = true;
}
texturiza(TERRENO, false);
gCen.scene.traverse((o) => { if (o.isMesh && o.name.startsWith('Betfage_Estrada')) texturiza(o, true); });
const terreno = mapaAltura(TERRENO, 0.3, { suave: true });      // altura do chão em qualquer ponto
// matas mais fechadas ao longe: cada árvore distante ganha duas vizinhas
{
  const extra = [];
  for (const o of LAY.objetos) {
    if (!o.f || /Rocha/.test(o.no)) continue;
    for (let i = 0; i < 2; i++) {
      const a = rnd() * 6.28, d = 1.3 + rnd() * 1.1, x = o.p[0] + Math.cos(a) * d, z = o.p[2] + Math.sin(a) * d;
      extra.push({ ...o, p: [x, terreno(x, z) - 0.15, z], r: rnd() * 6.28, k: o.k * (0.8 + rnd() * 0.35) });
    }
  }
  LAY.objetos.push(...extra);
}

// ---------- estrada (do layout) ----------
const ESTR = LAY.estrada.map(([x, z]) => V3(x, 0, z));
const ROTA = new THREE.CatmullRomCurve3(ESTR);
const AMOS = []; { const L = ROTA.getLength(), n = Math.ceil(L * 2); for (let i = 0; i <= n; i++) AMOS.push(ROTA.getPointAt(i / n)); }
const distEstrada = (x, z) => { let m = 1e9; for (const p of AMOS) { const d = Math.hypot(p.x - x, p.z - z); if (d < m) m = d; } return m; };
const naEstrada = (x, z, m = 0) => distEstrada(x, z) < LAY.meia + m;

// ---------- objetos do layout (árvores, pedras, eira, feixes, cestos...) ----------
const ALTOS = /Oliveira|Cipreste|Arvore|Figueira/;
const CONSTR = [];       // construções com pisos e paredes (a ínsula e a casa avulsa)
const FORNO = {};        // forno de barro (tabun): fogo dentro, fumaça pela boca de cima; pães na mesa ao lado
instanciaLonge(scene, LAY.objetos, KIT);
poePertos(scene, LAY.objetos, KIT, (o, n) => {
  if (/^Casa(2|_Sobrado|_Alcapao|_Varal)$/.test(o.no)) { FADE.push(n); n.userData.casa = true; CONSTR.push(n); }
  if (o.no === 'Cocho') { if (Math.hypot(o.p[0] - LAY.manjedoura[0], o.p[2] - LAY.manjedoura[2]) < 1) FORNO.manj = n; else FORNO.bebe = n; }
  if (o.no === 'Peneira_Graos') FORNO.eira = n;
  if (o.no === 'Forno_Barro') FORNO.o = n, FORNO.r = o.r;
  if (o.no === 'Bancada') FORNO.mesa = n;
  if (ALTOS.test(o.no)) FADE.push(n);
});

export { CONSTR, terreno, FORNO, AMOS, naEstrada, ROTA, TERRENO };
