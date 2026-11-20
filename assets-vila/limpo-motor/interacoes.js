// Motor comum: as interações de uma fase. Pessoas para conversar e coisas para olhar, com as falas (ou o que se vê) na
// caixa de diálogo, uma por vez (conversa.js). A fase pergunta quem/o que está perto do jogador e mostra o botão.
//   const INT = criaInteracoes(dialogo);
//   INT.pessoa('Marta', marta, ['fala 1', 'fala 2']);                  // conversa com um ator (st.o)
//   INT.coisa('o poço', x, z, ['o que se vê...'], { r: 2.2 });          // olhar algo num ponto
//   const it = INT.perto(jog.o.position);  if (it) textoBotao(it.verbo); ... INT.usa(it, depois)
// Cada item pode ter `quando` (só aparece quando der true) e `fim` (roda depois da última fala).
import { criaConversa } from './conversa.js';

export function criaInteracoes(dialogo) {
  const conversa = criaConversa(dialogo);
  const L = [];
  const api = {
    L,
    pessoa(nome, st, falas, o = {}) {
      const it = { tipo: 'pessoa', nome, o: st.o || st, falas, r: o.r || 2.3, verbo: o.verbo || 'conversar com ' + nome, quando: o.quando, fim: o.fim, titulo: o.titulo ?? nome };
      L.push(it); return it;
    },
    coisa(nome, x, z, falas, o = {}) {
      const it = { tipo: 'coisa', nome, o: { position: { x, z }, visible: true }, falas, r: o.r || 2.0, verbo: o.verbo || 'olhar ' + nome, quando: o.quando, fim: o.fim, titulo: o.titulo ?? '' };
      L.push(it); return it;
    },
    // o mais perto do ponto, dentro do raio de cada um (os escondidos e os que ainda não valem ficam de fora)
    perto(p) {
      let m = null, dm = 1e9;
      for (const it of L) {
        if (it.o.visible === false || (it.quando && !it.quando())) continue;
        const d = Math.hypot(it.o.position.x - p.x, it.o.position.z - p.z);
        if (d < it.r && d < dm) { dm = d; m = it; }
      }
      return m;
    },
    // abre a conversa (ou o que se vê); `depois` roda no fim, além do `fim` do item. Com `pj` (a posição do jogador),
    // quem conversa se vira para ele (e volta ao fim)
    usa(it, depois, pj) {
      const o = it.tipo === 'pessoa' && it.o.rotation ? it.o : null, r0 = o ? o.rotation.y : 0;
      if (o && pj) o.rotation.y = Math.atan2(pj.x - o.position.x, pj.z - o.position.z);
      const falas = typeof it.falas === 'function' ? it.falas() : it.falas;
      conversa(it.titulo, falas, () => { if (o && !it.vira) o.rotation.y = r0; it.usado = (it.usado || 0) + 1; if (it.fim) it.fim(); if (depois) depois(); });
    },
  };
  return api;
}
