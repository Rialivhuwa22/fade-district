import type { ReactNode } from "react";

interface Props {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}

/** Radio button styled as a selectable card. */
export default function Option({ name, value, checked, onChange, children }: Props) {
  const id = `${name}-${value}`;
  return (
    <div className="relative">
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={() => onChange(value)} className="peer sr-only" />
      <label htmlFor={id}
        className="flex h-full cursor-pointer items-center justify-between gap-3 rounded-md border-[3px] border-ink bg-white px-4 py-3.5 transition-colors hover:bg-[#fff6d8]
          peer-checked:bg-taxi peer-checked:shadow-hard-sm peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-cobalt">
        {children}
      </label>
    </div>
  );
}
