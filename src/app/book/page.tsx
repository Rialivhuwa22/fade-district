import type { Metadata } from "next";
import BookingWizard from "@/components/booking/BookingWizard";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Book an Appointment" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function BookPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  return (
    <>
      <PageHero title="Book your chair" lead="Four quick steps. Pay at the shop, no deposit needed." />
      <section className="py-12 md:py-16">
        <div className="wrap">
          <BookingWizard initialService={first(sp.service)} initialBarber={first(sp.barber)} initialPromo={first(sp.promo)} />
        </div>
      </section>
    </>
  );
}
