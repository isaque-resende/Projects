# 52. Debates internos da tradição adventista e linguagem pública (*Questões sobre Doutrina*)

> **Pipeline:** fase principal **F0** (`../pipeline/F0-guardrails-e-briefing.md`); também usada em F2, F6, F7. Verificador executável: `../../scripts/gates.mjs`.

Fonte: *Questões sobre Doutrina* (1957; ed. anotada por George R. Knight; trad. brasileira com
introdução histórica e notas). Princípios **QD1 a QD22**, em palavras minhas. O livro é um
**documento histórico**: respostas de líderes adventistas a perguntas de evangélicos (conferências
de 1955 e 1956) e, ao mesmo tempo, **o livro mais divisivo do adventismo** (palavra do próprio
editor). Aqui serve para **mapear onde a tradição declarada do autor não é unânime** e para
**linguagem pública** (como explicar a fé sem distorcer). **Não** resolve debates.

## 1. O que o livro é (e por que importa para a skill)

- **QD1.** Origem: diálogo de 1955/1956 entre porta-vozes adventistas e evangélicos (Martin,
  Barnhouse); objetivo de ser **entendido** como cristão, não como seita.
- **QD2.** Quatro pontos de suspeita evangélica: expiação **não** completada na cruz; salvação
  por graça **mais** obras; Cristo como **ser criado**; natureza **pecaminosa** de Cristo.
- **QD3.** A edição anotada mostra que parte das respostas foi **ajuste de vocabulário**
  (expiação "provida" na cruz e "aplicada" no santuário) e parte foi **mudança de posição** (a
  natureza humana de Cristo; o semi-arianismo e o antitrinitarismo de pioneiros, segundo as
  notas).
- **QD4.** Consequência para o jogo: o autor do projeto herda uma tradição **com debates
  internos reais**; o jogo **não** deve apresentar um lado como "a doutrina" sem rótulo.

## 2. Mapa de pontos com debate interno (rótulo "debate interno")

| Tema | Em disputa (segundo o livro anotado) | Regra no jogo |
|---|---|---|
| Natureza humana de Cristo | "caída" (com tendências) × "sem pecado" desde o início; tema **substantivo**, não só semântico | Afirmar o que o texto bíblico diz (sem pecado; tentado; semelhança); **não** decidir a mecânica da natureza |
| Expiação | cruz × ministério celestial; "provida" × "aplicada"; "completa" × "completa como sacrifício" | Usar **os dois verbos**, sem "só uma" |
| Divindade de Cristo e Trindade | pioneiros divididos; consenso posterior | Evitar narrar "como a igreja sempre ensinou"; usar texto |
| "Última geração" e perfeição | Cristo como exemplo de que uma geração pode viver sem pecado | **Não** transformar em mecânica de "perfeição" nem em condição da vitória de Deus |
| Sábado | critério de lealdade × resposta de amor; livros retirados por tratar guarda como **base da salvação** | Sábado **nunca** como moeda de salvação (reforça 48 NC13) |
| Sinal da besta e remanescente | quando, quem; identificação de instituições | Rótulo **tradição**; **sem** apontar grupos reais (48 NC10, 49 TH24) |
| Juízo investigativo | encaixe com o ensino evangélico da justificação | Rótulo **tradição**; juízo **sem** pontuação do jogador |
| Imortalidade e destino dos ímpios | condicional × inata | Rótulo **tradição** (48 NC7) |

## 3. E. G. White e a membresia (cap. 9 do livro)

- **QD5.** Declaração: os escritos dela **não** são adição ao cânon, **não** têm aplicação
  universal como a Bíblia (destinam-se à igreja adventista), e a Bíblia é a medida de todos os
  escritos, "em nenhum sentido" o contrário.
- **QD6.** Autodefinição citada: "mensageira" (não reivindicou o título de profetisa); seus
  escritos como **"luz menor"** que conduz à **"luz maior"** (a Bíblia).
- **QD7.** **Aceitar os escritos não é motivo de disciplina** (citação de Tiago White, F. M.
  Wilcox e da própria autora): quem tem dúvida mas vive a fé cristã **não** é afastado por isso.
- **QD8.** Nota editorial: alguns indivíduos e subgrupos **parecem basear ensinos** nos escritos
  dela, apesar da posição oficial.
- **QD9.** **Regras para o jogo (confirmam 48 §8, 49 TH19–TH20, 50 CE17, 51 BH11):**
  (a) conteúdo bíblico **nunca** depende de citação dela; (b) citação dela é **opcional** e
  rotulada; (c) o jogo **não** exige "crer em Ellen G. White" para avançar, nem mede isso.

## 4. Linguagem pública (como explicar a fé a quem é de fora)

- **QD10.** Responder à **pergunta feita**, sem despejar a lista de doutrinas; a abordagem do
  livro é **pergunta e resposta** com textos.
- **QD11.** Cristo e a cruz no centro: "o centro da mensagem é Cristo e Ele crucificado";
  cristianismo como **relação** com uma Pessoa, não apenas assentimento a doutrinas.
- **QD12.** Reconhecer **doutrinas em comum** com outros cristãos antes de apontar diferenças.
- **QD13.** Admitir **vocabulário próprio** ("expiação", "juízo", "remanescente") e **explicar**
  o termo na primeira vez.
- **QD14.** Evitar **ocultar** posições incômodas: a edição anotada critica a falta de
  transparência; para o jogo, **declarar** a posição da tradição e o **rótulo** (48) em vez de
  suavizar.

## 5. Para o jogo (minhas regras)

- **QD15.** Campo novo no briefing: `debateInterno: [lista de temas]`; se o conteúdo toca um
  tema acima, o jogo **declara** posição (`posicaoDeclarada`) ou **omite** o ponto.
- **QD16.** Cena de **diálogo com outras tradições** (evangélicos, católicos): mostrar **perguntas
  reais** e respostas **com texto**, sem caricatura do interlocutor (a conferência de 1955 foi
  respeitosa).
- **QD17.** Nenhuma tela que **"suavize"** uma crença diante de público externo e a **mantenha**
  para o público interno (o livro foi criticado por isso): mesma versão para todos.
- **QD18.** **Linha do tempo** histórica da igreja: marcar pioneiros como **pessoas** com
  posições que mudaram; não retroprojetar o consenso atual.
- **QD19.** **Legalismo × graça:** salvação só por graça; obediência como **fruto** (48 NC13).
- **QD20.** **Sábado e domingo:** apresentar a posição **sem** deboche da prática alheia.
- **QD21.** Se o jogo citar o livro, citar a **edição** (1957 original × anotada) e a página.
- **QD22.** O **texto de 1957** é um documento **datado**; não usar frase dele como "doutrina
  atual" sem confrontar com *Nisto Cremos* (48).

## 6. Verificador (testado em Node)

```js
// Auditoria de temas com debate interno. Regras MINHAS; não resolve debates.
const DEBATE = new Set([
  'natureza_de_cristo', 'expiacao', 'trindade_historia', 'ultima_geracao',
  'sabado_criterio', 'sinal_da_besta', 'juizo_investigativo', 'imortalidade',
]);

export const auditaDebates = (cena) => {
  const avisos = [];
  for (const t of cena.temas ?? []) {
    if (!DEBATE.has(t)) continue;
    if (!cena.posicaoDeclarada?.[t] && !cena.omitido?.includes(t)) avisos.push(`${t}: debate interno sem posição declarada nem omissão`);
    if (cena.apresentadoComoUnica?.includes(t)) avisos.push(`${t}: apresentado como doutrina única`);
  }
  if (cena.exigeCrerEmEGW) avisos.push('não exigir crer em E. G. White para avançar');
  if (cena.salvacaoPorGuardaDoSabado) avisos.push('guarda do sábado como base da salvação');
  if (cena.versoesDiferentesPorPublico) avisos.push('mesma versão para público interno e externo');
  return avisos;
};
```

Testado em Node 20 com `node --test` (7 de 7).

## 7. Limites

- **Lidos:** sumário, prefácio, **introdução histórica e teológica** (cerca de 28 mil caracteres,
  da abertura até o início das conferências e a controvérsia sobre expiação), **cap. 9** (E. G. White e a Bíblia) por inteiro, e o início do cap. 10.
- **Não lidos:** o texto das 48 perguntas restantes e os apêndices (A, B, C) por inteiro.
- Edição **anotada em português**; as notas ampliadas são de **George Knight** (leitura histórica
  crítica). Outros autores adventistas divergem em pontos como natureza de Cristo; **não** decidir.
