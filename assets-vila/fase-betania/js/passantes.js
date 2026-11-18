// Betânia: o passante que dá voltas pela estrada, e os moradores que olham para o jogador.
// passante: dá voltas pela estrada
import * as THREE from 'three';
import { andante, marta, lazaro, cleopas } from './personagens.js';
import { jog } from './jogador.js';

const rota = new THREE.CatmullRomCurve3([[-18, 2.9], [-10, 2.4], [-2, 1.1], [6, 0.7], [12, 1.3]].map(([x, z]) => new THREE.Vector3(x, 0, z)));
let tRota = 0, sentido = 1, pausa = 0;
function passantePasso(dt) {
    if (pausa > 0) { pausa -= dt; andante.toca('Parado'); }
    else if (jog.o.position.distanceTo(andante.o.position) < 1.1) andante.toca('Parado');   // espera o jogador sair da frente
    else {
      andante.toca('Andar');
      tRota += sentido * dt * 1.15 / rota.getLength();
      if (tRota > 1 || tRota < 0) { tRota = THREE.MathUtils.clamp(tRota, 0, 1); sentido *= -1; pausa = 2.5; }
    }
    {
      const pr = rota.getPointAt(tRota), tg = rota.getTangentAt(tRota).multiplyScalar(sentido);
      andante.o.position.copy(pr);
      let k = Math.atan2(tg.x, tg.z) - andante.o.rotation.y; k = Math.atan2(Math.sin(k), Math.cos(k)); andante.o.rotation.y += k * Math.min(1, dt * 5);
    }
}

// Marta, Lázaro e Cléopas olham para o jogador quando ele chega perto
function olharPasso(dt) {
    for (const n of [marta, lazaro, cleopas]) {
      const d = jog.o.position.distanceTo(n.o.position);
      const a = d < 4 ? Math.atan2(jog.o.position.x - n.o.position.x, jog.o.position.z - n.o.position.z) : n.r0;
      let k = a - n.o.rotation.y; k = Math.atan2(Math.sin(k), Math.cos(k)); n.o.rotation.y += k * Math.min(1, dt * 3);
    }
}

export { passantePasso, olharPasso };
