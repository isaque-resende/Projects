# Personagens provisórios (para modelar depois no Blender)

Modelos **provisórios**, guardados aqui para serem retrabalhados no computador local com o Blender. Não fazem parte do jogo publicado e não estão ligados ao índice do site.

## maria_marta_lazaro_tripo.glb

![Prévia](previa.png)

- Origem: Tripo (exportação GLB), uma única malha com as três figuras lado a lado, em pose A.
- Da esquerda para a direita: **Maria** (véu e manto roxos), **Marta** (túnica ocre com avental verde), **Lázaro** (barba, manto verde-azulado, cinto com bolsa).
- 44.150 triângulos no total, 1 mesh, 1 material, 3 texturas embutidas (1 PNG e 2 JPEG), 3,9 MB.
- Sem esqueleto (rig) e sem animações; o conjunto inteiro está normalizado em cerca de 1 m de largura (altura de ~0,52 m).

## Próximos passos no Blender

1. Separar a malha em três objetos (Maria, Marta, Lázaro) por partes soltas.
2. Reescalar para a altura do jogo (o discípulo do jogo mede cerca de 1,70 m).
3. Montar o esqueleto compatível com o do discípulo (Universal Animation Library) para reaproveitar as animações: parado, conversando, andar, trote, correr.
4. Reduzir os triângulos de cada personagem para o orçamento do jogo e exportar em GLB para `assets-vila/`.
