"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, User } from "lucide-react";

export const MobileNav = () => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/prestataires", label: "Recherche", icon: Search },
    { href: "/inscription/prestataire", label: "S'inscrire", icon: PlusCircle },
    { href: "/connexion", label: "Compte", icon: User },
  ];

  return (
    <nav
      aria-label="Navigation mobile"
      className="safe-area-x safe-area-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-2 pt-2 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-11 min-w-16 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isActive ? "font-bold text-emerald-600" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-emerald-600" : "text-slate-500"}`} aria-hidden="true" />
              <span className="max-w-full truncate">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
