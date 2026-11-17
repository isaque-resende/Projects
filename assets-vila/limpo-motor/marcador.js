// Motor comum: a seta sobre a cabeça do jogador. Aparece por cima de paredes e árvores, então dá para saber
// onde ele está mesmo quando uma casa o esconde (no lugar de deixar as casas transparentes).
import * as THREE from 'three';

//   altura: quanto acima dos pés · cor: a da seta (a borda é escura, para aparecer no chão claro e no verde)
export function criaMarcador(scene, { altura = 2.5, cor = 0xf1c24b } = {}) {
  const g = new THREE.Group();
  const mat = (c) => new THREE.MeshBasicMaterial({ color: c, depthTest: false, depthWrite: false, transparent: true });
  const borda = new THREE.Mesh(new THREE.ConeGeometry(0.27, 0.52, 4), mat(0x3a2614));
  const seta = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 4), mat(cor));
  seta.position.y = 0.02; borda.renderOrder = 998; seta.renderOrder = 999;
  g.add(borda, seta); g.rotation.x = Math.PI;          // ponta para baixo, apontando para a cabeça
  g.traverse((m) => { m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false; });
  scene.add(g);
  return {
    // a cada quadro: onde está o jogador, o tempo e a distância da câmera (de longe, a seta cresce para não sumir)
    passo(pos, t, dist = 15, visivel = true) {
      g.visible = visivel; if (!visivel) return;
      const k = THREE.MathUtils.clamp(dist / 14, 1, 3.2);
      g.scale.setScalar(k);
      g.position.set(pos.x, pos.y + altura + 0.25 * k + Math.sin(t * 3) * 0.08 * k, pos.z);
      g.rotation.y = t * 1.6;
    },
  };
}
