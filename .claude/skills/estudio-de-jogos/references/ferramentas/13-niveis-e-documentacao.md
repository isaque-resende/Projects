# Ferramenta 13: Níveis, ritmo de conteúdo e documentação

> **Pipeline:** fase principal **F4** (`../pipeline/F4-experiencia-arte-e-nivel.md`); também usada em F2.

Para dividir um jogo em fases/capítulos, planejar o que entra em cada uma, desenhar o espaço e
documentar o projeto de forma que outras pessoas (ou você, daqui a dois meses) entendam.
Fonte principal: Rogers, *Level Up! The Guide to Great Video Game Design* (2010), cap. 4 (documentos)
e cap. 9 (níveis), lidos na íntegra, mais o cap. 17 (produção) e os resumos dos demais. Livro prático,
da indústria de jogos de ação; os exemplos são de ação/plataforma, mas os métodos servem a qualquer
jogo organizado em fases. Para "o que fazer primeiro" e iteração, veja 10; para teste, veja 06.

## Documentação

**LU1. Quatro documentos, uma escada.**
One-sheet (1 página) → ten-pager (~10 páginas) → beat chart (mapa do jogo todo) → documento de design
completo (GDD). Cada um é mais detalhado que o anterior e todos terminam no mesmo documento. Não há
formato oficial: o que importa é **comunicar** (a si, à equipe, a quem apoia o projeto).
- **Faça:** comece sempre pela página única; só escreva o próximo quando o anterior convencer.

**LU2. A página única (one-sheet).**
Título, plataformas, faixa etária, classificação indicativa, resumo da história **focado em
jogabilidade**, modos de jogo, pontos de venda únicos (cerca de cinco; "gráficos incríveis" e
"história incrível" não contam, todo jogo diz isso) e jogos comparáveis (escolha os conhecidos e
bem-sucedidos).
- **Faça:** se você não consegue preencher "o que o jogador faz" em uma página, o núcleo (09, 10) ainda
  não existe.

**LU3. O ten-pager e seus dez blocos.**
Título; resumo da história e fluxo do jogo (desafios, progressão, recompensa, condição de vitória);
personagem (história, personalidade que reflete em tudo, habilidades, controles); jogabilidade (a
sequência, grandes momentos, minijogos, diagramas); mundo (ambientes, clima, música, mapa);
**experiência** (o "todo": o que o jogador vê primeiro, que emoções, como som e menus reforçam); mecânicas
(três bastam nesta fase), inimigos/chefes; cenas; bônus e rejogabilidade.
- **Adapte ao leitor:** equipe quer diagramas e termos exatos; quem decide verba quer imagens e
  comparações com sucessos. Um só documento pode servir aos dois, sabendo que ambos lerão.
- **Regra de três:** ao dar exemplos, três é a medida (o 1º situa, o 2º contrasta, o 3º evita parecer
  binário; mais cansa).

**LU4. GDD: escreva para o leitor, sabendo que ninguém quer ler.**
O GDD descreve **jogabilidade**; a "bíblia" (regras do mundo, personagens, relações) é outro documento,
útil para parceiros externos, e vem depois. Escreva também para o seu eu futuro: o que só existe na
cabeça se perde. Use esboços, diagramas com legenda, animações simples, o beat chart, wiki (cuidado com
desatualizar).
- **Tudo é líquido:** o design muda; documento serve de ponto de partida, e em certo momento escrever
  mais atrapalha e é hora de terminar o jogo.
- **Termos específicos:** "robô" evoca imagens diferentes em cada pessoa; "mortos-vivos de relojoaria"
  evoca uma só. Invente nome se não existir.
- **Comunicação é a parte mais importante do trabalho do designer.**

**LU5. Beat chart: o mapa que mostra os buracos.**
Uma coluna por fase, linhas para: nome, objetivo, história, foco de jogabilidade, tempo estimado,
inimigos, mecânicas, perigos, itens, habilidades novas, economia, bônus, hora do dia/cores, música.
Comparar colunas revela:
- **aglomeração** (muita novidade de uma vez), **mesmice** (mesma combinação repetida), sequências do
  mesmo tipo de luz/cor/música/sistema, economia desequilibrada (dinheiro de menos ou de sobra),
  mecânica introduzida sem o recurso para vencê-la, recompensas repetitivas;
- **ritmo de novidade:** duas ou três novidades por fase; o jogador deve ter *tudo* uns 75% do caminho
  para usar o conjunto no último quarto.
- **Faça:** faça o beat chart ANTES de produzir qualquer material; algumas horas de gráfico poupam
  semanas de retrabalho.

## Níveis (fases, capítulos, cenas)

**LU6. Projete de cima para baixo.**
Mundo → nível → experiência → momento a momento (analogia: parque → "terra" → atração → cena). Primeiro o
que existe no mundo e como as fases se ligam; só depois o detalhe.

**LU7. Todo nível tem um objetivo de história/propósito.**
Quatro tipos (do parque temático): **escapar/sobreviver** (ação, movimento), **explorar** (descobrir
no próprio ritmo, liberdade de conversa e movimento), **educar** (observação e imitação) e **moral**
(escolha e consequência que afeta a jogabilidade, não só o final). Mais: o que o jogador aprende a fazer
neste nível?

**LU8. Mapa do mundo, antecipação e prenúncio.**
Mostrar o mapa (mesmo bloqueado) dá meta e curiosidade. Prenúncio por cartazes, silhuetas, portas
trancadas, personagens "bloqueados" que se abrirão. A antecipação vale tanto quanto a entrega; o susto
é maior quando se espera sem saber de onde virá.

**LU9. Corredor ou ilha.**
- *Corredor:* experiência dirigida; câmera, eventos e coreografia controlados; gargalos impedem
  voltar; bom para contar história.
- *Ilha:* espaço aberto, ordem escolhida pelo jogador, exploração; mais difícil de controlar e de
  encenar. Divida em áreas visualmente distintas e dê sempre a próxima sugestão (liberdade total
  intimida).
- Misture: ilhas com trechos de corredor, corredores com salas amplas.

**LU10. Pontos de referência e "dedos".**
Elementos grandes (uma estátua, uma torre) puxam o olhar, orientam e reorientam. "Dedos" são becos
opcionais fora do caminho principal: dão sensação de explorar. **Todo dedo termina em uma recompensa**,
mesmo pequena.

**LU11. Andar nunca é jogabilidade.**
Se a descrição do nível diz "então o jogador anda até aqui", corte ou ponha uma ação (escolha,
descoberta, obstáculo). Nunca perca o jogador de propósito; guie com luz, forma e contraste (teste de
apertar os olhos: o que fica mais brilhante deve ser o caminho). Se parece longo ou entediante, é.

**LU12. Linguagem visual e regra de ouro.**
Se parece que o jogador pode ir lá, ele deve poder. Defina e mantenha sinais de "não passa" (muros
baixos, arbustos) e evite barreiras invisíveis, que quebram a ilusão.

**LU13. Rascunho cinza (*graybox*) e "playground".**
Teste escala, câmera e ritmo em formas simples antes de arte; é a hora de mudar tudo. Tenha um espaço
de teste separado para mecânicas (distância, tempo, letalidade) antes de usá-las em fases reais. Para
medir duração, ande a fase uma vez: o tempo final será cerca de o dobro.

**LU14. Variar emoção, ritmo e ambiente.**
Mude a emoção a cada 15 a 20 minutos; alterne momentos grandes e pequenos (nem só clímax, nem só
calma); alterne interior/exterior, espaços largos (seguros) e apertados (tensos), hora do dia, clima
(que afeta *todos* os elementos) e altura. O realismo é meio, não fim: omita o que não serve à
história (ninguém vê os banheiros da Estrela da Morte).

**LU15. Reuso inteligente.**
Um sistema de jogo usado menos de três vezes não vale o custo. Poucos sistemas bem reaproveitados
(vestidos de novo com arte e contexto) valem mais que muitos sistemas rasos. Não repita o mesmo sistema
em fases consecutivas. Técnica "pizza mexicana": combine dois temas improváveis para renovar um clichê.

**LU16. Narrativa ilusória.**
O jogador completa a história entre duas imagens (como entre quadros de HQ): mostre antes e depois e
deixe a inferência. Barato de produzir; use portões (portas, câmera, pontos de salvamento) para que a
ordem seja respeitada.

**LU17. O treino é o jogo todo.**
Evite uma fase de treino separada e feita no fim com pressa; ensine ao longo do caminho, ou faça o
treino primeiro, com olhos novos. O jogador sempre deve estar aprendendo algo.

## Produção

**LU18. Camada horizontal ou fatia vertical: escolha uma.**
Fatia vertical = um trecho completo e polido (~80% da qualidade final) que serve de modelo e demo.
Camada horizontal = o jogo inteiro em graybox, depois polir tudo. A segunda dá mais ciclos de
descoberta; a primeira convence quem financia. Escolha conscientemente.

**LU19. Demo vale mais que documento.**
Para convencer: demo > GDD > apresentação > resumo. Em apresentações, não despeje a mitologia do mundo
("ninguém liga ainda"); fale de como se joga. Conheça o projeto a fundo; ensaie; leve backup.

**LU20. Planejar para pessoas, não para máquinas.**
Doença, férias, falhas técnicas e mudanças de ideia acontecem. Evite prometer demais, trave design e
conteúdo cedo, corte em pré-produção (cortar depois custa mais), descarte sem apego, mas tenha plano B.
Cuidado com cortar o que se liga a muitos sistemas.

**LU21. Emergência não é desculpa para sub-projetar.**
Prever como os elementos se combinam é parte do trabalho. Confiar em que "o jogador acha a diversão"
sem ter projetado as combinações é falta de design. (Veja a divergência com S&Z e Sylvester em
`livros.md`.)

## Acréscimos de Fullerton (*Game Design Workshop*, cap. 14)

**GW53. Documentar é comunicar decisões efêmeras.**
O que se rabisca no quadro some em dias. Escolha o veículo certo para cada informação: **visual**
(blueprint do jogo) quando a informação é espacial ou temporal, **fluxograma** para caminhos e
processos, **wireframes** para telas, **tabelas** para dados (que também servem de ferramenta de
protótipo), **arte conceitual** e **storyboards/animatics** para sensação e sequência, e **texto**
objetivo, em listas, para o específico.

**GW54. "Projetos de uma página".**
Um diagrama que vai ao ponto (mapa, fluxo de interface, evolução de personagem, arco emocional) é
mais lido que o documento longo; programadores penduram fluxos acima da mesa. Peça à equipe para
marcar mudanças sobre ele; boa reunião é marcar um diagrama.

**GW55. Conteúdo do documento e *logline*.**
Visão e sinopse (com pilares e metas de experiência), público/plataforma/mercado, legal,
jogabilidade (visão geral ligada ao protótipo, controles, interfaces, regras), personagens, história,
mundo, lista de mídia, histórico de versões. Escreva o documento **depois** de prototipar e testar;
mantenha-o modular (wiki ou documento compartilhado) e vivo.
- *Logline:* "(Projeto) é um (gênero) em que você joga como (protagonista) que deve (problema) enquanto
  lida com (desafio). Ambientado em (tom/mundo), trata de (tema). Ao longo do jogo, os jogadores sentirão
  (meta de experiência)."

**GW56. IA no processo criativo (aviso da fonte).**
Boa para brainstorm, lista de próximos passos e arte-temporária; fraca em narrativa longa e coerente
(repete clichês); riscos de direitos autorais para obras geradas. Para teologia, nada gerado entra
como conteúdo sem revisão humana contra o texto.

## Ver também (Kremers, *Level Design*)

Metas por capítulo, ensinar e testar, estrutura (linear, semilinear, não linear), diagrama de eventos,
ritmo, imersão, desafio e puzzles: `19-level-design-teoria-e-pratica.md` (LD1 a LD25).

## Acréscimo (Totten): o espaço como arquitetura

Para planejar **o lugar em si** (chegada, limiar, cena, molécula, prospecto/refúgio, luz, tutorial) e
não só a grade de fases, ver `20-level-design-arquitetonico.md` (AR3, AR6, AR14, AR26, AR35).
O diagrama de molécula (relações entre espaços) complementa o beat chart; o *schedule* de peças (AR7)
lista assets por cena.

## Aplicação a jogos teológicos (síntese minha, não é do livro)

- **Beat chart do estudo.** Use as colunas como grade de um estudo bíblico: passagem/versículos,
  verdade central, emoção desejada, verbo do jogador, decisão central, recurso novo, tempo, tom
  (luz/cor/música). Ajuda a ver, por exemplo, três capítulos seguidos de "ouvir" e nenhum de "agir".
- **Fases = perícopes.** Um nível por unidade de texto; o mapa do mundo é o livro bíblico, com as
  passagens futuras trancadas (antecipação, prenúncio).
- **Objetivo "moral" com cuidado.** LU7 sugere escolha e consequência real na jogabilidade. Para
  texto sagrado, a consequência deve vir do que o texto afirma, não de um sistema de "pontos de
  virtude" (veja 07, E16 a E20).
- **O texto como "licença".** Tratar a passagem como propriedade de terceiros: descobrir cedo os
  "não" (o que a tradição ou o grupo não aceitaria) antes de produzir material.
- **One-sheet para a igreja/grupo:** público e idade, duração da sessão, plataforma, o que o jogador
  aprende e *o que não é* o jogo (estudo guiado? devocional? entretenimento?). Alinha expectativa (10, PL14).
- **Dedos como aprofundamento.** Contexto histórico, referências cruzadas e curiosidades ficam em
  becos opcionais com recompensa de compreensão, sem travar o caminho principal.
- **Sessões curtas.** Para uso em grupo ou celular, fases de 10 a 20 minutos com um fechamento claro
  (um momento de reflexão ou versículo-chave) se adaptam a culto, célula e aula.

## Acréscimo (Freeman, *Introducing HTML5 Game Development*): documento de design enxuto

Fonte: Jesse Freeman, *Introducing HTML5 Game Development* (O'Reilly, 2012), cap. 3, que dá dicas
para o documento de design (GDD) e mostra um exemplo (um RPG casual de masmorras). Itens `HF#`.

**HF1. Comece por um conceito de uma frase** ("e se..."), citando jogos que inspiram.
**HF2. Ilustre**: esboços e arte conceitual; leitores se entediam com 15 páginas de texto sem
imagem, e a imaginação de cada um preenche a lacuna de forma diferente.
**HF3. Descreva mecânicas e como interagem**, com detalhe (combate, evolução, recompensas) e os
**atributos dos objetos** (vida, valores) para servir de referência na construção.
**HF4. Comece grande e corte**: o que sai da versão 1 pode servir na seguinte.
**HF5. Compartilhe** com um grupo de confiança (documento colaborativo).
**HF6. Estrutura do exemplo** (adaptável): visão geral, **jogabilidade** (explorar o mapa,
combate, completar o mapa, morte), **personagem principal**, **monstros**, **chefes**, **equipamento**,
**inventário**, **evolução** e **como vencer**; tabelas de propriedades por item.

**Modelo para jogos teológicos (inferência minha):** troque as seções do exemplo por **passagem e
fonte**, **o que o jogador faz (verbos)**, **personagens (com rótulo texto/contexto/inferência)**,
**objetos e símbolos**, **inventário de descobertas**, **progresso e fim**, **o que fica de
fora (e por quê)** e **riscos pastorais** (`07`, `21`). Anexe o **mapa de cenas** (`09`).
O exemplo do livro tem **morte, perda de dinheiro e contagem de mortes** como mecânica: **não**
adote em formação (`07`, `16`).
