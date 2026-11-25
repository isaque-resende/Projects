// Cidade alta: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const P = (n) => baixar('../personagens/' + n + '.glb');
const [gCen, gJer, gJog, gGal1, gGal2, nPedro, nJoao, nMaria, nPorteira, nServa, nGuarda, nMercador, nAldeao, nMoco, nMarta, KIT] = await Promise.all([
  baixar('../fase-cidade/cidade_cenario.glb?v=8'), baixar('../jerusalem/jerusalem_maquete.glb?v=5'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../animais/galinha1.glb'), baixar('../animais/galinha2.glb'),
  P('barbudo'), P('cacheado'), P('mulher_lenco'), P('mulher_botoes'), P('mulher_faixa'), P('robusto'), P('mercador'), P('aldeao'), P('moco'), P('marta'),
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gGal1, gGal2, nPedro, nJoao, nMaria, nPorteira, nServa, nGuarda, nMercador, nAldeao, nMoco, nMarta, KIT };
