# Ferramenta 08: Implementação web

> **Pipeline:** fase principal **F5** (`../pipeline/F5-producao-e-codigo.md`); também usada em F7.

Para programar, hospedar e publicar. **Esta ferramenta não vem de livro**: registra as decisões
técnicas tomadas com o usuário e as práticas padrão da web. Quando entrarem livros de programação,
os princípios deles serão adicionados aqui, com fonte.

## Decisões já tomadas

- Rodar no navegador de PC, tablet e celular.
- Hospedagem simples (arquivos estáticos em servidor comum).
- Poder virar app e subir nas lojas.

## Stack proposta

| Peça | Escolha | Motivo |
|---|---|---|
| Linguagem | JavaScript (módulos ES) | Roda em qualquer navegador |
| Estrutura visual | HTML + CSS responsivo | Mesmo layout em PC, tablet e celular |
| Motor | Nenhum para narrativa pura; **Phaser** se a mecânica exigir 2D com física/animação | Phaser é gratuito e bem suportado em mobile |
| Conteúdo | Arquivos JSON (cenas, falas, versículos, metas) | O autor escreve sem mexer em código; troca de mecânica fica barata |
| Salvamento | `localStorage` no início | Sem backend; contas só se houver necessidade real |
| Instalação | PWA (manifesto + service worker) | Vira "app" e funciona offline sem loja |
| Lojas | Capacitor | Empacota o mesmo código para Android e iOS |
| WebAssembly | Não usar | Só vale para jogos pesados; aqui só adiciona complexidade |

## Arquitetura recomendada (separar conteúdo, regra e tela)

```
/jogo
  index.html
  manifest.webmanifest
  sw.js                 (service worker)
  /src
    main.js             (inicialização)
    engine/             (loop, estado, salvamento, áudio)
    rules/              (regras do jogo; funções puras sobre o estado)
    ui/                 (renderização, componentes, acessibilidade)
  /content
    cenas/*.json        (passagens, falas, escolhas)
    textos/*.json       (versículos com referência e licença)
  /assets               (imagens, áudio, fontes)
```

**Princípios técnicos (síntese de boas práticas; confirmar com livros técnicos quando chegarem):**

1. **Estado explícito.** Um único objeto de estado serializável; telas são função do estado. Isso dá
   salvamento, desfazer e teste de graça (ligado à Máquina de Estados, 04).
2. **Regras separadas da tela.** Regra = função pura (estado, ação) → novo estado. Permite testar a
   regra sem abrir o navegador e trocar a interface depois.
3. **Conteúdo em dados.** Cena = dados; o motor interpreta. Facilita revisão doutrinária do texto sem
   tocar no código.
4. **Mobile primeiro.** Alvos de toque grandes, sem hover obrigatório, texto legível, funciona em
   retrato e paisagem.
5. **Acessibilidade.** Contraste, tamanho de fonte ajustável, navegação por teclado, texto
   alternativo; jogos de estudo bíblico alcançam idosos e crianças.
6. **Offline.** Cache de ativos pelo service worker para uso em igreja/local sem rede.
7. **Licença do texto bíblico** guardada junto de cada versículo no JSON.

## Caminho para as lojas

- Google Play: taxa única (cerca de US$ 25). Apple Developer: cerca de US$ 99 por ano; o build final
  de iOS precisa de um Mac.
- Mantenha política de privacidade; apps religiosos são aceitos, mas conteúdo enganoso ou ofensivo
  causa rejeição.
- Valores e regras das lojas mudam: confirme antes de se comprometer.

## Práticas vindas de Sylvester (*Designing Games*, aplicadas à web; síntese minha)

- **Grayboxing em código:** primeiro tela de caixas e botões rotulados, texto simples e sem arte; só
  depois CSS, ilustrações e áudio (10, PL9).
- **Instrumentação (métricas):** registre eventos do jogador (escolhas, tempo por cena, onde
  abandonou) em um arquivo local ou endpoint simples; respeite privacidade (consentimento, sem
  dados pessoais). Serve ao playtest (06, T15).
- **Sensação de controle e latência:** em jogo narrativo 30 fps basta, mas o toque deve responder em
  menos de 100 ms; evite animações longas que bloqueiem a próxima decisão (09, D9).
- **Mapeamento e exclusividade:** botões e gestos devem lembrar o efeito (05); em toque, alvos grandes
  e sem ações exclusivas na mesma zona de polegar.
- **Estados ilegais impossíveis:** modele cada atributo como máquina de estados (03) para que
  transições inválidas não existam.

## Mapa das regras no código (Salen e Zimmerman, cap. 12 e 13; síntese minha)

| Nível de regra | Onde vive no projeto |
|---|---|
| **Constitutivas** (lógica abstrata do estado) | `src/rules/`: funções puras (estado, ação) → novo estado |
| **Operacionais** (o que o jogador faz e vê) | `src/ui/` e `content/`: telas, controles, texto de instruções, tutorial |
| **Implícitas** (etiqueta, convenções da plataforma) | Padrões de toque, convenções de PWA, texto de ajuda; costume do grupo |

- Regras ≠ código: a lógica de entrada e saída e a seleção interna (o "próximo bloco") são regras,
  mesmo estando espalhadas no código. Documente-as como constitutivas.
- Eventos internos (estado) e externos (o que o jogador percebe) devem ser separados: o estado muda,
  a camada visual o representa. Isso favorece a **anatomia de uma escolha** (09, D11).
- Gerador aleatório do navegador é pseudoaleatório e não é "justo" por padrão; use semente
  reprodutível para testes e documente a distribuição (03, M12).

## Práticas de prototipagem digital de Fullerton (*Game Design Workshop*, cap. 8 e 10; síntese minha)

- **Quatro áreas de investigação** (Todd): *mecânica* (a regra funciona?), *estética* (cara e som),
  *cinestesia* (como os controles **sentem**; só se testa em digital) e *tecnologia* (e fluxo de
  produção). Cada protótipo investiga **uma**.
- **Código de protótipo é descartável.** Roube, finja ou reuse; não promova o protótipo a produto;
  guarde o aprendizado. Na web, isso significa um `prototype/` separado do `engine/`.
- **Tudo é variável.** Nada de constantes literais; exponha os valores em campos editáveis (ou em JSON
  recarregável) para ajustar durante o teste sem recompilar. Mantenha uma **planilha espelho** das
  tabelas do jogo e permita importar variações.
- **Tabela de controles** por estado do jogo (controle → procedimento), com padrões iguais entre
  estados. Mobile: sem *hover* e sem botão direito; planeje o toque desde o início (Unpacking).
- **Ponto de vista e interface:** a escolha é formal e dramática (informação x relação). "Forma segue
  função": nunca desenhe a interface antes do jogo; use metáfora com cuidado (modelo mental), mapeamento
  natural (rosto que fere = saúde), agrupar e manter consistência.
- **Texto como protótipo:** ferramentas como Twine servem para testar narrativa ramificada e escolhas
  antes de qualquer interface; os dados podem migrar para o JSON do jogo final.
- **Dados do teste:** registre o que o jogador fez (cliques, tempo, onde parou) para cruzar com o que
  disse (06, GW36); ao fazê-lo, avise e peça consentimento (07).

## Critérios de ferramenta e de ativos (Hill-Whittall, *The Indie Game Developer Handbook*; síntese minha)

O catálogo de produtos do livro (2014) está desatualizado; **valem os critérios**.

- **HW1. Não mantenha motor próprio.** Meses perdidos a cada plataforma nova. Para este projeto:
  HTML, CSS e JS puros e Capacitor para as lojas; motor 2D (Phaser, Godot) só se a mecânica exigir
  física, animação ou muitos sprites.
- **HW2. Teste antes de fixar a ferramenta** com um protótipo pequeno.
- **HW3. Avalie** plataformas exportáveis, modelo de preço, comunidade, curva de aprendizado e se a
  versão grátis é utilizável.
- **HW4. Navegador é a plataforma mais acessível** (combina com o plano web-first).
- **HW5. Reaproveite ativos, de olho na licença**: leia a licença de cada item (muitos "grátis" proíbem
  uso comercial) e registre origem e licença (fase F7, `pipeline/F7-publicacao-e-iteracao.md`).
- **HW8. Texto de interface em arquivo externo**: facilita edição e tradução (separar conteúdo).
- **HW9. Protótipo incremental**: texto e escolhas, estado, tela mínima, depois som e arte.

## Visual novels na web (Kretzschmar e Raffel, cap. 7; síntese minha)

Funções esperadas pelo público: salvar e carregar rápido com vários espaços, **pular texto já lido**
(parando em conteúdo novo), automático, histórico de texto, galeria e tamanho de fonte. Ren'Py e Twine
servem para prototipar o roteiro antes de implementar em JS. Ver `17-visual-novels.md` (VN11, VN13, VN24).

## O que fazer em um pedido de programação

1. Pergunte (ou confirme) a mecânica e o escopo mínimo (uma cena jogável).
2. Proponha o esquema JSON da cena antes do código.
3. Implemente primeiro o estado e as regras; depois a tela mínima.
4. Entregue algo rodável com instrução de como abrir (um arquivo `index.html` servido localmente).

## Mobile web: práticas que continuam valendo (Bura e Coates, 2012; Rettig, 2012; síntese minha)

Os dois livros são de 2012 e usam tecnologias que **não valem mais** (Crafty.js, PhoneGap, Flash,
manifest de cache de aplicação); ficam apenas as ideias abaixo, com a versão atual entre parênteses.

- **MW1. Esqueleto de celular.** Um só canvas ocupando a tela, sem rolagem nem zoom indesejado,
  `viewport` definido, redimensionar em `resize`/`orientationchange` (atribuir `canvas.width/height`
  apaga o desenho; repinte) e considerar `devicePixelRatio`.
- **MW2. Orientação.** Não se trava a orientação no navegador: projete para os dois modos (fase F4).
- **MW3. Entrada unificada.** Use **Pointer Events** (toque, mouse e caneta no mesmo tratador),
  coordenadas relativas ao canvas e limiar de movimento para distinguir toque de arrasto.
- **MW4. Animação por fração.** Separe a fração 0..1 do tempo da função de easing; valide parâmetros.
- **MW5. Regra única nos dois lados.** Em jogo em rede, valide no cliente (feedback) **e** no
  servidor (autoridade), com a mesma regra escrita uma vez.
- **MW6. Rede.** WebSocket ou SSE; em grupo, **turnos** toleram atraso (sem tempo real).
- **MW7. Áudio.** Tocar só após gesto do usuário; poucas trilhas; ícone para silenciar.
- **MW8. Offline** com **service worker** (PWA); listar recursos e versionar.
- **MW9. Desempenho.** Minificar, comprimir imagens, servir por CDN.
- **MW10. Localização do aparelho** (`geolocation`) só se essencial: dado pessoal sensível, pedir
  com explicação, funcionar sem ela, nunca gravar trajeto; cuidado com crianças em vias públicas.

```js
// Meu exemplo (testado): interpolação com easing, separada do relógio.
const easings = { linear: f => f, entra: f => f * f, sai: f => 1 - (1 - f) * (1 - f),
                  suave: f => f * f * (3 - 2 * f) };
const anima = (de, ate, fr, ease = easings.linear) =>
  de + (ate - de) * ease(Math.min(1, Math.max(0, fr)));

// Meu exemplo (testado): distância em metros entre dois pontos (Haversine).
const dist = (a, b) => {
  const R = 6371000, rad = x => x * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
```

**Fora do que a skill adota:** monetização como produto de loja (ver 07 e 16).
