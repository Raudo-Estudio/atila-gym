import { describe, expect, it } from 'vitest';
import { getStatus } from './hours';

describe('getStatus', () => {
  it('abierto un día de semana, con progreso del día', () => {
    expect(getStatus(new Date('2026-11-03T14:00:00-03:00'))).toMatchObject({ open: true, closesAt: '23:00', dayProgress: 0.4375 });
  });
  it('cerrado justo a la hora de cierre', () => {
    expect(getStatus(new Date('2026-11-03T23:00:00-03:00'))).toMatchObject({ open: false, opensAt: { day: 'miércoles', time: '07:00' } });
  });
  it('usa la hora de Buenos Aires aunque el instante venga en UTC', () => {
    expect(getStatus(new Date('2026-11-04T02:30:00Z'))).toMatchObject({ open: false, opensAt: { day: 'miércoles', time: '07:00' } });
  });
  it('respeta el cierre del sábado', () => {
    expect(getStatus(new Date('2026-11-07T19:59:00-03:00'))).toMatchObject({ open: true, closesAt: '20:00' });
  });
  it('domingo cerrado y sin barra', () => {
    expect(getStatus(new Date('2026-11-08T12:00:00-03:00'))).toMatchObject({ open: false, opensAt: { day: 'lunes', time: '07:00' }, dayProgress: null });
  });
  it('antes de abrir, abre el mismo día', () => {
    expect(getStatus(new Date('2026-11-03T06:30:00-03:00'))).toMatchObject({ open: false, opensAt: { day: 'martes', time: '07:00' }, dayProgress: 0 });
  });
});
