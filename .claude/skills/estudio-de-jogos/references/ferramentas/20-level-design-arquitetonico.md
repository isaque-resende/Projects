# Ferramenta 20: Level design arquitetônico (Totten)

> **Pipeline:** fase principal **F4** (`../pipeline/F4-experiencia-arte-e-nivel.md`).

Para tratar o **espaço do jogo como arquitetura**: como o cenário, a ordem dos lugares, a luz, o som e
os objetos *dizem* ao jogador o que fazer, o que sentir e o que a história significa, sem texto
explicativo. Fonte: Totten, *An Architectural Approach to Level Design*, 2ª ed. (CRC Press, 2019). Os
itens `AR#` (AR1 a AR60) são deste livro (numeração minha, agrupada por tema). Complementa `19` (Kremers: metas,
ensino e estrutura), `13` (Rogers: fases e documentos), `15` (narrativa na prática), `05` (experiência)
e `18` (entrega por mecânica e UI). O livro é de jogos 2D e 3D de ação e aventura; aproveitei os
princípios, não os exemplos. Para jogos teológicos, "espaço" também é o **espaço da leitura**: a tela,
a ordem das cenas, as camadas de um texto.

## Parte I. Fundamentos e método

**AR1. Forma segue função.** Comece pela meta de experiência e pela mecânica central (o verbo); a forma
do lugar nasce disso. Nível sem plano, "porque seria legal", costuma ser bagunça. O nível é o principal
canal de comunicação entre quem projeta e quem joga: **ajusta comportamento, transmite significado e
aumenta o espaço com informação**.

**AR2. Métricas.** Meça o personagem (tamanho, alcance de salto, velocidade) e projete o lugar em
unidades dessas medidas; repita poucas medidas, de forma consistente, para que o jogador reconheça o
padrão. Em jogo de leitura, o equivalente é o **tamanho da unidade de leitura** (tela, parágrafo,
versículo) e o tempo previsto por cena.

**AR3. Cena como unidade.** Uma cena é o que cabe numa tela: poucos elementos com relações claras. O
nível é uma sequência de cenas; **uma cena, uma ideia nova**, com cenas de prática entre elas. Se você
espaçar as cenas de ensino, pode ver que já tem um nível inteiro.

**AR4. Legibilidade.** Quem entra na cena deve conseguir ver o objetivo, os caminhos e o perigo antes de
agir. Projete a entrada (o "limiar") para isso. Público casual lê uma vez; público competitivo relê.

**AR5. Parti e protótipos baratos.** Esboço sem medida do arranjo (parti), depois protótipo não digital
ou graybox (formas simples), depois arte só quando o layout foi validado. Playtest sem interferir:
**se não entenderam, não está claro**; costuma faltar um ou dois indicadores a mais, não um tutorial.

**AR6. Ritmo por "balões".** Marque no mapa os pontos de jogabilidade (como no mapa de revista) e
observe o espaçamento: entre eles há espaço de circulação. Ritmo é alternância (alto e baixo, perigo e
segurança, desafio e recompensa) interiorizada pelo jogador como agenda.

**AR7. Ferramentas de planejamento.** *Schedule* (tabela de peças modulares: quantidade, modelo, local)
para listar assets e manter o estilo; **sala de brinquedos** (*toy box*): cena só do desenvolvedor para
testar mecanismos e suas interações; diagrama de proximidade (bolhas por função); diagrama de molécula
(AR16); fluxograma de decisões; grafo de chaves e fechaduras (Mark Brown) para ver quanto espaço
explorável há antes de cada trava; diário de jogo com esboços para estudar jogos (precedentes).

**AR8. Ordem de construção.** Construir **do meio**: faça primeiro o nível ideal que quer atingir, depois
volte e ensine até ele (jogos de ação, muita complexidade). Construir **em ordem**: jogos curtos, de
poucas mecânicas ou com cadeia linear de melhorias. **Modo antes de fase**: um modo central forte e
variação das condições (Cook) em vez de fases com mecanismos únicos.

## Parte II. O espaço em si

**AR9. Figura e fundo; forma e vazio.** Os espaços formados *entre* os elementos também têm forma; é
possível **implicar** um limite sem parede. Na 3D, adicionar e subtrair massas cria alcovas, passagens e
metas destacadas. A repetição de padrões conhecidos dá prazer.

**AR10. Chegada.** A experiência de um lugar vem do que veio antes: espaço grande depois de apertado,
luz depois de escuro, seguro depois de perigoso. Controle o que o jogador vê ao chegar. A "procissão"
(aproximação oblíqua e teatral) valoriza o destino.

**AR11. Gênio do lugar (*genius loci*).** Cada ponto de jogo importante tem um caráter emocional;
espaço sem caráter é **circulação**, e serve para descansar ou criar suspense.

**AR12. Arquétipos de mundo.** *Labirinto* (um só caminho, meditativo; serve a narrativa embutida ou
tese), *maze* (ramificado, becos, risco e recompensa; becos podem premiar a exploração), *rizoma* (tudo
conecta a tudo; viagem rápida; marca de mundo aberto). Cada um é um tipo de estrutura de jogo inteiro.

**AR13. Tamanhos de espaço.** *Estreito* (escassez de espaço, vulnerabilidade, claustrofobia,
emboscada), *íntimo* (cabe e alcança tudo; seguro, tutorial, campo nivelado), *prospecto* (aberto e
exposto, agorafobia; sala de chefe). O efeito vem do contraste entre eles.

**AR14. Molécula.** Diagrama de nós (espaços de jogo) e arestas (visão, passagem, mão única, caminho
direto). Descreve **relações**, não layout: vários mapas derivam do mesmo diagrama. Atalhos verticais
(pontos de Steiner) são segredos ou obstáculos. Nós = uso intenso da mecânica central; arestas =
circulação.

**AR15. Hub e sandbox.** *Hub*: espaço seguro com portais para as fases; progressão geral linear e
liberdade local; permite justificar mundos temáticos. *Sandbox*: limites definidos, muitas atividades;
o problema é **orientação**.

**AR16. Legibilidade da cidade (Lynch).** Marcos (landmarks, também medem progresso), caminhos, nós
(decisões), bordas (transição de caráter; rápida com portão, gradual com sinais) e distritos (cada um
com identidade e atividades próprias; sem isso, o mundo é vazio). "Weenie" arquitetônico: marco que
atrai ao objetivo, pode ser natural, e se destaca por cor ou tamanho.

**AR17. Câmera e ponto de vista.** 1ª pessoa: imersão, jogador controla o olhar (guie por linhas de
visão). 3ª pessoa: vê onde pisa; câmera pode "atrapalhar". 2D: mostra o que o personagem não sabe
(suspense à Hitchcock), sem "saltos de fé" (o outro lado do obstáculo cabe numa tela), tempo de reação
justo; vista de cima: orientação por pontos cardeais, parte do mapa fora da tela convida; axonométrica:
mostrar relações verticais e ocultar obstruções.

**AR18. Inimigos e personagens como arquitetura.** NPCs e inimigos ocupam e bloqueiam espaço (guardas
que narram a distopia sem texto; "fortaleza que encolhe"). Servem também para conduzir o jogador.

## Parte III. Comunicar com o ambiente

**AR19. Três modelos de ensino, juntos.** *Condicionamento operante* (tarefas pequenas reforçadas;
cuidado com a caixa de Skinner de espera e repetição), *Montessori* (ambiente preparado; isole os
obstáculos, depois combine; portão de habilidade se auto-reforça), *construtivismo* (experimentar,
refletir, formar estratégia, testar; checkpoints generosos; falhar leve).

**AR20. Símbolos de jogo.** Um objeto é visual mais comportamento; se for **único** e **repetido**, vira
símbolo de uma mecânica. Separe o que é símbolo do que é só cenário (maçaneta dourada, textura que
aceita portal). Pode ganhar nuances com o tempo. Introduza em segurança, repita, varie.

**AR21. Cor, contraste, enquadramento, terços.** Análogas = clima; complementares = contraste (rota
principal em laranja contra azul). Associações culturais variam; **acessibilidade para daltonismo**.
Enquadre chegadas; descentralize para o olhar circular.

**AR22. Tipos arquitetônicos.** A forma comunica a função (igreja = cura e salvar; centro, mercado).
Reuse tipos e mantenha modulares; poucos tipos repetidos tornam o mundo legível e fazem os marcos
únicos mais desejados.

**AR23. Certeza, incerteza e risco.** Padrões estabelecidos (sala segura perto do chefe; salvar sem
inimigo) dão ritmo e permitem **quebra dramática**. Incerteza arbitrária (bifurcação sem pistas) é
falha de arte; incerteza deliberada constrói confiança e rompe convenção. **Risco** = incerteza cuja
natureza o jogador pode inferir; é o que emociona.

**AR24. Publicidade (Bogost) como método.** *Demonstrativa*: mostre o perigo a distância segura.
*Ilustrativa*: o símbolo ganha imagem pelo contexto (lambda perto de itens). *Associativa*: afaste o
símbolo da recompensa e depois subverta a convenção.

## Parte IV. Emoção

**AR25. Complexidade e contradição.** Clareza demais é "chata"; espaços com várias funções e
mecanismos ambíguos (ajudam num contexto, atrapalham em outro) enriquecem. Uma sala só de campo aberto
com cobertura é pobre: some elevação, vantagem, esconderijo.

**AR26. Prospecto e refúgio.** Refúgio = espaço íntimo e escondido de onde se avalia o prospecto
(aberto); refúgio secundário = o próximo abrigo do outro lado. A sequência refúgio → prospecto → refúgio
secundário cria cobertura, furtividade e ritmo; a distância entre refúgios regula o passo.

**AR27. Vulnerabilidade como estrutura.** O território cresce com as melhorias do personagem (mundo
aberto aos poucos). Regeneração de vida torna fases lineares e de desafio pontual; recursos externos
tornam a exploração arriscada e o espaço menos linear.

**AR28. Luz, sombra, penumbra.** Luz puxa nas junções; sombra cria espaço próprio ("shadowspace");
**penumbra** atrai à exploração e gera **ambiguidade atmosférica** (sagrado ou maligno?); sombras
rítmicas e linhas convergentes conduzem o olhar; **espaço negativo** (o que o jogador não sabe) amplia o
medo; som completa. Poucas luzes bem postas bastam em dispositivos limitados.

**AR29. Altura.** Vantagem (vista, ponto de tiro) e perigo (sem mediação arquitetônica entre o jogador e
a queda). Linhas verticais convergentes aumentam a vertigem; ou puxam o olhar ao alto.

**AR30. Subversão.** Tornar o perigoso vantajoso (luz num mundo apagado; o herói como o predador).

## Parte V. Recompensas e metas

**AR31. Propósito.** Incentivar comportamento, atrair à exploração (recompensa visível com caminho
obscuro), criar curiosidade (pistas modulares; o inacessível visto antes). Tipos: glória, sustento,
acesso, facilidade.

**AR32. Espaços de recompensa.** *Cofre* (luz, música, arquitetura celebrativa), *vista* (pausa
catártica depois da ação), *espaço meditativo* (recuperação mental), *palco narrativo* (a história como
recompensa; sem inimigos antes).

**AR33. Negação espacial.** *Zen view* (relance fugaz; exposto o tempo todo, perde o poder), ângulos
obtusos (informação parcial gera curiosidade e risco), camadas de espaços sucessivos (cada sala mais
complexa, em estilo Montessori), paredes em camadas (ver o objetivo através de grades), *oku*
(camadas concêntricas). Convém saber que há recompensa ao fim.

**AR34. Metas em camadas.** Longo prazo (narrativa), curto prazo (fase, item) e metas definidas pelo
jogador. Padrão "partes de um artefato" (uma por nível). Agenda previsível de recompensas ajuda a
expectativa; **temporadas e "só mais uma" são Black Hat** (ver 16).

## Parte VI. O primeiro nível (tutorial)

**AR35. A primeira fase tem a maior carga.** Excitar, apresentar mundo e personagens, ensinar e dar um
gancho. Mostre em vez de contar; ensine em lições escalonadas sem interromper (livre → pouco inimigo →
prova); ilusão de tensão e recompensa para novatos e segredos para experientes.

**AR36. Blocos do tutorial.** *Cenas* (uma mecânica por cena), *limiares* (ler antes de entrar),
*aproximação controlada* (aprender como destino ou prática como recompensa), *espaço de encontro*
(se for preciso parar o jogador: uma apresentação em sala em que ele chega atrasado).

**AR37. Recompensas variadas no tutorial.** Glória (efeito e som; *game feel*), sustento, narrativa
(depois do aprendizado), acesso (portões de habilidade sem chave literal, por degraus e caixas).

**AR38. Plano de aulas.** Liste o que vai ensinar; **uma habilidade pelo caminho todo** (básica →
avançada → combinada → exame final); limite possibilidades (linearidade, sem armas, vulnerabilidade);
reordene mundos para suavizar a curva. Ensine mais do que acha necessário (jogador sem pré-requisito).

**AR39. Falhar e reiniciar rápido.** Salas pequenas, checkpoints antes de cada desafio, recomeço
imediato; o erro é aprendizado ("orgulhe-se da contagem de mortes").

**AR40. Conheça o jogador e teste.** O público-alvo define o que ensinar; trate suposições com
ceticismo (controles, clique, setas). Jogos educativos: peça lição por vez; a lição pode ser estrutura
da fase (problema = cena; lição = fase; "cluster" = jogo); **Kishōtenketsu**: introduzir em segurança →
desenvolver → torcer → testar.

**AR41. Mídia do tutorial.** Evite "flash cards" (pop-up sozinho); combine áudio e visual, respeitando a
carga cognitiva; deixe um personagem demonstrar; texto no ambiente com "voz"; áudio condicional (não
tocar o que já foi feito; tocar após inatividade); gancho no final.

## Parte VII. Narrativa e mundo pelo espaço

**AR42. Mecânica e motivo.** Pode-se começar da mecânica ou da narrativa; fica mais forte quando uma
sustenta a outra. Teste: **inverta a narrativa** (troque o tema); se nada muda, mecânica e história
estão separadas. Escreva a **narrativa de jogabilidade** do nível (verbos, espaço, emoção prevista).

**AR43. Quatro espaços narrativos.** *Evocativos* (vernáculo conhecido: cartaz muda de lado e muda o
significado), *de encenação* (palco de cena), *embutidos* (arquitetura que conta: vitrais para quem não
lia), *provedores de recurso* (objetos e hubs de que nascem histórias emergentes).

**AR44. Contar com arte modular.** O **arranjo** de objetos comuns conta uma micro-história sem texto;
o enquadramento (foco profundo no cinema) conta mais. Vista recompensadora no fundo.

**AR45. Materialidade e jornada.** Conforto (madeira, tijolo, natural) → agressivo → corrompido; grunge
para o que apodreceu. Cada mundo pode ser uma mini-jornada do herói. Subverter a materialidade avisa a
quebra de expectativa.

**AR46. Arco dramático por fase.** Exposição, ação crescente, clímax, queda e desfecho; **queda e
desfecho são o lugar da recompensa**. Narrativa opcional e *easter eggs* premiam o explorador.

**AR47. Espaço de possibilidade e jardim em miniatura.** Mundo com limites claros, visão geral e
abstração consistente (peças modulares ricamente interativas). Apresente por **visão geral** (tela única,
vista alta) e **passeio** (percurso linear que apresenta as mecânicas e provoca o que virá), dentro da
narrativa. Alfabetização procedural: o jogador aprende a "língua" do jogo; use-a até para subverter, mas
atenção: sistemas óbvios demais quebram a atmosfera.

**AR48. Forças visuais.** Verticais (marcos), horizontais e diagonais; tríades; "pedra mestra e
atendentes" (hierarquia). Estabeleça primeiro a escala normal.

**AR49. Escolha moldada (shaping).** Introduza escolhas limitadas e **expanda** (mundo em distritos
liberados por tarefas; Pryor: passos pequenos, critério crescente). *Metroidvania*: nós de incerteza
(opções equivalentes), símbolos que antecipam a ferramenta e motivam o retorno.

**AR50. Design degenerativo.** Depois de ensinar a regra, honre-a com exceções que não quebram a lógica
(canos, blocos escondidos). Esconder e revelar.

## Parte VIII. Social, procedural e som

**AR51. Social.** Perguntas de projeto (quantas coisas a ver? desafio imediato ou com prática? quantas
pessoas? cooperar ou obstáculo? agência na história? regras contra mau comportamento?); **geradores de
diversidade** (Jacobs): uso misto, proximidade, espaços para estilos diferentes, densidade; evitar a
separação de funções (isola); hubs de missão e *spawns* como introdução; customização e "lar".

**AR52. Padrões (linguagem de padrões).** Padrão = **problema + solução + exemplos** (Alexander); pense
cenas como padrões; padrões estáticos e fluidos; mistura manual + procedural (eventos escritos à mão
embaralhados).

**AR53. Ritmo, música e som.** Ritmo entre elementos e passo (entrainment; elementos grandes puxam,
pequenos fazem parar); "tartan" de ritmos em camadas (metas longas e curtas). Música empática x
anempática; trilha como ambiente; som 2D (atmosfera, estado do jogo) e 3D (guia e alerta); som como
feedback, recompensa e material. *Os estudos de humor e música são antigos e frágeis; use como pista.*

## Parte IX. História, modos de ver e ferramentas (cap. 1 e 2)

**AR54. Tríade de Vitrúvio.** Todo espaço de jogo precisa **funcionar** (firmeza), ser **usável** (navegar
e aprender) e dar **deleite** (emoção; o autor evita "diversão": o espaço pode assustar, comover, doer).
Nenhuma vale mais que as outras.

**AR55. Precedentes arquitetônicos úteis.** Sítios pré-históricos orientados à luz (linhas de visão
planejadas); zigurate e palácio assírio (forma como representação e poder; sequência desorientadora);
Egito (módulos como linguagem: pirâmide, coluna, hipostilo escuro e rítmico); Grécia (procissão axial,
vista oblíqua, ágora público e privado); China (camadas de portões que negam o centro; jardim como
paisagem simulada); Roma (fachada simples levando a **interior recompensador**; fóruns com marcos em
eixo); igreja medieval e Gótico (narrativa embutida em relevo e vitral; luz filtrada); Renascimento
(proporção humana = base das métricas); Barroco (ornamento como retórica e cidade com eixos entre marcos);
Arts and Crafts (materiais naturais e verdade do material). Em jogos: cada um é um padrão de
**chegada, sequência ou entrega de sentido**.

**AR56. Jogo e espaço sempre andaram juntos.** Tabuleiros embutem regra e significado (Senet = caminho
pelo mundo dos mortos; Go: o tabuleiro cresce com a habilidade); campos e arenas codificam regras; teatro
e anfiteatro mostram a modularidade de usos. Nos jogos digitais, a tecnologia moldou o espaço (tela
única, rolagem, salas, texto, 3D); limitações são lição de economia.

**AR57. Modos de ver (dez perguntas para analisar um nível).** Que jogabilidade o espaço sustenta?
O que há acima e abaixo? Como tamanho, luz e som fazem sentir? Qual o ritmo e o que é opcional? Um ou
vários estilos de jogo? Como expressa a narrativa? Quais os precedentes? Como são composição, proporção
e ritmo? A geometria cabe nas habilidades do avatar? Que elementos se repetem e correspondem a
mecânica? Faça com níveis ruins também: aprende-se muito.

**AR58. Desenho como ferramenta.** Plano (arranjo e fluxo), seção (altura e transições), elevação
(exterior), axonometria (3D sem distorção; tempo), perspectiva (arte conceitual). Hierarquia visual:
detalhe só onde importa; **diário de jogo** (anotar, capturar, depois esboçar); papel quadriculado com
**uma unidade = uma medida do personagem**; conceitual (hachura público/privado, setas de fluxo);
mapeamento à moda antiga; fluxograma de decisões; grafo de chaves e fechaduras.

**AR59. Do papel ao motor.** Use primitivas e arte provisória para testar cedo (cubos, círculos);
unidades em potências de 2 em muitos motores; um bloco-medida do tamanho do personagem; uma escala única
entre programa 3D e motor; **peças em tiles** (ou o nível inteiro modelado) conforme a memória;
camadas e anotações em arte conceitual.

**AR60. Ferramentas moldam o design (Storm).** A grade favorece ângulos retos; **snapping** ruim
cria buracos e vazamentos; texturização difícil esconde dados de playtest; iluminação lenta piora a
luz; visibilidade de volumes e gatilhos precisa ser simples; navegador de assets ruim empobrece a paleta;
câmera do editor deve se parecer com a do jogador. Fale com quem faz a ferramenta.

## Aplicação a jogos teológicos (síntese minha)

- **O espaço é o texto.** Defina o "palácio de memória" da passagem: poucos lugares (Jerusalém,
  Samaria, o poço), cada um com **caráter** (AR11) e símbolos próprios (AR20). A cidade de Lynch
  (AR16) vira o mapa do relato: marcos (o poço, o templo), caminhos (a estrada), bordas (Judeia e
  Samaria) e distritos.
- **Chegada e limiar (AR10, AR36).** Cada cena começa com uma chegada que prepara o que o texto diz: o
  jogador lê o lugar antes de entrar. Contraste entre cenas (o cansaço do meio-dia, o encontro).
- **Ensine por uma cena, uma ideia (AR3, AR19, AR38).** Em estudo bíblico, a "habilidade" é *ler*:
  observar, comparar, situar. Uma por cena; pratique em segurança antes da prova; exame final = uma
  pergunta interpretativa, não exame de memória.
- **Zen view e negação (AR33).** O versículo-chave pode aparecer **de relance** antes de ser
  compreendido (uma frase, uma imagem); evite expor o mesmo tempo todo.
- **Penumbra e ambiguidade (AR28).** Passagens difíceis (o sacrifício de Isaque, o Getsêmani) pedem
  ambiguidade e silêncio; **não use choque nem manipulação** como técnica de efeito; o texto conduz.
- **Prospecto e refúgio (AR26).** Alternar a exposição do texto (a multidão, o sermão) com o refúgio
  (oração, reflexão). **Deixe espaço vazio.**
- **Materialidade (AR45) e jornada.** Um relato de queda e restauração pode ter progressão de
  materialidade (jardim → deserto → templo) sem alterar o texto; rotule o que é interpretação.
- **Arquitetura embutida (AR43).** Igreja medieval é o precedente: contar a história em quem não lia.
  Em jogo, o **cenário** carrega referências cruzadas e contexto histórico sem despejar texto.
- **Arco dramático (AR46).** Cada passagem tem exposição, tensão, clímax, desfecho; coloque a
  recompensa (a compreensão, a oração) **na queda**, nunca como loteria.
- **Metas em camadas, sem Black Hat (AR34, AR39).** Metas em camadas sim; **temporadas, escassez e perda não**.
  Falhar leve e recomeçar rápido (checkpoint por cena) respeita o jogador.
- **Honestidade com o texto.** Em espaço narrativo, cada elemento que o texto não afirma é
  **inferência**; marque no jogo (ícone ou cor consistente) o que é texto, contexto e interpretação.
- **Estude precedentes (AR55, AR57).** Igrejas medievais e o Pantheon são lição direta: fachada
  simples, interior recompensador, narrativa embutida; mostre a história a quem não "lê" o texto.
- **Acessibilidade (AR21).** Cor nunca é a única pista; contraste e redundância (forma e som).
- **Menos é mais no começo (AR49).** Comece com um lugar e uma ideia e **expanda** conforme o jogador
  domina; o mapa inteiro de uma vez é ininteligível.
