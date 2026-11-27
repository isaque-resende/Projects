# Auditoria jogando: problemas encontrados e ajustes

O jogador automático (`_sim/joga.html`) joga cada fase como uma pessoa. Ele anda até cada pessoa e lugar tocando no
chão, aperta o botão, passa pelos diálogos e pelas lembranças, e no fim dá uma volta. Ao mesmo tempo, verifica:

- se o jogador sai da tela;
- se algo tapa o alvo da câmera nas cenas;
- se a câmera fica inválida;
- se o jogador empaca no caminho.

Depois cada filmagem é revista quadro a quadro.

## Lista de ajustes

| # | Fase | Problema | Situação |
|---|---|---|---|
| 1 | Betânia | Na lembrança da pedra, com o túmulo aberto pelo jogador antes, os dois homens nasciam dentro da pedra, que ainda não tinha voltado para a porta. | corrigido: a pedra volta à porta antes de eles entrarem |
| 2 | Todas (visto em Betânia) | Na chegada de Lázaro e na conversa, as tamareiras tapavam a câmera. Eram três causas: as tamareiras são uma malha só, espalhada pelo mapa, e ficavam fora da lista do que pode tapar; as árvores de perto do jogador são trocadas enquanto ele anda, e a lista era medida uma vez só; e a câmera, virando devagar para o ângulo livre, passava pelas folhas. | corrigido no motor: a lista entra com as malhas grandes e é refeita a cada segundo; a cada quadro a câmera confere a linha até o alvo e, se algo entra no meio, chega mais perto. O plano da chegada de Lázaro passou a ser de cima. |
| 3 | Betânia | Tocar no chão levava o jogador em linha reta, e ele empacava na cerca do aprisco, na barraca e no muro do lagar. | corrigido: o caminho que Betfagé já tinha (desvia de muros e objetos) foi para o motor comum e passou a valer em Betânia |
| 4 | Betfagé | Tocar num ponto muito longe (a figueira, do outro lado do diorama) às vezes não acha caminho, e o jogador empaca. | verificado: o caminho até a figueira existe; o travamento na partida foi um caso isolado. Só o meio do campo de cevada fica sem caminho até o ponto exato, e o jogador para na borda. |
| 5 | Betfagé | Perto dos jumentos, quando o caminhante da estrada passa, o botão às vezes é dele, e não dos jumentos. | aceito: o botão é de quem está mais perto, e basta dar um passo |
| 6 | Monte das Oliveiras, Getsêmani, Betesda, templo, cidade, Gólgota | A câmera do jogo só se afastava do chão. Com uma oliveira ou um telhado no meio, ela ficava dentro da copa ou do telhado, e o jogador sumia (visto depois da lembrança do sermão e nos alpendres de Betesda). | corrigido: a câmera chega mais perto, para a frente do que tapa, e volta devagar (`limpo-motor/folga.js`). Ela não chega a menos de 3,2 m: rente demais, no templo, o jogador saía do quadro entre as colunas. Quando não dá para chegar perto, ela gira em volta dele ou desce e olha por baixo do telhado. |
| 7 | Getsêmani, Betesda, templo, cidade, Gólgota | Tocar no chão não fazia nada: só o direcional andava. | corrigido: o toque anda até o ponto pelo caminho com desvio, como em Betânia e Betfagé |
| 8 | Monte das Oliveiras | Tocar no chão levava em linha reta. | corrigido: o mesmo caminho com desvio |
| 9 | Betesda | Na chegada, o plano da Porta das Ovelhas ficava colado no muro. | corrigido: o plano é mais alto e mais afastado |
| 10 | Gólgota | Dentro do sepulcro, o monte ficava translúcido, contra a regra de nada transparente. | corrigido: o monte fica de pedra; dentro, a câmera vai para a porta da câmara e olha para dentro, com a candeia acesa |
| 11 | Cidade alta | Tocar no tribunal ou no palácio, que ficam no alto do Pavimento, às vezes não acha caminho. | aceito: chega-se pela escada, a pé |
| 12 | Todas | A medição do que tapa a câmera não via telhados e muros por dentro: eles têm face só do lado de fora, e o raio que sai de baixo deles passava sem bater. | corrigido: a medição é feita nos dois sentidos (na câmera das cenas e na do jogo) |

## Segunda rodada: os itens que tinham ficado aceitos, e o estresse take por take

Na primeira volta, o jogador automático achou 167 problemas nas oito fases. Depois desta rodada, sobraram 34, quase
todos do próprio teste, que toca na água ou no meio do campo de cevada.

### Câmera do jogo (`limpo-motor/folga.js`)

| # | Problema | Situação |
|---|---|---|
| 13 | Ao girar para o lado livre, a câmera atravessava colunas, copas e telhados (no Getsêmani, ao voltar da pergunta "Seguir para Betesda?", as folhas da oliveira enchiam a tela várias vezes). | corrigido: a cada quadro ela confere o caminho até o jogador; quando não dá para encurtar, vai direto, em corte, para onde está livre |
| 14 | Os tetos dos pórticos (templo) e os telhados finos ficavam fora da lista do que tapa, porque a lista pedia mais de 70 cm de altura. | corrigido: entram também as lajes largas (`malhasAltas`, em `cine.js`) |
| 15 | Encostado num muro, com a câmera do outro lado, nenhum dos giros pequenos escapava. | corrigido: giros de 90°, 125° e 180°, usados só quando nada menor cabe |
| 16 | Quando a câmera chegava muito perto (1 m), o jogador enchia a tela. | corrigido: o piso é 2,4 m. Só quando nenhum ângulo cabe ela chega a 1,8 m, e então mira o meio do corpo. |

### Tocar no chão (`limpo-motor/caminho.js`)

| # | Problema | Situação |
|---|---|---|
| 17 | Sem caminho até o ponto exato, o jogador andava em linha reta contra o muro. | corrigido: vai até o lugar alcançável mais perto |
| 18 | Encostado numa coluna ou numa pessoa, não havia caminho nenhum. | corrigido: o primeiro metro em volta da partida conta como livre |
| 19 | Para contornar os tanques de Betesda, a grade era estreita demais. | corrigido: uma segunda busca, numa grade larga; com fila de prioridade e cada célula consultada uma vez, leva menos de 0,1 s |
| 20 | Em Betesda, o homem na escada e a mulher do jarro ficavam fora de alcance: nenhum jogador conseguia falar com eles. Em Betânia, o aprisco também. | corrigido: o alcance das conversas foi aumentado; uma checagem nova (`_sim/alcance.html`) testa todos os alvos de todas as fases |

### Cenas e lembranças, analisadas quadro a quadro

| # | Fase | Problema | Situação |
|---|---|---|---|
| 21 | Todas | O anel claro de interação aparecia no chão dentro das lembranças. | corrigido: some enquanto a lembrança dura |
| 22 | Betânia | Lázaro vindo: do alto, a lente passava pelas copas das tamareiras. | corrigido: câmera baixa, abaixo das copas, com o lado escolhido vendo os dois e o caminho entre eles |
| 23 | Betfagé | Na figueira, a lente ficava na beira da copa; Pedro saía cortado. | corrigido: mais distância; o plano final enquadra os dois discípulos e a árvore |
| 24 | Monte das Oliveiras | No sermão, os discípulos pareciam agachados no ar. | corrigido: ajoelhados, firmes no chão; só Pedro se levanta para perguntar |
| 25 | Getsêmani | Pedro, de pé junto aos que dormem, saía cortado. | corrigido |
| 26 | Betesda | A chegada mostrava o telhado do alpendre no lugar da Porta das Ovelhas; a câmera ficava em cima da cabeça do paralítico ao levantar. | corrigido: a porta é vista de fora, do alto; o paralítico, a 3,4 m |
| 27 | Templo | Na chegada, uma arca e uma parede enchiam a tela; o candelabro tapava a viúva; uma mesa tombava por dentro do cambista. | corrigido |
| 28 | Cidade alta | Nas negações, as costas de Pedro escondiam a criada; a Porta de Genat parecia um vão solto. | corrigido: os dois de perfil; a porta no muro |
| 29 | Gólgota | Na chegada e na cena das cruzes, um poste de cruz enchia a tela. | corrigido: as cruzes não contam como o que tapa, porque o alvo do plano fica nelas |

## Terceira rodada: o jogador automático sem atalho

O jogador automático deixou de teleportar quando empaca. Esse teleporte o punha dentro do tanque de Betesda ou num
alpendre fechado, e escondia travamentos reais. Sem ele, apareceram quatro defeitos do jogo:

| # | Problema | Situação |
|---|---|---|
| 30 | Andando em linha reta ao longo de um eixo, o jogador encostava numa quina e parava. O jogo tentava deslizar no outro eixo, ficava no mesmo lugar e contava isso como passo dado. Aconteceu no Gólgota, a caminho das cruzes, e em Betânia, a caminho do lagar. | corrigido nas oito fases: o deslize só vale se o passo tem parte naquele eixo; raspando numa quina, ele tenta desviar 35° e 70° para cada lado antes de desistir |
| 31 | O caminho cortava a quina entre duas células, e o jogador, com a margem dele, batia no canto. Foi o que travava a subida ao tribunal, na cidade alta. | corrigido: a diagonal só vale com as duas células do lado livres |
| 32 | Saindo de dentro da margem (perto do tanque, encostado numa coluna), o caminho pegava a altura do fundo do tanque e não subia de volta ao piso, ou ia mais para dentro e o jogo recusava o passo. | corrigido: ali dentro, a altura fica a da partida, e cada passo sai um pouco mais da margem, como no movimento do jogo |
| 33 | Betânia: enquanto Lázaro anda, uma tamareira baixa passava na frente dele. | refeito no item 36 |

## Quarta rodada: os avisos que restavam, e a vida dos NPCs

Os avisos da câmera que tinham ficado foram abertos um por um nas imagens. A chegada a Betesda (o alvo fica dentro da
Porta das Ovelhas), os candelabros (a lente encosta na quina do muro, mas o jogador aparece inteiro) e os lençóis do
Gólgota eram falso alarme. Outros três eram defeitos:

| # | Problema | Situação |
|---|---|---|
| 34 | Templo, a viúva: o lado da lente era escolhido uma vez só, quando ela entrava. Andando, o suporte do candelabro passava na frente dela, e no fim ela saía para trás dele. | corrigido: a cada 0,4 s a lente confere se a vê e, se não, escolhe outro lado (até 60° do ponto de vista dele); ela agora sai só até onde continua à vista, e para de verdade (antes ficava andando no lugar); o plano do ponto de vista dele escolhe, entre ângulos vizinhos, um que vê o caminho todo dela |
| 35 | Betesda, o homem que desce antes do paralítico: o lado da lente olhava só o ponto de partida dele, e uma coluna tapava o primeiro instante. A mulher do jarro, que é de hoje, cruzava com ele na escadaria dentro da lembrança. | corrigido: o lado é escolhido pelo caminho todo dele até a água, com o plano fixo; a mulher do jarro some durante a lembrança |
| 36 | Betânia, Lázaro vindo ao encontro: a câmera girava em volta do túmulo, entre pedras e tamareiras, e a lente entrava nelas. A busca de ângulo do motor brigava com a da cena, e a reta dele passava por dentro de uma tamareira. | corrigido: o plano agora é por cima do ombro do jogador, num ângulo em que a lente vê os dois de verdade (testado com raios nos dois sentidos, porque as folhas têm face de um lado só), primeiro na altura dos olhos, por baixo das copas; se uma tamareira está no meio, ele a contorna. Para isso, o motor das cenas ganhou o plano `semBusca` (a cena escolhe o lado, e a lente só chega mais perto se algo entra na frente) |

### A vida dos NPCs (`limpo-motor/atores.js`, nas oito fases)

Os bonecos têm só cinco clipes (parado, conversando, andar, trote e correr). Por cima deles, uma camada feita por código:

- **Cada um no seu ritmo:** parados e conversando, o clipe de cada um toca numa velocidade um pouco diferente (de 0,86
  a 1,14), e a multidão não respira mais junta.
- **A cabeça acompanha o jogador:** quando ele passa a menos de 5,5 m e pela frente, o NPC vira a cabeça e o pescoço
  para ele (até uns 60° para o lado, e um pouco para cima ou para baixo), devagar, e volta quando ele se afasta.
- **Olhar em volta:** sem ninguém perto, quem está parado ou conversando olha para um lado ou para a frente, a cada
  2,5 a 7,5 s.
- **Virar-se para quem conversa:** quando o jogador para a menos de 3,5 m, de frente para o NPC (é como o jogo o põe
  numa conversa), o NPC vira o corpo para ele, devagar, e volta à posição de antes quando o jogador vai embora.
- **Fica de fora:** o próprio jogador, as lembranças, quem está deitado ou sentado com pose montada osso a osso, quem
  está trabalhando (o corpo não vira) e quem o roteiro da fase já gira (a camada percebe e não briga com ele).
- **Desempenho:** no templo, a fase mais cheia, o laço levou o mesmo tempo com e sem a camada (cerca de 35 ms por
  quadro no teste sem tela), porque ela só trabalha nos NPCs a menos de 28 m do jogador.

## O que ficou de fora, de propósito

- O jogador automático às vezes empaca ao tocar num ponto que não dá para pisar (a água do tanque, o meio do campo de
  cevada, o alto do Pavimento). O jogo leva o jogador até o ponto livre mais perto ou para no caminho, e isso é normal.
- Em quadros de passagem, enquanto a câmera ainda está virando, uma coluna pode cruzar a frente da lente por um instante.
- Em dois pontos, nenhum ângulo cabe, e por um instante o triângulo amarelo mostra o jogador: junto ao pilar da Porta
  de Nicanor (templo) e na porta estreita de um túmulo antigo (Gólgota).
- O jogador automático empacou também em lugares cujo ponto fica dentro de algo: o aprisco fechado, o tanque do lagar.
  O jogador chega até a borda, como deve ser.

## Resultado da última rodada

- As oito fases jogadas de ponta a ponta, com todas as lembranças, e cada cena revista em folhas de contato (cerca de
  520 quadros), com a vida dos NPCs ligada e sem nenhum erro de página.
- Os avisos que sobram são os de cima: os travamentos onde não se pisa, os quadros de passagem, os pés cortados na
  borda da tela (o jogador perto da borda, conferido nas imagens) e os falsos alarmes da quarta rodada.
- Suíte de testes de todas as fases: 0 falhas.
