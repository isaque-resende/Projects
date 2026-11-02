// Mockup "Ilhas da Memória" — estética inspirada em The Gardens Between.
// Hub de ilhas pastel flutuando num mar ao entardecer; caminhos de luz ligam as ilhas.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildHero } from '../../character.js';

const qs = new URLSearchParams(location.search);
const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');
const $ = (s) => document.querySelector(s);

// ---------------- paleta ----------------
const C = {
  skyTop: new THREE.Color('#6fb6c8'), skyMid: new THREE.Color('#b9d3e0'), horizon: new THREE.Color('#f4cdc3'),
  sun: new THREE.Color('#ffe2b8'), fog: new THREE.Color('#efcfc6'),
  seaNear: new THREE.Color('#3f9fae'), seaFar: new THREE.Color('#e9c9c4'), foam: new THREE.Color('#fbf3ec'),
  rockDeep: new THREE.Color('#5a8fa8'), rockMid: new THREE.Color('#c7a8b8'), rockTop: new THREE.Color('#ead2bf'),
  grass: new THREE.Color('#a8d4a6'), grass2: new THREE.Color('#cfe3a8'), sand: new THREE.Color('#f0dcc2'),
  clay: new THREE.Color('#e7b99a'), gold: new THREE.Color('#f1c27a'), stone: new THREE.Color('#efe2d4'),
};

// ---------------- renderer ----------------
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, isTouch ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(C.fog, 55, 210);
const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.5, 900);

// céu em degradê com sol baixo e faixas de nuvem
const SUN = new THREE.Vector3(-0.55, 0.16, -0.82).normalize();
const sky = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 16), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: { top: { value: C.skyTop }, mid: { value: C.skyMid }, hor: { value: C.horizon }, sunC: { value: C.sun }, sunD: { value: SUN }, t: { value: 0 } },
  vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
  fragmentShader: `uniform vec3 top, mid, hor, sunC, sunD; uniform float t; varying vec3 vD;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
    void main(){ float y = vD.y;
      vec3 c = mix(hor, mid, smoothstep(0.0, 0.22, y)); c = mix(c, top, smoothstep(0.18, 0.75, y));
      float s = max(dot(vD, sunD), 0.); c += sunC * (pow(s, 12.) * .55 + pow(s, 200.) * 1.6);
      vec2 uv = vD.xz / (y + .35) * 1.6; float cl = n(uv * 1.3 + vec2(t * .01, 0.)) * .6 + n(uv * 3.1) * .4;
      c = mix(c, vec3(1., .94, .92), smoothstep(.55, .8, cl) * smoothstep(.02, .14, y) * (1. - smoothstep(.35, .6, y)) * .55);
      c = mix(c, hor, 1. - smoothstep(-.02, .06, y));
      gl_FragColor = vec4(c, 1.); }`,
}));
scene.add(sky);

// luz difusa e quente
scene.add(new THREE.HemisphereLight('#cdeef2', '#f2b9ad', 1.55));
const sunL = new THREE.DirectionalLight('#ffd7b0', 2.1);
sunL.position.copy(SUN).multiplyScalar(80).add(new THREE.Vector3(0, 30, 0));
sunL.castShadow = true; sunL.shadow.mapSize.set(2048, 2048);
Object.assign(sunL.shadow.camera, { left: -40, right: 40, top: 40, bottom: -40, near: 1, far: 260 });
sunL.shadow.bias = -0.0005; sunL.shadow.normalBias = 0.04; sunL.shadow.radius = 4;
scene.add(sunL, sunL.target);

// ---------------- chamas e poeira de memória ----------------
const flames = [];
function glowTex() { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, '#fffaf0'); g.addColorStop(0.3, 'rgba(255,214,150,.7)'); g.addColorStop(1, 'rgba(255,190,120,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); }
const GLOW = glowTex();
function addFlame(p, s) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: '#ffc27a', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); sp.position.copy(p); sp.scale.setScalar(s); scene.add(sp); flames.push({ sp, s }); }
// ---------------- utilidades de forma ----------------
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
function noise3(x, y, z) { return Math.sin(x * 1.7 + y * 2.3) * 0.5 + Math.sin(z * 1.9 + x * 1.1) * 0.35 + Math.sin(y * 2.9 + z * 0.7) * 0.25; }
const vcMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 });
// pedra arredondada com cor por altura (azul na água, rosa-lavanda no meio, areia no alto)
function boulder(r, sy = 1, wob = 0.18) {
  const g = mergeVertices(new THREE.IcosahedronGeometry(r, 3).deleteAttribute('normal').deleteAttribute('uv')), p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(p, i), k = 1 + noise3(v.x * 0.9 / r * 2, v.y / r * 2, v.z / r * 2) * wob;
    p.setXYZ(i, v.x * k, v.y * k * sy, v.z * k);
  }
  g.computeVertexNormals();
  return g;
}
function paintByHeight(mesh) {
  const g = mesh.geometry, p = g.attributes.position, col = new Float32Array(p.count * 3), v = new THREE.Vector3(), c = new THREE.Color();
  mesh.updateMatrixWorld(true);
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i).applyMatrix4(mesh.matrixWorld);
    const y = v.y;
    if (y < 0.4) c.copy(C.rockDeep).lerp(C.rockMid, THREE.MathUtils.smoothstep(y, -4, 0.4));
    else c.copy(C.rockMid).lerp(C.rockTop, THREE.MathUtils.smoothstep(y, 0.4, 2.6));
    c.offsetHSL(0, 0, (Math.sin(v.x * 3.1 + v.z * 2.3) * 0.5 + 0.5) * 0.03);
    col.set([c.r, c.g, c.b], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
}
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...o });
const shadowed = (m) => { m.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); return m; };

// ---------------- ilhas ----------------
const ISLANDS = [
  { id: 'betania', name: 'Betânia', sub: 'a casa de Marta', x: 0, z: 0, r: 9, top: 2.2 },
  { id: 'mirante', name: 'O Mirante', sub: 'Monte das Oliveiras', x: 30, z: -15, r: 8, top: 3.4 },
  { id: 'patio', name: 'O Pátio do Templo', sub: 'onde as mesas foram viradas', x: 59, z: 2, r: 9.5, top: 2.6 },
];
const walkTops = []; // malhas clicáveis (tap-to-move)
const obstacles = []; // círculos {x,z,r}
function makeIsland(I, topColor = C.grass) {
  const g = new THREE.Group(); g.position.set(I.x, 0, I.z); scene.add(g);
  // rochas empilhadas sob o platô
  const core = new THREE.Mesh(boulder(I.r * 0.92, 0.62, 0.12), vcMat); core.position.y = I.top - I.r * 0.92 * 0.62 * 1.15 - 0.4; g.add(core);
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * Math.PI * 2 + rnd() * 0.4, d = I.r * (0.72 + rnd() * 0.25), s = I.r * (0.28 + rnd() * 0.18);
    const b = new THREE.Mesh(boulder(s, 0.8 + rnd() * 0.4), vcMat);
    b.position.set(Math.cos(a) * d, I.top - s * 1.2 - 0.6 - rnd() * 2, Math.sin(a) * d); b.rotation.set(rnd(), rnd() * 6, rnd()); g.add(b);
  }
  for (let k = 0; k < 6; k++) { // pedrinhas na beira da água
    const a = rnd() * Math.PI * 2, d = I.r * (1.05 + rnd() * 0.35), b = new THREE.Mesh(boulder(0.5 + rnd() * 1.1, 0.7), vcMat);
    b.position.set(Math.cos(a) * d, -0.2 + rnd() * 0.4, Math.sin(a) * d); g.add(b);
  }
  g.updateMatrixWorld(true); g.traverse((o) => { if (o.isMesh) { paintByHeight(o); o.castShadow = true; o.receiveShadow = true; } });
  // platô: grama com borda arredondada
  const top = new THREE.Mesh(new THREE.CylinderGeometry(I.r, I.r * 0.97, 0.7, 64, 1), [std(C.rockTop), std(topColor, { roughness: 1 }), std(C.rockTop)]);
  top.position.y = I.top - 0.35; top.receiveShadow = true; g.add(top);
  const lip = new THREE.Mesh(new THREE.TorusGeometry(I.r - 0.05, 0.22, 10, 64), std(C.rockTop)); lip.rotation.x = Math.PI / 2; lip.position.y = I.top - 0.02; lip.receiveShadow = true; g.add(lip);
  top.userData.island = I; walkTops.push(top);
  I.group = g;
  return g;
}

// árvore redonda de cartão-postal
function tree(x, z, y, s = 1, color = '#f4b6c2') {
  const t = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09 * s, 0.14 * s, 1.6 * s, 8), std('#b48a78')); trunk.position.y = 0.8 * s; t.add(trunk);
  for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(new THREE.SphereGeometry((0.8 - k * 0.15) * s, 18, 12), std(color, { roughness: 1 })); c.position.set((rnd() - 0.5) * 0.6 * s, (1.8 + k * 0.45) * s, (rnd() - 0.5) * 0.6 * s); t.add(c); }
  t.position.set(x, y, z); scene.add(shadowed(t)); obstacles.push({ x, z, r: 0.35 * s }); return t;
}
function tuft(x, z, y) { const m = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 5), std(rnd() < 0.5 ? '#8cc79a' : '#b9da9a')); m.position.set(x, y + 0.2, z); m.rotation.z = (rnd() - 0.5) * 0.4; scene.add(m); }
function decorate(I, n = 18, palette = ['#f4b6c2', '#9fd6cf', '#f7cf9e']) {
  for (let k = 0; k < 40; k++) { const a = rnd() * 6.28, d = Math.sqrt(rnd()) * (I.r - 0.8); tuft(I.x + Math.cos(a) * d, I.z + Math.sin(a) * d, I.top); }
}

// ---------------- conteúdo de cada ilha ----------------
const interact = []; // {kind, name, pos:Vector3, r, lines, onDone}
// 1) Betânia: casinha de barro, Marta, lamparina gigante
{
  const I = ISLANDS[0]; makeIsland(I); decorate(I);
  const house = new THREE.Group();
  const walls = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.6, 3.4), std(C.clay)); walls.position.y = 1.3; house.add(walls);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.3, 3.8), std('#f0d7c0')); roof.position.y = 2.75; house.add(roof);
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.7), std('#7a5a62')); door.position.set(0.6, 0.86, 1.71); house.add(door);
  const win = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.45), new THREE.MeshBasicMaterial({ color: '#ffd59a' })); win.position.set(-1.1, 1.7, 1.71); house.add(win);
  for (let k = 0; k < 3; k++) { const jar = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.22, 0.05], [0.28, 0.3], [0.16, 0.6], [0.12, 0.68]].map(([a, b]) => new THREE.Vector2(a, b)), 14), std('#e2a684')); jar.position.set(-2.4 + k * 0.6, 2.9, -1.2); house.add(jar); }
  house.position.set(I.x - 2.5, I.top, I.z - 3); house.rotation.y = 0.3; scene.add(shadowed(house));
  obstacles.push({ x: I.x - 2.5, z: I.z - 3, r: 2.6 });
  tree(I.x + 4.5, I.z - 4.5, I.top, 1.2); tree(I.x - 6, I.z + 2, I.top, 1, '#9fd6cf'); tree(I.x + 1, I.z + 6.5, I.top, 0.9, '#f7cf9e');
  // relíquia: lamparina de barro gigante com chama
  const lamp = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(1.6, 28, 18), std('#e8a985')); body.scale.set(1.3, 0.55, 1); lamp.add(body);
  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 1.4, 16), std('#e8a985')); spout.rotation.z = Math.PI / 2.4; spout.position.set(2.1, 0.35, 0); lamp.add(spout);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.16, 10, 20, Math.PI), std('#e8a985')); handle.position.set(-2, 0.4, 0); handle.rotation.z = Math.PI / 2; lamp.add(handle);
  lamp.position.set(I.x + 5.2, I.top + 0.6, I.z + 2.8); lamp.rotation.y = -0.6; scene.add(shadowed(lamp));
  obstacles.push({ x: I.x + 5.2, z: I.z + 2.8, r: 2.1 });
  const flameAt = new THREE.Vector3(2.75, 1.05, 0).applyMatrix4(lamp.matrixWorld.copy(new THREE.Matrix4().compose(lamp.position, new THREE.Quaternion().setFromEuler(lamp.rotation), new THREE.Vector3(1, 1, 1))));
  addFlame(flameAt, 1.0);
  const pl = new THREE.PointLight('#ffb36b', 18, 14, 1.6); pl.position.copy(flameAt).add(new THREE.Vector3(0, 0.5, 0)); scene.add(pl);
  interact.push({ kind: 'npc', id: 'marta', name: 'Marta', at: [I.x + 2.2, I.z - 0.6], face: [I.x - 1, I.z + 3], female: true,
    lines: ['Você também sentiu? A casa inteira está quieta demais desde sexta.', 'Cléopas quer partir para Emaús. Antes disso, suba ao mirante. De lá se vê o Templo.'] });
}
// 2) Mirante: parapeito, oliveiras prateadas, pergaminho gigante
{
  const I = ISLANDS[1]; makeIsland(I, C.grass2); decorate(I);
  for (let k = 0; k < 12; k++) { const a = -1.6 + k * 0.22, d = I.r - 0.6, b = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 0.5), std(C.stone)); b.position.set(I.x + Math.cos(a) * d, I.top + 0.4, I.z + Math.sin(a) * d); b.rotation.y = -a + Math.PI / 2; scene.add(shadowed(b)); }
  tree(I.x - 3, I.z + 3.5, I.top, 1.1, '#cfdcc6'); tree(I.x + 3.5, I.z + 4.2, I.top, 0.9, '#cfdcc6');
  // relíquia: pergaminho gigante aberto
  const scroll = new THREE.Group();
  const paperTex = (() => { const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d');
    x.fillStyle = '#f7ead2'; x.fillRect(0, 0, 512, 256); x.fillStyle = '#9a7a68';
    for (let r = 0; r < 9; r++) for (let w = 0; w < 7; w++) x.fillRect(470 - w * 66 - Math.random() * 20, 28 + r * 24, 30 + Math.random() * 26, 5);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(5, 2.4, 24, 1), std('#ffffff', { map: paperTex, side: THREE.DoubleSide }));
  const sp = sheet.geometry.attributes.position; for (let i = 0; i < sp.count; i++) sp.setZ(i, Math.sin((sp.getX(i) / 5 + 0.5) * Math.PI) * -0.3);
  sheet.geometry.computeVertexNormals(); sheet.rotation.x = -1.05; sheet.position.y = 1.1; scroll.add(sheet);
  for (const s of [-1, 1]) { const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 2.8, 20), std('#ead8b8')); roll.rotation.x = Math.PI / 2; roll.rotation.z = 0; roll.position.set(s * 2.6, 0.6, 0); roll.rotation.set(0, 0, 0); roll.rotation.x = -1.05 + Math.PI / 2; roll.position.set(s * 2.6, 1.1, 0); scroll.add(roll);
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), std(C.gold, { metalness: 0.5, roughness: 0.4 })); knob.position.copy(roll.position).add(new THREE.Vector3(0, 1.3 * Math.cos(1.05), -1.3 * Math.sin(1.05) * -1)); scroll.add(knob); }
  scroll.position.set(I.x - 1.5, I.top, I.z - 3.4); scroll.rotation.y = 0.35; scene.add(shadowed(scroll));
  obstacles.push({ x: I.x - 1.5, z: I.z - 3.4, r: 2.4 });
  interact.push({ kind: 'obj', id: 'rolo', name: 'o rolo da Lei e dos Profetas', at: [I.x - 1.5, I.z - 1.6], r: 2.2,
    lines: ['Um rolo enorme, aberto ao vento. As letras parecem se mexer quando você não olha direto.', '"Começando por Moisés e por todos os profetas..." Alguém, um dia, vai ler isto do começo ao fim para você.'] });
}
// 3) Pátio do Templo: lajes, colunas com capitéis dourados, mesas viradas, moedas gigantes, cambista
{
  const I = ISLANDS[2]; makeIsland(I, C.stone);
  for (let k = 0; k < 9; k++) {
    const a = 2.2 + k * 0.26, d = I.r - 1.3, x = I.x + Math.cos(a) * d, z = I.z + Math.sin(a) * d;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 4.2, 18), std('#f6efe6')); col.position.set(x, I.top + 2.1, z); scene.add(shadowed(col));
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.33, 0.45, 18), std(C.gold, { metalness: 0.6, roughness: 0.35 })); cap.position.set(x, I.top + 4.4, z); scene.add(cap);
    obstacles.push({ x, z, r: 0.45 });
  }
  const table = (x, z, ry, tilt) => { const t = new THREE.Group(), top = new THREE.Mesh(new THREE.BoxGeometry(2, 0.12, 1), std('#b88c78')); t.add(top);
    for (const [a, b] of [[-0.85, -0.4], [0.85, -0.4], [-0.85, 0.4], [0.85, 0.4]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.9, 0.1), std('#a87c6a')); l.position.set(a, -0.5, b); t.add(l); }
    t.rotation.set(tilt, ry, 0); t.position.set(x, I.top + (tilt ? 0.55 : 0.98), z); scene.add(shadowed(t)); obstacles.push({ x, z, r: 1.1 }); };
  table(I.x + 1.5, I.z + 1.2, 0.4, Math.PI / 2); table(I.x - 1.8, I.z + 2.6, -0.9, Math.PI); table(I.x + 3.6, I.z - 1.8, 1.2, 0);
  // relíquias: moedas gigantes rolando pelo pátio
  for (let k = 0; k < 5; k++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.18, 32), std(C.gold, { metalness: 0.7, roughness: 0.3 }));
    c.rotation.set(k % 2 ? Math.PI / 2 : 0.15, rnd() * 3, 0); c.position.set(I.x - 4 + k * 1.7, I.top + (k % 2 ? 0.9 : 0.1), I.z - 3.5 + (k % 3) * 0.9); scene.add(shadowed(c)); obstacles.push({ x: c.position.x, z: c.position.z, r: 0.9 }); }
  interact.push({ kind: 'npc', id: 'cambista', name: 'Cambista', at: [I.x + 3.6, I.z + 3.2], face: [I.x + 1.5, I.z + 1.2],
    lines: ['Não pise nas moedas! ...Ah, pode pisar. Desde segunda ninguém arrumou nada.', 'Ele virou as mesas e disse: "A casa de meu Pai é casa de oração." Eu ainda escuto isso à noite.'] });
}
// ---------------- relíquias no horizonte ----------------
function farRock(x, z, r, top) { const b = new THREE.Mesh(boulder(r, 0.9), vcMat); b.position.set(x, top - r * 0.6, z); scene.add(b); paintByHeight(b); return b; }
// Templo dourado em miniatura, numa rocha distante (visto do mirante)
{
  const x = 78, z = -62; farRock(x, z, 9, 4); farRock(x + 10, z + 6, 4, 1.2); farRock(x - 9, z + 4, 3, 0.8);
  const T = new THREE.Group(), white = std('#fbf4ea'), gold = std(C.gold, { metalness: 0.8, roughness: 0.28, emissive: '#7a4a10', emissiveIntensity: 0.25 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(10, 1.4, 7), white); base.position.y = 0.7; T.add(base);
  const body = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.6, 3.4), white); body.position.set(-1.4, 3.7, 0); T.add(body);
  const porch = new THREE.Mesh(new THREE.BoxGeometry(1.4, 6, 5), white); porch.position.set(1.3, 4.4, 0); T.add(porch);
  const crown = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 5.2), gold); crown.position.set(1.3, 7.5, 0); T.add(crown);
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3, 1.4), gold); door.position.set(2.05, 3.1, 0); T.add(door);
  T.position.set(x, 4, z); T.rotation.y = 0.9; scene.add(T);
}
// coroa de espinhos gigante meio afundada no mar
{
  const g = new THREE.Group(), thorn = std('#8a6a6a');
  for (let k = 0; k < 3; k++) { const t = new THREE.Mesh(new THREE.TorusGeometry(5, 0.35, 10, 48), thorn); t.rotation.set(Math.PI / 2 + (k - 1) * 0.12, 0, k); g.add(t); }
  for (let i = 0; i < 70; i++) { const a = (i / 70) * Math.PI * 2, c = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1.1, 5), thorn); c.position.set(Math.cos(a) * 5, (i % 3 - 1) * 0.2, Math.sin(a) * 5); c.lookAt(Math.cos(a) * 9, (i % 5 - 2) * 2, Math.sin(a) * 9); c.rotateX(Math.PI / 2); g.add(c); }
  g.position.set(-30, 0.6, -34); g.rotation.set(0.35, 0.4, 0.15); scene.add(g); farRock(-30, -34, 3.4, 0.8);
}
for (const [x, z, r] of [[22, 22, 3], [-18, 16, 2.4], [44, -40, 2.8], [86, 20, 4], [-40, -8, 3.6], [100, -20, 3]]) farRock(x, z, r, 1.2 + r * 0.2);

// ---------------- mar estilizado ----------------
const foamSpots = ISLANDS.map((I) => new THREE.Vector4(I.x, I.z, I.r * 1.12, 0));
while (foamSpots.length < 8) foamSpots.push(new THREE.Vector4(9999, 9999, 0, 0));
const sea = new THREE.Mesh(new THREE.PlaneGeometry(1400, 1400, 1, 1).rotateX(-Math.PI / 2), new THREE.ShaderMaterial({
  uniforms: { t: { value: 0 }, near: { value: C.seaNear }, far: { value: C.seaFar }, foam: { value: C.foam }, fogC: { value: C.fog }, sunD: { value: SUN }, spots: { value: foamSpots } },
  vertexShader: 'varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position,1.); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
  fragmentShader: `uniform float t; uniform vec3 near, far, foam, fogC, sunD; uniform vec4 spots[8]; varying vec3 vW;
    void main(){
      float d = distance(cameraPosition.xz, vW.xz);
      vec3 c = mix(near, far, smoothstep(30., 220., d));
      float w = sin(vW.x * .35 + t * .9) * sin(vW.z * .28 - t * .7) + sin((vW.x + vW.z) * .6 + t * 1.3) * .5;
      c += vec3(.06, .07, .07) * smoothstep(.6, 1.3, w) * (1. - smoothstep(60., 160., d));
      for (int i = 0; i < 8; i++) {
        float r = distance(vW.xz, spots[i].xy) - spots[i].z;
        float ring = smoothstep(1.6, 0., abs(r - .4 - .25 * sin(t * 1.2 + spots[i].x))) * step(0., r + .6);
        float ring2 = smoothstep(.5, 0., abs(r - 2.2 - .4 * sin(t * .8 + spots[i].y))) * .45;
        c = mix(c, foam, clamp(ring * .75 + ring2, 0., 1.));
      }
      vec3 toCam = normalize(cameraPosition - vW); vec3 refl = reflect(-toCam, vec3(0., 1., 0.));
      c += vec3(1., .86, .7) * pow(max(dot(refl, sunD), 0.), 40.) * .7;
      c = mix(c, fogC, smoothstep(140., 420., d));
      gl_FragColor = vec4(c, 1.);
    }`,
}));
scene.add(sea);

const motes = (() => { const N = 380, pos = new Float32Array(N * 3); for (let i = 0; i < N; i++) pos.set([(rnd() - 0.3) * 110, rnd() * 14, (rnd() - 0.6) * 70], i * 3);
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ map: GLOW, size: 0.35, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: '#fff1d0', opacity: 0.8 })); scene.add(p); return { p, pos, N }; })();

// ---------------- caminhos de luz entre ilhas ----------------
const bridges = [];
function makeBridge(A, B) {
  const d = new THREE.Vector2(B.x - A.x, B.z - A.z).normalize();
  const a = new THREE.Vector3(A.x + d.x * (A.r - 0.6), A.top, A.z + d.y * (A.r - 0.6)), b = new THREE.Vector3(B.x - d.x * (B.r - 0.6), B.top, B.z - d.y * (B.r - 0.6));
  const br = { A, B, a, b, formed: false, planks: [], len: a.distanceTo(b) };
  const n = Math.ceil(br.len / 0.75), plankMat = new THREE.MeshStandardMaterial({ color: '#fff3dc', emissive: '#ffcf8a', emissiveIntensity: 1.6, transparent: true, opacity: 0.9, roughness: 0.4 });
  for (let i = 0; i < n; i++) { const t = (i + 0.5) / n, p = bridgePoint(br, t);
    const m = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 0.55), plankMat); m.position.copy(p); m.lookAt(bridgePoint(br, Math.min(1, t + 0.02))); m.scale.setScalar(0.001); m.visible = false; scene.add(m); br.planks.push(m); }
  const pick = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.1, br.len), new THREE.MeshBasicMaterial({ visible: false })); pick.position.copy(a).lerp(b, 0.5); pick.lookAt(b); pick.position.y += 0.4; pick.userData.bridge = br; br.pick = pick; scene.add(pick);
  // pedra de passagem na beira da ilha A
  const stele = new THREE.Group(); const s1 = new THREE.Mesh(boulder(0.55, 1.5, 0.08), std('#f0e2d6')); s1.position.y = 0.7; stele.add(s1);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 10), new THREE.MeshStandardMaterial({ color: '#fff6e0', emissive: '#ffcf8a', emissiveIntensity: 2 })); orb.position.y = 1.65; stele.add(orb);
  const sp = a.clone().add(new THREE.Vector3(-d.y * 1.6, 0, d.x * 1.6)); stele.position.copy(sp); scene.add(shadowed(stele)); obstacles.push({ x: sp.x, z: sp.z, r: 0.5 });
  interact.push({ kind: 'stone', id: 'ponte' + bridges.length, name: 'Formar o caminho de luz', at: [sp.x, sp.z], r: 2.2, bridge: br, orb });
  bridges.push(br); return br;
}
function bridgePoint(br, t) { const p = br.a.clone().lerp(br.b, t); p.y = THREE.MathUtils.lerp(br.a.y, br.b.y, t) + Math.sin(t * Math.PI) * 1.4; return p; }
makeBridge(ISLANDS[0], ISLANDS[1]); makeBridge(ISLANDS[1], ISLANDS[2]);

// ---------------- chão: ilhas + caminhos formados ----------------
function groundAt(x, z) {
  for (const I of ISLANDS) if (Math.hypot(x - I.x, z - I.z) < I.r - 0.45) return I.top;
  for (const br of bridges) {
    if (!br.formed) continue;
    const ab = new THREE.Vector2(br.b.x - br.a.x, br.b.z - br.a.z), ap = new THREE.Vector2(x - br.a.x, z - br.a.z), L = ab.length(), t = ap.dot(ab) / (L * L);
    if (t < -0.02 || t > 1.02) continue;
    const perp = Math.abs(ab.x * ap.y - ab.y * ap.x) / L;
    if (perp < 0.75) return bridgePoint(br, THREE.MathUtils.clamp(t, 0, 1)).y + 0.06;
  }
  return null;
}
const islandAt = (x, z) => ISLANDS.find((I) => Math.hypot(x - I.x, z - I.z) < I.r + 0.5);

// ---------------- personagens ----------------
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const L = (n) => loader.loadAsync(`../assets/models/${n}.glb`);
const [baseG, hairG, beardG, animG, femG] = await Promise.all([L('hero_base'), L('hair_long'), L('hair_beard'), L('animations'), L('hero_female')]);
const clips = Object.fromEntries(animG.animations.map((c) => [c.name, c]));
const heroTpl = buildHero({ baseGltf: baseG, hairGltf: hairG, beardGltf: beardG });
const femTpl = buildHero({ baseGltf: femG, cover: true, colors: { tunic: 0xe9d6c0, veil: 0xc9a9c9, mantle: 0xd9b0a0 } });

// "memória tomando forma": leve transparência + contorno luminoso (fresnel)
function memoryLook(root, tint = '#ffe9c8') {
  root.traverse((o) => {
    if (!o.isMesh) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    const out = mats.map((m) => { if (!m.isMeshStandardMaterial) return m; const c = m.clone(); c.transparent = true; c.opacity = 0.86; c.emissive = new THREE.Color(tint); c.emissiveIntensity = 0.12;
      c.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float fr = pow(1.0 - abs(dot(normalize(vViewPosition), normal)), 2.2); totalEmissiveRadiance += vec3(1.0, .86, .62) * fr * 0.9;`); };
      c.customProgramCacheKey = () => 'memory-' + c.type; return c; });
    o.material = Array.isArray(o.material) ? out : out[0];
    o.castShadow = true;
  });
  return root;
}
function tintMantle(root, color) { root.traverse((o) => { if (o.isMesh && o.material?.name === 'mantle') { o.material = o.material.clone(); o.material.color = new THREE.Color(color); } }); }
function addHood(root) {
  root.updateMatrixWorld(true); let head = null; root.traverse((o) => { if (o.isBone && o.name === 'Head') head = o; });
  const cloth = new THREE.MeshStandardMaterial({ color: '#efe4d2', roughness: 0.95, side: THREE.DoubleSide });
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.17, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), cloth); hood.scale.set(1.08, 1.25, 1.22);
  const drape = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 0.5, 18, 1, true, Math.PI * 0.25, Math.PI * 1.5), cloth);
  const shade = new THREE.Mesh(new THREE.SphereGeometry(0.135, 16, 10, -Math.PI * 0.55, Math.PI * 1.1, 0, Math.PI * 0.45), new THREE.MeshBasicMaterial({ color: '#2a2030', transparent: true, opacity: 0.85, side: THREE.DoubleSide }));
  const hp = new THREE.Vector3(); head.getWorldPosition(hp);
  for (const [m, dy, dz] of [[hood, 0.07, -0.01], [drape, -0.16, -0.04], [shade, 0.06, 0.02]]) { m.position.set(hp.x, hp.y + dy, hp.z + dz); root.add(m); m.updateMatrixWorld(true); head.attach(m); }
}
function makeChar(tpl, { mantle, hood, memory } = {}) {
  const r = skClone(tpl); if (mantle) tintMantle(r, mantle); if (hood) addHood(r); if (memory) memoryLook(r);
  r.traverse((o) => { if (o.isMesh) { o.frustumCulled = false; o.castShadow = true; } });
  const g = new THREE.Group(); g.add(r); scene.add(g);
  const mixer = new THREE.AnimationMixer(r), acts = {};
  const play = (n, fade = 0.25) => { const a = acts[n] ??= mixer.clipAction(clips[n]); if (g.userData.cur === a) return; a.reset().play(); if (g.userData.cur) g.userData.cur.crossFadeTo(a, fade, false); g.userData.cur = a; };
  play('Idle_Loop', 0); mixer.update(rnd() * 2);
  return { g, body: r, mixer, play, yaw: 0 };
}
const player = makeChar(heroTpl, { memory: true });
const cleopas = makeChar(heroTpl, { mantle: '#8fa9d6', memory: true });
const stranger = makeChar(heroTpl, { mantle: '#e9dcc6', hood: true, memory: true });
const companions = [cleopas, stranger];
// sparkles em volta dos três
const sparkles = companions.concat([player]).map((c) => { const N = 18, pos = new Float32Array(N * 3); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ map: GLOW, size: 0.16, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: '#ffe7bf' })); scene.add(p); return { c, p, pos, N, ph: rnd() * 9 }; });

// NPCs da ilha (não são memória: sólidos)
for (const it of interact) if (it.kind === 'npc') {
  const ch = makeChar(it.female ? femTpl : heroTpl, { mantle: it.female ? null : '#b9c98a' });
  const I = islandAt(it.at[0], it.at[1]); ch.g.position.set(it.at[0], I.top, it.at[1]);
  ch.g.rotation.y = Math.atan2(it.face[0] - it.at[0], it.face[1] - it.at[1]); it.ch = ch; it.r = 2.3;
  obstacles.push({ x: it.at[0], z: it.at[1], r: 0.45 });
}

// ---------------- indicadores flutuantes ----------------
function markTex() { const c = document.createElement('canvas'); c.width = c.height = 96; const x = c.getContext('2d');
  x.translate(48, 44); x.rotate(Math.PI / 4); x.fillStyle = 'rgba(255,248,236,.95)'; x.shadowColor = 'rgba(240,170,120,.9)'; x.shadowBlur = 16; x.fillRect(-18, -18, 36, 36);
  x.setTransform(1, 0, 0, 1, 0, 0); x.fillStyle = '#d89a74'; x.beginPath(); x.arc(48, 44, 6, 0, 7); x.fill(); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const MARK = markTex();
for (const it of interact) { it.mark = new THREE.Sprite(new THREE.SpriteMaterial({ map: MARK, transparent: true, depthTest: false })); it.mark.renderOrder = 10; scene.add(it.mark); }

// ---------------- pós-processamento ----------------
const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: 4 }));
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth / 2, innerHeight / 2), 0.55, 0.85, 0.72));
composer.addPass(new OutputPass());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

// ---------------- entrada ----------------
const keys = new Set(); let actQ = false;
addEventListener('keydown', (e) => { keys.add(e.code); if (e.code === 'KeyE' || e.code === 'Enter' || e.code === 'Space') actQ = true; });
addEventListener('keyup', (e) => keys.delete(e.code));
let yaw = -0.55, yawTarget = yaw, dragging = null, moveTarget = null, autoAct = null;
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
renderer.domElement.addEventListener('pointerdown', (e) => { dragging = { x: e.clientX, y: e.clientY, moved: 0 }; renderer.domElement.setPointerCapture(e.pointerId); });
renderer.domElement.addEventListener('pointermove', (e) => { if (!dragging) return; const dx = e.clientX - dragging.x; dragging.moved += Math.abs(dx) + Math.abs(e.clientY - dragging.y); dragging.x = e.clientX; dragging.y = e.clientY; if (dragging.moved > 10) yawTarget -= dx * 0.005; });
renderer.domElement.addEventListener('pointerup', (e) => {
  const tap = dragging && dragging.moved < 10; dragging = null; if (!tap) return;
  if (dlg) { advance(); return; }
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  // tocou num personagem/objeto?
  let best = null, bd = 1.6;
  for (const it of interact) { const p = new THREE.Vector3(it.at[0], (islandAt(it.at[0], it.at[1])?.top ?? 2) + 1, it.at[1]); const d = ray.ray.distanceToPoint(p); if (d < bd) { bd = d; best = it; } }
  if (best) { moveTarget = new THREE.Vector3(best.at[0], 0, best.at[1]); autoAct = best; return; }
  const hit = ray.intersectObjects([...walkTops, ...bridges.filter((b) => b.formed).map((b) => b.pick)], false)[0];
  if (hit) { moveTarget = hit.point.clone(); autoAct = null; }
});
$('#act').addEventListener('click', () => { actQ = true; });
$('#talk').addEventListener('pointerup', (e) => { e.stopPropagation(); advance(); });

// ---------------- diálogo ----------------
let dlg = null;
function openDialog(it) {
  if (it.kind === 'stone') { formBridge(it); return; }
  dlg = { it, i: 0, shown: 0 }; $('#talk').hidden = false; $('#act').hidden = true;
  $('#talkName').textContent = it.kind === 'npc' ? it.name : `Você examina ${it.name}`;
  if (it.ch) it.ch.play('Idle_Talking_Loop');
}
function advance() { if (!dlg) return; const line = dlg.it.lines[dlg.i]; if (dlg.shown < line.length) { dlg.shown = line.length; return; } dlg.i++; dlg.shown = 0; if (dlg.i >= dlg.it.lines.length) { if (dlg.it.ch) dlg.it.ch.play('Idle_Loop'); dlg.it.done = true; dlg = null; $('#talk').hidden = true; } }

// caminho de luz se forma prancha por prancha
let forming = null;
function formBridge(it) { if (it.bridge.formed || forming) return; forming = { br: it.bridge, t: 0, it }; it.done = true; }

// ---------------- rótulo do lugar ----------------
let curIsland = null, placeT = 0;
function showPlace(I) { $('#place b').textContent = I.name; $('#place span').textContent = I.sub; $('#place').classList.add('on'); placeT = 3.5; }

// ---------------- loop ----------------
const P = player.g.position; P.set(2, ISLANDS[0].top, 3.5);
const trail = []; for (let i = 0; i < 40; i++) trail.push(P.clone());
cleopas.g.position.copy(P).add(new THREE.Vector3(-1.2, 0, 1)); stranger.g.position.copy(P).add(new THREE.Vector3(-2.2, 0, 1.8));
const camT = P.clone(), tmp = new THREE.Vector3(), clock = new THREE.Clock();
let heroYaw = 0, speed = 0;
function step(dt) {
  const t = clock.elapsedTime;
  // movimento
  let ix = 0, iz = 0;
  if (!dlg && !forming) {
    if (keys.has('KeyA') || keys.has('ArrowLeft')) ix -= 1; if (keys.has('KeyD') || keys.has('ArrowRight')) ix += 1;
    if (keys.has('KeyW') || keys.has('ArrowUp')) iz -= 1; if (keys.has('KeyS') || keys.has('ArrowDown')) iz += 1;
  }
  let dir = new THREE.Vector3();
  if (ix || iz) { moveTarget = null; autoAct = null; dir.set(ix, 0, iz).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw); }
  else if (moveTarget && !dlg && !forming) { dir.set(moveTarget.x - P.x, 0, moveTarget.z - P.z); const d = dir.length(); const stopAt = autoAct ? 1.6 : 0.15;
    if (d < stopAt) { moveTarget = null; dir.set(0, 0, 0); if (autoAct) { openDialog(autoAct); autoAct = null; } } else dir.divideScalar(d); }
  const want = dir.lengthSq() > 0 ? 3.4 : 0; speed = THREE.MathUtils.damp(speed, want, 10, dt);
  if (speed > 0.05) {
    const nx = P.x + dir.x * speed * dt, nz = P.z + dir.z * speed * dt;
    const ok = (x, z) => groundAt(x, z) !== null && !obstacles.some((o) => Math.hypot(x - o.x, z - o.z) < o.r + 0.3);
    if (ok(nx, nz)) { P.x = nx; P.z = nz; } else if (ok(nx, P.z)) P.x = nx; else if (ok(P.x, nz)) P.z = nz; else { moveTarget = null; }
    if (dir.lengthSq() > 0) { const w = Math.atan2(dir.x, dir.z); let d = w - heroYaw; d = Math.atan2(Math.sin(d), Math.cos(d)); heroYaw += d * Math.min(1, dt * 10); player.body.rotation.y = heroYaw; }
  }
  const gy = groundAt(P.x, P.z); if (gy !== null) P.y = THREE.MathUtils.damp(P.y, gy, 14, dt);
  player.play(speed > 2.2 ? 'Jog_Fwd_Loop' : speed > 0.3 ? 'Walk_Loop' : (dlg ? 'Idle_Loop' : 'Idle_Loop'));
  // rastro para os que seguem (ficam sempre no caminho)
  if (trail[0].distanceTo(P) > 0.3) { trail.unshift(P.clone()); trail.length = 60; }
  companions.forEach((c, k) => {
    const target = trail[Math.min(trail.length - 1, 6 + k * 6)], d = tmp.copy(target).sub(c.g.position); d.y = 0; const dist = d.length();
    const sp = dist > 0.4 ? Math.min(dist * 2.2, 4) : 0;
    if (sp > 0) { d.normalize(); c.g.position.addScaledVector(d, sp * dt); c.body.rotation.y = Math.atan2(d.x, d.z); }
    const cy = groundAt(c.g.position.x, c.g.position.z); if (cy !== null) c.g.position.y = THREE.MathUtils.damp(c.g.position.y, cy, 12, dt);
    c.play(sp > 2.2 ? 'Jog_Fwd_Loop' : sp > 0.25 ? 'Walk_Loop' : 'Idle_Loop');
  });
  for (const ch of [player, ...companions]) ch.mixer.update(dt);
  for (const it of interact) if (it.ch) { it.ch.mixer.update(dt); if (dlg?.it === it) { const w = Math.atan2(P.x - it.at[0], P.z - it.at[1]); it.ch.g.rotation.y = w; } }
  // caminho de luz se formando
  if (forming) {
    forming.t += dt; const br = forming.br, n = br.planks.length;
    br.planks.forEach((m, i) => { const k = THREE.MathUtils.clamp((forming.t * 1.6 - i / n) * 4, 0, 1); m.visible = k > 0; m.scale.setScalar(Math.max(0.001, k)); });
    if (forming.t > 1.4) { br.formed = true; forming = null; }
  }
  // interação próxima
  let best = null, bd = Infinity;
  for (const it of interact) { if (it.kind === 'stone' && it.bridge.formed) continue; const d = Math.hypot(it.at[0] - P.x, it.at[1] - P.z); if (d < (it.r || 2.2) && d < bd) { bd = d; best = it; } }
  if (best && !dlg && !forming) { $('#act').hidden = false; $('#act').innerHTML = `<kbd>E</kbd>${best.kind === 'npc' ? 'Falar com ' + best.name : best.kind === 'stone' ? best.name : 'Examinar ' + best.name}`; if (actQ) openDialog(best); }
  else if (!dlg) $('#act').hidden = true;
  if (dlg && actQ) advance();
  actQ = false;
  if (dlg) { const line = dlg.it.lines[dlg.i]; dlg.shown = Math.min(line.length, dlg.shown + dt * 48); $('#talkText').textContent = line.slice(0, Math.floor(dlg.shown)); $('#talk').classList.toggle('ready', dlg.shown >= line.length); }
  // indicadores
  for (const it of interact) {
    const I = islandAt(it.at[0], it.at[1]), d = Math.hypot(it.at[0] - P.x, it.at[1] - P.z), hide = (it.kind === 'stone' && it.bridge.formed) || dlg;
    it.mark.visible = !hide && d < 40; it.mark.material.opacity = THREE.MathUtils.clamp(1.15 - d / 30, 0.2, 1) * (it.done ? 0.35 : 1);
    const k = 1 + Math.sin(t * 2.2 + it.at[0]) * 0.08; it.mark.scale.setScalar(0.55 * k);
    it.mark.position.set(it.at[0], (I?.top ?? 2) + (it.kind === 'npc' ? 2.55 : it.kind === 'stone' ? 2.3 : 3.2) + Math.sin(t * 1.6 + it.at[1]) * 0.08, it.at[1]);
    if (it.orb) it.orb.material.emissiveIntensity = 1.6 + Math.sin(t * 3) * 0.6;
  }
  // lugar atual
  const isl = islandAt(P.x, P.z); if (isl && isl !== curIsland) { curIsland = isl; showPlace(isl); }
  placeT -= dt; if (placeT < 0) $('#place').classList.remove('on');
  // câmera de diorama: alta, inclinada, puxada para o centro da ilha, com leve balanço
  yaw = THREE.MathUtils.damp(yaw, yawTarget + Math.sin(t * 0.07) * 0.08, 3, dt);
  const focus = tmp.copy(P); if (isl) focus.lerp(new THREE.Vector3(isl.x, isl.top, isl.z), 0.35);
  camT.lerp(focus, 1 - Math.exp(-3 * dt));
  const portrait = innerWidth / innerHeight < 1, dist = portrait ? 42 : 30, pitch = 0.56;
  camera.position.set(camT.x + Math.sin(yaw) * Math.cos(pitch) * dist, camT.y + Math.sin(pitch) * dist, camT.z + Math.cos(yaw) * Math.cos(pitch) * dist);
  camera.lookAt(camT.x, camT.y + 0.8, camT.z);
  sunL.target.position.copy(P); sunL.position.copy(P).addScaledVector(SUN, 90).add(new THREE.Vector3(0, 35, 0));
  // ambiente vivo
  sky.material.uniforms.t.value = t; sea.material.uniforms.t.value = t;
  flames.forEach((f, i) => f.sp.scale.setScalar(f.s * (1 + Math.sin(t * 9 + i) * 0.08 + Math.sin(t * 17) * 0.05)));
  const mp = motes.pos; for (let i = 0; i < motes.N; i++) { mp[i * 3 + 1] += dt * (0.15 + (i % 7) * 0.03); mp[i * 3] += Math.sin(t * 0.5 + i) * dt * 0.1; if (mp[i * 3 + 1] > 15) mp[i * 3 + 1] = 0.5; }
  motes.p.geometry.attributes.position.needsUpdate = true;
  for (const s of sparkles) { for (let i = 0; i < s.N; i++) { const a = t * 0.8 + i * 2.1 + s.ph, h = ((t * 0.35 + i / s.N) % 1); s.pos.set([s.c.g.position.x + Math.cos(a) * 0.45, s.c.g.position.y + 0.2 + h * 1.9, s.c.g.position.z + Math.sin(a) * 0.45], i * 3); } s.p.geometry.attributes.position.needsUpdate = true; s.p.material.opacity = 0.9; }
}
function frame() { const dt = Math.min(clock.getDelta(), 0.05); step(dt); composer.render(); requestAnimationFrame(frame); }
$('#load').classList.add('done');
window.__mock = {
  advance: (n = 1) => { for (let i = 0; i < n; i++) step(1 / 30); composer.render(); },
  teleport: (x, z) => { const y = groundAt(x, z); P.set(x, y ?? P.y, z); for (const p of trail) p.copy(P); camT.copy(P); },
  formAll: () => { for (const br of bridges) { br.formed = true; br.planks.forEach((m) => { m.visible = true; m.scale.setScalar(1); }); } },
  setYaw: (y) => { yaw = yawTarget = y; }, keys, interact, P, openDialog, get dlg() { return dlg; }, scene, renderer, camera,
};
if (!qs.has('shot')) frame();
