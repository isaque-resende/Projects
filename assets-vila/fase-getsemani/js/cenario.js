// Getsêmani: o cenário que vem do Blender (terreno, trilha, mureta, a Rocha da Agonia e a gruta, em getsemani_cenario.glb),
// a maquete de Jerusalém do outro lado do Cedrom (../jerusalem/jerusalem_maquete.glb, nas mesmas coordenadas: o muro do
// templo, o santuário, a Antônia, o muro norte com a Porta das Ovelhas, Betesda, as casas e os chãos de longe), as
// oliveiras, pedras e moitas do layout, a prensa na boca da gruta e o sol da manhã.
import * as THREE from 'three';
import { instanciaLonge, poePertos } from '../../limpo-motor/layout.js';
import { suaviza, mapaAltura, texturizaChao } from '../../limpo-motor/terreno.js';
import { CIMA } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { scene, texChao, LAY, V3, sm } from './estado.js';
import { gCen, gJer, gPlantas, gPrensa, KIT } from './modelos.js';

// ---------- terreno, trilha, mureta, rocha e gruta ----------
let TERRENO = null;
const TRILHAS = [], LONGE = [];
gCen.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Getsemani_Terreno')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); TERRENO = o; o.receiveShadow = true; }
  else if (o.name.startsWith('Getsemani_Trilha')) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, polygonOffset: true, polygonOffsetFactor: -2 }); o.receiveShadow = true; TRILHAS.push(o); }
  else if (o.name.startsWith('Gruta_Boca')) { o.material = new THREE.MeshBasicMaterial({ color: 0x07060a, side: THREE.DoubleSide }); }      // a boca escura da gruta (sem luz)
  else { o.castShadow = true; o.receiveShadow = true; }
});
scene.add(gCen.scene);
// a maquete: o miolo do vale sai (aqui o chão é o detalhado); os chãos de longe ganham a textura do chão; a cidade não
// faz sombra (o sol vem do leste: a sombra dos muros cairia lá dentro, onde ninguém vê)
const tira = [];
gJer.scene.traverse((o) => {
  if (!o.isMesh) return;
  if (o.name.startsWith('Vale_Miolo')) { tira.push(o); return; }
  if (/^(Vale_Chao|Leste_Chao|Cidade_Chao)/.test(o.name)) { o.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1 }); LONGE.push(o); }
  o.receiveShadow = true;
});
for (const o of tira) o.removeFromParent();
scene.add(gJer.scene);
suaviza(TERRENO, true); for (const e of TRILHAS) suaviza(e, false); for (const e of LONGE) suaviza(e, !e.name.startsWith('Cidade'));
const TX = { grama: texChao('../fase-betfage/tex/grama.webp?v=1'), terra: texChao('../fase-betfage/tex/terra.webp?v=1') };
texturizaChao(TERRENO, TX, false); for (const e of TRILHAS) texturizaChao(e, TX, true); for (const e of LONGE) texturizaChao(e, TX, e.name.startsWith('Cidade'));
const terreno = mapaAltura(TERRENO, 0.35, { suave: true });

// ---------- a trilha: pontos a cada meio metro, da ponta leste (vinda do Monte das Oliveiras) até Betesda ----------
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

// ---------- a prensa na boca da gruta (parada: é domingo) ----------
const PRENSA = new THREE.Group(); PRENSA.position.set(...LAY.prensa.p); PRENSA.rotation.y = LAY.prensa.r; scene.add(PRENSA);
for (const c of [...gPrensa.scene.children]) { c.position.z += 56; PRENSA.add(c); }      // o kit vem com o centro em z = -56
sombra(PRENSA);

// ---------- o sol acaba de nascer atrás do Monte das Oliveiras (leste, um pouco ao norte: é abril) ----------
// a luz vem baixa por trás do jogador e bate de frente nos muros de Jerusalém, do outro lado do vale
const SOL_DIR = V3(0.9, 0.42, 0.14).normalize();

export { terreno, AMOS, naRota, TERRENO, ARVS, PRENSA, SOL_DIR };
