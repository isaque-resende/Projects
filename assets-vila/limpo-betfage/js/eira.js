// Betfagé: a eira. Dois trabalhadores jogam a palha para o alto com o garfo, e o grão cai.
import * as THREE from 'three';
import { frente, pos, CIMA, inclina, maos } from '../../limpo-motor/atores.js';
import { LAY, V3, scene, CIRC, sm, rnd } from './estado.js';
import { nRobusto, nBotoes } from './modelos.js';
import { FORNO } from './cenario.js';
import { corpo, ator, cil, barra, solta } from './gente.js';
import { CARRO } from './ceifa.js';     // os feixes que a carroça traz engordam o monte

const EI = LAY.eira, EIRA_Y = (() => { if (!FORNO.eira) return EI.y; FORNO.eira.updateMatrixWorld(true); const rc = new THREE.Raycaster(V3(EI.x + 0.6, EI.y + 5, EI.z + 0.6), V3(0, -1, 0)); const h = rc.intersectObject(FORNO.eira, true)[0]; return h ? h.point.y - 0.03 : EI.y; })();
const MONTE = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xe2c27e, roughness: 1, flatShading: true }));
MONTE.position.set(EI.x + 0.3, EIRA_Y + 0.05, EI.z - 0.2); MONTE.scale.set(1.0, 0.28, 0.85); MONTE.receiveShadow = MONTE.castShadow = true; scene.add(MONTE);
const debulhador = corpo(ator(nRobusto, 1.72, EI.x - 0.8, EI.z + 0.8, 0, 'Parado'));
const joeiradeira = corpo(ator(nBotoes, 1.6, EI.x + 1.5, EI.z + 0.6, 0, 'Parado'));
for (const n of [debulhador, joeiradeira]) { n.o.position.y = EIRA_Y + 0.05; n.o.rotation.y = Math.atan2(MONTE.position.x - n.o.position.x, MONTE.position.z - n.o.position.z); CIRC.push({ x: n.o.position.x, z: n.o.position.z, r: 0.4 }); }
const FORC2 = { cabo: cil(0.02), trav: cil(0.012), dentes: [cil(0.01), cil(0.01), cil(0.01), cil(0.01)] };
const FORC = { cabo: cil(0.02), trav: cil(0.012), dentes: [cil(0.01), cil(0.01), cil(0.01), cil(0.01)] };
function garfoPasso(st, F, dt, t, off) {
  const f = frente(st), lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  const fase = ((t + off) % 2.8) / 2.8;
  const H = pos(st.os.pelvis).add(V3(0, 0.15, 0)).addScaledVector(f, 0.2).addScaledVector(lado, -0.12);
  const baixo = H.clone().addScaledVector(f, 1.3).setY(EIRA_Y + 0.2), alto = H.clone().addScaledVector(f, 0.9).add(V3(0, 1.45, 0));
  const k = fase < 0.35 ? 0 : fase < 0.55 ? sm(0.35, 0.55, fase) : 1 - sm(0.7, 1, fase);
  const ponta = baixo.clone().lerp(alto, k), d = ponta.clone().sub(H).normalize();
  barra(F.cabo, H.clone().addScaledVector(d, -0.3), ponta);
  const latF = V3().crossVectors(d, CIMA).normalize();
  barra(F.trav, ponta.clone().addScaledVector(latF, -0.13), ponta.clone().addScaledVector(latF, 0.13));
  F.dentes.forEach((m, i) => { const b = ponta.clone().addScaledVector(latF, -0.12 + i * 0.08); barra(m, b, b.clone().addScaledVector(d, 0.28)); });
  if (fase > 0.52 && fase < 0.6 && rnd() < 0.7) { const p = ponta.clone().addScaledVector(d, 0.15); solta(p, V3(0.6 + rnd() * 0.5, 0.6 + rnd() * 0.6, -0.6 - rnd() * 0.5), 'palha', 2.6); solta(p, V3((rnd() - 0.5) * 0.3, 0.3, (rnd() - 0.5) * 0.3), 'grao', 1.2); }
  st.toca('Parado');
  st.inc += ((fase < 0.4 ? 0.5 : 0.1) - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  maos(st, H.clone().addScaledVector(d, 0.45), H.clone(), dt, 1, 18);
}
function debulhadorPasso(dt, t) {
  garfoPasso(debulhador, FORC2, dt, t, 2.3);
  const k = 1 + Math.min(0.45, CARRO.entregues * 0.012); MONTE.scale.set(k, 0.28 * k, 0.85 * k);
}
function joeiradeiraPasso(dt, t) {
  const st = joeiradeira, f = frente(st), lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  const fase = ((t + 0.9) % 2.8) / 2.8;
  const H = pos(st.os.pelvis).add(V3(0, 0.15, 0)).addScaledVector(f, 0.2).addScaledVector(lado, -0.12);
  const baixo = H.clone().addScaledVector(f, 1.3).setY(EIRA_Y + 0.2), alto = H.clone().addScaledVector(f, 0.9).add(V3(0, 1.45, 0));
  const k = fase < 0.35 ? 0 : fase < 0.55 ? sm(0.35, 0.55, fase) : 1 - sm(0.7, 1, fase);
  const ponta = baixo.clone().lerp(alto, k), d = ponta.clone().sub(H).normalize();
  barra(FORC.cabo, H.clone().addScaledVector(d, -0.3), ponta);
  const latF = V3().crossVectors(d, CIMA).normalize();
  barra(FORC.trav, ponta.clone().addScaledVector(latF, -0.13), ponta.clone().addScaledVector(latF, 0.13));
  FORC.dentes.forEach((m, i) => { const b = ponta.clone().addScaledVector(latF, -0.12 + i * 0.08); barra(m, b, b.clone().addScaledVector(d, 0.28)); });
  if (fase > 0.52 && fase < 0.6 && rnd() < 0.7) { const p = ponta.clone().addScaledVector(d, 0.15); solta(p, V3(0.6 + rnd() * 0.5, 0.6 + rnd() * 0.6, -0.6 - rnd() * 0.5), 'palha', 2.6); solta(p, V3((rnd() - 0.5) * 0.3, 0.3, (rnd() - 0.5) * 0.3), 'grao', 1.2); }
  st.toca('Parado');
  st.inc += ((fase < 0.4 ? 0.5 : 0.1) - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  maos(st, H.clone().addScaledVector(d, 0.45), H.clone(), dt, 1, 18);
}

export { debulhadorPasso, joeiradeiraPasso };
