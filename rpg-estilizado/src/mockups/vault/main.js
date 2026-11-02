// Mockup no estilo de Heaven's Vault: cenário 3D "pintado", personagens recortados em 2D,
// balões de quadrinho e um puzzle de tradução do hebraico com confirmação por contexto.
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const $ = (s) => document.querySelector(s);
const isTouch = matchMedia('(pointer: coarse)').matches;
const qs = new URLSearchParams(location.search);

// ---------------- renderer ----------------
const renderer = new THREE.WebGLRenderer({ canvas: $('#gl'), antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.NoToneMapping;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(innerWidth < innerHeight ? 58 : 42, innerWidth / innerHeight, 0.1, 500);

// céu pintado (gradiente quente com nuvens em pinceladas)
function skyTex() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 512; const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, '#4f8fbf'); g.addColorStop(0.45, '#9cc6d8'); g.addColorStop(0.75, '#f6d59a'); g.addColorStop(1, '#f0a868');
  x.fillStyle = g; x.fillRect(0, 0, 256, 512);
  for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(255,248,232,${0.12 + Math.random() * 0.25})`; x.beginPath(); x.ellipse(Math.random() * 256, 120 + Math.random() * 180, 20 + Math.random() * 24, 4 + Math.random() * 6, 0, 0, 7); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
scene.background = skyTex();
scene.fog = new THREE.Fog(0xf3c992, 40, 170);

// luz forte de sol + sombras coloridas (preenchimento violeta)
const sun = new THREE.DirectionalLight(0xfff0cf, 2.6); sun.position.set(-10, 26, 22); sun.castShadow = true;
sun.shadow.mapSize.set(1536, 1536); Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 90 }); sun.shadow.bias = -0.0006;
scene.add(sun, sun.target);
scene.add(new THREE.HemisphereLight(0xffe6c0, 0x7a5aa0, 1.05));

// pinceladas: textura de guache para chão e paredes
function strokes(base, n = 900, spread = 26) {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  x.fillStyle = base; x.fillRect(0, 0, 256, 256);
  const col = new THREE.Color(base);
  for (let i = 0; i < n; i++) {
    const k = (Math.random() - 0.5) * 0.22, c2 = col.clone().offsetHSL((Math.random() - 0.5) * 0.03, 0, k);
    x.strokeStyle = '#' + c2.getHexString(); x.globalAlpha = 0.35 + Math.random() * 0.4; x.lineWidth = 3 + Math.random() * 6; x.lineCap = 'round';
    const px = Math.random() * 256, py = Math.random() * 256, a = Math.random() * 0.6 - 0.3;
    x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(a) * spread, py + Math.sin(a) * spread * 0.4); x.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; return t;
}
const brushed = (base, rep) => { const t = strokes(base); t.repeat.set(rep, rep); return t; };
// materiais em 3 faixas de luz (aspecto de guache)
const ramp = (() => { const d = new Uint8Array([90, 170, 255]); const t = new THREE.DataTexture(d, 3, 1, THREE.RedFormat); t.minFilter = t.magFilter = THREE.NearestFilter; t.needsUpdate = true; return t; })();
const P = (color, extra = {}) => new THREE.MeshToonMaterial({ color, gradientMap: ramp, ...extra });
const MAT = {
  ground: P(0xffffff, { map: brushed('#d8a868', 14) }), grass: P(0xffffff, { map: brushed('#a2ac52', 14) }), path: P(0xffffff, { map: brushed('#ecc890', 3) }),
  clay: P(0xffffff, { map: brushed('#dc9a60', 2) }), clay2: P(0xffffff, { map: brushed('#c8804c', 2) }), roof: P(0xb06a40),
  stone: P(0xffffff, { map: brushed('#efdcb6', 3) }), stone2: P(0xffffff, { map: brushed('#d4b88a', 2) }), pave: P(0xffffff, { map: brushed('#f0d8a8', 12) }), dark: P(0x3a2418), wood: P(0x8a5a32), olive: P(0x7f8f45), olive2: P(0x95a352),
  gold: P(0xf2b640, { emissive: 0x6a3a08, emissiveIntensity: 0.35 }), cliff: P(0xc98e5a), water: P(0x5aa6b0), cloth: P(0xb8432e),
};

// ---------------- pós-processamento: tinta + guache + papel ----------------
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const ink = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, uRes: { value: new THREE.Vector2(innerWidth, innerHeight) }, uTime: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform vec2 uRes; uniform float uTime; varying vec2 vUv;
    float lum(vec3 c){ return dot(c, vec3(.299,.587,.114)); }
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
    void main(){
      vec2 px = 1.3 / uRes;
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      // contorno de tinta (Sobel na luminância)
      float tl = lum(texture2D(tDiffuse, vUv + px * vec2(-1., 1.)).rgb), t = lum(texture2D(tDiffuse, vUv + px * vec2(0., 1.)).rgb), tr = lum(texture2D(tDiffuse, vUv + px * vec2(1., 1.)).rgb);
      float l = lum(texture2D(tDiffuse, vUv + px * vec2(-1., 0.)).rgb), r = lum(texture2D(tDiffuse, vUv + px * vec2(1., 0.)).rgb);
      float bl = lum(texture2D(tDiffuse, vUv + px * vec2(-1., -1.)).rgb), b = lum(texture2D(tDiffuse, vUv + px * vec2(0., -1.)).rgb), br = lum(texture2D(tDiffuse, vUv + px * vec2(1., -1.)).rgb);
      float gx = -tl - 2.*l - bl + tr + 2.*r + br, gy = tl + 2.*t + tr - bl - 2.*b - br;
      float e = smoothstep(.16, .42, length(vec2(gx, gy)));
      // guache: posteriza levemente e aquece as sombras para o violeta
      vec3 q = floor(c * 9. + .5) / 9.; c = mix(c, q, .3);
      float L = lum(c); c = mix(c, c * vec3(.9, .82, 1.1), (1. - smoothstep(.2, .55, L)) * .45);
      c = mix(c, c * vec3(1.06, 1.0, .9), smoothstep(.55, .95, L) * .4);
      // papel
      float grain = h(floor(vUv * uRes / 2.)) * .06 - .03; c += grain;
      c = mix(c, vec3(.16,.10,.06), e * .85);
      gl_FragColor = vec4(c, 1.);
    }`,
});
composer.addPass(ink);
composer.addPass(new OutputPass());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); ink.uniforms.uRes.value.set(innerWidth, innerHeight); });

// ---------------- personagens: recortes 2D com contorno de tinta ----------------
function cutout({ robe, robe2, mantle, skin = '#c98e62', hair = '#2a1a10', veil = null, beard = false, sash = '#8a4a1e', hat = null }) {
  const W = 256, H = 512, c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.lineJoin = 'round'; x.lineCap = 'round';
  const shape = (fill, path, lw = 7) => { x.beginPath(); path(); x.fillStyle = fill; x.fill(); x.strokeStyle = '#2a1a10'; x.lineWidth = lw; x.stroke(); };
  // túnica (trapézio com barra)
  shape(robe, () => { x.moveTo(84, 170); x.lineTo(172, 170); x.lineTo(206, 492); x.quadraticCurveTo(128, 506, 50, 492); x.closePath(); });
  // meia sombra chapada (duas tonalidades, como em HV)
  x.save(); x.beginPath(); x.moveTo(140, 172); x.lineTo(172, 170); x.lineTo(206, 492); x.quadraticCurveTo(170, 500, 150, 500); x.closePath(); x.fillStyle = robe2; x.fill(); x.restore();
  // manto diagonal
  shape(mantle, () => { x.moveTo(92, 168); x.lineTo(150, 168); x.lineTo(118, 330); x.lineTo(84, 316); x.closePath(); });
  // faixa
  shape(sash, () => { x.rect(80, 250, 98, 16); }, 5);
  // braços
  shape(robe, () => { x.moveTo(84, 176); x.quadraticCurveTo(52, 230, 62, 300); x.lineTo(84, 300); x.quadraticCurveTo(84, 236, 100, 196); x.closePath(); });
  shape(skin, () => { x.ellipse(72, 308, 13, 15, 0, 0, Math.PI * 2); }, 5);
  shape(robe2, () => { x.moveTo(172, 176); x.quadraticCurveTo(204, 230, 196, 296); x.lineTo(174, 296); x.quadraticCurveTo(172, 236, 156, 196); x.closePath(); });
  shape(skin, () => { x.ellipse(186, 304, 13, 15, 0, 0, Math.PI * 2); }, 5);
  // pescoço e cabeça
  shape(skin, () => { x.rect(114, 140, 28, 34); }, 5);
  if (veil) shape(veil, () => { x.moveTo(76, 120); x.quadraticCurveTo(128, 20, 180, 120); x.lineTo(196, 230); x.quadraticCurveTo(128, 200, 60, 230); x.closePath(); });
  shape(skin, () => { x.ellipse(128, 104, 38, 46, 0, 0, Math.PI * 2); });
  if (!veil) shape(hair, () => { x.moveTo(88, 100); x.quadraticCurveTo(92, 48, 128, 52); x.quadraticCurveTo(166, 48, 170, 100); x.quadraticCurveTo(164, 76, 128, 74); x.quadraticCurveTo(96, 76, 88, 100); x.closePath(); }, 5);
  if (hat) shape(hat, () => { x.ellipse(128, 62, 46, 20, 0, 0, Math.PI * 2); }, 5);
  if (beard) shape(hair, () => { x.moveTo(94, 112); x.quadraticCurveTo(128, 178, 162, 112); x.quadraticCurveTo(128, 136, 94, 112); x.closePath(); }, 5);
  // olhos e sobrancelhas em traço
  x.fillStyle = '#2a1a10'; x.beginPath(); x.ellipse(113, 104, 4, 5, 0, 0, 7); x.ellipse(143, 104, 4, 5, 0, 0, 7); x.fill();
  x.lineWidth = 4; x.strokeStyle = '#2a1a10'; x.beginPath(); x.moveTo(104, 92); x.lineTo(120, 90); x.moveTo(136, 90); x.lineTo(152, 92); x.stroke();
  if (!beard) { x.beginPath(); x.moveTo(118, 128); x.quadraticCurveTo(128, 134, 138, 128); x.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function figure(opts, height = 1.85) {
  const g = new THREE.Group();
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: cutout(opts), transparent: true, alphaTest: 0.5 }));
  sp.center.set(0.5, 0.02); sp.scale.set(height * 0.5, height, 1); g.add(sp);
  const sh = new THREE.Mesh(new THREE.CircleGeometry(0.42, 20).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x3a2050, transparent: true, opacity: 0.35, depthWrite: false }));
  sh.position.y = 0.02; sh.scale.set(1, 1, 0.6); g.add(sh);
  g.userData = { sp, h: height, w: height * 0.5 };
  return g;
}
const PEOPLE = {
  me: { robe: '#efe4cc', robe2: '#d9c9a6', mantle: '#9a5a2e', beard: true },
  marta: { robe: '#d8c39a', robe2: '#c0a87c', mantle: '#7a8aa8', veil: '#5a6a9a' },
  cambista: { robe: '#c9a45a', robe2: '#ad8a46', mantle: '#4a6a3a', beard: true, hat: '#8a3020', sash: '#3a2a1a' },
};

// ---------------- palavras e inscrições ----------------
const WORDS = {
  ישוע: { tr: 'Yeshua', ok: 'Jesus', opts: ['Jesus', 'salvador', 'José', 'ele salva'] },
  הנצרי: { tr: 'ha-Notsri', ok: 'o Nazareno', opts: ['o Nazareno', 'o guardião', 'o nazireu', 'o galileu'] },
  מלך: { tr: 'melekh', ok: 'rei', opts: ['rei', 'mensageiro', 'sal', 'conselho'] },
  היהודים: { tr: 'ha-Yehudim', ok: 'dos judeus', opts: ['dos judeus', 'de Judá (terra)', 'dos louvores', 'dos sacerdotes'] },
  קרית: { tr: 'qiryat', ok: 'cidade', opts: ['cidade', 'muro', 'chamado', 'colina'] },
  רב: { tr: 'rav', ok: 'grande', opts: ['grande', 'mestre', 'muitos', 'velho'] },
};
const INSCRIPTIONS = {
  templo: { title: 'A pedra riscada no pátio', sub: 'Alguém copiou na pedra a frase que estava na placa da cruz.', words: ['ישוע', 'הנצרי', 'מלך', 'היהודים'], ref: 'Jo 19:19' },
  mirante: { title: 'O marco do mirante', sub: 'Um marco antigo, voltado para o Monte Sião.', words: ['קרית', 'מלך', 'רב'], ref: 'Sl 48:2 (48:3 no hebraico)' },
};
const lex = {}; // palavra -> { guess, status: 'inc' | 'ok' | 'bad', seen: Set }
const seen = new Set(); // inscrições abertas
function evaluate() {
  // a palavra é confirmada quando o mesmo palpite (correto) faz sentido em duas inscrições lidas;
  // uma inscrição inteira se confirma quando todas as palavras estão certas e ao menos uma já foi confirmada por contexto
  for (const [w, e] of Object.entries(lex)) {
    const where = [...seen].filter((k) => INSCRIPTIONS[k].words.includes(w));
    if (!e.guess) continue;
    if (where.length >= 2 && e.guess === WORDS[w].ok) e.status = 'ok';
    else if (where.length >= 2 && e.guess !== WORDS[w].ok) e.status = 'bad';
    else if (e.status !== 'ok') e.status = 'inc';
  }
  for (const k of seen) {
    const ws = INSCRIPTIONS[k].words;
    if (ws.every((w) => lex[w]?.guess === WORDS[w].ok) && ws.some((w) => lex[w].status === 'ok')) ws.forEach((w) => { lex[w].status = 'ok'; });
  }
}

// ---------------- áreas ----------------
const areas = {};
function stoneTex(lines) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d');
  x.fillStyle = '#d9c39a'; x.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${Math.random() < 0.5 ? '120,90,60' : '255,240,210'},${Math.random() * 0.12})`; x.fillRect(Math.random() * 512, Math.random() * 256, 3, 3); }
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.direction = 'rtl'; x.font = '700 64px "Frank Ruhl Libre", serif';
  lines.forEach((l, i) => { const y = 256 / (lines.length + 1) * (i + 1); x.fillStyle = '#fff2d2'; x.fillText(l, 258, y + 3); x.fillStyle = '#4a2e18'; x.fillText(l, 256, y); });
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const box = (m, w, h, d, x, y, z, g, ry = 0) => { const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); b.position.set(x, y + h / 2, z); b.rotation.y = ry; b.castShadow = b.receiveShadow = true; g.add(b); return b; };
const olive = (x, z, g, s = 1) => {
  const t = new THREE.Group();
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.26 * s, 1.6 * s, 6), MAT.wood); tr.position.y = 0.8 * s; tr.rotation.z = 0.15; t.add(tr);
  for (let i = 0; i < 4; i++) { const c = new THREE.Mesh(new THREE.IcosahedronGeometry((0.8 + Math.random() * 0.4) * s, 0), i % 2 ? MAT.olive : MAT.olive2); c.position.set((Math.random() - 0.5) * 1.4 * s, (1.8 + Math.random() * 0.6) * s, (Math.random() - 0.5) * 1.2 * s); c.scale.y = 0.75; t.add(c); }
  t.traverse((o) => { if (o.isMesh) { o.castShadow = o.receiveShadow = true; } }); t.position.set(x, 0, z); g.add(t);
};
function ground(g, mat, size = 60) { const p = new THREE.Mesh(new THREE.CircleGeometry(size, 48).rotateX(-Math.PI / 2), mat); p.receiveShadow = true; g.add(p); }
function marker() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#f2b640'; x.strokeStyle = '#2a1a10'; x.lineWidth = 6; x.beginPath(); x.moveTo(32, 6); x.lineTo(54, 30); x.lineTo(32, 58); x.lineTo(10, 30); x.closePath(); x.fill(); x.stroke();
  const t = new THREE.CanvasTexture(c); const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true })); s.scale.set(0.38, 0.38, 1); s.renderOrder = 10; return s;
}

function buildBetania() {
  const g = new THREE.Group();
  ground(g, MAT.grass); const path = new THREE.Mesh(new THREE.PlaneGeometry(3, 40).rotateX(-Math.PI / 2), MAT.path); path.position.set(0, 0.01, -6); path.rotation.y = 0.2; path.receiveShadow = true; g.add(path);
  box(MAT.clay, 5, 3, 4, -5, 0, -4, g, 0.2); box(MAT.roof, 5.4, 0.25, 4.4, -5, 3, -4, g, 0.2); box(MAT.dark, 1, 1.9, 0.1, -4.6, 0, -1.98, g, 0.2);
  box(MAT.clay2, 4, 2.6, 4, 5, 0, -7, g, -0.3); box(MAT.roof, 4.4, 0.25, 4.4, 5, 2.6, -7, g, -0.3);
  box(MAT.clay, 6, 3.2, 4, 1, 0, -13, g, 0.1); box(MAT.roof, 6.4, 0.25, 4.4, 1, 3.2, -13, g, 0.1);
  // forno, jarros, muro baixo
  const oven = new THREE.Mesh(new THREE.SphereGeometry(0.7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), MAT.clay2); oven.position.set(-1.8, 0, -1.2); oven.castShadow = true; g.add(oven);
  for (let i = 0; i < 3; i++) { const j = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 0.7, 10), MAT.clay2); j.position.set(-7.4 + i * 0.5, 0.35, -1.6); j.castShadow = true; g.add(j); }
  for (let i = 0; i < 7; i++) box(MAT.stone2, 1.6, 0.8, 0.5, -9 + i * 1.6, 0, 3, g);
  for (const [x, z, s] of [[-10, -9, 1.2], [9, -1, 1], [8, -14, 1.3], [-12, 2, 0.9], [3, 4, 0.8]]) olive(x, z, g, s);
  return { g, name: 'Betânia', spawn: [1, 4], camOff: new THREE.Vector3(4.2, 3.6, 7.2), ahead: new THREE.Vector3(-1, 0.4, -2), bounds: 14,
    npcs: [{ id: 'marta', who: 'Marta', look: PEOPLE.marta, at: [-3, 0], lines: [
      { t: 'Você vai mesmo para a cidade? Cléopas já saiu.', choices: [['Quero ver Jerusalém do mirante primeiro.', 'Do alto do monte a cidade parece em paz. Não está.'], ['O que dizem as mulheres?', 'Que a pedra foi rolada. Que o túmulo está vazio. Eu não sei mais no que acreditar.'], ['Até logo, Marta.', 'Vá com Deus.']] },
    ] }],
    things: [] };
}
function buildMirante() {
  const g = new THREE.Group();
  ground(g, MAT.ground);
  box(MAT.stone, 14, 0.5, 10, 0, 0, 0, g);
  for (let i = 0; i < 9; i++) box(MAT.stone2, 1.5, 0.9, 0.5, -6 + i * 1.5, 0.5, -4.8, g);
  box(MAT.stone2, 0.6, 1.8, 0.6, 3.5, 0.5, -3.6, g); // marco da inscrição
  const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.45), new THREE.MeshBasicMaterial({ map: stoneTex(['קרית מלך רב']) })); m.position.set(3.5, 1.9, -3.29); g.add(m);
  // vale e a cidade dourada ao longe
  const val = new THREE.Mesh(new THREE.PlaneGeometry(220, 120).rotateX(-Math.PI / 2), MAT.olive); val.position.set(0, -6, -70); val.receiveShadow = true; g.add(val);
  const cliff = new THREE.Mesh(new THREE.BoxGeometry(60, 6, 8), MAT.cliff); cliff.position.set(0, -3, -9); g.add(cliff);
  const city = new THREE.Group(); city.position.set(4, -6, -58); city.scale.setScalar(1.25);
  box(MAT.stone, 34, 9, 24, 0, 0, 0, city); box(MAT.stone2, 36, 1, 26, 0, 9, 0, city);
  for (let i = -15; i <= 15; i += 2) { box(MAT.stone, 0.8, 4, 0.8, i, 10, -11.5, city); box(MAT.stone, 0.8, 4, 0.8, i, 10, 11.5, city); }
  box(MAT.stone, 9, 7, 12, 0, 10, 0, city); box(MAT.gold, 9.4, 1.2, 12.4, 0, 17, 0, city); box(MAT.stone, 12, 10, 3, 0, 10, 6.5, city); box(MAT.gold, 12.4, 1, 3.4, 0, 20, 6.5, city);
  box(MAT.dark, 2.6, 5, 0.2, 0, 10, 8.1, city);
  for (let i = 0; i < 40; i++) box(Math.random() < 0.5 ? MAT.clay : MAT.stone2, 2 + Math.random() * 2, 1.5 + Math.random() * 2.5, 2 + Math.random() * 2, -40 + Math.random() * 80, 0, 16 + Math.random() * 26, city);
  g.add(city);
  for (const [x, z, s] of [[-9, 2, 1.1], [9, 3, 1.2], [-12, -2, 0.9]]) olive(x, z, g, s);
  return { g, name: 'O mirante', spawn: [-2, 3], camOff: new THREE.Vector3(-3.2, 2.6, 6.5), ahead: new THREE.Vector3(1, -1.2, -12), bounds: 6.5, floor: 0.5,
    npcs: [], things: [{ id: 'mirante', label: 'Ler o marco', at: [3.5, -3.0], insc: 'mirante' }] };
}
function buildTemplo() {
  const g = new THREE.Group();
  const pav = new THREE.Mesh(new THREE.PlaneGeometry(60, 60).rotateX(-Math.PI / 2), MAT.pave); pav.receiveShadow = true; g.add(pav);
  for (let i = -6; i <= 6; i++) { box(MAT.stone, 0.9, 0.4, 0.9, i * 2.4, 0, -8, g); const c = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 5.5, 10), MAT.stone); c.position.set(i * 2.4, 3.15, -8); c.castShadow = c.receiveShadow = true; g.add(c); box(MAT.gold, 0.9, 0.35, 0.9, i * 2.4, 5.9, -8, g); }
  box(MAT.stone2, 32, 0.8, 3, 0, 6.25, -8, g); box(MAT.wood, 32, 0.25, 4, 0, 7.05, -9, g);
  box(MAT.stone, 30, 9, 1.2, 0, 0, -11, g);
  // mesas viradas e moedas
  const t1 = box(MAT.wood, 2, 0.12, 1, 4, 0.5, 1, g, 0.4); t1.rotation.x = Math.PI / 2.2;
  box(MAT.wood, 2, 0.12, 1, 5.6, 0.75, 2.5, g, -0.6);
  for (let i = 0; i < 18; i++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 8), MAT.gold); c.position.set(4 + Math.random() * 3, 0.02, 1 + Math.random() * 2.5); g.add(c); }
  // a pedra riscada
  box(MAT.stone2, 2.2, 1.2, 0.6, -4, 0, -2, g, 0.25);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.85), new THREE.MeshBasicMaterial({ map: stoneTex(['ישוע הנצרי', 'מלך היהודים']) })); m.position.set(-4 + Math.sin(0.25) * 0.31, 0.62, -2 + Math.cos(0.25) * 0.31); m.rotation.y = 0.25; g.add(m);
  return { g, name: 'Pátio do Templo', spawn: [0, 6], camOff: new THREE.Vector3(4.6, 3.4, 7.4), ahead: new THREE.Vector3(-0.5, 0.6, -3), bounds: 10,
    npcs: [{ id: 'cambista', who: 'Cambista', look: PEOPLE.cambista, at: [6.5, 0.5], lines: [
      { t: 'Não pise nas moedas! ...Ninguém arrumou nada desde segunda.', choices: [['Quem virou as mesas?', 'O galileu. Com um chicote de cordas. "Casa de oração", ele gritava.'], ['E aquela pedra riscada?', 'Alguém copiou ali a placa da cruz. Hebraico. Eu só leio números.'], ['Paz para você.', 'Paz? Neste pátio, desde sexta, ninguém tem paz.']] },
    ] }],
    things: [{ id: 'templo', label: 'Ler a pedra', at: [-4, -1.2], insc: 'templo' }] };
}

// ---------------- estado ----------------
const player = figure(PEOPLE.me); scene.add(player);
let area = null, areaKey = null;
const playerTarget = new THREE.Vector3(); let moving = false;
function enter(key) {
  if (area) scene.remove(area.g);
  if (!areas[key]) {
    areas[key] = { betania: buildBetania, mirante: buildMirante, templo: buildTemplo }[key]();
    const A = areas[key];
    A.npcObjs = A.npcs.map((n) => { const f = figure(n.look); f.position.set(n.at[0], A.floor || 0, n.at[1]); A.g.add(f); const mk = marker(); f.add(mk); mk.position.y = 2.15; return { ...n, f, mk }; });
    A.thingObjs = A.things.map((t) => { const mk = marker(); mk.position.set(t.at[0], (A.floor || 0) + 2.2, t.at[1]); A.g.add(mk); return { ...t, mk }; });
  }
  area = areas[key]; areaKey = key; scene.add(area.g);
  player.position.set(area.spawn[0], area.floor || 0, area.spawn[1]); playerTarget.copy(player.position); moving = false;
  camera.position.copy(player.position).add(area.camOff); camLook.copy(player.position).add(new THREE.Vector3(0, 1.2, 0)).add(area.ahead || new THREE.Vector3());
  $('#place').textContent = area.name;
}
const camLook = new THREE.Vector3();

// ---------------- entrada ----------------
const keys = new Set();
addEventListener('keydown', (e) => {
  keys.add(e.code);
  if (e.code === 'KeyE') interact();
  if (e.code === 'KeyM') openMap();
  if (e.code === 'KeyL') openLex();
  if (/^Digit[1-4]$/.test(e.code) && !$('#choices').hidden) { const b = $('#choices').children[+e.code.slice(5) - 1]; b?.click(); }
});
addEventListener('keyup', (e) => keys.delete(e.code));
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(), floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
$('#gl').addEventListener('pointerdown', (e) => {
  if (talking) return;
  mouse.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(mouse, camera);
  // tocou numa pessoa ou objeto? vai até lá e interage
  const near = nearest(true, ray);
  if (near) { pending = near; playerTarget.set(near.pos.x, 0, near.pos.z); moving = true; return; }
  floorPlane.constant = -(area.floor || 0);
  const p = new THREE.Vector3(); if (ray.ray.intersectPlane(floorPlane, p)) { playerTarget.copy(p); moving = true; pending = null; }
});
let pending = null;

// ---------------- interação ----------------
function interactables() {
  return [...area.npcObjs.map((n) => ({ kind: 'npc', n, pos: n.f.position })), ...area.thingObjs.map((t) => ({ kind: 'thing', t, pos: new THREE.Vector3(t.at[0], 0, t.at[1]) }))];
}
function nearest(byRay = false, r = null) {
  let best = null, bd = Infinity;
  for (const it of interactables()) {
    let d;
    if (byRay) { const p = it.pos.clone(); p.y += 1; d = r.ray.distanceToPoint(p); if (d > 1.1) continue; }
    else { d = Math.hypot(it.pos.x - player.position.x, it.pos.z - player.position.z); if (d > 2.2) continue; }
    if (d < bd) { bd = d; best = it; }
  }
  return best;
}
let talking = null;
function interact(it = nearest()) {
  if (!it || talking) return;
  if (it.kind === 'thing') return openTrans(it.t.insc);
  const n = it.n; talking = { n, line: 0 };
  showBalloon(n, n.lines[0].t, n.who);
  const box = $('#choices'); box.innerHTML = ''; box.hidden = false;
  n.lines[0].choices.forEach(([q, a], i) => {
    const b = document.createElement('button'); b.innerHTML = `<i>${i + 1}</i>${q}`;
    b.onclick = () => { box.hidden = true; showBalloon(null, q, 'Você', true); setTimeout(() => { showBalloon(n, a, n.who); setTimeout(endTalk, 2600 + a.length * 25); }, 1200 + q.length * 15); };
    box.appendChild(b);
  });
}
function endTalk() { talking = null; $('#choices').hidden = true; balloons.forEach((b) => b.remove()); balloons.length = 0; }
const balloons = [];
function showBalloon(n, text, who, me = false) {
  balloons.forEach((b) => b.remove()); balloons.length = 0;
  const el = document.createElement('div'); el.className = 'balloon' + (me ? ' me' : ''); el.innerHTML = `<b>${who}</b>${text}`; document.body.appendChild(el);
  el.dataset.anchor = me ? 'player' : n.id; balloons.push(el);
}
function placeBalloons() {
  for (const el of balloons) {
    const obj = el.dataset.anchor === 'player' ? player : area.npcObjs.find((n) => n.id === el.dataset.anchor)?.f;
    if (!obj) continue;
    const p = obj.position.clone(); p.y += obj.userData.h + 0.25; p.project(camera);
    let x = (p.x * 0.5 + 0.5) * innerWidth, y = (-p.y * 0.5 + 0.5) * innerHeight;
    const w = el.offsetWidth; x = Math.max(w / 2 + 8, Math.min(innerWidth - w / 2 - 8, x)); y = Math.max(el.offsetHeight + 60, y);
    el.style.left = x + 'px'; el.style.top = y + 'px';
  }
}

// ---------------- tradução ----------------
let curInsc = null, selWord = null;
function openTrans(key) {
  curInsc = key; selWord = null; seen.add(key);
  for (const w of INSCRIPTIONS[key].words) lex[w] ??= { guess: null, status: 'inc' };
  evaluate(); renderTrans(); $('#trans').hidden = false;
}
function renderTrans() {
  const I = INSCRIPTIONS[curInsc];
  $('#tTitle').textContent = I.title; $('#tSub').textContent = I.sub;
  const ws = $('#words'); ws.innerHTML = '';
  I.words.forEach((w) => {
    const e = lex[w], d = document.createElement('div'); d.className = 'word' + (selWord === w ? ' sel' : '');
    const st = !e.guess ? '' : `<span class="st ${e.status}">${e.status === 'ok' ? '✓' : e.status === 'bad' ? '!' : '?'}</span>`;
    d.innerHTML = `${st}<div class="he">${w}</div><div class="tr">${WORDS[w].tr}</div><div class="g">${e.guess || '___'}</div>`;
    d.onclick = () => { selWord = w; renderTrans(); };
    ws.appendChild(d);
  });
  const op = $('#opts'); op.innerHTML = '';
  if (selWord && lex[selWord].status !== 'ok') WORDS[selWord].opts.forEach((o) => {
    const b = document.createElement('button'); b.textContent = o;
    b.onclick = () => { const before = lex[selWord].status; lex[selWord].guess = o; lex[selWord].status = 'inc'; evaluate(); selWord = null; renderTrans(); const now = lex[Object.keys(lex).find((k) => lex[k].guess === o)]; if (before !== 'ok' && now?.status === 'ok') toast('Confirmado! A palavra faz sentido nas duas inscrições.'); };
    op.appendChild(b);
  });
  else if (selWord) op.innerHTML = '<em style="font:italic 500 14px Alegreya,serif;color:#3f8f4e">Esta palavra já está confirmada.</em>';
  else op.innerHTML = '<em style="font:italic 500 14px Alegreya,serif;color:#6a4a2a">Toque numa palavra.</em>';
  // leitura em português
  const read = I.words.map((w) => lex[w].guess || '…');
  $('#reading').textContent = '“' + (curInsc === 'mirante' ? `${read[0]} do ${read[2]} ${read[1]}` : read.join(' ')).replace(/\s+/g, ' ') + '”';
  const all = I.words.every((w) => lex[w].guess), allOk = I.words.every((w) => lex[w].status === 'ok');
  const shared = I.words.filter((w) => Object.values(INSCRIPTIONS).filter((x) => x.words.includes(w)).length > 1);
  $('#verdict').innerHTML = allOk ? `<b style="color:#3f8f4e">Inscrição decifrada.</b> <i>${I.ref}</i>`
    : I.words.some((w) => lex[w].status === 'bad') ? '<b style="color:#b8432e">Algo não bate:</b> o mesmo sinal não pode querer dizer coisas diferentes aqui e lá.'
    : all ? (seen.size < 2 ? `Faz sentido... mas como ter certeza? Procure <b>${shared.join(', ')}</b> em outra inscrição.` : 'Hmm. Alguma palavra ainda soa estranha nesta frase.')
    : '';
}
$('#tClose').onclick = () => { $('#trans').hidden = true; };
function openLex() {
  const L = $('#lexList'); L.innerHTML = '';
  const ks = Object.keys(lex); if (!ks.length) L.innerHTML = '<em>Nenhuma palavra ainda. Procure inscrições.</em>';
  ks.forEach((w) => { const e = lex[w], r = document.createElement('div'); r.className = 'lexrow';
    r.innerHTML = `<span class="he">${w}</span><span>${e.guess || '—'} <small>(${WORDS[w].tr})</small></span><span class="st ${e.guess ? e.status : ''}" style="position:static;width:22px;height:22px;border:2px solid #2a1a10;border-radius:50%;display:grid;place-items:center">${e.status === 'ok' ? '✓' : e.guess ? '?' : ''}</span>`; L.appendChild(r); });
  $('#lex').hidden = false;
}
$('#lexClose').onclick = () => { $('#lex').hidden = true; };
$('#bLex').onclick = openLex;
function toast(t) { const el = $('#toast'); el.textContent = t; el.hidden = false; el.style.opacity = 1; clearTimeout(toast.h); toast.h = setTimeout(() => { el.style.opacity = 0; setTimeout(() => { el.hidden = true; }, 400); }, 2600); }

// ---------------- mapa ilustrado com a rota se desenhando ----------------
const PLACES = { betania: [790, 380, 'Betânia'], mirante: [560, 330, 'O mirante'], templo: [300, 360, 'Pátio do Templo'] };
const ROUTE = { betania: [[790, 380], [700, 300], [620, 320], [560, 330]], mirante: [[560, 330], [470, 420], [380, 400], [300, 360]] };
let mapAnim = null;
function drawMap(progress = 0, from = null, to = null) {
  const c = $('#mapCanvas'), x = c.getContext('2d');
  const g = x.createRadialGradient(480, 300, 60, 480, 360, 620); g.addColorStop(0, '#f6e6c4'); g.addColorStop(1, '#d6b680'); x.fillStyle = g; x.fillRect(0, 0, 960, 720);
  // relevo pintado
  x.fillStyle = '#c9a46a55'; for (let i = 0; i < 6; i++) { x.beginPath(); x.ellipse(620 + i * 30, 300 + i * 18, 160 - i * 18, 70 - i * 8, -0.3, 0, 7); x.fill(); }
  x.strokeStyle = '#7a5a3a'; x.lineWidth = 3; x.setLineDash([]);
  x.beginPath(); x.moveTo(200, 250); x.lineTo(380, 230); x.lineTo(400, 470); x.lineTo(220, 480); x.closePath(); x.fillStyle = '#e8d2a6'; x.fill(); x.stroke(); // muralha
  x.fillStyle = '#f2b640'; x.fillRect(285, 320, 40, 30); x.strokeRect(285, 320, 40, 30);
  x.font = 'italic 600 26px Alegreya, serif'; x.fillStyle = '#4a2e18'; x.fillText('Jerusalém', 230, 220); x.fillText('Monte das Oliveiras', 560, 210);
  x.strokeStyle = '#5aa6b0'; x.lineWidth = 6; x.beginPath(); x.moveTo(450, 120); x.bezierCurveTo(430, 300, 470, 450, 440, 640); x.stroke(); x.fillStyle = '#3a6a78'; x.font = 'italic 20px Alegreya, serif'; x.fillText('Cedrom', 452, 600);
  // todas as estradas em pontilhado fraco
  x.setLineDash([6, 10]); x.strokeStyle = '#8a6a3a88'; x.lineWidth = 4;
  for (const r of Object.values(ROUTE)) { x.beginPath(); r.forEach(([a, b], i) => (i ? x.lineTo(a, b) : x.moveTo(a, b))); x.stroke(); }
  // rota sendo percorrida
  if (from && to) {
    const pts = from === 'betania' && to === 'templo' ? [...ROUTE.betania, ...ROUTE.mirante.slice(1)] : from === 'templo' && to === 'betania' ? [...ROUTE.mirante].reverse().concat([...ROUTE.betania].reverse().slice(1))
      : ROUTE[from]?.[ROUTE[from].length - 1][0] === PLACES[to][0] ? ROUTE[from] : [...(ROUTE[to] || ROUTE.betania)].reverse();
    const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
    let rem = tot * progress; x.setLineDash([]); x.strokeStyle = '#b8432e'; x.lineWidth = 7; x.beginPath(); x.moveTo(...pts[0]); let end = pts[0];
    for (let i = 1; i < pts.length; i++) { if (rem <= 0) break; const k = Math.min(1, rem / L[i - 1]); end = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]; x.lineTo(...end); rem -= L[i - 1]; }
    x.stroke(); x.fillStyle = '#2a1a10'; x.beginPath(); x.arc(end[0], end[1], 10, 0, 7); x.fill();
  }
  x.setLineDash([]);
  for (const [k, [px, py, name]] of Object.entries(PLACES)) {
    x.fillStyle = k === areaKey ? '#b8432e' : '#2a1a10'; x.beginPath(); x.arc(px, py, 14, 0, 7); x.fill(); x.strokeStyle = '#f6e6c4'; x.lineWidth = 4; x.stroke();
    x.font = '700 24px Alegreya Sans, sans-serif'; x.fillStyle = '#2a1a10'; x.fillText(name, px - x.measureText(name).width / 2, py + 44);
  }
}
function openMap() { if (talking || mapAnim) return; drawMap(); $('#map').hidden = false; }
$('#bMap').onclick = openMap;
$('#mapCanvas').addEventListener('click', (e) => {
  if (mapAnim) return;
  const r = e.target.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width * 960, my = (e.clientY - r.top) / r.height * 720;
  const hit = Object.entries(PLACES).find(([, [px, py]]) => Math.hypot(px - mx, py - my) < 60);
  if (!hit) { $('#map').hidden = true; return; }
  const to = hit[0]; if (to === areaKey) { $('#map').hidden = true; return; }
  travel(areaKey, to);
});
function travel(from, to) {
  const t0 = performance.now(); mapAnim = true; $('#mapNote').textContent = `A caminho de ${PLACES[to][2]}...`;
  const step = () => {
    const p = Math.min(1, (performance.now() - t0) / 1600); drawMap(p, from, to);
    if (p < 1) return requestAnimationFrame(step);
    $('#fade').style.opacity = 1;
    setTimeout(() => { enter(to); $('#map').hidden = true; mapAnim = null; $('#mapNote').textContent = 'Escolha para onde ir.'; $('#fade').style.opacity = 0; }, 500);
  };
  step();
}

// ---------------- loop ----------------
const clock = new THREE.Clock(), tmp = new THREE.Vector3();
function step(dt) {
  const t = clock.elapsedTime;
  // movimento
  let ix = 0, iz = 0;
  if (!talking && $('#trans').hidden) {
    if (keys.has('KeyW') || keys.has('ArrowUp')) iz -= 1; if (keys.has('KeyS') || keys.has('ArrowDown')) iz += 1;
    if (keys.has('KeyA') || keys.has('ArrowLeft')) ix -= 1; if (keys.has('KeyD') || keys.has('ArrowRight')) ix += 1;
  }
  const fwd = tmp.copy(area.camOff).setY(0).normalize().negate(), right = new THREE.Vector3(-fwd.z, 0, fwd.x);
  const v = new THREE.Vector3().addScaledVector(fwd, -iz).addScaledVector(right, ix);
  if (v.lengthSq() > 0) { moving = false; pending = null; v.normalize(); }
  else if (moving) { v.set(playerTarget.x - player.position.x, 0, playerTarget.z - player.position.z); const d = v.length(); const stop = pending ? 1.6 : 0.08; if (d < stop) { moving = false; v.set(0, 0, 0); if (pending) { const p = pending; pending = null; interact(p); } } else v.divideScalar(d); }
  const sp = 3.4, walking = v.lengthSq() > 0;
  if (walking) {
    player.position.addScaledVector(v, sp * dt);
    const r = Math.hypot(player.position.x, player.position.z); if (r > area.bounds) player.position.multiplyScalar(area.bounds / r);
    // vira o recorte conforme o lado da tela
    const sx = v.dot(right); if (Math.abs(sx) > 0.2) player.userData.sp.scale.x = Math.sign(sx) * Math.abs(player.userData.sp.scale.x);
  }
  player.position.y = (area.floor || 0);
  const bob = walking ? Math.abs(Math.sin(t * 9)) * 0.06 : Math.sin(t * 2) * 0.01;
  player.userData.sp.position.y = bob; player.userData.sp.material.rotation = walking ? Math.sin(t * 9) * 0.04 : 0;
  // pessoas respiram e olham para o jogador
  for (const n of area.npcObjs) { n.f.userData.sp.position.y = Math.sin(t * 2 + n.at[0]) * 0.012; const dx = player.position.x - n.f.position.x; n.f.userData.sp.scale.x = Math.sign(dx || 1) * Math.abs(n.f.userData.sp.scale.x); }
  // indicadores: mais nítidos de perto
  for (const it of interactables()) { const mk = it.kind === 'npc' ? it.n.mk : it.t.mk, d = Math.hypot(it.pos.x - player.position.x, it.pos.z - player.position.z); mk.material.opacity = Math.max(0.25, 1 - d / 14); mk.position.y += Math.sin(t * 3) * 0.002; mk.visible = !talking; }
  const near = !talking && $('#trans').hidden ? nearest() : null;
  const tap = $('#tap'); if (near) { tap.hidden = false; tap.textContent = (isTouch ? 'Toque para ' : 'E · ') + (near.kind === 'npc' ? `falar com ${near.n.who}` : near.t.label.toLowerCase()); } else tap.hidden = true;
  tap.onclick = () => interact(near);
  // câmera cinematográfica: segue com atraso e enquadra largo
  const want = player.position.clone().add(area.camOff);
  camera.position.lerp(want, 1 - Math.exp(-2.2 * dt));
  camLook.lerp(player.position.clone().add(new THREE.Vector3(0, 1.2, 0)).add(area.ahead || new THREE.Vector3()), 1 - Math.exp(-3 * dt));
  camera.lookAt(camLook);
  sun.position.copy(player.position).add(new THREE.Vector3(-10, 26, 22)); sun.target.position.copy(player.position);
  ink.uniforms.uTime.value = t;
  placeBalloons();
}
function frame() { const dt = Math.min(clock.getDelta(), 0.05); step(dt); composer.render(); requestAnimationFrame(frame); }

enter(qs.get('at') || 'betania');
window.__mock = { enter, step: (n = 1) => { for (let i = 0; i < n; i++) step(1 / 30); composer.render(); }, openTrans, lex, seen, evaluate, renderTrans, interact, nearest, player, travel, openMap, setGuess: (w, g) => { lex[w] ??= { guess: null, status: 'inc' }; lex[w].guess = g; evaluate(); renderTrans(); } };
if (!qs.has('shot')) frame(); else { step(1 / 30); composer.render(); }
