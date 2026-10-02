import { BOOKING_RULES, CLOSED_DATES } from "./data";

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export interface ShopClock {
  y: number;
  m: number;
  d: number;
  dow: number;
  mins: number;
}

export interface DateParts {
  y: number;
  m: number;
  d: number;
  dow: number;
  key: string;
}

export const pad = (n: number) => String(n).padStart(2, "0");

/** 540 -> "09:00" */
export const formatTime = (mins: number) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;

export const formatRand = (n: number) => `R${n}`;

/** Current time in the shop's timezone (SAST), regardless of the visitor's timezone. */
export function shopNow(nowMs: number = Date.now()): ShopClock {
  const d = new Date(nowMs + BOOKING_RULES.tzOffsetMinutes * 60_000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), dow: d.getUTCDay(), mins: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

export const dateKey = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

export function parseDateKey(key: string): DateParts {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m, d, dow: new Date(Date.UTC(y, m - 1, d)).getUTCDay(), key };
}

export const todayKey = (clock: ShopClock) => dateKey(clock.y, clock.m, clock.d);

export const isClosedDate = (key: string) => CLOSED_DATES.includes(key.slice(5));

/** "Friday, 25 September 2026" */
export function formatLongDate(key: string) {
  const p = parseDateKey(key);
  return `${DAYS[p.dow]}, ${p.d} ${MONTHS[p.m - 1]} ${p.y}`;
}

/** Date keys from today (shop time) for the booking window. */
export function bookableDays(clock: ShopClock, count: number = BOOKING_RULES.daysAhead): string[] {
  const base = Date.UTC(clock.y, clock.m - 1, clock.d);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base + i * 86_400_000);
    return dateKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
  });
}

/** Converts a shop-local date + minutes to a UTC timestamp. */
export function shopTimeToUtc(key: string, mins: number): number {
  const p = parseDateKey(key);
  return Date.UTC(p.y, p.m - 1, p.d, 0, mins - BOOKING_RULES.tzOffsetMinutes);
}
