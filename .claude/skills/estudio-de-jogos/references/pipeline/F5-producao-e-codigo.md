# F5. Produção e código

**Objetivo:** construir com qualidade, com **conteúdo em dados** e o **texto canônico protegido**.

## Entrada
Mecânica (F3), telas e kit (F4), roteiro em dados (F2).

## Passos
1. **Stack e arquitetura** (08): HTML/CSS/JS, conteúdo em JSON, PWA, Capacitor para lojas;
   separar conteúdo, regra e tela.
2. **Planejamento** (10): graybox primeiro; arte final só com o núcleo de pé; dependências e
   backlog; sprint curto.
3. **Padrões** (25, 28): estado, laço, comandos, eventos, dados por tipo, camadas lógica × vista;
   gêneros habilitados.
4. **JavaScript moderno** (45): imutabilidade, erros tratados, módulos, assíncrono, laço de animação,
   salvar progresso.
5. **Mundos em grade** (31) e **3D** (32), se aplicável.
6. **Rótulos no dado**: `tipo`, `ref`, `uso` e `fonte` acompanham cada afirmação no JSON.
7. **Testes** (46): pirâmide, determinismo, **teste de fidelidade do texto canônico por hash**,
   progresso salvo, finais fixos.
8. **Rodar os portões** (`node scripts/gates.mjs projeto.json`) a cada versão de conteúdo.

## Ferramentas a abrir
`08`, `10`, `25`, `28`, `45`, `46`; opcionais `31`, `32`.

## Saída
Protótipo → versão jogável com conteúdo em JSON, testes e `projeto.json` auditável.

## Portão G5
- [ ] Texto bíblico e finais **fixos** protegidos por teste de fidelidade.
- [ ] `rodaGates` sem avisos para F0, F2, F3.
- [ ] Progresso salva e restaura; funciona offline (service worker) quando previsto.
- [ ] Sem dependência de serviço externo para o conteúdo essencial.
- [ ] Dados pessoais: mínimo; nada de relato pessoal gravado por padrão.

## Erros comuns
Construir motor próprio; conteúdo dentro do código; testes que dependem de relógio ou aleatório
sem semente; salvar tudo no `localStorage` como se fosse confiável.
