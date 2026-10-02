import StepHeading from "./StepHeading";
import { dayStatus, slotsFor } from "@/lib/availability";
import { DAYS_SHORT, MONTHS, bookableDays, formatLongDate, formatTime, parseDateKey, todayKey, type ShopClock } from "@/lib/time";
import type { Booking } from "@/lib/types";

interface Props {
  barber: string;
  duration: number;
  date: string | null;
  time: number | null;
  weekIdx: number;
  clock: ShopClock;
  saved: Booking[];
  onDate: (d: string) => void;
  onTime: (t: number, barber: string) => void;
  onWeek: (delta: number, max: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const shortDate = (key: string) => {
  const p = parseDateKey(key);
  return `${p.d} ${MONTHS[p.m - 1].slice(0, 3)}`;
};

export default function DateTimeStep({ barber, duration, date, time, weekIdx, clock, saved, onDate, onTime, onWeek, onBack, onNext }: Props) {
  const all = bookableDays(clock);
  const maxWeek = Math.ceil(all.length / 7) - 1;
  const week = all.slice(weekIdx * 7, weekIdx * 7 + 7);
  const today = todayKey(clock);
  const slots = date ? slotsFor(date, barber, duration, saved, clock) : [];
  const anyFree = slots.some((s) => s.freeBarber);

  return (
    <div>
      <StepHeading step={3}>Pick a date &amp; time</StepHeading>

      <div className="mb-3 flex items-center justify-between gap-3">
        <button type="button" className="btn btn-sm btn-ghost" disabled={weekIdx === 0} onClick={() => onWeek(-1, maxWeek)} aria-label="Previous week">Previous</button>
        <strong aria-live="polite">{shortDate(week[0])} to {shortDate(week[week.length - 1])}</strong>
        <button type="button" className="btn btn-sm btn-ghost" disabled={weekIdx >= maxWeek} onClick={() => onWeek(1, maxWeek)} aria-label="Next week">Next</button>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-7">
        {week.map((k) => {
          const p = parseDateKey(k);
          const st = dayStatus(k, barber, duration, saved, clock);
          const selected = date === k;
          return (
            <button key={k} type="button" disabled={!st.ok} aria-pressed={selected} title={st.reason}
              aria-label={`${formatLongDate(k)}. ${st.reason}`} onClick={() => onDate(k)}
              className={`rounded-md border-[3px] border-ink px-1 py-2.5 text-center leading-tight disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:opacity-35
                ${selected ? "bg-taxi shadow-[3px_3px_0_var(--color-ink)]" : "bg-white enabled:hover:bg-[#fff6d8]"}`}>
              <span className={`block text-xs font-bold ${selected ? "text-ink" : "text-muted"}`}>{k === today ? "Today" : DAYS_SHORT[p.dow]}</span>
              <span className="block text-2xl font-black">{p.d}</span>
              <span className="block text-xs font-semibold">{MONTHS[p.m - 1].slice(0, 3)}</span>
            </button>
          );
        })}
      </div>

      <h3 className="mb-3 text-lg">{date ? `Available times on ${formatLongDate(date)}` : "Available times"}</h3>
      <div aria-live="polite" className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2">
        {!date && <p className="col-span-full rounded-md border-2 border-dashed border-ink bg-concrete p-4 font-semibold">Choose a date above to see open times.</p>}
        {date && !anyFree && (
          <p className="col-span-full rounded-md border-2 border-dashed border-ink bg-concrete p-4 font-semibold">
            No times left on this day. Try another date{barber !== "any" ? ' or choose "Any available barber"' : ""}.
          </p>
        )}
        {date && anyFree && slots.map((s) => {
          const selected = time === s.start;
          return (
            <button key={s.start} type="button" disabled={!s.freeBarber} aria-pressed={selected}
              aria-label={s.freeBarber ? formatTime(s.start) : `${formatTime(s.start)} booked`}
              onClick={() => s.freeBarber && onTime(s.start, s.freeBarber)}
              className={`min-h-[46px] rounded-md border-[3px] border-ink px-1 py-2.5 font-extrabold disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:line-through disabled:opacity-35
                ${selected ? "bg-taxi shadow-[3px_3px_0_var(--color-ink)]" : "bg-white enabled:hover:bg-[#fff6d8]"}`}>
              {formatTime(s.start)}
            </button>
          );
        })}
      </div>

      <div className="mt-7 flex flex-wrap justify-between gap-3">
        <button type="button" className="btn btn-ghost" onClick={onBack}>Back</button>
        <button type="button" className="btn" disabled={!date || time === null} onClick={onNext}>Continue to your details</button>
      </div>
    </div>
  );
}
