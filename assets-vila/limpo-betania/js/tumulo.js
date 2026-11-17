// Betânia: o túmulo de Lázaro. O rochedo com a pedra que rola e a câmara de dentro.
// túmulo de Lázaro: gruta na rocha, fora da vila, à direita; entrada (com a pedra) virada para a vila e a câmera
import * as THREE from 'three';
import { sombra, nos } from '../../limpo-motor/base.js';
import { mapaAltura } from '../../limpo-motor/terreno.js';
import { P, scene, CIRC } from './estado.js';
import { gRocha, gPedra, gRoch, gCamara } from './modelos.js';
import './vila.js';     // só para manter a ordem de montagem

const TUM = {}, ROLA = 1;   // lado para onde a pedra rola (ao longo da face)
{
  // rochedo de 16 m com a porta da gruta (0,9 x 1,7 m) na face +x; a pedra redonda (2 m) é um modelo à parte
  const tum = gRocha.scene, ptu = P('tumulo', -18, -11.5, -0.38); tum.position.set(ptu.x, 0, ptu.z); tum.rotation.y = ptu.r; sombra(tum); scene.add(tum);
  tum.updateMatrixWorld(true);
  TUM.rocha = mapaAltura(tum.getObjectByName('Tumulo_Rocha'));
  const boca = tum.getObjectByName('Tumulo_Boca');
  const pedra = gPedra.scene.getObjectByName('Tumulo_Pedra'); pedra.position.set(0, 0, 0); sombra(pedra);
  const rP = 1.02;
  // a pedra fica de pé na soleira, encostada na face, tapando a porta (o eixo fino do disco aponta para fora da face)
  pedra.position.copy(boca.position).add(new THREE.Vector3(0.3, rP - 0.02, 0)); pedra.rotation.set(0, Math.PI / 2, 0); tum.add(pedra);
  Object.assign(TUM, { tum, pedra, p0: pedra.position.clone(), q0: pedra.quaternion.clone(), k: 0, alvo: 0, raio: rP });
  TUM.circ = { x: 0, z: 0, r: TUM.raio * 0.9 }; CIRC.push(TUM.circ);
  const TOM_ROCHA = new THREE.Color(1.25, 0.86, 0.62);
  { const R2 = nos(gRoch), F2 = new THREE.Vector3(1, 0, 0).applyQuaternion(tum.quaternion).setY(0).normalize(), L2 = new THREE.Vector3(-F2.z, 0, F2.x), P0 = pedra.getWorldPosition(new THREE.Vector3()).setY(0);
    for (const [i, no, df, dl, k0, r0] of [[1, 'Rocha6', 0.2, -2.5, 1.25, 0.4], [2, 'Rocha9', -0.2, -3.7, 1.1, 1.3], [3, 'Rocha3', 0.3, 2.7, 1.15, 2.2]]) {
      const m = R2[no]; if (!m) continue; const n = m.clone(); n.position.set(0, 0, 0);
      const q = P0.clone().addScaledVector(F2, df).addScaledVector(L2, dl), pr = P('rocha_tumulo_' + i, q.x, q.z, r0, k0), p = { x: pr.x, z: pr.z }, k = pr.k;
      n.position.set(p.x, 0.45, p.z); n.rotation.y = pr.r; n.scale.setScalar(k); sombra(n); scene.add(n);
      n.traverse((mm) => { if (mm.isMesh) { mm.material = mm.material.clone(); mm.material.color.multiply(TOM_ROCHA); } }); } }   // tom do rochedo
  TUM.frente = new THREE.Vector3(1, 0, 0).applyQuaternion(tum.quaternion).setY(0).normalize();   // a porta olha para +x do modelo
  TUM.lugar = pedra.getWorldPosition(new THREE.Vector3()).setY(0);
  // (sobra do tempo em que o rochedo ficava transparente na frente do jogador: o material continua preparado para isso)
  tum.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); m.material.transparent = true; m.userData.op = 1; } });
}
// a pedra do túmulo rola de lado, girando sobre si mesma
function pedraPasso(dt) {
    TUM.k += Math.sign(TUM.alvo - TUM.k) * Math.min(Math.abs(TUM.alvo - TUM.k), dt * 0.35);
    {
      const e = TUM.k * TUM.k * (3 - 2 * TUM.k), rolou = 2.2 * e;
      TUM.pedra.position.copy(TUM.p0).add(new THREE.Vector3(ROLA * rolou, 0, 0.12 * Math.sin(Math.PI * e)).applyQuaternion(TUM.q0));
      TUM.pedra.quaternion.copy(TUM.q0).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -ROLA * rolou / TUM.raio));   // gira em torno do próprio eixo (normal da face)
      const pw = TUM.pedra.getWorldPosition(new THREE.Vector3()); TUM.circ.x = pw.x; TUM.circ.z = pw.z;
    }
}

// câmara interna do túmulo: cenário à parte, bem abaixo do chão (a câmera de dentro nunca vê a vila)
const CAMT = { on: false, base: new THREE.Vector3(0, -60, 0), obst: [] };
{
  const g = gCamara.scene;
  // o mapa de alturas só guarda valores acima de zero: mede com a câmara na origem e desloca depois
  g.updateMatrixWorld(true); const alt0 = mapaAltura(g.getObjectByName('Tumulo_Camara'));
  g.position.copy(CAMT.base); sombra(g); scene.add(g); g.updateMatrixWorld(true);
  CAMT.g = g; CAMT.alt = (x, z) => CAMT.base.y + alt0(x - CAMT.base.x, z - CAMT.base.z);
  const b = new THREE.Box3().setFromObject(g); CAMT.box = b;
  // paredes em -x e -z; aberto (cortado) em +x e +z, do lado da câmera; a soleira fica no meio do lado +z
  CAMT.area = { x0: b.min.x + 1.05, x1: b.max.x - 0.55, z0: b.min.z + 1.05, z1: b.max.z - 0.45 };
  CAMT.entrada = new THREE.Vector3((b.min.x + b.max.x) / 2, 0, b.max.z - 0.75);
  CAMT.centro = b.getCenter(new THREE.Vector3()); CAMT.centro.y = b.min.y + 0.7;
  CAMT.luz = new THREE.PointLight(0xffc27a, 0, 14, 1.2); CAMT.luz.position.set(CAMT.entrada.x + 0.9, b.min.y + 2.6, CAMT.entrada.z + 0.9); scene.add(CAMT.luz);
}
CAMT.txt = 'sair do túmulo';

export { TUM, CAMT, pedraPasso };
