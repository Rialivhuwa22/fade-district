import Link from "next/link";
import SafeImage from "./SafeImage";
import { DAYS } from "@/lib/time";
import type { Barber } from "@/lib/types";

export default function BarberCard({ barber, variant = "compact", highlight = false }: { barber: Barber; variant?: "compact" | "full"; highlight?: boolean }) {
  const offDays = barber.off.map((d) => `${DAYS[d]}s`).join(", ");
  return (
    <article className={`flex flex-col overflow-hidden rounded-md border-[3px] border-ink text-ink shadow-hard ${highlight ? "bg-taxi" : "bg-paper"}`}>
      <div className="relative aspect-square border-b-[3px] border-ink bg-ink-2">
        <SafeImage src={barber.img} alt={`Portrait of ${barber.name}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-[center_25%]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-xl">{barber.name}</h3>
        <p className="mb-3 font-extrabold text-cobalt">{barber.role}</p>
        {variant === "full" && (
          <>
            <p className="mb-3 text-ink-2">{barber.bio}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {barber.specs.map((s) => (
                <span key={s} className="rounded-full border-2 border-ink bg-concrete px-2.5 py-1 text-sm font-bold">{s}</span>
              ))}
            </div>
            <p className="mt-auto text-sm text-muted">{barber.years} years cutting. Off on {offDays}.</p>
          </>
        )}
        {variant === "full" ? (
          <Link href={`/book?barber=${barber.id}`} className="btn btn-sm mt-3 self-start">Book with {barber.first}</Link>
        ) : (
          <Link href={`/book?barber=${barber.id}`} className="link mt-auto self-start">Book with {barber.first}</Link>
        )}
      </div>
    </article>
  );
}
