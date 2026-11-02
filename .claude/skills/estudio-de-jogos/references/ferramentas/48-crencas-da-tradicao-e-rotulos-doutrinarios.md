# 48. Crenças da tradição (adventista) e rótulos doutrinários

> **Pipeline:** fase principal **F0** (`../pipeline/F0-guardrails-e-briefing.md`); também usada em F2, F6. Verificador executável: `../../scripts/gates.mjs`.

Fonte: *Nisto Cremos* (as 28 crenças fundamentais da Igreja Adventista do Sétimo Dia, ed. CPB,
2017, em português). Princípios **NC1 a NC24**, em palavras minhas. **Não** é exegese nem
voto doutrinário: serve para (a) saber **o que a tradição declarada do autor afirma**, (b)
**rotular** cada afirmação do jogo, (c) evitar que o jogo apresente como "texto bíblico" o que é
**leitura da tradição**.

## 1. Como usar (regra de ouro)

- **NC1.** A tradição do autor é o padrão do briefing (ver 47 §8). O jogo pode **declarar** a
  tradição; **não** a impõe a outros nem ranqueia a fé de ninguém.
- **NC2.** Toda afirmação do jogo recebe **um** dos quatro rótulos: **texto** (o que o texto diz),
  **contexto** (história/língua), **tradição** (leitura adventista) ou **adaptação** (invenção
  do jogo). Sem rótulo = não publicar.
- **NC3.** O livro cita a Bíblia como base de **cada** crença; no jogo, o versículo vem **antes**
  da crença, nunca o contrário (a crença não "prova" o texto).
- **NC4.** O próprio livro diz que a Bíblia é o único credo e que o enunciado pode ser revisado
  pela igreja mundial: tratar a lista como **declaração datada**, não como texto sagrado.

## 2. As 28 crenças e o rótulo que exigem (minha classificação)

| Grupo | Crenças (nº) | Rótulo mínimo no jogo |
|---|---|---|
| Deus | Escrituras (1), Trindade (2), Pai (3), Filho (4), Espírito (5) | texto + tradição (formulação trinitária) |
| Humanidade | Criação (6), natureza humana (7) | **tradição** (criação recente de seis dias literais; ser humano como unidade, sem alma imortal) |
| Conflito e salvação | Grande conflito (8), vida/morte/ressurreição de Cristo (9), experiência da salvação (10), crescer em Cristo (11) | texto; "grande conflito" como metanarrativa = **tradição** |
| Igreja | Igreja (12), remanescente e missão (13), unidade (14), batismo (15), ceia com lava-pés (16), dons (17) | tradição (remanescente, três anjos, lava-pés, batismo por imersão) |
| Profecia | Dom de profecia (18) | **tradição** (E. G. White) |
| Lei e vida | Lei (19), sábado (20), mordomia (21), comportamento (22), casamento e família (23) | tradição (sábado do pôr do sol ao pôr do sol; dízimo; normas de vida) |
| Esperança | Santuário (24), segunda vinda (25), morte e ressurreição (26), milênio (27), nova Terra (28) | **tradição** forte (juízo investigativo, 1844, estado dos mortos, milênio no Céu) |

## 3. Pontos que mais pedem rótulo "tradição"

- **NC5.** **Sábado (20):** quarto mandamento lido como obrigatório e válido; o jogo pode
  **mostrar** o sábado como descanso e memorial sem dizer que outros cristãos "erram".
- **NC6.** **Santuário e juízo investigativo (24):** a leitura de 1844 e dos 2.300 dias
  (dia-ano) é **interpretação profética da tradição**; rotular sempre, nunca narrar como
  "o que Daniel disse" sem rótulo.
- **NC7.** **Estado dos mortos (26) e fim dos ímpios (27):** morte como "sono" e destruição final
  (sem tormento eterno) → **tradição**; jogos de luto (ver cautela pastoral) pedem especial
  cuidado: não consolar com mecânica nem afirmar o destino de pessoas reais.
- **NC8.** **Criação (6):** seis dias literais e criação recente é leitura da tradição; jogos de
  ciência/fé devem **declarar** a posição e **não** ridicularizar outras.
- **NC9.** **Dom de profecia (18):** E. G. White é fonte **secundária**, subordinada à Bíblia;
  citações dela entram com rótulo **tradição** e fonte própria, nunca misturadas ao versículo.
- **NC10.** **Remanescente e três anjos (13):** o livro liga a missão adventista a Ap 14;
  evitar mecânica que "classifique" pessoas como dentro/fora (ver 07 e 47).
- **NC11.** **Casamento (23) e comportamento (22):** normas de conduta e vestuário são
  aplicação da tradição; **não** usar o jogo para medir ou julgar o jogador.

## 4. Cautelas de jogo (decorrem das regras já existentes)

- **NC12.** Nada de **fala inventada** de Deus/Jesus/Espírito; rotular como adaptação, ou usar
  só texto citado (ver 42 e 47).
- **NC13.** **Salvação (10):** o livro afirma graça, não obras. Mecânica de **pontos que
  "ganham" salvação** ou de "pecado que reduz a barra" contradiz a doutrina declarada;
  usar **crescimento** (11) sem recompensa transacional.
- **NC14.** **Batismo e ceia (15, 16):** são ordenanças; não simular o ato como minijogo
  "ganhável"; narrar com reverência e rótulo.
- **NC15.** **Grande conflito (8):** evitar a leitura dualista "gente do bem × gente do mal"
  aplicada a pessoas reais ou outras igrejas; o conflito é cósmico e se aplica a todos.
- **NC16.** **Segunda vinda (25):** não marcar datas; o livro diz que o tempo não foi revelado.
  Mecânica de contagem regressiva de fim do mundo é proibida (pressão/medo; ver 07).
- **NC17.** **Público infantil:** simplificar sem mudar o rótulo; sem imagens de tormento.

## 5. Interação com o briefing (47 §5)

| Campo | Valor adventista (padrão) |
|---|---|
| `tradicao` | "adventista do sétimo dia, histórico-gramatical" |
| `fonteDoEstudo` | declarar (ex.: lição da Escola Sabatina, livro X) |
| `traducao` | declarar (ex.: ARA/ARC/NVI); *Nisto Cremos* usa ARC e outras |
| `grauDeAdaptacao` | citação, paráfrase, expansão rotulada ou aplicação |
| `publico` | faixa etária |
| `eAfirmacaoDeTradicao` (novo) | `true` para qualquer crença da lista acima |

## 6. Verificador (testado em Node)

```js
// Auditoria de rótulos doutrinários. Tabela e regras MINHAS; não é veredito teológico.
const TIPOS = new Set(['texto', 'contexto', 'tradicao', 'adaptacao']);
const SENSIVEIS = new Set(['sabado', 'santuario', 'mortos', 'criacao', 'profecia', 'remanescente', 'milenio']);

export const audita = (afirmacoes) => {
  const avisos = [];
  afirmacoes.forEach((a, i) => {
    const id = `#${i}`;
    if (!TIPOS.has(a.tipo)) avisos.push(`${id}: sem rótulo válido`);
    if (a.tipo === 'texto' && !a.ref) avisos.push(`${id}: "texto" sem referência`);
    if (a.assunto && SENSIVEIS.has(a.assunto) && a.tipo === 'texto') avisos.push(`${id}: "${a.assunto}" é leitura da tradição, não só texto`);
    if (a.fonte === 'ellen-white' && a.tipo !== 'tradicao') avisos.push(`${id}: Ellen G. White deve ser rotulada como tradição`);
    if (a.fala && a.tipo !== 'adaptacao' && a.tipo !== 'texto') avisos.push(`${id}: fala de personagem divino sem rótulo de adaptação`);
  });
  return avisos;
};
```

Testado em Node 20 com `node --test` (7 de 7: limpo, sem rótulo, texto sem referência, assunto sensível como texto, Ellen G. White sem rótulo, fala divina sem/com adaptação).

## 7. Limites e divergências

- **Lido:** os enunciados das 28 crenças e trechos dos capítulos de Escrituras, Deus, Criação,
  conflito, salvação, igreja, sábado, dom de profecia, santuário, mortos, milênio. **Não lidos:**
  os demais capítulos por inteiro; apêndices.
- O livro **não** é votação oficial (aviso do próprio prefácio); a formulação oficial vem da
  Associação Geral.
- Outras tradições leem diferente (ver 47 §8); o jogo **declara**, não decide.

## 8. Decisão do autor sobre Ellen G. White

- **Fonte secundária**, subordinada à Bíblia. Sempre rotulada **tradição**, com fonte própria (obra e página), **separada** do texto bíblico na tela e no código.
- O verificador (§6) já sinaliza citação dela sem rótulo `tradicao`.
