# Ferramenta 09: Decisões e fluxo

> **Pipeline:** fase principal **F3** (`../pipeline/F3-sistema-e-mecanica.md`); também usada em F4.

Para projetar o que o jogador decide, o ritmo dessas decisões e a informação que ele tem. É o coração da
interatividade. Fonte principal: Sylvester, *Designing Games* (2013), cap. 1, 3, 5 e 6, lidos na
íntegra. Complementa as lentes de escolha e fluxo do Schell (04 e 05).

## Princípios

**D1. Decisão é o único gatilho emocional exclusivo de jogos.**
Música, personagem e espetáculo existem em outras mídias; só jogos geram emoção por decisão. A
decisão é guiada por emoção, não só por lógica.
*Faça:* para cada momento, nomeie a decisão que o jogador está tomando e o que ele sente ao pesá-la.

**D2. A emoção da decisão vem de futuros possíveis, não do que acontece.**
O jogador "sente o futuro": o medo da borda do prédio existe sem a queda. Projete o que ele considera
fazer e o que acha que o jogo responderia, não só o que ele faz.
*Faça:* liste, para cada momento, os futuros que o jogador consegue ver. Um mundo linear com uma
única saída tem um só futuro e, portanto, nenhuma decisão.

**D3. Previsibilidade parcial: nem desconhecível, nem inevitável.**
Para sentir o futuro, o sistema precisa ser **consistente** (age igual em situações diferentes) e
**compreensível** (simples o bastante para caber na cabeça). Sem isso, o jogador só reage.

**D4. Decisões pré-escritas (ramificação) são de outra natureza.**
Escolhas de enredo escritas pelo autor não são decisões de sistema: o jogador escolhe por valores ou
tenta "ler a mente do autor". Servem para co-autoria da história, mas não substituem as de sistema.

**D5. Balanceie a informação.**
A mesma decisão pode ser incompreensível (pouca informação), fascinante (certa) ou trivial (demais).
- **Escassez:** decisões viram aleatórias. Sinais: um FAQ que melhora o jogo; escolhas feitas antes de
  conhecer o jogo (criar personagem no início). Invisível ao designer; descubra por playtest.
- **Excesso:** nada quebra, mas a decisão some. Corrija subtraindo informação (pulsos, ruído, limites).
- **Esconder informação:** estado oculto, futuro (cadeias de causa e efeito), estado interno de outros
  jogadores, velocidade (o que chegou há décimos de segundo).

**D6. Use mecânicas óbvias de modos não óbvios.**
Boas decisões e puzzles nascem de usos **não óbvios** de mecânicas que funcionam de modo **óbvio**. A
ficção é ambígua: o jogador não sabe quais detalhes do cenário são mecânica real (o peru assado:
posso comer? levar? arremessar?). Não faça puzzle depender de adivinhar a ficção.
Exceção: escolhas morais ou de personagem sem efeito mecânico podem usar só ficção; ao passarem a mexer
em atributos, precisam de informação mecânica clara.

**D7. Cuidado com o metajogo.**
O jogador sabe o que a ficção "ameaça" mas também que o jogo "não seria injusto" (recursos virão).
Isso reduz tensão. Duas respostas: projetar ameaças justas e de jogo, ou cumprir a ficção de fato
(injusto de verdade, como System Shock 2).

**D8. Escopo da decisão (quanto pensamento exige).**
Do menor ao maior: **não decisão** (hábito), **reflexo** (<1 s), **tática** (1 a 5 s), **profunda**
(10 s ou mais, usa o conhecimento do mundo e de si) e **impossível** (vira ruído).
O escopo efetivo muda com a habilidade: uma decisão profunda do novato vira não decisão no expert,
e esse é o teto de habilidade do jogo.

**D9. Fluxo é um copo furado.**
Decisões são água; o fluxo exige encher na taxa certa sem secar nem transbordar.
- **Flow gap** (a mente sem o que mastigar): atrasos de balanceamento, animações, menus, stuns que
  congelam. Preencha com outras decisões; degrade o controle em vez de tirá-lo.
- **Overflow** (decisões demais): reduza a pressão; escolha um nível mínimo de habilidade.
- **Por turnos:** micromanagement (pequenas demais) e paralisia de análise (grandes demais).
- "Gráfico agrada na primeira vez; fluxo agrada para sempre."

**D10. Varie densidade, escopo e sabor das decisões.**
A única regra dura: **varie**. Nem longos trechos lentos nem rápidos. A curva clássica (gancho, subida,
clímax, desfecho) é diretriz, não lei. Para avaliar um design não implementado, simule mentalmente em
tempo real, sem pular nada, e marque onde a mente não tem o que fazer.

## Acréscimos de Salen e Zimmerman (*Rules of Play*, cap. 3 e 6)

**D11. Anatomia de uma escolha: cinco estágios (e o que quebra em cada um).**
Toda escolha é uma molécula **ação → resultado**:
1. O que veio antes? (estado e contexto; evento interno)
2. Como a possibilidade é comunicada? (evento externo)
3. Como o jogador escolheu? (evento interno)
4. Qual o resultado e como afeta escolhas futuras? (evento interno)
5. Como o resultado é comunicado? (evento externo; alimenta o estágio 1 seguinte)

Diagnóstico de falhas de jogo significativo:
- *Decisões parecem arbitrárias:* falha no estágio 4 (o efeito no sistema).
- *Não sei o que fazer:* falha no 2 (a possibilidade não foi comunicada).
- *Perdi sem saber por quê:* falha no 5 (o novo estado não ficou claro).
- *Não sei se a ação teve efeito:* falha nos 3 e 4.

**D12. Quatro modos de interatividade (sobrepostos).**
**Cognitivo** (participação interpretativa), **funcional** (a utilidade: interface, resposta, legibilidade),
**explícito** (escolhas e procedimentos projetados; o que define "jogo") e **além-do-objeto**
(participação cultural: comunidade de fãs). Em todo momento de escolha explícita, os outros três estão
presentes.

**D13. Escolhas micro e macro.**
Micro: momento a momento (tática). Macro: a trajetória a longo prazo (estratégia). O bom desenho liga os
dois (em Go, cada jogada atua nos dois níveis).

**D14. Espaço de possibilidade.**
O espaço de todas as ações e significados possíveis. Você só o constrói indiretamente, por regras.
Projetar jogo é "ato de fé nas suas regras, nos jogadores e no jogo".

## Checklist de decisões

- [ ] Que decisão central o jogador toma e que futuros ele enxerga?
- [ ] O sistema é consistente e compreensível?
- [ ] Informação: há escassez ou excesso em algum ponto?
- [ ] Que escopos aparecem e há variação?
- [ ] Onde estão os flow gaps?

## Acréscimos de Fullerton (*Game Design Workshop*, cap. 4, 5 e 11)

**GW46. Escolha: consequências, escala e tipos.**
Sid Meier: "jogos são uma série de escolhas interessantes". Escolha interessante tem **consequência**
(risco x recompensa). Tipos: **oca** (sem consequência), **óbvia**, **desinformada** (arbitrária),
**informada**, **dramática** (toca o emocional), **ponderada** (consequências dos dois lados), **imediata**
e de **longo prazo**. Uma boa decisão combina vários (a flecha dourada: salvar o companheiro agora ou
guardá-la para o mago depois). Ordene numa **escala de decisão** (peso sistêmico e dramático) e deixe
as apostas subirem com picos e vales até o clímax.

**GW47. Dilemas.**
Não há opção ótima; algo é ganho e algo é perdido. Teoria dos jogos: em soma zero há estratégia
racional (minimax); no **dilema do prisioneiro** (tentação > recompensa > punição > "otário") a
escolha racional dos dois leva ao pior resultado conjunto, e confiar é arriscado. Para projetar: ligue
o dilema ao objetivo do jogo e ao laço central; permita ou impeça comunicação segundo o efeito
desejado.

**GW48. Recompensas, antecipação, surpresa, progresso e fim.**
Recompensas úteis, "românticas" e ligadas à história pesam mais; fluxo constante de pequenas perde
significado; a **ameaça de punição** dá tensão. Antecipação: informação oculta cria urgência.
Surpresa: com moderação, preservando o peso das escolhas. Progresso: marcos visíveis e **mini-arcos
de ~1 hora com um "momento memorável"**. O fim merece recompensa que dê sentido (não só cutscene).
Reconhecimento dos pares é recompensa poderosa. (Cuidado com agenda aleatória: veja 07.)

## Ver também (Kremers, *Level Design*)

Escolha interessante x arbitrária, consequências relevantes e dificuldade controlada pelo jogador:
`19-level-design-teoria-e-pratica.md` (LD21, LD23).

## Aplicação a jogos teológicos (síntese minha)

- **Decisão por significado, não por reflexo.** Em jogo de estudo bíblico, o ideal costuma ser decisão
  tática e profunda (pesar valores, ler o contexto) com poucos reflexos; trate o ritmo como
  contemplativo, mas sem flow gaps de tela parada.
- **Informação como pista do texto.** Excesso de informação (dar o sentido pronto) mata a decisão;
  escassez (o jogador sem contexto) vira chute. Dosar contexto histórico, referências cruzadas e
  consequências é a mecânica central do estudo.
- **Escolhas que o jogador já conhece do final.** Se a passagem tem desfecho conhecido, o futuro
  "sentido" é a tensão interior do personagem (D2): o que o jogador pode considerar fazer.
- **Evite pré-escrito disfarçado de sistema.** Se a escolha é só de enredo (D4), assuma isso; não finja
  que o jogador está "descobrindo as regras".
