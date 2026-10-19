# Tu año en lo público — contexto para Claude Code

## Qué es
Web móvil pública tipo «Spotify Wrapped» para la campaña «Lo público es lo tuyo» (PSOE, sin logo).
Calcula cuánto te ha ahorrado lo público este año y desde que naciste, y genera una tarjeta para stories.
Público principal: 16 a 45 años. Idioma: castellano de España.

## Estado
El código está terminado y probado (7 pruebas de cálculo + recorrido completo con Playwright, sin errores).
Falta: crear el repositorio en GitHub, publicar con GitHub Pages y rellenar el emisor.

## Tareas para Claude Code
1. `npm install && npm test && npm run build` para comprobar que todo funciona.
2. Crear el repo público y subir: `gh repo create lo-publico-es-lo-tuyo --public --source=. --remote=origin --push`
3. Activar Pages con Actions: `gh api repos/{owner}/lo-publico-es-lo-tuyo/pages -X POST -f build_type=workflow`
   (si ya existe, `-X PUT`). El workflow `.github/workflows/deploy.yml` prueba, construye y publica en cada push a `main`.
4. Esperar al workflow (`gh run watch`) y abrir la URL `https://{owner}.github.io/lo-publico-es-lo-tuyo/`.
5. Si el usuario de GitHub no es `davidromerosan`, cambiar la URL en `src/data.js` (`SITE.url`) y en las etiquetas `og:` de `index.html`.
6. Pedir al usuario el texto del emisor y ponerlo en `SITE.emisor` (`src/data.js`). Obligatorio antes de difundir en campaña.
7. Dominio propio (opcional): añadir `public/CNAME`, configurar DNS y actualizar `SITE.url` y `og:`.

## Arquitectura
- Vite 5 + JavaScript sin framework. Todo se calcula en el navegador: sin servidor, base de datos, cookies ni analítica.
- Tipografías autoalojadas con @fontsource (Archivo Variable con eje de anchura + Source Sans 3). No hacer llamadas a terceros: la web promete privacidad.
- `base: './'` en Vite para que funcione en subcarpeta de GitHub Pages y en dominio propio.

| Archivo | Contenido |
| --- | --- |
| `src/data.js` | Cifras, precios por ciudad, gasto público, datos de «Lo público ha mejorado», fuentes, URL, emisor |
| `src/questions.js` | Preguntas con ramas (`when`), clubes y sus pesos, agradecimientos |
| `src/compute.js` | Cálculos puros (probados en `tests/compute.test.js`) |
| `src/slides.js` | Textos y HTML de las láminas; datos de la tarjeta |
| `src/share.js` | Tarjeta 1080×1920 en canvas; Web Share API con archivo y descarga de respaldo |
| `src/icons.js` | Pictogramas SVG de lo público |
| `src/main.js` | Navegación entre pantallas y stories |
| `index.html`, `privacidad.html` | Páginas; metadatos para redes en `index.html` |
| `public/og.png`, `favicon.svg`, `apple-touch-icon.png` | Imagen para enlaces compartidos e iconos |

## Producto
- Portada → versión A (preguntas con ramas) o «¿Con prisa?» → versión B (nombre, sexo, edad y una pregunta abierta).
- Versión A: sin pregunta de ciudad (se usa `CITY.media`, media de Madrid, Barcelona, Bilbao y Vitoria), edad (18-23 / 24-30…; hijos solo desde 24), situación (estudio, trabajo, paro, jubilación), estudios, vivienda (incluye vivienda pública y Bono Alquiler Joven), hogar, hijos (solo si tiene: escuela infantil, cole, extraescolares, pediatra, nacimiento), salud (incluye salud mental), emergencias (incendio forestal, DANA), transporte, deporte, cultura y trabajador público del año.
- Láminas: veces que lo público ha estado ahí, nº 1, top 5, «Lo que no ves», «Lo público ha mejorado», club, hijos, persona del año, total del año, total del hogar, toda tu vida con reparto en %, comparación con EE. UU. a escala de sistema, cierre y tarjeta.
- Clubes ponderados para que no gane siempre la sanidad (pesos en `CLUB_W`). Una emergencia da siempre el Club de Guardia.
- Versión B: clubes por etapa anclados a datos (emancipación media 30,2 años; primer hijo 31,5 años).

## Reglas de cifras
- Año: precios privados reales (parte alta de los rangos), media de las grandes ciudades (`CITY.media`) + «Lo que no ves» (1.461 €/persona, IGAE 2024).
- Toda la vida: gasto público medio por persona y año + años de estudio en la pública. Se presenta como «lo que ha puesto lo público», no como precio privado.
- Cada cifra nueva necesita fuente en `SOURCES` (`src/data.js`). No inventar datos.
- Familia: pensiones (nº de personas × pensión media) y dependencia (dato de beneficiarios, sin euros por falta de fuente). Trabajador del año: 5 opciones + campo abierto.
- Supuestos a revisar: `CITY.media` es la media simple de las 4 ciudades; precios de Bilbao, Vitoria y «otra ciudad» son un ajuste sobre Madrid (salvo alquiler, que es real); vivienda protegida = 40 % bajo mercado en 70 m²; curva de visitas por edad y sexo de la versión B; transporte con tarifas que cubren el 40 % del coste.

## Estilo
- Rojo #E1001A, rojo hondo #9E0013, tinta #17100F, rosa #FFE1E4. Sin logo del partido.
- «2026» gigante en portada, total y tarjeta. Textos directos, sin muletillas de IA.
- Probar en móvil (390×844) y escritorio; sin scroll horizontal; respetar `prefers-reduced-motion`.

## Comandos
```bash
npm run dev     # local
npm test        # pruebas de cálculo
npm run build   # dist/
```
