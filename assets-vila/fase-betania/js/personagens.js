// Betânia: quem mora na vila. Aqui cada personagem é criado e posto no lugar;
// o que cada um faz está em forno.js, oficios.js, poco.js, lavoura.js e rebanho.js.
// (A ordem de criação decide o sorteio: mexer nela muda onde as ovelhas nascem.)
// forno: uma mulher sova a massa na mesa, um rapaz atiça o fogo
import * as THREE from 'three';
import { ator, P, CIRC, corpo } from './estado.js';
import { nBotoes, nMoco, nMagro, nAldeao, nMarta, nLazaro, gCleo, nLenco, nRobusto } from './modelos.js';
import { CASAS, chaoTerra } from './casas.js';
import { FORNO, LAGAR, B5 } from './vila.js';
import { TUM } from './tumulo.js';

const FO = FORNO, LG = LAGAR;
const padeira = ator(nBotoes, 1.6, FO.NPC_Amassar.p.x, FO.NPC_Amassar.p.z, FO.NPC_Amassar.r, 'Parado');
const pfo = P('npc_foguista', 2.8, -4.4, Math.atan2(1.8, -1.2)), foguista = ator(nMoco, 1.66, pfo.x, pfo.z, pfo.r, 'Parado');
foguista.A.Parado && (foguista.A.Parado.timeScale = 0.8);
// lagar: um homem pisa as uvas dentro do tanque; outro traz o cesto
const pisador = ator(nMagro, 1.66, LG.tanque.x, LG.tanque.z, LG.r, 'Parado');
pisador.o.position.y = LG.tanque.y - 0.05;
const paj = P('npc_fregues', 19.6, -3.6, Math.atan2(17.8 - 19.6, -3.0 + 3.6)), ajudante = ator(nAldeao, 1.7, paj.x, paj.z, paj.r, 'Conversando');   // freguês na barraca da direita
for (const n of [foguista, ajudante]) CIRC.push({ x: n.o.position.x, z: n.o.position.z, r: 0.35 });

// Marta na frente da porta da casa dela (a do meio); Lázaro perto do próprio sepulcro, fora do caminho da pedra
const marta = (() => { const c = CASAS[1], q = c.mundo(c.px + 0.5, c.pz + 1.4), p = P('npc_marta', q.x, q.z, c.g.rotation.y); const n = ator(nMarta, 1.62, p.x, p.z, p.r, 'Parado'); n.r0 = p.r; return n; })();
const lazaro = (() => { const lat = new THREE.Vector3(-TUM.frente.z, 0, TUM.frente.x), q = TUM.lugar.clone().addScaledVector(TUM.frente, 3.2).addScaledVector(lat, -2.4);
  const p = P('npc_lazaro', q.x, q.z, Math.atan2(TUM.frente.x, TUM.frente.z)); const n = ator(nLazaro, 1.72, p.x, p.z, p.r, 'Parado'); n.r0 = n.o.rotation.y; return n; })();
const cleopas = (() => { const c = CASAS[0], p0 = c.mundo(c.px + 0.2, c.pz + 3.4), q = c.mundo(c.px, c.pz), p = P('npc_cleopas', p0.x, p0.z, Math.atan2(q.x - p0.x, q.z - p0.z)); const n = ator(gCleo, 1.72, p.x, p.z, p.r, 'Parado'); n.r0 = n.o.rotation.y; return n; })();
for (const n of [marta, lazaro, cleopas]) { n.o.position.y = chaoTerra(n.o.position.x, n.o.position.z); CIRC.push({ x: n.o.position.x, z: n.o.position.z, r: 0.38 }); }
const NOMES = new Map([[marta, 'Marta'], [lazaro, 'Lázaro'], [cleopas, 'Cléopas']]);
const ple = P('npc_freguesa', B5.x + 0.25, B5.z + 1.5, Math.PI + 0.15), pve = P('npc_vendedor', B5.x - 0.15, B5.z - 0.35, 0.15);
const lenco = ator(nLenco, 1.6, ple.x, ple.z, ple.r, 'Parado');
const vendedor = ator(nRobusto, 1.72, pve.x, pve.z, pve.r, 'Conversando');
corpo(lenco); corpo(vendedor);
CIRC.push({ x: ple.x, z: ple.z, r: 0.35 });

const andante = ator(nRobusto, 1.74, 0, 0, 0, 'Andar');
CIRC.push({ x: pve.x, z: pve.z, r: 0.3 });

export { padeira, FO, pisador, LG, vendedor, lenco, andante, marta, lazaro, cleopas, NOMES, foguista, ajudante };
