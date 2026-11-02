// Mockup "estilo Tunic": câmera isométrica ortográfica fixa, low poly facetado em cores chapadas,
// ilhas-bloco flutuando sobre água azul, cel shading, bloom suave e tilt-shift. Três áreas ligadas como salas.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const qs = new URLSearchParams(location.search);
// ---------- renderer ----------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2b8fe8);

// câmera ortográfica isométrica: vista de sudeste, inclinada ~38°
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 400);
const CAM_DIR = new THREE.Vector3(Math.cos(0.66) * Math.sin(Math.PI / 4), Math.sin(0.66), Math.cos(0.66) * Math.cos(Math.PI / 4)).normalize();
function frame() {
  const a = innerWidth / innerHeight, h = a < 1 ? 15 : 11;
  camera.left = -h * a / 2; camera.right = h * a / 2; camera.top = h / 2; camera.bottom = -h / 2; camera.updateProjectionMatrix();
}
frame();

// ---------- luz cel ----------
const ramp = new THREE.DataTexture(new Uint8Array([105, 105, 120, 255, 185, 180, 190, 255, 255, 255, 255, 255]), 3, 1);
ramp.minFilter = ramp.magFilter = THREE.NearestFilter; ramp.needsUpdate = true;
const toon = (color, extra = {}) => new THREE.MeshToonMaterial({ color, gradientMap: ramp, ...extra });
scene.add(new THREE.HemisphereLight(0xfff1d6, 0x6a4a8a, 1.35));
const sun = new THREE.DirectionalLight(0xfff0d0, 2.6);
sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 80 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.02;
scene.add(sun, sun.target);
const SUN_OFF = new THREE.Vector3(-14, 26, 10);

// ---------- utilidades low poly ----------
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const facet = (g) => { const n = g.index ? g.toNonIndexed() : g; n.computeVertexNormals(); return n; };
function paint(g, fn) { // cor por vértice, decidida por face (normal + altura)
  const p = g.attributes.position, nrm = g.attributes.normal, c = new Float32Array(p.count * 3), col = new THREE.Color();
  for (let i = 0; i < p.count; i += 3) {
    const ny = (nrm.getY(i) + nrm.getY(i + 1) + nrm.getY(i + 2)) / 3, y = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3;
    fn(col, ny, y);
    for (let k = 0; k < 3; k++) { c[(i + k) * 3] = col.r; c[(i + k) * 3 + 1] = col.g; c[(i + k) * 3 + 2] = col.b; }
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3)); return g;
}
const C = (h) => new THREE.Color(h);
function mesh(geo, mat, x, y, z, { cast = true, recv = true, ry = 0 } = {}) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; m.castShadow = cast; m.receiveShadow = recv; scene.add(m); return m;
}

// ilha de blocos: platô retangular + anel recortado de degraus de penhasco, listras de rocha nos lados
function island(cx, cz, w, d, top, palette) {
  const cols = [];
  const W2 = Math.ceil(w / 2), D2 = Math.ceil(d / 2);
  for (let i = -W2 - 2; i < W2 + 2; i++) for (let j = -D2 - 2; j < D2 + 2; j++) {
    const inside = i >= -W2 && i < W2 && j >= -D2 && j < D2;
    const ring = Math.max(i < -W2 ? -W2 - i : i >= W2 ? i - W2 + 1 : 0, j < -D2 ? -D2 - j : j >= D2 ? j - D2 + 1 : 0);
    let h = top;
    if (!inside) { if (rnd() < (ring === 1 ? 0.35 : 0.7)) continue; h = top - ring * 0.55 - rnd() * 0.9; }
    const bottom = top - 5 - rnd() * 2.5 + ring * 1.2;
    const g = new THREE.BoxGeometry(1, h - bottom, 1); g.translate(cx + i + 0.5, (h + bottom) / 2, cz + j + 0.5);
    const tint = 0.94 + rnd() * 0.1, topC = C(inside ? palette.top : palette.ledge).multiplyScalar(tint);
    cols.push(paint(facet(g), (col, ny, y) => {
      if (ny > 0.5) col.copy(topC);
      else if (y > top - 0.35 && inside) col.copy(C(palette.lip));
      else { const band = Math.floor((top - y) / 0.7); col.copy(C(band % 2 ? palette.cliffA : palette.cliffB)); if (y < top - 3.5) col.lerp(C(palette.deep), 0.6); }
    }));
  }
  const m = mesh(mergeGeometries(cols), toon(0xffffff, { vertexColors: true }), 0, 0, 0);
  // espuma em volta, na linha d'água (os blocos escondem o meio)
  const foam = mesh(new THREE.PlaneGeometry(w + 6.5, d + 6.5).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.55 }), cx, WATER + 0.02, cz, { cast: false });
  foams.push(foam);
  return m;
}
const WATER = -3.2, foams = [];
const water = mesh(new THREE.PlaneGeometry(600, 600).rotateX(-Math.PI / 2), toon(0x2b8fe8, { emissive: 0x0b3a7a, emissiveIntensity: 0.35 }), 40, WATER, 0, { cast: false });

// ---------- props low poly ----------
function box(color, x, y, z, sx, sy, sz, ry = 0, opt) { return mesh(facet(new THREE.BoxGeometry(sx, sy, sz)), toon(color), x, y + sy / 2, z, { ry, ...opt }); }
function tree(x, z, y, kind = 'olive') {
  if (kind === 'cypress') {
    mesh(facet(new THREE.CylinderGeometry(0.08, 0.12, 0.6, 5)), toon(0x6b4a33), x, y + 0.3, z);
    mesh(facet(new THREE.ConeGeometry(0.55, 3.0, 6)), toon(0x2f7a4c), x, y + 2.0, z);
  } else {
    mesh(facet(new THREE.CylinderGeometry(0.1, 0.18, 1.2, 5)), toon(0x7a5238), x, y + 0.6, z);
    for (const [ox, oy, oz, r] of [[0, 1.6, 0, 0.85], [0.45, 1.35, 0.2, 0.55], [-0.4, 1.4, -0.25, 0.6]]) {
      const g = facet(new THREE.IcosahedronGeometry(r, 0)); mesh(g, toon(kind === 'almond' ? 0xf4b8c8 : 0x9ab65a), x + ox, y + oy, z + oz);
    }
  }
}
function rock(x, z, y, s = 0.4) { const g = facet(new THREE.DodecahedronGeometry(s, 0)); g.scale(1, 0.7, 1); mesh(g, toon(0xe7c9a0), x, y + s * 0.3, z, { ry: rnd() * 6 }); }
function flowers(x, z, y, n = 6) { for (let i = 0; i < n; i++) { const g = facet(new THREE.OctahedronGeometry(0.07, 0)); mesh(g, toon([0xff5a5a, 0xffd34a, 0xc58bff][i % 3]), x + (rnd() - 0.5) * 1.2, y + 0.12, z + (rnd() - 0.5) * 1.2, { cast: false }); } }

// ---------- personagens: boneco low poly com túnica, manto e cabeça grande ----------
function figure({ tunic = 0xf2ead6, mantle = 0x9a5a34, hair = 0x3a2416, skin = 0xd9a07a, turban = 0, beard = true }) {
  const g = new THREE.Group(), M = (c) => toon(c);
  const leg = (s) => { const p = new THREE.Group(); p.position.set(s * 0.09, 0.42, 0); const l = new THREE.Mesh(facet(new THREE.BoxGeometry(0.1, 0.42, 0.12)), M(0x6b4a33)); l.position.y = -0.21; l.castShadow = true; p.add(l); g.add(p); return p; };
  const legs = [leg(-1), leg(1)];
  const body = new THREE.Mesh(facet(new THREE.CylinderGeometry(0.17, 0.31, 0.62, 7)), M(tunic)); body.position.y = 0.6; body.castShadow = true; g.add(body);
  const belt = new THREE.Mesh(facet(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 7)), M(0xb5482a)); belt.position.y = 0.66; g.add(belt);
  const cape = new THREE.Mesh(facet(new THREE.BoxGeometry(0.2, 0.62, 0.36)), M(mantle)); cape.position.set(0.1, 0.62, -0.02); cape.rotation.z = -0.35; cape.castShadow = true; g.add(cape);
  const arm = (s) => { const p = new THREE.Group(); p.position.set(s * 0.22, 0.86, 0); const a = new THREE.Mesh(facet(new THREE.BoxGeometry(0.09, 0.36, 0.1)), M(tunic)); a.position.y = -0.17; a.castShadow = true; p.add(a); const hnd = new THREE.Mesh(facet(new THREE.IcosahedronGeometry(0.055, 0)), M(skin)); hnd.position.y = -0.37; p.add(hnd); g.add(p); return p; };
  const arms = [arm(-1), arm(1)];
  const head = new THREE.Group(); head.position.y = 1.12; g.add(head);
  const face = new THREE.Mesh(facet(new THREE.IcosahedronGeometry(0.23, 1)), M(skin)); face.castShadow = true; head.add(face);
  const cap = new THREE.Mesh(facet(new THREE.IcosahedronGeometry(0.245, 1)), M(turban || hair)); cap.scale.set(1, turban ? 0.75 : 0.85, 1); cap.position.set(0, turban ? 0.1 : 0.06, -0.04); head.add(cap);
  if (!turban) { const back = new THREE.Mesh(facet(new THREE.BoxGeometry(0.34, 0.3, 0.12)), M(hair)); back.position.set(0, -0.1, -0.16); head.add(back); }
  if (beard) { const b = new THREE.Mesh(facet(new THREE.ConeGeometry(0.15, 0.24, 6)), M(hair)); b.rotation.x = Math.PI; b.position.set(0, -0.2, 0.1); head.add(b); }
  for (const s of [-1, 1]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.028, 6, 4), new THREE.MeshBasicMaterial({ color: 0x1a1010 })); e.position.set(s * 0.08, 0.02, 0.21); head.add(e); }
  g.userData = { legs, arms, head, body, cape, t: rnd() * 6 };
  g.scale.setScalar(1.15);
  scene.add(g); return g;
}
function animate(f, dt, moving) {
  const u = f.userData; u.t += dt * (moving ? 9 : 2);
  const s = moving ? Math.sin(u.t) * 0.7 : 0;
  u.legs[0].rotation.x = s; u.legs[1].rotation.x = -s; u.arms[0].rotation.x = -s * 0.8; u.arms[1].rotation.x = s * 0.8;
  u.body.position.y = 0.6 + (moving ? Math.abs(Math.cos(u.t)) * 0.04 : Math.sin(u.t) * 0.012);
  u.head.position.y = 1.12 + (moving ? Math.abs(Math.cos(u.t)) * 0.05 : Math.sin(u.t) * 0.015);
  if (u.talking) u.head.rotation.z = Math.sin(u.t * 3) * 0.06; else u.head.rotation.z *= 0.9;
}

// ---------- as três áreas ----------
const AREAS = [];
const interact = []; // { area, kind, name, pos, lines, el }
const exits = [];    // { area, pos, to, entry, label }
const PAL = {
  grass: { top: 0xb5d85c, ledge: 0x9cc94e, lip: 0x8ab845, cliffA: 0xe3946a, cliffB: 0xd07c5c, deep: 0x7a4a6a },
  stone: { top: 0xf1e2c0, ledge: 0xe6d0a4, lip: 0xd8bd8a, cliffA: 0xe8b07c, cliffB: 0xd69a6a, deep: 0x7a4a6a },
};
// 1) Betânia: casa em corte (paredes do fundo altas, da frente baixas)
{
  const cx = 0, cz = 0, top = 0; seed = 11;
  island(cx, cz, 12, 11, top, PAL.grass);
  box(0xc8925e, cx - 0.5, top, cz - 0.5, 7, 0.12, 6, 0, { cast: false }); // piso de madeira
  const wall = 0xf0d6a8, trim = 0xc9784e;
  box(wall, cx - 0.5, top, cz - 3.6, 7.2, 2.6, 0.3); box(wall, cx - 4.1, top, cz - 0.5, 0.3, 2.6, 6.2);           // fundo (alto)
  box(trim, cx - 0.5, top + 2.6, cz - 3.6, 7.4, 0.2, 0.42); box(trim, cx - 4.1, top + 2.6, cz - 0.5, 0.42, 0.2, 6.4);
  box(wall, cx - 0.5, top, cz + 2.6, 7.2, 0.55, 0.3); box(wall, cx + 3.1, top, cz - 1.9, 0.3, 0.55, 3.2); box(wall, cx + 3.1, top, cz + 1.9, 0.3, 0.55, 1.2); // frente (baixa), porta à direita
  box(0x7a5238, cx - 3.0, top, cz - 2.6, 1.9, 0.45, 1.1); box(0xf2ead6, cx - 3.0, top + 0.45, cz - 2.6, 1.8, 0.12, 1.0); box(0xd8503a, cx - 3.4, top + 0.57, cz - 2.6, 0.9, 0.06, 1.02); // cama
  box(0x7a5238, cx + 1.8, top, cz - 2.8, 1.0, 0.7, 0.7); // mesa
  const lamp = mesh(facet(new THREE.SphereGeometry(0.12, 6, 4)), new THREE.MeshBasicMaterial({ color: 0xffd27a }), cx + 1.8, top + 0.85, cz - 2.8, { cast: false });
  const pl = new THREE.PointLight(0xffb45a, 6, 6, 1.6); pl.position.set(cx + 1.8, top + 1.3, cz - 2.6); scene.add(pl);
  box(0xd28a5a, cx - 3.6, top, cz + 1.8, 0.45, 0.6, 0.45); // jarro
  for (let i = 0; i < 5; i++) box(0xffffff, cx + 4.6, top - 0.02, cz + 0.3 + i * 0.9, 1.2, 0.05, 0.6, 0, { cast: false }); // caminho de saída
  tree(cx + 4.8, cz - 4.0, top, 'olive'); tree(cx - 5.2, cz + 4.6, top, 'cypress'); rock(cx + 5.4, cz + 4.5, top); flowers(cx + 4.2, cz + 3.8, top);
  const cleo = figure({ mantle: 0x4a6ea8 }); cleo.position.set(cx + 0.6, top, cz - 1.0); cleo.rotation.y = 0.6;
  AREAS.push({ name: 'Betânia', sub: 'casa de Marta', center: new THREE.Vector3(cx, top, cz), top, bounds: [cx - 5.6, cx + 5.6, cz - 5.2, cz + 5.2], start: new THREE.Vector3(cx - 2.2, top, cz - 1.6),
    blocks: [[cx - 0.5, cz - 3.6, 3.6, 0.2], [cx - 4.1, cz - 0.5, 0.2, 3.1], [cx - 0.5, cz + 2.6, 3.6, 0.2], [cx + 3.1, cz - 1.9, 0.2, 1.6], [cx + 3.1, cz + 1.9, 0.2, 0.6], [cx - 3.0, cz - 2.6, 1.0, 0.6], [cx + 1.8, cz - 2.8, 0.55, 0.4], [cx + 4.8, cz - 4.0, 0.4, 0.4], [cx - 5.2, cz + 4.6, 0.4, 0.4]] });
  interact.push({ area: 0, kind: 'npc', name: 'Cléopas', fig: cleo, pos: cleo.position, lines: ['Você acordou. Eu nem dormi.', 'As mulheres voltaram do jardim dizendo coisas sem sentido... Vamos sair. Quero ver a cidade do alto do monte.'] });
  exits.push({ area: 0, pos: new THREE.Vector3(cx + 5.0, top, cz + 4.6), to: 1, entry: 'west', label: 'Estrada' });
}
// 2) Estrada e mirante, com o Templo dourado ao longe
{
  const cx = 40, cz = 0, top = 0.6; seed = 23;
  island(cx, cz, 14, 12, top, PAL.grass);
  for (let i = 0; i < 9; i++) box(0xf6dfa8, cx - 5.5 + i * 1.3, top - 0.02, cz + 4 - i * 0.9, 1.4, 0.05, 1.3, 0.6, { cast: false }); // trilha
  for (const [x, z, k] of [[-3, -2, 'olive'], [-1, -4, 'olive'], [3, -3, 'almond'], [5, 3, 'cypress'], [-5.5, 1, 'cypress'], [1.5, 2.8, 'olive']]) tree(cx + x, cz + z, top, k);
  for (let i = 0; i < 6; i++) rock(cx - 6 + rnd() * 12, cz - 5 + rnd() * 10, top, 0.25 + rnd() * 0.2);
  flowers(cx - 2, cz + 3.5, top, 10); flowers(cx + 2, cz - 1, top, 8);
  box(0xe7c9a0, cx - 6.6, top, cz - 4.2, 0.4, 0.6, 3.4); box(0xe7c9a0, cx - 4.8, top, cz - 5.6, 3.6, 0.6, 0.4); // parapeito do mirante (canto noroeste)
  box(0xd8bd8a, cx - 5.6, top, cz - 4.6, 1.4, 0.35, 0.5); // banco
  // o Templo ao longe, numa ilha mais alta
  seed = 31; island(cx - 22, cz - 22, 10, 10, top + 3, PAL.stone);
  const T = new THREE.Vector3(cx - 22, top + 3, cz - 22);
  box(0xfaf3e2, T.x, T.y, T.z, 4, 5, 3.4); box(0xf2b632, T.x, T.y + 5, T.z, 4.3, 0.35, 3.7);
  box(0x2a1a14, T.x + 1.0, T.y, T.z + 1.72, 1.3, 2.8, 0.05, 0, { cast: false });
  for (let i = 0; i < 7; i++) mesh(facet(new THREE.ConeGeometry(0.08, 0.5, 4)), toon(0xf2b632), T.x - 1.8 + i * 0.6, T.y + 5.6, T.z + 1.8);
  for (const s of [-1, 1]) box(0xfaf3e2, T.x + s * 3.4, T.y, T.z + 1, 0.8, 2.6, 6);
  AREAS.push({ name: 'Monte das Oliveiras', sub: 'o mirante', center: new THREE.Vector3(cx, top, cz), top, bounds: [cx - 6.8, cx + 6.8, cz - 5.8, cz + 5.8], start: new THREE.Vector3(cx - 5.2, top, cz + 4.6),
    blocks: [[cx - 6.6, cz - 4.2, 0.2, 1.7], [cx - 4.8, cz - 5.6, 1.8, 0.2], [cx - 3, cz - 2, 0.4, 0.4], [cx - 1, cz - 4, 0.4, 0.4], [cx + 3, cz - 3, 0.4, 0.4], [cx + 5, cz + 3, 0.4, 0.4], [cx - 5.5, cz + 1, 0.4, 0.4], [cx + 1.5, cz + 2.8, 0.4, 0.4]] });
  interact.push({ area: 1, kind: 'obj', name: 'Jerusalém lá embaixo', pos: new THREE.Vector3(cx - 5.4, top, cz - 3.6), lines: ['Daqui se vê o Templo inteiro, dourado no sol da manhã.', 'Tão bonito... e há três dias, tão escuro.'] });
  exits.push({ area: 1, pos: new THREE.Vector3(cx - 6.2, top, cz + 5.0), to: 0, entry: 'east', label: 'Betânia' });
  exits.push({ area: 1, pos: new THREE.Vector3(cx + 6.2, top, cz - 4.8), to: 2, entry: 'south', label: 'Pátio do Templo' });
}
// 3) Pátio do Templo: colunata no fundo, mesas viradas, cambista
{
  const cx = 80, cz = 0, top = 1.2; seed = 47;
  island(cx, cz, 14, 14, top, PAL.stone);
  for (let i = -6; i <= 6; i += 1) for (let j = -6; j <= 6; j += 1) if ((i + j) % 2 === 0) box(0xe8d4ac, cx + i + 0.5, top - 0.03, cz + j + 0.5, 0.96, 0.04, 0.96, 0, { cast: false }); // lajes xadrez
  for (let i = 0; i < 7; i++) { // colunatas no fundo (norte e oeste)
    for (const [x, z] of [[cx - 6 + i * 2, cz - 6.2], [cx - 6.2, cz - 6 + i * 2]]) {
      mesh(facet(new THREE.CylinderGeometry(0.22, 0.26, 3.2, 8)), toon(0xfaf3e2), x, top + 1.6, z);
      box(0xf2b632, x, top + 3.2, z, 0.6, 0.25, 0.6);
    }
  }
  box(0xb07a4a, cx - 0.2, top + 3.45, cz - 6.2, 14, 0.3, 1.2); box(0xb07a4a, cx - 6.2, top + 3.45, cz - 0.2, 1.2, 0.3, 14);
  // fachada do santuário ao fundo
  box(0xfaf3e2, cx - 3, top + 3.6, cz - 10, 6, 6, 2); box(0xf2b632, cx - 3, top + 9.6, cz - 10, 6.3, 0.4, 2.3); box(0x2a1a14, cx - 3, top + 3.6, cz - 8.98, 1.6, 3.4, 0.05, 0, { cast: false });
  // mesas viradas, moedas e gaiola
  const t1 = box(0x8a5a38, cx + 1, top, cz + 0.5, 1.6, 0.12, 0.9, 0.4); t1.rotation.z = 1.2; t1.position.y += 0.45;
  box(0x8a5a38, cx + 2.5, top, cz + 1.8, 1.6, 0.6, 0.8, -0.7);
  for (let i = 0; i < 18; i++) mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 8), toon(0xf2b632, { emissive: 0x6a4a00, emissiveIntensity: 0.4 }), cx + 0.5 + (rnd() - 0.5) * 3, top + 0.02, cz + 1.2 + (rnd() - 0.5) * 2.5, { cast: false });
  box(0xc8925e, cx - 0.4, top, cz + 2.2, 0.5, 0.5, 0.5, 0.5);
  const camb = figure({ tunic: 0xf2c24a, mantle: 0x7a3a8a, turban: 0xf2ead6, hair: 0x2a1a10 }); camb.position.set(cx + 3.6, top, cz - 0.6); camb.rotation.y = -0.9;
  AREAS.push({ name: 'Pátio do Templo', sub: 'pátio dos gentios', center: new THREE.Vector3(cx, top, cz), top, bounds: [cx - 5.6, cx + 6.8, cz - 5.6, cz + 6.8], start: new THREE.Vector3(cx + 5.6, top, cz + 5.6),
    blocks: [[cx + 1, cz + 0.5, 0.9, 0.5], [cx + 2.5, cz + 1.8, 0.85, 0.5], [cx - 0.4, cz + 2.2, 0.3, 0.3]] });
  interact.push({ area: 2, kind: 'npc', name: 'Cambista', fig: camb, pos: camb.position, lines: ['Não pise nas moedas! ...Ah, pode pisar. Desde segunda ninguém arrumou nada.', 'Ele entrou com um chicote de cordas e virou tudo. "A casa de meu Pai é casa de oração!"'] });
  interact.push({ area: 2, kind: 'obj', name: 'as mesas viradas', pos: new THREE.Vector3(cx + 1.6, top, cz + 1.0), lines: ['Mesas de cambistas viradas, moedas espalhadas entre as lajes, uma gaiola de pombas aberta e vazia.'] });
  exits.push({ area: 2, pos: new THREE.Vector3(cx + 6.4, top, cz + 6.4), to: 1, entry: 'east', label: 'Monte das Oliveiras' });
}
const ENTRY = { 0: { east: new THREE.Vector3(3.8, 0, 3.6) }, 1: { west: new THREE.Vector3(34.6, 0.6, 4.4), east: new THREE.Vector3(45.2, 0.6, -3.8) }, 2: { south: new THREE.Vector3(85.2, 1.2, 5.2) } };

// ---------- jogador ----------
const player = figure({ mantle: 0x9a5a34 });
let area = 0;
player.position.copy(AREAS[0].start);
const camTarget = player.position.clone();

// ---------- pós-processamento: bloom suave + tilt-shift ----------
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.35, 0.5, 0.86));
const tilt = (dx, dy) => new ShaderPass({
  uniforms: { tDiffuse: { value: null }, dir: { value: new THREE.Vector2(dx / innerWidth, dy / innerHeight) }, amount: { value: 2.6 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 dir; uniform float amount; varying vec2 vUv;
    void main(){ float k = smoothstep(.16, .5, abs(vUv.y - .5)) * amount; vec4 s = vec4(0.); float w = 0.;
      for (int i = -4; i <= 4; i++) { float f = float(i), g = exp(-f*f/8.); s += texture2D(tDiffuse, vUv + dir * f * k) * g; w += g; }
      gl_FragColor = s / w; }`,
});
const tiltH = tilt(1, 0), tiltV = tilt(0, 1);
composer.addPass(tiltH); composer.addPass(tiltV);
composer.addPass(new OutputPass());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); frame(); tiltH.uniforms.dir.value.set(1 / innerWidth, 0); tiltV.uniforms.dir.value.set(0, 1 / innerHeight); });

// ---------- interface ----------
const $ = (s) => document.querySelector(s);
const marksEl = $('#marks');
for (const it of [...interact, ...exits]) {
  const el = document.createElement('div'); el.className = 'mark' + (it.to !== undefined ? ' exit' : '');
  el.innerHTML = `<i>${it.to !== undefined ? '➜' : it.kind === 'npc' ? '…' : '?'}</i><span>${it.to !== undefined ? it.label : it.name}</span>`;
  marksEl.appendChild(el); it.el = el;
}
let dlg = null;
function openDialog(it) { dlg = { it, i: 0, shown: 0 }; $('#talk').hidden = false; $('#talk b').textContent = it.kind === 'npc' ? it.name : 'Você examina'; if (it.fig) it.fig.userData.talking = true; }
function advance() { if (!dlg) return; const L = dlg.it.lines[dlg.i]; if (dlg.shown < L.length) { dlg.shown = L.length; return; } dlg.i++; dlg.shown = 0; if (dlg.i >= dlg.it.lines.length) { if (dlg.it.fig) dlg.it.fig.userData.talking = false; dlg = null; $('#talk').hidden = true; } }
$('#talk').addEventListener('pointerdown', (e) => { e.stopPropagation(); advance(); });
function showTitle(a) { $('#title small').textContent = AREAS[a].sub; $('#title b').textContent = AREAS[a].name; $('#title').classList.add('on'); clearTimeout(showTitle.t); showTitle.t = setTimeout(() => $('#title').classList.remove('on'), 2600); }

// ---------- entrada: teclado + tocar/clicar para andar ----------
const keys = new Set();
addEventListener('keydown', (e) => { keys.add(e.code); if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') { if (dlg) advance(); else if (near) openDialog(near); } target = null; });
addEventListener('keyup', (e) => keys.delete(e.code));
let target = null, pending = null, near = null;
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (e) => {
  if (dlg) { advance(); return; }
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  // tocou numa pessoa/objeto ou numa saída?
  for (const it of [...interact, ...exits]) {
    if (it.area !== area) continue;
    const p = it.pos.clone().project(camera);
    const dx = (p.x - ndc.x) * innerWidth / 2, dy = (p.y - ndc.y) * innerHeight / 2;
    if (Math.hypot(dx, dy) < 46) { target = it.pos.clone(); pending = it; ping(e); return; }
  }
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -AREAS[area].top), hit = new THREE.Vector3();
  if (ray.ray.intersectPlane(plane, hit)) { target = hit; pending = null; ping(e); }
});
function ping(e) { const p = $('#ping'); p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px'; p.classList.remove('go'); void p.offsetWidth; p.classList.add('go'); }

// ---------- movimento e colisão (caixas por área) ----------
function blocked(x, z) {
  const A = AREAS[area], [x0, x1, z0, z1] = A.bounds;
  if (x < x0 || x > x1 || z < z0 || z > z1) return true;
  for (const [bx, bz, hx, hz] of A.blocks) if (Math.abs(x - bx) < hx + 0.25 && Math.abs(z - bz) < hz + 0.25) return true;
  for (const it of interact) if (it.area === area && it.kind === 'npc' && Math.hypot(x - it.pos.x, z - it.pos.z) < 0.5) return true;
  return false;
}
// caminho em grade (A* simples) para o tocar-para-andar contornar paredes
let path = [];
function findPath(from, to) {
  const A = AREAS[area], [x0, x1, z0, z1] = A.bounds, h = 0.5, W = Math.ceil((x1 - x0) / h) + 1, D = Math.ceil((z1 - z0) / h) + 1;
  const cell = (x, z) => [Math.round((x - x0) / h), Math.round((z - z0) / h)], pos = (i, j) => [x0 + i * h, z0 + j * h];
  const free = (i, j) => i >= 0 && j >= 0 && i < W && j < D && !blocked(...pos(i, j));
  const [si, sj] = cell(from.x, from.z); let [ti, tj] = cell(to.x, to.z);
  if (!free(ti, tj)) { let best = null, bd = 1e9; for (let i = ti - 3; i <= ti + 3; i++) for (let j = tj - 3; j <= tj + 3; j++) if (free(i, j)) { const d = Math.hypot(i - ti, j - tj); if (d < bd) { bd = d; best = [i, j]; } } if (!best) return []; [ti, tj] = best; }
  const key = (i, j) => i * 1000 + j, prev = new Map([[key(si, sj), null]]), q = [[si, sj]];
  while (q.length) { const [i, j] = q.shift(); if (i === ti && j === tj) break;
    for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) { const ni = i + di, nj = j + dj, k = key(ni, nj); if (!prev.has(k) && free(ni, nj) && (!di || !dj || (free(i + di, j) && free(i, j + dj)))) { prev.set(k, [i, j]); q.push([ni, nj]); } } }
  if (!prev.has(key(ti, tj))) return [];
  const out = []; for (let c = [ti, tj]; c; c = prev.get(key(...c))) out.unshift(new THREE.Vector3(...pos(c[0], c[1]).flatMap((v, k) => k ? [A.top, v] : [v])));
  out.shift(); out.push(new THREE.Vector3(to.x, A.top, to.z)); return out;
}
let fading = false;
function travel(ex) {
  if (fading) return; fading = true; $('#fade').style.opacity = 1; target = null; pending = null;
  setTimeout(() => {
    area = ex.to; const A = AREAS[area], e = ENTRY[area][ex.entry];
    player.position.set(e.x, A.top, e.z); camTarget.copy(player.position).lerp(A.center, 0.35);
    sun.position.copy(A.center).add(SUN_OFF); sun.target.position.copy(A.center);
    showTitle(area);
    setTimeout(() => { $('#fade').style.opacity = 0; fading = false; }, 120);
  }, 380);
}

const clock = new THREE.Clock(), v = new THREE.Vector3(), tmp = new THREE.Vector3();
let lastExit = null;
function step(dt) {
  const t = clock.elapsedTime;
  let mx = 0, mz = 0;
  if (!dlg && !fading) {
    // WASD relativo à câmera isométrica
    const f = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
    const r = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
    if (f || r) { mx = -f * 0.7071 + r * 0.7071; mz = -f * 0.7071 - r * 0.7071; }
    else if (target) {
      if (!path.length || path.target !== target) { path = findPath(player.position, target); path.target = target; if (!path.length) path = [target]; path.target = target; }
      while (path.length > 1 && Math.hypot(path[0].x - player.position.x, path[0].z - player.position.z) < 0.25) path.shift();
      const wp = path.length > 1 ? path[0] : target;
      v.subVectors(wp, player.position); v.y = 0;
      const d = path.length > 1 ? Math.hypot(target.x - player.position.x, target.z - player.position.z) + 1 : v.length();
      const dl = v.length() || 1;
      const stopAt = pending ? (pending.to !== undefined ? 0.1 : 1.1) : 0.08;
      if (d < stopAt) { if (pending) { if (pending.to !== undefined) travel(pending); else openDialog(pending); } target = null; pending = null; path = []; }
      else { mx = v.x / dl; mz = v.z / dl; }
    }
  }
  const moving = !!(mx || mz);
  if (moving) {
    const L = Math.hypot(mx, mz), sp = 3.6 * dt; mx /= L; mz /= L;
    const nx = player.position.x + mx * sp, nz = player.position.z + mz * sp;
    if (!blocked(nx, player.position.z)) player.position.x = nx;
    if (!blocked(player.position.x, nz)) player.position.z = nz;
    const want = Math.atan2(mx, mz); let dy = want - player.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); player.rotation.y += dy * Math.min(1, dt * 14);
  }
  animate(player, dt, moving);
  for (const it of interact) if (it.fig) {
    animate(it.fig, dt, false);
    if (it.fig.userData.talking) { const want = Math.atan2(player.position.x - it.pos.x, player.position.z - it.pos.z); let dy = want - it.fig.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); it.fig.rotation.y += dy * Math.min(1, dt * 6); }
  }
  // saídas por proximidade
  for (const ex of exits) if (ex.area === area && Math.hypot(ex.pos.x - player.position.x, ex.pos.z - player.position.z) < 0.7 && lastExit !== ex) { lastExit = ex; travel(ex); }
  if (lastExit && Math.hypot(lastExit.pos.x - player.position.x, lastExit.pos.z - player.position.z) > 1.5) lastExit = null;
  // quem está perto
  near = null; let bd = 1.6;
  for (const it of interact) if (it.area === area) { const d = Math.hypot(it.pos.x - player.position.x, it.pos.z - player.position.z); if (d < bd) { bd = d; near = it; } }
  // câmera segue suave, presa à área
  const focus = tmp.copy(player.position).lerp(AREAS[area].center, 0.35); focus.y = AREAS[area].top; // enquadra o jogador e o centro da sala
  camTarget.lerp(focus, 1 - Math.exp(-6 * dt));
  camera.position.copy(camTarget).addScaledVector(CAM_DIR, 60); camera.lookAt(camTarget);
  // marcadores na tela: mais nítidos de perto
  for (const it of [...interact, ...exits]) {
    if (it.area !== area || dlg) { it.el.style.opacity = 0; continue; }
    tmp.copy(it.pos); tmp.y += it.to !== undefined ? 0.6 : it.kind === 'npc' ? 1.75 : 1.1;
    const p = tmp.project(camera), d = Math.hypot(it.pos.x - player.position.x, it.pos.z - player.position.z);
    it.el.style.left = ((p.x + 1) / 2 * innerWidth) + 'px'; it.el.style.top = ((1 - p.y) / 2 * innerHeight) + 'px';
    it.el.style.opacity = Math.max(0.25, Math.min(1, 1.25 - d / 8));
    it.el.querySelector('span').style.display = d < 3 || it === near ? '' : 'none';
  }
  if (dlg) { const L = dlg.it.lines[dlg.i]; dlg.shown = Math.min(L.length, dlg.shown + dt * 48); $('#talk p').textContent = L.slice(0, Math.floor(dlg.shown)); }
  for (const f of foams) f.material.opacity = 0.42 + Math.sin(t * 1.6) * 0.12;
}
function loop() { const dt = Math.min(clock.getDelta(), 0.05); step(dt); composer.render(); requestAnimationFrame(loop); }
sun.position.copy(AREAS[0].center).add(SUN_OFF); sun.target.position.copy(AREAS[0].center);
showTitle(0);
setTimeout(() => { $('#fade').style.opacity = 0; }, 100);
window.__mock = { player, AREAS, interact, exits, travel: (to, entry) => travel({ to, entry }), go: (x, z) => { target = new THREE.Vector3(x, 0, z); }, step: (n = 1) => { for (let i = 0; i < n; i++) step(1 / 30); composer.render(); }, get area() { return area; } };
if (!qs.has('shot')) loop(); else { $('#fade').style.transition = 'none'; $('#fade').style.opacity = 0; }
