// Gólgota: baixa de uma vez todos os modelos da fase, mais as peças citadas no layout (KIT).
import { baixar } from '../../limpo-motor/base.js';
import { carregaKit } from '../../limpo-motor/layout.js';
import { LAY } from './estado.js';

const [gCen, gJer, gJog, gPlantas, gFlores, gTumulo, nPedro, nJoao, nMaria, nSoldado, nSoldado2, KIT] = await Promise.all([
  baixar('../fase-golgota/golgota_cenario.glb?v=12'), baixar('../jerusalem/jerusalem_maquete.glb?v=5'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../flores/plantas_betfage.glb?v=1'), baixar('../flores/flores.glb'),
  baixar('../tumulo/tumulo.glb?v=1'),
  baixar('../personagens/barbudo.glb'), baixar('../personagens/cacheado.glb'), baixar('../personagens/maria.glb'),
  baixar('../personagens/robusto.glb'), baixar('../personagens/magro.glb'),
  carregaKit(LAY.objetos),
]);

export { gCen, gJer, gJog, gPlantas, gFlores, gTumulo, nPedro, nJoao, nMaria, nSoldado, nSoldado2, KIT };
