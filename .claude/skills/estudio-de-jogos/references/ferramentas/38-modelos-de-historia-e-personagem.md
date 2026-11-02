# Ferramenta 38: Modelos de história e de personagem (Crawford)

> **Pipeline:** fase principal **F2** (`../pipeline/F2-conteudo-e-historia.md`); também usada em F3.

Para **construir história interativa como sistema**: tratar história como **verbos e relações**, e não
como árvore de escolhas; modelar **personagens** (traços, relações, humor), **eventos**, **fofoca**
e um **gestor de drama**. Fonte: Chris Crawford, *Chris Crawford on Interactive Storytelling* (2ª ed.,
New Riders/Peachpit, 2012; 21 capítulos). Os itens `CC#` são meus (numeração por tema; **tudo em
paráfrase**). Complementa `37` (propriedades do meio e autoria procedimental), `22` e `23` (tipos de
história interativa e participação), `15` (design narrativo) e `09` (decisões). Fecha em parte a
lacuna L10 de `lacunas-e-fila-de-livros.md` (diálogo e personagem como sistema).

> **Leitura:** li o **EPUB com texto limpo** (clarificou a versão de PDF com OCR ruidoso que usei
> antes): os capítulos 2, 3, 6, 7, 11, 12 e 15 **por trechos**, e **os títulos e subtítulos de todos
> os 21 capítulos**. Não li por inteiro os capítulos de **linguagem** (10), **ambientes de
> desenvolvimento e Erasmatron** (17 e 18), **pesquisa acadêmica** (19) e **parentes distantes**
> (20), nem as tabelas. O **código** abaixo é **meu**, testado em Node, e **não** reproduz o livro.

## 1. Interatividade é conversa (CC1 a CC4)

**CC1. Definição de trabalho:** processo **cíclico** em que dois agentes **escutam, pensam e
falam** alternadamente (a conversa humana é o modelo).
**CC2. A qualidade é um produto, não uma soma:** se **escutar**, **pensar** ou **falar** é fraco,
**tudo** cai.
**CC3. Interatividade não é participação:** participar de um evento (dançar com a música, empurrar
um carro) **não** é interagir. Interagir exige **ouvir, pensar e responder** de volta.
**CC4. Visão de segunda pessoa (second-person insight):** o autor interativo precisa **sair da
própria cabeça e entrar na do público**; é **empatia** com emoções que **você não sentiria**
(seu jogador pode reagir com raiva ao que você desenhou para a tristeza). Não suprima a reação do
jogador. **Três graus de interatividade:** **velocidade**, **profundidade** e **escolha** (cada
escolha precisa de **significado funcional**).

## 2. Por que a árvore e os atalhos falham (CC5 a CC9)

**CC5. Árvore ramificada é o erro de principiante**: o número de ramos explode, e cada ramo recebe
pouca história; boas histórias têm **centenas de decisões**, quase todas **pequenas** (como falar
com alguém, com que pressa), que definem o caráter.
**CC6. "Foldback" (dobrar de volta)**: religar ramos para o mesmo ponto parece dar mais decisões,
mas **as escolhas ficam sem significado** (os dois caminhos terminam igual): é **mentira
interativa**; **não existe combinação mágica** que conserte.
**CC7. "Histórias constipadas" e "mata quem desvia":** fazer o jogador seguir **um fio** e punir
quem sai dele; **jogos "historiados"** (história colada a um jogo que continua o mesmo).
**CC8. Estratégias ambientais**: **história emergente** a partir do mundo (3D vasto); o livro
mostra por que o **espaço sozinho** não faz história (a lacuna é **dramática**, não geográfica).
**CC9. Estratégias dirigidas por dados**: catálogos de **tipos de contos** (tipologia de
folclore, motivos) como **componentes**; útil como **inspiração e vocabulário**, não como
solução.

## 3. História como verbos (CC10 a CC14)

**CC10. Pensar em verbos, não em substantivos.** Histórias são sobre **ações e relações entre
pessoas**; **espaço** importa pouco ("o que fizeram"). A "contagem de verbos" no software cresce
com o tempo; um mundo de história precisa de um **repertório bem escolhido**.
**CC11. Tempo e espaço em histórias** são **comprimidos**: pulos, elipses, "enquanto isso"; o
sistema decide **o que mostrar e o que pular**.
**CC12. Abstração:** o autor expressa um **princípio** (justiça, traição) e o sistema produz
**instâncias** para o contexto (como o dinheiro passou de moeda a nota a saldo).
**CC13. Linguagem**: "se você não sabe dizer, não sabe"; língua natural é muito difícil; alternativas
**construídas** (menus de verbos, **frases montadas**, linguagens gráficas ou de figuras); **menus
parecem lentos**, mas eliminam o "não entendi".
**CC14. Escada de estratégias** do final fixo a mundos em que o enredo **emerge**; cada degrau dá
mais agência e **custa mais** ao autor.

## 4. Modelos de personagem (CC15 a CC21)

**CC15. Modelo = variáveis + equações.** Teste cada fórmula com **valores extremos** (muito
negativo, zero, muito positivo) de **todas** as entradas.
**CC16. Números limitados** (por exemplo, de -1 a 1): evitam explosão e facilitam misturar.
**CC17. Retornos decrescentes**: o n-ésimo mesmo gesto vale **menos**.
**CC18. Mistura (blend)**: interpolar entre dois valores conforme um traço.
**CC19. Cinco critérios para um bom modelo de personalidade (do livro):** **completo** (cobre o que
o enredo exige), **conciso** (poucas variáveis), **ortogonal** (variáveis sem sobreposição; é
**ideal a buscar**, não exigência absoluta), **ligado a comportamento** (cada variável **muda o que
a pessoa faz**) e **sem excesso de especificidade**.
**CC20. Tipos de variável:** **traços de primeira pessoa** (o que o personagem **é**: integridade,
temperamento), **relações** (o que ele **pensa do outro**: percepção de virtude, confiança,
poder) e **polaridade** (**unipolar**: de zero a máximo; **bipolar**: de -1 a +1).
**CC21. Inclinação = personalidade + contexto**; o personagem escolhe o verbo de maior inclinação.
**Humores** (raiva, medo) sobem com as ações e **mudam a inclinação**, quebrando laços infinitos
("socos eternos").

## 5. Eventos, fofoca e antecipação (CC22 a CC28)

**CC22. Evento = sujeito, verbo, objeto direto** (e, às vezes, indireto e opções): tudo é
registrado como evento; estruturas **planas** e **não recursivas** bastam e são mais **fáceis de
processar**.
**CC23. "Livros de história" e fofoca:** cada personagem tem um **registro** do que **sabe**; a
**fofoca** passa eventos adiante, com **motivos** (virtude, confiança, poder) para contar ou calar.
**CC24. Mentira** é um **evento que não aconteceu**, com os mesmos campos; o sistema rastreia quem
contou e quem sabe (**responsabilidade**), que age como **freio**. Motivos: **prejudicar relações**,
**obter vantagem** por desvio, **negação defensiva**.
**CC25. Antecipação:** o personagem prevê **como os outros reagirão** antes de agir (ou de contar).
O livro diz que foi o algoritmo **mais difícil** do motor, pois a reação verdadeira **faz parte**
da simulação; exige **cópia da reação** sem "acontecer".
**CC26. Inferência lógica:** deduzir **suspeita** a partir de fatos ("disse que ia a um lugar e
não foi"); **motor de inferência**; é a parte mais difícil.
**CC27. Papéis e sequência:** o motor precisa **escolher quem reage** a um evento (**papéis**),
com **opções** e **fórmulas de inclinação**; planos e **reações adiadas**.
**CC28. Ambientes de desenvolvimento** importam tanto quanto o motor: **entrada algorítmica**,
fórmulas **enlatadas** (atração, ajuste) e **ajuste fino** de contexto; sem eles o autor não
produz (o livro apresenta o **Erasmatron**).

## 6. Gestor de drama (CC29 a CC35)

**CC29. Gestor de drama = escutar, pensar, falar:** escuta por **variáveis de visão geral**, pensa
com **pontuação, modelos e gramáticas de história**, fala por **manipulação do ambiente**,
**injeção de metas**, **mudança de personalidade**, **pressão de tempo** e **quebra da quarta
parede**.
**CC30. Quando a manipulação é legítima:** o **raio que cai** (parte do mundo, sem hostilidade) é
aceitável; a **nevasca criada só para barrar** a intenção do jogador **toma uma postura
antagônica** e **não deve** ser feita: o mundo **não é teste de vontade** entre autor e jogador.
**CC31. Quebrar a quarta parede** (falar ao jogador sobre o que ele "está fazendo errado") é o
recurso **mais cru**.
**CC32. Pontos de enredo lógicos:** só disparam com **pré-condições** satisfeitas.
**CC33. Imposição de enredo** (matar quem desvia, "só dá escolha sem sentido") é **fraude de
interatividade**.
**CC34. Pesquisa acadêmica (por títulos):** projetos como Oz (gestão de experiência), Façade,
IDtension e Virtual Storyteller; "parentes distantes": ficção interativa, hipertexto, RPG e
narrativa digital.
**CC35. Prognósticos (opinião):** o autor defende uma **escola revolucionária** de mercado
(histórias interativas "superando" jogos); é **previsão**, não evidência.

```js
// Meu exemplo (testado): mundo de histórias mínimo (limite -1..1, retornos decrescentes,
// inclinação = traço + contexto + humor, escolha do verbo de maior inclinação).
const limita = (x, a = -1, b = 1) => Math.max(a, Math.min(b, x));
const mundo = { personagens: {}, relações: {}, contador: {} };
const gesto = (m, de, para, verbo, base) => {                   // efeito base/n
  const k = `${de}>${para}:${verbo}`;
  m.contador[k] = (m.contador[k] || 0) + 1;
  const r = m.relações[`${de}>${para}`];
  r.afeto = limita(r.afeto + base / m.contador[k]);
  return r.afeto;
};
const inclinacao = (p, verbo, ctx) => {
  const t = p.traços, base = { ajudar: t.gentileza, enfrentar: t.coragem, fugir: -t.coragem }[verbo] ?? 0;
  return limita(base + ctx.pressão * (verbo === 'fugir' ? 0.5 : -0.2)
                     + p.humor.medo * (verbo === 'fugir' ? 0.8 : -0.5));
};
const escolhe = (p, ctx) => ['ajudar', 'enfrentar', 'fugir']
  .map(v => [v, inclinacao(p, v, ctx)]).sort((a, b) => b[1] - a[1])[0];
```

**Resultado do teste:** três gestos iguais dão afeto 0,30, 0,35 e 0,38 (cada um vale menos);
repetir 400 vezes **não passa de 1**; sem pressão a personagem escolhe **ajudar**; com medo alto e
pressão, **fugir**. Os extremos da mistura (-1, 0, +1) dão 0, 5 e 10. A mentira se registra como
evento não verdadeiro e **se espalha** com rastro de quem contou.

## 7. Aplicação a jogos teológicos (inferência minha)

| Ideia | Aplicação | Cuidado |
|---|---|---|
| **Verbos** | Poucos verbos **do texto** (chamar, enviar, recusar, reparar, perdoar) como repertório | Os verbos devem **casar** com o tema (`26`, GA11) |
| **Relações e humor** | **Parábolas e casos contemporâneos** (irmão mais velho, samaritano em novo cenário) | **Não** reduzir personagem bíblica a números nem inventar interior sem rótulo (`21`) |
| **Retorno decrescente** | Evitar **ganhar afeto repetindo** gesto | Serve também para **não gamificar** relação (`16`) |
| **Antecipação** | Personagem que **calcula** o efeito de falar ou calar (testemunho, silêncio) | Tema sensível; sem condenar |
| **Fofoca e mentira** | Cenas sobre **verdade e testemunho**: o jogo **registra** quem disse o quê (Atos 5; Gênesis 27) | **Cuidado pastoral** (`07`) |
| **Gestor de drama** | O **texto** é o "Destino" fixo; escolhas de **leitura e aplicação**, não do final | **Não** forçar conclusão (CC33) nem a "nevasca" que barra o jogador (CC30) |
| **Linguagem construída** | **Menu de verbos** em vez de digitação livre | Acessibilidade (`24`) |
| **Ambiente de autoria** | Editor para o líder criar **cenas e relações** (`28`, GC14) | Revisão teológica antes de publicar |

**Fidelidade primeiro:** o fim das passagens **não muda**; este modelo serve a **ficções de
aplicação**, **casos** e **ensaios de decisão**, **não** à "versão alternativa" de narrativas
bíblicas (`21`, `22`).

## 8. Limites

- **Leitura**: ver `livros.md`, seção 44.
- O autor é **opinativo**, fala de si como pioneiro; as **previsões** são opinião. O **Erasmatron**
  e o Storytronics **nunca** viraram padrão; vale o **pensamento**, não a ferramenta.
- **Complexidade**: personalidade, relações, fofoca e antecipação **exigem muito** autoria; para
  jogos pequenos, **verbos e relações simples** bastam.
