import Link from "next/link";

export default function CtaBand({ title, cta = "Book now" }: { title: string; cta?: string }) {
  return (
    <section className="border-y-[3px] border-ink bg-cobalt text-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-8 py-14">
        <h2 className="h2 m-0 max-w-[18ch]">{title}</h2>
        <Link href="/book" className="btn">{cta}</Link>
      </div>
    </section>
  );
}
