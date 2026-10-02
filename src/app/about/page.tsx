import type { Metadata } from "next";
import BarberCard from "@/components/BarberCard";
import PageHero from "@/components/PageHero";
import SafeImage from "@/components/SafeImage";
import { BARBERS, IMAGES } from "@/lib/data";

export const metadata: Metadata = { title: "About Us & Our Barbers" };

const STATS = [
  ["2019", "Opened on Fox Street"],
  ["38,000+", "Cuts since day one"],
  ["4", "Barbers, 5+ years each"],
  ["4.9", "Average review score"],
];

const VALUES = [
  { title: "Craft first", text: "We'd rather run five minutes over than send you out with a line that isn't straight.", style: "bg-paper" },
  { title: "Everyone's welcome", text: "All hair types, all ages. Tell us what you want, or let us suggest something new.", style: "bg-taxi" },
  { title: "Clean every time", text: "Tools disinfected between every client, fresh towels and single-use blades.", style: "bg-paper" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero tag="Est. 2019" tagColor="red" title="Built on Fox Street" lead="Fade District started as one chair in a shared studio in Maboneng. Today it's four barbers, a sound system that never sleeps, and a lot of regulars." />
      <section className="py-16 md:py-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="h2">Our story</h2>
            <p>Thabo Mokoena cut hair in his mother&apos;s backyard in Soweto for eight years before he signed the lease on 27 Fox Street. He wanted a shop that felt like the city around it: loud, creative, and serious about the work.</p>
            <p>We still run it the same way. Every barber here has at least five years behind the clippers, trains every Monday morning, and gets to know regulars by name. We play good music, keep the coffee on, and don&apos;t rush a fade.</p>
            <p>In 2023 we started <strong>Free Cut Fridays</strong>: on the last Friday of each month, we cut hair for free for learners from local schools heading to interviews or exams.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-ink bg-ink-2 shadow-hard">
            <SafeImage src={IMAGES.interior} alt="Barbershop interior with vintage chairs" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="pb-16 md:pb-28">
        <div className="wrap">
          <dl className="grid border-[3px] border-ink bg-paper sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([n, label], i) => (
              <div key={label} className={`border-ink p-7 ${i < 3 ? "border-b-[3px] sm:border-b-0" : ""} ${i % 2 === 0 ? "sm:border-r-[3px]" : ""} ${i < 2 ? "sm:border-b-[3px] lg:border-b-0" : ""} ${i === 1 ? "lg:border-r-[3px]" : ""}`}>
                <dt className="text-[2.4rem] leading-none font-black [font-stretch:118%]">{n}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="bg-ink py-16 text-paper md:py-28">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2 m-0">Meet the barbers</h2>
            <p className="m-0 text-fog">Pick your favourite when you book, or choose any available barber.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BARBERS.map((b) => <BarberCard key={b.id} barber={b} variant="full" />)}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-28">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className={`rounded-md border-[3px] border-ink p-6 shadow-hard ${v.style}`}>
              <h3 className="mb-2 text-xl">{v.title}</h3>
              <p className="m-0">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
