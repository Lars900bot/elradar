import { TrendingUp, Info } from 'lucide-react';

// Static widget — replace with live API data in production
const SPOTPRIS_NOW = 0.87;
const SPOTPRIS_YESTERDAY = 0.92;
const diff = ((SPOTPRIS_NOW - SPOTPRIS_YESTERDAY) / SPOTPRIS_YESTERDAY) * 100;

export default function SpotpriceWidget() {
  const isDown = diff < 0;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="text-emerald-600" size={20} />
        <h3 className="font-bold text-emerald-900 text-lg">Dagens spotpris</h3>
        <span className="ml-auto text-xs text-gray-400">DK1 / DK2 gennemsnit</span>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <span className="text-4xl font-bold text-emerald-900">
          {SPOTPRIS_NOW.toFixed(2).replace('.', ',')}
        </span>
        <span className="text-lg text-gray-500 mb-1">kr/kWh</span>
        <span
          className={`mb-1 text-sm font-semibold px-2 py-0.5 rounded-full ${
            isDown ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
          }`}
        >
          {isDown ? '↓' : '↑'} {Math.abs(diff).toFixed(1)}% ift. i går
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm mb-4">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="font-semibold text-gray-800">Nat (00-06)</div>
          <div className="text-emerald-600 font-bold">0,41 kr</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-200">
          <div className="font-semibold text-emerald-800">Nu (12-18)</div>
          <div className="text-emerald-700 font-bold">{SPOTPRIS_NOW.toFixed(2).replace('.', ',')} kr</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="font-semibold text-gray-800">Aften (18-22)</div>
          <div className="text-orange-600 font-bold">1,12 kr</div>
        </div>
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <Info size={14} className="mt-0.5 shrink-0 text-emerald-500" />
        <span>
          Spotprisen svinger time for time baseret på udbud og efterspørgsel på elbørsen Nord Pool.
          Prisen ovenfor er vejledende og inkluderer ikke moms, afgifter eller netselskabets tariffer.
          Se vores <a href="/spotpris" className="underline text-emerald-600 hover:text-emerald-800">spotpris-guide</a> for mere information.
        </span>
      </div>
    </div>
  );
}
