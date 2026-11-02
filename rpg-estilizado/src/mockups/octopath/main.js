import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { charSheet, FW, FH, treeCanvas, flameCanvas, markerCanvas, arrowCanvas, makeTextures, backdropCanvas, nearestTex, srand, rnd } from './pixel.js';

// =====================================================================================
//  Mockup HD-2D (estilo Octopath Traveler): sprites de pixel art em cenário 3D de texturas
//  pixeladas, câmera fixa de lado/cima, tilt-shift (topo e base desfocados), bloom, luzes
//  quentes, poeira, vinheta. Três áreas ligadas pelas bordas, estilo RPG clássico.
// =====================================================================================
const qs = new URLSearchParams(location.search);
const isTouch = matchMedia('(pointer: coarse)').matches;
const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(26, innerWidth / innerHeight, 0.5, 400);
const T = makeTextures();
const SPX = 1 / 16.5;   // tamanho de 1 pixel de sprite em unidades do mundo

// ---------------- pós-processamento: bloom → tilt-shift (H, V) → saída → grade ----------------
const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType }));
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth / 2, innerHeight / 2), 0.55, 0.65, 0.72);
composer.addPass(bloom);
const tiltShader = (dir) => ({
  uniforms: { tDiffuse: { value: null }, uDir: { value: new THREE.Vector2(...dir) }, uRes: { value: new THREE.Vector2(innerWidth, innerHeight) }, uFocus: { value: 0.42 }, uBand: { value: 0.1 }, uMax: { value: 7.0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform vec2 uDir, uRes; uniform float uFocus, uBand, uMax; varying vec2 vUv;
    void main(){
      float d = abs(vUv.y - uFocus) - uBand;
      float r = clamp(d / 0.32, 0., 1.); r = r * r * uMax;
      vec2 st = uDir / uRes * max(r, 0.001) * 0.5;
      vec4 c = texture2D(tDiffuse, vUv) * 0.2270;
      c += (texture2D(tDiffuse, vUv + st * 1.) + texture2D(tDiffuse, vUv - st * 1.)) * 0.1946;
      c += (texture2D(tDiffuse, vUv + st * 2.) + texture2D(tDiffuse, vUv - st * 2.)) * 0.1216;
      c += (texture2D(tDiffuse, vUv + st * 3.) + texture2D(tDiffuse, vUv - st * 3.)) * 0.0541;
      c += (texture2D(tDiffuse, vUv + st * 4.) + texture2D(tDiffuse, vUv - st * 4.)) * 0.0162;
      gl_FragColor = c; }`,
});
const tiltH = new ShaderPass(tiltShader([1, 0])), tiltV = new ShaderPass(tiltShader([0, 1]));
composer.addPass(tiltH); composer.addPass(tiltV);
composer.addPass(new OutputPass());
const grade = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv); float l = dot(c.rgb, vec3(.3,.59,.11));
      c.rgb = mix(vec3(l), c.rgb, 1.12);
      c.rgb = c.rgb * vec3(1.04, 1.0, .93) + vec3(.012, .006, 0.);               // calor de pôr do sol
      c.rgb += vec3(.05,.03,.0) * smoothstep(.55, 1., l);
      vec2 d = vUv - vec2(.5, .48); c.rgb *= 1. - smoothstep(.25, .95, length(d * vec2(1.1, 1.25))) * .72; // vinheta forte
      gl_FragColor = c; }`,
});
composer.addPass(grade);

// ---------------- luz ----------------
const hemi = new THREE.HemisphereLight(0xffe3c0, 0x5a4a5a, 0.85); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffc98a, 2.3);
sun.position.set(-8, 14, 9); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -16, right: 16, top: 12, bottom: -12, near: 1, far: 50 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.02; sun.shadow.radius = 3;
scene.add(sun, sun.target);

// ---------------- utilidades de cenário ----------------
let area = null;   // grupo da área atual
const uvBox = (g, w, h, d, k = 0.5) => { const uv = g.attributes.uv, dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]]; for (let f = 0; f < 6; f++) for (let v = 0; v < 4; v++) { const i = f * 4 + v; uv.setXY(i, uv.getX(i) * dims[f][0] * k, uv.getY(i) * dims[f][1] * k); } return g; };
const mats = new Map();
const mat = (tex, opts = {}) => { const k = tex.uuid + JSON.stringify(opts); if (!mats.has(k)) mats.set(k, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95, ...opts })); return mats.get(k); };
function box(tex, x, z, w, h, d, y = 0, { solid = true, k = 0.5, opts } = {}) {
  const m = new THREE.Mesh(uvBox(new THREE.BoxGeometry(w, h, d), w, h, d, k), mat(tex, opts));
  m.position.set(x, y + h / 2, z); m.castShadow = true; m.receiveShadow = true; area.add(m);
  if (solid && y < 1) area.userData.colliders.push([x - w / 2, x + w / 2, z - d / 2, z + d / 2]);
  return m;
}
function plane(tex, x, z, w, d, y = 0, k = 0.5, opts = {}) {
  const g = new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2); const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * w * k, uv.getY(i) * d * k);
  const m = new THREE.Mesh(g, mat(tex, { alphaTest: 0.5, ...opts })); m.position.set(x, y, z); m.receiveShadow = true; area.add(m); return m;
}
function cyl(tex, x, z, r, h, y = 0, solid = true) {
  const g = new THREE.CylinderGeometry(r, r, h, 10); const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 2 * Math.PI * r * 0.5, uv.getY(i) * h * 0.5);
  const m = new THREE.Mesh(g, mat(tex)); m.position.set(x, y + h / 2, z); m.castShadow = true; m.receiveShadow = true; area.add(m);
  if (solid && y < 1) area.userData.colliders.push([x - r, x + r, z - r, z + r]);
  return m;
}
// billboard de pixel (encara a câmera, que tem giro fixo)
function billboard(canvas, x, z, { y = 0, scale = 1, solid = 0, cast = true, lit = 0.35 } = {}) {
  const tex = nearestTex(canvas); tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
  const w = canvas.width * SPX * scale, h = canvas.height * SPX * scale;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h).translate(0, h / 2, 0), new THREE.MeshStandardMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 1, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: lit }));
  m.position.set(x, y, z); m.castShadow = cast; area.add(m);
  if (solid) area.userData.colliders.push([x - solid, x + solid, z - solid * 0.6, z + solid * 0.6]);
  blob(x, z, w * 0.42);
  return m;
}
const blobTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 32; const x = c.getContext('2d'), g = x.createRadialGradient(16, 16, 0, 16, 16, 16); g.addColorStop(0, 'rgba(20,10,10,.55)'); g.addColorStop(1, 'rgba(20,10,10,0)'); x.fillStyle = g; x.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(c); })();
function blob(x, z, r, parent = area) { const m = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 1.2).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false })); m.position.set(x, 0.02, z); parent.add(m); return m; }
// lamparina / tocha: chama de pixel animada + luz pontual tremulando
const flameCv = flameCanvas();
function lamp(x, y, z, power = 9, dist = 7) {
  const tex = nearestTex(flameCv); tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.repeat.set(0.5, 1);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(8 * SPX * 1.4, 12 * SPX * 1.4), new THREE.MeshBasicMaterial({ map: tex, transparent: true, color: 0xffffff }));
  m.position.set(x, y, z); area.add(m);
  const l = new THREE.PointLight(0xff9a4a, power, dist, 1.6); l.position.set(x, y + 0.2, z); area.add(l);
  area.userData.lamps.push({ m, l, tex, base: power, ph: rnd() * 10 });
}

// ---------------- personagens ----------------
const PAL = {
  disciple: { skin: 0xc58a5e, hair: 0x2a1a10, tunic: 0xe8dcc0, mantle: 0x8a5a33, sash: 0x9a6a3a, beard: true, longHair: true },
  cleopas: { skin: 0xb8805a, hair: 0x3a2618, tunic: 0xd8ccb0, mantle: 0x5a6a8a, sash: 0x6a4a2a, beard: true },
  stranger: { skin: 0xb07a52, hair: 0x2a1a10, tunic: 0xece4d2, mantle: 0xc9bfa8, sash: 0x8a7a5a, hood: true, beard: true },
  marta: { skin: 0xc8916a, hair: 0x2a1a10, tunic: 0xc8b48c, mantle: 0x8a7a68, sash: 0x7a4a2a, veil: 0x4a6a8e, long: true },
  cambista: { skin: 0xb88358, hair: 0x1e140c, tunic: 0xd8b060, mantle: 0x4e6a3a, sash: 0x8a2a1e, beard: true, cap: 0x6a2a1e },
};
const sheets = {};
function makeActor(key, x, z) {
  sheets[key] ??= charSheet(PAL[key]);
  const tex = nearestTex(sheets[key]); tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
  tex.repeat.set(1 / 3, 1 / 4);
  const w = FW * SPX, h = FH * SPX;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h).translate(0, h / 2 - 0.02, 0), new THREE.MeshStandardMaterial({ map: tex, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 1, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.32 }));
  m.castShadow = true; m.position.set(x, 0, z);
  const g = new THREE.Group(); g.add(m); g.position.set(x, 0, z); m.position.set(0, 0, 0);
  const sh = blob(0, 0, 0.42, g); sh.position.set(0, 0.02, 0);
  const a = { g, m, tex, dir: 0, frame: 0, t: 0, moving: false, setFrame() { tex.offset.set(this.frame / 3, 1 - (this.dir + 1) / 4); } };
  a.setFrame();
  return a;
}
function animate(a, dt, vx, vz) {
  a.moving = Math.hypot(vx, vz) > 0.01;
  if (a.moving) a.dir = Math.abs(vx) > Math.abs(vz) * 0.9 ? (vx < 0 ? 1 : 2) : (vz > 0 ? 0 : 3);
  a.t += dt;
  const seq = [1, 0, 2, 0];
  a.frame = a.moving ? seq[Math.floor(a.t * 7) % 4] : 0;
  a.setFrame();
}

// ---------------- áreas ----------------
const markerCv = markerCanvas(), arrowCv = arrowCanvas();
const AREAS = {
  betania: {
    name: 'Betânia', sub: 'Primeiro dia da semana', cam: { h: 9.5, d: 18, look: [0, 0.6, -1.6] }, bounds: [-12, 12, -5.2, 4.2],
    exits: { east: { to: 'mirante', at: [-10.8, 1] } },
    build() {
      plane(T.grass, 0, 0, 32, 20, 0); plane(T.dirtPath, 0, 1, 32, 2.6, 0.012, 0.5);
      plane(T.dirtPath, -4.5, -1.2, 2.4, 3.5, 0.013).rotation.y = 0;
      // casa: paredes de reboco, terraço, porta escura com lamparina
      const hx = -5, hz = -3.2;
      box(T.plaster, hx, hz, 6.4, 3.2, 3.6);
      box(T.roof, hx, hz, 6.9, 0.25, 4.1, 3.2, { solid: false });
      for (const [px, pz, w, d] of [[hx, hz - 2, 6.9, 0.2], [hx - 3.35, hz, 0.2, 4.1], [hx + 3.35, hz, 0.2, 4.1]]) box(T.plaster, px, pz, w, 0.5, d, 3.45, { solid: false });
      box(T.dark, hx + 0.6, hz + 1.81, 1.1, 2.0, 0.05, 0, { solid: false, opts: { roughness: 1 } });
      box(T.wood, hx + 0.6, hz + 1.86, 1.5, 0.2, 0.12, 2.0, { solid: false });
      box(T.dark, hx - 1.9, hz + 1.81, 0.6, 0.6, 0.05, 1.6, { solid: false });
      lamp(hx + 1.55, 1.85, hz + 1.95, 7, 6);
      // pérgola de madeira com parreira
      for (const [a, b] of [[-9.8, -3.6], [-9.8, -1.6], [-8.4, -3.6], [-8.4, -1.6]]) box(T.wood, a, b, 0.18, 2.4, 0.18, 0, { solid: false });
      box(T.wood, -9.1, -2.6, 1.8, 0.12, 2.4, 2.4, { solid: false });
      // poço e jarros
      cyl(T.stone, 3.2, -3.2, 0.75, 0.9); box(T.wood, 3.2, -3.2, 1.9, 0.12, 0.12, 1.9, { solid: false });
      box(T.wood, 2.35, -3.2, 0.12, 1.9, 0.12, 0, { solid: false }); box(T.wood, 4.05, -3.2, 0.12, 1.9, 0.12, 0, { solid: false });
      for (let i = 0; i < 3; i++) cyl(T.roof, -1.4 + i * 0.5, -1.4, 0.2, 0.55, 0, false);
      // cerca baixa de pedra
      for (let i = 0; i < 9; i++) box(T.stone, 1 + i * 1.2, 3.6, 1.15, 0.55, 0.45, 0, { solid: false, k: 1 });
      // oliveiras e ciprestes
      const olive = (s) => treeCanvas('olive', s);
      billboard(olive(1), 7.8, -3.5, { solid: 0.5, scale: 1.3 }); billboard(olive(2), 10.5, -1.2, { solid: 0.5, scale: 1.1 });
      billboard(olive(3), -11, 3, { solid: 0.5 }); billboard(treeCanvas('cypress', 4), 0.6, -4.4, { solid: 0.3, scale: 1.2 });
      billboard(treeCanvas('cypress', 5), -1.2, -4.6, { solid: 0.3, scale: 1.05 });
      // fundo: colinas pintadas em camadas
      backdrop('day', -16);
      npc('marta', 'Marta', -2.4, 0.2, 0, [
        'Você acordou. Cléopas já está lá fora, impaciente para ir a Emaús.',
        'Antes de ir... suba ao mirante, no alto do monte. De lá se vê a cidade inteira.',
      ]);
    },
  },
  mirante: {
    name: 'Monte das Oliveiras', sub: 'O mirante', cam: { h: 6.2, d: 17, look: [0, 1.6, -7] }, bounds: [-12, 12, -1.4, 4.2],
    exits: { west: { to: 'betania', at: [10.8, 1] }, east: { to: 'mercado', at: [-10.8, 1.5] } },
    build() {
      plane(T.paving, 0, 1.5, 32, 7, 0); plane(T.grass, 0, 7, 32, 6, -0.01);
      for (let i = -15; i <= 15; i += 1.6) box(T.stone, i, -2, 1.55, 0.95, 0.5, 0, { k: 1 });
      box(T.stone, 0, -1.5, 3, 0.45, 0.6, 0, { solid: false }); // banco
      lamp(-6, 1.25, -1.9, 6, 5); lamp(6, 1.25, -1.9, 6, 5);
      billboard(treeCanvas('olive', 7), -10, 3.2, { solid: 0.5, scale: 1.25 }); billboard(treeCanvas('olive', 8), 9.8, 3.4, { solid: 0.5, scale: 1.15 });
      billboard(treeCanvas('cypress', 9), -8, -0.4, { solid: 0.3, scale: 1.3 });
      // vale e Jerusalém em miniatura ao fundo (fica no topo da tela = desfocado pelo tilt-shift)
      const valley = plane(T.grass, 0, -45, 160, 80, -14, 0.25); valley.material = mat(T.grass, { color: 0xb8b090 });
      const city = new THREE.Group(); area.add(city); const cz = -62, cy = -9;
      const add = (tex, x, z, w, h, d, y = 0, col) => { const m = new THREE.Mesh(uvBox(new THREE.BoxGeometry(w, h, d), w, h, d, 0.25), mat(tex, col ? { color: col } : {})); m.position.set(x, cy + y + h / 2, cz + z); m.castShadow = false; m.receiveShadow = true; city.add(m); return m; };
      add(T.stone, 0, 0, 30, 6, 20, -5);                       // plataforma
      add(T.marble, 0, -3, 10, 3, 8, 1);                      // pátios
      add(T.marble, -1, -4, 5, 9, 5, 1);                      // santuário
      add(T.gold, -1, -1.4, 5.4, 1.2, 0.4, 9.2);              // friso dourado
      add(T.gold, -1, -1.6, 2, 5, 0.3, 2);                    // portas de ouro
      for (let i = 0; i < 26; i++) add(T.plaster, -40 + rnd() * 26 - (i % 2 ? 0 : 6), 4 + rnd() * 18, 2 + rnd() * 3, 1.5 + rnd() * 2.5, 2 + rnd() * 3, -6 + rnd() * 3);
      for (let i = -3; i <= 3; i++) add(T.stone, -26 + i * 7, -14, 6.6, 6, 1.4, -7);
      for (const tx of [-44, -36, -28]) add(T.stone, tx, 6, 3, 9, 3, -6);
      area.userData.goldLight = new THREE.PointLight(0xffd27a, 40, 40, 1.4); area.userData.goldLight.position.set(-1, cy + 12, cz + 4); area.add(area.userData.goldLight);
      backdrop('dusk', -120, 200, 50, -20);
      area.userData.fog = new THREE.Fog(0xe8c7a0, 30, 130);
      thing('jerusalem', 'Jerusalém', 0, -1.3, [
        'Lá está ela. O Templo brilha como ouro ao sol da tarde.',
        'Daqui você vê tudo: o pátio do Templo, a fortaleza, o jardim e a colina fora da muralha...',
      ]);
    },
  },
  mercado: {
    name: 'Pátio do Templo', sub: 'Pórtico dos cambistas', cam: { h: 9, d: 18, look: [0, 1.0, -1.8] }, bounds: [-12, 12, -3.8, 4.2],
    exits: { west: { to: 'mirante', at: [10.8, 1.2] } },
    build() {
      plane(T.paving, 0, 0, 32, 20, 0, 0.5);
      // muro de pedras herodianas e colunata com capitéis dourados
      box(T.stone, 0, -6.2, 32, 7, 1, 0, { k: 0.5 });
      for (let i = -14; i <= 14; i += 2.6) { cyl(T.marble, i, -4.6, 0.32, 4.2); box(T.gold, i, -4.6, 0.95, 0.35, 0.95, 4.2, { solid: false }); box(T.marble, i, -4.6, 0.9, 0.3, 0.9, 0, { solid: false }); }
      box(T.roof, 0, -4.9, 32, 0.4, 2.2, 4.55, { solid: false });
      for (let i = -14; i <= 14; i += 5.2) lamp(i + 1.3, 2.8, -4.25, 8, 6);
      // barracas com toldos
      for (const [sx, sz] of [[-8, -1.6], [6.5, -1.8]]) {
        box(T.wood, sx, sz, 2.2, 0.9, 1, 0);
        for (const [a, b] of [[-1, -0.5], [1, -0.5], [-1, 0.5], [1, 0.5]]) box(T.wood, sx + a, sz + b, 0.1, 2.3, 0.1, 0, { solid: false });
        const aw = plane(T.awning, sx, sz, 2.6, 1.6, 2.3, 0.5, { side: THREE.DoubleSide }); aw.rotation.x = 0.25;
        for (let i = 0; i < 4; i++) cyl(T.roof, sx - 0.7 + i * 0.45, sz, 0.14, 0.3, 0.9, false);
      }
      // mesas viradas e moedas
      const t1 = box(T.wood, -1.2, -0.4, 1.8, 0.1, 0.9, 0.45, { solid: false }); t1.rotation.z = 1.35; t1.position.y = 0.5;
      const t2 = box(T.wood, 1.4, 0.6, 1.8, 0.1, 0.9, 0.05, { solid: false }); t2.rotation.y = 0.6;
      for (let i = 0; i < 22; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.015, 8), mat(T.gold, { emissive: 0x5a3a08, emissiveIntensity: 0.6 })); c.position.set(-1.5 + rnd() * 3.4, 0.01, -1 + rnd() * 2.6); area.add(c); }
      area.userData.colliders.push([-2.2, 2.4, -1.2, 1.2]);
      npc('cambista', 'Cambista', 3.6, -0.6, 1, [
        'Não pise nas moedas! ...Ah, tanto faz. Ninguém arrumou nada desde segunda-feira.',
        'Ele entrou com um chicote de cordas e virou tudo. "A casa de meu Pai é casa de oração!"',
      ]);
    },
  },
};
function backdrop(kind, z, w = 70, h = 18, y = -1) {
  const tex = nearestTex(backdropCanvas(kind)); tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, fog: false }));
  m.position.set(0, y + h / 2, z); area.add(m);
}

// ---------------- interativos ----------------
const interact = [];
function addMarker(target, y) {
  const tex = nearestTex(markerCv); tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
  const s = new THREE.Mesh(new THREE.PlaneGeometry(13 * SPX * 1.3, 13 * SPX * 1.3), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false }));
  s.renderOrder = 10; area.add(s); target.marker = s; target.markerY = y;
}
function npc(key, name, x, z, dir, lines) {
  const a = makeActor(key, x, z); a.dir = dir; a.setFrame(); area.add(a.g);
  area.userData.colliders.push([x - 0.35, x + 0.35, z - 0.25, z + 0.25]);
  const it = { name, lines, x, z, actor: a, mesh: a.m }; addMarker(it, FH * SPX + 0.35); interact.push(it);
}
function thing(id, name, x, z, lines) { const it = { name, lines, x, z, thing: true }; addMarker(it, 1.2); interact.push(it); }

// ---------------- jogador, Cléopas e o estranho (seguem atrás) ----------------
const player = makeActor('disciple', 0, 1);
const followers = [makeActor('cleopas', -1, 1.5), makeActor('stranger', -2, 1.5)];
scene.add(player.g); for (const f of followers) scene.add(f.g);
followers[1].m.material = followers[1].m.material.clone(); followers[1].m.material.transparent = true; followers[1].m.material.opacity = 0.92;
const trail = [];

let current = null, fading = false;
function loadArea(id, at) {
  if (area) { scene.remove(area); }
  interact.length = 0;
  area = new THREE.Group(); area.userData = { colliders: [], lamps: [] }; scene.add(area);
  srand(id.length * 131);
  const A = AREAS[id]; A.build(); current = A;
  scene.fog = area.userData.fog || new THREE.Fog(0xd9c2a0, 40, 120);
  scene.background = new THREE.Color(0x1a1418);
  // setas pulsando nas saídas
  for (const side of Object.keys(A.exits)) {
    const tex = nearestTex(arrowCv); tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.75).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
    const x = side === 'east' ? A.bounds[1] - 0.8 : A.bounds[0] + 0.8; m.position.set(x, 0.04, 1.2); if (side === 'west') m.rotation.y = Math.PI; m.rotation.z = 0;
    area.add(m); area.userData.arrow = area.userData.arrow || []; area.userData.arrow.push(m);
  }
  player.g.position.set(at[0], 0, at[1]); trail.length = 0;
  followers.forEach((f, i) => { const back = at[0] > 0 ? 1 : -1; f.g.position.set(at[0] + back * (1.1 + i * 1.1), 0, at[1] + 0.3 + i * 0.2); });
  document.querySelector('#bannerName').textContent = A.name;
  document.querySelector('#banner small').textContent = A.sub;
  const b = document.querySelector('#banner'); b.classList.add('on'); setTimeout(() => b.classList.remove('on'), 2600);
}
function go(id, at) {
  if (fading) return; fading = true; const f = document.querySelector('#fade'); f.style.opacity = 1;
  setTimeout(() => { loadArea(id, at); f.style.opacity = 0; setTimeout(() => { fading = false; }, 500); }, 560);
}

// ---------------- poeira dourada ----------------
const DUST = 160, dustPos = new Float32Array(DUST * 3);
for (let i = 0; i < DUST; i++) dustPos.set([(rnd() - 0.5) * 26, rnd() * 5, (rnd() - 0.5) * 12], i * 3);
const dustG = new THREE.BufferGeometry(); dustG.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dust = new THREE.Points(dustG, new THREE.PointsMaterial({ size: 0.07, color: 0xffe2a8, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }));
scene.add(dust);

// ---------------- entrada ----------------
const keys = new Set(); let tapTarget = null, actQ = false;
addEventListener('keydown', (e) => { keys.add(e.code); if (['KeyE', 'Enter', 'Space'].includes(e.code)) { actQ = true; e.preventDefault(); } });
addEventListener('keyup', (e) => keys.delete(e.code));
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3();
renderer.domElement.addEventListener('pointerdown', (e) => {
  if (dlg) { advance(); return; }
  ndc.set(e.clientX / innerWidth * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  // tocou num interativo? anda até ele e fala
  let best = null, bd = Infinity;
  for (const it of interact) { const p = new THREE.Vector3(it.x, 1, it.z).project(camera); const d = Math.hypot(p.x - ndc.x, (p.y - ndc.y) * 0.8); if (d < 0.12 && d < bd) { bd = d; best = it; } }
  if (best) { tapTarget = { x: best.x, z: best.z + 0.9, talk: best }; return; }
  if (ray.ray.intersectPlane(ground, hit)) tapTarget = { x: hit.x, z: hit.z };
});
document.querySelector('#talk').addEventListener('pointerdown', (e) => { e.stopPropagation(); advance(); });

// ---------------- diálogo ----------------
let dlg = null;
const ui = { talk: document.querySelector('#talk'), name: document.querySelector('#talkName'), text: document.querySelector('#talkText') };
function openDialog(it) { dlg = { it, i: 0, shown: 0 }; ui.talk.hidden = false; ui.name.textContent = it.thing ? it.name : it.name; if (it.actor) { const dx = player.g.position.x - it.x, dz = player.g.position.z - it.z; it.actor.dir = Math.abs(dx) > Math.abs(dz) ? (dx < 0 ? 1 : 2) : (dz > 0 ? 0 : 3); it.actor.setFrame(); } it.done = true; }
function advance() { if (!dlg) return; const L = dlg.it.lines[dlg.i]; if (dlg.shown < L.length) { dlg.shown = L.length; return; } dlg.i++; dlg.shown = 0; if (dlg.i >= dlg.it.lines.length) { dlg = null; ui.talk.hidden = true; } }

// ---------------- laço ----------------
const clock = new THREE.Clock(), v = new THREE.Vector3(), camPos = new THREE.Vector3(), camLook = new THREE.Vector3();
function collide(x, z, r = 0.3) {
  for (const [x0, x1, z0, z1] of area.userData.colliders) {
    if (x > x0 - r && x < x1 + r && z > z0 - r && z < z1 + r) {
      const dl = x - (x0 - r), dr = (x1 + r) - x, db = z - (z0 - r), df = (z1 + r) - z, m = Math.min(dl, dr, db, df);
      if (m === dl) x = x0 - r; else if (m === dr) x = x1 + r; else if (m === db) z = z0 - r; else z = z1 + r;
    }
  }
  return [x, z];
}
function step(dt) {
  const t = clock.elapsedTime, A = current, p = player.g.position;
  let ix = 0, iz = 0;
  if (!dlg && !fading) {
    if (keys.has('KeyA') || keys.has('ArrowLeft')) ix -= 1; if (keys.has('KeyD') || keys.has('ArrowRight')) ix += 1;
    if (keys.has('KeyW') || keys.has('ArrowUp')) iz -= 1; if (keys.has('KeyS') || keys.has('ArrowDown')) iz += 1;
    if (ix || iz) tapTarget = null;
    if (tapTarget) { const dx = tapTarget.x - p.x, dz = tapTarget.z - p.z, d = Math.hypot(dx, dz); if (d < 0.12) { if (tapTarget.talk) openDialog(tapTarget.talk); tapTarget = null; } else { ix = dx / d; iz = dz / d; } }
  }
  const L = Math.hypot(ix, iz) || 1, sp = 3.4;
  let nx = p.x + ix / L * sp * dt, nz = p.z + iz / L * sp * dt;
  [nx, nz] = collide(nx, nz);
  const [bx0, bx1, bz0, bz1] = A.bounds;
  if (nx > bx1 && A.exits.east) go(A.exits.east.to, A.exits.east.at); else if (nx < bx0 && A.exits.west) go(A.exits.west.to, A.exits.west.at);
  nx = Math.max(bx0, Math.min(bx1, nx)); nz = Math.max(bz0, Math.min(bz1, nz));
  const vx = nx - p.x, vz = nz - p.z; p.x = nx; p.z = nz;
  animate(player, dt, vx, vz);
  // seguidores andam no rastro do jogador
  if (Math.hypot(vx, vz) > 0.001) { trail.unshift([p.x, p.z]); if (trail.length > 200) trail.pop(); }
  followers.forEach((f, i) => { const k = Math.min(trail.length - 1, 22 + i * 22); if (k < 0) { animate(f, dt, 0, 0); return; }
    const [tx, tz] = trail[k], fx = tx - f.g.position.x, fz = tz - f.g.position.z, d = Math.hypot(fx, fz);
    const mv = d > 0.05 ? Math.min(d, sp * 1.05 * dt) : 0; f.g.position.x += fx / (d || 1) * mv; f.g.position.z += fz / (d || 1) * mv; animate(f, dt, fx * (mv > 0), fz * (mv > 0)); });
  followers[1].m.material.opacity = 0.86 + Math.sin(t * 2) * 0.06;
  // E para falar com o que estiver perto
  if (actQ) { actQ = false; if (dlg) advance(); else { let best = null, bd = 1.9; for (const it of interact) { const d = Math.hypot(it.x - p.x, it.z - p.z); if (d < bd) { bd = d; best = it; } } if (best) openDialog(best); } }
  if (dlg) { const Ln = dlg.it.lines[dlg.i]; dlg.shown = Math.min(Ln.length, dlg.shown + dt * 48); ui.text.textContent = Ln.slice(0, Math.floor(dlg.shown)); ui.talk.classList.toggle('ready', dlg.shown >= Ln.length); }
  // marcadores: flutuam, mais nítidos de perto
  for (const it of interact) { const d = Math.hypot(it.x - p.x, it.z - p.z); it.marker.position.set(it.x, it.markerY + Math.sin(t * 3 + it.x) * 0.06, it.z); it.marker.material.opacity = it.done ? 0.25 : Math.min(1, 0.3 + 2.4 / Math.max(1, d)); it.marker.visible = !dlg; }
  // lamparinas tremulando
  for (const L2 of area.userData.lamps) { L2.l.intensity = L2.base * (0.85 + Math.sin(t * 13 + L2.ph) * 0.07 + Math.sin(t * 29 + L2.ph * 2) * 0.06); L2.tex.offset.x = Math.floor(t * 8 + L2.ph) % 2 * 0.5; }
  for (const ar of area.userData.arrow || []) ar.material.opacity = 0.45 + Math.sin(t * 4) * 0.35;
  // câmera fixa de lado e de cima, acompanhando em x (com limites) e pouco em z
  const C = A.cam, cx = Math.max(A.bounds[0] + 6.5, Math.min(A.bounds[1] - 6.5, p.x));
  camPos.set(cx, C.h, p.z * 0.35 + C.d); camLook.set(cx + C.look[0], C.look[1], p.z * 0.35 + C.look[2]);
  camera.position.lerp(camPos, 1 - Math.exp(-5 * dt)); if (!step.init) { camera.position.copy(camPos); step.init = true; }
  camera.lookAt(camLook.x, camLook.y, camLook.z);
  // foco do tilt-shift na altura do jogador na tela
  v.set(p.x, 0.9, p.z).project(camera); const fy = v.y * 0.5 + 0.5;
  tiltH.uniforms.uFocus.value = tiltV.uniforms.uFocus.value = fy;
  // poeira derivando em volta da câmera
  for (let i = 0; i < DUST; i++) { dustPos[i * 3] += Math.sin(t * 0.4 + i) * dt * 0.15; dustPos[i * 3 + 1] += (Math.sin(t * 0.3 + i * 2) * 0.5 + 0.2) * dt * 0.2; if (dustPos[i * 3 + 1] > 5) dustPos[i * 3 + 1] = 0; }
  dust.position.set(cx, 0, p.z * 0.35); dustG.attributes.position.needsUpdate = true;
  sun.position.set(p.x - 8, 14, p.z + 9); sun.target.position.set(p.x, 0, p.z);
  grade.uniforms.uTime.value = t;
}
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.fov = camera.aspect < 1 ? 44 : 26; camera.updateProjectionMatrix(); for (const p of [tiltH, tiltV]) p.uniforms.uRes.value.set(innerWidth, innerHeight); });
camera.fov = camera.aspect < 1 ? 44 : 26; camera.updateProjectionMatrix();

loadArea(qs.get('area') || 'betania', qs.get('area') === 'mirante' ? [-6, 1] : qs.get('area') === 'mercado' ? [-6, 1.6] : [2.5, 1.4]);
document.querySelector('#fade').style.opacity = 0;
if (!isTouch) document.querySelector('#hint').textContent = 'WASD / setas ou clique no chão para andar · E para falar · ande até a borda para mudar de área';
setTimeout(() => { document.querySelector('#hint').style.opacity = 0; document.querySelector('#hint').style.transition = 'opacity 1s'; }, 7000);
function frame() { const dt = Math.min(clock.getDelta(), 0.05); step(dt); composer.render(); requestAnimationFrame(frame); }
window.__mock = { step: (n = 1) => { for (let i = 0; i < n; i++) step(1 / 30); composer.render(); }, go: (id, at) => loadArea(id, at), player, keys, openDialog, interact };
if (!qs.has('shot')) frame();
