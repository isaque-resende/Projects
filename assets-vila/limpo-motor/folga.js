// Motor comum: a câmera do jogo não fica atrás de uma copa, de uma parede ou de um telhado. Se algo alto do cenário
// entra entre a cabeça do jogador e a câmera:
//   1. ela chega mais perto, para a frente do que tapa (se ainda fica a pelo menos MIN metros);
//   2. senão (o jogador debaixo de um telhado ou de um alpendre), ela desce e olha por baixo, mais perto do chão;
//   3. senão, fica como está, e o triângulo amarelo mostra onde ele está (marcador.js).
// Tudo devagar ao voltar. Nada fica transparente.
//   const folga = criaFolga(malhasAltas(scene, [terreno]));
//   no passo da câmera: CAM.pos.copy(folga(cabeca, CAM.pos, dt));
import * as THREE from 'three';

const aparece = (o) => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
export function criaFolga(obstaculos, MIN = 3.2) {
  const RC = new THREE.Raycaster(), d = new THREE.Vector3(), S = {};
  // o primeiro obstáculo a partir de "de", medido nos dois sentidos: telhados e muros têm face só do lado de fora, e um
  // raio que sai de baixo deles passa sem bater
  const conta = (x) => aparece(x.object) && !(x.object.material && x.object.material.transparent);
  const bate = (de, dir, L) => {
    RC.set(de, dir); RC.far = L; const a = RC.intersectObjects(obstaculos(), false).find(conta);
    const fim = de.clone().addScaledVector(dir, L); RC.set(fim, dir.clone().negate()); RC.far = L;
    const vs = RC.intersectObjects(obstaculos(), false).filter(conta); const b = vs.length ? vs[vs.length - 1] : null;
    const db = b ? L - b.distance : Infinity, da = a ? a.distance : Infinity;
    return Math.min(da, db) < Infinity ? { distance: Math.min(da, db) } : null;
  };
  const fn = (cabeca, pos, dt) => {
    d.copy(pos).sub(cabeca); const L = d.length(); if (L < 1e-3) return pos; d.divideScalar(L);
    let alvo = pos.clone();
    const h = bate(cabeca, d, L);
    // volta à linha de sempre só quando ela fica livre por meio segundo (o jogador encostado num tronco, indo e vindo,
    // fazia a câmera pular de um lado para o outro)
    const serve = !h || h.distance - 0.75 >= MIN; S.livreT = serve ? (S.livreT || 0) + dt : 0;
    if (serve && S.livreT > 1.2) S.saida = null;
    const usaSaida = S.saida != null || (h && !serve);
    if (h && serve) alvo = cabeca.clone().addScaledVector(d, h.distance - 0.75);
    if (usaSaida) {
      {
        // perto demais: outro lado (girando em volta dele) ou por baixo (debaixo de telhado ou alpendre); o primeiro
        // livre, ou o de mais espaço, se der para ficar a MIN dele
        const hz = new THREE.Vector3(d.x, 0, d.z).normalize(), elev = Math.asin(THREE.MathUtils.clamp(d.y, -1, 1));
        // (fica com a mesma saída enquanto ela servir: trocar a cada quadro fazia a câmera tremer)
        const SAIDAS = [[0, 0.2, 0.45], [0.6, elev, 1], [-0.6, elev, 1], [0.6, 0.2, 0.45], [-0.6, 0.2, 0.45], [1.1, elev, 1], [-1.1, elev, 1]];
        const prova = ([gy, el, kL]) => {
          const c = Math.cos(gy), sn = Math.sin(gy), hx = hz.x * c + hz.z * sn, hzz = -hz.x * sn + hz.z * c;
          const dir = new THREE.Vector3(hx * Math.cos(el), Math.sin(el), hzz * Math.cos(el)).normalize(), Lc = Math.max(MIN + 1, L * kL);
          const hc = bate(cabeca, dir, Lc); return { dir, d: hc ? hc.distance - 0.75 : Lc, livre: !hc };
        };
        let melhor = null;
        if (S.saida != null) { const p = prova(SAIDAS[S.saida]); if (p.d >= MIN) melhor = p; }
        if (!melhor) for (const [i, sd] of SAIDAS.entries()) { const p = prova(sd); if (p.livre) { melhor = p; S.saida = i; break; } if (!melhor || p.d > melhor.d) { melhor = p; S.saida = i; } }
        if (melhor && melhor.d >= MIN) { alvo = cabeca.clone().addScaledVector(melhor.dir, melhor.d); }
      }
    }
    // anda em volta dele (direção e distância separadas): em linha reta, de um lado para o outro, a câmera passava rente
    // ao jogador e o perdia de vista
    const v = alvo.clone().sub(cabeca), dv = v.length() || 1e-3; v.divideScalar(dv);
    if (!S.dir) { S.dir = v.clone(); S.dist = dv; }
    const kd = Math.min(1, dt * (dv < S.dist ? 10 : 3)), ka = Math.min(1, dt * 4);
    S.dist += (dv - S.dist) * kd;
    const q = new THREE.Quaternion().setFromUnitVectors(S.dir, v); S.dir.applyQuaternion(new THREE.Quaternion().slerp(q, ka)).normalize();
    return cabeca.clone().addScaledVector(S.dir, S.dist);
  };
  fn.S = S; return fn;
}
