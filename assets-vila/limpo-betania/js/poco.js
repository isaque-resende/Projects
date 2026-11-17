// Betânia: o poço. A aguadeira puxa o balde, enche o cântaro e leva para casa.
// ---------- poço: água no fundo, sarilho de madeira com roldana; uma mulher puxa o balde e enche o cântaro ----------
import * as THREE from 'three';
import { CIMA, frente, pos, lerpAng, inclina, maos } from '../../limpo-motor/atores.js';
import { nos, sombra } from '../../limpo-motor/base.js';
import { P, scene, CIRC, corpo, ator, anda } from './estado.js';
import { gOfi, nLenco } from './modelos.js';
import { CASAS } from './casas.js';
import { OB } from './vila.js';
import './oficios.js';     // só para manter a ordem de montagem

const ppo = P('poco', -4.6, 4.6), POCO = { c: new THREE.Vector3(ppo.x, 0, ppo.z) };
{
  const k = 0.8, n = nos(gOfi).Poco.clone(); n.position.set(0, 0, 0); n.scale.setScalar(k); n.updateMatrixWorld(true);
  const v = new THREE.Vector3(), bx = new THREE.Box3(); let topo = 0;
  n.traverse((o) => { if (!o.isMesh) return; const pa = o.geometry.attributes.position; for (let i = 0; i < pa.count; i++) { v.fromBufferAttribute(pa, i).applyMatrix4(o.matrixWorld); topo = Math.max(topo, v.y); } });
  n.traverse((o) => { if (!o.isMesh) return; const pa = o.geometry.attributes.position; for (let i = 0; i < pa.count; i++) { v.fromBufferAttribute(pa, i).applyMatrix4(o.matrixWorld); if (v.y > topo * 0.7) bx.expandByPoint(v); } });
  const cc = bx.getCenter(new THREE.Vector3());
  n.position.set(POCO.c.x - cc.x, 0, POCO.c.z - cc.z); sombra(n); scene.add(n);
  POCO.borda = topo; POCO.raio = (bx.max.x - bx.min.x) / 2;
  CIRC.push({ x: POCO.c.x, z: POCO.c.z, r: POCO.raio + 0.1 });
  // água escura lá embaixo, com um brilho que mexe
  const agua = new THREE.Mesh(new THREE.CircleGeometry(POCO.raio * 0.74, 20), new THREE.MeshStandardMaterial({ color: 0x2f5f78, roughness: 0.15, metalness: 0.1 }));
  agua.rotation.x = -Math.PI / 2; agua.position.set(POCO.c.x, POCO.borda - 0.32, POCO.c.z); scene.add(agua); POCO.agua = agua;
  // sarilho: dois postes, travessa e roldana sobre o centro (postes de lado para quem puxa)
  const mad = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 1, flatShading: true });
  const H = 2.05, lat = new THREE.Vector3(0, 0, 1);
  for (const sg of [-1, 1]) {
    const pst = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, H, 6), mad);
    pst.position.copy(POCO.c).addScaledVector(lat, sg * (POCO.raio + 0.12)).setY(H / 2); sombra(pst); scene.add(pst);
    CIRC.push({ x: pst.position.x, z: pst.position.z, r: 0.12 });
  }
  const trav = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2 * (POCO.raio + 0.12) + 0.25, 6), mad);
  trav.rotation.x = Math.PI / 2; trav.position.copy(POCO.c).setY(H - 0.05); sombra(trav); scene.add(trav);
  const rold = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.035, 6, 12), mad);
  rold.position.copy(POCO.c).setY(H - 0.2); sombra(rold); scene.add(rold);
  POCO.rold = rold; POCO.topoCorda = POCO.c.clone().setY(H - 0.2);
}
const aguadeira = corpo(ator(nLenco, 1.58, POCO.c.x - POCO.raio - 0.5, POCO.c.z + 0.1, Math.PI / 2, 'Parado'));
const AG = { e: 'puxa', t: 0, cheio: 0, puxado: 0 };
const AG_LUGAR = aguadeira.o.position.clone();
const AG_ANG = Math.atan2(POCO.c.x - AG_LUGAR.x, POCO.c.z - AG_LUGAR.z);
const madeira = new THREE.MeshStandardMaterial({ color: 0x7a5232, roughness: 1, flatShading: true });
const BALDE = new THREE.Group();
{
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.1, 0.22, 8, 1, true), madeira); b.material.side = THREE.DoubleSide;
  const fundo = new THREE.Mesh(new THREE.CircleGeometry(0.1, 8), madeira); fundo.rotation.x = -Math.PI / 2; fundo.position.y = -0.1;
  const alca = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.008, 4, 10, Math.PI), new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.6 })); alca.position.y = 0.11;
  const ag = new THREE.Mesh(new THREE.CircleGeometry(0.12, 8), new THREE.MeshStandardMaterial({ color: 0x5d9cc0, roughness: 0.2 })); ag.rotation.x = -Math.PI / 2; ag.position.y = 0.07;
  BALDE.add(b, fundo, alca, ag); BALDE.userData.agua = ag; sombra(BALDE); scene.add(BALDE);
}
const matCorda = new THREE.MeshStandardMaterial({ color: 0xc9b07a, roughness: 1 });
const CORDAS = [0, 1, 2].map(() => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 1, 4), matCorda); m.castShadow = true; scene.add(m); return m; });
const AGUA = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 1, 6), new THREE.MeshStandardMaterial({ color: 0x8fc4e0, transparent: true, opacity: 0.7, roughness: 0.3 })); AGUA.visible = false; scene.add(AGUA);
const CANTARO = OB.Jarro_Alto.clone(); CANTARO.scale.setScalar(1.5); sombra(CANTARO); scene.add(CANTARO);
const altCant = new THREE.Box3().setFromObject(CANTARO).getSize(new THREE.Vector3()).y;
const CANT_CHAO = AG_LUGAR.clone().add(new THREE.Vector3(-0.2, 0, 0.8));
CANTARO.position.copy(CANT_CHAO);
const CASA_AG = CASAS[1].mundo(CASAS[1].px + 0.9, CASAS[1].pz + 1.1);
const corda = (m, a, b) => { if (!a || !b) { m.visible = false; return; } const d = b.clone().sub(a), L = d.length(); if (L < 0.01) { m.visible = false; return; } m.visible = true; m.position.copy(a).add(b).multiplyScalar(0.5); m.scale.y = L; m.quaternion.setFromUnitVectors(CIMA, d.normalize()); };
function aguadeiraPasso(dt, t) {
  const st = aguadeira, o = st.o, f = frente(st);
  AG.t += dt;
  const T = AG.t, muda = (e) => { AG.e = e; AG.t = 0; };
  const lado = pos(st.os.bE[0]).sub(pos(st.os.bD[0])).setY(0).normalize();
  const peito = pos(st.os.sp3);
  let aE = null, aD = null, inc = 0, peso = 1, maoCorda = null;
  AGUA.visible = false;
  POCO.agua.material.color.setHSL(0.56, 0.45, 0.3 + 0.03 * Math.sin(t * 2));
  const R = POCO.topoCorda;
  const alca = () => BALDE.position.clone().add(new THREE.Vector3(0, 0.13, 0));
  switch (AG.e) {
    case 'puxa': {                                    // mão sobre mão ao longo da corda que desce da roldana
      st.toca('Parado'); lerpAng(o, AG_ANG, Math.min(1, dt * 5));
      const base = peito.clone().addScaledVector(f, 0.28).add(new THREE.Vector3(0, -0.15, 0));   // onde a corda chega ao corpo
      const linha = (u) => R.clone().lerp(base, u);
      const ciclo = 1.1, fase = (T % ciclo) / ciclo;
      // cada mão: agarra no alto (u=0.45), puxa até embaixo (u=0.95), solta e volta por fora
      const uMao = (ph) => ph < 0.6 ? 0.45 + 0.5 * (ph / 0.6) : 0.95 - 0.5 * ((ph - 0.6) / 0.4);
      const fE = fase, fD = (fase + 0.5) % 1;
      aE = linha(uMao(fE)).addScaledVector(lado, 0.05); aD = linha(uMao(fD)).addScaledVector(lado, -0.05);
      if (fE >= 0.6) aE.addScaledVector(lado, 0.12).addScaledVector(f, -0.05);
      if (fD >= 0.6) aD.addScaledVector(lado, -0.12).addScaledVector(f, -0.05);
      inc = 0.12 + 0.08 * Math.sin(fase * Math.PI * 4);
      const puxando = fE < 0.6 ? st.mE : st.mD;
      maoCorda = puxando;
      const sobe = Math.min(1, T / 6.5);
      BALDE.position.copy(POCO.c).setY(POCO.borda - 0.45 + sobe * 0.8); BALDE.quaternion.identity(); BALDE.userData.agua.visible = true;
      if (T > 6.6) muda('tira');
      break;
    }
    case 'tira': {                                    // segura a corda com uma mão e puxa o balde para a borda com a outra
      st.toca('Parado');
      const k = Math.min(1, T / 1.0);
      const m = POCO.c.clone().lerp(o.position, 0.55 * k).setY(POCO.borda + 0.35 + 0.15 * k);
      BALDE.position.copy(m);
      aE = alca().addScaledVector(lado, 0.06); aD = alca().addScaledVector(lado, -0.06); inc = 0.25;
      if (T > 1.2) muda('vira');
      break;
    }
    case 'vira': case 'despeja': {
      st.toca('Parado');
      lerpAng(o, Math.atan2(CANT_CHAO.x - o.position.x, CANT_CHAO.z - o.position.z), Math.min(1, dt * 4));
      const boca = CANT_CHAO.clone().setY(altCant + 0.28);
      const m = AG.e === 'vira' ? peito.clone().addScaledVector(f, 0.32).add(new THREE.Vector3(0, -0.3, 0)) : boca.clone().addScaledVector(f, -0.14);
      BALDE.position.lerp(m, Math.min(1, dt * 6));
      const tomb = AG.e === 'despeja' ? Math.min(1.5, T * 2) : 0;
      BALDE.quaternion.setFromAxisAngle(new THREE.Vector3().crossVectors(CIMA, f).normalize(), tomb);
      BALDE.userData.agua.visible = !(AG.e === 'despeja' && T > 2.0);
      aE = BALDE.position.clone().addScaledVector(lado, 0.13).add(new THREE.Vector3(0, 0.06, 0)); aD = BALDE.position.clone().addScaledVector(lado, -0.13).add(new THREE.Vector3(0, -0.05, 0));
      inc = AG.e === 'despeja' ? 0.35 : 0.1;
      if (AG.e === 'despeja' && T > 0.5 && T < 2.2) {
        const de = BALDE.position.clone().addScaledVector(f, 0.13), ate = CANT_CHAO.clone().setY(altCant * 0.9);
        AGUA.position.copy(de).add(ate).multiplyScalar(0.5); AGUA.scale.y = de.distanceTo(ate); AGUA.quaternion.setFromUnitVectors(CIMA, de.clone().sub(ate).normalize()); AGUA.visible = true;
      }
      if (AG.e === 'vira' && T > 1.0) muda('despeja');
      if (AG.e === 'despeja' && T > 2.6) { AG.cheio++; muda(AG.cheio >= 2 ? 'ergue' : 'devolve'); }
      break;
    }
    case 'devolve': {                                 // devolve o balde ao poço e ele desce
      st.toca('Parado'); lerpAng(o, AG_ANG, Math.min(1, dt * 5));
      BALDE.quaternion.identity();
      const desce = Math.max(0, (T - 0.8) / 1.2);
      BALDE.position.lerp(POCO.c.clone().setY(POCO.borda + 0.25 - desce * 0.7), Math.min(1, dt * 6));
      if (T < 0.9) { aE = alca().addScaledVector(lado, 0.06); aD = alca().addScaledVector(lado, -0.06); }
      inc = 0.25; if (T > 2.1) muda('puxa');
      break;
    }
    case 'ergue': {                                   // agacha, pega o cântaro e põe na cabeça
      st.toca('Parado');
      BALDE.quaternion.identity(); BALDE.position.lerp(POCO.c.clone().setY(POCO.borda + 0.12).addScaledVector(f, -0.15), Math.min(1, dt * 4));
      const k = Math.min(1, T / 1.6), cab = pos(st.os.cab).add(new THREE.Vector3(0, 0.12, 0));
      CANTARO.position.copy(CANT_CHAO.clone().lerp(cab, k));
      aE = CANTARO.position.clone().addScaledVector(lado, 0.14).add(new THREE.Vector3(0, altCant * 0.55, 0));
      aD = CANTARO.position.clone().addScaledVector(lado, -0.14).add(new THREE.Vector3(0, altCant * 0.55, 0));
      inc = 0.5 * (1 - k);
      if (T > 1.8) muda('leva');
      break;
    }
    case 'leva': case 'volta': {
      if (AG.e === 'leva') {
        CANTARO.position.copy(pos(st.os.cab).add(new THREE.Vector3(0, 0.1, 0)));
        aE = CANTARO.position.clone().addScaledVector(lado, 0.16).add(new THREE.Vector3(0, altCant * 0.5, 0));
        if (anda(st, CASA_AG, dt, 0.8)) { CANTARO.position.copy(CASA_AG.clone().addScaledVector(f, 0.45)); muda('volta'); }
      } else {
        peso = 0;
        if (anda(st, AG_LUGAR, dt, 0.9)) { AG.cheio = 0; CANTARO.position.copy(CANT_CHAO); BALDE.position.copy(POCO.c).setY(POCO.borda - 0.45); muda('puxa'); }
      }
      break;
    }
  }
  // cordas: roldana → balde; roldana → mão que puxa (ou à borda); sobra enrolada no chão
  corda(CORDAS[0], R.clone().add(new THREE.Vector3(0, -0.11, 0)), alca());
  const chaoCorda = AG_LUGAR.clone().addScaledVector(new THREE.Vector3(0, 0, 1), -0.5).setY(0.02);
  if (maoCorda) { corda(CORDAS[1], R.clone().add(new THREE.Vector3(-0.11, 0, 0)), maoCorda); corda(CORDAS[2], maoCorda, chaoCorda); }
  else { const borda = POCO.c.clone().setY(POCO.borda).addScaledVector(new THREE.Vector3(-1, 0, 0), POCO.raio * 0.9); corda(CORDAS[1], R.clone().add(new THREE.Vector3(-0.11, 0, 0)), borda); corda(CORDAS[2], borda, chaoCorda); }
  st.inc += (inc - st.inc) * Math.min(1, dt * 5); inclina(st, st.inc);
  if (AG.e === 'leva') maos(st, aE, pos(st.os.bD[2]), dt, 1, 12);
  else maos(st, aE || pos(st.os.bE[2]), aD || pos(st.os.bD[2]), dt, aE ? peso : 0, AG.e === 'puxa' ? 18 : 10);
}

export { aguadeira, aguadeiraPasso };
