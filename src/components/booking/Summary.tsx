"use client";

import { useState } from "react";
import { PROMO } from "@/lib/data";
import { formatLongDate, formatRand, formatTime } from "@/lib/time";
import type { Price } from "@/lib/pricing";
import type { Service } from "@/lib/types";

interface Props {
  service: Service | null;
  barberLabel: string;
  date: string | null;
  time: number | null;
  price: Price;
  promo: { applied: boolean; message: string; ok: boolean };
  onApplyPromo: (code: string) => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b-2 border-dashed border-ink/20 py-2.5 text-[0.97rem]">
      <span className="text-muted">{label}</span>
      <span className="text-right font-bold">{value}</span>
    </div>
  );
}

export default function Summary({ service, barberLabel, date, time, price, promo, onApplyPromo }: Props) {
  const [code, setCode] = useState("");
  const apply = () => onApplyPromo(code);

  return (
    <aside aria-label="Booking summary" className="rounded-md border-[3px] border-ink bg-paper p-6 shadow-hard lg:sticky lg:top-24">
      <h3 className="mb-3.5 text-xl">Your booking</h3>
      <Row label="Service" value={service?.name ?? "Not chosen"} />
      <Row label="Duration" value={service ? `${service.dur} min` : "\u2013"} />
      <Row label="Barber" value={barberLabel} />
      <Row label="Date" value={date ? formatLongDate(date) : "Not chosen"} />
      <Row label="Time" value={time !== null && service ? `${formatTime(time)} to ${formatTime(time + service.dur)}` : "Not chosen"} />
      {price.disc > 0 && <Row label="Discount" value={`\u2212${formatRand(price.disc)} (${PROMO.code})`} />}
      <div className="flex justify-between pt-3.5 text-xl font-black [font-stretch:112%]">
        <span>Pay at shop</span>
        <span>{formatRand(price.total)}</span>
      </div>
      <div className="mt-5">
        <label htmlFor="promo" className="text-[0.95rem] font-extrabold">Promo code</label>
        <div className="mt-1.5 flex gap-2">
          <input id="promo" className="field-input !min-h-[46px] uppercase" placeholder={PROMO.code} autoComplete="off" value={promo.applied && !code ? PROMO.code : code}
            onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); apply(); } }} />
          <button type="button" className="btn btn-sm" onClick={apply}>Apply</button>
        </div>
        {promo.message && <p aria-live="polite" className={`mt-1.5 text-sm font-bold ${promo.ok ? "text-green-700" : "text-signal"}`}>{promo.message}</p>}
      </div>
    </aside>
  );
}
