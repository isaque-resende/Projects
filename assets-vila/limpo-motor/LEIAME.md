# O jogo (Betânia e Betfagé)

Desde 18/11 a versão em módulos é a oficial: `fase-betania/` e `fase-betfage/` abrem o jogo novo (`index.html` + `js/`).
As páginas antigas, de um arquivo só, ficaram como backup em `fase-betania/antigo.html` e `fase-betfage/antigo.html`
(a troca de fase entre elas continua funcionando, de antigo para antigo). Elas não recebem mais correções.
Os endereços `limpo-betania/` e `limpo-betfage/` só redirecionam para as pastas oficiais, e também
`fase-betfage/prado.html` (o teste do chão suave, que virou o visual oficial; a página antiga está no histórico do git).

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
- Terreno, estrada e muros (coleção `Exportar`) ficam travados contra clique. Para mudar o relevo, é melhor pedir.
- O `betfage_blender.py` (o gerador que criou a fase do zero) está **travado** desde 18/11: rodado, ele só avisa e para.
  Com `--regerar-tudo` ele monta a fase numa cópia, `betfage_regerado.blend`, nunca no `betfage.blend`, e não exporta
  para o jogo. Os `ajuste*.py` continuam usando as funções do começo dele.
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

## Monte das Oliveiras (`fase-oliveiras/`)

A fase depois de Betfagé (o "Sim" no alto da estrada leva para cá; o pé da subida volta para Betfagé, chegando no alto).

- **No Blender:** `fase-oliveiras/oliveiras.blend` é o original. Mexa nele e rode **EXPORTAR_PARA_O_JOGO**: ele grava
  `oliveiras_cenario.glb` (terreno, estrada, muretas) e `oliveiras_layout.json` e salva o `.blend`. Olivais, pedras,
  moitas e os objetos do pátio podem ser movidos, duplicados ou apagados, como em Betfagé. Na coleção `Referencia_jogo`:
  - `Prensa_Jogo`: o lugar da prensa de azeite (mova e gire o vazio; as peças vão junto). O chão nivelado do pátio
    não acompanha: se mudar a prensa de lugar, é melhor pedir.
  - `JOGO_pregacao`: o mirante (a laje de frente para o templo), onde fica o gatilho.
  - `JOGO_cume`: onde Jerusalém aparece; `JOGO_vista`: para onde a câmera olha nessa hora.
  - `Panorama_Jerusalem`: o arco no horizonte onde a imagem é pendurada (r = 420 m, de 160° a 200°: longe e estreito).
- **Colisão:** cada objeto tem um círculo de colisão preso a ele. O exportador recoloca no pé do dono qualquer círculo
  que tenha se soltado (houve 109 assim, alguns no meio da estrada, que travavam o jogador) e avisa quantos mexeu.
- **Gerador:** `oliveiras_blender.py` criou a fase do zero. Ele não sobrescreve o `.blend` sem `--regerar-tudo`.
- **A câmera:** sempre olhando para o jogador (ele fica no meio da tela para qualquer lado que ande). Na subida vem de
  ~19 m e alta até ~13 m atrás e acima do ombro; na descida fica a 14 m. O zoom manual (pinça / roda, de 7 a 26 m,
  `E.dist`) vale nas duas: na subida multiplica a distância por `E.dist / 14`. No celular em pé o ângulo abre para
  caber a mesma largura (`ajustaLente` em `js/jogador.js`). As oliveiras de perto (`ARVS`, em `js/cenario.js`) que
  ficam entre a câmera e o jogador ficam quase transparentes (`abreVista`), em vez de a câmera chegar mais perto. Já o morro, sim: se ele fica entre o jogador e a câmera, ela chega mais perto em vez de subir (`braco`).
  Os obstáculos valem também no pulo, e quem está encostado só dá passos que não entram mais (`fundo`, do motor).
- **O cume, sem "revelação" animada:** a cidade está sempre no lugar; quem a esconde é o próprio monte (o chão é
  opaco e as pinturas respeitam a profundidade). Subindo, os telhados aparecem por cima da borda do morro mais ou
  menos na metade do caminho e a cidade vai crescendo; voltando, ela afunda atrás do morro do mesmo jeito. Ao passar
  pelo cume o jogador não para: só aparecem as legendas ("Jerusalém." e a do templo) e a câmera passa para a da
  descida (atrás e um pouco acima, sempre olhando para o oeste). Não há troca de lente.
- **O horizonte, em quatro camadas (`js/cenario.js`), cada uma numa distância (as de perto andam mais quando o
  jogador anda, e isso dá a profundidade):** o vale do Cedrom em 3D (r 125 a 294 m); a encosta pintada do outro lado
  (r 300); a cidade (r 420, 40° de largura); e os montes (r 560). Os arcos são centrados
  no cume do arco `Panorama_Jerusalem`, e a altura de cada pintura sai do ângulo visto de lá: a esplanada do templo
  2,5° abaixo da linha dos olhos, a borda da encosta 0,35° acima do pé dos muros, os montes aparecendo por cima dos
  telhados. A cidade vem inteira (os muros fazem a curva nas pontas) com o chão até embaixo, atrás da encosta: não
  sobra fresta; só o chão das pontas esmaece (2,3°). Encosta (42° por cópia, andada meia largura para a árvore não
  tapar o templo) e montes (56°) se repetem emendados, sem espelhar, até cobrir o vale (~111°). Um véu leve de bruma
  no shader (cidade 10%, encosta 5%). A câmera vai até 850 m.
- **As imagens:** do usuário, em `tex/originais/panorama_{montes,cidade,encosta}_v2.png` (low poly, geradas do zero; as
  v1 ficam guardadas). As `tex/panorama_*.webp`
  são elas sem o branco ligado às bordas (recorte por preenchimento a partir da borda, para não furar as paredes
  claras) e cortadas na altura do desenho; a ponta direita de montes e encosta é casada com a esquerda
  em 40 px (`_sim/recorta2.html`, fora do repositório). A `tex/jerusalem.webp` (imagem única antiga) não é mais usada.
- **A prensa (`js/prensa.js`):** o prenseiro empurra a mó em volta da bacia (as azeitonas viram pasta), vai à viga e a
  prensa desce (o azeite corre para o tanque), busca azeitonas no pote e recomeça. Na mó ele anda colado atrás do
  cabo, empurrando com o corpo (o andar dele mesmo); na viga e no pote usa o "Pegar" do discípulo. Os outros clipes
  de braço do discípulo não servem nele, porque os braços em repouso são diferentes. No kit, bacia, coluna e base da
  prensa são uma pedra só e a volta da mó passaria pela coluna: o jogo separa a bacia e a afasta 1 m, com a mó, e
  leva o pote de azeitonas para o pátio. Ele anda por caminhos fixos: um anel em volta da bacia, sempre pelo lado de
  fora, e o pátio.
- **O mirante (`js/pregacao.js`):** um anel de luz no chão, como o dos jumentos. O botão "sentar diante do templo"
  chama `lembrar()`: é ali que entra o flashback da pregação, ainda por fazer.
- **O fim da descida:** pergunta "seguir para o Getsêmani" e o Sim leva à fase do Getsêmani.
- Para testar trechos: `?de=cume` começa já no alto, com Jerusalém à vista; `?de=getsemani`, no fim da estrada.
  Com `?teste&parado` a fase carrega sem ligar o laço de desenho (para rodar a lógica pelo console).

## Getsêmani (`fase-getsemani/`)

A fase depois do Monte das Oliveiras (o Sim no fim da descida leva para cá; a ponta leste da trilha volta para lá).
É noite de lua cheia (a Páscoa caía na lua cheia): céu escuro, luz azulada da lua no sudeste e exposição mais baixa
(`estado.js`). As cores pintadas são as mesmas das outras fases.

- **O lugar** (Mt 26.36-46; Mc 14.32-42; Lc 22.39-46; Jo 18.1-2): a trilha desce do monte pelo leste e entra por um
  portão na mureta que cerca o jardim de oliveiras antigas. Logo depois do portão fica a roda de pedras onde os oito
  ficaram sentados. Ao norte, o morrote com a gruta e a prensa de azeite na boca (Gat-Shemanim, "prensa de azeite").
  Mais adiante, debaixo de uma oliveira antiga, o lugar de Pedro, Tiago e João. Um tiro de pedra adiante deles
  (Lc 22.41, 26 m), a **Rocha da Agonia**: uma laje de calcário à flor da terra, entre oliveiras antigas. O leste
  (por onde se chega) e o oeste (o templo, no alto do outro lado do Cedrom) ficam abertos.
- **No Blender:** `fase-getsemani/getsemani.blend` é o original. Mexa nele e rode **EXPORTAR_PARA_O_JOGO**: ele grava
  `getsemani_cenario.glb` (terreno, trilha, mureta, `Rocha_Agonia`, `Gruta_Morro` e `Gruta_Boca`) e
  `getsemani_layout.json`. Em `Referencia_jogo`: `JOGO_portao`, `JOGO_oito`, `JOGO_tres`, `JOGO_agonia` (onde se ajoelha,
  a leste da rocha), `JOGO_rocha` (o alto da rocha), `Prensa_Jogo` e `Panorama_Jerusalem`. A rocha e o morrote são
  malhas próprias (facetadas, só cor de vértice). Os círculos de colisão deles têm `fixo`, e o exportador não os junta
  no pé do dono. O gerador `getsemani_blender.py` não sobrescreve o `.blend` sem `--regerar-tudo`.
- **No jogo:** ao chegar perto de cada lugar, aparece uma legenda com o texto dos evangelhos (uma vez só). Junto à
  rocha há um anel no chão e o botão "ajoelhar junto à rocha". O jogador se ajoelha de frente para ela: o clipe
  `Ajoelhar` para no meio e só termina de levantar no fim. Vêm Lc 22.42, 43 e 44 ("o seu suor tornou-se como grandes
  gotas de sangue"), e a câmera chega mais perto e mais baixa (`CAM.perto`). Depois de uns 33 s ele levanta e fica livre.
- **Jerusalém:** as mesmas pinturas de `fase-oliveiras/tex/` (cidade e encosta), em arcos centrados na rocha, com a
  esplanada ~5,5° acima dos olhos, escurecidas e azuladas no shader. Embaixo da encosta, uma faixa lisa da cor do pé
  da pintura cobre o vão até o chão. As pinturas foram feitas vistas de cima: uma de Jerusalém vista de baixo, à
  noite, ficaria melhor (falta pedir ao usuário).
- **Para testar:** `?de=agonia` começa perto da rocha. O `teste.html` cobre:
  - a troca Oliveiras → Getsêmani;
  - os testes da fase;
  - a rocha: distância dos três, botão, de joelhos, legenda e livre depois;
  - a volta ao Monte das Oliveiras.
- **Cache:** rode também `node assets-vila/limpo-motor/versiona.cjs assets-vila/fase-getsemani` antes de cada commit.

## Regras para mexer

- Os módulos de uma fase são montados em ordem fixa (cada um importa o anterior). A ordem de criação dos
  personagens decide o sorteio: trocar a ordem muda, por exemplo, onde as ovelhas nascem.
- O que muda durante o jogo e é usado por vários módulos fica no objeto `E`, em `estado.js`.
- Correção que vale para as duas fases vai no motor; o que é só de uma fase vai na pasta dela.
- Para testar pelo console, abra a fase com `?teste` no endereço: o objeto `TESTE` dá acesso ao jogador,
  ao laço, aos animadores (`MIX`) e à colisão, e `ERROS` guarda os erros da página.

## O teste automático (`assets-vila/teste.html`)

Abra `teste.html` (no site ou no servidor local) e espere uns 40 segundos a poucos minutos, com a aba visível. Ele:

- abre Betfagé e confere se carrega sem erro nem arquivo faltando, se desenha a cena e se os personagens e
  animais se mexem, e se os dois da eira malham com o forcado;
- anda com o jogador para os quatro lados (WASD), conferindo se ele fica no chão e não entra em obstáculo;
- vai ao pé da estrada, responde "Sim" para voltar a Betânia e confere a chegada (as mesmas verificações lá);
- vai ao fim da estrada de Betânia, responde "Sim" e confere a chegada em Betfagé;
- abre Betânia do começo (com a abertura), os dois `antigo.html` e os endereços que só redirecionam.

No fim mostra "Tudo certo" ou a lista do que falhou, com o motivo (por exemplo, o arquivo que deu 404). A velocidade
(quadros por segundo) é só informação. As fases ligam o modo de teste sozinhas quando abertas por ele
(`limpo-motor/modo-teste.js`). Quando mudar algo grande, rode antes de publicar. Se acrescentar uma fase ou uma troca
de fase, acrescente os passos dela no `teste.html`.

- **Cache no celular:** o GitHub Pages deixa os arquivos 10 min no cache. Antes de cada commit que mexe em `.js` da
  fase, rodar `node assets-vila/limpo-motor/versiona.cjs assets-vila/fase-oliveiras`: ele põe no `index.html` um
  importmap com o hash de cada módulo (da fase e do motor), e o navegador baixa só o que mudou.
