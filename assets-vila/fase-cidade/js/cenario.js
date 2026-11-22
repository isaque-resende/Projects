// Cidade alta: o cenário que vem do Blender (o chão com as ruas e as praças, os quarteirões de casas, o Xisto, o
// Pavimento, a casa do sumo sacerdote e a do cenáculo), as barracas e os objetos do layout e a maquete de Jerusalém: o
// muro com a Porta de Genat, o palácio de Herodes com as torres, o viaduto e o templo são os dela; as casas, as árvores
// e as estradas dela que caem em cima do chão daqui saem.
// Muros e tetos que tapam a vista da câmera ficam quase transparentes (OCLUSORES).
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura } from '../../limpo-motor/terreno.js';
import { scene, LAY, V3 } from './estado.js';
import { gCen, gJer, KIT } from './modelos.js';

// ---------- o cenário ----------
let CHAO = null;
const OCL = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Cidade_Chao_Fase')) { CHAO = o; o.receiveShadow = true; return; }
  if (o.name.startsWith('Cidade_Ruas')) { o.material = o.material.clone(); Object.assign(o.material, { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }); o.receiveShadow = true; return; }
  o.castShadow = true; o.receiveShadow = true;
  const k = Object.keys(LAY.oclusores).find((n) => o.name === n || o.name.startsWith(n + '_') || o.name.startsWith(n + '.'));
  if (k) { o.material = o.material.clone(); OCL.push({ o, r: LAY.oclusores[k], op: 1 }); }
});
scene.add(gCen.scene);
suaviza(CHAO, false);
// o chão desce abaixo de zero (rumo ao vale): o mapa "suave" guarda alturas negativas; o outro cortava no zero e o
// jogador andava no ar. Em cima, o Pavimento (Gabatá), que é mais alto que o chão e tem a escada.
const terreno0 = mapaAltura(CHAO, 0.35, { suave: true });
const GAB = []; gCen.scene.traverse((o) => { if (o.isMesh && /^Gabata/.test(o.name)) GAB.push(o); });
const gabB = new THREE.Box3(); GAB.forEach((m) => gabB.expandByObject(m));
const gabH = GAB.map((m) => mapaAltura(m, 0.2, { caixa: null }));
const terreno = (x, z) => {
  let y = terreno0(x, z);
  if (GAB.length && x > gabB.min.x && x < gabB.max.x && z > gabB.min.z && z < gabB.max.z) for (const f of gabH) { const g = f(x, z); if (g > y) y = g; }
  return y;
};

// ---------- Jerusalém em volta ----------
const [MX, MY, MZ] = LAY.mundo;
const JER = gJer.scene; JER.name = 'Jerusalem'; JER.position.set(-MX, -MY, -MZ);
{
  const [X0, X1, Z0, Z1] = LAY.terreno;
  const tira = [];
  JER.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    if (!/^(Casas_Cidade|Arvores|Estradas|Cidade_Chao|Vale_Chao|Leste_Chao|Vale_Miolo)/.test(o.name)) return;
    const g = o.geometry; if (!g.index) { const n = g.attributes.position.count; g.setIndex([...Array(n).keys()]); }
    const pos = g.attributes.position, I = g.index.array, novo = [];
    const dentro = (x, z) => x > X0 + 2 && x < X1 - 2 && z > Z0 + 2 && z < Z1 - 2;
    for (let t = 0; t < I.length; t += 3) {
      const cx = (pos.getX(I[t]) + pos.getX(I[t + 1]) + pos.getX(I[t + 2])) / 3 - MX, cz = (pos.getZ(I[t]) + pos.getZ(I[t + 1]) + pos.getZ(I[t + 2])) / 3 - MZ;
      if (!dentro(cx, cz)) novo.push(I[t], I[t + 1], I[t + 2]);
    }
    g.setIndex(novo);
    if (/^(Vale_Chao|Vale_Miolo|Leste_Chao|Cidade_Chao)/.test(o.name)) o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 });
  });
  for (const o of tira) o.removeFromParent();
}
scene.add(JER);

// ---------- as barracas e os objetos do layout ----------
instanciaLonge(scene, LAY.objetos, KIT);
const PRONTAS = new Set(['Casa2', 'Casa_Sobrado', 'Casa_Cottage', 'CasaIA_export', 'Casa_Alcapao', 'Casa_Varal']);
poePertos(scene, LAY.objetos, KIT, (o, n) => {
  if (!PRONTAS.has(o.no)) return;
  const b = new THREE.Box3().setFromObject(n), r = [b.min.x, b.max.x, b.min.z, b.max.z, b.min.y + 0.3, b.max.y];
  n.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); m.castShadow = m.receiveShadow = true; OCL.push({ o: m, r, op: 1 }); } });
});

// ---------- muros e tetos que tapam a vista: quase transparentes ----------
function oclusoresPasso(p, dt, cam) {
  const h = V3(p.x, p.y + 1.2, p.z);
  for (const t of OCL) {
    const [x0, x1, z0, z1, y0, y1] = t.r; let tapa = false;
    const n = cam ? Math.min(90, Math.ceil(h.distanceTo(cam) / 0.8)) : 0;      // de 0,8 em 0,8 m: não pula muro fino
    for (let k = 1; k < n && !tapa; k++) {
      const f = k / n, x = h.x + (cam.x - h.x) * f, y = h.y + (cam.y - h.y) * f, z = h.z + (cam.z - h.z) * f;
      tapa = x > x0 - 0.3 && x < x1 + 0.3 && z > z0 - 0.3 && z < z1 + 0.3 && y > y0 && y < y1 + 0.3;
    }
    if (!tapa && y0 > p.y + 1.5 && p.x > x0 && p.x < x1 && p.z > z0 && p.z < z1) tapa = true;      // debaixo de um teto
    const alvo = tapa ? 0.1 : 1; if (Math.abs(alvo - t.op) < 0.005) continue;
    t.op += (alvo - t.op) * Math.min(1, dt * 6); if (Math.abs(alvo - t.op) < 0.01) t.op = alvo;
    const tr = t.op < 0.999, m = t.o.material;
    if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } m.opacity = t.op; t.o.castShadow = !tr;
  }
}

const SOL_DIR = V3(0.9, 0.42, 0.14).normalize();
export { terreno, CHAO, SOL_DIR, JER, OCL, oclusoresPasso };
