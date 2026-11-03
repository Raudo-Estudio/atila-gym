import { describe, expect, it } from 'vitest';
import { SITE } from '../data/site';
import { eventForHref } from './track';

describe('eventForHref', () => {
  it('reconoce los links de contacto del sitio', () => {
    expect(eventForHref(SITE.whatsappUrl)).toBe('whatsapp_click');
    expect(eventForHref('tel:+541141930955')).toBe('call_click');
    expect(eventForHref(SITE.directionsUrl)).toBe('directions_click');
  });

  it('ignora el resto', () => {
    expect(eventForHref(SITE.instagramUrl)).toBeNull();
    expect(eventForHref('/#planes')).toBeNull();
  });
});
