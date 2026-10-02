import type { Booking } from "./types";

/**
 * Browser storage for the demo. Bookings live on the visitor's device only.
 * Swap these functions for API calls (e.g. a Next.js route + database) to share bookings across devices.
 */
const KEYS = { bookings: "fd_bookings", promoUsed: "fd_promo_used", promoSeen: "fd_promo_seen" } as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked: booking still completes for this session */
  }
}

export const loadBookings = (): Booking[] => read<Booking[]>(KEYS.bookings, []);
export const saveBooking = (b: Booking) => write(KEYS.bookings, [...loadBookings(), b].slice(-30));
export const isPromoUsed = () => read<boolean>(KEYS.promoUsed, false);
export const markPromoUsed = () => write(KEYS.promoUsed, true);
export const isPromoSeen = () => read<boolean>(KEYS.promoSeen, false);
export const markPromoSeen = () => write(KEYS.promoSeen, true);
