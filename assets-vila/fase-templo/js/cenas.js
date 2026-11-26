// O templo: as cenas, com a câmera de cinema (limpo-motor/cine.js). O roteiro está em fase-templo/roteiro.md.
//  1. Chegada (de Betesda): o pátio, o santuário e os pontos de interesse (as arcas das ofertas, o véu).
//  2. As arcas das ofertas: a lembrança da viúva pobre (Mc 12.41-44). Jesus, sentado defronte, não aparece: a câmera
//     fica no lugar dele.
//  3. O santuário: a lembrança da sexta, à hora nona: a escuridão, a terra tremendo e o véu rasgado de alto a baixo
//     (Mt 27.45, 51; Mc 15.38).
import * as THREE from 'three';
import { pos } from '../../limpo-motor/atores.js';
import { criaCine, malhasAltas } from '../../limpo-motor/cine.js';
import { criaLembranca } from '../../limpo-motor/lembranca.js';
import { scene, E, fala, renderer, LAY, sun } from './estado.js';
import { terreno, CHAO } from './cenario.js';
import { ator, anda } from './gente.js';
import { nEscriba, nRobusto, nFaixa, nSacerdote } from './modelos.js';
import { CONVERSAS } from './npcs.js';
import { jog, camera, CAM } from './jogador.js';

const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z), DEG = 180 / Math.PI;
const DE = new URLSearchParams(location.search).get('de');
const CINE = criaCine({ camera, E, chao: (x, z) => terreno(x, z), obstaculos: malhasAltas(scene, [CHAO].filter(Boolean)), deOnde: () => ({ alvo: CAM.olho.clone(), pos: camera.position.clone() }), fovCena: 36 });
const LEMB = criaLembranca(renderer.domElement);
const CENA = { fase: '', sub: '', t: 0 };
let AGENDA = []; const depois = (s, fn) => AGENDA.push({ s, fn });
const cab = (st, dy = 0) => () => { const h = st.cab || (st.cab = st.o.getObjectByName('Head')); const p = h ? pos(h) : st.o.position.clone().setY(st.o.position.y + 1.5); p.y += dy; return p; };
const [ix, iy, iz] = LAY.israel, [ax, ay, az] = LAY.altar;
const SANT = V3(-16.4, 12.7, -6.0);          // o véu, na porta do santuário (o pano de Templo_Santuario_3)
const ARCA = V3(17.3, 2.0, 6.4);            // as arcas das ofertas (Templo_Gazofilacio), no Pátio das Mulheres
const ALTAR = V3(ax, ay, az);
const yawDe = (de, para) => Math.atan2(para.x - de.x, para.z - de.z) * DEG;      // graus: a câmera do lado de "para"

// ---------- 1. chegada ----------
if (DE !== 'cidade') {
  CENA.fase = 'chegada';
  CINE.roda([
    { alvo: () => ALTAR.clone().setY(ALTAR.y + 3), dist: 62, el: 30, yaw: 120, k: 1.2, kd: 0.6, titulo: 'O templo', dur: 3.8,
      aoEntrar: () => depois(0.6, () => fala('Pela porta do norte: o pátio de fora do templo, cercado de pórticos. A fumaça do sacrifício da manhã já sobe do altar.')) },
    { alvo: () => ARCA.clone().setY(ARCA.y + 1), dist: 8, el: 22, yaw: 160, corte: true, k: 2, kd: 1, titulo: 'As arcas das ofertas', dur: 3.2, aoEntrar: () => fala('') },
    { alvo: () => SANT.clone(), dist: 22, el: 6, yaw: 90, corte: true, k: 2, kd: 1, titulo: 'O santuário e o véu', dur: 3.2 },
  ], () => { fala(''); CENA.fase = 'livre'; }, { aoPular: () => { AGENDA = []; } });
} else CENA.fase = 'livre';

// ---------- 2. a viúva pobre (Mc 12.41-44) ----------
const RICOS = [ator(nEscriba, 1.72, 0, 0, 0, 'Andar'), ator(nRobusto, 1.74, 0, 0, 0, 'Andar')], VIUVA = ator(nFaixa, 1.55, 0, 0, 0, 'Andar');
for (const st of [...RICOS, VIUVA]) st.o.visible = false;
const MOEDAS = []; { const geo = new THREE.CylinderGeometry(0.035, 0.035, 0.008, 10), ouro = new THREE.MeshStandardMaterial({ color: 0xd8b04a, metalness: 0.6, roughness: 0.35 }), cobre = new THREE.MeshStandardMaterial({ color: 0x8a5a32, metalness: 0.4, roughness: 0.5 });
  for (let i = 0; i < 16; i++) { const m = new THREE.Mesh(geo, i < 14 ? ouro : cobre); m.visible = false; scene.add(m); MOEDAS.push({ m, v: V3(), t: 0 }); } }
const BOCA = (x) => V3(x, ARCA.y + 1.25, ARCA.z);       // a boca de trombeta da arca
const LUGAR = (x) => V3(x, ARCA.y, ARCA.z - 0.85);       // diante da arca
const JESUS = V3(17.3, ARCA.y, 0.6);                    // sentado defronte (Mc 12.41)
function lanca(i0, n, x, de) { for (let i = i0; i < i0 + n; i++) { const q = MOEDAS[i]; q.m.visible = true; q.t = 0; q.m.position.copy(de); q.alvo = BOCA(x + (i % 3 - 1) * 0.04); } }
function moedasPasso(dt) { for (const q of MOEDAS) { if (!q.m.visible || !q.alvo) continue; q.t += dt; const k = Math.min(1, q.t / 0.55); q.m.position.lerp(q.alvo, Math.min(1, dt * 8)); q.m.position.y += Math.sin(k * Math.PI) * 0.02; q.m.rotation.x += dt * 9; if (k >= 1 && q.m.position.distanceTo(q.alvo) < 0.03) { q.m.visible = false; q.alvo = null; } } }
function montaViuva() {
  jog.o.visible = false;
  RICOS[0].o.position.set(12.5, ARCA.y, 1.5); RICOS[1].o.position.set(13.5, ARCA.y, 0.8); VIUVA.o.position.set(20.8, ARCA.y, 1.6);
  for (const st of [...RICOS, VIUVA]) { st.o.visible = true; st.i = 0; st.toca('Andar'); }
  CENA.sub = 'ricos'; CENA.t = 0; fala('Estando Jesus assentado defronte da arca do tesouro, observava a maneira como a multidão lançava o dinheiro. (Mc 12.41)');
}
function desfazViuva() { for (const st of [...RICOS, VIUVA]) st.o.visible = false; for (const q of MOEDAS) q.m.visible = false; jog.o.visible = true; fala(''); }
function viuvaPasso(dt) {
  const T = (CENA.t += dt);
  moedasPasso(dt);
  if (CENA.sub === 'ricos') {
    for (const [k, st] of RICOS.entries()) {
      const x = 16.0 + k * 0.9;
      if (!st.lancou) { if (anda(st, LUGAR(x), dt, 1.3)) { st.lancou = true; st.toca('Parado'); st.o.rotation.y = 0; lanca(k * 7, 7, x, cab(st, -0.5)()); } }
      else if (T > 6.5) anda(st, V3(x - 6, ARCA.y, 0.2), dt, 1.3);
    }
    if (T > 3.5 && !CENA.f1) { CENA.f1 = true; fala('E muitos ricos lançavam muito. (Mc 12.41)'); }
    if (T > 7.0) { CENA.sub = 'viuva'; CENA.t = 0; fala('Vindo, porém, uma viúva pobre, lançou duas pequenas moedas. (Mc 12.42)'); }
  } else if (CENA.sub === 'viuva') {
    for (const st of RICOS) anda(st, V3(st.o.position.x - 6, ARCA.y, 0.2), dt, 1.3);
    if (!VIUVA.lancou) { if (anda(VIUVA, LUGAR(18.2), dt, 1.0)) { VIUVA.lancou = true; VIUVA.toca('Parado'); VIUVA.o.rotation.y = 0; lanca(14, 2, 18.2, cab(VIUVA, -0.55)()); } }
    if (T > 6.5) { CENA.sub = 'mais'; CENA.t = 0; fala('“Em verdade vos digo que esta pobre viúva lançou mais do que todos.” (Mc 12.43)'); }
  } else if (CENA.sub === 'mais') {
    if (T > 2.0) anda(VIUVA, V3(23, ARCA.y, 2.5), dt, 0.8);
    if (T > 4.2 && !CENA.f2) { CENA.f2 = true; fala('“Porque todos lançaram do que lhes sobrava; mas esta, da sua pobreza, lançou tudo o que tinha, todo o seu sustento.” (Mc 12.44)'); }
    if (T > 9.0 && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazViuva(); CENA.sub = ''; CENA.fase = 'livre'; }); }
  }
}
function cenaViuva() {
  CENA.fase = 'viuva'; CENA.sub = 'entra'; CENA.saindo = false; CENA.f1 = CENA.f2 = false; for (const st of [...RICOS, VIUVA]) st.lancou = false;
  const yPov = 180;      // do lugar onde ele estava sentado (ao sul), olhando as arcas
  CINE.roda([
    { alvo: () => ARCA.clone().setY(ARCA.y + 1), dist: 7, el: 20, yaw: 160, k: 2, ate: () => CENA.sub === 'ricos' },
    { alvo: () => ARCA.clone().setY(ARCA.y + 1.0), dist: ARCA.z - JESUS.z, el: 3, yaw: yPov, corte: true, fixo: true, zoom: 1.15, k: 2, kd: 1, ate: () => CENA.sub === 'viuva' },
    // do lugar dele, a lente fecha nela
    { alvo: cab(VIUVA, -0.3), dist: 5.9, el: 4, yaw: () => yawDe(VIUVA.o.position, JESUS), fixo: true, zoom: 0.72, k: 2, kd: 1, ate: () => CENA.sub === 'mais' },
    { alvo: cab(VIUVA, -0.2), dist: 5.9, el: 4, yaw: () => yawDe(VIUVA.o.position, JESUS), fixo: true, zoom: 0.55, k: 1.4, kd: 0.6, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazViuva(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.5, () => LEMB.entra('Na terça-feira', montaViuva));
}

// ---------- 3. o véu rasgado (Mt 27.45-51) ----------
// as duas metades do véu, por cima do pano do santuário; o rasgo desce de cima até embaixo e as metades se abrem
let PANO = null; const PANOS = []; scene.traverse((o) => { if (o.isMesh && o.material && o.material.name === 'Templo_cortina') PANO = o; if (o.isMesh && /^Templo_Santuario_(1|3|7)$/.test(o.name)) PANOS.push(o); });      // o pano, as barras e o forro
const VEU = { metades: [], H: 8.6, W: 5.0 };
{
  // o mesmo pano (a textura do véu); sem a cor de vértice do modelo, que estas metades não têm
  const mat = PANO ? Object.assign(PANO.material.clone(), { vertexColors: false }) : new THREE.MeshStandardMaterial({ color: 0x5b2a6e, roughness: 1 });
  mat.side = THREE.DoubleSide;
  for (const lado of [0, 1]) {
    const g = new THREE.PlaneGeometry(VEU.W / 2, VEU.H, 1, 24), uv = g.attributes.uv, p = g.attributes.position;
    for (let i = 0; i < uv.count; i++) { const u = (p.getX(i) + VEU.W / 4) / (VEU.W / 2); uv.setX(i, lado ? 0.5 + u * 0.5 : u * 0.5); }
    const m = new THREE.Mesh(g, mat); m.rotation.y = Math.PI / 2; m.position.set(SANT.x + 0.08, SANT.y, SANT.z + (lado ? -1 : 1) * VEU.W / 4); m.visible = false; scene.add(m);
    m.userData.x0 = Float32Array.from(p.array); VEU.metades.push(m);
  }
  VEU.fundo = new THREE.Mesh(new THREE.PlaneGeometry(VEU.W, VEU.H), new THREE.MeshBasicMaterial({ color: 0x0b0705 })); VEU.fundo.rotation.y = Math.PI / 2; VEU.fundo.position.set(SANT.x - 0.05, SANT.y, SANT.z); VEU.fundo.visible = false; scene.add(VEU.fundo);
}
// k: 0 inteiro, 1 rasgado até embaixo
function rasga(k) {
  const yT = VEU.H / 2 - k * VEU.H;      // a ponta do rasgo (em coordenadas da metade)
  for (const [lado, m] of VEU.metades.entries()) {
    // (a metade 0 fica do lado +z; o x da malha aponta para -z do mundo: a borda de dentro é +W/4 na 0 e -W/4 na 1)
    const p = m.geometry.attributes.position, x0 = m.userData.x0, dentro = lado ? -VEU.W / 4 : VEU.W / 4;
    for (let i = 0; i < p.count; i++) {
      const x = x0[i * 3], y = x0[i * 3 + 1]; let dx = 0, dz = 0;
      if (Math.abs(x - dentro) < 1e-3 && y > yT) { const a = Math.min(1, (y - yT) / 3.0); dx = (lado ? 1 : -1) * a * 1.05; dz = a * 0.25 * Math.sin(y * 2.3 + lado); }
      p.setXYZ(i, x + dx, y, dz);
    }
    p.needsUpdate = true; m.geometry.computeVertexNormals();
  }
}
const ESC = { salvo: null };
function escuridao(on) {
  if (on) { ESC.salvo = { bg: scene.background, fog: scene.fog.color.clone(), s: sun.intensity }; scene.background = new THREE.Color(0x231c16); scene.fog.color.set(0x231c16); sun.intensity = 0.7; }
  else if (ESC.salvo) { scene.background = ESC.salvo.bg; scene.fog.color.copy(ESC.salvo.fog); sun.intensity = ESC.salvo.s; ESC.salvo = null; }
}
const SAC = ator(nSacerdote, 1.72, 0, 0, 0, 'Parado'); SAC.o.visible = false;
function montaVeu() {
  jog.o.visible = false; escuridao(true); rasga(0);
  for (const m of VEU.metades) m.visible = true; VEU.fundo.visible = true; for (const o of PANOS) o.visible = false;
  SAC.o.position.set(SANT.x + 6.5, terreno(SANT.x + 6.5, SANT.z + 3.2), SANT.z + 3.2); SAC.o.rotation.y = -Math.PI / 2; SAC.o.visible = true; SAC.toca('Parado');
  CENA.sub = 'trevas'; CENA.t = 0; CENA.k = 0; fala('Desde a hora sexta houve trevas sobre toda a terra, até à hora nona. (Mt 27.45)');
}
function desfazVeu() { escuridao(false); for (const m of VEU.metades) m.visible = false; VEU.fundo.visible = false; for (const o of PANOS) o.visible = true; SAC.o.visible = false; jog.o.visible = true; TREMOR.f = 0; fala(''); }
const TREMOR = { f: 0 };
function veuPasso(dt) {
  const T = (CENA.t += dt);
  if (CENA.sub === 'trevas' && T > 4.0) { CENA.sub = 'grito'; CENA.t = 0; fala('E Jesus, clamando outra vez com grande voz, entregou o espírito. (Mt 27.50)'); }
  else if (CENA.sub === 'grito' && T > 3.6) { CENA.sub = 'rasga'; CENA.t = 0; fala('E eis que o véu do santuário se rasgou em dois, de alto a baixo; e tremeu a terra, e fenderam-se as pedras. (Mt 27.51)'); }
  else if (CENA.sub === 'rasga') {
    TREMOR.f = T < 4.5 ? 0.06 * (1 - T / 4.5) + 0.02 : 0;
    CENA.k = Math.min(1, CENA.k + dt / 2.6); rasga(THREE.MathUtils.smoothstep(CENA.k, 0, 1));
    if (T > 1.0) { SAC.o.position.x += dt * 0.6; }      // o sacerdote recua
    if (T > 7.0) { CENA.sub = 'caminho'; CENA.t = 0; fala('“Tendo, pois, irmãos, ousadia para entrar no Santuário, pelo sangue de Jesus, pelo novo e vivo caminho que ele nos consagrou, pelo véu, isto é, pela sua carne.” (Hb 10.19-20)'); }
  } else if (CENA.sub === 'caminho' && T > 6.5 && !CENA.saindo) { CENA.saindo = true; LEMB.sai(() => { desfazVeu(); CENA.sub = ''; CENA.fase = 'livre'; }); }
}
function cenaVeu() {
  CENA.fase = 'veu'; CENA.sub = 'entra'; CENA.saindo = false;
  CINE.roda([
    { alvo: () => SANT.clone(), dist: 20, el: 6, yaw: 90, k: 2, ate: () => CENA.sub === 'trevas' },
    { alvo: () => SANT.clone().setY(SANT.y - 1), dist: 24, el: 4, yaw: 90, corte: true, fixo: true, k: 1.5, kd: 0.3, ate: () => CENA.sub === 'rasga' },
    { alvo: () => SANT.clone().setY(SANT.y + 0.5), dist: 11, el: 2, yaw: 90, corte: true, fixo: true, zoom: 0.9, k: 1.5, kd: 0.5, ate: () => CENA.sub === 'caminho' },
    { alvo: () => SANT.clone().setY(SANT.y - 1.5), dist: 7, el: 0, yaw: 90, fixo: true, k: 1, kd: 0.35, ate: () => CENA.sub === '' },
  ], () => {}, { aoPular: () => { AGENDA = []; if (LEMB.on) { LEMB.desliga(); desfazVeu(); } CENA.sub = ''; CENA.fase = 'livre'; } });
  depois(0.5, () => LEMB.entra('Sexta-feira, à hora nona', montaVeu));
}
CONVERSAS.find((c) => c.nome === 'o gazofilácio').cena = cenaViuva;
CONVERSAS.find((c) => c.nome === 'o santuário').cena = cenaVeu;

function cenasPasso(dt) {
  for (const a of AGENDA) a.s -= dt;
  const prontas = AGENDA.filter((a) => a.s <= 0); AGENDA = AGENDA.filter((a) => a.s > 0); for (const a of prontas) a.fn();
  if (!LEMB.on) return;
  if (CENA.fase === 'viuva') viuvaPasso(dt);
  else if (CENA.fase === 'veu') veuPasso(dt);
}
// a terra treme: a câmera sacode (depois de posta pela cena)
function tremor() { if (TREMOR.f > 0) camera.position.add(V3((Math.random() - 0.5) * TREMOR.f * 6, (Math.random() - 0.5) * TREMOR.f * 4, (Math.random() - 0.5) * TREMOR.f * 6)); }

if (globalThis.MODO_TESTE) Object.assign(globalThis, { __VIUVA: cenaViuva, __VEU: cenaVeu, __CENA: CENA, __LEMB: LEMB, __FL: { viuva: VIUVA, sac: SAC } });
export { cenasPasso, tremor, CINE, CENA };
