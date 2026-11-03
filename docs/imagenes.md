# Imágenes para la web de Atila Gym

Tratamiento único para todo: blanco y negro con alto contraste, flash duro, grano de película. El rojo lo pone la página (fondos y tipografía), no la foto. Así lo generado y lo fotografiado en el gym quedan del mismo lado.

Regla de honestidad: lo generado es atmósfera (manos, hierro, tiza, un cuerpo sin cara). Nunca se presenta como un salón, un profe o un socio de Atila. Los salones, la fachada y la app van con fotos reales.

## 1. Fotos reales (las saca el gym o vos con el celular)

| Uso en la página | Qué fotografiar | Formato |
| --- | --- | --- |
| Salones, imagen a pantalla completa | Salón de pesos libres, plano abierto, sin gente o de espaldas | 16:9 horizontal |
| Salones, imagen a pantalla completa | Sala de máquinas, plano abierto | 16:9 horizontal |
| Salones, imagen a pantalla completa | Vestuarios y duchas | 16:9 horizontal |
| Tarjeta de cada salón | Un detalle de cada uno (rack, máquina, ducha) | 3:2 |
| Dirección | Fachada sobre Av. de los Constituyentes 83, de noche con el cartel prendido | 4:5 vertical |
| Planes | Captura real de la app Atila Coach | Captura del celular |

Consejos: luz del salón prendida, sin gente identificable salvo con permiso, celular horizontal a la altura del pecho, modo foto normal (no gran angular extremo). Después se pasan a blanco y negro todas juntas.

## 2. Imágenes generadas (Gemini)

Escribilas en inglés. Pedí siempre la relación de aspecto indicada.

### Portada, foto que sube debajo del titular (3:4 vertical)

```text
Black and white documentary photograph, vertical 3:4. A strong anonymous athlete at the top of a heavy deadlift in a small, worn neighbourhood gym in Buenos Aires. Framed from the chin down to mid-thigh, face out of frame. Chalked hands gripping a knurled steel barbell, veins and tension in the forearms, plain dark t-shirt with no logos. Harsh direct on-camera flash, deep black background falling off into darkness, visible film grain, high contrast, slight motion blur on the plates. Gritty, honest, unpolished. No text, no logos, no brand names, no mirrors, no neon.
```

### Banda de manos con tiza (16:9 horizontal)

```text
Black and white macro photograph, horizontal 16:9. Two hands clapping magnesium chalk, a burst of white chalk dust frozen in the air against a pure black background. Harsh side flash, crisp detail on skin texture and chalk particles, heavy film grain, high contrast. No jewellery, no tattoos, no text.
```

### Detalle de la barra (16:9 horizontal)

```text
Black and white extreme close-up photograph, horizontal 16:9. The knurled grip of a worn Olympic steel barbell resting on a rack, chalk caught in the knurling, a cast iron plate edge out of focus behind it. Hard directional light from the left, deep blacks, film grain, high contrast. Old, used equipment, scratches and wear. No text, no brand markings.
```

### Discos de hierro (1:1 cuadrado)

```text
Black and white photograph, square 1:1. A stack of old cast iron weight plates on a rubber gym floor, shot from slightly above, chipped paint and rust on the edges, chalk handprints on the top plate. Harsh flash, deep shadows, film grain, high contrast. Plates have no visible numbers or brand names.
```

### Retrato de espalda (3:4 vertical, para la sección de la app o el cierre)

```text
Black and white documentary photograph, vertical 3:4. A person seen from behind, sitting on a flat weight bench between sets, towel over the shoulder, looking down at a phone in their hand (screen not visible). Small neighbourhood gym, racks soft in the background. Harsh flash, dark falloff, film grain, high contrast, candid and quiet. Face not visible. No text, no logos.
```

## 3. Videos (Luma Dream Machine)

Conviene generarlos desde la imagen fija de Gemini (Image to Video) para que mantengan el tratamiento. Duración de 5 s, opción Loop activada y cámara quieta: la web los muestra mudos y en loop.

### Portada: el levantamiento (desde la foto de portada)

```text
Static camera, no camera movement. The athlete slowly locks out the deadlift and holds at the top, the barbell trembles slightly, a little chalk dust falls from the hands. Subtle breathing motion in the chest. Black and white, harsh flash look, film grain, high contrast. Seamless loop, 5 seconds.
```

### Banda: la tiza (desde la foto de manos con tiza)

```text
Static camera. Slow motion: the hands clap once and a cloud of white chalk dust bursts outward and drifts slowly through the dark, then settles. Black and white, harsh side light, film grain, pure black background. Seamless loop, 5 seconds.
```

### Alternativa sin imagen de partida (Text to Video)

```text
Macro shot, black and white, harsh flash, film grain. Chalked hands slide a cast iron weight plate onto the sleeve of a steel barbell, the plate clanks into place and wobbles to a stop. Static camera, shallow depth of field, dark gym background. Seamless loop, 5 seconds. No text, no logos.
```

## Entrega

Exportá las fotos en JPG de 2400 px por el lado largo y los videos en MP4 1080p. Dejalos en `public/media/` con nombres simples (`portada.jpg`, `portada.mp4`, `salon-pesos.jpg`, etc.). Yo después los paso a AVIF/WebP y armo los posters de los videos.
