# Jerusalém, Ano 30

Maquete 3D jogável (Three.js) de Jerusalém no tempo de Jesus, em estilo low poly estilizado, ao amanhecer.
Você controla um peregrino judeu do séc. I e pode visitar o Templo de Herodes, o Gólgota, o sepulcro no jardim,
o Monte das Oliveiras (com mirante), o Getsêmani, o vale do Cedrom, o Tanque de Siloé e a aldeia de Betânia.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173  (use --host para abrir no celular, na mesma rede)
npm run build    # gera dist/ estático
```

- Teclado: WASD mover · Shift correr · Espaço pular · F ajoelhar · arrastar para girar a câmera · roda para zoom
- Celular: joystick + botões CORRER / AJOELHAR / PULAR e arrastar a tela para girar a câmera
- Botão MAPA: teletransporte para cada lugar. `?at=golgota` (ou `templo`, `sepulcro`, `mirante`...) já começa lá; `?low` força qualidade reduzida.
- `hero-test.html` abre só o personagem (útil para ajustar as vestes).

## Estrutura

| Arquivo | O que faz |
|---|---|
| `src/main.js` | carregamento, céu da aurora, luz, física do jogador, câmera, interface |
| `src/character.js` | personagem: corpo base + cabelo/barba re-ligados + vestes geradas da malha (túnica, faixa, manto com franjas, sandálias) |
| `src/engine/solids.js` | colisão por caixas: escadas, plataformas, muralhas, interiores |
| `src/world/layout.js` | planta da cidade: coordenadas de tudo, muralha, portões, ruas, lugares |
| `src/world/terrain.js` | relevo, pintura do chão, horizonte com o mar, riacho |
| `src/world/temple.js` | Monte do Templo, pórticos, átrios, altar, Santuário, Fortaleza Antônia |
| `src/world/city.js` | muralhas, torres de Herodes, palácio, casas, mercado, Siloé |
| `src/world/sites.js` | Gólgota, sepulcro, mirante, Getsêmani, Cedrom, aldeia, campos |
| `src/world/flora.js` | oliveiras, ciprestes, amendoeiras, trigo, flores e capim (instanciados) |
| `src/world/life.js` | ovelhas, jumentos, pombas, fogo, fumaça, água |

## Créditos dos assets (todos CC0 / domínio público)

- **Quaternius** (quaternius.com): Universal Base Characters, Universal Animation Library, Stylized Nature MegaKit,
  Ultimate Animated Animals (jumento), Farm Animals (ovelha) — versões gratuitas.
- **Poly Haven** (polyhaven.com): HDRI `qwantani_sunset_puresky`; texturas `large_sandstone_blocks_01`,
  `white_sandstone_blocks_02`, `white_sandstone_bricks`, `marble_01`, `white_plaster_rough_01`, `plastered_stone_wall`,
  `clay_plaster`, `rock_wall_08`, `cliff_side`, `medieval_wood`, `dry_ground_rocks`, `aerial_grass_rock`, `rocky_trail`,
  `cobblestone_floor_01`.
- Gerado por código: vestes do personagem, ouro martelado, véu do Templo, ciprestes, capim, trigo e flores, céu.

Os .glb foram otimizados com `@gltf-transform/cli` (meshopt + texturas WebP); as texturas foram convertidas para WebP.
