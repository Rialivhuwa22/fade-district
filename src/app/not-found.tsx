import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-ink py-24 text-paper">
      <div className="wrap">
        <h1 className="display mb-4">This page got a buzz cut</h1>
        <p className="text-xl text-fog">There&apos;s nothing at this address. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="btn btn-on-dark">Go to home</Link>
          <Link href="/book" className="btn btn-ghost-dark">Book now</Link>
        </div>
      </div>
    </div>
  );
}
