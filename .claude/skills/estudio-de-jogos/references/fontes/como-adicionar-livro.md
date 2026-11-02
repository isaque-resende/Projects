# Como adicionar um livro novo

Procedimento para cada livro enviado. Meta: o livro **melhora uma fase da pipeline** (`../pipeline/`)
e deixa rastro honesto do que foi lido.

## 1. Ingestão

1. Converter o arquivo (PDF com `pdftotext -enc UTF-8`; EPUB como ZIP de XHTML sem tags) em texto
   numa pasta de trabalho (scratchpad), **nunca dentro da skill**.
2. Checar legibilidade (caracteres de substituição, fontes truncadas, PDF como imagem). Se ilegível,
   registrar em `lacunas-e-fila-de-livros.md` §3 e **não** simular leitura.
3. Listar capítulos e tamanhos; ler os centrais na íntegra e indexar o resto por títulos.
4. Livros de código: anotar **Gêneros habilitados** e **Técnicas reaproveitáveis**.

## 2. Extração de princípios

Com **palavras próprias** (sem trechos longos do livro; no máximo uma citação curta atribuída):

```
**<Sigla><n>. <Título curto>.**
<1 a 3 frases: o que é e por que funciona.>
*Faça:* <ação concreta ou pergunta-guia.>
Fonte: <Livro>, <cap./seção>.
```

- Um princípio = uma ideia aplicável; preserve o número da lente/regra do livro.
- Separe **síntese própria** (inferência para jogos teológicos) do que é do livro.
- Escolha **sigla única** (verifique colisão com `grep` antes: hoje `P` é de `01`, `PE` de `05`,
  `PL` de `10`).

## 3. Classificação: fase e ferramenta

Primeiro decida **a fase** que o livro melhora; depois a ferramenta.

| Fase | Ferramentas (principais) | Entra aqui |
|---|---|---|
| F0 Guardrails | 07, 21, 47 a 52 | ética, fidelidade, gêneros bíblicos, tradição, hermenêutica, debates |
| F1 Ideia e formato | 01, 12, 14, 16, 26, 27, 30, 33, 34 | tema, formato, motivação, objetivos de aprendizagem |
| F2 Conteúdo e história | 02, 15, 17, 18, 22, 23, 37, 38 | narrativa, estrutura, tipos de história, participação |
| F3 Sistema e mecânica | 03, 04, 09, 11, 35, 36, 39, 40 | mecânica, decisões, balanceamento, valores, grupo |
| F4 Experiência, arte e nível | 05, 13, 19, 20, 24, 32, 41 a 44 | experiência, níveis, UX/UI, imagem, quadrinhos, som, 3D |
| F5 Produção e código | 08, 10, 25, 28, 31, 45, 46 | stack, processo, padrões, arquitetura, JS, testes |
| F6 Teste e qualidade | 06, 29 | playtest e pesquisa com jogadores |
| F7 Publicação | (08, 07, 29, 52) | lojas, licenças, dados, linguagem pública |

Se o princípio já existe, **acrescente a fonte** em vez de duplicar. Se dois livros divergem,
registre a divergência com regra de escolha. Se não couber em nenhuma ferramenta, **crie uma nova**
`NN-nome.md` (próximo número livre) e dê a ela uma fase.

## 4. Atualizar (checklist)

- [ ] `livros.md`: seção do livro (foco, ferramenta alimentada, **profundidade de leitura**:
      lidos / em parte / não lidos, ressalvas) e tabela de divergências.
- [ ] Ferramenta tocada: princípios novos e linha **Pipeline** no topo (se ferramenta nova).
- [ ] Arquivo da fase em `../pipeline/` (passos, ferramentas a abrir, portão), se mudar o fluxo.
- [ ] Se for **guardrail**: regra em `../../scripts/gates.mjs` + teste em `gates.test.mjs`
      (`node --test scripts/gates.test.mjs` deve passar).
- [ ] `lacunas-e-fila-de-livros.md`: fechar ou ajustar a lacuna.
- [ ] `SKILL.md`: linha no roteador da fase (só se ferramenta nova).
- [ ] Memória do projeto (arquivo do usuário), uma linha.
- [ ] Informar o usuário: o que entrou, onde, o que ficou fora e por quê.

## 5. Critérios de descarte (faxina)

Descarte ou condense quando o conteúdo for: **repetido** em outra ferramenta (deixe um ponteiro na
linha Pipeline, não um bloco); **datado** (tecnologia ou versão que não vale mais, registrando só a
ideia); **sem uso em nenhuma fase**; ou **ponteiro sem conteúdo** ("Acréscimo" de poucas linhas).
