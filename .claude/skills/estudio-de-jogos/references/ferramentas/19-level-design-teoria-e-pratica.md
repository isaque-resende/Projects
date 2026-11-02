# Ferramenta 19: Level design, teoria e prática (Kremers)

> **Pipeline:** fase principal **F4** (`../pipeline/F4-experiencia-arte-e-nivel.md`).

Para projetar **como o jogador encontra as regras**: a fase, o capítulo, o cenário. É a parte do
trabalho que transforma uma ideia (regras, passagem bíblica) em um percurso jogável. Fonte: Kremers,
*Level Design: Concept, Theory, and Practice* (A K Peters/CRC, 2009), lido por inteiro, **exceto** que
os cap. 10, 11 e 15 (visual, áudio e IA) foram lidos em trechos centrais e não na íntegra. Os itens
`LD#` são deste livro. Complementa `13-niveis-e-documentacao.md` (Rogers), `14` (elementos formais),
`15` (narrativa), `16` (motivação) e `09` (decisões e fluxo). Obs.: o livro é de jogos de ação e
aventura (3D); aproveitei os princípios, não os exemplos.

## Parte I. O que é level design

**LD1. Level design é game design aplicado.** O designer de jogo escreve as regras; o designer de fase
decide **como o jogador as encontra**. São codependentes: "mau level design arruína um bom jogo; bom
level design não salva jogo ruim". Lembre-se de que um *brinquedo* deixa o jogador criar as regras.

**LD2. Defina a meta antes do conteúdo.** *Definição de sucesso* (o que esta fase deve realizar?) em nível
de jogo, de fase e de momento. **Metas externas** (comerciais, artísticas, educativas, de marca) e
**internas** (empoderar, ensinar a se divertir, não quebrar a suspensão de descrença, dar sensação de
conquista, recompensar exploração). Tudo o mais é subordinado.

**LD3. Hierarquia por quê, o quê, como.** Jogo: sucesso → metas externas → metas internas → game design →
level design → técnica, arte e áudio. Fase: metas → estrutura → metas por fase → cenários → momentos →
ações. Pergunta de ouro por componente: **"qual é a função disto?"** (permite trocá-lo, escalar e
planejar contingência). "Seria legal se...?" precisa justificar sua presença.

**LD4. Fator X.** O jogo bom é mais que a soma das partes; falhas pontuais são perdoadas quando tudo serve
às metas e tem relevância cultural.

## Parte II. Ensinar e testar

**LD5. O jogo é um mecanismo de ensino.** Aprender (praticar em segurança) é recompensado com prazer
(Koster: "aprender é a droga"). **"Bom level design ensina o jogador a jogar e a gostar do jogo."** Ensino
sem teste não tem propósito; *testar não é desafiar*.

**LD6. O que ensinar.** Habilidades e limites do personagem; física e escopo do mundo; NPCs; metas e
regras principais; estratégias de sucesso (prescritas ou informais).

**LD7. Faça.** Ensine por exemplo prático, pratique logo; reforce positivamente; prepare de forma justa
(ambiente seguro antes da prova; sem morte súbita não anunciada); lições indulgentes. **Não:** comece com
falha, zombe, exija habilidade que nunca ensinou (chefe que muda as regras).

**LD8. Padrões de ensino.** *Portão de habilidade* (praticar para sair do beco); *ensinar por exemplo*
(observar à distância segura, com as mesmas regras do jogador); *tutorial aberto x encoberto* (manter
imersão: o teste do traje no Halo); *ensinar por experimento* (objeto de usos múltiplos em zona segura,
opcional).

## Parte III. Estrutura e documentação

**LD9. Estrutura.** *Linear* (controle de ritmo; risco de futilidade e imposição), *semilinear*
(gargalos físicos ou condicionais; ilusão de liberdade; risco de incoerência), *não linear*
(propriedade do jogador; difícil de testar; exige interatividade e profundidade).

**LD10. Documentos.** Mapa anotado (salas numeradas com necessidades de arte, som, código; perigo:
monólito), **fluxograma** (condicional; sem emoção nem ambiente), **pirâmide de Freytag** (exposição,
ação ascendente, clímax, ação descendente, desfecho) como **análise e visualização**, não como forma
obrigatória, e **diagrama de eventos** (tipo, duração, cronologia, impacto; o impacto medido em teste
corrige o previsto; escolha o fator certo: susto, ação, reflexão).

**LD11. Orientado a objetos.** Encapsulamento (módulo repetível), herança (baú → armário), polimorfismo
(mudar o comportamento em todos); perigo: repetição ("fases-biblioteca"). **Design denso:** reuso de espaço
no tempo e em camadas; ganhos de ativos, de jogabilidade e de imersão; perigos: confusão e falta de
legibilidade.

**LD12. Gramática compartilhada.** Convenções de gênero formam uma linguagem; **consistência**: se a
convenção vale, vale sempre, ou o mundo parece arbitrário e injusto. Solo: controle e risco de bloqueio;
multi: cooperação, "elemento humano", confiança.

## Parte IV. Recompensa, imersão e emoções negativas

**LD13. Sistemas de recompensa.** Escapismo e realização de desejo (legítimos), submissão e liberação
(aceitar ser guiado com acordo claro), desafio e empoderamento, **justiça**, investimento e retorno,
reforço social e solidão temporária, adversidade e **catarse**.

**LD14. Contrato com o jogador.** Recompensa proporcional ao esforço; variar para não virar *grind*;
evitar frustração ("interessante, não difícil"); tutorial ensina, não pune; submissão encoberta (não
repetir, não usar arbitrariamente, não revelar que foi truque); simulação = **imitação agradável**
(exatidão só em *serious games*). Empoderar: "manipular o jogo a favor", justiça, permitir "trapacear".

**LD15. Catarse e suspense.** Desafio excepcional com motivação, jogabilidade não arbitrária e
estratégias viáveis; resolução suspensa; liberação recompensadora. **Risco e ética:** manipulação
emocional forte exige responsabilidade.

**LD16. Imersão.** Suspensão de descrença = "engano benigno" **consentido**. Fluxo (8 elementos; canal de
desafio e habilidade). **Dar o que o jogador quer, ou reter para depois entregar.** Enraizamento
histórico (camadas de tempo, efeito de um evento passado), **lógica interna** consistente, evitar
barreira invisível, IA que trapaceia, deus ex machina e quebra da quarta parede. Ambiência (sons, luz,
adereços, vida) e atmosféricos (música, narração, iluminação, câmera, escala). A pergunta "o jogo pode
sair sem isso?" é a errada: **imersão faz parte da jogabilidade**.

**LD17. Emoções negativas com propósito.** "Risco irreal" permite enfrentar o medo em segurança; o
**pacto** (a provação paga com recompensa digna); choque como foco; perda emocional (Ico: construir o
apego e depois separar). **Perigos:** rejeição, exagero, ética, tornar a jogabilidade negativa; erro
claramente comunicado; nada arbitrário.

## Parte V. Mundo, história e jogabilidade

**LD18. Narrativa de jogabilidade (gameplay narrative).** A "história" do jogo é a **soma das ações do
jogador**; o designer entrega focos dramáticos, marcadores e ferramentas, não um roteiro fixo.
Agência: decisões onde há impacto dramático; narrativa emergente (o desperdício anterior alimenta a
sobrevivência); *set pieces* acionados por condições, não por hora. Quem faz melhor: aventura, ARG
(*TINAG*, ficar em personagem), RPG de mesa (o mestre é o level designer).

**LD19. Ritmo (pacing).** Curva de desafio (o "learning curve" é mal nome), conectividade, **bounce**
(obstáculo que obriga a voltar), linear, laços, sandbox, **stickiness** (áreas opcionais pegajosas),
empurra e puxa, medo, pressa, tempo, física, IA, puzzles. **Espaço vazio é parte do jogo** (as notas
de Miles Davis; nunca ceda a "algo a cada dois segundos").

**LD20. Construção de mundo.** Detalhe e símbolos que servem ao **tema**; relevância (simulação);
sugestão (uma coluna basta; *closure*: a mente completa), "ser lá" em vez de saber onde. Regras do mundo
(design, mecânicas, plataforma) e conteúdo (pickups, adereços, roteiros, atores). **Lógica interna
fabricada** pelas regras da fase (plataforma próxima = alcançável; longe = interruptor). **Detalhe
implícito** (janela com cartazes). **Memorável:** set pieces, adereços, "dar caráter" (textos,
estruturas, mistérios).

**LD21. Interatividade só vale se significativa.** "Mega Tetris": mais interatividade, pior jogo.
Escolha interessante x arbitrária (T com duas saídas iguais x risco e recompensa diferentes);
consequências relevantes; **recompensas formais** e o efeito caça-níquel (reforço intermitente: ética,
crianças); exploração como recompensa sem punição.

**LD22. Puzzles.** Teste formal, portão, funil, condutor de informação (para o designer e para o
jogador), recompensa de exploração, ritmo (sorvete entre pratos) e modularidade. Perigos: portão
absoluto e *fetch* (busca que dispara outra). Puzzle investigativo (componentes espalhados que o jogador
junta); ritmo escolhido pelo jogador.

**LD23. Desafio.** Convite formal à habilidade; dificuldade é subjetiva. "Desafio pelo desafio" gera
falta de sentido, ressentimento e dessensibilização. Frustração (letal) x tédio (subir dificuldade não
resolve). Exceções "masoquistas" avisam e têm público específico. DDA reativa tem dados limitados e age
depois do dano; prefira **dificuldade controlada pelo jogador** (gradiente de perigo e recompensa,
estilos de jogo, portões sinalizados). Injusto: morte não anunciada, exigência sem treino, memória
extensa, tempo curto, sem salvar, portas que fecham sem aviso.

**LD24. Visual e som (resumo).** Cada tomada carrega informação (o que mostra? o que sugere?);
câmera é ferramenta de design; escuridão e luz têm funções além de "susto" e "seguro"; escala;
estilo (estilizado envelhece melhor que realismo), sugestão, desvio de atenção; tema consistente.
Som: associações emocionais, reações primárias e culturais, diegético e não diegético, música dinâmica,
ambiência documental e psicológica, **dicas sonoras** que carregam informação, efeitos que não
escondem dicas, plano de áudio.

**LD25. IA (resumo).** O personagem controlado precisa de **motivos e metas** visíveis, independência
(tarefas autônomas) e complexidade percebida; empatia e antipatia; contexto adequado e limites
conhecidos (Eliza); a IA serve às metas da fase e não deve parecer trapaceira.

## Acréscimo (Totten): do princípio ao lugar

Kremers diz **o que** o nível deve fazer (metas, ensinar e testar, estrutura). Totten mostra **como o
espaço faz isso**: chegada, limiar, cena, símbolos, luz, recompensa e tutorial. Ver
`20-level-design-arquitetonico.md` (AR1, AR10, AR19, AR20, AR35 a AR39). Para o primeiro nível/tutorial,
comece por AR35 a AR41.

## Aplicação a jogos teológicos (síntese minha)

- **Escreva a definição de sucesso por capítulo (LD2, LD3).** Ex.: "o jogador compreenderá por que a
  mulher samaritana volta à cidade". É a meta interna; todo componente tem função (LD3) e pode ser trocado
  por outro que cumpra a mesma função.
- **O capítulo ensina e testa (LD5 a LD8).** Pratique a habilidade de leitura (observar, comparar,
  situar) em ambiente seguro antes da "prova"; nunca exija o que a passagem não ensinou; teste = pergunta
  interpretativa com duas ou três respostas defensáveis, não exame de memória.
- **Estrutura semilinear (LD9).** O texto fixo é o tronco; os ramos são perspectivas. Use **gargalos
  condicionais** ("só avança quem considerou os três lados") e a ilusão de liberdade; diagrama de eventos
  para ver reflexão, narração e decisão em colunas.
- **Narrativa de jogabilidade (LD18).** Em jogo de estudo, a "história" que importa é o raciocínio do
  jogador; planeje **marcadores dramáticos** (versículos-chave) acionáveis por condição, e componentes
  dramáticos em qualquer ordem (evidências, referências) que formam a compreensão.
- **Bounce e stickiness (LD19).** A "volta" pode ser a releitura: um obstáculo que se resolve com um
  texto lido antes. Áreas opcionais "pegajosas" são contexto histórico e referências cruzadas, sem tempo
  limite. **Deixe espaço vazio**: pausa para a oração ou reflexão (LD19).
- **Catarse com responsabilidade (LD15, LD17).** Passagens de sofrimento (Jó, Getsêmani, cruz) pedem
  provação com sentido e liberação, mas **não use choque nem manipulação emocional** como técnica de
  efeito; o texto conduz. Pergunte: o jogador entra de livre vontade e sabe o que enfrentará? (ver 16,
  OC18).
- **Mundo por sugestão (LD20).** Uma coluna basta; só detalhe que serve ao tema; enraizamento histórico
  (camadas de tempo) com **fidelidade ao contexto** da passagem e rótulo do que é inferência.
- **Escolhas significativas (LD21).** Cada opção tem consequência percebida e **honra o texto**; se o
  jogador pode escolher "ser infiel", mostre a consequência dentro do relato.
- **Sem desafio pelo desafio (LD23).** Não vincule o avanço do estudo a habilidades de reflexo ou a
  puzzles arbitrários; deixe o jogador controlar a profundidade (camadas opcionais), evite perder
  progresso e punir.
- **Reforço intermitente (LD21).** Evite loteria e caixas surpresa como motivador (ver 07 e 16).
- **Seguro e consentido (LD16).** Anuncie o que o jogo faz; a "suspensão de descrença" é um acordo, não
  uma armadilha.
- **Consistência de convenções (LD12).** Defina cedo o significado de ícones, cores e sons (texto bíblico
  contra comentário) e mantenha.
