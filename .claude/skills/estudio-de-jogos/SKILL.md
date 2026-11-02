---
name: estudio-de-jogos
description: Use para criar jogos, principalmente jogos teológicos (estudos bíblicos transformados em experiências jogáveis) para web, PWA e apps de loja, da ideia à publicação. Acione quando o usuário falar em criar jogo, game design, mecânica, narrativa interativa, fases, protótipo, playtest, balanceamento, visual novel, jogo de grupo, quiz, ou transformar uma passagem, lição ou doutrina bíblica em jogo, mesmo sem citar a skill. Organiza o trabalho em pipeline de 8 fases (guardrails e briefing, ideia e formato, conteúdo e história, sistema e mecânica, experiência e arte, produção e código, teste, publicação) com portões executáveis de fidelidade ao texto, e uma biblioteca de 52 ferramentas de teoria.
---

# Estúdio de Jogos

Skill para **criar e programar jogos**, com foco em **jogos teológicos**. Princípios vêm de livros
de teoria (registro em `references/fontes/livros.md`); o trabalho segue uma **pipeline da ideia à
execução**, com portões que protegem a fidelidade ao texto e o respeito à pessoa.

## Contexto do projeto (decisões já tomadas)

- **Foco:** estudos bíblicos viram experiências jogáveis. A skill **não faz exegese**: consome
  material pronto (lição, estudo) e protege a fidelidade. Mecânica é decidida caso a caso.
- **Tradição do autor (padrão do briefing):** adventista do sétimo dia, método histórico-bíblico.
  Ellen G. White = **fonte secundária, rotulada "tradição"**, separada da Bíblia. A tradição é
  **declarada**, nunca decidida pelo jogo; pontos sem consenso são rotulados ou omitidos.
- **Plataforma:** navegador (PC, tablet, celular), fácil de hospedar e de empacotar para lojas.
  Stack: JavaScript + HTML/CSS, conteúdo em JSON, PWA, Capacitor (`ferramentas/08`).
- **Arte:** gerada por IA de imagem; teoria visual vira **prompt e kit de consistência** (`41`).
- **Idioma:** português do Brasil, salvo pedido em contrário.

## Como usar

1. Descubra **em que fase** o usuário está (tabela abaixo). Se for jogo novo, comece em **F0**.
2. Abra **só** o arquivo da fase: `references/pipeline/Fx-*.md` (passos, ferramentas, portão).
3. Abra as **ferramentas** que a fase indica (`references/ferramentas/NN-*.md`); cada uma é autocontida.
4. Entregue um **artefato** da fase (briefing, ficha de formato, roteiro rotulado, mecânica, kit,
   código, relatório, pacote).
5. Antes de seguir, **cumpra o portão** da fase; rode `node scripts/gates.mjs projeto.json` quando
   houver conteúdo em dados.

Visão geral, atalhos e esquema do projeto: `references/pipeline/00-visao-geral-e-gates.md`.

## Roteador por fase

| Fase | Use quando... | Arquivo | Ferramentas principais |
|---|---|---|---|
| **F0** Guardrails e briefing | Antes de tudo; "posso fazer isto com este texto, para este público?" | `pipeline/F0-guardrails-e-briefing.md` | 47, 48, 49, 50, 51, 52, 07, 21 |
| **F1** Ideia e formato | "Que jogo é esse? Que formato? Que mudança queremos?" | `pipeline/F1-ideia-e-formato.md` | 27, 01, 14, 33, 34, 12, 16, 30, 26 |
| **F2** Conteúdo e história | "Como conto a passagem sem distorcer? Quantos finais? Que escolhas?" | `pipeline/F2-conteudo-e-historia.md` | 02, 15, 22, 17, 18, 23, 37, 38 |
| **F3** Sistema e mecânica | "O que o jogador faz? Está equilibrado? Serve ao texto? E em grupo?" | `pipeline/F3-sistema-e-mecanica.md` | 03, 09, 39, 04, 40, 35, 36, 11 |
| **F4** Experiência, arte e nível | "Como parece, soa e conduz? Fases, telas, imagens, som, acessibilidade" | `pipeline/F4-experiencia-arte-e-nivel.md` | 05, 13, 19, 20, 24, 41 a 44, 32 |
| **F5** Produção e código | "Como programo, organizo e testo?" | `pipeline/F5-producao-e-codigo.md` | 08, 10, 25, 28, 45, 46, 31 |
| **F6** Teste e qualidade | "Funciona? Ensina? Respeita a pessoa? Playtest" | `pipeline/F6-teste-e-qualidade.md` | 06, 29, 46, 36 |
| **F7** Publicação e iteração | "Posso publicar? Licenças, dados, lojas, manutenção" | `pipeline/F7-publicacao-e-iteracao.md` | 08, 07, 29, 52 |

## Biblioteca de ferramentas (por número)

Cada arquivo em `references/ferramentas/` tem no topo a linha **Pipeline** (fase principal e outras
fases que o usam). Lista:

| Grupo | Ferramentas |
|---|---|
| Fundamentos de design | 01 estrutura · 03 mecânica · 04 lógica e balanceamento · 05 experiência · 09 decisões e fluxo · 14 elementos formais e dramáticos · 39 catálogo de mecanismos |
| Processo e pesquisa | 06 playtest · 10 processo · 26 análise de jogos · 27 brainstorm de formato · 29 pesquisa com jogadores · 30 primeiros jogos |
| Narrativa | 02 narrativa · 15 design narrativo · 17 visual novels · 18 sessões curtas · 21 fidelidade · 22 tipos de história · 23 ambientes e participação · 37 narrativa procedimental · 38 modelos de história e personagem |
| Aprendizagem e grupo | 11 cultura e comunidade · 12 diversão e aprendizagem · 16 motivação · 33 objetivos e avaliação · 34 aprendizagem em jogos · 35 multimídia · 36 facilitação de grupo · 40 valores no design |
| Níveis, UX e arte | 13 níveis e documentação · 19 level design · 20 level design arquitetônico · 24 UX/UI · 41 composição visual · 42 quadrinhos · 43 atenção e storyboard · 44 som |
| Código | 08 implementação web · 25 padrões · 28 arquitetura · 31 mundos em grade · 32 3D · 45 JavaScript · 46 testes |
| Ética e tradição | 07 ética e transformação · 47 gêneros bíblicos · 48 crenças e rótulos · 49 hermenêutica e grande conflito · 50 regras por gênero · 51 universal × cultural · 52 debates internos |

## Regras que valem em todas as fases

- **Experiência antes de estrutura.** Volte sempre a "o que a pessoa sente e entende agora?".
- **O texto bíblico é fonte de verdade.** Mecânica e narrativa não o contradizem; se contradisser,
  mude a mecânica (07, Lente da Contradição Interna).
- **Rótulo em tudo.** Cada afirmação é **texto**, **contexto**, **tradição** ou **adaptação**; cada
  uso é **exegético**, **teológico** ou **homilético** (48, 50).
- **Nunca** inventar fala de Deus ou de Jesus sem rótulo de adaptação; **nunca** medir ou comparar fé
  de pessoas; salvação e sábado **nunca** como moeda.
- **Sem Black Hat** (pressão, escassez, streak punitivo, economia de espera) em formação (16).
- **Protótipo barato e cedo**; uma pergunta por protótipo.
- **Seja honesto sobre a fonte.** Diga de qual livro vem o princípio; se for síntese sua, diga.
- **Os portões apontam, não decidem.** Doutrina em disputa: declare a posição ou omita (52).

## Fontes e como crescer

- Registro de livros (proveniência): `references/fontes/livros.md`.
- Lacunas e fila: `references/fontes/lacunas-e-fila-de-livros.md`.
- Adicionar livro: `references/fontes/como-adicionar-livro.md`.
- Portões executáveis e testes: `scripts/gates.mjs`, `scripts/gates.test.mjs`
  (`node --test scripts/gates.test.mjs`).
