// Motor comum: personagens e animais (modelo com esqueleto e clipes) e a animação sob medida
// (IK de dois ossos para braços e pernas, por cima do clipe parado).
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { sombra } from './base.js';

const _q1 = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _q3 = new THREE.Quaternion();
const _A = new THREE.Vector3(), _B = new THREE.Vector3(), _C = new THREE.Vector3(), _T = new THREE.Vector3(), _P = new THREE.Vector3(), _D = new THREE.Vector3(), _E = new THREE.Vector3();
export const CIMA = new THREE.Vector3(0, 1, 0);

// gira um osso por uma rotação dada no espaço do mundo
export function giraMundo(osso, q) { osso.getWorldQuaternion(_q2); osso.parent.getWorldQuaternion(_q3); osso.quaternion.copy(_q3.invert().multiply(q.clone().multiply(_q2))); osso.updateMatrixWorld(true); }
function alinha(osso, de, para) { if (de.lengthSq() < 1e-8 || para.lengthSq() < 1e-8) return; _q1.setFromUnitVectors(de.normalize(), para.normalize()); giraMundo(osso, _q1); }
// IK de dois ossos: leva a ponta (c) até o alvo, dobrando em direção ao polo
export function ik(a, b, c, alvo, polo, peso = 1) {
  a.getWorldPosition(_A); b.getWorldPosition(_B); c.getWorldPosition(_C);
  _T.copy(_C).lerp(alvo, peso);
  const l1 = _A.distanceTo(_B), l2 = _B.distanceTo(_C);
  const dir = _D.copy(_T).sub(_A); let d = dir.length(); d = THREE.MathUtils.clamp(d, Math.abs(l1 - l2) + 1e-3, (l1 + l2) * 0.999); dir.normalize();
  const pl = _P.copy(polo).sub(_A); pl.addScaledVector(dir, -pl.dot(dir)).normalize();
  const x = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  const bd = _E.copy(_A).addScaledVector(dir, x).addScaledVector(pl, h);
  alinha(a, _B.clone().sub(_A), bd.clone().sub(_A));
  b.getWorldPosition(_B); c.getWorldPosition(_C);
  alinha(b, _C.clone().sub(_B), _A.clone().addScaledVector(dir, d).sub(_B));
}
// Braço com cotovelo de verdade: o ik acima gira cada osso pelo menor caminho, e o antebraço acaba dobrando de lado
// e torcendo a malha (braço "de fantasma"). Aqui cada osso recebe a orientação inteira: aponta para onde deve e o eixo
// do cotovelo (medido na pose de repouso, onde dobrar leva a mão para a frente) fica perpendicular ao plano do braço.
const _M1 = new THREE.Matrix4(), _M2 = new THREE.Matrix4(), _Qa = new THREE.Quaternion(), _Qb = new THREE.Quaternion(), _Qp = new THREE.Quaternion();
function base(u, h, q) {
  const x = u.clone().normalize(), y = h.clone().addScaledVector(x, -h.dot(x)).normalize(), z = new THREE.Vector3().crossVectors(x, y);
  return q.setFromRotationMatrix(_M1.makeBasis(x, y, z));
}
export function eixoCotovelo(a, b, c, frente_) {
  a.updateWorldMatrix(true, true);
  const A = a.getWorldPosition(new THREE.Vector3()), B = b.getWorldPosition(new THREE.Vector3()), C = c.getWorldPosition(new THREE.Vector3());
  const u1 = B.clone().sub(A).normalize(), h = new THREE.Vector3().crossVectors(u1, frente_).normalize();
  const ia = a.getWorldQuaternion(new THREE.Quaternion()).invert(), ib = b.getWorldQuaternion(new THREE.Quaternion()).invert();
  const la = B.clone().sub(A).applyQuaternion(ia), lb = C.clone().sub(B).applyQuaternion(ib);
  return { qa: base(la, h.clone().applyQuaternion(ia), new THREE.Quaternion()).invert(), qb: base(lb, h.clone().applyQuaternion(ib), new THREE.Quaternion()).invert() };
}
export function ikBraco(a, b, c, alvo, polo, peso, E) {
  if (!E) return ik(a, b, c, alvo, polo, peso);
  a.getWorldPosition(_A); b.getWorldPosition(_B); c.getWorldPosition(_C);
  const l1 = _A.distanceTo(_B), l2 = _B.distanceTo(_C);
  const dir = _D.copy(alvo).sub(_A); let d = dir.length(); d = THREE.MathUtils.clamp(d, Math.abs(l1 - l2) + 1e-3, (l1 + l2) * 0.995); dir.normalize();
  const pl = _P.copy(polo).sub(_A); pl.addScaledVector(dir, -pl.dot(dir));
  if (pl.lengthSq() < 1e-8) pl.set(0, -1, 0).addScaledVector(dir, dir.y); pl.normalize();
  const x = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  const cot = _E.copy(_A).addScaledVector(dir, x).addScaledVector(pl, h);
  const mao = _T.copy(_A).addScaledVector(dir, d);
  const n = new THREE.Vector3().crossVectors(pl, dir).normalize();
  // osso de cima
  base(cot.clone().sub(_A), n, _Qa).multiply(E.qa);
  a.parent.getWorldQuaternion(_Qp).invert(); _Qa.premultiply(_Qp);
  a.quaternion.slerp(_Qa, peso); a.updateMatrixWorld(true);
  // antebraço
  base(mao.clone().sub(cot), n, _Qb).multiply(E.qb);
  a.getWorldQuaternion(_Qp).invert(); _Qb.premultiply(_Qp);
  b.quaternion.slerp(_Qb, peso); b.updateMatrixWorld(true);
}
// para onde o personagem olha, e a posição de um osso no mundo
export const frente = (st) => new THREE.Vector3(Math.sin(st.o.rotation.y), 0, Math.cos(st.o.rotation.y));
export const pos = (o) => o.getWorldPosition(new THREE.Vector3());
// gira aos poucos até o ângulo alvo (k de 0 a 1)
export const lerpAng = (o, alvo, k) => { let d = alvo - o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); o.rotation.y += d * k; };

// inclina o tronco para a frente (ang em rad), repartido entre dois ossos da coluna
export function inclina(st, ang) {
  if (Math.abs(ang) < 1e-3) return;
  const eixo = new THREE.Vector3().crossVectors(CIMA, frente(st)).normalize();
  const q = new THREE.Quaternion().setFromAxisAngle(eixo, ang * 0.6); giraMundo(st.os.sp, q);
  q.setFromAxisAngle(eixo, ang * 0.4); giraMundo(st.os.sp3, q);
}
// mãos para os alvos (suavizados); peso 0 = deixa o clipe. abre/baixa: onde ficam os cotovelos
export function maos(st, aE, aD, dt, peso = 1, rapidez = 10, abre = 0.4, baixa = 0.4) {
  st.pesoB += (peso - st.pesoB) * Math.min(1, dt * 6);
  if (st.pesoB < 0.01) { st.mE = null; st.mD = null; return; }
  if (!st.mE) { st.mE = pos(st.os.bE[2]); st.mD = pos(st.os.bD[2]); }
  st.mE.lerp(aE, Math.min(1, dt * rapidez)); st.mD.lerp(aD, Math.min(1, dt * rapidez));
  const f = frente(st), atras = f.clone().multiplyScalar(-0.5);
  const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  ikBraco(...st.os.bE, st.mE, pos(st.os.bE[0]).add(atras).addScaledVector(lado, abre).add(new THREE.Vector3(0, -baixa, 0)), st.pesoB, st.cotE);
  ikBraco(...st.os.bD, st.mD, pos(st.os.bD[0]).add(atras).addScaledVector(lado, -abre).add(new THREE.Vector3(0, -baixa, 0)), st.pesoB, st.cotD);
}
// pernas: pés nos alvos, joelho para a frente
export function pernas(st, pE, pD) {
  const f = frente(st);
  ik(...st.os.pE, pE, pos(st.os.pE[0]).addScaledVector(f, 1).add(new THREE.Vector3(0, -0.3, 0)));
  ik(...st.os.pD, pD, pos(st.os.pD[0]).addScaledVector(f, 1).add(new THREE.Vector3(0, -0.3, 0)));
}

// Cada fase cria os seus atores com a cena e o sorteio dela.
//   alturaChao(x, z): altura do chão onde o ator nasce (padrão: 0)
//   assenta(st): chamado a cada passo de "anda", para o ator acompanhar o relevo (opcional)
//   chegou: a que distância do alvo "anda" dá por terminado
export function criaAtores({ scene, rnd, alturaChao = () => 0, assenta = null, chegou = 0.05 }) {
  const MIX = [];         // os animadores de todos os atores (atualizados a cada quadro)
  const CORPOS = [];      // atores com animação sob medida
  // põe um ator na cena, com a altura pedida, tocando o clipe dado. Devolve { o, A, toca }
  function ator(g, altura, x, z, r, clipe) {
    const o = SkeletonUtils.clone(g.scene); sombra(o);
    const b = new THREE.Box3().setFromObject(o); o.scale.setScalar(altura / (b.max.y - b.min.y));
    o.position.set(x, alturaChao(x, z), z); o.rotation.y = r; scene.add(o);
    const mx = new THREE.AnimationMixer(o); MIX.push(mx); o.userData.mx = mx;
    const A = Object.fromEntries(g.animations.map((c) => [c.name, mx.clipAction(c)]));
    const st = { o, A, atual: '' };
    st.toca = (n) => { if (n === st.atual || !A[n]) return; A[n].reset().fadeIn(0.2).play(); if (A[st.atual]) A[st.atual].fadeOut(0.2); st.atual = n; };
    st.toca(clipe); A[clipe] && (A[clipe].time = rnd() * 2);
    return st;
  }
  // prepara o ator para a animação sob medida: acha os ossos e guarda a pose dos que o clipe não mexe
  function corpo(st) {
    const g = (n) => st.o.getObjectByName(n);
    st.os = { pelvis: g('pelvis'), sp: g('spine_02'), sp3: g('spine_03'), cab: g('Head'),
      bE: [g('upperarm_l'), g('lowerarm_l'), g('hand_l')], bD: [g('upperarm_r'), g('lowerarm_r'), g('hand_r')],
      pE: [g('thigh_l'), g('calf_l'), g('foot_l')], pD: [g('thigh_r'), g('calf_r'), g('foot_r')] };
    st.mE = null; st.mD = null; st.inc = 0; st.desce = 0; st.pesoB = 0;
    if (st.os.bE.every(Boolean) && st.os.bD.every(Boolean)) { const f = frente(st); st.cotE = eixoCotovelo(...st.os.bE, f); st.cotD = eixoCotovelo(...st.os.bD, f); }   // na pose de repouso, antes do clipe
    const animados = new Set(); for (const a of Object.values(st.A)) for (const tr of a.getClip().tracks) animados.add(tr.name.split('.')[0]);
    st.base = [];
    for (const k of ['sp', 'sp3', 'pelvis', 'cab']) { const b = st.os[k]; if (b && !animados.has(b.name)) st.base.push([b, b.quaternion.clone()]); }
    for (const b of [...st.os.bE, ...st.os.bD]) if (b && !animados.has(b.name)) st.base.push([b, b.quaternion.clone()]);
    CORPOS.push(st);
    return st;
  }
  // volta os ossos à pose guardada (antes de aplicar a animação sob medida do quadro)
  function posesBase() { for (const st of CORPOS) for (const [b, q] of st.base) b.quaternion.copy(q); }
  // anda em linha reta até o alvo; devolve true quando chega
  function anda(st, alvo, dt, vel = 0.9) {
    const d = alvo.clone().sub(st.o.position).setY(0), L = d.length();
    if (L < chegou) { if (assenta) assenta(st); return true; }
    d.normalize(); st.o.position.addScaledVector(d, Math.min(vel * dt, L)); lerpAng(st.o, Math.atan2(d.x, d.z), Math.min(1, dt * 8)); st.toca('Andar');
    if (assenta) assenta(st);
    return false;
  }
  return { MIX, ator, corpo, posesBase, anda };
}
