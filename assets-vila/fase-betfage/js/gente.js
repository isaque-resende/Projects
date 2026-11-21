// Betfagé: ferramentas para os personagens. Criação dos atores (motor comum), varas e cordas, e as partículas de palha e grão.
// assenta o ator na altura do chão
import * as THREE from 'three';
import { criaAtores, CIMA } from '../../limpo-motor/atores.js';
import { scene, rnd } from './estado.js';
import { terreno } from './cenario.js';
import './forno.js';     // só para manter a ordem de montagem

const chao = (st) => { const x = st.o.position.x, z = st.o.position.z, r = 0.14; st.o.position.y = Math.max(terreno(x, z), terreno(x + r, z), terreno(x - r, z), terreno(x, z + r), terreno(x, z - r)); };
const { MIX, ator, corpo, anda, passo } = criaAtores({ scene, rnd, alturaChao: terreno, assenta: chao, chegou: 0.06 });
// estica uma vara (cilindro de altura 1) do ponto a ao ponto b
const barra = (m, a, b) => { const d = b.clone().sub(a), L = d.length(); if (L < 1e-3) { m.visible = false; return; } m.visible = true; m.position.copy(a).add(b).multiplyScalar(0.5); m.scale.set(1, L, 1); m.quaternion.setFromUnitVectors(CIMA, d.normalize()); };
const madeira = new THREE.MeshStandardMaterial({ color: 0x7a5232, roughness: 1, flatShading: true });
const ferro = new THREE.MeshStandardMaterial({ color: 0x8d8a84, roughness: 0.6, metalness: 0.3, flatShading: true });
const cil = (r, mat = madeira) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 1, 6), mat); m.castShadow = true; scene.add(m); return m; };
// partículas: palha e grão
const PART = [];
const geoPart = new THREE.TetrahedronGeometry(0.035, 0);
const matPalha = new THREE.MeshStandardMaterial({ color: 0xe7cf8e, roughness: 1, flatShading: true });
const matGrao = new THREE.MeshStandardMaterial({ color: 0xb98a4a, roughness: 1, flatShading: true });
function solta(p, v, tipo, vida = 1.6) {
  let m = PART.find((q) => q.vida <= 0);
  if (!m) { if (PART.length > 90) return; m = { o: new THREE.Mesh(geoPart, matPalha), vida: 0, v: new THREE.Vector3() }; scene.add(m.o); PART.push(m); }
  m.o.material = tipo === 'grao' ? matGrao : matPalha; m.tipo = tipo; m.o.visible = true; m.o.position.copy(p); m.v.copy(v); m.vida = vida; m.o.scale.setScalar(tipo === 'grao' ? 0.7 : 1.2);
}
function partPasso(dt) {
  for (const m of PART) {
    if (m.vida <= 0) continue;
    m.vida -= dt;
    if (m.tipo === 'palha') { m.v.y -= 0.7 * dt; m.v.x += 0.5 * dt; m.v.z -= 0.5 * dt; m.o.rotation.x += dt * 6; m.o.rotation.z += dt * 4; }
    else m.v.y -= 7 * dt;
    m.o.position.addScaledVector(m.v, dt);
    const y = terreno(m.o.position.x, m.o.position.z) + 0.03;
    if (m.o.position.y < y) { m.o.position.y = y; m.v.set(0, 0, 0); }
    if (m.vida <= 0) m.o.visible = false;
  }
}

export { corpo, ator, madeira, ferro, chao, anda, passo, cil, barra, solta, MIX, partPasso };
