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
import { carregarKit, casaCidade, materialAlvenaria } from '../../casas/construtor_casas.js?v=99d5c594';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

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

// ---------- as casas: as da frente montadas com o kit de Betânia antiga; as do fundo (blocos do Blender) pintadas com
// o mesmo material de parede (reboco com base de pedra, pelo mundo) e de terraço ----------
const KITC = await carregarKit('../casas/casas_kit.glb', '../casas/tex/');
// cópia de material que mantém o shader (o clone do three não leva o onBeforeCompile): cada casa some sozinha quando tapa a vista
const copiaM = (m) => { const c = m.clone(); c.onBeforeCompile = m.onBeforeCompile; c.customProgramCacheKey = m.customProgramCacheKey; return c; };
const hash = (a, b) => { const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return s - Math.floor(s); };
{
  const alv = materialAlvenaria(KITC, 0), P = V3();
  gCen.scene.updateMatrixWorld(true);
  gCen.scene.traverse((o) => {
    if (!o.isMesh || !/^Bloco_/.test(o.name)) return;
    const mn = o.material.name || '';
    if (/terraco/.test(mn)) { o.material = copiaM(KITC.materiais.Casa_Teto); return; }
    if (!/reboco/.test(mn)) return;
    const g = o.geometry, pos = g.attributes.position, n = pos.count, par = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      P.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
      par[i * 3] = 0.82 + 0.18 * hash(Math.floor(P.x / 6), Math.floor(P.z / 6)); par[i * 3 + 1] = 0; par[i * 3 + 2] = terreno(P.x, P.z) + 0.55;
    }
    g.setAttribute('parede', new THREE.BufferAttribute(par, 3)); g.setAttribute('aCodigo', new THREE.BufferAttribute(new Float32Array(n), 1));
    o.material = copiaM(alv);
  });
  // os ~170 blocos viram poucos objetos (um por material; os que somem na frente da câmera, um por retângulo):
  // cada objeto é uma chamada de desenho, e no celular isso pesava mais que os triângulos
  const grupos = new Map(), ocl = new Map(OCL.map((t) => [t.o, t]));
  gCen.scene.traverse((o) => {
    if (!o.isMesh || !/^Bloco_/.test(o.name)) return;
    const t = ocl.get(o), tipo = o.material.customProgramCacheKey ? o.material.customProgramCacheKey() : o.material.name;
    const k = (t ? JSON.stringify(t.r) : 'fundo') + '|' + tipo + '|' + Object.keys(o.geometry.attributes).sort().join(',') + '|' + !!o.geometry.index;
    if (!grupos.has(k)) grupos.set(k, { t, l: [] }); grupos.get(k).l.push(o);
  });
  for (const { t, l } of grupos.values()) {
    if (l.length < 2) continue;
    const g = mergeGeometries(l.map((o) => o.geometry.clone().applyMatrix4(o.matrixWorld)), false);
    if (!g) continue;
    const m = new THREE.Mesh(g, l[0].material); m.name = l[0].name + '_junto'; m.castShadow = m.receiveShadow = true;
    for (const o of l) { o.parent.remove(o); const i = OCL.findIndex((x) => x.o === o); if (i >= 0) OCL.splice(i, 1); }
    scene.add(m); if (t) OCL.push({ o: m, r: t.r, op: 1 });
  }
}
function caixaPedra(x0, x1, y0, y1, z0, z1, mat) {
  const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0).toNonIndexed(); g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  const n = g.attributes.position.count;
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3).fill(0.92), 3));
  g.setAttribute('parede', new THREE.BufferAttribute(new Float32Array(n * 3).fill(99), 3));
  g.setAttribute('aCodigo', new THREE.BufferAttribute(new Float32Array(n).fill(2), 1));
  const m = new THREE.Mesh(g, mat); m.castShadow = m.receiveShadow = true; return m;
}
const CASAS_KIT = [];
for (const l of LAY.lotes || []) {
  const g = casaCidade(KITC, l.s, l.w, l.d, l.y), th = l.giro, c = Math.cos(th), s = Math.sin(th);
  const [cx, cz] = l.c;
  // degraus da porta até a rua, se o piso ficou acima do chão (a porta: lado +z do lote, no meio da folha)
  const pv = g.userData.portas[0];
  const mat = g.children[0].children.find((m) => m.geometry.attributes.parede)?.material || materialAlvenaria(KITC, l.y);
  const dy = l.y - l.yp;
  if (pv && dy > 0.12) {
    const px = pv.position.x + 0.45, ne = Math.ceil(dy / 0.2);
    for (let j = 0; j < ne; j++) g.add(caixaPedra(px - 0.8, px + 0.8, l.yp - l.y - 0.3, -(j + 1) * dy / (ne + 1), l.d + j * 0.33, l.d + (j + 1) * 0.33, mat));
  }
  // base de pedra embaixo, onde o chão desce
  const lx = Math.abs(l.w * c) + Math.abs(l.d * s), lz = Math.abs(l.w * s) + Math.abs(l.d * c);
  let ymin = l.y; for (const sx of [-1, 0, 1]) for (const sz of [-1, 0, 1]) ymin = Math.min(ymin, terreno(cx + sx * lx / 2, cz + sz * lz / 2));
  if (ymin < l.y - 0.02) g.add(caixaPedra(0.02, l.w - 0.02, ymin - l.y - 0.3, 0.0, 0.02, l.d - 0.02, mat));
  g.rotation.y = th;
  g.position.set(cx - (l.w / 2 * c + l.d / 2 * s), l.y, cz - (-l.w / 2 * s + l.d / 2 * c));
  scene.add(g); CASAS_KIT.push(g);
  const r = [cx - lx / 2, cx + lx / 2, cz - lz / 2, cz + lz / 2, l.y + 0.3, l.y + g.userData.andares * 2.8 + 1.2];
  const mm = new Map(); g.traverse((m) => { if (!m.isMesh) return; if (!mm.has(m.material)) mm.set(m.material, copiaM(m.material)); m.material = mm.get(m.material); OCL.push({ o: m, r, op: 1 }); });
}

// ---------- Jerusalém em volta ----------
const [MX, MY, MZ] = LAY.mundo;
const JER = gJer.scene; JER.name = 'Jerusalem'; JER.position.set(-MX, -MY, -MZ);
{
  const [X0, X1, Z0, Z1] = LAY.terreno;
  const tira = [];
  JER.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    if (!o.geometry.attributes.normal) o.geometry.computeVertexNormals();      // sem normal, o normalBias da sombra não age e a sombra serrilha (janelas do palácio)
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
