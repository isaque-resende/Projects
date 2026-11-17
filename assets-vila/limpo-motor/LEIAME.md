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
| `marcador.js` | a seta sobre a cabeça do jogador, só quando uma casa, árvore ou muro o esconde da câmera (nada fica transparente) |

**Chão leve:** o jogo junta os vértices repetidos do chão e tira a média das cores (`suaviza`). Os exportadores
(`exportar_betania.py`, `betfage_blender.py`) já gravam o chão assim, um vértice por ponto. O arquivo fica cerca de
4 vezes menor e o chão na tela é o mesmo. No Blender, a pintura do chão continua por canto; a troca é só na
hora de exportar.

**Ínsula de Betfagé:** ao carregar, o jogo percorre a ínsula e as casas numa grade de 10 cm e marca os bolsões
(vãos dentro das paredes grossas do modelo de onde não se sai andando). O jogador não pisa neles (`presoEm`).

**`limpo-betania/js/`** e **`limpo-betfage/js/`** têm um módulo por assunto. Cada arquivo começa com uma
linha dizendo o que ele contém. `estado.js` é a base da fase e `main.js` é o laço do jogo.

## Colisão (Betânia)

Os obstáculos fixos da Betânia são desenhados no `betania.blend`, na coleção **Colisao**:

- **Círculo** (empty "Círculo"): o tamanho dele no mundo é o raio do obstáculo.
- **Caixa** (empty "Cubo"): no jogo vira uma caixa alinhada aos eixos, do tamanho que o cubo ocupa.
- Cada forma fica presa (parent) ao objeto dono: mover, girar ou escalar o dono leva a colisão junto. Apagar o
  dono apaga a forma na próxima exportação.
- Árvore, pedra ou planta nova (de perto) ganha sozinha o círculo padrão ao exportar. Se você apagar esse
  círculo, ele não volta.
- Para mudar um obstáculo, escale ou mova a forma. Para tirar, apague a forma. Para pôr um novo, duplique uma
  forma e prenda ao dono (Ctrl+P).

`EXPORTAR_PARA_O_JOGO` grava as formas em `betania_posicoes.json` (`colisao`). Continuam no código: as pessoas,
a pedra do túmulo (que rola) e o muro do aprisco (que depende da porteira). Em Betfagé, os obstáculos já vêm
do layout do Blender (`obst`).

## Betfagé no Blender

`fase-betfage/betfage.blend` é agora o original de Betfagé, como o `betania.blend` é o da Betânia. Mexa nele e rode
o texto **EXPORTAR_PARA_O_JOGO** (aba Scripting > Run Script): ele grava `betfage_cenario.glb` e
`betfage_layout.json` e salva o `.blend`.

- Árvores, pedras, casas e objetos (coleção `Cenario_objetos`) e as moitas e malvas podem ser movidos, girados,
  escalados, duplicados ou apagados. Quem você arrastar volta a assentar no chão ao exportar.
- Colisão: coleção `Colisao`, igual à da Betânia (círculos presos ao dono; objeto novo ganha o círculo padrão).
- Referências do jogo (coleção `Referencia_jogo`): `Campo_Trigal` (o retângulo do trigal: mova ou escale),
  `JOGO_figseca`, `JOGO_pasto`, `JOGO_cocho`, `JOGO_manjedoura`. A ínsula é `Insula_Jogo` e a carroça é `Carroca_Jogo`.
- Terreno, estrada e muros (coleção `Exportar`) ficam travados contra clique. Para mudar o relevo, é melhor pedir:
  o `betfage_blender.py` gera a fase do zero (e **apaga** o que foi mexido à mão no `.blend`).

## Regras para mexer

- Os módulos de uma fase são montados em ordem fixa (cada um importa o anterior). A ordem de criação dos
  personagens decide o sorteio: trocar a ordem muda, por exemplo, onde as ovelhas nascem.
- O que muda durante o jogo e é usado por vários módulos fica no objeto `E`, em `estado.js`.
- Correção que vale para as duas fases vai no motor; o que é só de uma fase vai na pasta dela.
- Para testar pelo console, abra a fase com `?teste` no endereço: o objeto `TESTE` dá acesso ao jogador,
  ao laço e à colisão.
