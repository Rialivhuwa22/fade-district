# Fade District Barber Co.

Website and online booking for a fictional barbershop in Maboneng, Johannesburg.

**Stack:** Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · deployed on Vercel

## Features

- Home, Services, About, Contact, Book, Terms & Conditions, Privacy and 404 pages
- 4-step booking: service → barber (or any available) → date & time → details
- Real availability rules: opening hours, barber days off, public holidays, service length must fit before closing, no past times, 30-minute lead time, no double-booking
- All times calculated in SAST (Africa/Johannesburg), whatever the visitor's timezone
- Add to calendar: Google Calendar link, Apple/Outlook `.ics` file (RFC 5545), Outlook.com link, all built from the customer's own booking
- First-visit promo modal (FIRSTFADE, 15% off), accessible: Esc/backdrop close, focus trap
- Responsive with a mobile menu, keyboard accessible, reduced-motion support

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, run this before deploying
npm test           # unit tests for booking and calendar logic
```

## Deploy to Vercel

1. Create a new GitHub repository and push this project to it.
2. Sign in at vercel.com with GitHub, click **Add New → Project** and import the repository.
3. Leave the defaults (Vercel detects Next.js) and click **Deploy**.
4. Every push to `main` redeploys automatically.

## Project structure

```
src/
  app/                  routes (one folder per page), layout, global styles
  components/           Header, Footer, PromoModal, BarberCard, ContactForm, ...
  components/booking/   BookingWizard and one component per step
  hooks/useBooking.ts   booking state (useReducer)
  lib/
    data.ts             services, barbers, hours, shop details
    time.ts             SAST date/time helpers
    availability.ts     slot generation and double-booking checks
    calendar.ts         .ics file, Google and Outlook calendar links
    pricing.ts          promo code and totals
    validation.ts       name, SA phone and email checks
    storage.ts          saves bookings in the browser
```

## Notes

- Bookings are stored in the browser (`localStorage`). To share bookings across devices, replace the functions in `src/lib/storage.ts` with calls to an API route backed by a database.
- Some slots are shown as taken on purpose, using a deterministic hash, so the demo looks like a busy shop.
- Photos are from Unsplash. If one fails to load, a branded placeholder is shown.
