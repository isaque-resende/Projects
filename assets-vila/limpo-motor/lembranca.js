// Motor comum: o flashback (uma lembrança). A tela ganha tom de sépia, o canto escurece e um grão de filme corre por
// cima; a entrada e a saída são um clarão branco. Um letreiro diz quando foi.
//   const L = criaLembranca(renderer.domElement);
//   L.entra('Semanas antes', () => { ...monta a cena do passado... });   // no auge do clarão
//   L.sai(() => { ...volta tudo ao presente... });

export function criaLembranca(tela) {
  const div = (st) => { const d = document.createElement('div'); Object.assign(d.style, { position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0, ...st }); document.body.appendChild(d); return d; };
  // grão: um quadrinho de ruído repetido, que pula de lugar a cada quadro
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const cx = cv.getContext('2d'), im = cx.createImageData(128, 128);
  let s = 7; for (let i = 0; i < im.data.length; i += 4) { s = (s * 16807) % 2147483647; const v = s % 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 38; }
  cx.putImageData(im, 0, 0);
  const vinheta = div({ background: 'radial-gradient(ellipse at center, #0000 45%, #2a1606aa 100%)', transition: 'opacity .4s', zIndex: 3 });
  const grao = div({ backgroundImage: `url(${cv.toDataURL()})`, transition: 'opacity .4s', zIndex: 3 });
  const clarao = div({ background: '#fff8e8', transition: 'opacity .35s ease', zIndex: 7 });
  const letreiro = div({ inset: 'auto 0 calc(8vh + 22px) 0', textAlign: 'center', color: '#fbeed2', font: 'italic 20px Georgia, serif', textShadow: '0 2px 8px #000c', transition: 'opacity .8s', zIndex: 5 });
  const L = { on: false };
  let raf = 0;
  const mexe = () => { grao.style.backgroundPosition = `${(Math.random() * 128) | 0}px ${(Math.random() * 128) | 0}px`; if (L.on) raf = requestAnimationFrame(mexe); };
  const filtro = (on) => { tela.style.filter = on ? 'sepia(0.85) saturate(0.75) contrast(1.08) brightness(1.04)' : ''; vinheta.style.opacity = grao.style.opacity = on ? 1 : 0; };
  // clarão: sobe, troca a cena no auge e desce
  const brilho = (fn) => { clarao.style.opacity = 1; setTimeout(() => { fn(); clarao.style.transition = 'opacity .7s ease'; clarao.style.opacity = 0; setTimeout(() => { clarao.style.transition = 'opacity .35s ease'; }, 750); }, 380); };
  L.entra = (quando, monta) => brilho(() => { L.on = true; filtro(true); mexe(); if (monta) monta();
    if (quando) { letreiro.textContent = quando; letreiro.style.opacity = 1; setTimeout(() => { letreiro.style.opacity = 0; }, 2600); } });
  L.sai = (volta) => brilho(() => { L.on = false; cancelAnimationFrame(raf); filtro(false); letreiro.style.opacity = 0; if (volta) volta(); });
  // sem clarão (para pular a cena de uma vez)
  L.desliga = () => { L.on = false; cancelAnimationFrame(raf); filtro(false); letreiro.style.opacity = 0; clarao.style.opacity = 0; };
  return L;
}
