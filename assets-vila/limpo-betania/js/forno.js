// Betânia: o forno de pão. A padeira sova, molda, assa e traz o pão; o fogo e a fumaça.
// ---------- padeira: sova, molda, põe a massa na pá, assa pela boca de cima do forno e traz o pão na pá ----------
import * as THREE from 'three';
import { frente, pos, lerpAng, inclina, maos } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { corpo, scene, anda } from './estado.js';
import { padeira, FO } from './personagens.js';

corpo(padeira); padeira.toca('Parado');
const CF = FO.Forno_Corpo, centroForno = CF.getCenter(new THREE.Vector3()).setY(0);
const raioForno = Math.min(CF.max.x - CF.min.x, CF.max.z - CF.min.z) / 2;
const TOPO = centroForno.clone().setY(CF.max.y);
const PA_A = FO.NPC_Amassar.p.clone().setY(0);
const MASSA = FO.Forno_Massa_1 ? FO.Forno_Massa_1.getCenter(new THREE.Vector3()) : PA_A.clone().setY(0.6);
const MESA_Y = MASSA.y;
const dirMesa = PA_A.clone().sub(centroForno).setY(0).normalize();
const PA_B = centroForno.clone().addScaledVector(dirMesa, raioForno + 0.32);          // encostada no forno          // ao lado do forno, do lado da mesa
const angA = Math.atan2(MASSA.x - PA_A.x, MASSA.z - PA_A.z), angB = Math.atan2(centroForno.x - PA_B.x, centroForno.z - PA_B.z);
const matMassa = new THREE.MeshStandardMaterial({ color: 0xeedcb8, roughness: 1, flatShading: true });
const matPao = new THREE.MeshStandardMaterial({ color: 0xc98b45, roughness: 1, flatShading: true });
const PAO = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 5), matMassa); PAO.castShadow = true; scene.add(PAO);
const PAES = [];
const FOGO = { chamas: [], fumaca: [] };
{
  const cor = [0xffd25a, 0xff9a2e, 0xff6a1a];
  for (let i = 0; i < 5; i++) { const m = new THREE.Mesh(new THREE.ConeGeometry(0.045 + (i % 2) * 0.02, 0.22, 5), new THREE.MeshBasicMaterial({ color: cor[i % 3], transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
    const a = i / 5 * 6.28, d = i ? raioForno * 0.15 : 0; m.userData = { x: Math.cos(a) * d, z: Math.sin(a) * d, f: Math.random() * 6 }; scene.add(m); FOGO.chamas.push(m); }
  const br = new THREE.Mesh(new THREE.CircleGeometry(raioForno * 0.28, 10), new THREE.MeshBasicMaterial({ color: 0xff5a14 })); br.rotation.x = -Math.PI / 2; br.position.copy(TOPO).add(new THREE.Vector3(0, -0.16, 0)); scene.add(br);
  FOGO.luz = new THREE.PointLight(0xff8a3a, 2, 5, 1.6); FOGO.luz.position.copy(TOPO).add(new THREE.Vector3(0, 0.4, 0)); scene.add(FOGO.luz);
  const mf = new THREE.MeshStandardMaterial({ color: 0xd8d2c8, roughness: 1, transparent: true, opacity: 0.5, depthWrite: false, flatShading: true });
  for (let i = 0; i < 14; i++) { const m = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14, 0), mf.clone()); m.userData = { t: i / 14 * 4 }; scene.add(m); FOGO.fumaca.push(m); }
}
function fogoPasso(dt, t) {
  FOGO.chamas.forEach((m, i) => { const u = m.userData, s = 0.75 + 0.35 * Math.sin(t * 9 + u.f) + 0.15 * Math.sin(t * 23 + i); m.scale.set(1, s, 1); m.position.set(TOPO.x + u.x, TOPO.y - 0.04 + 0.09 * s, TOPO.z + u.z); m.rotation.y = t * 2 + i; m.visible = !(PAD.e === 'enfia' || PAD.e === 'tira') || i % 2 === 0; });
  FOGO.luz.intensity = 1.6 + 0.6 * Math.sin(t * 11) + 0.3 * Math.sin(t * 27);
  for (const m of FOGO.fumaca) { const u = m.userData; u.t = (u.t + dt) % 4; const k = u.t / 4;
    m.position.set(TOPO.x + Math.sin(u.t * 1.3 + m.id) * 0.1 + k * 0.8, TOPO.y + 0.3 + k * 3.0, TOPO.z + Math.cos(u.t * 1.1 + m.id) * 0.1 - k * 0.5);
    m.scale.setScalar(0.6 + k * 2.4); m.material.opacity = 0.45 * Math.min(1, u.t * 3) * (1 - k); m.rotation.set(u.t, u.t * 0.7, 0); }
}
// pá de padeiro: lâmina na origem, cabo ao longo de +x
const madPa = new THREE.MeshStandardMaterial({ color: 0x9a7048, roughness: 1, flatShading: true });
const PAH = new THREE.Group();
{
  const cabo = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.021, 1.2, 6), madPa); cabo.rotation.z = -Math.PI / 2; cabo.position.x = 0.74;
  const lam = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.014, 10), madPa); lam.scale.z = 0.85;
  PAH.add(cabo, lam); sombra(PAH); scene.add(PAH);
}
const EIXO_X = new THREE.Vector3(1, 0, 0);
const lateralMesa = new THREE.Vector3(-dirMesa.z, 0, dirMesa.x);
const PA_REPOUSO = { B: MASSA.clone().addScaledVector(lateralMesa, -0.45).setY(MESA_Y + 0.02), d: dirMesa.clone().addScaledVector(lateralMesa, -0.35).setY(0).normalize() };
const PRATO = MASSA.clone().addScaledVector(lateralMesa, 0.42).setY(MESA_Y + 0.025);     // os pães assados ficam na outra ponta da mesa
const PAD = { e: 'sova', t: 0, leva: false, n: 0 };
padeira.o.rotation.y = angA;
// pá de padeiro fica deitada na mesa (só enfeite); o pão do tabun vai e volta nas mãos, como se faz de verdade
PAH.position.copy(PA_REPOUSO.B); PAH.quaternion.setFromUnitVectors(EIXO_X, PA_REPOUSO.d);
// regra: mãos abaixo dos ombros, cotovelos junto do corpo; o pão acompanha as mãos reais
function padeiraPasso(dt, t) {
  const sm = (a, b, x) => { const k = Math.min(1, Math.max(0, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
  const st = padeira, o = st.o, f = frente(st);
  PAD.t += dt;
  const T = PAD.t, muda = (e) => { PAD.e = e; PAD.t = 0; };
  const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  const ombro = pos(st.os.bE[0]).add(pos(st.os.bD[0])).multiplyScalar(0.5);
  const colo = o.position.clone().addScaledVector(f, 0.3).setY(o.position.y + 0.98);      // onde se carrega o pão, na frente da barriga
  const massaMesa = MASSA.clone().setY(MESA_Y + 0.05);
  const boca = TOPO.clone().lerp(o.position.clone().setY(TOPO.y), Math.min(0.55, raioForno * 0.6 / Math.max(0.01, TOPO.distanceTo(o.position.clone().setY(TOPO.y)))));
  const fundo = boca.clone().add(new THREE.Vector3(0, -0.12, 0));
  let aE = null, aD = null, inc = 0, maosNoPao = null;
  const segura = (c) => { aE = c.clone().addScaledVector(lado, 0.12); aD = c.clone().addScaledVector(lado, -0.12); maosNoPao = c; };
  switch (PAD.e) {
    case 'sova': {                                    // empurra a massa com a base das mãos e dobra de volta
      st.toca('Parado'); lerpAng(o, angA, Math.min(1, dt * 6));
      const p = 0.5 + 0.5 * Math.sin(t * 2.6), centro = massaMesa.clone().addScaledVector(f, -0.02 + 0.06 * p);
      aE = centro.clone().addScaledVector(lado, 0.09).add(new THREE.Vector3(0, 0.03 - 0.02 * p, 0));
      aD = centro.clone().addScaledVector(lado, -0.09).add(new THREE.Vector3(0, 0.03 - 0.02 * p, 0));
      inc = 0.28 + 0.06 * p;
      PAO.material = matMassa; PAO.position.copy(massaMesa).addScaledVector(f, 0.03 * p).setY(MESA_Y + 0.045); PAO.scale.set(1.05 + 0.2 * p, 0.55 - 0.12 * p, 1.0 + 0.1 * p);
      if (T > 7) muda('molda');
      break;
    }
    case 'molda': {                                   // bate a massa até virar um disco
      st.toca('Parado'); const k = Math.min(1, T / 1.2), bate = Math.abs(Math.sin(T * 9)) * 0.03;
      aE = massaMesa.clone().addScaledVector(lado, 0.1).add(new THREE.Vector3(0, 0.03 + bate, 0)); aD = massaMesa.clone().addScaledVector(lado, -0.1).add(new THREE.Vector3(0, 0.03 + bate, 0));
      inc = 0.3; PAO.position.copy(massaMesa).setY(MESA_Y + 0.03); PAO.scale.set(1.25 + 0.25 * k, 0.38 - 0.18 * k, 1.25 + 0.25 * k);
      if (T > 1.4) { PAD.leva = true; muda('ergue'); }
      break;
    }
    case 'ergue': { st.toca('Parado'); segura(massaMesa.clone().lerp(colo, sm(0, 0.7, T))); inc = 0.25 * (1 - sm(0, 0.7, T)); if (T > 0.8) muda('leva'); break; }
    case 'leva': segura(colo); if (anda(st, PA_B, dt, 0.6)) muda('poe'); break;
    case 'poe': case 'tira': {                        // inclina sobre o forno, desce as mãos pela boca de cima e cola / descola o pão
      st.toca('Parado'); lerpAng(o, angB, Math.min(1, dt * 6));
      const k = T < 1.0 ? sm(0, 1.0, T) : 1 - sm(1.6, 2.5, T), c = colo.clone().lerp(T < 1.6 && T > 0.6 ? fundo : boca, Math.min(1, k * 1.3));
      if (PAD.e === 'poe' ? T < 1.3 : T > 1.3) segura(c); else { aE = c.clone().addScaledVector(lado, 0.12); aD = c.clone().addScaledVector(lado, -0.12); }
      inc = 0.45 * k;
      if (T > 1.25 && T < 1.35) { if (PAD.e === 'poe') PAD.leva = false; else { PAD.leva = true; PAO.material = matPao; PAO.scale.set(1.5, 0.32, 1.5); } }
      if (T > 2.6) muda(PAD.e === 'poe' ? 'espera' : 'volta');
      break;
    }
    case 'espera': st.toca('Parado'); lerpAng(o, angB + Math.sin(T * 0.8) * 0.4, Math.min(1, dt * 3)); if (T > 5) muda('tira'); break;
    case 'volta': segura(colo); if (anda(st, PA_A, dt, 0.6)) muda('descarrega'); break;
    case 'descarrega': {                              // pousa o pão no prato, na outra ponta da mesa
      st.toca('Parado'); lerpAng(o, angA, Math.min(1, dt * 6));
      const lugar = PRATO.clone().addScaledVector(f, -0.1 + 0.2 * (PAD.n % 2)).setY(MESA_Y + 0.04);
      const k = sm(0, 0.8, T); if (T < 1.0) segura(colo.clone().lerp(lugar, k)); inc = 0.3 * k * (1 - sm(1.0, 1.4, T));
      if (T > 0.9 && PAD.leva) { const pn = PAO.clone(); pn.position.copy(lugar); scene.add(pn); PAES.push(pn); PAD.n++; if (PAES.length > 2) scene.remove(PAES.shift()); PAD.leva = false; }
      if (T > 1.5) { PAO.material = matMassa; PAO.scale.set(1.05, 0.55, 1.0); muda('sova'); }
      break;
    }
  }
  for (const a of [aE, aD]) if (a && a.y > ombro.y - 0.12) a.y = ombro.y - 0.12;          // nunca acima dos ombros
  st.inc += (inc - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  maos(st, aE || pos(st.os.bE[2]), aD || pos(st.os.bD[2]), dt, aE ? 1 : 0, 9, 0.12, 0.7);
  if (maosNoPao && PAD.leva) PAO.position.copy(pos(st.os.bE[2]).add(pos(st.os.bD[2])).multiplyScalar(0.5)).add(new THREE.Vector3(0, 0.04, 0));
  PAO.visible = PAD.leva || ['sova', 'molda'].includes(PAD.e);
  if (PAD.leva && PAO.material === matMassa) PAO.scale.set(1.45, 0.2, 1.45);
}

export { fogoPasso, padeiraPasso };
