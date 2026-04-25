import { ReactNode } from "react";

export default function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-2">
      <span className="text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}
