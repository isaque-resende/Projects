// Motor comum: a seta sobre a cabeça do jogador. Só aparece quando alguma coisa (casa, árvore, muro) esconde o
// jogador da câmera, para não perdê-lo de vista. Fica por cima de tudo, então se vê mesmo atrás de uma parede.
import * as THREE from 'three';

//   camera: a câmera do jogo · jogador: o objeto do jogador (as malhas dele não contam como obstáculo)
//   altura: quanto acima dos pés · cor: a da seta (a borda é escura, para aparecer no chão claro e no verde)
export function criaMarcador(scene, camera, jogador, { altura = 2.5, cor = 0xf1c24b } = {}) {
  const g = new THREE.Group();
  const mat = (c) => new THREE.MeshBasicMaterial({ color: c, depthTest: false, depthWrite: false, transparent: true, opacity: 0 });
  const borda = new THREE.Mesh(new THREE.ConeGeometry(0.27, 0.52, 4), mat(0x3a2614));
  const seta = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.4, 4), mat(cor));
  seta.position.y = 0.02; borda.renderOrder = 998; seta.renderOrder = 999;
  g.add(borda, seta); g.rotation.x = Math.PI;          // ponta para baixo, apontando para a cabeça
  g.traverse((m) => { m.frustumCulled = false; m.castShadow = false; m.receiveShadow = false; });
  g.visible = false; scene.add(g);

  // ---------- o que pode esconder o jogador ----------
  // malhas paradas e opacas do cenário: casas, árvores, muros, rochas. Ficam de fora o chão (o morro quase nunca
  // tampa e é pesado de testar), as pessoas e animais, o próprio jogador, fumaça e fogo, e as árvores de longe.
  const CHAO = /Terreno|Caminhos|Estrada/;
  let tampas = [], idade = -1e9;
  const ehDoJogador = (o) => { for (let p = o; p; p = p.parent) if (p === jogador) return true; return false; };
  const listaTampas = () => {
    const l = [];
    scene.traverse((o) => {
      if (!o.isMesh || o.isSkinnedMesh || o.isInstancedMesh || CHAO.test(o.name) || o.parent === g) return;
      const m = Array.isArray(o.material) ? o.material[0] : o.material;
      if (!m || m.transparent || m.depthWrite === false || ehDoJogador(o)) return;
      l.push(o);
    });
    return l;
  };
  const ray = new THREE.Raycaster(), alvo = new THREE.Vector3(), dir = new THREE.Vector3();
  // true se a coisa está entre a câmera e o ponto
  const tampado = (p) => {
    dir.subVectors(p, camera.position); const L = dir.length(); dir.normalize();
    ray.set(camera.position, dir); ray.far = L - 0.25;
    for (const o of tampas) { if (!o.visible) continue; if (ray.intersectObject(o, false).length) return true; }
    return false;
  };

  let escondido = false, desde = 0, opac = 0, quadro = 0;
  return {
    // a cada quadro: onde está o jogador, o tempo, a distância da câmera (de longe, a seta cresce para não sumir)
    // e se a seta pode aparecer agora (falso em diálogos, transições, dentro do túmulo...)
    passo(pos, t, dist = 15, permitido = true) {
      if (!permitido) { g.visible = false; opac = 0; escondido = false; return; }
      // testa só de vez em quando (a cada 4 quadros) e refaz a lista de obstáculos a cada 300 quadros (uns 5 s)
      if (quadro++ % 4 === 0) {
        if (quadro - idade > 300) { tampas = listaTampas(); idade = quadro; }
        camera.updateMatrixWorld();
        const cabeca = tampado(alvo.set(pos.x, pos.y + 1.55, pos.z)), peito = tampado(alvo.set(pos.x, pos.y + 0.9, pos.z));
        const agora = cabeca && peito;                  // aparece quando o corpo some, não quando só os pés somem
        if (agora !== escondido) { escondido = agora; desde = quadro; }
      }
      // aparece logo; some com um pouco de atraso, uns 0,4 s (não pisca ao passar rente a um tronco)
      const quer = escondido || (quadro - desde < 24 && opac > 0) ? 1 : 0;
      opac += (quer - opac) * 0.2;
      if (opac < 0.02) { g.visible = false; return; }
      g.visible = true; borda.material.opacity = seta.material.opacity = Math.min(1, opac);
      const k = THREE.MathUtils.clamp(dist / 14, 1, 3.2);
      g.scale.setScalar(k);
      g.position.set(pos.x, pos.y + altura + 0.25 * k + Math.sin(t * 3) * 0.08 * k, pos.z);
      g.rotation.y = t * 1.6;
    },
    // para os testes
    get escondido() { return escondido; },
  };
}
