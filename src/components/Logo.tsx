import { useId } from "react";

export default function Logo({ size = 48 }: { size?: number }) {
  const clip = useId();
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className="shrink-0">
      <rect x="3" y="3" width="58" height="58" rx="10" fill="#FFC72C" stroke="#F6F4EF" strokeWidth="3" />
      <clipPath id={clip}>
        <rect x="3" y="3" width="58" height="58" rx="10" />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <path d="M-4 52 L68 20 L68 30 L-4 62Z" fill="#E3342A" />
        <path d="M-4 62 L68 30 L68 40 L-4 72Z" fill="#2340D8" />
      </g>
      <text x="32" y="38" textAnchor="middle" fontFamily="var(--font-archivo), Impact, sans-serif" fontWeight="900" fontSize="27" fill="#17141C" style={{ fontStretch: "125%" }}>
        FD
      </text>
    </svg>
  );
}
