// Cidade alta (a praça): quem está ali na manhã do domingo, e a cena de Jo 20.1-10 com Lc 24.1-11.
//   1. A praça está calma. A mulher à porta da casa do cenáculo conta que os discípulos estão lá em cima, com medo, e que
//      as mulheres foram de madrugada ao sepulcro.
//   2. Terminada essa conversa, Maria Madalena entra correndo pela Porta de Genat e chega à casa: “Levaram o Senhor”
//      (Jo 20.1-2). Pedro e o outro discípulo saem correndo para o sepulcro (Jo 20.3-4). Maria fica à porta.
//   3. As outras mulheres chegam, com o recado dos anjos (Lc 24.4-9); sobem, e lá em cima acham que é delírio (Lc 24.11).
//   4. Depois de conversar com o jogador, Maria volta correndo ao sepulcro (Jo 20.11): o jogador não a alcança.
//   5. Perto da Porta de Genat, o jogador dá com Pedro e João voltando (Jo 20.10): contam dos lençóis e do lenço dobrado.
//      Só então a porta fica livre, para o Gólgota (lá, Maria já viu o Senhor).
//   Vindo do Gólgota (?de=genat), tudo isso já passou: Maria está à porta e diz “Vi o Senhor” (Jo 20.18).
// Também: a serva que guarda a porta do sumo sacerdote, junto ao braseiro, e as galinhas no pátio; o soldado da túnica no
// Pavimento; um mercador; gente passando. Jesus não aparece aqui: só na estrada de Emaús.
import * as THREE from 'three';
import { LAY, DE, V3, CIRC, CAIXAS, rnd, fala, scene, E } from './estado.js';
import { terreno } from './cenario.js';
import { gCen, gGal1, gGal2, nPedro, nJoao, nMaria, nPorteira, nServa, nGuarda, nMercador, nAldeao, nMoco, nMulher } from './modelos.js';
import { ator, anda, sombrasPerto, corpo, maos } from './gente.js';
import { roda } from './cine.js';

const CONVERSAS = [];
const OLHA = { norte: Math.PI, sul: 0, leste: Math.PI / 2, oeste: -Math.PI / 2 };
const pt = (k) => V3(LAY[k][0], 0, LAY[k][2]);
function poe(g, h, x, z, r, clipe, col = 0.35) { const st = ator(g, h, x, z, r, clipe); if (col) CIRC.push({ x, z, r: col }); return st; }
let tLeg = 0;
function legenda(txt, seg = 9) { fala(txt); const n = ++tLeg; setTimeout(() => { if (n === tLeg) fala(''); }, seg * 1000); }
// tinge a roupa de um ator (para duas pessoas com o mesmo modelo não parecerem a mesma)
function tinge(st, c) { st.o.traverse((m) => { if (m.isMesh && m.material && m.material.color) { m.material = m.material.clone(); m.material.color.setRGB(m.material.color.r * c[0], m.material.color.g * c[1], m.material.color.b * c[2]); } }); }

const pc = pt('cenaculo'), pgn = pt('genat');
const FORA = V3(pgn.x, 0, pgn.z - 6.0);             // do lado de fora da porta (some ali)
const NA_PORTA = V3(pgn.x, 0, pgn.z + 1.0);
const PORTA_CASA = V3(pc.x, 0, pc.z + 0.4);
const crc = LAY.cenaculo_r, zE = crc[2] - 0.65;                         // a linha da escada, junto à face norte
const PORTA_CIMA = V3(LAY.porta_cima[0], 0, LAY.porta_cima[2] + 0.25);  // na porta de cima, no patamar
const DESCE = [V3(crc[0] + 9.6, 0, zE), V3(crc[0] + 0.9, 0, zE), V3(crc[0] + 0.2, 0, zE - 2.2)];   // do patamar ao pé da escada
const SOBE = [...DESCE].reverse().concat([PORTA_CIMA]);
const vira = (st, x, z) => { st.o.rotation.y = Math.atan2(x - st.o.position.x, z - st.o.position.z); };
const CENA = { fase: DE === 'genat' ? 'fim' : 'calmo', t: 0, viu: {}, livre: DE === 'genat', mariaFalou: false, iP: 0, iJ: 0, iM: 0, iC: 0, i: 0 };

// ---------- a Porta de Genat fica fechada (gente na passagem) até o jogador falar com Pedro e João ----------
const TRAVA = { x0: pgn.x - 2.6, x1: pgn.x + 2.6, z0: pgn.z - 2.2, z1: pgn.z - 1.3 };
if (!CENA.livre) CAIXAS.push(TRAVA);
function abrePorta() { CENA.livre = true; const i = CAIXAS.indexOf(TRAVA); if (i >= 0) CAIXAS.splice(i, 1); }

// ---------- a casa do cenáculo: a mulher à porta ----------
const porteira = poe(nPorteira, 1.62, pc.x + 2.2, pc.z - 0.6, OLHA.norte, 'Parado');
const cPorteira = { nome: 'Uma mulher à porta', o: porteira.o, r: 2.4, falas: [
  'Os discípulos estão lá em cima, na sala grande, com as portas fechadas. Desde sexta têm medo (Jo 20.19).',
  'Algumas mulheres saíram de madrugada, ainda escuro, levando os aromas que prepararam para o corpo (Lc 24.1). Maria de Magdala foi com elas.',
  'Ainda não voltaram. O sepulcro fica logo fora da Porta de Genat, num horto perto da cidade (Jo 19.41-42).',
], aoFim: () => { if (CENA.fase === 'calmo') { CENA.fase = 'maria_vem'; CENA.t = 2.5; } } };
CONVERSAS.push(cPorteira);
const FALAS_PORTEIRA_DEPOIS = [
  'Você viu? Maria chegou correndo, e Pedro e o outro discípulo saíram atrás dela, para o sepulcro.',
  'Lá em cima, uns dizem que roubaram o corpo; outros não dizem nada. Ninguém sabe o que pensar.',
];
if (CENA.fase === 'fim') cPorteira.falas = ['Maria voltou do sepulcro. Diz que viu o Senhor.', 'Lá em cima, eles não sabem se choram ou se riem. Pedro e João também viram o sepulcro vazio, com os lençóis.'];

// ---------- Maria Madalena ----------
const maria = ator(nMaria, 1.5, FORA.x, FORA.z, 0, 'Correr'); maria.o.visible = false;
const LUG_MARIA = V3(pc.x - 1.4, 0, pc.z - 0.9);
const cMaria = { nome: 'Maria Madalena', o: maria.o, r: 2.4, oculto: true, falas: [
  'Ela está sem fôlego, encostada à porta.',
  'Fomos de madrugada, ainda escuro, com os aromas para ungir o corpo (Mc 16.1-2). Quando cheguei, a pedra já estava revolvida do sepulcro (Jo 20.1).',
  '“Levaram o Senhor do sepulcro, e não sabemos onde o puseram” (Jo 20.2).',
  'Preciso voltar lá. Nem que seja só para ficar no lugar onde ele esteve.',
], aoFim: () => { if (CENA.fase !== 'fim') { CENA.mariaFalou = true; cMaria.oculto = true; } } };
CONVERSAS.push(cMaria);
if (CENA.fase === 'fim') {
  maria.o.position.copy(LUG_MARIA); maria.o.visible = true; maria.toca('Parado'); vira(maria, pc.x, pc.z - 8); cMaria.oculto = false;
  cMaria.falas = [
    'Maria Madalena voltou do sepulcro. Os olhos dela brilham.',
    '“Vi o Senhor!” (Jo 20.18). Ele me chamou pelo nome.',
    'Já contei aos discípulos o que ele me disse: “Subo para meu Pai e vosso Pai, meu Deus e vosso Deus” (Jo 20.17).',
  ];
}

// ---------- Pedro e o outro discípulo (João) ----------
const pedro = ator(nPedro, 1.68, PORTA_CIMA.x, PORTA_CIMA.z, 0, 'Correr'), joao = ator(nJoao, 1.71, PORTA_CIMA.x, PORTA_CIMA.z, 0, 'Correr');
for (const st of [pedro, joao]) st.o.visible = false;
const cDois = { nome: 'Pedro e João', o: pedro.o, r: 2.8, oculto: true, falas: [
  'Pedro está ofegante. O outro discípulo, João, tem os olhos acesos.',
  'Pedro: “Fomos ao sepulcro. Estava aberto, e o corpo não estava lá.”',
  'João: “Cheguei primeiro. Abaixei-me e vi os lençóis de linho no chão, mas não entrei” (Jo 20.4-5).',
  'Pedro: “Eu entrei. Os lençóis estavam ali, e o lenço que tinha estado sobre a cabeça dele não estava com os lençóis, mas enrolado num lugar à parte” (Jo 20.6-7). Quem rouba um corpo não deixa as faixas nem dobra o lenço.',
  'João: “Então eu também entrei, e vi, e cri” (Jo 20.8). Ainda não entendiam a Escritura: que era necessário que ele ressuscitasse dos mortos (Jo 20.9).',
  'Pedro: “Vamos para casa, contar aos outros” (Jo 20.10). Maria passou por nós correndo; ficou lá, à porta do sepulcro.',
], aoFim: () => { if (CENA.fase === 'dois_aqui') { CENA.fase = 'dois_casa'; cDois.oculto = true; abrePorta(); legenda('A Porta de Genat está livre. Lá fora, perto, fica o sepulcro.', 6); } } };
CONVERSAS.push(cDois);

// ---------- as outras mulheres (Lc 24.1-11; Mc 16.1; Mt 28.1-8) ----------
const mulheres = [ator(nMulher, 1.55, FORA.x, FORA.z, 0, 'Andar'), ator(nServa, 1.6, FORA.x, FORA.z, 0, 'Andar'), ator(nPorteira, 1.55, FORA.x, FORA.z, 0, 'Andar')];
tinge(mulheres[1], [0.75, 0.82, 1.0]); tinge(mulheres[2], [1.0, 0.8, 0.7]);
for (const st of mulheres) st.o.visible = false;
const LUG_M = [V3(pc.x - 2.8, 0, pc.z - 2.4), V3(pc.x - 3.8, 0, pc.z - 3.2), V3(pc.x - 2.0, 0, pc.z - 3.4)];
const cMulheres = { nome: 'As mulheres', o: mulheres[0].o, r: 2.8, oculto: true, falas: [
  'Joana, Maria, mãe de Tiago, e as outras que estavam com elas (Lc 24.10). Estão com medo e com grande alegria ao mesmo tempo (Mt 28.8).',
  'Entramos no sepulcro e não achamos o corpo do Senhor Jesus (Lc 24.3).',
  'E pararam junto de nós dois homens com vestes resplandecentes. Ficamos com medo, de rosto em terra (Lc 24.4-5).',
  'Eles disseram: “Por que buscais entre os mortos aquele que vive? Não está aqui, mas ressuscitou. Lembrai-vos de como vos falou, estando ainda na Galileia” (Lc 24.5-6).',
  'E nós nos lembramos das palavras dele (Lc 24.8). Subimos para contar aos onze. Mas lá em cima acham que é delírio, e não acreditam em nós (Lc 24.11).',
] };
CONVERSAS.push(cMulheres);

// ---------- a casa do sumo sacerdote: a serva da porta, junto ao braseiro, e as galinhas ----------
const pb = pt('braseiro');
const serva = poe(nServa, 1.6, pb.x + 1.3, pb.z + 0.4, OLHA.oeste, 'Parado');
CONVERSAS.push({ nome: 'A serva da porta', o: serva.o, r: 2.4, falas: [
  'Na quinta à noite, quando trouxeram o nazareno preso, um galileu ficou aqui, se aquentando neste braseiro com os servos e os guardas (Jo 18.18).',
  'Eu, que guardo a porta, perguntei: “Não és tu também dos discípulos deste homem?” Ele disse: “Não sou” (Jo 18.17).',
  'Negou três vezes, e o galo cantou. O Senhor voltou-se e olhou para ele; e ele saiu e chorou amargamente (Lc 22.61-62).',
] });
const BRAS = (() => {
  const g = new THREE.Group(), y = terreno(pb.x, pb.z); g.position.set(pb.x, y, pb.z); scene.add(g);
  const barro = new THREE.MeshStandardMaterial({ color: 0x9a5a38, roughness: 0.95, flatShading: true });
  const perfil = [[0.3, 0], [0.42, 0.04], [0.52, 0.2], [0.58, 0.42], [0.62, 0.5], [0.55, 0.52], [0.5, 0.44]].map(([r, h]) => new THREE.Vector2(r, h));
  const bacia = new THREE.Mesh(new THREE.LatheGeometry(perfil, 12), barro); bacia.castShadow = bacia.receiveShadow = true; g.add(bacia);
  for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.12, 0.1), barro); const a = i * 2.094; p.position.set(Math.cos(a) * 0.32, 0.03, Math.sin(a) * 0.32); g.add(p); }
  const mBrasa = new THREE.MeshStandardMaterial({ color: 0x2a1408, emissive: 0xff4a10, emissiveIntensity: 1.2, roughness: 1, flatShading: true });
  const brasas = [];
  for (let i = 0; i < 16; i++) { const b = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07 + rnd() * 0.05, 0), mBrasa); const a = rnd() * 6.28, r = rnd() * 0.36; b.position.set(Math.cos(a) * r, 0.44 + rnd() * 0.05, Math.sin(a) * r); b.rotation.set(rnd() * 3, rnd() * 3, 0); g.add(b); brasas.push(b); }
  const chamas = [], cores = [0xffb347, 0xff7a1a, 0xffd27a];
  for (let i = 0; i < 6; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(0.05 + (i % 2) * 0.03, 0.26, 5), new THREE.MeshBasicMaterial({ color: cores[i % 3], transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending })); const a = i * 1.05, r = 0.08 + (i % 3) * 0.09; c.position.set(Math.cos(a) * r, 0.58, Math.sin(a) * r); c.userData.f = rnd() * 6; g.add(c); chamas.push(c); }
  let t = 0;
  return { passo(dt) { t += dt; mBrasa.emissiveIntensity = 1.0 + 0.35 * Math.sin(t * 2.1) + 0.2 * Math.sin(t * 5.3); for (const c of chamas) { const f = c.userData.f; const s = 0.7 + 0.35 * Math.sin(t * 9 + f) + 0.15 * Math.sin(t * 17 + f * 2); c.scale.set(1, s, 1); c.position.y = 0.5 + 0.13 * s; c.material.opacity = 0.55 + 0.3 * Math.sin(t * 7 + f); } } };
})();
const galinhas = [];
for (let i = 0; i < 4; i++) { const g = ator(i % 2 ? gGal2 : gGal1, 0.42, pb.x + (rnd() - 0.5) * 5, pb.z + (rnd() - 0.5) * 5, rnd() * 6.28, rnd() < 0.5 ? 'Comer' : 'Parado'); g.alvo = null; g.espera = rnd() * 3; galinhas.push(g); }
// ---------- o Pavimento: o soldado da túnica, na frente do palácio ----------
const pg = pt('gabata');
const guarda = poe(nGuarda, 1.6, pg.x + 2.5, pg.z + 3.2, OLHA.leste, 'Parado');
guarda.o.position.y = LAY.gabata[1];
CONVERSAS.push({ nome: 'O soldado da túnica', o: guarda.o, r: 2.4, falas: [
  'Aqui o governador se assentou no tribunal, no lugar chamado Pavimento, em hebraico Gabatá. Era a preparação da Páscoa, quase a hora sexta (Jo 19.13-14).',
  'Ele lavou as mãos diante da multidão: “Estou inocente do sangue deste justo.” E o povo respondeu: “O seu sangue caia sobre nós e sobre os nossos filhos” (Mt 27.24-25).',
  'Lá dentro, no pretório, a coorte inteira zombou dele. Vestiram-no de púrpura, puseram-lhe uma coroa de espinhos e batiam-lhe na cabeça com uma cana (Mc 15.16-19). Eu estava lá.',
  'A túnica? Sim, fui eu que a ganhei nas sortes. Era sem costura, tecida de alto a baixo, de uma peça só (Jo 19.23-24). Não deixamos rasgar.',
  'Está aqui, dobrada. É boa lã. Mas não consigo vesti-la. Quando a pego, lembro que ele não disse uma palavra contra nós.',
] });
// ---------- o mercado ----------
const pm = pt('mercado');
const mercador = poe(nMercador, 1.71, pm.x - 2.5, pm.z + 1.5, OLHA.sul, 'Conversando');
CONVERSAS.push({ nome: 'Um mercador', o: mercador.o, r: 2.4, falas: [
  'Azeite, figos secos, tâmaras de Jericó! A cidade ainda está cheia de peregrinos da Páscoa.',
  'Hoje cedo, uns guardas passaram por aqui correndo, para a casa do sumo sacerdote (Mt 28.11). Pareciam ter visto um fantasma.',
] });
const passantes = [ator(nAldeao, 1.7, pm.x + 2, pm.z + 4, 0, 'Andar'), ator(nMoco, 1.7, -18, -24, 0, 'Andar')];
const ROTAS_P = [[V3(pm.x + 2, 0, pm.z + 4), V3(-4, 0, -30), V3(-20, 0, -21)], [V3(-18, 0, -24), V3(-14, 0, -40), V3(LAY.ponte[0] - 4, 0, LAY.ponte[2])]];
const PAS = passantes.map((st, k) => ({ st, rota: ROTAS_P[k], i: 1, ida: true, espera: 0 }));

// ---------- a cena ----------
// Quem anda não recebe clipe à força: o "anda" escolhe andar ou correr pela velocidade (forçar outro clipe a cada quadro
// reiniciava a animação, e as pernas travavam). Ao parar, toca "Parado"; para olhar, gira aos poucos.
// A câmera acompanha a cena (cine.js): os planos de cada trecho estão junto dele.
const DENTRO_CIMA = V3(PORTA_CIMA.x, 0, crc[2] + 0.7), DENTRO_BAIXO = V3(pc.x, 0, crc[2] + 0.7);
const yla = LAY.porta_cima[1];
const PORTAO = V3(pgn.x, 0, pgn.z + 1.5);
const PARA_M = V3(pgn.x, 0, pgn.z + 3.8);                 // logo depois da porta: Maria para, sem fôlego
const RECUO = V3(crc[0] + 9.3, 0, crc[2] - 1.1);           // no alto da escada, afastada da porta (a folha abre para fora)
function olha(st, x, z, dt) {
  let d = Math.atan2(x - st.o.position.x, z - st.o.position.z) - st.o.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d));
  st.o.rotation.y += d * Math.min(1, dt * 4);
}
const para = (st) => st.toca('Parado');
// segue uma rota, cada um no seu ritmo; vel pode ser um número ou uma função do ponto (i) em que está; true no fim
function segue(st, rota, dt, vel, desvio = null) {
  st.i = st.i || 0; if (st.i >= rota.length) return true;
  const alvo = desvio ? rota[st.i].clone().add(desvio) : rota[st.i];
  if (anda(st, alvo, dt, typeof vel === 'function' ? vel(st.i) : vel)) { st.i++; if (st.i >= rota.length) { para(st); return true; } }
  return false;
}
const comeca = (st, p) => { st.o.position.copy(p); st.o.visible = true; st.i = 0; };
const dist = (st, v) => Math.hypot(st.o.position.x - v.x, st.o.position.z - v.z);
// colisão dos que estão na cena: o jogador não atravessa ninguém
const ELENCO = [maria, pedro, joao, ...mulheres];
const CORPOS = ELENCO.map((st) => { const c = { x: 0, z: 0, r: 0 }; CIRC.push(c); return [st, c]; });
// quem está parado e o jogador chega perto olha para ele
const ATENTOS = [porteira, maria, ...mulheres];

// ---------- as portas da casa, que abrem e fecham ----------
// A folha é copiada da porta do cenário (a mesma madeira); atrás dela fica o vão escuro. Abre para fora, girando na
// dobradiça do lado leste.
function criaPorta(bx0, bx1, by0, by1) {
  let fonte = null;
  gCen.scene.traverse((o) => { if (o.isMesh && o.material && o.material.name === 'Cidade_porta_d') for (let p = o; p; p = p.parent) if (/Cenaculo/.test(p.name)) fonte = o; });
  const z = crc[2], g = new THREE.Group(); scene.add(g);
  let xa = bx0, xb = bx1, ya = by0, yb = by1, geo = null;
  if (fonte) {
    // os triângulos da porta, no mundo, virados para fora (para o norte)
    fonte.updateWorldMatrix(true, false);
    const src = fonte.geometry.index ? fonte.geometry.toNonIndexed() : fonte.geometry, P = src.attributes.position;
    const a = V3(), b = V3(), c = V3(), n = V3(), M = fonte.matrixWorld, tris = [];
    for (let i = 0; i < P.count; i += 3) {
      a.fromBufferAttribute(P, i).applyMatrix4(M); b.fromBufferAttribute(P, i + 1).applyMatrix4(M); c.fromBufferAttribute(P, i + 2).applyMatrix4(M);
      const cx = (a.x + b.x + c.x) / 3, cy = (a.y + b.y + c.y) / 3;
      n.subVectors(b, a).cross(V3().subVectors(c, a));
      if (cx > bx0 && cx < bx1 && cy > by0 && cy < by1 && n.z < 0) tris.push(i);
    }
    if (tris.length) {
      geo = new THREE.BufferGeometry(); const pos = new Float32Array(tris.length * 9); xa = ya = 1e9; xb = yb = -1e9;
      tris.forEach((i, j) => { for (let v = 0; v < 3; v++) { a.fromBufferAttribute(P, i + v).applyMatrix4(M); pos.set([a.x, a.y, a.z], (j * 3 + v) * 3); xa = Math.min(xa, a.x); xb = Math.max(xb, a.x); ya = Math.min(ya, a.y); yb = Math.max(yb, a.y); } });
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      for (const k of ['uv', 'color']) {
        const at = src.attributes[k]; if (!at) continue; const arr = new Float32Array(tris.length * 3 * at.itemSize);
        tris.forEach((i, j) => { for (let v = 0; v < 3; v++) for (let s = 0; s < at.itemSize; s++) arr[(j * 3 + v) * at.itemSize + s] = at.getComponent(i + v, s); });
        geo.setAttribute(k, new THREE.BufferAttribute(arr, at.itemSize));
      }
      const z0 = pos[2]; geo.translate(-xb, -ya, -z0); geo.computeVertexNormals();
    }
  }
  const w = xb - xa, h = yb - ya;
  const vao = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.04, h + 0.02), new THREE.MeshBasicMaterial({ color: 0x150d07 }));
  vao.position.set((xa + xb) / 2, ya + h / 2, z - 0.1); vao.rotation.y = Math.PI; g.add(vao);
  const pivo = new THREE.Group(); pivo.position.set(xb, ya, z - 0.14); g.add(pivo);
  const folha = geo ? new THREE.Mesh(geo, fonte.material) : new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.05).translate(-w / 2, h / 2, 0), new THREE.MeshStandardMaterial({ color: 0x6b4a2e }));
  folha.castShadow = true; folha.receiveShadow = true; pivo.add(folha);
  const D = { ang: 0, alvo: 0, abre() { D.alvo = -1.75; }, fecha() { D.alvo = 0; }, passo(dt) { D.ang += (D.alvo - D.ang) * Math.min(1, dt * 2.6); pivo.rotation.y = D.ang; } };
  return D;
}
const PORTA_C = criaPorta(PORTA_CIMA.x - 0.75, PORTA_CIMA.x + 0.75, yla - 0.3, yla + 2.6);
const PORTA_B = criaPorta(pc.x - 0.75, pc.x + 0.75, terreno(pc.x, pc.z) - 1.0, yla - 0.6);

// ---------- Maria bate à porta: a mão direita vai à madeira (IK do motor), três batidas, uma pausa, mais três ----------
corpo(maria);
let AC = null;
function toc() {
  try {
    AC = AC || new (globalThis.AudioContext || globalThis.webkitAudioContext)(); const t = AC.currentTime;
    const o = AC.createOscillator(), g = AC.createGain(); o.type = 'triangle';
    o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.09);
    g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    o.connect(g).connect(AC.destination); o.start(t); o.stop(t + 0.15);
  } catch (e) { /* sem som */ }
}
const BATIDAS = [0.3, 0.62, 0.94, 1.9, 2.22, 2.54];
function bate(st, t, t0, dt) {
  for (const b of BATIDAS) if (t0 < b && t >= b) toc();
  let d = 1; for (const b of BATIDAS) d = Math.min(d, Math.abs(t - b) / 0.16);
  const peso = t < 0.2 ? t / 0.2 : t > 2.8 ? Math.max(0, (3.1 - t) / 0.3) : 1;
  const mao = V3(PORTA_CIMA.x + 0.12, st.o.position.y + 1.28, crc[2] - 0.2 - 0.13 * d);
  const e = V3(); st.os.bE[2].getWorldPosition(e);
  maos(st, e, mao, dt, peso, 14, 0.35, 0.35);
}
const larga = (st, dt) => { if (st.pesoB > 0.01) { const e = V3(), d = V3(); st.os.bE[2].getWorldPosition(e); st.os.bD[2].getWorldPosition(d); maos(st, e, d, dt, 0); } };

// ---------- os planos da câmera ----------
const DEG = 180 / Math.PI;
const cab = (st, h = 1.2) => () => st.o.position.clone().add(V3(0, h, 0));
const ponto = (v, h) => () => V3(v.x, terreno(v.x, v.z) + h, v.z);
const meio = (lista, h = 1.1) => () => { const vs = lista.filter((s) => s.o.visible); if (!vs.length) return lista[0].o.position.clone().add(V3(0, h, 0)); const c = V3(); vs.forEach((s) => c.add(s.o.position)); return c.divideScalar(vs.length).add(V3(0, h, 0)); };
const NA_PORTA_DE_CIMA = () => V3(PORTA_CIMA.x - 0.3, yla + 1.2, crc[2] - 0.7);
const ROTA_D = [DESCE[0], DESCE[1], DESCE[2], NA_PORTA, FORA], nE = 2;      // os discípulos: até o pé da escada (i ≤ 2), andando
const PLANOS_MARIA = [
  { alvo: ponto(PORTAO, 1.8), dist: 15, el: 13, yaw: 12, k: 2.5, kd: 2.5, ate: () => CENA.sub !== 'entra' },                   // a porta da cidade
  { alvo: cab(maria, 1.28), dist: 3.0, el: 5, yaw: () => maria.o.rotation.y * DEG - 50, zoom: 0.85, k: 5, kd: 5, ate: () => CENA.sub !== 'para' },   // de perto: ofegante
  { alvo: cab(maria, 1.0), dist: 12, el: 20, yaw: 65, zoom: 1, k: 3, kd: 0.7, ate: () => CENA.sub === 'sobe' },             // afasta-se, correndo com ela
  { alvo: cab(maria, 1.0), dist: 9.5, el: 15, yaw: 160, k: 2.2, kd: 1.4, ate: () => CENA.sub === 'bate' },                   // sobe a escada
  { alvo: NA_PORTA_DE_CIMA, dist: 5.0, el: 15, yaw: 250, zoom: 0.92, k: 2.2, kd: 1.8, ate: () => CENA.sub === 'abre' },       // bate (de lado: a mão na porta)
  { alvo: () => meio([joao, maria], 1.3)().lerp(NA_PORTA_DE_CIMA(), 0.4), dist: 7, el: 17, yaw: 160, k: 2, kd: 1.5, ate: () => CENA.sub === 'saem' },   // a porta abre; João
  { alvo: cab(joao, 1.1), dist: 7.5, el: 16, yaw: 165, k: 2.5, kd: 1.5, ate: () => joao.i >= 2 },                         // saem
  { alvo: cab(joao, 1.0), dist: 11, el: 19, yaw: 165, k: 2.5, kd: 1.2, ate: () => joao.i > nE },                           // descem
  { alvo: meio([joao, pedro], 1.0), dist: 13, el: 22, yaw: 15, k: 2, kd: 0.9, ate: () => joao.i >= 4 },                    // correm para a porta
  { alvo: ponto(PORTAO, 1.6), dist: 14, el: 15, yaw: 15, k: 2, kd: 1.5, dur: 2.5 },                                        // somem lá fora
];

function cenaPasso(dt, pj) {
  CENA.t -= dt;
  for (const [st, c] of CORPOS) { c.x = st.o.position.x; c.z = st.o.position.z; c.r = st.o.visible ? 0.32 : 0; }
  for (const st of ATENTOS) if (st.o.visible && st.atual === 'Parado' && !st.ocupado && Math.hypot(pj.x - st.o.position.x, pj.z - st.o.position.z) < 4) olha(st, pj.x, pj.z, dt);
  PORTA_C.passo(dt); PORTA_B.passo(dt);
  mulheresPasso(dt, pj);
  roteiro(dt, pj);
  // dentro da casa, logo atrás da porta de cima, o chão é o da sala de cima
  for (const st of ELENCO) { const p = st.o.position; if (st.o.visible && p.z > crc[2] - 0.3 && Math.abs(p.x - PORTA_CIMA.x) < 0.9 && p.y < yla - 0.4) p.y = yla; }
}
function roteiro(dt, pj) {
  const F = CENA.fase;
  if (F === 'maria_vem') {
    if (CENA.t > 0) return;
    if (!CENA.sub) { CENA.sub = 'entra'; comeca(maria, FORA); maria.ocupado = true; roda(PLANOS_MARIA); }
    if (CENA.sub === 'entra') {
      // entra correndo pela Porta de Genat e para logo depois dela
      if (segue(maria, [NA_PORTA, PARA_M], dt, (i) => (i === 0 ? 4.4 : Math.max(1.0, dist(maria, PARA_M) * 1.6)))) { CENA.sub = 'para'; CENA.t = 2.6; legenda('Maria Madalena entra correndo pela Porta de Genat, sem fôlego.', 4); }
      return;
    }
    if (CENA.sub === 'para') {
      olha(maria, DESCE[2].x, DESCE[2].z, dt * 0.5);
      if (CENA.t <= 0) { CENA.sub = 'corre'; maria.i = 0; legenda('Maria Madalena correu e foi ter com Simão Pedro e com o outro discípulo. (Jo 20.2)', 7); }
      return;
    }
    if (CENA.sub === 'corre') {
      // atravessa a praça correndo e, perto da escada, vai diminuindo
      if (segue(maria, [DESCE[2]], dt, () => Math.min(4.4, 1.6 + dist(maria, DESCE[2]) * 0.6))) { CENA.sub = 'sobe'; maria.i = 0; }
      return;
    }
    if (CENA.sub === 'sobe') {
      if (segue(maria, [DESCE[1], DESCE[0], PORTA_CIMA], dt, (i) => (i === 2 ? 0.9 : 1.7))) { CENA.sub = 'bate'; CENA.tb = 0; legenda('Maria sobe a escada e bate à porta da sala de cima: “Pedro! João!”', 5); }
      return;
    }
    if (CENA.sub === 'bate') {
      olha(maria, PORTA_CIMA.x, crc[2] + 3, dt);
      const t0 = CENA.tb; CENA.tb += dt; bate(maria, CENA.tb, t0, dt);
      if (CENA.tb > 3.1) { CENA.fase = 'dois_vao'; CENA.sub = 'recua'; maria.i = 0; }
    }
    return;
  }
  if (F === 'dois_vao') {
    larga(maria, dt);
    if (CENA.sub === 'recua') {
      // dá um passo atrás; a porta abre
      if (segue(maria, [RECUO], dt, 0.7)) { PORTA_C.abre(); CENA.sub = 'abre'; CENA.t = 0.9; }
      return;
    }
    olha(maria, PORTA_CIMA.x, PORTA_CIMA.z, dt);
    if (CENA.sub === 'abre') { if (CENA.t <= 0) { comeca(joao, DENTRO_CIMA); CENA.sub = 'joao'; } return; }
    if (CENA.sub === 'joao') {
      if (segue(joao, [PORTA_CIMA], dt, 1.0)) {
        legenda('Maria: “Levaram do sepulcro o Senhor, e não sabemos onde o puseram.” (Jo 20.2)', 5);
        comeca(pedro, DENTRO_CIMA); CENA.sub = 'fala'; CENA.t = 3.4;
      }
      return;
    }
    if (CENA.sub === 'fala') {
      olha(joao, maria.o.position.x, maria.o.position.z, dt);
      if (segue(pedro, [V3(PORTA_CIMA.x + 0.25, 0, crc[2] - 0.15)], dt, 0.9)) olha(pedro, maria.o.position.x, maria.o.position.z, dt);
      if (CENA.t <= 0) {
        CENA.sub = 'saem'; joao.i = pedro.i = 0; CENA.tP = 0.6; CENA.fechou = false; maria.i = 0;
        cPorteira.falas = FALAS_PORTEIRA_DEPOIS;
        legenda('Pedro e o outro discípulo saíram e foram ao sepulcro. Os dois corriam juntos; mas o outro discípulo correu mais depressa do que Pedro. (Jo 20.3-4)', 9);
      }
      return;
    }
    if (CENA.sub === 'saem') {
      // descem a escada andando; na praça, correm (o outro discípulo mais depressa, Jo 20.4)
      const fimJ = !joao.o.visible || segue(joao, ROTA_D, dt, (i) => (i <= nE ? 1.6 : 4.8), joao.i > nE ? V3(0.6, 0, 0) : null);
      const fimP = (CENA.tP -= dt) > 0 ? false : !pedro.o.visible || segue(pedro, ROTA_D, dt, (i) => (i <= nE ? 1.5 : 4.0));
      if (fimJ) joao.o.visible = false; if (fimP) pedro.o.visible = false;
      if (!CENA.fechou && joao.i >= 1 && pedro.i >= 1) { CENA.fechou = true; PORTA_C.fecha(); }
      // depois que eles passam, Maria desce devagar e fica ao pé da casa
      const mFim = pedro.i >= 2 && segue(maria, [DESCE[0], DESCE[1], DESCE[2], LUG_MARIA], dt, 1.2);
      if (fimJ && fimP && mFim) { CENA.fase = 'maria_porta'; CENA.sub = ''; maria.ocupado = false; cMaria.oculto = false; M.em = 10; }
    }
    return;
  }
  if (F === 'maria_porta') {
    if (CENA.mariaFalou) {
      CENA.fase = 'maria_volta'; maria.i = 0; legenda('E Maria voltou correndo ao sepulcro. (Jo 20.11)', 5);
      roda([{ alvo: cab(maria, 1.0), dist: 9, el: 17, yaw: () => maria.o.rotation.y * DEG + 200, k: 3, kd: 1.2, dur: 3.8 }]);
    }
    return;
  }
  if (F === 'maria_volta') {
    // volta correndo ao sepulcro (Jo 20.11), mais depressa que o jogador
    if (segue(maria, [V3(pc.x - 1.0, 0, pc.z - 6), NA_PORTA, FORA], dt, 5.4)) { maria.o.visible = false; CENA.fase = 'espera_dois'; }
    return;
  }
  if (F === 'espera_dois') {
    // o jogador chega perto da porta: Pedro e João vêm voltando (Jo 20.10)
    if (Math.hypot(pj.x - pgn.x, pj.z - pgn.z) > 10) return;
    comeca(pedro, FORA); comeca(joao, FORA.clone().add(V3(0.8, 0, -0.6))); CENA.fase = 'dois_voltam';
    legenda('E os discípulos tornaram para casa. (Jo 20.10)', 6);
    roda([
      { alvo: ponto(PORTAO, 1.7), dist: 13, el: 11, yaw: 8, k: 2.5, kd: 2, ate: () => CENA.fase !== 'dois_voltam' },
      { alvo: meio([pedro, joao], 1.45), dist: 4.5, el: 7, yaw: () => Math.atan2(pj.x - pedro.o.position.x, pj.z - pedro.o.position.z) * DEG + 25, zoom: 0.9, k: 3, kd: 3, dur: 2.2 },
    ]);
    return;
  }
  if (F === 'dois_voltam') {
    const a = segue(pedro, [V3(pgn.x - 0.5, 0, pgn.z + 1.6)], dt, 1.3), b = segue(joao, [V3(pgn.x + 0.6, 0, pgn.z + 1.9)], dt, 1.3);
    if (a && b) { cDois.oculto = false; CENA.fase = 'dois_aqui'; }
    return;
  }
  if (F === 'dois_aqui') { olha(pedro, pj.x, pj.z, dt); olha(joao, pj.x, pj.z, dt); return; }
  if (F === 'dois_casa') {
    // voltam para casa: sobem a escada; a porta abre para eles e fecha depois
    if (!CENA.casa) { CENA.casa = true; pedro.i = joao.i = 0; }
    const rota = [...SOBE, DENTRO_CIMA];
    const a = !pedro.o.visible || segue(pedro, rota, dt, 1.6), b = !joao.o.visible || segue(joao, rota, dt, 1.6, joao.i < 3 ? V3(-0.7, 0, 0) : null);
    if (pedro.i >= 3) PORTA_C.abre();
    if (a) pedro.o.visible = false; if (b) joao.o.visible = false;
    if (a && b) { PORTA_C.fecha(); CENA.fase = 'fim'; }
  }
}
// as mulheres: um pouco depois, chegam pela Porta de Genat, sobem a escada para contar aos onze e entram pela porta de
// cima; depois saem pela porta de baixo e ficam ali
const M = { fase: 'fora', t: 0, em: -1 };
const livreP = () => !E.fora && !E.cine;
function poeMulheresNaPorta() { mulheres.forEach((st, k) => { st.o.position.copy(LUG_M[k]); st.o.visible = true; para(st); st.o.rotation.y = Math.PI; }); cMulheres.oculto = false; M.fase = 'porta'; }
const ROTA_M = [NA_PORTA, ...SOBE, DENTRO_CIMA];
function mulheresPasso(dt) {
  M.t -= dt;
  if (M.fase === 'fora') {
    if (M.em < 0 || (M.em -= dt) > 0 || !livreP()) return;
    M.fase = 'vem'; mulheres.forEach((st, k) => { st.atraso = k * 0.9; st.dentro = false; st.ocupado = true; });
    roda([
      { alvo: ponto(PORTAO, 1.7), dist: 14, el: 13, yaw: 15, k: 2.5, kd: 2, ate: () => mulheres[0].o.visible && mulheres[0].i >= 1 },
      { alvo: meio(mulheres), dist: 12, el: 19, yaw: 60, k: 2.5, kd: 0.9, ate: () => mulheres[0].i >= 2 },
      { alvo: meio(mulheres), dist: 10, el: 16, yaw: 165, k: 2.2, kd: 1.3, ate: () => M.fase !== 'vem' },
      { alvo: NA_PORTA_DE_CIMA, dist: 7, el: 11, yaw: 205, k: 2, kd: 1.5, dur: 1.8 },
    ]);
    legenda('Outras mulheres chegam do sepulcro: Joana, Maria, mãe de Tiago, e as que estavam com elas. (Lc 24.10)', 7);
    return;
  }
  if (M.fase === 'vem') {
    let todas = true;
    mulheres.forEach((st, k) => {
      if ((st.atraso -= dt) > 0) { todas = false; return; }
      if (!st.o.visible && !st.dentro) comeca(st, FORA.clone().add(V3(k * 0.5 - 0.5, 0, 0)));
      if (st.dentro) return;
      if (segue(st, ROTA_M, dt, (i) => (i <= 1 ? 3.2 : 1.5), st.i === 0 ? V3(k * 0.6 - 0.6, 0, 0) : null)) { st.o.visible = false; st.dentro = true; } else todas = false;
    });
    if (mulheres[0].i >= 4) PORTA_C.abre();           // a primeira chega à porta de cima: abrem para elas
    if (todas) { PORTA_C.fecha(); M.fase = 'dentro'; M.t = 7; legenda('E, voltando do sepulcro, anunciaram todas estas coisas aos onze e a todos os demais. (Lc 24.9)', 8); }
    return;
  }
  if (M.fase === 'dentro') {
    if (M.t > 0 || !livreP()) return;
    mulheres.forEach((st, k) => { comeca(st, DENTRO_BAIXO); st.atraso = 0.8 + k * 0.8; st.o.visible = false; });
    PORTA_B.abre(); M.fase = 'saem'; legenda('E as suas palavras lhes pareciam como desvario, e não as creram. (Lc 24.11)', 8);
    roda([{ alvo: () => V3(pc.x, terreno(pc.x, pc.z) + 1.3, pc.z - 1.2), dist: 8, el: 12, yaw: 200, zoom: 0.95, k: 2.5, kd: 1.5, ate: () => M.fase === 'porta' }, { alvo: meio(mulheres, 1.3), dist: 6, el: 10, yaw: 200, k: 2, kd: 1.5, dur: 1.5 }]);
    return;
  }
  if (M.fase === 'saem') {
    let todas = true;
    mulheres.forEach((st, k) => {
      if ((st.atraso -= dt) > 0) { todas = false; return; }
      st.o.visible = true;
      if (!segue(st, [V3(pc.x, 0, pc.z - 0.6), LUG_M[k]], dt, 1.2)) todas = false;
    });
    if (todas) { PORTA_B.fecha(); cMulheres.oculto = false; M.fase = 'porta'; mulheres.forEach((st) => { st.ocupado = false; }); }
  }
}
if (CENA.fase === 'fim') poeMulheresNaPorta();

// ---------- as coisas para olhar (entram na mesma lista das conversas, com outro verbo e sem nome no título) ----------
const coisa = (nome, x, z, falas, r = 2.2, verbo = 'olhar ' + nome) => CONVERSAS.push({ nome, titulo: '', verbo, o: { position: { x, z }, visible: true }, falas, r });
coisa('o braseiro', pb.x - 1.2, pb.z, [
  'Um braseiro de barro, com as brasas ainda mornas.',
  'Os servos e os guardas acenderam um fogo de brasas, porque fazia frio, e se aquentavam; e Pedro estava com eles, aquentando-se (Jo 18.18).',
  'E, virando-se o Senhor, olhou para Pedro; e Pedro se lembrou da palavra: “Antes que o galo cante, me negarás três vezes.” E, saindo dali, chorou amargamente (Lc 22.61-62).',
], 1.6);
coisa('o tribunal', pg.x - 3.0, pg.z, [
  'O tribunal de pedra, sobre o Pavimento: daqui o governador julga.',
  'Estando ele assentado no tribunal, sua mulher mandou dizer-lhe: “Não entres na questão desse justo, porque num sonho muito sofri por causa dele” (Mt 27.19).',
  'Pilatos disse: “Eis aqui o vosso rei.” Mas eles bradaram: “Tira, tira, crucifica-o!” (Jo 19.14-15).',
], 2.4);
const cr = LAY.cenaculo_r;
coisa('a escada da sala de cima', cr[0] + 5.0, cr[2] - 2.0, [
  'A escada de fora, que sobe para a sala grande do andar de cima. A porta lá em cima está fechada.',
  '“E ele vos mostrará um grande cenáculo mobilado; aí fazei preparativos” (Lc 22.12).',
  'Na quinta à noite, ele tomou o pão, e, havendo dado graças, partiu-o e disse: “Isto é o meu corpo, que por vós é dado; fazei isto em memória de mim.” E o cálice: “Este cálice é o novo testamento no meu sangue, que é derramado por vós” (Lc 22.19-20).',
], 2.4, 'olhar a escada');
const pl = LAY.palacio;
coisa('o palácio', pl[1] + 2.2, pg.z - 6.0, [
  'O palácio de Herodes, com as três torres: o pretório, onde o governador fica durante a festa.',
  'Os principais sacerdotes não entraram no pretório, para não se contaminarem, e poderem comer a Páscoa (Jo 18.28).',
  'Pilatos perguntou a Jesus: “Tu és o rei dos judeus?” E ele respondeu: “O meu reino não é deste mundo” (Jo 18.33-36).',
], 2.6, 'olhar o palácio');

function npcsPasso(dt, pj) {
  sombrasPerto(dt, pj); BRAS.passo(dt);
  for (const g of galinhas) {
    if (g.espera > 0) { g.espera -= dt; continue; }
    if (!g.alvo) g.alvo = V3(pb.x + (rnd() - 0.5) * 6, 0, pb.z + (rnd() - 0.5) * 6);
    if (anda(g, g.alvo, dt, 0.3)) { g.alvo = null; g.espera = 2 + rnd() * 4; g.toca(rnd() < 0.6 ? 'Comer' : 'Parado'); }
  }
  for (const A of PAS) {
    if (A.espera > 0) { A.espera -= dt; A.st.toca('Parado'); continue; }
    A.st.toca('Andar');
    if (anda(A.st, A.rota[A.i], dt, 1.0)) {
      if (A.ida) { if (A.i < A.rota.length - 1) A.i++; else { A.ida = false; A.espera = 4; } }
      else { if (A.i > 0) A.i--; else { A.ida = true; A.espera = 3; } }
    }
  }
  cenaPasso(dt, pj);
}

export { CONVERSAS, npcsPasso, CENA, maria, pedro, joao, porteira, serva, guarda, mercador, mulheres };
