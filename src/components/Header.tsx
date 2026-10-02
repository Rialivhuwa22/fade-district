"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-ink text-paper">
      <div className="wrap flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Fade District Barber Co. home">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-black [font-stretch:125%] sm:text-xl">FADE DISTRICT</span>
            <span className="mt-1 hidden text-xs font-semibold text-taxi sm:block">Barber Co. Maboneng, Jozi</span>
          </span>
        </Link>

        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-md border-[3px] border-paper bg-taxi text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>

        <nav
          id="main-nav"
          aria-label="Main"
          className={`fixed inset-x-0 top-[76px] bottom-0 flex flex-col gap-1.5 overflow-auto border-t-[3px] border-taxi bg-ink p-6 transition-transform duration-200
            lg:static lg:translate-x-0 lg:flex-row lg:items-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:visible
            ${open ? "translate-x-0" : "invisible translate-x-full"}`}
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-2.5 py-3.5 text-2xl font-black [font-stretch:112%] hover:bg-ink-2 lg:px-3.5 lg:py-2.5 lg:text-base lg:font-bold lg:[font-stretch:100%]
                  ${active ? "text-taxi shadow-[inset_4px_0_0_var(--color-taxi)] lg:shadow-[inset_0_-3px_0_var(--color-taxi)]" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/book" className="btn mt-4 text-lg lg:mt-0 lg:ml-2.5 lg:text-base">Book now</Link>
        </nav>
      </div>
    </header>
  );
}
