export interface DayHours {
  day: string;
  open: string | null;
  close: string | null;
}

/** Índice 0 = domingo, igual que Date.getDay(). */
export const HOURS: DayHours[] = [
  { day: 'domingo', open: null, close: null },
  { day: 'lunes', open: '07:00', close: '23:00' },
  { day: 'martes', open: '07:00', close: '23:00' },
  { day: 'miércoles', open: '07:00', close: '23:00' },
  { day: 'jueves', open: '07:00', close: '23:00' },
  { day: 'viernes', open: '07:00', close: '23:00' },
  // Cierre del sábado a confirmar: fuentes anteriores dicen 18:00.
  { day: 'sábado', open: '10:00', close: '20:00' },
];

const WHATSAPP_NUMBER = '5491141930955';

export const SITE = {
  name: 'Atila Gym',
  streetAddress: 'Av. de los Constituyentes 83',
  addressDetail: 'entre Buenos Aires y Av. Hipólito Yrigoyen',
  locality: 'General Pacheco',
  region: 'Buenos Aires',
  postalCode: 'B1617',
  country: 'AR',
  geo: { latitude: -34.46, longitude: -58.6353 },
  phone: '+54 11 4193-0955',
  phoneDisplay: '011 4193-0955',
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero conocer Atila Gym.')}`,
  instagramUrl: 'https://www.instagram.com/atilagym_/',
  facebookUrl: 'https://www.facebook.com/comunidadatila/',
  rating: { value: '4,7', count: 723 },
  googleReviewsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJA8cDOYWkvJURzp8mOoxPhUw',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-34.46,-58.6353',
  mapEmbedUrl: 'https://www.google.com/maps?q=-34.46,-58.6353&z=16&output=embed',
  wellhubUrl: 'https://wellhub.com/es-ar/search/partners/atila-gym-pacheco/',
} as const;

export const NAV = [
  { href: '/#el-gym', label: 'El gym' },
  { href: '/#salones', label: 'Salones' },
  { href: '/#app', label: 'App' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#horarios', label: 'Horarios' },
] as const;
