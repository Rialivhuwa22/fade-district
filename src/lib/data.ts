import type { Barber, Category, Service } from "./types";

export const SHOP = {
  name: "Fade District Barber Co.",
  street: "27 Fox Street",
  area: "Maboneng Precinct",
  city: "Johannesburg",
  postcode: "2094",
  address: "27 Fox Street, Maboneng Precinct, Johannesburg, 2094, South Africa",
  phone: "011 555 0147",
  phoneHref: "tel:+27115550147",
  whatsapp: "082 555 0147",
  whatsappHref: "https://wa.me/27825550147",
  email: "hello@fadedistrict.co.za",
} as const;

export const CATEGORIES: Category[] = [
  { id: "cuts", name: "Haircuts", note: "Includes consultation and styled finish" },
  { id: "beard", name: "Beard & shave", note: "Hot towel on every beard service" },
  { id: "packages", name: "Packages", note: "Best value" },
  { id: "extras", name: "Add-ons & extras", note: "Book alone or with a cut" },
];

export const SERVICES: Service[] = [
  { id: "signature-cut", cat: "cuts", name: "Signature Cut", price: 220, dur: 45, desc: "Clipper and scissor cut tailored to your hair, with wash and style." },
  { id: "skin-fade", cat: "cuts", name: "Skin Fade", price: 250, dur: 45, desc: "Blended down to the skin, razor line-up and hot towel finish." },
  { id: "taper-fade", cat: "cuts", name: "Taper Fade", price: 230, dur: 45, desc: "Clean taper at the neckline and sideburns, length kept on top." },
  { id: "scissor-cut", cat: "cuts", name: "Long Hair Scissor Cut", price: 280, dur: 60, desc: "Scissor-only cut and restyle for longer or textured hair." },
  { id: "buzz-cut", cat: "cuts", name: "Buzz Cut", price: 150, dur: 30, desc: "One length all over, edges cleaned with a razor." },
  { id: "kids-cut", cat: "cuts", name: "Kids Cut (under 12)", price: 140, dur: 30, desc: "Any style for young clients, with a patient barber." },
  { id: "beard-trim", cat: "beard", name: "Beard Trim & Line-up", price: 120, dur: 30, desc: "Shape, length and cheek and neck lines with a straight razor." },
  { id: "hot-towel", cat: "beard", name: "Hot Towel Shave", price: 200, dur: 45, desc: "Pre-shave oil, two hot towels, straight-razor shave and balm." },
  { id: "beard-sculpt", cat: "beard", name: "Beard Sculpt & Colour", price: 260, dur: 45, desc: "Full reshape plus semi-permanent colour to fill patches or greys." },
  { id: "full-district", cat: "packages", name: "The Full District", price: 420, dur: 90, desc: "Any haircut, beard sculpt and hot towel finish." },
  { id: "father-son", cat: "packages", name: "Father & Son", price: 330, dur: 75, desc: "Adult haircut plus a kids cut, back to back with the same barber." },
  { id: "grooms-prep", cat: "packages", name: "Groom's Prep", price: 650, dur: 120, desc: "Cut, hot towel shave, black mask facial and a style for the big day." },
  { id: "line-up", cat: "extras", name: "Line-up Only", price: 80, dur: 30, desc: "Hairline, temples and neck cleaned up between cuts." },
  { id: "hair-design", cat: "extras", name: "Hair Design", price: 90, dur: 30, desc: "Freehand lines, parts or patterns shaved into your cut." },
  { id: "facial", cat: "extras", name: "Black Mask Facial", price: 150, dur: 30, desc: "Charcoal peel-off mask, steam and moisturiser." },
];

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const IMAGES = {
  hero: img("photo-1503951914875-452162b0f3f1"),
  shopFloor: img("photo-1585747860715-2ba37e788b70"),
  interior: img("photo-1493256338651-d82f7acb2b38"),
  gallery: [
    { src: img("photo-1621605815971-fbc98d665033"), alt: "Barber finishing a sharp haircut" },
    { src: img("photo-1599351431202-1e0f0137899a"), alt: "Straight razor beard shave" },
    { src: img("photo-1622286342621-4bd786c2447c"), alt: "Clipper fade in progress" },
    { src: img("photo-1521590832167-7bcbfaa6381f"), alt: "Barbershop chairs and mirrors" },
    { src: img("photo-1605497788044-5a32c7078486"), alt: "Barber styling a client's hair" },
    { src: img("photo-1512690459411-b9245aed614b"), alt: "Barber tools laid out on the counter" },
  ],
};

export const BARBERS: Barber[] = [
  { id: "thabo", name: "Thabo Mokoena", first: "Thabo", role: "Founder & master barber", years: 14, off: [0], specs: ["Skin fades", "Waves", "Line-ups"], bio: "Started cutting in Soweto at 16 and opened Fade District in 2019. Known for the cleanest skin fades on Fox Street.", img: img("photo-1531384441138-2736e62e0919") },
  { id: "keanu", name: "Keanu Adams", first: "Keanu", role: "Beard & shave specialist", years: 9, off: [1], specs: ["Hot towel shaves", "Beard sculpts", "Grooms"], bio: "Trained in Cape Town under an old-school straight-razor barber. Takes his time and doesn't rush a shave.", img: img("photo-1500648767791-00dcc994a43e") },
  { id: "lerato", name: "Lerato Dlamini", first: "Lerato", role: "Creative & design barber", years: 7, off: [2], specs: ["Hair designs", "Colour", "Textured hair"], bio: "An artist who switched canvases. If you want a pattern, a part or something nobody else has, book Lerato.", img: img("photo-1531123897727-8f129e1688ce") },
  { id: "sipho", name: "Sipho Ndlovu", first: "Sipho", role: "Classic cuts & kids", years: 6, off: [3], specs: ["Kids cuts", "Tapers", "Classic styles"], bio: "The calmest hands in the shop. Parents ask for Sipho by name for first haircuts and nervous clients.", img: img("photo-1522529599102-193c0d76b5b6") },
];

/** Opening hours in minutes after midnight, keyed by day (0 = Sunday). */
export const HOURS: Record<number, [number, number]> = {
  0: [600, 840],
  1: [540, 1140],
  2: [540, 1140],
  3: [540, 1140],
  4: [540, 1140],
  5: [540, 1140],
  6: [480, 1020],
};

/** MM-DD dates the shop is closed every year. */
export const CLOSED_DATES = ["12-25", "01-01"];

export const BOOKING_RULES = {
  slotStep: 30,
  daysAhead: 28,
  leadMinutes: 30,
  tzOffsetMinutes: 120, // SAST is UTC+2 with no daylight saving
  timeZone: "Africa/Johannesburg",
} as const;

export const PROMO = { code: "FIRSTFADE", percent: 15, excluded: ["grooms-prep"] as string[] };

export const getService = (id: string | null | undefined) => SERVICES.find((s) => s.id === id) ?? null;
export const getBarber = (id: string | null | undefined) => BARBERS.find((b) => b.id === id) ?? null;
