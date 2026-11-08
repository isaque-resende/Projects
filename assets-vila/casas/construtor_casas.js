// Construtor de casas da Judeia do século I a partir do kit modular (casas_kit.glb).
// É o mesmo módulo que o jogo vai usar para montar vilas e a cidade.
//
// Grade de 1 m. A célula (i, k) ocupa x ∈ [i, i+1] e z ∈ [k, k+1] (three.js: Y para cima). Andar = 2,8 m.
// Uma "planta" é um mapa de células -> { casa, andares } ou { patio: true }. As casas encostadas (geminadas)
// dividem a mesma parede: ela é colocada uma vez só. Cada casa (ou o quarteirão inteiro) vira poucas malhas
// fundidas (1 draw call por camada), com tom de cor próprio por casa.
//
//   import { carregarKit, casaExemplo, casaAleatoria, quarteirao } from './construtor_casas.js';
//   const kit = await carregarKit('casas_kit.glb');
//   const casa = casaExemplo(kit);       // THREE.Group { userData: { camadas: {base, cima}, portas: [...], npc: [...] } }
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const H = 2.8;
export const VARIANTES = ['Pedra', 'Gasta', 'Caiada', 'Cantaria'];
const LADOS = {
  S: { di: 0, dk: 1, theta: 0, dir: [1, 0], start: (i, k) => [i, k + 1], key: (i, k) => 'z' + (k + 1), ord: (i, k) => i },
  N: { di: 0, dk: -1, theta: Math.PI, dir: [-1, 0], start: (i, k) => [i + 1, k], key: (i, k) => 'z' + k, ord: (i, k) => -i },
  E: { di: 1, dk: 0, theta: Math.PI / 2, dir: [0, -1], start: (i, k) => [i + 1, k + 1], key: (i, k) => 'x' + (i + 1), ord: (i, k) => -k },
  W: { di: -1, dk: 0, theta: -Math.PI / 2, dir: [0, 1], start: (i, k) => [i, k], key: (i, k) => 'x' + i, ord: (i, k) => k },
};

// ------------------------------------------------------------------ kit
export async function carregarKit(url) {
  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(url);
  gltf.scene.updateMatrixWorld(true);
  const pecas = {}; let material = null;
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    const g = toFloat(o.geometry.clone()); g.applyMatrix4(o.matrixWorld);
    pecas[o.name] = g; material = material || o.material;
  });
  material = material.clone(); material.vertexColors = true;
  return { pecas, material };
}
function toFloat(g) {
  for (const name of Object.keys(g.attributes)) {
    const a = g.attributes[name];
    if (a.array instanceof Float32Array && !a.isInterleavedBufferAttribute) continue;
    const out = new Float32Array(a.count * a.itemSize);
    for (let i = 0; i < a.count; i++) for (let c = 0; c < a.itemSize; c++) out[i * a.itemSize + c] = a.getComponent ? a.getComponent(i, c) : [a.getX, a.getY, a.getZ, a.getW][c].call(a, i);
    g.setAttribute(name, new THREE.BufferAttribute(out, a.itemSize));
  }
  if (g.attributes.color && g.attributes.color.itemSize === 4) {   // RGBA -> RGB
    const a = g.attributes.color, out = new Float32Array(a.count * 3);
    for (let i = 0; i < a.count; i++) { out[i * 3] = a.getX(i); out[i * 3 + 1] = a.getY(i); out[i * 3 + 2] = a.getZ(i); }
    g.setAttribute('color', new THREE.BufferAttribute(out, 3));
  }
  return g;
}

// ------------------------------------------------------------------ montagem
class Montador {
  constructor(kit) { this.kit = kit; this.camadas = { base: [], cima: [] }; this.portas = []; this.npc = []; this.colisao = []; }
  por(nome, x, y, z, theta = 0, camada = 'base', tom = null, escala = 1) {
    const g0 = this.kit.pecas[nome]; if (!g0) { console.warn('peça faltando', nome); return; }
    const g = g0.clone();
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), theta), new THREE.Vector3(escala, escala, escala));
    g.applyMatrix4(m);
    if (tom) { const c = g.attributes.color; for (let i = 0; i < c.count; i++) c.setXYZ(i, c.getX(i) * tom[0], c.getY(i) * tom[1], c.getZ(i) * tom[2]); }
    this.camadas[camada].push(g);
  }
  // peça presa a uma aresta da grade (mesmo transform das paredes): desloca 'ao' longo do lado e 'fora' para fora
  naAresta(nome, lado, no, nivel, ao = 0, fora = 0, camada = 'base', tom = null) {
    const L = LADOS[lado];
    const out = [Math.sin(L.theta), Math.cos(L.theta)];
    this.por(nome, no[0] + L.dir[0] * ao + out[0] * fora, nivel * H, no[1] + L.dir[1] * ao + out[1] * fora, L.theta, camada, tom);
  }
  grupo() {
    const grp = new THREE.Group(); const camadas = {};
    for (const [nome, lista] of Object.entries(this.camadas)) {
      if (!lista.length) continue;
      const mesh = new THREE.Mesh(mergeGeometries(lista, false), this.kit.material);
      mesh.castShadow = true; mesh.receiveShadow = true; mesh.name = 'casas_' + nome;
      grp.add(mesh); camadas[nome] = mesh;
    }
    for (const p of this.portas) grp.add(p);
    grp.userData = { camadas, portas: this.portas, npc: this.npc, colisao: this.colisao };
    for (const n of this.npc) grp.add(n);
    return grp;
  }
}

function tomDaCasa(rnd) {
  const t = 0.9 + rnd() * 0.16;
  return [t * (0.98 + rnd() * 0.05), t, t * (0.94 + rnd() * 0.06)];
}

// mapa: Map 'i,k' -> { casa, andares } | { patio: true }.  casas: Map id -> { variante, tom, portas:[{nivel,lado,i,k}],
//        escada:{lado,i,k} (externa, 4 arestas) | escadaMao:{lado,i,k} }
function construir(kit, mapa, casas, rnd, opts = {}) {
  const M = new Montador(kit);
  const cel = (i, k) => mapa.get(i + ',' + k);
  const ocup = (c, n) => c && !c.patio && c.andares > n;
  const lados = Object.keys(LADOS);
  const arestas = [];   // {lado, i, k, nivel, tipo: 'ext'|'div'|'mureta'|'muro', dono}
  let maxN = 0;
  for (const [key, c] of mapa) {
    const [i, k] = key.split(',').map(Number);
    if (c.patio) {
      M.por('Piso_Patio', i, 0, k + 1);
      for (const s of lados) { const L = LADOS[s]; const v = cel(i + L.di, k + L.dk); if (!v) arestas.push({ lado: s, i, k, nivel: 0, tipo: 'muro', dono: -1 }); }
      continue;
    }
    maxN = Math.max(maxN, c.andares);
    const casa = casas.get(c.casa);
    M.por('Piso_Terra', i, 0, k + 1, 0, 'base', casa.tom);
    for (let n = 0; n < c.andares; n++) {
      M.por('Laje_1', i, n * H, k + 1, 0, 'cima', casa.tom);
      for (const s of lados) {
        const L = LADOS[s]; const v = cel(i + L.di, k + L.dk);
        if (!ocup(v, n)) arestas.push({ lado: s, i, k, nivel: n, tipo: 'ext', dono: c.casa });
        else if (v.casa !== c.casa && c.casa < v.casa) arestas.push({ lado: s, i, k, nivel: n, tipo: 'div', dono: c.casa });
      }
    }
    // mureta do terraço no topo
    const t = c.andares - 1;
    for (const s of lados) {
      const L = LADOS[s]; const v = cel(i + L.di, k + L.dk);
      if (ocup(v, t + 1)) continue;                                  // parede do vizinho continua para cima
      if (v && !v.patio && v.casa === c.casa && v.andares === c.andares) continue;
      if (v && !v.patio && v.casa !== c.casa && v.andares === c.andares && c.casa > v.casa) continue;   // mureta dividida: só uma
      arestas.push({ lado: s, i, k, nivel: t, tipo: 'mureta', dono: c.casa });
    }
  }
  // marcas de porta, escada e vão da mureta
  const marca = new Map();
  for (const [id, casa] of casas) {
    for (const p of casa.portas || []) marca.set([p.lado, p.i, p.k, p.nivel, 'ext'].join('|'), 'porta');
    if (casa.escada) {
      const e = casa.escada, L = LADOS[e.lado];
      // a 4ª aresta a partir do começo, no sentido do lado
      let ci = e.i, ck = e.k;
      for (let s = 0; s < 3; s++) { ci += L.dir[0] !== 0 ? L.dir[0] : 0; ck += L.dir[1] !== 0 ? L.dir[1] : 0; }
      marca.set([e.lado, ci, ck, 0, 'mureta'].join('|'), 'vao');
      const no = L.start(e.i, e.k); M.naAresta('Escada_Externa', e.lado, no, 0, 0, 0, 'base', casa.tom);
    }
    if (casa.escadaMao) {
      const e = casa.escadaMao, L = LADOS[e.lado];
      marca.set([e.lado, e.i, e.k, 0, 'mureta'].join('|'), 'vao');
      M.naAresta('Escada_Mao', e.lado, L.start(e.i, e.k), 0, 0.5, 0, 'base');
    }
  }
  // agrupa em trechos contínuos e escolhe peças
  const trechos = new Map();
  for (const a of arestas) {
    const L = LADOS[a.lado];
    const key = [a.lado, L.key(a.i, a.k), a.nivel, a.tipo, a.dono].join('|');
    if (!trechos.has(key)) trechos.set(key, []);
    trechos.get(key).push(a);
  }
  const pilares = new Map();
  // um pilar por nó e faixa de altura; parede > mureta > pátio (nunca dois pilares no mesmo lugar)
  const pilar = (no, nivel, nome, tom) => {
    const tipo = nome.startsWith('Pilar_Mureta') ? 1 : nome === 'Pilar_Patio' ? 0 : 2;
    const faixa = tipo === 1 ? nivel + 1 : nivel;
    const k = no[0] + ',' + no[1] + '|' + faixa;
    const atual = pilares.get(k);
    if (!atual || atual[4] < tipo) pilares.set(k, [nome, no, nivel, tom, tipo]);
  };
  for (const lista of trechos.values()) {
    const L = LADOS[lista[0].lado];
    lista.sort((a, b) => L.ord(a.i, a.k) - L.ord(b.i, b.k));
    // quebra onde há buraco
    const runs = [[lista[0]]];
    for (let x = 1; x < lista.length; x++) {
      const p = lista[x - 1], a = lista[x];
      if (Math.abs(L.ord(a.i, a.k) - L.ord(p.i, p.k)) === 1) runs[runs.length - 1].push(a); else runs.push([a]);
    }
    for (const run of runs) {
      const a0 = run[0]; const casa = casas.get(a0.dono) || { variante: 'Pedra', tom: null };
      const V = casa.variante; const tom = casa.tom; const camada = a0.nivel > 0 || a0.tipo === 'mureta' ? 'cima' : 'base';
      let x = 0;
      while (x < run.length) {
        const a = run[x]; const no = L.start(a.i, a.k);
        const m = marca.get([a.lado, a.i, a.k, a.nivel, a.tipo].join('|'));
        let n = 1, nome;
        if (a.tipo === 'muro') { n = run.length - x >= 2 ? 2 : 1; nome = 'Muro_Patio_' + n; pilar(no, 0, 'Pilar_Patio', null); }
        else if (a.tipo === 'mureta') {
          if (m === 'vao') { M.naAresta('Laje_Borda', a.lado, no, a.nivel, 0, 0, 'cima', tom); pilar(no, a.nivel, 'Pilar_Mureta_' + V, tom); x += 1;
            const fim = [no[0] + L.dir[0], no[1] + L.dir[1]]; pilar(fim, a.nivel, 'Pilar_Mureta_' + V, tom); continue; }
          n = run.length - x >= 2 && !marca.get([a.lado, run[x + 1].i, run[x + 1].k, a.nivel, a.tipo].join('|')) ? 2 : 1;
          nome = 'Mureta_' + V + '_' + n; pilar(no, a.nivel, 'Pilar_Mureta_' + V, tom);
          if (rnd() < 0.3) for (let q = 0; q < n; q++) M.naAresta('Vigas_1', a.lado, no, a.nivel, q, 0, 'cima', tom);
        } else {
          if (m === 'porta' && x + 1 < run.length) {
            n = 2; nome = 'Parede_' + V + '_Porta';
            const folha = new THREE.Mesh(kit.pecas.Porta, kit.material); folha.castShadow = true;
            const piv = new THREE.Group(); piv.add(folha);
            const out = [Math.sin(L.theta), Math.cos(L.theta)];
            piv.position.set(no[0] + L.dir[0] * 0.55 - out[0] * 0.12, a.nivel * H, no[1] + L.dir[1] * 0.55 - out[1] * 0.12);
            piv.rotation.y = L.theta; piv.userData = { fechada: L.theta, aberta: L.theta + 1.6, alvo: L.theta, porta: true };   // abre para dentro
            M.portas.push(piv);
            M.naAresta('Soleira', a.lado, no, a.nivel, 0.5, 0.42, 'base');
          } else {
            n = run.length - x >= 2 && marca.get([a.lado, run[x + 1].i, run[x + 1].k, a.nivel, a.tipo].join('|')) !== 'porta' ? 2 : 1;
            const janela = a.tipo === 'ext' && rnd() < (a.nivel ? 0.5 : 0.3);
            nome = 'Parede_' + V + (janela ? '_Janela_' + n : '_' + n);
          }
          pilar(no, a.nivel, 'Pilar_' + V, tom);
        }
        const camadaP = a.tipo === 'muro' ? 'base' : camada;
        M.naAresta(nome, a.lado, no, a.nivel, 0, 0, camadaP, a.tipo === 'muro' ? null : tom);
        const fim = [no[0] + L.dir[0] * n, no[1] + L.dir[1] * n];
        if (a.tipo === 'muro') pilar(fim, 0, 'Pilar_Patio', null);
        else pilar(fim, a.nivel, (a.tipo === 'mureta' ? 'Pilar_Mureta_' : 'Pilar_') + V, tom);
        // colisão (caixa da parede) para o jogo
        if (a.tipo !== 'mureta') M.colisao.push({ lado: a.lado, de: no, comp: n, nivel: a.nivel, altura: a.tipo === 'muro' ? 1.2 : H });
        x += n;
      }
    }
  }
  for (const [nome, no, nivel, tom] of pilares.values()) M.por(nome, no[0], nivel * H, no[1], 0, nome.includes('Mureta') || nivel > 0 ? 'cima' : 'base', tom);
  return M;
}

function npcMarca(M, nome, x, y, z, olharX, olharZ) {
  const o = new THREE.Object3D(); o.name = 'NPC_' + nome; o.position.set(x, y, z);
  o.rotation.y = Math.atan2(olharX - x, olharZ - z); M.npc.push(o);
}

// ------------------------------------------------------------------ casa de exemplo (mobiliada)
export function casaExemplo(kit) {
  let s = 7; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const mapa = new Map();
  for (let i = 0; i < 5; i++) for (let k = 0; k < 4; k++) mapa.set(i + ',' + k, { casa: 1, andares: (i >= 2 && k <= 1) ? 2 : 1 });
  const casas = new Map([[1, { variante: 'Pedra', tom: [1, 1, 1],
    portas: [{ nivel: 0, lado: 'S', i: 1, k: 3 }, { nivel: 1, lado: 'W', i: 2, k: 0 }],
    escada: { lado: 'W', i: 0, k: 0 } }]]);
  const M = construir(kit, mapa, casas, rnd);
  // térreo
  M.por('Banco_Cama', 0.3, 0, 1.0, 0);
  M.por('Mesa_Baixa', 2.2, 0, 2.2, 0.1);
  M.por('Candeia', 2.35, 0.355, 2.1, 0.5);
  M.por('Banquinho', 3.0, 0, 2.45, 0);
  M.por('Jarro_Grande', 4.35, 0, 0.6, 0);
  M.por('Cantaro', 3.85, 0, 3.55, 0);
  M.por('Cantaro', 0.55, 0, 2.9, 1);
  M.por('Bau', 2.5, 0, 0.55, 0); M.por('Bau_Tampa', 2.5, 0.42, 0.78, 0);
  M.por('Tear', 4.55, 0, 2.4, -Math.PI / 2);
  M.por('Esteira_Enrolada', 0.3, 0, 3.55, 0);
  // quarto de cima (aliyá) e terraço
  M.por('Cama_Esteira', 2.9, 3.0, 0.35, -Math.PI / 2, 'cima');
  M.por('Toldo', 2.6, 3.0, 3.78, 0, 'cima', null, 0.78);
  M.por('Cama_Esteira', 2.7, 3.0, 2.5, -Math.PI / 2, 'cima');
  M.por('Rolo_Pedra', 1.0, 3.0, 1.0, 0.3, 'cima');
  M.por('Pedra_Solta_1', 5.6, 0, 4.6, 0); M.por('Pedra_Solta_3', -1.4, 0, 2.0, 1);
  npcMarca(M, 'Dormir', 3.8, 3.05, 0.8, 3.8, 0); npcMarca(M, 'Levantar', 3.6, 3.0, 1.5, 3.6, 2.5);
  npcMarca(M, 'Porta', 2.0, 0, 4.7, 2.0, 3.0); npcMarca(M, 'Terraco', 1.0, 3.0, 2.0, 0, 2.0);
  npcMarca(M, 'Tear', 3.85, 0, 2.9, 4.55, 2.9); npcMarca(M, 'Mesa', 2.2, 0, 1.55, 2.2, 2.2);
  return M.grupo();
}

// ------------------------------------------------------------------ casa aleatória
export function casaAleatoria(kit, semente) {
  let s = (semente % 2147483646) + 1; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const w = 3 + Math.floor(rnd() * 3), d = 3 + Math.floor(rnd() * 3);
  const mapa = new Map();
  const cima = rnd() < 0.45;
  const cw = Math.min(w - 1, 2 + Math.floor(rnd() * 2)), cd = 2;
  for (let i = 0; i < w; i++) for (let k = 0; k < d; k++) mapa.set(i + ',' + k, { casa: 1, andares: cima && i >= w - cw && k < cd ? 2 : 1 });
  if (rnd() < 0.5) for (let i = 0; i < 2; i++) for (let k = d; k < d + 2; k++) mapa.set(i + ',' + k, { casa: 1, andares: 1 });   // forma de L
  const dd = Math.max(...[...mapa.keys()].map((q) => +q.split(',')[1])) + 1;
  const casa = { variante: VARIANTES[Math.floor(rnd() * 4)], tom: tomDaCasa(rnd), portas: [] };
  // porta no lado sul de uma fileira que tenha 2 células seguidas
  const sul = [...mapa.keys()].map((q) => q.split(',').map(Number)).filter(([i, k]) => !mapa.has(i + ',' + (k + 1)));
  const op = sul.filter(([i, k]) => mapa.has((i + 1) + ',' + k) && !mapa.has((i + 1) + ',' + (k + 1)));
  if (op.length) { const [i, k] = op[Math.floor(rnd() * op.length)]; casa.portas.push({ nivel: 0, lado: 'S', i, k }); }
  if (cima) casa.portas.push({ nivel: 1, lado: 'W', i: w - cw, k: 0 });
  // escada: lado oeste se tiver 4 células em coluna; senão escada de mão
  let colW = 0; while (mapa.has('0,' + colW) && mapa.get('0,' + colW).andares === 1) colW++;
  if (colW >= 4) casa.escada = { lado: 'W', i: 0, k: 0 };
  else casa.escadaMao = { lado: 'N', i: 0, k: 0 };
  const M = construir(kit, mapa, new Map([[1, casa]]), rnd);
  M.por('Mesa_Baixa', w / 2, 0, dd / 2, rnd());
  M.por('Cama_Esteira', 0.4, 0, 0.3 + 1.9, 0);
  M.por('Jarro_Grande', w - 0.6, 0, d - 0.6, 0);
  return M.grupo();
}

// ------------------------------------------------------------------ quarteirão de fundo (casas geminadas)
export function quarteirao(kit, semente, W = 18, D = 14) {
  let s = (semente % 2147483646) + 1; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  // divide o quarteirão em lotes (BSP)
  const lotes = [];
  (function divide(x, z, w, d) {
    const podeW = w >= 6, podeD = d >= 6;
    if ((!podeW && !podeD) || (w <= 5 && d <= 5 && rnd() < 0.5)) { lotes.push({ x, z, w, d }); return; }
    if (podeW && (!podeD || w > d || (w === d && rnd() < 0.5))) { const c = 3 + Math.floor(rnd() * (w - 5)); divide(x, z, c, d); divide(x + c, z, w - c, d); }
    else { const c = 3 + Math.floor(rnd() * (d - 5)); divide(x, z, w, c); divide(x, z + c, w, d - c); }
  })(0, 0, W, D);
  // pátio: o lote mais central que não encosta na borda
  const interno = lotes.filter((l) => l.x > 0 && l.z > 0 && l.x + l.w < W && l.z + l.d < D);
  const patios = new Set();
  if (interno.length) patios.add(interno[Math.floor(rnd() * interno.length)]);
  const mapa = new Map(); const casas = new Map();
  lotes.forEach((l, id) => {
    if (patios.has(l)) { for (let i = l.x; i < l.x + l.w; i++) for (let k = l.z; k < l.z + l.d; k++) mapa.set(i + ',' + k, { patio: true }); return; }
    const r = rnd(); const and = r < 0.2 ? 2 : 1; const parcial = r >= 0.2 && r < 0.45;
    for (let i = l.x; i < l.x + l.w; i++) for (let k = l.z; k < l.z + l.d; k++) {
      const up = parcial && i < l.x + 2 && k < l.z + 2;
      mapa.set(i + ',' + k, { casa: id + 1, andares: up ? 2 : and });
    }
    casas.set(id + 1, { variante: VARIANTES[Math.floor(rnd() * 4)], tom: tomDaCasa(rnd), portas: [], lote: l });
  });
  // portas: no lado do lote que dá para a rua (borda do quarteirão) ou para o pátio
  for (const [id, casa] of casas) {
    const l = casa.lote;
    const ops = [];
    const livre = (i, k) => { const c = mapa.get(i + ',' + k); return !c || c.patio; };
    for (let i = l.x; i < l.x + l.w - 1; i++) {
      if (livre(i, l.z + l.d) && livre(i + 1, l.z + l.d)) ops.push({ nivel: 0, lado: 'S', i, k: l.z + l.d - 1 });
      if (livre(i + 1, l.z - 1) && livre(i, l.z - 1)) ops.push({ nivel: 0, lado: 'N', i: i + 1, k: l.z });
    }
    for (let k = l.z; k < l.z + l.d - 1; k++) {
      if (livre(l.x - 1, k) && livre(l.x - 1, k + 1)) ops.push({ nivel: 0, lado: 'W', i: l.x, k });
      if (livre(l.x + l.w, k + 1) && livre(l.x + l.w, k)) ops.push({ nivel: 0, lado: 'E', i: l.x + l.w - 1, k: k + 1 });
    }
    if (ops.length) casa.portas.push(ops[Math.floor(rnd() * ops.length)]);
  }
  const M = construir(kit, mapa, casas, rnd);
  // um pouco de vida nos terraços e no pátio
  for (const [id, casa] of casas) {
    const l = casa.lote; if (rnd() < 0.5) continue;
    const c = mapa.get(l.x + ',' + l.z); const y = c.andares * H + 0.2;
    if (rnd() < 0.5) M.por('Esteira_Enrolada', l.x + 0.5, y, l.z + 0.6, rnd() * 3, 'cima');
    else M.por('Jarro_Grande', l.x + 0.6, y, l.z + 0.6, 0, 'cima', casa.tom);
  }
  for (const p of patios) { M.por('Cantaro', p.x + 0.7, 0, p.z + 0.7, 0); M.por('Pedra_Solta_2', p.x + p.w - 0.8, 0, p.z + p.d - 0.8, 1); }
  const g = M.grupo(); g.userData.tamanho = [W, D];
  return g;
}
