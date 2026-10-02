import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { CATEGORIES, SERVICES } from "@/lib/data";
import { formatRand } from "@/lib/time";

export const metadata: Metadata = { title: "Services & Prices" };

const FAQS = [
  { q: "Do you take walk-ins?", a: <>Yes, when a chair is free. Booking online guarantees your time, and walk-ins are fitted around booked clients.</> },
  { q: "How late can I cancel?", a: <>Up to 4 hours before your appointment, free of charge. Call or WhatsApp us on 011 555 0147. See our <Link href="/terms" className="link">Terms &amp; Conditions</Link> for details.</> },
  { q: "What age counts as a kids cut?", a: <>Kids cuts are for children under 12. Children under 16 must be accompanied by a parent or guardian.</> },
  { q: "How do I pay?", a: <>Pay at the shop after your service. We accept Visa, Mastercard, cash and SnapScan. No deposit is needed to book.</> },
  { q: "What if I'm not happy with my cut?", a: <>Come back within 7 days and we&apos;ll fix it free. Just tell us at the time or message us on WhatsApp.</> },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero tag="Prices include VAT" title="Services & prices" lead="Every cut includes a consultation, wash on request and a styled finish. Times below are how long you'll be in the chair." />
      <section className="py-16 md:py-28">
        <div className="wrap">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="mb-12 rounded-md border-[3px] border-ink bg-ink p-6 text-paper shadow-taxi md:p-11">
              <h2 className="h2 flex flex-wrap items-center gap-4 text-taxi">
                {cat.name} <small className="text-base font-semibold text-[#bdb8c3] normal-case [font-stretch:100%]">{cat.note}</small>
              </h2>
              {SERVICES.filter((s) => s.cat === cat.id).map((s) => (
                <div key={s.id} className="grid grid-cols-[1fr_auto] items-center gap-4.5 border-b-2 border-dashed border-paper/20 py-4.5 last:border-b-0 sm:grid-cols-[1fr_auto_auto]">
                  <div>
                    <h3 className="mb-1 text-xl">{s.name}</h3>
                    <p className="m-0 text-[0.97rem] text-[#bdb8c3]">{s.desc}</p>
                  </div>
                  <div className="text-right text-2xl font-black whitespace-nowrap [font-stretch:118%]">
                    {formatRand(s.price)}
                    <small className="block text-xs font-semibold text-[#bdb8c3] [font-stretch:100%]">{s.dur} min</small>
                  </div>
                  <Link href={`/book?service=${s.id}`} className="btn btn-sm btn-on-dark col-span-full justify-self-start sm:col-span-1" aria-label={`Book ${s.name}`}>Book</Link>
                </div>
              ))}
            </div>
          ))}

          <h2 className="h2 mt-6">Good to know</h2>
          <div className="max-w-[820px]">
            {FAQS.map((f) => (
              <details key={f.q} className="faq mb-3.5 rounded-md border-[3px] border-ink bg-paper">
                <summary>{f.q}</summary>
                <div className="px-5.5 pb-4.5"><p>{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Found your cut? Lock in a time." />
    </>
  );
}
