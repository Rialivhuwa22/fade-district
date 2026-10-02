import Option from "./Option";
import StepHeading from "./StepHeading";
import SafeImage from "../SafeImage";
import { BARBERS } from "@/lib/data";
import { DAYS } from "@/lib/time";

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function BarberStep({ selected, onSelect, onBack, onNext }: Props) {
  return (
    <div>
      <StepHeading step={2}>Choose your barber</StepHeading>
      <div role="radiogroup" aria-label="Barber" className="grid gap-3 sm:grid-cols-2">
        <Option name="barber" value="any" checked={selected === "any"} onChange={onSelect}>
          <span className="flex items-center gap-3.5">
            <span aria-hidden="true" className="grid h-13 w-13 shrink-0 place-items-center rounded-full border-[3px] border-ink bg-cobalt text-sm font-black text-white">ANY</span>
            <span>
              <span className="block font-extrabold">Any available barber</span>
              <span className="text-sm text-muted">Most available times</span>
            </span>
          </span>
        </Option>
        {BARBERS.map((b) => (
          <Option key={b.id} name="barber" value={b.id} checked={selected === b.id} onChange={onSelect}>
            <span className="flex items-center gap-3.5">
              <span className="relative h-13 w-13 shrink-0 overflow-hidden rounded-full border-[3px] border-ink bg-ink-2">
                <SafeImage src={b.img} alt="" fill sizes="52px" className="object-cover" />
              </span>
              <span>
                <span className="block font-extrabold">{b.name}</span>
                <span className="text-sm text-muted">{b.role}. Off {b.off.map((d) => `${DAYS[d]}s`).join(", ")}.</span>
              </span>
            </span>
          </Option>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap justify-between gap-3">
        <button type="button" className="btn btn-ghost" onClick={onBack}>Back</button>
        <button type="button" className="btn" disabled={!selected} onClick={onNext}>Continue to date &amp; time</button>
      </div>
    </div>
  );
}
