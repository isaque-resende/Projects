// Entrada unificada: teclado + mouse no desktop; joystick virtual + botões + arrastar no celular.
export function makeInput(canvas, touch) {
  const keys = new Set();
  let jumpQ = false, kneelQ = false, runHeld = false;
  const look = { x: 0, y: 0 }; let zoom = 0;

  addEventListener('keydown', (e) => {
    keys.add(e.code);
    if (e.code === 'Space') { jumpQ = true; e.preventDefault(); }
    if (e.code === 'KeyF' || e.code === 'KeyK') kneelQ = true;
  });
  addEventListener('keyup', (e) => keys.delete(e.code));
  addEventListener('blur', () => keys.clear());

  // arrastar para girar a câmera (mouse ou dedo fora do joystick/botões)
  const drags = new Map();
  canvas.addEventListener('pointerdown', (e) => {
    drags.set(e.pointerId, { x: e.clientX, y: e.clientY });
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', (e) => {
    const d = drags.get(e.pointerId); if (!d) return;
    const k = e.pointerType === 'mouse' ? 0.005 : 0.0065;
    look.x += (e.clientX - d.x) * k; look.y += (e.clientY - d.y) * k;
    d.x = e.clientX; d.y = e.clientY;
  });
  const end = (e) => drags.delete(e.pointerId);
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('wheel', (e) => { zoom += Math.sign(e.deltaY) * 0.8; e.preventDefault(); }, { passive: false });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  // joystick virtual
  const stickV = { x: 0, y: 0 };
  if (touch) {
    const stick = document.querySelector('#stick'), knob = document.querySelector('#knob');
    let sid = null, cx = 0, cy = 0; const R = 52;
    const setKnob = (dx, dy) => { knob.style.transform = `translate(${dx}px,${dy}px)`; };
    stick.addEventListener('pointerdown', (e) => {
      sid = e.pointerId; stick.setPointerCapture(sid);
      const b = stick.getBoundingClientRect(); cx = b.left + b.width / 2; cy = b.top + b.height / 2;
    });
    stick.addEventListener('pointermove', (e) => {
      if (e.pointerId !== sid) return;
      let dx = e.clientX - cx, dy = e.clientY - cy; const m = Math.hypot(dx, dy);
      if (m > R) { dx = dx / m * R; dy = dy / m * R; }
      setKnob(dx, dy); stickV.x = dx / R; stickV.y = -dy / R;
    });
    const up = (e) => { if (e.pointerId !== sid) return; sid = null; stickV.x = stickV.y = 0; setKnob(0, 0); };
    stick.addEventListener('pointerup', up); stick.addEventListener('pointercancel', up);

    const press = (id, on, off) => {
      const el = document.querySelector(id);
      el.addEventListener('pointerdown', (e) => { e.stopPropagation(); on(el); });
      if (off) { el.addEventListener('pointerup', () => off(el)); el.addEventListener('pointercancel', () => off(el)); }
    };
    press('#bJump', () => { jumpQ = true; });
    press('#bKneel', () => { kneelQ = true; });
    let runToggle = false;
    press('#bRun', (el) => { runToggle = !runToggle; runHeld = runToggle; el.classList.toggle('on', runToggle); });
  }

  return {
    poll() {
      let ix = stickV.x, iy = stickV.y;
      if (keys.has('KeyA') || keys.has('ArrowLeft')) ix -= 1;
      if (keys.has('KeyD') || keys.has('ArrowRight')) ix += 1;
      if (keys.has('KeyW') || keys.has('ArrowUp')) iy += 1;
      if (keys.has('KeyS') || keys.has('ArrowDown')) iy -= 1;
      const out = {
        ix, iy,
        run: keys.has('ShiftLeft') || keys.has('ShiftRight') || runHeld,
        jump: jumpQ, kneel: kneelQ,
        look: { x: look.x, y: look.y }, zoom,
      };
      jumpQ = kneelQ = false; look.x = look.y = 0; zoom = 0;
      return out;
    },
  };
}
