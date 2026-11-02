import test from 'node:test';
import assert from 'node:assert/strict';
import {
  auditaBriefing, auditaGenero, auditaRotulos, auditaConflito, auditaUso,
  auditaPratica, auditaCamadas, auditaDebates, auditaMecanicas, auditaLicencas,
  auditaAcessibilidade, rodaGates,
} from './gates.mjs';

const briefingOk = {
  fonteDoEstudo: 'lição X', traducao: 'ARC', tradicao: 'adventista (histórico-bíblico)',
  publico: 'adultos', grauDeAdaptacao: 'expansão rotulada', oQueNaoFara: 'não mede fé',
};

test('briefing completo não gera avisos; incompleto lista cada campo', () => {
  assert.deepEqual(auditaBriefing(briefingOk), []);
  assert.equal(auditaBriefing({ traducao: 'ARC' }).length, 5);
});

test('gênero: parábola como alegoria é sinalizada; gênero desconhecido também', () => {
  assert.equal(auditaGenero({ id: 'c1', genero: 'parabola', mecanicas: ['alegoria_ponto_a_ponto'] }).length, 1);
  assert.equal(auditaGenero({ id: 'c1', genero: 'xyz' }).length, 1);
  assert.deepEqual(auditaGenero({ genero: 'salmo', mecanicas: ['escolha_de_resposta'] }), []);
});

test('rótulos: sem rótulo, texto sem ref, assunto sensível, E. G. White, fala divina', () => {
  assert.equal(auditaRotulos([{}]).length, 1);
  assert.equal(auditaRotulos([{ tipo: 'texto' }]).length, 1);
  assert.equal(auditaRotulos([{ tipo: 'texto', ref: 'Dn 8:14', assunto: 'santuario' }]).length, 1);
  assert.equal(auditaRotulos([{ tipo: 'contexto', fonte: 'ellen-white' }]).length, 1);
  assert.equal(auditaRotulos([{ tipo: 'tradicao', fala: true }]).length, 1);
  assert.deepEqual(auditaRotulos([{ tipo: 'adaptacao', fala: true }]), []);
});

test('conflito: flag proibida e elementos obrigatórios', () => {
  const ok = { elementos: ['carater_de_deus', 'liberdade_de_escolha', 'cruz_no_centro'] };
  assert.deepEqual(auditaConflito(ok), []);
  assert.equal(auditaConflito({ ...ok, flags: ['contagemRegressivaDoFim'] }).length, 1);
  assert.equal(auditaConflito({ elementos: ['carater_de_deus'] }).length, 2);
});

test('uso: doutrina homilética, E. G. White exegética, tipologia sem marca, uma só versão', () => {
  const ok = { uso: 'exegetico', ehDoutrina: true, versoes: ['ARC', 'NVI'] };
  assert.deepEqual(auditaUso([ok]), []);
  assert.equal(auditaUso([{ ...ok, uso: 'homiletico' }]).length, 1);
  assert.equal(auditaUso([{ ...ok, fonte: 'ellen-white' }]).length, 1);
  assert.equal(auditaUso([{ ...ok, tipologia: true }]).length, 1);
  assert.equal(auditaUso([{ ...ok, versoes: ['ARC'] }]).length, 1);
});

test('prática universal×cultural e camadas texto/leitor', () => {
  const ok = { forma: 'batismo', escopo: 'universal', significado: 'universal', aplicacao: 'direta', base: 'Mt 28:19' };
  assert.deepEqual(auditaPratica([ok]), []);
  assert.equal(auditaPratica([{ ...ok, aplicacao: 'indireta' }]).length, 1);
  assert.equal(auditaPratica([{ ...ok, base: undefined }]).length, 1);
  assert.deepEqual(auditaCamadas({ textoDiz: 'Jo 3:16', paraMim: { texto: 'livre' } }), []);
  assert.equal(auditaCamadas({ textoDiz: 'x', paraMim: { pontua: true }, sentidoPorVoto: true }).length, 2);
});

test('debates internos: posição declarada ou omissão; exigir crer em E. G. White', () => {
  assert.deepEqual(auditaDebates({ temas: ['expiacao'], posicaoDeclarada: { expiacao: 'provida e aplicada' } }), []);
  assert.equal(auditaDebates({ temas: ['natureza_de_cristo'] }).length, 1);
  assert.deepEqual(auditaDebates({ temas: ['natureza_de_cristo'], omitido: ['natureza_de_cristo'] }), []);
  assert.equal(auditaDebates({ exigeCrerEmEGW: true }).length, 1);
  assert.deepEqual(auditaDebates({ temas: ['batismo'] }), []);
});

test('mecânicas proibidas', () => {
  assert.equal(auditaMecanicas(['pontos_de_salvacao', 'medir_fe', 'quiz']).length, 2);
  assert.deepEqual(auditaMecanicas(['quiz']), []);
});

test('licenças e dados', () => {
  assert.equal(auditaLicencas({}).length, 1);
  assert.deepEqual(auditaLicencas({ licencas: { traducao: 'domínio público (verificada)', ativos: [{ nome: 'capa', origem: 'IA', licenca: 'uso comercial permitido', geradoPorIA: true, registroDeGeracao: 'ferramenta/data/prompt' }] } }), []);
  assert.equal(auditaLicencas({ licencas: { traducao: 'x', ativos: [{ nome: 'foto' }] } }).length, 1);
  assert.equal(auditaLicencas({ licencas: { traducao: 'x', ativos: [{ nome: 'img', origem: 'IA', licenca: 'ok', geradoPorIA: true }] } }).length, 1);
  assert.equal(auditaLicencas({ licencas: { traducao: 'x' }, coletaDados: true, publicoCriancas: true }).length, 2);
  assert.equal(auditaLicencas({ licencas: { traducao: 'x' }, usaEGW: true }).length, 1);
});

test('acessibilidade mínima lista cada item faltante', () => {
  assert.equal(auditaAcessibilidade({}).length, 6);
  assert.deepEqual(auditaAcessibilidade({ textoRedimensionavel: true, contrasteVerificado: true, semDependenciaDeCor: true, movimentoReduzivel: true, legendasOuTranscricao: true, tecladoOuToqueSemPrecisao: true }), []);
});

test('rodaGates: projeto limpo passa e projeto problemático lista avisos de várias fases', () => {
  const limpo = {
    briefing: briefingOk,
    licencas: { traducao: 'ARC (edição verificada)' },
    cenas: [{
      id: 'c1', genero: 'parabola', mecanicas: ['escolha_de_resposta'],
      afirmacoes: [{ tipo: 'texto', ref: 'Lc 15:11-32' }],
      usos: [{ uso: 'exegetico' }],
      camadas: { textoDiz: 'Lc 15', paraMim: { texto: 'livre' } },
    }],
  };
  assert.deepEqual(rodaGates(limpo), { ok: true, avisos: [] });
  const ruim = { briefing: {}, cenas: [{ id: 'c1', genero: 'parabola', mecanicas: ['alegoria_ponto_a_ponto', 'pontos_de_salvacao'], afirmacoes: [{}] }] };
  const r = rodaGates(ruim);
  assert.equal(r.ok, false);
  assert.ok(r.avisos.some((a) => a.startsWith('F0')));
  assert.ok(r.avisos.some((a) => a.startsWith('F2')));
  assert.ok(r.avisos.some((a) => a.startsWith('F3')));
  assert.ok(r.avisos.some((a) => a.startsWith('F7')));
});
