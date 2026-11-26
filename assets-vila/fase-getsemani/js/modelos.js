// Getsêmani: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const [gCen, gJer, gJog, gPrensa, gPlantas, nGuarda, nPedro, nJoao, nTiago, KIT] = await Promise.all([
  baixar('../fase-getsemani/getsemani_cenario.glb?v=5'), baixar('../jerusalem/jerusalem_maquete.glb?v=5'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../prensa-azeite/prensa.glb'), baixar('../flores/plantas_betfage.glb?v=1'), baixar('../personagens/aldeao.glb'),
  baixar('../personagens/barbudo.glb'), baixar('../personagens/cacheado.glb'), baixar('../personagens/robusto.glb'),     // as lembranças (cenas.js)
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gPrensa, gPlantas, nGuarda, nPedro, nJoao, nTiago, KIT };
