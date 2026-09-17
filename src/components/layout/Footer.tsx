import React from "react";
import Link from "next/link";
import { Heart, Code2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-white py-8 text-xs text-slate-500 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="max-w-md">
            <span className="font-extrabold text-slate-900">Djassa<span className="text-emerald-600">Pro</span></span>
            <span className="mt-1 block leading-relaxed">Plateforme d'insertion et d'entraide pour la jeunesse ivoirienne.</span>
          </div>

          <nav aria-label="Liens du pied de page" className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-end">
            <Link href="/prestataires" className="min-h-11 inline-flex items-center transition hover:text-emerald-600">Annuaire</Link>
            <Link href="/inscription/prestataire" className="min-h-11 inline-flex items-center transition hover:text-emerald-600">Devenir prestataire</Link>
            <Link href="/connexion" className="min-h-11 inline-flex items-center transition hover:text-emerald-600">Espace membre</Link>
          </nav>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-slate-100 pt-6 text-center text-[11px] text-slate-400 sm:mt-8 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Djassa Pro Côte d'Ivoire. Tous droits réservés.</p>
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <div className="flex flex-wrap items-center justify-center gap-1">
              <span>Fait avec</span><Heart className="h-3 w-3 fill-rose-500 text-rose-500" aria-hidden="true" /><span>pour les artisans et travailleurs d'Abidjan &amp; CI</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Code2 className="h-3 w-3" aria-hidden="true" /><span>Conçu par</span>
              <a href="https://portfolio-gules-six-86.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">Bakayoko Sory</a>
              <span>&amp;</span>
              <a href="https://miguel-the-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">Miguel Koffi</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
