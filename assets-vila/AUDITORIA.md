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

## O que ficou de fora, de propósito

- O jogador automático às vezes empaca ao tocar num ponto que não dá para pisar (a água do tanque, o meio do campo de
  cevada, o alto do Pavimento). O jogo leva o jogador até o ponto livre mais perto ou para no caminho, e isso é normal.
- Em quadros de passagem, enquanto a câmera ainda está virando, uma coluna pode cruzar a frente da lente por um instante.
- Em dois pontos, nenhum ângulo cabe, e por um instante o triângulo amarelo mostra o jogador: junto ao pilar da Porta
  de Nicanor (templo) e na porta estreita de um túmulo antigo (Gólgota).
- Em Betânia, enquanto Lázaro anda, uma tamareira baixa pode passar na frente dele por um ou dois segundos.
- O jogador automático empacou também em lugares cujo ponto fica dentro de algo: o aprisco fechado, o tanque do lagar.
  O jogador chega até a borda, como deve ser.

## Resultado da última rodada

- As oito fases jogadas de ponta a ponta, com todas as lembranças, e cada cena revista em folhas de contato (cerca de
  520 quadros).
- Suíte de testes de todas as fases: 0 falhas.
