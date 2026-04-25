import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl bg-gradient-to-b from-slate-900/75 via-slate-900/65 to-slate-900/40 p-4 ring-1 ring-white/10 shadow-lg shadow-black/30 sm:p-5 ${className}`}
    >
      {children}
    </section>
  );
}
