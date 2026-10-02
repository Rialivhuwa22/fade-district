"use client";

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { SHOP } from "@/lib/data";
import { isValidEmail, isValidName } from "@/lib/validation";

type Field = "name" | "email" | "message";
const ERRORS: Record<Field, string> = {
  name: "Enter your name.",
  email: "Enter a valid email address, like name@example.com.",
  message: "Write a message of at least 10 characters.",
};

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [sent, setSent] = useState(false);

  const check = (v = values) => ({
    name: !isValidName(v.name),
    email: !isValidEmail(v.email),
    message: v.message.trim().length < 10,
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = check();
    setErrors(errs);
    const firstBad = (Object.keys(errs) as Field[]).find((k) => errs[k]);
    if (firstBad) {
      document.getElementById(`c-${firstBad}`)?.focus();
      return;
    }
    const body = `${values.message.trim()}\n\nFrom: ${values.name.trim()} (${values.email.trim()})`;
    window.location.href = `mailto:${SHOP.email}?subject=${encodeURIComponent(`Website message from ${values.name.trim()}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (key: Field, label: string, input: ReactNode) => (
    <div className="mb-4">
      <label htmlFor={`c-${key}`} className="mb-1.5 block font-extrabold">{label}</label>
      {input}
      {errors[key] && <p id={`c-${key}-err`} className="mt-1.5 text-sm font-bold text-signal">{ERRORS[key]}</p>}
    </div>
  );

  const common = (key: Field) => ({
    id: `c-${key}`,
    value: values[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `c-${key}-err` : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [key]: e.target.value };
      setValues(next);
      if (errors[key] !== undefined) setErrors((p) => ({ ...p, [key]: check(next)[key] }));
    },
    className: "field-input",
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      {field("name", "Your name", <input type="text" autoComplete="name" {...common("name")} />)}
      {field("email", "Email", <input type="email" autoComplete="email" {...common("email")} />)}
      {field("message", "Message", <textarea rows={4} {...common("message")} />)}
      <button type="submit" className="btn">Send message</button>
      {sent && (
        <p role="status" className="mt-3.5 rounded-md border-[3px] border-ink bg-taxi px-4 py-3 font-semibold">
          Your email app should open with your message ready to send. If it didn&apos;t, email us at {SHOP.email}.
        </p>
      )}
    </form>
  );
}
