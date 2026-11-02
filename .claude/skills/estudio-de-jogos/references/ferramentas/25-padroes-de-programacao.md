# Ferramenta 25: Padrões de programação para jogos

> **Pipeline:** fase principal **F5** (`../pipeline/F5-producao-e-codigo.md`).

Para **organizar o código** de um jogo (web, tablet, celular) de modo que mudar seja barato: estado,
laço, entidades, dados no lugar de código, comunicação sem acoplamento e otimização só quando
necessária. Fonte: Robert Nystrom, *Game Programming Patterns* (2014, texto online em
gameprogrammingpatterns.com); os itens `GP#` são deste livro (numeração minha, por tema). Os exemplos
do livro são em C++; **traduzi as ideias para JavaScript** (módulos ES, closures, `requestAnimationFrame`,
JSON). Os trechos de código abaixo são meus. Confirma e aprofunda as "princípios técnicos" de `08`.
Complementa `04` (máquina de estados e lógica), `09` (decisões), `10` (processo) e `17` (visual novels).

## Parte I. Arquitetura e custo

**GP1. Arquitetura é facilidade de mudar.** O custo maior é **carregar código na cabeça**; por isso
desacople: duas peças estão acopladas se não se entende uma sem a outra. Mas **abstração especulativa
custa** (YAGNI): não crie pontos de extensão que ninguém pediu; "um motor para tudo" sem jogo é o risco.
Equilibre três forças: velocidade de **hoje**, velocidade de **longo prazo** (arquitetura) e velocidade
de **execução** (desempenho). Regra do livro: é mais fácil **tornar rápido um jogo divertido** do que
**tornar divertido um jogo rápido**; mantenha flexível até o design assentar.

**GP2. Protótipo descartável de verdade.** Código de teste é legítimo, **desde que se possa jogá-lo
fora**: combine com quem pede ("isto será reescrito"). Para obrigar a reescrita, o livro sugere usar
outra linguagem. **Simplicidade** é destilação (estrutura de dados e algoritmos certos primeiro); o
código curto exige tempo.

## Parte II. Padrões clássicos, no olhar de jogos

**GP3. Command (comando).** Uma ação como **objeto/função** com `execute` (e `undo`). Serve para:
(a) **entrada configurável** (mapear botão → comando); (b) o mesmo comando comandar **jogador, IA ou
modo demonstração**; (c) **fila/stream** de comandos (rede, replay: gravar os comandos, não o estado);
(d) **desfazer e refazer** (lista + ponteiro; só guarde o estado que o comando altera). Em JavaScript,
uma closure basta; use objeto quando precisar de mais de uma operação (`undo`).

```js
// Meu exemplo: comando com desfazer para um editor de cenas ou passo do estudo.
const move = (unit, x, y) => { let ox, oy; return {
  execute() { ox = unit.x; oy = unit.y; unit.x = x; unit.y = y; },
  undo()    { unit.x = ox; unit.y = oy; } }; };
```

**GP4. Flyweight.** Separe o que é **compartilhado e imutável** (modelo, textura, dados do tipo de
terreno) do que é **por instância** (posição, tom). Mil instâncias apontam para um só objeto; crie sob
demanda; meça antes (o ponteiro extra raramente pesa).

**GP5. Observer (observador).** Quem age **anuncia** sem saber quem ouve (a física avisa "caiu"; o
sistema de conquistas escuta). Lista de ouvintes **independentes** (sem depender de ordem). Cuidados:
é **síncrono**; ouvinte lento trava o emissor; **cancele o registro** ao descartar (o "ouvinte
expirado" mantém telas mortas vivas); não use dentro do mesmo bloco coeso (dificulta seguir o fluxo).
Hoje: **funções**, `EventTarget`/`addEventListener` e vinculação de dados para UI.

**GP6. Prototype e dados por delegação.** O padrão de clonagem raramente é o melhor; mas a ideia de
**um objeto de dados "herdar" de outro** (campo `"prototype": "goblin"`) reduz repetição em JSON e dá
variações e figuras únicas (chefes) sem copiar e colar.

**GP7. Singleton: evite.** É **estado global** com fantasia: dificulta raciocínio, **estimula
acoplamento** e não combina com concorrência; resolve dois problemas mesmo quando só um existe.
Alternativas: **passar o objeto**; pegar da classe base; pegar de **um único objeto global** (o jogo)
no qual os serviços moram; ver se a classe "gerente" é necessária (muitas vezes o comportamento cabe
na própria entidade). Regra: **escopo o mais estreito possível**. Em módulos ES, um módulo já é um
singleton: não faça mais.

**GP8. State (máquina de estados).** Sintoma: **booleanos que se multiplicam** (`pulando`, `agachado`,
`mergulho`) e `if` em cadeia, onde cada mudança quebra outra. Cura: **um campo de estado** (enum/string)
e **transições**; troque a ordem do `switch` (primeiro por estado, depois por evento). Evolua para
objetos de estado quando cada estado tiver dados próprios; **ações de entrada e saída**; **máquinas
concorrentes** (n + m em vez de n × m); **hierárquicas** (superestado trata o comum); **pilha** (voltar
ao estado anterior: abrir menu e voltar). Úteis para **IA simples, entrada, navegação de telas, fluxo da
passagem**. Para IA complexa, árvores de comportamento (fora do livro).

## Parte III. Sequência

**GP9. Double Buffer.** Escreva no "próximo", leia do "atual" e troque no fim, para que a leitura nunca
veja trabalho pela metade (render sem "rasgo"; atores que reagem uns aos outros **sem depender da ordem**
de atualização). Custo: memória duas vezes e o custo da troca. No navegador o canvas já faz o render.

**GP10. Game Loop.** Processar entrada **sem bloquear**, atualizar, renderizar, controlando o tempo.
Jogo por turnos também tem laço (animação, música). No navegador **o laço é do navegador**:
`requestAnimationFrame`. Opções: dormir; **passo variável** (não determinístico, física instável, rede);
**passo fixo de atualização com renderização variável** (acumulador `lag`, limite de iterações, interpolar
`lag / passo`). Em celular, limite de quadros e economia de bateria.

```js
// Meu exemplo: passo fixo + render variável no navegador.
let prev = performance.now(), lag = 0; const STEP = 1000 / 60;
function frame(now) { lag += now - prev; prev = now;
  for (let n = 0; lag >= STEP && n < 5; n++, lag -= STEP) update(STEP);
  render(lag / STEP); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
```

**GP11. Update Method.** Cada entidade encapsula **um quadro do seu comportamento** (`update`); o
laço só chama. Custo: fatiar o comportamento exige **guardar estado** (use State, geradores/corrotinas).
A atualização é **sequencial** (a ordem importa); cuidado ao **adicionar/remover durante a iteração**
(guarde a contagem, ande de trás para frente ou marque como morto e varra depois). Onde fica o `update`:
entidade, **componente** ou delegado. Jogo de tabuleiro/narrativa pode nem precisar (só animação).

## Parte IV. Comportamento

**GP12. Bytecode / VM.** **Comportamento como dado**, executado por uma pequena máquina de pilha:
designers iteram sem recompilar, **mods seguros**, controle de memória e tempo. É o padrão **mais
complexo** do livro: só com muito comportamento, linguagem hospedeira inadequada ou desconfiança; exige
**ferramenta de autoria** (de preferência **gráfica**, que impede o inválido) e **depuração**; tende a
crescer. Para um jogo de estudo, **JSON declarativo** (cenas, condições simples, ações nomeadas) cobre
quase tudo; só vá a VM se a lógica de cenas ficar complexa (veja 17).

**GP13. Subclass Sandbox.** A classe base oferece **operações protegidas** (tocar som, mostrar
referência); cada subclasse só implementa um método "sandbox" e **não toca o resto do sistema**
(hierarquia rasa e larga). Riscos: base inchada (extraia objetos auxiliares/componentes). Se há
dezenas de subclasses, pense em **dados** (GP14).

**GP14. Type Object.** Em vez de uma classe por tipo, **uma classe `Tipo` e uma `Instância`**; os
tipos são **dados** (JSON) com herança simples (`parent`; ou copiada na carga). Designer cria e ajusta
sem programador. Limite: **comportamento** por tipo é mais difícil (escolher entre comportamentos
pré-definidos, ou GP12). Parente do Flyweight (organização, não memória) e do State (o que **é** x o
que **está sendo agora**).

## Parte V. Desacoplamento

**GP15. Component.** Divida a entidade por **domínio** (entrada, física, gráficos, som): a entidade é
um contêiner e o **estado compartilhado** (posição, velocidade) é por onde os componentes se falam sem se
conhecerem. Trocar um componente (jogador x demonstração) muda o comportamento. **Composição em vez de
herança** ("à la carte" em vez de combos). Comunicação: pelo estado do contêiner (implícito, depende
da ordem), referência direta (simples, acopla) ou **mensagens** (mediador); misture. Custo:
complexidade e indireção; "ECS" é levar ao extremo (entidade = ID).

**GP16. Event Queue (fila de eventos).** Desacopla **quando** de **quem processa**. Use **só** se
precisa desacoplar no **tempo** (Observer/Command bastam senão). Ganhos: não bloquear, **agregar**
pedidos iguais, mudar de thread/worker. Riscos: **fila central é variável global**; o mundo muda entre
enviar e processar (o evento carrega os dados); **laços de feedback** (não enviar de dentro de um
tratador). Decisões: eventos x mensagens, um ouvinte x broadcast x fila de trabalho, quem escreve,
tempo de vida. Em JS: `postMessage`, `CustomEvent`, uma fila simples.

**GP17. Service Locator.** Acesso global a um serviço (áudio, log, armazenamento) **por interface**,
sem acoplar à implementação. **Use com parcimônia**: primeiro passe o objeto. Proteja com **serviço
nulo** (nunca `undefined`; desligar o som é registrar o nulo) e **decorador** (log). Registro externo
é o mais comum; localizar em tempo de execução custa.

## Parte VI. Otimização (só com problema medido)

**GP18. Data Locality.** A CPU lê **linhas de cache**; dados **contíguos e na ordem de uso** são muito
mais rápidos (arrays por tipo de componente, ativos agrupados, dados "quentes" separados dos "frios").
Custo: abre mão de abstração. **Meça antes.** Em JS aplica-se a milhares de entidades (partículas), não a
um jogo de cenas.

**GP19. Dirty Flag.** Dado **derivado e caro** só é recalculado **quando precisa**; marque "sujo" ao
mudar o primário (encapsule a mudança em uma só API para não esquecer). Vale quando o primário muda mais
do que o derivado é lido e é difícil atualizar incrementalmente (senão, mantenha um total corrente).
Limpe: ao precisar, em **checkpoints** (tela de carregamento), ou em segundo plano. "Salvar o documento"
é uma dirty flag.

**GP20. Object Pool.** Reaproveitar objetos de um conjunto fixo (evita alocação e **fragmentação**).
Em JS com coletor de lixo importa menos, mas ajuda com **muitas** partículas/sons em celular. Cuide:
tamanho do pool, o que fazer se cheio, limpar o objeto reutilizado, **referências retidas**.

**GP21. Spatial Partition.** Consultas por posição ("quem está perto?") de O(n²) para menos, com
grade, quadtree, BSP etc. Só com n grande; mover objetos custa. Raramente necessário em jogos
narrativos.

## Aplicação a jogos teológicos (síntese minha, não é do livro)

- **Mapa do que usar primeiro (80% do valor).** Para um jogo de estudo em JS: **estado explícito
  e serializável** (GP1, 08), **máquina de estados** para fluxo de telas e passos da passagem (GP8),
  **conteúdo em JSON** com **herança de dados** para variações (GP6, GP14), **Command com desfazer**
  para editor de cenas e para "voltar" (GP3), **Observer/EventTarget** para conquistas e progresso
  sem acoplar (GP5), **laço do navegador** só se houver animação (GP10) e **Service Locator mínimo**
  (armazenamento, áudio, tradução) (GP17).
- **Narrativa pura não precisa de laço.** Jogo de cenas e escolhas pode ser **orientado a eventos**
  (clique → regra pura → novo estado → render). Use `requestAnimationFrame` só para animações.
- **Estado + Command = salvar, voltar e "revisar o que vi".** Registrar os **comandos** do jogador
  dá **desfazer**, **replay** do caminho de estudo e **relatório** para o líder do grupo (com
  consentimento; 07). Não guarde dados pessoais além do necessário.
- **Máquina de estados do estudo.** Estados (Contexto → Leitura → Observação → Pergunta →
  Aplicação) com transições explícitas evitam "booleanos soltos" e telas inconsistentes; **pilha**
  para abrir referência cruzada e **voltar ao ponto**.
- **Dados com herança (GP6, GP14).** Cena base com **layout, cores e botões**; cenas filhas só
  trocam **texto e referência**. Um **tipo "passagem"** com campos (livro, capítulo, versículos,
  tradução, licença) e tipos derivados ("parábola", "carta", "narrativa") para que o editor valide.
- **Texto bíblico é conteúdo, não código (GP12).** Evite scripts que montam texto; versículos
  vêm de arquivo com **licença e referência** (08). Se criar linguagem de cenas, faça-a **declarativa
  e pequena** (não Turing) e valide no carregamento.
- **Eventos para tradução e a11y (GP5, GP17).** Um serviço de **localização** e um de
  **preferências** (tamanho de fonte, modo escuro, redução de movimento) injetados; a UI ouve
  mudanças. Serviço nulo para áudio desligado.
- **Cuidado com a "engine própria" (GP1, HW1).** O livro concorda com 08: não construa um
  motor sem jogo; use **DOM/CSS** ou **Phaser** conforme o caso e aplique os padrões aos **seus** dados.
- **Desempenho é segundo plano.** Um jogo de estudo raramente chega a precisar de GP18 a GP21;
  **meça** antes (DevTools). A prioridade é **legibilidade do código para quem manterá** (talvez
  você e alguém sem experiência).
- **Não otimizar antes de saber.** Evite "otimizar" a leitura de versículos ou o
  carregamento antes de medir; priorize **carregamento rápido** (imagens comprimidas) e **offline** (PWA).

## Ressalvas de leitura

- **Exemplos em C++.** Traduzi as ideias para JavaScript; **detalhes de memória** (ponteiros,
  `friend`, `union`, free list) não se aplicam a JS com coletor de lixo e aparecem só em GP18 a GP20.
- **Foco em jogos de ação em tempo real.** Muitos padrões (laço, física, partículas) servem pouco a
  jogos narrativos; os mais úteis aqui são GP3, GP5, GP6, GP8, GP14, GP15 e GP17.
- **Livro de 2014.** Não cobre ECS moderno em profundidade, frameworks de UI reativos nem
  ferramentas de IA; use como **base conceitual**.

## Acréscimo (Castledine, *HTML5 Games: Novice to Ninja*)

Fonte: Earle Castledine, *HTML5 Games: Novice to Ninja* (SitePoint; ano não verificado no arquivo,
cita Flappy Bird e Universal Paperclips, portanto é de depois de 2017). Itens `NN#`. Constrói uma
**pequena biblioteca de jogo** (Pop) em JS puro ao longo de nove "níveis": laço e entrada, canvas,
entidades e contêineres, sprites e animação por quadros, mapas de tiles e câmera, colisão e IA,
matemática e física (com Matter.js), áudio (incluindo Web Audio), "juice" e empacotamento. Os
trechos abaixo são **meus e foram testados em Node**.

**NN1. Receita mínima de jogo**: pegar a entrada, mover tudo um pouco, checar sobreposições, desenhar,
repetir 60 vezes por segundo. **"Faça jogos, não motores"**: a biblioteca só cresce quando um
protótipo pede (`28`).
**NN2. Estrutura**: renderizador (o único que conhece o canvas), **contêineres** (cena, camera) e
**entidades** com `update(dt, t)`; remover entidades "mortas" ao fim do quadro; **estados** de tela.
**NN3. Máquina de estados com "primeiro quadro"**: guarda estado atual e anterior, **tempo no
estado** e uma bandeira `primeiro` verdadeira no 1º quadro: ali se faz a **inicialização do
estado** (ex.: escolher o próximo ponto de passeio). Serve para IA **e para o fluxo do jogo**
("PREPARE", "JOGANDO", "FIM"), tempos de espera e regras.
**NN4. Colisão**: caixas alinhadas (AABB); testar por **etapas** (mapa de tiles: achar células
vazias, deslizar pela parede, encaixar na borda); **tolerância a favor do jogador**: "ninguém
reclama de quase acertos", e uma folga na caixa de dano ou chão um pouco mais largo evitam a
injustiça percebida (sem exagerar, para o jogador não notar).
**NN5. IA em camadas**: movimento intencional, **pontos de passagem** (waypoints), perseguir/fugir/
vagar com estados e **busca de caminho** (cuidado com desempenho: não recalcule a todo quadro).
**NN6. Pool de objetos** (projéteis, partículas) e **partição espacial** quando houver muitas
entidades; **não desenhar fora da tela**; contador de FPS; medir antes de otimizar.
**NN7. Carregador de recursos** com progresso e eventos; **sons**: SFX repetidos, polifônicos e em
ordem aleatória; música; Web Audio (osciladores, ganho, rampas); **volume**: "não vá a 11",
cuidado com os ouvidos.
**NN8. Empacotamento**: depuração (console, depurador, sobreposição de depuração), **PWA e web app
manifest**, **paisagem melhor**, controles de toque (sem multitoque confiável), **gamepad**,
executáveis de desktop, lojas.
**NN9. Game jams**: construir jogos pequenos e **completos** em tempo limitado cria o hábito de
terminar, "a habilidade mais rara"; Ludum Dare e js13kGames (13 KB) como exercício.

```js
// Meu exemplo (testado): estado com "primeiro quadro", tempo e estado anterior.
class Estado {
  constructor(inicial) { this.atual = inicial; this.anterior = null; this.tempo = 0;
                         this.primeiro = true; this.novo = true; }
  set(novo) { this.anterior = this.atual; this.atual = novo; this.novo = true; }
  atualiza(dt) {              // chamar no começo de cada quadro
    if (this.novo) { this.primeiro = true; this.novo = false; this.tempo = 0; }
    else { this.primeiro = false; this.tempo += dt; }
  }
}
// Meu exemplo (testado): pool de objetos (devolve null quando esgotado).
class Pool {
  constructor(fab, n) { this.livres = Array.from({ length: n }, fab); }
  pega() { return this.livres.pop() || null; }
  devolve(o) { this.livres.push(o); }
}
// Meu exemplo (testado): colisão com folga a favor de quem é atingido.
const tocou = (a, b, folga = 0) =>
  a.x + folga < b.x + b.w && a.x + a.w - folga > b.x && a.y + folga < b.y + b.h && a.y + a.h - folga > b.y;
```

**Aplicação teológica (inferência minha):** o **estado com `primeiro`** é ótimo para **cenas de
estudo** (introdução → leitura → pergunta → reflexão): cada estado inicializa o que precisa e sabe
quanto tempo ficou, **sem cronômetro de pressão**. O **carregador com progresso** serve para
pré-carregar a próxima passagem (`28`, GC22). Game jam: **oficina de um dia** para criar um jogo
de uma passagem (`30`).
