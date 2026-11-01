import * as THREE from 'three';

// Conjuntos PBR (Poly Haven, CC0) convertidos para WebP: diff (cor), nor (normal), arm (AO/rugosidade/metal)
const SETS = {
  ashlar: ['large_sandstone_blocks_01', 4.0, 0xf0dfc0],     // muros herodianos da plataforma
  temple: ['white_sandstone_blocks_02', 3.0, 0xfff7ea],     // muros do recinto do Templo
  walls: ['white_sandstone_bricks', 3.0, 0xead6b4],         // muralhas da cidade, torres
  marble: ['marble_01', 3.0, 0xffffff],                     // santuário
  plaster: ['white_plaster_rough_01', 3.0, 0xf1e7d6],       // casas caiadas
  plasterWarm: ['plastered_stone_wall', 3.5, 0xe3cfb0],     // casas de pedra rebocada
  clay: ['clay_plaster', 3.0, 0xd8b896],                    // casas da aldeia
  paving: ['white_sandstone_blocks_02', 2.4, 0xf6ead6],     // pátios do Templo (lajes claras)
  rock: ['rock_wall_08', 4.0, 0xd6c3a5],                    // pedras empilhadas (altar, monumentos)
  cliff: ['cliff_side', 7.0, 0xc9cbd2],                    // rocha natural: Gólgota, sepulcro, rochedos
  wood: ['medieval_wood', 2.0, 0xc9a27a],
  field: ['dry_ground_rocks', 5.0, 0xffffff],
};

function canvasTex(w, h, draw, srgb = true) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// véu do Templo: azul, púrpura, escarlate e linho, com bordados geométricos (querubins estilizados)
function veilTex() {
  return canvasTex(256, 512, (x, w, h) => {
    const bands = ['#2c3f8f', '#6b2a6e', '#a8242a', '#efe6d0', '#a8242a', '#6b2a6e', '#2c3f8f'];
    bands.forEach((c, i) => { x.fillStyle = c; x.fillRect(0, (i / bands.length) * h, w, h / bands.length + 1); });
    x.strokeStyle = '#e4c063'; x.lineWidth = 2;
    for (let j = 0; j < bands.length; j++) for (let i = 0; i < 4; i++) {
      const cx = (i + 0.5) * w / 4, cy = (j + 0.5) * h / bands.length, r = 14;
      x.beginPath(); x.moveTo(cx, cy - r); x.lineTo(cx + r, cy); x.lineTo(cx, cy + r); x.lineTo(cx - r, cy); x.closePath(); x.stroke();
      x.beginPath(); x.arc(cx, cy, 4, 0, 7); x.stroke();
    }
    const img = x.getImageData(0, 0, w, h);
    for (let i = 0; i < img.data.length; i += 4) { const n = (rnd() - 0.5) * 18; img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n; }
    x.putImageData(img, 0, 0);
  });
}
// ouro martelado: normal com pequenas marcas
function hammeredNormal() {
  return canvasTex(128, 128, (x, w, h) => {
    const img = x.createImageData(w, h);
    const bumps = Array.from({ length: 60 }, () => [rnd() * w, rnd() * h, 4 + rnd() * 8]);
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
      let nx = 0, ny = 0;
      for (const [bx, by, r] of bumps) {
        let dx = i - bx, dy = j - by; dx -= Math.round(dx / w) * w; dy -= Math.round(dy / h) * h;
        const d = Math.hypot(dx, dy); if (d < r) { nx += dx / r * (1 - d / r); ny += dy / r * (1 - d / r); }
      }
      const o = (j * w + i) * 4; img.data[o] = 128 + nx * 60; img.data[o + 1] = 128 + ny * 60; img.data[o + 2] = 230; img.data[o + 3] = 255;
    }
    x.putImageData(img, 0, 0);
  }, false);
}
// toldos/tecidos de feira: listras em várias cores (escolhidas pelo deslocamento de UV)
function awningTex() {
  return canvasTex(256, 64, (x, w, h) => {
    const sets = [['#b8432e', '#e8d4a8'], ['#2f5e8e', '#e8d4a8'], ['#c08a2e', '#7a3b1f'], ['#5b7d3a', '#e8d4a8']];
    sets.forEach((pair, s) => { for (let i = 0; i < 8; i++) { x.fillStyle = pair[i % 2]; x.fillRect(s * 64 + i * 8, 0, 8, h); } });
  });
}

export async function loadMaterials(texLoader, { anisotropy = 8 } = {}) {
  const load = (p, srgb) => texLoader.loadAsync(p).then((t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = anisotropy;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
  const M = {};
  await Promise.all(Object.entries(SETS).map(async ([key, [dir, tile, tint]]) => {
    const [map, nor, arm] = await Promise.all([load(`assets/tex/${dir}/diff.webp`, true), load(`assets/tex/${dir}/nor.webp`), load(`assets/tex/${dir}/arm.webp`)]);
    M[key] = new THREE.MeshStandardMaterial({ map, normalMap: nor, roughnessMap: arm, aoMap: arm, aoMapIntensity: 0.8, color: tint, roughness: 1, metalness: 0 });
    M[key].userData.tile = tile;
  }));
  // texturas extras do chão
  const ground = {};
  for (const [k, dir] of [['grass', 'aerial_grass_rock'], ['dry', 'dry_ground_rocks'], ['road', 'rocky_trail'], ['pave', 'cobblestone_floor_01'], ['rock', 'cliff_side']]) {
    ground[k] = await load(`assets/tex/${dir}/diff.webp`, true);
  }
  ground.grassN = await load('assets/tex/aerial_grass_rock/nor.webp');

  const ham = hammeredNormal();
  M.gold = new THREE.MeshStandardMaterial({ color: 0xf2b23c, metalness: 1, roughness: 0.34, normalMap: ham, normalScale: new THREE.Vector2(0.15, 0.15), envMapIntensity: 0.9, emissive: 0x4a2a06, emissiveIntensity: 0.6 });
  M.gold.userData.tile = 3;
  M.bronze = new THREE.MeshStandardMaterial({ color: 0xb07a3e, metalness: 0.85, roughness: 0.42, normalMap: ham, normalScale: new THREE.Vector2(0.12, 0.12), emissive: 0x2a1406, emissiveIntensity: 0.5 });
  M.bronze.userData.tile = 4;
  M.veil = new THREE.MeshStandardMaterial({ map: veilTex(), roughness: 0.85, side: THREE.DoubleSide });
  M.veil.userData.tile = 0; // UV 0..1 por face
  M.void = new THREE.MeshBasicMaterial({ color: 0x0e0906 });
  M.void.userData.tile = 1;
  M.window = new THREE.MeshStandardMaterial({ color: 0x2a1a0e, emissive: 0xffa040, emissiveIntensity: 0, roughness: 1 });
  M.window.userData.tile = 1;
  M.lit = new THREE.MeshStandardMaterial({ color: 0x3a2412, emissive: 0xffa548, emissiveIntensity: 1.6, roughness: 1 });
  M.lit.userData.tile = 1;
  M.awning = new THREE.MeshStandardMaterial({ map: awningTex(), roughness: 0.9, side: THREE.DoubleSide });
  M.awning.userData.tile = 0;
  M.linen = new THREE.MeshStandardMaterial({ color: 0xf2ead8, roughness: 0.9 });
  M.linen.userData.tile = 1;
  M.darkWood = M.wood.clone(); M.darkWood.color = new THREE.Color(0x6b4a30); M.darkWood.userData.tile = 2;
  M.roof = M.plaster.clone(); M.roof.color = new THREE.Color(0xd9c7a8); M.roof.userData.tile = 3;
  M.stoneDark = M.walls.clone(); M.stoneDark.color = new THREE.Color(0xb59e7c); M.stoneDark.userData.tile = 3;
  M.fieldStone = M.rock.clone(); M.fieldStone.color = new THREE.Color(0xf2e2c6); M.fieldStone.userData.tile = 2.5;
  M.water = new THREE.MeshPhysicalMaterial({ color: 0x4a8a9c, roughness: 0.18, metalness: 0, transparent: true, opacity: 0.85, clearcoat: 0.5, envMapIntensity: 0.7 });
  return { M, ground };
}
