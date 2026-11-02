# Ferramenta 28: Arquitetura de motor e pipeline de produção

> **Pipeline:** fase principal **F5** (`../pipeline/F5-producao-e-codigo.md`).

Para **montar o esqueleto** de um jogo web (ou PWA/app de loja) que aguente crescer: camadas, entrada
como comando, eventos, processos de vários quadros, recursos e carga, conteúdo em dados/script,
ferramentas de autoria e depuração. Fonte: Mike McShaffry, *Game Coding Complete*, 3ª ed. (Charles
River/Cengage, 2009), com capítulos de James Clarendon (Lua) e Quoc Tran (editor); os itens `GC#` são
deste livro (numeração minha, por tema). Os exemplos do livro são em **C++/DirectX/Windows**;
**traduzi só as ideias** para JavaScript e a web (trechos de código abaixo são meus). Complementa
`25` (padrões: aqui está a "montagem" deles), `08` (princípios técnicos) e `10` (processo).

## 1. Camadas: aplicação, lógica, vista

**GC1. Três camadas.** (a) **Aplicação**: tudo que depende da máquina/navegador (entrada, arquivos,
áudio, relógio, ciclo de vida); (b) **Lógica do jogo**: estado e regras, **sem desenhar nada**;
(c) **Vistas**: tradução do estado em experiência (tela, som) e da entrada em **comandos**. A lógica
nunca chama a vista; **anuncia eventos**; a vista nunca altera o estado, **pede** à lógica, que valida.

**GC2. Várias vistas do mesmo jogo.** Humano, IA, **replay**, teste automático, espectador remoto
usam o mesmo contrato. Consequência prática: trocar teclado por toque, ou jogar o estudo bíblico no
celular e no projetor, não toca nas regras.

```js
// Meu esqueleto: lógica pura + vistas assinantes.
const logic = createLogic(content);          // estado + regras, sem DOM
const bus = createEventBus();                // GC24-GC27
logic.onEvent = (e) => bus.emit(e.type, e);  // lógica anuncia
const view = createHumanView(bus, (cmd) => logic.request(cmd)); // vista pede
// replay: vista que lê um array de comandos gravados e chama logic.request
```

**GC3. Humano e IA entram pela mesma porta.** Se uma personagem, um tutor automático ou um "modo
demonstração" usa a mesma interface de comandos do jogador, o multijogador/ensino em dupla vira
extensão, não reescrita.

**GC5. Objeto de lógica ≠ objeto visual.** O "personagem" da lógica (id, vida, posição, o que sabe)
é diferente da sua aparência (sprite, imagem, voz). Mudou o estado → evento → a vista troca a
imagem. Trocar a arte (ou gerar nova com IA) não pode exigir mexer nas regras.
**GC17. Laço principal**: a simulação **avança mesmo sem entrada**; separe atualizar e desenhar;
use **tempo decorrido**, não "por quadro" (`25`, GP10); reconstrua recursos perdidos (aba em
segundo plano, rotação de tela, volta ao app).

## 2. Entrada e interface (cap. 8–9)

**GC35. Hardware → aplicação → comando.** Nunca leia o ponteiro e mexa no estado direto. Traduza
toque/clique/tecla em **comandos nomeados**; assim dá para remapear, gravar e testar.
**GC36. Fidelidade do controle** define quantidade e tamanho dos alvos: toque e analógico pedem
**poucos alvos grandes**; mouse tolera precisão. **GC38. Alvos com margem** ("nada de pixel
perfeito"), cursor/realce que **anuncia** o que é clicável, **descobribilidade** (atalho não
anunciado não existe), e **observe alguém jogar sem ajudar: em ~30 s deve entender**.
**GC37. Controles remapeáveis** e esquerda/direita, invertido/normal: aumenta quem consegue jogar.
Convenção antes de inovar; inovar só com teste com pessoas. **GC39. Não consulte o estado do
dispositivo "por fora"** do fluxo de mensagens (quebra replay e teste). **GC40. UI de jogo**: pilha
de elementos desenhados em camadas (modal por cima), controles com identificação e estados (normal,
foco, pressionado, desabilitado), ordem de foco, telas rasas, **localização estoura layouts** (reserve
espaço). Limite os quadros da vista; a lógica não depende deles. Detalhes de UX: `24`.

## 3. Eventos e processos (cap. 10, 6)

**GC23. Evento ≠ processo.** Evento = algo **aconteceu agora**; processo = algo que **dura vários
quadros** (animação, fala, espera, transição). Juntos montam muito jogo com pouco código.
**GC24. Quem decide anuncia; quem se interessa assina.** Subsistemas só conhecem o **barramento**.
**GC25. Tipos por nome (texto, minúsculo)**, não enum central que todos importam; verifique
colisão e **registre os tipos** antes de usar (erro cedo, mensagem clara).
**GC26. Disparar agora × enfileirar**; **fila dupla** (eventos gerados durante o processamento vão
para a próxima rodada: evita laço infinito); **orçamento de tempo por quadro**; colapse eventos
redundantes. **GC27. Ouvinte no gerente do subsistema**, não em cada objeto; **log de todos os
eventos** como instrumento de depuração e de replay; serialize a fila para salvar/restaurar.

```js
// Meu barramento mínimo com fila dupla (comparar com GP12/GP13 em 25).
const createEventBus = () => {
  const subs = new Map(); let cur = [], next = [];
  return {
    on(type, fn) { (subs.get(type) ?? subs.set(type, []).get(type)).push(fn); },
    emit(type, data) { next.push({ type, data }); },          // enfileira
    tick(budgetMs = 4) {
      [cur, next] = [next, []]; const t0 = performance.now();
      for (const e of cur) { (subs.get(e.type) ?? []).forEach(f => f(e.data));
        if (performance.now() - t0 > budgetMs) break; }
    } };
};
```

**GC41. Processos cooperativos** (cap. 6): cada processo tem `update(dt)`, estado (rodando,
terminado, falhou, abortado) e **"próximo"**: uma sequência vira **corrente** (fala → pausa → som →
transição) e uma espera é só um processo. Cuidado com **fome** (um processo longo prende os demais
se for em lote sem divisão) e com falhas que **abortam a corrente** (defina o que é falhar).
Esta é a base certa para **cenas com tempo** de visual novel e de cutscene curta (`17`, `22`).

```js
const seq = (...procs) => { procs.reduce((a, b) => (a.next = b), null); return procs[0]; };
// seq(fadeIn(), say("..."), wait(1.2), playSound("sino"), fadeOut())
```

## 4. Recursos e carga (cap. 7)

**GC20. Dados pesam diferente**: imagens e áudio dominam; escolha **formato e qualidade por ativo**
(compressão com perda onde não se nota; sprite sheet; áudio em taxa/canais suficientes), e guarde
**como gerar** cada arquivo pesado (prompt, parâmetros, original) além do resultado: essencial com
imagens geradas por IA (`07` e a futura ferramenta de kit de consistência).
**GC21. Menos arquivos maiores**: empacote por fase/cena; **índice** na memória; leia em lote.
**GC22. Cache de recursos** com identificador estável, descarte do **menos usado**, **tamanho
pensado para o aparelho mais fraco** do público, **plano de carga** conforme o jogo: **tudo por
cena** (estudo em cenas), **nos "pontos de estrangulamento"** (transições naturais) ou
**contínuo** (mundo andável). Prioridades por recurso; **fallback** se faltar (ícone neutro, não
erro); **não** use texto longo só para disfarçar carregamento. Na web: `fetch` + `Cache`/service
worker (PWA), pré-carregue a **próxima** cena enquanto o jogador lê.

## 5. Conteúdo em dados e script (cap. 11)

**GC28. "Conteúdo, não programadores, torna o jogo divertido."** Invista em formatos e ferramentas
para quem escreve a **passagem, a pergunta, a escolha**. **GC29. Dois usos**: **dados** (JSON:
personagens, cenas, versículos, perguntas) e **controle** (script curto que dirige eventos).
**GC30. Prós e contras do script**: iteração sem recompilar × erros só em execução → exija
**validação do conteúdo ao carregar** (campo faltando, referência inexistente, versículo sem fonte)
com **mensagem para o autor**, jamais tela em branco; revise o script e mantenha-o simples (o livro
avisa que linguagens de script crescem até virar um monstro sem ferramentas).
**GC31. O que vive onde**: motor e partes pesadas em código; **o que é do jogo**, em dados/script;
referência por **ID**, nunca por cópia. **GC32. Ponte pelo barramento de eventos**: um ponto central
de comunicação, dados em objeto com **opcionais e valores padrão** (mudar parâmetros não quebra
conteúdo antigo), e **restrinja** quais eventos o conteúdo pode criar. **GC34. Console in-game**
(comandos/atalhos de teste: "ir para a cena 12") e **co-rotinas** para "direção de cena" em linha:

```js
// Meu exemplo: roteiro de cena com generator (equivale às co-rotinas do livro).
function* cenaDoPoco() {
  yield say("narrador", "Era meio-dia.");
  yield wait(1);
  const r = yield choice(["Pedir de beber", "Calar"]);
  if (r === 0) yield say("mulher", "Como tu, judeu, pedes a mim?"); // João 4.9: texto bíblico, citar com fonte
}
// o motor avança o generator quando o processo anterior termina (GC41)
```

## 6. Ciclo de vida, qualidade e produção (cap. 5, 19–21 e partes de 2–3)

**GC9. Inicialização em ordem e desmontagem em ordem inversa**; **falhe com educação**: erro de
início vira mensagem ao jogador ("sem espaço", "versão antiga"), não tela preta. Inicie **textos e
idiomas cedo**; verifique requisitos (espaço, armazenamento, tela) antes de prometer.
**GC10. Dois arquivos de opções**: do **jogador** (idioma, volume, controles, contraste) e do
**desenvolvedor** (atalhos, logs). **GC11. Salvar só se mudou** e perguntar/avisar; salve também o
**ponto do estudo**, não só o "estado técnico".
**GC12. Aleatoriedade com sementes** e **geradores independentes** (sorteio de sequência de
perguntas separado do de efeitos): permite **repetir** uma partida para depurar e testar; nunca
misture com o relógio.
**GC13. Teste de fumaça**: abrir o jogo, rodar o primeiro quadro, percorrer uma cena por **script
de teste** em toda mudança. **GC14. Ferramenta de autoria é parte do jogo** (cap. 20): um editor
simples (lista de cenas, pré-visualizar, "jogar daqui") poupa mais tempo que qualquer otimização;
poucos cliques; o editor **reaproveita o mesmo motor**; mantenha jogo e editor sincronizados.
**GC15. Depuração** (cap. 21): monte um **dicionário de defeitos** (vazamento de memória,
corrupção, pilha etc.); reproduza antes de consertar; **log de eventos** e replay resolvem 80% dos
casos em JS (os defeitos de memória do C++ pouco existem aqui; o que sobra são estados
inconsistentes e carga assíncrona). **GC16. Ramos de trabalho** (principal, pesquisa, estável),
**compilação diária automática**, notas de versão e **lista de bugs** priorizada.

## 7. Gêneros habilitados e técnicas reaproveitáveis (diretriz do usuário)

| Gênero | O que o livro habilita | Observação para a web |
|---|---|---|
| **Visual novel / aventura de cenas** | Processos em corrente, eventos, co-rotinas, cache por cena | Núcleo natural (`17`, `22`) |
| **Detetive / investigação** | Barramento de eventos como "quadro de conhecimento" (cada pista é evento; deduções assinam), validação lógica de comandos, conteúdo em dados | O livro **não** traz o design de dedução; use `09` e `23` |
| **RPG de exploração** | Camadas lógica/vista, objetos por ID, **cache e plano de carga contínuo**, eventos de gatilho (entrar/sair de área), editor de níveis, salvar/carregar | Mapa em tiles e *pathfinding* **não** estão neste livro (há IA/3D que não li); procurar em outra fonte |
| **Aventura gráfica ponto e clique** | Alvos com margem, cursor como feedback, descobribilidade, co-rotinas de cena, **script de conteúdo** | O livro cita as aventuras Lua da LucasArts como origem do uso de script |
| **Simulação / gestão** | Processos de vários quadros, orçamento de tempo, sementes e replay | Sem modelo econômico; ver `04`/`10` |
| **Puzzle** | Comandos com desfazer (com `25`), estado puro e testável | Boa combinação com GC3 + GP3 |
| **Multijogador em grupo** (célula, sala) | Vistas remotas e lógica autoritativa | **Rede não foi lida** (cap. 16 pulado); só a ideia de que comandos e eventos serializáveis facilitam |

**Técnicas reaproveitáveis**: camadas lógica/vista; comando como porta única; barramento com fila
dupla e orçamento; corrente de processos; cache + plano de carga + fallback; validação de
conteúdo; console de depuração; sementes por subsistema e replay; salvar só se mudou; teste de
fumaça; editor simples de cenas; dicionário de defeitos.

## 8. Aplicação teológica

- **Fidelidade como validação automática**: toda cena de dados exige `fonte` (livro, capítulo,
  versículo) e `rotulo` (texto / contexto / inferência) do `07`; o carregador **recusa** cena sem isso.
- **Replay de sessões em grupo**: gravar os comandos permite que o líder **revise a discussão**
  ("o que cada um escolheu aqui?") sem coletar dados pessoais além do necessário (`06`).
- **Cenas com tempo e silêncio**: processos em corrente permitem pausa **sem cronômetro de pressão**;
  nenhum processo deve cobrar pressa do jogador (acessibilidade, `24`).
- **Editor para pastores/professores**: abrir o jogo de uma passagem, trocar texto e perguntas sem
  tocar em código é o que torna a skill **escalável a vários estudos** (GC14, GC28).
- **Teste de fumaça por passagem**: antes de entregar, percorrer o estudo do início ao fim e conferir
  que cada versículo citado aparece com fonte.

## 9. Ressalvas

- Livro de 2009, **C++/DirectX/Windows**, voltado a jogos 3D de ação; muitos capítulos (3D,
  física, rede, multiprogramação, memória, áudio de baixo nível) **não se aplicam** a JS e **não
  foram lidos** (ver `livros.md` seção 21).
- A solução do livro para grandes jogos (gerente de eventos em C++, ponte Lua) é **mais pesada do que
  um jogo teológico web precisa**: para uma cena curta, um objeto de estado e funções bastam
  (GP1: abstração especulativa custa). Use esta ferramenta quando o projeto **passar de um estudo**
  ou tiver vários autores.
- O livro prega **produção em equipe de estúdio**; adapte à equipe pequena (uma pessoa + IA).
