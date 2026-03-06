import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Zap className="text-amber-400" size={20} />
              <span>El<span className="text-emerald-400">Radar</span></span>
            </div>
            <p className="text-sm text-emerald-400">
              Upartisk sammenligning af elleverandører i Danmark. Vi hjælper dig med at finde den billigste strøm.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Sammenlign</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Alle elleverandører</Link></li>
              <li><Link href="/billig-stroem" className="hover:text-amber-400 transition-colors">Billig strøm</Link></li>
              <li><Link href="/groen-stroem" className="hover:text-amber-400 transition-colors">Grøn strøm</Link></li>
              <li><Link href="/spotpris" className="hover:text-amber-400 transition-colors">Spotpris</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Guider</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/skift-el" className="hover:text-amber-400 transition-colors">Sådan skifter du elleverandør</Link></li>
              <li><Link href="/guide/fast-vs-variabel" className="hover:text-amber-400 transition-colors">Fast vs. variabel elpris</Link></li>
              <li><Link href="/guide/el-priserne-forklaret" className="hover:text-amber-400 transition-colors">Hvad indgår i elprisen?</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3">Om ElRadar</h3>
            <p className="text-sm text-emerald-400">
              ElRadar er finansieret af affiliatekommissioner fra elleverandørerne. Det koster dig ingenting ekstra — vi sammenligner upartisk, og du sparer penge.
            </p>
          </div>
        </div>

        <div className="border-t border-emerald-800 mt-8 pt-6 text-center text-xs text-emerald-500">
          <p>© {new Date().getFullYear()} ElRadar.dk — Upartisk sammenligning af strømpriser i Danmark.</p>
          <p className="mt-1">Priser er vejledende og kan variere. Opdateret løbende.</p>
        </div>
      </div>
    </footer>
  );
}
