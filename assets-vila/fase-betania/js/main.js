// Betânia: liga os controles às ações e roda o laço do jogo (o que acontece a cada quadro).
import * as THREE from 'three';
import { botao, E, MIX, renderer, scene, bate, fundo, textoBotao, posesBase, sun, CIRC, CAIXAS } from './estado.js';
import './modelos.js';
import { ground } from './cenario.js';
import { CASAS, portasPasso, chaoTerra, alturaEm } from './casas.js';
import { porteiraPasso } from './vila.js';
import { CAMT, TUM, pedraPasso } from './tumulo.js';
import { andante, padeira, marta, lazaro, cleopas, NOMES } from './personagens.js';
import { INT } from './interacoes.js';
import { fogoPasso, padeiraPasso } from './forno.js';
import { pisadorPasso, barracaPasso } from './oficios.js';
import { aguadeira, aguadeiraPasso } from './poco.js';
import { boi, lavrador, lavouraPasso } from './lavoura.js';
import { ovelhas, ovelhasPasso } from './rebanho.js';
import { ctl, camera, foco, DIR, fw, rt, mv, tecla, JOY, jog, naArea, toqueTela, marcaPino, DMIN, DMAX } from './jogador.js';
import { passantePasso, olharPasso } from './passantes.js';
import { CASAI, tumbaPasso, casaPasso } from './interiores.js';
import { acionar, perguntaBetfage } from './acoes.js';
import { cenasPasso, cenasDepois, CINE } from './cenas.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';
import { criaCaminho } from '../../limpo-motor/caminho.js';
// tocar no chão: o caminho desvia de cercas, barracas, muros e do rochedo (antes ia em linha reta e empacava)
const caminho = criaCaminho({ terreno: (x, z) => chaoTerra(x, z), alturaEm: (x, z) => alturaEm(x, z),
  livreC: (x, z) => naArea(x, z) && !bate(x, z, 0.28) && !(TUM.rocha(x, z) > chaoTerra(x, z) + 0.35) });

ctl.aoAcionar = acionar;
// no celular o toque age já no pointerdown (o texto do botão é reescrito a cada quadro e o 'click' se perdia)
botao.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); acionar(); });
// toque no chão: anda até lá; toque no túmulo ou na porta, quando o botão está à mostra: aciona
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
ctl.aoToque = (e) => {
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  const h = ray.intersectObjects(CAMT.on ? [CAMT.g] : CASAI.on ? [CASAI.g] : [ground, TUM.tum, ...CASAS.map((c) => c.g)], true)[0];
  const perto = (a, r) => h && Math.hypot(h.point.x - a.x, h.point.z - a.z) < r;
  const alvoPorta = E.portaPerto && E.portaPerto.mundo(E.portaPerto.px, E.portaPerto.pz);
  if (botao.style.display === 'block' && h && ((E.pedraPerto || E.tumbaPerto) && perto(TUM.lugar, 2.8) || (alvoPorta && perto(alvoPorta, 2.0)))) acionar();
  else if (h) { E.alvoToque = h.point.clone(); E.TRILHA = CAMT.on || CASAI.on ? [] : caminho(jog.o.position, E.alvoToque); }
};

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);   // a seta sobre a cabeça, quando algo esconde o jogador
const relogio = new THREE.Clock();
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  // na abertura, no túmulo e entrando em casa a seta fica escondida
  const semSeta = () => { marca.passo(jog.o.position, t, E.dist, false); renderer.render(scene, camera); };
  if (cenasPasso(dt)) { semSeta(); return; }
  if (tumbaPasso(dt)) { semSeta(); return; }
  if (E.CASA_ANIM) { casaPasso(dt); portasPasso(dt);
    camera.position.copy(foco).addScaledVector(DIR, E.dist); camera.lookAt(foco); semSeta(); return; }

  // jogador
  fw.copy(DIR).negate().setY(0).normalize(); rt.set(-fw.z, 0, fw.x);
  mv.set(0, 0, 0);
  if (!E.fora && !E.cine) {
    if (tecla.KeyW || tecla.ArrowUp) mv.add(fw); if (tecla.KeyS || tecla.ArrowDown) mv.sub(fw);
    if (tecla.KeyD || tecla.ArrowRight) mv.add(rt); if (tecla.KeyA || tecla.ArrowLeft) mv.sub(rt);
    if (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.15) { mv.addScaledVector(fw, -JOY.y).addScaledVector(rt, JOY.x); }
    if (mv.lengthSq() > 0) E.alvoToque = null;
    else if (E.alvoToque) {
      const T_ = E.TRILHA || []; while (T_.length > 1 && Math.hypot(T_[0].x - jog.o.position.x, T_[0].z - jog.o.position.z) < 0.3) T_.shift();
      mv.subVectors(T_.length ? T_[0] : E.alvoToque, jog.o.position).setY(0); if (mv.length() < 0.15 && T_.length <= 1) { E.alvoToque = null; E.TRILHA = []; mv.set(0, 0, 0); } else if (mv.length() < 0.15) T_.shift();
    }
  }
  portasPasso(dt);
  const pj = jog.o.position;
  if (!E.cine) {      // (numa cena, quem move o jogador é a cena: cenas.js)
  const passagem = (x, z) => pj.y < 0.3 && CASAS.some((c) => { if (!(c.aberta && c.ang < -1.2)) return false; const [lx, lz] = c.local(x, z); return Math.abs(lx - c.px) < 0.45 && lz > c.pz - 1.0 && lz < c.pz + 0.8; });
  const naFolha = (x, z) => CASAS.some((c) => { if (c.ang > -0.3) return false; const b = new THREE.Box3().setFromObject(c.porta).expandByScalar(0.18); return x > b.min.x && x < b.max.x && z > b.min.z && z < b.max.z; });
  let andou = false;
  if (mv.lengthSq() > 0) {
    mv.normalize(); const dispara = E.correndo || tecla.ShiftLeft || tecla.ShiftRight, corre = dispara || (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.9) || (E.alvoToque && E.alvoToque.distanceTo(jog.o.position) > 6);
    const v = (dispara ? 6.6 : corre ? 5.2 : 2.4) * dt, p = jog.o.position;
    const nx = p.x + mv.x * v, nz = p.z + mv.z * v;
    // não atravessa quem anda (só bloqueia se estiver se aproximando)
    const moveis = [[andante, 0.6], [boi, 1.1], [lavrador, 0.6], [padeira, 0.5], [aguadeira, 0.5], ...ovelhas.map((o) => [o, 0.7])];
    const noChaoBaixo = p.y - chaoTerra(p.x, p.z) < 0.4, preso = bate(p.x, p.z);
    const f0 = preso ? fundo(p.x, p.z) : 0;
    const boca = TUM.lugar.clone().addScaledVector(TUM.frente, 1.2);
    const naBoca = (x, z) => Math.hypot(x - boca.x, z - boca.z) < 2.0 && (x - TUM.lugar.x) * TUM.frente.x + (z - TUM.lugar.z) * TUM.frente.z > 0.2;
    const rochaBloq = (x, z) => TUM.rocha(x, z) > chaoTerra(x, z) + 0.35;   // a frente da boca foi aberta no modelo: o rochedo é parede
    const livre = (x, z) => naArea(x, z) && !naFolha(x, z) && (!noChaoBaixo || !bate(x, z) || (preso && fundo(x, z) <= f0 + 1e-4)) && !rochaBloq(x, z) &&
      (passagem(x, z) || alturaEm(x, z) <= p.y + 0.5) &&
      !moveis.some(([m, r]) => { const d = Math.hypot(m.o.position.x - x, m.o.position.z - z); return d < r && d < Math.hypot(m.o.position.x - p.x, m.o.position.z - p.z); });
    const x0 = p.x, z0 = p.z;
    if (livre(nx, nz)) { p.x = nx; p.z = nz; }
    else if (Math.abs(mv.x) > 0.2 && livre(nx, p.z)) p.x = nx;      // (o eixo só vale se o passo tem parte nele: senão "deslizava" no lugar e parava)
    else if (Math.abs(mv.z) > 0.2 && livre(p.x, nz)) p.z = nz;
    else {      // raspando numa quina: tenta desviar um pouco para cada lado antes de desistir do toque
      let foi = false; for (const g of [0.6, -0.6, 1.2, -1.2]) { const c = Math.cos(g), s = Math.sin(g), dx = (mv.x * c + mv.z * s) * v, dz = (-mv.x * s + mv.z * c) * v; if (livre(p.x + dx, p.z + dz)) { p.x += dx; p.z += dz; foi = true; break; } }
      if (!foi) E.alvoToque = null;
    }
    andou = Math.hypot(p.x - x0, p.z - z0) > v * 0.3;
    const ang = Math.atan2(mv.x, mv.z); let d = ang - jog.o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); jog.o.rotation.y += d * Math.min(1, dt * 12);
    if (andou) jog.toca(dispara ? 'Correr' : corre ? 'Trote' : 'Andar');      // (o botão Correr, ou Shift: corre; o direcional no fim ou o toque longe: trota)
  }
  // altura: degrau, escada e terraço; pulo e queda
  const chao = passagem(pj.x, pj.z) ? 0 : alturaEm(pj.x, pj.z);
  if (E.jogNoChao && pj.y - chao > 0.5) E.jogNoChao = false;
  if (E.jogNoChao) pj.y += (chao - pj.y) * Math.min(1, dt * 18);
  else { E.jogVy -= 14 * dt; pj.y += E.jogVy * dt; if (pj.y <= chao) { pj.y = chao; E.jogVy = 0; E.jogNoChao = true; } }
  if (!E.jogNoChao) jog.toca(E.jogVy > 0 ? 'Pulo_Ar' : 'Pulo_Queda');
  else if (!andou) jog.toca('Parado');
  // entrar pela porta aberta
  for (const c of CASAS) {
    if (!(c.aberta && c.ang < -1.2) || E.fora) continue;
    const [lx, lz] = c.local(pj.x, pj.z);
    if (Math.abs(lx - c.px) < 0.45 && lz < c.pz - 0.45) { E.CASA_ANIM = { c, e: 'dentro', t: 0 }; E.fora = true; }
  }
  const naSaida = jog.o.position.x < -30;
  E.pedraPerto = pj.y - chaoTerra(pj.x, pj.z) < 1.2 && Math.hypot(pj.x - TUM.lugar.x, pj.z - TUM.lugar.z) < 3.6 && Math.abs(TUM.k - TUM.alvo) < 0.01;
  E.tumbaPerto = E.pedraPerto && TUM.alvo === 1 && TUM.k > 0.99 && Math.hypot(pj.x - TUM.lugar.x, pj.z - TUM.lugar.z) < 3.4;
  E.portaPerto = [CASAS[0]].find((c) => pj.y < 0.3 && c.mundo(c.px, c.pz).distanceTo(new THREE.Vector3(pj.x, 0, pj.z)) < 2.6) || null;
  E.falaPerto = pj.y - chaoTerra(pj.x, pj.z) < 1.0 ? INT.perto(pj) : null;       // quem (ou o que) está ao alcance: interacoes.js
  if (naSaida) textoBotao((toqueTela ? '' : 'E: ') + 'seguir para Betfagé');
  if (jog.o.position.x < -35 && !E.fora) perguntaBetfage();    // chegou ao fim da estrada: pergunta
  else if (E.tumbaPerto) textoBotao((toqueTela ? '' : 'E: ') + 'entrar no túmulo');
  else if (E.pedraPerto) textoBotao((toqueTela ? '' : 'E: ') + (TUM.alvo ? 'rolar a pedra de volta' : 'rolar a pedra'));
  else if (E.falaPerto) textoBotao((toqueTela ? '' : 'E: ') + E.falaPerto.verbo);
  else if (E.portaPerto) textoBotao((toqueTela ? '' : 'E: ') + 'entrar na casa');
  botao.style.display = (naSaida || E.portaPerto || E.pedraPerto || E.falaPerto) && !E.fora ? 'block' : 'none';
  marcaPino(botao.style.display === 'block' ? (naSaida ? 'ir' : E.tumbaPerto ? 'entrar' : E.pedraPerto ? 'rolar' : E.falaPerto ? 'falar' : 'entrar') : '');

  } else { botao.style.display = 'none'; marcaPino(''); }

  // a vila: lavoura, ovelhas, ofícios, porteira, pedra do túmulo, passante
  lavouraPasso(dt); ovelhasPasso(dt);
  posesBase(); cenasDepois(dt); fogoPasso(dt, t); pisadorPasso(dt, t); padeiraPasso(dt, t); barracaPasso(dt, t); aguadeiraPasso(dt, t);
  porteiraPasso(dt); pedraPasso(dt); passantePasso(dt); olharPasso(dt);

  // câmera (a das cenas, quando há uma; ao fim dela, volta num corte para o jogador)
  if (CINE.C.corteVolta) { CINE.C.corteVolta = false; foco.set(THREE.MathUtils.clamp(jog.o.position.x, -36, 30), jog.o.position.y * 0.8, THREE.MathUtils.clamp(jog.o.position.z, -21, 23)); }
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * 6);
  const folga = (E.dist - DMIN) / (DMAX - DMIN);            // afastada, anda menos (a vila já cabe)
  const lx = 30 * (1 - folga) + 6, lz = 22 * (1 - folga) + 5;
  const fx = THREE.MathUtils.clamp(jog.o.position.x, -36, 30), fz = THREE.MathUtils.clamp(jog.o.position.z, -21, 23);   // segue sempre o jogador
  foco.x += (fx - foco.x) * Math.min(1, dt * 3); foco.z += (fz - foco.z) * Math.min(1, dt * 3); foco.y += (jog.o.position.y * 0.8 - foco.y) * Math.min(1, dt * 3);
  camera.position.copy(foco).addScaledVector(DIR, E.dist); camera.lookAt(foco);
  scene.fog.near = E.dist + 14; scene.fog.far = E.dist + 70;   // a neblina acompanha o zoom: o fundo da vila nunca some
  sun.position.set(foco.x + 14, 22, foco.z + 9); sun.target.position.copy(foco);
  if (CINE.passo(dt)) { const a = CINE.C.alvo; sun.position.set(a.x + 14, a.y + 22, a.z + 9); sun.target.position.copy(a); }

  marca.passo(jog.o.position, t, E.dist, !E.fora && !E.cine);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

// para os testes automáticos: abrir com ?teste e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { MIX, E, jog, laco, marca, tecla, bate, alturaEm, chaoTerra, scene, camera, CIRC, CAIXAS, renderer, INT, TUM, CASAS, marta, lazaro, cleopas, foco, CINE, caminho };
