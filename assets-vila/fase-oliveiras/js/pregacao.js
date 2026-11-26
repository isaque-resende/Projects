// Monte das Oliveiras: o mirante da pregação. Uma laje de pedra de frente para o templo (Mc 13,3), com um brilho
// suave no chão, como o dos jumentos de Betfagé. A primeira vez, a lembrança do sermão (cenas.js); depois, só a legenda.
import * as THREE from 'three';
import { LAY, scene, E, fala } from './estado.js';
import { terreno } from './cenario.js';
import './jogador.js';     // só para manter a ordem de montagem

const [x, , z] = LAY.pregacao;
const anel = new THREE.Mesh(new THREE.RingGeometry(1.5, 1.9, 40), new THREE.MeshBasicMaterial({ color: 0xfff1c8, transparent: true, opacity: 0.4, depthWrite: false }));
anel.rotation.x = -Math.PI / 2; anel.position.set(x, terreno(x, z) + 0.06, z); scene.add(anel);
const PREG = { x, z, perto: false };

function pregacaoPasso(pj, t) {
  PREG.perto = Math.hypot(pj.x - x, pj.z - z) < 2.4;
  anel.material.opacity = (E.pregacao ? 0.18 : 0.32) + 0.12 * Math.sin(t * 2);
}
// depois da lembrança: só a legenda
function lembrar() {
  E.pregacao = true;
  fala('A laje de pedra, defronte do templo. Aqui ele falou do fim de tudo, e disse: “Vigiai” (Mc 13.37).'); setTimeout(() => fala(''), 6000);
}

export { PREG, pregacaoPasso, lembrar };
