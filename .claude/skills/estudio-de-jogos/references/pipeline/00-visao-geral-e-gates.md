# Pipeline: da ideia à execução

Oito fases, cada uma com **entrada**, **passos**, **artefato de saída** e **portão** (gate). Só se
passa à fase seguinte quando o portão da anterior está cumprido. As **ferramentas** (`../ferramentas/NN-*.md`)
são a biblioteca de princípios; as **fases** dizem **qual abrir, quando e para produzir o quê**.

```
F0 Guardrails e briefing ──► F1 Ideia e formato ──► F2 Conteúdo e história ──► F3 Sistema e mecânica
        │                                                                              │
        ▼                                                                              ▼
F7 Publicação e iteração ◄── F6 Teste e qualidade ◄── F5 Produção e código ◄── F4 Experiência, arte e nível
```

| Fase | Pergunta central | Artefato de saída | Portão (resumo) |
|---|---|---|---|
| **F0** Guardrails e briefing | O que posso e não posso fazer com este texto, para este público? | `briefing` (6 campos) + lista de temas sensíveis | Briefing completo; tradição declarada; "o que não fará" escrito |
| **F1** Ideia e formato | Qual é o formato certo e que mudança queremos? | Ficha de formato + transformação + objetivos de aprendizagem | Uma frase de transformação; formato escolhido por matriz; objetivos com evidência |
| **F2** Conteúdo e história | O que o texto diz e como o jogo o conta sem distorcer? | Roteiro/beat chart com cada afirmação **rotulada** | Toda afirmação com rótulo e uso; gênero respeitado; camadas texto/leitor |
| **F3** Sistema e mecânica | O que o jogador faz, e isso serve ao texto? | Núcleo, regras, modelo de estado, decisões | Mecânica não contradiz o texto; sem Black Hat; verbos casam com o tema |
| **F4** Experiência, arte e nível | Como parece, soa e conduz? | Fases/níveis, telas, kit visual e sonoro | Acessibilidade mínima; kit de consistência; primeiro nível testável |
| **F5** Produção e código | Como construo com qualidade? | Protótipo jogável → versão em JSON + código testado | Conteúdo em dados; texto canônico protegido por teste; build roda |
| **F6** Teste e qualidade | Funciona? Ensina? Respeita a pessoa? | Relatório de playtest + testes automáticos verdes | Playtest com público real; sem erro de fidelidade; acessibilidade verificada |
| **F7** Publicação e iteração | Posso publicar e manter com segurança? | Pacote (web/PWA/loja) + registro de licenças + plano de iteração | Licenças e dados em ordem; linguagem pública revisada; plano de revisão |

## Regras da pipeline

1. **Volte quando o portão falhar.** Falha em F2 ou F3 raramente se conserta em F5.
2. **Uma pergunta por protótipo.** F3 e F5 produzem protótipos **pequenos** que respondem uma
   pergunta (ferramentas 06, 10, 30).
3. **Rótulos viajam com o conteúdo.** O rótulo (texto, contexto, tradição, adaptação) e o uso
   (exegético, teológico, homilético) ficam **no dado** da cena, não só no documento de design.
4. **Os portões são executáveis.** `scripts/gates.mjs` audita um projeto em JSON; ver abaixo.
5. **Leia pouco.** Cada fase lista **no máximo** as ferramentas necessárias; ler todas é desperdício.

## Atalhos comuns

| Situação | Caminho |
|---|---|
| "Tenho uma lição pronta e quero um jogo simples" | F0 → F1 (27 e 30) → F2 (21, 22) → F3 (mínima) → F5 (45) → F6 (06) |
| "Quero um quiz ou jogo de revisão" | F0 → F1 (27) → F3 (39: cuidado com ranking) → F5 → F6 |
| "Visual novel / história com escolhas" | F0 → F2 (15, 17, 22) → F4 (24, 41) → F5 (08) → F6 |
| "Jogo para grupo/célula" | F0 → F1 (33, 36) → F3 (36, 11) → F6 (36, 29) |
| "Mapa/viagem (Paulo, êxodo)" | F0 → F2 → F3 → F4 (19, 20) → F5 (31) |

## Esquema mínimo do projeto (usado por `scripts/gates.mjs`)

```json
{
  "briefing": { "fonteDoEstudo": "", "traducao": "", "tradicao": "", "publico": "",
                "grauDeAdaptacao": "", "oQueNaoFara": "" },
  "licencas": { "traducao": "", "ativos": [ { "nome": "", "origem": "", "licenca": "",
                "geradoPorIA": false, "registroDeGeracao": "" } ] },
  "usaEGW": false, "coletaDados": false, "publicoCriancas": false,
  "cenas": [ { "id": "", "genero": "parabola", "mecanicas": [],
               "afirmacoes": [ { "tipo": "texto|contexto|tradicao|adaptacao", "ref": "", "assunto": "",
                                 "fonte": "", "fala": false } ],
               "usos": [ { "uso": "exegetico|teologico|homiletico", "ehDoutrina": false, "versoes": [] } ],
               "praticas": [ { "forma": "", "escopo": "", "significado": "", "aplicacao": "", "base": "" } ],
               "camadas": { "textoDiz": "", "paraMim": { "pontua": false } },
               "conflito": { "elementos": [], "flags": [] },
               "debates": { "temas": [], "posicaoDeclarada": {}, "omitido": [] } } ],
  "acessibilidade": { "textoRedimensionavel": true, "contrasteVerificado": true,
                      "semDependenciaDeCor": true, "movimentoReduzivel": true,
                      "legendasOuTranscricao": true, "tecladoOuToqueSemPrecisao": true }
}
```

Executar: `node scripts/gates.mjs caminho/projeto.json` (saída 0 = sem avisos). Testes:
`node --test scripts/gates.test.mjs`. Exemplo: `scripts/projeto.exemplo.json`.

> Os portões **apontam** problemas; **não** decidem doutrina nem substituem revisão humana.
