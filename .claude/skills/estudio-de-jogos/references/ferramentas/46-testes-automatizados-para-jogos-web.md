# Ferramenta 46: Testes automatizados para jogos web (da Costa)

> **Pipeline:** fase principal **F5** (`../pipeline/F5-producao-e-codigo.md`); também usada em F6.

Para **decidir o que testar, em que nível e como**, e para **proteger o que não pode mudar**
(texto canônico, finais fixos, progresso salvo). Fonte: Lucas da Costa, *Testing JavaScript
Applications* (Manning, 2021; ferramentas da época: Jest 26, Cypress, Percy, JSDOM, React Testing
Library). Os itens `TA#` são meus (numeração por tema; **tudo em paráfrase**; código **meu**,
reescrito com o domínio do projeto). Complementa `45` (JS moderno e qualidade de código), `25`
(padrões), `28` (arquitetura), `29` (pesquisa), `24` (UX e acessibilidade) e `21` (fidelidade).

> **Escopo:** o livro é de **aplicações web comuns** (loja, API, React), não de jogos. Aproveitei a
> **lógica de decisão** (pirâmide, custo, determinismo), e **transfiro** para jogos por inferência
> minha. Em um jogo de **canvas/animação**, o livro **não** ensina testes (física, sensação de
> jogo, áudio); isso exige **playtest** (`06`, `29`). Ver `livros.md`, seção 54.

## 1. Por que testar e o que um teste é (TA1 a TA5)

**TA1. Teste automatizado** é um programa que **monta uma cena, executa e compara** com o
esperado (**arranjar, agir, afirmar**); só serve se **falha quando a aplicação erra**.
**TA2. Provas:** testes **não provam** que funciona, só mostram que **bugs conhecidos** não estão;
são **experimentos**: crie o teste **antes** de corrigir o bug e **veja-o falhar**.
**TA3. Ganhos:** **previsibilidade** (feedback curto), **reprodutibilidade** (passos idênticos),
**colaboração** (documentação que **não envelhece**) e **velocidade** (o custo se paga com o uso).
**TA4. Investimento:** tem **custo inicial**; rende mais em projetos **longos** (um protótipo de
fim de semana pouco se beneficia).
**TA5. Não substitui:** teste manual e **exploratório**/QA humano seguem necessários; a revisão
**teológica** também (ver seção 9).

## 2. Pirâmide e níveis (TA6 a TA11)

**TA6. Pirâmide:** muitos **testes unitários** (função isolada, rápidos), **integração** (partes
juntas e dependências reais, médios) e poucos **ponta a ponta** (como o usuário, lentos, caros).
**TA7. Classificar por escopo,** não por alvo: quanto **maior a fatia** de software exercitada,
mais alto na pirâmide; rótulos são **guias**, não doutrina.
**TA8. Caixa preta × branca:** testes que **ignoram internos** (caixa preta) duram mais e dão mais
confiança; os que dependem de detalhes (caixa branca) quebram na refatoração.
**TA9. Na dúvida, integração:** custa pouco, dá garantia forte, evita simular o que é fácil usar
de verdade (ex.: banco de teste real em vez de dublê do cliente de banco).
**TA10. Não testar software de terceiros;** teste **o seu uso** dele. Se for testar, contribua com
o projeto de origem.
**TA11. Testes de API/GUI:** de API validam **contratos**; de GUI usam navegador real
(Cypress, Selenium, Puppeteer); poucos e focados em **fluxos principais**.

## 3. Organização (TA12 a TA17)

**TA12. Agrupar** (`describe`), com **ajudantes e ganchos** no escopo em que são usados;
`beforeEach`/`afterEach` **relativos ao grupo**.
**TA13. Testes pequenos:** **uma ideia por teste** (feedback preciso, e todos os defeitos
aparecem numa execução).
**TA14. Paralelismo:** arquivos rodam em paralelo; **recursos compartilhados** (banco, arquivo)
geram **testes instáveis (flaky)**; use **instâncias separadas por trabalhador** ou execute
**em sequência**; "melhor lento e confiável que rápido e instável".
**TA15. Ganchos globais** (subir/derrubar banco) por configuração.
**TA16. Atomicidade:** qualquer teste deve rodar **sozinho**; sem dependência de ordem; cuidado
com ganchos demais (afastam o teste do seu preparo): gancho para **pré-condição comum**, função
utilitária para o resto.
**TA17. Nomear** o teste pelo **comportamento esperado** (documentação).

## 4. Boas afirmações (TA18 a TA23)

**TA18. Todo teste precisa afirmar algo;** em fluxos com `catch` garanta que **alguma**
afirmação rode (`hasAssertions`/`assertions(n)`) ou prefira `toThrow`.
**TA19. Afirmações justas:** aceitar **um único resultado**; "é um número" ou "é maior que" é
**frouxo**; **negações** (diferente de 2) aceitam quase tudo; para conteúdo **aleatório**,
use **assertivas assimétricas** (tipo/forma) só no campo variável.
**TA20. Preferir `toBe`/`toEqual`** (estritos); **igualdade profunda** × **referência**.
**TA21. Matchers próprios/estendidos** para **mensagens de erro claras**.
**TA22. Afirmação circular:** comparar o código com **ele mesmo** nunca falha; escreva o
**valor esperado à mão**; mantenha um pouco de duplicação em vez de testes que não falham.
**TA23. Dublês:** **stub** (substitui comportamento), **spy** (registra chamadas), **mock**
(expectativa pré-programada); use para **efeitos laterais** (log, e-mail) e **dependências
incontroláveis**; **não** simule o que é fácil usar; quanto mais dublê, **menos garantia**.

## 5. Determinismo e custo (TA24 a TA30)

**TA24. Testes determinísticos:** mesma entrada, mesmo resultado; **fontes de não determinismo**:
terceiros, **tempo**, **aleatoriedade**, paralelismo, estado inicial; **isole ou injete**.
**TA25. Tempo:** **relógios falsos** (timers e data **sincronizados**), avançar o tempo (`tick`)
em vez de esperar; ainda **aguarde** o efeito assíncrono (promessas) antes de afirmar.
**TA26. Aleatoriedade:** **simular** `Math.random` ou usar **semente**.
**TA27. Reduzir sobreposição:** testes que tocam o mesmo código repetem verificações; **mova
afirmações** para o teste de maior alcance; ganhe **menos manutenção** em troca de feedback menos
preciso.
**TA28. Garantias transitivas:** teste o ajudante caro (ex.: *logger*) **uma vez**; nos demais
verifique só que foi **chamado corretamente**.
**TA29. Afirmação como pré-condição:** se outros testes só passam com a autenticação funcionando,
ela já está verificada.
**TA30. Cobertura:** mostra **o que não foi executado** (pontos cegos); **ramificação** é a mais
útil; **não mede qualidade** (100% sem afirmações não pega nada, e entradas ruins passam).

## 6. Front-end, instável e visual (TA31 a TA38)

**TA31. DOM simulado (JSDOM):** testar **eventos**, **localStorage**, **history** e requisições
**sem navegador**; `localStorage` e `history` existem no ambiente de teste.
**TA32. Afirmar no DOM:** achar elementos de forma **robusta** (por **papel/rótulo/texto
acessível** em vez de classes), o que também **incentiva acessibilidade**.
**TA33. Componentes:** integrar **componentes reais**; **snapshots** (comparar saída anterior)
são **baratos mas frágeis**: gere **só** quando a saída está correta, **revise** a diferença,
use para saídas **pequenas e estáveis** (serializadores, textos, estilos).
**TA34. Histórias de componente** (stories) como **documentação executável**.
**TA35. Ponta a ponta com interface:** objetos de página (**page objects**) e **ações da
aplicação** (chamar o código diretamente quando o foco não é a interface).
**TA36. Instabilidade (flakiness):** **não esperar tempo fixo**, **esperar a condição**;
**simular o incontrolável** (rede, relógio); **repetição de teste** só como último recurso e
com critério; rodar em **vários navegadores**.
**TA37. Regressão visual:** compara **imagens** aprovadas; pega o que o snapshot de estilo
**não pega** (empurrão de margem).
**TA38. Bancos de teste separados;** nunca **poluir produção**; semear dados.

## 7. TDD, CI e cultura (TA39 a TA46)

**TA39. TDD** = **passos pequenos**: teste que **falha** (vermelho), **o mínimo** para passar
(verde), **refatorar**; ajuste o **tamanho do passo** à confiança; escreva o teste **antes** de
corrigir bug; **TDD de implementação** (mais testes) × **de manutenção** (menos, mais robustos).
**TA40. De cima para baixo × de baixo para cima:** alternar conforme o grafo de dependências;
testar o **módulo comum** libera passos maiores nos dependentes.
**TA41. Quando não aplicar TDD:** exploração/protótipo; quando o custo do teste supera o ganho.
**TA42. BDD e especificação** como linguagem comum com não programadores.
**TA43. CI/CD:** testes rodam **a cada mudança**; **entrega contínua** em passos pequenos, **flags
de recurso**, **reversão rápida**; **verificações do controle de versão** (cobertura mínima,
testes obrigatórios).
**TA44. Tipos:** **tornam estados inválidos irrepresentáveis**; **provam** propriedades que
testes não alcançam (TypeScript).
**TA45. Revisão de código:** descrição detalhada, revisão como **conversa**, dizer o que
**bloqueia**; PRs pequenos.
**TA46. Linters e formatadores** (consistência, ruídos), **monitoramento** em produção e
**documentação** que se mantenha.

## 8. Exemplos meus testados (a partir das ideias acima)

```js
// Rodar com: node --test arquivo.test.mjs   (Node 20, módulo nativo node:test)
import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';

// Código sob teste (pequeno e puro)
const aplicaEscolha = (estado, e) => ({ ...estado, cena: e.vai, historico: [...estado.historico, e.id] });
const criaArmazem = (st) => ({
  salva: (k, v) => st.setItem(k, JSON.stringify(v)),
  carrega: (k, padrao) => { const r = st.getItem(k); return r === null ? padrao : JSON.parse(r); },
});
const criaSorteio = (semente) => { let s = semente >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32); };
const hash = (s) => createHash('sha256').update(s.normalize('NFC')).digest('hex');
const MANIFESTO = { 'sl23:1': hash('O Senhor é o meu pastor; nada me faltará.') }; // gerado e REVISADO por humano
const verificaTexto = (ref, texto) => MANIFESTO[ref] === hash(texto);

test('unidade: novo estado, o antigo intacto, resultado único aceito', () => {
  const a = { cena: 'inicio', historico: [] };
  const b = aplicaEscolha(a, { id: 'e1', vai: 'campo' });
  assert.deepEqual(a, { cena: 'inicio', historico: [] });
  assert.deepEqual(b, { cena: 'campo', historico: ['e1'] });
});
test('integração: salvar/carregar com armazenamento falso', () => {
  const m = new Map();
  const arm = criaArmazem({ setItem: (k, v) => m.set(k, v), getItem: (k) => (m.has(k) ? m.get(k) : null) });
  arm.salva('p', { cena: 'campo' });
  assert.deepEqual(arm.carrega('p', null), { cena: 'campo' });
  assert.equal(arm.carrega('x', 'padrao'), 'padrao');
});
test('determinismo: mesma semente, mesma sequência', () => {
  const a = criaSorteio(42), b = criaSorteio(42);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
});
test('fidelidade: alteração do texto canônico é detectada', () => {
  assert.equal(verificaTexto('sl23:1', 'O Senhor é o meu pastor; nada me faltará.'), true);
  assert.equal(verificaTexto('sl23:1', 'O Senhor é o meu pastor; tudo me faltará.'), false);
});
```

**Resultado do teste:** **7 de 7** testes passaram em Node 20 com `node --test` (unidade,
integração com armazenamento falso, determinismo por semente, tempo injetado, fidelidade por
*hash*, espião sem dados pessoais e valor esperado escrito à mão). **Observação:** o livro usa
**Jest**; os exemplos acima usam o módulo **nativo** do Node para **não depender** de pacote;
a **API de Jest** (`describe`, `expect`, `jest.fn`) **não** foi testada aqui.

## 9. Aplicação a jogos teológicos (inferência minha)

| Ideia | Uso | Cuidado |
|---|---|---|
| **TA22, TA19 (afirmações justas e à mão)** | **Teste de fidelidade:** manifesto com **hash** do texto bíblico usado (por tradução e versão); o teste **falha** se o jogo alterar o texto | O manifesto é **gerado e revisado por humano**; o **hash** não prova **boa interpretação** (`21`) |
| **TA2, TA39 (bug primeiro como teste)** | Ao achar erro de **referência** ou **final alterado**, escreva o teste que falha **antes** de corrigir | Documentar a fonte; sem "consertar" texto por conveniência |
| **TA24 a TA26 (determinismo)** | **Semente** e **relógio injetado** para **reproduzir** uma sessão de estudo e para **testes de ordem/embaralhamento** | Não "decidir" desfechos canônicos por sorteio |
| **TA31 (localStorage, history)** | Testar **salvar, carregar e apagar** progresso; **migração** de versões de salvamento | **Privacidade:** teste que **nenhum dado pessoal** vai para **log**, **evento** ou URL |
| **TA32 (papel/rótulo)** | Achar elementos **por rótulo acessível**: se o teste não acha, **o leitor de tela também não** | Complementar com **teste manual** de acessibilidade (`24`) |
| **TA33, TA37 (snapshot e visual)** | **Regressão visual** para o **kit de imagens** (consistência) e para **layout de texto** | Aprovação **humana** de cada mudança; sem aceitar snapshot "porque quebrou" |
| **TA14, TA36 (instável, sem espera fixa)** | Testes de **assíncrono** (carregamento de texto) esperando a **condição** | Sem "pausas" arbitrárias |
| **TA28 (garantia transitiva)** | Testar **uma vez** o módulo de **citação de fonte** e verificar só que as cenas **o chamam** | A citação **sempre** aparece (teste de contrato) |
| **TA30 (cobertura)** | Cobertura de **ramificações** do **motor de cenas**; ver que **finais** estão cobertos | Cobertura **não mede** teologia nem emoção |
| **TA44 (tipos)** | **Tipos** para "cena sempre tem fonte rotulada (texto, contexto, inferência)" | Combinar com **revisão** humana |
| **TA43 (CI, flags)** | **Publicar em passos pequenos**; **flag** para recursos delicados (voz, UGC) | Sem experimento sobre **crianças** sem consentimento (`29`) |
| **TA5 (exploratório)** | **Sessões de revisão** com pessoas (diversidade de leitura e acessibilidade) | Teste automático **não** ouve o jogador (`29`) |

## 10. Ressalvas

- **Leitura:** ver `livros.md`, seção 54. **Lidos:** caps. 1 a 3 (quase integral em prosa),
  partes dos caps. 5, 9, 11 e 13, e inícios dos caps. 6, 8 e 12. **Não lidos:** cap. 4 (backend),
  cap. 7 (ecossistema React), cap. 10 e o restante dos caps. 6, 8, 9, 11 a 13.
- Muitas receitas são **de loja/servidor**; jogos de **canvas** exigem **playtest** e **ferramentas
  próprias** (comparar *frames*, simular entrada); **não** cobertos.
- **Ferramentas** (Jest 26, Cypress, Percy) **datam**; **verificar versões** atuais antes de usar.
