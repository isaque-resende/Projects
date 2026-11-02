# F2. Conteúdo e história

**Objetivo:** escrever o roteiro (ou estrutura) do jogo **sem distorcer o texto**, com cada
afirmação rotulada.

## Entrada
Ficha de formato (F1), briefing (F0).

## Passos
1. **Fonte e fixo × flexível** (02, 21): o texto canônico, finais e falas bíblicas são **fixos**;
   a forma é flexível. Defina o grau de fidelidade (21) e a pilha da história (02).
2. **Tipo de história** (22): final fixo, múltiplos finais, ramificada, aberta; quanto controle
   dar ao jogador. Para texto com escolhas: 17 (visual novel), 18 (sessões curtas), 15 (prática).
3. **Estrutura**: pitch, mundo, personagens, estrutura em beats, diálogo e cenas (15); beat chart
   e fases (13). Papel de narrador (42) e direção de atenção (43) quando houver sequência visual.
4. **Participação sem estragar o texto** (23, 37, 38): escolhas transparentes, sem engano;
   personagens como sistema só quando necessário.
5. **Rotular** (48): cada afirmação = texto, contexto, tradição ou adaptação; cada uso =
   exegético, teológico ou homilético (50). Sem rótulo, não entra.
6. **Camadas** (51): separar "o texto diz" de "para mim"; o sentido do texto não é votado.
7. **Regras por gênero** (47, 50): parábola ≠ alegoria; narrativa não vira norma sem critério;
   profecia condicional; práticas com escopo × significado × aplicação (51).
8. **Grande conflito e pontos sensíveis** (49, 52): dualismo social proibido; posição declarada
   ou omitida.

## Ferramentas a abrir
`02`, `21`, `22`, `15`, `13`, e conforme o formato: `17`, `18`, `23`, `37`, `38`, `42`, `43`;
guardrails `47` a `52`.

## Saída
Roteiro/beat chart em dados (JSON): cada cena com `genero`, `afirmacoes` rotuladas, `usos`,
`praticas`, `camadas`, `conflito`, `debates` (esquema em `00-visao-geral-e-gates.md`).

## Portão G2 (executável)
`auditaRotulos`, `auditaUso`, `auditaPratica`, `auditaCamadas`, `auditaConflito`, `auditaDebates`
sem avisos em `scripts/gates.mjs`, e revisão humana de:
- [ ] Nenhuma fala inventada de Deus/Jesus sem rótulo "adaptação".
- [ ] Doutrina apoiada em **exegese** e em **mais de uma versão**.
- [ ] Citação de Ellen G. White sempre "tradição", com obra e página, nunca como prova de sentido.
- [ ] Nenhum "lado de Satanás" mapeado em pessoas ou igrejas reais.

## Erros comuns
Moralizar cada episódio; alegorizar parábola; tratar prática narrada como mandamento; resumir
mudando o sentido; deixar o jogador "decidir o que o texto significa".
