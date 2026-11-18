// Betânia: baixa de uma vez todos os modelos da fase (casas, objetos, animais, personagens).
// As árvores e pedras do cenário são baixadas pelo layout, em cenario.js.
import { baixar } from '../../limpo-motor/base.js';
import './estado.js';     // só para manter a ordem de montagem

const [gCasaP, gForno, gRoch, gObj, gBarr, gPast, gOfi, gLagar, gRocha, gPedra, gCamara, gBoi, gOve, gJog,
  nMarta, nLazaro, gCleo, nAldeao, nLenco, nRobusto, nBotoes, nMagro, nMoco] = await Promise.all([
  baixar('../casa-porta/casa_porta.glb'), baixar('../forno-pao/forno.glb'), baixar('../casa-porta/rochas.glb'), baixar('../casa-porta/objetos_casa.glb'),
  baixar('../casa-porta/barracas.glb'), baixar('../casa-porta/pastoril.glb'), baixar('../casa-porta/oficios.glb'), baixar('../lagar/lagar.glb'),
  baixar('../casa-porta/tumulo_rocha.glb?v=3'), baixar('../casa-porta/tumulo_pedra.glb'), baixar('../casa-porta/tumulo_camara.glb'),
  baixar('../animais/boi.glb'), baixar('../animais/ovelha.glb'), baixar('../vila-betania/discipulo_acoes.glb'),
  baixar('../personagens/marta.glb'), baixar('../personagens/lazaro.glb'), baixar('../cleopas/cleopas.glb'),
  baixar('../personagens/aldeao.glb'), baixar('../personagens/mulher_lenco.glb'), baixar('../personagens/robusto.glb'),
  baixar('../personagens/mulher_botoes.glb'), baixar('../personagens/magro.glb'), baixar('../personagens/moco.glb'),
]);

export { gCasaP, gBarr, gObj, gPast, gForno, gLagar, gRocha, gPedra, gRoch, gCamara, nBotoes, nMoco, nMagro, nAldeao, nMarta, nLazaro, gCleo, nLenco, nRobusto, gOfi, gBoi, gOve, gJog };
