import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Info, Zap, Clock } from 'lucide-react';
import SpotpriceWidget from '@/components/SpotpriceWidget';

export const metadata: Metadata = {
  title: 'Spotpris på el – Hvad er spotpris og er det billigst?',
  description:
    'Forstå spotpris på el. Lær hvad Nord Pool-spotprisen er, hvornår strøm er billigst, og om spotpris er det rigtige valg for dig.',
};

const hourlyData = [
  { hour: '00-01', price: 0.41, label: 'Nat' },
  { hour: '01-02', price: 0.38 },
  { hour: '02-03', price: 0.35 },
  { hour: '03-04', price: 0.33 },
  { hour: '04-05', price: 0.34 },
  { hour: '05-06', price: 0.45 },
  { hour: '06-07', price: 0.72, label: 'Morgenpeak' },
  { hour: '07-08', price: 0.89 },
  { hour: '08-09', price: 0.94 },
  { hour: '09-10', price: 0.91 },
  { hour: '10-11', price: 0.85 },
  { hour: '11-12', price: 0.81 },
  { hour: '12-13', price: 0.78 },
  { hour: '13-14', price: 0.75 },
  { hour: '14-15', price: 0.79 },
  { hour: '15-16', price: 0.88 },
  { hour: '16-17', price: 1.02, label: 'Aftenpeak' },
  { hour: '17-18', price: 1.15 },
  { hour: '18-19', price: 1.12 },
  { hour: '19-20', price: 1.08 },
  { hour: '20-21', price: 0.98 },
  { hour: '21-22', price: 0.88 },
  { hour: '22-23', price: 0.73 },
  { hour: '23-24', price: 0.58 },
];

const maxPrice = Math.max(...hourlyData.map((h) => h.price));

export default function SpotprisPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-300 text-sm px-4 py-2 rounded-full mb-6">
            <TrendingUp size={14} className="text-amber-400" />
            Live spotpris — DK1 & DK2
          </div>
          <h1 className="text-4xl font-bold mb-5">
            Spotpris på el — hvad er det, og er det billigst?
          </h1>
          <p className="text-emerald-200 text-lg">
            Spotprisen på el svinger time for time. Forstå hvordan den fungerer, hvornår strøm er
            billigst, og om du bør vælge en spotprisaftale.
          </p>
        </div>
      </section>

      {/* Spotpris widget + content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <SpotpriceWidget />

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-emerald-900 mb-4">Hvad er spotpris?</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Spotprisen er den pris, som el handles til på den europæiske elbørs <strong>Nord Pool</strong>.
              Prisen fastsættes dagen før for hver enkelt time det næste døgn og afspejler det øjeblikkelige
              udbud og efterspørgsel af el i Norden og Nordeuropa.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              Vælger du en <strong>spotprisaftale</strong>, betaler du denne markedspris plus et lille
              overhead til din elleverandør (typisk 1–5 øre/kWh). Din månedlige elregning afhænger
              af, hvornår på døgnet du bruger strøm.
            </p>
            <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-3 text-sm">
              <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span className="text-amber-800">
                Spotprisen kan variere fra under 1 øre til over 5 kr/kWh inden for samme dag.
                Gennemsnittet for 2024 var ca. 0,72 kr/kWh for DK1 og 0,81 kr/kWh for DK2.
              </span>
            </div>
          </div>
        </div>

        {/* Hourly price chart */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-12">
          <h2 className="text-xl font-bold text-emerald-900 mb-2">Typisk dagsprofil — spotpris pr. time</h2>
          <p className="text-gray-500 text-sm mb-6">
            Eksempel på en typisk hverdag (vejledende, ikke dagens faktiske priser)
          </p>

          <div className="flex items-end gap-1 h-48 mb-2">
            {hourlyData.map((h) => {
              const heightPct = (h.price / maxPrice) * 100;
              const isExpensive = h.price >= 1.0;
              const isCheap = h.price < 0.5;
              return (
                <div
                  key={h.hour}
                  className="flex-1 flex flex-col items-center justify-end group relative"
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {h.hour}: {h.price.toFixed(2)} kr
                  </div>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-sm transition-all ${
                      isExpensive
                        ? 'bg-red-400'
                        : isCheap
                        ? 'bg-emerald-400'
                        : 'bg-emerald-600'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Time labels */}
          <div className="flex gap-1 text-xs text-gray-400">
            {hourlyData.filter((_, i) => i % 4 === 0).map((h) => (
              <div key={h.hour} className="flex-1 text-center">{h.hour.split('-')[0]}</div>
            ))}
            <div className="flex-1 text-center">24</div>
          </div>

          <div className="flex gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-400 rounded-sm inline-block" /> Billig (&lt;0,50 kr)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-600 rounded-sm inline-block" /> Normal</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-400 rounded-sm inline-block" /> Dyr (&gt;1,00 kr)</span>
          </div>
        </div>

        {/* DK1 vs DK2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-sm">DK1</span>
              Vestdanmark
            </h3>
            <p className="text-sm text-gray-700">
              Vestdanmark (Jylland og Fyn) er i elpriszone DK1. Her er priserne generelt lidt lavere
              grundet bedre forbindelser til det tyske og hollandske elmarked. DK1 har stor vindkraft
              fra Vesterhavet og er forbundet til Norge via NorNed-kablet.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-sm">DK2</span>
              Østdanmark
            </h3>
            <p className="text-sm text-gray-700">
              Østdanmark (Sjælland, Lolland-Falster og Bornholm) er i elpriszone DK2. Denne zone har
              forbindelser til Sverige (Øresund) og til Storebælt. Historisk har DK2 haft lidt højere
              priser end DK1, men prisforskellen varierer.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-5">Er spotpris det billigste valg?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Over et fuldt år er spotprisaftaler typisk billigere end faste aftaler, men det afhænger
            enormt af dit forbrugsmønster. Hvis du primært bruger strøm om aftenen (17–21), betaler
            du netop i de dyreste timer — og en fast pris kan pludselig være bedre.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De kloge spotprisbrugere udnytter de billige nattetimer (typisk 00–06) til at lade elbilen,
            tænde opvaskemaskinen og fylde varmtvandsbeholderen. Har du et <strong>smart home-system</strong>
            eller en elbil med timerstyring, kan spotpris spare dig 1.000–3.000 kr om året sammenlignet
            med en fast aftale.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For den gennemsnitlige forbruger uden automatisering er spotpris og fast pris ret tæt.
            Vindstød (spotpris + 0,01 øre) og E.ON (fast 28 øre) har meget konkurrencedygtige priser
            begge vejer — vi anbefaler at bruge vores{' '}
            <Link href="/" className="text-emerald-600 underline">prisberegner</Link>{' '}
            til at se, hvad der er billigst for dit specifikke forbrug.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvornår er spotpris IKKE et godt valg?</h3>
          <ul className="space-y-2 text-gray-700 mb-6 text-sm">
            {[
              'Du har ikke mulighed for at flytte forbrug til billige timer',
              'Du har et eldrevne varmesystem og bruger meget el om vinteren (de koldeste dage = dyreste el)',
              'Du ønsker forudsigelighed i din månedlige økonomi',
              'Du lever i en husstand med fast forbrugsmønster og kan ikke optimere',
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">✗</span>
                {point}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvornår er spotpris et godt valg?</h3>
          <ul className="space-y-2 text-gray-700 mb-6 text-sm">
            {[
              'Du har elbil og lader om natten på timer',
              'Du har smart home-løsning der automatisk flytte forbrug',
              'Du er hjemme om dagen og bruger el i lavpristimer',
              'Du har solcelleanlæg og ønsker at optimere salg og køb',
              'Du kan tolerere variabel månedlig regning',
            ].map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                {point}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad påvirker spotprisen?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Spotprisen påvirkes af en lang række faktorer: Vejr (vind = billig el), forbrug i nabolandene,
            produktionskapacitet af atomkraft i Frankrig, eleksport/-import, kulforbrug i Tyskland og
            naturgas-priserne i Europa. En kold og vindstille vinterdag kan presse priserne op til
            5–8 kr/kWh, mens en blæsende forårsdag kan sende priserne under nul.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Negative elpriser opstår, når der er for meget vindkraft på nettet og ingen steder at
            sende den hen. Det sker faktisk jævnligt i Danmark — primært om natten om foråret og
            efteråret. Med en spotprisaftale tjener du faktisk penge i disse timer, hvis du forbruger el.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-6">
            <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Clock size={18} /> Bedste tidspunkter at bruge strøm på spotpris
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-center">
              {[
                { time: '01–05', label: 'Bedst', color: 'bg-emerald-100 text-emerald-700' },
                { time: '10–14', label: 'Godt', color: 'bg-emerald-50 text-emerald-600' },
                { time: '08–10', label: 'OK', color: 'bg-yellow-50 text-yellow-700' },
                { time: '17–21', label: 'Undgå', color: 'bg-red-50 text-red-600' },
              ].map((t) => (
                <div key={t.time} className={`rounded-lg p-3 ${t.color}`}>
                  <div className="font-bold text-lg">{t.time}</div>
                  <div className="font-medium">{t.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-700 transition-colors"
          >
            Sammenlign spotpris-leverandører
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/guide/fast-vs-variabel"
            className="flex items-center gap-2 border border-emerald-600 text-emerald-700 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors"
          >
            Fast vs. variabel elpris
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
