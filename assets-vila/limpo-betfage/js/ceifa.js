// Betfagé: a ceifa. O ceifeiro corta fileira por fileira, a mulher amarra os feixes e o homem leva à carroça.
// Com a carroça cheia, ele puxa o boi até a eira, descarrega e volta.
import * as THREE from 'three';
import { lerpAng, frente, pos, inclina, maos } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { LAY, scene, V3, sm, rnd, CIRC, CAIXAS } from './estado.js';
import { nAldeao, nFaixa, nCarreg, CO, KIT, CO0, gBoi } from './modelos.js';
import { terreno } from './cenario.js';
import { CAMPO, corta, rebrota } from './trigal.js';
import { corpo, ator, madeira, ferro, chao, anda, cil, barra } from './gente.js';

const ceifeiro = corpo(ator(nAldeao, 1.7, CAMPO.x0 + 0.3, CAMPO.z1 + 0.5, Math.PI / 2, 'Andar'));
const atadeira = corpo(ator(nFaixa, 1.6, CAMPO.x0 - 1, CAMPO.z1 + 1.2, Math.PI / 2, 'Parado'));
const carregador = corpo(ator(nCarreg, 1.72, LAY.carro.x - 1.5, LAY.carro.z - 1, -Math.PI / 2, 'Parado'));
const FILEIRAS = Math.floor((CAMPO.z1 - CAMPO.z0 - 0.4) / 0.9);
const zFila = (r) => CAMPO.z1 - 0.45 - r * 0.9;
const CE = { e: 'corta', fila: 0, dir: 1, x: CAMPO.x0 + 0.3, t: 0, desdeFeixe: 0 };
const FOICE = new THREE.Group();
{ const cabo = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.022, 0.16, 6), madeira); cabo.position.y = -0.06;
  const lam = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.012, 3, 10, Math.PI * 1.15), ferro); lam.position.set(0.16, 0.02, 0); lam.rotation.x = Math.PI / 2;
  FOICE.add(cabo, lam); sombra(FOICE); scene.add(FOICE); }
const FEIXES = [];
function soltaFeixe(x, z, ang) { const o = CO.Feixe_Deitado.clone(); o.position.set(x, terreno(x, z) + 0.02, z); o.rotation.y = ang; o.scale.setScalar(0.85); sombra(o); scene.add(o); FEIXES.push({ o, st: 'solto' }); }
function ceifeiroPasso(dt, t) {
  const st = ceifeiro, o = st.o;
  let aE = null, aD = null, inc = 0;
  if (CE.e === 'corta') {
    const zf = zFila(CE.fila);
    lerpAng(o, Math.atan2(CE.dir * 0.55, -1), Math.min(1, dt * 4));
    const v = 0.3 * dt; CE.x += CE.dir * v; CE.desdeFeixe += v;
    o.position.x = CE.x; o.position.z = zf + 0.55; chao(st);
    st.toca('Andar'); st.A.Andar.timeScale = 0.45;
    const f = frente(st), lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize(), base = o.position.clone();
    const fase = (t % 1.1) / 1.1;
    const agarra = base.clone().addScaledVector(f, 0.55).addScaledVector(lado, 0.12).add(V3(0, 0.45, 0));
    aE = fase < 0.75 ? agarra.clone().add(V3(0, fase > 0.4 ? 0.12 : 0, 0)) : base.clone().addScaledVector(f, 0.3).addScaledVector(lado, 0.35).add(V3(0, 0.75, 0));
    const sw = fase < 0.4 ? -0.6 : fase < 0.7 ? -0.6 + 1.4 * sm(0.4, 0.7, fase) : 0.8 - 1.4 * sm(0.7, 1, fase);
    aD = base.clone().addScaledVector(f, 0.5 + 0.1 * Math.cos(sw)).addScaledVector(lado, -0.35 * Math.cos(sw * 1.4) + 0.3 * Math.sin(sw)).add(V3(0, 0.28, 0));
    inc = 0.75;
    corta(o.position.x + CE.dir * 0.35, zf + 0.1, 0.55); corta(o.position.x, o.position.z, 0.5);
    if (CE.desdeFeixe > 2.0) { CE.desdeFeixe = 0; soltaFeixe(o.position.x - CE.dir * 0.4, zf + 0.75, (rnd() - 0.5) * 0.5); }
    if ((CE.dir > 0 && CE.x > CAMPO.x1 - 0.25) || (CE.dir < 0 && CE.x < CAMPO.x0 + 0.25)) { corta(CE.x, zf, 0.7); CE.fila++; CE.dir *= -1; CE.e = CE.fila < FILEIRAS ? 'vira' : 'fim'; CE.t = 0; }
    FOICE.position.copy(pos(st.os.bD[2])); FOICE.rotation.set(0, o.rotation.y + sw - 1.2, -0.3);
  } else if (CE.e === 'vira') {
    st.A.Andar.timeScale = 1;
    if (anda(st, V3(CE.x, 0, zFila(CE.fila) + 0.55), dt, 0.6)) CE.e = 'corta';
    FOICE.position.copy(pos(st.os.bD[2])); FOICE.rotation.set(0, o.rotation.y - 1.2, -0.8);
  } else {
    st.A.Andar.timeScale = 1;
    if (anda(st, V3(CAMPO.x0 - 0.8, 0, CAMPO.z1 + 0.8), dt, 0.9)) {
      st.toca('Parado'); CE.t += dt;
      if (CE.t > 10 && !FEIXES.some((f) => f.st === 'solto')) {
        rebrota(); for (const f of FEIXES) if (f.st !== 'levado') scene.remove(f.o);
        FEIXES.length = 0; CE.fila = 0; CE.dir = 1; CE.x = CAMPO.x0 + 0.3; CE.e = 'vira';
      }
    }
    FOICE.position.copy(pos(st.os.bD[2])); FOICE.rotation.set(0, o.rotation.y - 1.2, -0.8);
  }
  st.inc += (inc - st.inc) * Math.min(1, dt * 4); inclina(st, st.inc);
  maos(st, aE || pos(st.os.bE[2]), aD || pos(st.os.bD[2]), dt, aE ? 1 : 0, 9);
}
const AT_ = { e: 'segue', t: 0, alvo: null };
function atadeiraPasso(dt) {
  const st = atadeira, o = st.o;
  let aE = null, aD = null, inc = 0;
  if (AT_.e === 'segue') {
    AT_.alvo = FEIXES.find((f) => f.st === 'solto') || null;
    if (AT_.alvo) AT_.e = 'vai';
    else { const p = ceifeiro.o.position.clone().add(V3(-CE.dir * 2.4, 0, 0.9)); if (o.position.distanceTo(p) > 1.2) anda(st, p, dt, 0.8); else { st.toca('Parado'); lerpAng(o, Math.atan2(ceifeiro.o.position.x - o.position.x, ceifeiro.o.position.z - o.position.z), dt * 3); } }
  } else if (AT_.e === 'vai') {
    if (anda(st, AT_.alvo.o.position.clone().add(V3(0, 0, 0.6)), dt, 0.85)) { AT_.e = 'amarra'; AT_.t = 0; }
  } else {
    AT_.t += dt; st.toca('Parado');
    const fp = AT_.alvo.o.position;
    lerpAng(o, Math.atan2(fp.x - o.position.x, fp.z - o.position.z), Math.min(1, dt * 6));
    const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize(), g = AT_.t * 7;
    aE = fp.clone().addScaledVector(lado, 0.14).add(V3(0, 0.22 + 0.05 * Math.sin(g), 0));
    aD = fp.clone().addScaledVector(lado, -0.14).add(V3(Math.cos(g) * 0.06, 0.2 + 0.05 * Math.cos(g), Math.sin(g) * 0.06));
    inc = 0.95 * sm(0, 0.5, AT_.t) * (1 - sm(2.4, 2.9, AT_.t));
    if (AT_.t > 1.2 && AT_.alvo.st === 'solto') { AT_.alvo.st = 'amarrado'; AT_.alvo.o.scale.set(0.85, 0.9, 0.72); }
    if (AT_.t > 3) AT_.e = 'segue';
  }
  st.inc += (inc - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  maos(st, aE || pos(st.os.bE[2]), aD || pos(st.os.bD[2]), dt, aE ? 1 : 0, 10);
}
// carroça com boi (no planalto ao lado do trigal). Cheia, o carregador puxa o boi pela rota do Blender (JOGO_rota_carroca):
// desce a rampa, passa entre o pátio da ínsula e o aprisco, segue a estrada e para no ramal da eira. Lá descarrega os
// feixes junto das pilhas da eira, vira a carroça e volta.
const CARRO = { x: LAY.carro.x, z: LAY.carro.z, r: 0, n: 0, max: 8, anda: false, entregues: 0 };
const carroca = KIT['casa-porta/oficios.glb'].Carroca.clone(); sombra(carroca); /* a carroça do kit modelado (rodas de raios, varais) */ carroca.position.set(CARRO.x, LAY.carro.y - 0.02, CARRO.z); carroca.rotation.order = 'YXZ'; carroca.rotation.y = CARRO.r; scene.add(carroca);
const carga = CO.Carroca_Carga.clone(); sombra(carga); carroca.add(carga); carga.visible = false; carga.rotation.y = Math.PI / 2; carga.position.set(0, 0.2, 0.35);
carroca.updateMatrixWorld(true);
const CX_C = { x0: 0, x1: 0, z0: 0, z1: 0 }; CAIXAS.push(CX_C);          // a caixa de colisão anda com a carroça
const _bx = new THREE.Box3();
function caixaCarro() { _bx.setFromObject(carroca); CX_C.x0 = _bx.min.x + 0.2; CX_C.x1 = _bx.max.x - 0.2; CX_C.z0 = _bx.min.z + 0.2; CX_C.z1 = _bx.max.z - 0.2; }
caixaCarro();
const LADO_C = CO0.NPC_Carregar.clone().sub(CO0.Carroca);
const boiCarro = ator(gBoi, 1.45, 0, 0, 0, 'Parado');
const PONTA = 2.7;                 // do meio da carroça até o boi
const C_BOI = { x: 0, z: 0, r: 0.9 }; CIRC.push(C_BOI);
// ---------- a rota ----------
const ROTA_C = (LAY.rota_carro || []).map(([x, z]) => V3(x, 0, z));
const RL = [0]; for (let i = 1; i < ROTA_C.length; i++) RL.push(RL[i - 1] + ROTA_C[i].distanceTo(ROTA_C[i - 1]));
const LROTA = RL[RL.length - 1] || 0;
function naRota(s) {          // ponto da rota a s metros do começo (além das pontas, segue a reta do último trecho)
  const n = ROTA_C.length; let i = 0;
  if (s <= 0) i = 0; else if (s >= LROTA) i = n - 2; else while (i < n - 2 && RL[i + 1] < s) i++;
  const a = ROTA_C[i], b = ROTA_C[i + 1], k = (s - RL[i]) / Math.max(1e-6, RL[i + 1] - RL[i]);
  return a.clone().lerp(b, k);
}
const DY_C = (LAY.carro.y - 0.02) - terreno(CARRO.x, CARRO.z);       // o quanto a carroça afunda no chão
// põe a carroça em (x, z) virada para o ângulo th, inclinada com o chão; o boi vai na frente
function poeCarro(p, th, boiAnda) {
  const f = V3(Math.sin(th), 0, Math.cos(th));
  const hf = terreno(p.x + f.x * 1.3, p.z + f.z * 1.3), hr = terreno(p.x - f.x * 1.3, p.z - f.z * 1.3);
  carroca.position.set(p.x, (hf + hr) / 2 + DY_C, p.z); carroca.rotation.y = th; carroca.rotation.x = -Math.atan2(hf - hr, 2.6);
  boiCarro.o.position.set(p.x + f.x * PONTA, 0, p.z + f.z * PONTA); chao(boiCarro);
  if (boiAnda !== null) boiCarro.o.rotation.y = boiAnda;
  C_BOI.x = boiCarro.o.position.x; C_BOI.z = boiCarro.o.position.z; caixaCarro();
}
const angRota = (s, sent) => { const a = naRota(s), b = naRota(s + sent * PONTA); return Math.atan2(b.x - a.x, b.z - a.z); };
poeCarro(V3(CARRO.x, 0, CARRO.z), CARRO.r, CARRO.r);
const LUGAR_C = () => { const f = V3(Math.sin(carroca.rotation.y), 0, Math.cos(carroca.rotation.y)); return carroca.position.clone().addScaledVector(f, -2.6).setY(0); };   // atrás da carroça, do lado do trigal
// pilha dos feixes que chegam na eira (junto das pilhas que já estão lá)
const PILHAS = LAY.objetos.filter((o) => o.no === 'Feixe_Pilha');
const PILHA = PILHAS.length ? V3(PILHAS.reduce((s, o) => s + o.p[0], 0) / PILHAS.length, 0, PILHAS.reduce((s, o) => s + o.p[2], 0) / PILHAS.length) : V3(LAY.eira.x + 2.5, 0, LAY.eira.z);
const ENTREGUES = [];
const NAS_COSTAS = [];           // os feixes que o carregador leva da carroça para a pilha
const CORDA_B = cil(0.012);  CORDA_B.visible = false;
const VIAGEM = { s: 0, th: 0, giro: 0, alvo: 0 };
const V_CARRO = 0.75;

const CA = { e: 'espera', t: 0, alvo: null };
function carregadorPasso(dt) {
  const st = carregador, o = st.o;
  let aE = null, aD = null, inc = 0;
  const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  const ombro = () => pos(st.os.sp3).add(V3(0, 0.3, 0)).addScaledVector(frente(st), 0.05);
  const topo = carroca.localToWorld(V3(0, 1.2, 0));
  const cabecaBoi = () => boiCarro.o.position.clone().addScaledVector(frente(boiCarro), 1.0).add(V3(0, 1.0, 0));
  // ao lado da cabeça do boi, segurando a corda
  const guia = () => { const f = frente(boiCarro); return boiCarro.o.position.clone().addScaledVector(f, 0.7).add(V3(f.z * 0.85, 0, -f.x * 0.85)); };
  const puxa = (vel) => {
    const g = guia(); if (o.position.distanceTo(g.setY(o.position.y)) > 0.08) anda(st, g, dt, vel); else { st.toca('Andar'); lerpAng(o, boiCarro.o.rotation.y, dt * 6); }
    const mao = pos(st.os.bD[2]); barra(CORDA_B, mao, cabecaBoi()); CORDA_B.visible = true;
    aD = o.position.clone().addScaledVector(frente(st), 0.35).add(V3(0, 1.0, 0)).addScaledVector(lado, -0.2);
  };
  switch (CA.e) {
    case 'espera': {
      if (CARRO.n >= CARRO.max) { CA.e = LROTA > 5 ? 'pega_boi' : 'cheio'; CA.t = 0; break; }
      const livres = FEIXES.filter((f) => f.st === 'amarrado');
      if (livres.length) { const L = LUGAR_C(); livres.sort((a, b) => a.o.position.distanceTo(L) - b.o.position.distanceTo(L)); CA.alvo = livres[0]; CA.alvo.st = 'levado'; CA.e = 'vai'; }
      else if (anda(st, LUGAR_C(), dt, 0.9)) { st.toca('Parado'); lerpAng(o, Math.atan2(topo.x - o.position.x, topo.z - o.position.z), dt * 3); }
      break;
    }
    case 'vai': if (anda(st, CA.alvo.o.position.clone().add(V3(0, 0, 0.6)), dt, 1.0)) { CA.e = 'pega'; CA.t = 0; } break;
    case 'pega': {
      CA.t += dt; st.toca('Parado');
      const fp = CA.alvo.o.position; lerpAng(o, Math.atan2(fp.x - o.position.x, fp.z - o.position.z), Math.min(1, dt * 6));
      const k = sm(0.7, 1.4, CA.t);
      if (k > 0) CA.alvo.o.position.lerpVectors(CA.alvo.o.position, ombro(), k * 0.5);
      aE = CA.alvo.o.position.clone().addScaledVector(lado, 0.2).add(V3(0, 0.1, 0)); aD = CA.alvo.o.position.clone().addScaledVector(lado, -0.2).add(V3(0, 0.1, 0));
      inc = 0.85 * (1 - k);
      if (CA.t > 1.5) CA.e = 'traz';
      break;
    }
    case 'traz': {
      CA.alvo.o.position.copy(ombro()); CA.alvo.o.rotation.y = o.rotation.y + Math.PI / 2;
      aE = CA.alvo.o.position.clone().addScaledVector(lado, 0.12).add(V3(0, 0.05, 0)); aD = CA.alvo.o.position.clone().addScaledVector(lado, -0.25).add(V3(0, 0.08, 0));
      if (anda(st, LUGAR_C(), dt, 0.85)) { CA.e = 'joga'; CA.t = 0; }
      break;
    }
    case 'joga': {
      CA.t += dt; st.toca('Parado'); lerpAng(o, Math.atan2(topo.x - o.position.x, topo.z - o.position.z), Math.min(1, dt * 6));
      const k = sm(0.2, 1.0, CA.t), alto = ombro().add(V3(0, 0.55, 0)).addScaledVector(frente(st), 0.25);
      CA.alvo.o.position.copy(ombro().lerp(alto, Math.min(1, k * 1.6)).lerp(topo, sm(0.6, 1.0, k)));
      aE = CA.alvo.o.position.clone().addScaledVector(lado, 0.2); aD = CA.alvo.o.position.clone().addScaledVector(lado, -0.2);
      if (CA.t > 1.2) { scene.remove(CA.alvo.o); CA.alvo = null; CARRO.n++; atualizaCarga(); CA.e = 'espera'; }
      break;
    }
    case 'cheio': { CA.t += dt; st.toca('Conversando'); if (CA.t > 9) { CARRO.n = 0; atualizaCarga(); CA.e = 'espera'; } break; }   // (sem rota no layout)
    // ---------- a viagem até a eira ----------
    case 'pega_boi': {
      CARRO.anda = true; boiCarro.toca('Parado');
      if (anda(st, guia(), dt, 1.0)) { CA.e = 'leva'; VIAGEM.s = 0; }
      break;
    }
    case 'leva': {
      VIAGEM.s = Math.min(LROTA, VIAGEM.s + V_CARRO * dt);
      const th = angRota(VIAGEM.s, 1); poeCarro(naRota(VIAGEM.s), carroca.rotation.y + Math.atan2(Math.sin(th - carroca.rotation.y), Math.cos(th - carroca.rotation.y)) * Math.min(1, dt * 3), th);
      boiCarro.toca('Andar'); puxa(1.2);
      if (VIAGEM.s >= LROTA) { boiCarro.toca('Parado'); CA.e = 'desc_vai'; CA.t = 0; }
      break;
    }
    case 'desc_vai': {         // vai ao lado da carroça que dá para a pilha
      CORDA_B.visible = false;
      const f = V3(Math.sin(carroca.rotation.y), 0, Math.cos(carroca.rotation.y)), l = V3(f.z, 0, -f.x);
      const sinal = Math.sign(l.dot(PILHA.clone().sub(carroca.position).setY(0))) || 1;
      const p = carroca.position.clone().addScaledVector(l, sinal * 1.25).addScaledVector(f, -0.4).setY(0);
      if (anda(st, p, dt, 1.0)) { CA.e = 'desc_pega'; CA.t = 0; }
      break;
    }
    case 'desc_pega': {
      CA.t += dt; st.toca('Parado'); lerpAng(o, Math.atan2(topo.x - o.position.x, topo.z - o.position.z), Math.min(1, dt * 6));
      if (!NAS_COSTAS.length) {
        for (let i = 0; i < Math.min(2, CARRO.n); i++) { const fx = CO.Feixe_Deitado.clone(); fx.scale.setScalar(0.85); sombra(fx); scene.add(fx); NAS_COSTAS.push(fx); }
        CARRO.n -= NAS_COSTAS.length; atualizaCarga();
      }
      const k = sm(0.2, 1.2, CA.t);
      NAS_COSTAS.forEach((fx, i) => { fx.position.copy(topo.clone().lerp(ombro().add(V3(0, i * 0.14, 0)), k)); fx.rotation.y = o.rotation.y + Math.PI / 2; });
      aE = NAS_COSTAS[0].position.clone().addScaledVector(lado, 0.2); aD = NAS_COSTAS[0].position.clone().addScaledVector(lado, -0.2);
      if (CA.t > 1.4) CA.e = 'desc_leva';
      break;
    }
    case 'desc_leva': {
      NAS_COSTAS.forEach((fx, i) => { fx.position.copy(ombro().add(V3(0, i * 0.14, 0))); fx.rotation.y = o.rotation.y + Math.PI / 2; });
      aE = NAS_COSTAS[0].position.clone().addScaledVector(lado, 0.12); aD = NAS_COSTAS[0].position.clone().addScaledVector(lado, -0.25);
      const alvo = PILHA.clone().add(carroca.position.clone().sub(PILHA).setY(0).normalize().multiplyScalar(0.8));
      if (anda(st, alvo, dt, 0.95)) { CA.e = 'desc_solta'; CA.t = 0; }
      break;
    }
    case 'desc_solta': {
      CA.t += dt; st.toca('Parado'); lerpAng(o, Math.atan2(PILHA.x - o.position.x, PILHA.z - o.position.z), Math.min(1, dt * 6));
      const k = sm(0.1, 0.9, CA.t);
      NAS_COSTAS.forEach((fx, i) => {
        if (!fx.userData.alvo) { const a = rnd() * 6.28, r = 0.15 + rnd() * 0.45; fx.userData.alvo = V3(PILHA.x + Math.cos(a) * r, terreno(PILHA.x + Math.cos(a) * r, PILHA.z + Math.sin(a) * r) + 0.06 + (ENTREGUES.length % 4) * 0.1 + i * 0.1, PILHA.z + Math.sin(a) * r); fx.userData.r = rnd() * 6.28; }
        fx.position.copy(ombro().add(V3(0, i * 0.14, 0)).lerp(fx.userData.alvo, k)); fx.rotation.y += (fx.userData.r - fx.rotation.y) * k * 0.2;
      });
      inc = 0.6 * sm(0.1, 0.6, CA.t) * (1 - sm(0.9, 1.3, CA.t));
      if (CA.t > 1.3) {
        for (const fx of NAS_COSTAS) { ENTREGUES.push(fx); CARRO.entregues++; }
        NAS_COSTAS.length = 0;
        while (ENTREGUES.length > 14) scene.remove(ENTREGUES.shift());      // os mais antigos já foram para a eira
        if (CARRO.n > 0) CA.e = 'desc_vai'; else { CA.e = 'vira'; VIAGEM.giro = 0; VIAGEM.th0 = carroca.rotation.y; VIAGEM.sent = -1; }
      }
      break;
    }
    case 'vira': {           // vira a carroça no lugar: o boi dá a volta
      const vel = Math.PI / 7; VIAGEM.giro = Math.min(Math.PI, VIAGEM.giro + vel * dt);
      const th = VIAGEM.th0 + VIAGEM.sent * VIAGEM.giro;
      poeCarro(carroca.position.clone(), th, th + VIAGEM.sent * Math.PI / 2);
      boiCarro.toca('Andar'); puxa(1.1);
      if (VIAGEM.giro >= Math.PI) {
        if (VIAGEM.s > 0.1) CA.e = 'volta';
        else { CA.e = 'espera'; CARRO.anda = false; boiCarro.toca('Parado'); CORDA_B.visible = false; poeCarro(carroca.position.clone(), CARRO.r, CARRO.r); }
      }
      break;
    }
    case 'volta': {
      VIAGEM.s = Math.max(0, VIAGEM.s - V_CARRO * dt);
      const th = angRota(VIAGEM.s, -1); poeCarro(naRota(VIAGEM.s), carroca.rotation.y + Math.atan2(Math.sin(th - carroca.rotation.y), Math.cos(th - carroca.rotation.y)) * Math.min(1, dt * 3), th);
      boiCarro.toca('Andar'); puxa(1.2);
      if (VIAGEM.s <= 0) { CA.e = 'vira'; VIAGEM.giro = 0; VIAGEM.th0 = carroca.rotation.y; VIAGEM.sent = 1; poeCarro(V3(CARRO.x, 0, CARRO.z), carroca.rotation.y, null); }
      break;
    }
  }
  st.inc += (inc - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  maos(st, aE || pos(st.os.bE[2]), aD || pos(st.os.bD[2]), dt, aE || aD ? 1 : 0, 10);
}
function atualizaCarga() { carga.visible = CARRO.n > 0; carga.scale.set(1, Math.max(0.15, CARRO.n / CARRO.max), 1); }

export { boiCarro, ceifeiro, atadeira, carregador, ceifeiroPasso, atadeiraPasso, carregadorPasso, CARRO, carroca };
