# Ferramenta 31: Mundos em grade, trajetos e geração procedural (JavaScript)

> **Pipeline:** fase principal **F5** (`../pipeline/F5-producao-e-codigo.md`); também usada em F3, F4.

Para jogos em que a pessoa **anda por um mapa** (viagens de Paulo, o êxodo, a Jerusalém do Novo
Testamento, um "mapa do estudo"): mapa em grade, câmera, colisão, caminho mais curto, eventos por
lugar e geração procedural. Fonte: Kameron Hussain e Frahaan Hussain, *Mastering JavaScript for Game
Development: Crafting Unique Experiences* (livro de visão geral, 20 capítulos). Os itens `JS#` são
deste livro (numeração minha). **O livro só descreve** tilemaps, A*, autômatos celulares etc.; os
**trechos de código abaixo são meus** e enxutos (não executados). Fecha a lacuna de "RPG de
exploração" apontada em `25` e `28`.

> Livro genérico e de nível introdutório a intermediário; menciona técnicas mais do que as
> ensina em profundidade. Complementa `19` e `20` (level design), `25` (padrões) e `28` (arquitetura).

## 1. Mapa em grade (JS1, JS2)

**JS1. Tilemap** = matriz 2D em que cada número é um tipo de terreno (0 vazio, 1 chão, 2 muro,
3 água...). Desenha-se percorrendo a matriz. Vantagens: mapa pequeno em dados, edição fácil,
colisão trivial (a célula diz se passa).
**JS2. Editor Tiled** (open source) exporta **JSON**; carregue o JSON no jogo. Para autores não
programadores (professor, pastor) é o caminho: desenham o mapa e o jogo só lê (`28`, GC28).

```js
// Meu exemplo: mapa como dados + desenho no canvas + colisão por célula.
const mapa = { larg: 5, alt: 3, tam: 32,
  celulas: [1,1,1,1,1,  1,0,0,2,1,  1,1,1,1,1] };           // 0 = passável, 1/2 = barreira
const passa = (x, y) => mapa.celulas[y * mapa.larg + x] === 0;
function desenha(ctx, cor = { 0:'#cde', 1:'#456', 2:'#a54' }) {
  mapa.celulas.forEach((t, i) => {
    ctx.fillStyle = cor[t];
    ctx.fillRect((i % mapa.larg) * mapa.tam, Math.floor(i / mapa.larg) * mapa.tam, mapa.tam, mapa.tam);
  });
}
```

Para andar **por casas** (sem física): estado = `{x, y}` em células; comando = `mover(dx, dy)`;
a lógica valida `passa(x+dx, y+dy)` e emite evento (`25`, GP3; `28`, GC3). Mapa **grande**: desenhe
só as células visíveis (câmera) e carregue por região (`28`, GC22).

## 2. Câmera e rolagem (JS3)

- **Rolagem**: desloque o desenho pelo `(camX, camY)` do jogador, limitado às bordas do mapa.
- **Paralaxe**: camadas de fundo com velocidades diferentes dão profundidade; custa pouco.
- Em mapa de estudo, **prefira telas fixas** (uma cena por tela) a rolagem contínua: menos
  desorientação e melhor para toque (`24`).

## 3. Caminhos e movimento de NPCs (JS4, JS5)

**JS4. Algoritmos**: **A\*** (menor caminho com heurística), **Dijkstra** (menor caminho sem
heurística), DFS (não garante o mais curto). Bibliotecas citadas: Pathfinding.js (grades 2D) e o
suporte do Phaser. **JS5. Representação**: grade ou malha de navegação.

Em mapas pequenos de jogo teológico, **busca em largura (BFS)** em grade resolve e é mais simples
que A\* (inferência minha: o livro cita A* e Dijkstra, não BFS):

```js
// Meu exemplo: caminho mais curto em grade (4 direções) por busca em largura.
function caminho(passa, ini, fim, larg, alt) {
  const k = (x, y) => y * larg + x, veio = new Map([[k(...ini), null]]), fila = [ini];
  while (fila.length) {
    const [x, y] = fila.shift();
    if (x === fim[0] && y === fim[1]) { const p = []; let c = k(x, y);
      while (c !== null) { p.unshift([c % larg, Math.floor(c / larg)]); c = veio.get(c); } return p; }
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < larg && ny < alt && passa(nx, ny) && !veio.has(k(nx, ny))) {
        veio.set(k(nx, ny), k(x, y)); fila.push([nx, ny]); } } }
  return null;
}
```

Usos teológicos: **guia** que mostra o caminho (ex.: de Jerusalém a Damasco), **NPC que acompanha**,
**validação de que o mapa tem solução** (todo ponto de leitura é alcançável).

## 4. Comportamento de NPC (JS6)

O livro lista **máquinas de estado finito, árvores de decisão e árvores de comportamento**, e fala em
IA que aprende (aprendizado por reforço). Para a skill: **máquina de estados** (`25`, GP5) basta
(ocioso → conversa → segue). **Evite IA adaptativa opaca** em formação (`07`, `23`: transparência).

## 5. Geração procedural (JS7)

Técnicas citadas: **aleatoriedade** (`Math.random`), **ruído de Perlin** (terreno), **autômatos
celulares** (cavernas, labirintos) e **L-systems** (plantas). Para jogos teológicos, uso **limitado**:

- **Não gere conteúdo doutrinário ou textual** (fidelidade, `21`); gere só **cenário** (variação de
  deserto, vegetação, tempo).
- **Semente fixa** para reproduzir o mesmo mapa (`28`, GC12).
- Exemplo útil: **mapa de repetição** (mesma passagem, cenário diferente) para memorização sem
  repetir a mesma tela.

```js
// Meu exemplo: uma rodada de autômato celular para suavizar um ruído de muros.
const suaviza = (g, larg, alt) => g.map((_, i) => {
  const x = i % larg, y = Math.floor(i / larg); let n = 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const nx = x + dx, ny = y + dy; n += (nx < 0 || ny < 0 || nx >= larg || ny >= alt) ? 1 : g[ny * larg + nx]; }
  return n >= 5 ? 1 : 0; });
```

## 6. Física, ambiente e clima (JS8)

- **Matter.js, p2.js, Cannon.js** (motores de física): **desnecessários** na maioria dos jogos
  teológicos de cena e escolha.
- Efeitos de **clima e ciclo dia/noite** (partículas, iluminação) servem de **atmosfera**:
  amanhecer na ressurreição, noite em Getsêmani; têm custo de desempenho em celular (`28`).

## 7. Projeto de mundo e ecossistema

Princípios de projeto de mundo (protótipo em papel, ritmo, narrativa ambiental, acessibilidade)
estão em `19` e `20`; use esses. Para jogos de cena, **canvas ou DOM puros** costumam bastar; adote
Phaser ou Pixi só quando houver mapa, sprites e animação reais. Mapas: **Tiled** (JSON). Confirmar
versões antes de adotar qualquer biblioteca.

## 8. Conformidade e ética citadas (JS11)

O capítulo 17 do livro trata de **direitos autorais, licenças e privacidade** de forma geral.
Aplicável aqui (e **inferência minha** para o contexto bíblico, não do livro):

- **Traduções da Bíblia têm licença própria** (algumas em domínio público, outras com restrição de
  citação e de distribuição digital); registrar a fonte e a licença de cada texto (`07`, `21`).
- **Arte, fontes, áudio**: respeitar licença e dar atribuição; guardar o **registro** de geração de
  imagens por IA (`28`, GC20).
- **Dados de jogadores**: coletar o mínimo, com consentimento claro; atenção a crianças (`29`).
- **Monetização e retenção** do livro (cap. 12 e 16: recompensa diária, eventos, loja) **não se
  aplicam** a formação (`16`, `07`).

## 9. Ressalvas

- **Leitura**: ver `livros.md`, seção 25.
- Não há, no livro, sistema de diálogo, investigação ou quadro de deduções; para esses, use `09`,
  `22` e `23`.
- O ecossistema JS muda rápido: confirmar versões de Phaser, Pixi e Matter.js antes de adotar.
- Os trechos de código desta ferramenta foram **testados em Node** (ver teste na conversa), mas são
  exemplos mínimos.

## 10. Vista isométrica e jogos de construção (Pagella, *Making Isometric Social Real-Time Games*)

Fonte: Mario Andrés Pagella, *Making Isometric Social Real-Time Games with HTML5, CSS3, and
Javascript* (O'Reilly, 2011). Itens `IS#`; **o livro é de 2011**, voltado a jogos sociais de
construção (um resort turístico) com Canvas, Web Workers, localStorage, PHP/MySQL e Facebook;
**muita tecnologia está datada**. Os trechos abaixo são **meus** e foram **testados em Node**.

**IS1. Projeção 2:1.** O "isométrico" dos jogos é, na prática, **dimétrico**: losangos com altura
igual à metade da largura (2:1), proporção que evita serrilhado em pixels. Largura do tile par.
**IS2. Do grid à tela e de volta.** O desenho usa `(col - row)` e `(col + row)`; o clique faz a
conta inversa e **arredonda para baixo** (o livro usa grade fixa de 250×250 por simplicidade).
**IS3. Ordem de desenho** do fundo para a frente (`col + row` crescente); construções são ancoradas
no **centro da base** do tile e podem ocupar vários tiles.
**IS4. Pegada** (footprint): cada construção reserva `w × h` células; conflito se alguma estiver
ocupada ou fora do mapa. O livro grava em cada célula a referência da construção.
**IS5. Rotação** do mapa por rotação da matriz; **zoom** por escala; **rolagem** por deslocamento.

```js
// Meu exemplo (testado): conversão grade ↔ tela em projeção 2:1 e reserva de pegada.
const TW = 64, TH = 32;
const gridParaTela = (col, row, ox = 0, oy = 0) =>
  ({ x: ox + (col - row) * TW / 2, y: oy + (col + row) * TH / 2 });
const telaParaGrid = (x, y, ox = 0, oy = 0) => {
  const px = x - ox, py = y - oy;
  return { col: Math.floor((px / (TW / 2) + py / (TH / 2)) / 2),
           row: Math.floor((py / (TH / 2) - px / (TW / 2)) / 2) };
};
const cabe = (g, col, row, w, h) => {
  for (let j = row; j < row + h; j++) for (let i = col; i < col + w; i++)
    if (i < 0 || j < 0 || i >= g.L || j >= g.A || g.c[j * g.L + i] !== 0) return false;
  return true;
};
```

**IS6. Clique em imagem com transparência.** O livro mostra como saber **qual pixel** foi tocado
(`getImageData`) e ignorar regiões transparentes; hoje, usar **a célula do grid** para escolher o
objeto e, se preciso, a máscara de alfa do sprite.
**IS11. Estado autoritativo no servidor, calculado pelo tempo.** O livro propõe que o saldo seja
**calculado no servidor a partir de horários** (data de compra, período, rendimento), de modo que
adulterar o cliente só afeta quem adulterou. Útil para qualquer jogo em grupo/sala que tenha
placar ou progresso compartilhado:

```js
// Meu exemplo (testado): saldo derivado do tempo, não de contador enviado pelo cliente.
const saldo = (inicial, itens, agora) =>
  inicial + itens.reduce((s, it) => s + Math.floor((agora - it.desde) / it.periodo) * it.ganho, 0);
```

### Aplicação teológica (inferência minha)

- **Jogos de construção como estudo**: reconstruir os **muros de Jerusalém** (Neemias 3 lista quem
  reparou cada trecho), montar o **tabernáculo** (Êxodo 25 a 31, 35 a 40) peça por peça com medidas, ou
  a **cidade ao redor do templo** (Ezequiel 40 a 48). A **pegada** vira "cada peça ocupa seu lugar
  segundo o texto" (conferência com a fonte, `21`).
- **Cooperação em vez de competição**: em Neemias 3 cada família repara "defronte à sua casa"; um
  mapa **compartilhado** em que cada participante coloca seu trecho (grupo da igreja) reforça o tema
  (`11`).
- **O que NÃO copiar**: o livro é de **jogos sociais "viciantes"** (o prefácio fala de "viciante" e
  "repetitivo"). Moeda que **rende com o tempo**, loja de itens, convites a amigos e retenção são
  **Black Hat** (`16`, `07`). Use a mecânica de **construir** sem economia de espera, sem escassez e
  sem monetização.
- **Dados de rede social**: a camada Facebook do livro (2011) **não se aplica**; qualquer login ou
  compartilhamento exige consentimento e mínimo de dados (`29`).

## 11. Física e animação: o mínimo que vale (Ramtal e Dobre; síntese minha)

Livro de física aplicada, **não** de jogos; a maior parte não se aplica a jogos de cena e escolha.

- **FI1. Quando NÃO usar física.** Leitura, escolha, diálogo, mapa por casas e puzzle de cartas não
  precisam. Use só para **atmosfera** (poeira, faíscas, maná) ou **minijogo** com movimento.
- **FI2. Tempo medido.** Mova `velocidade × dt` com `requestAnimationFrame`/`performance.now()`, com
  **limite de `dt`** (aba em segundo plano gera saltos).
- **FI3. Euler semi-implícito** (velocidade primeiro, posição depois) basta para animação de interface.
- **FI4. Passo fixo** para simulação reproduzível (acumular `dt`, passos de 1/60 s).
- **FI5. Partículas** com emissor, vida útil, **pool** e cores que mudam com o tempo; poucas no
  celular (dezenas) e **desligáveis** (sensibilidade a movimento e luz, `24`).
- Colisão entre muitos corpos e corpos rígidos: use biblioteca (Matter.js); simulação **não** é
  argumento sobre eventos bíblicos (`21`).

```js
// Meu exemplo (testado): passo com limite de dt e Euler semi-implícito.
const passo = (est, dt) => {
  dt = Math.min(dt, 0.05);
  est.vy += est.g * dt;
  est.y  += est.vy * dt;
  if (est.y > est.chao) { est.y = est.chao; est.vy *= -0.6; }
  return est;
};
```

**Maná** como minijogo opcional deve premiar **suficiência** (colher o do dia, Êxodo 16), não acúmulo (`07`).

## 12. Vetores 2D, sprites por DOM e rolagem (Cecco, 2011; síntese minha)

Fonte: Raffaele Cecco, *Supercharged JavaScript Graphics with HTML5 canvas, jQuery, and More*
(O'Reilly, 2011). Itens `RC#`. Livro de 2011 (jQuery, PhoneGap: **datado**). Valem as ideias de **vetores 2D**, **sprites por DOM**, **rolagem com paralaxe** (CSS
e por tiles, com o editor Tiled), **jogo arcade completo** e **quebra-cabeça deslizante**.

**RC1. Sprites por DOM e CSS**: para poucos elementos, mover `div`s com CSS pode bastar (e é mais
acessível: texto real, foco, leitura por leitor de tela, `24`); o canvas serve para muitos objetos.
**RC2. Paralaxe**: camadas com velocidades diferentes; por CSS ou por JavaScript; com tiles e Tiled.
**RC3. Vetores 2D**: soma (gravidade sobre velocidade), **escala**, **tamanho** (Pitágoras),
**normalização** (direção) e **produto escalar** (alinhamento, "está olhando para o alvo?").
```js
// Meu exemplo (testado): operações de vetor 2D.
const V = {
  soma: (a, b) => ({ x: a.x + b.x, y: a.y + b.y }),
  esc:  (a, k) => ({ x: a.x * k, y: a.y * k }),
  tam:  a => Math.hypot(a.x, a.y),
  norm: a => { const t = V.tam(a); return t === 0 ? { x: 0, y: 0 } : V.esc(a, 1 / t); },
  dot:  (a, b) => a.x * b.x + a.y * b.y,
};
// V.tam({x:-3,y:3}) ≈ 4.24; V.dot({x:1,y:0},{x:0,y:5}) === 0.
```

**Aplicação teológica (inferência minha):** **DOM com CSS** para jogos de **cena e texto** (melhor
acessibilidade que canvas); **paralaxe** suave para ambientação (deserto, mar) **desligável**;
**quebra-cabeça deslizante** com imagem de um símbolo ou mapa bíblico; **normalização** para fazer
um NPC-guia caminhar até o jogador em linha reta.
