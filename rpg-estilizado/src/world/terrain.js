import * as THREE from 'three';
import { TM, ANTONIA, GOLGOTHA, TOMB, LOOKOUT, GETHSEMANE, VILLAGE, KIDRON, ROADS, STREETS, roadDist, lineDist, inCity, inRect, SILOAM } from './layout.js';

// ---------------- ruído ----------------
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
const sm = (t) => t * t * (3 - 2 * t);
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1), u = sm(xf), v = sm(yf);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export const fbm = (x, y, o = 4) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++) { s += a * vnoise(x * f, y * f); f *= 2; a *= 0.5; } return s; };
export const ss = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const blob = (x, z, cx, cz, rx, rz) => { const d = ((x - cx) / rx) ** 2 + ((z - cz) / rz) ** 2; return Math.exp(-d * 1.6); };

// vale do Hinom: contorna a cidade por oeste e sul e desce até o Cedrom
const HINNOM = [[-185, -60], [-178, 40], [-150, 128], [-90, 158], [-10, 178], [60, 172], [105, 140], [KIDRON(140), 140]];

// ---------------- relevo ----------------
function rawHeight0(x, z) {
  const n = (fbm(x * 0.008 + 3, z * 0.008 - 7) - 0.5) * 9 + (fbm(x * 0.03, z * 0.03) - 0.5) * 2.2;
  let h = 9 + n * 0.8;
  h += 6 * blob(x, z, -100, 15, 85, 95);                 // colina ocidental (Cidade Alta)
  h += 5 * blob(x, z, 30, -10, 80, 90);                  // morro sob o Templo
  // vale do Cedrom com o leito do riacho
  const kx = KIDRON(z), dk = x - kx;
  h -= 10 * Math.exp(-((dk / 30) ** 2));
  h -= 1.3 * (1 - ss(1.2, 3.4, Math.abs(dk)));
  // Monte das Oliveiras: crista larga a leste, baixando para o sul
  h += 55 * Math.exp(-(((x - 225) / 85) ** 2)) * Math.exp(-(((z + 10) / 190) ** 2)) * (1 + 0.08 * Math.sin(z * 0.017));
  h += 3 * blob(x, z, LOOKOUT.x, LOOKOUT.z, 30, 30);
  // vale do Hinom
  const dh = lineDist(x, z, HINNOM);
  h -= 8 * Math.exp(-((dh / 20) ** 2));
  // Gólgota e a colina do sepulcro
  h += GOLGOTHA.h * blob(x, z, GOLGOTHA.x, GOLGOTHA.z, GOLGOTHA.r, GOLGOTHA.r * 0.85);
  h += 8 * blob(x, z, TOMB.x, TOMB.z - 8, 30, 15);
  // oeste: desce para a planície costeira; leste distante: deserto da Judeia
  h -= Math.max(0, -x - 230) * 0.16;
  h += Math.max(0, Math.hypot(x, z) - 300) * 0.05 * (x > 0 ? 1 : 0);
  // estradas levemente rebaixadas e niveladas
  const dr = roadDist(x, z);
  if (dr < 1.5) h -= 0.25 * (1 - ss(-1, 1.5, dr));
  return h;
}
// plataformas niveladas onde há construções fora da cidade
const PLATEAUS = [
  [LOOKOUT.x, LOOKOUT.z, 18], [GETHSEMANE.x, GETHSEMANE.z, 19], [VILLAGE.x, VILLAGE.z, 36],
  [96, 150, 13], [128, 128, 10], [168, 82, 9],
].map(([x, z, r]) => ({ x, z, r, h: preHeight(x, z) }));
function preHeight(x, z) { return rawHeight0(x, z); }
function rawHeight(x, z) {
  let h = rawHeight0(x, z);
  for (const p of PLATEAUS) { const d = Math.hypot(x - p.x, z - p.z); if (d < p.r * 2.2) h += (p.h - h) * 0.85 * Math.exp(-((d / (p.r * 0.75)) ** 2)); }
  return h;
}
// escavações: câmara do sepulcro (o morro não pode invadir a tumba) e pátio na frente dela
const TOMB_FLOOR = rawHeight(TOMB.x, TOMB.z + 10.5) - 0.1;
export const tombFloor = () => TOMB_FLOOR;
export function heightAt(x, z) {
  let h = rawHeight(x, z);
  const dx = Math.abs(x - TOMB.x), dz = z - (TOMB.z + 8.5);
  if (dx < 3.2 && dz > -8.2 && dz < 1.5) h = Math.min(h, TOMB_FLOOR - 0.4);
  else if (dx < 12 && dz >= 0 && dz < 9) h = Math.min(h, TOMB_FLOOR + Math.max(0, dz - 4) * 0.15 + Math.max(0, dx - 9) * 0.3);
  return h;
}

// ---------------- malha do terreno com pintura por regiões ----------------
export function makeTerrain(scene, ground, { lowQuality }) {
  const SIZE = 620, SEG = lowQuality ? 250 : 320;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG).rotateX(-Math.PI / 2);
  geo.translate(20, 0, 0);
  const P = geo.attributes.position, N = P.count, uv = geo.attributes.uv;
  for (let i = 0; i < N; i++) { const x = P.getX(i), z = P.getZ(i); P.setY(i, heightAt(x, z)); uv.setXY(i, x / 6, z / 6); }
  geo.computeVertexNormals();
  const nrm = geo.attributes.normal;
  const A = new Float32Array(N * 4), B = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    const x = P.getX(i), z = P.getZ(i), y = P.getY(i), ny = nrm.getY(i);
    const city = inCity(x, z) && !inRect(x, z, TM, -1);
    const road = 1 - ss(-0.6, 1.2, roadDist(x, z));
    const street = city ? 1 - ss(-0.8, 1.4, roadDist(x, z, STREETS)) : 0;
    const steep = 1 - ss(0.6, 0.8, ny);
    const golg = blob(x, z, GOLGOTHA.x + 6, GOLGOTHA.z + 10, 16, 12) * 1.4;
    const tombRock = blob(x, z, TOMB.x, TOMB.z - 6, 16, 6);
    const rock = Math.min(1, Math.max(steep, golg * 0.9, tombRock));
    const dryN = fbm(x * 0.02 + 40, z * 0.02);
    let dry = ss(0.55, 0.72, dryN) * 0.85 + (inCity(x, z) ? 0.6 : 0);
    // campos: aldeia (arados e trigo) e terraços
    const plowed = Math.max(rectMask(x, z, 160, 58, 16, 10, 0.35), rectMask(x, z, 92, 124, 13, 9, -0.2), rectMask(x, z, 186, 120, 12, 16, 0.1));
    const wheat = Math.max(rectMask(x, z, 178, 142, 26, 18, 0.15), rectMask(x, z, 60, 160, 22, 12, -0.1));
    A[i * 4] = Math.min(1, dry); A[i * 4 + 1] = rock; A[i * 4 + 2] = Math.max(road * (city ? 0.3 : 1), 0); A[i * 4 + 3] = city ? Math.max(0.55, street) : 0;
    B[i * 4] = plowed; B[i * 4 + 1] = wheat; B[i * 4 + 2] = 0; B[i * 4 + 3] = 0;
  }
  geo.setAttribute('aSplatA', new THREE.BufferAttribute(A, 4));
  geo.setAttribute('aSplatB', new THREE.BufferAttribute(B, 4));

  const mat = new THREE.MeshStandardMaterial({ map: ground.grass, normalMap: ground.grassN, normalScale: new THREE.Vector2(0.6, 0.6), roughness: 0.97 });
  mat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { tDry: { value: ground.dry }, tRock: { value: ground.rock }, tRoad: { value: ground.road }, tPave: { value: ground.pave } });
    sh.vertexShader = 'attribute vec4 aSplatA; attribute vec4 aSplatB; varying vec4 vA; varying vec4 vB; varying vec3 vW;\n' +
      sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vA = aSplatA; vB = aSplatB; vW = (modelMatrix * vec4(position,1.)).xyz;');
    sh.fragmentShader = 'uniform sampler2D tDry, tRock, tRoad, tPave; varying vec4 vA; varying vec4 vB; varying vec3 vW;\n' +
      sh.fragmentShader.replace('#include <map_fragment>', `
        vec2 uv = vMapUv;
        float lum = dot(texture2D(map, uv).rgb, vec3(.333)) / .36;
        float big = texture2D(map, vW.xz * .009).g, big2 = texture2D(map, vW.xz * .027 + .3).r;
        // pasto de primavera: verde-oliva com manchas douradas
        vec3 grass = mix(vec3(.30,.46,.13), vec3(.55,.62,.20), smoothstep(.3,.75,big));
        grass = mix(grass, vec3(.78,.68,.30), smoothstep(.6,.9,big2) * .55);
        grass *= .7 + lum * .45;
        vec3 dry = texture2D(tDry, uv * .9).rgb * vec3(1.08, .98, .86);
        vec3 rock = texture2D(tRock, uv * .55).rgb * vec3(1.05, .97, .85);
        vec3 road = texture2D(tRoad, uv * .8).rgb * vec3(1.12, 1.0, .82);
        vec3 pave = texture2D(tPave, vW.xz / 2.2).rgb * vec3(1.06, .98, .86);
        // campo arado: sulcos marrom-avermelhados
        float furrow = .5 + .5 * sin(vW.x * 2.6 + vW.z * .9);
        vec3 plowed = mix(vec3(.50,.32,.20), vec3(.66,.46,.30), furrow) * (.85 + lum * .25);
        vec3 wheat = mix(vec3(.80,.66,.28), vec3(.92,.82,.42), big2) * (.85 + lum * .25);
        vec3 c = grass;
        c = mix(c, dry, smoothstep(.2,.8, vA.x));
        c = mix(c, plowed, smoothstep(.3,.7, vB.x));
        c = mix(c, wheat, smoothstep(.3,.7, vB.y));
        c = mix(c, pave, smoothstep(.3,.7, vA.w));
        c = mix(c, road, smoothstep(.25,.75, vA.z));
        c = mix(c, rock, smoothstep(.3,.75, vA.y));
        diffuseColor *= vec4(c, 1.);
      `);
  };
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}
function rectMask(x, z, cx, cz, hw, hd, rot) {
  const c = Math.cos(rot), s = Math.sin(rot), dx = x - cx, dz = z - cz;
  const lx = c * dx - s * dz, lz = s * dx + c * dz;
  return (1 - ss(hw - 2, hw, Math.abs(lx))) * (1 - ss(hd - 2, hd, Math.abs(lz)));
}

// ---------------- horizonte: colinas distantes e o mar a oeste ----------------
export function makeHorizon(scene) {
  const rings = 40, segs = 128, R0 = 290, R1 = 2200;
  const pos = [], col = [], idx = [];
  const cNear = new THREE.Color(0x8a8a55), cFar = new THREE.Color(0x9a8aa8), cSand = new THREE.Color(0xc9b48a), c = new THREE.Color();
  for (let r = 0; r <= rings; r++) {
    const t = r / rings, R = R0 + (R1 - R0) * t * t;
    for (let s = 0; s < segs; s++) {
      const a = (s / segs) * Math.PI * 2, x = 20 + Math.cos(a) * R, z = Math.sin(a) * R;
      const west = Math.max(0, -Math.cos(a)); // 1 = oeste
      let h = (fbm(x * 0.004 + 9, z * 0.004) - 0.35) * 120 * ss(0, 0.3, t) + 20;
      h = R < 340 ? Math.min(h, heightAt(x, z) - 2) : h;
      // oeste: a terra desce até ficar abaixo do mar
      h -= west ** 1.5 * ss(380, 900, R) * 260;
      pos.push(x, h, z);
      c.copy(cNear).lerp(cFar, ss(0.1, 0.8, t));
      if (h < -18) c.copy(cSand);
      col.push(c.r, c.g, c.b);
    }
  }
  for (let r = 0; r < rings; r++) for (let s = 0; s < segs; s++) {
    const a = r * segs + s, b = r * segs + ((s + 1) % segs), d = (r + 1) * segs + s, e = (r + 1) * segs + ((s + 1) % segs);
    idx.push(a, b, d, b, e, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx); g.computeVertexNormals();
  const far = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }));
  far.receiveShadow = false;
  scene.add(far);

  // mar
  const wn = waterNormal(7);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(9000, 9000).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({
    color: 0x3d6f9a, roughness: 0.08, metalness: 0, normalMap: wn, normalScale: new THREE.Vector2(0.25, 0.25), clearcoat: 1, envMapIntensity: 1.2,
  }));
  sea.position.y = -22;
  scene.add(sea);
  return { far, sea, wn };
}

// normal de ondinhas (procedural, repetível)
export function waterNormal(rep = 6) {
  const s = 256, c = document.createElement('canvas'); c.width = c.height = s;
  const x = c.getContext('2d'), img = x.createImageData(s, s);
  const h = (u, v) => Math.sin(u * 6.2832 * 3) * .5 + Math.sin(v * 6.2832 * 4 + u * 6.2832) * .5 + Math.sin((u + v) * 6.2832 * 5) * .35 + Math.sin((u - v) * 6.2832 * 7) * .2;
  for (let j = 0; j < s; j++) for (let i = 0; i < s; i++) {
    const u = i / s, v = j / s, e = 1 / s, dx = h(u + e, v) - h(u - e, v), dy = h(u, v + e) - h(u, v - e), o = (j * s + i) * 4;
    img.data[o] = 128 + dx * 40; img.data[o + 1] = 128 + dy * 40; img.data[o + 2] = 255; img.data[o + 3] = 255;
  }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); return t;
}

// riacho do Cedrom: fita de água seguindo o leito
export function makeStream(scene, M) {
  const pts = [], W = 2.6;
  for (let z = -300; z <= 300; z += 4) pts.push([KIDRON(z), z]);
  const pos = [], uv = [], idx = [];
  pts.forEach(([x, z], i) => {
    const [x2, z2] = pts[Math.min(pts.length - 1, i + 1)], [x1, z1] = pts[Math.max(0, i - 1)];
    const tx = x2 - x1, tz = z2 - z1, L = Math.hypot(tx, tz), nx = -tz / L, nz = tx / L;
    const y = heightAt(x, z) + 0.45;
    pos.push(x + nx * W, y, z + nz * W, x - nx * W, y, z - nz * W);
    uv.push(0, i * 0.8, 1, i * 0.8);
    if (i < pts.length - 1) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx); g.computeVertexNormals();
  const wn = waterNormal(1); wn.repeat.set(1, 1);
  const mat = M.water.clone(); mat.normalMap = wn; mat.normalScale = new THREE.Vector2(0.6, 0.6); mat.color = new THREE.Color(0x3d7688); mat.roughness = 0.3; mat.clearcoat = 0.3; mat.envMapIntensity = 0.45; mat.opacity = 0.8;
  const mesh = new THREE.Mesh(g, mat); mesh.receiveShadow = true;
  scene.add(mesh);
  return { mesh, wn };
}
