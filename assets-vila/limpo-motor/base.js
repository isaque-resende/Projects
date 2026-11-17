// Motor comum das fases: tela, luz, carregamento de modelos e texturas.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

// Monta a tela, a cena e as duas luzes (céu e sol). Cada fase passa as suas cores.
//   fundo: cor ou textura do céu · neblina: [cor, perto, longe] · ceu: [cor de cima, cor de baixo, força]
//   sol: [cor, força] · alcanceSombra: até onde a sombra do sol alcança · semente: do sorteio (rnd)
export function criaBase({ fundo, neblina, ceu, sol, alcanceSombra = 80, semente = 7 }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = fundo;
  scene.fog = new THREE.Fog(...neblina);
  const hemi = new THREE.HemisphereLight(...ceu); scene.add(hemi);
  const sun = new THREE.DirectionalLight(...sol);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: alcanceSombra });
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03;
  scene.add(sun, sun.target);

  // sorteio com semente fixa: a fase nasce sempre igual
  let seed = semente;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

  const tl = new THREE.TextureLoader();
  // textura que repete (objetos)
  const tex = (url, rep) => {
    const t = tl.load(url); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); if (rep) t.repeat.set(rep, rep); return t;
  };
  // textura do chão (projetada de cima pelo material do terreno)
  const texChao = (url) => { const x = tl.load(url); x.colorSpace = THREE.SRGBColorSpace; x.wrapS = x.wrapT = THREE.RepeatWrapping; x.anisotropy = 4; return x; };

  return { renderer, scene, hemi, sun, rnd, tex, texChao };
}

// ---------- carregamento ----------
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
// baixa um .glb; se a rede falhar, tenta de novo (até 4 vezes)
export const baixar = async (url) => {
  for (let k = 0; ; k++) {
    try { return await loader.loadAsync(url); } catch (e) { if (k >= 3) throw e; await new Promise((r) => setTimeout(r, 400 * (k + 1))); }
  }
};
// tudo dentro do objeto faz e recebe sombra
export const sombra = (r) => r.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
// as peças de um .glb, pelo nome
export const nos = (g) => { const m = {}; for (const n of g.scene.children) m[n.name] = n; return m; };
