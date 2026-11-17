// Motor comum: teclado, toque na tela, pinça/roda para o zoom, direcional virtual e botão de pular.
// Lê e escreve no estado E da fase: E.alvoToque, E.distAlvo, E.fora, E.jogVy, E.jogNoChao.

//   dom: o canvas do jogo · E: o estado da fase · zoom(): devolve [mínimo, máximo] da distância da câmera
// Depois de criar, a fase liga as ações: ctl.aoAcionar = () => ... e ctl.aoToque = (evento) => ...
export function criaControles({ dom, E, zoom }) {
  const ctl = { aoAcionar: () => {}, aoToque: () => {} };
  const limita = (d) => { const [a, b] = zoom(); return Math.min(b, Math.max(a, d)); };
  const acionar = () => ctl.aoAcionar();

  // ---------- teclado e roda do mouse ----------
  const tecla = {};
  addEventListener('keydown', (e) => { tecla[e.code] = true; if (e.code === 'KeyE') acionar(); });
  addEventListener('keyup', (e) => { tecla[e.code] = false; });
  addEventListener('wheel', (e) => { E.distAlvo = limita(E.distAlvo * (e.deltaY > 0 ? 1.1 : 0.9)); }, { passive: true });

  // ---------- toque na tela: um dedo toca (anda até lá ou aciona), dois dedos fazem pinça ----------
  const toques = new Map(); let pinca0 = 0, dist0 = 0, arrastou = false;
  dom.addEventListener('pointerdown', (e) => {
    toques.set(e.pointerId, [e.clientX, e.clientY]); arrastou = false;
    if (toques.size === 2) { const [a, b] = [...toques.values()]; pinca0 = Math.hypot(a[0] - b[0], a[1] - b[1]); dist0 = E.distAlvo; }
  });
  dom.addEventListener('pointermove', (e) => {
    if (!toques.has(e.pointerId)) return; toques.set(e.pointerId, [e.clientX, e.clientY]);
    if (toques.size === 2) { const [a, b] = [...toques.values()]; E.distAlvo = limita(dist0 * pinca0 / Math.max(20, Math.hypot(a[0] - b[0], a[1] - b[1]))); arrastou = true; }
  });
  dom.addEventListener('pointerup', (e) => { if (toques.size === 1 && !arrastou) ctl.aoToque(e); toques.delete(e.pointerId); });
  dom.addEventListener('pointercancel', (e) => toques.delete(e.pointerId));

  // ---------- direcional virtual (canto esquerdo de baixo) ----------
  const JOY = { on: false, x: 0, y: 0, id: null };
  {
    const base = document.createElement('div'), pino = document.createElement('div');
    Object.assign(base.style, { position: 'fixed', left: '22px', bottom: 'calc(22px + env(safe-area-inset-bottom))', width: '120px', height: '120px', borderRadius: '50%', background: '#fdf6e355', border: '2px solid #fdf6e3aa', touchAction: 'none', zIndex: 4 });
    Object.assign(pino.style, { position: 'absolute', left: '35px', top: '35px', width: '50px', height: '50px', borderRadius: '50%', background: '#fdf6e3', boxShadow: '0 2px 8px #0003', pointerEvents: 'none' });
    base.id = 'joy'; base.appendChild(pino); document.body.appendChild(base);
    const move = (e) => {
      const r = base.getBoundingClientRect(); let x = (e.clientX - r.left - 60) / 50, y = (e.clientY - r.top - 60) / 50;
      const l = Math.hypot(x, y); if (l > 1) { x /= l; y /= l; }
      JOY.x = x; JOY.y = y; JOY.max = Math.max(JOY.max || 0, Math.hypot(x, y)); pino.style.left = 35 + x * 40 + 'px'; pino.style.top = 35 + y * 40 + 'px';
    };
    base.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); JOY.on = true; JOY.id = e.pointerId; JOY.t0 = performance.now(); JOY.max = 0; base.setPointerCapture(e.pointerId); E.alvoToque = null; move(e); JOY.max = 0; });
    base.addEventListener('pointermove', (e) => { if (JOY.on && e.pointerId === JOY.id) move(e); });
    // toque curto no círculo, sem arrastar = apertar o botão do direcional (abre a porta, rola a pedra, entra, sai)
    const fim = (e) => { if (e.pointerId !== JOY.id) return; const curto = performance.now() - JOY.t0 < 350 && (JOY.max || 0) < 0.45; JOY.on = false; JOY.x = JOY.y = 0; pino.style.left = '35px'; pino.style.top = '35px'; if (curto) acionar(); };
    JOY.pino = pino; JOY.base = base;
    base.addEventListener('pointerup', fim); base.addEventListener('pointercancel', fim);
  }
  // escreve no pino do direcional o que o toque curto vai fazer ('' = nada)
  const marcaPino = (s) => { const p = JOY.pino; if (!p || p.dataset.s === s) return; p.dataset.s = s; p.textContent = s;
    Object.assign(p.style, { background: s ? '#f1c24b' : '#fdf6e3', color: '#4a3520', font: 'bold 12px system-ui', display: 'flex', alignItems: 'center', justifyContent: 'center' }); };

  // ---------- pulo: Espaço ou, no celular, o botão "Pular" ----------
  const toqueTela = matchMedia('(pointer: coarse)').matches;
  function pular() { if (E.jogNoChao && !E.fora) { E.jogVy = 5.2; E.jogNoChao = false; } }
  addEventListener('keydown', (e) => { if (e.code === 'Space') { e.preventDefault(); pular(); } });
  if (toqueTela) {
    const b = document.createElement('button'); b.textContent = 'Pular';
    Object.assign(b.style, { position: 'fixed', right: '18px', bottom: 'calc(22px + env(safe-area-inset-bottom))', padding: '18px 20px', borderRadius: '50%', border: 0, background: '#fdf6e3', color: '#4a3520', fontSize: '15px', boxShadow: '0 3px 12px #0003' });
    b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); pular(); });
    document.body.appendChild(b);
  }

  return Object.assign(ctl, { tecla, JOY, toqueTela, marcaPino, pular });
}
