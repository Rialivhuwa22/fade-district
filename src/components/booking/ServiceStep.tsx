import Option from "./Option";
import StepHeading from "./StepHeading";
import { CATEGORIES, SERVICES } from "@/lib/data";
import { formatRand } from "@/lib/time";

export default function ServiceStep({ selected, onSelect, onNext }: { selected: string | null; onSelect: (id: string) => void; onNext: () => void }) {
  return (
    <div>
      <StepHeading step={1}>Choose a service</StepHeading>
      {CATEGORIES.map((cat) => (
        <div key={cat.id} role="radiogroup" aria-label={cat.name} className="mb-6">
          <h3 className="mb-3 text-base text-muted">{cat.name}</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.filter((s) => s.cat === cat.id).map((s) => (
              <Option key={s.id} name="service" value={s.id} checked={selected === s.id} onChange={onSelect}>
                <span>
                  <span className="block leading-tight font-extrabold">{s.name}</span>
                  <span className="text-sm text-muted">{s.dur} min</span>
                </span>
                <span className="font-black whitespace-nowrap">{formatRand(s.price)}</span>
              </Option>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-7 flex justify-end">
        <button type="button" className="btn" disabled={!selected} onClick={onNext}>Continue to barber</button>
      </div>
    </div>
  );
}
