"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, User as UserIcon, LogOut, PlusCircle, LogIn, Menu, X } from "lucide-react";

interface UserSession {
  id: string;
  role: "client" | "prestataire" | "admin";
  prenom?: string;
  nom?: string;
}

export const Navbar = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser({
            id: data.user.id,
            role: data.user.role,
            prenom: data.user.profile?.prenom,
            nom: data.user.profile?.nom,
          });
        }
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/";
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 min-w-0 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo Djassa Pro */}
        <Link href="/" onClick={closeMenu} className="flex min-w-0 shrink items-center gap-2 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 font-black text-white shadow-sm transition group-hover:bg-emerald-700">
            D
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-lg font-black tracking-tight text-slate-900">
                Djassa<span className="text-emerald-600">Pro</span>
              </span>
              <span className="shrink-0 rounded bg-emerald-100 px-1 py-0.5 text-[9px] font-bold text-emerald-800">
                CI
              </span>
            </div>
            <p className="-mt-1 hidden text-[10px] font-medium text-slate-400 xs:block">
              Entraide &amp; Pros locaux
            </p>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/prestataires" className="transition hover:text-emerald-600">
            Trouver un prestataire
          </Link>
          <Link href="/#comment-ca-marche" className="transition hover:text-emerald-600">
            Comment ça marche
          </Link>
        </nav>

        {/* Actions desktop */}
        <div className="hidden shrink-0 items-center gap-2.5 md:flex">
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" && (
                <Link href="/admin" className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Administration</span>
                </Link>
              )}
              {user.role === "prestataire" && (
                <Link href="/dashboard/prestataire" className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Mon Espace ({user.prenom || "Pro"})</span>
                </Link>
              )}
              {user.role === "client" && <span className="px-2 text-xs font-bold text-slate-700">Bonjour, {user.prenom || "Client"}</span>}
              <button onClick={handleLogout} className="flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-50" title="Déconnexion" aria-label="Déconnexion">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/connexion" className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <LogIn className="h-3.5 w-3.5 text-slate-500" />
                <span>Connexion</span>
              </Link>
              <Link href="/inscription/prestataire" className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Devenir prestataire</span>
              </Link>
            </div>
          )}
        </div>

        {/* Bouton burger mobile : remplace les actions qui débordaient */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 md:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-slate-100 bg-white px-4 py-3 shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="Menu mobile">
            <Link href="/prestataires" onClick={closeMenu} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700">
              Trouver un prestataire
            </Link>
            <Link href="/#comment-ca-marche" onClick={closeMenu} className="flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700">
              Comment ça marche
            </Link>
            <div className="my-2 border-t border-slate-100" />
            {user ? (
              <>
                {user.role === "admin" && <Link href="/admin" onClick={closeMenu} className="flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-3 text-sm font-bold text-white"><ShieldCheck className="h-4 w-4 text-emerald-400" />Administration</Link>}
                {user.role === "prestataire" && <Link href="/dashboard/prestataire" onClick={closeMenu} className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-50 px-3 text-sm font-bold text-emerald-700"><UserIcon className="h-4 w-4" />Mon espace ({user.prenom || "Pro"})</Link>}
                {user.role === "client" && <span className="flex min-h-11 items-center px-3 text-sm font-bold text-slate-700">Bonjour, {user.prenom || "Client"}</span>}
                <button onClick={handleLogout} className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"><LogOut className="h-4 w-4" />Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/connexion" onClick={closeMenu} className="flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><LogIn className="h-4 w-4" />Connexion</Link>
                <Link href="/inscription/prestataire" onClick={closeMenu} className="flex min-h-11 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"><PlusCircle className="h-4 w-4" />Devenir prestataire</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
