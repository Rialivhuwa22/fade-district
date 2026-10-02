import Link from "next/link";
import BarberCard from "@/components/BarberCard";
import CtaBand from "@/components/CtaBand";
import SafeImage from "@/components/SafeImage";
import { BARBERS, IMAGES } from "@/lib/data";

const HIGHLIGHTS = [
  { id: "skin-fade", name: "Skin Fade", price: "R250", desc: "Down-to-the-skin blend, sharp line-up, finished with a hot towel.", style: "bg-taxi", btn: "btn-ghost" },
  { id: "beard-trim", name: "Beard Trim & Line-up", price: "R120", desc: "Shape, length and edges cleaned up with a straight razor.", style: "bg-paper", btn: "" },
  { id: "hot-towel", name: "Hot Towel Shave", price: "R200", desc: "Pre-shave oil, two hot towels and a slow straight-razor shave.", style: "bg-cobalt text-white", btn: "" },
  { id: "full-district", name: "The Full District", price: "R420", desc: "Any cut, beard sculpt and hot towel finish. Our most-booked package.", style: "bg-paper", btn: "" },
];

const REVIEWS = [
  { text: "Thabo's skin fade is the cleanest I've had in Joburg. Booked on my phone at lunch, sat down at 17:30 exactly.", name: "Kagiso M.", area: "Braamfontein", style: "bg-paper" },
  { text: "Brought my son for his first proper cut. Sipho had him laughing the whole time and the line-up was perfect.", name: "Naledi K.", area: "Parktown", style: "bg-taxi" },
  { text: "The hot towel shave before my wedding was worth every rand. Keanu takes his time and it shows.", name: "Ruan D.", area: "Melville", style: "bg-paper" },
];

const TICKER = ["Skin fades", "Beard sculpts", "Hot towel shaves", "Hair designs", "Kids cuts", "Walk-ins welcome"];

const GALLERY_LAYOUT = ["col-span-2 row-span-2", "", "", "md:col-span-2", "", ""];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-ink text-paper">
        <div className="wrap grid items-center gap-12 py-12 md:py-24 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <h1 className="mb-6 text-[clamp(3rem,8.4vw,6.8rem)] leading-[.9] uppercase">
              Sharp cuts <span className="block text-[1.22em] text-taxi [font-stretch:62%]">Loud city</span>
            </h1>
            <p className="max-w-[46ch] text-xl text-[#e3dfe7]">
              Skin fades, beard sculpts and hot towel shaves on Fox Street, Maboneng. Four barbers, one chair each, and a booking system that tells you exactly when you&apos;re in.
            </p>
            <div className="my-8 flex flex-wrap gap-4">
              <Link href="/book" className="btn btn-on-dark">Book your cut</Link>
              <Link href="/services" className="btn btn-ghost-dark">See prices</Link>
            </div>
            <dl className="flex flex-wrap gap-7 text-[0.95rem] text-[#bdb8c3]">
              <div><dt className="font-bold text-paper">4.9 on 640+ reviews</dt><dd>Google &amp; Booksy</dd></div>
              <div><dt className="font-bold text-paper">Open 7 days</dt><dd>Late till 19:00 weekdays</dd></div>
              <div><dt className="font-bold text-paper">From R140</dt><dd>Kids cuts under 12</dd></div>
            </dl>
          </div>
          <div className="relative max-w-[480px] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border-4 border-paper bg-ink-2 shadow-[12px_12px_0_var(--color-taxi)]">
              <SafeImage src={IMAGES.hero} alt="Barber giving a client a precise fade with clippers" fill priority sizes="(max-width: 1024px) 480px, 40vw" className="object-cover" />
            </div>
            <div className="absolute bottom-9 -left-2 max-w-[210px] -rotate-6 border-[3px] border-paper bg-signal px-4.5 py-3.5 text-lg leading-tight font-black text-white [font-stretch:115%] sm:-left-7">
              15% off your first visit
              <small className="mt-1 block text-sm font-semibold [font-stretch:100%]">Use code FIRSTFADE</small>
            </div>
          </div>
        </div>
      </section>
      <div className="pole" aria-hidden="true" />
      <div className="overflow-hidden border-b-[3px] border-ink bg-taxi whitespace-nowrap" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      <section className="py-16 md:py-28">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 m-0">What we do best</h2>
            <Link href="/services" className="link">Full price list</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map((s) => (
              <article key={s.id} className={`flex flex-col rounded-md border-[3px] border-ink p-6 shadow-hard ${s.style}`}>
                <h3 className="mb-2 text-xl">{s.name}</h3>
                <p>{s.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="text-2xl font-black [font-stretch:115%]">{s.price}</span>
                  <Link href={`/book?service=${s.id}`} className={`btn btn-sm ${s.btn}`} aria-label={`Book ${s.name}`}>Book</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-paper md:py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-ink bg-ink-2 shadow-hard">
            <SafeImage src={IMAGES.shopFloor} alt="Inside the barbershop, barber working at a chair" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <h2 className="h2">No guesswork. No waiting on a bench.</h2>
            <p className="text-xl text-fog">Pick your barber, pick your slot, and it goes straight into your calendar. Your chair is ready when you walk in.</p>
            <ul className="my-6">
              {["Live time slots for each barber, seven days a week", "Add your booking to Google, Apple or Outlook calendar in one tap", "Free touch-up within 7 days if something isn't right", "Card, cash and SnapScan accepted"].map((t) => (
                <li key={t} className="relative border-b-2 border-dashed border-paper/20 py-3 pl-10">
                  <span aria-hidden="true" className="absolute top-4 left-0 h-5 w-5 rotate-45 border-[3px] border-ink bg-taxi" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/book" className="btn btn-on-dark">Book a slot</Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-28">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 m-0">The crew</h2>
            <Link href="/about" className="link">Meet the barbers</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BARBERS.map((b, i) => <BarberCard key={b.id} barber={b} highlight={i === 1} />)}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-28">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 m-0">Fresh off the chair</h2>
            <p className="m-0">Recent work from the shop floor.</p>
          </div>
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4">
            {IMAGES.gallery.map((g, i) => (
              <figure key={g.src} className={`group relative m-0 overflow-hidden border-[3px] border-ink bg-ink-2 ${GALLERY_LAYOUT[i]}`}>
                <SafeImage src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-paper md:py-28">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 m-0">What clients say</h2>
            <p className="m-0 text-fog">4.9 average across 640+ reviews.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className={`m-0 flex flex-col rounded-md border-[3px] border-ink p-6 text-lg text-ink shadow-hard ${r.style}`}>
                <div className="mb-2.5 text-xl tracking-[3px] text-signal" aria-label="5 out of 5 stars">★★★★★</div>
                <p>{r.text}</p>
                <footer className="mt-auto pt-3.5 font-extrabold">{r.name} <span className="font-medium text-muted">{r.area}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Your next fresh cut is two minutes away" />
    </>
  );
}
