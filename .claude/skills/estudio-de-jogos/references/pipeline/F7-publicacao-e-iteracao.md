# F7. Publicação, licenças e iteração

**Objetivo:** publicar com **segurança jurídica e de dados** e planejar a manutenção.

> Esta fase usa **síntese minha** para licenças e privacidade (o acervo de livros não trata
> direito autoral brasileiro). **Não é orientação jurídica**: verifique cada licença e, havendo
> dúvida, consulte um profissional.

## Entrada
Versão testada (F6).

## Passos
1. **Empacotar** (08): hospedagem comum, PWA, Capacitor para Android e iOS; checklist de loja.
2. **Registro de licenças** (`licencas` no `projeto.json`):
   - **Tradução da Bíblia**: registre qual edição e sob qual licença ou autorização. Edições
     antigas costumam estar em domínio público; edições modernas costumam ter direitos reservados e
     regras de citação e de uso digital. **Verifique a edição específica** antes de embutir texto.
   - **Ellen G. White**: registre obra, tradutor/editora e permissão; citações curtas rotuladas;
     verificar a política do detentor dos direitos para uso em aplicativo.
   - **Arte, fontes, áudio**: origem e licença de cada ativo; **imagens de IA** com registro de
     geração (ferramenta, data, prompt) e leitura dos termos de uso da ferramenta.
3. **Dados e privacidade** (07, 29): coletar o mínimo; consentimento claro; política em
   linguagem simples; **crianças** exigem base legal e consentimento dos responsáveis (LGPD);
   sem relato pessoal gravado por padrão; localização só se essencial.
4. **Linguagem pública** (52): textos de loja e de apresentação com a mesma versão para público
   interno e externo; sem suavizar posição; sem caricaturar outras tradições.
5. **Monetização**: a skill **não** adota monetização por retenção (07, 16); se houver
   cobrança, só por acesso/ativo, sem economia de espera.
6. **Iteração**: o que medir (sem vigiar pessoas), revisão periódica dos rótulos, atualização
   de traduções e de versões de biblioteca, canal de feedback (29, 11).

## Ferramentas a abrir
`08`, `07`, `29`, `11`, `52`, `16`.

## Saída
Pacote publicável + `licencas` preenchido + política de dados + plano de iteração.

## Portão G7 (executável)
`auditaLicencas` sem avisos (tradução, E. G. White se usada, ativos, imagens de IA, dados, crianças) e:
- [ ] Texto de apresentação revisado (52 QD14, QD17).
- [ ] Política de dados em linguagem simples publicada.
- [ ] Plano de revisão (versões de biblioteca, tradução, rótulos).

## Erros comuns
Embutir texto de tradução sem licença; esquecer o registro das imagens de IA; coletar dados "por
via das dúvidas"; texto de loja que promete mais do que o jogo faz.
