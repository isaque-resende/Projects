// Portões de qualidade da pipeline (fases F0 a F7). Regras MINHAS, derivadas das ferramentas
// 47 a 52 e 07; servem para auditar um projeto, não para decidir doutrina.
// Uso: import { rodaGates } from './gates.mjs';  rodaGates(projeto) -> { ok, avisos: [...] }
// Esquema do projeto: ver references/pipeline/00-visao-geral-e-gates.md e scripts/projeto.exemplo.json

// ---------- F0: briefing (ferramenta 47 §5) ----------
export const CAMPOS_BRIEFING = [
  'fonteDoEstudo', 'traducao', 'tradicao', 'publico', 'grauDeAdaptacao', 'oQueNaoFara',
];

export const GENEROS = {
  narrativa_at: { evitar: { alegoria_oculta: 'narrativa não é alegoria', moral_da_historia: 'não moralizar cada episódio', quem_e_voce: 'não personalizar', repetir_gesto_como_regra: 'ato narrado não é mandamento' } },
  atos: { evitar: { regra_de_igreja_por_precedente: 'o que é narrado não é, por isso, norma', modelo_unico_de_conversao: 'os padrões variam' } },
  evangelho: { evitar: { harmonizar_detalhes: 'não fundir os quatro relatos', versiculo_sem_contexto: 'ditos têm público e contexto' } },
  parabola: { evitar: { alegoria_ponto_a_ponto: 'parábola não é alegoria', so_ensino_doutrinario: 'ela pede resposta' } },
  lei: { evitar: { aplicar_regra_civil_ou_ritual_hoje: 'sem renovação no NT não é obrigatória', lei_como_salvacao: 'não era meio de salvação' } },
  profecia: { evitar: { linha_do_tempo_do_presente: 'profetas falavam do seu futuro próximo', segundo_sentido_por_conta_propria: 'sensus plenior é do autor inspirado' } },
  salmo: { evitar: { doutrina_de_um_salmo: 'poema musical não é tratado', promessa_de_vida_sem_dor: 'salmos não garantem vida fácil', resolver_dor_com_mecanica: 'lamento não se "resolve"' } },
  proverbio: { evitar: { garantia_legal: 'provérbio não é promessa', recompensa_automatica: 'provérbio é regra geral, não lei' } },
  apocalipse: { evitar: { calendario_de_eventos_atuais: 'são quadros, não cronograma', literalismo_de_cada_detalhe: 'símbolo ≠ descrição literal' } },
  epistola: { evitar: { versiculo_isolado_como_regra: 'epístola é ocasional: reconstruir a ocasião' } },
};

export const auditaBriefing = (briefing = {}) => {
  const avisos = [];
  for (const c of CAMPOS_BRIEFING) if (!briefing[c]) avisos.push(`F0 briefing: falta ${c}`);
  return avisos;
};

export const auditaGenero = ({ id = '?', genero, mecanicas = [] }) => {
  const g = GENEROS[genero];
  if (!g) return [`F0 ${id}: gênero desconhecido: ${genero}`];
  return mecanicas.filter((m) => g.evitar[m]).map((m) => `F0 ${id}: ${genero}: evitar "${m}" (${g.evitar[m]})`);
};

// ---------- F0/F2: rótulos (ferramenta 48) ----------
const TIPOS = new Set(['texto', 'contexto', 'tradicao', 'adaptacao']);
const SENSIVEIS = new Set(['sabado', 'santuario', 'mortos', 'criacao', 'profecia', 'remanescente', 'milenio']);

export const auditaRotulos = (afirmacoes = [], id = '?') => {
  const avisos = [];
  afirmacoes.forEach((a, i) => {
    const p = `F2 ${id}#${i}`;
    if (!TIPOS.has(a.tipo)) avisos.push(`${p}: sem rótulo válido`);
    if (a.tipo === 'texto' && !a.ref) avisos.push(`${p}: "texto" sem referência`);
    if (a.assunto && SENSIVEIS.has(a.assunto) && a.tipo === 'texto') avisos.push(`${p}: "${a.assunto}" é leitura da tradição, não só texto`);
    if (a.fonte === 'ellen-white' && a.tipo !== 'tradicao') avisos.push(`${p}: Ellen G. White deve ser rotulada como tradição`);
    if (a.fala && a.tipo !== 'adaptacao' && a.tipo !== 'texto') avisos.push(`${p}: fala de personagem divino sem rótulo de adaptação`);
  });
  return avisos;
};

// ---------- F2: grande conflito (ferramenta 49) ----------
const PROIBIDOS_CONFLITO = {
  pessoaRealComoSatanas: 'não identificar pessoas/igrejas reais com o lado de Satanás',
  vitoriaPorHabilidade: 'a vitória não é do jogador por habilidade (cruz é centro)',
  contagemRegressivaDoFim: 'sem datas ou contagem regressiva do fim (pressão/medo)',
  separarInspirado: 'não oferecer separar "o que é inspirado" na Bíblia',
  egwComoPalavraDeDeus: 'E. G. White não fala por Deus/Jesus',
};
const OBRIGATORIOS_CONFLITO = ['carater_de_deus', 'liberdade_de_escolha', 'cruz_no_centro'];

export const auditaConflito = (cena = {}, id = '?') => {
  const avisos = [];
  for (const f of cena.flags ?? []) if (PROIBIDOS_CONFLITO[f]) avisos.push(`F2 ${id}: ${f}: ${PROIBIDOS_CONFLITO[f]}`);
  for (const o of OBRIGATORIOS_CONFLITO) if (!(cena.elementos ?? []).includes(o)) avisos.push(`F2 ${id}: conflito sem ${o}`);
  return avisos;
};

// ---------- F2: uso do texto (ferramenta 50) ----------
const USOS = new Set(['exegetico', 'teologico', 'homiletico']);
const MARCAS_TIPO = new Set(['explicita', 'implicita', 'paralelismo']);

export const auditaUso = (afs = [], id = '?') => {
  const avisos = [];
  afs.forEach((a, i) => {
    const p = `F2 ${id}#${i}`;
    if (!USOS.has(a.uso)) avisos.push(`${p}: falta uso (exegetico/teologico/homiletico)`);
    if (a.ehDoutrina && a.uso === 'homiletico') avisos.push(`${p}: doutrina apoiada em uso homilético`);
    if (a.fonte === 'ellen-white' && a.uso === 'exegetico') avisos.push(`${p}: citação dela não prova sentido original`);
    if (a.tipologia && !MARCAS_TIPO.has(a.marcaDeTipo)) avisos.push(`${p}: tipologia sem marca no texto`);
    if (a.alegoria && !a.marcadaNoTexto) avisos.push(`${p}: alegorização sem marca no texto`);
    if (a.genero === 'narrativa' && a.normativa && !a.criterio) avisos.push(`${p}: narrativa tratada como norma sem critério`);
    if (a.ehDoutrina && (a.versoes ?? []).length < 2) avisos.push(`${p}: doutrina apoiada em menos de duas versões`);
  });
  return avisos;
};

// ---------- F2: prática universal × cultural e camadas texto/leitor (ferramenta 51) ----------
const ESCOPO = new Set(['universal', 'limitado']);
const SENTIDO = new Set(['universal', 'universal-simbolico', 'limitado']);
const APLIC = new Set(['direta', 'indireta', 'nenhuma']);

export const auditaPratica = (itens = [], id = '?') => {
  const avisos = [];
  itens.forEach((it, i) => {
    const p = `F2 ${id}#${i} ${it.forma ?? '?'}`;
    if (!ESCOPO.has(it.escopo)) avisos.push(`${p}: escopo inválido`);
    if (!SENTIDO.has(it.significado)) avisos.push(`${p}: significado inválido`);
    if (!APLIC.has(it.aplicacao)) avisos.push(`${p}: aplicação inválida`);
    if (it.escopo === 'universal' && it.significado === 'universal' && it.aplicacao !== 'direta') avisos.push(`${p}: universal/universal exige aplicação direta`);
    if (it.escopo === 'limitado' && it.significado === 'universal-simbolico' && it.aplicacao === 'direta') avisos.push(`${p}: forma limitada não aplica direto`);
    if (it.significado === 'limitado' && it.aplicacao !== 'nenhuma') avisos.push(`${p}: sentido limitado não se aplica`);
    if (!it.base) avisos.push(`${p}: falta base bíblica (critério vem da Escritura)`);
  });
  return avisos;
};

export const auditaCamadas = (cena = {}, id = '?') => {
  const avisos = [];
  if (!cena.textoDiz) avisos.push(`F2 ${id}: falta camada textoDiz`);
  if (cena.paraMim && cena.paraMim.pontua) avisos.push(`F2 ${id}: paraMim não pode pontuar`);
  if (cena.sentidoPorVoto) avisos.push(`F2 ${id}: sentido do texto não é votado nem sorteado`);
  return avisos;
};

// ---------- F0/F3: debates internos (ferramenta 52) ----------
const DEBATE = new Set([
  'natureza_de_cristo', 'expiacao', 'trindade_historia', 'ultima_geracao',
  'sabado_criterio', 'sinal_da_besta', 'juizo_investigativo', 'imortalidade',
]);

export const auditaDebates = (cena = {}, id = '?') => {
  const avisos = [];
  for (const t of cena.temas ?? []) {
    if (!DEBATE.has(t)) continue;
    if (!cena.posicaoDeclarada?.[t] && !cena.omitido?.includes(t)) avisos.push(`F2 ${id}: ${t}: debate interno sem posição declarada nem omissão`);
    if (cena.apresentadoComoUnica?.includes(t)) avisos.push(`F2 ${id}: ${t}: apresentado como doutrina única`);
  }
  if (cena.exigeCrerEmEGW) avisos.push(`F3 ${id}: não exigir crer em E. G. White para avançar`);
  if (cena.salvacaoPorGuardaDoSabado) avisos.push(`F3 ${id}: guarda do sábado como base da salvação`);
  if (cena.versoesDiferentesPorPublico) avisos.push(`F3 ${id}: mesma versão para público interno e externo`);
  return avisos;
};

// ---------- F3: mecânica (ferramentas 07, 16, 48) ----------
const MECANICAS_PROIBIDAS = {
  pontos_de_salvacao: 'salvação não é transacional (48 NC13)',
  contagem_regressiva_do_fim: 'sem pressão/medo (07, 48 NC16)',
  medir_fe: 'não medir nem comparar fé (07, 33)',
  ranking_publico_de_pessoas: 'não expor nem comparar pessoas (36, 07)',
  streak_punitivo: 'Black Hat: punição por ausência (16)',
  escassez_artificial: 'Black Hat: escassez (16)',
  monetizacao_de_espera: 'Black Hat: economia de espera (16, 31)',
};

export const auditaMecanicas = (mecanicas = [], id = '?') =>
  mecanicas.filter((m) => MECANICAS_PROIBIDAS[m]).map((m) => `F3 ${id}: "${m}": ${MECANICAS_PROIBIDAS[m]}`);

// ---------- F7: licenças e dados (lacuna cobrada na faxina) ----------
export const auditaLicencas = (projeto = {}) => {
  const avisos = [];
  const lic = projeto.licencas ?? {};
  if (!lic.traducao) avisos.push('F7 licenças: falta registrar licença/autorização da tradução bíblica');
  if (projeto.usaEGW && !lic.egw) avisos.push('F7 licenças: uso de E. G. White sem registro de edição, tradutor e licença');
  for (const a of lic.ativos ?? []) {
    if (!a.origem || !a.licenca) avisos.push(`F7 licenças: ativo "${a.nome ?? '?'}" sem origem ou licença`);
    if (a.geradoPorIA && !a.registroDeGeracao) avisos.push(`F7 licenças: imagem de IA "${a.nome ?? '?'}" sem registro de geração (ferramenta, data, prompt)`);
  }
  if (projeto.coletaDados && !projeto.privacidade?.minimo) avisos.push('F7 dados: coleta sem política de dados mínimos');
  if (projeto.publicoCriancas && projeto.coletaDados) avisos.push('F7 dados: coleta de dados com público infantil exige base legal e consentimento dos responsáveis');
  return avisos;
};

// ---------- F4/F6: acessibilidade mínima ----------
export const auditaAcessibilidade = (a = {}) => {
  const avisos = [];
  for (const k of ['textoRedimensionavel', 'contrasteVerificado', 'semDependenciaDeCor', 'movimentoReduzivel', 'legendasOuTranscricao', 'tecladoOuToqueSemPrecisao']) {
    if (a[k] !== true) avisos.push(`F4/F6 acessibilidade: falta ${k}`);
  }
  return avisos;
};

// ---------- Orquestração ----------
export const rodaGates = (projeto = {}) => {
  const avisos = [];
  avisos.push(...auditaBriefing(projeto.briefing));
  for (const c of projeto.cenas ?? []) {
    const id = c.id ?? '?';
    avisos.push(...auditaGenero({ id, genero: c.genero, mecanicas: c.mecanicas }));
    avisos.push(...auditaMecanicas(c.mecanicas, id));
    avisos.push(...auditaRotulos(c.afirmacoes, id));
    avisos.push(...auditaUso(c.usos ?? [], id));
    avisos.push(...auditaPratica(c.praticas ?? [], id));
    if (c.camadas) avisos.push(...auditaCamadas(c.camadas, id));
    if (c.conflito) avisos.push(...auditaConflito(c.conflito, id));
    avisos.push(...auditaDebates({ ...(c.debates ?? {}), exigeCrerEmEGW: c.exigeCrerEmEGW, salvacaoPorGuardaDoSabado: c.salvacaoPorGuardaDoSabado, versoesDiferentesPorPublico: c.versoesDiferentesPorPublico }, id));
  }
  avisos.push(...auditaLicencas(projeto));
  if (projeto.acessibilidade) avisos.push(...auditaAcessibilidade(projeto.acessibilidade));
  return { ok: avisos.length === 0, avisos };
};

// CLI: node scripts/gates.mjs caminho/do/projeto.json
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` || process.argv[1]?.endsWith('gates.mjs')) {
  const { readFileSync } = await import('node:fs');
  const arq = process.argv[2];
  if (arq) {
    const r = rodaGates(JSON.parse(readFileSync(arq, 'utf8')));
    console.log(r.ok ? 'OK: nenhum aviso' : r.avisos.join('\n'));
    process.exitCode = r.ok ? 0 : 1;
  }
}
