import type { Step } from "@/hooks/useBooking";

const LABELS = ["Service", "Barber", "Date & time", "Your details"];

export default function StepIndicator({ step, onJump }: { step: Step; onJump: (s: Step) => void }) {
  return (
    <ol aria-label="Booking progress" className="mb-7 flex overflow-hidden rounded-md border-[3px] border-ink bg-paper">
      {LABELS.map((label, i) => {
        const n = (i + 1) as Step;
        const done = n < step;
        const current = n === step;
        const canJump = done && step !== 5;
        return (
          <li key={label} aria-current={current ? "step" : undefined}
            className={`flex-1 border-r-[3px] border-ink text-center text-sm font-extrabold last:border-r-0 ${current ? "bg-taxi text-ink" : done ? "bg-concrete text-ink" : "text-muted"}`}>
            <button type="button" disabled={!canJump} onClick={() => onJump(n)} className="flex w-full items-center justify-center gap-1.5 px-2 py-3 disabled:cursor-default">
              <span className="grid h-6.5 w-6.5 place-items-center rounded-full border-2 border-current text-xs">{n}</span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sr-only sm:hidden">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
