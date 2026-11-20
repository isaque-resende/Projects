// Monte das Oliveiras: o cenário que vem do Blender (terreno, estrada e muretas em oliveiras_cenario.glb), os olivais,
// pedras e moitas do layout, e Jerusalém do outro lado do vale: a maquete 3D (../jerusalem), a mesma do Getsêmani.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { scene, texChao, LAY, V3, sm } from './estado.js';
import { gCen, gJer, gPlantas, KIT } from './modelos.js';

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

// ---------- Jerusalém: a maquete da cidade (../jerusalem/jerusalem_maquete.glb) ----------
// É a mesma do Getsêmani, no "mundo" de lá; aqui ela entra deslocada (jerusalem_lugares.json: oliveiras), de modo que o
// cume desta fase fique onde fica o cume de verdade em relação ao templo (~450 m, a cidade uns 2,5° abaixo dos olhos).
// Os chãos dela (o vale do Cedrom, o Getsêmani, a outra encosta e o resto do Monte das Oliveiras) perdem o pedaço que
// o terreno desta fase já cobre, e a borda deles vai até a altura do terreno daqui, sem degrau.
// Os montes do fundo continuam pintados (tex/panorama_montes.webp): são o horizonte, longe demais para mudar.
const LUG = await (await fetch('../jerusalem/jerusalem_lugares.json?v=1')).json();
const [DX, DY, DZ] = LUG.oliveiras;
const JER = gJer.scene; JER.name = 'Jerusalem'; JER.position.set(DX, DY, DZ);
{
  const cx = new THREE.Box3().setFromObject(TERRENO), X0 = cx.min.x, X1 = cx.max.x, Z0 = cx.min.z, Z1 = cx.max.z, FAIXA = 70;
  const cl = (v, a, b) => Math.min(b - 0.5, Math.max(a + 0.5, v));
  const CHAOS = [];
  JER.traverse((o) => {
    if (!o.isMesh) return;
    o.receiveShadow = true;
    if (!/^(Vale_Chao|Vale_Miolo|Leste_Chao|Cidade_Chao)/.test(o.name)) return;
    let g = o.geometry; if (!g.index) { const n = g.attributes.position.count; g.setIndex([...Array(n).keys()]); }
    const pos = g.attributes.position, dentro = new Uint8Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      const lx = pos.getX(i) + DX, lz = pos.getZ(i) + DZ;
      dentro[i] = lx > X0 + 1 && lx < X1 - 1 && lz > Z0 + 1 && lz < Z1 - 1 ? 1 : 0;
      const dd = Math.hypot(Math.max(X0 - lx, 0, lx - X1), Math.max(Z0 - lz, 0, lz - Z1));
      if (dd < FAIXA) { const alvo = terreno(cl(lx, X0, X1), cl(lz, Z0, Z1)) - DY - 0.35; pos.setY(i, alvo + (pos.getY(i) - alvo) * sm(0, FAIXA, dd)); }
    }
    const I = g.index.array, novo = [];
    for (let t = 0; t < I.length; t += 3) if (!(dentro[I[t]] && dentro[I[t + 1]] && dentro[I[t + 2]])) novo.push(I[t], I[t + 1], I[t + 2]);
    g.setIndex(novo); pos.needsUpdate = true;
    o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); CHAOS.push(o);
  });
  for (const o of CHAOS) { suaviza(o, !o.name.startsWith('Cidade')); texturizaChao(o, TX, o.name.startsWith('Cidade')); }
}
scene.add(JER);

// os montes do fundo: a pintura de sempre, num arco centrado no cume, logo acima do horizonte
const P = LAY.panorama, Y_OLHO = LAY.cume[1] + 1.6;
const A0 = P.a0 - 0.62, A1 = P.a1 + 0.62, MEIO = (P.a0 + P.a1) / 2;
const rad = THREE.MathUtils.degToRad;
const yEm = (r, graus) => Y_OLHO + r * Math.tan(rad(graus));
function camada({ arq, r, larg, hPx, eBase, copias, fade, ordem, nome, saia = 0 }) {
  const W_ARQ = 1913, passo = rad(larg), comeco = MEIO - passo / 2, eTopo = eBase + hPx * larg / W_ARQ;
  const yb = yEm(r, eBase - saia), yt = yEm(r, eTopo), v0 = -saia / (eTopo - eBase), pos = [], uv = [], cor = [], idx = []; let v = 0;
  for (const k of copias) {
    const N = 24;
    for (let i = 0; i <= N; i++) {
      const t = i / N, a = comeco + passo * (k + t), x = P.cx + Math.cos(a) * r, z = P.cz + Math.sin(a) * r, al = fade(a);
      pos.push(x, yb, z, x, yt, z); uv.push(t, v0, t, 1); cor.push(1, 1, 1, al, 1, 1, 1, al);
      if (i) { const b = v + (i - 1) * 2; idx.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); }
    }
    v += (N + 1) * 2;
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(cor, 4)); g.setIndex(idx);
  const mat = new THREE.MeshBasicMaterial({ transparent: true, fog: false, depthWrite: false, side: THREE.DoubleSide, vertexColors: true, opacity: 0.85 });
  const mesh = new THREE.Mesh(g, mat); mesh.name = 'Panorama_' + nome; mesh.renderOrder = ordem; mesh.frustumCulled = false; scene.add(mesh);
  new THREE.TextureLoader().load('../fase-oliveiras/tex/' + arq + '?v=3', (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; mat.map = t; mat.needsUpdate = true; });
  return { mesh, mat };
}
const pontas = (a) => sm(A0, A0 + 0.3, a) * sm(A1, A1 - 0.3, a);
const montes = camada({ arq: 'panorama_montes.webp', r: 900, larg: 56, hPx: 443, eBase: 0.4 - 443 * 56 / 1913, copias: [-1, 0, 1], fade: pontas, ordem: -3, nome: 'montes', saia: 3 });
// para os testes: a cidade inteira e um ponto no alto da fachada do santuário
const PAN = { mesh: JER, montes, alvo: V3(LUG.fachada[0] + DX, LUG.fachada[1] + DY - 6, LUG.fachada[2] + DZ) };

export { terreno, AMOS, naRota, iCume, TERRENO, PAN, ARVS };
