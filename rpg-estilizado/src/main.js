import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { makeInput } from './input.js';
import { buildHero } from './character.js';
import { Solids, STEP } from './engine/solids.js';
import { loadMaterials } from './world/materials.js';
import { Kit } from './world/kit.js';
import { heightAt, makeTerrain, makeHorizon, makeStream } from './world/terrain.js';
import { buildTemple } from './world/temple.js';
import { buildCity } from './world/city.js';
import { buildSites } from './world/sites.js';
import { makeFlora, floraTime } from './world/flora.js';
import { makeAnimals, makeEffects } from './world/life.js';
import { PLACES } from './world/layout.js';

const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');
const qs = new URLSearchParams(location.search);
const lowQuality = isTouch || qs.has('low');
// Build para compartilhar: modelos 3D e céu vêm embutidos em módulos JS (só imagens ficam como arquivos)
const EMBED = import.meta.env.VITE_EMBED === '1';
const embedded = import.meta.glob('./embedded/*.js');
async function embeddedBuffer(name) {
  const s = (await embedded[`./embedded/${name}.js`]()).default, n = s.length;
  const bin = atob(s), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}
const msg = document.querySelector('#msg');
const status = (t) => { if (msg) msg.textContent = t; };
const nextFrame = () => new Promise((r) => setTimeout(r, 0));

// ---------- renderer / cena ----------
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, lowQuality ? 1.35 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.92;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const FOG = new THREE.Color(0xe6cbbf);
scene.fog = new THREE.FogExp2(FOG, 0.0016);
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 3200);

// ---------- carregamento ----------
const bar = document.querySelector('#bar i');
const manager = new THREE.LoadingManager();
manager.onProgress = (_, l, t) => { bar.style.width = `${(l / t) * 80}%`; };
const gltfLoader = new GLTFLoader(manager).setMeshoptDecoder(MeshoptDecoder);
const texLoader = new THREE.TextureLoader(manager);
let loaded = 0;
const tick = (x) => { loaded++; bar.style.width = `${Math.min(80, loaded * 8)}%`; return x; };
const load = async (n) => tick(EMBED ? await gltfLoader.parseAsync(await embeddedBuffer(n), '') : await gltfLoader.loadAsync(`assets/models/${n}.glb`));
async function loadSky() {
  if (!EMBED) return new RGBELoader(manager).loadAsync('assets/sky/sunset.hdr');
  const d = new RGBELoader().parse(await embeddedBuffer('sunset'));
  const t = new THREE.DataTexture(d.data, d.width, d.height, THREE.RGBAFormat, d.type);
  t.colorSpace = THREE.LinearSRGBColorSpace; t.minFilter = t.magFilter = THREE.LinearFilter; t.generateMipmaps = false; t.flipY = true; t.needsUpdate = true;
  return tick(t);
}
status('carregando modelos e texturas…');
const [natureGltf, baseGltf, hairGltf, beardGltf, animGltf, donkeyGltf, sheepGltf, hdr, mats] = await Promise.all([
  load('nature'), load('hero_base'), load('hair_long'), load('hair_beard'), load('animations'), load('donkey'), load('sheep'),
  loadSky(),
  loadMaterials(texLoader, { anisotropy: lowQuality ? 4 : 8 }),
]);
const { M, ground } = mats;

// ---------- luz da manhã: o sol nasce a leste e doura a fachada do Templo ----------
const SUN_DIR = new THREE.Vector3(0.78, 0.5, 0.4).normalize();
hdr.mapping = THREE.EquirectangularReflectionMapping;
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromEquirectangular(hdr).texture;
scene.environmentIntensity = 0.6;
const sun = new THREE.DirectionalLight(0xffd3a0, 3.6);
sun.castShadow = true;
const SM = lowQuality ? 1536 : 2048;
sun.shadow.mapSize.set(SM, SM);
Object.assign(sun.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 1, far: 400 });
sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.08;
scene.add(sun, sun.target);
scene.add(new THREE.HemisphereLight(0xc6c0ec, 0x8e735a, 0.85));

// céu pintado: gradiente da aurora, sombra da Terra a oeste, nuvens em faixas iluminadas pelo sol
const skyU = { uTime: { value: 0 }, uSun: { value: SUN_DIR.clone() }, uFog: { value: FOG } };
const sky = new THREE.Mesh(new THREE.SphereGeometry(2800, 40, 20), new THREE.ShaderMaterial({
  uniforms: skyU, side: THREE.BackSide, depthWrite: false, fog: false,
  vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `
    uniform vec3 uSun, uFog; uniform float uTime; varying vec3 vD;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*vn(p); p*=2.07; a*=.5; } return s; }
    vec3 lin(vec3 c){ return pow(c, vec3(2.2)); }
    void main(){
      vec3 d = normalize(vD); float h = max(d.y, 0.);
      vec3 s = normalize(uSun); float toward = dot(normalize(d.xz + 1e-4), normalize(s.xz)) * .5 + .5;
      vec3 zen = lin(vec3(.26,.32,.62)), mid = lin(vec3(.62,.58,.80));
      vec3 horSun = lin(vec3(1.0,.72,.45)), horAnti = lin(vec3(.93,.70,.76)), shadowBand = lin(vec3(.62,.62,.78));
      vec3 hor = mix(horAnti, horSun, smoothstep(.25,.95,toward));
      vec3 col = mix(hor, mid, smoothstep(.02,.35,h));
      col = mix(col, zen, smoothstep(.3,.95,h));
      col = mix(col, shadowBand, (1.-toward) * (1. - smoothstep(0.,.06,h)) * .6);
      float sd = max(dot(d, s), 0.);
      col += lin(vec3(1.,.82,.55)) * pow(sd, 6.) * .55 + lin(vec3(1.,.93,.75)) * pow(sd, 60.) * .9;
      col += vec3(1.,.95,.85) * smoothstep(.9993,.9997, sd) * 4.;
      vec2 uv = d.xz / (h + .22); uv *= vec2(.55, 1.6);
      float n = fbm(uv * 1.3 + vec2(uTime * .004, 0.));
      float cl = smoothstep(.52, .70, n) * smoothstep(.01,.12,h) * (1. - smoothstep(.45,.85,h));
      float rim = smoothstep(.5,.95,toward);
      vec3 cloud = mix(lin(vec3(.70,.60,.78)), lin(vec3(1.,.62,.48)), rim * .9);
      cloud = mix(cloud, lin(vec3(1.,.86,.66)), pow(sd, 4.) * .8);
      col = mix(col, cloud, cl * .9);
      float st = step(.9975, h2(floor(d.xz / (d.y + .2) * 180.))) * smoothstep(.45,.9,h) * (1. - toward) * .6;
      col += vec3(st);
      col = mix(uFog, col, smoothstep(-.01, .16, d.y));   // funde com a névoa do horizonte
      gl_FragColor = vec4(col, 1.);
    }`,
}));
sky.frustumCulled = false; sky.renderOrder = -10; scene.add(sky);

// ---------- mundo ----------
status('erguendo Jerusalém…'); await nextFrame();
makeTerrain(scene, ground, { lowQuality });
const horizon = makeHorizon(scene);
const stream = makeStream(scene, M);
const solids = new Solids(heightAt);
const kit = new Kit(M, solids);
const extras = { flames: [], smoke: [], lights: [], pools: [], gardens: [], groves: [], vines: [], pens: [] };
buildTemple(kit, extras);
status('construindo a cidade…'); await nextFrame();
const houses = buildCity(kit, extras);
buildSites(kit, extras);
kit.finish(scene);
status('plantando oliveiras…'); await nextFrame();
const flora = makeFlora(scene, natureGltf, solids, extras, { lowQuality });
const animals = makeAnimals(scene, { sheepGltf, donkeyGltf }, extras, solids);
const effects = makeEffects(scene, extras, M);
M.lit.emissiveIntensity = 2.2;

// ---------- personagem ----------
status('vestindo o peregrino…'); await nextFrame();
const hero = buildHero({ baseGltf, hairGltf, beardGltf });
const player = new THREE.Group(); player.add(hero); scene.add(player);
const mixer = new THREE.AnimationMixer(hero);
const clips = Object.fromEntries(animGltf.animations.map((c) => [c.name, c]));
const actions = {}; const act = (n) => (actions[n] ??= mixer.clipAction(clips[n]));
let current = null;
function play(name, { once = false, fade = 0.2, speed = 1 } = {}) {
  const a = act(name); a.timeScale = speed;
  if (current === a) return a;
  a.reset(); a.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = once; a.enabled = true;
  if (current) current.crossFadeTo(a, fade, false);
  a.play(); current = a; return a;
}
play('Idle_Loop');

// ---------- entrada / câmera ----------
const input = makeInput(renderer.domElement, isTouch);
let yaw = 0, pitch = 0.18, dist = 6.5, heroYaw = 0, vy = 0, grounded = true, landT = 0, kneel = false, speed = 0, visY = 0;
const camTarget = new THREE.Vector3(), camPos = new THREE.Vector3();
function teleport(x, z, lookX, lookZ, y) {
  const gy = y ?? solids.groundAt(x, z, heightAt(x, z) + 30);
  player.position.set(x, gy, z); visY = gy;
  heroYaw = Math.atan2(lookX - x, lookZ - z); hero.rotation.y = heroYaw;
  yaw = heroYaw + Math.PI; vy = 0; grounded = true; kneel = false;
  camTarget.set(x, gy + 1.55, z);
  camera.position.set(x - Math.sin(heroYaw) * dist, gy + 3, z - Math.cos(heroYaw) * dist);
}
const mir = PLACES.find((q) => q.id === 'mirante');
const startAt = () => { teleport(mir.spawn[0], mir.spawn[1], 30, -7); pitch = 0.26; dist = 8.5; };
startAt();
if (qs.has('at')) { const p = PLACES.find((q) => q.id === qs.get('at')); if (p?.spawn) teleport(p.spawn[0], p.spawn[1], ...(p.look || [p.x, p.z])); }

// ---------- pós-processamento ----------
const rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: lowQuality ? 2 : 4 });
const composer = new EffectComposer(renderer, rt);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth / 2, innerHeight / 2), 0.22, 0.55, 0.95));
composer.addPass(new OutputPass());
composer.addPass(new ShaderPass({
  uniforms: { tDiffuse: { value: null } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv); float l = dot(c.rgb, vec3(.299,.587,.114));
      c.rgb = mix(vec3(l), c.rgb, 1.14);
      c.rgb += vec3(.03,.012,-.012) * smoothstep(.45,1.,l);
      c.rgb += vec3(-.01,-.004,.03) * (1. - smoothstep(.0,.42,l));
      vec2 d = vUv - .5; c.rgb *= 1. - dot(d,d) * .7; gl_FragColor = c; }`,
}));
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
});

// ---------- interface: nome do lugar e mapa ----------
const label = document.querySelector('#place');
let placeNow = null, labelT = 0;
const showPlace = (p) => { label.querySelector('b').textContent = p.name; label.classList.add('on'); labelT = 4; };
const menu = document.querySelector('#menu'), list = document.querySelector('#places');
for (const p of PLACES.filter((q) => q.spawn)) {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = p.name;
  b.addEventListener('click', () => {
    teleport(p.spawn[0], p.spawn[1], ...(p.look || [p.x, p.z]));
    menu.hidden = true;
  });
  list.appendChild(b);
}
document.querySelector('#mapBtn').addEventListener('click', () => { menu.hidden = !menu.hidden; });
document.querySelector('#closeMenu').addEventListener('click', () => { menu.hidden = true; });

// ---------- loop ----------
const WALK = 1.7, JOG = 4.2, SPRINT = 7.0, R = 0.36;
const clock = new THREE.Clock();
const mv = new THREE.Vector3(), tmpV = new THREE.Vector3(), dirV = new THREE.Vector3();
function step(dt) {
  const inp = input.poll();
  yaw -= inp.look.x; pitch = THREE.MathUtils.clamp(pitch + inp.look.y, -0.35, 1.25); dist = THREE.MathUtils.clamp(dist + inp.zoom, 2.5, 22);
  if (inp.kneel) kneel = !kneel;
  const mag = Math.min(1, Math.hypot(inp.ix, inp.iy));
  if (mag > 0.1) kneel = false;
  mv.set(0, 0, 0).addScaledVector(tmpV.set(-Math.sin(yaw), 0, -Math.cos(yaw)), inp.iy).addScaledVector(tmpV.set(Math.cos(yaw), 0, -Math.sin(yaw)), inp.ix);
  if (mv.lengthSq() > 1e-4) mv.normalize();
  const target = mag < 0.05 ? 0 : mag < 0.5 ? WALK : inp.run ? SPRINT : JOG;
  speed = THREE.MathUtils.damp(speed, target, 10, dt);
  const p = player.position;
  if (speed > 0.05) {
    let nx = p.x + mv.x * speed * dt, nz = p.z + mv.z * speed * dt;
    const dh = heightAt(nx, nz) - heightAt(p.x, p.z), dd = Math.hypot(nx - p.x, nz - p.z);
    if (dd > 1e-4 && dh / dd > 1.25 && heightAt(nx, nz) > p.y + STEP) { nx = p.x; nz = p.z; }
    [nx, nz] = solids.resolve(nx, nz, p.y, R);
    const rr = Math.hypot(nx - 20, nz); if (rr > 285) { nx = 20 + (nx - 20) * 285 / rr; nz = nz * 285 / rr; }
    p.x = nx; p.z = nz;
    const want = Math.atan2(mv.x, mv.z); let d = want - heroYaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    heroYaw += d * Math.min(1, dt * 12); hero.rotation.y = heroYaw;
  }
  // chão: terreno ou topo de caixa alcançável (degrau); cai se não houver apoio
  const gy = solids.groundAt(p.x, p.z, p.y);
  if (inp.jump && grounded && !kneel) { vy = 6.6; grounded = false; }
  if (grounded && gy < p.y - 0.65) grounded = false;
  if (!grounded) {
    vy -= 20 * dt; p.y += vy * dt;
    if (p.y <= gy && vy <= 0) { p.y = gy; grounded = true; landT = vy < -7 ? 0.35 : 0.15; vy = 0; }
  } else p.y = gy > p.y ? gy : THREE.MathUtils.damp(p.y, gy, 18, dt); // sobe degrau na hora (física)
  visY = THREE.MathUtils.damp(visY, p.y, 22, dt); if (Math.abs(visY - p.y) > 1.2) visY = p.y;
  hero.position.y = visY - p.y;                                           // o corpo suaviza o degrau
  landT -= dt;
  if (kneel) play('Fixing_Kneeling', { fade: 0.4, speed: 0.15 });
  else if (!grounded) play(vy > 1 ? 'Jump_Start' : 'Jump_Loop', { once: vy > 1, fade: 0.12 });
  else if (landT > 0) play('Jump_Land', { once: true, fade: 0.08 });
  else if (speed > 0.15) {
    const n = speed > JOG + 0.8 ? 'Sprint_Loop' : speed > WALK + 0.9 ? 'Jog_Fwd_Loop' : 'Walk_Loop';
    const ref = n === 'Sprint_Loop' ? SPRINT : n === 'Jog_Fwd_Loop' ? JOG : WALK;
    play(n, { speed: THREE.MathUtils.clamp(speed / ref, 0.6, 1.3) });
  } else play('Idle_Loop');
  mixer.update(dt);

  // câmera em órbita; recolhe para não atravessar paredes
  camTarget.lerp(tmpV.set(p.x, p.y + 1.55, p.z), 1 - Math.exp(-12 * dt));
  dirV.set(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
  let free = dist;
  for (let i = 1; i <= 14; i++) {
    const t = (i / 14) * dist;
    if (solids.blocked(camTarget.x + dirV.x * t, camTarget.y + dirV.y * t, camTarget.z + dirV.z * t)) { free = Math.max(0.6, t - 0.5); break; }
  }
  camPos.copy(camTarget).addScaledVector(dirV, free);
  camera.position.lerp(camPos, free < dist ? 1 : 1 - Math.exp(-14 * dt));
  camera.lookAt(camTarget);

  sun.position.copy(p).addScaledVector(SUN_DIR, 180); sun.target.position.copy(p);
  const t = clock.elapsedTime;
  skyU.uTime.value = t; sky.position.copy(camera.position);
  floraTime.value = t;
  horizon.wn.offset.set(t * 0.004, t * 0.003); stream.wn.offset.set(0, -t * 0.25);
  animals(t, dt); effects(t);

  // nome do lugar ao entrar
  let best = null, bd = Infinity;
  for (const pl of PLACES) { const d = Math.hypot(p.x - pl.x, p.z - pl.z); if (d < pl.r && d / pl.r < bd) { bd = d / pl.r; best = pl; } }
  if (best && best !== placeNow) showPlace(best);
  placeNow = best;
  labelT -= dt; if (labelT < 0) label.classList.remove('on');
}
function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  step(dt); composer.render();
  requestAnimationFrame(frame);
}
bar.style.width = '100%';
document.querySelector('#loading').classList.add('done');
window.__game = {
  player, camera, scene, solids, extras, houses, flora, teleport,
  setCam: (y, p, d) => { yaw = y; pitch = p; dist = d; },
  advance: (n = 1, dt = 1 / 30) => { for (let i = 0; i < n; i++) step(dt); composer.render(); },
  view: (px, py, pz, tx, ty, tz) => { camera.position.set(px, py, pz); camera.lookAt(tx, ty, tz); composer.render(); },
  info: () => { renderer.info.autoReset = false; renderer.info.reset(); composer.render(); const r = { houses, flora: flora.drawn, calls: renderer.info.render.calls, tris: renderer.info.render.triangles }; renderer.info.autoReset = true; return r; },
};
if (!qs.has('shot')) frame();
