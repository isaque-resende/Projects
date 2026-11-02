# Ferramenta 29: Pesquisa com jogadores (Games User Research)

> **Pipeline:** fase principal **F6** (`../pipeline/F6-teste-e-qualidade.md`); também usada em F7.

Para **testar com pessoas de verdade** e transformar o que se vê em mudanças: escolher o método
certo, montar sessões pequenas e baratas, perguntar sem induzir, observar sem interferir, relatar de
modo que a equipe aja. Fonte: Anders Drachen, Pejman Mirza-Babaei e Lennart Nacke (orgs.), *Games
User Research* (Oxford University Press, 2018, 31 capítulos de vários autores); os itens `GU#` são
deste livro (numeração minha, por tema). **Aprofunda** a ferramenta `06` (que vem de Schell): aqui
está o **procedimento** de cada tipo de teste. Complementa `05` (experiência), `16` (motivação),
`24` (UX/UI) e `26` (análise de jogos, que estuda jogos prontos; esta estuda **jogadores**).

> O livro é de 2018 e focado em estúdios de jogos comerciais (consoles, PC, celular, F2P). Adaptei ao
> contexto de **jogos teológicos pequenos** (equipe de uma ou poucas pessoas, grupos de igreja,
> célula, escola bíblica). Onde o livro fala de monetização, retenção ou KPI, uso só a lógica de
> diagnóstico, **não** o objetivo (ver "Ressalvas").

## 1. O que é e para que serve

**GU1. Pesquisa de jogador ≠ teste de erros.** QA caça defeitos de código; a pesquisa mede se a
**experiência pretendida chega ao jogador**: usabilidade, compreensão, dificuldade, emoção. Trate o
design como **hipótese** (Ambinder) e o teste como o meio de descobrir onde ela falha. O papel é
dizer, com evidência, onde "o bebê é feio".
**GU9. Só vale a pergunta acionável.** Antes de perguntar, imagine as respostas possíveis e veja se
mudariam algo ("quando soubermos, o que faremos?"). Descarte perguntas de **curiosidade** (nada a
fazer) e de **salto de fé**; reescreva até virar decisão. Exemplo do livro adaptado: não "quantos
usaram a dica?", mas "**quem usou a dica entendeu o versículo?**".

## 2. Modelo de camadas para diagnosticar (GU12, GU13)

Problema na camada de baixo **aparece em cima**. Diagnostique de baixo para cima:

1. **Apelo**: a pessoa quer abrir/começar? (título, imagem, promessa)
2. **Compreensão**: entende as regras, o que fazer, o que está disponível?
3. **Usabilidade**: consegue fazer o que entendeu (toque, leitura, navegação)?
4. **Experiência**: sente o que o jogo pretendia (tensão, descoberta, reflexão)?
5. *(Monetização: do livro, só para F2P; **não se aplica** aos jogos teológicos desta skill.)*

Para jogos de **formação**, acrescente uma camada própria, que o livro não traz (inferência minha):
**6. Aprendizado/fidelidade**: a pessoa **saiu entendendo o texto** como ele é, e não uma versão
distorcida? Teste isso por **explicação com as próprias palavras** (GU21), nunca por "gostou?".

## 3. Escolher o método (GU7, GU8, GU11)

| Pergunta | Método | Quando | Custo |
|---|---|---|---|
| "As pessoas entendem e conseguem usar?" | **Usabilidade 1:1** com pensar-em-voz-alta (5–8 pessoas) | Protótipo em diante | Baixo |
| "Está consertado?" | **RITE** (corrige entre sessões) | Qualquer fase com build mexível | Médio |
| "O que as pessoas acham, em tendência?" | **Questionário** (20+; 500 para representar um público grande) | Beta | Baixo |
| "Por que fazem isso?" | **Entrevista** semiestruturada | Depois da sessão | Baixo |
| "O texto narrativo se entende?" | **Usabilidade narrativa**: ler o roteiro/protótipo antes de implementar | Pré-produção | Baixo |
| "Como os menus devem se agrupar?" | **Ordenação de cartões** | Design de navegação | Baixo |
| "Cumpre princípios conhecidos?" | **Avaliação heurística** (PLAY/GAP, GU37–GU40) | Protótipo, sem jogadores | Baixo |
| "O que fazem em casa/em grupo?" | **Diário**, observação em contexto | Jogo já utilizável | Médio |
| "O que fazem, em números?" | **Telemetria** (só diz o quê, não o porquê) | Com público | Alto |
| "Qual versão funciona melhor?" | **A/B** | Muito público | Alto |

**Grupo focal** serve para **ideias**, mas é ruim para dados fiéis de uso ou de atitude (as pessoas
se influenciam). Auto-relato não diz o porquê; observação diz **onde trava**; combine métodos
(triangulação, GU24).

## 4. Montar a sessão (GU2, GU5, GU43–GU46)

- **Um objetivo por sessão**, escrito como pergunta e sub-perguntas em três eixos (GU25): **clareza**
  (sabe o que fazer?), **orientação** (sabe onde ir?), **dificuldade** (consegue?).
- **Brief de pesquisa** de uma página: público, objetivos, prazo, achados anteriores (GU5).
- **A build serve para a pergunta?** Se o tutorial não existe, não teste compreensão do tutorial.
  "Não testar" é opção; **adiar é melhor que cancelar**.
- **Ritmo curto**: preparar (≤4 dias), executar (1–2), analisar (1–4), relatar (1–5). **Achado com mais
  de ~5 dias envelhece** porque o jogo mudou (GU2). Um estudo a cada duas semanas é bom ritmo.
- **Quantas pessoas**: usabilidade ~5–8 por rodada, **repetida**; apreciação 20+; representar público
  grande 500 (GU16, GU44). Poucas pessoas **mostram problemas**, não **medem gosto** (GU14).
- **Recrutar**: gente que tem o hábito/perfil do público (evitar quem trabalha com jogos); rede
  própria, grupo da igreja, escola; manter lista de interessados (GU44). **Não** use amigos e
  família como única fonte (GU50).
- **Espaço**: quieto, privado, só participante e um pesquisador; não o abandonar sozinho (GU31,
  GU44). Fones de ouvido; mesmo aparelho para todos (GU50).

### Roteiro de uma sessão de 1 h (do livro, GU13, GU22)

| Tempo | O que fazer |
|---|---|
| 5 min | Boas-vindas, consentimento, "testamos o jogo, não você"; perguntas fáceis que confirmam o perfil (GU22) |
| 40 min | Jogar **sozinho**, pensando/falando em voz alta; pesquisador observa e anota; só "continue falando" |
| 15 min | Entrevista final (seção 5) |

## 5. Perguntar bem (GU15–GU24)

**Questionário (GU15–GU19)**
- Uma pergunta, **uma ideia** (nada de "e"); sem pergunta que sugere a resposta; **sem "não sei"**
  (use um campo aberto opcional); escala com **ponto médio**; cuidado com **desejabilidade social**
  (anonimato; o criador não aplica); **hipotéticas não predizem** ("usaria?" não vale).
- Poucas perguntas: abandono cresce; **uma aberta por faceta** basta.
- Instrumentos validados (GEQ, PENS, IMI, PANAS, SAM, PXI) permitem comparação; alterar o
  instrumento reduz a comparabilidade (GU18). Para formação, **PENS** (autonomia, competência,
  relação) e **IMI** (interesse/prazer) são os mais próximos do espírito desta skill.
- Limpeza: respondeu depressa demais, mesma opção em tudo ("linha reta"), duplicado, abertas sem
  sentido, checagem de atenção e de seriedade no fim (GU19). Mediana, não só média.

**Entrevista (GU20–GU24)**
- Roteiro impresso, semiestruturado. Perguntas finais: *o que achou? o que gostou? o que não
  gostou? algo mais difícil ou confuso do que esperava? se pudesse mudar uma coisa? algo que não
  perguntei?*
- **Verifique compreensão, não pergunte "entendeu?"**: peça "**explique como funciona**" (ou, em
  jogo teológico, "**conte com suas palavras o que essa cena diz**") e compare com a definição da
  equipe (GU21).
- Não induza: "o que fez você pensar isso?" denuncia erro; use "como você sabe isso?" (GU23).
- **Perguntar muda o comportamento**: não repita perguntas no meio da sessão; respostas lembradas
  podem ser **mentiras involuntárias** (racionalização), sonde logo após o evento.
- Quando a pessoa **projeta** ("para criança seria confuso"), volte: "e para você?". Se o público é
  criança, **teste com crianças** (GU23).
- Insista até a **causa e o impacto**: "controles ruins" não basta; "por quê?", "o que isso causou?".

## 6. Observar e anotar (GU25–GU29)

- **Dois papéis** (moderador e anotador) sempre que possível; quem anota enquanto conversa deixa a
  pessoa constrangida.
- **Anote o mínimo**: palavra-chave, sem adjetivos, com **etiqueta de gravidade**; não registre o que
  não responde ao objetivo.
- Cada evento: **quem, o quê, onde, quando, por quê, como**, mais **causa** e **impacto**; separe
  **observação**, **suposição** e **fala do jogador** (cores/etiquetas).
- Organize por **tempo** (jogo linear), **lugar** (mundo aberto) ou **categoria** (onboarding,
  orientação, balanceamento). Mapa mental ajuda a agrupar; depois **reúna, organize e agregue** os
  eventos em problemas gerais.
- Cuidado com **vieses do observador** (interpretação, expectativa, confirmação). **Sinais de
  frustração podem ser imersão**: valide com a pessoa (GU28).
- **Regra de não intervir** combinada antes (ex.: "se está há menos de 5 minutos tentando, não
  ajudo"), para não perder o dado nem quebrar o fluxo (GU50).

## 7. Pensar em voz alta e variantes (GU30–GU34)

- Mostra o **porquê**; em jogo, **o objetivo não é eliminar o desafio**, é achar onde vira frustração.
- Quem conduz deve ser **independente**; diga que não participou da criação (GU31).
- Limites: custo cognitivo, fala mais lenta que o pensamento, a pessoa **cala justamente nos
  trechos difíceis**; melhor em jogos lentos, de leitura e de decisão (a maioria dos jogos
  teológicos) do que em jogos de reflexo.
- **Retrospectivo**: joga sozinho e comenta o vídeo depois; sessões ≥ 2×; risco de racionalização.
- **Crianças** (GU34): "**falar** o que faz" em vez de "pensar em voz alta"; atenção a falas
  espontâneas, inquietação e "quanto falta?"; sensíveis a perguntas indutoras.

## 8. RITE: achou, conserte (GU35, GU36)

Filosofia: **corrija assim que o problema e a solução estiverem claros** e **os tomadores de decisão
assistem à sessão**. A cada pessoa (ou a cada dia): analisa, muda, testa de novo com a seguinte para
ver se resolveu **sem criar outro problema**. Requisitos: quem decide está presente; dá para mudar em
horas; pesquisador conhece o domínio. Prático: planilha **problemas × participantes**, registrar o que
mudou e quando, guardar versão entre mudanças, poucas sessões por dia. **Conteúdo de texto muda em
minutos** (JSON): jogos narrativos são ótimos candidatos.

## 9. Heurísticas (PLAY e GAP) como revisão sem jogadores (GU37–GU40)

- **PLAY**: 54 heurísticas em 5 categorias: jogabilidade, imersão/engajamento, usabilidade/mecânica,
  experiência do novo jogador, imersão na história. **GAP**: 27 princípios de acessibilidade para
  novatos. Versão atual no site dos autores (userbehavioristics.com).
- **Cheque rápido** (parafraseado; meu resumo): objetivos claros a cada momento; meta geral cedo +
  metas curtas; **ensinar a habilidade antes de exigi-la**; prática **sem punição**; jogador percebe
  o efeito do que faz; controles consistentes; status visível sem atrapalhar; **sem carga de
  memória**; controles básicos simples e expansíveis; navegação consistente e minimalista; prevenir
  erro; ao reabrir, informação para continuar de onde parou; acesso a níveis de habilidade.
- **Dois modos**: **indutivo** (joga e anota violações) e **dedutivo** (percorre a lista). Use os dois.
  São **diretrizes, não regras**; servem também de **linguagem comum** na equipe.

## 10. Relatar para a equipe agir (GU41, GU42, GU2)

- **Relato é tão importante quanto o achado**: achado mal comunicado vira "dado" e é ignorado.
- Seções: **objetivo** (a pergunta), **método** (o que testou, com quem, qual versão), **resumo com
  gravidade** (onde, frequência, impacto), **achados** (problema, onde, **por que**; vídeo/citação
  como prova), **próximos passos** (rever correções, nova métrica, foco do próximo teste).
- Formatos: **nota curta** em 1 dia ("top-liner"); **relatório** em 3–5 dias; **oficina** de 1–2 dias
  para decidir juntos; **tickets** no quadro do projeto; **planilha** colorida (jogo linear);
  **gráfico de experiência** (curva de interesse por momento, ver `05`).
- **Mostre a equipe ao vivo**: "sem 'vou ver o vídeo'". Quem vê a pessoa travar muda de ideia.
- O relatório aponta **problemas e causas**; **a solução é do designer** (debate do livro, GU42).

## 11. Vieses e validade (GU49, GU50)

Nenhum teste é perfeitamente ecológico; conheça os vieses do seu:

- **Falso positivo**: problema criado pelo teste (poucos itens na build). **Falso negativo**: não
  viu porque os testadores já sabiam (viram o anúncio, conhecem o autor).
- **Validade depende do objetivo**: build incompleta serve para usabilidade, não para "gosto geral".
- Cuidados: perfil (especialista × novato), **idioma e jargão** (defina "salmo responsivo",
  "tipologia", "exegese" em termos simples), **recompensa por participar independe do desempenho**,
  nada de ver a tela do outro, **ambiente neutro** (priming), mesmo aparelho, **pressão social**
  (não é concurso; "se deu errado, provavelmente é o jogo").

## 12. Orçamento enxuto, passo a passo (GU43–GU46, GU2)

1. Escreva **1 objetivo** e 3 perguntas (seção 4).
2. Recrute **5 a 8** pessoas do perfil (não do projeto).
3. Sessão de **1 h** (seção 4), **uma pessoa por vez**, com pensar-em-voz-alta e entrevista.
4. Anote com o formato da seção 6, em **uma planilha** (problemas × participantes).
5. Marque **gravidade** e **causa**; **conserte o óbvio** antes da pessoa seguinte (RITE).
6. **Nota curta** no mesmo dia; **backlog** de problemas na lista do projeto; **re-teste** na
   semana seguinte com outras 5 pessoas.
7. Só depois, se houver público, um **questionário** curto (20+).

## 13. Públicos especiais (GU47)

Idosos, crianças, pessoas com deficiência: o livro mostra quatro casos. Regras que valem para
qualquer jogo teológico em comunidade:

- **Envolva o especialista da área** (professor, terapeuta, cuidador) e **adapte o desafio** à
  capacidade; texto grande, contraste, sem cronômetro (`24`).
- **Questionário padrão pode falhar**: dê tempo, vocabulário simples, apoio; complete com
  **observação** e métricas.
- **Jogo em grupo expõe diferenças**: pessoas podem se sentir vulneráveis ao ver o desempenho dos
  outros; ofereça modo **individual** e **sem placar** (alinha com `07`, `11`).
- **Consentimento adaptado**: escrito com o responsável + **assentimento** oral de quem participa;
  respeite a **recusa de gravação**; explique o que será feito com os dados.
- **Cuidado com co-design de fachada**: pessoas raramente reclamam; não as use apenas como "recurso".
- **Confiança leva tempo**: relação de longo prazo com o grupo vale mais que visitas rápidas.

## 14. Por que as pessoas jogam: perfil de motivação (GU48)

Modelo Quantic Foundry (≥250 mil jogadores): **12 motivações em 6 grupos**: **Ação** (destruição,
excitação); **Social** (competição, comunidade); **Maestria** (desafio, estratégia); **Realização**
(completar, poder); **Imersão** (fantasia, história); **Criatividade** (design/expressão,
descoberta). Serve de **vocabulário comum** e de teste: o jogo teológico está atendendo **Imersão
(história)**, **Maestria (estratégia/reflexão)** e **Criatividade (descoberta)**, que combinam com
estudo, e **evitando** Realização/Poder e Competição, que puxam padrões de `07` e `16`. Use como
**pergunta**, não como rótulo de pessoas.

## 15. Aplicação teológica (inferências minhas)

- **Teste a fidelidade, não só a diversão**: "explique com suas palavras" + comparação com o texto
  (`21`) revela a distorção que o jogo causa (ex.: "então Deus abandona quem erra?").
- **Teste a leitura do texto**: usabilidade narrativa (GU8) com o **roteiro impresso**, antes de
  programar, evita refazer cenas.
- **Perguntas pastorais**: o jogo causa **vergonha, ansiedade ou comparação**? Pergunte a pessoas
  vulneráveis (adolescentes, recém-chegados); é um risco que o livro cobre só em parte (GU47).
- **Pessoas em fé frágil** testando conteúdo sobre dúvida, culpa ou sofrimento: **avise** o que
  vem, ofereça **sair a qualquer momento** e **não registre** nomes (`07`).
- **Quem conduz o teste** não deve ser o autor, nem o pastor que a pessoa teme contrariar.
- **Cuidado com "gostou?"**: em formação, gosto não é o alvo; combine com aprendizado (camada 6).

## 16. Ressalvas

- **Profundidade de leitura**: ver `livros.md`, seção 22 (cap. 1–3, 7–14 e 18 lidos; 5, 15, 22, 24,
  25, 27 e 28 em parte; 4, 6, 16, 17, 19–21, 23, 26, 29–31 só passados).
- Estudos citados são de **jogos comerciais**; números de amostra (5, 20, 500) são **regras de
  bolso** dos autores, não leis. O livro admite que nem sempre há validade estatística.
- **Monetização, retenção e KPI** do livro (F2P, métricas de venda) **não** são objetivos nesta
  skill; técnicas de **diagnóstico** (onde a pessoa para, o que não entende) servem, **a lógica de
  maximizar gasto não**.
- Telemetria e biometria exigem **dados pessoais**: em contexto de igreja, só com consentimento
  claro e mínimo de coleta; prefira **observação e conversa** (`07`, `08`).
