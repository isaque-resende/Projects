// Betfagé: a eira. Dois trabalhadores jogam a palha para o alto com o forcado, e o grão cai.
import * as THREE from 'three';
import { frente } from '../../limpo-motor/atores.js';
import { LAY, V3, scene, CIRC, rnd } from './estado.js';
import { nRobusto, nBotoes, aMalharR, aMalharM } from './modelos.js';
import { FORNO } from './cenario.js';
import { ator, madeira, solta } from './gente.js';
import { CARRO } from './ceifa.js';     // os feixes que a carroça traz engordam o monte

const EI = LAY.eira, EIRA_Y = (() => { if (!FORNO.eira) return EI.y; FORNO.eira.updateMatrixWorld(true); const rc = new THREE.Raycaster(V3(EI.x + 0.6, EI.y + 5, EI.z + 0.6), V3(0, -1, 0)); const h = rc.intersectObject(FORNO.eira, true)[0]; return h ? h.point.y - 0.03 : EI.y; })();
const MONTE = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xe2c27e, roughness: 1, flatShading: true }));
MONTE.position.set(EI.x + 0.3, EIRA_Y + 0.05, EI.z - 0.2); MONTE.scale.set(1.0, 0.28, 0.85); MONTE.receiveShadow = MONTE.castShadow = true; scene.add(MONTE);
// Os dois trabalham com o clipe "Malhar", animado no Blender (personagens/malhar.py): o forcado é um osso a mais
// ("garfo") e os braços seguem o cabo com cotovelo e mãos de verdade. Aqui só se pendura o forcado no esqueleto.
function malhador(g, anim, altura, x, z, atraso) {
  const st = ator(g, altura, x, z, 0, 'Parado');
  const raiz = st.o.getObjectByName('root'), ga0 = anim.scene.getObjectByName('garfo'), fo0 = anim.scene.getObjectByName('forcado');
  const ga = new THREE.Object3D(); ga.name = 'garfo'; ga.position.copy(ga0.position); ga.quaternion.copy(ga0.quaternion); ga.scale.copy(ga0.scale); raiz.add(ga);
  const fo = new THREE.Mesh(fo0.geometry, madeira); fo.position.copy(fo0.position); fo.quaternion.copy(fo0.quaternion); fo.scale.copy(fo0.scale); fo.castShadow = true; ga.add(fo);
  // a ponta dos dentes: o vértice mais longe do começo do cabo
  const P = fo0.geometry.attributes.position, v = V3(); st.ponta = V3();
  for (let i = 0; i < P.count; i++) { v.fromBufferAttribute(P, i); if (v.lengthSq() > st.ponta.lengthSq()) st.ponta.copy(v); }
  st.forcado = fo;
  st.A.Malhar = st.o.userData.mx.clipAction(anim.animations[0]); st.toca('Malhar'); st.A.Malhar.time = atraso;
  return st;
}
const debulhador = malhador(nRobusto, aMalharR, 1.72, EI.x - 0.8, EI.z + 0.8, 0);
const joeiradeira = malhador(nBotoes, aMalharM, 1.6, EI.x + 1.5, EI.z + 0.6, 1.4);
for (const n of [debulhador, joeiradeira]) { n.o.position.y = EIRA_Y + 0.05; n.o.rotation.y = Math.atan2(MONTE.position.x - n.o.position.x, MONTE.position.z - n.o.position.z); CIRC.push({ x: n.o.position.x, z: n.o.position.z, r: 0.4 }); }
// no alto do arremesso (quadros 35 a 40 de 72) a palha voa da ponta do forcado e o grão cai
function malhaPasso(st) {
  const a = st.A.Malhar, fase = a.time / a.getClip().duration;
  if (fase < 0.48 || fase > 0.56 || rnd() > 0.7) return;
  const p = st.forcado.localToWorld(st.ponta.clone()), f = frente(st);
  solta(p, f.clone().multiplyScalar(0.4 + rnd() * 0.4).add(V3((rnd() - 0.5) * 0.4, 0.5 + rnd() * 0.6, (rnd() - 0.5) * 0.4)), 'palha', 2.6);
  solta(p, V3((rnd() - 0.5) * 0.3, 0.3, (rnd() - 0.5) * 0.3), 'grao', 1.2);
}
function debulhadorPasso() {
  malhaPasso(debulhador);
  const k = 1 + Math.min(0.45, CARRO.entregues * 0.012); MONTE.scale.set(k, 0.28 * k, 0.85 * k);
}
function joeiradeiraPasso() { malhaPasso(joeiradeira); }

export { debulhadorPasso, joeiradeiraPasso, debulhador, joeiradeira };
