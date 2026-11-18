// Betânia: o que fica no largo e em volta. Barracas, aprisco com porteira, forno, lagar, lavoura, objetos e a placa.
import * as THREE from 'three';
import { nos, sombra } from '../../limpo-motor/base.js';
import { P, por, EXTRAS, scene, CIRC, POS, tex } from './estado.js';
import { gBarr, gObj, gPast, gForno, gLagar } from './modelos.js';
import './casas.js';     // só para manter a ordem de montagem

const BA = nos(gBarr), OB = nos(gObj);
for (const o of [...Object.values(BA), ...Object.values(OB)]) o.position.set(0, 0, 0);
const APRISCO = {}, FORNO = {}, LAGAR = {};      // medidas que os personagens usam

// ---------- barracas ----------
const B5 = P('barraca_esq', 10.2, -3.4, 0.15), B2 = P('barraca_dir', 17.8, -3.0, -0.2);
por(BA.Barraca5, B5.x, B5.z, B5.r, 1);
por(BA.Barraca2, B2.x, B2.z, B2.r, 1);

// ---------- aprisco ----------
// aprisco: muro circular de pedra com porteira (a porteira abre quando o jogador chega perto)
let APR = null;
function bateAnel(x, z, m) {
  if (!APR) return false;
  const dx = x - APR.x, dz = z - APR.z, d = Math.hypot(dx, dz);
  if (Math.abs(d - APR.rm) > APR.esp / 2 + m) return false;
  let a = Math.atan2(dz, dx) + APR.r; a = Math.atan2(Math.sin(a), Math.cos(a));
  let g = a - APR.gap; g = Math.atan2(Math.sin(g), Math.cos(g));
  if (Math.abs(g) > APR.meia) return true;          // muro
  return APR.ab < 0.9;                              // vão: só passa com a porteira aberta
}
EXTRAS.push(bateAnel);
{
  const { x: AX, z: AZ } = P('aprisco', -13.6, 8.4), K = 2.2, KY = 1.3;
  const muro = nos(gPast).Muro_Curvo.clone(); muro.position.set(0, 0, 0);
  // descobre o vão do anel pelos vértices
  const angs = []; const v = new THREE.Vector3(); let rIn = 1e9, rOut = 0;
  muro.updateMatrixWorld(true);
  muro.traverse((o) => { if (!o.isMesh) return; const pa = o.geometry.attributes.position; for (let i = 0; i < pa.count; i++) { v.fromBufferAttribute(pa, i).applyMatrix4(o.matrixWorld); angs.push(Math.atan2(v.z, v.x)); const r = Math.hypot(v.x, v.z); rOut = Math.max(rOut, r); if (v.y > 0.3) rIn = Math.min(rIn, r); } });
  angs.sort((a, b) => a - b);
  let gMax = 0, gA = 0;
  for (let i = 0; i < angs.length; i++) { const a = angs[i], b = i + 1 < angs.length ? angs[i + 1] : angs[0] + Math.PI * 2; if (b - a > gMax) { gMax = b - a; gA = (a + b) / 2; } }
  const alvoAng = Math.PI / 4;                       // vão virado para a câmera (+x +z)
  const r = gA - alvoAng;
  muro.scale.set(K, KY, K); muro.rotation.y = r; muro.position.set(AX, 0, AZ); sombra(muro); scene.add(muro);
  const rm = (rIn + rOut) / 2 * K;
  APR = { x: AX, z: AZ, r, gap: gA, meia: gMax / 2 + 0.02, rm, esp: (rOut - rIn) * K + 0.1, ab: 0, alvoAb: 0 };
  // porteira atravessada no vão, presa por uma das pontas (dobradiça)
  const port = nos(gPast).Porteira.clone(); port.position.set(0, 0, 0);
  const larg = 2 * rm * Math.sin(gMax / 2) + 0.7, kp = larg / 2.63;
  port.scale.setScalar(kp); sombra(port);
  const phi = alvoAng, c = new THREE.Vector3(AX + Math.cos(phi) * (rm + 0.25), 0, AZ + Math.sin(phi) * (rm + 0.25));
  const tg = new THREE.Vector3(-Math.sin(phi), 0, Math.cos(phi));
  const piv = new THREE.Group(); piv.position.copy(c).addScaledVector(tg, -larg / 2);
  const base = Math.atan2(-tg.z, tg.x);
  piv.rotation.y = base; port.position.set(larg / 2, 0, 0); piv.add(port); scene.add(piv);
  APR.piv = piv; APR.base = base; APR.centroPorta = c;
  Object.assign(APRISCO, { x0: AX - 1.45, x1: AX + 1.45, z0: AZ - 1.45, z1: AZ + 1.45 });
}
function porteiraPasso(dt) {
  APR.alvoAb = 0;   // porteira fechada
  APR.ab += (APR.alvoAb - APR.ab) * Math.min(1, dt * 3); APR.piv.rotation.y = APR.base + APR.ab;
}

// ---------- forno de pão ----------
{
  const F = nos(gForno);
  const base = F.Forno_Corpo.position.clone();
  const forno = new THREE.Group();
  for (const [n, o] of Object.entries(F)) if (n.startsWith('Forno_') && !/Chama|Brasa|Massa_[23]|Pao_/.test(n)) { const c = o.clone(); c.position.sub(base); if (n === 'Forno_Mesa') c.scale.multiply(new THREE.Vector3(1.35, 1, 1.35)); forno.add(c); }
  const pf = P('forno', 1.2, -6.2, 0.4); forno.position.set(pf.x, 0, pf.z); forno.rotation.y = pf.r; sombra(forno); scene.add(forno);
  // brasa e chamas acesas
  for (const n of ['Forno_Brasa', 'Forno_Chamas', 'Forno_ChamaBoca']) if (F[n]) { const c = F[n].clone(); c.position.sub(base); forno.add(c); }
  forno.updateWorldMatrix(true, true);
  for (const n of ['Forno_Boca', 'Forno_Massa_1', 'Forno_Pao_1', 'Forno_Pao_2', 'Forno_Pao_3', 'Forno_Corpo']) {
    const o = forno.children.find((c) => c.name === n || c.name.startsWith(n)); if (!o) continue;
    FORNO[n] = new THREE.Box3().setFromObject(o);
  }
  for (const n of ['NPC_Amassar', 'NPC_Aticar', 'NPC_Assar']) {
    const e = F[n]; const p = e.position.clone().sub(base).applyMatrix4(forno.matrixWorld);
    const q = new THREE.Quaternion().setFromRotationMatrix(forno.matrixWorld).multiply(e.quaternion);
    FORNO[n] = { p, r: new THREE.Euler().setFromQuaternion(q, 'YXZ').y };
  }
}
// lagar de pisar uvas, à frente, entre o aprisco e a lavoura
{
  const L = nos(gLagar), base = L.Lagar_Rocha.position.clone();
  const lagar = new THREE.Group();
  for (const o of Object.values(L)) { const c = o.clone(); c.position.sub(base); lagar.add(c); }
  const pl = P('lagar', -22.0, 11.5, 0.7); lagar.position.set(pl.x, 0, pl.z); lagar.rotation.y = pl.r; sombra(lagar); scene.add(lagar);
  lagar.updateWorldMatrix(true, true);
  const mundo = (n) => L[n].position.clone().sub(base).applyMatrix4(lagar.matrixWorld);
  Object.assign(LAGAR, { tanque: mundo('Lagar_Uvas_6'), cesto: mundo('Lagar_CestoUvas'), jarro: mundo('Lagar_Jarro'), r: lagar.rotation.y });
}

// ---------- lavoura: terra arada à frente-direita ----------
const LAV = POS.lavoura || { x0: 4.4, x1: 15.6, z0: 7.4, z1: 13.4 };
{
  const t = tex('../fase-betania/tex/arada.webp'); t.center.set(0.5, 0.5); t.rotation = Math.PI / 2; t.repeat.set(0.9, 1.6);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(LAV.x1 - LAV.x0, LAV.z1 - LAV.z0), new THREE.MeshStandardMaterial({ map: t, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }));
  m.rotation.x = -Math.PI / 2; m.position.set((LAV.x0 + LAV.x1) / 2, 0.03, (LAV.z0 + LAV.z1) / 2); m.receiveShadow = true; scene.add(m);
}

// objetos junto às casas
for (const [id, no, x, z, r, k] of [['jarro_alto', 'Jarro_Alto', -5.6, -6.6, 0, 1.3], ['pote_escuro', 'Pote_Escuro', -5.0, -6.2, 0, 1.3], ['cesto_alca', 'Cesto_Alca', 9.0, -7.0, 0.4, 1],
  ['lenha', 'Lenha', -1.3, -5.6, 0.3, 1], ['saco', 'Saco', 12.6, -5.6, 0, 1.1], ['banquinho', 'Banquinho', 8.2, -7.0, 1.0, 1]]) { const p = P(id, x, z, r, k); por(OB[no], p.x, p.z, p.r, p.k); }

// placa (só se existir no Blender; apagada lá, some do jogo)
if (!POS.pontos || POS.pontos.placa) {
  const mad = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 1, flatShading: true });
  const pp = P('placa', -28.5, 5.6, 0.5), poste = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 1.9, 6), mad); poste.position.set(pp.x, 0.95, pp.z);
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#8a6a44'; g.fillRect(0, 0, 256, 64); g.fillStyle = '#f6ecd6'; g.font = 'bold 30px serif'; g.textAlign = 'center'; g.fillText('← Betfagé', 128, 43);
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace;
  const placa = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.36, 0.06), [mad, mad, mad, mad, new THREE.MeshStandardMaterial({ map: tx, roughness: 1 }), mad]);
  placa.position.set(pp.x, 1.6, pp.z + 0.02); placa.rotation.y = pp.r;
  sombra(poste); sombra(placa); scene.add(poste, placa); CIRC.push({ x: pp.x, z: pp.z, r: 0.2 });
}

export { FORNO, LAGAR, B5, OB, LAV, APRISCO, porteiraPasso };
