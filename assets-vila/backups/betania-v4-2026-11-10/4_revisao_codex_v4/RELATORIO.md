# Betânia — revisão local v4

Revisão aplicada em 10/11/2026 sobre o backup da v3 (e6619f2). Alterações locais; sem publicação no GitHub Pages.

## Abrir o jogo

Dê duplo clique em `../INICIAR_JOGO.cmd`, mantenha o terminal aberto e acesse **http://127.0.0.1:8766/vila-betania/**. Requer Node.js. O servidor atende somente a este computador. O three.js e o BVH continuam vindo do CDN e precisam de internet.

## Problemas encontrados e corrigidos

| Prioridade | Problema e consequência | Correção |
| --- | --- | --- |
| Alta | Arrastar o joystick durante uma ação apagava sua rota; a promessa de caminhada podia nunca terminar. | Bloqueio da entrada de movimento enquanto o roteiro está ocupado. |
| Alta | Trocar de janela podia deixar WASD ou o zoom/giro contínuo acionados. | Limpeza das teclas, dedos, joystick e intervalos no blur e ao ocultar a página. |
| Alta | Soltar uma pinça podia virar um toque no chão e mandar o jogador caminhar. | Marcação de gesto múltiplo e espera pela retirada de todos os dedos. |
| Alta | O servidor Python interrompeu quatro requisições de GLB no teste inicial. | Servidor Node por streaming, sem dependências, e iniciador por duplo clique. |
| Média | As texturas das casas não eram aguardadas nem incluídas no gerenciador de progresso. | Carga assíncrona aguardada; gerenciador compartilhado com o jogo. Interface antiga do construtor continua compatível. |
| Média | Erros de importação podiam ocorrer antes da instalação dos avisos; não havia botão para tentar novamente. | Captura anterior aos módulos, diagnóstico preservado, indicação do recurso e botão para recarregar. |
| Média | A silhueta usava operações de stencil sem solicitar esse buffer ao renderer. | `stencil: true` explícito; verificado no contexto WebGL. |
| Média | Botões de ação usavam somente pointerdown; instruções sumiam e não voltavam. | Ativação por click, teclado nativo, ajuda reabrível por ?/H, pausa durante a ajuda. |
| Média | Título perdia contraste sobre as casas; controles superiores tinham 40 px. | Placa de fundo, foco visível e alvos superiores de 44 px. |
| Média | Toda a legenda fechava ao tocá-la; dica e texto competiam no alto da tela. | Botão explícito para fechar, dica na região inferior e painéis com rolagem em telas pequenas. |
| Baixa | Dois pontos próximos eram escolhidos pela ordem da lista. | Seleção do ponto mais próximo do personagem. |

A captura de ponteiros também mantém o arraste consistente ao sair do canvas. A repetição automática de teclas não dispara ações discretas sucessivamente. Botões de corrida e ação expõem seus estados e nomes para tecnologias assistivas.

## Arte e texturas geradas

Duas texturas criadas com a ferramenta integrada **image_gen**, mantendo a direção de arte do projeto: tons de terra clara e calcário, planos amplos de cor e pinceladas digitais evidentes. A instrução atual do usuário autorizou a geração das imagens nesta sessão.

| Aplicação | Arquivo em vila-betania/tex | Formato | Tamanho |
| --- | --- | --- | --- |
| Terra dos caminhos e áreas construídas | terra_pintada_v4.webp | RGB, 1024 × 1024 | 65.562 bytes |
| Reboco das casas montadas pelo kit | reboco_pintado_v4.webp | RGB, 1024 × 1024 | 72.794 bytes |

Os WebPs usam qualidade 88, mipmaps e repetição espelhada para continuidade das bordas. O shader de variação existente continua misturando orientações e escalas. Não houve aumento de polígonos, materiais ou draw calls por causa destas duas substituições. A resolução nova ocupa mais memória de textura do que os arquivos pequenos anteriores; isso deve ser medido no celular.

Originais PNG e **prompts completos**: `../2_fontes/melhorias_pintadas_v4/`. As texturas anteriores permanecem em `tex/`. Os GLBs, UVs, atlas e arquivos Blender não foram alterados. Esta revisão aprimora terreno e reboco; vegetação, personagens e objetos continuam usando seus atlas existentes.

## Validação

A bateria principal passou em **26 de 26 verificações**: inicialização, ausência de novos erros de rede/runtime, stencil, ajuda/pausa, teclado, limpeza ao perder foco, nove rotas e interações da cisterna, forno, eira, túmulo, casa e lagar. Inclui retirar água, encher cântaro, acender forno, assar pão, entrar/sair do túmulo e subir/descer do terraço.

A bateria adicional passou em **5 de 5 verificações**: joystick durante uma interação, pinça sem caminhada, repetição de zoom após perder foco, acesso ao botão de retorno por rolagem em paisagem e mensagem recuperável de textura ausente.

As interações foram verificadas pelo estado final e pela liberação do jogador, usando passos determinísticos de 50 ms em `?teste=1`. Esse modo existe só na URL de testes e permite validar os roteiros sem depender da velocidade da GPU emulada. Os testes não certificam que cada quadro de cada animação está visualmente perfeito.

Capturas revisadas em desktop (1000 × 700), retrato (390 × 844) e paisagem (844 × 390), incluindo ajuda. Sintaxe dos dois módulos verificada com `node --check` em cópias `.mjs`. Consulte `resultados.json`, `regressoes.json` e `evidencias/` para os resultados e imagens.

## Limites e próximas melhorias

- Desempenho, consumo de memória e conforto dos gestos em um celular físico ainda precisam de teste no aparelho. A execução headless usa GPU de software; seus tempos não são um benchmark de FPS do jogo.
- O carregamento ainda busca todos os modelos de uma vez e depende do CDN. Uma próxima etapa útil é medir carga inicial no 4G e avaliar bibliotecas locais/cache e carga por proximidade.
- A resolução de sombras e o limite de pixel ratio são fixos. Um modo gráfico econômico deve ser definido depois de medir o aparelho alvo, especialmente agora com as duas texturas 1024.
- A navegação da prensa, aprisco e saída foi verificada; não foram criadas atividades novas nesses lugares.

## Restaurar a versão anterior

`antes/` guarda os dois arquivos de código originais e o LEIA-ME original. Para restaurá-los, execute `RESTAURAR_V3.ps1` no PowerShell. Isso copia esses três arquivos de volta e conserva as novas imagens e o relatório para consulta.
