import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, "aria-hidden": true } as const;

export const PinIcon = (p: P) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>);
export const PhoneIcon = (p: P) => (<svg {...base} {...p}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" /></svg>);
export const ChatIcon = (p: P) => (<svg {...base} {...p}><path d="M3 21l1.6-4.6A8.5 8.5 0 1 1 8 19.6z" /></svg>);
export const MailIcon = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const CalendarIcon = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const DownloadIcon = (p: P) => (<svg {...base} {...p}><path d="M12 3v12m0 0l-5-5m5 5l5-5M4 21h16" /></svg>);
export const InstagramIcon = (p: P) => (<svg {...base} strokeWidth={2} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>);
export const TikTokIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M16 3c.4 2.3 1.9 3.8 4 4v3a7 7 0 0 1-4-1.3V15a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 2.8 2.8V3z" /></svg>);
export const FacebookIcon = (p: P) => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v7h4v-7h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" /></svg>);
