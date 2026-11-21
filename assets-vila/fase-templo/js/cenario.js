// Templo: o cenário que vem do Blender (o chão de lajes com os níveis dos pátios, a plataforma, as colunas e os tetos
// dos pórticos, a Antônia, a balaustrada, os muros e as portas dos pátios de dentro, o altar, a pia e o santuário, o
// mercado), as nove barracas e os objetos do layout, a fumaça do altar e a maquete de Jerusalém em volta: o templo
// dela sai (este é maior), e também o que cai em cima da esplanada daqui.
// Muros e tetos que tapam a vista da câmera ficam quase transparentes (OCLUSORES).
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura } from '../../limpo-motor/terreno.js';
import { scene, LAY, V3 } from './estado.js';
import { gCen, gJer, KIT } from './modelos.js';

// ---------- o cenário ----------
let CHAO = null;
const OCL = [];
const FOGO = [];        // as línguas e os cartões do fogo do altar (sobem, balançam, mudam de altura)
const AGUA = [];        // o material da água da pia: a textura corre devagar
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Templo_Chao')) { CHAO = o; o.receiveShadow = true; return; }        // as lajes (textura) vezes a cor de vértice
  if (o.name.startsWith('Altar_Fogo') || o.name.startsWith('Altar_Brasas')) {               // o fogo não recebe luz nem faz sombra
    o.material = new THREE.MeshBasicMaterial({ vertexColors: true }); o.castShadow = o.receiveShadow = false;
    if (o.name.startsWith('Altar_Fogo')) FOGO.push({ o, f: Math.random() * 6.28 });
    return;
  }
  if (o.name.startsWith('Altar_Chama')) {
    o.material = new THREE.MeshBasicMaterial({ map: o.material.map, alphaTest: 0.5, side: THREE.DoubleSide }); o.castShadow = o.receiveShadow = false;
    FOGO.push({ o, f: Math.random() * 6.28 }); return;
  }
  if (o.material && o.material.name === 'Templo_agua') { AGUA.push(o.material); o.castShadow = false; o.receiveShadow = true; return; }   // a água da pia
  o.castShadow = true; o.receiveShadow = true;
  const k = Object.keys(LAY.oclusores).find((n) => o.name === n || o.name.startsWith(n + '_') || o.name.startsWith(n + '.'));
  if (k) { o.material = o.material.clone(); OCL.push({ o, r: LAY.oclusores[k], op: 1 }); }
});
scene.add(gCen.scene);
suaviza(CHAO, false);
const terreno = mapaAltura(CHAO, 0.35, { suave: false });

// ---------- Jerusalém em volta ----------
const [MX, MY, MZ] = LAY.mundo;
const JER = gJer.scene; JER.name = 'Jerusalem'; JER.position.set(-MX, -MY, -MZ);
{
  const [X0, X1, Z0, Z1] = LAY.terreno, M = 6;
  const tira = [];
  JER.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    if (/^(Templo_Muros|Santuario|Porticos|Mercado_Templo|Fortaleza_Antonia|Tanques|Muro_Cidade|Golgota)/.test(o.name)) { tira.push(o); return; }
    const g = o.geometry; if (!g.index) { const n = g.attributes.position.count; g.setIndex([...Array(n).keys()]); }
    const pos = g.attributes.position, I = g.index.array, novo = [];
    const dentro = (x, z) => x > X0 - M && x < X1 + M && z > Z0 - M && z < Z1 + M;
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
poePertos(scene, LAY.objetos, KIT, () => {});

// ---------- a fumaça do altar: o holocausto contínuo, de manhã e à tarde (Êx 29.38-42) ----------
const FUMACA = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30); gr.addColorStop(0, 'rgba(235,232,226,0.9)'); gr.addColorStop(0.6, 'rgba(210,206,200,0.45)'); gr.addColorStop(1, 'rgba(200,196,190,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const [ax, ay, az] = LAY.altar, N = 22, P = [];
  for (let i = 0; i < N; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, opacity: 0 }));
    s.userData.t = i / N; s.userData.dx = (Math.random() - 0.5) * 1.2; s.userData.dz = (Math.random() - 0.5) * 1.2; scene.add(s); P.push(s);
  }
  const VENTO = V3(-0.35, 0, 0.12);         // a brisa da manhã leva a fumaça para oeste
  let T = 0;
  return (dt) => {
    T += dt;
    for (const m of AGUA) if (m.map) { m.map.offset.set(Math.sin(T * 0.15) * 0.04 + T * 0.006, Math.cos(T * 0.12) * 0.03); }
    for (const { o, f } of FOGO) {          // cada língua de fogo sobe e desce no seu ritmo, e balança um pouco
      const s = 1 + 0.16 * Math.sin(T * 5.3 + f) + 0.07 * Math.sin(T * 11.7 + f * 2.1);
      o.scale.set(1 + 0.08 * Math.sin(T * 7.1 + f), s, 1 + 0.08 * Math.cos(T * 6.3 + f));
      o.rotation.z = 0.07 * Math.sin(T * 3.1 + f); o.rotation.x = 0.05 * Math.cos(T * 2.7 + f);
    }
    for (const s of P) {
      const u = (s.userData.t = (s.userData.t + dt / 9) % 1);
      const sobe = u * 14, larg = 0.8 + u * 4.5;
      s.position.set(ax + s.userData.dx + VENTO.x * sobe * 1.4, ay + 0.4 + sobe, az + s.userData.dz + VENTO.z * sobe * 1.4);
      s.scale.setScalar(larg); s.material.opacity = 0.55 * Math.sin(Math.PI * u) * (u < 0.08 ? u / 0.08 : 1);
    }
  };
})();
// a brasa: uma luz quente sobre o altar
const BRASA = new THREE.PointLight(0xff9a4a, 6, 10, 1.6); BRASA.position.set(LAY.altar[0], LAY.altar[1] + 0.8, LAY.altar[2]); scene.add(BRASA);

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
export { terreno, CHAO, SOL_DIR, JER, FUMACA, OCL, oclusoresPasso };
