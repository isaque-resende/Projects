# Cleopas

O discípulo que acompanha o jogador no caminho de Emaús. Modelo do Tripo (já rigado por ele), convertido no Blender para o mesmo esqueleto e as mesmas animações do discípulo jogável.

| | Cleopas | Discípulo jogável |
| --- | --- | --- |
| Triângulos | 14.180 | 14.207 |
| Esqueleto | 65 ossos (Universal Animation Library) | o mesmo |
| Animações | 13 | 13 |
| Textura | só cor, 2048 px, WebP (373 KB) | só cor, WebP |
| GLB | 1,4 MB | 2,2 MB |

## Como foi feito

- **Rosto em detalhe, corpo leve:** a cabeça (rosto, cabelo, barba e olhos) manteve os 6.594 triângulos do original; só o corpo foi reduzido (de 21.874 para cerca de 7.600). Na textura, as ilhas do rosto receberam 2,6 vezes mais espaço que o resto.
- **Pesos do próprio Tripo:** as juntas do esqueleto do Tripo posicionaram o esqueleto do discípulo, e os pesos dele foram convertidos para os nomes de ossos do discípulo (ossos de torção somados ao osso principal). A barra da túnica tem os pesos suavizados para não rasgar ao andar.
- **Material igual ao do jogador:** só cor, metal 0, rugosidade 0,5, dois lados, sem meshopt.

## Animações

`Parado`, `Conversando`, `Andar`, `Trote`, `Correr`, `Pulo_Inicio`, `Pulo_Ar`, `Pulo_Queda`, `Interagir`, `Pegar`, `Ajoelhar`, `Empurrar`, `Agachado` — os mesmos nomes do `vila-betania/discipulo_acoes.glb`, então o mesmo código de animação serve para os dois.

Origem nos pés, 1,70 m de altura, de frente para +Z no three.js.

![Cleopas de frente e de costas](previa.png)
