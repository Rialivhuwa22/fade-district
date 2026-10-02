"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/lib/data";
import { DAYS, formatTime, isClosedDate, shopNow, todayKey, type ShopClock } from "@/lib/time";

const ORDER = [1, 2, 3, 4, 5, 6, 0];

function statusFor(c: ShopClock) {
  const [open, close] = HOURS[c.dow];
  const closedToday = isClosedDate(todayKey(c));
  if (!closedToday && c.mins >= open && c.mins < close) return { open: true, label: `Open now until ${formatTime(close)}` };
  if (!closedToday && c.mins < open) return { open: false, label: `Closed, opens today at ${formatTime(open)}` };
  const next = (c.dow + 1) % 7;
  return { open: false, label: `Closed, opens ${DAYS[next]} at ${formatTime(HOURS[next][0])}` };
}

/** Rendered on the client so "today" and "open now" use the real SAST time, not the build time. */
export default function HoursCard() {
  const [clock, setClock] = useState<ShopClock | null>(null);
  useEffect(() => {
    setClock(shopNow());
    const id = setInterval(() => setClock(shopNow()), 60_000);
    return () => clearInterval(id);
  }, []);
  const status = clock ? statusFor(clock) : null;

  return (
    <div className="mt-7 rounded-md border-[3px] border-ink bg-paper p-6 shadow-hard">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="m-0 text-xl">Opening hours</h3>
        {status && (
          <span className="inline-flex items-center gap-2 rounded-full border-[3px] border-ink bg-paper px-3 py-1 text-sm font-extrabold">
            <span className={`h-2.5 w-2.5 rounded-full ${status.open ? "bg-green-600" : "bg-signal"}`} aria-hidden="true" />
            {status.label}
          </span>
        )}
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {ORDER.map((d) => {
            const today = clock?.dow === d;
            return (
              <tr key={d} className={today ? "font-extrabold text-cobalt" : ""}>
                <td className="border-b-2 border-dashed border-ink/20 py-2.5">{DAYS[d]}{today ? " (today)" : ""}</td>
                <td className="border-b-2 border-dashed border-ink/20 py-2.5 text-right font-bold">{formatTime(HOURS[d][0])} to {formatTime(HOURS[d][1])}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-muted">Closed on 25 December and 1 January. The last booking starts so it finishes by closing time.</p>
    </div>
  );
}
