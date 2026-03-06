'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Sammenlign' },
  { href: '/billig-stroem', label: 'Billig strøm' },
  { href: '/skift-el', label: 'Skift elleverandør' },
  { href: '/spotpris', label: 'Spotpris' },
  { href: '/groen-stroem', label: 'Grøn strøm' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-emerald-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="text-amber-400" size={24} />
          <span className="text-white">El<span className="text-emerald-400">Radar</span></span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-emerald-100 hover:text-amber-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/skift-el"
            className="bg-amber-400 text-emerald-900 px-4 py-2 rounded-full font-bold hover:bg-amber-300 transition-colors"
          >
            Skift nu →
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-emerald-800 px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-emerald-100 hover:text-amber-400 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/skift-el"
            className="mt-3 block bg-amber-400 text-emerald-900 px-4 py-2 rounded-full font-bold text-center"
            onClick={() => setOpen(false)}
          >
            Skift nu →
          </Link>
        </div>
      )}
    </header>
  );
}
