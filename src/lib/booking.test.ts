import { buildIcs, eventFor, googleCalendarUrl } from "./calendar";
import { slotsFor, dayStatus } from "./availability";
import { shopNow, bookableDays, shopTimeToUtc } from "./time";
import { isValidSaPhone, isValidEmail } from "./validation";
import { priceFor, checkPromoCode } from "./pricing";
import { getService } from "./data";
import assert from "node:assert";
import { test } from "node:test";
test("booking logic", () => {
// 15:00 SAST on 25 Sep 2026 = 13:00 UTC
assert.equal(new Date(shopTimeToUtc("2026-09-25", 900)).toISOString(), "2026-09-25T13:00:00.000Z");
// midnight edge: 01:00 SAST -> previous day 23:00 UTC
assert.equal(new Date(shopTimeToUtc("2026-10-01", 60)).toISOString(), "2026-09-30T23:00:00.000Z");
// shopNow: 23:30 UTC on 24 Sep is already 25 Sep in SAST
const c = shopNow(Date.UTC(2026, 8, 24, 23, 30));
assert.deepEqual([c.y, c.m, c.d, c.mins], [2026, 9, 25, 90]);
const days = bookableDays(c); assert.equal(days.length, 28); assert.equal(days[0], "2026-09-25");
// slots: skin fade 45min on a Friday ends by 19:00, starts at 09:00
const s = slotsFor("2026-09-25", "any", 45, [], c);
assert.equal(s[0].start, 540); assert.ok(s[s.length - 1].start + 45 <= 1140);
// today lead time: at 14:10 SAST no slot before 14:40
const c2 = shopNow(Date.UTC(2026, 8, 25, 12, 10));
assert.ok(slotsFor("2026-09-25", "any", 45, [], c2).every(x => x.start >= 14 * 60 + 40));
// days off / holidays
assert.equal(dayStatus("2026-09-27", "thabo", 45, [], c).ok, false); // Sunday
assert.equal(dayStatus("2026-12-25", "any", 45, [], c).ok, false);
// saved booking blocks overlap
const free = s.find(x => x.freeBarber)!;
const saved = [{ ref: "X", service: "skin-fade", barber: free.freeBarber!, date: "2026-09-25", start: free.start, dur: 45, name: "", phone: "", email: "", notes: "", total: 0, disc: 0, created: 0 }];
const after = slotsFor("2026-09-25", free.freeBarber!, 45, saved, c).find(x => x.start === free.start)!;
assert.equal(after.freeBarber, null);
// validation
assert.ok(isValidSaPhone("082 123 4567")); assert.ok(isValidSaPhone("+27 82 123 4567")); assert.ok(!isValidSaPhone("12345"));
assert.ok(isValidEmail("a@b.co")); assert.ok(!isValidEmail("a@b"));
// pricing
assert.deepEqual(priceFor(getService("skin-fade"), true), { base: 250, disc: 38, total: 212 });
assert.equal(priceFor(getService("grooms-prep"), true).disc, 0);
assert.equal(checkPromoCode("firstfade", false).ok, true); assert.equal(checkPromoCode("NOPE", false).ok, false);
// calendar
const bk = { ref: "FD-ABC123", service: "skin-fade", barber: "thabo", date: "2026-09-25", start: 900, dur: 45, name: "Sam Test", phone: "0821234567", email: "s@x.co", notes: "", total: 250, disc: 0, created: 1 };
const ics = buildIcs(bk, "https://example.com", Date.UTC(2026, 8, 24));
assert.ok(ics.includes("DTSTART:20260925T130000Z")); assert.ok(ics.includes("DTEND:20260925T134500Z"));
assert.ok(ics.split("\r\n").every(l => l.length <= 75));
assert.ok(googleCalendarUrl(eventFor(bk, "https://example.com")).includes("dates=20260925T130000Z/20260925T134500Z"));
});
