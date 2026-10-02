import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import HoursCard from "@/components/HoursCard";
import PageHero from "@/components/PageHero";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { SHOP } from "@/lib/data";

export const metadata: Metadata = { title: "Contact & Location" };

function Info({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-b-2 border-dashed border-ink/25 py-4.5 last:border-b-0">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border-[3px] border-ink bg-taxi">{icon}</span>
      <div><strong className="block">{label}</strong>{children}</div>
    </li>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero tag="Open 7 days" tagColor="blue" title="Find the shop" lead="Ground floor, 27 Fox Street, Maboneng. Secure parking on Kruger Street, two minutes' walk." />
      <section className="py-16 md:py-28">
        <div className="wrap grid items-start gap-14 lg:grid-cols-2">
          <div>
            <ul>
              <Info icon={<PinIcon width={22} height={22} />} label="Address">{SHOP.address.replace(", South Africa", "")}</Info>
              <Info icon={<PhoneIcon width={22} height={22} />} label="Phone"><a className="link" href={SHOP.phoneHref}>{SHOP.phone}</a></Info>
              <Info icon={<ChatIcon width={22} height={22} />} label="WhatsApp"><a className="link" href={SHOP.whatsappHref} target="_blank" rel="noopener noreferrer">{SHOP.whatsapp}</a></Info>
              <Info icon={<MailIcon width={22} height={22} />} label="Email"><a className="link" href={`mailto:${SHOP.email}`}>{SHOP.email}</a></Info>
            </ul>
            <HoursCard />
          </div>
          <div>
            <div className="aspect-[16/10] overflow-hidden border-[3px] border-ink bg-concrete-2 shadow-hard">
              <iframe
                title="Map showing Fade District on Fox Street, Maboneng"
                src="https://maps.google.com/maps?q=Fox%20Street%2C%20Maboneng%2C%20Johannesburg&z=16&output=embed"
                className="block h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-3">
              <a className="link" href="https://www.google.com/maps/dir/?api=1&destination=Fox+Street+Maboneng+Johannesburg" target="_blank" rel="noopener noreferrer">Get directions in Google Maps</a>
            </p>
            <div className="mt-7 rounded-md border-[3px] border-ink bg-paper p-6 shadow-hard sm:p-8">
              <h2 className="mb-3 text-3xl uppercase">Send us a message</h2>
              <p>For bookings, use <Link className="link" href="/book">online booking</Link>. For anything else, write to us here and it opens in your email app.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
