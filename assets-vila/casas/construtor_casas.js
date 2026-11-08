// Construtor de casas da Judeia do século I a partir do kit modular (casas_kit.glb). Versão 2.
// É o mesmo módulo que o jogo vai usar para montar vilas e a cidade.
//
// Grade de 1 m. A célula (i, k) ocupa x ∈ [i, i+1] e z ∈ [k, k+1] (three.js: Y para cima). Andar = 2,8 m.
// As paredes NÃO têm textura própria: o material "alvenaria" pinta pela posição no mundo (contínuo, sem emendas
// entre peças): reboco em cima, base de pedra embaixo com borda irregular, e reboco gasto mostrando a pedra.
// Cada casa tem seus parâmetros (cobertura do reboco, tipo de pedra, altura da base) e um tom de cor.
//
//   import { carregarKit, casaExemplo, casaAleatoria, quarteirao } from './construtor_casas.js';
//   const kit = await carregarKit('casas_kit.glb', 'tex/');
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const H = 2.8;
const LADOS = {
  S: { di: 0, dk: 1, theta: 0, dir: [1, 0], start: (i, k) => [i, k + 1], key: (i, k) => 'z' + (k + 1), ord: (i, k) => i },
  N: { di: 0, dk: -1, theta: Math.PI, dir: [-1, 0], start: (i, k) => [i + 1, k], key: (i, k) => 'z' + k, ord: (i, k) => -i },
  E: { di: 1, dk: 0, theta: Math.PI / 2, dir: [0, -1], start: (i, k) => [i + 1, k + 1], key: (i, k) => 'x' + (i + 1), ord: (i, k) => -k },
  W: { di: -1, dk: 0, theta: -Math.PI / 2, dir: [0, 1], start: (i, k) => [i, k], key: (i, k) => 'x' + i, ord: (i, k) => k },
};
const MATS = ['Casa_Alvenaria', 'Casa_Teto', 'Casa_Atlas'];

// variantes de parede: [cobertura do reboco 0..1, pedra 0 bruta / 1 cantaria, altura da base de pedra]
export const VARIANTES = {
  Rebocada: (r) => [1.0, 0, 0.45 + r() * 0.45],
  Gasta: (r) => [0.5 + r() * 0.2, 0, 0.5 + r() * 0.3],
  Pedra: () => [0.0, 0, 0.0],
  Cantaria: (r) => [r() < 0.5 ? 0.0 : 0.35, 1, 0.0],
};
function sorteiaVariante(rnd) {
  const x = rnd();
  const nome = x < 0.45 ? 'Rebocada' : x < 0.7 ? 'Gasta' : x < 0.85 ? 'Pedra' : 'Cantaria';
  return VARIANTES[nome](rnd);
}

// ------------------------------------------------------------------ materiais
const GLSL_NOISE = `
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y); }
vec2 planar(vec3 w, vec3 n){ return abs(n.y) > 0.6 ? w.xz : (abs(n.x) > abs(n.z) ? vec2(w.z, w.y) : vec2(w.x, w.y)); }
// textura SEM repetição aparente: duas amostras (uma girada e em outra escala) trocadas por um ruído grande
vec3 semRep(sampler2D t, vec2 uv){
  float n = vnoise(uv * 0.45 + 7.3) * 0.7 + vnoise(uv * 1.3) * 0.3;
  vec2 uv2 = mat2(0.788, -0.616, 0.616, 0.788) * uv * 1.17 + vec2(0.37, 0.71);
  vec2 uv3 = mat2(-0.342, -0.94, 0.94, -0.342) * uv * 0.87 + vec2(0.13, 0.52);
  vec3 a = texture2D(t, uv).rgb, b = texture2D(t, uv2).rgb, c = texture2D(t, uv3).rgb;
  return mix(mix(a, b, smoothstep(0.3, 0.6, n)), c, smoothstep(0.55, 0.85, n));
}
// variação larga de tom (alguns metros): quebra a uniformidade
vec3 macro(vec3 w){
  float a = vnoise(w.xz * 0.11 + w.y * 0.07), b = vnoise(w.xz * 0.37 + 11.0);
  return vec3(0.9 + 0.16 * a + 0.05 * b, 0.9 + 0.13 * a + 0.04 * b, 0.9 + 0.1 * a);
}
`;
function materialMundo(tipo, tex) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.95, metalness: 0 });
  m.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, { tReboco: { value: tex.reboco }, tPedra: { value: tex.pedra }, tCantaria: { value: tex.cantaria }, tTeto: { value: tex.teto } });
    sh.vertexShader = 'attribute vec3 parede; attribute float aCodigo; varying vec3 vParede; varying float vCodigo; varying vec3 vWPos;\n' +
      sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz; vParede = parede; vCodigo = aCodigo;');
    const corpo = tipo === 'alvenaria' ? `
      vec3 nW = normalize(cross(dFdx(vWPos), dFdy(vWPos)));
      vec2 p = planar(vWPos, nW);
      vec3 pedra = mix(semRep(tPedra, p / 1.5), semRep(tCantaria, p / 1.9), step(0.5, vParede.y)) * vec3(1.0, 0.9, 0.76);
      vec3 rb = semRep(tReboco, p / 2.9);
      // reboco: menos contraste (as rachaduras repetidas eram o que mais aparecia) e mais calor
      vec3 reboco = rb * vec3(1.0, 0.96, 0.9);
      float nn = vnoise(p * 0.85) * 0.62 + vnoise(p * 2.6) * 0.38;
      float baseY = vParede.z + (vnoise(vec2(p.x * 1.7, 3.1)) - 0.5) * 0.32;
      float acima = smoothstep(baseY - 0.025, baseY + 0.025, vWPos.y);
      float gasto = smoothstep(vParede.x - 0.035, vParede.x + 0.035, nn);
      float m = acima * (1.0 - gasto);
      if (vCodigo > 1.5) m = 0.0; else if (vCodigo > 0.5) m = 1.0;
      float bloco = step(2.5, vCodigo);
      float borda = (1.0 - smoothstep(0.0, 0.07, abs(vWPos.y - baseY))) + (1.0 - smoothstep(0.0, 0.05, abs(nn - vParede.x)));
      borda = clamp(borda, 0.0, 1.0) * step(vCodigo, 0.5) * acima;
      vec3 col = mix(pedra, reboco, m) * (1.0 - 0.22 * borda);
      float grao = dot(semRep(tReboco, p / 0.9), vec3(0.333));
      // pedras 3D: cor do vértice + pinceladas (a textura de pedra, larga e suave) + grão
      float pinc = dot(semRep(tPedra, p / 2.2), vec3(0.333));
      col = mix(col, vec3(1.0, 0.92, 0.8) * (0.62 + 0.18 * grao + 0.22 * pinc), bloco);
      // por andar: sombra suave sob o beiral e escorridos de sujeira descendo do topo (só por fora)
      float t = mod(vWPos.y, 2.8);
      float fora = step(vCodigo, 0.5) * (1.0 - bloco);
      float beiral = smoothstep(2.35, 2.78, t) * 0.22 * fora;
      float esc = smoothstep(0.62, 0.92, vnoise(vec2(p.x * 2.3, floor(vWPos.y / 2.8) * 5.0))) * smoothstep(0.9, 2.6, t) * 0.16 * fora;
      col *= (1.0 - beiral) * (1.0 - esc) * macro(vWPos);
      float ao = 0.72 + 0.28 * smoothstep(0.0, 0.9, vWPos.y);
      diffuseColor.rgb *= col * ao;` : `
      vec3 nW = normalize(cross(dFdx(vWPos), dFdy(vWPos)));
      vec2 p = planar(vWPos, nW);
      diffuseColor.rgb *= semRep(tTeto, p / 2.6) * macro(vWPos);`;
    sh.fragmentShader = 'uniform sampler2D tReboco, tPedra, tCantaria, tTeto; varying vec3 vParede; varying float vCodigo; varying vec3 vWPos;\n' + GLSL_NOISE +
      sh.fragmentShader.replace('#include <map_fragment>', corpo);
  };
  m.customProgramCacheKey = () => 'casa_' + tipo;
  return m;
}

// ------------------------------------------------------------------ kit
export { GLSL_NOISE };
export async function carregarKit(url, texDir = 'tex/') {
  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(url);
  gltf.scene.updateMatrixWorld(true);
  const tl = new THREE.TextureLoader();
  const tex = {};
  for (const n of ['reboco', 'pedra', 'cantaria', 'teto']) {
    const t = tl.load(texDir + n + '.webp'); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; tex[n] = t;
  }
  const pecas = {}; let atlas = null;
  for (const no of gltf.scene.children) {
    const porMat = {};
    no.traverse((o) => {
      if (!o.isMesh) return;
      const mn = MATS.includes(o.material.name) ? o.material.name : 'Casa_Atlas';
      if (mn === 'Casa_Atlas') atlas = atlas || o.material;
      const g = toFloat(o.geometry.clone()); g.applyMatrix4(o.matrixWorld);
      if (mn !== 'Casa_Atlas') {
        const uv = g.attributes.uv, n = g.attributes.position.count, cod = new Float32Array(n);
        for (let i = 0; i < n; i++) cod[i] = uv ? Math.round(uv.getX(i)) : 0;
        g.setAttribute('aCodigo', new THREE.BufferAttribute(cod, 1));
        g.setAttribute('parede', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      }
      porMat[mn] = porMat[mn] ? mergeGeometries([porMat[mn], g]) : g;
    });
    pecas[no.name] = porMat;
  }
  const atl = atlas.clone(); atl.vertexColors = true;
  // pedras (metade de cima do atlas = folhas de pedras): mais claras e levemente acinzentadas,
  // e com restos de reboco por cima, que se desfazem aos poucos e revelam a pedra
  atl.onBeforeCompile = (sh) => {
    sh.uniforms.tReboco = { value: tex.reboco };
    sh.vertexShader = 'varying vec3 vWPosA;\n' + sh.vertexShader.replace('#include <project_vertex>', '#include <project_vertex>\n vWPosA = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = 'uniform sampler2D tReboco; varying vec3 vWPosA;\n' + GLSL_NOISE + sh.fragmentShader.replace('#include <map_fragment>', `
      vec3 c = texture2D(map, vMapUv).rgb;
      if (vMapUv.y < 0.5) {
        float l = dot(c, vec3(0.3333));
        c = mix(c, vec3(l) * vec3(1.0, 0.985, 0.95), 0.5) * 1.18 + 0.035;
        vec3 nW = normalize(cross(dFdx(vWPosA), dFdy(vWPosA)));
        if (abs(nW.y) < 0.55) {
          vec2 p = planar(vWPosA, nW);
          float n = vnoise(p * 1.3 + 3.0) * 0.6 + vnoise(p * 4.1) * 0.4;
          float massa = smoothstep(0.44, 0.64, n) * (0.55 + 0.45 * smoothstep(0.6, 2.2, mod(vWPosA.y, 2.8)));
          vec3 reb = semRep(tReboco, p / 2.9) * vec3(1.0, 0.96, 0.9);
          c = mix(c, reb, massa * 0.9);
        }
      }
      diffuseColor.rgb *= c;`);
  };
  atl.customProgramCacheKey = () => 'casa_atlas_pedras';
  const materiais = { Casa_Alvenaria: materialMundo('alvenaria', tex), Casa_Teto: materialMundo('teto', tex), Casa_Atlas: atl };
  return { pecas, materiais, tex };
}
function toFloat(g) {
  for (const name of Object.keys(g.attributes)) {
    const a = g.attributes[name];
    if (a.array instanceof Float32Array && !a.isInterleavedBufferAttribute && !(name === 'color' && a.itemSize === 4)) continue;
    const k = name === 'color' ? 3 : a.itemSize;
    const out = new Float32Array(a.count * k);
    const get = [a.getX, a.getY, a.getZ, a.getW];
    for (let i = 0; i < a.count; i++) for (let c = 0; c < k; c++) out[i * k + c] = get[c].call(a, i);
    g.setAttribute(name, new THREE.BufferAttribute(out, k));
  }
  return g;
}

// ------------------------------------------------------------------ montagem
class Montador {
  constructor(kit) { this.kit = kit; this.camadas = { base: {}, cima: {} }; this.portas = []; this.npc = []; this.colisao = []; }
  por(nome, x, y, z, theta = 0, camada = 'base', tom = null, escala = 1, parede = null) {
    const peca = this.kit.pecas[nome]; if (!peca) { console.warn('peça faltando', nome); return; }
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), theta), new THREE.Vector3(escala, escala, escala));
    for (const [mn, g0] of Object.entries(peca)) {
      const g = g0.clone(); g.applyMatrix4(m);
      if (tom) { const c = g.attributes.color; for (let i = 0; i < c.count; i++) c.setXYZ(i, c.getX(i) * tom[0], c.getY(i) * tom[1], c.getZ(i) * tom[2]); }
      if (g.attributes.parede && parede) { const a = g.attributes.parede; for (let i = 0; i < a.count; i++) a.setXYZ(i, parede[0], parede[1], parede[2]); }
      (this.camadas[camada][mn] = this.camadas[camada][mn] || []).push(g);
    }
  }
  naAresta(nome, lado, no, nivel, ao = 0, fora = 0, camada = 'base', tom = null, parede = null) {
    const L = LADOS[lado]; const out = [Math.sin(L.theta), Math.cos(L.theta)];
    this.por(nome, no[0] + L.dir[0] * ao + out[0] * fora, nivel * H, no[1] + L.dir[1] * ao + out[1] * fora, L.theta, camada, tom, 1, parede);
  }
  grupo() {
    const grp = new THREE.Group(); const camadas = {};
    for (const [nome, porMat] of Object.entries(this.camadas)) {
      const sub = new THREE.Group(); sub.name = 'casas_' + nome;
      for (const [mn, lista] of Object.entries(porMat)) {
        if (!lista.length) continue;
        const mesh = new THREE.Mesh(mergeGeometries(lista, false), this.kit.materiais[mn]);
        mesh.castShadow = true; mesh.receiveShadow = true; sub.add(mesh);
      }
      grp.add(sub); camadas[nome] = sub;
    }
    for (const p of this.portas) grp.add(p);
    for (const n of this.npc) grp.add(n);
    grp.userData = { camadas, portas: this.portas, npc: this.npc, colisao: this.colisao };
    return grp;
  }
}
function tomDaCasa(rnd) {
  const t = 0.93 + rnd() * 0.12;
  return [t * (1.0 + rnd() * 0.04), t, t * (0.93 + rnd() * 0.06)];
}

// mapa: Map 'i,k' -> { casa, andares } | { patio: true }.
// casas: Map id -> { parede:[cob, pedra, base], tom, portas:[{nivel,lado,i,k}], escada:{lado,i,k}, escadaMao:{lado,i,k} }
function construir(kit, mapa, casas, rnd) {
  const M = new Montador(kit);
  const cel = (i, k) => mapa.get(i + ',' + k);
  const ocup = (c, n) => c && !c.patio && c.andares > n;
  const lados = Object.keys(LADOS);
  const arestas = [];
  for (const [key, c] of mapa) {
    const [i, k] = key.split(',').map(Number);
    if (c.patio) {
      M.por('Piso_Patio', i, 0, k + 1);
      for (const s of lados) { const L = LADOS[s]; if (!cel(i + L.di, k + L.dk)) arestas.push({ lado: s, i, k, nivel: 0, tipo: 'muro', dono: -1 }); }
      continue;
    }
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
    const t = c.andares - 1;
    for (const s of lados) {
      const L = LADOS[s]; const v = cel(i + L.di, k + L.dk);
      if (ocup(v, t + 1)) continue;
      if (v && !v.patio && v.casa === c.casa && v.andares === c.andares) continue;
      if (v && !v.patio && v.casa !== c.casa && v.andares === c.andares && c.casa > v.casa) continue;
      arestas.push({ lado: s, i, k, nivel: t, tipo: 'mureta', dono: c.casa });
    }
  }
  const marca = new Map();
  for (const [, casa] of casas) {
    for (const p of casa.portas || []) marca.set([p.lado, p.i, p.k, p.nivel, 'ext'].join('|'), 'porta');
    if (casa.escada) {
      const e = casa.escada, L = LADOS[e.lado];
      let ci = e.i, ck = e.k;
      for (let s = 0; s < 3; s++) { ci += L.dir[0]; ck += L.dir[1]; }
      marca.set([e.lado, ci, ck, 0, 'mureta'].join('|'), 'vao');
      M.naAresta('Escada_Externa', e.lado, L.start(e.i, e.k), 0, 0, 0, 'base', casa.tom, casa.parede);
    }
    if (casa.escadaMao) {
      const e = casa.escadaMao, L = LADOS[e.lado];
      marca.set([e.lado, e.i, e.k, 0, 'mureta'].join('|'), 'vao');
      M.naAresta('Escada_Mao', e.lado, L.start(e.i, e.k), 0, 0.5, 0, 'base');
    }
  }
  const trechos = new Map();
  for (const a of arestas) {
    const key = [a.lado, LADOS[a.lado].key(a.i, a.k), a.nivel, a.tipo, a.dono].join('|');
    if (!trechos.has(key)) trechos.set(key, []);
    trechos.get(key).push(a);
  }
  // um pilar por nó e faixa de altura; parede > mureta > pátio
  const semPilar = new Set();   // nós de chegada da escada no terraço (passagem livre)
  const pilares = new Map();
  const pilar = (no, nivel, nome, casa) => {
    const tipo = nome === 'Pilar_Mureta' ? 1 : nome === 'Pilar_Patio' ? 0 : 2;
    const k = no[0] + ',' + no[1] + '|' + (tipo === 1 ? nivel + 1 : nivel);
    const atual = pilares.get(k);
    if (!atual || atual[4] < tipo) pilares.set(k, [nome, no, nivel, casa, tipo]);
  };
  for (const lista of trechos.values()) {
    const L = LADOS[lista[0].lado];
    lista.sort((a, b) => L.ord(a.i, a.k) - L.ord(b.i, b.k));
    const runs = [[lista[0]]];
    for (let x = 1; x < lista.length; x++) {
      if (Math.abs(L.ord(lista[x].i, lista[x].k) - L.ord(lista[x - 1].i, lista[x - 1].k)) === 1) runs[runs.length - 1].push(lista[x]); else runs.push([lista[x]]);
    }
    for (const run of runs) {
      const a0 = run[0]; const casa = casas.get(a0.dono) || { parede: [0, 0, 0], tom: null };
      const camada = a0.nivel > 0 || a0.tipo === 'mureta' ? 'cima' : 'base';
      let x = 0;
      while (x < run.length) {
        const a = run[x]; const no = L.start(a.i, a.k);
        const m = marca.get([a.lado, a.i, a.k, a.nivel, a.tipo].join('|'));
        const prox = run[x + 1] ? marca.get([a.lado, run[x + 1].i, run[x + 1].k, a.nivel, a.tipo].join('|')) : 'fim';
        let n = 1, nome;
        if (a.tipo === 'muro') { n = run.length - x >= 2 ? 2 : 1; nome = 'Muro_Patio_' + n; pilar(no, 0, 'Pilar_Patio', casa); }
        else if (a.tipo === 'mureta') {
          if (m === 'vao') {
            M.naAresta('Laje_Borda', a.lado, no, a.nivel, 0, 0, 'cima', casa.tom, casa.parede);
            semPilar.add(no[0] + ',' + no[1] + '|' + (a.nivel + 1)); pilar([no[0] + L.dir[0], no[1] + L.dir[1]], a.nivel, 'Pilar_Mureta', casa);
            x += 1; continue;
          }
          n = run.length - x >= 2 && !prox ? 2 : 1;
          nome = 'Mureta_' + n; pilar(no, a.nivel, 'Pilar_Mureta', casa);
        } else {
          if (m === 'porta' && x + 1 < run.length) {
            n = 2; nome = (casa.parede[0] < 0.3 ? 'ParedePedra' : 'Parede') + '_Porta';
            const folha = new THREE.Group();
            for (const [mn, g] of Object.entries(kit.pecas.Porta)) { const me = new THREE.Mesh(g, kit.materiais[mn]); me.castShadow = true; folha.add(me); }
            const piv = new THREE.Group(); piv.add(folha);
            const out = [Math.sin(L.theta), Math.cos(L.theta)];
            piv.position.set(no[0] + L.dir[0] * 0.55 - out[0] * 0.12, a.nivel * H, no[1] + L.dir[1] * 0.55 - out[1] * 0.12);
            piv.rotation.y = L.theta; piv.userData = { fechada: L.theta, aberta: L.theta + 1.6, alvo: L.theta, porta: true };
            M.portas.push(piv);
          } else {
            n = run.length - x >= 2 && prox !== 'porta' ? 2 : 1;
            const janela = a.tipo === 'ext' && rnd() < (a.nivel ? 0.5 : 0.3);
            const pp = casa.parede[0] < 0.3 ? 'ParedePedra' : 'Parede';
            nome = janela ? pp + '_Janela_' + n : pp + '_' + n;
          }
          pilar(no, a.nivel, 'Pilar', casa);
        }
        M.naAresta(nome, a.lado, no, a.nivel, 0, 0, a.tipo === 'muro' ? 'base' : camada, a.tipo === 'muro' ? null : casa.tom, casa.parede);
        // pedrinhas soltas no pé das paredes de fora (não na frente da porta nem do lado da escada)
        const ladoEscada = casa.escada && casa.escada.lado === a.lado;
        if (a.tipo === 'ext' && a.nivel === 0 && !nome.endsWith('_Porta') && !ladoEscada) {
          // calçada de pedras chatas encostada na parede, e às vezes um montinho de pedrinhas
          for (let q = 0; q < n; q++) if (rnd() < 0.55) M.naAresta('Calcada_' + (1 + Math.floor(rnd() * 3)), a.lado, no, 0, q, 0, 'base');
          if (rnd() < 0.2) M.naAresta('Pedrisco_' + (1 + Math.floor(rnd() * 3)), a.lado, no, 0, 0.3 + rnd() * (n - 0.6), 1.1, 'base');
        }
        const fim = [no[0] + L.dir[0] * n, no[1] + L.dir[1] * n];
        pilar(fim, a.nivel, a.tipo === 'muro' ? 'Pilar_Patio' : a.tipo === 'mureta' ? 'Pilar_Mureta' : 'Pilar', casa);
        if (a.tipo !== 'mureta') M.colisao.push({ lado: a.lado, de: no, comp: n, nivel: a.nivel, altura: a.tipo === 'muro' ? 1.2 : H });
        x += n;
      }
    }
  }
  // cunhais (pedras de canto) nos cantos externos: nó com exatamente 1 das 4 células ocupada naquele andar
  const giro = { '0,-1': 0, '-1,-1': Math.PI / 2, '-1,0': Math.PI, '0,0': -Math.PI / 2 };
  for (const [nome, no, nivel, casa, tipo] of pilares.values()) {
    if (tipo !== 2) continue;
    const quad = [[0, -1], [-1, -1], [-1, 0], [0, 0]].filter(([dx, dz]) => ocup(cel(no[0] + dx, no[1] + dz), nivel));
    if (quad.length !== 1) continue;
    const dono = casas.get(cel(no[0] + quad[0][0], no[1] + quad[0][1]).casa);
    M.por('Cunhal', no[0], nivel * H, no[1], giro[quad[0].join(',')], nivel > 0 ? 'cima' : 'base', dono.tom, 1, dono.parede);
  }
  for (const k of semPilar) { const pp = pilares.get(k); if (pp && pp[0] === 'Pilar_Mureta') pilares.delete(k); }
  for (const [nome, no, nivel, casa] of pilares.values()) {
    M.por(nome, no[0], nivel * H, no[1], 0, nome === 'Pilar_Mureta' || nivel > 0 ? 'cima' : 'base', nome === 'Pilar_Patio' ? null : casa.tom, 1, casa.parede);
  }
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
  const casas = new Map([[1, { parede: [1.0, 0, 0.75], tom: [1, 0.99, 0.96],
    portas: [{ nivel: 0, lado: 'S', i: 1, k: 3 }, { nivel: 1, lado: 'W', i: 2, k: 0 }],
    escada: { lado: 'W', i: 0, k: 0 } }]]);
  const M = construir(kit, mapa, casas, rnd);
  M.por('Banco_Cama', 0.3, 0, 1.0, 0, 'base', null, 1, [1, 0, 0.3]);
  M.por('Mesa_Baixa', 2.2, 0, 2.2, 0.1);
  M.por('Candeia', 2.35, 0.355, 2.1, 0.5);
  M.por('Banquinho', 3.0, 0, 2.45, 0);
  M.por('Jarro_Grande', 4.35, 0, 0.6, 0);
  M.por('Cantaro', 3.85, 0, 3.55, 0);
  M.por('Cantaro', 0.55, 0, 2.9, 1);
  M.por('Bau', 2.5, 0, 0.55, 0); M.por('Bau_Tampa', 2.5, 0.42, 0.78, 0);
  M.por('Tear', 4.55, 0, 2.4, -Math.PI / 2);
  M.por('Esteira_Enrolada', 0.3, 0, 3.55, 0);
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
  if (rnd() < 0.5) for (let i = 0; i < 2; i++) for (let k = d; k < d + 2; k++) mapa.set(i + ',' + k, { casa: 1, andares: 1 });
  const casa = { parede: sorteiaVariante(rnd), tom: tomDaCasa(rnd), portas: [] };
  const sul = [...mapa.keys()].map((q) => q.split(',').map(Number)).filter(([i, k]) => !mapa.has(i + ',' + (k + 1)));
  const op = sul.filter(([i, k]) => mapa.has((i + 1) + ',' + k) && !mapa.has((i + 1) + ',' + (k + 1)));
  if (op.length) { const [i, k] = op[Math.floor(rnd() * op.length)]; casa.portas.push({ nivel: 0, lado: 'S', i, k }); }
  if (cima) casa.portas.push({ nivel: 1, lado: 'W', i: w - cw, k: 0 });
  let colW = 0; while (mapa.has('0,' + colW) && mapa.get('0,' + colW).andares === 1) colW++;
  if (colW >= 4) casa.escada = { lado: 'W', i: 0, k: 0 }; else casa.escadaMao = { lado: 'N', i: 0, k: 0 };
  const M = construir(kit, mapa, new Map([[1, casa]]), rnd);
  M.por('Mesa_Baixa', w / 2, 0, d / 2, rnd());
  M.por('Cama_Esteira', 0.4, 0, 2.2, 0);
  M.por('Jarro_Grande', w - 0.6, 0, d - 0.6, 0);
  return M.grupo();
}

// ------------------------------------------------------------------ quarteirão de fundo (casas geminadas)
export function quarteirao(kit, semente, W = 18, D = 14) {
  let s = (semente % 2147483646) + 1; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const lotes = [];
  (function divide(x, z, w, d) {
    const podeW = w >= 6, podeD = d >= 6;
    if ((!podeW && !podeD) || (w <= 5 && d <= 5 && rnd() < 0.5)) { lotes.push({ x, z, w, d }); return; }
    if (podeW && (!podeD || w > d || (w === d && rnd() < 0.5))) { const c = 3 + Math.floor(rnd() * (w - 5)); divide(x, z, c, d); divide(x + c, z, w - c, d); }
    else { const c = 3 + Math.floor(rnd() * (d - 5)); divide(x, z, w, c); divide(x, z + c, w, d - c); }
  })(0, 0, W, D);
  const interno = lotes.filter((l) => l.x > 0 && l.z > 0 && l.x + l.w < W && l.z + l.d < D);
  const patios = new Set();
  if (interno.length) patios.add(interno[Math.floor(rnd() * interno.length)]);
  const mapa = new Map(); const casas = new Map();
  lotes.forEach((l, id) => {
    if (patios.has(l)) { for (let i = l.x; i < l.x + l.w; i++) for (let k = l.z; k < l.z + l.d; k++) mapa.set(i + ',' + k, { patio: true }); return; }
    const r = rnd(); const and = r < 0.2 ? 2 : 1; const parcial = r >= 0.2 && r < 0.45;
    for (let i = l.x; i < l.x + l.w; i++) for (let k = l.z; k < l.z + l.d; k++) mapa.set(i + ',' + k, { casa: id + 1, andares: parcial && i < l.x + 2 && k < l.z + 2 ? 2 : and });
    casas.set(id + 1, { parede: sorteiaVariante(rnd), tom: tomDaCasa(rnd), portas: [], lote: l });
  });
  for (const [, casa] of casas) {
    const l = casa.lote; const ops = [];
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
  for (const [, casa] of casas) {
    const l = casa.lote; if (rnd() < 0.5) continue;
    const c = mapa.get(l.x + ',' + l.z); const y = c.andares * H + 0.2;
    if (rnd() < 0.4) M.por('Pedrisco_' + (1 + Math.floor(rnd() * 3)), l.x + l.w - 1.0, y - 0.2, l.z + l.d - 1.0, rnd() * 6, 'cima');
    // vida nos terraços: toldo colorido ou varal
    if (l.w >= 3 && l.d >= 3) {
      const r2 = rnd();
      if (r2 < 0.45) M.por(['Toldo', 'Toldo_Vermelho', 'Toldo_Azul', 'Toldo_Ocre'][Math.floor(rnd() * 4)], l.x + 0.5, y - 0.2, l.z + l.d - 0.5, rnd() < 0.5 ? 0 : Math.PI / 2, 'cima', null, 0.8);
      else if (r2 < 0.75) M.por('Varal', l.x + 0.5, y - 0.2, l.z + 1.2 + rnd(), 0, 'cima', null, Math.min(1, (l.w - 1) / 2.4));
    }
    if (rnd() < 0.5) M.por('Esteira_Enrolada', l.x + 0.5, y, l.z + 0.6, rnd() * 3, 'cima');
    else M.por('Jarro_Grande', l.x + 0.6, y, l.z + 0.6, 0, 'cima', casa.tom);
  }
  for (const p of patios) { M.por('Cantaro', p.x + 0.7, 0, p.z + 0.7, 0); M.por('Pedra_Solta_2', p.x + p.w - 0.8, 0, p.z + p.d - 0.8, 1); }
  const g = M.grupo(); g.userData.tamanho = [W, D];
  return g;
}

// ------------------------------------------------------------------ rua com becos (no lugar do quarteirão)
// Duas fileiras de casas frente a frente, com a rua calçada no meio. Entre os lotes, às vezes um beco de 2 m
// (com escada externa subindo pelo beco); senão as casas ficam geminadas. Portas sempre para a rua.
export function rua(kit, semente, W = 30) {
  let s = (semente % 2147483646) + 1; const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  const RUA0 = 7, RUA1 = 10;            // a rua ocupa z de 7 a 10
  const mapa = new Map(); const casas = new Map(); const becos = [];
  let id = 1;
  for (const lado of ['N', 'S']) {
    let x = 0;
    while (x < W - 2) {
      const w = Math.min(3 + Math.floor(rnd() * 3), W - x);
      if (w < 3) break;
      const d = 4 + Math.floor(rnd() * 3);
      const z0 = lado === 'N' ? RUA0 - d - Math.floor(rnd() * 2) * 0 : RUA1;
      const r = rnd(); const and = r < 0.25 ? 2 : 1; const parcial = r >= 0.25 && r < 0.55;
      for (let i = x; i < x + w; i++) for (let k = z0; k < z0 + d; k++) {
        const up = parcial && i >= x + w - 2 && (lado === 'N' ? k < z0 + 2 : k >= z0 + d - 2);
        mapa.set(i + ',' + k, { casa: id, andares: up ? 2 : and });
      }
      const casa = { parede: sorteiaVariante(rnd), tom: tomDaCasa(rnd), portas: [], lote: { x, z: z0, w, d } };
      const pi = x + Math.floor(rnd() * (w - 1));
      casa.portas.push(lado === 'N' ? { nivel: 0, lado: 'S', i: pi, k: z0 + d - 1 } : { nivel: 0, lado: 'N', i: pi + 1, k: z0 });
      casas.set(id, casa);
      id++;
      x += w;
      if (rnd() < 0.4 && x < W - 4) {             // beco
        becos.push({ x, lado }); x += 2;
      }
    }
  }
  // escada externa subindo pelo beco (lado oeste da casa logo depois do beco), se a coluna for térrea
  for (const [, casa] of casas) {
    const l = casa.lote;
    if (!becos.some((b) => b.x + 2 === l.x)) continue;
    let ok = l.d >= 4;
    for (let k = l.z; k < l.z + 4; k++) { const c = mapa.get(l.x + ',' + k); if (!c || c.andares !== 1) ok = false; }
    if (ok && rnd() < 0.8) casa.escada = { lado: 'W', i: l.x, k: l.z };
  }
  const M = construir(kit, mapa, casas, rnd);
  // calçamento da rua e entrada dos becos
  for (let i = 0; i < W; i++) for (let k = RUA0; k < RUA1; k++) M.por('Piso_Patio', i, 0, k + 1);
  for (const b of becos) {
    for (let i = b.x; i < b.x + 2; i++) for (let k = 0; k < 2; k++) {
      const kk = b.lado === 'N' ? RUA0 - 1 - k : RUA1 + k;
      if (rnd() < 0.7) M.por('Piso_Patio', i, 0, kk + 1);
    }
    if (rnd() < 0.6) M.por('Pedrisco_' + (1 + Math.floor(rnd() * 3)), b.x + 1, 0, b.lado === 'N' ? RUA0 - 3 : RUA1 + 3, rnd() * 6);
    if (rnd() < 0.5) M.por(rnd() < 0.5 ? 'Cantaro' : 'Jarro_Grande', b.x + 0.5, 0, b.lado === 'N' ? RUA0 - 1.6 : RUA1 + 1.6, 0);
  }
  // vida: toldos e varais nos terraços, jarros na porta
  for (const [, casa] of casas) {
    const l = casa.lote; const c = mapa.get(l.x + ',' + l.z); const y = c.andares * H + 0.2;
    const r2 = rnd();
    if (r2 < 0.4) M.por(['Toldo', 'Toldo_Vermelho', 'Toldo_Azul', 'Toldo_Ocre'][Math.floor(rnd() * 4)], l.x + 0.5, y - 0.2, l.z + l.d - 0.5, 0, 'cima', null, 0.8);
    else if (r2 < 0.7) M.por('Varal', l.x + 0.5, y - 0.2, l.z + 1.5, 0, 'cima', null, Math.min(1, (l.w - 1) / 2.4));
    else M.por('Esteira_Enrolada', l.x + 0.6, y - 0.2, l.z + 0.8, rnd() * 3, 'cima');
    if (rnd() < 0.5) {
      const p = casa.portas[0]; const zf = p.lado === 'S' ? RUA0 + 0.35 : RUA1 - 0.35;
      M.por(rnd() < 0.5 ? 'Cantaro' : 'Jarro_Grande', p.i + (p.lado === 'S' ? 1.8 : -0.8), 0, zf, rnd() * 3);
    }
  }
  const g = M.grupo(); g.userData.tamanho = [W, RUA1 + 6];
  return g;
}
