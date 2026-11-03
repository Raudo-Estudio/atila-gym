# Imágenes para la web de Atila Gym

La página tiene 4 espacios de imagen. Mientras no hay archivo, cada uno muestra "Foto pendiente". Para completarlos, dejá los archivos en `public/media/` con estos nombres; yo los conecto y los optimizo.

| Archivo | Dónde va | Formato | Ideal |
| --- | --- | --- | --- |
| `portada.jpg` | Portada, a la derecha del título | 4:5 vertical | Foto real del gym o imagen generada |
| `salon-pesos.jpg` | Salones: pesos libres | 3:2 horizontal | Foto real |
| `sala-maquinas.jpg` | Salones: sala de máquinas | 3:2 horizontal | Foto real |
| `vestuarios.jpg` | Salones: pestaña Vestuarios | 3:2 horizontal | Foto real |

Tratamiento común: color natural, tonos fríos y oscuros, un toque de rojo en el lugar (discos, tapizados, luces), luz suave de salón, sin filtros fuertes. La página ya es roja, negra y gris; las fotos tienen que acompañar, no competir.

Regla de honestidad: los salones y los vestuarios van con fotos reales de Atila, porque son lo que el socio va a encontrar. Lo generado sirve para la portada o detalles (mancuernas, discos, manos), nunca presentado como un salón de Atila.

## Cómo sacar las fotos reales

- Luces del salón prendidas, horario con poca gente o de espaldas. Nadie identificable sin permiso.
- Celular horizontal para los salones, a la altura del pecho, lente normal (1x), sin gran angular.
- Ordenar el lugar antes: discos en su lugar, mancuernas en el rack.
- Una toma general por salón y, si se puede, un detalle (rack, máquina, ducha).
- Exportar en JPG a 2400 px por el lado largo.

## Prompts para Gemini

Escribilos en inglés y pedí la relación de aspecto indicada.

### Portada (4:5 vertical)

```text
Editorial photograph, vertical 4:5. A modern, premium strength gym at dusk: rows of black rubber plates and chrome dumbbells on a rack in the foreground, sharp focus, the rest of the room soft in the background with dark grey walls, matte black flooring and a few warm overhead lights. One accent of deep red on the plates and bench upholstery. Calm, clean, uncluttered, no people. Natural colour, cool shadows, subtle contrast, shot on a 50mm lens at f/2.8. No text, no logos, no brand names, no mirrors facing the camera.
```

### Detalle de mancuernas (3:2 horizontal, alternativa para un salón mientras llega la foto real)

```text
Photograph, horizontal 3:2. Close-up of a long rack of hexagonal black rubber dumbbells with knurled chrome handles in a modern gym, receding into soft focus, red accent on the numbers' backing plates without readable digits. Soft top light, dark charcoal background, clean and premium, natural colour. No people, no text, no logos.
```

### Detalle de máquina (3:2 horizontal, alternativa para la sala de máquinas)

```text
Photograph, horizontal 3:2. Side view of a modern selectorized strength machine: black steel frame, a stack of matte black weight plates with a chrome pin, red upholstered seat, in a clean gym with dark grey walls. Soft overhead light, shallow depth of field, premium and minimal, natural colour. No people, no text, no logos.
```

### Vestuarios (3:2 horizontal)

```text
Photograph, horizontal 3:2. A modern gym locker room: a row of matte black lockers, a long bench upholstered in deep red, and a glass-walled shower area with dark grey stone tiles in the background. Clean, tidy and empty, warm soft ceiling light, a towel folded on the bench. Premium, minimal, natural colour, shot on a 35mm lens at eye level. No people, no text, no logos, no mirrors facing the camera.
```

### Manos con tiza (4:5 vertical, alternativa para la cuota)

```text
Photograph, vertical 4:5. Close-up of chalked hands gripping a knurled steel barbell, a little chalk dust in the air, dark charcoal background, soft side light, natural skin tones, red bumper plate edge out of focus behind. Clean, modern, premium. No jewellery, no tattoos, no text.
```

## Video opcional para la portada (Luma Dream Machine)

Si más adelante queremos un loop mudo en la portada, conviene hacerlo desde la imagen de Gemini (Image to Video) con el Loop activado:

```text
Static camera with a very slow push-in. Soft light shifts across the rack of plates and dumbbells, faint dust in the air catches the light. Calm, premium, natural colour. Seamless loop, 5 seconds. No people, no text.
```
