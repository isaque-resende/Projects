import * as THREE from 'three';
import { heightAt, fbm, ss } from './terrain.js';
import { inCity, roadDist, GOLGOTHA, TOMB, LOOKOUT, GETHSEMANE, VILLAGE, TM } from './layout.js';

// Vegetação instanciada a partir do Stylized Nature MegaKit (Quaternius), com cores refeitas para a Judeia:
// oliveiras verde-prata, ciprestes, amendoeiras floridas, trigo, papoulas/anêmonas, capim de primavera.

const windU = { value: 0 };
export const floraTime = windU;

// recolore pela luminância da textura e adiciona vento (folhagem)
function variant(base, { tint, wind = 0, fill = 0.18, alpha }) {
  const m = base.clone();
  m.side = THREE.DoubleSide;
  if (alpha !== undefined) m.alphaTest = alpha;
  if (m.map && fill) { m.emissiveMap = m.map; m.emissive = new THREE.Color(fill, fill, fill); }
  const tintC = tint ? new THREE.Color(tint) : null;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = windU;
    if (tintC) sh.uniforms.uTint = { value: tintC };
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      #ifdef USE_INSTANCING
        vec2 wp = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
      #else
        vec2 wp = vec2(0.);
      #endif
      float sway = max(position.y, 0.) * ${wind.toFixed(3)};
      float ph = uTime * 1.5 + wp.x * .31 + wp.y * .23;
      transformed.x += sin(ph) * sway + sin(uTime * 3.3 + position.y * 2. + wp.x) * sway * .3;
      transformed.z += cos(ph * .8) * sway * .7;`);
    if (tintC) {
      const swap = `
        vec4 texel = texture2D(map, vMapUv);
        float l = dot(texel.rgb, vec3(.3,.59,.11));
        diffuseColor *= vec4(uTint * (.3 + l * 1.35), texel.a);`;
      sh.fragmentShader = 'uniform vec3 uTint;\n' + sh.fragmentShader.replace('#include <map_fragment>', swap)
        .replace('#include <emissivemap_fragment>', '#ifdef USE_EMISSIVEMAP\n totalEmissiveRadiance *= uTint * (.3 + dot(texture2D(emissiveMap, vEmissiveMapUv).rgb, vec3(.3,.59,.11)) * 1.35);\n#endif');
    }
  };
  m.customProgramCacheKey = () => `v_${tint}_${wind}`;
  return m;
}

// ---------------- touceiras procedurais (poucos triângulos, cor por vértice) ----------------
const _c = new THREE.Color();
function clump({ blades = 7, h = 0.8, w = 0.07, spread = 0.22, base, tip, ear, bloom, center, seed = 1 }) {
  let s = seed * 9301 + 49297; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const pos = [], col = [];
  const push = (x, y, z, c) => { pos.push(x, y, z); _c.set(c); col.push(_c.r, _c.g, _c.b); };
  for (let i = 0; i < blades; i++) {
    const a = r() * 6.283, d = Math.sqrt(r()) * spread, bx = Math.cos(a) * d, bz = Math.sin(a) * d;
    const hh = h * (0.6 + r() * 0.5), lean = 0.15 + r() * 0.3, la = r() * 6.283;
    const tx = bx + Math.cos(la) * hh * lean, tz = bz + Math.sin(la) * hh * lean, pa = a + 1.57;
    const ox = Math.cos(pa) * w / 2, oz = Math.sin(pa) * w / 2;
    push(bx - ox, 0, bz - oz, base); push(bx + ox, 0, bz + oz, base); push(tx, hh, tz, tip);
    if (ear) { // espiga: losango no alto
      const ey = hh * 0.82, ex = bx + (tx - bx) * 0.82, ez = bz + (tz - bz) * 0.82, e = 0.035;
      push(ex - ox * 0.9, ey, ez - oz * 0.9, ear); push(ex + ox * 0.9, ey, ez + oz * 0.9, ear); push(tx, hh + 0.14, tz, ear);
      push(ex + ox * 0.9, ey, ez + oz * 0.9, ear); push(ex - ox * 0.9, ey, ez - oz * 0.9, ear); push(ex, ey - e * 3, ez, ear);
    }
    if (bloom && i % 2 === 0) { // flor: pentágono inclinado na ponta da haste
      const R = 0.07 + r() * 0.03;
      for (let k = 0; k < 5; k++) {
        const a0 = (k / 5) * 6.283, a1 = ((k + 1) / 5) * 6.283;
        push(tx, hh + 0.01, tz, center); push(tx + Math.cos(a0) * R, hh + 0.03, tz + Math.sin(a0) * R, bloom); push(tx + Math.cos(a1) * R, hh + 0.03, tz + Math.sin(a1) * R, bloom);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const n = new Float32Array(pos.length); for (let i = 0; i < n.length; i += 3) n[i + 1] = 1; // normal para cima: iluminado como o chão
  g.setAttribute('normal', new THREE.BufferAttribute(n, 3));
  return g;
}
function windMat(strength, key) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.92, name: key });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = windU;
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      vec2 wp = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
      float sway = max(position.y, 0.) * ${strength.toFixed(3)};
      float ph = uTime * 1.7 + wp.x * .29 + wp.y * .21;
      transformed.x += (sin(ph) + .4 * sin(uTime * 3.7 + wp.y)) * sway; transformed.z += cos(ph * .8) * sway * .7;`);
  };
  m.customProgramCacheKey = () => 'wind' + strength;
  return m;
}

export function makeFlora(scene, natureGltf, solids, extras, { lowQuality }) {
  // moldes: cada modelo vira lista de partes (geometria + material + matriz)
  const T = {};
  for (const sc of natureGltf.scenes) {
    sc.updateMatrixWorld(true);
    for (const root of sc.children) {
      const parts = [];
      root.traverse((o) => { if (o.isMesh) parts.push({ geometry: o.geometry, material: o.material, matrix: o.matrixWorld.clone() }); });
      T[root.name] = parts;
    }
  }
  // cipreste procedural: copa em chama, facetada (estilo low poly), tronco curto
  {
    const prof = []; for (let i = 0; i <= 12; i++) { const t = i / 12; prof.push(new THREE.Vector2(Math.max(0.02, Math.sin(Math.PI * Math.pow(t, 0.75)) * 1.05 * (1 - t * 0.35)), 1.2 + t * 8.8)); }
    const fol = new THREE.LatheGeometry(prof, 9); const p = fol.attributes.position;
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), y = p.getY(i), z = p.getZ(i), n = 1 + Math.sin(y * 3.1 + Math.atan2(z, x) * 3) * 0.13 + Math.sin(y * 7.3) * 0.06; p.setX(i, x * n); p.setZ(i, z * n); }
    fol.computeVertexNormals();
    const trunk = new THREE.CylinderGeometry(0.12, 0.18, 1.6, 6).translate(0, 0.8, 0);
    T.Cypress = [
      { geometry: fol, material: new THREE.MeshStandardMaterial({ name: 'CypressFoliage', color: 0x2c4627, roughness: 0.9, flatShading: true, emissive: 0x0b1408 }), matrix: new THREE.Matrix4() },
      { geometry: trunk, material: new THREE.MeshStandardMaterial({ name: 'CypressBark', color: 0x4e3a2a, roughness: 1 }), matrix: new THREE.Matrix4() },
    ];
  }
  const tuft = (key, opt, wind) => { T[key] = [{ geometry: clump(opt), material: windMat(wind, key), matrix: new THREE.Matrix4() }]; };
  tuft('GrassClump', { blades: 7, h: 0.75, base: 0x4f6a22, tip: 0xb9c25a, seed: 1 }, 0.16);
  tuft('DryClump', { blades: 6, h: 0.7, w: 0.05, base: 0x7d7440, tip: 0xe0cf86, seed: 2 }, 0.18);
  tuft('WheatClump', { blades: 9, h: 1.0, w: 0.04, spread: 0.18, base: 0x9c8a3a, tip: 0xd9bd5c, ear: 0xeccb6a, seed: 3 }, 0.2);
  tuft('PoppyClump', { blades: 6, h: 0.42, w: 0.03, spread: 0.18, base: 0x4f6a22, tip: 0x6f8a32, bloom: 0xd8321f, center: 0x1a1008, seed: 4 }, 0.16);
  tuft('AnemoneClump', { blades: 6, h: 0.36, w: 0.03, spread: 0.18, base: 0x4f6a22, tip: 0x6f8a32, bloom: 0xa25cd0, center: 0x2a1840, seed: 5 }, 0.16);
  tuft('MustardClump', { blades: 8, h: 0.55, w: 0.03, spread: 0.2, base: 0x58702a, tip: 0x7d9634, bloom: 0xf2d43a, center: 0xc79a1a, seed: 6 }, 0.16);
  const isLeaf = (m) => /leav|leaf|grass|plant|fern|clover|petal|flower|bush/i.test(m.name || '');
  const cache = new Map();
  const mat = (m, spec) => {
    const key = m.uuid + JSON.stringify(spec);
    if (m.vertexColors) return m;
    if (!cache.has(key)) cache.set(key, isLeaf(m) ? variant(m, spec) : (() => { const b = m.clone(); if (spec.bark) b.color = new THREE.Color(spec.bark); if (spec.plain) { b.map = null; b.flatShading = true; b.roughness = 0.95; } return b; })());
    return cache.get(key);
  };
  const SPECIES = {
    olive: { models: ['CommonTree_5', 'CommonTree_3'], leaf: { tint: 0xa3ad94, wind: 0.02, fill: 0.2 }, bark: 0x9a8a78, shadow: true },
    oldOlive: { models: ['CommonTree_2'], leaf: { tint: 0x9aa58c, wind: 0.018, fill: 0.16 }, bark: 0x8a7a68, shadow: true },
    cypress: { models: ['Cypress'], shadow: true },
    almond: { models: ['CommonTree_5'], leaf: { tint: 0xf3c7d4, wind: 0.02, fill: 0.3 }, bark: 0x7a5a48, shadow: true },
    bush: { models: ['Bush_Common_Flowers'], leaf: { tint: 0x6f7f45, wind: 0.03 }, shadow: true },
    vine: { models: ['Plant_7'], leaf: { tint: 0x5f8a2e, wind: 0.05 }, shadow: false },
    grass: { models: ['GrassClump'], shadow: false },
    dryGrass: { models: ['DryClump'], shadow: false },
    wheat: { models: ['WheatClump'], shadow: false },
    poppy: { models: ['PoppyClump'], shadow: false },
    anemone: { models: ['AnemoneClump'], shadow: false },
    mustard: { models: ['MustardClump'], shadow: false },
    rock: { models: ['Rock_Medium_1', 'Rock_Medium_2', 'Rock_Medium_3'], bark: 0xcdbfa6, plain: true, shadow: true },
    pebble: { models: ['Pebble_Round_1', 'Pebble_Round_2', 'Pebble_Round_3'], bark: 0xc9b99c, plain: true, shadow: false },
  };
  const CH = 300; // blocos para descarte por frustum
  const buckets = new Map(); // `${species}|${model}|${chunk}` -> matrizes
  let rs = 2024; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
  const tmpQ = new THREE.Quaternion(), tmpE = new THREE.Euler(), tmpV = new THREE.Vector3(), tmpS = new THREE.Vector3();

  const free = (x, z, h) => !solids.blocked(x, h + 0.6, z) && !solids.blocked(x + 1.2, h + 0.6, z) && !solids.blocked(x - 1.2, h + 0.6, z);
  function put(sp, x, z, s, { sy = 1, tilt = 0.05, y } = {}) {
    const S = SPECIES[sp], model = S.models[Math.floor(rnd() * S.models.length)];
    const h = y ?? heightAt(x, z);
    const m = new THREE.Matrix4().compose(tmpV.set(x, h - 0.05, z), tmpQ.setFromEuler(tmpE.set((rnd() - .5) * tilt, rnd() * 6.283, (rnd() - .5) * tilt)), tmpS.set(s, s * sy, s));
    const key = `${sp}|${model}|${Math.floor(x / CH)},${Math.floor(z / CH)}`;
    (buckets.get(key) ?? buckets.set(key, []).get(key)).push(m);
  }
  // amostragem por região com regra de aceitação
  function scatter(sp, n, area, accept, size, opts) {
    let made = 0, tries = 0;
    while (made < n && tries++ < n * 30) {
      const x = area.x0 + rnd() * (area.x1 - area.x0), z = area.z0 + rnd() * (area.z1 - area.z0);
      const h = heightAt(x, z);
      if (!accept(x, z, h)) continue;
      put(sp, x, z, size[0] + rnd() * (size[1] - size[0]), opts);
      made++;
    }
  }
  const outside = (x, z) => !inCity(x, z) && roadDist(x, z) > 2.5;
  const notSpecial = (x, z) => Math.hypot(x - LOOKOUT.x, z - LOOKOUT.z) > 16 && Math.hypot(x - GOLGOTHA.x, z - GOLGOTHA.z) > 13 && !(Math.abs(x - TOMB.x) < 13 && z > TOMB.z - 12 && z < TOMB.z + 12);
  const WORLD = { x0: -280, x1: 320, z0: -300, z1: 300 };
  const Q = lowQuality ? 0.6 : 1;

  // olivais no Monte das Oliveiras (fileiras irregulares nos terraços)
  scatter('olive', 150 * Q, { x0: 122, x1: 260, z0: -120, z1: 140 }, (x, z, h) => outside(x, z) && notSpecial(x, z) && h > 6 && fbm(x * 0.03, z * 0.03) > 0.38 && free(x, z, h) && Math.hypot(x - VILLAGE.x, z - VILLAGE.z) > 34, [0.62, 0.9], { sy: 0.72 });
  scatter('olive', 70 * Q, WORLD, (x, z, h) => outside(x, z) && notSpecial(x, z) && fbm(x * 0.02 + 5, z * 0.02) > 0.55 && free(x, z, h) && h > -2, [0.6, 0.85], { sy: 0.7 });
  // Getsêmani: oliveiras velhas e largas
  for (const g of extras.groves) scatter('oldOlive', g.n, { x0: g.x - g.r, x1: g.x + g.r, z0: g.z - g.r, z1: g.z + g.r }, (x, z, h) => roadDist(x, z) > 2.5 && Math.hypot(x - g.x - 3, z - g.z - 2) > 3.5 && free(x, z, h), [0.85, 1.05], { sy: 0.62 });
  // jardim do sepulcro e jardim do palácio
  for (const g of extras.gardens) {
    scatter('olive', 6, { x0: g.x - g.r, x1: g.x + g.r, z0: g.z - g.r * 0.6, z1: g.z + g.r * 0.6 }, (x, z, h) => free(x, z, h) && Math.abs(x - TOMB.x) > 3, [0.55, 0.7], { sy: 0.72 });
    scatter('cypress', 4, { x0: g.x - g.r, x1: g.x + g.r, z0: g.z - 2, z1: g.z + g.r * 0.6 }, (x, z, h) => free(x, z, h), [0.9, 1.1], { sy: 1.0 });
    scatter('poppy', 40, { x0: g.x - g.r, x1: g.x + g.r, z0: g.z - g.r * 0.5, z1: g.z + g.r * 0.6 }, (x, z, h) => free(x, z, h), [1, 1.4]);
    scatter('anemone', 30, { x0: g.x - g.r, x1: g.x + g.r, z0: g.z - g.r * 0.5, z1: g.z + g.r * 0.6 }, (x, z, h) => free(x, z, h), [1, 1.4]);
  }
  if (extras.palaceGarden) {
    const P = extras.palaceGarden;
    scatter('cypress', 10, P, (x, z, h) => !solids.blocked(x, h + 3, z), [0.8, 1.0], { sy: 1.0, tilt: 0.02 });
  }
  // ciprestes isolados ao longo das estradas e na aldeia
  scatter('cypress', 40 * Q, WORLD, (x, z, h) => outside(x, z) && roadDist(x, z) < 9 && notSpecial(x, z) && free(x, z, h), [0.8, 1.15], { sy: 1.0, tilt: 0.02 });
  // amendoeiras floridas (pomar perto da aldeia + algumas soltas)
  scatter('almond', 34, { x0: 112, x1: 146, z0: 110, z1: 146 }, (x, z, h) => outside(x, z) && free(x, z, h) && Math.hypot(x - 128, z - 128) > 9, [0.48, 0.62], { sy: 0.8 });
  scatter('almond', 20 * Q, WORLD, (x, z, h) => outside(x, z) && notSpecial(x, z) && free(x, z, h) && fbm(x * 0.05, z * 0.05) > 0.62, [0.45, 0.6], { sy: 0.8 });
  // arbustos e pedras
  scatter('bush', 120 * Q, WORLD, (x, z, h) => outside(x, z) && notSpecial(x, z) && free(x, z, h), [0.7, 1.4]);
  scatter('rock', 160 * Q, WORLD, (x, z, h) => outside(x, z) && free(x, z, h) && (fbm(x * 0.04, z * 0.04) > 0.5 || h > 40), [0.5, 1.6]);
  scatter('rock', 26, { x0: GOLGOTHA.x - 22, x1: GOLGOTHA.x + 22, z0: GOLGOTHA.z - 22, z1: GOLGOTHA.z + 22 }, (x, z, h) => notSpecial(x, z) && free(x, z, h), [0.6, 1.8]);
  scatter('pebble', 260 * Q, WORLD, (x, z, h) => !inCity(x, z) && free(x, z, h), [0.8, 2.2]);
  // trigo dourado (campos da aldeia)
  for (const [cx, cz, hw, hd, rot, n] of [[178, 142, 24, 16, 0.15, 3600], [60, 160, 20, 10, -0.1, 1800]]) {
    const c = Math.cos(rot), s = Math.sin(rot);
    for (let i = 0; i < n * Q; i++) {
      const lx = (rnd() - 0.5) * 2 * hw, lz = (rnd() - 0.5) * 2 * hd;
      const x = cx + c * lx + s * lz, z = cz - s * lx + c * lz;
      if (roadDist(x, z) < 2) continue;
      put('wheat', x, z, 0.85 + rnd() * 0.3, { sy: 1.1, tilt: 0.15 });
    }
  }
  // capim, papoulas, anêmonas e mostarda nas encostas
  scatter('grass', (lowQuality ? 6000 : 11000), WORLD, (x, z, h) => outside(x, z) && free(x, z, h) && fbm(x * 0.05 + 2, z * 0.05) > 0.4 && Math.hypot(x - 20, z) < 300, [0.9, 1.5], { tilt: 0.15 });
  scatter('dryGrass', (lowQuality ? 2000 : 3800), WORLD, (x, z, h) => outside(x, z) && free(x, z, h) && fbm(x * 0.04 + 8, z * 0.04) > 0.5, [0.8, 1.3], { tilt: 0.2 });
  scatter('poppy', 1100 * Q, WORLD, (x, z, h) => outside(x, z) && free(x, z, h) && fbm(x * 0.06 + 20, z * 0.06) > 0.52, [0.9, 1.4], { tilt: 0.2 });
  scatter('anemone', 600 * Q, WORLD, (x, z, h) => outside(x, z) && free(x, z, h) && fbm(x * 0.06 - 20, z * 0.06) > 0.55, [0.9, 1.3], { tilt: 0.2 });
  scatter('mustard', 600 * Q, WORLD, (x, z, h) => outside(x, z) && free(x, z, h) && fbm(x * 0.05 + 50, z * 0.05) > 0.56, [0.9, 1.3], { tilt: 0.2 });
  // vinha (fileiras) e parreiras das pérgolas
  if (extras.vineyard) {
    const V = extras.vineyard;
    for (let i = -V.w / 2; i < V.w / 2; i += 2.6) for (let j = -V.d / 2; j < V.d / 2; j += 1.4) {
      const x = V.x + i, z = V.z + j + 6; if (Math.hypot(x - V.x, z - V.z) < 4 || roadDist(x, z) < 2) continue;
      put('vine', x, z, 0.45 + rnd() * 0.15, { tilt: 0.1 });
    }
  }
  for (const [x, y, z] of extras.vines) for (let k = 0; k < 4; k++) put('vine', x + (rnd() - 0.5) * 2, z + (rnd() - 0.5) * 2.6, 0.5, { y });

  // ---------------- instanciar ----------------
  const tmp = new THREE.Matrix4();
  let drawn = 0;
  for (const [key, mats] of buckets) {
    const [sp, model] = key.split('|'), S = SPECIES[sp];
    for (const part of T[model] || []) {
      const im = new THREE.InstancedMesh(part.geometry, mat(part.material, S.leaf && isLeaf(part.material) ? S.leaf : { bark: S.bark, plain: S.plain }), mats.length);
      mats.forEach((m, i) => im.setMatrixAt(i, tmp.multiplyMatrices(m, part.matrix)));
      im.instanceMatrix.needsUpdate = true;
      im.computeBoundingSphere();
      im.castShadow = S.shadow; im.receiveShadow = true;
      scene.add(im); drawn++;
    }
  }
  return { drawn, count: [...buckets.values()].reduce((a, b) => a + b.length, 0) };
}
