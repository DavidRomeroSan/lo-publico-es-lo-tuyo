# Tu año en lo público

Web móvil tipo «Wrapped» que calcula cuánto te ha ahorrado lo público este año y desde que naciste.
Dos recorridos: preguntas con ramas (ciudad, estudios, hijos, vivienda, salud, emergencias, transporte, deporte, cultura) o versión rápida con nombre, sexo y edad.

- Todo se calcula en el navegador: no hay servidor, base de datos, cookies ni analítica.
- Tipografías servidas desde la propia web (sin llamadas a terceros).
- Tarjeta compartible de 1080×1920 generada en canvas (compartir o descargar).

## Cambiar cifras o textos

| Qué | Dónde |
| --- | --- |
| Precios, gasto público, datos de mejora, fuentes, URL y emisor | `src/data.js` |
| Preguntas, ramas, clubes y agradecimientos | `src/questions.js` |
| Fórmulas | `src/compute.js` |
| Textos de las láminas | `src/slides.js` |
| Tarjeta para compartir | `src/share.js` |

**Antes de difundir:** rellena `SITE.emisor` en `src/data.js` (quién promueve la web).

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm test         # pruebas de cálculo
npm run build    # genera dist/
```

Cada push a `main` ejecuta las pruebas, construye y publica en GitHub Pages (`.github/workflows/deploy.yml`).
