// Betfagé: quem está na aldeia. A jumenta e o jumentinho amarrados, a conversa no pátio, as ovelhas e o andante da estrada.
import * as THREE from 'three';
import { LAY, V3, CIRC, scene, rnd, AB } from './estado.js';
import { gJum, nMagro, nRapaz, gOve, nMoco } from './modelos.js';
import { terreno, AMOS } from './cenario.js';
import { INS } from './insula.js';
import { ator, cil, barra, chao } from './gente.js';
import './eira.js';     // só para manter a ordem de montagem

const [cox, coz] = LAY.cocho;
// lado a lado no plano da câmera (eixo (1, 0, -1)), de perfil, para os dois aparecerem inteiros
const jumenta = ator(gJum, 1.35, cox + 0.75, coz - 0.75, 3 * Math.PI / 4 + 0.25, 'Parado');
const jumentinho = ator(gJum, 0.9, cox - 0.7, coz + 0.6, Math.PI / 4 + 0.7, 'Comer');
const ESTACA = V3(cox + 0.1, 0, coz - 0.9); ESTACA.y = terreno(ESTACA.x, ESTACA.z);
{ const m = cil(0.06); barra(m, ESTACA, ESTACA.clone().add(V3(0, 1.1, 0))); CIRC.push({ x: ESTACA.x, z: ESTACA.z, r: 0.15 }, { x: jumenta.o.position.x, z: jumenta.o.position.z, r: 0.6 }, { x: jumentinho.o.position.x, z: jumentinho.o.position.z, r: 0.45 }); }
const CORDA_J = cil(0.012, new THREE.MeshStandardMaterial({ color: 0xc9b07a, roughness: 1 }));
// os jumentos de Mc 11,2: chão batido em volta e um brilho suave no chão até o jogador chegar perto
const JUM = { visto: false, anel: new THREE.Mesh(new THREE.RingGeometry(1.5, 1.9, 40), new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: 0.4, depthWrite: false })) };
JUM.anel.rotation.x = -Math.PI / 2; scene.add(JUM.anel);
const conv1 = ator(nMagro, 1.7, 0, 0, 0, 'Conversando'), conv2 = ator(nRapaz, 1.66, 0, 0, 0, 'Conversando');
{
  const p = INS.patio;
  conv1.o.position.set(p.x - 0.5, 0, p.z); conv2.o.position.set(p.x + 0.5, 0, p.z + 0.2); chao(conv1); chao(conv2);
  conv1.o.rotation.y = Math.PI / 2 - 0.2; conv2.o.rotation.y = -Math.PI / 2 - 0.2; conv1.r0 = conv1.o.rotation.y; conv2.r0 = conv2.o.rotation.y;
  for (const n of [conv1, conv2]) CIRC.push({ x: n.o.position.x, z: n.o.position.z, r: 0.35 });
}
// ovelhas no cercado de baixo, com o pastor; e algumas no socalco de cima, à direita
const PASTO = { x: LAY.pasto[0], z: LAY.pasto[1], r: 0.7 };      // três ovelhas no aprisco, sem pastor
const ovelhas = [];
for (let i = 0; i < 3; i++) {
  const a = i * 2.1 + rnd() * 0.5, r = 0.4 + rnd() * 0.6;
  const o = ator(gOve, 0.8, PASTO.x + Math.cos(a) * r, PASTO.z + Math.sin(a) * r, rnd() * 6.28, rnd() < 0.6 ? 'Comer' : 'Parado'); o.alvo = null; o.espera = rnd() * 4; o.area = PASTO; ovelhas.push(o);
}
// alguém subindo e descendo a estrada
const andante = ator(nMoco, 1.68, 0, 0, 0, 'Andar');
// trecho da estrada por onde o andante sobe e desce (dentro do diorama)
const tMin = (() => { for (let i = 0; i < AMOS.length; i++) { const [a, b] = AB(AMOS[i].x, AMOS[i].z); if (a + b > 0.1) return i / AMOS.length; } return 0.1; })();
const tMax = (() => { for (let i = AMOS.length - 1; i >= 0; i--) { const [a, b] = AB(AMOS[i].x, AMOS[i].z); if (a + b < 2.54) return i / AMOS.length; } return 0.9; })();

export { tMin, jumenta, CORDA_J, ESTACA, JUM, jumentinho, ovelhas, andante, tMax, conv1, conv2 };
