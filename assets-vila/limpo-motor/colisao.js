// Motor comum: obstáculos no chão (caixas e círculos) e a regra para não ficar preso.
import * as THREE from 'three';

export function criaColisao(margem = 0.3) {
  const CAIXAS = [];      // { x0, x1, z0, z1 }
  const CIRC = [];        // { x, z, r }
  const EXTRAS = [];      // testes próprios da fase: (x, z, m) => true se bate
  // true se o ponto (com a folga m) encosta em algum obstáculo
  const bate = (x, z, m = margem) => EXTRAS.some((f) => f(x, z, m)) || CAIXAS.some((c) => x > c.x0 - m && x < c.x1 + m && z > c.z0 - m && z < c.z1 + m) || CIRC.some((c) => Math.hypot(c.x - x, c.z - z) < c.r + m);
  // cria uma caixa do tamanho do objeto (enc: quanto encolher de cada lado)
  function caixaDe(obj, enc = 0) {
    obj.updateWorldMatrix(true, true);
    const b = new THREE.Box3().setFromObject(obj);
    CAIXAS.push({ x0: b.min.x + enc, x1: b.max.x - enc, z0: b.min.z + enc, z1: b.max.z - enc });
  }
  // quanto o ponto está "dentro" da margem dos obstáculos (negativo = livre).
  // Quem já está colado num obstáculo só pode dar passos que não entram mais: assim nunca fica preso.
  const fundo = (x, z) => {
    let m = -1;
    for (const c of CIRC) m = Math.max(m, c.r + margem - Math.hypot(c.x - x, c.z - z));
    for (const c of CAIXAS) m = Math.max(m, Math.min(x - c.x0 + margem, c.x1 + margem - x, z - c.z0 + margem, c.z1 + margem - z));
    return m;
  };
  return { CAIXAS, CIRC, EXTRAS, bate, caixaDe, fundo };
}
