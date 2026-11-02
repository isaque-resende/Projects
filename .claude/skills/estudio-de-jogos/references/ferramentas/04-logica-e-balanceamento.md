# Ferramenta 04: Lógica, balanceamento e puzzles

> **Pipeline:** fase principal **F3** (`../pipeline/F3-sistema-e-mecanica.md`).

Para modelar o estado do jogo, equilibrar desafio e recompensa e desenhar puzzles. Fonte principal:
Schell, *The Art of Game Design* (3ª ed.), cap. 13 (balanceamento) e cap. 14 (puzzles), ambos lidos na
íntegra, mais as partes do cap. 12 sobre estados e regras. Os números `#N` são as lentes do livro.

## Modelo lógico (como programar a regra)

- Pense o jogo como **máquina de estados** (#28): objetos → atributos → estados → gatilhos. Faça uma
  tabela ou diagrama antes de codar; ele vira seu JSON/código (veja 08).
- Separe regras **fundamentais** (a matemática do estado) das **operacionais** (o que o jogador faz).
- Defina o que é **público, privado ou só do jogo** (#29).
- Deixe parâmetros de balanceamento em **dados editáveis**, não espalhados no código (veja "Planeje o
  balanceamento" abaixo).

## O que é balancear

Balancear é ajustar os elementos até entregarem a experiência que você quer; é a parte mais "artesanal"
do design. Só dá para começar quando o jogo é jogável; a regra do autor é gastar cerca de **metade do
tempo de desenvolvimento** balanceando.

## Os 12 tipos de balanceamento (cap. 13)

**1. Justiça (#37).**
- *Simétrico* (mesmos recursos) é bom para medir habilidade. *Assimétrico* serve para simular algo real,
  explorar o espaço de jogo, personalizar, nivelar jogadores desiguais ou criar situações curiosas.
- Em assimétricos, **atribua valores** a cada recurso e some (modelo "biplanos"): jogue, veja quem perde
  e ajuste os pesos; o **modelo e o balanceamento se corrigem mutuamente**.
- **Balanceamento circular** (pedra-papel-tesoura): nenhum elemento domina porque sempre há outro que
  o vence.
- Vantagem que a história justifica (Predador vs. Alien) pode parecer justa.

**2. Desafio × sucesso (#38).** Mantenha o jogador no canal do fluxo.
- Aumente a dificuldade a cada sucesso (com respiros); deixe os hábeis passarem rápido pelo fácil;
  ofereça *camadas de desafio* (notas A, B, C: passar vs. dominar); deixe escolher a dificuldade
  (com o custo de balancear versões); teste com novatos **e** experientes; dê uma ajuda a quem está
  perdendo (estilo Mario Kart).
- Decida que **percentual de jogadores deve terminar** e projete para isso. O começo é muito simples
  porque aprender a jogar já é um desafio.

**3. Escolhas significativas (#39, #40).**
- Escolha significativa muda o que acontece depois. Duas armadilhas: opções que são iguais, ou uma
  claramente melhor (**estratégia dominante**, que "resolve" o jogo; se explorada pelo jogador, é um
  *exploit*).
- Ao remover a estratégia dominante, parece que você "perdeu o controle" do jogo; na verdade, ele
  melhorou.
- **Escolhas × desejos:** mais escolhas que desejos sobrecarrega; menos frustra; iguais dá sensação de
  liberdade.
- **Triangularidade (#40):** opção segura de baixa recompensa vs. arriscada de alta. Equilibre pelo
  **valor esperado** (se a chance cai à metade, a recompensa dobra). Muitos protótipos "sem graça" só
  precisam disso.

**4. Habilidade × acaso (#41).** Habilidade é "séria" e julga; acaso é "casual" e arrisca. Alternar
os dois (sorteia a mão, escolhe a jogada) cria tensão e relaxamento. Escolha pelo público (#19).

**5. Cabeça × mãos (#42).** Quanto é pensar e quanto é destreza? Comunique o equilíbrio escolhido na
embalagem; prometer ação e entregar enigma frustra os dois públicos. Ofereça caminho por estratégia
para quem não tem destreza.

**6. Competição × cooperação (#43, #44, #45).** Competir mede habilidade e dá orgulho; cooperar exige
comunicação e tarefas que ninguém faz sozinho; ambos podem se misturar (equipes, ondas de cooperação
e de rivalidade).

**7. Curto × longo.** O fim do jogo vem das condições de vitória/derrota. Dá para garantir duração com
regras: tempo de graça inicial (Spy Hunter), ou um "Armagedom" que encerra em prazo fixo (Minotaur).

**8. Recompensas (#46).** Tipos: elogio, pontos, jogo prolongado, passagem (acesso novo), espetáculo,
expressão, poderes, recursos, status, conclusão. Princípios:
- Quanto mais tipos, melhor; mas a recompensa precisa ser **compreendida**.
- As pessoas se **acostumam**: aumente o valor ao longo do tempo.
- **Recompensas variáveis** vencem as fixas (donuts em dias aleatórios).

**9. Punição (#47).** Serve para dar valor às coisas, tornar riscos emocionantes e aumentar o desafio.
Tipos: vergonha, perda de pontos (cuidado: barateia os pontos), jogo encurtado, fim de jogo,
retrocesso, remoção de poderes, perda de recurso.
- **Recompensa reforça melhor que punição**; se der, transforme punição em recompensa (comida que dá
  bônus em vez de punir a fome).
- A punição deve ser **compreensível e evitável**; aleatória e inevitável vira "injusto".
- Teste a medida: leve demais torna o risco sem graça; pesada demais torna o jogador cauteloso.

**10. Liberdade × experiência controlada.** Tire a liberdade onde todos querem a mesma coisa (cena
final) sem que ninguém note; veja controle indireto em 05.

**11. Simples × complexo (#48, #49, #50).**
- *Complexidade inata* (regras cheias de "exceto") vs. *emergente* (regras simples, situações ricas,
  como Go). Busque a emergente; aceite a inata só quando necessária (simular algo real, ou pequena
  regra que gera muita emergência, como o peão no xadrez).
- **Balanceamento natural** (propriedade que emerge de uma regra simples, como o aumento de velocidade
  de Space Invaders) é melhor que o **artificial** (muitas regras para forçar o efeito).
- **Elegância:** conte quantos propósitos cada elemento cumpre (os pontinhos do Pac-Man cumprem cinco);
  funda ou corte elementos de um só propósito. Pergunte "o que devo tirar?" antes de "o que devo
  adicionar?".
- **Caráter (#50):** as manias e falhas que o público adora (a torre de Pisa torta). Elegância e
  caráter se equilibram.

**12. Detalhe × imaginação (#51).**
- Detalhe só o que você faz bem; deixe o resto para a imaginação (legenda em vez de voz sintética).
- Dê detalhes que a imaginação possa reutilizar e que inspirem, não que sufoquem.
- Mundos familiares precisam de poucos detalhes; mundos desconhecidos precisam de mais.
- *Efeito binóculo:* um close no começo, depois a imaginação preenche o sprite pequeno.

## Metodologias de balanceamento

1. Comece pela **declaração do problema** (#14); não pule para soluções.
2. **Dobrar e dividir ao meio:** mude o valor de modo perceptível; evite ajustes de 10%.
3. **Adivinhe com precisão** (13,8, não "mais ou menos 14") para treinar a intuição.
4. **Documente o modelo** e atualize-o a cada experimento.
5. **Planeje balancear:** deixe valores editáveis, de preferência com o jogo rodando e mesmo após o
   lançamento.
6. **Não deixe os jogadores balancearem o jogo** (conflito de interesse): só via níveis de dificuldade.

## Economia (#52)

Economia = duas decisões significativas em ciclo: **como ganho** e **como gasto**. Verifique justiça,
desafio, escolhas, acaso, cooperação, tempo, recompensa, punição e liberdade na economia. Moeda única
ou várias? Ganhar e gastar são escolhas significativas?

## Balanceamento dinâmico (cuidado)

Ajustar a dificuldade em tempo real tem três problemas: quebra a ilusão de mundo real, é explorável
(jogar mal de propósito) e tira o prazer de dominar o desafio. Use só com sutileza.

## Lente do Equilíbrio (#53)

A pergunta única que resume tudo: **o jogo parece certo? Por quê?**

## Puzzles (cap. 14)

- Puzzle é uma "diversão com resposta certa"; **um puzzle é um jogo com estratégia dominante** (por
  isso não rejoga). Todo momento em que o jogador para para pensar é um puzzle.
- **Integre os puzzles** ao mundo: os implícitos e integrados (lava + jarras d'água) são mais elegantes
  que os avulsos e incongruentes.
- **Dez princípios:**
  1. **Meta fácil de entender.**
  2. **Fácil de começar** ("para fazer um bom puzzle, construa antes um bom brinquedo"; #54).
  3. **Sensação de progresso** (diferença entre enigma e puzzle; #55).
  4. **Sensação de solubilidade** (o Cubo Mágico vem resolvido).
  5. **Dificuldade crescente** por etapas, de preferência com o jogador escolhendo a ordem.
  6. **Paralelismo** descansa (vários puzzles ao mesmo tempo, diferentes entre si e conectados; #56).
  7. **Estrutura de pirâmide** (pequenos puzzles dão pistas do grande; #57).
  8. **Dicas** estendem o interesse (em níveis, com custo leve).
  9. **Dê a resposta** (o "Ah!" vem de ver a resposta; ofereça saída para quem travou).
  10. **Mudança de percepção é faca de dois gumes**: ou o jogador entende ou não ganha nada; use
      pouco.
- **Lente do Puzzle (#58):** que puzzles existem? mais ou menos? quais princípios cada um cumpre?
  algum destoa do jogo?

## Acréscimos de Sylvester (*Designing Games*, cap. 3 e 6)

### Habilidade, profundidade e acessibilidade
- **Profundidade:** o jogo gera significado em níveis altos. Um jogo "resolvido" perde o sentido.
  **Teto de habilidade:** limite onde não dá para melhorar; é "sem limite" se o jogador perfeito teórico
  supera qualquer humano. Atrasos de animação reduzem o teto.
- **Acessibilidade:** significado em níveis baixos; **barreira de habilidade** é o mínimo para jogar.
  Designers a subestimam porque são hábeis demais.
- **Alcance de habilidade** (skill range): faixa em que há desafio; "fácil de aprender, difícil de
  dominar" é o grande teste. Ampliar: elegância, **reinvenção** (manual → situacional → mental),
  desafios elásticos, treinamento invisível e dificuldade modificável.
- **Desafios elásticos:** graus de sucesso e de fracasso (anéis do dardo, notas de missão, falha que
  deixa continuar) em vez de passa/falha.
- **Treinamento invisível:** tutorial como parte da história, treino que pode ser pulado, ensino
  adaptativo ao detectar a lacuna. **Suporte emocional de vida:** nos minutos abaixo da barreira,
  use gatilhos que não exigem habilidade (arte, personagens, música, humor).
- **Dificuldade:** explícita (confusa, sem padrão), adaptativa (silenciosa; experts a decifram),
  implícita (estratégias mais fáceis ou difíceis; o jogador se auto-seleciona).

### Falha
- **Não puna o jogador, puna o personagem.** Esperar carregamentos, repetir trechos e fazer grind são
  punições ao jogador. Prefira revés elástico: perder recursos, aliado incapacitado, caminho novo.
- **Armadilha de falha (failure trap):** o jogador preso numa situação onde a falha é garantida.
  Soluções: falha elástica (arma infinita fraca), render-se, dicas, dificuldade secreta, desafios
  alternativos (passar com 18 de 20).

### Balanceamento (cap. 6)
- Balancear é um método; seus dois grandes objetivos são **justiça** e **profundidade**.
- Balanceie **estratégias** (combinações de ações em cada situação), não ferramentas entre si.
- **Estratégia degenerada:** a obviamente melhor. Esconde-se em interações emergentes; jogadores a
  procuram e odeiam achar.
- **Falácia de contar estratégias viáveis:** mais estratégias não é melhor (pedra-papel-tesoura-
  lagarto-Spock). Basta mais de uma; melhore a nuance da decisão.
- **Escolha o nível de habilidade-alvo.** Jogos de maestria balanceiam no topo (caro); jogos narrativos
  e sociais balanceiam no baixo/médio e gastam o orçamento em mundo e história.
- **Métodos:** trave as propriedades essenciais da ferramenta no extremo e balanceie pelas outras;
  corte fundo quando necessário; **não seja reativo**; teste uma ideia "no 11" de vez em quando
  (momento Nigel Tufnel); colete experiências, não sugestões; teste 10 a 20 vezes para formar um
  modelo de sistema.

## Acréscimos de Salen e Zimmerman (*Rules of Play*, cap. 18 a 21)

**B1. Feedback cibernético (sensor, comparador, atuador).**
- **Negativo:** estabiliza e prolonga (corridas que ajudam quem está atrás).
- **Positivo:** desestabiliza, amplifica sucessos iniciais e encerra o jogo (bola de neve).
- Costumam ser combinados; podem surgir "por acidente"; podem tirar o controle do jogador.
- **DDA** (ajuste dinâmico de dificuldade) é feedback negativo sobre o desempenho.
Regras de LeBlanc: negativo estabiliza e prolonga; positivo desestabiliza e encerra; positivo amplifica o
início, negativo amplifica o fim. *Faça:* identifique os laços de feedback do seu jogo e desenhe-os.

**B2. Teoria dos jogos: o que serve ao designer.**
Árvore de decisão (só para turnos, finito); matriz de pagamentos; soma zero; **ponto de sela** = melhor
estratégia fixa = **estratégia degenerada** (*exploit*) que mata a incerteza. Estratégias mistas.
Não é teoria geral de design: o jogador real não é racional.

**B3. Conflito e metas.**
Conflito é intrínseco (indivíduo/equipe, cooperativo/não, direto/indireto). Todo jogo é competitivo
(medir progresso) **e** cooperativo (cooperação sistêmica: falar a "língua" do jogo). A meta é o desejo
e a "morte simbólica" do jogo. **Justiça:** o jogador recusa o que acha injusto, mas igualdade total é
impossível.

**B4. Quebrar regras.**
Cinco tipos de jogador: **padrão**, **dedicado**, **antiesportivo** (viola implícitas), **trapaceiro**
(viola operacionais em segredo) e **estraga-prazeres** (nega a autoridade do jogo). Estratégias
degeneradas dentro de comunidades às vezes ampliam o espaço de possibilidade. **Incorpore** a quebra de
regras ao design (New Games: regras feitas para modificar).

## Acréscimos de Rogers (*Level Up!*, cap. 12 e 13)

**LU37. Dificuldade não é desafio.**
Dificuldade pune e gera dor; desafio exige habilidade e dá melhora. Um jogo desafiante termina mais
vezes que um difícil. Não derrube "pedras na cabeça" do jogador: se ele morre, que seja por atenção ou
tempo errado, e que perceba que a culpa não foi do designer. Morte não é métrica de design ("o jogador
tem que morrer três vezes").

**LU38. Ajuste dinâmico oferecido, não imposto.**
Reduzir a dureza quando o jogador falha muito, ou dar a cura quando precisa, ajuda a levá-lo adiante.
Oferecer um nível mais fácil funciona; mudar automaticamente costuma ofender. Em corridas, o
oponente que espera (*rubberbanding*). A **duração** também é um botão de dificuldade (fadiga).
- **Cuidado:** veja a seção "Balanceamento dinâmico" acima; a transparência para o jogador importa.

**LU39. Economia de tesouro e loja.**
Valores escalonados (1, 5, 10, 50, 100), não muito distantes; tesouro suficiente para escolhas reais;
sempre algo barato e algo inalcançável; oferecer duas coisas boas e obrigar a escolher; raridade
(comum, incomum, raro, único); mostrar o que há para comprar cedo (planejamento). Decida se o tesouro
regenera (permite "minerar" a fase e quebrar a economia) e evite que o jogador carregue e leve dinheiro
entre estoque e loja. Categorias de loja: ofensa, defesa, reparo, consumíveis, habilidades, acesso,
vaidade, capricho, informação, salvamento. O melhor equipamento deve ser conquistado, não comprado.

## Acréscimos de Fullerton (*Game Design Workshop*, cap. 5, 10 e 11)

**GW41. Completo internamente: sem brecha e sem beco.**
Sinais de incompleto: "as regras não dizem", "estou preso", "não pode fazer isso". Procure
**brechas** (falha explorável para vantagem indevida: a LAM como escada em *Deus Ex*, o ponto seguro
nas bordas de *Asteroids*) e **becos** (jogador sem como seguir: falta de peça, recurso, saída).
Brecha x feature é discutível: às vezes a solução é oferecer variantes para estilos diferentes (servidores
com e sem confronto). Testes: situações controladas, sessões para "quebrar o sistema", caçadores de
brechas. Nenhum jogo é 100% completo; eleve o padrão até não haver deficiência crítica.

**GW42. Quatro frentes de equilíbrio.**
*Variáveis* (os números das propriedades: tamanho do tabuleiro, nº de vidas, velocidade);
*dinâmicas* (laços reforçadores, objetos dominantes, estratégias dominantes); *posições iniciais*
(simétricas ou assimétricas: primeira jogada compensada por regra da torta, *komi*, jogo longo ou acaso;
objetivos assimétricos: relógio, proteção, individuais); *habilidade* (níveis, mediana, ajuste dinâmico).
- *Laço reforçador:* dê ao vencedor um bônus pequeno e temporário; quando passar o clímax, termine rápido.
- *Objetos dominantes:* dê a cada um força e fraqueza (simetria rotacional, pedra-papel-tesoura).
- *Estratégia dominante ≠ estratégia favorita:* a primeira estreita as escolhas; a segunda não.
- *Habilidade:* teste com os melhores (limite alto) e com novatos (limite baixo) e fique no meio.

**GW43. Técnicas para equilibrar sem se perder.**
Pense em **módulos** (subsistemas independentes); **pureza de propósito** (cada componente com uma
missão); **uma mudança por vez**; planilhas que espelham a estrutura do jogo, com importação e
exportação de variações; conheça o jogo como jogador especialista (Pardo); dados não substituem
intuição. Remova elementos até o jogo quebrar para achar o que é extra.

**GW44. Assassinos da diversão (diagnóstico).**
- *Microgerenciamento:* tarefas repetitivas em muitos pedaços; combine micro em macrodecisões, dê
  padrões sensatos e automação opcional.
- *Estagnação:* repetição (varie a ação e mostre o progresso); equilíbrio de poder (os outros sempre
  derrubam o líder: quebre); laço preso; falta de objetivo claro.
- *Obstáculo intransponível:* o jogador não sabe o que fazer (Halo: porta que não abre). Reconheça o
  travamento e dê **ajuda mínima**.
- *Eventos arbitrários:* avise **ao menos três vezes** antes de uma catástrofe e permita mitigar.
- *Caminhos previsíveis:* use objetos com comportamentos simples ou vários objetivos; **erre para o
  lado de mais possibilidade**.

**GW45. Fim no pico.**
Faça o fim coincidir com o pico emocional ("final de Hollywood", Librande); evite finais arrastados
(Monopoly, Risk).

## Aplicação a jogos teológicos (síntese minha, não é do livro)

- **Dificuldade não pode virar barreira para a mensagem.** Aplique "dê a resposta" e dicas em níveis:
  quem trava não deve perder a passagem.
- **Punição com cuidado pastoral.** Evite sensação de "reprovação espiritual" por erro de mecânica;
  prefira reforço positivo e tente transformar a punição em recompensa (princípio do Diablo).
- **Economias simbólicas** (pães, talentos, lamparinas) combinam com a pilha da história (02, N4) e
  tornam a economia parte do tema.
- **Cooperação como formação:** tarefas que ninguém faz sozinho (#44) servem a grupos de estudo.
- **Puzzles integrados à cena:** decifrar um costume, um mapa ou uma genealogia pode ser puzzle e
  estudo ao mesmo tempo.
- **Balanceamento é teste:** use o ciclo de 06 (playtest) com leitores que conhecem e que não conhecem a
  passagem; o equilíbrio muda muito entre os dois públicos.
