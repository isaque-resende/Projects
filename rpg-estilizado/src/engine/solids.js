// Mundo de colisão: caixas orientadas (giradas em Y) com base y0 e topo y1.
// Uma caixa cujo topo está abaixo de "pé + degrau" vira chão (dá para subir escadas e plataformas);
// acima disso, bloqueia. Isso cobre muralhas, casas, escadas, a plataforma do Templo e o interior da tumba.

export const STEP = 0.55;      // altura máxima de degrau que o jogador sobe sem pular
export const BODY_H = 1.75;    // altura do corpo (para tetos/vãos)

export class Solids {
  constructor(heightAt, cell = 10) {
    this.heightAt = heightAt;
    this.cell = cell;
    this.grid = new Map();
    this.list = [];
    this.stamp = 0;
  }
  key(cx, cz) { return cx * 65536 + cz; }
  // b: { x, z, hx, hz, rot, y0, y1, rampAxis?: 'x'|'z', rampA?, rampB? }
  add(b) {
    b.cos = Math.cos(b.rot || 0); b.sin = Math.sin(b.rot || 0); b.mark = 0;
    const R = Math.hypot(b.hx, b.hz);
    const x0 = Math.floor((b.x - R) / this.cell), x1 = Math.floor((b.x + R) / this.cell);
    const z0 = Math.floor((b.z - R) / this.cell), z1 = Math.floor((b.z + R) / this.cell);
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) {
      const k = this.key(i, j); (this.grid.get(k) ?? this.grid.set(k, []).get(k)).push(b);
    }
    this.list.push(b);
    return b;
  }
  local(b, x, z) {
    const dx = x - b.x, dz = z - b.z;
    return [b.cos * dx - b.sin * dz, b.sin * dx + b.cos * dz];
  }
  top(b, lx, lz) {
    if (!b.rampAxis) return b.y1;
    const t = b.rampAxis === 'x' ? (lx / b.hx + 1) / 2 : (lz / b.hz + 1) / 2;
    return b.rampA + (b.rampB - b.rampA) * Math.min(1, Math.max(0, t));
  }
  near(x, z, r, fn) {
    const s = ++this.stamp;
    const x0 = Math.floor((x - r) / this.cell), x1 = Math.floor((x + r) / this.cell);
    const z0 = Math.floor((z - r) / this.cell), z1 = Math.floor((z + r) / this.cell);
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) {
      const list = this.grid.get(this.key(i, j)); if (!list) continue;
      for (const b of list) { if (b.mark === s) continue; b.mark = s; fn(b); }
    }
  }
  // chão sob o ponto, considerando só o que dá para "pisar" a partir da altura dos pés
  groundAt(x, z, feetY = Infinity, step = STEP) {
    let h = this.heightAt(x, z);
    this.near(x, z, 0, (b) => {
      const [lx, lz] = this.local(b, x, z);
      if (Math.abs(lx) > b.hx || Math.abs(lz) > b.hz) return;
      const t = this.top(b, lx, lz);
      if (t <= feetY + step && t > h) h = t;
    });
    return h;
  }
  // empurra um círculo (raio r) para fora das caixas que bloqueiam nessa altura
  resolve(x, z, feetY, r) {
    for (let it = 0; it < 3; it++) {
      let moved = false;
      this.near(x, z, r + 1, (b) => {
        const [lx, lz] = this.local(b, x, z);
        if (Math.abs(lx) > b.hx + r || Math.abs(lz) > b.hz + r) return;
        const t = this.top(b, Math.max(-b.hx, Math.min(b.hx, lx)), Math.max(-b.hz, Math.min(b.hz, lz)));
        if (t <= feetY + STEP || b.y0 >= feetY + BODY_H) return; // pisável ou acima da cabeça
        const cx = Math.max(-b.hx, Math.min(b.hx, lx)), cz = Math.max(-b.hz, Math.min(b.hz, lz));
        let dx = lx - cx, dz = lz - cz, d = Math.hypot(dx, dz);
        let nlx = lx, nlz = lz;
        if (d > 1e-5) { if (d >= r) return; nlx = cx + dx / d * r; nlz = cz + dz / d * r; }
        else { // centro dentro: sai pelo lado mais próximo
          const px = b.hx - Math.abs(lx), pz = b.hz - Math.abs(lz);
          if (px < pz) nlx = Math.sign(lx || 1) * (b.hx + r); else nlz = Math.sign(lz || 1) * (b.hz + r);
        }
        // volta para o mundo
        x = b.x + b.cos * nlx + b.sin * nlz; z = b.z - b.sin * nlx + b.cos * nlz;
        moved = true;
      });
      if (!moved) break;
    }
    return [x, z];
  }
  // ponto "dentro de algo sólido" (para a câmera não atravessar paredes)
  blocked(x, y, z) {
    if (y < this.heightAt(x, z) + 0.25) return true;
    let hit = false;
    this.near(x, z, 0, (b) => {
      if (hit) return;
      const [lx, lz] = this.local(b, x, z);
      if (Math.abs(lx) > b.hx || Math.abs(lz) > b.hz) return;
      if (y > b.y0 && y < this.top(b, lx, lz) + 0.2) hit = true;
    });
    return hit;
  }
}
