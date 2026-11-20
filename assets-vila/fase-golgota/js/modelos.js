// Gólgota: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const [gCen, gJer, gJog, gPlantas, gFlores, gRocha, gPedra, nPedro, nJoao, nMaria, KIT] = await Promise.all([
  baixar('../fase-golgota/golgota_cenario.glb?v=1'), baixar('../jerusalem/jerusalem_maquete.glb?v=4'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../flores/plantas_betfage.glb?v=1'), baixar('../flores/flores.glb'),
  baixar('../casa-porta/tumulo_rocha.glb?v=3'), baixar('../casa-porta/tumulo_pedra.glb'),
  baixar('../personagens/barbudo.glb'), baixar('../personagens/cacheado.glb'), baixar('../personagens/mulher_lenco.glb'),
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gPlantas, gFlores, gRocha, gPedra, nPedro, nJoao, nMaria, KIT };
