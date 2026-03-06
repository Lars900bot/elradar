'use client';
import { useState, useMemo } from 'react';
import { Calculator, ExternalLink, Leaf, AlertCircle } from 'lucide-react';
import { providers, calcAnnualCost } from '@/data/providers';
import StarRating from './StarRating';

const HOUSEHOLD_DEFAULTS: Record<string, number> = {
  'Enlig (1 pers.)': 1800,
  'Par (2 pers.)': 3000,
  'Familie (3-4 pers.)': 4500,
  'Stor familie (5+ pers.)': 6500,
};

export default function PriceCalculator() {
  const [kwh, setKwh] = useState(3500);
  const [household, setHousehold] = useState('Familie (3-4 pers.)');

  const sorted = useMemo(
    () =>
      [...providers]
        .sort((a, b) => calcAnnualCost(a, kwh) - calcAnnualCost(b, kwh))
        .slice(0, 5),
    [kwh]
  );

  const cheapest = calcAnnualCost(sorted[0], kwh);
  const mostExpensive = calcAnnualCost(sorted[sorted.length - 1], kwh);
  const maxSaving = mostExpensive - cheapest;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-900 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="text-amber-400" size={24} />
          <h2 className="text-xl font-bold">El-prisberegner</h2>
        </div>
        <p className="text-emerald-200 text-sm">
          Beregn din årlige elregning og find den billigste leverandør til dig.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 border-b border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* kWh slider */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Dit elforbrug
            </label>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-emerald-900">
                {kwh.toLocaleString('da-DK')}
              </span>
              <span className="text-gray-500">kWh/år</span>
            </div>
            <input
              type="range"
              min={1000}
              max={10000}
              step={100}
              value={kwh}
              onChange={(e) => setKwh(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1.000</span>
              <span>10.000 kWh/år</span>
            </div>
          </div>

          {/* Household selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Husstandsstørrelse
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(HOUSEHOLD_DEFAULTS).map(([label, val]) => (
                <button
                  key={label}
                  onClick={() => { setHousehold(label); setKwh(val); }}
                  className={`text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                    household === label
                      ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Saving banner */}
      {maxSaving > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-2">
          <AlertCircle className="text-amber-500 shrink-0" size={18} />
          <p className="text-sm text-amber-800">
            <strong>Du kan spare op til {Math.round(maxSaving).toLocaleString('da-DK')} kr/år</strong> ved at skifte fra dyreste til billigste leverandør.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-700 mb-4 text-sm">
          Top 5 billigste for <strong>{kwh.toLocaleString('da-DK')} kWh/år</strong>:
        </h3>
        <div className="space-y-3">
          {sorted.map((p, i) => {
            const cost = calcAnnualCost(p, kwh);
            const saving = cost - cheapest;
            return (
              <div
                key={p.slug}
                className={`flex items-center gap-4 rounded-xl p-4 border transition-all ${
                  i === 0
                    ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                {/* Rank */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    i === 0
                      ? 'bg-emerald-600 text-white'
                      : i === 1
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-gray-900">{p.name}</span>
                    {p.tag && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                        {p.tag}
                      </span>
                    )}
                    {p.green === true && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600">
                        <Leaf size={12} /> {p.greenLabel}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {p.isSpotpris
                      ? `Spotpris + ${(p.spotprisOverhead! * 100).toFixed(0)} øre/kWh`
                      : `${(p.pricePerKwh * 100).toFixed(0)} øre/kWh + ${p.monthlyFee} kr/md`}
                    {p.bindingMonths > 0 && ` · Binding: ${p.binding}`}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-emerald-900">
                    {Math.round(cost).toLocaleString('da-DK')} kr
                  </div>
                  <div className="text-xs text-gray-500">/år</div>
                  {i > 0 && saving > 0 && (
                    <div className="text-xs text-red-500 font-medium">
                      +{Math.round(saving).toLocaleString('da-DK')} kr
                    </div>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={`shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    i === 0
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
                  }`}
                >
                  Gå til
                  <ExternalLink size={12} />
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          * Priser er vejledende. Spotpris beregnet med ca. 0,85 kr/kWh. Inkluderer ikke moms og afgifter.
          <a href="/skift-el" className="ml-1 underline hover:text-emerald-600">Hvordan skifter jeg?</a>
        </p>
      </div>
    </div>
  );
}
