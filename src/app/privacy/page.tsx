import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SHOP } from "@/lib/data";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy" lead="What we collect, why we collect it and how you control it." />
      <section className="py-16 md:py-28">
        <div className="wrap">
          <article className="legal max-w-[860px] rounded-md border-[3px] border-ink bg-paper p-6 md:p-14">
            <p className="font-semibold text-muted">Last updated: 24 September 2026</p>
            <p>Fade District Barber Co. (Pty) Ltd is the responsible party for personal information collected through this website and in our shop, under the Protection of Personal Information Act 4 of 2013 (POPIA).</p>
            <h2>What we collect</h2>
            <ul>
              <li>Booking details: your name, mobile number, email address, chosen service, barber, date and time, and any notes you add.</li>
              <li>Messages you send us by email or WhatsApp.</li>
            </ul>
            <h2>Why we use it</h2>
            <ul>
              <li>To confirm, manage and remind you about your appointments.</li>
              <li>To contact you if we need to change a booking.</li>
              <li>We don&apos;t sell your information, and we only send marketing messages if you&apos;ve opted in.</li>
            </ul>
            <h2>How long we keep it</h2>
            <ul><li>We keep booking records for up to 2 years after your last visit, then delete them.</li></ul>
            <h2>Your rights</h2>
            <ul>
              <li>You can ask to see, correct or delete your personal information at any time by emailing <a className="link" href={`mailto:${SHOP.email}`}>{SHOP.email}</a>.</li>
              <li>You may lodge a complaint with the Information Regulator of South Africa at <a className="link" href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>.</li>
            </ul>
            <h2>Cookies and storage</h2>
            <ul><li>This website stores small preferences in your browser, such as whether you&apos;ve seen our welcome offer and your recent bookings on this device. It doesn&apos;t use advertising cookies.</li></ul>
          </article>
        </div>
      </section>
    </>
  );
}
