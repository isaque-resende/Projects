import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { makeWorld } from './world.js';
import { makeInput } from './input.js';

const isTouch = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');
const qs = new URLSearchParams(location.search);
const lowQuality = isTouch || qs.has('low');

// ---------- renderer / cena ----------
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, lowQuality ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const FOG = 0xdcecf6;
scene.fog = new THREE.FogExp2(FOG, 0.0062);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 700);

// ---------- carregamento ----------
const bar = document.querySelector('#bar i');
const manager = new THREE.LoadingManager();
manager.onProgress = (_, l, t) => { bar.style.width = `${(l / t) * 100}%`; };
const gltfLoader = new GLTFLoader(manager).setMeshoptDecoder(MeshoptDecoder);
const texLoader = new THREE.TextureLoader(manager);
const load = (u) => new Promise((res, rej) => gltfLoader.load(u, res, undefined, rej));

// No build para publicação, binários (.glb/.hdr) são servidos com o sufixo extra .wasm (tipo aceito pelo host).
const BIN = import.meta.env.VITE_BIN ?? '';
const prep = (t, srgb = false) => {
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
};
const [natureGltf, heroGltf, animGltf, hdr, gDiff, gNor, dDiff] = await Promise.all([
  load(`assets/models/nature.glb${BIN}`),
  load(`assets/models/hero_${['ranger_m', 'ranger_f', 'peasant_m'].includes(qs.get('hero')) ? qs.get('hero') : 'ranger_m'}.glb${BIN}`),
  load(`assets/models/animations.glb${BIN}`),
  new Promise((res, rej) => new RGBELoader(manager).load(`assets/sky/sky.hdr${BIN}`, res, undefined, rej)),
  texLoader.loadAsync('assets/tex/aerial_grass_rock/diff.jpg'),
  texLoader.loadAsync('assets/tex/aerial_grass_rock/nor_gl.jpg'),
  texLoader.loadAsync('assets/tex/rocky_trail/diff.jpg'),
]);
const grass = { diff: prep(gDiff, true), nor: prep(gNor) };
const dirt = { diff: prep(dDiff, true) };

// ---------- céu e luz ----------
hdr.mapping = THREE.EquirectangularReflectionMapping;
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromEquirectangular(hdr).texture;
scene.environmentIntensity = 0.85;
const skyU = { uTime: { value: 0 }, uSun: { value: new THREE.Vector3(0.55, 0.78, 0.35).normalize() },
  cH: { value: new THREE.Color(0xe3f1f8) }, cM: { value: new THREE.Color(0x86c1ee) }, cT: { value: new THREE.Color(0x2f78d2) } };
const sky = new THREE.Mesh(new THREE.SphereGeometry(450, 32, 16), new THREE.ShaderMaterial({
  uniforms: skyU, side: THREE.BackSide, depthWrite: false, fog: false,
  vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `
    uniform vec3 cH, cM, cT, uSun; uniform float uTime; varying vec3 vD;
    float h2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
      return mix(mix(h2(i),h2(i+vec2(1,0)),f.x), mix(h2(i+vec2(0,1)),h2(i+vec2(1,1)),f.x), f.y); }
    float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*vn(p); p*=2.03; a*=.5; } return s; }
    void main(){
      vec3 d = normalize(vD); float h = max(d.y, 0.);
      vec3 col = mix(cH, cM, smoothstep(.0, .28, h));
      col = mix(col, cT, smoothstep(.22, .95, h));
      // nuvens grandes e macias, sombreadas em dois tons (estilo pintado)
      vec2 uv = d.xz / (h + .32) * .9 + vec2(uTime * .006, uTime * .002);
      float n = fbm(uv * 1.3);
      float c = smoothstep(.5, .64, n) * smoothstep(.015, .22, h);
      float lit = smoothstep(.46, .66, fbm(uv * 1.3 + uSun.xz * .12));
      vec3 cloud = mix(vec3(.72,.82,.96), vec3(1.), lit);
      col = mix(col, cloud, c * .96);
      // brilho do sol
      float sd = max(dot(d, normalize(uSun)), 0.);
      col += vec3(1., .93, .75) * (pow(sd, 900.) * 2.2 + pow(sd, 18.) * .12);
      gl_FragColor = vec4(col, 1.);
    }`,
}));
sky.frustumCulled = false; sky.renderOrder = -10;
scene.add(sky);

const sun = new THREE.DirectionalLight(0xfff0d0, 3.2);
sun.castShadow = true;
const SM = lowQuality ? 1024 : 2048;
sun.shadow.mapSize.set(SM, SM);
Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 220 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.06;
scene.add(sun, sun.target);
scene.add(new THREE.HemisphereLight(0xbfe0ff, 0x6a8a3a, 0.55));
const SUN_DIR = new THREE.Vector3(0.55, 0.78, 0.35).normalize();

// ---------- mundo ----------
const world = makeWorld({ scene, natureGltf, grass, dirt, lowQuality });

// ---------- personagem ----------
const hero = heroGltf.scene;
hero.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });
const player = new THREE.Group();
player.add(hero);
player.position.set(0, world.heightAt(0, 0), 0);
scene.add(player);

const mixer = new THREE.AnimationMixer(hero);
const clips = Object.fromEntries(animGltf.animations.map((c) => [c.name, c]));
const actions = {};
const act = (n) => (actions[n] ??= mixer.clipAction(clips[n]));
let current = null;
function play(name, { once = false, fade = 0.18, speed = 1 } = {}) {
  const a = act(name);
  a.timeScale = speed;
  if (current === a) return a;
  a.reset();
  a.setLoop(once ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
  a.clampWhenFinished = once;
  a.enabled = true;
  if (current) current.crossFadeTo(a, fade, false);
  a.play();
  current = a;
  return a;
}
play('Idle_Loop');

// ---------- entrada / câmera ----------
const input = makeInput(renderer.domElement, isTouch);
let yaw = Math.PI * 0.15, pitch = 0.32, dist = 7.5;
const camTarget = new THREE.Vector3();

// ---------- pós-processamento ----------
const rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: lowQuality ? 2 : 4 });
const composer = new EffectComposer(renderer, rt);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.28, 0.7, 0.88);
composer.addPass(bloom);
composer.addPass(new OutputPass());
composer.addPass(new ShaderPass({
  uniforms: { tDiffuse: { value: null } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  // etalonagem de cor estilo "aquarela de jogo": satura, esquenta as luzes, esfria as sombras, vinheta suave
  fragmentShader: `
    uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(.299,.587,.114));
      c.rgb = mix(vec3(l), c.rgb, 1.22);
      c.rgb = (c.rgb - .5) * 1.05 + .5;
      c.rgb += vec3(.02,.012,-.012) * smoothstep(.5,1.,l);
      c.rgb += vec3(-.02,.0,.04) * (1. - smoothstep(.0,.45,l));
      vec2 d = vUv - .5; c.rgb *= 1. - dot(d,d) * .75;
      gl_FragColor = c;
    }`,
}));

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

// ---------- partículas de pólen ----------
const pollen = (() => {
  const N = 260, R = 22;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - .5) * 2 * R; pos[i * 3 + 1] = Math.random() * 8; pos[i * 3 + 2] = (Math.random() - .5) * 2 * R; }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, '#fff'); gr.addColorStop(0.35, '#fff8'); gr.addColorStop(1, '#fff0');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  const m = new THREE.PointsMaterial({ map: new THREE.CanvasTexture(c), size: 0.22, color: 0xfff1b0, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.8 });
  const p = new THREE.Points(g, m); p.frustumCulled = false; scene.add(p);
  return { p, pos, N, R };
})();

// ---------- loop ----------
const WALK = 1.9, JOG = 4.6, SPRINT = 7.6;
let vy = 0, grounded = true, landT = 0, attackT = 0, heroYaw = 0, speed = 0;
const clock = new THREE.Clock();
const mv = new THREE.Vector3();

function step(dt) {
  const { ix, iy, run, jump, attack, look, zoom } = input.poll();
  yaw -= look.x; pitch = THREE.MathUtils.clamp(pitch + look.y, -0.15, 1.2); dist = THREE.MathUtils.clamp(dist + zoom, 3.5, 16);

  // movimento relativo à câmera
  const mag = Math.min(1, Math.hypot(ix, iy));
  const f = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const r = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
  mv.set(0, 0, 0).addScaledVector(f, iy).addScaledVector(r, ix);
  if (mv.lengthSq() > 1e-4) mv.normalize();

  const canMove = attackT <= 0 || !grounded;
  const target = mag < 0.05 || !canMove ? 0 : mag < 0.5 ? WALK : run ? SPRINT : JOG;
  speed = THREE.MathUtils.damp(speed, target, 12, dt);

  if (speed > 0.05) {
    const nx = player.position.x + mv.x * speed * dt;
    const nz = player.position.z + mv.z * speed * dt;
    const [ox, oz] = world.resolve(player.position.x, player.position.z, nx, nz);
    player.position.x = ox; player.position.z = oz;
    const want = Math.atan2(mv.x, mv.z);
    let d = want - heroYaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    heroYaw += d * Math.min(1, dt * 14);
    hero.rotation.y = heroYaw;
  }

  // pulo / gravidade
  const gy = world.heightAt(player.position.x, player.position.z);
  if (jump && grounded && attackT <= 0) { vy = 7.2; grounded = false; }
  if (!grounded) {
    vy -= 22 * dt; player.position.y += vy * dt;
    if (player.position.y <= gy && vy <= 0) { player.position.y = gy; grounded = true; landT = 0.32; vy = 0; }
  } else {
    player.position.y = THREE.MathUtils.damp(player.position.y, gy, 30, dt);
  }
  if (attack && grounded && attackT <= 0) attackT = 0.7;
  attackT -= dt; landT -= dt;

  // animação
  if (attackT > 0) play('Punch_Cross', { once: true, fade: 0.1, speed: 1.2 });
  else if (!grounded) play(vy > 1 ? 'Jump_Start' : 'Jump_Loop', { once: vy > 1, fade: 0.1 });
  else if (landT > 0) play('Jump_Land', { once: true, fade: 0.08 });
  else if (speed > 0.15) {
    const n = speed > JOG + 0.8 ? 'Sprint_Loop' : speed > WALK + 0.9 ? 'Jog_Fwd_Loop' : 'Walk_Loop';
    const ref = n === 'Sprint_Loop' ? SPRINT : n === 'Jog_Fwd_Loop' ? JOG : WALK;
    play(n, { speed: THREE.MathUtils.clamp(speed / ref, 0.6, 1.3) });
  } else play('Idle_Loop');
  mixer.update(dt);

  // câmera
  camTarget.lerp(new THREE.Vector3(player.position.x, player.position.y + 1.5, player.position.z), 1 - Math.exp(-10 * dt));
  const cp = new THREE.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)).multiplyScalar(dist).add(camTarget);
  cp.y = Math.max(cp.y, world.heightAt(cp.x, cp.z) + 0.6);
  camera.position.copy(cp);
  camera.lookAt(camTarget);

  // sol segue o jogador (sombra nítida perto, sem custo longe)
  sun.position.copy(player.position).addScaledVector(SUN_DIR, 90);
  sun.target.position.copy(player.position);

  world.update(dt, clock.elapsedTime, player.position);
  skyU.uTime.value = clock.elapsedTime; sky.position.copy(camera.position);

  // pólen
  const p = pollen.pos, t = clock.elapsedTime;
  for (let i = 0; i < pollen.N; i++) {
    p[i * 3] += Math.sin(t * .6 + i) * dt * .25; p[i * 3 + 1] += Math.sin(t * .4 + i * 1.7) * dt * .2; p[i * 3 + 2] += Math.cos(t * .5 + i) * dt * .25;
    for (const k of [0, 2]) { const c = [player.position.x, 0, player.position.z][k]; const R2 = pollen.R * 2; p[i * 3 + k] = ((p[i * 3 + k] - c + pollen.R) % R2 + R2) % R2 - pollen.R + c; }
    p[i * 3 + 1] = Math.min(9, Math.max(world.heightAt(p[i * 3], p[i * 3 + 2]) + 0.4, p[i * 3 + 1]));
  }
  pollen.p.geometry.attributes.position.needsUpdate = true;
}

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  step(dt);
  composer.render();
  requestAnimationFrame(frame);
}

document.querySelector('#loading').classList.add('done');
window.__game = {
  player, camera, scene, world, input, sky, skyU,
  setCam: (y, p, d) => { yaw = y; pitch = p; dist = d; },
  // modo de teste (?shot): avança N quadros sob demanda, sem loop contínuo
  advance: (n = 1, dt = 1 / 30) => { for (let i = 0; i < n; i++) step(dt); composer.render(); },
};
if (!qs.has('shot')) frame();
