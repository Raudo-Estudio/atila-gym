import { HOURS, type DayHours } from '../data/site';

const TIME_ZONE = 'America/Argentina/Buenos_Aires';
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export interface OpenStatus {
  open: boolean;
  closesAt?: string;
  opensAt?: { day: string; time: string };
  /** 0 a 1 dentro del horario del día; null si hoy no abre. */
  dayProgress: number | null;
}

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

function localTime(now: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return {
    weekday: WEEKDAYS.indexOf(part('weekday')),
    minutes: Number(part('hour')) * 60 + Number(part('minute')),
  };
}

function nextOpening(fromDay: number, schedule: DayHours[]) {
  for (let offset = 1; offset <= 7; offset++) {
    const candidate = schedule[(fromDay + offset) % 7];
    if (candidate.open) return { day: candidate.day, time: candidate.open };
  }
  return undefined;
}

export function getStatus(now: Date, schedule: DayHours[] = HOURS): OpenStatus {
  const { weekday, minutes } = localTime(now);
  const today = schedule[weekday];

  if (!today.open || !today.close) {
    return { open: false, opensAt: nextOpening(weekday, schedule), dayProgress: null };
  }

  const opens = toMinutes(today.open);
  const closes = toMinutes(today.close);

  if (minutes < opens) {
    return { open: false, opensAt: { day: today.day, time: today.open }, dayProgress: 0 };
  }
  if (minutes >= closes) {
    return { open: false, opensAt: nextOpening(weekday, schedule), dayProgress: 1 };
  }
  return { open: true, closesAt: today.close, dayProgress: (minutes - opens) / (closes - opens) };
}
