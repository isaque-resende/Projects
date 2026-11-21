// Betânia: as ovelhas no aprisco.
import * as THREE from 'three';
import { nos, sombra } from '../../limpo-motor/base.js';
import { scene, rnd, ator, passo } from './estado.js';
import { gPast, gOve } from './modelos.js';
import { APRISCO } from './vila.js';
import './lavoura.js';     // só para manter a ordem de montagem

const ovelhas = [];
const APR2 = { x: (APRISCO.x0 + APRISCO.x1) / 2, z: (APRISCO.z0 + APRISCO.z1) / 2 };
{ // comedouro (manjedoura com feno) encostado no fundo, longe da porteira
  const mj = nos(gPast).Manjedoura.clone(); mj.position.set(APR2.x - 1.25, 0, APR2.z - 1.25); mj.rotation.y = Math.PI / 4; mj.scale.setScalar(0.85); sombra(mj); scene.add(mj);
  APR2.mj = { x: APR2.x - 1.25, z: APR2.z - 1.25 };
}
const lugarOvelha = () => { for (let k = 0; k < 60; k++) { const a = rnd() * 6.28, r = 0.5 + rnd() * 1.4, x = APR2.x + Math.cos(a) * r, z = APR2.z + Math.sin(a) * r;
  if (Math.hypot(x - APR2.mj.x, z - APR2.mj.z) < 1.2) continue; if (ovelhas.some((b) => Math.hypot(b.o.position.x - x, b.o.position.z - z) < 1.5)) continue; return [x, z]; } return [APR2.x, APR2.z]; };
for (let i = 0; i < 3; i++) {
  const [x, z] = lugarOvelha();
  const o = ator(gOve, 0.85, x, z, rnd() * 6.28, rnd() < 0.5 ? 'Comer' : 'Parado');
  o.alvo = null; o.espera = rnd() * 4; ovelhas.push(o);
}

// pastam e andam devagar dentro do aprisco
function ovelhasPasso(dt) {
    for (const o of ovelhas) {
      if (o.alvo) {
        const d = new THREE.Vector3().subVectors(o.alvo, o.o.position);
        if (d.length() < 0.1) { o.alvo = null; o.espera = 2 + rnd() * 5; o.toca(rnd() < 0.6 ? 'Comer' : 'Parado'); }
        else {
          d.normalize();
          const frente = o.o.position.clone().addScaledVector(d, 0.3);
          if (ovelhas.some((b) => b !== o && b.o.position.distanceTo(frente) < 1.2)) { o.alvo = null; o.espera = 1 + rnd() * 2; o.toca('Parado'); }
          else { o.o.position.addScaledVector(d, 0.45 * dt); passo(o, 0.45); let k = Math.atan2(d.x, d.z) - o.o.rotation.y; k = Math.atan2(Math.sin(k), Math.cos(k)); o.o.rotation.y += k * Math.min(1, dt * 5); }
        }
      } else if ((o.espera -= dt) <= 0) {
        const [x, z] = lugarOvelha(); o.alvo = new THREE.Vector3(x, 0, z); o.toca('Andar');
      }
    }
}

export { ovelhas, ovelhasPasso };
