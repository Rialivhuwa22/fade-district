import Link from "next/link";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon, ChatIcon } from "./icons";
import { SHOP } from "@/lib/data";

const SOCIALS = [
  { href: "https://www.instagram.com/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.tiktok.com/", label: "TikTok", Icon: TikTokIcon },
  { href: "https://www.facebook.com/", label: "Facebook", Icon: FacebookIcon },
  { href: SHOP.whatsappHref, label: "WhatsApp", Icon: ChatIcon },
];

export default function Footer() {
  return (
    <footer className="bg-ink pt-18 text-[0.97rem] text-fog">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Fade District home">
              <Logo />
              <span className="flex flex-col leading-none">
                <span className="text-xl font-black text-paper [font-stretch:125%]">FADE DISTRICT</span>
                <span className="mt-1 text-xs font-semibold text-taxi">Barber Co.</span>
              </span>
            </Link>
            <p className="mt-5 mb-4">Skin fades, beard work and hot towel shaves in the heart of Maboneng since 2019.</p>
            <Link href="/book" className="btn btn-on-dark">Book now</Link>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-fog hover:border-taxi hover:bg-taxi hover:text-ink">
                  <Icon width={20} height={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg text-taxi">Explore</h4>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-taxi hover:underline" href="/">Home</Link></li>
              <li><Link className="hover:text-taxi hover:underline" href="/services">Services &amp; prices</Link></li>
              <li><Link className="hover:text-taxi hover:underline" href="/about">About &amp; barbers</Link></li>
              <li><Link className="hover:text-taxi hover:underline" href="/contact">Contact &amp; location</Link></li>
              <li><Link className="hover:text-taxi hover:underline" href="/book">Book an appointment</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg text-taxi">Visit</h4>
            <ul className="space-y-2.5">
              <li>{SHOP.street}<br />{SHOP.area}<br />{SHOP.city}, {SHOP.postcode}</li>
              <li><a className="hover:text-taxi hover:underline" href={SHOP.phoneHref}>{SHOP.phone}</a></li>
              <li><a className="hover:text-taxi hover:underline" href={`mailto:${SHOP.email}`}>{SHOP.email}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg text-taxi">Opening hours</h4>
            <ul className="space-y-2.5">
              <li className="flex justify-between gap-3"><span>Monday to Friday</span><span>09:00 to 19:00</span></li>
              <li className="flex justify-between gap-3"><span>Saturday</span><span>08:00 to 17:00</span></li>
              <li className="flex justify-between gap-3"><span>Sunday</span><span>10:00 to 14:00</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t-2 border-ink-2 py-6 text-sm">
          <span>&copy; {new Date().getFullYear()} Fade District Barber Co. (Pty) Ltd. All rights reserved.</span>
          <nav aria-label="Legal" className="flex flex-wrap gap-5">
            <Link className="hover:text-taxi hover:underline" href="/terms">Terms &amp; Conditions</Link>
            <Link className="hover:text-taxi hover:underline" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-taxi hover:underline" href="/terms#cancellations">Cancellation policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
