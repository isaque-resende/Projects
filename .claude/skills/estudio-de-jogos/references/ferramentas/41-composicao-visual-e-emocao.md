# Ferramenta 41: Composição visual e emoção (Molly Bang)

> **Pipeline:** fase principal **F4** (`../pipeline/F4-experiencia-arte-e-nivel.md`).

Para **desenhar a emoção de uma imagem pela estrutura**: forma, posição, tamanho, cor, luz e espaço.
Serve de base para **prompts e kits de consistência** de imagem gerada por IA, e para **direção de
arte** de jogos e cenas. Fonte: Molly Bang, *Picture This: How Pictures Work* (SeaStar Books/Chronicle;
edição de 2016; original de 1991). Os itens `MB#` são meus (numeração por tema; **tudo em
paráfrase**). Complementa `24` (UX, UI e direção de arte), `20` (level design arquitetônico), `35`
(aprendizagem multimídia) e `17` (visual novels). Resolve **em parte** a lacuna L5 de
`lacunas-e-fila-de-livros.md` (kit de imagem com IA); ainda faltam **estilo, consistência de
personagem e fluxo de geração**.

> O livro é **curto e ilustrado**: a autora constrói imagens de "Chapeuzinho Vermelho" só com
> **formas recortadas** (triângulos, retângulos) e mostra como cada decisão muda o que sentimos.
> A parte teórica vem de **psicologia da arte** (cita Rudolf Arnheim). **Não** trata de IA nem de
> teologia; essas aplicações são **inferência minha**. Li o livro **quase todo** (prefácio,
> capítulos 1 e 2 integralmente; 3 e 5 em parte; 4 por título).

## 1. A pergunta única do livro (MB1)

**MB1.** Como a **estrutura** de uma imagem (ou de qualquer arte visual) afeta a **resposta
emocional**? O livro responde com **princípios** (ou "forças") que **atuam em conjunto e sempre em
um contexto**: o mesmo triângulo pode ser vela, barbatana de tubarão ou ilha, e **sentimos de
modo diferente** conforme a história.

## 2. Os 12 princípios (MB2 a MB13)

**Gravidade e orientação**
- **MB2. Horizontal:** formas lisas, planas e horizontais passam **estabilidade e calma** (chão,
  horizonte, mar sereno).
- **MB3. Vertical:** formas verticais são **mais ativas e emocionantes**; lembram crescimento,
  monumento, elevação (torre, templo); uma **barra horizontal** sobre verticais devolve ordem.
- **MB4. Diagonal:** implica **movimento ou tensão** (queda, ou impulso); lê-se da esquerda para
  a direita em culturas que leem assim; uma diagonal dá **profundidade** e **conecta** elementos.
- **MB5. Alto × baixo:** a **metade de cima** é de **liberdade, felicidade, poder e "espiritual"**;
  a **de baixo**, de **peso, tristeza, restrição e chão**. Objeto mais alto tem **mais peso
  pictórico** (atrai atenção).

**O quadro como mundo**
- **MB6. Centro:** o centro é o **ponto de maior atração**; figuras no centro lembram
  **meditação**; tirar do centro **dá movimento**.
- **MB7. Bordas e cantos:** quanto **mais perto da borda ou do canto**, **maior a tensão**
  ("encurralado", "à beira").

**Luz, forma e tamanho**
- **MB8. Fundo claro × escuro:** fundo claro é **mais seguro** (dia, esperança); escuro é o
  **desconhecido** e o medo. Cores vivas **brilham** sobre fundo escuro.
- **MB9. Pontas × curvas:** **pontiagudo assusta** (armas, espinhos); **curvo conforta**
  (colinas, abraço).
- **MB10. Tamanho:** **quanto maior, mais forte**; figura pequena diante de massa grande fica
  **vulnerável**; deuses e reis foram pintados em **escala maior** em várias tradições.

**Cor e ritmo**
- **MB11. Cor:** efeito **mais forte** que o das demais variáveis; associa-se a coisas naturais
  (vermelho a sangue e fogo, branco a luz e osso, preto a escuro, azul a mar e céu). Objetos
  de **mesma cor** são **associados** com mais força do que objetos de mesma forma; a associação
  pode ser **positiva** (time) ou **negativa** (lobo e Chapeuzinho com olho e boca vermelhos).
- **MB12. Regularidade e irregularidade:** repetição dá **segurança**, mas a **regularidade
  perfeita é fria e mecânica** e o caos total assusta; a vida é **mistura**.

**Contraste e espaço**
- **MB13. Contraste:** só vemos por contraste (cor, forma, tamanho, posição). O **espaço entre as
  formas** pesa **tanto quanto as formas**: espaço **isola** uma figura (livre e vulnerável),
  **sobreposição** liga, e **profundidade** nasce de bases mais altas e formas menores e mais
  claras. **Espaço implica tempo**: o agressor perto da vítima assusta menos (não há tempo), o
  distante dá **tempo** de temer.

## 3. Processo (MB14 a MB17)

**MB14. Comece pelo mais simples:** formas básicas e poucas cores (o livro limita a quatro cores)
e vá **perguntando o que sinto** a cada mudança.
**MB15. Monte o cenário antes da personagem** ("preparar o palco"), depois a entrada dela; cada
elemento **altera** o efeito dos outros.
**MB16. Identificação:** tendemos a **nos identificar com um elemento** da imagem (a figura
pequena), e o **quadro nos coloca dentro** (se está longe demais, sentimo-nos **espectadores**).
**MB17. Mudar um elemento por vez** e **olhar de novo**: a pergunta "o que mudou em mim?"
decide. **Cuidado com excesso**: cenas **carregadas demais** escondem o elemento principal
(o lobo se perdeu na confusão).

## 4. Kit de composição para imagens de IA (inferência minha) (MB18, MB19)

Tradução dos princípios em **campos de prompt** (consistência entre imagens de um jogo):

| Campo do kit | Pergunta | Base |
|---|---|---|
| **Emoção-alvo** | Calma, reverência, tensão, fragilidade, acolhimento? | MB2 a MB12 |
| **Orientação dominante** | Horizontal, vertical ou diagonal? | MB2 a MB4 |
| **Posição da figura** | Alto, baixo, centro, borda? | MB5 a MB7 |
| **Tamanho relativo** | Figura em relação ao entorno | MB10 |
| **Contorno** | Curvo, anguloso, misto | MB9 |
| **Cor e associação** | Que cor liga quais figuras? | MB11 |
| **Luz e fundo** | Claro, escuro, rasante, do alto | MB8 |
| **Espaço** | Distância, sobreposição, profundidade | MB13 |
| **Foco e ponto de vista** | Onde o olhar entra e com quem identifica? | MB16 |

```js
// Meu exemplo (testado): monta o trecho de composição do prompt a partir da emoção-alvo.
const efeitos = {
  calma:       { forma: 'formas horizontais largas e estáveis', posicao: 'figura apoiada na parte inferior, centrada',
                 contorno: 'contornos suaves e curvos', cor: 'paleta pálida e quente, poucos contrastes', luz: 'luz do dia, difusa' },
  reverencia:  { forma: 'verticais altas e simétricas', posicao: 'figura central e alta no quadro',
                 contorno: 'linhas limpas', cor: 'luz dourada sobre fundo claro', luz: 'luz vinda do alto' },
  tensao:      { forma: 'diagonais e inclinações', posicao: 'figura deslocada do centro, perto da borda',
                 contorno: 'ângulos agudos', cor: 'contraste forte entre claro e escuro', luz: 'luz rasante' },
  fragilidade: { forma: 'figura pequena diante de massas grandes', posicao: 'figura baixa no quadro',
                 contorno: 'formas redondas para a figura', cor: 'cor mais viva para a figura', luz: 'fundo escurecido ao redor' },
  acolhimento: { forma: 'formas arredondadas', posicao: 'figuras próximas entre si',
                 contorno: 'curvas', cor: 'cores semelhantes ligando as figuras', luz: 'luz quente' },
};
const montaPrompt = ({ cena, emocao, estilo, camera = 'plano geral' }) => {
  const e = efeitos[emocao];
  if (!e) throw new Error('emoção desconhecida: ' + emocao);
  return [cena, `emoção: ${emocao}`, e.forma, e.posicao, e.contorno, e.cor, e.luz, `estilo: ${estilo}`, camera].join('; ');
};
```

**Resultado do teste:** `montaPrompt` com "Neemias inspeciona o muro ao anoitecer" e
**fragilidade** devolve um prompt com figura pequena, baixa no quadro, formas redondas para a
figura, fundo escurecido e estilo "aquarela sóbria"; **calma × tensão** é detectado como
conflito; emoção desconhecida gera erro.

## 5. Aplicação a jogos teológicos (inferência minha)

| Situação | Uso dos princípios | Cuidado |
|---|---|---|
| **Cena de oração ou culto** | Figura central e vertical, luz do alto, fundo claro (MB3, MB6, MB8) | Não sugerir "ver Deus"; **evitar** retratar Deus (`21`) |
| **Sofrimento ou exílio** | Figura pequena e baixa, massas grandes, fundo escuro, espaço vazio (MB5, MB10, MB13) | Sensibilidade; sem estetizar a dor |
| **Comunhão** | Cores semelhantes ligando figuras, curvas, proximidade (MB9, MB11, MB13) | Representação **diversa** das pessoas (`40`) |
| **Perigo ou tentação** | Diagonais, pontas, contraste (MB4, MB9, MB11) | **Não** usar cor para "demonizar" um grupo (MB11 e `21`) |
| **Chamado ou envio** | Diagonal para a direita, figura saindo do centro (MB4, MB6) | Em RTL, inverter a leitura |
| **Autoridade e santidade** | Altura e escala (MB5, MB10) | **Cuidado** com hierarquia: "maior = melhor" pode ensinar mal |
| **Texto sobre imagem** | Espaço livre para texto; **contraste** (MB13; `24`) | Acessibilidade |

**Cuidado de leitura cultural:** o livro parte de **associações ocidentais** (leitura da
esquerda para a direita; preto como luto na Europa, branco em outros lugares; vermelho como
perigo). Para **públicos diversos**, **teste** a leitura (`29`).

## 6. Narrativa gráfica e sequência (Eisner, *Graphic Storytelling and Visual Narrative*)

Fonte: Will Eisner, *Graphic Storytelling and Visual Narrative* (W. W. Norton, 2008; reedição do
*Graphic Storytelling* de 1996). Itens `WE#`. Eisner escreve como **autor e professor de
quadrinhos**; o cerne é a **história** e sua entrega ao leitor, não a técnica de desenho. Tudo
abaixo é **paráfrase**. **Leitura:** texto do EPUB **limpo e integral** (capítulos 1 a 12 e
apêndices); o livro é **curto** e boa parte é **exemplos desenhados**, que **não vi** (só os
comentários do autor sobre eles). Aplicação teológica é **minha**.

### 6.1 Estrutura e função da história (caps. 1 a 3)

**WE1. História como veículo:** contar histórias ensina conduta, discute valores, dramatiza
problemas e preserva conhecimento entre gerações. Toda história tem **começo, fim e um fio de
eventos**; a estrutura é **guia de controle**, e o esqueleto é o mesmo em texto, filme ou
quadrinho (muda o estilo da entrega, não a história).
**WE2. Ideia só vira história quando é contada em ordem proposital;** antes disso é um
emaranhado de lembranças e fantasias. Uma história pode expor ideia **abstrata** por analogia a
formas **familiares**.
**WE3. Duas vias de contar:** **palavras** e **imagens** (ou as duas). Imagem é **específica** e
chega "na velocidade da vista", mas **não articula abstração** com facilidade. O **formato** (a
embalagem) influencia como a história é percebida.

### 6.2 Imagens como ferramentas (cap. 4)

**WE4. Estereótipo, "necessidade amaldiçoada":** como há pouco espaço e tempo, a imagem precisa
ser **reconhecida de imediato**; isso pede **tipos** repetíveis tirados da experiência do leitor.
O autor reconhece o **risco** (banalidade, propaganda, racismo) e pede **conhecer o público**,
porque cada sociedade tem os seus estereótipos, e só alguns são universais. Quando o enredo
permite, **abandone o tipo** em favor de um indivíduo.
**WE5. Símbolo e objeto como vocabulário:** objetos (uma boneca quebrada na neve, um
distintivo, um traje) funcionam como **adjetivos e advérbios** e **intensificam a emoção**;
**roupa** diz força, ofício e intenção; **como** é vestida também comunica.

### 6.3 Tipos de história (cap. 5)

**WE6. Método específico à mensagem.** Tipos catalogados: **instrutiva** (processo embrulhado
em narrativa; habilidade se aprende por **imitação**), **sem enredo** (o visual sustenta, a
trama tem um único problema, como perseguição), **ilustrada** (o texto conduz e a arte
embeleza; ritmo vagaroso, que deixa o leitor **demorar-se** na imagem), **simbólica** (poucos
símbolos fixam a premissa), **fatia de vida** (trecho que se sustenta sozinho; exige **atuação
crível**; o **antes** e o **depois** ficam **implícitos**) e **história de vida** (um único
incidente revelador define a pessoa; o desafio é escolher o que o leitor julgue **verossímil**).
**WE7. Cuidado com o excesso de técnica:** em formas de **interioridade** (fatia de vida),
layout "de força" e acabamento exagerado **atrapalham**; o traço simples cria **intimidade**.

### 6.4 O leitor e o contrato (cap. 6)

**WE8. Para quem conto?** Antes de narrar, definir o **perfil do leitor** (experiência e
cultura); a comunicação depende da **memória de experiência** e do **vocabulário visual** do
narrador.
**WE9. Empatia como canal:** reação visceral à dor, ao medo, à alegria do outro; pessoas
aprendem cedo a ler **gestos, posturas e sinais não verbais** e deduzem **amor, dor, raiva**.
Por isso **gesto e postura** carregam a emoção, e o desenhista precisa dominar a **expressão
corporal**.
**WE10. Contrato leitor-narrador:** o narrador espera ser **compreendido**, o leitor espera
algo **compreensível**; **o ônus é do narrador**. O leitor completa **tempo, espaço, movimento,
som e emoção** com **experiência e raciocínio**.
**WE11. Controle do leitor:** vem de **relevância** a seus interesses. Temas "universais":
**curiosidade** sobre o pouco conhecido, **comportamento humano** sob condições, **fantasia**,
**surpresa** e **humor**. Em quadrinho, controla-se em dois estágios: **atenção** (imagem
provocante e atraente) e **retenção** (arranjo lógico e inteligível).
**WE12. Surpresa em quadrinho é mais difícil:** o leitor controla a aquisição e pode **olhar
adiante**. Saída: **surpreender o personagem** com quem o leitor está envolvido, e deixar que
**as reações dele** carreguem a revelação; sem a reação, a surpresa falha.

### 6.5 Diálogo e silêncio (cap. 6, final)

**WE13. Leitor como ator:** sem som, música ou movimento, o leitor **encena** a história;
diálogo é crítico. Em trecho **silencioso**, o narrador precisa de **gesto e postura**
identificáveis para que o leitor "ouça" a fala certa.
**WE14. Ação precede palavra:** a fala é concebida **depois** da ação; imagem e diálogo
**dão sentido um ao outro**. Não há prova de que sejam lidos simultaneamente; os processos
cognitivos diferem.
**WE15. Regra do tempo:** diálogo **consome tempo**; uma troca longa **não se sustenta** na
mesma figura parada. Resumo prático do autor: **o diálogo encerra a duração da imagem**. Trocar
a pose entre falas dá **credibilidade** (custa espaço).
**WE16. Letreiramento é roteiro:** estilo da letra e sotaque dão **volume e emoção**
(maior e mais forte, mais volume). O **impulso da história** permite **passagens mudas**, em
que o leitor completa o diálogo.

### 6.6 Influências sobre o leitor (cap. 7)

**WE17. Ritmo de leitura:** cada leitor tem **ritmo próprio**, moldado por outras mídias. No
papel, o leitor tem **controle total** da aquisição; na web havia mais controle do narrador, mas
os autores ainda **copiavam o ritmo do impresso**. Em impresso, as imagens precisam **se ligar** para
sugerir a ação intermediária.
**WE18. Filme × quadrinho:** filme dá som e movimento e exige **só atenção** (o espectador fica
"preso" até o fim); quadrinho **narra** e exige **alfabetização e participação**, e o leitor pode
espiar o final ou demorar numa imagem. Filme **mostra** uma experiência, o quadrinho **alude** a ela.
**WE19. Cuidado com clichês do cinema:** imitar câmera e "o que o personagem vê" gasta
**espaço** (som e fala em filme não ocupam espaço visual, em quadrinho ocupam) e prejudica a
leitura; conte o mesmo **com mais economia**.
**WE20. Influência nacional:** cada país produz quadrinhos com ícones e estereótipos
**próprios**; é difícil fazer imagem de intenção internacional, mas **postura e gesto
universais** mantêm a linguagem viável.

### 6.7 Ideias e premissas (cap. 8)

**WE21. Premissa = base do contrato.** Quatro portas, entre outras: **"e se...?"** (problema
fabricado, ensina a lidar com ameaça; imagens não precisam passar no teste do real), **"deixe-me
contar o que aconteceu com..."** (partilha de experiência; **prólogo econômico** que dê
dimensão ao protagonista), **"em seguida meu herói é lançado em..."** (herói contínuo e simples,
**ação é o enredo**, enredo previsível; pode compensar com ousadia visual) e **"já ouviu a
piada..."** (surpresa dramatizada; **ambientar** o antes e o depois, **evitar sutileza** e usar
tipos fáceis).

### 6.8 Escrever para o artista (cap. 9)

**WE22. Escrita para gráficos** é **economia**: conceito, enredo, elenco, e **descrição da
ação endereçada ao artista**, não ao leitor; o ideal é **escritor = artista**. Prosa literária
**não se traduz**; imagem sim.
**WE23. Dilema da tradução:** roteiro que pede "interioridade" (dor antiga, raiva contida,
músculo da mandíbula) pode ser **impossível num único quadro**. Soluções: **inferir ao longo
de painéis**, **inserir painel narrativo**, ou aceitar que o leitor **divine**. Tudo depende de
**espaço** e da **habilidade** do artista; imagem "reveladora" deve ser **extraída do fluxo e
congelada**.
**WE24. Flashback custa espaço e freia a ação:** decidir na **fase de decomposição** (breakdown)
quantos quadros vale cada parágrafo. Há casos em que o **texto narrativo** é parte integral
e a arte só o ilustra.
**WE25. Julgamento só depois de desenhar:** de texto a imagem há **alta chance** de desvio
(habilidade, tempo); a narrativa só é julgada **depois de virar arte**.

### 6.9 Narradores, seriada e condensação (cap. 10)

**WE26. Tira diária e continuidade:** pode **soltar** um fio por segmento sem perder o leitor;
quem domina a continuidade mantém **conexão entre tiras**, usa painéis quase padronizados
(para **não distrair**), faz **passagens mudas** e convida o leitor a **atuar**. Diferença
estrutural: **gibi** conclui; **tira** segue a vida e **não tem fim arrumado**.
**WE27. Condensar sem perder a essência:** preservar tema e enredo; cortar o colateral; o leitor
**preenche** a ação pelo que viveu. O exemplo clássico é a micro-história de **uma frase** em que
a força vem de **pontos-toque** que fazem o leitor "escrever" a história. Formato de **uma
página** exige entrega compacta. Adaptação de clássico em poucos quadros é possível se mantiver
**essência** e a **estrutura** do formato.
**WE28. Ilustração narrativa:** quando a arte conta (composição do quadro, atores no centro da
ação, detalhe **a serviço** da história), o texto pode ser mínimo, mas é **difícil** sustentar o
fluxo.
**WE29. Livros sem palavras:** os romances em xilogravura (Masereel, Nöckel, Lynd Ward) provam
a **viabilidade**; Ward usou **uma imagem por página, data por capítulo** e cartazes como única
palavra. O custo: o leitor precisa pôr **diálogo e o intervalo** entre páginas, exige
**alfabetização visual**, e muitos acharam **difícil**. Lição: **equilibrar** imagem e texto
para quem não está acostumado.

### 6.10 Estilo, voz e responsabilidade (cap. 11)

**WE30. Estilo conta história:** estilo = **aparência e sensação a serviço da mensagem**, não
técnica. O leitor absorve **clima** pelo traço; estilo apropriado ao conteúdo é causa frequente
de **sucesso ou fracasso**. Há artistas com estilo único e outros que **trocam de estilo** por
história (disciplina "de falsário").
**WE31. Voz do narrador:** há uma "transmissão psíquica" da **paixão** do autor; o leitor
"sente" a intensidade.
**WE32. O narrador se revela:** escolha de **estereótipos**, **violência**, retrato de homens
e mulheres e **resolução de conflito** expõem **viés e valores**; o autor precisa estar disposto
a se expor emocionalmente. Definições dele: **sentimento** (atitude emocional, idealismo,
nostalgia), **pieguice** (emoção explorada, patetismo em excesso), **violência** e
**pornografia** (exploração do sexual para excitar); tudo sob controle do narrador.
**WE33. Responsabilidade:** histórias **influenciam**; perguntar **que efeito terá**, se quer ser
**identificado** com ela, e **quais limites morais** aceita.
**WE34. Mercado:** a embalagem vende, e isso empurra para **forma sobre conteúdo**; quem quer
reter leitores mantém o gráfico **a serviço da história**.

### 6.11 Quadrinho e internet (cap. 12) e leituras

**WE35. Tela × página:** o impresso é vertical e o monitor horizontal; página inteira na tela
exige **reformatar** para não rolar. **Tela infinita:** o leitor segue o fluxo **rolando** num
campo maior; dá liberdade de layout e exige **navegação**. Produzir para web afeta
**legibilidade, tipografia e nitidez**.
**WE36. Leituras indicadas pelo autor** (apenas como pistas): Campbell (mito como núcleo das
histórias), Abrahams (fábulas e provérbios como discussão indireta e impessoal, animais como
atores), Segy (imagem e escultura como linguagem), Gombrich (ver × copiar) e McCloud.
**Nota:** as **instruções técnicas de digitalização** (dpi, formatos) são **datadas** e não
são usadas aqui.

### 6.12 Aplicação teológica (inferência minha)

| Ideia | Uso em jogos | Cuidado |
|---|---|---|
| **WE1, WE2** | Cada cena tem **começo, fio e fim** claros; ideia abstrata (graça, aliança) por **analogia familiar** | Não trocar o texto por analogia; **rotular** (`21`) |
| **WE4** | Poucos **tipos** reconhecíveis para elenco recorrente | **Não** caricaturar povos, mulheres, estrangeiros ou "vilões" por traços (propaganda e racismo, o próprio autor avisa) |
| **WE5** | **Objetos** com sentido (pão, jarro, rede, véu) como vocabulário da cena | Só o que o **texto ou o contexto** sustenta; não inventar símbolo |
| **WE9, WE13** | **Gesto e postura** (oração, arrependimento, acolhida) em vez de texto explicativo | Respeitar culturas (`41`, `21`) |
| **WE10** | Contrato claro: o jogo promete **o que é texto, o que é contexto, o que é inferência** | Sem manipular o leitor |
| **WE12** | Revelar (ex.: o reconhecimento do ressuscitado) pela **reação do personagem** | Sem sensacionalismo (`24`) |
| **WE15** | Diálogo curto por quadro; **trocar a cena** a cada fala longa | Fala **inventada** com rótulo (`07`, `21`) |
| **WE16, WE13** | **Silêncio** em oração e contemplação | Não representar Deus (`21`) |
| **WE21** | "**E se...?**" como **exercício de aplicação**, **fora** do texto | Marcar como **hipótese** e não como relato |
| **WE24** | **Decomposição**: quantos quadros por versículo; **flashback** custa espaço | **Não** resumir mudando o sentido |
| **WE27** | Resumo com **pontos-toque**, séries de estudo com recapitulação | Citar a fonte; sem "gancho" manipulador (`16`) |
| **WE29** | Cenas **sem palavras** para contemplação e crianças | Dar **apoio** de leitura a quem não é versado |
| **WE30** | Estilo **coerente com o gênero** do texto (lamento, narrativa, parábola); kit consistente | Não fixar estilo "ocidental" como o padrão do sagrado |
| **WE32, WE33** | **Auditar viés** do estúdio (quem aparece como herói, vítima, vilão; como se retrata violência) | Violência e sexualidade bíblicas: **tratar com cuidado de faixa etária** |
| **WE35** | **Tela infinita** para linha do tempo, genealogia ou jornada (rolar) | Acessibilidade de navegação (teclado, leitor de tela) |

## 7. Fluxo de design de personagem e de enquadramento (3DTotal, *Dynamic Characters*)

Fonte: 3DTotal.com Ltd (org.), *Dynamic Characters* (e-magazine de tutoriais; cinco capítulos de
artistas diferentes: Darren Yeow, Bruno Werneck, Björn Hurri, Mark McDonnell, David Smit; **ano e
edição não verificados no arquivo**). Itens `DC#`. Material de **ofício** para **artistas de
concept e jogos** (muito de **Photoshop**, que aqui ignoro). **Tudo em paráfrase.** Serve ao **kit
de consistência** da seção 4 e ao **roteiro de cena** (`42`, `43`).

**DC1. Pesquisar antes de desenhar,** como **inspiração** e **sem copiar** (plágio).
**DC2. Miniaturas (thumbnails) rápidas:** muitas, **pequenas**, sem julgamento; as primeiras são
ruins, **a quantidade gera a opção**; "sem medo da folha em branco"; não apagar.
**DC3. Só o necessário:** use **tanta informação quanto precisar e a mínima possível**; croqui é
ferramenta **para si**, mas, em trabalho comercial, **precisa ser entendido** por quem **não é
artista** (reduz retrabalho).
**DC4. Silhuetas:** projetar **de fora para dentro**; força a **ver o todo**, a **reconhecer à
distância** e a **testar a resposta emocional** antes do detalhe; depois detalha os **volumes
grandes** antes dos pequenos; **fonte de luz** decide a forma.
**DC5. Variações por duplicação:** partir da **mesma pose/proporção** e variar **acessórios e
traje** (barato e rápido).
**DC6. Regras comerciais:** **função antes da forma** (o traje precisa **servir** e **articular**),
**apoiar-se em convenções** (vermelho = perigo; pontiagudo = ameaça; arredondado = inofensivo),
**não macaquear** o trabalho alheio.
**DC7. Mentalidade:** muitas peças pequenas e "inconsequentes"; ser **imparcial** com os
desenhos; toda ideia pode **abrir a porta** para a final.
**DC8. Brainstorm visual:** tornar **o pensamento visível**; fazer perguntas **"e se...?"**, sem
descartar cedo; **acumular gatilhos** (parque, rocha, rosto) e **registrar a cadeia** de ideias
(útil para o time).
**DC9. Refinar não é detalhar:** olhar a mesma ideia de **ângulos ligeiramente diferentes** para
elevá-la; **clareza da ideia** vale mais que acabamento.
**DC10. Ficha de modelo (model sheet):** pintar a **anatomia-base** primeiro, manter **traje
alinhado ao corpo**, mostrar **frente, costas e lado** (linha central para espelhar), **definir
bordas** e **blocos de cor** para separar partes, para quem for **modelar/animar**.
**DC11. Projetar por função** (imaginar-se **vestindo** a peça para ver o que funciona).
**DC12. Pose dinâmica = história:** pense no que o personagem **pensa/sente**; **silhueta** legível
a distância; **pés afastados** = postura firme, **mãos escondidas** = desconforto, **braços
cruzados** = reserva; **rosto por último** (o corpo já diz a ação).
**DC13. Linha de ação** e **gestos** como verbos (não substantivos); **sutil** quando pede
sutileza, **exagero** quando pede ação.
**DC14. Primeiro, a história do enquadramento:** **o que você quer contar?** Lista **MSCW**
(**M**ust, **S**hould, **C**ould, **W**ould): o **deve conter** e o **deveria**; **Could** e
**Would** quase nunca entram; **mostrar o mínimo** sem comprometer a história.
**DC15. Uma ideia por imagem;** tempo de leitura curto (o autor cita "~7 segundos" na web;
**número não verificado**): a imagem precisa ser **óbvia**.
**DC16. Três horizontes básicos:** **baixo** (personagem grande, ameaçador; espectador
pequeno), **no meio** (tamanho igual ao espectador), **alto/vista de pássaro** (sujeito pequeno
ou dominado).
**DC17. Estático × dinâmico:** estático = **central, horizontais e verticais, equilíbrio**;
dinâmico = **fora do centro, diagonais e curvas, "espaço à frente"** (para onde vai) e **espaço
atrás** (de onde veio, ou perigo); **desequilíbrio = movimento**.
**DC18. Mais de um foco,** mas poucos; **linhas** (reais ou sugeridas por luz) guiam o olho;
**não deixar linha levar o olhar para fora** do quadro.
**DC19. Direção de leitura é cultural:** da esquerda para a direita parece **subir**, da
direita para a esquerda parece **mais rápido/ameaçador** (observação do autor; **depende de
contexto e cultura**).
**DC20. Profundidade:** personagem **em primeiro plano** envolve o fundo; **no meio**, equilibra e
**perde** potencial de movimento; **ao fundo**, solidão e **distância percorrida**.
**DC21. Rotação de câmera** (inclinar o horizonte) **ativa** a cena; **elementos de sobreposição**
(braço em primeiro plano) **envolvem** o espectador; **sugestão** (mostrar o medo, não a causa)
engaja mais.
**DC22. Elementos que se movem** (vento, poeira, capa, tecido) **dão movimento**; evitar tecido
"de chumbo".
**DC23. Moldura:** **horizontal** (espaço, estável), **vertical** (altura, profundidade, mais
dinâmica), **quadrada** (rígida), **extremas** (épica, longa/profunda), **não convencionais**
(redonda, "saindo da caixa", borda difusa) **só com motivo**. Moldura **fixa** exige **sacrificar
o menos importante**.
**DC24. Regras são guias,** não leis: **dobre-as pelo que quer dizer**; **testar espelhando**
a imagem; **nunca ficar com a primeira** versão.

### 7.1 Aplicação a prompts de IA e a jogos teológicos (inferência minha)

| Ideia | Uso | Cuidado |
|---|---|---|
| **DC4, DC5** | Gerar **silhuetas e variações** do **mesmo tipo** (kit de elenco) antes de detalhar | Reconhecimento não deve virar **caricatura** de povos |
| **DC10** | **Ficha de modelo** (frente, costas, lado, blocos de cor) como **referência de consistência** para IA e ilustrador | Documentar **fonte** e **licença** da referência |
| **DC12, DC13** | Pose por **ação e sentimento** (oração, arrependimento, envio), **rosto por último** | **Culturas** diferem; evitar **gestos** com outro sentido |
| **DC14 (MSCW)** | **Lista MSCW** por cena: o que **deve** aparecer para o **texto** estar fiel e o que é **enfeite** | **Must** = o que o **texto sustenta**; o resto **rotulado** |
| **DC16, DC17, DC20** | Escolher **horizonte, espaço à frente/atrás e profundidade** pelo **sentido** (pequenez diante do mistério, caminho percorrido) | **Não representar Deus**; **sem** sensacionalismo (`21`, `24`) |
| **DC21** | **Sugestão**: mostrar o **efeito** (olhar, sombra) e **não** a causa | Só quando o **texto** cala; **documentar** (`42`) |
| **DC6, DC8 (exemplo do "guerreiro nativo")** | O **exemplo do capítulo** usa um **tipo cultural** como fantasia; é **lição**: **não** transformar povos reais em **personagem de poder místico** por estética | Evitar **apropriação** e **estereótipo** |
| **DC1, DC6** | **Referências** como inspiração, **não cópia**; atenção a **direitos** e a **estilos de artistas** em IA | **Não** imitar artista vivo sem permissão |

### 7.2 Ressalvas desta seção
- É **magazine de tutoriais** de artistas (opiniões pessoais, tom informal, ferramentas de
  Photoshop datadas); **não** é pesquisa. Números (ex.: "7 segundos") **não verificados**.
- Cobre **concept art 2D**; **não** trata de **IA generativa**, **3D** em motor, **UI** nem
  **animação**; a ponte para IA é **minha**.

## 8. Limites

- **Leitura**: ver `livros.md`, seções 47, 48 e 52.
- Princípios são **tendências**, não regras: dependem de **contexto, conteúdo e história**.
- O livro trata de **imagens estáticas e figuras simples**; **animação, interface e 3D** exigem
  outras fontes.
- A seção 6 (Eisner) é **livro de ofício**, não pesquisa empírica; os **exemplos desenhados** não foram vistos; ele fala de **quadrinho em papel** (web e tela infinita só em nota breve, já datada).
- O **kit completo para IA** (estilo, personagem, referência e fluxo) continua **pendente**.
