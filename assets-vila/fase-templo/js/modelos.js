// Templo: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT): as nove barracas.
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const P = (n) => baixar('../personagens/' + n + '.glb');
const [gCen, gJer, gJog, gOve, gBoi, gPomba1, gPomba2, nSacerdote, nEscriba, nCacheado, nMercador, nAldeao, nBotoes, nMoco, nPastor, nRobusto, nBarbudo, nFaixa, nMagro, KIT] = await Promise.all([
  baixar('../fase-templo/templo_cenario.glb?v=7'), baixar('../jerusalem/jerusalem_maquete.glb?v=4'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../animais/ovelha.glb'), baixar('../animais/boi.glb'), baixar('../animais/pomba1.glb'), baixar('../animais/pomba2.glb'),
  P('sacerdote'), P('escriba'), P('cacheado'), P('mercador'), P('aldeao'), P('mulher_botoes'), P('moco'), P('pastor'), P('robusto'), P('barbudo'), P('mulher_faixa'), P('magro'),
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gOve, gBoi, gPomba1, gPomba2, nSacerdote, nEscriba, nCacheado, nMercador, nAldeao, nBotoes, nMoco, nPastor, nRobusto, nBarbudo, nFaixa, nMagro, KIT };
