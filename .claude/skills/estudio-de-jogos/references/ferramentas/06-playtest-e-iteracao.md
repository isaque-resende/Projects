# Ferramenta 06: Playtest e iteração

> **Pipeline:** fase principal **F6** (`../pipeline/F6-teste-e-qualidade.md`).

Para testar, observar e melhorar. Fonte principal: Schell, *The Art of Game Design*, cap. 8 (processo e
protótipos) e cap. 28 (playtest). Obs.: cap. 28 lido por seções e títulos; leitura profunda pode
acrescentar técnicas.

## Princípios

**T1. Regra do Loop.** Quanto mais vezes você testa e melhora, melhor o jogo. Planeje o projeto para
caber o máximo de ciclos.

**T2. Cada teste responde a uma pergunta.** Se não consegue enunciar a pergunta, o teste vira
desperdício.

**T3. Lente do Playtest (#103): as seis perguntas.**
- **Por quê?** O objetivo do teste (jogabilidade, usabilidade, mercado...).
- **Quem?** Quem deve estar lá (perfil do público, não só amigos).
- **Quando?** Em que ponto do desenvolvimento.
- **Onde?** O local deve combinar com a pergunta e com o venue real.
- **O quê?** O que observar.
- **Como?** Como coletar a informação.

**T4. Observe, não explique.** Veja o que o jogador faz; resista a justificar o jogo. Interprete
o que ele *fez* mais que o que *disse*.

**T5. Dê permissão para criticar.** Testadores poupam os sentimentos do criador. Diga que o jogo
tem problemas e que você precisa de ajuda para achá-los.

**T6. Perguntas melhores.**
- Peça "três partes de que menos gostou", não só uma; a primeira citada é a mais forte.
- Use escala de cinco pontos com rótulos claros, não 1 a 10.
- Questionário curto; não trate resultado como evangelho.
- Peça que desenhem a **curva de interesse** deles e compare com a sua (#69).

**T7. Prototipe barato.** Papel serve; não precisa ser interativo; esqueça qualidade; não se apegue
(veja as dicas de protótipo em 01 P13).

**T8. Mitigue riscos primeiro (#16) e verifique a paixão (#18) a cada ciclo.**

## Fluxo prático de um ciclo

1. Liste a pergunta e o risco que o ciclo ataca.
2. Construa o menor protótipo que responde.
3. Teste com 3 a 5 pessoas do público certo.
4. Registre: o que fizeram, onde travaram, o que sorriram, o que ignoraram.
5. Decida: manter, mudar ou cortar.
6. Atualize a curva de interesse e a lista de riscos.

## Acréscimos de Sylvester (*Designing Games*, cap. 6, 11 e 12)

**T9. Protocolo de teste: teste mal feito é pior que nenhum.**
Ele dá "conhecimento que não é verdade". Fontes de erro: testadores que conhecem o jogo, grupo
(imitação), pensar em voz alta (altera a ação), seleção de testadores, amostra pequena. O objetivo do
playtest é entender como o design funciona em ação (confusão, dificuldade, estratégias degeneradas,
compreensão da narrativa), não achar bugs nem dados de mercado.

**T10. Formas de teste.**
- *Auto-teste:* primeiros loops (fluxo, ritmo, bugs).
- *Por cima do ombro:* observe em **silêncio total**; se perguntarem, "Desculpe, não posso responder".
  Informação extra deve estar prevista no protocolo.
- *Testadores "Kleenex":* nunca viram o jogo (primeiros minutos); só servem uma vez.
- *Testadores dedicados:* para balanceamento de alto nível.
- Escolha testadores que se pareçam com o público final; a instrução de cada teste vem da pergunta.

**T11. Amostra e parada.**
Cada testador mostra um fio do espaço de possibilidades. Pare quando começarem a repetir
experiências (2 a 3 em jogos simples, 6 a 12 em combate, muitos em sistemas abertos). Teste até
formar um modelo de **sistema**, não de história.

**T12. Perguntas.**
Relatos verbais não são confiáveis. A pergunta favorita é **"conte a história do que acabou de
acontecer"** (o que não é mencionado pode ser peso morto). Não induza ("você viu a porta?");
pergunte "por que escolheu esse caminho?". Tom aberto, profissional e grato.

**T13. Colete experiências, não sugestões.**
Quando o testador sugere algo, trabalhe de trás para frente até a experiência que motivou a sugestão.

**T14. Graybox e produção prematura.**
Prototipe com placeholders; só adicione arte quando precisar dela para o próximo dado de teste.
Avaliar graybox é habilidade (o feio engana). Pouco útil quando a emoção é audiovisual.

**T15. Métricas.**
Dados coletados automaticamente (posição, saúde, mortes, tempo) revelam desequilíbrios de poucos
pontos e casos raros que o playtest não vê. Dá para inventar métricas (botão "vi lag").

**T16. Arte e legibilidade.**
Playteste de novo ao trocar graybox por arte: a mecânica não mudou, mas a percepção sim (ruído).

## Acréscimos de Rogers (*Level Up!*, cap. 2, 9, 13 e 17)

**LU43. Teoria do não-divertido.**
Comece com uma ideia divertida e, a cada revisão, liste e **remova o que não é divertido** (câmera,
controle, animação, dificuldade). Sobra o divertido. Faça isso várias vezes: o que deslumbrava na
primeira vez desgasta na centésima.

**LU44. Antolhos do designer.**
Quem jogou mil vezes não percebe o que cansa ou é difícil demais. Peça a outros para jogar, observe
em silêncio e busque a visão "de longe". Também jogue **como o jogador quebraria** o jogo, não só como
foi pensado.

**LU45. Playground e arena de teste.**
Isole as mecânicas em uma fase de teste (distâncias, tempos, letalidade) antes de usá-las. Tenha formas
de pular níveis e ativar trapaças para testadores e demonstrações.

## Acréscimos de Fullerton (*Game Design Workshop*, cap. 9 a 11)

**GW32. O que playtest é (e o que não é).**
Não é revisão interna, nem QA, nem grupo de foco, nem teste de usabilidade instrumentado. É o designer,
durante todo o processo, **obtendo informação sobre como os jogadores experimentam o jogo**. Teste
desde o primeiro protótipo; o ciclo encurta com a produção.

**GW33. Quem testa e quando.**
Você mesmo (com "mente de principiante"); depois confidentes (amigos e família: duros ou brandos
demais; "desmame-os" quando houver regras); depois **desconhecidos do público-alvo**, articulados,
variados e que consomem o gênero. Recrute em comunidades (igreja, escola, grupos online). Traga de
volta os melhores. Cada fase pede um perfil.

**GW34. Roteiro de sessão.**
Introdução (2-3 min) → aquecimento sobre hábitos de jogo (5) → jogo (15-20; "pense em voz alta"; "o
jogo está sendo testado, não você") → discussão (15-20; perguntas abertas: o que entendeu, o que
confundiu, o que descreveria a um amigo) → encerramento. Você "não vem na caixa": quando o jogo sair,
não estará lá para explicar. Ouça sem defender; não responda crítica, anote.

**GW35. Princípios de condução (resumo das "regras" de Pozzi e Zimmerman).**
Teste **antes** de achar que está pronto; saiba a **uma pergunta-chave**; prepare **variações** (mude
um elemento só); seja grato; culpe o projeto, não o testador; **não explique**; anote tudo (o que se
lembra é o que se esperava ouvir); seja "egoísta" (a sessão não é para o testador se divertir);
**cale-se**; veja o quadro todo (emoções, corpo, interação); responda pergunta com pergunta; **tenha
fome de falha** (a "síndrome da cara feliz": só lembrar dos sorrisos); trate o testador como paciente
e você como médico (sintoma, não prescrição); aceite o inesperado.

**GW36. Métodos, dados e métricas.**
Um a um, em grupo (bom para gerar ideias, ruim para avaliar), formulários (escala de cinco pontos,
simétrica, com âncoras), entrevista, discussão. Métricas **comportamentais** (o que fazem: tempo,
sucesso, pedidos de ajuda) e **atitudinais** (o que dizem); cruzar as duas gera insight (Crackdown:
quem coletou mais orbes achou mais divertido; acelerar o acesso subiu a nota). Mapas de calor. Dados
enganam sem julgamento criativo; fisiologia mede excitação, não valência.

**GW37. Situações controladas e RITE.**
Force o fim do jogo, o evento raro, a fase tal, o recurso novo; use "cheats" como ferramenta. RITE:
4 a 5 testadores revelam ~80% dos problemas muito detectáveis; teste com pouca gente, com frequência,
rastreie problemas e soluções por semana.

**GW38. Fases do teste: o que procurar em cada uma.**
*Fundação:* a ideia é envolvente? *Estrutura:* funciona para outros? tem faísca? *Detalhes formais:*
funcional, completo, equilibrado (veja 04). *Refinamento:* engajamento e **acessibilidade**.
**Funcional** = quem não sabe nada joga do começo ao fim sem ajuda. "Não tente consertar tudo de uma vez."

**GW39. Acessibilidade e usabilidade leve.**
Quanto mais você entende o jogo, menos prevê o problema dos outros. Teste com gente do público,
objetiva, que nunca jogou e com **variação de necessidades** (visão, audição, cognição, controle), 3 a
5 por segmento, um a um, com roteiro de tarefas críticas ("o participante nunca está errado").
Consulte diretrizes de acessibilidade para detalhes.

**GW40. Matriz de jogo.**
Eixos: **habilidade x acaso** e **cálculo mental x destreza física**. Peça aos testadores para
localizar o jogo e dizer onde prefeririam. Útil para nomear o que falta.

## Aplicação a jogos teológicos (síntese minha)

- **Teste com dois públicos:** leitores que conhecem a passagem e os que não conhecem; a experiência
  muda muito.
- **Teste de fidelidade:** peça a alguém com formação bíblica que aponte onde o jogo distorce o texto
  (esta é a "aprovação de especialista" mencionada em 07).
