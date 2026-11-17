// Betfagé: a ceifa. O ceifeiro corta fileira por fileira, a mulher amarra os feixes e o homem leva à carroça.
import * as THREE from 'three';
import { lerpAng, frente, pos, inclina, maos } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { LAY, scene, V3, sm, rnd, caixaDe, CIRC } from './estado.js';
import { nAldeao, nFaixa, nCarreg, CO, KIT, CO0, gBoi } from './modelos.js';
import { terreno } from './cenario.js';
import { CAMPO, corta, rebrota } from './trigal.js';
import { corpo, ator, madeira, ferro, chao, anda } from './gente.js';

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
// carroça com boi (embaixo, à direita, entre o trigal e o pé do morro)
const CARRO = { x: LAY.carro.x, z: LAY.carro.z, r: 0, n: 0, max: 8 };
const carroca = KIT['casa-porta/oficios.glb'].Carroca.clone(); sombra(carroca); /* a carroça do kit modelado (rodas de raios, varais) */ carroca.position.set(CARRO.x, LAY.carro.y - 0.02, CARRO.z); carroca.rotation.y = CARRO.r; scene.add(carroca);
const carga = CO.Carroca_Carga.clone(); sombra(carga); carroca.add(carga); carga.visible = false; carga.rotation.y = Math.PI / 2; carga.position.set(0, 0.2, 0.35);
caixaDe(carroca, 0.2); carroca.updateMatrixWorld(true);
const LADO_C = CO0.NPC_Carregar.clone().sub(CO0.Carroca);
const LUGAR_C = (() => { const b = new THREE.Box3().setFromObject(carroca); return V3((b.min.x + b.max.x) / 2, 0, b.min.z - 0.55); })();   // atrás da carroça, do lado do trigal
const boiCarro = ator(gBoi, 1.45, 0, 0, 0, 'Parado');
{
  const b = new THREE.Box3().setFromObject(carroca), c = b.getCenter(new THREE.Vector3());
  const ponta = V3(Math.sin(CARRO.r), 0, Math.cos(CARRO.r));
  boiCarro.o.position.set(c.x + ponta.x * 2.7, 0, c.z + ponta.z * 2.7); chao(boiCarro);
  boiCarro.o.rotation.y = Math.atan2(boiCarro.o.position.x - c.x, boiCarro.o.position.z - c.z);
  CIRC.push({ x: boiCarro.o.position.x, z: boiCarro.o.position.z, r: 0.9 });
}
const CA = { e: 'espera', t: 0, alvo: null };
function carregadorPasso(dt) {
  const st = carregador, o = st.o;
  let aE = null, aD = null, inc = 0;
  const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  const ombro = () => pos(st.os.sp3).add(V3(0, 0.3, 0)).addScaledVector(frente(st), 0.05);
  const topo = carroca.localToWorld(V3(0, 1.2, 0));
  switch (CA.e) {
    case 'espera': {
      if (CARRO.n >= CARRO.max) { CA.e = 'cheio'; CA.t = 0; break; }
      const livres = FEIXES.filter((f) => f.st === 'amarrado');
      if (livres.length) { livres.sort((a, b) => a.o.position.distanceTo(LUGAR_C) - b.o.position.distanceTo(LUGAR_C)); CA.alvo = livres[0]; CA.alvo.st = 'levado'; CA.e = 'vai'; }
      else if (anda(st, LUGAR_C, dt, 0.9)) { st.toca('Parado'); lerpAng(o, Math.atan2(topo.x - o.position.x, topo.z - o.position.z), dt * 3); }
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
      if (anda(st, LUGAR_C, dt, 0.85)) { CA.e = 'joga'; CA.t = 0; }
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
    case 'cheio': { CA.t += dt; st.toca('Conversando'); if (CA.t > 9) { CARRO.n = 0; atualizaCarga(); CA.e = 'espera'; } break; }
  }
  st.inc += (inc - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  maos(st, aE || pos(st.os.bE[2]), aD || pos(st.os.bD[2]), dt, aE ? 1 : 0, 10);
}
function atualizaCarga() { carga.visible = CARRO.n > 0; carga.scale.set(1, Math.max(0.15, CARRO.n / CARRO.max), 1); }

export { boiCarro, ceifeiro, atadeira, carregador, ceifeiroPasso, atadeiraPasso, carregadorPasso };
