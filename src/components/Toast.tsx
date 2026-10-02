"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

const ToastContext = createContext<(message: string) => void>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 3500);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[120] max-w-[calc(100%-32px)] -translate-x-1/2 border-[3px] border-taxi bg-ink px-5 py-3.5 font-bold text-paper transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-[160%]"}`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}
