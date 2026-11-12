# Personagens (pastor, aldeão e sacerdote)

Três NPCs a partir de um único modelo do Tripo com as três figuras lado a lado. Cada um foi separado no Blender, reduzido para 15 mil triângulos com a cabeça protegida e montado no mesmo esqueleto do discípulo jogável. Os nomes são provisórios.

| Arquivo | Personagem | Altura | Triângulos (original) | Cabeça | GLB |
| --- | --- | --- | --- | --- | --- |
| `pastor.glb` | jovem pastor com um cordeiro nos braços | 1,62 m | 15.002 (55.032) | 7.374 de 7.374 | 847 KB |
| `aldeao.glb` | aldeão sorridente com a jarra | 1,70 m | 14.995 (41.143) | 6.959 de 6.959 | 813 KB |
| `sacerdote.glb` | sacerdote de turbante, barba e peitoral | 1,78 m (com o turbante) | 14.996 (45.508) | 6.483 de 6.483 | 866 KB |

Origem nos pés, de frente para +Z no three.js.

## Como foi feito

- **Rosto preservado:** a cabeça foi protegida na redução; só o corpo e a roupa foram simplificados. Na textura, as ilhas do rosto têm mais espaço que o resto.
- **Esqueleto do jogador:** 65 ossos (Universal Animation Library), com as animações `Parado`, `Conversando`, `Andar`, `Trote` e `Correr`.
- **Cabeça rígida:** do queixo para cima (barba incluída) tudo segue só o osso `Head`, e a transição para o pescoço fica no cilindro do pescoço, para o rosto não entortar.
- **Pés separados:** as sandálias foram cortadas uma da outra e cada uma segue só o seu pé.
- **Segurando objetos:** no pastor, os dois braços e o cordeiro seguem o peito; no aldeão, o braço da jarra segue o peito e o outro balança; no sacerdote, a barba longa segue a cabeça.
- **Barra da túnica:** no meio da frente e de trás, a barra segue as duas pernas igualmente, para não esticar no passo.
- **Textura:** só cor (1024 px) e mapa de normais (512 px), em WebP, sem meshopt.

![Pastor, aldeão e sacerdote](previa.png)
