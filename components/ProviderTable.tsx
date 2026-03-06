'use client';
import { useState } from 'react';
import { ArrowUpDown, ExternalLink, Leaf, AlertTriangle } from 'lucide-react';
import { providers, calcAnnualCost, type Provider } from '@/data/providers';
import StarRating from './StarRating';
import clsx from 'clsx';

type SortKey = 'price' | 'rating' | 'green' | 'binding';

const DEFAULT_KWH = 3500;

export default function ProviderTable({ kwhPerYear = DEFAULT_KWH, greenOnly = false }: { kwhPerYear?: number; greenOnly?: boolean }) {
  const [sortKey, setSortKey] = useState<SortKey>('price');
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === 'binding' ? true : true);
    }
  }

  const sorted = [...providers]
    .filter((p) => !greenOnly || p.green === true)
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'price') {
        cmp = calcAnnualCost(a, kwhPerYear) - calcAnnualCost(b, kwhPerYear);
      } else if (sortKey === 'rating') {
        cmp = a.rating - b.rating;
      } else if (sortKey === 'green') {
        const gScore = (p: Provider) => (p.green === true ? 0 : p.green === 'optional' ? 1 : 2);
        cmp = gScore(a) - gScore(b);
      } else if (sortKey === 'binding') {
        cmp = a.bindingMonths - b.bindingMonths;
      }
      return sortAsc ? cmp : -cmp;
    });

  const cheapest = Math.min(...sorted.map((p) => calcAnnualCost(p, kwhPerYear)));

  const SortBtn = ({ col, label }: { col: SortKey; label: string }) => (
    <button
      onClick={() => handleSort(col)}
      className={clsx(
        'flex items-center gap-1 text-sm font-semibold transition-colors',
        sortKey === col ? 'text-emerald-700' : 'text-gray-600 hover:text-emerald-600'
      )}
    >
      {label}
      <ArrowUpDown size={14} className={sortKey === col ? 'text-emerald-500' : 'text-gray-400'} />
    </button>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Sort controls */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <span className="text-sm text-gray-500 font-medium">Sorter efter:</span>
        <SortBtn col="price" label="Pris" />
        <SortBtn col="rating" label="Anmeldelse" />
        <SortBtn col="green" label="Grøn strøm" />
        <SortBtn col="binding" label="Binding" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-500 font-semibold uppercase tracking-wide">
              <th className="px-4 py-3">Leverandør</th>
              <th className="px-4 py-3">Pris</th>
              <th className="px-4 py-3 hidden sm:table-cell">Abonnement</th>
              <th className="px-4 py-3 hidden md:table-cell">Grøn</th>
              <th className="px-4 py-3 hidden md:table-cell">Binding</th>
              <th className="px-4 py-3">Anmeldelse</th>
              <th className="px-4 py-3 hidden sm:table-cell">Estimat/år</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => {
              const cost = calcAnnualCost(p, kwhPerYear);
              const isCheapest = cost === cheapest;
              return (
                <tr
                  key={p.slug}
                  className={clsx(
                    'border-b border-gray-100 last:border-0 transition-colors hover:bg-emerald-50/50',
                    isCheapest && 'bg-emerald-50'
                  )}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {isCheapest && (
                        <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-medium shrink-0">
                          Billigst
                        </span>
                      )}
                      <span className="font-bold text-gray-900">{p.name}</span>
                    </div>
                    {p.tag && !isCheapest && (
                      <span className="text-xs text-amber-600 font-medium">{p.tag}</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-emerald-900">
                      {p.isSpotpris
                        ? `Spot + ${(p.spotprisOverhead! * 100).toFixed(0)} øre`
                        : `${(p.pricePerKwh * 100).toFixed(0)} øre/kWh`}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell text-gray-600">
                    {p.monthlyFee > 0 ? `${p.monthlyFee} kr/md` : 'Intet'}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {p.green === true ? (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <Leaf size={14} className="fill-emerald-500 text-emerald-600" />
                        {p.greenLabel}
                      </span>
                    ) : p.green === 'optional' ? (
                      <span className="text-gray-400">Valgfri</span>
                    ) : (
                      <span className="text-red-400">Nej</span>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {p.bindingMonths > 0 ? (
                      <span className="flex items-center gap-1 text-orange-600">
                        <AlertTriangle size={14} />
                        {p.binding}
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-medium">Ingen</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <StarRating rating={p.rating} />
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="font-bold text-gray-900">
                      {Math.round(cost).toLocaleString('da-DK')} kr
                    </span>
                    <span className="text-gray-400 text-xs">/år*</span>
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      Se tilbud
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
        * Beregnet for {kwhPerYear.toLocaleString('da-DK')} kWh/år. Spotpris antaget 0,85 kr/kWh. Inkluderer ikke moms og nettarif.
      </div>
    </div>
  );
}
