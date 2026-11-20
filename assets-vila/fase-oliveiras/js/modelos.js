// Monte das Oliveiras: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const [gCen, gJer, gJog, gPrensa, gPlantas, nPrenseiro, KIT] = await Promise.all([
  baixar('../fase-oliveiras/oliveiras_cenario.glb?v=3'), baixar('../jerusalem/jerusalem_maquete.glb?v=4'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../prensa-azeite/prensa.glb'), baixar('../flores/plantas_betfage.glb?v=1'),
  baixar('../personagens/aldeao.glb'),
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gPrensa, gPlantas, nPrenseiro, KIT };
