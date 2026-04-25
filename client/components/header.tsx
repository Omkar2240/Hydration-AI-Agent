import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="h-13 w-11 overflow-hidden">
          <Image
            src="/logo-image-hydramon.png"
            alt="Hydramon icon"
            width={80}
            height={80}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="min-w-0">
          <p className="brand-font truncate text-lg font-semibold text-cyan-200 sm:text-xl">
            Hydramon AI
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5 shadow-inner shadow-black/40 ring-1 ring-white/10 transition hover:bg-white/10"
        aria-label="Settings"
      >
        <span className="text-lg text-slate-100">⚙️</span>
      </button>
    </header>
  );
}
