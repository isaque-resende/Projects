import * as THREE from 'three';

// ---------- utilidades ----------
function mulberry32(a) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
const smooth = (t) => t * t * (3 - 2 * t);
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  const u = smooth(xf), v = smooth(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x, y, o = 4) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * vnoise(x * f, y * f); f *= 2; a *= 0.5; } return s; };
const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// ---------- forma do terreno ----------
const SIZE = 340;           // metros
const POND = { x: 34, z: -26, r: 13 };
const pathZ = (x) => Math.sin(x * 0.055) * 11 + Math.sin(x * 0.13) * 2;

function baseHeight(x, z) {
  const r = Math.hypot(x, z);
  let h = (fbm(x * 0.012 + 10, z * 0.012 + 3) - 0.45) * 26 + (fbm(x * 0.045, z * 0.045) - 0.5) * 3.2;
  h *= ss(8, 42, r);                              // clareira plana no ponto de partida
  h += Math.pow(ss(88, 170, r), 1.6) * 46;         // colinas suaves e distantes fecham o mundo
  return h;
}
const waterY = baseHeight(POND.x, POND.z) - 0.55;

export function heightAt(x, z) {
  let h = baseHeight(x, z);
  const dp = Math.abs(z - pathZ(x));
  h -= (1 - ss(0, 3.2, dp)) * 0.18 * ss(-4, 6, x);  // trilha levemente afundada
  const d = Math.hypot(x - POND.x, z - POND.z);
  const f = ss(POND.r * 1.7, POND.r * 0.55, d);
  const bottom = waterY - 2.6 * (1 - Math.min(1, d / POND.r));
  return h + (Math.min(h, bottom) - h) * f;
}
const pathDist = (x, z) => { const s = Math.cos(x * 0.055) * 0.6; return Math.abs(z - pathZ(x)) / Math.sqrt(1 + s * s); };
const inWater = (x, z) => heightAt(x, z) < waterY - 0.35;

// ---------- vento: balança só as partes de folhagem ----------
const windU = { value: 0 };
function addWind(mat, strength) {
  if (mat.userData.wind) return;
  mat.userData.wind = true;
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = windU;
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
      #include <begin_vertex>
      #ifdef USE_INSTANCING
        vec2 wp = vec2(instanceMatrix[3].x, instanceMatrix[3].z);
      #else
        vec2 wp = vec2(modelMatrix[3].x, modelMatrix[3].z);
      #endif
      float sway = max(position.y, 0.0) * ${strength.toFixed(3)};
      float ph = uTime * 1.6 + wp.x * .35 + wp.y * .27;
      transformed.x += sin(ph) * sway + sin(uTime * 3.1 + position.y * 2.0 + wp.x) * sway * .25;
      transformed.z += cos(ph * .83) * sway * .8;
    `);
  };
  mat.needsUpdate = true;
}

export function makeWorld({ scene, natureGltf, grass, dirt, lowQuality }) {
  // ---------- terreno ----------
  const seg = lowQuality ? 230 : 300;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const P = geo.attributes.position, N = P.count;
  const uv = geo.attributes.uv;
  for (let i = 0; i < N; i++) {
    const x = P.getX(i), z = P.getZ(i);
    P.setY(i, heightAt(x, z));
    uv.setXY(i, x / 5, z / 5);
  }
  geo.computeVertexNormals();
  const nrm = geo.attributes.normal, dirtA = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const x = P.getX(i), z = P.getZ(i), y = P.getY(i);
    const path = (1 - ss(0.9, 2.3, pathDist(x, z))) * ss(-6, 4, x);
    const slope = (1 - ss(0.62, 0.86, nrm.getY(i))) * (1 - ss(70, 95, Math.hypot(x, z)));
    const shore = 1 - ss(0.2, 1.0, y - waterY);
    dirtA[i] = Math.min(1, Math.max(path, slope, shore * 0.85));
  }
  geo.setAttribute('aDirt', new THREE.BufferAttribute(dirtA, 1));

  const terrainMat = new THREE.MeshStandardMaterial({ map: grass.diff, normalMap: grass.nor, roughness: 0.96, metalness: 0, color: new THREE.Color(1, 1, 1) });
  terrainMat.normalScale.set(0.7, 0.7);
  terrainMat.onBeforeCompile = (sh) => {
    sh.uniforms.map2 = { value: dirt.diff };
    sh.vertexShader = 'attribute float aDirt; varying float vDirt; varying vec3 vWp;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vDirt = aDirt; vWp = (modelMatrix * vec4(position,1.)).xyz;');
    sh.fragmentShader = 'uniform sampler2D map2; varying float vDirt; varying vec3 vWp;\n' + sh.fragmentShader.replace('#include <map_fragment>', `
      // campo "pintado": a foto só dá o relevo fino de luminância; a cor vem de uma paleta viva
      vec4 gC = texture2D(map, vMapUv);
      float lum = dot(gC.rgb, vec3(.333)) / .38;
      vec4 dC = texture2D(map2, vMapUv * .8);
      float big  = texture2D(map, vWp.xz * .011).g;
      float big2 = texture2D(map, vWp.xz * .031 + .37).r;
      vec3 meadow = mix(vec3(.17,.50,.09), vec3(.46,.72,.12), smoothstep(.25,.75,big));
      meadow = mix(meadow, vec3(.78,.74,.18), smoothstep(.62,.9,big2) * .55);   // manchas de grama seca amarelada
      meadow *= .65 + lum * .55;
      vec3 trail = dC.rgb * vec3(1.15,.98,.78);
      float k = smoothstep(.3, .72, vDirt);
      diffuseColor *= vec4(mix(meadow, trail, k), 1.);
    `);
  };
  const terrain = new THREE.Mesh(geo, terrainMat);
  terrain.receiveShadow = true;
  scene.add(terrain);

  // ---------- lago ----------
  const wn = (() => {
    const s = 256, c = document.createElement('canvas'); c.width = c.height = s;
    const x = c.getContext('2d'), img = x.createImageData(s, s);
    const h = (u, v) => Math.sin(u * 6.2832 * 3) * .5 + Math.sin(v * 6.2832 * 4 + u * 6.2832) * .5 + Math.sin((u + v) * 6.2832 * 5) * .35;
    for (let j = 0; j < s; j++) for (let i = 0; i < s; i++) {
      const u = i / s, v = j / s, e = 1 / s;
      const dx = h(u + e, v) - h(u - e, v), dy = h(u, v + e) - h(u, v - e);
      const o = (j * s + i) * 4; img.data[o] = 128 + dx * 40; img.data[o + 1] = 128 + dy * 40; img.data[o + 2] = 255; img.data[o + 3] = 255;
    }
    x.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(7, 7); return t;
  })();
  const water = new THREE.Mesh(new THREE.CircleGeometry(POND.r * 2.1, 48).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({
    color: 0x3fb4c4, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.82, normalMap: wn, normalScale: new THREE.Vector2(0.35, 0.35), envMapIntensity: 1.4, clearcoat: 1,
  }));
  water.position.set(POND.x, waterY, POND.z);
  scene.add(water);

  // ---------- modelos da natureza ----------
  const templates = {};
  // o glb tem uma cena por modelo (veio de um merge); cada raiz vira um "molde"
  const roots = natureGltf.scenes.flatMap((sc) => { sc.updateMatrixWorld(true); return sc.children; });
  for (const child of roots) {
    const parts = [];
    child.traverse((o) => {
      if (!o.isMesh) return;
      const m = Array.isArray(o.material) ? o.material[0] : o.material;
      const n = (m.name || '').toLowerCase();
      if (/leav|leaf|grass|plant|fern|clover|petal|flower|bush/.test(n)) addWind(m, /grass|clover|plant|fern/.test(n) ? 0.09 : 0.028);
      if (/leav|leaf|grass|plant|fern|clover|petal|flower/.test(n)) {
        m.side = THREE.DoubleSide;
        // luz de preenchimento vinda da própria textura: folha na sombra fica verde-escuro, não preta
        if (m.map && !m.userData.fill) { m.userData.fill = true; m.emissiveMap = m.map; m.emissive = new THREE.Color(0.2, 0.2, 0.2); }
      }
      parts.push({ geometry: o.geometry, material: o.material, matrix: o.matrixWorld.clone() });  // cada cena já tem o modelo na origem; a escala de quantização fica no nó
    });
    const box = new THREE.Box3().setFromObject(child);
    templates[child.name] = { parts, size: box.getSize(new THREE.Vector3()) };
  }
  window.__templates = Object.fromEntries(Object.entries(templates).map(([k, v]) => [k, v.size.toArray().map((n) => +n.toFixed(2))]));

  // ---------- colisão (círculos em grade) ----------
  const CELL = 6, grid = new Map();
  const key = (cx, cz) => cx * 4096 + cz;
  const addCol = (x, z, r) => { const k = key(Math.floor(x / CELL), Math.floor(z / CELL)); (grid.get(k) ?? grid.set(k, []).get(k)).push({ x, z, r }); };

  // ---------- espalhar com instancing ----------
  const rnd = mulberry32(1337);
  const buckets = new Map(); // nome do template -> matrizes
  const spots = [];
  // centros de bosque: árvores e vegetação baixa se agrupam em volta deles
  for (let i = 0; i < 16; i++) {
    const a = rnd() * 6.283, d = 20 + rnd() * 72, x = Math.cos(a) * d, z = Math.sin(a) * d;
    if (Math.hypot(x - POND.x, z - POND.z) < POND.r + 6 || pathDist(x, z) < 6) continue;
    spots.push({ x, z });
  }
  const place = (names, count, o = {}) => {
    const { minR = 9, maxR = 118, scale = [0.9, 1.3], col = 0, noPath = 3.2, maxSlope = 0.55, minH = -99, maxH = 99, tilt = 0.06, cluster } = o;
    const list = names.filter((n) => templates[n]);
    if (!list.length) return;
    let made = 0, tries = 0;
    while (made < count && tries++ < count * 40) {
      let x, z;
      if (cluster && spots.length) { const c = spots[(rnd() * spots.length) | 0]; const a = rnd() * 6.283, d = Math.sqrt(rnd()) * cluster; x = c.x + Math.cos(a) * d; z = c.z + Math.sin(a) * d; }
      else { x = (rnd() - 0.5) * 250; z = (rnd() - 0.5) * 250; }
      const r = Math.hypot(x, z); if (r < minR || r > maxR) continue;
      const y = heightAt(x, z); if (y < waterY + 0.35 || y < minH || y > maxH) continue;
      if (pathDist(x, z) < noPath && x > -6) continue;
      const e = 0.8, sl = Math.hypot(heightAt(x + e, z) - heightAt(x - e, z), heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e);
      if (sl > maxSlope) continue;
      const name = list[(rnd() * list.length) | 0];
      const s = scale[0] + rnd() * (scale[1] - scale[0]);
      const m = new THREE.Matrix4().compose(
        new THREE.Vector3(x, y - 0.04, z),
        new THREE.Quaternion().setFromEuler(new THREE.Euler((rnd() - .5) * tilt, rnd() * 6.283, (rnd() - .5) * tilt)),
        new THREE.Vector3(s, s * (0.9 + rnd() * .25), s),
      );
      (buckets.get(name) ?? buckets.set(name, []).get(name)).push(m);
      if (col) addCol(x, z, col * s);
      if (o.remember) spots.push({ x, z });
      made++;
    }
  };

  const trees = ['CommonTree_1', 'CommonTree_2', 'CommonTree_3', 'CommonTree_4', 'CommonTree_5'];
  place(trees, lowQuality ? 150 : 260, { col: 0.55, scale: [0.85, 1.35], minR: 12, cluster: 17, remember: true });
  place(['Pine_1', 'Pine_2', 'Pine_3', 'Pine_4'], lowQuality ? 90 : 150, { col: 0.5, scale: [0.9, 1.5], minR: 24, minH: 3 });
  place(['Pine_1', 'Pine_2', 'Pine_3', 'Pine_4'], lowQuality ? 40 : 70, { col: 0.5, scale: [0.9, 1.4], minR: 14, cluster: 12 });
  place(['TwistedTree_1', 'TwistedTree_2', 'TwistedTree_3'], 12, { col: 1.4, scale: [0.6, 0.95], minR: 26, maxR: 100 });  // árvores vermelhas, raras: ponto focal
  place(['DeadTree_1', 'DeadTree_2'], 10, { col: 0.4, minR: 30 });
  place(['Bush_Common_Flowers', 'Bush_Common_Flowers', 'Bush_Common_Flowers', 'Bush_Common'], 90, { col: 0.4, scale: [0.9, 1.5], cluster: 14 });
  place(['Rock_Medium_1', 'Rock_Medium_2', 'Rock_Medium_3'], 55, { col: 1.0, scale: [0.8, 2.2], maxSlope: 0.9, minR: 10 });
  place(['Pebble_Round_1', 'Pebble_Round_2', 'Pebble_Round_3'], 160, { scale: [0.8, 1.8], maxSlope: 0.9, minR: 4 });
  place(['Flower_3_Group', 'Flower_4_Group'], lowQuality ? 260 : 420, { scale: [0.9, 1.6], minR: 3, noPath: 1.6, cluster: 22 });
  place(['Mushroom_Common'], 70, { scale: [0.8, 1.6], minR: 6, cluster: 10 });
  place(['Fern_1', 'Plant_1', 'Plant_7'], 220, { scale: [0.9, 1.6], minR: 6, cluster: 18 });
  place(['Clover_1'], 240, { scale: [1, 2], minR: 2, noPath: 1 });
  place(['Grass_Common_Short', 'Grass_Common_Tall', 'Grass_Wispy_Tall'], lowQuality ? 3500 : 7000, { scale: [0.9, 1.7], minR: 1.5, maxR: 95, noPath: 1.8, tilt: 0.2 });
  // pedras da trilha
  for (let x = 2; x < 118; x += 1.6) {
    const z = pathZ(x) + (rnd() - .5) * 4.4; if (hash(x, 3) < 0.45) continue;
    const y = heightAt(x, z); if (y < waterY + .3) continue;
    const name = ['RockPath_Round_Small_1', 'RockPath_Round_Small_2'][(rnd() * 2) | 0]; if (!templates[name]) continue;
    const s = 0.9 + rnd() * 0.8;
    (buckets.get(name) ?? buckets.set(name, []).get(name)).push(new THREE.Matrix4().compose(new THREE.Vector3(x, y + .01, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rnd() * 6.28, 0)), new THREE.Vector3(s, s, s)));
  }

  window.__spots = spots;
  window.__counts = Object.fromEntries([...buckets].map(([k, v]) => [k, v.length]));
  const tmp = new THREE.Matrix4();
  for (const [name, mats] of buckets) {
    for (const part of templates[name].parts) {
      const im = new THREE.InstancedMesh(part.geometry, part.material, mats.length);
      mats.forEach((m, i) => im.setMatrixAt(i, tmp.multiplyMatrices(m, part.matrix)));
      im.instanceMatrix.needsUpdate = true;
      im.castShadow = !/grass|clover|petal|flower|plant|fern/i.test(name) || /Bush/.test(name);
      im.receiveShadow = true;
      im.frustumCulled = false; // a esfera do mesh base fica na origem; sem isso as instâncias somem
      scene.add(im);
    }
  }

  // ---------- colisão do jogador ----------
  const PR = 0.38;
  function pushOut(x, z) {
    const cx = Math.floor(x / CELL), cz = Math.floor(z / CELL);
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) {
      const cell = grid.get(key(cx + a, cz + b)); if (!cell) continue;
      for (const c of cell) {
        const dx = x - c.x, dz = z - c.z, d = Math.hypot(dx, dz), min = c.r + PR;
        if (d < min && d > 1e-4) { x = c.x + dx / d * min; z = c.z + dz / d * min; }
      }
    }
    return [x, z];
  }
  function resolve(ox, oz, nx, nz) {
    const rr = Math.hypot(nx, nz), LIM = 104;   // borda jogável (círculo)
    if (rr > LIM) { nx *= LIM / rr; nz *= LIM / rr; }
    [nx, nz] = pushOut(nx, nz);
    if (inWater(nx, nz)) { // desliza ao longo da margem
      if (!inWater(nx, oz)) nz = oz; else if (!inWater(ox, nz)) nx = ox; else { nx = ox; nz = oz; }
    }
    // morro íngreme demais: bloqueia
    if (heightAt(nx, nz) - heightAt(ox, oz) > 0.55 * Math.hypot(nx - ox, nz - oz) + 0.02 && Math.hypot(nx - ox, nz - oz) > 1e-4) {
      const g = (heightAt(nx, nz) - heightAt(ox, oz)) / Math.hypot(nx - ox, nz - oz);
      if (g > 1.4) { nx = ox; nz = oz; }
    }
    return [nx, nz];
  }

  return {
    heightAt, resolve, waterY,
    update(dt, t, pos) {
      windU.value = t;
      wn.offset.set(t * 0.012, t * 0.008);
      water.material.normalMap.needsUpdate = false;
    },
  };
}
