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
// kind: male | female | soldier | priest ; at: [x, z] ; face: [x, z] ; y: altura fixa ; sit: sentado (bench: criar banco)
function people(extras) {
  const I = extras.intro, G = extras.golgotha, T = extras.tomb, Lz = extras.lazarus, Bn = extras.bench;
  const dx = I.out[0] - I.door[0], dz = I.out[1] - I.door[1], dl = Math.hypot(dx, dz), fx = dx / dl, fz = dz / dl, rx = -fz, rz = fx;
  const at = (f, r) => [I.out[0] + fx * f + rx * r, I.out[1] + fz * f + rz * r];
  return [
    { id: 'cleopas', name: 'Cléopas', proper: true, kind: 'male', hub: true, at: at(1.6, -1.8), face: I.out, colors: { tunic: 0xe0d6c0, mantle: 0x6f7f9a },
      jaffa: [-140, 6], jaffaFace: [-120, 4], lines: [] },
    { id: 'casa', name: 'Marta', proper: true, kind: 'female', at: at(4.2, -4.6), face: at(1, -2), colors: { tunic: 0xd8c8a6, veil: 0x8a9cb8, mantle: 0xb0a090 },
      lines: [
        'Você gemia no sono... a sexta-feira de novo, não é? Ninguém nesta casa dorme direito desde que o desceram da cruz.',
        'Quando nosso irmão morreu, eu disse a ele: "Senhor, se estivesses aqui, Lázaro não teria morrido." E ele me respondeu: "Eu sou a ressurreição e a vida."',
        'Eu acreditei. Acredito. Mas agora quem está no túmulo é ele... ou estava. As mulheres voltaram do jardim dizendo que não está mais.',
        'Maria quase não fala. Lázaro passa o dia lá no túmulo dele, na saída da aldeia. Fale com eles.',
      ] },
    { id: 'maria', name: 'Maria de Betânia', proper: true, kind: 'female', sit: true, bench: true, at: at(1.2, 2.6), face: at(4, 2.6), colors: { tunic: 0xcfc0a8, veil: 0x6a5a8a, mantle: 0x8a7a9a },
      lines: [
        'Seis dias antes da Páscoa, eu quebrei o vaso de nardo e derramei nos pés dele. Judas reclamou do desperdício.',
        'Ele me defendeu. Disse que eu tinha guardado o perfume para o dia do seu sepultamento. Eu não entendi.',
        'Agora entendo. E ainda assim... ele também disse que era a ressurreição e a vida. Disse isso aqui, diante do túmulo do meu irmão.',
      ] },
    { id: 'lazaro', name: 'Lázaro', proper: true, kind: 'male', at: [Lz.x, Lz.z], face: Lz.face, y: undefined, colors: { tunic: 0xece4d0, mantle: 0x8a8070 },
      lines: [
        'Venho aqui todo dia. É estranho olhar para o próprio túmulo.',
        'Eu sei como é lá dentro. O escuro. O cheiro. As faixas apertando os braços, o lenço no rosto.',
        'Quando ouvi a voz dele chamando meu nome, eu saí amarrado. Tiveram que me desatar.',
        'Se dizem que o túmulo dele está vazio, repare nas faixas. Um morto não se desamarra sozinho.',
      ] },
    { id: 'pastor', name: 'Pastor', kind: 'male', at: [88, 146], face: [96, 150], colors: { tunic: 0xbfae8c, mantle: 0x9a8f80 },
      lines: [
        'Conto as ovelhas toda manhã. Hoje estão todas aqui.',
        'Ele dizia: "Ferirei o pastor, e as ovelhas se dispersarão." E foi assim. Os amigos dele sumiram como ovelhas no escuro.',
        'Mas pastor bom não abandona o rebanho. É o que eu acho.',
      ] },
    { id: 'horto', name: 'Homem do horto', kind: 'male', at: [GETHSEMANE.x - 3, GETHSEMANE.z + 7], face: [GETHSEMANE.x - 4, GETHSEMANE.z - 3], colors: { tunic: 0xa89878, mantle: 0x7a8a70 },
      lines: [
        'Foi aqui, na quinta à noite. Eu dormia ali, perto da prensa.',
        'Ele orava sozinho, junto daquela pedra. Três vezes voltou e encontrou os amigos dormindo.',
        'Vieram com tochas, espadas e paus. Um dos doze ia na frente... e o cumprimentou com um beijo. Todos fugiram.',
        'Levaram-no amarrado, descendo o Cedrom, para a cidade. Para a casa do sumo sacerdote.',
      ] },
    { id: 'cambista', name: 'Cambista', kind: 'male', at: [38, 31], face: [31, 30], y: TM.y, colors: { tunic: 0xc4a46a, mantle: 0x5a6a3a, sash: 0x8a3020 },
      lines: [
        'Não pise nas moedas! ...Ah, pode pisar. Desde segunda ninguém arrumou nada.',
        'Ele entrou aqui com um chicote de cordas. Virou as mesas, soltou as pombas. "A casa de meu Pai é casa de oração, e vocês fizeram dela um covil de ladrões!"',
        'Os meninos gritavam "Hosana ao Filho de Davi!" E os chefes dos sacerdotes, com o rosto vermelho, já decidiam como acabar com ele.',
        'Pergunte ao sacerdote ali no pórtico o que aconteceu dentro do santuário na sexta. Ele não gosta de falar.',
      ] },
    { id: 'sacerdote', name: 'Sacerdote', kind: 'priest', at: [66, -42], face: [30, -7], y: TM.y,
      lines: [
        'Paz, peregrino. A festa acabou e você ainda está aqui?',
        'Sexta, na hora do sacrifício da tarde, a terra tremeu. O véu do santuário se rasgou de alto a baixo. De alto a baixo, entende? Mão de homem rasga de baixo.',
        'Antes disso, um dos seguidores dele veio devolver trinta moedas de prata. Jogou-as no santuário e saiu correndo. Era preço de sangue; não podiam voltar ao tesouro.',
        'Ele foi julgado no Sinédrio de noite e levado ao pretório de manhã, ali, na fortaleza junto ao Templo. Pergunte lá.',
      ] },
    { id: 'pretorio', name: 'Mulher no pretório', kind: 'female', at: [-35, -61], face: [-30, -65], colors: { tunic: 0xbfa98a, veil: 0x6a5a7a, mantle: 0x8a7a6a },
      lines: [
        'Eu estava aqui quando o trouxeram ao pretório. Açoitaram até não sobrar pele nas costas.',
        'Os soldados trançaram uma coroa de espinhos e o vestiram de púrpura. Ajoelhavam e cuspiam: "Salve, rei dos judeus!"',
        'Pilatos lavou as mãos. O povo gritou "Barrabás!". E ele saiu por aquela rua, para a porta do norte, com a trave nas costas. Caiu no caminho.',
      ] },
    { id: 'simao', name: 'Simão de Cirene', proper: true, kind: 'male', at: [-95, -100], face: [-84, -128], colors: { tunic: 0x9a8a6a, mantle: 0x5a4a3a },
      lines: [
        'Eu só vinha do campo. Os soldados me agarraram ali na porta e jogaram a trave nas minhas costas.',
        'Ele não aguentava mais. Eu carreguei a cruz dele até lá em cima, no lugar que chamam de Caveira.',
        'Ainda tenho farpas nas mãos. E não consigo esquecer como ele me olhou.',
      ] },
    { id: 'soldado', name: 'Soldado romano', kind: 'soldier', at: [G.cross[0] + 4.5, G.cross[2] + 3], face: [G.cross[0], G.cross[2]],
      lines: [
        'Circule, galileu. Não há mais nada para ver aqui.',
        '...Três crucificados na sexta. O do meio morreu depressa. Não amaldiçoou ninguém. Pediu perdão por nós.',
        'Ao meio-dia o sol escureceu por três horas. O centurião bateu no peito: "Este era mesmo o Filho de Deus." Desde então, não fala com ninguém.',
        'O corpo? Um tal de José, homem do conselho, foi pedir a Pilatos. Levaram para um jardim aqui embaixo, perto da estrada.',
      ] },
    { id: 'jose', name: 'José de Arimateia', proper: true, kind: 'male', at: [T.X + 10, T.FZ + 13], face: [T.X, T.FZ], colors: { tunic: 0xf0e8d8, mantle: 0x3a4a6a, sash: 0xb08a40 },
      lines: [
        'Era o meu túmulo. Mandei talhar na rocha para mim. Nunca ninguém tinha sido posto ali.',
        'Nicodemos trouxe quase cem libras de mirra e aloés. Envolvemos o corpo em linho, às pressas, antes do pôr do sol do sábado.',
        'Selaram a pedra e puseram guardas. Agora o túmulo está aberto, e os chefes querem saber quem eu deixei entrar. Ninguém.',
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
    { id: 'pedro', name: 'Simão Pedro', proper: true, kind: 'male', sit: true, at: [Bn[0], Bn[2] + 0.46], face: [Bn[0], Bn[2] + 6], y: Bn[1], colors: { tunic: 0xd8ccb0, mantle: 0x4a5a4a },
      lines: [
        '...Você também veio. Eu corri até aqui com João. Ele chegou primeiro, mas parou na entrada. Eu entrei.',
        'Os lençóis estavam lá, deitados. E o lenço da cabeça não estava com eles. Estava enrolado, num lugar à parte.',
        'Ele me disse que eu o negaria três vezes antes de o galo cantar. Eu jurei que morreria com ele. Na mesma noite... o galo cantou.',
        'Se ele está vivo... como é que eu vou olhar para ele?',
      ] },
    { id: 'mercador', name: 'Mercador', kind: 'male', at: [-49.4, 9.5], face: [-49.4, 0], colors: { tunic: 0xd0b480, mantle: 0x7a4a6a, sash: 0xb08050 },
      lines: [
        'Tâmaras! Figos de Betfagé! ...Ah, você é um dos galileus dele, não é? Fala como eles.',
        'Barrabás passou por aqui ontem, rindo, com um figo meu na mão. Solto, no lugar do outro.',
        'Agora dizem que os discípulos roubaram o corpo. Vocês? Que mal conseguiram ficar acordados numa noite?',
      ] },
    { id: 'tome', name: 'Tomé', proper: true, kind: 'male', at: [-127, 12], face: [-140, 6], colors: { tunic: 0xc8bca0, mantle: 0x6a3a2a },
      lines: [
        'Túmulo vazio... As mulheres estão cansadas. Pedro está confuso. Alguém levou o corpo, é só isso.',
        'Eu disse que íamos morrer com ele, lembra? E fugimos.',
        'Se ele está vivo, por que não aparece? Eu só acredito se vir as marcas dos cravos com meus próprios olhos.',
        'Cléopas está ali na porta, esperando você. Emaús... talvez seja melhor mesmo sair desta cidade por um tempo.',
      ] },
  ];
}

// ---------------- objetos ----------------
function things(extras) {
  const G = extras.golgotha, T = extras.tomb, V = extras.veil, I = extras.intro;
  const gx = GETHSEMANE.x, gz = GETHSEMANE.z;
  return [
    { id: 'nardo', name: 'o vaso de alabastro', at: [I.nard[0], null, I.nard[1]], r: 1.6, mesh: 'jar',
      lines: ['Um vaso de alabastro quebrado no gargalo. Ainda guarda o cheiro do nardo puro.', 'A casa inteira ficou perfumada naquela noite. Perfume de rei. Perfume de sepultura.'] },
    { id: 'sangue', key: true, name: 'a pedra do horto', at: [gx - 4, null, gz - 3], r: 2.6, mesh: 'blood',
      lines: ['Uma pedra baixa, lisa de tanto ser usada. Manchas escuras secaram nela.', '"Pai, se queres, afasta de mim este cálice." O suor dele caía como gotas de sangue.'] },
    { id: 'tochas', name: 'as tochas apagadas', at: [gx + 9, null, gz + 11], r: 2.2, mesh: 'torches',
      lines: ['Tochas queimadas, pisoteadas na terra. Muitos homens estiveram aqui.', 'No meio delas, um lençol de linho rasgado. Alguém fugiu sem ele.'] },
    { id: 'mesas', name: 'as mesas viradas', at: [31, null, 30], r: 2.8, mesh: 'tables', y: TM.y,
      lines: ['Mesas de cambistas viradas, moedas espalhadas entre as lajes, uma gaiola de pombas aberta e vazia.', '"Está escrito: minha casa será chamada casa de oração."'] },
    { id: 'coroa', name: 'a coroa de espinhos', at: [-30, null, -65], r: 2.2, mesh: 'crown',
      lines: ['Uma coroa trançada de espinhos, jogada no chão do pátio.', 'Os espinhos ainda têm sangue seco.'] },
    { id: 'cruz', name: 'a cruz do meio', at: G.cross, r: 2.6,
      lines: ['A madeira ainda tem manchas escuras. Os cravos foram arrancados; ficaram os buracos.', 'Dois ladrões morreram ao lado dele. A um deles, ele prometeu: "Hoje estarás comigo no paraíso."'] },
    { id: 'placa', key: true, name: 'a placa da cruz', at: [G.cross[0] + 1.3, null, G.cross[2] + 1.1], r: 2.0, mesh: 'titulus', img: true,
      lines: ['A placa que pregaram acima da cabeça dele, em hebraico, grego e latim: "Jesus Nazareno, Rei dos Judeus".', 'Os chefes pediram a Pilatos: "Não escreva o rei dos judeus." Pilatos respondeu: "O que escrevi, escrevi."'] },
    { id: 'tunica', name: 'a túnica', at: [-71, null, -113], r: 2.2, mesh: 'tunic',
      lines: ['Uma túnica sem costura, tecida de alto a baixo numa peça só.', 'Ao lado, dados de osso. Os soldados tiraram a sorte por ela, para não rasgá-la. "Repartiram entre si as minhas vestes."'] },
    { id: 'pedra', key: true, name: 'a pedra', at: T.stone, r: 2.8,
      lines: ['A pedra é enorme. Seriam precisos vários homens para rolá-la morro acima, para fora da canaleta.', 'O selo romano que a prendia está partido. E os guardas estavam aqui.'] },
    { id: 'lencois', key: true, name: 'os lençóis', at: [T.linen[0], T.linen[1], T.linen[2] + 0.6], r: 1.3,
      lines: ['Os lençóis de linho estão aqui, deitados onde o corpo estava, ainda com o cheiro de mirra e aloés.', 'Quem rouba um corpo e leva só o corpo, deixando as faixas?'] },
    { id: 'sudario', key: true, name: 'o lenço', at: [T.linen[0] + 0.1, T.linen[1], T.linen[2] - 0.8], r: 1.0,
      lines: ['O lenço que cobria o rosto. Não está jogado com os lençóis: está enrolado, à parte.', 'Não parece obra de ladrão com pressa. Parece... arrumado.'] },
  ];
}

// capítulos: a história sugere a ordem, sem trancar nada. O pensamento e as dicas de Cléopas
// apontam para o primeiro capítulo com depoimentos ou pistas essenciais ainda não ouvidos.
const CHAPTERS = [
  { keys: ['casa', 'maria', 'lazaro'], thought: 'Marta, Maria, Lázaro... esta casa já viu um morto sair do túmulo.',
    hint: 'Comece aqui mesmo, em Betânia. Marta está ali no quintal. E Lázaro... Lázaro sabe o que é um túmulo por dentro. Ele fica perto do dele, na saída da aldeia.' },
  { keys: ['horto', 'sangue'], thought: 'Na quinta, depois da ceia, descemos ao horto das oliveiras, no pé do monte. Ele pediu que vigiássemos. Eu dormi.',
    hint: 'E o horto, no pé do monte? Tem um homem que dorme lá, perto da prensa de azeite. E dizem que a pedra onde ele orou ainda está marcada.' },
  { keys: ['cambista', 'sacerdote', 'pretorio'], thought: 'Levaram-no amarrado para a cidade. Do pátio do Templo ao pretório do governador, cada pedra ouviu alguma coisa.',
    hint: 'No pátio do Templo, os cambistas ainda falam da segunda-feira. Um sacerdote anda pelo pórtico, calado demais. E no pretório, junto à fortaleza, uma mulher viu tudo.' },
  { keys: ['simao', 'soldado', 'placa'], thought: 'Fora da muralha, ao norte, no lugar que chamam de Caveira. Eu fiquei longe. Longe demais.',
    hint: 'Você teve coragem de subir na Caveira? O homem de Cirene que carregou a cruz anda pela porta do norte. E a placa que pregaram nela... dizem que ainda está lá.' },
  { keys: ['jose', 'guarda', 'mulher', 'pedro', 'pedra', 'lencois', 'sudario'], thought: 'Um homem do conselho pediu o corpo. Um túmulo novo, num jardim ali perto. As mulheres foram lá hoje cedo.',
    hint: 'O jardim. O túmulo de José, o do conselho. Entre lá dentro e olhe bem os panos. Pedro está sentado lá fora, sem dizer nada a ninguém.' },
  { keys: ['mercador', 'tome', 'pastor'], thought: 'Ainda há quem fale disso pela cidade e pelos campos.',
    hint: 'Tomé está aqui perto, resmungando. O mercador da rua principal também tem o que dizer. E o pastor, lá nos campos do sul, viu os amigos dele fugirem.' },
];
const REQUIRED = new Set(CHAPTERS.flatMap((c) => c.keys));
// como Cléopas reage ao último depoimento que você trouxe
const REACT = {
  lazaro: 'Lázaro disse isso? "Um morto não se desamarra sozinho"... Ele sabe do que fala.',
  maria: 'Maria guardou aquele perfume para o sepultamento dele. Como ela sabia?',
  casa: 'Marta sempre foi a primeira a crer. Mesmo agora.',
  sangue: 'Sangue na pedra... ele sabia o que vinha. Sabia, e ficou.',
  horto: 'Um beijo. De um dos doze. Eu ainda não consigo dizer o nome.',
  cambista: 'As mesas viradas... Na segunda-feira eu achei que ele ia tomar o Templo. Eu não entendi nada.',
  sacerdote: 'De alto a baixo? O véu? Quem rasga uma coisa daquelas de alto a baixo?',
  pretorio: 'Uma coroa de espinhos. Era assim que eles queriam o rei deles.',
  simao: 'Nem fomos nós que carregamos a cruz dele. Foi um estranho que vinha do campo.',
  soldado: 'Um centurião romano disse isso? "O Filho de Deus"?',
  placa: '"Rei dos Judeus", em três línguas. Pilatos zombou... e escreveu a verdade.',
  jose: 'José do conselho, cuidando do corpo... e nós escondidos.',
  guarda: 'Os guardas estão mentindo, isso eu sei. Mas mentindo para esconder o quê?',
  mulher: '"Por que procuram entre os mortos aquele que vive?"... Elas disseram isso para todos nós. Ninguém acreditou.',
  pedro: 'Pedro está assim desde a noite do galo.',
  pedra: 'Aquela pedra não se move por dentro.',
  lencois: 'Os lençóis ficaram? Ladrão nenhum perde tempo desenrolando um morto.',
  sudario: 'O lenço dobrado à parte... como quem acorda e arruma a cama.',
  tome: 'Tomé. Sempre o último a acreditar e o primeiro a querer morrer com ele.',
  mercador: 'Barrabás solto e ele na cruz. Que troca.',
  pastor: '"Ferirei o pastor, e as ovelhas se dispersarão." Ele avisou.',
};

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
// placa da cruz: hebraico, grego e latim
let titulusCanvas = null;
function titulusTex() {
  if (titulusCanvas) return titulusCanvas;
  const c = document.createElement('canvas'); c.width = 768; c.height = 240;
  const x = c.getContext('2d');
  x.fillStyle = '#b89a70'; x.fillRect(0, 0, 768, 240);
  for (let i = 0; i < 40; i++) { x.strokeStyle = `rgba(90,60,30,${0.08 + Math.random() * 0.12})`; x.beginPath(); const y = Math.random() * 240; x.moveTo(0, y); x.bezierCurveTo(250, y + 8, 500, y - 8, 768, y + 4); x.stroke(); }
  x.fillStyle = '#2a1a0e'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = 'bold 40px serif'; x.direction = 'rtl'; x.fillText('ישוע הנצרי ומלך היהודים', 384, 48); x.direction = 'ltr';
  x.font = 'bold 30px serif'; x.fillText('ΙΗΣΟΥΣ Ο ΝΑΖΩΡΑΙΟΣ Ο ΒΑΣΙΛΕΥΣ ΤΩΝ ΙΟΥΔΑΙΩΝ', 384, 120);
  x.font = 'bold 40px serif'; x.fillText('IESVS NAZARENVS REX IVDAEORVM', 384, 192);
  x.strokeStyle = '#5a3a1e'; x.lineWidth = 10; x.strokeRect(5, 5, 758, 230);
  titulusCanvas = c; return c;
}
function titulusMesh() {
  const t = new THREE.CanvasTexture(titulusTex()); t.colorSpace = THREE.SRGBColorSpace;
  const g = new THREE.Group();
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.29, 0.04), [0, 0, 0, 0, 0, 0].map((_, i) => i === 4 ? new THREE.MeshStandardMaterial({ map: t, roughness: 0.9 }) : new THREE.MeshStandardMaterial({ color: 0x8a6a48, roughness: 0.9 })));
  board.position.set(0, 0.32, 0); board.rotation.x = -0.35; g.add(board);
  const prop = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.05), new THREE.MeshStandardMaterial({ color: 0x5a4030 })); prop.position.set(0, 0.18, -0.12); prop.rotation.x = 0.4; g.add(prop);
  return g;
}
function jarMesh() {
  const g = new THREE.Group(), al = new THREE.MeshStandardMaterial({ color: 0xf1ead8, roughness: 0.35 });
  const body = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.07, 0.01], [0.09, 0.08], [0.07, 0.17], [0.03, 0.21], [0.03, 0.22]].map(([a, b]) => new THREE.Vector2(a, b)), 14), al);
  body.rotation.z = 1.35; body.position.set(0, 0.07, 0); g.add(body);
  for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.TetrahedronGeometry(0.025), al); f.position.set(0.2 + i * 0.05, 0.015, (i % 2) * 0.06 - 0.03); g.add(f); }
  const stain = new THREE.Mesh(new THREE.CircleGeometry(0.22, 16).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x6a4a28, transparent: true, opacity: 0.45, roughness: 0.4 })); stain.position.set(0.18, 0.004, 0); g.add(stain);
  return g;
}
function bloodMesh() {
  const g = new THREE.Group(), red = new THREE.MeshStandardMaterial({ color: 0x4a0c08, roughness: 0.35 });
  for (let i = 0; i < 9; i++) { const d = new THREE.Mesh(new THREE.SphereGeometry(0.05 + Math.random() * 0.06, 8, 4), red); d.scale.y = 0.18; d.position.set((Math.random() - 0.5) * 0.9, 0, (Math.random() - 0.5) * 0.7); g.add(d); }
  return g;
}
function torchesMesh(M) {
  const g = new THREE.Group(), coal = new THREE.MeshStandardMaterial({ color: 0x141010, roughness: 1 });
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Group(), stick = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, 0.8, 6), M.darkWood); t.add(stick);
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.04, 0.16, 6), coal); head.position.y = 0.44; t.add(head);
    t.rotation.set(Math.PI / 2, 0, i * 1.3); t.position.set((i - 1.5) * 0.45, 0.04, (i % 2) * 0.4); g.add(t);
  }
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.6, 4, 3).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xe8dfc8, roughness: 0.95, side: THREE.DoubleSide }));
  const p = cloth.geometry.attributes.position; for (let i = 0; i < p.count; i++) p.setY(i, Math.random() * 0.06);
  cloth.geometry.computeVertexNormals(); cloth.position.set(0.3, 0.03, -0.5); cloth.rotation.y = 0.6; g.add(cloth);
  return g;
}
function tablesMesh(M) {
  const g = new THREE.Group();
  const table = (x, z, ry, tilt) => {
    const t = new THREE.Group(), top = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.07, 0.8), M.darkWood); t.add(top);
    for (const [a, b] of [[-0.7, -0.32], [0.7, -0.32], [-0.7, 0.32], [0.7, 0.32]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.7, 0.07), M.darkWood); l.position.set(a, -0.38, b); t.add(l); }
    t.rotation.set(tilt, ry, 0); t.position.set(x, tilt ? 0.42 : 0.74, z); g.add(t);
  };
  table(0, 0, 0.3, Math.PI / 2); table(1.6, 1.4, -0.8, Math.PI); table(-1.8, 1.2, 1.1, 0);
  const coin = new THREE.CylinderGeometry(0.018, 0.018, 0.005, 10);
  for (let i = 0; i < 40; i++) { const c = new THREE.Mesh(coin, i % 3 ? M.gold : M.bronze); const a = Math.random() * 6.28, r = Math.random() * 2.6; c.position.set(Math.cos(a) * r + 0.3, 0.004, Math.sin(a) * r + 0.6); c.rotation.set(Math.random() * 0.3, 0, Math.random() * 0.3); g.add(c); }
  const cage = new THREE.Group(); // gaiola de pombas, aberta
  for (let i = 0; i < 8; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.4, 4), M.wood); const a = (i / 8) * 6.28; b.position.set(Math.cos(a) * 0.2, 0.2, Math.sin(a) * 0.2); cage.add(b); }
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 10), M.wood); cage.add(base);
  cage.rotation.z = 1.4; cage.position.set(-0.6, 0.2, 1.6); g.add(cage);
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
  const ui = { wip: $('#wip'), wipBtn: $('#wipBtn'), img: $('#talkImg'), talk: $('#talk'), name: $('#talkName'), text: $('#talkText'), prompt: $('#prompt'), act: $('#bAct'), obj: $('#objective'), cap: $('#caption'), skip: $('#skip') };

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
    const idle = mixer.clipAction(clips[d.sit ? 'Sitting_Idle_Loop' : 'Idle_Loop']), talk = mixer.clipAction(clips[d.sit ? 'Sitting_Talking_Loop' : 'Idle_Talking_Loop']);
    if (d.sit && d.bench) {
      const ry = root.rotation.y, bx = d.at[0] - Math.sin(ry) * 0.42, bz = d.at[1] - Math.cos(ry) * 0.42;
      const bench = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.47, 0.55), M.fieldStone); bench.position.set(bx, y + 0.235, bz); bench.rotation.y = ry;
      bench.castShadow = true; bench.receiveShadow = true; scene.add(bench);
      solids.add({ x: bx, z: bz, hx: 0.75, hz: 0.28, rot: ry, y0: y, y1: y + 0.47 });
    }
    idle.play(); mixer.update(Math.random() * 3);
    const col = solids.add({ x: d.at[0], z: d.at[1], hx: 0.32, hz: 0.32, rot: 0, y0: y - 0.5, y1: y + 1.7 });
    if (d.kind === 'soldier') { const sp = spearMesh(M); sp.position.set(d.at[0] + 0.55, y, d.at[1] + 0.2); scene.add(sp); }
    return { ...d, root, mixer, idle, talk, y, col, baseYaw: root.rotation.y, kind: 'npc', heard: false };
  });
  // ---------- objetos ----------
  // altura da superfície real (pedra, chão da casa, pátio), por raio vertical
  const ray = new THREE.Raycaster(), down = new THREE.Vector3(0, -1, 0);
  const statics = scene.children.filter((o) => o.isMesh && !o.isInstancedMesh && !o.isSkinnedMesh);
  function surfaceY(x, z, hint) {
    ray.set(new THREE.Vector3(x, (hint ?? heightAt(x, z)) + 3, z), down); ray.far = 8;
    const h = ray.intersectObjects(statics, false)[0];
    return h ? h.point.y : (hint ?? heightAt(x, z));
  }
  const objs = things(extras).map((d) => {
    const at = [d.at[0], d.y ?? d.at[1] ?? heightAt(d.at[0], d.at[2]), d.at[2]];
    if (d.mesh) {
      const make = { crown: () => crownMesh(M), tunic: () => tunicMesh(M), jar: jarMesh, blood: bloodMesh, torches: () => torchesMesh(M), tables: () => tablesMesh(M), titulus: titulusMesh }[d.mesh];
      const m = make(), y = surfaceY(at[0], at[2], d.y ?? at[1]);
      m.position.set(at[0], y + (d.mesh === 'crown' ? 0.03 : 0.005), at[2]);
      if (d.mesh === 'titulus' || d.mesh === 'jar') m.rotation.y = Math.atan2(extras.golgotha.cross[0] - at[0], extras.golgotha.cross[2] - at[2]) + Math.PI;
      m.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } }); scene.add(m);
      at[1] = y;
    }
    return { ...d, at, kind: 'obj', heard: false };
  });
  const sealStone = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.45, 22).rotateX(Math.PI / 2), M.cliff);
  sealStone.position.set(extras.tomb.X, extras.tomb.g + 1.15, extras.tomb.FZ + 0.4); sealStone.visible = false; scene.add(sealStone);
  // indicadores: balão flutuante, quase transparente de longe e nítido de perto
  function markerTex(glyph, gold) {
    const c = document.createElement('canvas'); c.width = 128; c.height = 128; const x = c.getContext('2d');
    x.fillStyle = gold ? 'rgba(40,26,12,.82)' : 'rgba(30,24,20,.7)'; x.strokeStyle = gold ? '#e8bf6a' : '#f2e6cc'; x.lineWidth = 6;
    x.beginPath(); x.arc(64, 56, 40, 0, Math.PI * 2); x.fill(); x.stroke();
    x.beginPath(); x.moveTo(52, 92); x.lineTo(64, 116); x.lineTo(76, 92); x.closePath(); x.fillStyle = gold ? '#e8bf6a' : '#f2e6cc'; x.fill();
    x.fillStyle = gold ? '#ffe2a2' : '#fff4dc'; x.font = 'bold 54px Georgia, serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(glyph, 64, glyph === '…' ? 46 : 58);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  const TEX = { talk: markerTex('…', true), look: markerTex('?', true), lookOpt: markerTex('?', false), ready: markerTex('!', true) };
  const mkMarker = (tex) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false, fog: false })); sp.renderOrder = 20; sp.visible = false; scene.add(sp); return sp; };
  for (const n of npcs) n.marker = mkMarker(TEX.talk);
  for (const o of objs) o.marker = mkMarker(o.key ? TEX.look : TEX.lookOpt);
  const cleopas = npcs.find((n) => n.hub);
  const total = REQUIRED.size;
  let stage = 'start';            // start: ainda não falou com Cléopas | met: coletando | done: partiu para Emaús
  const lastHeard = [];
  const heardIds = () => new Set([...npcs, ...objs].filter((x) => x.heard).map((x) => x.id));
  const heardCount = () => { const h = heardIds(); return [...REQUIRED].filter((k) => h.has(k)).length; };
  const complete = () => heardCount() >= total;
  const nextChapter = () => { const h = heardIds(); return CHAPTERS.find((c) => c.keys.some((k) => !h.has(k))); };

  // ---------- objetivo (pensamento do discípulo) ----------
  let objective = '';
  function setObjective(t) { objective = t; refreshObjective(); }
  function refreshObjective() {
    if (!objective) { ui.obj.hidden = true; return; }
    ui.obj.hidden = false;
    let text = objective;
    if (objective === 'chapters') {
      text = stage === 'start' ? 'Cléopas está lá fora, me esperando.'
        : complete() ? 'Já ouvi o bastante. Cléopas me espera na Porta de Jafa.'
        : nextChapter().thought;
    }
    ui.obj.innerHTML = `<b>${text}</b>${stage === 'start' || stage === 'done' ? '' : `<span>Depoimentos e sinais: ${heardCount()} de ${total}</span>`}`;
  }
  // o que Cléopas diz depende do que você já ouviu
  function cleopasLines() {
    if (stage === 'start') return [
      'Você acordou. Eu nem consegui dormir.',
      'Tem alguma coisa fora do lugar hoje. As mulheres voltaram do jardim dizendo coisas sem pé nem cabeça. Pedro saiu correndo e voltou mudo.',
      'Eu queria ir para casa, para Emaús, e esquecer. Mas não consigo partir sem entender o que está acontecendo.',
      'Faça isso por nós dois: ouça quem estava lá. Aqui em Betânia, no horto, na cidade, onde ele morreu, onde o puseram. Veja com seus próprios olhos.',
      'Vou na frente. Espero você na Porta de Jafa, na saída para Emaús. Depois me conte tudo.',
    ];
    if (complete()) return [
      'E então? ...Pela sua cara, você ouviu tudo.',
      'O sangue no horto, a placa na cruz, a pedra rolada, os panos arrumados, os guardas mentindo... nada disso se encaixa numa história de corpo roubado.',
      'Nós esperávamos que fosse ele quem ia libertar Israel. E hoje já é o terceiro dia desde que tudo aconteceu.',
      'Vem comigo para Emaús. São sessenta estádios. No caminho a gente tenta entender tudo isso.',
    ];
    const ch = nextChapter(), h = heardIds(), missing = total - heardCount();
    const last = lastHeard.filter((id) => REACT[id]).slice(-1)[0];
    const out = [];
    if (!h.size || heardCount() === 0) out.push('Ainda não ouviu ninguém? Tudo bem. Eu também não sei por onde começar.');
    else if (last) out.push(REACT[last]);
    else out.push('Interessante... continue.');
    out.push(ch.hint);
    out.push(missing > 6 ? 'Ainda há muita gente para ouvir. Eu espero.' : missing > 1 ? `Faltam poucas coisas. Talvez ${missing}.` : 'Falta só uma coisa. Eu sinto que falta.');
    return out;
  }

  // ---------- diálogo ----------
  let dlg = null; // { who, lines, i, shown, done }
  const SPEED = 46;
  function openDialog(who) {
    if (who.hub) who.lines = cleopasLines();
    dlg = { who, lines: who.lines, i: 0, shown: 0 };
    ui.talk.hidden = false; ui.name.textContent = who.kind === 'npc' ? who.name : `Você examina ${who.name}`;
    if (who.img) { ui.img.src = titulusTex().toDataURL(); ui.img.hidden = false; } else ui.img.hidden = true;
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
    if (who.hub) {
      if (stage === 'start') { stage = 'met'; cleopas.moveWhenFar = true; }
      else if (complete()) { startEnding(); return; }
      refreshObjective(); return;
    }
    if (!who.heard) { who.heard = true; lastHeard.push(who.id); }
    refreshObjective();
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
    setObjective('chapters');
  }
  function enterShot() {
    const s = cine.shots[cine.i]; cine.t = 0; cine.capI = 0; ui.cap.classList.remove('on');
    grade.uFlash.value = s.mem || cine.shots[cine.i - 1]?.mem ? 1 : 0;
    sealStone.visible = !!s.sealed;
    if (s.player) play(s.player, { once: true, fade: 0.2 });
    if (s.wip) ui.wip.hidden = false;
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
    if (s.tick) s.tick(cine.t, dt);
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
  // final do prólogo: os dois pegam a estrada de Emaús, corte para o preto
  const ROAD = [[-150, 3.5], [-168, 5], [-190, 6], [-215, 3]];
  function along(pts, d) {
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1], L = Math.hypot(bx - ax, bz - az);
      if (d <= L) return [ax + (bx - ax) * d / L, az + (bz - az) * d / L, Math.atan2(bx - ax, bz - az)];
      d -= L;
    }
    const [x, z] = pts[pts.length - 1]; return [x, z, -Math.PI / 2];
  }
  function startEnding() {
    stage = 'done'; refreshObjective();
    const c = cleopas, cw = c.mixer.clipAction(clips.Walk_Loop);
    c.idle.stop(); c.talk.stop(); cw.reset().play();
    const start = [c.root.position.x, c.root.position.z], pc = [start, ...ROAD], pp = pc.map(([x, z], i) => [x, z + (i ? 1.3 : 1.3)]);
    play('Walk_Loop', { fade: 0.3 });
    let dist = 0;
    const tick = (t, dt) => {
      dist += dt * 1.45;
      const [x, z, yw] = along(pc, dist), [px, pz] = along(pp, Math.max(0, dist - 0.2));
      c.root.position.set(x, heightAt(x, z), z); c.root.rotation.y = yw; c.baseYaw = yw;
      player.position.set(px, heightAt(px, pz), pz); ctx.setHeroYaw(yw);
    };
    const mid = () => player.position.clone().lerp(c.root.position, 0.5);
    cine = {
      shots: [
        { dur: 7.5, tick, cam: (t) => { const m = mid(); return [m.clone().add(v3(7 - t * 0.25, 2.2 + t * 0.12, 4.5)), m.clone().add(v3(-5, 1.1, 0))]; } },
        { dur: 1.6, tick, end: 1, cam: (t) => { const m = mid(); return [m.clone().add(v3(5.2 - t * 0.2, 3.1, 4.5)), m.clone().add(v3(-6, 1.1, 0))]; } },
        { dur: 8, black: 1, caps: [[0.4, 'Naquele mesmo dia, dois deles iam para um povoado chamado Emaús, a sessenta estádios de Jerusalém...'], [4.4, '...e conversavam sobre tudo o que tinha acontecido.']], cam: () => [camera.position.clone(), mid()] },
        { dur: Infinity, black: 1, wip: 1, cam: () => [camera.position.clone(), mid()] },
      ], i: 0, t: 0, onEnd: () => {},
    };
    document.body.classList.add('cine'); enterShot();
  }
  ui.wipBtn.addEventListener('click', () => {
    ui.wip.hidden = true; cine = null; document.body.classList.remove('cine'); ui.cap.classList.remove('on'); grade.uFade.value = 0;
    const c = cleopas; c.mixer.stopAllAction(); c.idle.reset().play();
    c.root.position.set(-148, heightAt(-148, 9), 9); c.baseYaw = c.root.rotation.y = Math.atan2(30, -2);
    player.position.set(-143, heightAt(-143, 5), 5); ctx.setHeroYaw(Math.PI / 2); ctx.resetCam(-Math.PI / 2);
    play('Idle_Loop', { fade: 0.3 });
    setObjective('A estrada para Emaús continua na próxima fase. Jerusalém está aberta para explorar.');
  });
  ui.skip.addEventListener('click', () => { if (cine && cine.onEnd === endIntro) endIntro(); });

  // ---------- atualização por quadro ----------
  const tmp = new THREE.Vector3();
  function update(dt, inp, t) {
    if (cine || dlg) { for (const m of [...npcs, ...objs]) m.marker.visible = false; }
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
    if (cleopas.moveWhenFar && cleopas.root.position.distanceTo(player.position) > 30) {
      const [jx, jz] = cleopas.jaffa, y = heightAt(jx, jz);
      cleopas.moveWhenFar = false; cleopas.col.y0 = cleopas.col.y1 = -1e9;
      cleopas.root.position.set(jx, y, jz); cleopas.y = y; cleopas.baseYaw = cleopas.root.rotation.y = Math.atan2(cleopas.jaffaFace[0] - jx, cleopas.jaffaFace[1] - jz);
      cleopas.col = solids.add({ x: jx, z: jz, hx: 0.32, hz: 0.32, rot: 0, y0: y - 0.5, y1: y + 1.7 });
    }
    // indicadores: quanto mais perto, mais nítidos
    const fadeBy = (d, far) => (d > far ? 0 : Math.min(1, 0.18 + 0.82 * Math.pow(1 - Math.max(0, d - 3) / (far - 3), 1.6)));
    for (const n of npcs) {
      const show = n.hub ? stage !== 'done' : stage !== 'start' && !n.heard;
      const d = n.root.position.distanceTo(player.position), far = n.hub ? 400 : 45;
      n.marker.visible = show && d < far && d > 0.9;
      if (!n.marker.visible) continue;
      if (n.hub) n.marker.material.map = (stage === 'start' || complete()) ? TEX.ready : TEX.talk;
      n.marker.material.opacity = n.hub ? Math.max(0.55, fadeBy(d, 60)) : fadeBy(d, far);
      const k = 1 + Math.sin(t * 2.4 + n.at[0]) * 0.06, sc = (n.hub ? 0.55 + Math.min(1.6, d / 60) : 0.55) * k;
      n.marker.scale.set(sc, sc, 1); n.marker.position.set(n.root.position.x, n.root.position.y + (n.sit ? 1.75 : 2.2) + Math.sin(t * 1.8 + n.at[1]) * 0.05, n.root.position.z);
    }
    for (const o of objs) {
      const d = Math.hypot(o.at[0] - player.position.x, o.at[2] - player.position.z);
      o.marker.visible = stage !== 'start' && !o.heard && d < 35 && d > 0.6;
      if (!o.marker.visible) continue;
      o.marker.material.opacity = fadeBy(d, 35) * (o.key ? 1 : 0.8);
      const sc = (o.key ? 0.45 : 0.36) * (1 + Math.sin(t * 2.4 + o.at[0]) * 0.06);
      o.marker.scale.set(sc, sc, 1); o.marker.position.set(o.at[0], o.at[1] + 1.05 + Math.sin(t * 1.6 + o.at[2]) * 0.08, o.at[2]);
    }
    // algo por perto para falar/examinar?
    let best = null, bd = Infinity;
    for (const n of npcs) { const d = Math.hypot(n.root.position.x - player.position.x, n.root.position.z - player.position.z); if (d < 2.6 && Math.abs(n.y - player.position.y) < 2 && d < bd) { bd = d; best = n; } }
    for (const o of objs) { const d = Math.hypot(o.at[0] - player.position.x, o.at[2] - player.position.z); if (d < o.r && Math.abs(o.at[1] - player.position.y) < 2.6 && d < bd) { bd = d; best = o; } }
    if (best) {
      const verb = best.kind === 'npc' ? 'Falar com' : 'Examinar';
      ui.prompt.hidden = false; ui.prompt.innerHTML = `${isTouch ? '' : '<kbd>E</kbd> '}${verb} <b>${best.kind === 'npc' && !best.proper ? best.name.toLowerCase() : best.name}</b>${best.heard && !best.hub ? ' <i>·</i>' : ''}`;
      ui.act.hidden = !isTouch; ui.act.textContent = best.kind === 'npc' ? 'FALAR' : 'OLHAR';
      if (inp.interact) openDialog(best);
    } else { ui.prompt.hidden = true; ui.act.hidden = true; }
    return { lock: false };
  }
  return { update, startIntro, skipIntro: () => endIntro(), npcs, objs, get busy() { return !!cine || !!dlg; }, get stage() { return stage; }, setObjective, startEnding };
}
