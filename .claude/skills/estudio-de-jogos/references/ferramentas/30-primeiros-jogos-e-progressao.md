# Ferramenta 30: Primeiros jogos e progressão de aprendizado

> **Pipeline:** fase principal **F1** (`../pipeline/F1-ideia-e-formato.md`).

Para **começar pequeno**: uma escada de jogos simples que ensina a anatomia mínima de um jogo e serve
de **protótipo rápido** para ideias teológicas antes de investir em arte e narrativa. Fonte: Patrick
Felicia, *Python Games from Zero to Proficiency (Beginner)* (autopublicado, 2022). Os itens `PF#` são
deste livro (numeração minha). O livro ensina **Python e Pygame** (desktop) a iniciantes; **só
aproveitei as ideias**, traduzidas para JavaScript/web; os trechos de código são meus. Complementa
`25` e `28` (arquitetura) e `08` (stack web).

> Livro introdutório: não acrescenta teoria de design. O valor é a **ordem de aprendizado** e o
> inventário de recursos mínimos de um jogo. O estilo de código do livro (muitas variáveis globais,
> fases escritas à mão) é o que `25` e `28` pedem para **evitar** em projetos que vão crescer.

## 1. A escada (PF1, PF2)

| Degrau | Jogo | Novidade ensinada | Versão teológica possível (inferência minha) |
|---|---|---|---|
| 1 | **Adivinhar o número** (dica "maior/menor", contagem de tentativas, recomeço) | laço, entrada, comparação, feedback | "Em que capítulo está?" com dica "antes/depois" |
| 2 | **Adivinhar a palavra** (letras ocultas, tentativas, palavras vindas de arquivo) | listas, strings, dados em arquivo | **Palavra oculta** com termos bíblicos e **dica de contexto** |
| 3 | **Jogo da velha** com IA simples (grade 3×3, clique, verificar linha) | desenho, mouse, turnos, IA mínima | Pareamento em grade (personagem ↔ ação) |
| 4 | **Coleta de moedas** (mover, colidir, pontuar, fases, paredes, vidas, cronômetro, tela de início e de fim, animação, som) | laço de jogo, estados, fases, interface | Percurso por um **mapa** (ex.: viagens de Paulo) coletando "pontos de leitura" |

**PF2. Hábitos de estudo do livro**: rodar cedo, aprender em blocos pequenos, **explicar o que fez a
um colega** (ensinar revela o que não se entendeu) e **não temer errar**.

## 2. Anatomia mínima de um jogo (PF3)

Todo jogo da escada contém os mesmos elementos; confira antes de acrescentar qualquer outra coisa:

1. **Estado inicial** (`init`): sorteio, pontuação 0, tentativas 0.
2. **Entrada**: tecla, clique ou texto.
3. **Regra**: compara a entrada com o estado (maior/menor, letra existe, três em linha, colidiu).
4. **Feedback imediato**: mensagem, letra revelada, marca na grade, som.
5. **Condição de fim e de vitória**, e **recomeço**.
6. **Progresso visível** (tentativas, pontuação, fase).

```js
// Meu exemplo (JS): degrau 1 como função pura, com vista separada.
const novo = (min, max) => ({ alvo: min + Math.floor(Math.random() * (max - min + 1)), tentativas: 0 });
const tentar = (s, n) => {
  const t = s.tentativas + 1;
  return n === s.alvo ? { ...s, tentativas: t, fim: true }
       : { ...s, tentativas: t, dica: n < s.alvo ? 'maior' : 'menor' };
};
```

## 3. Técnicas do livro no nosso stack (PF4 a PF9)

- **PF4. Dica de proximidade** (desafio "quente/frio" pela diferença). Em estudo bíblico: feedback que
  **orienta sem dar a resposta** ("o texto fala de uma viagem, não de um sacrifício") vale mais que
  "errado".
- **PF5. Dados fora do código** (palavras lidas de arquivo em vez de lista escrita à mão). Base de
  `28`: conteúdo em JSON; o jogo só sabe ler.
- **PF6. Revelar progressivamente** (`?` vira letra certa). Boa para versículos: palavras-chave
  ocultas, com o **sentido** antes da forma.
- **PF7. IA mínima por regra** (jogada simples e, depois, verificar três em linha). Em jogo teológico
  prefira **sem oponente-máquina competitivo** (`07`); use a IA para **dar pistas** ou como
  interlocutor de diálogo (`17`, `23`).
- **PF8. Do quadrado à arte**: o livro usa **retângulos coloridos** para jogador, moedas e paredes e
  só depois troca por imagens e animação em poucos quadros (girar conforme a direção). **Prototipe
  com formas e só então peça arte à IA** (estilo consistente antes de gerar muitas imagens).
- **PF9. Estados de tela**: **início** (instruções), **jogo**, **fim** (reiniciar). Menor conjunto de
  estados; deve existir desde o protótipo (`25`, máquina de estados).

## 4. O que **não** copiar (PF10)

- **Cronômetro que reinicia a fase** (o livro reinicia o nível após dois minutos): contraria a regra
  de **não pressionar por tempo** em jogos de formação (`24`, `07`). Se houver tempo, **opcional** e
  sem punição.
- **Vidas e pontuação** como motor: só se servirem ao ensino; evite perda e escassez (`16`).
- **Fases e itens em variáveis soltas**: prefira **dados** (`28`).
- **Controle só por teclado**: ofereça equivalente por toque (`24`, `28`).

## 5. Quando usar

- **Provar uma ideia em uma tarde** antes de roteiro e arte (`27`).
- **Oficina com iniciantes** (jovens, ministério de ensino): a escada vira currículo de quatro
  encontros, cada um terminando em um jogo jogável.
- **Teste de mecânica em papel**: os degraus 1 a 3 funcionam com cartas, antes de qualquer código.

## 6. Ressalvas

- **Leitura**: ver `livros.md`, seção 23.
- Python/Pygame não é a stack da skill (`08`: JS, web, PWA); a **lógica** transfere, o **código** não.
- Livro de nível iniciante, autor único e autopublicado; não há teoria de design nem estudo.

## 7. Acréscimo (French, *Python Programming Workbook for Game Development*)

Apostila genérica de iniciantes; só duas ideias úteis a mais, ambas já cobertas em outras fontes:

- **Laço central em cinco passos** (entrada, processamento, feedback, recompensa, iteração) serve de
  **lista de conferência** para a escada acima; em jogo de formação, troque "recompensa" por
  **sentido ou descoberta** (`16`).
- **Exercícios de análise**: "analise um jogo que você gosta e liste as mecânicas centrais" e "esboce
  um nível" são bons **trabalhos de oficina** (casam com `26` e `19`).

**Gêneros habilitados pelo workbook** (diretriz do usuário sobre livros de código):

| Gênero | O que o livro mostra (resumo meu) | Observação |
|---|---|---|
| **RPG de texto** | Criação de personagem (classe, atributos), inventário com itens e descrições, combate por turnos com rodadas e ações, encontros aleatórios ou fixos, mundo e história, salvar/carregar | Só em nível introdutório; **sem sistema de diálogo ou investigação** |
| **Nave (arcade)** | Movimento, tiro, inimigos, colisão, pontuação e vida, power-ups | Não serve a formação; vale como exercício técnico |
| **Plataforma** | Pulo e gravidade, plataformas, inimigos, chefe, fim de fase | Idem |

**Técnicas reaproveitáveis** para jogos teológicos: **atributos e itens como dados** (virtudes,
dons, "cartas" de passagem), **inventário de descobertas** (versículos "coletados" com explicação),
**turnos de diálogo** no lugar de combate (rodada = fala, escolha, consequência), **salvar o ponto do
estudo**. Cuidado: classes, combate e saque trazem **competição e dano**; use só como **metáfora
estrutural** (`07`, `16`).

## 8. Acréscimo (Feronato, *From null to full HTML5 cross-platform game*)

Fonte: Emanuele Feronato, *From null to full HTML5 cross-platform game* (autopublicado; ano não
verificado; usa o framework **Phaser**). Itens `EF#`. Livro curto: constrói **um jogo da memória**
(pares de peças em grade) passo a passo, de uma página vazia a um jogo completo com som, pontuação e
tela final. Os trechos são meus e foram testados em Node.

**EF1. "Crie um jogo que você consiga terminar."** Primeiro **regra de ouro**: terminar é terminar
do começo ao fim, não chegar ao fim de uma fase de GTA.
**EF2. Por que servidor local** mesmo para JS: restrições do navegador ao abrir arquivos locais.
**EF3. Estrutura**: estados do framework (carregar, jogo, fim), **folha de sprites** para as peças,
pré-carregar imagens e sons, posicionar pela **largura da tela**.
**EF4. Regras do jogo da memória**: **no máximo duas selecionadas**, **não repetir a mesma**,
conferir par, remover ou virar de volta, **temporizador** para agendar eventos, embaralhar,
pontuação, **placar salvo localmente**, tela de fim e reinício.
**EF5. Dificuldade**: o livro acrescenta **cronômetro**, bônus de 2 s por acerto e novo conjunto ao
limpar a mesa.

```js
// Meu exemplo (testado): regras puras do jogo da memória (sem framework).
const escolhe = (j, id) =>
  (j.sel.length >= 2 || j.sel.includes(id) || j.achadas.has(id)) ? { ...j, ignorado: true }
                                                                 : { ...j, sel: [...j.sel, id], ignorado: false };
const confere = (j) => {
  if (j.sel.length < 2) return j;
  const [a, b] = j.sel.map(i => j.cartas[i]), achadas = new Set(j.achadas);
  if (a.par === b.par) { achadas.add(a.id); achadas.add(b.id); }
  return { ...j, sel: [], achadas, tentativas: j.tentativas + 1, acertou: a.par === b.par };
};
```

**Versão teológica (inferência minha):** **memória de pares** com **referência ↔ ideia** ("Sl 23.1"
↔ "O Senhor é meu pastor"), **personagem ↔ ação**, **símbolo ↔ significado** (ex.: apocalipse,
tabernáculo). **Sem cronômetro** nem bônus de pressa (`24`, `07`); ao acertar, **mostrar o texto
completo e o contexto** (fidelidade, `21`); ao errar, só virar de volta. Excelente para **revisão
em grupo e crianças**, com cuidado para não reduzir o texto a "decoreba" (`12`).
