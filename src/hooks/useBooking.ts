import { useReducer } from "react";

export type Step = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  step: Step;
  service: string | null;
  barber: string | null; // barber id or "any"
  date: string | null;
  time: number | null;
  assigned: string | null; // actual barber for the chosen slot
  weekIdx: number;
}

export type BookingAction =
  | { type: "service"; id: string }
  | { type: "barber"; id: string }
  | { type: "date"; date: string | null }
  | { type: "time"; time: number | null; assigned: string | null }
  | { type: "week"; delta: number; max: number }
  | { type: "go"; step: Step }
  | { type: "reset" };

export const initialBooking: BookingState = { step: 1, service: null, barber: null, date: null, time: null, assigned: null, weekIdx: 0 };

/** Returns the furthest step the customer is allowed to reach with what they've chosen so far. */
export function allowedStep(s: BookingState, wanted: Step): Step {
  if (wanted >= 2 && !s.service) return 1;
  if (wanted >= 3 && !s.barber) return 2;
  if (wanted >= 4 && (!s.date || s.time === null)) return 3;
  return wanted;
}

export function bookingReducer(s: BookingState, a: BookingAction): BookingState {
  switch (a.type) {
    case "service":
      // a different duration can change which times fit, so clear the time
      return { ...s, service: a.id, time: null, assigned: null };
    case "barber":
      return { ...s, barber: a.id, time: null, assigned: null };
    case "date":
      return { ...s, date: a.date, time: null, assigned: null };
    case "time":
      return { ...s, time: a.time, assigned: a.assigned };
    case "week":
      return { ...s, weekIdx: Math.min(Math.max(0, s.weekIdx + a.delta), a.max) };
    case "go":
      return { ...s, step: allowedStep(s, a.step) };
    case "reset":
      return initialBooking;
  }
}

export const useBookingState = () => useReducer(bookingReducer, initialBooking);
