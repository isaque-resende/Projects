# Reino Estilizado

Protótipo de RPG 3D em Three.js com visual low poly estilizado (floresta, lago, trilha, vento nas folhas, céu pintado, etalonagem de cor).

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173  (use --host para abrir no celular, na mesma rede)
npm run build    # gera dist/ estático
```

Controles: WASD mover, Shift correr, Espaço pular, F atacar, arrastar para girar a câmera, roda para zoom.
No celular: joystick + botões CORRER / ATACAR / PULAR e arrastar para girar a câmera.
Parâmetros de URL: `?hero=ranger_f` ou `?hero=peasant_m` trocam o personagem; `?low` força qualidade reduzida.

## Estrutura

- `src/main.js` renderer, céu, luz, personagem/animação, câmera, pós-processamento
- `src/world.js` terreno, lago, vegetação instanciada, vento, colisão
- `src/input.js` teclado, mouse e toque
- `public/assets/` modelos .glb (já otimizados: meshopt + texturas WebP 1K), HDRI e texturas

## Créditos dos assets (todos CC0 / domínio público)

- Quaternius: Stylized Nature MegaKit, Universal Base Characters, Universal Animation Library, Modular Character Outfits Fantasy (versões Standard gratuitas). https://quaternius.com
- Poly Haven: HDRI `kloofendal_48d_partly_cloudy_puresky`, texturas `aerial_grass_rock` e `rocky_trail`. https://polyhaven.com

Os .glb foram gerados a partir dos originais com `@gltf-transform/cli` (`merge` + `optimize --texture-compress webp --texture-size 1024 --compress meshopt`).
