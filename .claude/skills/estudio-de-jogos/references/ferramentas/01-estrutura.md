# Ferramenta 01: Estrutura do jogo

> **Pipeline:** fase principal **F1** (`../pipeline/F1-ideia-e-formato.md`).

Para decidir o que o jogo é, o que o sustenta e como o projeto avança. Fonte principal:
Schell, *The Art of Game Design* (3ª ed.). Os números `#N` são as lentes do livro.

## Princípios

**P1. Os quatro elementos têm o mesmo peso (Tétrade Elemental, #9).**
Todo jogo é feito de mecânica, história, estética e tecnologia. Nenhum é mais importante; cada um
muda os outros. Quem decide só pela mecânica (ou só pela história) projeta com uma perna só.
*Faça:* para cada decisão, pergunte o que ela muda nos outros três elementos.

**P2. Veja a pele e o esqueleto ao mesmo tempo (Design Holográfico, #10).**
A "pele" é a experiência do jogador; o "esqueleto" são os elementos que a causam. Só pele: você sente,
mas não sabe consertar. Só esqueleto: estrutura bonita que na prática é ruim.
*Faça:* ao achar um problema, descreva a sensação e aponte qual elemento a causa.

**P3. Um tema unifica tudo (Unificação, #11).**
Passo 1: descubra o tema. Passo 2: reforce-o por todos os meios possíveis (texto, cor, som, interface,
regra). O tema vira o critério de corte: reforça o tema, fica; não reforça, sai. Temas baratos de
reforçar (uma frase, uma cor, um som) contam tanto quanto os caros.

**P4. Prefira temas que ressoam (Ressonância, #12).**
Há dois tipos: baseado em **experiência** (viver uma fantasia) e baseado em **verdade** (uma afirmação
profunda em que as pessoas creem). Histórias que sobrevivem milênios costumam esconder um tema de
verdade. Você não descobre o tema ressonante só por lógica: precisa senti-lo e ouvir a si mesmo.

**P5. Comece pela experiência essencial (#2).**
Pare de pensar no jogo e pense na experiência do jogador: qual é, o que é essencial nela, como o jogo
captura isso.

**P6. Declare o problema que o jogo resolve (#14).**
Que problema real (do jogador) o jogo resolve? Quais suposições você fez que não têm a ver com o
propósito? Um jogo é mesmo a melhor solução? Como saber que resolveu? Uma declaração clara de
problema acelera tudo.

**P7. Passe o projeto pelos oito filtros (#15).**
O desenho só está pronto quando passa por todos sem exigir mudança: (1) parece certo? (2) o público
gosta o bastante? (3) é bem desenhado? (4) é novo o bastante? (5) vai vender/se sustentar? (6) é
tecnicamente possível? (7) cumpre as metas sociais/comunitárias? (8) os playtesters gostam?

**P8. Cace o risco, não confirme a esperança (Mitigação de Risco, #16).**
Liste o que pode impedir o jogo de ser ótimo e planeje protótipos para derrubar os maiores riscos
primeiro.

**P9. O brinquedo vem antes do jogo (#17).**
Se o jogo não tivesse meta alguma, seria divertido de mexer? As pessoas querem interagir antes de
entender o objetivo? Construa o "brinquedo" primeiro.

**P10. Verifique a paixão (#18).**
Ao fim de cada protótipo, pergunte se ainda há paixão pelo projeto. Se não voltar, o trabalho
provavelmente deve ser outro.

**P11. Desenhe a curva de interesse (#68 a #72).**
Toda experiência é uma série de momentos. Uma boa curva tem: expectativa inicial, **gancho**, interesse
que sobe com pausas de descanso, **clímax** maior que tudo, e termina deixando vontade de mais. A
curva é **fractal**: o jogo, cada fase e cada desafio têm a sua. Interesse = interesse inerente (risco,
mudança dramática, o incomum) + poesia da apresentação (beleza) + projeção (o jogador se coloca na
cena). *Faça:* liste os 10 melhores momentos; desenhe a curva; peça aos playtesters para desenharem a
deles e compare.

**P12. Pense no local onde se joga (Venue, #3).**
Onde, com quem, por quanto tempo: celular no ônibus, tablet num grupo de estudo, PC em casa. O local
muda a mecânica, a duração e a interface.

**P13. Itere em ciclos (Regra do Loop, cap. 8).**
Pense numa ideia, teste, avalie, repita. Quanto mais ciclos, melhor o jogo. Dicas de protótipo:
1. Cada protótipo responde a uma pergunta.
2. Esqueça a qualidade; é para aprender.
3. Não se apegue ao protótipo.
4. Priorize os protótipos pelos maiores riscos.
5. Faça protótipos em paralelo.
6. Não precisa ser digital (papel funciona).
7. Não precisa ser interativo.
8. Escolha um motor de ciclo rápido.
9. Construa o brinquedo primeiro.
10. Aproveite toda chance de dar mais um ciclo.

## Checklist rápido

- [ ] Transformação em uma frase (veja 07).
- [ ] Tema/experiência essencial em uma frase.
- [ ] Os quatro elementos nomeados (mecânica, história, estética, tecnologia).
- [ ] 10 momentos-chave e curva de interesse esboçada.
- [ ] Lista de riscos e o primeiro protótipo que ataca o maior.

## Acréscimos de Sylvester (*Designing Games*, cap. 1 e 10)

**S1. Jogo = sistema artificial para gerar experiências.**
Cadeia: mecânicas (com a ficção por cima) interagem e geram eventos; eventos disparam gatilhos
emocionais; emoções se fundem numa experiência. O designer projeta o sistema, não os eventos.
*Faça:* pense no jogo como "motor de experiência", não como história ou filme.

**S2. A emoção nasce da mudança de um valor humano.**
Valor humano é algo importante que muda de estado: vida/morte, vitória/derrota, amigo/inimigo,
status baixo/alto, juntos/sozinhos, liberdade/escravidão, conhecimento/ignorância. Importa a
implicação do evento, não o evento (perder um peão no início ≠ no fim). Antecipar a mudança também gera
emoção, e **revelar informação equivale a mudar**; valor já "travado" esvazia o momento.
*Faça:* para cada momento-chave, nomeie o valor humano que muda (ou está em risco).

**S3. Há muitos gatilhos além da "diversão".**
Aprendizado e *insight* (peças antigas que de repente fazem sentido), arco de personagem, desafio,
interação social, aquisição, música, beleza, ambiente, espetáculo, tecnologia nova, ameaças primais.
Espetáculo e tecnologia são rasos e caros; reforçam, não sustentam.

**S4. A emoção é uma caixa-preta.**
O jogador explica o "porquê" errado e racionaliza (ponte de Capilano). Não aceite "gostei por causa de
X" sem testar. Use observação e métricas (06).

**S5. Ficção e mecânica se somam; fundi-las é o ápice do ofício.**
A ficção dá uma segunda camada de sentido (um robô vira "mulher que é robô"). Não existe "imersão
total": ninguém esquece que joga (falácia da imersão). Mecânica faz tensão, triunfo e social; ficção
faz humor, assombro e empatia. Elas interferem (clichês justificam mecânica); projete como um sistema
único de significado.

**S6. Imersão = a experiência do jogador espelha a do personagem.**
Receita: fluxo tira o mundo real da mente; a mecânica gera excitação; a ficção **rotula** essa
excitação com o sentimento do personagem (excitação do combate vira "medo" por causa dos zumbis).

**S7. Misture emoções de propósito.**
Emoção pura (vários gatilhos para a mesma), justaposição (luto + violência), emoções antagônicas
(competição dura mata o riso social), atmosfera (fundo difuso) e variação de intensidade e
"valência". O pacing clássico pode ser **gerado por mecânica**, não só escrito.

**S8. Propósito e foco de valor.**
Todo jogo serve a um propósito, e isso afeta cada decisão. Poucos valores superiores vencem muitos
medíocres (veja 10, PL13).

## Acréscimos de Salen e Zimmerman (*Rules of Play*, Unidades 1 e 3)

**R1. A meta do design é o jogo significativo (*meaningful play*).**
O significado de uma ação reside na relação **ação → resultado**. Ele é significativo quando essa relação
é **discernível** (o jogador percebe o resultado imediato) e **integrada** (o resultado entra no sistema
inteiro e afeta o que vem depois). Uma corrida de decatlo que não pontua no resultado final não é
integrada. Veja o diagnóstico em 09, D11.

**R2. Design = criar um contexto que um participante encontra, do qual emerge significado.**
Os signos são interpretados e o contexto molda a interpretação; o significado de uma peça está na
relação com as outras, não nela. O designer cria contexto, não significado pronto.

**R3. Três enquadramentos aninhados: formal (regras), experiencial (play) e cultural (contexto).**
Cada um tem seus objetos, atributos, relações e ambiente; o formal é fechado, o cultural é aberto. Ao
projetar, nunca esqueça os outros níveis. *Faça:* para cada decisão, pergunte como ela se lê nos três.

**R4. Definição de jogo: sistema em que jogadores se engajam em conflito artificial, definido por
regras, com resultado quantificável.**
Quebra-cabeça é um jogo com resposta certa. Jogos de mundo aberto têm metas emergentes, não um único
resultado.

**R5. O círculo mágico e a atitude lúdica.**
O jogo acontece num espaço e tempo demarcados onde as regras criam significados especiais. A atitude
lúdica (*lusory attitude*) é aceitar as limitações das regras pelo prazer. Entrar no círculo e permanecer
nele são duas sedutoras tarefas (dupla sedução, veja 05).

**R6. *Play* é movimento livre dentro de uma estrutura mais rígida.**
Surge por causa dela e em oposição a ela. **Play transformador** é o que altera a própria estrutura.
Eixo de Caillois: *agôn* (competição), *alea* (acaso), *mimicry* (simulação), *ilinx* (vertigem), do
regrado (*ludus*) ao livre (*paidia*).

**R7. Design é de segunda ordem.**
O designer projeta as regras diretamente e a experiência só indiretamente (também em 03).

**R8. Quatro modos de interatividade (veja 09, D12).** Cognitiva, funcional, explícita e além-do-objeto.

## Acréscimos de Rogers (*Level Up!*, cap. 2, 4 e 9)

**LU55. Realização de desejo.**
Bons jogos fazem o jogador sentir o que não sente na vida real (poder, esperteza, heroísmo, riqueza).
Pergunte qual desejo o seu jogo realiza e se ele combina com a transformação desejada (07).

**LU56. Público definido cedo corta decisões.**
Casual ou dedicado, idade e duração de sessão. Crianças querem o que parece feito para mais velhos;
não simplifique o tema, simplifique controles e texto.

**LU57. A "experiência" (gestalt) como página do documento.**
Descreva o todo: o que o jogador vê primeiro, que emoções, como som e menus reforçam. Veja 13
(one-sheet e ten-pager).
## Aplicação a jogos teológicos (síntese minha, não é do livro)

- O tema de um jogo bíblico geralmente é **de verdade** (ex.: "a graça alcança quem não merece"). Isso
  é o que o livro diz resistir ao tempo; escreva-o em uma frase e use como critério de corte.
- A curva de interesse de uma passagem bíblica muitas vezes já existe no texto (tensão, crise,
  resolução). Mapeie primeiro a curva do texto; depois decida onde o jogo deixa o jogador agir.
- O problema (P6) deve ser do jogador, não do texto: "como fazer alguém sentir o peso de X?" em vez de
  "como ensinar X?".
