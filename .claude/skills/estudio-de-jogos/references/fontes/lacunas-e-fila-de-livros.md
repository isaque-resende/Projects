# Lacunas e fila (estado atual, consolidado em 2026-10-15)

Substitui a auditoria de 2026-10-14 e as notas datadas que a seguiram. Histórico de cada livro:
`livros.md`. Procedimento de ingestão: `como-adicionar-livro.md`.

## 1. Retrato

- **52 ferramentas** em 8 fases (`../pipeline/`), 60 livros registrados, portões executáveis
  (`../../scripts/gates.mjs`, 11 testes).
- Camadas: design e narrativa de jogos; código web; aprendizagem; arte, quadrinhos e som;
  **guardrails teológicos** da tradição declarada (adventista, histórico-bíblico).

## 2. Lacunas abertas (por prioridade)

| # | Lacuna | Estado | Observação |
|---|---|---|---|
| A1 | **Formação cristã e liturgia** (como pessoas se formam na fé; culto, hábito, catequese) | Aberta | Sem livro-fonte; hoje só regras éticas (07, 52) |
| A2 | **Cuidado pastoral** (luto, culpa, abuso, doença) | **Parcial**: regras de síntese minha em `pipeline/F0` e F6 | Falta fonte especializada |
| A3 | **Licenças e LGPD** | **Parcial**: checklist em `pipeline/F7` e `auditaLicencas`; síntese minha, **não é orientação jurídica** | Falta fonte jurídica; verificar edição de cada tradução |
| A4 | **Texto-fonte da tradição**: *O Grande Conflito* e política de uso de E. G. White | Aberta | Hoje só via Tratado e livros de hermenêutica |
| A5 | **Doutrina por doutrina**: caps. 4 a 27 do *Tratado*; demais perguntas e apêndices B e C de *Questões sobre Doutrina*; caps. 1 a 8 e apêndice B de *Compreendendo as Escrituras* | Aberta (lidos só em parte) | Só necessária se o projeto tocar o tema |
| A6 | **Mapa de tradições** (católica, ortodoxa, outras protestantes) | Aberta, prioridade baixa | Só se o público for ecumênico |
| A7 | **Áudio para web** (Web Audio na prática) | Aberta | 44 é teoria |
| A8 | **Testes de acessibilidade e de canvas** | Aberta | 46 não cobre canvas |
| A9 | **Investigação e dedução** (quadro de pistas) | Aberta | Gêneros pedidos sem ferramenta |
| A10 | *Multimedia Learning* (Mayer): miolo (caps. 5 a 20) | Aberta | Arquivo veio só com caps. 1 e 2 |

## 3. Pendências de arquivo (livros recebidos e não lidos)

| Livro | Problema | O que fazer |
|---|---|---|
| Parker, *Mastering 3D Game Development with JavaScript* | PDF como imagem, sem texto | EPUB ou PDF pesquisável, ou OCR externo |
| McCloud, *Understanding Comics* | PDF como imagem (~60 MB) | EPUB ou PDF pesquisável, ou OCR externo |
| Eisner, *Comics and Sequential Art* | PDF como imagem (~30 MB) | idem (o outro Eisner, *Graphic Storytelling*, foi lido) |

## 4. Higiene (feita na faxina de 2026-10-15)

- Identificadores `P1` a `P16` desambiguados: `01` mantém `P#`, `05` usa `PE#`, `10` usa `PL#`.
- 134 blocos "Acréscimo" que eram só ponteiros foram removidos; cada ferramenta tem agora uma
  linha **Pipeline** no topo (fase principal e fases que a usam).
- Partes datadas condensadas em `08` e `31` (Flash, Crafty, PhoneGap, jQuery Mobile, appcache).
- Resta: `08` ainda mistura stack, lojas e práticas de protótipo (dividir se crescer);
  códigos de `25` e `28` não foram executados; mover a skill para `~/.claude/skills` para usá-la
  fora do projeto de contabilidade.

## 5. Fila de livros (só se houver necessidade real)

Prioridade: **(1)** fonte jurídica brasileira sobre direito autoral e LGPD; **(2)** formação cristã e
liturgia; **(3)** áudio para web; **(4)** investigação e dedução em narrativa interativa;
**(5)** o texto de *O Grande Conflito* e a política de uso de E. G. White. Livros de design e
código adicionais têm retorno baixo: o acervo já cobre as fases F1 a F6.
