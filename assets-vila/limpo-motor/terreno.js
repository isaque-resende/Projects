// Motor comum: chão. Suaviza a malha do terreno e mede a altura de qualquer malha.
import * as THREE from 'three';

// Junta os vértices repetidos e mistura as cores entre eles: o chão deixa de ter faces chapadas.
// verdeia: deixa a grama um pouco mais viva (usado em Betfagé).
export function suaviza(mesh, verdeia = false) {
  const g0 = mesh.geometry, pos = g0.attributes.position, col = g0.attributes.color, uv = g0.attributes.uv, idx = g0.index;
  const mapa = new Map(), P = [], C = [], N = [], I = [], U = [], n = idx ? idx.count : pos.count;      // U: a UV (se a malha tem textura, como o chão do templo)
  for (let t = 0; t < n; t++) {
    const v = idx ? idx.getX(t) : t, x = pos.getX(v), y = pos.getY(v), z = pos.getZ(v), k = Math.round(x * 50) + '_' + Math.round(z * 50) + '_' + Math.round(y * 50);
    let j = mapa.get(k);
    if (j === undefined) { j = P.length / 3; mapa.set(k, j); P.push(x, y, z); C.push(0, 0, 0); N.push(0); if (uv) U.push(uv.getX(v), uv.getY(v)); }
    if (col) { C[j * 3] += col.getX(v); C[j * 3 + 1] += col.getY(v); C[j * 3 + 2] += col.getZ(v); N[j]++; }
    I.push(j);
  }
  for (let j = 0; j < N.length; j++) if (N[j]) {
    let r = C[j * 3] / N[j], gg = C[j * 3 + 1] / N[j], b = C[j * 3 + 2] / N[j];
    if (verdeia && gg > r * 0.98) { r *= 0.92; gg = Math.min(1, gg * 1.1); b *= 0.75; }
    C[j * 3] = r; C[j * 3 + 1] = gg; C[j * 3 + 2] = b;
  }
  const g1 = new THREE.BufferGeometry();
  g1.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g1.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); g1.setIndex(I);
  if (uv) g1.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2));
  g1.computeVertexNormals(); mesh.geometry = g1;
}

// Mapa de alturas de uma malha: uma grade em que cada célula guarda a maior altura dos triângulos que a cobrem.
// Devolve a função altura(x, z).
//   passo: tamanho da célula (m)
//   suave: mistura as 4 células vizinhas (terreno com rampas); sem isso, pega a célula mais próxima (degraus, casas)
//   caixa: objeto que define a área da grade (por padrão, a própria malha)
// Sem "suave", só guarda alturas acima de zero.
export function mapaAltura(mesh, passo = 0.15, { suave = false, caixa = null } = {}) {
  const P = passo, VAZIO = suave ? -1e9 : 0;
  mesh.updateWorldMatrix(true, false);
  const cx = new THREE.Box3().setFromObject(caixa || mesh);
  const GX0 = cx.min.x - 0.2, GZ0 = cx.min.z - 0.2;
  const GW = Math.ceil((cx.max.x - cx.min.x + 0.4) / P) + 1, GD = Math.ceil((cx.max.z - cx.min.z + 0.4) / P) + 1;
  const ALT = new Float32Array(GW * GD).fill(VAZIO);
  const pos = mesh.geometry.attributes.position, idx = mesh.geometry.index, m = mesh.matrixWorld;
  const A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3();
  const n = idx ? idx.count : pos.count;
  for (let t = 0; t < n; t += 3) {
    A.fromBufferAttribute(pos, idx ? idx.getX(t) : t).applyMatrix4(m); B.fromBufferAttribute(pos, idx ? idx.getX(t + 1) : t + 1).applyMatrix4(m); C.fromBufferAttribute(pos, idx ? idx.getX(t + 2) : t + 2).applyMatrix4(m);
    const i0 = Math.max(0, Math.floor((Math.min(A.x, B.x, C.x) - GX0) / P)), i1 = Math.min(GW - 1, Math.ceil((Math.max(A.x, B.x, C.x) - GX0) / P));
    const k0 = Math.max(0, Math.floor((Math.min(A.z, B.z, C.z) - GZ0) / P)), k1 = Math.min(GD - 1, Math.ceil((Math.max(A.z, B.z, C.z) - GZ0) / P));
    const d = (B.z - C.z) * (A.x - C.x) + (C.x - B.x) * (A.z - C.z);
    if (Math.abs(d) < 1e-6) {           // triângulo de pé (parede): vale a altura do topo
      for (let i = i0; i <= i1; i++) for (let k = k0; k <= k1; k++) { const y = Math.max(A.y, B.y, C.y); if (y > ALT[i * GD + k]) ALT[i * GD + k] = y; }
      continue;
    }
    for (let i = i0; i <= i1; i++) for (let k = k0; k <= k1; k++) {
      const xx = GX0 + i * P, zz = GZ0 + k * P;
      const w1 = ((B.z - C.z) * (xx - C.x) + (C.x - B.x) * (zz - C.z)) / d, w2 = ((C.z - A.z) * (xx - C.x) + (A.x - C.x) * (zz - C.z)) / d, w3 = 1 - w1 - w2;
      if (w1 < -0.02 || w2 < -0.02 || w3 < -0.02) continue;
      const y = w1 * A.y + w2 * B.y + w3 * C.y; if (y > ALT[i * GD + k]) ALT[i * GD + k] = y;
    }
  }
  if (!suave) return (wx, wz) => { const i = Math.round((wx - GX0) / P), k = Math.round((wz - GZ0) / P); return (i < 0 || k < 0 || i >= GW || k >= GD) ? 0 : ALT[i * GD + k]; };
  return (wx, wz) => {
    const fx = (wx - GX0) / P, fz = (wz - GZ0) / P;
    const i = Math.max(0, Math.min(GW - 2, Math.floor(fx))), k = Math.max(0, Math.min(GD - 2, Math.floor(fz))), a = fx - i, b = fz - k;
    const g = (ii, kk) => { const v = ALT[ii * GD + kk]; return v < -1e8 ? 0 : v; };
    return (g(i, k) * (1 - a) + g(i + 1, k) * a) * (1 - b) + (g(i, k + 1) * (1 - a) + g(i + 1, k + 1) * a) * b;
  };
}

// Textura pintada no chão (grama e terra), projetada de cima pelo mundo; a cor de vértice decide onde é grama e onde
// é terra. TX = { grama, terra } (texturas do chão). soTerra: só terra (a estrada).
export function texturizaChao(mesh, TX, soTerra = false) {
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
