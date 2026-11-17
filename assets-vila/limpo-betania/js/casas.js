// Betânia: as duas casas com porta (a do discípulo e a de Marta) e as alturas onde se pisa.
// ---------- casas (todas ao fundo, de frente para a câmera) ----------
import * as THREE from 'three';
import { sombra } from '../../limpo-motor/base.js';
import { mapaAltura } from '../../limpo-motor/terreno.js';
import { P, scene } from './estado.js';
import { gCasaP } from './modelos.js';
import { tingeCasa, ground, CASAS_NOVAS } from './cenario.js';

const CASAP = gCasaP.scene; CASAP.children.forEach((c) => c.position.set(0, 0, 0));
const CASAS = [];
const PASSO = 0.12, ABERTO = -1.75;
for (const { x, z, r } of [P('casa_discipulo', -3, -10.5, 0.1), P('casa_marta', 6.2, -11, -0.05)]) {
  const g = new THREE.Group(); for (const c of [...CASAP.children]) g.add(c.clone(true));
  g.updateMatrixWorld(true);
  const porta = g.getObjectByName('Casa2_Porta'), paredes = g.getObjectByName('Casa2');
  const bp = new THREE.Box3().setFromObject(porta);
  const px = (bp.min.x + bp.max.x) / 2, pz = bp.max.z;            // ponto da porta, no espaço da casa
  g.position.set(x, 0, z); g.rotation.y = r; sombra(g); scene.add(g); tingeCasa(g);
  g.updateMatrixWorld(true);
  const alt = mapaAltura(paredes, PASSO, { caixa: g });           // alturas da casa (telhado, degraus)
  const co = Math.cos(r), si = Math.sin(r);
  CASAS.push({ g, porta, px, pz, x, z, co, si, aberta: false, ang: 0, alt,
    local(wx, wz) { const dx = wx - x, dz = wz - z; return [dx * co - dz * si, dx * si + dz * co]; },
    mundo(lx, lz) { return new THREE.Vector3(x + lx * co + lz * si, 0, z - lx * si + lz * co); } });
}
// as portas abrem e fecham aos poucos
function portasPasso(dt) { for (const c of CASAS) { c.ang += ((c.aberta ? ABERTO : 0) - c.ang) * Math.min(1, dt * 5); c.porta.rotation.y = c.ang; } }

const RELEVO = [];   // outros volumes onde se pisa (o rochedo do túmulo)
const chaoTerra = mapaAltura(ground, 0.35); RELEVO.push(chaoTerra);                // barranco do túmulo e morros (a vila em si é plana)
for (const n of CASAS_NOVAS) n.traverse((m) => { if (m.isMesh) RELEVO.push(mapaAltura(m, 0.2)); });
const alturaEm = (x, z) => { let h = 0; for (const c of CASAS) h = Math.max(h, c.alt(x, z)); for (const r of RELEVO) h = Math.max(h, r(x, z)); return h; };

export { CASAS, chaoTerra, portasPasso, alturaEm };
