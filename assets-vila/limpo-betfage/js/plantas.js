// Betfagé: a figueira seca à beira da estrada e as moitas de espinhos e malvas.
// ---------- figueira amaldiçoada: seca desde a raiz, à beira da estrada ----------
import * as THREE from 'three';
import { CIMA } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { LAY, scene, rnd } from './estado.js';
import { gFigSeca, gPlantas } from './modelos.js';
import { terreno } from './cenario.js';
import './trigal.js';     // só para manter a ordem de montagem

{
  const [x, z] = LAY.figseca, y = terreno(x, z);
  const g = gFigSeca.scene;
  g.position.set(x, y - 0.24, z); g.rotation.y = Math.PI / 4; g.scale.setScalar(0.6); sombra(g); scene.add(g);   // raízes assentadas no chão
  const fol = new THREE.MeshStandardMaterial({ color: 0x8a6a3c, roughness: 1, flatShading: true, side: THREE.DoubleSide });
  for (let i = 0; i < 14; i++) { const a = rnd() * 6.28, r = 0.5 + rnd() * 1.1, fx = x + Math.cos(a) * r, fz = z + Math.sin(a) * r, f = new THREE.Mesh(new THREE.CircleGeometry(0.08, 4), fol); f.position.set(fx, terreno(fx, fz) + 0.05, fz); f.rotation.set(-Math.PI / 2 + (rnd() - 0.5) * 0.5, 0, rnd() * 6); scene.add(f); }
}

// ---------- moitas espinhosas e malvas: uma InstancedMesh por malha, posições e giro (de frente para a câmera) vêm do layout ----------
{
  const gP = gPlantas;
  const PL = {}; for (const n of gP.scene.children) PL[n.name] = n;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), loc = new THREE.Matrix4();
  for (const [nome, raiz] of Object.entries(PL)) {
    const lista = LAY.plantas.filter((e) => e[0] === nome); if (!lista.length) continue;
    raiz.position.set(0, 0, 0); raiz.updateMatrixWorld(true);
    raiz.traverse((mm) => {
      if (!mm.isMesh) return;
      loc.copy(mm.matrixWorld);
      const inst = new THREE.InstancedMesh(mm.geometry, mm.material, lista.length);
      lista.forEach(([, x, y, z, r, k], i) => { q.setFromAxisAngle(CIMA, r); s.setScalar(k); inst.setMatrixAt(i, m4.compose(p.set(x, y, z), q, s).multiply(loc)); });
      inst.castShadow = inst.receiveShadow = true; inst.frustumCulled = false; scene.add(inst);
    });
  }
}
