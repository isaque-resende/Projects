// Monte das Oliveiras: o cenário que vem do Blender (terreno, estrada e muretas em oliveiras_cenario.glb), os olivais,
// pedras e moitas do layout, e a panorâmica de Jerusalém no horizonte.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { scene, texChao, LAY, V3 } from './estado.js';
import { gCen, gPlantas, KIT } from './modelos.js';

// ---------- terreno, estrada e muretas ----------
let TERRENO = null;
const ESTRADAS = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Oliveiras_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Oliveiras_Estrada')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; ESTRADAS.push(o); }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
suaviza(TERRENO, true); for (const e of ESTRADAS) suaviza(e, false);
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false); for (const e of ESTRADAS) texturizaChao(e, TX, true);
const terreno = mapaAltura(TERRENO, 0.35, { suave: true });      // altura do chão em qualquer ponto

// ---------- a estrada: pontos a cada meio metro, de Betfagé (leste) até a descida para o Getsêmani (oeste) ----------
const ROTA = new THREE.CatmullRomCurve3(LAY.estrada.map(([x, z]) => V3(x, 0, z)));
const AMOS = []; { const L = ROTA.getLength(), n = Math.ceil(L * 2); for (let i = 0; i <= n; i++) AMOS.push(ROTA.getPointAt(i / n)); }
// o ponto da estrada mais perto (índice) e a distância até ele
function naRota(x, z) { let m = 1e9, k = 0; for (let i = 0; i < AMOS.length; i++) { const d = (AMOS[i].x - x) ** 2 + (AMOS[i].z - z) ** 2; if (d < m) { m = d; k = i; } } return [k, Math.sqrt(m)]; }
const iCume = naRota(LAY.cume[0], LAY.cume[2])[0];

// ---------- oliveiras, pedras e objetos do layout ----------
instanciaLonge(scene, LAY.objetos, KIT);
poePertos(scene, LAY.objetos, KIT, () => {});

// ---------- moitas e malvas (instanciadas) ----------
{
  const PL = {}; for (const n of gPlantas.scene.children) PL[n.name] = n;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), loc = new THREE.Matrix4();
  for (const [nome, raiz] of Object.entries(PL)) {
    const lista = LAY.plantas.filter((e) => e[0] === nome); if (!lista.length) continue;
    raiz.position.set(0, 0, 0); raiz.updateMatrixWorld(true);
    raiz.traverse((mm) => {
      if (!mm.isMesh) return;
      loc.copy(mm.matrixWorld);
      const inst = new THREE.InstancedMesh(mm.geometry, mm.material, lista.length);
      lista.forEach(([, x, y, z, r, k], i) => { q.setFromAxisAngle(CIMA, r); s.setScalar(k); inst.setMatrixAt(i, m4.compose(p.set(x, y, z), q, s).multiply(loc)); });
      inst.castShadow = inst.receiveShadow = true; inst.frustumCulled = false; scene.add(inst);
    });
  }
}

// ---------- Jerusalém no horizonte ----------
// Um arco largo a oeste, de frente para o cume, com a imagem pintada (céu recortado, bordas esmaecidas).
// A altura segue a proporção da imagem; a linha do templo fica um pouco abaixo dos olhos de quem está no cume.
const PAN = { mat: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, fog: false, depthWrite: false, side: THREE.DoubleSide }), sobe: 0 };
{
  // a imagem (tex/jerusalem.webp, 1914 x 1191) é a pintura original com o vale continuado para baixo até a névoa
  const P = LAY.panorama, Y_OLHO = LAY.cume[1] + 1.6, LINHA = 0.482;      // LINHA: a base da esplanada do templo na imagem (0 = embaixo, 1 = em cima)
  const arco = P.r * (P.a1 - P.a0), alt = arco / (1914 / 1191);
  const y0 = Y_OLHO - P.r * Math.tan(THREE.MathUtils.degToRad(0.6)) - LINHA * alt;     // a base da esplanada logo abaixo da linha dos olhos: os muros aparecem por cima do morro
  const N = 48, pos = [], uv = [], idx = [];
  for (let i = 0; i <= N; i++) {
    const a = P.a0 + (P.a1 - P.a0) * i / N, x = P.cx + Math.cos(a) * P.r, z = P.cz + Math.sin(a) * P.r;
    pos.push(x, y0, z, x, y0 + alt, z); uv.push(i / N, 0, i / N, 1);
    if (i) { const b = (i - 1) * 2; idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  PAN.mesh = new THREE.Mesh(g, PAN.mat); PAN.mesh.renderOrder = -1; PAN.mesh.frustumCulled = false; PAN.mesh.visible = false; scene.add(PAN.mesh);
  new THREE.TextureLoader().load('../fase-oliveiras/tex/jerusalem.webp?v=2', (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; PAN.mat.map = t; PAN.mat.needsUpdate = true; });
}
// aparece (alvo 1) ou some (alvo 0) aos poucos; ao aparecer, sobe um pouco do vale
function panoramaPasso(dt, alvo) {
  PAN.mat.opacity += (alvo - PAN.mat.opacity) * Math.min(1, dt * 0.7);
  PAN.mesh.visible = PAN.mat.opacity > 0.01;
  PAN.mesh.position.y = -10 * (1 - PAN.mat.opacity) ** 2;
}

export { terreno, AMOS, naRota, iCume, TERRENO, PAN, panoramaPasso };
