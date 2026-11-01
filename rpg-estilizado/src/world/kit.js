import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// Acumula peças de arquitetura por material e no fim junta tudo em poucas malhas (poucos draw calls).
// As UVs saem em metros/tamanho do ladrilho do material, então a textura tem a mesma escala em tudo.
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _s = new THREE.Vector3(1, 1, 1), _e = new THREE.Euler();

export class Kit {
  constructor(M, solids) { this.M = M; this.solids = solids; this.parts = new Map(); this.noShadow = new Set(['void', 'window', 'lit', 'water']); }
  push(mat, g) { if (!this.M[mat]) throw new Error('material ' + mat); (this.parts.get(mat) ?? this.parts.set(mat, []).get(mat)).push(g); }
  tile(mat) { return this.M[mat].userData.tile ?? 3; }

  // caixa com base em y0 e topo em y1, centro (x,z), largura w (x local), profundidade d (z local), giro rot
  box(mat, x, z, w, d, y0, y1, rot = 0, { solid = true, uv } = {}) {
    const h = y1 - y0; if (h <= 0 || w <= 0 || d <= 0) return;
    const g = new THREE.BoxGeometry(w, h, d);
    const T = this.tile(mat), uvA = g.attributes.uv;
    if (T > 0) {
      const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
      const off = ((x * 0.37 + z * 0.61) % 7) / T, offY = y0 / T;
      for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++) {
        const i = f * 4 + k;
        uvA.setXY(i, uvA.getX(i) * dims[f][0] / T + off, uvA.getY(i) * dims[f][1] / T + (f < 2 || f > 3 ? offY : 0));
      }
    } else if (uv) { for (let i = 0; i < uvA.count; i++) uvA.setXY(i, uv[0] + uvA.getX(i) * uv[2], uv[1] + uvA.getY(i) * uv[3]); }
    _m.compose(_v.set(x, (y0 + y1) / 2, z), _q.setFromEuler(_e.set(0, rot, 0)), _s.set(1, 1, 1));
    g.applyMatrix4(_m);
    this.push(mat, g);
    if (solid && this.solids) this.solids.add({ x, z, hx: w / 2, hz: d / 2, rot, y0, y1 });
  }
  // cilindro (colunas, torres redondas), r0 embaixo, r1 em cima
  cyl(mat, x, z, r0, y0, y1, { r1 = r0, seg = 12, solid = true, open = false } = {}) {
    const h = y1 - y0, g = new THREE.CylinderGeometry(r1, r0, h, seg, 1, open);
    const T = this.tile(mat), uvA = g.attributes.uv;
    if (T > 0) for (let i = 0; i < uvA.count; i++) uvA.setXY(i, uvA.getX(i) * (2 * Math.PI * Math.max(r0, r1)) / T, uvA.getY(i) * h / T);
    g.translate(x, (y0 + y1) / 2, z);
    this.push(mat, g);
    if (solid && this.solids) this.solids.add({ x, z, hx: r0 * 0.85, hz: r0 * 0.85, rot: 0, y0, y1 });
  }
  // geometria qualquer, já com UV, posicionada por matriz
  geom(mat, g, matrix) { if (matrix) g.applyMatrix4(matrix); this.push(mat, g.index ? g : indexify(g)); }

  // escada reta: n degraus subindo na direção "rot" (local +z), largura w, de baseY até topY
  stairs(mat, x, z, w, run, baseY, topY, rot = 0, { n } = {}) {
    const steps = n ?? Math.max(2, Math.round((topY - baseY) / 0.3));
    const rise = (topY - baseY) / steps, len = run / steps;
    const c = Math.cos(rot), s = Math.sin(rot);
    for (let i = 0; i < steps; i++) {
      const lz = -run / 2 + len * (i + 0.5);
      this.box(mat, x + s * lz, z + c * lz, w, len + 0.02, baseY - 0.6, baseY + rise * (i + 1), rot);
    }
  }

  finish(scene, { shadows = true } = {}) {
    const meshes = {};
    for (const [mat, list] of this.parts) {
      const geo = mergeGeometries(list.map((g) => (g.index ? g : indexify(g))), false);
      list.forEach((g) => g.dispose());
      if (!geo) continue;
      geo.computeBoundingSphere();
      const mesh = new THREE.Mesh(geo, this.M[mat]);
      mesh.castShadow = shadows && !this.noShadow.has(mat);
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false; mesh.updateMatrix();
      scene.add(mesh); meshes[mat] = mesh;
    }
    this.parts.clear();
    return meshes;
  }
}
function indexify(g) {
  const n = g.attributes.position.count, idx = new Array(n); for (let i = 0; i < n; i++) idx[i] = i;
  g.setIndex(idx); return g;
}
