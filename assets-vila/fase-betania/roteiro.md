# Betânia: roteiro das cenas

Domingo, de madrugada: o terceiro dia. O jogador não sabe o que aconteceu e sente que algo está estranho.
A fase apresenta quem ele é, o que vai fazer no jogo e o primeiro lugar de memória: o túmulo de Lázaro.

As cenas estão em `js/cenas.js`. O diretor de câmera fica em `limpo-motor/cine.js`, a lembrança (flashback) em
`limpo-motor/lembranca.js` e o vão escuro da gruta em `limpo-motor/vao.js`.

## Regras de direção, válidas para todas as fases

- **Câmera:** em cena, a câmera deixa o jogador e segue quem age. Há barras pretas e um botão "Pular cena".
- **Conversas em plano e contraplano:**
  - a câmera fica por cima do ombro de quem ouve;
  - quando o jogador responde, ela inverte;
  - se uma parede está atrás, ela passa para o lado.
- **Parede entre a câmera e quem age:** a câmera procura outro ângulo. Se não houver nenhum, chega mais perto.
- **Pontos de interesse:** a câmera mostra, com um letreiro, só os lugares de eventos e de lembranças. As outras
  interações o jogador procura sozinho.
- **Lembranças:** o tom é sépia, com grão de filme, e a entrada e a saída são um clarão. Jesus não aparece: a câmera
  fica onde ele estava, e só a voz dele vem na legenda.

## As cenas

### 1. Madrugada, dentro da casa

| Plano | O que mostra |
|---|---|
| close | deitado na esteira, respirando; o letreiro diz "Domingo, de madrugada." |
| recuo | ele acorda e senta |
| médio | de pé, olhando em volta |
| corte | vai até a porta |

Os pensamentos aparecem na legenda:
- "…Que silêncio."
- "Alguma coisa está estranha desde sexta-feira."
- "Ao terceiro dia ressuscitará (Lc 18.33). O que ele quis dizer?"
- "Hoje é o terceiro dia."

### 2. Cléopas

1. **Corte para fora:** a porta abre e ele sai.
2. **Cléopas vem correndo pela rua:** a câmera abre nos dois.
3. **A câmera fecha nos dois** e a conversa corre em plano e contraplano:
   - Cléopas pergunta se ele dormiu, e o jogador responde.
   - Cléopas fala da escuridão, do terremoto e do terceiro dia.
   - Pede que ele refaça o caminho da semana: ouvir os discípulos e voltar aos lugares.
   - Marca o encontro na saída de Jerusalém, na porta da estrada de Emaús.
4. **Cléopas sai correndo pela estrada.** A câmera o vê partir. Ele some no fim da estrada.

### 3. Pontos de interesse

A câmera mostra três lugares, cada um com letreiro:
- o túmulo de Lázaro;
- Lázaro, ao lado do túmulo;
- Marta, à porta de casa.

Depois volta ao jogador num corte.

### 4. Marta

Assim que o jogador volta a andar, Marta chama ("Espere! Bom dia!") e vem ao encontro dele, contornando o forno.
Na conversa:
- oferece pão;
- lembra a ceia e o nardo (Jo 12.1-3);
- lembra "Eu sou a ressurreição e a vida" (Jo 11.25);
- manda o jogador falar com Lázaro.

Depois volta para a porta de casa.

### 5. Lázaro e a lembrança

Perto do túmulo (a 10 m), Lázaro vem ao encontro do jogador. Conta dos quatro dias e diz: "Me contaram depois como foi…"
Então começa a lembrança, com o letreiro "Algumas semanas antes":

| Plano | O que mostra | Legenda |
|---|---|---|
| de frente para a pedra (onde Jesus estava) | Marta e Maria ao lado; dois homens com as mãos na pedra | "Tirai a pedra." (Jo 11.39) |
| de lado | os homens empurram e a pedra rola | — |
| aproximação lenta da boca escura | — | "Lázaro, vem para fora!" (Jo 11.43) |
| Lázaro sai | Lázaro sai da escuridão, enfaixado de linho, com as mãos atadas | — |
| Marta e Maria vão até ele | — | "Desatai-o e deixai-o ir." (Jo 11.44) |

Um clarão traz a cena de volta ao presente. Lázaro termina a conversa:
- a voz no escuro;
- Jesus chorou (Jo 11.35);
- "a pedra do meu foi tirada";
- os sacerdotes querem matá-lo (Jo 12.10-11).

Depois volta para o seu lugar.

## Ao voltar de Betfagé

Não há cenas: Cléopas já foi, e Marta e Lázaro continuam nos seus lugares, para conversar.
