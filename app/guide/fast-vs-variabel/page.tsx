import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, XCircle, Info, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fast vs. variabel elpris – Hvad er bedst for dig?',
  description:
    'Komplet guide til fast og variabel (spotpris) elpris. Forstå forskellen, hvornår hver er billigst og hvad du bør vælge.',
};

export default function FastVsVariabelPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm text-emerald-300 mb-4">Guide</div>
          <h1 className="text-4xl font-bold mb-5">Fast vs. variabel elpris</h1>
          <p className="text-emerald-200 text-lg">
            Et af de vigtigste valg, når du vælger elleverandør. Vi gennemgår fordele og ulemper ved
            begge typer og hjælper dig med at vælge rigtigt.
          </p>
        </div>
      </section>

      {/* Quick comparison */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Fixed */}
          <div className="bg-white rounded-2xl border-2 border-emerald-300 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 text-emerald-700 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                🔒
              </div>
              <h2 className="text-xl font-bold text-emerald-900">Fast pris</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Du betaler en fast pris pr. kWh, uanset hvad der sker på elmarkedet. Prisen aftales for
              typisk 3–12 måneder ad gangen.
            </p>
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-700 text-sm">Fordele</h4>
              {[
                'Forudsigelig månedlig regning',
                'Beskytter mod prisstigninger',
                'Kræver ingen overvågning',
                'Ideel for fastlagte forbrugsmønstre',
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 text-sm">Ulemper</h4>
              {[
                'Kan være dyrere end spotpris over tid',
                'Du taber, hvis markedsprisen falder',
                'Leverandøren har risikopræmie i prisen',
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <XCircle size={15} className="text-red-400 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg text-sm text-emerald-800">
              <strong>Billigste fast pris:</strong> E.ON fra 28 øre/kWh + 35 kr/md
            </div>
          </div>

          {/* Variable */}
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 text-amber-700 rounded-full w-10 h-10 flex items-center justify-center text-xl">
                📈
              </div>
              <h2 className="text-xl font-bold text-gray-900">Variabel (spotpris)</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Du betaler markedsprisen pr. time fra Nord Pool plus leverandørens overhead. Prisen
              kendes dagen før og varierer fra time til time.
            </p>
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-700 text-sm">Fordele</h4>
              {[
                'Billigst over tid for aktive brugere',
                'Udnyt billige nattimer og weekend',
                'Ingen risikopræmie til leverandøren',
                'Transparente priser direkte fra markedet',
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={15} className="text-emerald-500 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700 text-sm">Ulemper</h4>
              {[
                'Uforudsigelig månedlig regning',
                'Kræver aktiv styring for at spare',
                'Risiko for meget høje timepriser',
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <XCircle size={15} className="text-red-400 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
              <strong>Billigste spotpris:</strong> Vindstød, spotpris + 0,01 kr/kWh overhead
            </div>
          </div>
        </div>

        {/* Who should choose what */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Hvem bør vælge hvad?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                🔒 Vælg fast pris hvis du...
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Ønsker ro og forudsigelighed i din økonomi',
                  'Ikke gider overvåge elpriser',
                  'Bruger el jævnt fordelt over hele dagen',
                  'Har elektrisk opvarmning og er bekymret for vinterspidser',
                  'Er lejer og ikke kan styre hvornår apparater kører',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                📈 Vælg spotpris hvis du...
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Kan flytte elforbrug til billige timer (nat/weekend)',
                  'Har elbil med natopladning',
                  'Har smart home-system til automatisk styring',
                  'Har solcelleanlæg og vil optimere køb/salg',
                  'Kan tolerere variabel månedlig regning',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed content */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-5">Historisk: Hvad har været billigst?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ser man på de seneste 5–10 år, har spotprisaftaler generelt været billigere end faste priser
            for gennemsnitlige forbrugere. Det skyldes, at fast pris altid inkluderer en risikopræmie —
            leverandøren skal tjene penge på at bære prisrisikoen på dine vegne.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Dog var 2021–2022 en undtagelse. Energikrisen sendte spotpriserne til astronomiske højder
            (op til 5–8 kr/kWh), og mange forbrugere med spotprisaftaler fik enorme regninger. De med
            fastprisaftaler var beskyttet. Det illustrerer, at spotpris ikke er uden risiko.
          </p>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Historisk gennemsnit: Spotpris DK1</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center">
              {[
                { year: '2020', price: '0,24 kr', color: 'text-emerald-600' },
                { year: '2021', price: '0,73 kr', color: 'text-orange-600' },
                { year: '2022', price: '1,92 kr', color: 'text-red-600' },
                { year: '2023', price: '0,55 kr', color: 'text-emerald-600' },
                { year: '2024', price: '0,72 kr', color: 'text-orange-500' },
                { year: '2025 YTD', price: '~0,85 kr', color: 'text-orange-500' },
              ].map((item) => (
                <div key={item.year} className="bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-gray-500 text-xs">{item.year}</div>
                  <div className={`font-bold text-lg ${item.color}`}>{item.price}</div>
                  <div className="text-gray-400 text-xs">/kWh gennemsnit</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Kilde: Nord Pool. Priser er vejledende.</p>
          </div>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Halvfaste produkter — et kompromis</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Mange elleverandører tilbyder nu et mellemprodukt: en pris der følger markedet på månedsbasis
            eller kvartalsbasis, men som er låst indenfor perioden. Dette giver delvis beskyttelse mod
            ekstreme prisstigninger, mens du stadig nyder godt af faldende priser.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Norlys og Ørsted tilbyder begge varianter af dette produkt. Det er et godt valg, hvis du
            ønsker noget midt imellem den absolutte forudsigelighed af fast pris og den potentielle
            besparelse af ren spotpris.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad med binding?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Faste priser er ofte knyttet til bindingsperioder, fordi leverandøren skal afdække
            prisrisikoen. Vær opmærksom på bindingen, når du sammenligner. OK tilbyder den laveste
            faste kWh-pris (27 øre) men kræver 6 måneders binding.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Spotprisaftaler har typisk ingen binding og kan opsiges med meget kort varsel. Det giver
            maksimal fleksibilitet til at skifte, hvis priserne stiger eller en bedre aftale dukker op.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-6">
            <div className="flex items-start gap-2">
              <Info size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">Vores anbefaling</h4>
                <p className="text-sm text-gray-700">
                  For de fleste danskere i 2025 anbefaler vi at starte med at prøve spotpris hos
                  <strong> Vindstød</strong> eller <strong>E.ON</strong> uden binding. Overvåg din regning
                  de første 3 måneder. Hvis du finder det uoverskueligt eller bekostelig, kan du skifte
                  til en fast aftale til enhver tid — gratis.
                </p>
              </div>
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
            Sammenlign fast og spotpris
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/skift-el"
            className="flex items-center gap-2 border border-emerald-600 text-emerald-700 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors"
          >
            Skift elleverandør
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
