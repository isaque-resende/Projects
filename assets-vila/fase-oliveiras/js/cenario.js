// Monte das Oliveiras: o cenário que vem do Blender (terreno, estrada e muretas em oliveiras_cenario.glb), os olivais,
// pedras e moitas do layout, e a panorâmica de Jerusalém no horizonte.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { scene, texChao, LAY, V3, sm } from './estado.js';
import { gCen, gPlantas, KIT } from './modelos.js';

// ---------- terreno, estrada e muretas ----------
let TERRENO = null;
const ESTRADAS = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Oliveiras_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Oliveiras_Estrada')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; ESTRADAS.push(o); }
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
suaviza(TERRENO, true); for (const e of ESTRADAS) suaviza(e, false);
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false); for (const e of ESTRADAS) texturizaChao(e, TX, true);
const terreno = mapaAltura(TERRENO, 0.35, { suave: true });      // altura do chão em qualquer ponto

// ---------- a estrada: pontos a cada meio metro, de Betfagé (leste) até a descida para o Getsêmani (oeste) ----------
const ROTA = new THREE.CatmullRomCurve3(LAY.estrada.map(([x, z]) => V3(x, 0, z)));
const AMOS = []; { const L = ROTA.getLength(), n = Math.ceil(L * 2); for (let i = 0; i <= n; i++) AMOS.push(ROTA.getPointAt(i / n)); }
// o ponto da estrada mais perto (índice) e a distância até ele
function naRota(x, z) { let m = 1e9, k = 0; for (let i = 0; i < AMOS.length; i++) { const d = (AMOS[i].x - x) ** 2 + (AMOS[i].z - z) ** 2; if (d < m) { m = d; k = i; } } return [k, Math.sqrt(m)]; }
const iCume = naRota(LAY.cume[0], LAY.cume[2])[0];

// ---------- oliveiras, pedras e objetos do layout ----------
instanciaLonge(scene, LAY.objetos, KIT);
// as oliveiras de perto ficam numa lista: a câmera apaga as que estiverem entre ela e o jogador (jogador.js)
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

// ---------- Jerusalém no horizonte ----------
// Quatro camadas, cada uma numa distância, para dar profundidade (as de perto andam mais quando o jogador anda):
//   o vale do Cedrom em 3D (r 125 a 294), a encosta pintada do outro lado (r 300), a cidade (r 420) e os montes (r 560).
// As pinturas (tex/panorama_*.webp, recortadas de tex/originais/) ficam em arcos centrados no cume. A altura de cada
// uma sai do ângulo visto de quem está no cume: a esplanada do templo 2,5° abaixo da linha dos olhos, o pé dos muros
// escondido atrás da borda da encosta e os montes aparecendo por cima dos telhados. A encosta e os montes se repetem
// espelhados para os lados até cobrir o vale todo. Tudo está sempre lá: quem esconde a cidade é o próprio monte.
// Nada disso usa a neblina do jogo: a bruma vem pintada (e um véu leve no shader, maior quanto mais longe).
const P = LAY.panorama, Y_OLHO = LAY.cume[1] + 1.6, W_IMG = 1914;
const A0 = P.a0 - 0.62, A1 = P.a1 + 0.62, MEIO = (P.a0 + P.a1) / 2;      // o vale cobre ~111°; a cidade, 40° no meio
const rad = THREE.MathUtils.degToRad;
const yEm = (r, graus) => Y_OLHO + r * Math.tan(rad(graus));
const BRUMA_C = new THREE.Color().setStyle('rgb(226,222,230)', THREE.SRGBColorSpace);
function matCamada(veu, nome) {
  const m = new THREE.MeshBasicMaterial({ transparent: true, fog: false, depthWrite: false, side: THREE.DoubleSide, vertexColors: true });
  m.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n#ifdef USE_MAP\n  diffuseColor.rgb = mix(diffuseColor.rgb, vec3(' + [BRUMA_C.r, BRUMA_C.g, BRUMA_C.b].map((v) => v.toFixed(4)).join(', ') + '), ' + veu.toFixed(3) + ');\n#else\n  diffuseColor.a = 0.0;\n#endif');
  };
  m.customProgramCacheKey = () => 'pan-' + nome;
  return m;
}
// um arco pintado: cópias de 'larg' graus a partir do centro (k = 0 é a original; ímpares vão espelhadas);
// eBase = ângulo (graus) da linha de baixo da imagem; saia = graus a mais para baixo, repetindo a última linha (tapa frestas); a transparência das pontas vai na cor de vértice
function camada({ arq, r, larg, hPx, eBase, copias, fade, veu, ordem, nome, saia = 0 }) {
  const passo = rad(larg), comeco = MEIO - passo / 2, eTopo = eBase + hPx * larg / W_IMG;
  const yb = yEm(r, eBase - saia), yt = yEm(r, eTopo), v0 = -saia / (eTopo - eBase), pos = [], uv = [], cor = [], idx = []; let v = 0;
  for (const k of copias) {
    const N = 24;
    for (let i = 0; i <= N; i++) {
      const t = i / N, a = comeco + passo * (k + t), x = P.cx + Math.cos(a) * r, z = P.cz + Math.sin(a) * r, al = fade(a);
      const u = k % 2 ? 1 - t : t;
      pos.push(x, yb, z, x, yt, z); uv.push(u, v0, u, 1); cor.push(1, 1, 1, al, 1, 1, 1, al);
      if (i) { const b = v + (i - 1) * 2; idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
    }
    v += (N + 1) * 2;
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(cor, 4)); g.setIndex(idx);
  const mat = matCamada(veu, nome), mesh = new THREE.Mesh(g, mat); mesh.name = 'Panorama_' + nome; mesh.renderOrder = ordem; mesh.frustumCulled = false; scene.add(mesh);
  new THREE.TextureLoader().load('../fase-oliveiras/tex/' + arq + '?v=1', (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; mat.map = t; mat.needsUpdate = true; });
  return { mesh, mat, yb, yt };
}
const pontas = (a) => sm(A0, A0 + 0.3, a) * sm(A1, A1 - 0.3, a);
// a cidade: 40° (a0..a1); a esplanada fica 157 px acima do pé da imagem recortada (309 px de altura)
const LARG_C = THREE.MathUtils.radToDeg(P.a1 - P.a0), E_ESPLANADA = -2.5, E_PE_MURO = E_ESPLANADA - 157 * LARG_C / W_IMG;
// a encosta: 52° por cópia, 466 px; a borda de cima mais baixa (no meio) fica 49 px abaixo do alto da imagem e cobre o pé dos muros
const LARG_E = 52, H_E = 466, E_TOPO_E = E_PE_MURO + 0.8 + 49 * LARG_E / W_IMG, E_BASE_E = E_TOPO_E - H_E * LARG_E / W_IMG;
const montes = camada({ arq: 'panorama_montes.webp', r: 560, larg: 56, hPx: 277, eBase: 2.4 - 277 * 56 / W_IMG, copias: [-1, 0, 1], fade: pontas, veu: 0.0, ordem: -3, nome: 'montes', saia: 12 });
const cidade = camada({ arq: 'panorama_cidade.webp', r: P.r, larg: LARG_C, hPx: 309, eBase: E_PE_MURO, copias: [0], fade: (a) => sm(P.a0, P.a0 + 0.12, a) * sm(P.a1, P.a1 - 0.12, a), veu: 0.1, ordem: -2, nome: 'cidade' });
const encosta = camada({ arq: 'panorama_encosta.webp', r: 300, larg: LARG_E, hPx: H_E, eBase: E_BASE_E, copias: [-1, 0, 1], fade: pontas, veu: 0.05, ordem: -1, nome: 'encosta' });
const PAN = { mat: cidade.mat, mesh: cidade.mesh, montes, encosta };
{
  // o vale: um leque de triângulos facetados entre o pé do monte (r = 125) e a encosta pintada (r = 294);
  // a borda de lá fica um pouco acima do pé da pintura da encosta e esconde a linha onde ela termina
  const R0 = 125, R1 = 294, LONGE = yEm(R1, E_BASE_E + 0.6), FUNDO = LONGE - 16;
  const altV = (r, a) => {
    const t1 = sm(R0, R0 + 100, r), t2 = sm(R1 - 100, R1, r);
    const base = -20 + (FUNDO + 20) * t1 + (LONGE - FUNDO) * t2;
    return base + (5 * Math.sin(a * 9 + r * 0.031) + 3 * Math.cos(a * 17 - r * 0.047)) * Math.min(1, (r - R0) / 80) * (1 - 0.8 * t2);
  };
  const cor = (s) => new THREE.Color().setStyle(s, THREE.SRGBColorSpace);
  const NEV = cor('#e6e6d6'), OLIVAL = cor('#a3a37c'), BRUMA = cor('#d9d3d8'), PE_ENCOSTA = cor('rgb(167,132,122)').lerp(BRUMA_C, 0.05);   // a cor média do pé da pintura
  const corV = (r) => {
    const c = NEV.clone().lerp(OLIVAL.clone().lerp(BRUMA, 0.35), sm(R0, R0 + 120, r));
    return c.lerp(PE_ENCOSTA, sm(R1 - 120, R1 - 10, r));
  };
  const RAIOS = [R0, 145, 168, 192, 215, 238, 258, 276, R1], NA = 44;
  const vp = [], vc = [], SOL = V3(-14, 26, 12).normalize(), p0 = V3(), p1 = V3(), p2 = V3(), nn = V3();
  const ponto = (ri, ai) => { const r = RAIOS[ri] + (ri && ri < RAIOS.length - 1 ? 6 * Math.sin(ai * 2.3 + ri) : 0), a = A0 + (A1 - A0) * ai / NA; return [P.cx + Math.cos(a) * r, altV(r, a), P.cz + Math.sin(a) * r, r]; };
  const tri = (a, b, c) => {
    p0.set(a[0], a[1], a[2]); p1.set(b[0], b[1], b[2]); p2.set(c[0], c[1], c[2]);
    nn.subVectors(p1, p0).cross(V3().subVectors(p2, p0)).normalize(); if (nn.y < 0) { nn.negate(); [b, c] = [c, b]; p1.set(b[0], b[1], b[2]); p2.set(c[0], c[1], c[2]); }
    const rm = (a[3] + b[3] + c[3]) / 3, luz = 0.86 + 0.2 * Math.max(0, nn.dot(SOL)) - 0.08 * (1 - nn.y), k = corV(rm).multiplyScalar(1 + (luz - 1) * (1 - sm(R1 - 60, R1, rm)));
    for (const q of [p0, p1, p2]) { vp.push(q.x, q.y, q.z); vc.push(k.r, k.g, k.b); }
  };
  for (let ri = 0; ri < RAIOS.length - 1; ri++) for (let ai = 0; ai < NA; ai++) {
    const a = ponto(ri, ai), b = ponto(ri, ai + 1), c = ponto(ri + 1, ai), d = ponto(ri + 1, ai + 1);
    if ((ri + ai) % 2) { tri(a, c, b); tri(b, c, d); } else { tri(a, c, d); tri(a, d, b); }
  }
  const gv = new THREE.BufferGeometry(); gv.setAttribute('position', new THREE.Float32BufferAttribute(vp, 3)); gv.setAttribute('color', new THREE.Float32BufferAttribute(vc, 3));
  const vale = new THREE.Mesh(gv, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false })); vale.name = 'Vale_Cedrom'; vale.frustumCulled = false; scene.add(vale);
}

export { terreno, AMOS, naRota, iCume, TERRENO, PAN, ARVS };
