// Betesda: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const P = (n) => baixar('../personagens/' + n + '.glb');
const [gCen, gJer, gJog, gPlantas, gFlores, gOve, nBarbudo, nMagro, nRobusto, nLenco, nRapaz, nCarreg, nPastor, nFaixa, nAldeao, KIT] = await Promise.all([
  baixar('../fase-betesda/betesda_cenario.glb?v=2'), baixar('../jerusalem/jerusalem_maquete.glb?v=4'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../flores/plantas_betfage.glb?v=1'), baixar('../flores/flores.glb'), baixar('../animais/ovelha.glb'),
  P('barbudo'), P('magro'), P('robusto'), P('mulher_lenco'), P('rapaz'), P('carregador'), P('pastor'), P('mulher_faixa'), P('aldeao'),
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gPlantas, gFlores, gOve, nBarbudo, nMagro, nRobusto, nLenco, nRapaz, nCarreg, nPastor, nFaixa, nAldeao, KIT };
