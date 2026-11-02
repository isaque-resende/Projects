# Ferramenta 03: Mecânica

> **Pipeline:** fase principal **F3** (`../pipeline/F3-sistema-e-mecanica.md`).

Para definir o que o jogador faz, com quais regras, e como isso gera a experiência. Fonte principal:
Schell, *The Art of Game Design* (3ª ed.), cap. 4 (o que é jogo) e cap. 12 (as sete mecânicas), este
último lido na íntegra. Os números `#N` são as lentes do livro.

## O que é jogo (cap. 4)

- **Diversão** é prazer com surpresas (#4, #5). **Brincar** é manipulação que satisfaz a curiosidade
  (#6). **Brinquedo** é um objeto com que se brinca. **Jogo** é uma atividade de resolução de
  problemas abordada com atitude lúdica (#8).
- **Valor endógeno (#7):** o jogo funciona porque os jogadores aceitam fingir que pontos e objetos
  importam. Pergunte o que é valioso dentro do jogo e por quê.
- **Mecânica** é o que sobra quando se retira estética, tecnologia e história: as interações e
  relações. É o que faz de algo um jogo (cap. 12).

## As sete mecânicas

### 1. Espaço (#26)
- O espaço do jogo é uma construção abstrata: retire toda a aparência e veja a estrutura.
- Pode ser **discreto** (casas separadas, como xadrez) ou **contínuo** (mesa de sinuca); tem um número
  de dimensões; tem **limites** e subespaços conectados.
- A estética engana: o Monopoly parece 2D, mas funcionalmente é uma linha de 40 pontos em laço.
- **Espaços aninhados:** "espaços dentro de espaços" (mapa externo → entrar na cidade → entrar na
  casa) representam mundo complexo de forma simples.
- Mesmo jogo sem tabuleiro tem espaço (onde a informação circula); modelar isso dá ideias.
- Há mais de um modelo útil para o mesmo jogo; use o que ajuda na decisão do momento.

### 2. Tempo (#27)
- **Discreto** (turnos) ou **contínuo** (ação em tempo real), ou misto (xadrez de torneio tem turnos
  mais relógio).
- **Relógios** impõem limite absoluto; **corridas** impõem pressão relativa a outro jogador. Tempo
  também pode ser aninhado (relógio da partida + relógio de cada jogada).
- Jogos permitem **controlar o tempo**: pausar, acelerar, voltar atrás (checkpoint, Braid).
- Duração: o jogo termina cedo demais ou tarde demais? Relógio ajudaria ou irritaria? Há hierarquia de
  rodadas curtas dentro de uma maior? "Deixe-os querendo mais."

### 3. Objetos e estados (#28)
- Objetos são os **substantivos**; atributos e seus estados são os **adjetivos**.
- Atributos **estáticos** (nunca mudam) e **dinâmicos** (mudam); os dinâmicos interessam.
- Regra prática: se dois objetos se comportam igual, devem parecer iguais; se se comportam diferente,
  devem parecer diferentes.
- Faça um **diagrama de estados** para cada atributo complexo: estados, transições e o evento que
  dispara cada uma. Implementar como **máquina de estados** proíbe transições ilegais e reduz bugs.
- Muitos estados que o jogador precisa acompanhar o sobrecarregam.
- A representação é uma escolha: a mão do pôquer pode ser uma área com cinco cartas ou um objeto com
  cinco atributos; escolha o modo mais útil.

### 3b. Segredos (#29, faz parte de Objetos)
- Mude **quem sabe o quê** e o jogo muda por completo (pôquer fechado vs. aberto).
- "Hierarquia de quem sabe": o que é público; compartilhado por alguns; privado de um; sabido só
  pelo jogo; gerado aleatoriamente (ninguém sabe ainda).
- Torne público, de repente, um segredo importante: boa fonte de drama.
- Oponentes virtuais devem ser tratados como "jogadores" na informação; a confiança de que o jogo não
  trapaceia importa.

### 4. Ações (#31) e emergência (#30)
- Ações são os **verbos**. **Básicas** (o que se pode fazer) e **estratégicas** (como usá-las para a
  meta; surgem das interações, não da regra escrita).
- A razão entre ações estratégicas significativas e básicas mede a emergência. Jogo elegante tem
  poucas básicas e muitas estratégicas.
- **Cinco formas de semear emergência:**
  1. Mais verbos (um bom verbo vale mais que vários medíocres).
  2. Verbos que agem sobre muitos objetos (o mais poderoso).
  3. Metas alcançáveis de mais de um jeito (cuidado com estratégia dominante).
  4. Muitos sujeitos (várias peças controladas).
  5. Efeitos colaterais que mudam as restrições.
- Mudar uma ação muda o jogo inteiro; jogos "inovadores" costumam dar ações novas.
- Verbos livres (aventura de texto) frustram: o jogador não sabe o que pode tentar.

### 5. Regras (#33) e metas (#32)
- Regras definem espaço, tempo, objetos, ações, consequências, restrições e **metas**. Um jogo é suas
  regras.
- **Tipos (Parlett):** *fundamentais* (estrutura formal abstrata), *operacionais* (o que o jogador faz),
  *comportamentais* (boa conduta implícita), *escritas*, *leis* (regras de torneio), *oficiais*,
  *consultivas* (dicas de estratégia) e *da casa* (ajustes dos jogadores).
- **Modos:** regras diferentes em partes do jogo; sinalize o modo, tenha um principal com submodos e
  não deixe o jogador esquecer o que fazia no principal.
- **Quem aplica as regras:** no computador, o jogo aplica; isso permite complexidade, mas as regras
  precisam ser descobríveis, não memorizáveis.
- **Possibilidade de trapacear** (ou parecer possível) destrói o valor endógeno.
- **Ensino das regras:** tutorial interativo funciona melhor que documento; tenha resposta pronta para
  "como o jogador aprende a jogar?".
- **Meta é a regra mais importante:** declare em uma frase (xadrez: "capture o rei"). Boas metas são
  **concretas, alcançáveis e recompensadoras**, com equilíbrio entre curto e longo prazo e espaço para
  o jogador escolher metas próprias.
- Regras surgem por experimentação; **anote os buracos** nos testes, ou voltarão.

### 6. Habilidade (#34)
- Três categorias: **físicas**, **mentais** e **sociais**.
- **Habilidade real** (do jogador) vs. **virtual** (do personagem, que melhora sem o jogador melhorar):
  a virtual dá sensação de poder, mas em excesso soa oco.
- Liste as habilidades que o jogo exige; costuma haver outras além da que você imagina (ex.: um jogo
  "de reflexo" que na prática é de memorização).
- Verifique: falta categoria? alguma domina? é justo? dá para melhorar com prática? o nível está certo?

### 7. Acaso (#35, #36)
- Acaso gera incerteza e, portanto, surpresa. Mas a intuição humana sobre ele é falha.
- **Dez regras de probabilidade para designers:**
  1. Fração, decimal e percentual são o mesmo número.
  2. Probabilidade vai de 0 a 1; resultado fora disso indica erro.
  3. Probabilidade = resultados procurados ÷ resultados possíveis (equiprováveis).
  4. **Enumere** os resultados quando for difícil de ver.
  5. "OU" soma, só se os eventos forem mutuamente exclusivos.
  6. "E" multiplica, só se os eventos forem independentes.
  7. **1 − "acontece" = "não acontece"** (muitas vezes é o caminho mais curto).
  8. A soma de várias seleções lineares **não** é linear (dois dados formam uma curva em sino).
  9. **Simule** (Monte Carlo): repita milhares de vezes por código para medir a probabilidade real.
  10. Pergunte a quem entende de matemática.
- **Valor esperado:** média ponderada dos resultados de uma ação. Cuidado com o **valor real**: um
  ataque de 40 de dano vale pouco contra um inimigo com 15 de vida.
- **Elemento humano:** pessoas evitam o arrependimento (preferem ganho certo a ganho provável maior)
  e superestimam riscos assustadores; trate a **probabilidade percebida**, não só a real.
- **Habilidade e acaso se misturam:** estimar probabilidade é habilidade; toda habilidade tem chance
  de falha; estimar a habilidade do oponente é habilidade; "prever" o acaso puro e "controlá-lo" são
  habilidades imaginadas (falácia da sequência de sorte e do apostador). Use isso a seu favor.
- Risco e aleatoriedade são como temperos: sem nada, o jogo é insosso; demais, tudo é encoberto.

## Princípios práticos

**M1.** Comece pelo brinquedo e pelos verbos, antes das regras de vitória.
**M2.** Poucos verbos que agem sobre muitos objetos geram mais jogo que muitas regras avulsas.
**M3.** Declare a meta em uma frase e confirme que ela é concreta, alcançável e recompensadora.
**M4.** Escolha informação oculta/pública de propósito: é a alavanca mais barata de mudar o jogo.
**M5.** Diagrame os estados antes de codar; implemente-os como máquina de estados.
**M6.** Teste e anote cada buraco de regra encontrado.

## Acréscimos de Sylvester (*Designing Games*, cap. 2): elegância

**M7. Elegância = maximizar poder emocional e variedade, minimizando o ônus do jogador e da equipe.**
Toda mecânica custa atenção do jogador. Fonte da elegância: **emergência** (mecânicas simples que se
multiplicam, como olhar + atirar + mover). Mecânicas que interagem são difíceis de ajustar, por
isso jogos elegantes são raros.

**"Cheiro" de elegância (heurísticas para a prancheta):**
1. Interage com muitas outras mecânicas (e consigo mesma).
2. É simples; cabe num guardanapo.
3. Tem usos múltiplos (a arma que também defende).
4. Não sobrepõe o papel de outra mecânica.
5. Reaproveita convenções e interfaces conhecidas (originalidade vem de mudar fundamentos, não superfície).
6. Escalas compatíveis (vida 20, mana 3 a 10, mãos de 7 cartas: conversões naturais).
7. É muito repetida (mecânica de uso único é "gimmick"; busque a de "um milhão de repetições").
8. **Não impõe restrições de conteúdo** (um pulo de 20 pés obriga todo nível a se contorcer; benefício
   imediato, custo escondido).
9. Usa toda a expressividade da interface (segurar/soltar, ângulo, pressão).
*Faça:* antes de adicionar uma mecânica, conte quantas outras ela toca e quantas vezes será usada.

## Acréscimos de Salen e Zimmerman (*Rules of Play*, cap. 11 a 17 e 23)

**M8. Regras ≠ experiência.**
Trocar o nome dos naipes não muda as regras. Regras limitam a ação, são explícitas e inequívocas,
compartilhadas, fixas, vinculantes e repetíveis. São diferentes de dicas de estratégia e de etiqueta.

**M9. Três níveis de regras.**
- **Constitutivas:** a lógica matemática abstrata do jogo (a "física" do estado).
- **Operacionais:** o que o jogador faz ao jogar; o que vai no manual e na interface.
- **Implícitas:** etiqueta e convenções não escritas.
Um mesmo conjunto constitutivo admite várias formas operacionais. A **identidade formal** do jogo vem
da relação entre eles; a especificidade das regras faz "este jogo e não outro". Regras elegantes deixam
o jogador focar na experiência, não na lógica.
*Faça:* escreva o jogo primeiro como constitutivas (modelo de estado), depois as operacionais.

**M10. Emergência.**
Sistemas complexos ficam entre o periódico (repete) e o caótico (aleatório). Emergem padrões imprevisíveis
de poucas regras quando as interações são **acopladas** (ligam-se umas às outras) e **dependentes de
contexto** (mudam conforme o resto do sistema), de baixo para cima (*bottom-up*). Blefar não está nas
regras do pôquer. Jogos que "juntam" tipos de unidade geram *engines* de combinações.
Sem complexidade não há jogo significativo: o espaço de possibilidade precisa ser grande.

**M11. Mecânica núcleo.**
É a atividade essencial, momento a momento, que o jogador repete e que forma padrões maiores. Pode ser
simples (correr) ou composta (tática + recursos + habilidade). Muitos designers a ignoram e confiam em
interatividade convencional. Variações estendem o núcleo (Breakout).

**M12. Incerteza.**
Sem incerteza o jogador não influi e não há jogo significativo. Níveis: **micro** (acaso em momentos) e
**macro** (resultado final). Graus: **certeza**, **risco** (probabilidade conhecida) e **incerteza**
(desconhecida). A "sensação de aleatoriedade" pode vir de complexidade estratégica ou social.
Pouca deixa o jogo seco; muita, caótico e impotente. Desconfie de geradores pseudoaleatórios e das
falácias do acaso. Mesmo jogos de puro acaso valem se houver ações significativas.

**M13. Informação.**
- **Teoria:** informação mede incerteza. **Ruído** a aumenta (em jogos pode ser produtivo, como
  Charades); **redundância** compensa o ruído.
- **Jogos:** informação perfeita (xadrez: analítico, competitivo) vs. imperfeita (pôquer: incerteza e
  desconfiança). Quatro tipos (Pearce): conhecida por todos, por um, só pelo jogo, aleatória.
- O valor de uma informação vem de suas relações no sistema; há informação **objetiva** (estrutura
  interna) e **percebida** (o que o jogador viu).
- Jogos digitais manipulam informação com facilidade; descobrir as regras ocultas pode ser o jogo.

**M14. Regras de jogos digitais.**
Regras não são o código, mas a lógica de entrada e saída e a seleção interna (o próximo bloco do Tetris)
são regras. As constitutivas lidam com eventos internos; as operacionais incluem entrada e saída (eventos
externos). As implícitas incluem suposições da plataforma; brincar com elas gera inovação.

## Aprofundamento: complexidade, emergência e incerteza (*Rules of Play*, cap. 14 e 15, lidos na íntegra)

### Complexidade e emergência (cap. 14)
**M15. Complexidade é de natureza diferente, não uma questão de quantidade.**
Há uma "barreira de complexidade". Uma mesa tem partes e relações fixas; 10 mensageiros em 50
prédios, trocando mensagens, formam um sistema novo. Poucos elementos cruzam a barreira (três corpos;
uma conversa). Quatro tipos (Langton): **fixo**, **periódico**, **complexo** e **caótico**. Complexo é
uma faixa estreita entre a ordem e o ruído.

**M16. Complexidade ≠ jogo significativo, mas é pré-requisito.**
"Cara ou Coroa" tem um único evento aleatório; "A Grade" tem decisões demais e nenhum efeito. As
variantes que funcionam acrescentam **relações decisão → resultado** e **integração** numa estrutura
maior: conversa para blefar, partidas repetidas (padrões), risco crescente ("forçar a sorte").
*Faça:* diante de um jogo sem graça, pergunte: que relação decisão-resultado falta? o que se integra ao
que vem depois?

**M17. Emergência: poucas regras, muita variedade, novidade e surpresa.**
Pode-se descrever todas as regras, não todos os produtos. Precisa de interações **acopladas**
(recursivamente ligadas) e **dependentes de contexto**; o comportamento surge de baixo para cima e o
todo é mais que a soma. A emergência em jogos nasce da interação do sistema formal com as decisões do
jogador (blefar não está nas regras do pôquer) e também ocorre no nível social e psicológico.
**Mais regras ≠ mais complexidade:** Go tem regras mais simples que o xadrez e mais permutações.

**M18. Projetar surpresa exige atributos muito específicos.**
No *Populous: The Beginning*, o pregador converte guerreiros que chegam, e guerreiros em luta são
imunes. Duas regras simples fazem a segunda onda travar batalha e obrigam o jogador a reposicionar.
Isso só acontece porque raio, tempo de conversão, velocidade e imunidade foram afinados juntos.
*Faça:* defina por escrito os atributos (distância, tempo, velocidade, imunidade) das peças que
devem interagir, e teste-os juntos.

**M19. Afinação e *engines* (LeBlanc; Gearheads).**
Emergência exige iterar, testar e refinar as regras (o *Game of Life* levou dois anos). No Gearheads,
os 12 brinquedos tinham estatísticas editáveis **durante o jogo**; as combinações cooperativas
(*engines*) foram **descobertas**, não projetadas: baratas que flipam + canguru que soca;
bomba que protege o robô lento; ciclo infinito de Handy e Crush Kringle.
*Faça:* faça muitas peças que interagem (cartas, tipos de unidade, verbos) e deixe os jogadores
acharem combinações; deixe parâmetros editáveis em tempo de jogo; use as *engines* achadas na IA.

**M20. Design de segunda ordem e "sexto sentido estrutural".**
Você projeta regras, não o jogo. Com o tempo, o designer desenvolve a intuição estrutural de como uma
mudança local se propaga. O prazer é ver o jogo jogado de modos imprevistos.

### Incerteza (cap. 15)
**M21. Incerteza em dois níveis.**
**Macro:** o resultado final (jogo de habilidade entre iguais é incerto sem acaso). **Micro:** o acaso
nas operações. Sem incerteza, as escolhas não importam, e o paradoxo é que a incerteza dá a sensação de
que as decisões têm impacto.

**M22. Três graus (Epstein).**
**Certeza** (o resultado é conhecido; jogo da velha entre quem sabe: sempre empate), **risco**
(probabilidade conhecida; roleta) e **incerteza** (desconhecida; oponente anônimo). Jogos misturam; a
noite de roleta é mais incerta que cada giro.

**M23. A "sensação de aleatoriedade" vale mais que a aleatoriedade.**
Damas Chinesas e SiSSYFiGHT 2000 parecem aleatórios por causa do número de agentes e arranjos. Sem
sensação de aleatoriedade, o jogo fica seco e competitivo; com demais, caótico e sem controle.
Resposta: dar escolhas significativas (competição justa; ou aleatoriedade com "forçar a sorte").

**M24. Probabilidade em dados (Knizia).**
Resultados básicos equiprováveis; evento = favoráveis ÷ possíveis; dois dados têm 36 combinações e o 7
sai 6 vezes (6/36), o 2 e o 12 uma (1/36). Use o ritmo desejado para dimensionar o tabuleiro: no Monopoly,
40 casas ÷ média 7 ≈ 6 jogadas por volta.

**M25. Acaso puro também pode ser significativo.**
Chutes and Ladders sem os escorregadores e escadas seria chato: eles rompem o ritmo constante e criam
reviravoltas. Na loteria, as escolhas (qual jogo, números, frequência) são o jogo. Em
*Thunderstorm*, a casa desenhada traduz rolagens em informação pública; o número de dados cai de seis a
um e volta (ciclos sobrepostos) e a tensão cresce; em *Pig*, a escolha de continuar rolando tem
probabilidade de sobrevivência decrescente (83%, 69%, 58%...) e depende da posição dos outros.
*Faça:* ao usar acaso puro, projete visibilidade (o que está em risco, quanto falta) e uma decisão
simples no ponto de maior tensão.

**M26. Três colapsos da incerteza.**
1. **Aleatoriedade do computador:** é determinística. Um erro de contagem dava dobro de chance ao
   canto superior esquerdo e fazia as criaturas migrarem para lá. Entenda e teste seu gerador.
2. **Estrategizar o acaso:** jogadores manipulam o que parece sorte ("eenie-meenie" tem seis
   técnicas). Pergunte se seu "aleatório" é manipulável.
3. **Falácias:** supervalorizar a longa chance; somar chances sucessivas; síndrome de Monte Carlo;
   supervalorizar o bom; "raio cai duas vezes"; "sorte". Espere que os jogadores as tenham, e use.

**M27. Chance significativa (DeKoven).**
A incerteza do jogo "está nos olhos de quem vê"; blefe e confiança expõem a pessoa. O sistema "joga
com" o jogador.

## Acréscimos de Rogers (*Level Up!*, cap. 12 e 13)

**LU29. Quatro tipos de elemento.**
*Mecânicas* (objetos que geram jogabilidade ao serem usados), *perigos* (mecânicas que ferem, com
padrão previsível e sem inteligência), *cenário reagente* (props) e *puzzles*. Se o perigo tem IA, é
inimigo. Pense nos mesmos elementos de três jeitos: o que o jogador faz, o que o machuca, o que reage.

**LU30. Estados visíveis.**
Toda alavanca, porta ou botão precisa **mostrar** que mudou (cor, posição, som) e **mostrar o efeito**
(câmera, voz). Se reverte sozinha, marque o tempo restante. Porta trancada deve parecer
inequivocamente trancada e dizer por quê. Mantenha o mesmo modo de abrir/usar em todo o jogo.

**LU31. Quebra-cabeça de tempo: quatro condições.**
Padrão de movimento discernível; tempo previsível (aleatório é injusto); janela apertada mas possível,
com folga nas bordas; "sinais" no mundo (marcas, sombras, sons) para quem observa.

**LU32. Puzzle: um desafio com resposta certa.**
- Mostre a **porta antes da chave** (o jogador deve saber o que está tentando fazer).
- Peças poucas, simples, modulares e reversíveis; resposta visível a cada ação.
- Tudo o que se precisa está por perto; ligue o puzzle à história e ao mundo (nada de peças de xadrez
  num posto policial).
- A disposição é parte da pista; diga se está "quente" ou "frio".
- Quatro vias de solução: raciocínio, conhecimento, habilidade, sorte; as melhores permitem mais de uma.
- Dê o momento "a-ha"; se o jogador não chega lá, ofereça dica ou resposta com custo pequeno, nunca
  perder vida ("progredir é um direito, não uma recompensa").
- **Sem bigodes de gato:** soluções rebuscadas demais indicam designer contra jogador, e não jogador
  contra puzzle.
- Puzzles são portões: tenha caminhos alternativos para o jogador voltar depois.
- Perguntas (trivia): três ou mais opções com "respostas próximas", dificuldade variada (mais simples
  que obscuras), muitas perguntas (acabam e acaba a graça), texto curto.

**LU33. Minijogos.**
Qualquer atividade vira minijogo (arrombar, hackear, cozinhar). Controles simples, 5 a 10 minutos,
progressão suave com novidade a cada degrau, fim claro, "pausa de transição" quando mistura estilos.
O "bate-na-toupeira" é último recurso (só reflexo, aleatório, repetitivo, sem fim).

**LU34. Orquestre os elementos como uma peça musical.**
Introduza em ordem: movimento simples → uma mecânica (repetida) → uma segunda (e combine) → um perigo
→ inimigos → combinar inimigos e perigos → virar um deles de cabeça para baixo. Poucos elementos bem
combinados rendem mais que muitos isolados; alterne-os para não cansar. Faça o jogador **usar o
perigo contra o inimigo** para se sentir esperto.

**LU35. Power-ups: perguntas e categorias.**
Perguntas: o que faz, como se destaca, combina com outros, trade-off, como avisa que vai acabar, como
se coleta. Categorias: defensivos, ofensivos, de movimento e **mudadores de jogo** (mudam o estado
ou as regras por um tempo). Podem ser condicionais ao conjunto completo. Evite "anti-power-ups"
(só funcionam uma ou duas vezes).

**LU36. Pontos de salvamento (*checkpoints*).**
Visíveis dão segurança e conquista; invisíveis preservam a imersão mas geram dúvida. Regras: virados
para a direção do caminho, longe de perigos, em chão plano, com salvamento automático dos dados.

## Acréscimos de Smibert (*Game Logic*, cap. 4 e 6; jogos de mesa)

Livro introdutório para jovens, centrado em jogos de tabuleiro, cartas e RPG. Entra aqui só o que
acrescenta algo prático para jogos de mesa e cooperativos (inclusive os jogados em grupo, como em
estudo bíblico).

**SM1. Cinco componentes de um jogo de mesa.**
*Espaço* (onde se joga e onde se passa), *componentes* (tabuleiro, cartas, dados, fichas, aplicativos),
*mecânicas* (as escolhas: apostar, licitar, trocar, contar histórias, votar, escolher cartas),
*objetivos* e *regras*. Há uma mecânica central e várias menores. Uma mecânica nova pode surgir de
um gesto (virar a carta, "*tapping*"), e o *draft* de cartas é uma escolha com custo de oportunidade.

**SM2. Princípios de design de jogos de mesa.**
Prefira o jogo **mais curto**; equilibre **sorte e estratégia** (sorte alivia a angústia de cada
jogada; demais, invalida o pensar); sensação de **justiça**; evite **eliminar jogadores** cedo; inclua
um mecanismo de **recuperação** (*catch-up*: o Ladrão de Catan, bônus de Scrabble); faça alguém
testar as regras. Para as regras: conteúdo da caixa, preparação, quem começa, o que acontece em cada
turno, como se vence, como se pontua.

**SM3. "Pressione a sorte" e microjogos.**
*Press your luck:* repetir uma ação arriscada até decidir parar, com grande ganho e risco real
(blackjack). *Microjogo:* poucos componentes e partidas de minutos (Love Letter, 16 cartas).

**SM4. Jogos cooperativos.**
Todos vencem ou perdem juntos contra o sistema (Pandemic). Reflete bem situações de "equipe contra
um problema" e evita a eliminação. Acrescente tensão por tempo e eventos.

**SM5. Jogos *legacy* (de legado).**
O resultado de uma partida altera a seguinte (adesivos, escrever no tabuleiro, envelopes lacrados).
Cria novidade e investimento emocional ("o que está feito não pode ser desfeito"). Combina com uma
série de estudos (um por semana) em que o grupo carrega o histórico.

**SM6. Aplicativo companheiro.**
Muitos jogos de mesa usam um app só para tempo, pontos, preparação ou como "mestre" automático;
alguns exigem o app. É um bom caminho para o conteúdo bíblico dentro de um jogo físico.
- *Para o projeto:* um app web pode ser o "mestre" de uma dinâmica em grupo (08).

**SM7. Ferramentas de ideia: gerador aleatório e declaração de problema.**
Liste temas, mecânicas e componentes, sorteie um de cada e projete. Depois escreva uma **declaração
de problema** curta ("como faço um jogo de cartas que ensine X para Y?"); teste com amigos antes do
protótipo. Fazer *mashup* de dois jogos conhecidos também funciona.

## Aplicação a jogos teológicos (síntese minha, não é do livro)

- **Verbos que cabem no texto.** Em vez de "atirar/pular", extraia verbos da passagem: esperar, ouvir,
  seguir, partilhar, perdoar, resistir, ordenar, lembrar.
- **Segredos como ironia dramática:** a diferença entre o que o personagem sabe e o que o jogador já
  sabe do texto vira mecânica de informação (#29).
- **Tempo como mecânica:** espera, jejum, jornada e "quarenta dias" são mecânicas de tempo naturais;
  a tentação de acelerar (#27) pode ser tema, não só interface.
- **Acaso com cuidado teológico:** sorte aleatória decidindo um desfecho espiritual pode soar errada;
  use acaso para variação de cena, não para "resultado de fé".
- **Fatos fixos como regras fundamentais:** o que o texto afirma é regra imutável do mundo.
- **Emergência dentro de um texto fixo (síntese minha).** O desfecho bíblico é fixo, mas o jogador
  pode "descobrir" combinações de conhecimento (versículo + contexto + personagem) que o autor não
  escreveu. Projete peças de conhecimento que interagem (M19), não só cenas encadeadas.
- **Incerteza sem sorteio.** O que fica incerto numa passagem conhecida é a leitura, não o desfecho:
  o que o personagem sabe, o que escolhe, o que o jogador compreende (M21 a M23). Evite sorteio para
  decidir resultado espiritual.
