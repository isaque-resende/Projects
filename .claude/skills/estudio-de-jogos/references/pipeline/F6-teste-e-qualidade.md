# F6. Teste e qualidade

**Objetivo:** verificar que o jogo **funciona**, **ensina** e **respeita a pessoa**.

## Entrada
Versão jogável (F5).

## Passos
1. **Playtest** (06): observe em silêncio; colete experiências, não sugestões; ciclos curtos.
2. **Pesquisa com jogadores** (29): método (observação, pensar em voz alta, RITE, entrevista),
   quantas pessoas, perguntas, relato; cuidado com crianças e idosos; consentimento.
3. **Grupo** (36): se for jogo de célula, testar com facilitador; abrir, explorar e fechar.
4. **Aprendizagem** (33, 34): a evidência prevista em F1 apareceu? Sem medir fé.
5. **Testes automatizados** (46): unidade, integração, ponta a ponta; estáveis e determinísticos.
6. **Fidelidade** (47 a 52): uma pessoa de confiança da tradição revisa **os rótulos** e os
   pontos sensíveis; revisão humana, não só `gates`.
7. **Acessibilidade** (24): teclado, leitor de tela quando aplicável, contraste, movimento.
8. **Cuidado pastoral**: o teste inclui saída fácil, e alguém avalia o impacto emocional dos
   temas pesados.

## Ferramentas a abrir
`06`, `29`, `36`, `33`, `34`, `46`, `24`; guardrails `47` a `52` para a revisão.

## Saída
Relatório curto: o que funcionou, o que confundiu, o que ensinou, correções (RITE: achou, conserte).

## Portão G6
- [ ] Playtest com **público real** (ou o mais próximo possível) em pelo menos um ciclo.
- [ ] Testes automáticos verdes; teste de fidelidade verde.
- [ ] `rodaGates` sem avisos, incluindo `auditaAcessibilidade`.
- [ ] Revisão humana dos rótulos e dos pontos sensíveis registrada.
- [ ] Nenhum achado grave aberto (confusão, constrangimento, exposição de pessoa).

## Erros comuns
Testar só com a equipe; perguntar "gostou?" em vez de observar; ignorar o constrangimento em
grupo; tratar teste automático como substituto de playtest.
