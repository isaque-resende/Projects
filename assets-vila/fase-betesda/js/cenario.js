// Betesda: o cenário que vem do Blender (o planalto, a estrada ao longo do muro, os dois tanques com o dique, o piso,
// as colunas e os cinco telhados dos alpendres, em betesda_cenario.glb), as árvores, pedras, cercas, esteiras e jarros do
// layout, as moitas e flores, e a maquete de Jerusalém, deslocada: a origem daqui é o ponto 'betesda' do mundo da maquete
// (LAY.mundo), então o muro norte, a Porta das Ovelhas, a Antônia e o templo aparecem no lugar certo. Da maquete saem a
// Betesda pequena (os Tanques), as casas, as árvores e a estrada que caem em cima do terreno daqui.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { scene, texChao, LAY, V3, sm } from './estado.js';
import { gCen, gJer, gPlantas, gFlores, KIT } from './modelos.js';

// ---------- terreno, estrada, tanques, piso, colunas e telhados ----------
let TERRENO = null;
const TRILHAS = [], TELHADOS = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Betesda_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Betesda_Trilha')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; TRILHAS.push(o); }
  else if (o.name.startsWith('Betesda_Tanques')) { o.receiveShadow = true; }          // a pedra (e o limo junto da água), com textura
  else if (o.name.startsWith('Telhado_')) {
    o.material = o.material.clone(); o.castShadow = true; o.receiveShadow = true;
    const nome = o.name.replace(/[._]\d+$/, '').replace(/_?\d+$/, ''); const r = LAY.telhados[Object.keys(LAY.telhados).find((k) => o.name.startsWith(k))];
    if (r) TELHADOS.push({ o, r, op: 1 });
  }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
suaviza(TERRENO, true); for (const e of TRILHAS) suaviza(e, false);
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false); for (const e of TRILHAS) texturizaChao(e, TX, true);
const terrenoBase = mapaAltura(TERRENO, 0.35, { suave: true });
// dentro do complexo (os alpendres e o dique), fora da água, o chão é o piso de lajes: a suavização do relevo puxava a
// beira dos tanques para baixo, e quem andava ali escorregava até o fundo, por baixo do piso
const [CX0_, CX1_, CZ0_, CZ1_] = LAY.complexo;
const naAgua = (x, z) => LAY.caixas.some(([x0, x1, z0, z1]) => x > x0 && x < x1 && z > z0 && z < z1);
const terreno = (x, z) => { const h = terrenoBase(x, z); return x > CX0_ && x < CX1_ && z > CZ0_ && z < CZ1_ && !naAgua(x, z) ? Math.max(h, LAY.deck) : h; };

// ---------- Jerusalém: a maquete, deslocada para cá ----------
const [MX, MY, MZ] = LAY.mundo;
const JER = gJer.scene; JER.name = 'Jerusalem'; JER.position.set(-MX, -MY, -MZ);
{
  const [X0, X1, Z0, Z1] = LAY.terreno, FAIXA = 40, MZL = LAY.muro_z;
  const cl = (v, a, b) => Math.min(b - 0.5, Math.max(a + 0.5, v));
  const CHAOS = [];
  JER.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    const chao = /^(Vale_Chao|Vale_Miolo|Leste_Chao|Cidade_Chao)/.test(o.name);
    if (!chao && !/^(Arvores|Estradas|Casas_Cidade|Tanques)/.test(o.name)) return;
    // os prédios: só o que fica do lado de fora do muro (ao norte dele) e em cima do terreno daqui
    const dentro = chao ? (x, z) => x > X0 + 1 && x < X1 - 1 && z > Z0 + 1 && z < Z1 - 1 : (x, z) => x > X0 && x < X1 && z > Z0 && z < MZL - 0.5;
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
    if (chao) { for (let t = 0; t < I.length; t += 3) if (!(den[I[t]] && den[I[t + 1]] && den[I[t + 2]])) novo.push(I[t], I[t + 1], I[t + 2]); }
    else {      // os prédios saem inteiros: uma caixa (8 vértices seguidos) com o centro dentro
      for (let t = 0; t < I.length; t += 3) {
        const cx = (pos.getX(I[t]) + pos.getX(I[t + 1]) + pos.getX(I[t + 2])) / 3 - MX, cz = (pos.getZ(I[t]) + pos.getZ(I[t + 1]) + pos.getZ(I[t + 2])) / 3 - MZ;
        if (!dentro(cx, cz)) novo.push(I[t], I[t + 1], I[t + 2]);
      }
    }
    g.setIndex(novo); pos.needsUpdate = true;
    if (chao) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); CHAOS.push(o); }
  });
  for (const o of CHAOS) { suaviza(o, !o.name.startsWith('Cidade')); texturizaChao(o, TX, o.name.startsWith('Cidade')); }
  // a Porta das Ovelhas é modelada aqui (Porta_Ovelhas): sai da maquete o trecho do muro entre as duas torres
  const PXo = LAY.porta[0];
  JER.traverse((o) => {
    if (!o.isMesh || !/^(Muralhas|Muro_Cidade)/.test(o.name)) return;
    const g = o.geometry; if (!g.index) { const n = g.attributes.position.count; g.setIndex([...Array(n).keys()]); }
    const pos = g.attributes.position, I = g.index.array, novo = [];
    for (let t = 0; t < I.length; t += 3) {
      const cx = (pos.getX(I[t]) + pos.getX(I[t + 1]) + pos.getX(I[t + 2])) / 3 - MX, cz = (pos.getZ(I[t]) + pos.getZ(I[t + 1]) + pos.getZ(I[t + 2])) / 3 - MZ;
      if (!(Math.abs(cx - PXo) < 7.2 && cz > MZL - 4 && cz < MZL + 9)) novo.push(I[t], I[t + 1], I[t + 2]);
    }
    g.setIndex(novo);
  });
}
scene.add(JER);

// ---------- a estrada: pontos a cada meio metro, da ponta leste (o Getsêmani) até a oeste (o Gólgota) ----------
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

// ---------- a água dos dois tanques: a textura do usuário, correndo devagar (a mesma da pia do templo) ----------
const AGUA = (() => {
  const tx = new THREE.TextureLoader().load('../fase-betesda/agua.png'); tx.colorSpace = THREE.SRGBColorSpace; tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.repeat.set(31 / 3.2, 16.5 / 3.2);
  const mat = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.35, transparent: true, opacity: 0.8, depthWrite: false });      // dá para ver o fundo e os degraus
  for (const [z0, z1] of [[-42.0, -25.5], [-21.5, -5.0]]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(31.0, z1 - z0), mat); m.rotation.x = -Math.PI / 2; m.position.set(0, LAY.agua + 0.03, (z0 + z1) / 2); m.receiveShadow = true; m.name = 'Betesda_Agua'; scene.add(m);
  }
  return tx;
})();
let T_AGUA = 0;

// ---------- os telhados dos alpendres: quando um deles fica entre a câmera e o jogador (ou ele está debaixo), fica quase
// transparente (a câmera vem de cima) ----------
function telhadosPasso(p, dt, cam) {
  T_AGUA += dt; AGUA.offset.set(Math.sin(T_AGUA * 0.12) * 0.05 + T_AGUA * 0.005, Math.cos(T_AGUA * 0.1) * 0.04);      // a água se move devagar
  const yT = LAY.deck + 4.75, yc = p.y + 1.2;
  for (const t of TELHADOS) {
    const [x0, x1, z0, z1] = t.r, den = (x, z, m) => x > x0 - m && x < x1 + m && z > z0 - m && z < z1 + m;
    let sob = den(p.x, p.z, 0.6);
    if (!sob && cam && cam.y > yT && yc < yT) { const k = (yT - yc) / (cam.y - yc); sob = den(p.x + (cam.x - p.x) * k, p.z + (cam.z - p.z) * k, 1.0); }
    const alvo = 1; if (Math.abs(alvo - t.op) < 0.005) continue;
    t.op += (alvo - t.op) * Math.min(1, dt * 6); if (Math.abs(alvo - t.op) < 0.01) t.op = alvo;
    const tr = t.op < 0.999, m = t.o.material;
    if (m.transparent !== tr) { m.transparent = tr; m.depthWrite = !tr; m.needsUpdate = true; } m.opacity = t.op; t.o.castShadow = !tr;
  }
}

const SOL_DIR = V3(0.9, 0.42, 0.14).normalize();

export { terreno, AMOS, naRota, TERRENO, ARVS, SOL_DIR, JER, TELHADOS, telhadosPasso };
