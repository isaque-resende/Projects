// Betfagé: liga os controles às ações e roda o laço do jogo (o que acontece a cada quadro).
import * as THREE from 'three';
import { botao, E, fade, fala, bate, AB, sm, scene, sun, renderer, CIRC, CAIXAS } from './estado.js';
import './modelos.js';
import { TERRENO, CONSTR, terreno, AMOS } from './cenario.js';
import { INS, paredeEm, alturaEm, presoEm } from './insula.js';
import { UT } from './trigal.js';
import './plantas.js';
import { fornoPasso } from './forno.js';
import { MIX, partPasso } from './gente.js';
import { ceifeiro, atadeira, carregador, ceifeiroPasso, atadeiraPasso, carregadorPasso } from './ceifa.js';
import { debulhadorPasso, joeiradeiraPasso } from './eira.js';
import { andante, ovelhas } from './aldeia.js';
import { ctl, camera, jog, fw, DIR, rt, mv, tecla, JOY, naArea, toqueTela, DMAX, DMIN, DJOGO, CENTRO, foco } from './jogador.js';
import { caminho } from './caminho.js';
import { aldeiaPasso } from './vida.js';
import { acionar, pergunta, perguntaBetania } from './saidas.js';
import { INT } from './interacoes.js';
import './visao.js';
import { criaMarcador } from '../../limpo-motor/marcador.js';
import { cenasPasso, voltaCamera, CINE } from './cenas.js';

ctl.aoAcionar = acionar;
botao.onclick = () => acionar();
// toque no chão: traça o caminho e anda até lá
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
ctl.aoToque = (e) => {
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera);
  const h = ray.intersectObjects([TERRENO, INS.g, ...CONSTR], true)[0]; if (h) { E.alvoToque = h.point.clone(); E.TRILHA = caminho(jog.o.position, E.alvoToque); }
};

// legendas da chegada
// (a chegada, com a câmera mostrando a aldeia e os pontos de interesse, está em cenas.js)
setTimeout(() => { fade.style.opacity = 0; setTimeout(() => { fade.textContent = ''; }, 900); }, 1200);

// ---------- laço ----------
const marca = criaMarcador(scene, camera, jog.o);   // a seta sobre a cabeça, quando algo esconde o jogador
const relogio = new THREE.Clock();
const laco = (forca) => {
  const dt = forca || Math.min(relogio.getDelta(), 0.05), t = relogio.elapsedTime;
  for (const m of MIX) m.update(dt);
  UT.uTime.value = t;
  fw.copy(DIR).negate().setY(0).normalize(); rt.set(-fw.z, 0, fw.x);
  mv.set(0, 0, 0);
  if (!E.fora && !E.cine) {
    if (tecla.KeyW || tecla.ArrowUp) mv.add(fw); if (tecla.KeyS || tecla.ArrowDown) mv.sub(fw);
    if (tecla.KeyD || tecla.ArrowRight) mv.add(rt); if (tecla.KeyA || tecla.ArrowLeft) mv.sub(rt);
    if (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.15) mv.addScaledVector(fw, -JOY.y).addScaledVector(rt, JOY.x);
    if (mv.lengthSq() > 0) E.alvoToque = null;
    else if (E.alvoToque) {
      while (E.TRILHA.length > 1 && Math.hypot(E.TRILHA[0].x - jog.o.position.x, E.TRILHA[0].z - jog.o.position.z) < 0.3) E.TRILHA.shift();
      const alvo = E.TRILHA.length ? E.TRILHA[0] : E.alvoToque;
      mv.subVectors(alvo, jog.o.position).setY(0); if (mv.length() < 0.15) { E.alvoToque = null; E.TRILHA = []; mv.set(0, 0, 0); }
    }
  }
  const pj = jog.o.position;
  let andou = false;
  if (mv.lengthSq() > 0) {
    mv.normalize(); const corre = tecla.ShiftLeft || tecla.ShiftRight || (JOY.on && Math.hypot(JOY.x, JOY.y) > 0.9) || (E.alvoToque && E.alvoToque.distanceTo(jog.o.position) > 6);
    const v = (corre ? 4.6 : 2.2) * dt, p = jog.o.position;
    const nx = p.x + mv.x * v, nz = p.z + mv.z * v;
    const moveis = [[andante, 0.55], [ceifeiro, 0.5], [atadeira, 0.5], [carregador, 0.5], ...ovelhas.map((o) => [o, 0.6])];
    const rente = p.y - terreno(p.x, p.z) < 0.4;
    const preso = rente && bate(p.x, p.z, 0.25);        // caiu (pulando) dentro de um obstáculo: deixa sair
    const livreJ = (x, z) => naArea(x, z) && (!rente || preso || !bate(x, z, 0.25)) &&
      !paredeEm(x, z, p.y) && !paredeEm(x + mv.x * 0.25, z + mv.z * 0.25, p.y) &&
      terreno(x, z) <= p.y + 0.55 && (!presoEm(x, z, alturaEm(x, z, p.y)) || presoEm(p.x, p.z, p.y)) &&
      !moveis.some(([m, r]) => { const d = Math.hypot(m.o.position.x - x, m.o.position.z - z); return d < r && d < Math.hypot(m.o.position.x - p.x, m.o.position.z - p.z); });
    const x0 = p.x, z0 = p.z;
    if (livreJ(nx, nz)) { p.x = nx; p.z = nz; }
    else if (Math.abs(mv.x) > 0.2 && livreJ(nx, p.z)) p.x = nx;      // (o eixo só vale se o passo tem parte nele: senão "deslizava" no lugar e parava)
    else if (Math.abs(mv.z) > 0.2 && livreJ(p.x, nz)) p.z = nz;
    else {      // raspando numa quina: tenta desviar um pouco para cada lado antes de desistir do toque
      let foi = false; for (const g of [0.6, -0.6, 1.2, -1.2]) { const c = Math.cos(g), s = Math.sin(g), dx = (mv.x * c + mv.z * s) * v, dz = (-mv.x * s + mv.z * c) * v; if (livreJ(p.x + dx, p.z + dz)) { p.x += dx; p.z += dz; foi = true; break; } }
      if (!foi) E.alvoToque = null;
    }
    andou = Math.hypot(p.x - x0, p.z - z0) > v * 0.3;
    const ang = Math.atan2(mv.x, mv.z); let d = ang - jog.o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); jog.o.rotation.y += d * Math.min(1, dt * 12);
    if (andou) jog.toca(corre ? 'Correr' : 'Andar');
  }
  const chaoJ = alturaEm(pj.x, pj.z, pj.y + (E.jogNoChao ? 0 : -0.5));
  if (E.jogNoChao && pj.y - chaoJ > 0.55) E.jogNoChao = false;
  if (E.jogNoChao) pj.y += (chaoJ - pj.y) * Math.min(1, dt * 18);
  else { E.jogVy -= 14 * dt; pj.y += E.jogVy * dt; if (pj.y <= chaoJ) { pj.y = chaoJ; E.jogVy = 0; E.jogNoChao = true; } }
  if (!E.jogNoChao) jog.toca(E.jogVy > 0 ? 'Pulo_Ar' : 'Pulo_Queda');
  else if (!andou) jog.toca('Parado');
  const [ja, jb] = AB(pj.x, pj.z);
  E.saida = ja + jb > 2.5 ? 'alto' : ja + jb < 0.04 ? 'baixo' : null;
  if (E.saida === 'alto' && !E.fora && !E.cine) pergunta();          // chegou ao alto: pergunta na hora
  if (E.saida === 'baixo' && !E.fora && !E.cine) perguntaBetania();
  if (E.saida === 'alto') botao.textContent = (toqueTela ? '' : 'E: ') + 'seguir para Jerusalém';
  else if (E.saida === 'baixo') botao.textContent = (toqueTela ? '' : 'E: ') + 'voltar para Betânia';
  E.int = E.saida || E.fora || E.cine ? null : INT.perto(pj);           // quem (ou o que) está ao alcance: interacoes.js
  if (E.int) { const s = (toqueTela ? '' : 'E: ') + E.int.verbo; if (botao.textContent !== s) botao.textContent = s; }
  botao.style.display = (E.saida || E.int) && !E.fora && !E.cine ? 'block' : 'none';

  UT.uP.value[0].copy(pj); UT.uP.value[1].copy(ceifeiro.o.position); UT.uP.value[2].copy(atadeira.o.position); UT.uP.value[3].copy(carregador.o.position);
  fornoPasso(dt, t); ceifeiroPasso(dt, t); atadeiraPasso(dt); carregadorPasso(dt); debulhadorPasso(dt, t); joeiradeiraPasso(dt, t); partPasso(dt);
  aldeiaPasso(dt, t); cenasPasso(dt);

  // câmera: afastada, o diorama inteiro; aproximando, segue o jogador (numa cena, a câmera é da cena: cenas.js)
  if (CINE.C.corteVolta) { CINE.C.corteVolta = false; voltaCamera(); }
  E.distAlvo = Math.min(E.distAlvo, DMAX());
  E.dist += (E.distAlvo - E.dist) * Math.min(1, dt * (E.abrindo ? 0.9 : 6));
  if (E.abrindo && Math.abs(E.distAlvo - E.dist) < 0.3) E.abrindo = false;
  let k = sm(DMIN, DMAX() * 0.92, E.dist);
  let alvoF = pj.clone().lerp(CENTRO, k);
  // o jogador sempre dentro do quadro: nas pontas do mapa (a figueira seca), mirar perto do centro o deixava de fora
  for (const pc = pj.clone(); k > 0; k = Math.max(0, k - 0.1), alvoF = pj.clone().lerp(CENTRO, k)) {
    camera.position.copy(alvoF).addScaledVector(DIR, E.dist); camera.lookAt(alvoF); camera.updateMatrixWorld();
    pc.copy(pj).setY(pj.y + 0.9).project(camera); if (Math.abs(pc.x) < 0.8 && Math.abs(pc.y) < 0.75) break;
  }
  foco.lerp(alvoF, Math.min(1, dt * 3));
  camera.position.copy(foco).addScaledVector(DIR, E.dist); camera.lookAt(foco);
  scene.fog.near = E.dist + 6; scene.fog.far = E.dist + 40;
  sun.position.set(foco.x - 10, foco.y + 26, foco.z + 14); sun.target.position.copy(foco);
  if (CINE.passo(dt)) { const a = CINE.C.alvo; sun.position.set(a.x - 10, a.y + 26, a.z + 14); sun.target.position.copy(a); scene.fog.near = 40; scene.fog.far = 120; }
  marca.passo(pj, t, E.dist, !E.fora && !E.cine);
  renderer.render(scene, camera);
};
renderer.setAnimationLoop(() => laco());
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

// para os testes automáticos: abrir com ?teste e usar TESTE no console
if (globalThis.MODO_TESTE) globalThis.TESTE = { MIX, E, jog, laco, marca, tecla, bate, alturaEm, chaoTerra: terreno, scene, camera, CIRC, CAIXAS, renderer, AMOS, INT, CINE, caminho };
