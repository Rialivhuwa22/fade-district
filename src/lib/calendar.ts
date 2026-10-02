import { BOOKING_RULES, SHOP, getBarber, getService } from "./data";
import { formatRand, formatTime, pad, shopTimeToUtc } from "./time";
import type { Booking } from "./types";

export interface CalendarEvent {
  title: string;
  start: number; // UTC ms
  end: number; // UTC ms
  details: string;
  location: string;
}

/** 1758814200000 -> "20250925T153000Z" */
export function utcStamp(ms: number): string {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export function eventFor(b: Booking, siteUrl: string): CalendarEvent {
  const service = getService(b.service);
  const barber = getBarber(b.barber);
  if (!service || !barber) throw new Error("Booking references an unknown service or barber");
  const start = shopTimeToUtc(b.date, b.start);
  const details = [
    `Booking ref: ${b.ref}`,
    `Service: ${service.name} (${b.dur} min)`,
    `Barber: ${barber.name}`,
    `Time: ${formatTime(b.start)} to ${formatTime(b.start + b.dur)} (SAST)`,
    `Price: ${formatRand(b.total)} payable at the shop${b.disc ? " (FIRSTFADE 15% off applied)" : ""}`,
    `Booked for: ${b.name}`,
    "",
    "Please arrive 5 minutes early.",
    `To cancel or reschedule, give at least 4 hours' notice: call ${SHOP.phone} or WhatsApp ${SHOP.whatsapp}.`,
    `Terms: ${siteUrl}/terms`,
  ].join("\n");
  return {
    title: `${service.name} with ${barber.first} at ${SHOP.name}`,
    start,
    end: start + b.dur * 60_000,
    details,
    location: `${SHOP.name}, ${SHOP.address}`,
  };
}

export function googleCalendarUrl(ev: CalendarEvent): string {
  const q = [
    "action=TEMPLATE",
    `text=${encodeURIComponent(ev.title)}`,
    `dates=${utcStamp(ev.start)}/${utcStamp(ev.end)}`,
    `details=${encodeURIComponent(ev.details)}`,
    `location=${encodeURIComponent(ev.location)}`,
    `ctz=${BOOKING_RULES.timeZone}`,
  ];
  return `https://calendar.google.com/calendar/render?${q.join("&")}`;
}

export function outlookCalendarUrl(ev: CalendarEvent): string {
  const q = [
    "path=%2Fcalendar%2Faction%2Fcompose",
    "rru=addevent",
    `subject=${encodeURIComponent(ev.title)}`,
    `startdt=${encodeURIComponent(new Date(ev.start).toISOString())}`,
    `enddt=${encodeURIComponent(new Date(ev.end).toISOString())}`,
    `body=${encodeURIComponent(ev.details)}`,
    `location=${encodeURIComponent(ev.location)}`,
  ];
  return `https://outlook.live.com/calendar/0/deeplink/compose?${q.join("&")}`;
}

/** Escapes text values per RFC 5545 section 3.3.11. */
export const icsEscape = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** Folds lines longer than 75 octets (content is ASCII, so characters = octets). */
export function icsFold(line: string): string {
  const parts: string[] = [];
  let rest = line;
  while (rest.length > 72) {
    parts.push(rest.slice(0, 72));
    rest = " " + rest.slice(72);
  }
  parts.push(rest);
  return parts.join("\r\n");
}

export function buildIcs(b: Booking, siteUrl: string, nowMs: number = Date.now()): string {
  const ev = eventFor(b, siteUrl);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fade District Barber Co//Online Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${b.ref}-${b.created}@fadedistrict.co.za`,
    `DTSTAMP:${utcStamp(nowMs)}`,
    `DTSTART:${utcStamp(ev.start)}`,
    `DTEND:${utcStamp(ev.end)}`,
    `SUMMARY:${icsEscape(ev.title)}`,
    `DESCRIPTION:${icsEscape(ev.details)}`,
    `LOCATION:${icsEscape(ev.location)}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsEscape(`Reminder: ${ev.title}`)}`,
    "TRIGGER:-PT1H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(icsFold).join("\r\n") + "\r\n";
}

/** Browser only: saves the .ics file (iOS opens it straight in Calendar). */
export function downloadIcs(b: Booking): void {
  const ics = buildIcs(b, window.location.origin);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
  if (isIOS) {
    window.location.href = dataUrl;
    return;
  }
  try {
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `fade-district-${b.ref}.ics`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 1500);
  } catch {
    window.location.href = dataUrl;
  }
}
