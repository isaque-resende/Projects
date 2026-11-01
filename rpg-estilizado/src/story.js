import * as THREE from 'three';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { GOLGOTHA, TOMB, GETHSEMANE, TM } from './world/layout.js';
import { neutralMantle } from './character.js';

// =====================================================================================
//  Prólogo: domingo de manhã, o terceiro dia. O jogador é o discípulo que, à tarde, vai
//  com Cléopas para Emaús (Lc 24:13-35). Antes de partir, ele ouve Jerusalém: pessoas e
//  objetos que contam o que houve na sexta-feira... e que algo está estranho.
// =====================================================================================

// ---------------- pessoas ----------------
// kind: male | female | soldier | priest ; at: [x, z] ; face: [x, z] ; y: altura fixa (opcional)
function people(extras) {
  const I = extras.intro, G = extras.golgotha, T = extras.tomb;
  const doorOut = I.out, side = [I.out[0] - 1.6 * Math.sin(I.yaw + Math.PI / 2), I.out[1] - 1.6 * Math.cos(I.yaw + Math.PI / 2)];
  return [
    { id: 'casa', name: 'A dona da casa', kind: 'female', at: [side[0] - 1.2, side[1] + 1.2], face: doorOut, colors: { tunic: 0xd8c8a6, veil: 0x8a9cb8, mantle: 0xb0a090 },
      lines: [
        'Até que enfim acordou. Você gemia no sono... de novo a sexta-feira, não é?',
        'Ninguém nesta casa dorme direito desde que o desceram da cruz.',
        'Cléopas passou aqui antes do sol. Disse que vai esperar você na Porta de Jafa, do outro lado da cidade. Querem ir para Emaús ainda hoje.',
        'E falou mais uma coisa, sem fôlego: umas mulheres foram ao sepulcro de madrugada e voltaram contando coisas. Vá. Escute o que estão dizendo em Jerusalém.',
      ], then: 'cleopas' },
    { id: 'pastor', name: 'Pastor', kind: 'male', at: [88, 146], face: [96, 150], colors: { tunic: 0xbfae8c, mantle: 0x9a8f80 },
      lines: [
        'Conto as ovelhas toda manhã. Hoje estão todas aqui.',
        'Ele dizia: "Ferirei o pastor, e as ovelhas se dispersarão." E foi assim. Os amigos dele sumiram como ovelhas no escuro.',
        'Mas pastor bom não abandona o rebanho. É o que eu acho.',
      ] },
    { id: 'horto', name: 'Homem do horto', kind: 'male', at: [GETHSEMANE.x - 3, GETHSEMANE.z + 7], face: [GETHSEMANE.x - 4, GETHSEMANE.z - 3], colors: { tunic: 0xa89878, mantle: 0x7a8a70 },
      lines: [
        'Foi aqui, na quinta à noite. Eu dormia ali, perto da prensa.',
        'Vieram com tochas, espadas e paus. Um dos doze ia na frente... e o cumprimentou com um beijo.',
        'Um rapaz fugiu nu, largando o lençol na mão dos guardas. Todos fugiram. Todos.',
      ] },
    { id: 'soldado', name: 'Soldado romano', kind: 'soldier', at: [G.cross[0] + 4.5, G.cross[2] + 3], face: [G.cross[0], G.cross[2]],
      lines: [
        'Circule, galileu. Não há mais nada para ver aqui.',
        '...Três crucificados na sexta. O do meio morreu depressa. Não amaldiçoou ninguém. Pediu perdão por nós.',
        'Ao meio-dia o sol escureceu por três horas. O centurião bateu no peito e disse: "Este era mesmo o Filho de Deus." Desde então, não fala com ninguém.',
      ] },
    { id: 'guarda', name: 'Guarda do sepulcro', kind: 'soldier', at: [T.X + 7.5, T.FZ + 9], face: [T.X, T.FZ],
      lines: [
        'Eu não vi nada! A gente estava dormindo. É isso. Dormindo.',
        'Se alguém perguntar: os discípulos dele vieram de noite e levaram o corpo. Foi o que nos mandaram dizer... quer dizer, foi o que aconteceu.',
        'A terra tremeu. Uma luz... Não. Não vou falar disso.',
      ] },
    { id: 'mulher', name: 'Mulher no jardim', kind: 'female', at: [T.X - 6, T.FZ + 8], face: [T.X, T.FZ], colors: { tunic: 0xcbb994, veil: 0xe2d8c4, mantle: 0x9a7f6a },
      lines: [
        'Viemos ao amanhecer com os perfumes, para o corpo. No caminho a gente se perguntava: quem vai rolar a pedra?',
        'A pedra já estava rolada. O túmulo, vazio.',
        'Dois homens com roupas que brilhavam como relâmpago nos disseram: "Por que vocês procuram entre os mortos aquele que vive?"',
        'Contamos aos onze. Acharam que era delírio de mulher. Entre ali. Veja você mesmo.',
      ] },
    { id: 'sacerdote', name: 'Sacerdote', kind: 'priest', at: [66, -42], face: [30, -7], y: TM.y,
      lines: [
        'Paz, peregrino. A festa acabou e você ainda está aqui?',
        'Sexta, na hora do sacrifício da tarde, a terra tremeu. O véu do santuário se rasgou de alto a baixo.',
        'De alto a baixo, entende? Não de baixo para cima, como mão de homem rasgaria. Mandaram calar.',
        'E hoje cedo vieram dizer que o túmulo daquele galileu está vazio. Os chefes já estão reunidos.',
      ] },
    { id: 'mercador', name: 'Mercador', kind: 'male', at: [-49.4, 9.5], face: [-49.4, 0], colors: { tunic: 0xd0b480, mantle: 0x7a4a6a, sash: 0xb08050 },
      lines: [
        'Tâmaras! Figos de Betfagé! ...Ah, você é um dos galileus dele, não é? Fala como eles.',
        'O povo gritou "Barrabás!" e Pilatos lavou as mãos. Barrabás passou por aqui ontem, rindo, com um figo meu na mão.',
        'Agora dizem que os discípulos roubaram o corpo. Vocês? Um de vocês negou o mestre diante de uma criada!',
      ] },
    { id: 'pretorio', name: 'Mulher no pretório', kind: 'female', at: [-35, -61], face: [-30, -65], colors: { tunic: 0xbfa98a, veil: 0x6a5a7a, mantle: 0x8a7a6a },
      lines: [
        'Eu estava aqui quando o trouxeram ao pretório. Açoitaram até não sobrar pele nas costas.',
        'Os soldados trançaram uma coroa de espinhos e o vestiram de púrpura. Ajoelhavam e cuspiam: "Salve, rei dos judeus!"',
        'Ele não respondeu nada. Como cordeiro diante de quem o tosquia.',
      ] },
    { id: 'cleopas', name: 'Cléopas', proper: true, kind: 'male', at: [-140, 6], face: [-120, 4], colors: { tunic: 0xe0d6c0, mantle: 0x6f7f9a }, final: true,
      lines: [
        'Até que enfim! Pensei que você não vinha.',
        'Você ouviu? As mulheres dizem que o túmulo está vazio. Alguns dos nossos correram até lá e encontraram tudo como elas disseram. Mas a ele, ninguém viu.',
        'Nós esperávamos que fosse ele quem ia libertar Israel... e hoje já é o terceiro dia desde que tudo aconteceu.',
        'Vamos para Emaús. São sessenta estádios. No caminho a gente conversa sobre tudo isso.',
      ] },
  ];
}

// ---------------- objetos ----------------
function things(extras) {
  const G = extras.golgotha, T = extras.tomb, V = extras.veil;
  return [
    { id: 'cruz', name: 'a cruz do meio', at: G.cross, r: 2.6,
      lines: ['A madeira ainda tem manchas escuras. No alto, a placa em hebraico, grego e latim: "Jesus Nazareno, Rei dos Judeus".',
        'Dois ladrões morreram ao lado dele. A um deles, dizem, ele prometeu: "Hoje estarás comigo no paraíso."'] },
    { id: 'tunica', name: 'a túnica', at: [-71, null, -113], r: 2.2, mesh: 'tunic',
      lines: ['Uma túnica sem costura, tecida de alto a baixo numa peça só.', 'Ao lado, dados de osso. Os soldados tiraram a sorte por ela, para não rasgá-la.'] },
    { id: 'coroa', name: 'a coroa de espinhos', at: [-30, null, -65], r: 2.2, mesh: 'crown',
      lines: ['Uma coroa trançada de espinhos, jogada no chão do pátio.', 'Os espinhos ainda têm sangue seco.'] },
    { id: 'pedra', name: 'a pedra', at: T.stone, r: 2.8,
      lines: ['A pedra é enorme. Seriam precisos vários homens para rolá-la.', 'E o selo romano que a prendia está partido.'] },
    { id: 'lencois', name: 'os lençóis', at: T.linen, r: 1.9,
      lines: ['Os lençóis de linho estão aqui, no lugar onde o corpo foi posto. O lenço que cobria a cabeça está dobrado, à parte.', 'Quem rouba um corpo e deixa as faixas arrumadas?'] },
    { id: 'veu', name: 'o véu', at: V, r: 3.2,
      lines: ['O véu do santuário: azul, púrpura, escarlate e linho fino.', 'Rasgado de alto a baixo.'] },
  ];
}

// ---------------- malhas dos objetos ----------------
function crownMesh(M) {
  const g = new THREE.Group(), wood = new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0.9 });
  for (let k = 0; k < 3; k++) { const t = new THREE.Mesh(new THREE.TorusGeometry(0.14 + k * 0.006, 0.012, 5, 22), wood); t.rotation.x = Math.PI / 2 + (k - 1) * 0.12; t.rotation.y = k; g.add(t); }
  for (let i = 0; i < 46; i++) {
    const a = (i / 46) * Math.PI * 2, c = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.06, 4), wood);
    c.position.set(Math.cos(a) * 0.145, (i % 3 - 1) * 0.012, Math.sin(a) * 0.145);
    c.lookAt(Math.cos(a) * 0.4, (i % 5 - 2) * 0.2, Math.sin(a) * 0.4); c.rotateX(Math.PI / 2); g.add(c);
  }
  g.rotation.x = 0.25; return g;
}
function tunicMesh(M) {
  const g = new THREE.Group();
  const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(0.6, 1), M.cliff); rock.scale.set(1.3, 0.45, 1); rock.position.y = 0.1; g.add(rock);
  const cloth = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.07, 0.5), new THREE.MeshStandardMaterial({ color: 0xe6dcc4, roughness: 0.95 }));
  cloth.position.set(0, 0.36, 0); cloth.rotation.y = 0.3; g.add(cloth);
  const fold = cloth.clone(); fold.scale.set(0.8, 1, 0.85); fold.position.y = 0.42; fold.rotation.y = 0.2; g.add(fold);
  const bone = new THREE.MeshStandardMaterial({ color: 0xe9e0c9, roughness: 0.6 });
  for (let i = 0; i < 3; i++) { const d = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), bone); d.position.set(0.45 + i * 0.06, 0.32, 0.25 - i * 0.05); d.rotation.set(i, i * 2, 0); g.add(d); }
  return g;
}
function spearMesh(M) {
  const g = new THREE.Group();
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.026, 2.3, 6), M.darkWood); shaft.position.y = 1.15; g.add(shaft);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.3, 6), M.bronze); tip.position.y = 2.45; g.add(tip);
  g.rotation.z = 0.12; return g;
}

// ---------------- montagem de cada pessoa ----------------
function dress(root, kind, colors, M) {
  root.traverse((o) => {
    if (!o.isMesh) return;
    if ((kind === 'soldier') && (o.userData.part === 'hair' || o.userData.part === 'beard')) o.visible = false;
    const n = o.material?.name;
    const pal = kind === 'soldier' ? { tunic: 0xa8322a, mantle: 0x8a2a22, sash: 0x5a3a20 } : kind === 'priest' ? { tunic: 0xf4f0e6, mantle: 0xe8e2d4, sash: 0x5a4aa0 } : colors || {};
    if (n && pal[n] !== undefined) { o.material = o.material.clone(); o.material.color = new THREE.Color(pal[n]); if (n === 'mantle') o.material.map = neutralMantle(); }
  });
  root.updateMatrixWorld(true);
  let head = null; root.traverse((o) => { if (o.isBone && o.name === 'Head') head = o; });
  if (!head) return;
  const hp = new THREE.Vector3(); head.getWorldPosition(hp);
  const add = (mesh, dy) => { mesh.position.set(hp.x, hp.y + dy, hp.z); root.add(mesh); mesh.updateMatrixWorld(true); head.attach(mesh); };
  if (kind === 'soldier') {
    const helm = new THREE.Mesh(new THREE.SphereGeometry(0.135, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), M.bronze);
    helm.scale.set(1, 1.05, 1.12); add(helm, 0.075);
    const crest = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.26), new THREE.MeshStandardMaterial({ color: 0xa02a20, roughness: 0.9 })); add(crest, 0.22);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.014, 5, 20), M.bronze); rim.rotation.x = Math.PI / 2; add(rim, 0.075);
  }
  if (kind === 'priest') {
    const white = new THREE.MeshStandardMaterial({ color: 0xf6f2e8, roughness: 0.9 });
    const tur = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.13, 0.13, 14), white); add(tur, 0.17);
    for (let k = 0; k < 3; k++) { const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.022, 6, 18), white); ring.rotation.x = Math.PI / 2; add(ring, 0.12 + k * 0.045); }
  }
}

// lugares das pessoas e objetos (a vegetação não cresce em cima deles)
export function reservedSpots(extras) {
  return [...people(extras).map((d) => [d.at[0], d.at[1], 2.6]), ...things(extras).map((d) => [d.at[0], d.at[2], 3])];
}

export function makeStory(ctx) {
  const { scene, camera, solids, heightAt, extras, clips, maleTpl, femaleTpl, M, player, hero, play, grade, isTouch } = ctx;
  const $ = (s) => document.querySelector(s);
  const ui = { talk: $('#talk'), name: $('#talkName'), text: $('#talkText'), prompt: $('#prompt'), act: $('#bAct'), obj: $('#objective'), cap: $('#caption'), skip: $('#skip') };

  // ---------- pessoas no mundo ----------
  const npcs = people(extras).map((d) => {
    const root = skClone(d.kind === 'female' ? femaleTpl : maleTpl);
    dress(root, d.kind, d.colors, M);
    root.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; } });
    const y = d.y ?? heightAt(d.at[0], d.at[1]);
    root.position.set(d.at[0], y, d.at[1]);
    root.rotation.y = Math.atan2(d.face[0] - d.at[0], d.face[1] - d.at[1]);
    scene.add(root);
    const mixer = new THREE.AnimationMixer(root);
    const idle = mixer.clipAction(clips[d.idle || 'Idle_Loop']), talk = mixer.clipAction(clips.Idle_Talking_Loop);
    idle.play(); mixer.update(Math.random() * 3);
    solids.add({ x: d.at[0], z: d.at[1], hx: 0.32, hz: 0.32, rot: 0, y0: y - 0.5, y1: y + 1.7 });
    if (d.kind === 'soldier') { const sp = spearMesh(M); sp.position.set(d.at[0] + 0.55, y, d.at[1] + 0.2); scene.add(sp); }
    return { ...d, root, mixer, idle, talk, y, baseYaw: root.rotation.y, kind: 'npc', heard: false };
  });
  // ---------- objetos ----------
  const objs = things(extras).map((d) => {
    const at = [d.at[0], d.at[1] ?? heightAt(d.at[0], d.at[2]), d.at[2]];
    if (d.mesh) { const m = d.mesh === 'crown' ? crownMesh(M) : tunicMesh(M); m.position.set(at[0], heightAt(at[0], at[2]) + (d.mesh === 'crown' ? 0.03 : 0), at[2]); m.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); scene.add(m); }
    return { ...d, at, kind: 'obj', heard: false };
  });
  const sealStone = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.45, 22).rotateX(Math.PI / 2), M.cliff);
  sealStone.position.set(extras.tomb.X, extras.tomb.g + 1.15, extras.tomb.FZ + 0.4); sealStone.visible = false; scene.add(sealStone);
  const total = npcs.filter((n) => !n.final && n.id !== 'casa').length + objs.length;

  // ---------- objetivo ----------
  let objective = '';
  const heardCount = () => [...npcs, ...objs].filter((x) => x.heard && !x.final && x.id !== 'casa').length;
  function setObjective(t) { objective = t; refreshObjective(); }
  function refreshObjective() {
    if (!objective) { ui.obj.hidden = true; return; }
    ui.obj.hidden = false;
    ui.obj.innerHTML = `<b>${objective}</b><span>Relatos ouvidos: ${heardCount()} de ${total}</span>`;
  }

  // ---------- diálogo ----------
  let dlg = null; // { who, lines, i, shown, done }
  const SPEED = 46;
  function openDialog(who) {
    dlg = { who, lines: who.lines, i: 0, shown: 0 };
    ui.talk.hidden = false; ui.name.textContent = who.kind === 'npc' ? who.name : `Você examina ${who.name}`;
    ui.prompt.hidden = true; ui.act.hidden = true;
    if (who.kind === 'npc') { who.idle.crossFadeTo(who.talk.reset().play(), 0.3, false); }
  }
  function advance() {
    if (!dlg) return;
    const full = dlg.lines[dlg.i];
    if (dlg.shown < full.length) { dlg.shown = full.length; return; }
    dlg.i++; dlg.shown = 0;
    if (dlg.i >= dlg.lines.length) closeDialog();
  }
  function closeDialog() {
    const who = dlg.who; dlg = null; ui.talk.hidden = true;
    if (who.kind === 'npc') { who.talk.crossFadeTo(who.idle.reset().play(), 0.4, false); }
    const first = !who.heard; who.heard = true;
    if (who.id === 'casa' && first) setObjective('Encontre Cléopas na Porta de Jafa. No caminho, ouça o que dizem em Jerusalém.');
    else refreshObjective();
    if (who.final) startEnding();
  }
  ui.talk.addEventListener('pointerdown', (e) => { e.stopPropagation(); advance(); });

  // ---------- cinema: introdução e fim do prólogo ----------
  let cine = null; // { shots, i, t }
  const I = extras.intro, G = extras.golgotha, T = extras.tomb;
  const v3 = (a, b, c) => new THREE.Vector3(a, b, c);
  const sitPos = v3(I.sit[0], I.sit[2], I.sit[1]);
  const gH = (x, z) => heightAt(x, z);
  const gx = GETHSEMANE.x, gz = GETHSEMANE.z;
  const introShots = [
    { dur: 5.2, fade: [1, 1], caps: [[0.4, 'Primeiro dia da semana.'], [2.6, 'Betânia, ao amanhecer.']], cam: () => [v3(I.camIn[0], I.camIn[2], I.camIn[1]), sitPos.clone().add(v3(0, 1.0, 0))] },
    { dur: 4.4, caps: [[0.3, 'Três dias. E eu não consigo parar de ver...']], cam: (t) => [v3(I.camIn[0], I.camIn[2] - t * 0.1, I.camIn[1]), sitPos.clone().add(v3(0, 1.05, 0))] },
    { dur: 3.8, mem: 1, dark: 0.55, caps: [[0.3, 'Tochas no horto. Um beijo.']], cam: (t) => [v3(gx - 13 + t * 2.5, gH(gx, gz) + 3, gz + 11 - t * 2), v3(gx, gH(gx, gz) + 2, gz)] },
    { dur: 3.8, mem: 1, dark: 0.2, caps: [[0.3, 'O pretório. A coroa de espinhos. "Crucifica-o!"']], cam: (t) => [v3(-31.6 + t * 0.15, gH(-31.6, -62.6) + 1.05 - t * 0.12, -62.6 - t * 0.1), v3(-30, gH(-30, -65) + 0.05, -65)] },
    { dur: 4.4, mem: 1, dark: 0.45, caps: [[0.3, 'Ao meio-dia, trevas sobre a terra.'], [2.2, '"Está consumado."']], cam: (t) => [v3(G.cross[0] + 8 - t, G.top + 1.2, G.cross[2] + 8 - t), v3(G.cross[0], G.top + 4.2, G.cross[2])] },
    { dur: 3.8, mem: 1, dark: 0.3, sealed: 1, caps: [[0.3, 'Uma pedra sobre a entrada. O sábado em silêncio.']], cam: (t) => [v3(T.X + 0.6, T.g + 1.3, T.FZ + 3.6 - t * 0.3), v3(T.X, T.g + 1.0, T.FZ)] },
    { dur: 3.4, caps: [[0.4, '...e mesmo assim, algo está estranho.']], player: 'Sitting_Exit', cam: (t) => [v3(I.camIn[0], I.camIn[2], I.camIn[1]), sitPos.clone().add(v3(0, 1.0 + t * 0.15, 0))] },
    { dur: 4.6, walk: [I.door, I.out], cam: () => { const o = I.out2; return [v3(o[0] + 1.5, gH(o[0], o[1]) + 2.4, o[1] + 1.5), player.position.clone().add(v3(0, 1.4, 0))]; } },
  ];
  function startIntro() {
    cine = { shots: introShots, i: 0, t: 0, onEnd: endIntro };
    document.body.classList.add('cine'); ui.skip.hidden = false;
    player.position.copy(sitPos); hero.rotation.y = 0; player.rotation.y = 0;
    ctx.setHeroYaw(I.yaw);
    play('Sitting_Idle_Loop', { fade: 0 });
    enterShot();
  }
  function endIntro() {
    sealStone.visible = false;
    cine = null; document.body.classList.remove('cine'); ui.skip.hidden = true; ui.cap.classList.remove('on');
    grade.uMem.value = 0; grade.uFade.value = 0; grade.uDark.value = 0;
    const o = I.out; player.position.set(o[0], solids.groundAt(o[0], o[1], heightAt(o[0], o[1]) + 1), o[1]);
    ctx.setHeroYaw(I.yaw); ctx.resetCam(I.yaw + Math.PI);
    setObjective('Fale com a dona da casa.');
  }
  function enterShot() {
    const s = cine.shots[cine.i]; cine.t = 0; cine.capI = 0; ui.cap.classList.remove('on');
    grade.uFlash.value = s.mem || cine.shots[cine.i - 1]?.mem ? 1 : 0;
    sealStone.visible = !!s.sealed;
    if (s.player) play(s.player, { once: true, fade: 0.2 });
    if (s.walk) { cine.walk = { pts: s.walk, k: 0 }; play('Walk_Loop', { fade: 0.3 }); }
  }
  function cineUpdate(dt) {
    const s = cine.shots[cine.i]; cine.t += dt;
    const u = Math.min(1, cine.t / s.dur);
    grade.uMem.value = THREE.MathUtils.damp(grade.uMem.value, s.mem ? 1 : 0, 6, dt);
    grade.uDark.value = THREE.MathUtils.damp(grade.uDark.value, s.dark || 0, 4, dt);
    grade.uFlash.value = Math.max(0, grade.uFlash.value - dt * 2.4);
    if (s.black) grade.uFade.value = 1;
    else if (s.fade) grade.uFade.value = 1 - Math.min(1, Math.max(0, (cine.t - 2.2) / 1.6));
    else if (s.end) grade.uFade.value = Math.min(1, cine.t / 0.8);
    else grade.uFade.value = Math.max(0, grade.uFade.value - dt * 2);
    // legendas
    while (s.caps && cine.capI < s.caps.length && cine.t >= s.caps[cine.capI][0]) { ui.cap.textContent = s.caps[cine.capI][1]; ui.cap.classList.add('on'); cine.capI++; }
    if (cine.t > s.dur - 0.5) ui.cap.classList.remove('on');
    // caminhada roteirizada até a porta e para fora
    if (cine.walk) {
      const w = cine.walk, tgt = w.pts[w.k], p = player.position, dx = tgt[0] - p.x, dz = tgt[1] - p.z, d = Math.hypot(dx, dz);
      if (d < 0.15) { if (w.k < w.pts.length - 1) w.k++; else { cine.walk = null; play('Idle_Loop'); } }
      else { const sp = Math.min(d, 1.6 * dt); p.x += dx / d * sp; p.z += dz / d * sp; p.y = solids.groundAt(p.x, p.z, p.y); ctx.setHeroYaw(Math.atan2(dx, dz)); }
    }
    const [cp, look] = s.cam(cine.t);
    if (cine.t >= s.dur) { cine.i++; if (cine.i >= cine.shots.length) { const f = cine.onEnd; f(); return null; } enterShot(); }
    return { pos: cp, look };
  }
  function startEnding() {
    const back = { pos: camera.position.clone(), look: player.position.clone().add(v3(0, 1.4, 0)) };
    cine = {
      shots: [
        { dur: 1.2, end: 1, cam: () => [back.pos, back.look] },
        { dur: 7.5, cam: () => [back.pos, back.look], caps: [[0.3, 'Naquele mesmo dia, dois deles iam para um povoado chamado Emaús...'], [4.2, '...e conversavam sobre tudo o que tinha acontecido.']], black: 1 },
        { dur: 3.2, cam: () => [back.pos, back.look], caps: [[0.4, 'Continua.']], black: 1 },
      ], i: 0, t: 0, onEnd: () => { cine = null; document.body.classList.remove('cine'); ui.cap.classList.remove('on'); grade.uFade.value = 0; setObjective('Prólogo concluído. Explore Jerusalém à vontade.'); },
    };
    document.body.classList.add('cine'); enterShot();
  }
  ui.skip.addEventListener('click', () => { if (cine && cine.onEnd === endIntro) endIntro(); });

  // ---------- atualização por quadro ----------
  const tmp = new THREE.Vector3();
  function update(dt, inp, t) {
    // pessoas: animação perto do jogador, somem de longe; viram para quem fala com elas
    for (const n of npcs) {
      const d = n.root.position.distanceTo(player.position);
      n.root.visible = d < 95 || !!cine;
      if (n.root.visible) n.mixer.update(dt);
      const target = dlg?.who === n ? Math.atan2(player.position.x - n.root.position.x, player.position.z - n.root.position.z) : n.baseYaw;
      let dy = target - n.root.rotation.y; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); n.root.rotation.y += dy * Math.min(1, dt * 4);
    }
    if (cine) {
      if (cine.shots[cine.i]?.black) grade.uFade.value = 1;
      const cam = cineUpdate(dt);
      return { lock: true, cam };
    }
    if (dlg) {
      dlg.shown = Math.min(dlg.lines[dlg.i].length, dlg.shown + dt * SPEED);
      ui.text.textContent = dlg.lines[dlg.i].slice(0, Math.floor(dlg.shown));
      ui.talk.classList.toggle('ready', dlg.shown >= dlg.lines[dlg.i].length);
      if (inp.interact || inp.jump) advance();
      // o jogador olha para quem fala
      if (dlg?.who) { const w = dlg.who, wp = w.kind === 'npc' ? w.root.position : tmp.set(w.at[0], 0, w.at[2]); ctx.setHeroYaw(Math.atan2(wp.x - player.position.x, wp.z - player.position.z)); }
      return { lock: true };
    }
    // algo por perto para falar/examinar?
    let best = null, bd = Infinity;
    for (const n of npcs) { const d = Math.hypot(n.root.position.x - player.position.x, n.root.position.z - player.position.z); if (d < 2.6 && Math.abs(n.y - player.position.y) < 2 && d < bd) { bd = d; best = n; } }
    for (const o of objs) { const d = Math.hypot(o.at[0] - player.position.x, o.at[2] - player.position.z); if (d < o.r && Math.abs(o.at[1] - player.position.y) < 2.6 && d < bd) { bd = d; best = o; } }
    if (best) {
      const verb = best.kind === 'npc' ? 'Falar com' : 'Examinar';
      ui.prompt.hidden = false; ui.prompt.innerHTML = `${isTouch ? '' : '<kbd>E</kbd> '}${verb} <b>${best.kind === 'npc' && !best.proper ? best.name.toLowerCase() : best.name}</b>${best.heard ? ' <i>·</i>' : ''}`;
      ui.act.hidden = !isTouch; ui.act.textContent = best.kind === 'npc' ? 'FALAR' : 'OLHAR';
      if (inp.interact) openDialog(best);
    } else { ui.prompt.hidden = true; ui.act.hidden = true; }
    return { lock: false };
  }
  return { update, startIntro, skipIntro: () => endIntro(), npcs, objs, get busy() { return !!cine || !!dlg; }, setObjective };
}
