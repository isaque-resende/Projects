// Monte das Oliveiras: o cenário que vem do Blender (terreno, estrada e muretas em oliveiras_cenario.glb), os olivais,
// pedras e moitas do layout, e a panorâmica de Jerusalém no horizonte.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { scene, texChao, LAY, V3, sm } from './estado.js';
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
// Duas camadas, para dar distância: o vale do Cedrom em 3D (desce do monte, tem fundo e sobe do outro lado) e,
// atrás dele, a pintura da cidade num arco estreito e longe (r = 420 m). Do cume a esplanada do templo fica um
// pouco abaixo da linha dos olhos, como do alto do monte; descendo, ela sobe até a altura dos olhos.
// Os dois ignoram a neblina do jogo: a bruma de distância já vem pintada (na imagem e nas cores do vale).
const PAN = { mat: new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, fog: false, depthWrite: false, side: THREE.DoubleSide }), sobe: 0 };
// as laterais da pintura somem devagar nos morros do fundo (além do esmaecido que já vem na imagem)
PAN.mat.onBeforeCompile = (sh) => {
  sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n  diffuseColor.a *= smoothstep(0.0, 0.3, vMapUv.x) * smoothstep(1.0, 0.7, vMapUv.x);');
};
{
  // tex/jerusalem.webp (1914 x 822): a pintura original, céu recortado, laterais esmaecidas, um véu de bruma
  const P = LAY.panorama, Y_OLHO = LAY.cume[1] + 1.6, LINHA = 0.392;     // LINHA: o alto da esplanada do templo na imagem (0 = embaixo, 1 = em cima)
  const arco = P.r * (P.a1 - P.a0), alt = arco / (1914 / 822);
  const y0 = Y_OLHO - P.r * Math.tan(THREE.MathUtils.degToRad(2.5)) - LINHA * alt;     // a esplanada 2,5° abaixo dos olhos de quem está no cume
  const N = 48, pos = [], uv = [], idx = [];
  for (let i = 0; i <= N; i++) {
    const a = P.a0 + (P.a1 - P.a0) * i / N, x = P.cx + Math.cos(a) * P.r, z = P.cz + Math.sin(a) * P.r;
    pos.push(x, y0, z, x, y0 + alt, z); uv.push(i / N, 0, i / N, 1);
    if (i) { const b = (i - 1) * 2; idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  PAN.mesh = new THREE.Mesh(g, PAN.mat); PAN.mesh.renderOrder = -1; PAN.mesh.frustumCulled = false; PAN.mesh.visible = false; scene.add(PAN.mesh);
  new THREE.TextureLoader().load('../fase-oliveiras/tex/jerusalem.webp?v=3', (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; PAN.mat.map = t; PAN.mat.needsUpdate = true; });

  // o vale: um leque de triângulos facetados entre o pé do monte (r = 125) e o pé da pintura (r = P.r - 8)
  const R0 = 125, R1 = P.r - 8, FUNDO = y0 - 28, LONGE = y0 + alt * 0.13;     // LONGE: a encosta do outro lado cobre a base da pintura
  const altV = (r, a) => {
    const t1 = sm(R0, R0 + 120, r), t2 = sm(R1 - 140, R1, r);
    const base = -20 + (FUNDO + 20) * t1 + (LONGE - FUNDO) * t2;
    return base + (6 * Math.sin(a * 9 + r * 0.031) + 4 * Math.cos(a * 17 - r * 0.047)) * Math.min(1, (r - R0) / 80);
  };
  const cor = (hex) => new THREE.Color().setStyle(hex, THREE.SRGBColorSpace);
  const NEV = cor('#e6e6d6'), OLIVAL = cor('#a3a37c'), BRUMA = cor('#d9d3d8'), ENCOSTA = cor('rgb(154,129,131)');
  const corV = (r) => {
    const c = NEV.clone().lerp(OLIVAL.clone().lerp(BRUMA, 0.35), sm(R0, R0 + 160, r));
    return c.lerp(ENCOSTA, sm(R1 - 170, R1, r));
  };
  const RAIOS = [R0, 145, 170, 200, 235, 270, 305, 335, 360, 385, R1], A0 = P.a0 - 0.62, A1 = P.a1 + 0.62, NA = 44;
  const vp = [], vc = [], SOL = V3(-14, 26, 12).normalize(), p0 = V3(), p1 = V3(), p2 = V3(), nn = V3();
  const ponto = (ri, ai) => { const r = RAIOS[ri] + (ri && ri < RAIOS.length - 1 ? 9 * Math.sin(ai * 2.3 + ri) : 0), a = A0 + (A1 - A0) * ai / NA; return [P.cx + Math.cos(a) * r, altV(r, a), P.cz + Math.sin(a) * r, r]; };
  const tri = (a, b, c) => {
    p0.set(a[0], a[1], a[2]); p1.set(b[0], b[1], b[2]); p2.set(c[0], c[1], c[2]);
    nn.subVectors(p1, p0).cross(V3().subVectors(p2, p0)).normalize(); if (nn.y < 0) { nn.negate(); [b, c] = [c, b]; p1.set(b[0], b[1], b[2]); p2.set(c[0], c[1], c[2]); }
    const luz = 0.86 + 0.2 * Math.max(0, nn.dot(SOL)) - 0.08 * (1 - nn.y), k = corV((a[3] + b[3] + c[3]) / 3).multiplyScalar(luz);
    for (const q of [p0, p1, p2]) { vp.push(q.x, q.y, q.z); vc.push(k.r, k.g, k.b); }
  };
  for (let ri = 0; ri < RAIOS.length - 1; ri++) for (let ai = 0; ai < NA; ai++) {
    const a = ponto(ri, ai), b = ponto(ri, ai + 1), c = ponto(ri + 1, ai), d = ponto(ri + 1, ai + 1);
    if ((ri + ai) % 2) { tri(a, c, b); tri(b, c, d); } else { tri(a, c, d); tri(a, d, b); }
  }
  // os morros do fundo: uma faixa de cumes em bruma, atrás da pintura e mais larga que ela; as bordas da imagem se misturam neles
  {
    const RM = P.r + 14, NM = 70, topo = (a) => y0 + alt * (0.5 + 0.05 * Math.sin(a * 23 + 1.3) + 0.035 * Math.sin(a * 51) + 0.02 * Math.cos(a * 97));
    const C1 = cor('#cdc4cf'), C2 = cor('#ddd8dc'), mp = [], mc = [];
    for (let i = 0; i < NM; i++) {
      const aa = A0 + (A1 - A0) * i / NM, ab = A0 + (A1 - A0) * (i + 1) / NM;
      const xa = P.cx + Math.cos(aa) * RM, za = P.cz + Math.sin(aa) * RM, xb = P.cx + Math.cos(ab) * RM, zb = P.cz + Math.sin(ab) * RM;
      const ta = topo(aa), tb = topo(ab), k1 = (i % 2 ? C1 : C1.clone().lerp(C2, 0.25)), k2 = C2;
      for (const [x, y, z, k] of [[xa, FUNDO, za, k1], [xb, FUNDO, zb, k1], [xa, ta, za, k2], [xb, FUNDO, zb, k1], [xb, tb, zb, k2], [xa, ta, za, k2]]) { mp.push(x, y, z); mc.push(k.r, k.g, k.b); }
    }
    const gm = new THREE.BufferGeometry(); gm.setAttribute('position', new THREE.Float32BufferAttribute(mp, 3)); gm.setAttribute('color', new THREE.Float32BufferAttribute(mc, 3));
    const morros = new THREE.Mesh(gm, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, depthWrite: false, side: THREE.DoubleSide }));
    morros.renderOrder = -2; morros.frustumCulled = false; scene.add(morros);
  }
  const gv = new THREE.BufferGeometry(); gv.setAttribute('position', new THREE.Float32BufferAttribute(vp, 3)); gv.setAttribute('color', new THREE.Float32BufferAttribute(vc, 3));
  const vale = new THREE.Mesh(gv, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false })); vale.name = 'Vale_Cedrom'; vale.frustumCulled = false; scene.add(vale);
}
// aparece (alvo 1) ou some (alvo 0) aos poucos; ao aparecer, sobe um pouco do vale
function panoramaPasso(dt, alvo) {
  PAN.mat.opacity += (alvo - PAN.mat.opacity) * Math.min(1, dt * 0.7);
  PAN.mesh.visible = PAN.mat.opacity > 0.01;
  PAN.mesh.position.y = -10 * (1 - PAN.mat.opacity) ** 2;
}

export { terreno, AMOS, naRota, iCume, TERRENO, PAN, panoramaPasso };
