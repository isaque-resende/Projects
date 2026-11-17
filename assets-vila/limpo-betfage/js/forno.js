// Betfagé: o forno de barro (fogo e fumaça), o comedouro, o bebedouro e os pães na mesa.
// ---------- forno: chamas pela boca de cima, brasa, luz que tremula e fumaça subindo ----------
import * as THREE from 'three';
import { V3, scene, rnd } from './estado.js';
import { FORNO } from './cenario.js';
import { KT } from './trigal.js';
import './plantas.js';     // só para manter a ordem de montagem

if (FORNO.o) {
  const p = FORNO.o.position, r = FORNO.r, lx = -0.547, lz = -0.087;           // boca do tabun no modelo
  const boca = V3(p.x + lx * Math.cos(r) + lz * Math.sin(r), p.y + 1.12, p.z - lx * Math.sin(r) + lz * Math.cos(r));
  FORNO.boca = boca;
  const brasa = new THREE.Mesh(new THREE.CircleGeometry(0.27, 10), new THREE.MeshBasicMaterial({ color: 0xff5a14 }));
  brasa.rotation.x = -Math.PI / 2; brasa.position.copy(boca).add(V3(0, -0.06, 0)); scene.add(brasa);
  FORNO.chamas = [];
  const corC = [0xffd25a, 0xff9a2e, 0xff6a1a];
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(new THREE.ConeGeometry(0.07 + (i % 2) * 0.03, 0.34, 5), new THREE.MeshBasicMaterial({ color: corC[i % 3], transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
    const a = i / 5 * 6.28, d = i ? 0.12 : 0; m.userData = { x: Math.cos(a) * d, z: Math.sin(a) * d, f: rnd() * 6 };
    scene.add(m); FORNO.chamas.push(m);
  }
  FORNO.luz = new THREE.PointLight(0xff8a3a, 2.2, 5, 1.6); FORNO.luz.position.copy(boca).add(V3(0, 0.3, 0)); scene.add(FORNO.luz);
  FORNO.fumaca = [];
  const matF = new THREE.MeshStandardMaterial({ color: 0xd8d2c8, roughness: 1, transparent: true, opacity: 0.5, depthWrite: false, flatShading: true });
  for (let i = 0; i < 16; i++) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 0), matF.clone()); m.userData = { t: i / 16 * 4.0 }; scene.add(m); FORNO.fumaca.push(m); }
}
function fornoPasso(dt, t) {
  if (!FORNO.o) return;
  const b = FORNO.boca;
  FORNO.chamas.forEach((m, i) => { const u = m.userData, s = 0.75 + 0.35 * Math.sin(t * 9 + u.f) + 0.15 * Math.sin(t * 23 + i); m.scale.set(1, s, 1); m.position.set(b.x + u.x, b.y + 0.1 * s - 0.02, b.z + u.z); m.rotation.y = t * 2 + i; });
  FORNO.luz.intensity = 1.8 + 0.6 * Math.sin(t * 11) + 0.3 * Math.sin(t * 27);
  for (const m of FORNO.fumaca) {
    const u = m.userData; u.t = (u.t + dt) % 4.0; const k = u.t / 4.0;
    m.position.set(b.x + Math.sin(u.t * 1.3 + m.id) * 0.12 + k * 0.9, b.y + 0.25 + k * 3.2, b.z + Math.cos(u.t * 1.1 + m.id) * 0.12 - k * 0.6);
    m.scale.setScalar(0.6 + k * 2.6); m.material.opacity = 0.5 * Math.min(1, u.t * 3) * (1 - k); m.rotation.set(u.t, u.t * 0.7, 0);
  }
}
// comedouro (palha com espigas) e bebedouro (água): acha o fundo do cocho por raios e põe o enchimento na boca
function enche(obj, cor, espigas) {
  obj.updateMatrixWorld(true);
  const bx = new THREE.Box3().setFromObject(obj), rc = new THREE.Raycaster(), dentro = [];
  for (let i = 0; i < 160; i++) {
    const x = bx.min.x + rnd() * (bx.max.x - bx.min.x), z = bx.min.z + rnd() * (bx.max.z - bx.min.z);
    rc.set(V3(x, bx.max.y + 1, z), V3(0, -1, 0)); const h = rc.intersectObject(obj, true)[0];
    if (h && h.point.y < bx.max.y - 0.12 && h.point.y > bx.min.y + 0.05) dentro.push(h.point);
  }
  if (dentro.length < 6) return;
  const c = dentro.reduce((a, p) => a.add(p), V3(0, 0, 0)).multiplyScalar(1 / dentro.length);
  // elipse que cabe nos pontos de dentro (eixos do próprio cocho)
  const ry = obj.rotation.y, ux = V3(Math.cos(ry), 0, -Math.sin(ry)), uz = V3(Math.sin(ry), 0, Math.cos(ry));
  let ax = 0, az = 0; for (const p of dentro) { const d = p.clone().sub(c); ax = Math.max(ax, Math.abs(d.dot(ux))); az = Math.max(az, Math.abs(d.dot(uz))); }
  const y = bx.max.y - 0.1;
  const tampa = new THREE.Mesh(new THREE.CircleGeometry(1, 16), new THREE.MeshStandardMaterial({ color: cor, roughness: espigas ? 1 : 0.35, flatShading: true }));
  tampa.rotation.set(-Math.PI / 2, 0, ry); tampa.scale.set(ax * 0.98, az * 0.98, 1); tampa.position.set(c.x, y, c.z); tampa.receiveShadow = true; scene.add(tampa);
  if (espigas && KT.Trigo_Maduro) {
    const n = 10, inst = new THREE.InstancedMesh(KT.Trigo_Maduro.geometry, KT.Trigo_Maduro.material, n), m4 = new THREE.Matrix4(), q = new THREE.Quaternion();
    for (let i = 0; i < n; i++) { const p = c.clone().addScaledVector(ux, (rnd() - 0.5) * ax * 1.4).addScaledVector(uz, (rnd() - 0.5) * az * 1.2); q.setFromEuler(new THREE.Euler(Math.PI / 2 - 0.25, ry + (rnd() - 0.5) * 0.6, 0)); inst.setMatrixAt(i, m4.compose(V3(p.x, y - 0.02, p.z), q, V3(0.3, 0.32, 0.3))); }
    inst.castShadow = true; scene.add(inst);
  }
}
if (FORNO.manj) enche(FORNO.manj, 0xd8b45c, true);
if (FORNO.bebe) enche(FORNO.bebe, 0x4f7f86, false);
// pães (pita) na mesa ao lado do forno: põe sobre o tampo achado por raio de cima
if (FORNO.mesa) {
  FORNO.mesa.updateMatrixWorld(true);
  const cx = new THREE.Box3().setFromObject(FORNO.mesa), rc = new THREE.Raycaster(), mat = new THREE.MeshStandardMaterial({ color: 0xc98a48, roughness: 1, flatShading: true });
  const geo = new THREE.CylinderGeometry(0.14, 0.15, 0.035, 9);
  let n = 0;
  for (let i = 0; i < 40 && n < 7; i++) {
    const x = cx.min.x + 0.2 + rnd() * (cx.max.x - cx.min.x - 0.4), z = cx.min.z + 0.2 + rnd() * (cx.max.z - cx.min.z - 0.4);
    rc.set(V3(x, cx.max.y + 1, z), V3(0, -1, 0)); const h = rc.intersectObject(FORNO.mesa, true)[0];
    if (!h || h.point.y < cx.min.y + 0.55 || h.point.y > cx.min.y + 1.0) continue;
    const pao = new THREE.Mesh(geo, mat); pao.position.set(x, h.point.y + 0.02, z); pao.rotation.set((rnd() - 0.5) * 0.15, rnd() * 3, (rnd() - 0.5) * 0.15); pao.castShadow = true; scene.add(pao); n++;
  }
}

export { fornoPasso };
