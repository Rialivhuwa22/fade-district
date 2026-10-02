import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import StepHeading from "./StepHeading";
import { isValidEmail, isValidName, isValidSaPhone } from "@/lib/validation";
import type { CustomerDetails } from "@/lib/types";

type Key = "name" | "phone" | "email" | "terms";
const ERRORS: Record<Key, string> = {
  name: "Enter your full name (at least 2 characters).",
  phone: "Enter a 10-digit South African number, like 082 123 4567 or +27 82 123 4567.",
  email: "Enter a valid email address, like name@example.com.",
  terms: "Accept the Terms & Conditions to confirm your booking.",
};

const validate = (d: CustomerDetails): Record<Key, boolean> => ({
  name: !isValidName(d.name),
  phone: !isValidSaPhone(d.phone),
  email: !isValidEmail(d.email),
  terms: !d.terms,
});

interface Props {
  details: CustomerDetails;
  onChange: (d: CustomerDetails) => void;
  onBack: () => void;
  onConfirm: () => void;
}

export default function DetailsStep({ details, onChange, onBack, onConfirm }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const errors = submitted ? validate(details) : null;

  const set = (key: keyof CustomerDetails) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...details, [key]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(details);
    const firstBad = (Object.keys(errs) as Key[]).find((k) => errs[k]);
    if (firstBad) {
      document.getElementById(`b-${firstBad}`)?.focus();
      return;
    }
    onConfirm();
  };

  const err = (k: Key) =>
    errors?.[k] ? <p id={`b-${k}-err`} className="mt-1.5 text-sm font-bold text-signal">{ERRORS[k]}</p> : null;
  const aria = (k: Key) => ({ "aria-invalid": errors?.[k] ? true : undefined, "aria-describedby": errors?.[k] ? `b-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate>
      <StepHeading step={4}>Your details</StepHeading>
      <div className="mb-4">
        <label htmlFor="b-name" className="mb-1.5 block font-extrabold">Full name</label>
        <input id="b-name" type="text" autoComplete="name" className="field-input" value={details.name} onChange={set("name")} {...aria("name")} />
        {err("name")}
      </div>
      <div className="mb-4">
        <label htmlFor="b-phone" className="mb-1.5 block font-extrabold">Mobile number</label>
        <input id="b-phone" type="tel" autoComplete="tel" placeholder="082 123 4567" className="field-input" value={details.phone} onChange={set("phone")} {...aria("phone")} />
        <p className="mt-1 text-sm text-muted">We&apos;ll only use this if we need to move your booking.</p>
        {err("phone")}
      </div>
      <div className="mb-4">
        <label htmlFor="b-email" className="mb-1.5 block font-extrabold">Email</label>
        <input id="b-email" type="email" autoComplete="email" placeholder="you@example.com" className="field-input" value={details.email} onChange={set("email")} {...aria("email")} />
        {err("email")}
      </div>
      <div className="mb-4">
        <label htmlFor="b-notes" className="mb-1.5 block font-extrabold">
          Anything we should know? <span className="font-medium text-muted">(optional)</span>
        </label>
        <textarea id="b-notes" rows={3} maxLength={300} className="field-input" placeholder="E.g. first time with a skin fade, sensitive skin, bringing a reference photo" value={details.notes} onChange={set("notes")} />
      </div>
      <div className="mb-4">
        <label className="flex items-start gap-3">
          <input id="b-terms" type="checkbox" className="mt-1 h-5.5 w-5.5 shrink-0 accent-cobalt" checked={details.terms} onChange={set("terms")} {...aria("terms")} />
          <span>
            I agree to the <Link href="/terms" target="_blank" className="link">Terms &amp; Conditions</Link>, including the 4-hour cancellation policy.
          </span>
        </label>
        {err("terms")}
      </div>
      <div className="mt-7 flex flex-wrap justify-between gap-3">
        <button type="button" className="btn btn-ghost" onClick={onBack}>Back</button>
        <button type="submit" className="btn btn-red">Confirm booking</button>
      </div>
    </form>
  );
}
