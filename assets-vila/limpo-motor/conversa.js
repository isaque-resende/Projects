// Motor comum: conversas com NPCs. Uma conversa é uma lista de falas que aparecem uma por vez na caixa de diálogo
// (ui.js), com "Continuar" e, na última, "Fechar". Para perto de quem fala: o jogo mostra o botão "conversar com…".
//   const conversa = criaConversa(dialogo);
//   conversa('Pastor', ['Primeira fala.', 'Segunda fala.'], () => { ... depois ... });
// Falas com escolha: um item pode ser { txt, op: [['Rótulo', [falas...]], ...] } (cada opção continua com as suas falas).
export function criaConversa(dialogo) {
  return function conversa(nome, falas, fim) {
    const fila = [...falas];
    const passo = () => {
      if (!fila.length) { if (fim) fim(); return; }
      const f = fila.shift();
      if (typeof f === 'string') { dialogo(nome, f, [[fila.length ? 'Continuar' : 'Fechar', passo]]); return; }
      dialogo(nome, f.txt, f.op.map(([rot, mais]) => [rot, () => { fila.unshift(...mais); passo(); }]));
    };
    passo();
  };
}

// quem está perto para conversar: [{ nome, o (Object3D), falas, r }] -> o mais perto dentro do raio, ou null
export function pertoDe(lista, p, r = 2.0) {
  let m = null, dm = 1e9;
  for (const n of lista) { const d = Math.hypot(n.o.position.x - p.x, n.o.position.z - p.z); if (d < (n.r || r) && d < dm) { dm = d; m = n; } }
  return m;
}
