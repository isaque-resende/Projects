// Betfagé: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar, nos } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const [gCen, gInsula, gTrigo, gColh, gBoi, gOve, gJum, gJog, gFigSeca, gPlantas,
  nAldeao, nFaixa, nCarreg, nRobusto, nBotoes, nMoco, nMagro, nRapaz, KIT] = await Promise.all([
  baixar('../fase-betfage/betfage_cenario.glb?v=26'), baixar('../casa-porta/insula.glb'), baixar('../trigal/trigo.glb'), baixar('../colheita-trigo/colheita.glb'),
  baixar('../animais/boi.glb'), baixar('../animais/ovelha.glb'), baixar('../animais/jumento.glb'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../figueiras/figueira_seca.glb'), baixar('../flores/plantas_betfage.glb?v=1'),
  baixar('../personagens/aldeao.glb'), baixar('../personagens/mulher_faixa.glb'), baixar('../personagens/carregador.glb'),
  baixar('../personagens/robusto.glb'), baixar('../personagens/mulher_botoes.glb'), baixar('../personagens/moco.glb'),
  baixar('../personagens/magro.glb'), baixar('../personagens/rapaz.glb'),
  carregaKit(LAY.objetos),
]);
// peças da colheita (feixes, carga da carroça) e onde cada uma ficava no modelo
const CO = nos(gColh), CO0 = {}; for (const [n, o] of Object.entries(CO)) { CO0[n] = o.position.clone(); o.position.set(0, 0, 0); }

export { gCen, KIT, gInsula, gTrigo, gFigSeca, gPlantas, nAldeao, nFaixa, nCarreg, CO, CO0, gBoi, nRobusto, nBotoes, gJum, nMagro, nRapaz, gOve, nMoco, gJog };
