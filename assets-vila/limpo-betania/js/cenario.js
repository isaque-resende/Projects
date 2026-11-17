// Betânia: o cenário que vem do Blender. Terreno, caminhos e muretas (betania_cenario.glb)
// e as árvores, pedras e casas do layout (betania_layout.json).
import * as THREE from 'three';
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit, instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza } from '../../limpo-motor/terreno.js';
import { VER, texChao, scene, CIRC } from './estado.js';
import './modelos.js';     // só para manter a ordem de montagem

const [gCen, LAYB] = await Promise.all([baixar('../fase-betania/betania_cenario.glb?v=' + VER), fetch('../fase-betania/betania_layout.json?v=' + VER).then((r) => r.json())]);

// ---------- material do chão: mistura grama, terra, pátio e pedregulho conforme a cor pintada no Blender ----------
const TXC = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1'), grama2: texChao('../fase-betania/tex/grama.webp'), patio: texChao('../fase-betania/tex/patio.webp'), estrada: texChao('../fase-betania/tex/estrada.webp'), pedras: texChao('../fase-betania/tex/pedras.webp') };
function matChao(soTerra, offset) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, ...(offset ? { polygonOffset: true, polygonOffsetFactor: -2 } : {}) });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uGrama = { value: TXC.grama }; sh.uniforms.uTerra = { value: TXC.terra }; sh.uniforms.uGrama2 = { value: TXC.grama2 }; sh.uniforms.uPatio = { value: TXC.patio }; sh.uniforms.uEstrada = { value: TXC.estrada }; sh.uniforms.uPedras = { value: TXC.pedras };
    sh.vertexShader = 'varying vec3 vWP; varying vec3 vWN;\n' + sh.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n vWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = 'uniform sampler2D uGrama; uniform sampler2D uTerra; uniform sampler2D uGrama2; uniform sampler2D uPatio; uniform sampler2D uEstrada; uniform sampler2D uPedras; varying vec3 vWP; varying vec3 vWN;\n' + sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      vec3 vc = vColor.rgb;
      // manchas grandes trocam entre as duas gramas (o chão não fica igual em toda parte)
      float mg = smoothstep(-0.35, 0.35, sin(vWP.x * 0.11 + 1.7) * cos(vWP.z * 0.09 - 0.6) + 0.45 * sin(vWP.x * 0.27 + vWP.z * 0.21));
      vec3 tg = mix(texture2D(uGrama, vWP.xz * 0.2).rgb, texture2D(uGrama2, vWP.xz * 0.12).rgb * vec3(0.95, 1.02, 0.9), mg * 0.75);
      vec3 tt = texture2D(uTerra, vWP.xz * 0.16 + 0.37).rgb;
      // terra clara do largo e dos pátios (cor de vértice mais clara) usa a textura de pátio
      float lv = dot(vc, vec3(0.3, 0.59, 0.11));
      tt = mix(tt, texture2D(uPatio, vWP.xz * 0.25).rgb, smoothstep(0.6, 0.7, lv) * ${soTerra ? '0.0' : '1.0'});
      ${soTerra ? 'tt = mix(tt, texture2D(uPatio, vWP.xz * 0.18).rgb, 0.35);' : ''}
      float gr = ${soTerra ? '0.0' : 'smoothstep(-0.045, 0.0, vc.g - vc.r) * smoothstep(0.55, 0.8, vWN.y)'};
      float seco = ${soTerra ? '0.0' : '1.0 - smoothstep(-0.01, 0.04, vc.g - vc.r)'};
      tg = mix(tg, vec3(dot(tg, vec3(0.3, 0.59, 0.11))), 0.18) * vec3(0.9, 0.88, 0.8);
      tg = mix(tg, tg * vec3(1.15, 1.0, 0.65), seco * 0.6);
      float lt = dot(tt, vec3(0.3, 0.59, 0.11));
      vec3 terra = mix(tt, vec3(lt) * vec3(1.18, 1.02, 0.78), 0.45) * 1.05;
      // manchas de pedregulho e de chão seco, espalhadas (não aparecem nos caminhos)
      float np = sin(vWP.x * 0.23 + 4.1) * cos(vWP.z * 0.19 + 2.3) + 0.6 * sin(vWP.x * 0.51 - vWP.z * 0.37 + 1.7);
      float nd = sin(vWP.x * 0.13 - 2.2) * cos(vWP.z * 0.17 + 0.9) + 0.5 * sin(vWP.x * 0.41 + vWP.z * 0.33);
      vec3 tp = texture2D(uPedras, vWP.xz * 0.28).rgb;
      tg = mix(tg, mix(tg, terra, 0.55) * vec3(1.06, 1.0, 0.86), smoothstep(0.95, 1.25, nd) * 0.7);
      diffuseColor.rgb = mix(terra, tg, gr);`);
  };
  m.customProgramCacheKey = () => 'chao-bet2-' + soTerra; return m;
}
let ground = null;      // a malha do terreno
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Betania_Terreno')) { suaviza(o); o.material = matChao(false, false); o.receiveShadow = true; ground = o; }
  else if (o.name.startsWith('Betania_Caminhos')) { suaviza(o); o.material = matChao(true, true); o.receiveShadow = true; }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);

// ---------- árvores, pedras e casas do layout (as de longe vão instanciadas) ----------
const CASAS_NOVAS = [], BEBEDOURO = [];
{
  const KB = await carregaKit(LAYB.objetos);
  instanciaLonge(scene, LAYB.objetos, KB);
  poePertos(scene, LAYB.objetos, KB, (o, n) => {
    if (/^Casa_/.test(o.no)) { CASAS_NOVAS.push(n); return; }
    if (o.no === 'Cocho') BEBEDOURO.push(n);
    const alto = /Arvore|Cipreste|Tamareira/.test(o.no);
    CIRC.push({ x: o.p[0], z: o.p[2], r: alto ? 0.45 : 0.35 * o.k + 0.15 });
  });
}

for (const b of BEBEDOURO) {          // água dentro do cocho de pedra
  b.updateMatrixWorld(true); const bx = new THREE.Box3().setFromObject(b), rc = new THREE.Raycaster(), d = [];
  const N = 18; for (let i = 0; i <= N; i++) for (let k = 0; k <= N; k++) {
    const x = bx.min.x + (bx.max.x - bx.min.x) * i / N, z = bx.min.z + (bx.max.z - bx.min.z) * k / N;
    rc.set(new THREE.Vector3(x, bx.max.y + 1, z), new THREE.Vector3(0, -1, 0)); const h = rc.intersectObject(b, true)[0];
    if (h && h.point.y < bx.max.y - 0.12 && h.point.y > bx.min.y + 0.06) d.push(h.point);
  }
  if (d.length > 6) {
    const c = d.reduce((a, p) => a.add(p), new THREE.Vector3()).multiplyScalar(1 / d.length);
    const pts = d.map((p) => [p.x, p.z]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], hi = []; for (const p of pts) { while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of [...pts].reverse()) { while (hi.length > 1 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
    const casco = lo.slice(0, -1).concat(hi.slice(0, -1)).map(([x, z]) => new THREE.Vector2(c.x + (x - c.x) * 0.82, -(c.z + (z - c.z) * 0.82)));
    const yf = Math.min(bx.max.y - 0.06, Math.max(...d.map((p) => p.y)) + 0.04);
    const ag = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(casco)), new THREE.MeshStandardMaterial({ color: 0x4f8a92, roughness: 0.3 }));
    ag.rotation.x = -Math.PI / 2; ag.position.y = yf; scene.add(ag);
  }
}
// casas em tom creme
function tingeCasa(raiz) {
  raiz.traverse((m) => {
    if (!m.isMesh) return;
    m.material = m.material.clone();
    m.material.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
      float lum = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
      diffuseColor.rgb = mix(diffuseColor.rgb, lum * vec3(1.08, 1.03, 0.9), 0.6);`); };
    m.material.customProgramCacheKey = () => 'casa-creme';
  });
}
for (const n of CASAS_NOVAS) tingeCasa(n);

export { tingeCasa, ground, CASAS_NOVAS };
