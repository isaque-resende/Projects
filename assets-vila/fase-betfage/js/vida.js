// Betfagé: o que os moradores e os animais fazem a cada quadro (fora a ceifa e a eira).
import * as THREE from 'three';
import { frente, lerpAng } from '../../limpo-motor/atores.js';
import { rnd, V3, fala, E } from './estado.js';
import { terreno, ROTA } from './cenario.js';
import { barra, chao, passo } from './gente.js';
import { boiCarro, CARRO } from './ceifa.js';
import { jumenta, CORDA_J, ESTACA, JUM, jumentinho, ovelhas, andante, tMax, tMin, conv1, conv2 } from './aldeia.js';
import { jog } from './jogador.js';
import './caminho.js';     // só para manter a ordem de montagem

let tRota = 0.2, sentido = 1, pausa = 0;
function aldeiaPasso(dt, t) {
  if (!CARRO.anda && rnd() < dt * 0.08) boiCarro.toca(boiCarro.atual === 'Comer' ? 'Parado' : 'Comer');
  if (!E.cine && rnd() < dt * 0.06) jumenta.toca(jumenta.atual === 'Comer' ? 'Parado' : 'Comer');
  if (JUM.solto) CORDA_J.visible = false;      // (na lembrança, desamarrados: cenas.js)
  else { const c = jumenta.o.position.clone().add(V3(0, 0.9, 0)).addScaledVector(frente(jumenta), 0.5); barra(CORDA_J, ESTACA.clone().add(V3(0, 0.95, 0)), c); }
  if (!JUM.visto && !E.cine && jog.o.position.distanceTo(jumenta.o.position) < 3.2) { JUM.visto = true; fala('Uma jumenta amarrada, e um jumentinho com ela, em que ninguém ainda montou.'); setTimeout(() => fala(''), 5000); }
  JUM.anel.position.set(jumenta.o.position.x * 0.6 + jumentinho.o.position.x * 0.4, 0, jumenta.o.position.z * 0.6 + jumentinho.o.position.z * 0.4); JUM.anel.position.y = terreno(JUM.anel.position.x, JUM.anel.position.z) + 0.06;
  JUM.anel.material.opacity = JUM.visto ? Math.max(0, JUM.anel.material.opacity - dt * 0.3) : 0.35 + 0.15 * Math.sin(t * 2.5); JUM.anel.visible = !globalThis.EM_LEMBRANCA;
  for (const o of ovelhas) {
    if (o.alvo) {
      const d = new THREE.Vector3().subVectors(o.alvo, o.o.position).setY(0);
      if (d.length() < 0.1) { o.alvo = null; o.espera = 2 + rnd() * 5; o.toca(rnd() < 0.6 ? 'Comer' : 'Parado'); }
      else {
        d.normalize(); const fr = o.o.position.clone().addScaledVector(d, 0.3);
        if (ovelhas.some((b) => b !== o && b.o.position.distanceTo(fr) < 0.7)) { o.alvo = null; o.espera = 1 + rnd() * 2; o.toca('Parado'); }
        else { o.o.position.addScaledVector(d, 0.4 * dt); passo(o, 0.4); chao(o); lerpAng(o.o, Math.atan2(d.x, d.z), Math.min(1, dt * 5)); }
      }
    } else if ((o.espera -= dt) <= 0) { const a = rnd() * 6.28, r = rnd() * o.area.r; o.alvo = V3(o.area.x + Math.cos(a) * r, 0, o.area.z + Math.sin(a) * r); o.toca('Andar'); }
  }
  if (pausa > 0) { pausa -= dt; andante.toca('Parado'); }
  else if (jog.o.position.distanceTo(andante.o.position) < 1.1) andante.toca('Parado');
  else { passo(andante, 1.0); tRota += sentido * dt * 1.0 / ROTA.getLength(); if (tRota > tMax || tRota < tMin) { tRota = THREE.MathUtils.clamp(tRota, tMin, tMax); sentido *= -1; pausa = 3; } }
  { const pr = ROTA.getPointAt(tRota), tg = ROTA.getTangentAt(tRota).multiplyScalar(sentido), lat = V3(-tg.z, 0, tg.x).multiplyScalar(0.8); andante.o.position.copy(pr).add(lat); chao(andante); lerpAng(andante.o, Math.atan2(tg.x, tg.z), Math.min(1, dt * 5)); }
  if (!E.cine) for (const n of [conv1, conv2]) { const d = jog.o.position.distanceTo(n.o.position); lerpAng(n.o, d < 3.5 ? Math.atan2(jog.o.position.x - n.o.position.x, jog.o.position.z - n.o.position.z) : n.r0, Math.min(1, dt * 3)); }
}

export { aldeiaPasso };
