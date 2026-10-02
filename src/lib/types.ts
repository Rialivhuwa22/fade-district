export type CategoryId = "cuts" | "beard" | "packages" | "extras";

export interface Category {
  id: CategoryId;
  name: string;
  note: string;
}

export interface Service {
  id: string;
  cat: CategoryId;
  name: string;
  price: number; // ZAR, VAT inclusive
  dur: number; // minutes in the chair
  desc: string;
}

export interface Barber {
  id: string;
  name: string;
  first: string;
  role: string;
  years: number;
  off: number[]; // days off, 0 = Sunday
  specs: string[];
  bio: string;
  img: string;
}

/** A barber id, or "any" to let the shop assign the first free barber. */
export type BarberChoice = string;

export interface Booking {
  ref: string;
  service: string;
  barber: string;
  date: string; // YYYY-MM-DD in shop time (SAST)
  start: number; // minutes after midnight, SAST
  dur: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  total: number;
  disc: number;
  created: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  notes: string;
  terms: boolean;
}
