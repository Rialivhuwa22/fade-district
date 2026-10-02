import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import { SHOP } from "@/lib/data";

export const metadata: Metadata = { title: "Terms & Conditions" };

const SECTIONS: { id: string; title: string; items: ReactNode[] }[] = [
  { id: "bookings", title: "Bookings", items: [
    "Bookings can be made online, by phone or on WhatsApp. A booking is confirmed once you receive a booking reference.",
    "Bookings can be made up to 4 weeks in advance, and no later than 30 minutes before the start time.",
    "If you choose \"Any available barber\", we assign a barber when you book. We may need to change your barber in exceptional circumstances (for example illness), and will tell you as early as we can.",
    "Please give accurate contact details so we can reach you if something changes.",
  ]},
  { id: "arrival", title: "Arrival and late arrival", items: [
    "Please arrive 5 minutes before your appointment.",
    "We hold your slot for 15 minutes. If you arrive later than that, we may shorten your service so the next client isn't delayed, or ask you to rebook. The full price of the booked service still applies to a shortened service.",
  ]},
  { id: "cancellations", title: "Cancellations and no-shows", items: [
    `You can cancel or reschedule free of charge up to 4 hours before your appointment by calling ${SHOP.phone} or on WhatsApp at ${SHOP.whatsapp}.`,
    "If you cancel with less than 4 hours' notice, or don't arrive, we record a missed appointment. After two missed appointments in 6 months, we may ask for a 50% deposit on future bookings.",
    "If we need to cancel, we'll offer you the nearest available slot or cancel without any charge to you.",
  ]},
  { id: "prices", title: "Prices and payment", items: [
    "All prices are in South African Rand (ZAR) and include VAT at the current rate.",
    "Payment is due at the shop after your service. We accept Visa, Mastercard, cash and SnapScan.",
    "Prices shown when you book are the prices you pay. If you ask for extra work during your visit, we'll confirm the new price before starting.",
    "We may update our prices from time to time. Changes don't affect bookings already confirmed.",
  ]},
  { id: "promotions", title: "Promotions", items: [
    "The FIRSTFADE code gives 15% off one service for first-time clients only, one use per person. It can't be combined with other offers or used on the Groom's Prep package.",
    "We may refuse a promotion if we reasonably believe it's being misused.",
  ]},
  { id: "children", title: "Children", items: [
    "Kids cuts are for children under 12. Clients under 16 must be accompanied by a parent or guardian for the whole appointment.",
  ]},
  { id: "health", title: "Health and safety", items: [
    "Please tell your barber about any allergies, skin conditions or sensitivities before your service.",
    "We may decline or change a service if we see a scalp or skin condition that could be contagious or made worse by the service.",
    "Tools are disinfected between clients and we use single-use razor blades.",
  ]},
  { id: "guarantee", title: "Satisfaction guarantee", items: [
    "If you're not happy with your service, tell us at the time or within 7 days and we'll correct it free of charge. This covers the service you received, not a change of style.",
  ]},
  { id: "conduct", title: "Conduct", items: [
    "We want the shop to feel good for everyone. We may refuse service to anyone who is abusive, aggressive or under the influence of alcohol or drugs.",
  ]},
  { id: "liability", title: "Liability", items: [
    "We take reasonable care with every service. To the extent permitted by law, we aren't liable for reactions to products where you didn't tell us about a known allergy or condition.",
    "Please keep personal belongings with you. We aren't responsible for items left unattended, unless the loss is caused by our negligence.",
  ]},
  { id: "privacy", title: "Personal information", items: [
    <>We collect your name, phone number and email only to manage your bookings and contact you about them. We process personal information in line with the Protection of Personal Information Act 4 of 2013 (POPIA). Read our <Link className="link" href="/privacy">Privacy Policy</Link> for full details.</>,
  ]},
  { id: "changes", title: "Changes and governing law", items: [
    "We may update these Terms. The version shown on this page when you book applies to that booking.",
    "These Terms are governed by the laws of the Republic of South Africa.",
    <>Questions? Email <a className="link" href={`mailto:${SHOP.email}`}>{SHOP.email}</a> or call {SHOP.phone}.</>,
  ]},
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms & conditions" lead="The rules for booking and visiting Fade District, written plainly." />
      <section className="py-16 md:py-28">
        <div className="wrap">
          <article className="legal max-w-[860px] rounded-md border-[3px] border-ink bg-paper p-6 md:p-14">
            <p className="font-semibold text-muted">Last updated: 24 September 2026</p>
            <p>
              These Terms &amp; Conditions (&quot;Terms&quot;) apply to all bookings made with, and services provided by, Fade District Barber Co. (Pty) Ltd, {SHOP.address.replace(", South Africa", "")} (&quot;Fade District&quot;, &quot;we&quot;, &quot;us&quot;). By making a booking or using our services you agree to these Terms. Nothing in these Terms limits your rights under the Consumer Protection Act 68 of 2008.
            </p>
            <nav aria-label="Contents">
              <ol className="mb-8 list-decimal pl-5 sm:columns-2">
                {SECTIONS.map((s) => <li key={s.id}><a className="link" href={`#${s.id}`}>{s.title}</a></li>)}
              </ol>
            </nav>
            {SECTIONS.map((s, i) => (
              <div key={s.id}>
                <h2 id={s.id} className="scroll-mt-28">{i + 1}. {s.title}</h2>
                <ul>{s.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
