"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import StepIndicator from "./StepIndicator";
import ServiceStep from "./ServiceStep";
import BarberStep from "./BarberStep";
import DateTimeStep from "./DateTimeStep";
import DetailsStep from "./DetailsStep";
import Confirmation from "./Confirmation";
import Summary from "./Summary";
import { APPLY_PROMO_EVENT } from "../PromoModal";
import { useToast } from "../Toast";
import { useBookingState, type Step } from "@/hooks/useBooking";
import { dayStatus, isBusy } from "@/lib/availability";
import { BOOKING_RULES, PROMO, getBarber, getService } from "@/lib/data";
import { checkPromoCode, priceFor } from "@/lib/pricing";
import { isPromoUsed, loadBookings, markPromoUsed, saveBooking } from "@/lib/storage";
import { bookableDays, shopNow, todayKey, type ShopClock } from "@/lib/time";
import type { Booking, CustomerDetails } from "@/lib/types";

interface Props {
  initialService?: string;
  initialBarber?: string;
  initialPromo?: string;
}

const EMPTY_DETAILS: CustomerDetails = { name: "", phone: "", email: "", notes: "", terms: false };

const makeRef = () => `FD-${Math.random().toString(36).slice(2, 8).toUpperCase().padEnd(6, "0")}`;

export default function BookingWizard({ initialService, initialBarber, initialPromo }: Props) {
  const [state, dispatch] = useBookingState();
  const [clock, setClock] = useState<ShopClock | null>(null);
  const [saved, setSaved] = useState<Booking[]>([]);
  const [details, setDetails] = useState<CustomerDetails>(EMPTY_DETAILS);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [promo, setPromo] = useState({ applied: false, message: "", ok: false });
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const toast = useToast();

  const service = getService(state.service);

  // Availability depends on the current time, so it is only calculated in the browser.
  useEffect(() => {
    setClock(shopNow());
    setSaved(loadBookings());
    const id = setInterval(() => setClock(shopNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Pre-select from links like /book?service=skin-fade or /book?barber=thabo
  useEffect(() => {
    const svc = getService(initialService);
    const brb = initialBarber === "any" || getBarber(initialBarber) ? initialBarber : undefined;
    if (svc) dispatch({ type: "service", id: svc.id });
    if (brb) dispatch({ type: "barber", id: brb });
    if (svc || brb) dispatch({ type: "go", step: svc ? (brb ? 3 : 2) : 1 });
  }, [initialService, initialBarber, dispatch]);

  const applyPromo = useCallback((code: string, announce = false) => {
    const result = checkPromoCode(code, isPromoUsed());
    if (result.ok) {
      setPromo({ applied: true, ok: true, message: `${PROMO.code} applied: ${PROMO.percent}% off.` });
      if (announce) toast(`${PROMO.code} applied. ${PROMO.percent}% off your first visit.`);
    } else {
      setPromo({ applied: false, ok: false, message: result.message });
      if (announce) toast(result.message);
    }
  }, [toast]);

  useEffect(() => {
    if (initialPromo) applyPromo(initialPromo, true);
  }, [initialPromo, applyPromo]);

  useEffect(() => {
    const onApply = () => applyPromo(PROMO.code, true);
    window.addEventListener(APPLY_PROMO_EVENT, onApply);
    return () => window.removeEventListener(APPLY_PROMO_EVENT, onApply);
  }, [applyPromo]);

  // If a new service or barber makes the chosen date impossible, clear it.
  useEffect(() => {
    if (!clock || !state.date || !service || !state.barber) return;
    if (!dayStatus(state.date, state.barber, service.dur, saved, clock).ok) dispatch({ type: "date", date: null });
  }, [clock, state.date, state.barber, service, saved, dispatch]);

  // Move focus and scroll to the new step for keyboard and screen-reader users.
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const top = topRef.current;
    if (top) window.scrollTo({ top: top.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
    document.getElementById(`step-heading-${state.step}`)?.focus({ preventScroll: true });
  }, [state.step]);

  const go = (step: Step) => {
    if (step === 3 && state.date && clock) {
      const idx = bookableDays(clock).indexOf(state.date);
      if (idx > -1) dispatch({ type: "week", delta: Math.floor(idx / 7) - state.weekIdx, max: 3 });
    }
    dispatch({ type: "go", step });
  };

  const confirm = () => {
    if (!service || !state.date || state.time === null) return;
    const now = shopNow();
    const fresh = loadBookings();
    const barberId = state.barber === "any" ? state.assigned : state.barber;
    const tooSoon = state.date === todayKey(now) && state.time < now.mins + BOOKING_RULES.leadMinutes;
    if (!barberId || tooSoon || isBusy(barberId, state.date, state.time, service.dur, fresh)) {
      toast("That time was just taken. Please choose another slot.");
      setSaved(fresh);
      dispatch({ type: "time", time: null, assigned: null });
      dispatch({ type: "go", step: 3 });
      return;
    }
    const price = priceFor(service, promo.applied);
    const b: Booking = {
      ref: makeRef(), service: service.id, barber: barberId, date: state.date, start: state.time, dur: service.dur,
      name: details.name.trim(), phone: details.phone.trim(), email: details.email.trim(), notes: details.notes.trim(),
      total: price.total, disc: price.disc, created: Date.now(),
    };
    saveBooking(b);
    if (price.disc) {
      markPromoUsed();
      setPromo({ applied: false, ok: false, message: "" });
    }
    setBooking(b);
    setSaved(loadBookings());
    dispatch({ type: "go", step: 5 });
  };

  const reset = () => {
    setBooking(null);
    setDetails(EMPTY_DETAILS);
    dispatch({ type: "reset" });
  };

  if (!clock) {
    return <div className="rounded-md border-[3px] border-ink bg-paper p-8 font-semibold shadow-hard">Loading available times…</div>;
  }

  const promoView =
    promo.applied && service && PROMO.excluded.includes(service.id)
      ? { ...promo, ok: false, message: `${PROMO.code} can't be used on ${service.name}. It will apply if you choose another service.` }
      : promo;
  const assigned = getBarber(state.assigned);
  const barberLabel =
    state.barber === "any" ? (assigned ? `${assigned.name} (assigned)` : "Any available") : getBarber(state.barber)?.name ?? "Not chosen";

  return (
    <div ref={topRef}>
      <StepIndicator step={state.step} onJump={go} />
      <div className={`grid items-start gap-8 ${state.step === 5 ? "max-w-[780px]" : "lg:grid-cols-[1fr_340px]"}`}>
        <div className="rounded-md border-[3px] border-ink bg-paper p-5 shadow-hard sm:p-8">
          {state.step === 1 && <ServiceStep selected={state.service} onSelect={(id) => dispatch({ type: "service", id })} onNext={() => go(2)} />}
          {state.step === 2 && <BarberStep selected={state.barber} onSelect={(id) => dispatch({ type: "barber", id })} onBack={() => go(1)} onNext={() => go(3)} />}
          {state.step === 3 && service && state.barber && (
            <DateTimeStep
              barber={state.barber} duration={service.dur} date={state.date} time={state.time} weekIdx={state.weekIdx} clock={clock} saved={saved}
              onDate={(date) => dispatch({ type: "date", date })}
              onTime={(time, barber) => dispatch({ type: "time", time, assigned: barber })}
              onWeek={(delta, max) => dispatch({ type: "week", delta, max })}
              onBack={() => go(2)} onNext={() => go(4)}
            />
          )}
          {state.step === 4 && <DetailsStep details={details} onChange={setDetails} onBack={() => go(3)} onConfirm={confirm} />}
          {state.step === 5 && booking && <Confirmation booking={booking} onReset={reset} />}
        </div>
        {state.step !== 5 && (
          <Summary service={service} barberLabel={barberLabel} date={state.date} time={state.time}
            price={priceFor(service, promo.applied)} promo={promoView} onApplyPromo={(code) => applyPromo(code)} />
        )}
      </div>
    </div>
  );
}
