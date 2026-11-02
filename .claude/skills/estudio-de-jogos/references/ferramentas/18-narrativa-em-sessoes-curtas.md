# Ferramenta 18: Narrativa em sessões curtas (celular e jogos sociais)

> **Pipeline:** fase principal **F2** (`../pipeline/F2-conteudo-e-historia.md`).

Para contar história quando o jogador tem minutos, uma tela pequena, pouca memória e atenção
interrompida; e para tudo o que a plataforma móvel ensina sobre **entregar** história pela mecânica,
pela interface e pelo texto. Fonte: Finley (org.), *Narrative Tactics for Mobile and Social Games:
Pocket-Sized Storytelling* (CRC Press, 2019), **lido na íntegra** (introdução e cap. 1 a 11; só o índice
remissivo ficou de fora). Os itens `MS#` são deste livro. Complementa `15-design-narrativo-na-pratica.md`
(procedimentos), `17-visual-novels.md` (formato) e `13-niveis-e-documentacao.md`.

Aviso de uso: o livro nasce da indústria de **freemium** (monetização por espera e compra). Aproveite a
engenharia narrativa, mas leia a seção "Free-to-play" com as ressalvas de 07 e 16.

## A. Entrega de história (story delivery)

**MS1. Escrever história não é o mesmo que entregá-la.** *Game writing* é o enredo, missões, diálogo e
cenas; *narrative design* é toda a entrega: mecânica, UI, som, arte, animação, ambiente, ritmo, tom. A
fórmula de Finley: *writing = história; narrative design = entrega da história*. Toda parte do jogo que
o jogador toca é "espaço de jogo" e pode contar.

**MS2. Escopo do narrative design (lista de verificação).** Mundo, estrutura (linear, ramificada, aberta,
episódica), personagens e criaturas, narrativa ambiental, locais, integração na mecânica, **tom
consistente** (texto, UI, arte, som), diálogo (ramificado? voz? caixas?), cenas (animadas, quadros
estáticos *animatic* ou nenhuma), UI, quests e sons. Decida o que o projeto precisa de cada um.

**MS3. Traga o responsável pela história no início.** O designer narrativo chamado no fim já não muda
menus, UI nem mecânica (exemplo: menus que mudariam por região de uma travessia egípcia, mas a UI já
estava pronta). Pergunte primeiro os limites técnicos (2D/3D, quantidade de sons, armazenamento).

**MS4. Toda a equipe conta história.** Programador, designer, artista, animador, som e UI são
contadores; o designer narrativo é facilitador e prova que cada especialidade contribui.

**MS5. Sugerir basta.** O jogador preenche o que não vê ("play, don't tell"). *Plague Inc.* quase não tem
história escrita, mas mapa vivo, cores com código (vermelho = infecção, azul = cura), bolhas, notícias
e contadores criam drama. Mostre o que precisa, **sugira** o resto.

**MS6. O toque é um instrumento narrativo.** Em *Mystery Match* o dedo animado da heroína ensina o
gesto e repete a conexão de vez em quando; vitória de puzzle = vitória dela. O jogador "é" a
personagem pelo que faz com as mãos.

## B. Narrativa quando o jogo "não tem história"

**MS7. A mecânica é a mensagem (Romero).** Em jogos pequenos, a mecânica carrega o sentido: duas
estrelas que só voam juntas (*Gemini*) dizem mais do que um texto.

**MS8. Mecânicas "amigáveis".** Aprendidas por intuição, observação e experimento; sem texto, sem
tutorial pesado, **sem punição por erro** (a música não se desfaz), sem indicadores abstratos. Quando
o jogador luta contra a mecânica, investe menos na história. Pode haver desafio sem hostilidade.

**MS9. Projete de cima para baixo.** Metas de design e visão artística; mundo e conflito; motivação do
personagem no início e no fim; **curva dramática** (intensidades); pontos de enredo; **batidas
emocionais** (cada uma com um roteiro de arte, música e jogabilidade que ressoam). Storyboard como
memória do time. Cuide para não concentrar a emoção em um só ponto.

**MS10. Música cedo.** Compor primeiro ou cedo e desenhar em torno; áudio é narrador, não decoração.

**MS11. Teste de história é diferente de teste de bugs.** Cedo, os jogadores só falam de falhas e
dificuldade: monte o jogo completo e rápido (arte e música cedo) e **peça que foquem na história**;
verifique se identificam as batidas emocionais; teste com quem não é o público; muitos jogadores.

**MS12. Emoção universal, interpretação pessoal.** História sem palavras convida a leituras diversas;
a obra não entrega enredo complicado, mas deixa espaço. O NPC "vivo" tem metas, evita dano, responde ao
ambiente, cresce e não irrita.

## C. Mundo, texto e modos de jogo

**MS13. Informe só o essencial do mundo.** Escolha as categorias de mundo que o projeto precisa (história,
cultura, locais, religião, sistemas, língua) e pesquise bem; não despeje.

**MS14. Narrativa ambiental.** Objetos, sons e estados dizem o que ocorreu (cidade queimada, quadros
amontoados em chamas). Poucos assets, mas **poucos também são sinal**: um som raro chama atenção; um item
sem imagem, só com texto, basta; uma colher que gira mostra o fantasma sem modelo.

**MS15. Texto é barato e potente.** Feedback ("você está ganhando?"), reação do mundo às ações, vinhetas
e humor (as notícias de *Plague Inc.* mudam com a partida). **Lore** (mitologia do mundo) e **flavor text**
(sabor, curto) podem entrar em menus, descrições, instruções e habilidades; adapte tom e estilo.

**MS16. Modos como lugares.** Cada modo de jogo recebe um local, um fundo reaproveitado e uma instrução
com sabor de mundo; a mecânica ganha explicação interna (soulstones explicam por que o jogador
enfrenta versões "possuídas" dos próprios heróis).

**MS17. Social como mundo.** Outros jogadores podem ser habitantes (visitantes que dão isca ou armas);
justifique na ficção por que se trocam recursos ou se visitam casas.

## D. Personagens

**MS18. Guia (personagem tutorial).** O onboarding decide retenção; a fala é **concisa**, em conjunto
com setas e brilhos, e adequada ao gênero. Depois do tutorial o guia precisa de **motivo no universo**
para ajudar (é do time; é a consciência do herói) e **vida própria**. Evite que o guia pareça um menu
falante e sem relação com o jogador.

**MS19. Todo NPC tem relação com o PC; inimigo tem motivo.** Vingança, honra ou recompensa dão peso
moral ao combate; NPCs caracterizam o PC pelo modo como o veem (com viés e alguma verdade). Em escolhas de
fala, o PC **permanece em personagem**; trocas de duas a quatro linhas.

**MS20. Caracterização sem história.** Nomes de habilidades, flavor text, relações (amizades,
rivalidades), animações (andar, ataque, morte), poses de retrato, skins; uma **mini-quest em três
estágios** (conflito, desenvolvimento, insight) desbloqueia habilidade e mostra crescimento. A ficha de
personagem inclui postura e demeanor para artistas.

## E. Diálogo funcional e texto na tela

**MS21. Toda fala tem função.** De narrative design (tutorial, objetivo, nova mecânica, nova
habilidade) e de game writing (lore, desenvolvimento, caracterização, antecipação). **Funda a
instrução na voz** (o "Phone Guy" gaguejante de *Five Nights at Freddy's* ensina bateria e luz). Teste:
"qualquer personagem poderia dizer isto?"; se sim, reescreva.

**MS22. Escreva para a tela do celular.** Mensagens curtas (treino: 140 caracteres), uma ou duas linhas
por vez, limite de **caracteres** (não palavras), sem rolagem, histórico visível. Conversas em 2D:
retratos com caixas (até quatro, quem fala acende) ou um retrato com caixa embaixo (como VN).

**MS23. Voz e texto pedem escritas diferentes.** Com atores, evite aliteração, assonância, dialeto
escrito e neologismos em excesso; com texto puro, essas figuras ajudam (com parcimônia), porque o texto
precisa carregar sotaque e tom.

**MS24. Texto é visual.** Cor, caixa (balão irregular = grito, "gelo" = hostilidade, áspero = monstro,
elétrico = robô, ondulado = bêbado), maiúsculas, itálico, onomatopeia, **tique verbal visual** (símbolos
no lugar de letras) com muita parcimônia; ajuda também quem tem deficiência auditiva.

**MS25. Conversa de um lado só.** Com PC fixo e invisível, o NPC reage a falas não escritas sem
repeti-las ("Lassie") nem ficar vago; com PC customizável, **nunca "coloque palavras" na boca do
jogador**. O diálogo também situa tempo e espaço ("Psst... aqui!").

## F. Quests, laço central e economia

**MS26. Perguntas de projeto de quest.** Onde acontece (nível, sistema, laço), o que pede, **como
completa** (obter, acompanhar, entregar) e que obstáculos (conflito é combustível: inclusive recurso,
relógio e outros jogadores). Quest = objetivo que move o jogador pelo espaço por interações e dá
progresso.

**MS27. Laço central (core loop).** A cadeia de ações mais repetida e gratificante; quests devem fazer
o jogador **usar o laço**; a narrativa deve reforçar cada passo dele com um porquê (*Pearl's Peril*:
reconstruir a propriedade, procurar objetos e descobrir a morte do pai).

**MS28. Recompensa vale o esforço; história é recompensa.** Mistério resolvido, cliffhanger e
personagem querido são recompensas baratas e fortes; reserve revelações ao fim da sessão ou da
quest difícil; **a escala da história deve casar com o esforço** (salvar uma vida, não entregar café).

**MS29. Economia é mais que dinheiro.** Energia, timers, recursos e estatísticas controlam ritmo; não
dobre o esforço sem querer; a narrativa não deve contradizer o que o jogo considera valioso.

**MS30. Sessão cabe no tempo.** Objetivos numerados que cabem numa sessão; quests em tarefas de poucos
minutos; **ajuda de amigos sem custo** respeita o tempo; lembretes de objetivo (a última sessão pode ter
sido há dias); *need-to-know*: o mínimo para completar nesta sessão.

**MS31. Casos úteis.** FarmVille 2 (introdução curta, primeiras ações = laço, Livro de Quests,
parabéns e gancho); Simpsons Tapped Out (premissa literal, personagens liberados por valor percebido,
ações cronometradas variadas, ignorar a quest é possível, "!" sobre a cabeça); Pearl's Peril (cena nova
como recompensa; história no fim do capítulo; timer só para recorde pessoal).

## G. Público, representação e ética de personagem

**MS32. Demografia dá parâmetros, mas é cilada.** Trate como pessoas, não como "o que o grupo gosta";
pesquise; não use estereótipo; não roube histórias nem lucre com trabalho emocional alheio; evite
personagens-ficha; minorias podem ter falhas **sem** o estereótipo do próprio grupo; inverter o trope
nem sempre ajuda; pense em interseções e públicos adjacentes; busque quem pertence ao grupo como
leitor ou consultor.

**MS33. Introdução rápida.** Em ~40 segundos diga **o que faz, por que, onde, quem é o jogador (vago o
bastante), quem guia**; revelar camadas depois.

**MS34. Quando a chefia não liga.** Autocuidado; conversar com o artista; escalar com argumento
quantitativo; insistir; mitigar com texto (biografia do personagem).

## H. Jogos educativos (muito relevante)

**MS35. Por que jogos ensinam.** Aprendizagem 1:1 e adaptativa; **falhar para a frente** (segurança de
errar); linguagem de mídia moderna; dinâmicos (mudança no tempo); interativos (perspectiva);
**pacientes** (repetição sem cansar o tutor). Comprador costuma não ser o jogador (pais).

**MS36. Aprender é contar história.** A **surpresa inevitável** da narrativa equivale à **emergência**
nos sistemas: o jogador entende e aceita o resultado inesperado ("claro!"). O protagonista personifica
uma crença que colide com o mundo; o aprendiz aprende com ele.

**MS37. Público laser.** Jogo educativo isola uma aprendizagem; ao assimilá-la, perde graça.
**Dissonância** entre conteúdo e capacidade física (arrastar para quem não tem coordenação). **Nível
de leitura** (Lexile): meça o texto durante o projeto; frases curtas de UI baixam o nível aparente.

**MS38. Integração pedagógica.** Sessões de ~15 minutos em sala, dispositivos compartilhados, guia
de instruções para professores, padrões atendidos, **guia de discussão** como o de romances, materiais
que expandem o mundo (desenhar personagens, diário). Designers de aprendizagem e avaliação
participam: **duplo veto** (jogo que não diverte falha; jogo que ensina errado falha).

**MS39. Leitura atenta pela mecânica.** Quando o sucesso depende do texto (evidências em *Argubot*,
*Phoenix Wright*), o jogador **lê com cuidado**; metáforas situadas (fração = pizza) dão contexto
compartilhado; argumentação com evidências dos dois lados (sem resposta certa) gera debate depois.

**MS40. Dicas finais.** Pergunte ao especialista "se só pudesse ensinar uma coisa, qual?"; comece
por um equívoco e transforme-o por surpresa em insight; o **"chefe"** é a transição da ignorância
para a compreensão; sempre pergunte "por quê?"; converse com professores toda semana; não
subestime crianças.

## I. Marca, valores e licença

**MS41. Marca ≠ marketing ≠ colocação de produto.** Marca é valores e quem se é (e não é); o jogo
**encarna** os valores na mecânica, arte e som; o jogador "age" a missão da marca (Chipotle Scarecrow).
Tom consistente com o público (Old Spice, absurdo e autoironia); nunca condescendente.

**MS42. Processo com cliente.** Participe da consulta inicial; pergunte "por que agora? por que um
jogo?"; leia a documentação (persona, brief, demografia e **psicografia**: valores, atitudes); pesquise
o que o público consome; entregue poucas opções; seja flexível.

**MS43. Licença como cânone.** Perguntas ao licenciador: **elementos centrais** (o que faz isso ser
isso), o que funcionou, **vacas sagradas**, é canônico? (menos latitude), classificação etária
adequada à plataforma, quanto expandir (personagens, eventos, depois do último ponto), aprovações.
Conheça a obra por dentro (fontes, crítica, fóruns de fãs). Saída para o cânone: "a história até aqui
ocorreu; o jogo é um universo alternativo" (Walking Dead). Estabeleça a obra nos primeiros segundos;
imerja também em texto de UX; **casuais antes de superfãs**.

## J. Free-to-play (use com cautela)

**MS44. Portões e chaves.** *Gate* = obstáculo (timer, puzzle, recurso); *key* = compra que o supera.
Hard gate (só com chave) e soft gate (tempo ou habilidade superam, a chave facilita: motor de venda).
Anúncio opcional = chave; obrigatório = portão.

**MS45. História como contexto ou como recompensa.** Contexto: tudo serve à história, exige adesão da
equipe desde o início; risco: a mecânica cai e vira "compre o próximo capítulo". Recompensa: história
separável; prévia livre; **recapitulações** e arquivo; fluxo de detalhes de baixa importância para
manter a vontade; **nunca assuma retenção de enredo**.

**MS46. Dados visíveis legitimam o acaso.** Mostrar o dado rolando faz a derrota ser "azar", não
"projeto caprichoso"; a dificuldade pode ser parte da experiência, não portão a vender.

**MS47. Dicas e perguntas.** Trabalhe com o modelo, não contra; brevidade não é simplicidade;
novidade (trocar local ou personagem periodicamente); "o que a história faz aqui? serve a este
momento? o jogador se empolga? dá para enxugar? é necessário?"; evite *infodump*.

## Aplicação a jogos teológicos (síntese minha)

- **Planeje para sessões curtas e de volta fácil.** Estudo bíblico real é feito em fragmentos (MS30).
  Cada sessão deve fechar uma unidade de sentido (um versículo, uma cena) com **resumo de "onde
  estávamos"** na abertura e **arquivo** do que já foi visto (MS45). Nunca assuma que o jogador lembra
  da semana passada.
- **O texto bíblico como "licença" (MS43).** Defina **elementos centrais** da passagem (o que não pode
  mudar), as **vacas sagradas** (palavras de Jesus, atributos de Deus, fatos teológicos nucleares) e o
  que é **expansão legítima** (silêncios do texto, perspectiva de personagem secundário). Registre o
  que é texto e o que é inferência. Adote a regra "o relato até aqui ocorreu; o jogo ilumina por
  dentro" (Walking Dead) sem reescrever.
- **Mecânica como mensagem (MS7).** Em vez de "mostrar" a graça num texto, projete uma regra em que a
  graça muda o que é possível (ver 12, K11). Dois personagens que só andam juntos (Gemini) é o tipo de
  metáfora que serve ao conceito de aliança ou de comunhão.
- **Mecânicas amigáveis (MS8).** Sem punição por errar interpretação; "falhar para a frente" (MS35) é
  desejável: o erro mostra o que o texto realmente diz.
- **Jogo educativo como família mais próxima (H).** Siga o duplo veto: o jogo precisa **divertir** e
  **não ensinar errado** (teologia incorreta é o equivalente a "concepção equivocada"). Comece por um
  **equívoco comum** sobre a passagem e transforme-o em compreensão pela surpresa inevitável (MS36,
  MS40). Pergunte ao pastor ou teólogo: "se só pudesse ensinar uma coisa desta passagem?"
- **Leitura atenta pela mecânica (MS39).** Faça o progresso depender de ler o texto (evidências em
  versículos, identificar quem fala); isso treina leitura sem testes de memória.
- **Guia de discussão (MS38).** Entregue com cada capítulo uma folha para o grupo (perguntas
  abertas, textos paralelos), pois o estudo é comunitário (ver 11).
- **Personagens (D).** O personagem bíblico precisa de motivo e vida própria sem inventar traços
  que o texto não autoriza; os "NPCs" (adversários, coadjuvantes) não devem ser caricaturas (MS19).
  Evite estereótipos étnicos, de gênero e de culturas (G), em especial no Oriente Médio antigo.
- **Texto na tela (E).** Citações curtas, uma ou duas linhas por vez, opção de **fonte maior**, histórico
  e referência (livro, capítulo, versículo) sempre à mão; formatação para diferenciar texto bíblico de
  comentário (MS24).
- **Recompensa narrativa honesta (MS28).** Revelações valem como recompensa, mas **não use cliffhanger
  como isca** para prender o jogador; use ritmo natural do relato.
- **Free-to-play: não.** Portões, chaves, energia e pagamento por espera (MS44) contradizem formação
  espiritual e a cautela de 07 (E16–E20) e 16 (OC11, OC13). Se houver apoio financeiro, que seja
  transparente e sem bloquear o estudo.
- **Marca = missão (MS41).** O jogo é do ministério ou da igreja: os valores devem estar na mecânica
  (cooperar, esperar, ouvir), não em logotipo; avaliar o tom: consistente com a comunidade.
- **Onboarding em 40 segundos (MS33).** Diga o que o jogador fará, por quê, onde (época, lugar), quem
  ele é e quem o guia; sem despejar teologia.
