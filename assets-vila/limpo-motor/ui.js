// Motor comum: o que aparece por cima do jogo — botão de ação, tela preta de transição, legenda e caixa de diálogo.
// A página da fase precisa ter: <div id="fade">, <button id="acao"> e <div id="fala">.

export function criaUI(E) {
  const botao = document.getElementById('acao'), fade = document.getElementById('fade'), falaEl = document.getElementById('fala');
  // o texto do botão só é trocado quando muda (reescrever a cada quadro fazia o toque se perder)
  const textoBotao = (s) => { if (botao.textContent !== s) botao.textContent = s; };
  // legenda em itálico no pé da tela ('' apaga)
  const fala = (txt) => { if (!txt) { falaEl.style.opacity = 0; return; } falaEl.textContent = txt; falaEl.style.opacity = 1; };

  // caixa de diálogo com botões: dialogo('Nome', 'texto', [['Rótulo', ação, cor], ...]). O jogo para enquanto ela está aberta.
  const DIAL = document.createElement('div');
  Object.assign(DIAL.style, { position: 'fixed', left: '50%', bottom: 'calc(170px + env(safe-area-inset-bottom))', transform: 'translateX(-50%)', width: 'min(88vw, 520px)', background: '#fdf6e3', color: '#4a3520', padding: '14px 16px', borderRadius: '14px', boxShadow: '0 6px 24px #0005', font: '16px system-ui', display: 'none', zIndex: 8 });
  document.body.appendChild(DIAL);
  function dialogo(nome, texto, botoes) {
    DIAL.innerHTML = (nome ? `<div style="font-weight:bold;margin-bottom:6px">${nome}</div>` : '') + `<div style="margin-bottom:12px">${texto}</div>`;
    const linha = document.createElement('div'); linha.style.textAlign = 'right'; DIAL.appendChild(linha);
    E.fora = true; E.alvoToque = null; botao.style.display = 'none'; DIAL.style.display = 'block';
    for (const [txt, fn, cor] of botoes) {
      const b = document.createElement('button'); b.textContent = txt;
      Object.assign(b.style, { marginLeft: '8px', padding: '10px 18px', border: 0, borderRadius: '10px', background: cor || '#4a3520', color: '#fdf6e3', fontSize: '15px' });
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); DIAL.style.display = 'none'; E.fora = false; if (fn) fn(); });
      linha.appendChild(b);
    }
  }
  return { botao, fade, textoBotao, fala, DIAL, dialogo };
}
