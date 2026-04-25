"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faDroplet,
  faPaw,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Hydrate", icon: faDroplet, href: "/" },
    { label: "Analytics", icon: faChartColumn, href: "/analytics" },
    { label: "Pro", icon: faPaw, href: "#" },
    { label: "Profile", icon: faUser, href: "#" },
  ];

  return (
    <nav className="sticky bottom-3 z-20 sm:bottom-4">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-1 rounded-2xl bg-slate-900/85 p-2 shadow-xl shadow-black/40 ring-1 ring-white/10 backdrop-blur">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold transition sm:flex-col sm:gap-1 ${isActive
                ? "bg-cyan-500/10 text-cyan-200 ring-1 ring-cyan-300/50"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-base" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
