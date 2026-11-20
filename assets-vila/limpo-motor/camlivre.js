// Motor comum: câmera livre PROVISÓRIA, para conferir posições e pontos de vista enquanto as fases são montadas.
// Botões no alto, à direita: ⟲ ⟳ giram a câmera em volta do jogador, ▲ ▼ sobem e descem o ângulo, + − aproximam e
// afastam, ↺ volta ao padrão. No teclado: J/L giram, I/K sobem e descem. Quando o jogo estiver fechado, sai.
//
//   const livre = criaCamLivre(E, zoom)   // zoom() devolve [mínimo, máximo] da distância da câmera
//   livre.passo(dt)                       // no laço, antes da câmera
//   dir = livre.aplica(dirPadrao)         // a direção (do jogador para a câmera) já girada
export function criaCamLivre(E, zoom) {
  const C = { yaw: 0, pitch: 0, aperto: {} };
  const tecla = { KeyJ: 'esq', KeyL: 'dir', KeyI: 'sobe', KeyK: 'desce' };
  addEventListener('keydown', (e) => { if (tecla[e.code]) C.aperto[tecla[e.code]] = true; });
  addEventListener('keyup', (e) => { if (tecla[e.code]) C.aperto[tecla[e.code]] = false; });
  const painel = document.createElement('div');
  Object.assign(painel.style, { position: 'fixed', right: '10px', top: 'calc(10px + env(safe-area-inset-top))', display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gap: '6px', zIndex: 6 });
  painel.id = 'camlivre';
  for (const [rot, k] of [['⟲', 'esq'], ['▲', 'sobe'], ['⟳', 'dir'], ['−', 'longe'], ['▼', 'desce'], ['+', 'perto'], ['', ''], ['↺', 'zera'], ['', '']]) {
    const b = document.createElement('button'); b.textContent = rot;
    Object.assign(b.style, { width: '40px', height: '40px', borderRadius: '10px', border: 0, background: rot ? '#fdf6e3cc' : 'transparent', color: '#4a3520', fontSize: '18px', touchAction: 'none', visibility: rot ? 'visible' : 'hidden' });
    if (k === 'zera') b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); C.yaw = 0; C.pitch = 0; });
    else if (k) {
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); C.aperto[k] = true; b.setPointerCapture(e.pointerId); });
      const solta = () => { C.aperto[k] = false; };
      b.addEventListener('pointerup', solta); b.addEventListener('pointercancel', solta);
    }
    painel.appendChild(b);
  }
  document.body.appendChild(painel);
  C.passo = (dt) => {
    const a = C.aperto;
    if (a.esq) C.yaw += 1.2 * dt; if (a.dir) C.yaw -= 1.2 * dt;
    if (a.sobe) C.pitch += 0.6 * dt; if (a.desce) C.pitch -= 0.6 * dt;
    if (a.perto || a.longe) { const [m, M] = zoom(); E.distAlvo = Math.min(M, Math.max(m, E.distAlvo * (a.perto ? 1 - 1.2 * dt : 1 + 1.2 * dt))); }
  };
  // gira a direção padrão: yaw em volta do eixo vertical; pitch muda a altura do ângulo (entre 3° e 85°)
  C.aplica = (d) => {
    const h = Math.hypot(d.x, d.z), el = Math.atan2(d.y, h), az = Math.atan2(d.x, d.z) + C.yaw;
    const e = Math.min(1.48, Math.max(0.05, el + C.pitch));
    return d.clone().set(Math.sin(az) * Math.cos(e), Math.sin(e), Math.cos(az) * Math.cos(e));
  };
  return C;
}
