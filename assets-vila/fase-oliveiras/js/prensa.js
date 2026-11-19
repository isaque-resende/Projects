// Monte das Oliveiras: a prensa de azeite funcionando (o kit prensa-azeite/prensa.glb), com o prenseiro.
// Ciclo: ele empurra a mó em volta da bacia e as azeitonas viram pasta; vai à viga e a prensa desce (o azeite corre
// para o tanque); vai ao pote buscar azeitonas, enche a bacia de novo, e recomeça.
import * as THREE from 'three';
import { sombra } from '../../limpo-motor/base.js';
import { lerpAng } from '../../limpo-motor/atores.js';
import { LAY, scene, CIRC, V3 } from './estado.js';
import { gPrensa, nPrenseiro } from './modelos.js';
import { ator, anda, chao, empresta } from './gente.js';

// ---------- a prensa no lugar marcado no Blender (vazio "Prensa_Jogo") ----------
const G = new THREE.Group(); G.position.set(...LAY.prensa.p); G.rotation.y = LAY.prensa.r; scene.add(G);
const N = {};
for (const c of [...gPrensa.scene.children]) { c.position.z += 56; G.add(c); N[c.name] = c; }    // o kit vem com o centro em z = -56
sombra(G); G.updateMatrixWorld(true);

// azeite: a mesma textura correndo, e a superfície ondulando
function liquido(base, flow, amp, wob = 0) {
  const m = base.clone(); m.userData.u = { uTime: { value: 0 } };
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, m.userData.u);
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader
      .replace('#include <uv_vertex>', `#include <uv_vertex>\n#ifdef USE_MAP\n vMapUv.x -= uTime * ${flow.toFixed(3)};\n#endif`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>
        transformed.y += ${amp.toFixed(4)} * (sin(position.x * 9.0 + uTime * 1.4) + cos(position.z * 8.0 + uTime * 1.1)) * 0.5;
        transformed.x += ${wob.toFixed(4)} * sin(position.y * 30.0 - uTime * 8.0); transformed.z += ${wob.toFixed(4)} * cos(position.y * 26.0 - uTime * 7.0);`);
  };
  m.customProgramCacheKey = () => 'liq' + flow + amp + wob; return m;
}
const base = N.Prensa_Pedra.material, LIQ = [liquido(base, 0.02, 0.004), liquido(base, 0.012, 0.002), liquido(base, 0.7, 0, 0.003)];
N.Prensa_AzeiteTanque.material = LIQ[0]; N.Prensa_AzeiteLaje.material = LIQ[0]; N.Prensa_AzeiteJarro.material = LIQ[1]; N.Prensa_Fio.material = LIQ[2];
for (const k of ['Prensa_AzeiteTanque', 'Prensa_AzeiteLaje', 'Prensa_AzeiteJarro', 'Prensa_Fio']) N[k].castShadow = false;
const mo = N.Prensa_Mo, viga = N.Prensa_Viga, cestos = N.Prensa_Cestos, pasta = N.Prensa_Pasta, laje = N.Prensa_AzeiteLaje, fio = N.Prensa_Fio, tanque = N.Prensa_AzeiteTanque;
const montes = Object.keys(N).filter((k) => k.startsWith('Prensa_Azeitonas_')).map((k) => N[k]);
for (const h of montes) { h.userData.k = 1; h.userData.kv = 1; h.userData.ang = Math.atan2(-(h.position.z - mo.position.z), h.position.x - mo.position.x); }
const pasta0 = pasta.position.y, tanque0 = tanque.position.y;
tanque.visible = fio.visible = laje.visible = false;
const BAIXA = 0.085, H_CESTOS = 0.35, BRACO = 1.05;
const P = { moAlvo: 0, moVolta: 0, moidas: 0, moidasV: 0, fase: 0, t: 0, aperto: 0, azeite: 0, tanque: 0, tempo: 0 };
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

// a ponta mais afastada de uma peça (local) — o cabo da mó e a ponta da viga
function ponta(o, f) { const pos = o.geometry.attributes.position, v = new THREE.Vector3(); let best = null, bv = -1e9; for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i); const s = f(v); if (s > bv) { bv = s; best = v.clone(); } } return best; }
const caboMo = ponta(mo, (v) => v.x * v.x + v.z * v.z);
const pontaViga = ponta(viga, (v) => v.x);
const mundo = (o, v) => o.localToWorld(v.clone());

// colisão: a bacia da mó, a coluna e os cestos da prensa, o tanque
for (const [o, r] of [[mo, 1.0], [N.Prensa_Pedra, 0.45], [cestos, 0.65], [N.Prensa_Jarro, 0.3], [tanque, 0.35]]) { const p = o.getWorldPosition(V3()); CIRC.push({ x: p.x, z: p.z, r }); }

// ---------- o prenseiro ----------
const centroMo = mo.getWorldPosition(V3());
// ele segura o cabo no meio, logo fora da bacia (na ponta, a volta dele passaria pela coluna da prensa)
const posNoCabo = () => { const d = mundo(mo, caboMo).sub(centroMo).setY(0).normalize(); return centroMo.clone().addScaledVector(d, 1.2); };
const ini = posNoCabo();
const prenseiro = ator(nPrenseiro, 1.7, ini.x, ini.z, 0, 'Parado');
empresta(prenseiro, ['Empurrar', 'Pegar', 'Interagir']);
const CP = { x: ini.x, z: ini.z, r: 0.38 }; CIRC.push(CP);
const naViga = () => { const p = mundo(viga, pontaViga), lado = V3(0, 0, 1).applyQuaternion(G.quaternion); return p.addScaledVector(lado, 0.5).setY(0); };
const noPote = () => { const p = N.Prensa_PoteAzeitonas.getWorldPosition(V3()), c = G.getWorldPosition(V3()); return p.addScaledVector(c.sub(p).setY(0).normalize(), 0.55).setY(0); };
const olha = (alvo, dt) => lerpAng(prenseiro.o, Math.atan2(alvo.x - prenseiro.o.position.x, alvo.z - prenseiro.o.position.z), Math.min(1, dt * 6));
// etapas: 'moer' → 'aViga' → 'prensar' → 'aoPote' → 'pegar' → 'aMo' → 'moer'
let etapa = 'moer', tEt = 0;
const vai = (e) => { etapa = e; tEt = 0; };

function prensaPasso(dt) {
  P.tempo += dt; for (const m of LIQ) m.userData.u.uTime.value = P.tempo; tEt += dt;
  const st = prenseiro, p = st.o.position;
  // --- o prenseiro
  if (etapa === 'moer') {
    P.moAlvo += dt * 0.75; P.moVolta += dt * 0.75;
    const alvo = posNoCabo(); p.x = alvo.x; p.z = alvo.z; chao(st);
    const rad = alvo.clone().sub(centroMo).setY(0).normalize();       // anda em volta da bacia, empurrando o cabo
    const tg = V3(rad.z, 0, -rad.x); lerpAng(st.o, Math.atan2(tg.x, tg.z), Math.min(1, dt * 8)); st.toca('Empurrar');
    if (P.moVolta >= Math.PI * 2) { P.moVolta = 0; vai('aViga'); }
  } else if (etapa === 'aViga') { if (anda(st, naViga(), dt, 0.8)) vai('prensar'); }
  else if (etapa === 'prensar') {
    olha(mundo(viga, pontaViga), dt); st.toca('Empurrar');
    if (P.fase === 0 && tEt < 0.5) { P.fase = 1; P.t = 0; }
    if (P.fase === 0 && tEt > 1) vai('aoPote');
  } else if (etapa === 'aoPote') { if (anda(st, noPote(), dt, 0.8)) vai('pegar'); }
  else if (etapa === 'pegar') {
    olha(N.Prensa_PoteAzeitonas.getWorldPosition(V3()), dt); st.toca('Pegar');
    if (tEt > 2.6) { for (const h of montes) h.userData.k = 1; P.moidas = 0; vai('aMo'); }
  } else if (etapa === 'aMo') { if (anda(st, posNoCabo(), dt, 0.8)) vai('moer'); }
  CP.x = p.x; CP.z = p.z;

  // --- a mó gira e esmaga as azeitonas por onde passa
  const passo = Math.sign(P.moAlvo - mo.rotation.y) * Math.min(Math.abs(P.moAlvo - mo.rotation.y), dt * 1.8);
  mo.rotation.y += passo;
  if (passo) for (const h of montes) if (h.userData.k > 0 && Math.abs(wrap(Math.PI + mo.rotation.y - h.userData.ang)) < 0.3) { h.userData.k = 0; P.moidas++; }
  for (const h of montes) { h.userData.kv += (h.userData.k - h.userData.kv) * Math.min(1, dt * 7); const k = h.userData.kv; h.scale.set(1 + (1 - k) * 0.4, Math.max(0.02, k), 1 + (1 - k) * 0.4); h.visible = k > 0.03; }
  P.moidasV += (P.moidas - P.moidasV) * Math.min(1, dt * 2);
  pasta.position.y = pasta0 - 0.05 + 0.065 * (P.moidasV / montes.length); pasta.visible = P.moidasV > 0.05;
  // --- a prensa: desce (2 s), segura (3 s), sobe (2 s)
  if (P.fase) {
    P.t += dt;
    if (P.fase === 1) { P.aperto = Math.min(1, P.t / 2); if (P.t >= 2) { P.fase = 2; P.t = 0; } }
    else if (P.fase === 2) { P.aperto = 1; if (P.t >= 3) { P.fase = 3; P.t = 0; } }
    else { P.aperto = Math.max(0, 1 - P.t / 2); if (P.t >= 2) { P.fase = 0; P.aperto = 0; } }
  }
  const e = P.aperto * P.aperto * (3 - 2 * P.aperto);
  viga.rotation.z = -BAIXA * e; cestos.scale.y = 1 - (BRACO * Math.sin(BAIXA * e)) / H_CESTOS;
  P.azeite += ((P.fase === 1 || P.fase === 2 ? e : e * 0.4) - P.azeite) * Math.min(1, dt * 2.5);
  laje.visible = P.azeite > 0.02; laje.scale.set(0.6 + P.azeite * 0.4, 1, 0.6 + P.azeite * 0.4);
  fio.visible = P.azeite > 0.05; fio.scale.set(P.azeite, 1, P.azeite);
  if (fio.visible) P.tanque = Math.min(1, P.tanque + dt * 0.045 * P.azeite);
  if (P.tanque >= 1) P.tanque = 0.35;                       // alguém esvazia o tanque nos jarros (o ciclo não para)
  tanque.visible = P.tanque > 0.01; tanque.position.y = tanque0 + P.tanque * 0.085; const ts = 0.8 + P.tanque * 0.22; tanque.scale.set(ts, 1, ts);
}

export { prensaPasso, prenseiro, G as PRENSA };
