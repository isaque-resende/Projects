# Ferramenta 24: UX, UI e interface

> **Pipeline:** fase principal **F4** (`../pipeline/F4-experiencia-arte-e-nivel.md`); também usada em F6.

Para **projetar o que o jogador vê e toca**: telas, menus, HUD, texto, cor, tipografia, ícones,
animação, acessibilidade e a primeira experiência. Fonte: Simon Brewer, *The Pocket Mentor for Video
Game UX UI* (CRC Press, 2025); os itens `UX#` são deste livro (numeração minha, por tema). É um livro
**de carreira** com uma parte técnica boa (cap. 4 a 7); usei só essa. Exemplos de jogos AAA e de
console; aproveitei os princípios para **web, tablet e celular**. Complementa `05` (experiência), `07`
(ética), `08` (implementação web), `12` (aprendizagem), `13`/`19` (níveis e ensino), `15` (UX writing) e
`20` (cenário e luz).

## Parte I. UX: o jogador antes de você

**UX1. UI é o que se vê; UX é por que existe e como se sente.** Em jogo, UX **tira atrito** (tarefa) e
também **põe atrito** (desafio) conforme a intenção. Sete qualidades de um produto: **útil, usável,
descobrível, crível, desejável, acessível, valioso**. "Não é sobre você": preferência pessoal vale em
estilo, tom e história, **não** em usabilidade; use empatia e teste.

**UX2. Princípios de psicologia que servem de checklist.** Lei de **Hick** (menos opções por vez; etapas,
favoritos, busca); **Fitts** (alvo grande e perto); **carga cognitiva** e **Miller** (cerca de 7);
**divulgação progressiva** (revelar aos poucos); **holofote de atenção** (não dirigir a dois focos);
**priming**; **ancoragem** (a primeira impressão pesa); **Von Restorff** (o diferente é lembrado);
**reconhecer > lembrar**; **Jakob** (siga convenções do gênero, referencie bancos como GameUIDatabase);
**Postel** (seja liberal no que aceita do jogador); **Doherty** (resposta em 400 ms, ou dê feedback);
**gradiente de meta** e **pico-fim** (a lembrança vive no auge e no fim); **posição serial**; **efeito
estética-usabilidade**; **reatância** (restrição forçada gera emoção negativa: explique-a); **Tesler**
(a complexidade não some, só se redistribui); **Occam**; **fadiga de decisão**; **viés de negatividade**;
**efeito IKEA e dotação** (valoriza o que ajudou a criar); **delighters**; **heurística do afeto**
(estado emocional distorce teste e pesquisa); **viés de confirmação e de sobrevivência**.
**Cuidado:** o livro também lista **escassez, recompensa variável, aversão à perda, custo afundado,
isca, enquadramento, nudging e padrão** como *técnicas*. Em jogo de formação use-as para **diagnosticar**,
**não para manipular** (07, 16: Black Hat).

**UX3. Gestalt.** Proximidade, similaridade, região comum, continuidade, fechamento, figura-fundo,
conectividade uniforme, destino comum, prägnanz. Use para **agrupar sem caixas** (o que está perto e é
parecido é lido como um grupo) e para sugerir que há mais (a última opção cortada pela metade).

**UX4. Princípios de UX de jogo.** Centrado no usuário (mas visão artística e inovação também contam;
"só mais cavalos" é o risco de perguntar só ao mercado); **consistência**; **feedback** oportuno e claro
(visual + som + háptico); **uso equitativo**; **affordance**; **hierarquia**; **modelo conceitual**;
**prevenção e tolerância a erro** (desfazer; a espada rara vendida volta); **baixo esforço físico**
(evite segurar ou tocar repetido); **restrições** (focam); **KISS**.

## Parte II. O processo de UX

**UX5. Etapas.** Pesquisa e planejamento → conceito e ideação (wireframes) → design e produção → teste e
iteração → lançamento e pós. Nem todo estúdio faz tudo; faça a versão pequena.

**UX6. Pesquisa mínima viável.** (a) **Perguntas:** uma ideia por pergunta; "o quê" para recursos,
"como" para processos, "por quê" para motivação; teste as perguntas antes. (b) **Análise competitiva**
(o que é convenção, o que cansa). (c) **Modelos motivacionais:** ação, realização, completude,
criatividade, fantasia, imersão, maestria, poder, história, social. (d) **Metas de experiência do
jogador**, em linguagem de motivação e **mensuráveis** ("os jogadores se sentirão equipe de verdade
quando…"). (e) **Entrevistas, mapa de empatia** (vê, ouve, sente, faz), **personas** (com extremos),
**mapa de jornada**.

**UX7. Acessibilidade desde o começo.** "Dificuldade é relativa; acessibilidade não é facilitar":
**capacidade x barreira**; deficiência é o **descompasso** entre as duas. Três saídas: **ferramentas
para atravessar** (remapear, leitor de tela, assistência de mira, daltonismo, texto, legendas, áudio),
**caminho alternativo** (outra mecânica, outro modo) e **pular** (só em parte não central). Nomes de
dificuldade que não humilhem ("normal"? "fácil"?); ajustes **por categoria** (inimigos, recursos…). Não
"cole no fim": custa mais e some. Divulgue os recursos **antes** da compra. (O livro cita que 20% a
45% do público tem alguma deficiência; é uma estimativa dele, sem verificação minha.)

**UX8. Arquitetura da informação e fluxo.** Estrutura lógica que casa com o modelo mental; rótulos
consistentes; importante em destaque. **Fluxo de usuário**: caminho para cumprir uma tarefa **no menor
número de passos**.

**UX9. Regras de interação.** Consistência e clareza (guia de interação do projeto); KISS; óbvio;
**reconhecimento**; tom; **feedback** inclusive em **microinterações** (pequenos sinais evitam o "não
respondeu"). Inclua **guia de interações** no documento do jogo.

**UX10. UX writing.** Breve; **fale como gente**; **não culpe o jogador** (ensine); tom e voz do jogo;
sem dupla negação; **seja útil** ("Visualizar item", não "Mais info"); nem tudo precisa ser temático
(só "Iniciar" em alguns lugares); números em dígitos; voz ativa; vá ao ponto; preposição certa;
pontuação enxuta (sem ponto final em título, botão, rótulo). Mensagem do sistema direta, sabor só onde
não atrapalha.

**UX11. Wireframe e protótipo.** "Se usar uma só ferramenta, use o **wireframe**": baixa fidelidade
(ideia, rápido, sem sabor) e alta (conteúdo real). **Protótipo** jogável é o melhor teste; **ajuste a
fidelidade ao público** (quem não imagina precisa de mais acabamento).

**UX12. Onboarding e primeira experiência (FTUE).** Os **primeiros cinco minutos** pesam. Comece pelo
que o jogador precisa: **áudio-assistência, legendas e preferências antes** da primeira cena; tutorial
**divertido, com contexto e narrativa**, no tom do jogo; mostre só o essencial **no momento**; reintroduza
quando surgir algo novo. Evite "repita o movimento" e blocos de texto com vários botões.

**UX13. Testes e correções.** Teste de usabilidade com **público-alvo** (não longe das personas), com
**ingredientes essenciais** (GIGO: o protótipo precisa ter o que importa para aquilo que se testa).
Pesquisa depois: **frustração, favorito, desejado, varinha mágica, o que fazia, como descreveria**. O
jogador **não é focus group** (testa-se a clareza do que você pôs contra o que pretendia). Um relato não
é regra (contextualize). **Corrija a causa-raiz**, com **mudanças pequenas**, e **retest** nas mesmas
condições. Não redesenhe sem meta; mudanças pequenas para não chocar.

**UX14. A realidade.** UX tira atrito, mas **jogo precisa de atrito** ("um jogo sem atrito é um
protetor de tela"); o design do jogo manda; você não implementará tudo; adapte-se.

## Parte III. UI: forma, representação e atenção

**UX15. Forma é parte da função.** Beleza não é "pintar por cima"; é **emoção, marca, arte e
interação**. Conheça a **plataforma** (VR, celular, console, PC): cada uma muda tamanho, entrada e
requisitos. Há risco de "UI funcional demais": a regra do legal (UX17).

**UX16. Princípios visuais.** Consistência, **hierarquia** (tamanho, cor, contraste, posição),
**contraste**, **espaço em branco**, tipografia, cor (nunca única pista), simplicidade, **equilíbrio**
(simétrico ou assimétrico).

**UX17. Quatro representações de UI.** **Não diegética** (fora da narrativa; a mais fácil e comum;
risco de excesso); **meta** (existe no jogo, não no espaço: sangue na tela, mira); **espacial** (no espaço
3D, o personagem não sabe: seta, arco); **diegética** (no mundo: o personagem usa; imersiva, mas cara e
frágil). Decida pela **direção de arte**, se faz parte da história e se precisa estar na cena;
**planeje cedo** (o custo da imersão cresce se deixar para tarde). **Regra do Legal:** vale sacrificar
um pouco de UX por algo marcante, **com o UX envolvido**.

**UX18. Atenção.** Holofote; **endógena** (o jogador procura) x **exógena** (o alerta chega); **campo
útil de visão** (muda com a idade; não ponha info relacionada em cantos opostos); **cegueira por
desatenção**: se o jogador não entende uma mecânica, o problema pode ser **competição de atenção**, não
falta de UI ("consertar na UI" piora). **Canais**: visual, **áudio** (confirma, localiza, acessível),
**háptico** (precisa de opção de reduzir ou desligar).

**UX19. Telas e seus papéis.** **Início**: o tom em um segundo. **Menu frontal:** continuar de onde parou,
2 a 3 níveis se houver "voltar", **prenúncio** (o fundo muda com o progresso; mostrar o mundo), foco em
velocidade. **Configurações:** sliders, toggles, passos. **HUD:** mínimo, revelação dinâmica, depende do
gênero (nenhum em jogo cinematográfico; denso em estratégia). **Overlays:** pausa ou não, legibilidade.

**UX20. Rotas de direção de arte (método).** Antes de desenhar telas, escreva **3 a 4 rotas**, cada uma
com **nome, slogan, pilares e execução** (técnicas + algumas imagens). Situe o jogo entre **imersivo** e
**abstrato**; considere **época, gênero e público**; pesquise **fora da internet** (museu, fotos,
objetos, livros), com **poucas referências-herói**, organizadas por pilar e anotadas (por que serve, o
que evitar). **Mood board** focado (se não cabe em poucas referências, volte a pesquisar). **Style guide**
("isto, não isto": certo e errado, com marca). **Mockup/previs** antes de implementar. O mood board e o
style guide são a base para **kits de consistência** de imagem de IA (ver ferramenta futura).

## Parte IV. Componentes e sistemas

**UX21. Sistemas de UI.** Componentes reutilizáveis; gerenciador de menus; **foco** (o jogador sempre sabe
onde está a entrada); roteamento de entrada. **Entradas:** toque (alvo e alcance, uma mão ou duas,
gesto simples), gamepad (D-pad, analógico, cursor livre só se bem feito), **mouse E teclado** (nunca um
só; WASD e setas; canhotos), VR (espacial).

**UX22. Padrões de componente.** **Texto** (strings por ID, **expansão na tradução**, escalar,
truncar, rolar), **imagens e ícones**, **botões** (familiar, acessível, hierarquia; estados: padrão,
foco, pressionado, desativado, selecionado), **barra de progresso**, menus (acordeão: não óbvio; dropdown;
**radial** só poucas opções; hambúrguer: pouca descoberta; **grade**; flyout; **abas** para poucas
categorias; cruz; **cartas** com região comum), **loader**, **modal** (interrompe: use pouco),
**notificação** (passiva, temporária), slider e stepper, carrossel (mostrar posição), checkbox e toggle
(ambos os estados claros), separador e espaçador.

**UX23. Cor.** Cores não "significam" sozinhas; **defina uma linguagem de cores** com nomes por uso
(alerta, lendário). Psicologia de cor é **contextual e cultural** (vermelho: perigo, amor, sorte).
**Daltonismo:** cerca de 1 em 12 homens e 1 em 200 mulheres (estimativa do livro); **nunca só cor**;
ofereça paletas por condição ou cor ajustável; **não use filtro de tela cheia**; 2 a 4 cores base +
variações; **contraste** (WCAG; checadores de contraste); texturas mudam a cor percebida.

**UX24. Tipografia.** Serif, sans, decorativa (títulos), script (logotipo); **tracking, kerning, leading,
altura do x**; caixa alta só onde "grita"; **sentence case** em texto corrido. Escolha: corpo
("burro de carga"), título e acento; **2 ou 3 pesos**; **licença** (e registro de onde veio; licença não
passa de projeto a projeto; não use fonte de logotipo); texto pequeno (< ~18 pt em tela de jogo) perde
legibilidade. **Internacionalização:** glifos de cada idioma, limite de caracteres, **+40% de folga**,
notas de contexto para tradutores, cuidado com concatenação ("[Lendária] [Espada]"), ferramenta para
visualizar idiomas.

**UX25. Ícones.** Funcionam em vários tamanhos (versões otimizadas), traço igual ao da tipografia, grade
de pixel, **forma mais simples**, tropos familiares (engrenagem = opções), **teste sem contexto** ("o
que significa?"), introduza símbolos novos com explicação.

**UX26. Layout.** **Alinhamento** (visual e funcional; direção de leitura varia por cultura), **ritmo e
variedade**, **linhas de força** (o caminho do olho), **ancoragem** (nove pontos; do pai para baixo),
**padding** sempre além do que parece necessário.

**UX27. Animação.** Tem **propósito** (informar, dar continuidade), não só brilho. Tempo real x não
real; **easing** (aceleração natural), **offset e delay** (hierarquia), parenting, transformação,
mudança de valor (o medidor que sobe dá prazer), máscara, overlay, clonagem, obscurecimento,
parallax, dimensionalidade. Ofereça redução de movimento.

**UX28. Áudio de interface.** Sons distintos por ação; positivo x negativo; espacial; sempre com
alternativa visual e **controle de volume por tipo**.

**UX29. Organização de arquivos e desempenho.** Convenção de nomes
(`Tela_Específico_Elemento_Tipo_Variação.ext`: só caracteres latinos e números, caixa consistente, sem
espaços, numeração com zero à esquerda), estrutura de pastas simples com README; **orçamento de textura**
e resolução em potência de dois, 9-slice, empacotamento de canais.

## Aplicação a jogos teológicos (síntese minha, não é do livro)

- **Web, tablet e celular primeiro (UX15, UX21).** Alvos de toque grandes e perto do polegar (Fitts);
  uma mão em retrato; teclado e mouse **e** toque; sem gestos escondidos; respeito ao **safe area**.
  Teste em tela pequena e em tablet no sol (contraste alto).
- **Texto bíblico como conteúdo principal (UX24, UX10).** Tipografia de leitura para trechos longos
  (fonte serif ou sans de corpo, **entrelinha e medida confortáveis**, tamanho ajustável pelo jogador,
  modo escuro e claro), **versículo e referência sempre à vista** e **citação distinta** de comentário e
  de inferência (cor, fonte e rótulo, não só cor; ver 21). Ofereça **tamanho de fonte** e
  **dislexia-friendly** como opção.
- **Localização (UX22, UX24).** Se for PT e EN, com versões da Bíblia diferentes, guarde **strings por
  ID**, folga de 40% e **nomes próprios** com glifos corretos (hebraico e grego opcionais em fonte de
  suporte); **uma tradução da Bíblia por tela**, citada.
- **Diegético e meta para imersão sem custo (UX17).** O **pergaminho, a lanterna, o diário do
  observador** podem ser a "UI diegética" barata (2D, no estilo da cena): o menu de **contexto** é o
  "diário", as **referências cruzadas** são o "rolo". Use **não diegética** (simples) para o que precisa
  ser claro (salvar, voltar, configurações).
- **Acessibilidade como missão (UX7).** Em jogo de estudo, o público vai de crianças a idosos:
  **legendas e leitura em voz** ligadas por padrão, **sem tempo** (nada de cronômetro), **sem exigir
  cor, som ou vibração**, dificuldade com nomes respeitosos, **pular** o desafio mantendo o texto.
  Considere **liturgia e luto** (sem som alto, sem piscar).
- **Primeiros cinco minutos (UX12, UX19).** Em vez de tutorial, **uma cena curta com uma ação**:
  "toque para ler o primeiro versículo", e só depois mostre o resto. Menu de início com **o tom**
  (um pôr do sol, um poço), **"continuar de onde parou"** e **sem login obrigatório**.
- **UX writing do estudo (UX10).** Mensagens **sem culpa** ("Releia o versículo 4 e veja de novo"),
  nada de "Errado!"; botões úteis ("Ver o texto", "Comparar com Mateus"), números em dígitos; **voz
  ativa**; tom **respeitoso**, não infantilizado, não "gamer" demais.
- **Cor com cuidado (UX23).** Evite associar **vermelho a "pecado" e verde a "certo"**; cores não
  devem **julgar pessoas** nem **tradições**. Defina a **linguagem de cores** do jogo (por exemplo:
  texto bíblico, contexto histórico, inferência) com **forma e rótulo**, além de cor.
- **Atrito certo (UX1, UX14).** O atrito está em **olhar, comparar e pensar**, não em **achar o
  botão**. Se o jogador falha em entender uma mecânica, cheque **atenção e hierarquia** antes de
  acrescentar mais tela (UX18).
- **Teste (UX13).** Use as seis perguntas pós-teste com **pessoas do público** (jovens, adultos,
  líder de célula), e **uma delas do tipo "o que você entendeu do texto?"** para ver se a mecânica
  carrega a verdade (12, 21).
- **Cuidado com "técnicas" de psicologia (UX2).** Escassez, recompensa variável, aversão à perda e
  nudging **não** entram em jogo de formação sem **consentimento** e transparência (07, 16, 23).
- **Rotas e style guide para imagens de IA (UX20).** Escreva **rotas** (nome, slogan, pilares,
  execução) para a **direção de arte** do jogo, 1 mood board por rota e um **style guide
  "isto, não isto"**, para reaproveitar em **prompts** e **kits de consistência** (memória imaginativa
  em 23; cenário em 20). Evite uma "estética genérica de IA": use **referências físicas** (museus,
  fotos de sítios, mapas) e **rotule** o que é reconstrução (21).

## Ressalvas de leitura

- **Livro de carreira.** Cap. 1 a 3 e 8 a 11 (funções, estudos, CV, portfólio, candidatura,
  entrevistas, "seja gentil") **não** alimentam a skill; li a TOC e trechos finais.
- **Foco em AAA e console.** Muitos exemplos (Dead Space, Fallout, Helldivers) não se aplicam
  diretamente a web e a jogos de estudo; **web e acessibilidade em navegador** (WCAG, ARIA, foco por
  teclado, `prefers-reduced-motion`) **não são tratados**: ver 08 e as especificações do W3C.
- **Estatísticas citadas** (20% a 45% do público com alguma deficiência; daltonismo) são do autor;
  confira antes de citar.

## Acréscimo (Castledine, *HTML5 Games: Novice to Ninja*): "juice" com critério

O nível 8 do livro chama de **juice** o conjunto de efeitos que dão "sensação" ao jogo: **tremida de
tela**, **flash**, transparência e **fade**, partículas, interpolações suaves, explosões. Úteis para
dar **retorno** às ações; mas o livro defende "mais é mais", o que **contraria** o cuidado exigido em
formação e em acessibilidade. Regras da skill:

- **Tremida e flash são opcionais** e **desligáveis** (`prefers-reduced-motion`; sensibilidade a luz
  e a movimento, `24`, `23`). **Nunca** use flash rápido (risco de convulsão fotossensível).
- **Sem exagero para fins de manipulação** (empolgar para reter): use para **marcar o que importa**
  (ex.: descobrir o versículo-chave), com **poucos segundos** e intensidade baixa.
- **Técnica correta** (do livro): a tremida **apaga o deslocamento do quadro anterior** antes de
  aplicar o novo, para não deslocar a câmera de forma permanente; o **fade** é só `alpha`.
- **Transições calmas** (alfa, deslocamento suave) valem mais que explosões em jogos de leitura.

```js
// Meu exemplo (testado): tremida que desfaz o quadro anterior e decai até zero.
class Camera {
  constructor() { this.x = 0; this.y = 0; this.ult = { x: 0, y: 0 }; this.forca = 0; this.queda = 0; }
  treme(forca = 8, dur = 0.5) { this.forca = forca; this.queda = forca / dur; }
  atualiza(dt, rnd = Math.random) {
    this.x -= this.ult.x; this.y -= this.ult.y; this.ult = { x: 0, y: 0 };
    if (this.forca > 0) {
      this.ult = { x: (rnd() - 0.5) * 2 * this.forca, y: (rnd() - 0.5) * 2 * this.forca };
      this.x += this.ult.x; this.y += this.ult.y;
      this.forca = Math.max(0, this.forca - this.queda * dt);
    }
  }
}
```
