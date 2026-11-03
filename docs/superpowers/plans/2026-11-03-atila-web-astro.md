# Web de Atila Gym en Astro: plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la estructura completa de la web de Atila Gym, con un commit por cada parte o sección.

**Architecture:** Landing estática de una sola página en Astro (`/`), con una sección por intención de búsqueda. Los datos del negocio viven en un solo archivo y alimentan páginas, SEO y JSON-LD. El único JavaScript propio es el estado "abierto ahora" de la barra del día.

**Tech Stack:** Astro 7.4.5, TypeScript estricto, CSS con custom properties, `@astrojs/sitemap` 3.7.4, `@fontsource/barlow` y `@fontsource/barlow-condensed` 5.3.0, Vitest. Sin Tailwind ni framework de UI.

**Spec:** Doc "Atila Gym — Branding y brief web": https://claude.ai/artifact/2Nn5w9jQhuFy6i9L1Qtdoc

## Dirección de diseño

- **Concepto:** en esta página, **la barra del logo** se convierte en **el reloj del gimnasio**: una barra con discos que recorre el día de 7 a 23 h y marca dónde estás ahora.
- **Composición (taste-skill):** dirección `sentence-as-layout`, con `--keep palette,type`. Una frase a escala de afiche con una foto del salón metida dentro de la línea, a la altura de una palabra.
- **Lo memorable:** solo dos momentos fuertes: el H1 de portada y la barra del día, sobre un campo rojo a pantalla completa. El resto queda sobrio.
- **Layout:** alineado a la izquierda, grilla de 12 columnas. Secciones vecinas nunca repiten layout. Sin tarjetas iguales en fila.
- **Revisión contra lo genérico:** la grilla de tres íconos de "razones" se reemplazó por una lista tipográfica grande, y los números 01/02/03 quedan descartados porque las razones no son una secuencia.

```text
Portada (celular y escritorio)
+--------------------------------------------+
| ATILA GYM                          WhatsApp|
| GIMNASIO EN GENERAL PACHECO                |
| PARA ENTRENAR [foto] EN SERIO              |
| Una frase de apoyo.                        |
| [Escribinos por WhatsApp]  Abierto hasta 23|
+--------------------------------------------+
Barra del día (campo rojo)
|  7 h ||==========|==============|| 23 h    |
```

### Tokens

| Token | Valor | Uso |
| --- | --- | --- |
| `--carbon` | #0F1114 | Fondo principal |
| `--plancha` | #1B1E23 | Superficie elevada (derivado) |
| `--rojo` | #D2202A | Botones, logo, campo de la barra del día |
| `--blanco` | #FFFFFF | Títulos y texto |
| `--metal` | #A9AEB6 | Texto secundario |

Títulos: Barlow Condensed 700/800 en mayúsculas. Textos: Barlow 400/500. La script manuscrita queda fuera de esta etapa.

## Global Constraints

- Node: `>=22.23.4` (lo exige Astro 7.4.5). Dejarlo en `.nvmrc` y `engines`.
- Idioma `es-AR`, voseo, oraciones cortas. Sin promesas de cambios físicos.
- El rojo sobre carbón solo en títulos grandes e íconos (contraste 3,6:1), nunca en texto corriente.
- Llamada principal en todas las páginas: "Escribinos por WhatsApp", a `https://wa.me/5491141930955`, fija en celular.
- Una sola sede: Av. de los Constituyentes 83. No mencionar San Isidro.
- Horarios: lunes a viernes 7:00 a 23:00, sábados 10:00 a 20:00 (a confirmar), domingos cerrado.
- Nunca inventar reseñas, cifras, precios ni equipo. Sin bancos de imágenes.
- Sin dato real, se usa `src/data/site.ts` con su campo pendiente o un slot visible `Foto pendiente`.
- Un commit por tarea, con mensaje Conventional Commits y estas líneas al final:

```text
Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01P1zPjKovPiXmsguWTt4CaJ
```

## Review Focus

- Visitante en otra zona horaria o con el reloj en otra hora: el estado se calcula siempre en `America/Argentina/Buenos_Aires` (Tarea 4).
- Sin JavaScript: se ven los horarios completos y la barra sin marcador (Tarea 12).
- Pantalla de 320 px: el H1 no desborda ni corta palabras (Tarea 7).
- `prefers-reduced-motion`: sin animación y con imagen fija (Tareas 3 y 7).
- Falta una foto: el slot pendiente no rompe el layout ni deja un `alt` vacío (Tarea 9).

---

### Tarea 1: Base del repo

**Files:**
- Create: `.gitignore` con `node_modules`, `dist`, `.astro`, `.taste-skill`, `.env`
- Include: `.claude/skills/design-taste-frontend/`, `skills-lock.json`, este plan

- [ ] **Paso 1:** Verificar `git status` sin archivos no previstos.
- [ ] **Paso 2:** Commit `chore: add project plan and design skill`.

### Tarea 2: Proyecto Astro

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `src/pages/index.astro`, `vitest.config.ts`

**Interfaces:** `npm run dev`, `build`, `test`. `site` sale de `PUBLIC_SITE_URL`, con `https://example.com` hasta tener dominio.

- [ ] **Paso 1:** Crear el proyecto con TypeScript estricto, salida estática e integración de sitemap.
- [ ] **Paso 2:** `npm run build`. Esperado: `dist/index.html` sin errores.
- [ ] **Paso 3:** Commit `chore: scaffold Astro project`.

### Tarea 3: Sistema de diseño

**Files:** `src/styles/tokens.css`, `src/styles/global.css`, `src/components/Button.astro`, `src/components/Section.astro`

- [ ] **Paso 1:** Generar la hoja de dirección con `draw.mjs --direction sentence-as-layout` y guardarla en `.taste-skill/`.
- [ ] **Paso 2:** Definir los tokens de la tabla, la escala fluida, foco visible y `prefers-reduced-motion`.
- [ ] **Paso 3:** Autoalojar Barlow y Barlow Condensed con `font-display: swap`.
- [ ] **Paso 4:** `npm run build`. Esperado: sin errores y solo los pesos usados.
- [ ] **Paso 5:** Commit `feat: add design tokens and base styles`.

### Tarea 4: Datos del negocio y estado de horarios

**Files:** `src/data/site.ts`, `src/lib/hours.ts`, `src/lib/hours.test.ts`

**Interfaces:**
- Produces: `SITE` (nombre, dirección, geo, teléfono, whatsapp, redes, rating) y `HOURS`.
- Produces: `getStatus(now: Date, schedule = HOURS): { open: boolean; closesAt?: string; opensAt?: { day: string; time: string }; dayProgress: number | null }`.

- [ ] **Paso 1: Escribir las pruebas que fallan**

```ts
expect(getStatus(new Date('2026-11-03T14:00:00-03:00'))).toMatchObject({ open: true, closesAt: '23:00', dayProgress: 0.4375 });
expect(getStatus(new Date('2026-11-03T23:00:00-03:00'))).toMatchObject({ open: false, opensAt: { day: 'miércoles', time: '07:00' } });
expect(getStatus(new Date('2026-11-04T02:30:00Z'))).toMatchObject({ open: false, opensAt: { day: 'miércoles', time: '07:00' } });
expect(getStatus(new Date('2026-11-07T19:59:00-03:00'))).toMatchObject({ open: true, closesAt: '20:00' });
expect(getStatus(new Date('2026-11-08T12:00:00-03:00'))).toMatchObject({ open: false, opensAt: { day: 'lunes', time: '07:00' }, dayProgress: null });
```

- [ ] **Paso 2:** `npm test`. Esperado: FALLA porque `getStatus` no existe.
- [ ] **Paso 3:** Implementar con `Intl.DateTimeFormat` y zona `America/Argentina/Buenos_Aires`.
- [ ] **Paso 4:** `npm test`. Esperado: PASA.
- [ ] **Paso 5:** Commit `feat: add business data and opening status`.

### Tarea 5: Layout y SEO

**Files:** `src/layouts/BaseLayout.astro`, `src/components/SeoHead.astro`, `src/components/LocalBusinessJsonLd.astro`

**Interfaces:** `BaseLayout` recibe `title`, `description`, `ogImage?`. Consume `SITE` y `HOURS`.

- [ ] **Paso 1:** Implementar `lang="es-AR"`, canonical, Open Graph y JSON-LD `ExerciseGym` sin `aggregateRating`.
- [ ] **Paso 2:** Usar en la home el title y la description exactos del brief.
- [ ] **Paso 3:** `npm run build` y validar que `dist/index.html` tenga un JSON parseable con `@type: ExerciseGym`.
- [ ] **Paso 4:** Commit `feat: add base layout and SEO head`.

### Tarea 6: Encabezado, pie y WhatsApp fijo

**Files:** `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/WhatsAppBar.astro`

- [ ] **Paso 1:** Navegación por anclas a las secciones, operable con teclado. Logo en texto hasta recibir el vector.
- [ ] **Paso 2:** Barra de WhatsApp fija solo en celular, sin tapar el pie.
- [ ] **Paso 3:** Revisar a 320, 768 y 1440 px.
- [ ] **Paso 4:** Commit `feat: add header, footer and WhatsApp bar`.

### Tareas 7 a 14: Secciones de la landing (un commit cada una)

Decisión del 3 de noviembre: la web es una landing, no un sitio de 5 páginas. Cada componente va en `src/components/home/` y se monta en `src/pages/index.astro`. Después de cada uno: `npm run build`. Un solo H1; cada sección tiene `id` y H2 propio.

| Tarea | Componente | Ancla | H2 y búsqueda | Commit |
| --- | --- | --- | --- | --- |
| 7 | `Hero.astro` | arriba | H1: gimnasio en General Pacheco | `feat(home): add hero` |
| 8 | `ElGym.astro`, `PhotoSlot.astro` | `#el-gym` | Gimnasio de musculación en Pacheco | `feat(home): add gym section` |
| 9 | `AtilaCoach.astro` | `#app` | App de rutinas incluida | `feat(home): add Atila Coach section` |
| 10 | `Resenas.astro` | `#resenas` | Reseñas de socios en Google | `feat(home): add reviews` |
| 11 | `Planes.astro` | `#planes` | Cuotas y planes en Pacheco | `feat(home): add plans` |
| 12 | `BarraDelDia.astro` | `#horarios` | Horarios y cómo llegar | `feat(home): add hours bar and map` |
| 13 | `Preguntas.astro` | `#preguntas` | Preguntas frecuentes, con JSON-LD FAQPage | `feat(home): add FAQ` |
| 14 | `Cierre.astro` | sin ancla | Vení a conocer el gym | `feat(home): add closing call to action` |

### Tarea 15: SEO técnico final

**Files:** `public/robots.txt`, `public/og.jpg`, `src/pages/404.astro`, `src/lib/track.ts`

- [ ] **Paso 1:** Agregar robots con sitemap, página 404 útil y eventos en clics de WhatsApp, llamada y cómo llegar.
- [ ] **Paso 2:** `npm run build`. Esperado: `sitemap-index.xml` con una sola URL, `/` y `404.html`, y un solo H1.
- [ ] **Paso 3:** Commit `feat: add robots, 404 and click tracking`.

### Tarea 16: Revisión final

- [ ] **Paso 1:** Correr `npm test`, `npm run build`, los scripts `lint.mjs` e `inspect.mjs` y revisar capturas en Chromium.
- [ ] **Paso 2:** Medir LCP menor a 2,5 s, CLS menor a 0,1 y accesibilidad sin errores graves.
- [ ] **Paso 3:** Corregir lo encontrado y hacer commit `fix: address final review findings`, si hubo cambios.

## Pendientes que no bloquean la estructura

Logo en vector, fotos y videos, dominio, cuotas, sábados, salones por grupo muscular, citas de reseñas, enlaces de la app y herramienta de medición.
