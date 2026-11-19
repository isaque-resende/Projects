// Getsêmani: o cenário que vem do Blender (terreno, trilha, mureta, a Rocha da Agonia e a gruta, em
// getsemani_cenario.glb), as oliveiras, pedras e moitas do layout, a prensa na boca da gruta, a lua cheia e
// Jerusalém no alto, do outro lado do Cedrom.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { scene, texChao, LAY, V3, sm } from './estado.js';
import { gCen, gPlantas, gPrensa, KIT } from './modelos.js';

// ---------- terreno, trilha, mureta, rocha e gruta ----------
let TERRENO = null;
const TRILHAS = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Getsemani_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Getsemani_Trilha')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; TRILHAS.push(o); }
  else if (o.name.startsWith('Gruta_Boca')) { o.material = new THREE.MeshBasicMaterial({ color: 0x07060a, side: THREE.DoubleSide }); }      // a boca escura da gruta (sem luz)
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
suaviza(TERRENO, true); for (const e of TRILHAS) suaviza(e, false);
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false); for (const e of TRILHAS) texturizaChao(e, TX, true);
const terreno = mapaAltura(TERRENO, 0.35, { suave: true });

// ---------- a trilha: pontos a cada meio metro, da ponta leste (vinda do Monte das Oliveiras) até perto da rocha ----------
const ROTA = new THREE.CatmullRomCurve3(LAY.estrada.map(([x, z]) => V3(x, 0, z)));
const AMOS = []; { const L = ROTA.getLength(), n = Math.ceil(L * 2); for (let i = 0; i <= n; i++) AMOS.push(ROTA.getPointAt(i / n)); }
function naRota(x, z) { let m = 1e9, k = 0; for (let i = 0; i < AMOS.length; i++) { const d = (AMOS[i].x - x) ** 2 + (AMOS[i].z - z) ** 2; if (d < m) { m = d; k = i; } } return [k, Math.sqrt(m)]; }

// ---------- oliveiras, pedras e objetos do layout ----------
instanciaLonge(scene, LAY.objetos, KIT);
const ARVS = [];
poePertos(scene, LAY.objetos, KIT, (o, n) => {
  if (!o.no.startsWith('Oliveira')) return;
  const b = new THREE.Box3().setFromObject(n), c = b.getCenter(new THREE.Vector3()), t = b.getSize(new THREE.Vector3());
  ARVS.push({ n, c, r: Math.max(t.x, t.z) * 0.5, y0: b.min.y + t.y * 0.3, y1: b.max.y, op: 1, mats: null });
});

// ---------- moitas e malvas (instanciadas) ----------
{
  const PL = {}; for (const n of gPlantas.scene.children) PL[n.name] = n;
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

// ---------- a prensa na boca da gruta (parada: é noite) ----------
const PRENSA = new THREE.Group(); PRENSA.position.set(...LAY.prensa.p); PRENSA.rotation.y = LAY.prensa.r; scene.add(PRENSA);
for (const c of [...gPrensa.scene.children]) { c.position.z += 56; PRENSA.add(c); }      // o kit vem com o centro em z = -56
sombra(PRENSA);

// ---------- a lua cheia (a Páscoa caía na lua cheia), alta no sudeste: é ela que dá a luz da cena ----------
const LUA_DIR = V3(0.62, 0.62, -0.48).normalize();
const lua = new THREE.Mesh(new THREE.CircleGeometry(11, 40), new THREE.MeshBasicMaterial({ color: 0xf6f2df, fog: false }));
lua.position.copy(LUA_DIR).multiplyScalar(640); lua.lookAt(0, 0, 0); scene.add(lua);
const halo = new THREE.Mesh(new THREE.CircleGeometry(30, 40), new THREE.MeshBasicMaterial({ color: 0x8090c0, transparent: true, opacity: 0.18, fog: false, depthWrite: false }));
halo.position.copy(LUA_DIR).multiplyScalar(645); halo.lookAt(0, 0, 0); scene.add(halo);

// ---------- Jerusalém no alto, do outro lado do Cedrom ----------
// As mesmas pinturas do Monte das Oliveiras (tex/ de lá), em arcos centrados na rocha. Daqui a cidade fica acima da
// linha dos olhos: a esplanada do templo a ~9° para cima, os muros no alto da encosta. A noite entra no shader
// (a pintura é de dia): escurece e azula, com um véu de bruma.
const P = LAY.panorama, Y_OLHO = LAY.rocha[1] + 1.6, W_IMG = 1914;
const MEIO = (P.a0 + P.a1) / 2, rad = THREE.MathUtils.degToRad;
const yEm = (r, graus) => Y_OLHO + r * Math.tan(rad(graus));
const NOITE = [0.24, 0.28, 0.44], BRUMA = [0.12, 0.15, 0.25];
function matCamada(veu, nome) {
  const m = new THREE.MeshBasicMaterial({ transparent: true, fog: false, depthWrite: false, side: THREE.DoubleSide, vertexColors: true });
  m.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n#ifdef USE_MAP\n  diffuseColor.rgb = mix(diffuseColor.rgb * vec3(' + NOITE.join(', ') + '), vec3(' + BRUMA.join(', ') + '), ' + veu.toFixed(3) + ');\n#else\n  diffuseColor.a = 0.0;\n#endif');
  };
  m.customProgramCacheKey = () => 'gpan-' + nome;
  return m;
}
// saia: uma faixa lisa, da cor do pé da pintura (rgb 212,155,132, já com a noite), que desce mais esses graus e cobre
// o vão até o chão de cá
function camada({ arq, r, larg, hPx, eBase, copias, fade, veu, ordem, nome, W = W_IMG, desloc = 0, saia = 0 }) {
  const passo = rad(larg), comeco = MEIO - passo / 2, eTopo = eBase + hPx * larg / W;
  const yb = yEm(r, eBase), yt = yEm(r, eTopo), pos = [], uv = [], cor = [], idx = []; let v = 0;
  for (const k of copias) {
    const N = 24;
    for (let i = 0; i <= N; i++) {
      const t = i / N, a = comeco + passo * (k + t + desloc), x = P.cx + Math.cos(a) * r, z = P.cz + Math.sin(a) * r, al = fade(a);
      pos.push(x, yb, z, x, yt, z); uv.push(t, 0, t, 1); cor.push(1, 1, 1, al, 1, 1, 1, al);
      if (i) { const b = v + (i - 1) * 2; idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
    }
    v += (N + 1) * 2;
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(cor, 4)); g.setIndex(idx);
  const mat = matCamada(veu, nome), mesh = new THREE.Mesh(g, mat); mesh.name = 'Panorama_' + nome; mesh.renderOrder = ordem; mesh.frustumCulled = false; scene.add(mesh);
  new THREE.TextureLoader().load('../fase-oliveiras/tex/' + arq + '?v=3', (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; mat.map = t; mat.needsUpdate = true; });
  if (saia) {
    const pe = [212, 155, 132].map((c, i) => (c / 255) ** 2.2 * NOITE[i] * (1 - veu) + BRUMA[i] * veu);
    const y0 = yEm(r, eBase - saia), y1 = yEm(r, eBase + 0.4), sp = [], si = [], sc = [];
    const a0 = comeco + passo * (Math.min(...copias) + desloc), a1 = comeco + passo * (Math.max(...copias) + 1 + desloc), N = 60;
    for (let i = 0; i <= N; i++) {
      const a = a0 + (a1 - a0) * i / N, x = P.cx + Math.cos(a) * (r + 1), z = P.cz + Math.sin(a) * (r + 1), al = fade(a);
      sp.push(x, y0, z, x, y1, z); sc.push(...pe, al, ...pe, al);
      if (i) { const b = (i - 1) * 2; si.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
    }
    const gs = new THREE.BufferGeometry(); gs.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3)); gs.setAttribute('color', new THREE.Float32BufferAttribute(sc, 4)); gs.setIndex(si);
    const ms = new THREE.Mesh(gs, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, fog: false, depthWrite: false, side: THREE.DoubleSide }));
    ms.renderOrder = ordem - 0.5; ms.frustumCulled = false; ms.name = 'Panorama_' + nome + '_saia'; scene.add(ms);
  }
  return { mesh, mat };
}
const pontas = (a) => sm(MEIO - 1.0, MEIO - 0.7, a) * sm(MEIO + 1.0, MEIO + 0.7, a);
const LARG_C = THREE.MathUtils.radToDeg(P.a1 - P.a0), PXC = LARG_C / W_IMG, E_ESPLANADA = 5.5, E_PE_MURO = E_ESPLANADA - (335 - 150) * PXC;
const LARG_E = 26, H_E = 624, E_TOPO_E = E_PE_MURO + 0.35 + 28 * LARG_E / W_IMG, E_BASE_E = E_TOPO_E - H_E * LARG_E / W_IMG;
const cidade = camada({ arq: 'panorama_cidade.webp', r: P.r, larg: LARG_C, hPx: 606, eBase: E_ESPLANADA - (606 - 150) * PXC, copias: [0], fade: (a) => sm(P.a0, P.a0 + 0.015, a) * sm(P.a1, P.a1 - 0.015, a), veu: 0.22, ordem: -2, nome: 'cidade' });
const encosta = camada({ arq: 'panorama_encosta.webp', r: P.r - 40, larg: LARG_E, hPx: H_E, eBase: E_BASE_E, copias: [-2, -1, 0, 1, 2], fade: pontas, veu: 0.3, ordem: -1, nome: 'encosta', desloc: 0.5, saia: 10 });
const PAN = { mat: cidade.mat, mesh: cidade.mesh, encosta };

export { terreno, AMOS, naRota, TERRENO, PAN, ARVS, PRENSA, LUA_DIR };
