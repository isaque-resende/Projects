# Jogo passado a limpo

Cópia das fases de Betânia e Betfagé com o código organizado em módulos. O jogo é o mesmo do original
(`fase-betania`, `fase-betfage`): mesma cena, mesma colisão, mesmos movimentos. O cenário, as posições e
as texturas continuam vindo das pastas originais, então o que for exportado do Blender vale para os dois.

## Onde está cada coisa

**`limpo-motor/`** é o que as duas fases usam em comum:

| Arquivo | O que faz |
|---|---|
| `base.js` | tela, luz, sorteio com semente, carregamento de modelos e texturas |
| `terreno.js` | suaviza o chão e mede a altura de qualquer malha |
| `colisao.js` | obstáculos (caixas e círculos) e a regra para o jogador não ficar preso |
| `layout.js` | põe na cena as árvores, pedras e objetos do Blender |
| `atores.js` | personagens e animais, e a animação sob medida de braços e pernas |
| `controles.js` | teclado, toque, pinça, direcional e botão de pular |
| `ui.js` | botão de ação, tela preta, legenda e caixa de diálogo |

**`limpo-betania/js/`** e **`limpo-betfage/js/`** têm um módulo por assunto. Cada arquivo começa com uma
linha dizendo o que ele contém. `estado.js` é a base da fase e `main.js` é o laço do jogo.

## Regras para mexer

- Os módulos de uma fase são montados em ordem fixa (cada um importa o anterior). A ordem de criação dos
  personagens decide o sorteio: trocar a ordem muda, por exemplo, onde as ovelhas nascem.
- O que muda durante o jogo e é usado por vários módulos fica no objeto `E`, em `estado.js`.
- Correção que vale para as duas fases vai no motor; o que é só de uma fase vai na pasta dela.
- Para testar pelo console, abra a fase com `?teste` no endereço: o objeto `TESTE` dá acesso ao jogador,
  ao laço e à colisão.
