// Betfagé: o cenário que vem do Blender. Terreno, estrada e muros (betfage_cenario.glb)
// e as árvores, pedras e objetos do layout.
// ---------- cenário do Blender: terreno, estrada, muros ----------
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { scene, texChao, LAY, rnd, V3 } from './estado.js';
import { gCen, KIT } from './modelos.js';

const matTerra = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true });
let TERRENO = null;
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Betfage_Terreno')) { o.material = matTerra; TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Betfage_Estrada')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
// terreno e estrada com sombreamento suave e cor misturada entre os vértices (sem faces chapadas)
const amacia = (mesh, verdeia) => { suaviza(mesh, verdeia); mesh.material = mesh.material.clone(); mesh.material.flatShading = false; mesh.material.needsUpdate = true; };
amacia(TERRENO, true);
gCen.scene.traverse((o) => { if (o.isMesh && o.name.startsWith('Betfage_Estrada')) amacia(o, false); });
// texturas pintadas (grama e terra), projetadas de cima pelo mundo; a cor de vértice decide onde é grama e onde é terra
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false);
gCen.scene.traverse((o) => { if (o.isMesh && o.name.startsWith('Betfage_Estrada')) texturizaChao(o, TX, true); });
const terreno = mapaAltura(TERRENO, 0.3, { suave: true });      // altura do chão em qualquer ponto
// matas mais fechadas ao longe: cada árvore distante ganha duas vizinhas
{
  const extra = [];
  for (const o of LAY.objetos) {
    if (!o.f || /Rocha/.test(o.no)) continue;
    for (let i = 0; i < 2; i++) {
      const a = rnd() * 6.28, d = 1.3 + rnd() * 1.1, x = o.p[0] + Math.cos(a) * d, z = o.p[2] + Math.sin(a) * d;
      extra.push({ ...o, p: [x, terreno(x, z) - 0.15, z], r: rnd() * 6.28, k: o.k * (0.8 + rnd() * 0.35) });
    }
  }
  LAY.objetos.push(...extra);
}

// ---------- estrada (do layout) ----------
const ESTR = LAY.estrada.map(([x, z]) => V3(x, 0, z));
const ROTA = new THREE.CatmullRomCurve3(ESTR);
const AMOS = []; { const L = ROTA.getLength(), n = Math.ceil(L * 2); for (let i = 0; i <= n; i++) AMOS.push(ROTA.getPointAt(i / n)); }
const distEstrada = (x, z) => { let m = 1e9; for (const p of AMOS) { const d = Math.hypot(p.x - x, p.z - z); if (d < m) m = d; } return m; };
const naEstrada = (x, z, m = 0) => distEstrada(x, z) < LAY.meia + m;

// ---------- objetos do layout (árvores, pedras, eira, feixes, cestos...) ----------
const CONSTR = [];       // construções com pisos e paredes (a ínsula e a casa avulsa)
const FORNO = {};        // forno de barro (tabun): fogo dentro, fumaça pela boca de cima; pães na mesa ao lado
instanciaLonge(scene, LAY.objetos, KIT);
poePertos(scene, LAY.objetos, KIT, (o, n) => {
  if (/^Casa(2|_Sobrado|_Alcapao|_Varal)$/.test(o.no)) { n.userData.casa = true; CONSTR.push(n); }
  if (o.no === 'Cocho') { if (Math.hypot(o.p[0] - LAY.manjedoura[0], o.p[2] - LAY.manjedoura[2]) < 1) FORNO.manj = n; else FORNO.bebe = n; }
  if (o.no === 'Peneira_Graos') FORNO.eira = n;
  if (o.no === 'Forno_Barro') FORNO.o = n, FORNO.r = o.r;
  if (o.no === 'Bancada') FORNO.mesa = n;
});

export { CONSTR, terreno, FORNO, AMOS, naEstrada, ROTA, TERRENO };
