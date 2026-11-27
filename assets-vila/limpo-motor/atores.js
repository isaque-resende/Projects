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
    const st = { o, A, atual: '', alt: altura };
    st.toca = (n) => { if (n === st.atual || !A[n]) return; A[n].reset().fadeIn(0.2).play(); if (A[st.atual]) A[st.atual].fadeOut(0.2); st.atual = n; };
    st.toca(clipe); A[clipe] && (A[clipe].time = rnd() * 2);
    // cada um no seu ritmo: parados e conversando, ninguém respira junto com o vizinho
    for (const n of ['Parado', 'Conversando']) if (A[n]) A[n].timeScale = 0.86 + Math.random() * 0.28;
    // a cabeça viva (vida): só nos bonecos com pescoço e cabeça, por cima do clipe, logo depois do animador
    const vH = o.getObjectByName('Head'), vN = o.getObjectByName('neck_01');
    if (vH && vN) {
      st.vida = { H: vH, N: vN, t: Math.random() * 4, y: 0, p: 0, w: 0, gy: 0, gp: 0, giro: 0, rUlt: null, roteiro: false, jx: null, jz: 0, para: 0 };
      const up = mx.update.bind(mx); mx.update = (d) => { up(d); vida(st, d); return mx; };
    }
    return st;
  }
  // A cabeça acompanha o jogador quando ele passa perto e pela frente (até ~60° para o lado), e, sem ninguém perto,
  // quem está parado olha em volta de vez em quando. Fica de fora: o próprio jogador, as lembranças (globalThis.EM_LEMBRANCA),
  // quem está deitado ou com a pose montada osso a osso (sem clipe tocando) e quem está longe do jogador.
  // O jogador é globalThis.OLHO_NPC (o objeto dele), que cada fase aponta em jogador.js.
  const _qy = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _ax = new THREE.Vector3();
  function vida(st, dt) {
    const V = st.vida, J = globalThis.OLHO_NPC, o = st.o;
    // o clipe que manda agora (há fases que tocam o clipe direto, sem st.toca)
    let a = null; for (const x of Object.values(st.A)) if (x.isRunning() && (!a || x.getEffectiveWeight() > a.getEffectiveWeight())) a = x;
    const nome = a ? a.getClip().name : '';
    const pode = J && J !== o && o.visible && a && !globalThis.EM_LEMBRANCA && Math.abs(o.rotation.x) < 0.3 && Math.abs(o.rotation.z) < 0.3;
    // quem o roteiro da fase gira (mexeu na rotação depois de nós) não se vira sozinho: o roteiro manda
    if (V.rUlt !== null && Math.abs(o.rotation.y - V.rUlt) > 1e-6) { V.roteiro = true; V.giro = 0; }
    if (!pode) { V.w = 0; V.y = V.p = 0; V.rUlt = null; return; }
    const dx = J.position.x - o.position.x, dz = J.position.z - o.position.z, d = Math.hypot(dx, dz);
    if (d > 28) { V.w = 0; V.rUlt = null; return; }
    // o corpo se volta para quem para diante dele (a conversa: o jogo vira o jogador para o NPC), e depois volta
    if (V.jx !== null) { const v = Math.hypot(J.position.x - V.jx, J.position.z - V.jz) / Math.max(dt, 1e-3); V.para = v < 0.3 ? V.para + dt : 0; }
    V.jx = J.position.x; V.jz = J.position.z;
    if (!V.roteiro && !st.os && (nome === 'Parado' || nome === 'Conversando')) {
      const base = o.rotation.y - V.giro;
      let g = 0;
      if (J.visible && d < 3.5 && d > 0.6 && V.para > 0.5 && (-dx * Math.sin(J.rotation.y) - dz * Math.cos(J.rotation.y)) / d > 0.87) {
        g = Math.atan2(dx, dz) - base; g = THREE.MathUtils.clamp(Math.atan2(Math.sin(g), Math.cos(g)), -1.3, 1.3);
      }
      V.giro += (g - V.giro) * Math.min(1, dt * 2.2);
      o.rotation.y = base + V.giro; V.rUlt = o.rotation.y;
    } else V.rUlt = null;
    let wy = 0, wp = 0, w = 0;
    if (J.visible && d > 0.6 && d < 5.5) {
      let y = Math.atan2(dx, dz) - o.rotation.y; y = Math.atan2(Math.sin(y), Math.cos(y));
      if (Math.abs(y) < 1.9) {
        wy = THREE.MathUtils.clamp(y, -1.05, 1.05);
        wp = THREE.MathUtils.clamp(Math.atan2(J.position.y + 1.55 - (o.position.y + (st.alt || 1.7) * 0.92), d), -0.35, 0.3);
        w = 1 - THREE.MathUtils.smoothstep(d, 4.2, 5.5);
      }
    }
    if (w === 0 && (nome === 'Parado' || nome === 'Conversando')) {      // olha em volta (só quem está à toa): às vezes para a frente, às vezes para um lado
      if ((V.t -= dt) <= 0) { V.t = 2.5 + Math.random() * 5; const fr = Math.random() < 0.4; V.gy = fr ? 0 : (Math.random() - 0.5) * 1.3; V.gp = fr ? 0 : (Math.random() - 0.6) * 0.25; }
      wy = V.gy; wp = V.gp; w = 0.75;
    }
    const k = Math.min(1, dt * 3.2);
    V.y += (wy - V.y) * k; V.p += (wp - V.p) * k; V.w += (w - V.w) * k;
    if (V.w < 0.01) return;
    // primeiro o aceno (em volta do lado do corpo), depois o giro (em volta do alto); 35% no pescoço, 65% na cabeça
    _ax.set(Math.cos(o.rotation.y), 0, -Math.sin(o.rotation.y));
    for (const [osso, f] of [[V.N, 0.35], [V.H, 0.65]]) {
      _qp.setFromAxisAngle(_ax, -V.p * V.w * f); _qy.setFromAxisAngle(CIMA, V.y * V.w * f);
      giraMundo(osso, _qy.multiply(_qp));
    }
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
  // anda em linha reta até o alvo; devolve true quando chega.
  // O clipe sai da velocidade (acima de ~2 passos por segundo de um adulto, corre), e o ritmo do clipe acompanha a
  // velocidade, para os pés não deslizarem no chão. (Antes o anda tocava sempre 'Andar' e quem corria trocava para
  // 'Correr' logo depois: a troca a cada quadro reiniciava o clipe, e as pernas ficavam paradas.)
  function anda(st, alvo, dt, vel = 0.9, clipe) {
    const d = alvo.clone().sub(st.o.position).setY(0), L = d.length();
    if (L < chegou) { if (assenta) assenta(st); return true; }
    d.normalize(); st.o.position.addScaledVector(d, Math.min(vel * dt, L)); lerpAng(st.o, Math.atan2(d.x, d.z), Math.min(1, dt * 8));
    passo(st, vel, clipe);
    if (assenta) assenta(st);
    return false;
  }
  // toca o clipe de andar ou correr no ritmo da velocidade (m/s). A passada cresce com a altura do ator.
  function passo(st, vel, clipe) {
    const h = st.alt || 1.7, corre = !clipe && st.A.Correr && vel > 1.45 * h;
    const c = clipe || (corre ? 'Correr' : 'Andar'), a = st.A[c];
    st.toca(c); if (a) a.timeScale = THREE.MathUtils.clamp(vel / ((c === 'Correr' ? 2.3 : 0.72) * h), 0.45, 1.6);
  }
  return { MIX, ator, corpo, posesBase, anda, passo };
}
