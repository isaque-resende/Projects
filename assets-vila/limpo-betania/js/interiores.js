// Betânia: entrar e sair. A casa (porta que abre, cômodo de dentro) e a câmara do túmulo.
// entrar e sair de casa: o jogador anda até a porta, ela abre, ele entra, a porta fecha (e o contrário ao sair)
import * as THREE from 'three';
import { lerpAng } from '../../limpo-motor/atores.js';
import { sombra } from '../../limpo-motor/base.js';
import { E, scene, botao, fade, hemi, sun, tex, textoBotao } from './estado.js';
import { OB } from './vila.js';
import { CAMT, TUM } from './tumulo.js';
import { jog, foco, camera, fw, DIR, rt, mv, tecla, JOY, toqueTela, marcaPino } from './jogador.js';
import './passantes.js';     // só para manter a ordem de montagem

function casaPasso(dt) {
  const A = E.CASA_ANIM, c = A.c, o = jog.o; A.t += dt;
  const anda = (alvo, v = 1.3) => { const d = alvo.clone().sub(o.position).setY(0); if (d.length() < 0.08) { jog.toca('Parado'); return true; } d.normalize(); o.position.addScaledVector(d, Math.min(v * dt, o.position.distanceTo(alvo))); lerpAng(o, Math.atan2(d.x, d.z), Math.min(1, dt * 8)); jog.toca('Andar'); return false; };
  const muda = (e) => { A.e = e; A.t = 0; };
  const soleira = c.mundo(c.px, c.pz + 0.9), dentro = c.mundo(c.px, c.pz - 1.0);
  foco.lerp(new THREE.Vector3(soleira.x, 0.6, soleira.z), Math.min(1, dt * 3));
  if (A.e === 'abre') { o.position.y = 0; if (anda(soleira)) { lerpAng(o, Math.atan2(dentro.x - o.position.x, dentro.z - o.position.z), Math.min(1, dt * 8)); c.aberta = true; if (c.ang < -1.4) muda('entra'); } }
  else if (A.e === 'entra') { if (anda(dentro, 1.0)) muda('fecha'); }
  else if (A.e === 'fecha' || A.e === 'dentro') {
    c.aberta = false; o.visible = A.t < 0.4;
    if (A.t > 0.45 && !A.msg) { A.msg = true; CASAI.casa = c; E.CASA_ANIM = null; entrarInterior(CASAI); }
  }
  else if (A.e === 'sai') { if (c.ang < -1.4 && anda(c.mundo(c.px, c.pz + 1.6), 1.1)) muda('fim'); }
  else if (A.e === 'fim') { c.aberta = false; if (A.t > 0.5) { E.CASA_ANIM = null; E.fora = false; } }
}
// entrar e sair do túmulo: corte seco para o preto, e a cena interna
const CEU0 = { bg: scene.background.clone(), fog: scene.fog };
function corte(fn) {
  E.fora = true; E.alvoToque = null; botao.style.display = 'none';
  fade.style.transition = 'none'; fade.textContent = ''; fade.style.opacity = 1;
  setTimeout(() => { fn(); fade.style.transition = 'opacity 1.4s'; fade.style.opacity = 0; setTimeout(() => { fade.style.transition = ''; E.fora = false; }, 1400); }, 700);
}
function entrarTumba() {
  corte(() => {
    CAMT.on = true; E.jogVy = 0; E.jogNoChao = true;
    const p = CAMT.entrada; jog.o.position.set(p.x, CAMT.alt(p.x, p.z), p.z); jog.o.rotation.y = Math.PI;
    scene.background = new THREE.Color(0x000000); scene.fog = null;
    hemi.intensity = 0.45; sun.intensity = 0.9; CAMT.luz.intensity = 12;
    E.distT = distTumba(); foco.copy(CAMT.centro);
  });
}
function sairTumba() {
  corte(() => {
    CAMT.on = false; E.jogVy = 0; E.jogNoChao = true;
    const p = TUM.lugar.clone().addScaledVector(TUM.frente, 1.8); jog.o.position.set(p.x, 0, p.z); jog.o.rotation.y = Math.atan2(TUM.frente.x, TUM.frente.z);
    scene.background = CEU0.bg.clone(); scene.fog = CEU0.fog;
    hemi.intensity = 1.3; sun.intensity = 3.1; CAMT.luz.intensity = 0;
    foco.copy(jog.o.position);
  });
}
// interior da casa (Marta e a da aguadeira usam o mesmo cômodo): piso, duas paredes em corte, esteiras e utensílios
const CASAI = { on: false, base: new THREE.Vector3(0, -120, 0), txt: 'sair da casa' };
{
  const B = CASAI.base, g = new THREE.Group(); g.position.copy(B); scene.add(g);
  const pedraM = new THREE.MeshStandardMaterial({ color: 0xcdb48c, roughness: 1, flatShading: true });
  const reboco = new THREE.MeshStandardMaterial({ color: 0xe4d3b0, roughness: 1, flatShading: true });
  const madeiraI = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 1, flatShading: true });
  const piso = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 5.6), new THREE.MeshStandardMaterial({ map: tex('../fase-betania/tex/patio.webp', 2), roughness: 1 }));
  piso.position.set(0, -0.15, 0); piso.receiveShadow = true; g.add(piso);
  const cx = (w, h, d, x, y, z, m) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; g.add(o); return o; };
  cx(6.4, 0.5, 0.5, 0, 0.25, -2.55, pedraM); cx(6.4, 2.4, 0.4, 0, 1.7, -2.6, reboco);            // parede do fundo (base de pedra)
  cx(0.5, 0.5, 5.6, -2.95, 0.25, 0, pedraM); cx(0.4, 2.4, 5.6, -3.0, 1.7, 0, reboco);            // parede da esquerda
  cx(6.4, 0.25, 0.3, 0, 2.95, -2.4, madeiraI); cx(0.3, 0.25, 5.6, -2.8, 2.95, 0, madeiraI);     // vigas
  const escuro = new THREE.MeshStandardMaterial({ color: 0x3a2a1c, roughness: 1 });
  cx(0.45, 0.6, 0.8, -3.0, 1.75, -0.4, escuro);                                         // janelinha na parede da esquerda (escura: é madrugada)
  cx(1.2, 0.08, 0.5, 0.6, 0.04, 2.6, pedraM);                                           // soleira (a porta fica no lado aberto, à frente)
  // cama: monte de palha com a esteira por cima, encostada na parede do fundo
  const palha = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.16, 1.05), new THREE.MeshStandardMaterial({ color: 0xcfae5c, roughness: 1, flatShading: true }));
  palha.position.set(0.7, 0.08, -1.85); palha.castShadow = palha.receiveShadow = true; g.add(palha);
  for (let i = 0; i < 9; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.22, 3), palha.material); f.position.set(-0.3 + (i % 5) * 0.5 + (i > 4 ? 0.25 : 0), 0.08, -1.32 - (i % 2) * 0.05); f.rotation.set(Math.PI / 2 - 0.25, 0, (i - 4) * 0.2); g.add(f); }
  if (OB.Esteira) { const e = OB.Esteira.clone(); e.position.set(0.7, 0.165, -1.85); e.scale.set(3.0, 1, 1.45); e.rotation.y = 0; sombra(e); g.add(e); }
  // mesa baixa sob a janela, com banquinho e lamparina
  const mesaM = madeiraI, mesa = new THREE.Group(); mesa.position.set(-2.45, 0, -0.4); g.add(mesa);
  { const tp = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.06, 1.05), mesaM); tp.position.y = 0.52; tp.castShadow = tp.receiveShadow = true; mesa.add(tp);
    for (const [x, z] of [[-0.26, -0.45], [0.26, -0.45], [-0.26, 0.45], [0.26, 0.45]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.06), mesaM); l.position.set(x, 0.25, z); l.castShadow = true; mesa.add(l); } }
  for (const [o, x, y, z, r, k] of [[OB.Banquinho, -1.8, 0, -0.4, Math.PI / 2, 1.3], [OB.Tigela_Larga, -2.45, 0.55, -0.05, 0, 0.8], [OB.Prato, -2.5, 0.55, -0.75, 0, 0.7],
    [OB.Jarro_Alto, -2.55, 0, -2.15, 0, 1.3], [OB.Pote_Escuro, -2.0, 0, -2.25, 0.4, 1.2], [OB.Jarra_Alca, -2.6, 0, -1.6, 0.8, 1.2],     // cântaros no canto
    [OB.Cesto_Raso, 2.25, 0, -1.95, 0, 1.0], [OB.Esteira_Enrolada, 2.4, 0, -0.9, Math.PI / 2, 1.1], [OB.Panela_Barro, -2.55, 0, 1.0, 0, 1.0]]) {
    if (!o) continue; const c = o.clone(); c.position.set(x, y, z); c.rotation.y = r; c.scale.setScalar(k); sombra(c); g.add(c);
  }
  CASAI.obst = [[0.7, -1.85, 0, 1.15, 0.6], [-2.45, -0.4, 0, 0.42, 0.6], [-1.8, -0.4, 0.3], [-2.3, -2.0, 0.55], [2.25, -1.95, 0.35], [2.4, -0.9, 0.35], [-2.55, 1.0, 0.3]];
  CASAI.lampada = new THREE.Vector3(-2.45, 0.56, -0.62);
  CASAI.g = g; CASAI.box = new THREE.Box3(new THREE.Vector3(B.x - 3.2, B.y, B.z - 2.8), new THREE.Vector3(B.x + 3.2, B.y + 3.1, B.z + 2.8));
  CASAI.area = { x0: B.x - 2.6, x1: B.x + 3.0, z0: B.z - 2.2, z1: B.z + 2.7 };
  CASAI.entrada = new THREE.Vector3(B.x + 0.6, 0, B.z + 2.0);
  CASAI.centro = new THREE.Vector3(B.x, B.y + 0.7, B.z);
  CASAI.alt = () => B.y;
  // lamparina de barro (óleo) acesa em cima do banquinho: é dela a luz do cômodo
  const barro = new THREE.MeshStandardMaterial({ color: 0xa8643a, roughness: 1, flatShading: true });
  const LP = CASAI.lampada; const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 6), barro); lamp.scale.set(0.8, 0.42, 1); lamp.position.set(LP.x, LP.y + 0.04, LP.z); lamp.castShadow = true; g.add(lamp);
  const bico = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.12, 6), barro); bico.rotation.x = Math.PI / 2; bico.position.set(LP.x, LP.y + 0.05, LP.z + 0.11); g.add(bico);
  const chama = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.09, 6), new THREE.MeshBasicMaterial({ color: 0xffc65a })); chama.position.set(LP.x, LP.y + 0.12, LP.z + 0.16); g.add(chama); CASAI.chama = chama;
  CASAI.luz = new THREE.PointLight(0xffb866, 0, 9, 1.4); CASAI.luz.position.set(B.x + LP.x, B.y + 0.85, B.z + LP.z + 0.2); scene.add(CASAI.luz);
}
function entrarInterior(I, depois) {
  corte(() => {
    I.on = true; E.jogVy = 0; E.jogNoChao = true; jog.o.visible = true;
    const p = I.entrada; jog.o.position.set(p.x, I.alt(p.x, p.z), p.z); jog.o.rotation.y = Math.PI;
    scene.background = new THREE.Color(0x000000); scene.fog = null;
    hemi.intensity = 0.55; sun.intensity = 0.9; I.luz.intensity = 12;
    foco.copy(I.centro); if (depois) depois();
  });
}
function sairCasaInt() {
  const c = CASAI.casa;
  corte(() => {
    CASAI.on = false; CASAI.luz.intensity = 0; E.jogVy = 0; E.jogNoChao = true;
    scene.background = CEU0.bg.clone(); scene.fog = CEU0.fog; hemi.intensity = 1.3; sun.intensity = 3.1;
    const d = c.mundo(c.px, c.pz - 1.0); jog.o.position.set(d.x, 0, d.z); jog.o.rotation.y = Math.atan2(c.mundo(c.px, c.pz + 2).x - d.x, c.mundo(c.px, c.pz + 2).z - d.z);
    c.aberta = true; foco.copy(jog.o.position);
    E.CASA_ANIM = { c, e: 'sai', t: 0 };
  });
}

// a câmera de dentro enquadra só a câmara (fundo preto, sem vazar para fora do cenário)
const distTumba = (I = CAMT) => { const s = I.box.getSize(new THREE.Vector3()); const f = Math.tan(THREE.MathUtils.degToRad(12)); return Math.max((s.y + s.z * 0.75) * 0.62 / f, (Math.hypot(s.x, s.z) * 0.58) / f / camera.aspect); };
function tumbaPasso(dt) {
  const I = CAMT.on ? CAMT : CASAI.on ? CASAI : null;
  if (!I) return false;
  const sai = I === CAMT ? sairTumba : sairCasaInt;
  fw.copy(DIR).negate().setY(0).normalize(); rt.set(-fw.z, 0, fw.x);
  mv.set(0, 0, 0);
  if (!E.fora) {
    if (tecla.KeyW || tecla.ArrowUp) mv.add(fw); if (tecla.KeyS || tecla.ArrowDown) mv.sub(fw);
    if (tecla.KeyD || tecla.ArrowRight) mv.add(rt); if (tecla.KeyA || tecla.ArrowLeft) mv.sub(rt);
    if (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.15) mv.addScaledVector(fw, -JOY.y).addScaledVector(rt, JOY.x);
    if (mv.lengthSq() > 0) E.alvoToque = null;
    else if (E.alvoToque) { mv.subVectors(E.alvoToque, jog.o.position).setY(0); if (mv.length() < 0.12) { E.alvoToque = null; mv.set(0, 0, 0); } }
  }
  const p = jog.o.position, A = I.area;
  let andou = false;
  if (mv.lengthSq() > 0) {
    mv.normalize(); const v = 1.6 * dt;
    const ok = (x, z) => x > A.x0 && x < A.x1 && z > A.z0 && z < A.z1 && I.alt(x, z) <= p.y + 0.45 && !(I.obst || []).some((o) => o.length === 3 ? Math.hypot(x - I.base.x - o[0], z - I.base.z - o[1]) < o[2] + 0.25 : Math.abs(x - I.base.x - o[0]) < o[3] + 0.25 && Math.abs(z - I.base.z - o[1]) < o[4] + 0.25);
    const x0 = p.x, z0 = p.z, nx = p.x + mv.x * v, nz = p.z + mv.z * v;
    if (ok(nx, nz)) { p.x = nx; p.z = nz; } else if (ok(nx, p.z)) p.x = nx; else if (ok(p.x, nz)) p.z = nz; else E.alvoToque = null;
    andou = Math.hypot(p.x - x0, p.z - z0) > v * 0.3;
    lerpAng(jog.o, Math.atan2(mv.x, mv.z), Math.min(1, dt * 12));
    // passou da soleira, para fora: volta à luz

  }
  p.y += (I.alt(p.x, p.z) - p.y) * Math.min(1, dt * 16);
  jog.toca(andou ? 'Andar' : 'Parado');
  if (!E.fora) { textoBotao((toqueTela ? '' : 'E: ') + I.txt); botao.style.display = 'block'; marcaPino('sair'); }
  // câmera: o mesmo ângulo de fora; segue um pouco o jogador, sem sair da câmara
  E.distT = distTumba(I); const d = Math.min(E.distAlvo, E.distT);
  const alvo = I.centro.clone().lerp(p, 0.25); alvo.y = I.centro.y;
  foco.lerp(alvo, Math.min(1, dt * 3));
  camera.position.copy(foco).addScaledVector(DIR, d); camera.lookAt(foco);
  sun.position.set(foco.x - 6, foco.y + 14, foco.z + 8); sun.target.position.copy(foco);
  if (I.chama) I.chama.scale.set(1, 0.8 + 0.3 * Math.sin(performance.now() * 0.02), 1);
  I.luz.intensity = 12 + Math.sin(performance.now() * 0.011) * 1.2 + Math.sin(performance.now() * 0.027) * 0.8;   // luz que entra tremula de leve
  return true;
}

export { sairTumba, CASAI, sairCasaInt, entrarTumba, CEU0, distTumba, tumbaPasso, casaPasso };
