// Motor comum: um vão aberto numa parede (ou rocha) maciça. Os modelos não têm buraco atrás das portas, então quem
// entra ou sai era cortado na linha da porta. Aqui o vão é aberto na tela: um retângulo invisível marca (no estêncil)
// onde fica a abertura; ali se desenha um fundo escuro, meio metro para dentro. Quem passa pela porta aparece inteiro no
// vão e some no escuro do fundo.
//   abreVao(pai, { centro, normal (para fora), largura, altura, fundo = 0.5, cor })
// Precisa: criaBase({ estencil: true }) e, em quem atravessa o vão, malha.renderOrder = 3 (desenhado depois do vão).
import * as THREE from 'three';

export function abreVao(pai, { centro, normal, largura, altura, fundo = 0.5, cor = 0x120a05 }) {
  const n = normal.clone().setY(0).normalize(), giro = Math.atan2(n.x, n.z);
  const marca = new THREE.Mesh(new THREE.PlaneGeometry(largura, altura), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false,
    stencilWrite: true, stencilRef: 1, stencilFunc: THREE.AlwaysStencilFunc, stencilZPass: THREE.ReplaceStencilOp }));
  marca.position.copy(centro).addScaledVector(n, 0.02); marca.rotation.y = giro; marca.renderOrder = 1; pai.add(marca);
  const escuro = new THREE.Mesh(new THREE.PlaneGeometry(largura + 3, altura + 3), new THREE.MeshBasicMaterial({ color: cor, depthFunc: THREE.AlwaysDepth,
    stencilWrite: true, stencilRef: 1, stencilFunc: THREE.EqualStencilFunc, stencilZPass: THREE.ZeroStencilOp, stencilFail: THREE.KeepStencilOp }));
  escuro.position.copy(centro).addScaledVector(n, -fundo); escuro.rotation.y = giro; escuro.renderOrder = 2; pai.add(escuro);
  return { marca, escuro };
}
