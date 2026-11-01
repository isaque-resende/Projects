import * as THREE from 'three';
import { clone as skClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { heightAt, waterNormal } from './terrain.js';
import { ROADS, VILLAGE, TM } from './layout.js';

let rs = 777; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

// ---------------- animais ----------------
export function makeAnimals(scene, { sheepGltf, donkeyGltf }, extras, solids) {
  const updaters = [];
  // ovelhas: no aprisco e um pequeno rebanho pastando na encosta
  const sheepBase = sheepGltf.scene;
  const box = new THREE.Box3().setFromObject(sheepBase), size = box.getSize(new THREE.Vector3());
  const k = 1.15 / Math.max(size.x, size.z);
  sheepBase.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.material = o.material.clone(); o.material.roughness = 0.95; if (o.material.color.r > 0.3) o.material.color.setRGB(0.93, 0.9, 0.84); } });
  const flocks = [...extras.pens.map((p) => ({ ...p, n: 12 })), { x: 70, z: 200, r: 14, n: 14 }, { x: -120, z: -175, r: 12, n: 9 }];
  const parts = []; sheepBase.updateMatrixWorld(true); sheepBase.traverse((o) => { if (o.isMesh) parts.push(o); });
  const flock = [];
  for (const f of flocks) for (let i = 0; i < f.n; i++) {
    const a = rnd() * 6.28, r = Math.sqrt(rnd()) * f.r, x = f.x + Math.cos(a) * r, z = f.z + Math.sin(a) * r, s = k * (0.85 + rnd() * 0.3);
    flock.push({ x, z, s, y: heightAt(x, z) - box.min.y * s, rot: rnd() * 6.28, ph: rnd() * 10 });
  }
  const ims = parts.map((o) => { const im = new THREE.InstancedMesh(o.geometry, o.material, flock.length); im.castShadow = true; im.receiveShadow = true; im.frustumCulled = false; scene.add(im); return { im, local: o.matrixWorld.clone() }; });
  const sm = new THREE.Matrix4(), sq = new THREE.Quaternion(), se = new THREE.Euler(), sv = new THREE.Vector3(), ss3 = new THREE.Vector3(), out = new THREE.Matrix4();
  let tick = 0;
  updaters.push((t) => { // pastando: abaixa e levanta, gira devagar (atualiza a cada 2 quadros)
    if (tick++ % 2) return;
    flock.forEach((sh, i) => {
      const g = Math.max(0, Math.sin(t * 0.5 + sh.ph));
      sm.compose(sv.set(sh.x, sh.y - g * 0.04, sh.z), sq.setFromEuler(se.set(g * 0.12, sh.rot + Math.sin(t * 0.07 + sh.ph) * 0.4, 0)), ss3.set(sh.s, sh.s, sh.s));
      for (const { im, local } of ims) im.setMatrixAt(i, out.multiplyMatrices(sm, local));
    });
    for (const { im } of ims) im.instanceMatrix.needsUpdate = true;
  });
  // jumentos: dois amarrados na aldeia (comendo) e um andando pela estrada
  const clips = Object.fromEntries(donkeyGltf.animations.map((c) => [c.name, c]));
  const dBox = new THREE.Box3().setFromObject(donkeyGltf.scene), dk = 1.35 / dBox.getSize(new THREE.Vector3()).y;
  const mkDonkey = () => { const d = skClone(donkeyGltf.scene); d.scale.setScalar(dk); d.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; } }); scene.add(d); return d; };
  for (const [x, z, anim] of [[VILLAGE.x + 4, VILLAGE.z + 13, 'Eating'], [VILLAGE.x + 13, VILLAGE.z - 9, 'Idle_Headlow'], [-86, -96, 'Idle']]) {
    const d = mkDonkey(); d.position.set(x, heightAt(x, z), z); d.rotation.y = rnd() * 6.28;
    const mx = new THREE.AnimationMixer(d); mx.clipAction(clips[anim] || donkeyGltf.animations[0]).play(); mx.update(rnd() * 3);
    updaters.push((t, dt) => mx.update(dt));
  }
  {
    const road = ROADS[3].pts, d = mkDonkey(), mx = new THREE.AnimationMixer(d);
    mx.clipAction(clips.Walk).play();
    const L = []; let tot = 0; for (let i = 0; i < road.length - 1; i++) { const l = Math.hypot(road[i + 1][0] - road[i][0], road[i + 1][1] - road[i][1]); L.push(l); tot += l; }
    let s = 30, dir = 1;
    updaters.push((t, dt) => {
      mx.update(dt); s += dir * dt * 1.1; if (s > tot - 2) { s = tot - 2; dir = -1; } else if (s < 2) { s = 2; dir = 1; } // sem inverter a cada quadro
      let u = s, i = 0; while (i < L.length - 1 && u > L[i]) { u -= L[i]; i++; }
      const [ax, az] = road[i], [bx, bz] = road[i + 1], f = u / L[i], x = ax + (bx - ax) * f + 1.2, z = az + (bz - az) * f;
      d.position.set(x, heightAt(x, z), z); d.rotation.y = Math.atan2((bx - ax) * dir, (bz - az) * dir);
    });
  }
  // pombas circulando sobre o Templo (asas batendo)
  {
    const N = 26, g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0.18, -0.45, 0.05, -0.05, 0, 0, -0.12, 0, 0, 0.18, 0.45, 0.05, -0.05, 0, 0, -0.12], 3));
    g.computeVertexNormals();
    const im = new THREE.InstancedMesh(g, new THREE.MeshStandardMaterial({ color: 0xf2efe8, side: THREE.DoubleSide, roughness: 0.8 }), N);
    im.frustumCulled = false; scene.add(im);
    const birds = Array.from({ length: N }, () => ({ r: 25 + rnd() * 35, h: TM.y + 30 + rnd() * 25, sp: 0.15 + rnd() * 0.12, ph: rnd() * 6.28, f: 6 + rnd() * 4 }));
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
    updaters.push((t) => {
      birds.forEach((b, i) => {
        const a = t * b.sp + b.ph, x = 30 + Math.cos(a) * b.r, z = -8 + Math.sin(a) * b.r * 0.8, y = b.h + Math.sin(t * 0.7 + b.ph) * 3;
        const flap = Math.sin(t * b.f + b.ph);
        m.compose(v.set(x, y, z), q.setFromEuler(e.set(0, -a, flap * 0.05)), sc.set(1.6, 1 + flap * 2.2, 1.6));
        im.setMatrixAt(i, m);
      });
      im.instanceMatrix.needsUpdate = true;
    });
  }
  return (t, dt) => updaters.forEach((u) => u(t, dt));
}

// ---------------- fogo, fumaça, água, luzes ----------------
function spriteTex(stops) {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  stops.forEach(([o, col]) => g.addColorStop(o, col)); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
export function makeEffects(scene, extras, M) {
  const ups = [];
  // chamas: pontos aditivos que tremulam
  if (extras.flames.length) {
    const per = 7, N = extras.flames.length * per, pos = new Float32Array(N * 3), seeds = new Float32Array(N), sizes = new Float32Array(N);
    extras.flames.forEach(([x, y, z, s], i) => { for (let k = 0; k < per; k++) { const j = i * per + k; pos.set([x + (rnd() - .5) * s * .5, y, z + (rnd() - .5) * s * .5], j * 3); seeds[j] = rnd() * 10; sizes[j] = s * (2.4 + rnd() * 1.6); } });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1)); g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uTex: { value: spriteTex([[0, '#fff6d0'], [0.25, '#ffc050'], [0.6, 'rgba(255,90,20,.55)'], [1, 'rgba(255,40,0,0)']]) } },
      vertexShader: `attribute float aSeed; attribute float aSize; uniform float uTime; varying float vA;
        void main(){ float t = fract(uTime * (.9 + fract(aSeed) * .6) + aSeed);
          vec3 p = position + vec3(sin(aSeed*7. + uTime*3.)*.08, t * aSize * .35, cos(aSeed*5. + uTime*2.)*.08);
          vA = (1. - t) * smoothstep(0., .15, t);
          vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = aSize * (1. - t * .6) * 220. / -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: 'uniform sampler2D uTex; varying float vA; void main(){ vec4 c = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(c.rgb * 2.2, c.a * vA); }',
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const pts = new THREE.Points(g, mat); pts.frustumCulled = false; scene.add(pts);
    ups.push((t) => { mat.uniforms.uTime.value = t; });
  }
  // fumaça: sprites subindo, se abrindo e sumindo
  if (extras.smoke.length) {
    const per = 10, N = extras.smoke.length * per, pos = new Float32Array(N * 3), seeds = new Float32Array(N);
    extras.smoke.forEach(([x, y, z], i) => { for (let k = 0; k < per; k++) { const j = i * per + k; pos.set([x, y, z], j * 3); seeds[j] = k / per + rnd() * 0.05; } });
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uTex: { value: spriteTex([[0, 'rgba(235,225,215,.55)'], [0.6, 'rgba(210,200,195,.22)'], [1, 'rgba(200,190,190,0)']]) } },
      vertexShader: `attribute float aSeed; uniform float uTime; varying float vA;
        void main(){ float t = fract(uTime * .07 + aSeed);
          vec3 p = position + vec3(t * 5. + sin(t * 6. + aSeed * 20.) * .6, t * 16., t * 2.);
          vA = (1. - t) * smoothstep(0., .1, t);
          vec4 mv = modelViewMatrix * vec4(p, 1.); gl_PointSize = (2. + t * 9.) * 260. / -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: 'uniform sampler2D uTex; varying float vA; void main(){ vec4 c = texture2D(uTex, gl_PointCoord); gl_FragColor = vec4(c.rgb, c.a * vA * .8); }',
      transparent: true, depthWrite: false, fog: false,
    });
    const pts = new THREE.Points(g, mat); pts.frustumCulled = false; scene.add(pts);
    ups.push((t) => { mat.uniforms.uTime.value = t; });
  }
  // espelhos d'água (tanques, cocho)
  const wn = waterNormal(2);
  for (const [x, z, w, d, y] of extras.pools) {
    const m = M.water.clone(); m.normalMap = wn; m.normalScale = new THREE.Vector2(0.3, 0.3);
    const p = new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), m); p.position.set(x, y, z); p.receiveShadow = true; scene.add(p);
  }
  ups.push((t) => { wn.offset.set(t * 0.02, t * 0.013); });
  // luzes pontuais (poucas: altar e sepulcro)
  for (const [x, y, z, color, dist, intensity = 1] of extras.lights) {
    const l = new THREE.PointLight(color, 40 * intensity, dist, 1.6); l.position.set(x, y, z); scene.add(l);
    const base = l.intensity;
    ups.push((t) => { l.intensity = base * (0.85 + Math.sin(t * 9 + x) * 0.08 + Math.sin(t * 23 + z) * 0.07); });
  }
  return (t) => ups.forEach((u) => u(t));
}
