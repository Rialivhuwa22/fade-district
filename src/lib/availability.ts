import { BARBERS, BOOKING_RULES, HOURS, getBarber } from "./data";
import { DAYS, isClosedDate, parseDateKey, todayKey, type ShopClock } from "./time";
import type { Barber, BarberChoice, Booking } from "./types";

export interface Slot {
  start: number;
  /** id of a barber free for the whole service, or null if taken */
  freeBarber: string | null;
}

export interface DayStatus {
  ok: boolean;
  reason: string;
}

/** Small deterministic hash so demo "existing bookings" stay the same between visits. */
export function hashString(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const DEMO_BUSY_PERCENT = 24;

export function isBusy(barberId: string, date: string, start: number, dur: number, saved: Booking[]): boolean {
  for (let t = start; t < start + dur; t += BOOKING_RULES.slotStep) {
    if (hashString(`${barberId}|${date}|${t}`) % 100 < DEMO_BUSY_PERCENT) return true;
  }
  return saved.some((b) => b.barber === barberId && b.date === date && start < b.start + b.dur && b.start < start + dur);
}

export const worksOn = (barber: Barber, dow: number) => !barber.off.includes(dow);

export function slotsFor(date: string, choice: BarberChoice, dur: number, saved: Booking[], clock: ShopClock): Slot[] {
  if (isClosedDate(date)) return [];
  const { dow } = parseDateKey(date);
  const [open, close] = HOURS[dow];
  const isToday = date === todayKey(clock);
  const pool = BARBERS.filter((b) => (choice === "any" || b.id === choice) && worksOn(b, dow));
  if (!pool.length) return [];

  const slots: Slot[] = [];
  for (let t = open; t + dur <= close; t += BOOKING_RULES.slotStep) {
    if (isToday && t < clock.mins + BOOKING_RULES.leadMinutes) continue;
    const free = pool.find((b) => !isBusy(b.id, date, t, dur, saved));
    slots.push({ start: t, freeBarber: free ? free.id : null });
  }
  return slots;
}

export function dayStatus(date: string, choice: BarberChoice, dur: number, saved: Booking[], clock: ShopClock): DayStatus {
  const { dow } = parseDateKey(date);
  if (isClosedDate(date)) return { ok: false, reason: "Closed for the public holiday" };
  if (choice !== "any") {
    const b = getBarber(choice);
    if (b && !worksOn(b, dow)) return { ok: false, reason: `${b.first} is off on ${DAYS[dow]}s` };
  }
  const open = slotsFor(date, choice, dur, saved, clock).filter((s) => s.freeBarber).length;
  return open ? { ok: true, reason: `${open} times available` } : { ok: false, reason: "Fully booked" };
}
