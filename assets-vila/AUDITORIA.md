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

## O que ficou de fora, de propósito

- O jogador automático às vezes empaca ao tocar num ponto que não dá para pisar (a água do tanque, o meio do campo de
  cevada, o alto do Pavimento). O jogo leva o jogador até o ponto livre mais perto ou para no caminho, e isso é normal.
- Em quadros de passagem, enquanto a câmera ainda está virando, uma coluna pode cruzar a frente da lente por um instante.
- Nos cantos mais apertados do templo, entre o muro e o pórtico, nenhum ângulo cabe. Ali a câmera fica onde está, e o
  triângulo amarelo mostra o jogador.
- O jogador automático empacou também em lugares cujo ponto fica dentro de algo: o aprisco fechado, o tanque do lagar.
  O jogador chega até a borda, como deve ser.

## Resultado da última rodada

- As oito fases jogadas de ponta a ponta, com todas as lembranças.
- Suíte de testes de todas as fases: 0 falhas.
