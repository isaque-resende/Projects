// Betfagé: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar, nos } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const [gCen, gInsula, gTrigo, gColh, gBoi, gOve, gJum, gJog, gFigSeca, gPlantas,
  nAldeao, nFaixa, nCarreg, nRobusto, nBotoes, nMoco, nMagro, nRapaz, aMalharR, aMalharM, nPedro, nJoao, gFigs, KIT] = await Promise.all([
  baixar('../fase-betfage/betfage_cenario.glb?v=26'), baixar('../casa-porta/insula.glb'), baixar('../trigal/trigo.glb'), baixar('../colheita-trigo/colheita.glb'),
  baixar('../animais/boi.glb'), baixar('../animais/ovelha.glb'), baixar('../animais/jumento.glb'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../figueiras/figueira_seca.glb'), baixar('../flores/plantas_betfage.glb?v=1'),
  baixar('../personagens/aldeao.glb'), baixar('../personagens/mulher_faixa.glb'), baixar('../personagens/carregador.glb'),
  baixar('../personagens/robusto.glb'), baixar('../personagens/mulher_botoes.glb'), baixar('../personagens/moco.glb'),
  baixar('../personagens/magro.glb'), baixar('../personagens/rapaz.glb'),
  baixar('../personagens/robusto_malhar.glb?v=1'), baixar('../personagens/mulher_botoes_malhar.glb?v=1'),     // clipe da eira (feito no Blender, malhar.py)
  baixar('../personagens/barbudo.glb'), baixar('../personagens/cacheado.glb'), baixar('../figueiras/figueiras.glb'),     // as lembranças (cenas.js): Pedro, João e a figueira com folhas
  carregaKit(LAY.objetos),
]);
// peças da colheita (feixes, carga da carroça) e onde cada uma ficava no modelo
const CO = nos(gColh), CO0 = {}; for (const [n, o] of Object.entries(CO)) { CO0[n] = o.position.clone(); o.position.set(0, 0, 0); }

export { gCen, KIT, gInsula, gTrigo, gFigSeca, gPlantas, nAldeao, nFaixa, nCarreg, CO, CO0, gBoi, nRobusto, nBotoes, gJum, nMagro, nRapaz, gOve, nMoco, gJog, aMalharR, aMalharM, nPedro, nJoao, gFigs };
