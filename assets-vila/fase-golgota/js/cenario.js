// Gólgota: o cenário que vem do Blender (terreno da pedreira, a estrada de Emaús, o caminho do horto, a mureta, o
// rochedo do Gólgota com as cavidades da "caveira", as três cruzes e os cortes da pedreira, em golgota_cenario.glb),
// o sepulcro (o rochedo de Betânia, casa-porta/tumulo_rocha.glb, encaixado na parede de pedra, com a pedra redonda já
// rolada para o lado), as árvores, pedras, moitas e flores do layout e a maquete de Jerusalém, deslocada: a origem daqui
// é o ponto 'golgota' do mundo da maquete (LAY.mundo), então a Porta de Genat e os muros aparecem no lugar certo.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { scene, texChao, LAY, V3, sm, CIRC } from './estado.js';
import { gCen, gJer, gPlantas, gFlores, gRocha, gPedra, KIT } from './modelos.js';

// ---------- terreno, estrada, caminho, mureta, o Gólgota, as cruzes e a pedreira ----------
let TERRENO = null;
const TRILHAS = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Golgota_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Golgota_Trilha')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; TRILHAS.push(o); }
  else if (o.name.startsWith('Golgota_Cavidades')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
suaviza(TERRENO, true); for (const e of TRILHAS) suaviza(e, false);
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false); for (const e of TRILHAS) texturizaChao(e, TX, true);
const terreno = mapaAltura(TERRENO, 0.35, { suave: true });

// ---------- Jerusalém: a maquete, deslocada para cá ----------
// Os chãos dela perdem o pedaço que o terreno daqui cobre, e a borda vai até a altura do terreno daqui, sem degrau. O
// Gólgota dela (a vista de longe) sai inteiro; as árvores e a estrada dela, só o que cai em cima do terreno daqui.
const [MX, MY, MZ] = LAY.mundo;
const JER = gJer.scene; JER.name = 'Jerusalem'; JER.position.set(-MX, -MY, -MZ);
{
  const [X0, X1, Z0, Z1] = LAY.terreno, FAIXA = 40;
  const cl = (v, a, b) => Math.min(b - 0.5, Math.max(a + 0.5, v));
  const dentro = (x, z, m = 1) => x > X0 + m && x < X1 - m && z > Z0 + m && z < Z1 - m;
  const CHAOS = [], tira = [];
  JER.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    if (/^Golgota/.test(o.name)) { tira.push(o); return; }
    const chao = /^(Vale_Chao|Vale_Miolo|Leste_Chao|Cidade_Chao)/.test(o.name);
    if (!chao && !/^(Arvores|Estradas)/.test(o.name)) return;
    const g = o.geometry; if (!g.index) { const n = g.attributes.position.count; g.setIndex([...Array(n).keys()]); }
    const pos = g.attributes.position, den = new Uint8Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i) - MX, lz = pos.getZ(i) - MZ;
      den[i] = dentro(lx, lz) ? 1 : 0;
      if (!chao) continue;
      const dd = Math.hypot(Math.max(X0 - lx, 0, lx - X1), Math.max(Z0 - lz, 0, lz - Z1));
      if (dd < FAIXA) { const alvo = terreno(cl(lx, X0, X1), cl(lz, Z0, Z1)) + MY - 0.35; pos.setY(i, alvo + (pos.getY(i) - alvo) * sm(0, FAIXA, dd)); }
    }
    const I = g.index.array, novo = [];
    for (let t = 0; t < I.length; t += 3) if (chao ? !(den[I[t]] && den[I[t + 1]] && den[I[t + 2]]) : !(den[I[t]] || den[I[t + 1]] || den[I[t + 2]])) novo.push(I[t], I[t + 1], I[t + 2]);
    g.setIndex(novo); pos.needsUpdate = true;
    if (chao) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); CHAOS.push(o); }
  });
  for (const o of tira) o.removeFromParent();
  for (const o of CHAOS) { suaviza(o, !o.name.startsWith('Cidade')); texturizaChao(o, TX, o.name.startsWith('Cidade')); }
}
scene.add(JER);

// ---------- a estrada: pontos a cada meio metro, da ponta sudeste (a cidade) até a noroeste (Emaús) ----------
const ROTA = new THREE.CatmullRomCurve3(LAY.estrada.map(([x, z]) => V3(x, 0, z)));
const AMOS = []; { const L = ROTA.getLength(), n = Math.ceil(L * 2); for (let i = 0; i <= n; i++) AMOS.push(ROTA.getPointAt(i / n)); }
function naRota(x, z) { let m = 1e9, k = 0; for (let i = 0; i < AMOS.length; i++) { const d = (AMOS[i].x - x) ** 2 + (AMOS[i].z - z) ** 2; if (d < m) { m = d; k = i; } } return [k, Math.sqrt(m)]; }

// ---------- árvores, pedras e objetos do layout ----------
instanciaLonge(scene, LAY.objetos, KIT);
const ARVS = [];
poePertos(scene, LAY.objetos, KIT, (o, n) => {
  if (!/^(Oliveira|Figueira)/.test(o.no)) return;
  const b = new THREE.Box3().setFromObject(n), c = b.getCenter(new THREE.Vector3()), t = b.getSize(new THREE.Vector3());
  ARVS.push({ n, c, r: Math.max(t.x, t.z) * 0.5, y0: b.min.y + t.y * 0.3, y1: b.max.y, op: 1, mats: null });
});

// ---------- moitas, malvas e flores (instanciadas) ----------
{
  const PL = {}; for (const g of [gPlantas, gFlores]) for (const n of g.scene.children) PL[n.name] = n;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), loc = new THREE.Matrix4();
  for (const [nome, raiz] of Object.entries(PL)) {
    const lista = LAY.plantas.filter((e) => e[0] === nome); if (!lista.length) continue;
    raiz.position.set(0, 0, 0); raiz.updateMatrixWorld(true);
    raiz.traverse((mm) => {
      if (!mm.isMesh) return;
      loc.copy(mm.matrixWorld);
      const inst = new THREE.InstancedMesh(mm.geometry, mm.material, lista.length);
      lista.forEach(([, x, y, z, r, k], i) => { q.setFromAxisAngle(CIMA, r); s.setScalar(k); inst.setMatrixAt(i, m4.compose(p.set(x, y, z), q, s).multiply(loc)); });
      inst.castShadow = inst.receiveShadow = true; inst.frustumCulled = false; scene.add(inst);
    });
  }
}

// ---------- o sepulcro: o rochedo com a porta (0,9 x 1,7 m) na face +x, de frente para o leste; a pedra, rolada ----------
const TUM = {};
{
  const tum = gRocha.scene; tum.position.set(...LAY.tumulo.p); tum.rotation.y = LAY.tumulo.r; sombra(tum); scene.add(tum);
  tum.updateMatrixWorld(true);
  const boca = tum.getObjectByName('Tumulo_Boca');
  const pedra = gPedra.scene.getObjectByName('Tumulo_Pedra'); pedra.position.set(0, 0, 0); sombra(pedra);
  const rP = 1.02, rolou = 2.2;
  // de pé na soleira, encostada na face; rolada de lado (Mc 16.4), girando sobre si mesma: como a de Lázaro, aberta
  pedra.position.copy(boca.position).add(new THREE.Vector3(0.3, rP - 0.02, 0)); pedra.rotation.set(0, Math.PI / 2, 0); tum.add(pedra);
  const q0 = pedra.quaternion.clone();
  pedra.position.add(new THREE.Vector3(rolou, 0, 0).applyQuaternion(q0));
  pedra.quaternion.copy(q0).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -rolou / rP));
  // o calcário daqui é mais claro e mais frio que o rochedo de Betânia: o mesmo modelo, puxado para o tom da pedreira
  const TOM = new THREE.Color(0.86, 0.97, 1.16);
  tum.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); m.material.color.multiply(TOM); } });
  tum.updateMatrixWorld(true);
  const pw = pedra.getWorldPosition(new THREE.Vector3()); CIRC.push({ x: pw.x, z: pw.z, r: rP * 0.9 });
  Object.assign(TUM, { tum, pedra, boca: boca.getWorldPosition(new THREE.Vector3()), frente: new THREE.Vector3(1, 0, 0).applyQuaternion(tum.quaternion).setY(0).normalize() });
}

// ---------- o sol acaba de nascer (leste, um pouco ao norte: é abril): bate de frente na face do Gólgota e na porta do sepulcro ----------
const SOL_DIR = V3(0.9, 0.42, 0.14).normalize();

export { terreno, AMOS, naRota, TERRENO, ARVS, TUM, SOL_DIR, JER };
