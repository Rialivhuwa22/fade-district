import { PROMO } from "./data";
import type { Service } from "./types";

export interface Price {
  base: number;
  disc: number;
  total: number;
}

export function priceFor(service: Service | null, promoApplied: boolean): Price {
  if (!service) return { base: 0, disc: 0, total: 0 };
  const eligible = promoApplied && !PROMO.excluded.includes(service.id);
  const disc = eligible ? Math.round((service.price * PROMO.percent) / 100) : 0;
  return { base: service.price, disc, total: service.price - disc };
}

export type PromoCheck = { ok: true } | { ok: false; message: string };

export function checkPromoCode(raw: string, alreadyUsed: boolean): PromoCheck {
  const code = raw.trim().toUpperCase();
  if (!code) return { ok: false, message: "Enter a promo code." };
  if (code !== PROMO.code) return { ok: false, message: `"${code}" isn't a valid code. Check the spelling and try again.` };
  if (alreadyUsed) return { ok: false, message: `${PROMO.code} has already been used on this device. It's for first visits only.` };
  return { ok: true };
}
