# O jogo (Betânia e Betfagé)

Desde 18/11 a versão em módulos é a oficial: `fase-betania/` e `fase-betfage/` abrem o jogo novo (`index.html` + `js/`).
As páginas antigas, de um arquivo só, ficaram como backup em `fase-betania/antigo.html` e `fase-betfage/antigo.html`
(a troca de fase entre elas continua funcionando, de antigo para antigo). Elas não recebem mais correções.
Os endereços `limpo-betania/` e `limpo-betfage/` só redirecionam para as pastas oficiais.

## Onde está cada coisa

**`limpo-motor/`** é o que as duas fases usam em comum:

| Arquivo | O que faz |
|---|---|
| `base.js` | tela, luz, sorteio com semente, carregamento de modelos e texturas |
| `terreno.js` | suaviza o chão e mede a altura de qualquer malha |
| `colisao.js` | obstáculos (caixas e círculos) e a regra para o jogador não ficar preso |
| `layout.js` | põe na cena as árvores, pedras e objetos do Blender |
| `atores.js` | personagens e animais, e a animação sob medida de braços e pernas. Os braços usam `ikBraco`: o cotovelo dobra só no eixo dele, medido na pose de repouso, e assim a malha não torce |
| `controles.js` | teclado, toque, pinça, direcional e botão de pular |
| `ui.js` | botão de ação, tela preta, legenda e caixa de diálogo |
| `marcador.js` | a seta sobre a cabeça do jogador, só quando uma casa, árvore ou muro o esconde da câmera (nada fica transparente) |

**Chão leve:** o jogo junta os vértices repetidos do chão e tira a média das cores (`suaviza`). Os exportadores
(`exportar_betania.py`, `betfage_blender.py`) já gravam o chão assim, um vértice por ponto. O arquivo fica cerca de
4 vezes menor e o chão na tela é o mesmo. No Blender, a pintura do chão continua por canto; a troca é só na
hora de exportar.

**Ínsula de Betfagé:** ao carregar, o jogo percorre a ínsula e as casas numa grade de 10 cm e marca os bolsões
(vãos dentro das paredes grossas do modelo de onde não se sai andando). O jogador não pisa neles (`presoEm`).

**`fase-betania/js/`** e **`fase-betfage/js/`** têm um módulo por assunto. Cada arquivo começa com uma
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
- Desde 17/11 o `.blend` também tem o que o `ajuste_muros_caminhos.py` fez uma vez por cima dele: muros de arrimo
  nas bordas dos patamares, estrada da aldeia sem inclinação de lado, caminhos de terra (`Betfage_Estrada_Caminhos`),
  escada de pedra até a casa de cima e rampa da carroça. O gerador não sabe disso: regerar a fase perde tudo.
- Desde 18/11, o `ajuste2_trigal_figueiras.py` (também aplicado uma vez) mudou o seguinte:
  - o trigal (`Campo_Trigal`) saiu do pé do morro e foi para o planalto, onde ficava a carroça;
  - a carroça foi para o alto da rampa;
  - há uma escada de pedra da casa de cima até o trigal;
  - o muro do pátio da ínsula tem um vão, com rampa vinda da estrada;
  - o aprisco desceu um pouco e o forno foi para perto do sobrado;
  - os ciprestes da subida foram trocados por figueiras: duas de um lado e uma do outro, e mais acima duas e duas;
    uma destas é a seca (`JOGO_figseca`).

  A pergunta "ir ao Monte das Oliveiras" agora só aparece depois dessas figueiras.
- `JOGO_rota_carroca` (em `Referencia_jogo`): a linha que a carroça segue do planalto até o ramal da eira.
  Pode mover os vértices (a ordem conta: o primeiro é onde ela fica parada, o último é onde descarrega).
  Os caminhos (para o jogador poder andar fora do quadrado) ficam no texto `betfage_fixos`.

## A carroça (`fase-betfage/js/ceifa.js`)

Cheia (8 feixes), o carregador puxa o boi pela `rota_carro` do layout, para no fim, leva os feixes de dois em dois
até as pilhas da eira, vira a carroça no lugar (o boi dá a volta) e volta; no planalto vira de novo e recomeça.
O boi segue a rota e a carroça vem atrás como reboque, com a ponta dos varais na canga do boi. O modelo da carroça vem
girado no kit; um grupo o endireita, com a origem no meio do eixo. Nas pontas da viagem, a carroça gira sobre o eixo e o
boi, preso aos varais, dá a volta por fora. Os círculos de colisão da carroça e do boi andam com eles. Os feixes entregues engordam o monte da eira.
O backup (`fase-betfage/antigo.html`) usa o cenário novo, mas a carroça dela continua parada.

## A eira (`fase-betfage/js/eira.js`)

O robusto e a mulher de botões malham o trigo com o clipe **Malhar**, animado no Blender pelo `personagens/malhar.py`
(sai `robusto_malhar.glb` e `mulher_botoes_malhar.glb`: só o esqueleto, o forcado e o clipe, cerca de 90 KB cada).
O forcado é um osso a mais (`garfo`), os braços seguem o cabo por IK com polo (cotovelos para baixo e para trás), as mãos
fecham no cabo e as pernas dobram com os pés plantados; depois tudo é assado em quadros. No jogo só se pendura o forcado
no esqueleto e toca o clipe; a palha voa da ponta dos dentes no alto do arremesso. Para mudar o movimento, edite as
`POSES` do `malhar.py` e rode de novo (as prévias saem numa pasta, de três ângulos).

## Câmera de Betfagé

Abre com a aldeia inteira e, depois da primeira legenda, fecha devagar 25% (`DJOGO` em `jogador.js`). A pinça e a roda
continuam abrindo e fechando.

## Regras para mexer

- Os módulos de uma fase são montados em ordem fixa (cada um importa o anterior). A ordem de criação dos
  personagens decide o sorteio: trocar a ordem muda, por exemplo, onde as ovelhas nascem.
- O que muda durante o jogo e é usado por vários módulos fica no objeto `E`, em `estado.js`.
- Correção que vale para as duas fases vai no motor; o que é só de uma fase vai na pasta dela.
- Para testar pelo console, abra a fase com `?teste` no endereço: o objeto `TESTE` dá acesso ao jogador,
  ao laço e à colisão.
