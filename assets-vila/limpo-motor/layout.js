// Motor comum: põe na cena as árvores, pedras e objetos que vêm do Blender (arquivo de layout).
// Cada item do layout: { glb, no, p: [x, y, z], r, k, f } (f = fica longe: vai instanciado, sem colisão).
import * as THREE from 'three';
import { baixar, nos, sombra } from './base.js';

// baixa os .glb citados no layout e devolve as peças por arquivo e nome
export async function carregaKit(objetos, raiz = '../') {
  const arqs = [...new Set(objetos.map((o) => o.glb))];
  const gs = await Promise.all(arqs.map((a) => baixar(raiz + a)));
  const KIT = Object.fromEntries(arqs.map((a, i) => [a, nos(gs[i])]));
  for (const k of Object.values(KIT)) for (const o of Object.values(k)) o.position.set(0, 0, 0);
  return KIT;
}

// os de longe: uma InstancedMesh por malha de cada modelo (leve para o celular)
export function instanciaLonge(scene, objetos, KIT) {
  const grupos = {};
  for (const o of objetos) if (o.f) (grupos[o.glb + '|' + o.no] ||= []).push(o);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  for (const lista of Object.values(grupos)) {
    const raiz = KIT[lista[0].glb]?.[lista[0].no]; if (!raiz) continue;
    raiz.updateMatrixWorld(true);
    raiz.traverse((mm) => {
      if (!mm.isMesh) return;
      const inst = new THREE.InstancedMesh(mm.geometry, mm.material, lista.length);
      lista.forEach((o, i) => { q.setFromEuler(new THREE.Euler(raiz.rotation.x, raiz.rotation.y + o.r, raiz.rotation.z)); s.copy(raiz.scale).multiplyScalar(o.k); m4.compose(p.set(...o.p), q, s); m4.multiply(raiz.matrixWorld.clone().invert().multiply(mm.matrixWorld)); inst.setMatrixAt(i, m4); });
      inst.castShadow = false; inst.receiveShadow = true; inst.frustumCulled = false; scene.add(inst);
    });
  }
}

// os de perto: um por um; cada(o, n) recebe o item do layout e o objeto já na cena
export function poePertos(scene, objetos, KIT, cada) {
  for (const o of objetos) {
    if (o.f) continue;
    const m = KIT[o.glb]?.[o.no]; if (!m) continue;
    const n = m.clone(); n.position.set(...o.p); n.rotation.y += o.r; n.scale.multiplyScalar(o.k); sombra(n); scene.add(n);
    cada(o, n);
  }
}
