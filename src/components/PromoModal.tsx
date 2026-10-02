"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROMO } from "@/lib/data";
import { isPromoSeen, isPromoUsed, markPromoSeen } from "@/lib/storage";

export const APPLY_PROMO_EVENT = "fd:apply-promo";

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isPromoSeen() || isPromoUsed()) return;
    const t = setTimeout(() => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    markPromoSeen();
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    boxRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !boxRef.current) return;
      const items = boxRef.current.querySelectorAll<HTMLElement>("button, a[href]");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const claim = () => {
    close();
    if (pathname === "/book") window.dispatchEvent(new Event(APPLY_PROMO_EVENT));
    else router.push(`/book?promo=${PROMO.code}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-labelledby="promo-title" aria-describedby="promo-desc">
      <div className="absolute inset-0 bg-ink/75" onClick={close} aria-hidden="true" />
      <div ref={boxRef} className="modal-pop relative max-h-[calc(100vh-40px)] w-full max-w-[520px] overflow-auto border-4 border-ink bg-taxi px-6 pt-10 pb-8 shadow-[12px_12px_0_var(--color-signal)] sm:px-9">
        <button type="button" data-autofocus onClick={close} aria-label="Close offer"
          className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink bg-paper text-2xl font-black leading-none">
          &times;
        </button>
        <span className="tag mb-3.5 !bg-signal !text-white">First visit?</span>
        <h2 id="promo-title" className="mb-3 text-[clamp(2rem,6vw,3rem)] uppercase">15% off your first cut</h2>
        <p id="promo-desc" className="mb-2">New to Fade District? Book online with this code and we&apos;ll take 15% off any service.</p>
        <div className="my-2 mb-5 inline-block border-[3px] border-dashed border-taxi bg-ink px-4 py-2 text-2xl font-black tracking-wider text-taxi outline-[3px] outline-ink [font-stretch:125%] [outline-style:solid]">
          {PROMO.code}
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-red" onClick={claim}>Claim offer &amp; book</button>
          <button type="button" className="btn btn-ghost" onClick={close}>No thanks</button>
        </div>
        <p className="mt-4 text-sm">
          One use per new client. Not valid on the Groom&apos;s Prep package.{" "}
          <Link href="/terms#promotions" onClick={close} className="font-bold underline">Offer terms</Link>.
        </p>
      </div>
    </div>
  );
}
