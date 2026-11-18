// Betânia: o pisador de uvas no lagar e a venda na barraca.
// ---------- pisador: só pisa as uvas, levantando um pé de cada vez, mãos na cintura ----------
import * as THREE from 'three';
import { lerpAng, frente, pos, pernas, inclina, maos } from '../../limpo-motor/atores.js';
import { corpo, scene } from './estado.js';
import { pisador, LG, vendedor, lenco } from './personagens.js';
import './forno.js';     // só para manter a ordem de montagem

corpo(pisador); pisador.toca('Parado');
function pisadorPasso(dt, t) {
  const st = pisador, o = st.o;
  lerpAng(o, LG.r + Math.sin(t * 0.3) * 0.5, 1);
  o.position.y = LG.tanque.y - 0.05 - Math.abs(Math.sin(t * 3.4)) * 0.03;
  o.updateMatrixWorld(true);
  const f = frente(st);
  const ch = o.position.y + 0.06;
  const pE = pos(st.os.pE[2]), pD = pos(st.os.pD[2]);
  const sE = Math.max(0, Math.sin(t * 3.4)), sD = Math.max(0, Math.sin(t * 3.4 + Math.PI));
  pE.y = ch + sE * 0.28; pE.addScaledVector(f, sE * 0.08); pD.y = ch + sD * 0.28; pD.addScaledVector(f, sD * 0.08);
  pernas(st, pE, pD);
  inclina(st, 0.12);
  const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize(), cint = pos(st.os.pelvis).add(new THREE.Vector3(0, 0.12, 0));
  maos(st, cint.clone().addScaledVector(lado, 0.2).addScaledVector(f, 0.02), cint.clone().addScaledVector(lado, -0.2).addScaledVector(f, 0.02), dt, 1, 20);
}

// o vendedor fala, pega um produto no balcão e entrega; a freguesa estende a mão e recebe
const PROD = new THREE.Mesh(new THREE.SphereGeometry(0.08, 7, 5), new THREE.MeshStandardMaterial({ color: 0xa63d2a, roughness: 1, flatShading: true }));
PROD.castShadow = true; PROD.visible = false; scene.add(PROD);
function barracaPasso(dt, t) {
  const c = t % 9, fv = frente(vendedor), fl = frente(lenco);
  const meio = vendedor.o.position.clone().lerp(lenco.o.position, 0.5).setY(1.05);
  const balcao = vendedor.o.position.clone().addScaledVector(fv, 0.45).setY(0.92);
  const ombroV = pos(vendedor.os.bD[0]), ombroL = pos(lenco.os.bD[0]);
  let aV = null, aL = null;
  if (c < 3.5) vendedor.toca('Conversando');
  else {
    vendedor.toca('Parado');
    if (c < 5) aV = balcao;
    else if (c < 7.2) aV = meio.clone().addScaledVector(fv, -0.05);
    else aV = null;
  }
  if (c > 5.3 && c < 7.6) aL = meio.clone().addScaledVector(fl, -0.02);
  PROD.visible = c > 4.4 && c < 8.6;
  if (PROD.visible) PROD.position.copy(pos(c < 7.0 ? vendedor.os.bD[2] : lenco.os.bD[2]));
  maos(vendedor, pos(vendedor.os.bE[2]), aV || pos(vendedor.os.bD[2]), dt, aV ? 1 : 0, 6);
  // só o braço direito: a esquerda segue o clipe
  if (vendedor.pesoB > 0.01) { vendedor.os.bE[0].updateMatrixWorld(true); }
  lenco.toca('Parado');
  maos(lenco, pos(lenco.os.bE[2]), aL || pos(lenco.os.bD[2]), dt, aL ? 1 : 0, 5);
}

export { pisadorPasso, barracaPasso };
