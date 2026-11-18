// Betânia: a lavoura. O boi puxa o arado, o lavrador vai atrás e os sulcos ficam na terra.
import * as THREE from 'three';
import { sombra } from '../../limpo-motor/base.js';
import { ator, scene } from './estado.js';
import { gBoi, nAldeao } from './modelos.js';
import { LAV } from './vila.js';
import './poco.js';     // só para manter a ordem de montagem

const boi = ator(gBoi, 1.55, 6, 8, Math.PI / 2, 'Andar');
const lavrador = ator(nAldeao, 1.7, 4, 8, Math.PI / 2, 'Andar');
const arado = new THREE.Group();
{
  const mad = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 1, flatShading: true });
  const ferro = new THREE.MeshStandardMaterial({ color: 0x55504a, roughness: 0.8, flatShading: true });
  const lanca = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.4, 6), mad); lanca.rotation.z = Math.PI / 2 - 0.25; lanca.position.set(1.15, 0.55, 0);
  const rabica = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.0, 6), mad); rabica.rotation.z = 0.6; rabica.position.set(-0.3, 0.55, 0);
  const relha = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.45, 5), ferro); relha.rotation.z = -Math.PI / 2 - 0.4; relha.position.set(0.15, 0.08, 0);
  const canga = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.9), mad); canga.position.set(2.3, 1.15, 0);
  arado.add(lanca, rabica, relha, canga); sombra(arado); scene.add(arado);
}
// sulcos que vão ficando para trás
const SULCO = new THREE.MeshStandardMaterial({ color: 0x5a3d26, roughness: 1, polygonOffset: true, polygonOffsetFactor: -3 });
const FAIXAS = [0, 1, 2, 3, 4, 5].map((i) => LAV.z0 + 0.7 + i * 0.95);
const sulcos = FAIXAS.map((z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 0.28), SULCO); m.rotation.x = -Math.PI / 2; m.position.set(LAV.x0 + 0.6, 0.04, z); m.scale.x = 0.001; scene.add(m); return m; });
// percurso fechado do boi: faixa por faixa com curva em U nas pontas, depois volta pela cabeceira
const TRILHA = []; // pontos a cada 5 cm; f = faixa da reta (ou -1)
{
  const xa = LAV.x0 + 0.9, xb = LAV.x1 - 0.8, P = 0.05;
  const reta = (x0, z0, x1, z1, f) => { const L = Math.hypot(x1 - x0, z1 - z0), n = Math.ceil(L / P); for (let i = 0; i < n; i++) TRILHA.push({ x: x0 + (x1 - x0) * i / n, z: z0 + (z1 - z0) * i / n, f }); };
  const curva = (cx, z0, lado) => { const n = Math.ceil(Math.PI * 0.5 / P); for (let i = 0; i < n; i++) { const a = Math.PI * i / n; TRILHA.push({ x: cx + lado * Math.sin(a) * 0.5, z: z0 + 0.5 - Math.cos(a) * 0.5, f: -1 }); } };
  FAIXAS.forEach((z, i) => {
    const ida = i % 2 === 0; reta(ida ? xa : xb, z, ida ? xb : xa, z, i);
    if (i < FAIXAS.length - 1) curva(ida ? xb : xa, z, ida ? 1 : -1);
  });
  const zl = FAIXAS[FAIXAS.length - 1], zf = FAIXAS[0];
  reta(xa, zl, xa - 0.6, zl - 0.4, -1); reta(xa - 0.6, zl - 0.4, xa - 0.6, zf + 0.4, -1); reta(xa - 0.6, zf + 0.4, xa, zf, -1);
}
const lav = { s: 3.5 / 0.05 };

// boi, arado e lavrador indo e voltando pelas faixas
function lavouraPasso(dt) {
      const N = TRILHA.length, em = (k) => TRILHA[((Math.floor(k) % N) + N) % N];
      const sAnt = lav.s; lav.s = (lav.s + 0.8 * dt / 0.05) % N;
      if (lav.s < sAnt) sulcos.forEach((m) => { m.scale.x = 0.001; });
      const pb = em(lav.s), pa = em(lav.s - 3.0 / 0.05), pl = em(lav.s - 3.9 / 0.05);
      const gira = (o, de, para, k) => { const a = Math.atan2(para.x - de.x, para.z - de.z); let d = a - o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); o.rotation.y += d * Math.min(1, dt * k); };
      boi.o.position.set(pb.x, 0, pb.z); gira(boi.o, pb, em(lav.s + 12), 5);
      arado.position.set(pa.x, 0, pa.z); arado.rotation.y = Math.atan2(-(pb.z - pa.z), pb.x - pa.x);
      lavrador.o.position.set(pl.x, 0, pl.z); gira(lavrador.o, pl, pa, 6);
      boi.toca('Andar'); lavrador.toca('Andar');
      if (pa.f >= 0) {   // o arado risca a faixa em que está
        const m = sulcos[pa.f], ini = pa.f % 2 === 0 ? LAV.x0 + 0.9 : LAV.x1 - 0.8;
        m.scale.x = Math.max(m.scale.x, Math.abs(pa.x - ini)); m.position.x = ini + Math.sign(pa.x - ini) * m.scale.x / 2;
      }
}

export { boi, lavrador, lavouraPasso };
