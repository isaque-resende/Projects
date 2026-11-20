// ---------- abertura: domingo de madrugada, dentro da casa ----------
// Deitado na esteira, sozinho; acorda, senta, levanta, olha em volta e sai. Lá fora Cléopas está à porta.
import * as THREE from 'three';
import { lerpAng } from '../../limpo-motor/atores.js';
import { scene, hemi, sun, fade, fala, DIAL, E, dialogo } from './estado.js';
import { CASAS, portasPasso } from './casas.js';
import { cleopas } from './personagens.js';
import { jog, foco, camera, DIR } from './jogador.js';
import { CASAI, CEU0, distTumba } from './interiores.js';
import './acoes.js';     // só para manter a ordem de montagem
import { INT, INTRO as CONV } from './interacoes.js';

const DE = new URLSearchParams(location.search).get('de');
const INTRO = { on: DE !== 'betfage', t: 0, fase: 'dentro' };
const pularEl = document.getElementById('pularIntro');
const suave = (a, b, x) => { const k = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1); return k * k * (3 - 2 * k); };
const joyEl = () => document.getElementById('joy');
const ESTEIRA = CASAI.base.clone().add(new THREE.Vector3(0.7, 0, -1.85));
function luzDentro(on) {
  if (on) { scene.background = new THREE.Color(0x000000); scene.fog = null; hemi.intensity = 0.5; sun.intensity = 0.6; CASAI.luz.intensity = 12; }
  else { scene.background = CEU0.bg.clone(); scene.fog = CEU0.fog; CASAI.luz.intensity = 0; }
}
if (INTRO.on) {
  document.getElementById('dica').style.display = 'none'; pularEl.style.display = 'block';
  fade.textContent = 'Domingo, de madrugada.'; fade.style.opacity = 1;
  luzDentro(true); jog.o.rotation.order = 'YXZ';
} else {                                                // voltando de Betfagé: chega pela estrada, sem abertura
  pularEl.style.display = 'none'; fade.textContent = ''; fade.style.opacity = 0;
  jog.o.position.set(-33, 0, 3.1); jog.o.rotation.y = Math.PI / 2; foco.copy(jog.o.position);
}
function fimIntro() {
  INTRO.on = false; fala(''); pularEl.style.display = 'none'; DIAL.style.display = 'none'; E.fora = false;
  document.getElementById('dica').style.display = ''; if (joyEl()) joyEl().style.display = '';
  luzDentro(false);
  const c = CASAS[0]; c.aberta = false;
  jog.o.visible = true; jog.o.rotation.set(0, 0, 0); jog.A.Parado.timeScale = 1;
  const f = c.mundo(c.px + 0.2, c.pz + 2.0); jog.o.position.set(f.x, 0, f.z); jog.o.rotation.y = Math.atan2(cleopas.o.position.x - f.x, cleopas.o.position.z - f.z);
  hemi.intensity = 1.3; sun.intensity = 3.1; scene.fog.color.set(0xd9d2bf); scene.background.set(0xd9d2bf);
  foco.set(f.x, 0, f.z);
  fade.textContent = ''; fade.style.opacity = 0;
}
pularEl.onclick = () => { if (INTRO.on) fimIntro(); };
// devolve true enquanto a abertura comanda a tela
function introPasso(dt) {
  if (!INTRO.on) return false;
  const T = (INTRO.t += dt), o = jog.o, c = CASAS[0];
  if (joyEl()) joyEl().style.display = 'none';
  if (T > 2.2 && T < 2.6 && fade.style.opacity !== '0') { fade.style.opacity = 0; setTimeout(() => { if (INTRO.on && INTRO.fase === 'dentro') fade.textContent = ''; }, 900); }
  if (INTRO.fase === 'dentro') {
    // deitado (de costas, na esteira) → senta → levanta: o quadril é o pivô
    const H = 0.55, k = suave(5.0, 7.0, T), yaw = -Math.PI / 2;
    if (T < 7.6) {
      const a = -Math.PI / 2 * (1 - k), hy = 0.3 + (H - 0.3) * k;
      o.rotation.set(a, yaw, 0);
      const q = new THREE.Quaternion().setFromEuler(o.rotation), quadril = new THREE.Vector3(0, H, 0).applyQuaternion(q);
      o.position.set(ESTEIRA.x - quadril.x, CASAI.base.y + hy - quadril.y, ESTEIRA.z - quadril.z + 0.9 * k);
      jog.A.Parado.timeScale = 0.4; jog.toca(k > 0.25 ? 'Agachado' : 'Parado');
      if (T < 5) o.rotation.z = Math.sin(T * 1.6) * 0.015;     // respira
    } else if (T < 13.5) {                              // de pé, olhando em volta
      o.rotation.set(0, yaw + Math.sin((T - 7.6) * 0.9) * 0.7, 0); o.position.set(ESTEIRA.x, CASAI.base.y, ESTEIRA.z + 0.9);
      jog.A.Parado.timeScale = 1; jog.toca('Parado');
      fala(T < 10 ? 'Betânia… a casa de Marta. Ainda estamos aqui.' : 'Sexta-feira. A cruz. O túmulo fechado com a pedra… Por quê?');
    } else {                                            // vai até a porta
      fala('');
      const alvo = CASAI.entrada.clone().setY(CASAI.base.y).add(new THREE.Vector3(0, 0, 0.6)), d = alvo.clone().sub(o.position).setY(0);
      if (d.length() > 0.12) { d.normalize(); o.position.addScaledVector(d, 1.1 * dt); lerpAng(o, Math.atan2(d.x, d.z), Math.min(1, dt * 6)); jog.toca('Andar'); }
      else {                                            // corte: lá fora, a porta abre e ele sai
        INTRO.fase = 'sai'; INTRO.t0 = T; luzDentro(false);
        hemi.intensity = 0.9; sun.intensity = 2.2; scene.background.setHSL(0.1, 0.25, 0.7); scene.fog.color.copy(scene.background);
        const d0 = c.mundo(c.px, c.pz - 0.5); o.position.set(d0.x, 0, d0.z); o.rotation.set(0, Math.atan2(cleopas.o.position.x - d0.x, cleopas.o.position.z - d0.z), 0); c.aberta = true;
      }
    }
    // câmera de dentro: o cômodo inteiro, mais perto que o normal
    const dd = distTumba(CASAI) * 0.8; foco.copy(CASAI.centro); camera.position.copy(foco).addScaledVector(DIR, dd); camera.lookAt(foco);
    sun.position.set(foco.x - 6, foco.y + 14, foco.z + 8); sun.target.position.copy(foco);
    if (CASAI.chama) CASAI.chama.scale.set(1, 0.8 + 0.3 * Math.sin(performance.now() * 0.02), 1);
    return true;
  }
  // lá fora: sai pela porta, a porta fecha, Cléopas está à frente; conversa e começa
  const T2 = T - INTRO.t0, fora_ = c.mundo(c.px + 0.2, c.pz + 2.0);
  if (INTRO.fase === 'sai') {
    if (c.ang < -1.3 || INTRO.chegou) {
      const d = fora_.clone().sub(o.position).setY(0);
      if (!INTRO.chegou && d.length() > 0.1) { d.normalize(); o.position.addScaledVector(d, 1.0 * dt); lerpAng(o, Math.atan2(d.x, d.z), Math.min(1, dt * 6)); jog.toca('Andar'); }
      else { INTRO.chegou = true; jog.toca('Parado'); c.aberta = false; lerpAng(o, Math.atan2(cleopas.o.position.x - o.position.x, cleopas.o.position.z - o.position.z), Math.min(1, dt * 5));
        if (T2 > 4.5) { INTRO.fase = 'conversa'; cleopas.toca('Conversando'); jog.toca('Conversando');
          const it = INT.L.find((i) => i.nome === 'Cléopas'); INT.usa(it, () => { CONV.feita = true; cleopas.toca('Parado'); fimIntro(); }); } }
    }
  }
  lerpAng(cleopas.o, Math.atan2(o.position.x - cleopas.o.position.x, o.position.z - cleopas.o.position.z), Math.min(1, dt * 3));
  portasPasso(dt);
  const luz = suave(0, 6, T2); hemi.intensity = 0.9 + 0.4 * luz; sun.intensity = 2.2 + 0.9 * luz;
  foco.lerp(new THREE.Vector3((o.position.x + cleopas.o.position.x) / 2, 0.8, (o.position.z + cleopas.o.position.z) / 2), Math.min(1, dt * 3));
  camera.position.copy(foco).addScaledVector(DIR, 16 + 8 * suave(0, 5, T2)); camera.lookAt(foco);
  sun.position.set(foco.x + 14, 22, foco.z + 9); sun.target.position.copy(foco);
  scene.fog.near = 40; scene.fog.far = 160;
  return true;
}

export { introPasso };
