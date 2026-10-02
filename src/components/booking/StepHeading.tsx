export default function StepHeading({ step, children }: { step: number; children: string }) {
  return (
    <h2 id={`step-heading-${step}`} tabIndex={-1} className="mb-5 text-[clamp(1.6rem,3vw,2.2rem)] uppercase outline-none">
      {children}
    </h2>
  );
}
