# Ferramenta 45: JavaScript moderno e qualidade de código (Haverbeke)

> **Pipeline:** fase principal **F5** (`../pipeline/F5-producao-e-codigo.md`).

Para **escrever o código do jogo na web com disciplina**: estado, funções, objetos, módulos,
erros, testes, assíncrono, eventos, laço de animação e armazenamento local. Fonte: Marijn
Haverbeke, *Eloquent JavaScript* (edição recente, com recursos até ES2022, como campos privados
com `#` e `Object.hasOwn`; **ano e edição não verificados no arquivo**). Os itens `EJ#` são meus
(numeração por tema; **tudo em paráfrase**; trechos de código são **reescritos por mim**, com
nomes do domínio do projeto). Substitui, para JS moderno, as fontes de 2011–2012 citadas em
`lacunas-e-fila-de-livros.md`. Complementa `08` (implementação web), `25` (padrões de
programação), `28` (arquitetura de motor), `31` (mundos em grade), `32` (Three.js), `29`
(pesquisa) e `24` (UX).

> **Escopo da leitura:** é um livro **geral** de JavaScript (linguagem, navegador, Node). Li com
> profundidade os capítulos de **funções de ordem superior, objetos, projeto do robô, bugs e erros,
> módulos, assíncrono, eventos e jogo de plataforma**, e li em parte canvas, HTTP/formulários
> (armazenamento local) e a lista de títulos dos demais. **Não li** os capítulos de valores,
> estrutura de programa, funções, estruturas de dados, expressões regulares, linguagem de
> programação, DOM, editor de pixel art, Node e site de compartilhamento. Ver `livros.md`, seção 53.

## 1. Mentalidade (EJ1 a EJ6)

**EJ1. Abstrair para reduzir erro:** programa grande é caro e esconde defeitos; use um
**vocabulário do problema** (somar um intervalo, não "contadores e laços"). Perceba quando está
**baixo demais** em abstração.
**EJ2. Funções de ordem superior:** passar **ações** como valores (`filter`, `map`, `reduce`,
`some`, `find`, `forEach`); compor **pipelines** legíveis; custo: arrays intermediários (use laço
só quando medir que importa).
**EJ3. Não vire tudo em objeto:** "soar como objeto" não obriga a classe; reduza o mundo ao
**mínimo de valores** que o definem e calcule **novo estado** a cada passo (estado **persistente**),
o que facilita entender e **testar**.
**EJ4. Herança com parcimônia:** **encapsulamento** e **polimorfismo** reduzem emaranhado;
**herança** amarra classes. Prefira **composição**, interfaces pequenas e **função em vez de
objeto com ritual de estados**.
**EJ5. Complexidade é o limite:** o que você consegue **compreender** limita o sistema que
consegue construir; projete para **excluir** facilmente, não só para estender.
**EJ6. Intuição de simulação:** testar estratégias (aleatório, rota fixa, orientado a meta) com
**medida comparável** (mesmas tarefas para todas), não com "alguns casos".

## 2. Dados e objetos (EJ7 a EJ12)

**EJ7. Mapas:** objeto comum como mapa **herda** chaves do protótipo (`toString`); use `Map`,
`Object.create(null)` ou `Object.hasOwn`.
**EJ8. Classes, privados e acessores:** campos e métodos **privados (`#`)** escondem detalhe;
**getters/setters** disfarçam cálculo; **estático** para criadores alternativos.
**EJ9. Iteração:** implementar o **protocolo iterável** (`Symbol.iterator`) deixa o seu tipo
funcionar em `for/of` e `...`; **geradores** (`function*`) simplificam.
**EJ10. Dado imutável:** não alterar, **recriar**; `Object.freeze` ajuda, mas pode **silenciar
erros**; combine com convenção de equipe.
**EJ11. Interface estável:** código escrito para uma **interface** (ex.: "algo que se desenha",
"algo que se atualiza") aceita **qualquer objeto** que a cumpra (display de DOM ou de canvas).
**EJ12. `this`:** em funções comuns depende de **como** são chamadas; **setas** herdam o `this` de
fora; classes **exigem `new`**.

## 3. Erros, testes e depuração (EJ13 a EJ20)

**EJ13. Modo estrito (`"use strict"`):** transforma erros silenciosos (variável global criada sem
querer, `this` indefinido) em **erros**; módulos ES já são estritos.
**EJ14. Tipos:** JS só pensa em tipos **em execução**; comentários de tipo ou **TypeScript**
ajudam a **evitar confusão** entre o que entra e sai.
**EJ15. Testes automatizados:** repetir à mão é ineficaz; escreva **testes rotulados** pequenos,
use um **executor de testes**; código com **valores autocontidos** (puro) testa-se fácil;
quanto mais dependência externa, mais difícil montar o contexto.
**EJ16. Depurar com método:** **não** alterar ao acaso; formular **teoria**, observar com
`console.log` ou **ponto de parada**/`debugger`, testar a teoria.
**EJ17. Retorno especial × exceção:** valores especiais (`null`, `{failed: true}`) para erros
**comuns e esperados**; **exceções** quando quem chamou não tem como tratar ali; funções
intermediárias "esquecem" o erro.
**EJ18. Limpeza e consistência:** efeitos colaterais parciais deixam **estado inconsistente**
se uma exceção interrompe; `finally` garante **reparar**; prefira **calcular valor novo**.
**EJ19. Captura seletiva:** **não** capture tudo; defina **classes de erro** próprias
(`class InputError extends Error`) e use `instanceof`; **não** decida pela **mensagem** (é
para humanos, muda com tradução); **reaponte** o que não for seu.
**EJ20. Asserções** só para **erros de programador** fáceis de cometer (barulhentas, não
para entrada comum); não declare para tudo.

## 4. Módulos e pacotes (EJ21 a EJ24)

**EJ21. Módulos ES:** `import`/`export`, escopo próprio, **dependências explícitas**; interface =
nomes exportados; `export default` para um único valor; CommonJS (`require`) é **legado**.
**EJ22. Pacotes e licenças:** NPM tem muita coisa útil e muito lixo; **verifique licença**
(algumas exigem publicar derivados sob a mesma licença); evite copiar-colar entre projetos.
**EJ23. Empacotar e minificar:** muitos arquivos pequenos custam carga; **bundlers** combinam,
**minificadores** reduzem; ferramentas mudam, **pesquise na hora**.
**EJ24. Projetar módulo:** interface **pequena e previsível**, **uma coisa focada**, **valores
em vez de ações com efeito** (componha com leitor de arquivo à parte), **estruturas de dados
comuns** (a mesma forma de grafo que outros pacotes) para compor.

## 5. Assíncrono (EJ25 a EJ30)

**EJ25. Callbacks → promessas → `async/await`:** promessa é um **recibo** de valor futuro;
`then` encadeia; **rejeição** flui até um `catch`; `async/await` deixa código assíncrono
**linear**, mas exige entender promessas.
**EJ26. Combinadores:** `Promise.all` para tarefas **em paralelo**; `wait(ms)` com `setTimeout`;
**limite de tempo** (timeout) envolvendo uma promessa.
**EJ27. Laço de eventos:** um programa por vez; código demorado **atrasa** eventos; callbacks
rodam em **pilha vazia** (por isso exceções não cruzam `setTimeout`); promessa resolvida ainda
roda **depois** do script atual.
**EJ28. Bug assíncrono:** `+=` em variável compartilhada sobre `await` **perde** resultados;
**devolva valores** e junte no fim (`Promise.all` + `join`).
**EJ29. Geradores e retomada:** funções que pausam e retomam; `async` é um tipo de gerador.
**EJ30. Trabalhadores (workers):** computação pesada **fora** da interface, comunicando por
mensagens (dados **copiados**, só o que é JSON).

## 6. Navegador, eventos e laço de jogo (EJ31 a EJ40)

**EJ31. Eventos:** `addEventListener`/`removeEventListener`; **propagação** (alvo → ancestrais),
`stopPropagation`, `preventDefault` (use com **cautela**, quebra expectativa); **delegar** no
contêiner usando `event.target`.
**EJ32. Teclado:** `keydown` **repete** ao segurar; propriedade `key`; modificadores
(`ctrlKey`...); teclado virtual e IME **não** geram teclas de forma simples: para **texto**, use o
evento `input` e leia o campo.
**EJ33. Ponteiro e toque:** `mousedown/up/move/click`; **toque** tem vários pontos
(`touches`); mouse e toque **não são iguais**; rastrear arrasto no `window`.
**EJ34. Foco e carga:** `focus/blur` (não propagam), `load`; **`beforeunload`** pode **proteger
trabalho**, mas navegadores limitam.
**EJ35. Temporizadores:** `setTimeout/clearTimeout`, `setInterval`; **debounce** (esperar uma
pausa) e **limitação** (no máximo a cada N ms) para eventos frequentes (`mousemove`,
`scroll`).
**EJ36. Laço de animação com passo limitado:** `requestAnimationFrame` com **diferença de tempo
em segundos**, **limitada** (ex.: 100 ms) para que aba escondida não "avance" o jogo e o jogador
não atravesse o chão; a função devolve `false` para parar.
**EJ37. Mundo em grade + atores:** fase como **texto** (cada caractere um elemento),
**fundo** estático e **atores** móveis com `pos`, `size`, `update(tempo, estado, teclas)` e
`collide`; **tamanho em unidades de grade**, escala para pixel só ao desenhar.
**EJ38. Colisão simples:** testar o retângulo contra a grade **antes** de mover, por **eixo**
(horizontal e vertical separados), cancelando o movimento; exige **passos pequenos**;
sobreposição **AABB** entre atores.
**EJ39. Estado persistente do jogo:** cada `update` devolve **novo** estado
(`jogando/ganhou/perdeu`); a **exibição** é trocável (DOM ou canvas) pela mesma interface;
`runLevel` devolve **promessa** e `runGame` usa `async` para a sequência de fases.
**EJ40. Teclas contínuas:** guardar o **estado** das teclas (apertada/solta) em objeto, não
reagir **uma vez por toque**; oferecer **desregistro** dos tratadores (evitar vazamento).

## 7. Gráficos e dados locais (EJ41 a EJ44)

**EJ41. HTML × SVG × canvas:** HTML (texto, simples, ótimo para **interface** e para cenas
com pouco elemento), SVG (vetor **nítido**, objetos manipuláveis, eventos por elemento),
canvas (**muitos elementos pequenos**, efeitos por pixel; não guarda objetos); **combine**.
**EJ42. Canvas:** contexto 2D, retângulos, caminhos, texto, `drawImage` (folha de sprites),
**transformações** (salvar e restaurar), redesenhar tudo a cada quadro.
**EJ43. `localStorage` e `sessionStorage`:** guarda **strings** por origem, **limitado** em
tamanho, sobrevive ao recarregar; serialize com JSON; use `??` para valor inicial; é do
**navegador**, não do servidor.
**EJ44. HTTP e formulários:** `fetch` assíncrono, **restrições de origem**, formulários e
campos (foco, desabilitado, checkbox, seleção, arquivo); **HTTPS** e segurança.

## 8. Exemplos meus testados (a partir das ideias acima)

```js
'use strict';
// 1) Estado imutável, mover item, desfazer (EJ3, EJ10, EJ39)
const novo = (ordem) => Object.freeze({ ordem: Object.freeze([...ordem]), acertos: 0, status: 'jogando' });
const mover = (estado, de, para) => {
  if (de === para || de < 0 || para < 0 || de >= estado.ordem.length || para >= estado.ordem.length) return estado;
  const o = [...estado.ordem];
  const [x] = o.splice(de, 1);
  o.splice(para, 0, x);
  const gabarito = [...estado.ordem].sort((a, b) => a - b);
  const ok = o.every((v, i) => v === gabarito[i]);
  return Object.freeze({ ordem: Object.freeze(o), acertos: ok ? estado.acertos + 1 : estado.acertos, status: ok ? 'ganhou' : 'jogando' });
};
class Historico {
  #passados = []; #atual;
  constructor(inicial) { this.#atual = inicial; }
  get atual() { return this.#atual; }
  aplica(fn) { const n = fn(this.#atual); if (n !== this.#atual) { this.#passados.push(this.#atual); this.#atual = n; } return this; }
  desfaz() { if (this.#passados.length) this.#atual = this.#passados.pop(); return this; }
}
// 2) Erro específico e entrada validada (EJ19)
class ErroDeEntrada extends Error {}
const analisaRef = (s) => {
  const m = /^\s*([1-3]?\s?[A-Za-zÀ-ú]+)\s+(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?\s*$/.exec(s);
  if (!m) throw new ErroDeEntrada('referência inválida: ' + s);
  return { livro: m[1].replace(/\s+/g, ' '), cap: +m[2], v1: +m[3], v2: m[4] ? +m[4] : +m[3] };
};
// 3) Passo de tempo limitado e debounce com relógio injetável (EJ35, EJ36)
const passoLimitado = (agoraMs, ultimoMs, maxMs = 100) => Math.min(agoraMs - ultimoMs, maxMs) / 1000;
const debounce = (fn, ms, { set = setTimeout, clear = clearTimeout } = {}) => { let t; return (...a) => { clear(t); t = set(() => fn(...a), ms); }; };
// 4) Executor de testes mínimo (EJ15)
const teste = (rotulo, corpo) => { let ok = false; try { ok = corpo(); } catch {} if (!ok) console.log('FALHOU:', rotulo); };
```

**Resultado do teste:** **9 de 9** testes passaram em Node (estado antigo intacto, jogada
inválida devolve o mesmo objeto, vitória ao ordenar, desfazer, referência simples e com
intervalo e livro numerado, referência inválida lança `ErroDeEntrada`, passo limitado a 0,1 s,
`debounce` dispara uma vez). **Observação:** o analisador de referência é um **exemplo**; ele
**não** trata todos os formatos de livros e abreviações em português.

## 9. Gêneros habilitados e técnicas reaproveitáveis (diretriz do usuário)

- **Gêneros habilitados:** **plataforma 2D** (jornada com obstáculos e "moedas" de
  versículos), **simulação passo a passo** (mundo reduzido a estado + política, como o robô),
  **quebra-cabeça de ordem/sequência** (reordenar com desfazer), **editor/criador** (estado +
  histórico), **jogos baseados em texto e fase em grade** (planta por caracteres).
- **Técnicas reaproveitáveis:** estado **persistente** e `update` puro (testável, reprodutível);
  **atores** com interface comum; **fase como texto**; **laço com passo limitado**;
  **teclas contínuas**; **colisão por eixo**; **exibição trocável**; **histórico de desfazer**;
  **salvar** em `localStorage` (serializar JSON); **workers** para cálculo pesado;
  **erros próprios** e **testes rotulados** como rede de proteção da narrativa (ex.: "o fim
  canônico não muda").

## 10. Aplicação a jogos teológicos (inferência minha)

| Ideia | Uso | Cuidado |
|---|---|---|
| **EJ3, EJ10 (estado persistente)** | Reproduzir uma sessão a partir do **estado**; **replay** para revisão em grupo | **Não** guardar dados pessoais além do mínimo (`29`) |
| **EJ15, EJ20 (testes e asserções)** | **Testar a fidelidade**: o jogo **nunca** altera o texto canônico (comparar com fonte), finais fixos, referências válidas | Testes **não** substituem a **revisão teológica** humana (`21`) |
| **EJ19 (erros próprios)** | Separar **entrada inválida** de **bug** e mostrar mensagem **gentil** ao jogador | Sem culpar o jogador; sem registrar texto livre sensível |
| **EJ25 a EJ28 (assíncrono)** | Carregar textos e imagens **sem travar**; mensagens de espera claras | Evitar **dependência de rede** para o conteúdo essencial (uso offline) |
| **EJ32 (teclado, IME)** | Campos de **texto livre** funcionando com **teclado virtual**, **leitores de tela** e **IME** | Não depender de teclas; **sempre** alternativa por toque (`24`) |
| **EJ36 (passo limitado)** | Jogo **não "pune"** aba escondida ou lentidão | Sem cronômetro punitivo (`07`, `16`) |
| **EJ40 (teclas contínuas)** | Controles com **alternativa** (toque, botões grandes) | Respeitar **motricidade** e **acessibilidade** |
| **EJ43 (`localStorage`)** | **Salvar** progresso no aparelho, **sem conta** | Avisar o que é guardado e **permitir apagar**; não é à prova de adulteração |
| **EJ22 (licenças)** | Registrar **licença de cada pacote** e de **fontes bíblicas** | Combinar com a lacuna de **LGPD/licenças** (`lacunas-e-fila-de-livros.md`) |

## 11. Ressalvas

- **Leitura:** ver `livros.md`, seção 53. **Não li** os capítulos 1 a 4, 9, 12 a 14, 19 a 21 em
  detalhe (valores e tipos, estrutura, funções, dados, regex, linguagem, DOM, editor de pixel
  art, Node, site de compartilhamento); consultar o livro para esses temas.
- **Não cobre** motores de jogo, física, áudio, 3D, PWA, empacotamento de loja nem segurança
  em profundidade; veja `08`, `28`, `31`, `32`, `44`.
- Exemplos **meus** foram testados em **Node**; **não** foram testados no navegador (DOM,
  `requestAnimationFrame`, `localStorage`).
