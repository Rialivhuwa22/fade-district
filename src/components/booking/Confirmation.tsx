"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StepHeading from "./StepHeading";
import { CalendarIcon, DownloadIcon } from "../icons";
import { useToast } from "../Toast";
import { downloadIcs, eventFor, googleCalendarUrl, outlookCalendarUrl } from "@/lib/calendar";
import { getBarber, getService } from "@/lib/data";
import { formatLongDate, formatRand, formatTime } from "@/lib/time";
import type { Booking } from "@/lib/types";

export default function Confirmation({ booking, onReset }: { booking: Booking; onReset: () => void }) {
  const toast = useToast();
  const [links, setLinks] = useState({ google: "#", outlook: "#" });
  const service = getService(booking.service)!;
  const barber = getBarber(booking.barber)!;

  useEffect(() => {
    const ev = eventFor(booking, window.location.origin);
    setLinks({ google: googleCalendarUrl(ev), outlook: outlookCalendarUrl(ev) });
  }, [booking]);

  const rows: [string, string][] = [
    ["Service", service.name],
    ["Barber", barber.name],
    ["Date", formatLongDate(booking.date)],
    ["Time", `${formatTime(booking.start)} to ${formatTime(booking.start + booking.dur)}`],
    ["Where", "27 Fox Street, Maboneng"],
    ["Pay at shop", `${formatRand(booking.total)}${booking.disc ? ` (saved ${formatRand(booking.disc)})` : ""}`],
  ];

  return (
    <div>
      <span className="mb-4 inline-block bg-ink px-3.5 py-1.5 font-black tracking-wide text-taxi [font-stretch:120%]">Ref {booking.ref}</span>
      <StepHeading step={5}>You&apos;re booked in</StepHeading>
      <p className="text-xl text-ink-2">
        See you {formatLongDate(booking.date)} at {formatTime(booking.start)}, {booking.name.split(" ")[0]}. {barber.first} will have the chair ready.
      </p>
      <div className="my-5 rounded-md border-[3px] border-ink bg-white px-5 py-1.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3 border-b-2 border-dashed border-ink/20 py-2.5 last:border-b-0">
            <span className="text-muted">{label}</span>
            <span className="text-right font-bold">{value}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl">Add it to your calendar</h3>
      <div className="my-5 grid gap-3 sm:grid-cols-3">
        <a className="btn btn-blue !px-2.5 !py-3 text-[0.95rem]" href={links.google} target="_blank" rel="noopener noreferrer">
          <CalendarIcon width={20} height={20} /> Google Calendar
        </a>
        <button type="button" className="btn !px-2.5 !py-3 text-[0.95rem]"
          onClick={() => { downloadIcs(booking); toast("Calendar file ready. Open it to add the appointment."); }}>
          <DownloadIcon width={20} height={20} /> Apple Calendar (.ics)
        </button>
        <a className="btn btn-ghost !px-2.5 !py-3 text-[0.95rem]" href={links.outlook} target="_blank" rel="noopener noreferrer">
          <CalendarIcon width={20} height={20} /> Outlook.com
        </a>
      </div>
      <p className="text-[0.95rem] text-muted">
        The .ics file also works with Outlook desktop, Samsung Calendar and most other calendar apps. It includes a reminder 1 hour before.
      </p>
      <div className="mt-7 flex flex-wrap justify-between gap-3">
        <Link href="/" className="btn btn-ghost">Back to home</Link>
        <button type="button" className="btn" onClick={onReset}>Make another booking</button>
      </div>
    </div>
  );
}
