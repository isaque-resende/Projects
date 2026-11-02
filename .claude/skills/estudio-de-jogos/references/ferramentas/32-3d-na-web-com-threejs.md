# Ferramenta 32: 3D na web com Three.js (quando vale e o mínimo para começar)

> **Pipeline:** fase principal **F4** (`../pipeline/F4-experiencia-arte-e-nivel.md`); também usada em F3, F5.

Para decidir **se** um jogo teológico precisa de 3D e, se precisar, montar o mínimo: cena, câmera,
luz, objetos, seleção por toque, órbita e limpeza de recursos. Fonte principal: Andrei Tazetdinov,
*3D Web Development with Three.js and Next.js* (24 capítulos; usa Vite, React Three Fiber, Drei,
Next.js, Storybook e AWS Amplify). Complementada, **por amostra**, por *JavaScript Programming for
Game Development* (Felix Anderson) e *Creating 3D Games with JavaScript* (Logan Xander), ambos
**genéricos**. Os itens `T3#` são meus (numeração por tema). Os trechos de código são **meus e foram
testados em Node com three@0.160** (apenas a parte lógica, **sem renderizador**: o desenho exige
navegador com WebGL e **não foi testado**).

> **Aviso de escopo:** a imensa maioria dos jogos desta skill (cena, texto, escolha, mapa em grade)
> **não precisa de 3D**. 3D custa arte, desempenho, acessibilidade e manutenção. Use esta ferramenta
> depois de `27` (formato) e de `31` (2D, mapa, isométrico).

## 1. Quando 3D vale a pena (T31)

| Situação | 3D ajuda? |
|---|---|
| Visita a um **lugar** (templo, tabernáculo, sinagoga, casa do primeiro século) para entender espaço e medidas | **Sim**, e o texto bíblico dá medidas (Êxodo 25–27; 1 Reis 6; Ezequiel 40–43) |
| Objetos para **girar e examinar** (arca, candelabro, rolo, moeda) | **Sim**, com órbita simples |
| Diálogo, escolha, parábola, estudo de texto | **Não** (usar 2D, `17`, `22`) |
| Mapa de viagens | **Não** (usar `31`) |
| Reconstruções "arqueológicas" | Cuidado: **marcar o que é texto, contexto e inferência** (`21`); modelo 3D parece mais certo do que é |

## 2. Peças mínimas (T32 a T36)

**T32. Cena, câmera e objeto.** Uma **cena** guarda objetos; a **câmera** (perspectiva: campo de visão,
proporção, plano próximo e distante) define o que se vê; um **mesh** = geometria + material. Luzes:
ambiente (base), direcional (sol), hemisférica (céu), pontual, spot. **Sombras** custam caro.
**T33. Câmera e controles.** Órbita ao redor de um alvo (ângulo horizontal, elevação, distância),
com limites; **zoom por gesto de dois dedos**; **alternativa por teclado e botões** (acessibilidade).
**T34. Interação = raio.** Como os objetos estão num canvas, não há eventos por objeto: use o
**Raycaster**: converte o ponto do toque em coordenadas normalizadas (−1..1), lança um raio a partir
da câmera e devolve os objetos atingidos, do mais próximo ao mais distante.
**T35. Animação e partículas**: laço por quadro com `dt`; partículas para atmosfera (`31`, seção 11).
**T36. Limpeza**: `dispose()` de geometrias, materiais e texturas ao trocar de cena; senão a memória
cresce (principalmente no celular).

```js
// Meu exemplo (testado com three@0.160): seleção por toque e câmera orbital.
import * as THREE from 'three';
const ray = new THREE.Raycaster();
const paraNormalizado = (px, py, larg, alt) =>
  new THREE.Vector2((px / larg) * 2 - 1, -(py / alt) * 2 + 1);
function escolhe(px, py, canvas, camera, objetos) {
  ray.setFromCamera(paraNormalizado(px, py, canvas.clientWidth, canvas.clientHeight), camera);
  const hits = ray.intersectObjects(objetos, false);
  return hits.length ? hits[0].object : null;           // o mais próximo
}
const orbita = (alvo, dist, azim, elev) => new THREE.Vector3(
  alvo.x + dist * Math.cos(elev) * Math.sin(azim),
  alvo.y + dist * Math.sin(elev),
  alvo.z + dist * Math.cos(elev) * Math.cos(azim));
// no encerramento da cena:  obj.geometry.dispose(); obj.material.dispose(); cena.remove(obj);
```

**Resultado do teste:** o centro da tela acerta o objeto à frente da câmera e o canto, que não tem
objeto, não acerta; a órbita em 0° e 0° fica a `(0, 0, dist)`.

## 3. Integração com a web moderna (T37, T38)

**T37. Next.js + React Three Fiber (R3F) + Drei.** R3F expõe o Three.js como **componentes React**;
Drei traz auxiliares (órbita, estatísticas); o livro usa **Next.js** para roteamento e hospedagem,
**Storybook** para catálogo de componentes e **Tailwind** para estilo. Para um projeto **pequeno e de
um autor**, JS puro com **Vite** basta (`08`); R3F compensa quando **a interface é React**.
**T38. Hospedagem e dados**: o livro percorre AWS Amplify (hospedagem, autenticação, dados, tempo
real). Para esta skill: **estático e sem conta** sempre que possível (`08`, `29`). Cada serviço
com login traz **dados pessoais** e custo.

## 4. Desempenho e acessibilidade (T39 a T41)

**T39. Meça**: estatísticas de quadros e de memória (Stats do Drei, r3f-perf); depurador com
controles na tela (lil-gui, Tweakpane) para ajustar parâmetros.
**T40. Reduza**: poucas luzes e sombras, geometrias simples, texturas pequenas, **instâncias** para
objetos repetidos, **carregar modelos sob demanda** (formato glTF) e **desistir de sombras no
celular**. O livro trata a otimização mais pelo lado do React (reuso e memoização).
**T41. Acessibilidade**: o canvas 3D **não é lido por leitor de tela**. Ofereça **alternativa em
texto** (descrição da cena, lista de objetos com `aria-label`), **navegação por teclado**, respeito a
`prefers-reduced-motion` (sem animação automática), **contraste** de textos sobrepostos e **versão
sem 3D**. O livro cita a biblioteca de acessibilidade para R3F (react-three-a11y) e WCAG; **não li**
o detalhe de cada técnica.

## 5. O que os outros livros acrescentam (por amostra) (T42)

- **Anderson**: guia genérico de JS para jogos com um capítulo de Three.js e outro de publicação e
  monetização; sem profundidade. Reforça `requestAnimationFrame` em vez de `setInterval` e grade
  para colisão.
- **Xander**: guia de tópicos de 3D (WebGL, matemática, cena, câmera, física, áudio, shaders,
  otimização, rede, IA, implantação, monetização e marketing). Texto **repetitivo e genérico**; usei
  apenas como índice de assuntos.
- **Parker, *Mastering 3D Game Development with JavaScript***: **não consegui ler** (PDF digitalizado
  como imagem, sem texto; não há OCR neste ambiente). Fica registrado como **pendente**.

## 6. Aplicação teológica (inferência minha)

- **Visita guiada ao tabernáculo**: modelo simples (cortinas, arca, mesa, candelabro, altares) com
  **medidas do texto** em côvados e rótulos "texto" × "reconstrução". Cada objeto selecionado mostra
  a **passagem** e a **explicação**; o jogador **escolhe a ordem** da visita.
- **Câmera calma**: sem balanço de tela, sem corrida; **modo "ler"** com texto fixo em HTML sobre o
  canvas (`24`).
- **Segurança de dados**: nada de login obrigatório; **sem rastrear** onde a pessoa olha.
- **Armadilha**: 3D realista passa **ar de autoridade histórica**; deixe claro o que é conjectura
  (`21`). Preferir **estilo abstrato** (formas simples) quando a evidência for fraca.

## 7. Ressalvas

- **Leitura**: ver `livros.md`, seções 34 a 37. Capítulos de AWS Amplify, Storybook e Tailwind do
  livro de Tazetdinov foram **só passados**; os de geometrias, luzes, câmera, interação e
  otimização foram lidos **por trechos** (títulos e prosa, sem os códigos).
- O renderizador e as sombras **não foram testados**; versões do Three.js, R3F e Next.js mudam
  rápido: confirmar antes de adotar.
- Monetização, marketing e comunidade dos livros genéricos **não** se aplicam (`07`, `16`).
