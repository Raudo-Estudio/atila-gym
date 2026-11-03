/**
 * Positive Google reviews, quoted with spelling and punctuation normalized, cut at the end of a sentence.
 * Source: Google Maps, read on 2026-11-03. Only positive reviews go here; never write or edit their meaning.
 */
export const REVIEWS = [
  {
    author: 'Néstor M.',
    text: 'Es un gimnasio muy amplio, tiene 4 pisos y 3 de ellos tienen máquinas para entrenar tranquilo.',
  },
  {
    author: 'María L.',
    text: 'Arranqué en agosto y en estos meses me di cuenta que es EL gimnasio. Además de la buena ubicación y la excelente calidad precio, son todos muy cordiales.',
  },
  {
    author: 'Lau G.',
    text: 'Excelente gimnasio, súper completo, nada que envidiarle a otros gimnasios. Tiene hasta máquina de remo y ski.',
  },
  { author: 'Reseña destacada en Google', text: 'El mejor gym, tiene mucha variedad de máquinas y buenos entrenadores.' },
  { author: 'Reseña destacada en Google', text: 'El mejor gimnasio que he ido, súper recomendable, cómodo y precios accesibles.' },
  { author: 'Reseña destacada en Google', text: 'Buen ambiente, buenas máquinas, excelentes profes.' },
] as const;
