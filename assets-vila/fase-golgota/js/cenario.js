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
import { gCen, gJer, gPlantas, gFlores, gTumulo, KIT } from './modelos.js';

// ---------- terreno, estrada, caminho, mureta, o Gólgota, as cruzes e a pedreira ----------
let TERRENO = null;
const TRILHAS = [];
// as texturas do usuário para esta fase: a rocha calcária da pedreira, o chão da pedreira velha, a estrada, a madeira bruta
// das cruzes e a pedra seca da mureta do horto
const TXG = Object.fromEntries(['rocha', 'chao', 'estrada', 'madeira', 'pedra_seca'].map((k) => [k, texChao('../fase-golgota/tex/' + k + '.jpg?v=1')]));
// textura projetada pelos três eixos (a malha não tem UV para ela): o 'modo' decide como misturar com a cor de vértice
function triplanar(mesh, tex, esc, modo) {
  if (!mesh.geometry.attributes.normal) mesh.geometry.computeVertexNormals();
  const m = mesh.material = mesh.material.clone();
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTri = { value: tex };
    sh.vertexShader = 'varying vec3 vWP2; varying vec3 vWN2;\n' + sh.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\n vWP2 = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN2 = normalize(mat3(modelMatrix) * objectNormal);');
    sh.fragmentShader = 'uniform sampler2D uTri; varying vec3 vWP2; varying vec3 vWN2;\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n vec3 nw = abs(normalize(vWN2)); nw /= (nw.x + nw.y + nw.z);\n vec3 tri = texture2D(uTri, vWP2.zy * ' + esc.toFixed(3) + ').rgb * nw.x + texture2D(uTri, vWP2.xy * ' + esc.toFixed(3) + ').rgb * nw.z + texture2D(uTri, vWP2.xz * ' + esc.toFixed(3) + ').rgb * nw.y;\n' + modo);
  };
  m.customProgramCacheKey = () => 'tri-' + esc + '-' + modo.length; m.needsUpdate = true;
}
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Golgota_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Golgota_Trilha')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; TRILHAS.push(o); }
  else if (o.name.startsWith('Golgota_Face')) { triplanar(o, TXG.rocha, 0.15, 'diffuseColor.rgb = tri * vColor.rgb * 1.5;'); o.castShadow = o.receiveShadow = true; }
  else if (/^(Golgota_Rocha|Pedreira)/.test(o.name)) { triplanar(o, TXG.rocha, 0.13, 'float l = dot(vColor.rgb, vec3(0.3, 0.59, 0.11)); diffuseColor.rgb = tri * clamp(l * 1.9, 0.55, 1.15);'); o.castShadow = o.receiveShadow = true; }
  else if (o.name.startsWith('Cruzes')) { triplanar(o, TXG.madeira, 0.9, 'float l = dot(vColor.rgb, vec3(0.3, 0.59, 0.11)); if (l < 0.25) diffuseColor.rgb = tri * 1.05;'); o.castShadow = o.receiveShadow = true; }
  else if (o.name.startsWith('Mureta')) { triplanar(o, TXG.pedra_seca, 0.7, 'diffuseColor.rgb = tri;'); o.castShadow = o.receiveShadow = true; }
  else if (o.name.startsWith('Golgota_Cavidades')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
suaviza(TERRENO, true); for (const e of TRILHAS) suaviza(e, false);
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, { grama: TX.grama, terra: TXG.chao, rocha: TXG.rocha, puro: true }, false);       // o chão da pedreira, com a rocha nas paredes a pique
for (const e of TRILHAS) texturizaChao(e, { grama: TX.grama, terra: TXG.estrada, puro: true }, true);       // a estrada e o caminho do horto
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

// ---------- o sepulcro: o túmulo cavado num monte de calcário (tumulo/tumulo.glb, o da Betânia antiga), encostado na
// crista da pedreira, com a fachada lisa e a porta baixa de frente para o leste (é preciso abaixar-se para olhar dentro,
// Jo 20.5); a pedra redonda já rolada para o lado no seu sulco (Mc 16.4); o pátio na frente; dentro, os lençóis no chão
// e o lenço enrolado à parte (Jo 20.6-7) ----------
const TUM = {};
{
  const K = 1.3, raiz = gTumulo.scene; raiz.position.set(0, 0, 200);          // o modelo vem com o centro em z = -200
  const tum = new THREE.Group(); tum.add(raiz); tum.scale.setScalar(K); tum.rotation.y = Math.PI / 2;     // a fachada (+z do modelo) para o leste
  const [ox, , oz] = LAY.olhar; tum.position.set(ox - 1.4 * K, terreno(ox, oz) - 0.05, oz);                // o ponto de entrar fica onde o jogador se abaixa
  sombra(tum); scene.add(tum); tum.updateMatrixWorld(true);
  // o calcário do modelo, puxado para o tom quente da pedreira daqui
  const TOM = new THREE.Color(1.04, 0.94, 0.78);
  tum.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); m.material.color.multiply(TOM); m.receiveShadow = true; } });
  // dentro: os lençóis no chão e o lenço enrolado à parte
  const linho = new THREE.MeshStandardMaterial({ color: 0xe9e2d0, roughness: 1, flatShading: true });
  for (const [x, z, lx, lz] of [[0.75, -3.0, 0.42, 1.7], [0.95, -3.6, 0.3, 1.2]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(lx, 0.05, lz), linho); l.position.set(x, 0.03, z); tum.add(l); }
  const lenco = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.32, 7), linho); lenco.rotation.z = Math.PI / 2; lenco.position.set(-0.85, 0.1, -4.6); tum.add(lenco);
  // os vasos de aromas que as mulheres trouxeram para ungir o corpo, deixados junto da porta (Mc 16.1; Lc 24.1)
  const barro = new THREE.MeshStandardMaterial({ color: 0xb07a4e, roughness: 1, flatShading: true }), alab = new THREE.MeshStandardMaterial({ color: 0xe8dcc4, roughness: 0.8, flatShading: true });
  for (const [x, z, r, h, m] of [[1.7, 1.2, 0.13, 0.42, barro], [2.0, 1.55, 0.1, 0.3, alab], [1.45, 1.6, 0.08, 0.26, alab], [2.25, 1.15, 0.12, 0.36, barro]]) {
    const v = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.55, r, h, 8), m); v.position.set(x, h / 2 + 0.02, z); v.castShadow = true; tum.add(v);
    const b = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.35, r * 0.5, h * 0.25, 8), m); b.position.set(x, h + 0.02 + h * 0.12, z); tum.add(b);
  }
  tum.updateMatrixWorld(true);
  // a colisão: a pedra e a encosta do monte dos dois lados do pátio
  const pedra = tum.getObjectByName('Tumulo_Pedra'); const pw = pedra.getWorldPosition(new THREE.Vector3()); CIRC.push({ x: pw.x, z: pw.z, r: 0.75 });
  for (const [lx, lz, r] of [[-3.6, 0.6, 1.4], [3.4, 0.6, 1.4], [-6.0, -1.0, 2.0], [6.0, -1.0, 2.0], [-9.5, -3.5, 2.6], [9.5, -3.5, 2.6], [-12.0, -7.0, 2.8], [12.0, -7.0, 2.8]]) {
    const p = new THREE.Vector3(lx, 0, lz).applyMatrix4(tum.matrixWorld); CIRC.push({ x: p.x, z: p.z, r: r * K });
  }
  Object.assign(TUM, { tum, pedra, boca: new THREE.Vector3(0, 0, 0.2).applyMatrix4(tum.matrixWorld), frente: new THREE.Vector3(0, 0, 1).applyQuaternion(tum.quaternion).setY(0).normalize() });
}

// ---------- o sol acaba de nascer (leste, um pouco ao norte: é abril): bate de frente na face do Gólgota e na porta do sepulcro ----------
const SOL_DIR = V3(0.9, 0.42, 0.14).normalize();

export { terreno, AMOS, naRota, TERRENO, ARVS, TUM, SOL_DIR, JER };
