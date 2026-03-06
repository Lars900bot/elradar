import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Zap, ArrowRight, Shield, Clock, TrendingDown } from 'lucide-react';
import PriceCalculator from '@/components/PriceCalculator';
import ProviderTable from '@/components/ProviderTable';
import SpotpriceWidget from '@/components/SpotpriceWidget';

export const metadata: Metadata = {
  title: 'Sammenlign elleverandører – Find billigste strøm 2025',
  description:
    'Sammenlign alle elleverandører i Danmark og find den billigste strøm. Brug vores gratis prisberegner og spar op til 2.000 kr/år.',
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-300 text-sm px-4 py-2 rounded-full mb-6 font-medium">
            <Zap size={14} className="text-amber-400" />
            Opdateret marts 2025
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Find Danmarks{' '}
            <span className="text-amber-400">billigste elleverandør</span>
          </h1>
          <p className="text-xl text-emerald-200 mb-8 max-w-2xl mx-auto">
            Sammenlign strømpriser fra alle store elleverandører i Danmark. Vores prisberegner
            viser dig præcis, hvad du betaler — og hvor meget du kan spare ved at skifte.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-emerald-300">
            <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> Gratis og upartisk</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> Skift på under 5 min.</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> Ingen afbrydelser i strømmen</span>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-emerald-900">8</div>
            <div className="text-sm text-gray-500">Elleverandører</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-900">op til 2.400 kr</div>
            <div className="text-sm text-gray-500">Mulig besparelse/år</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-900">5 min.</div>
            <div className="text-sm text-gray-500">Tager at skifte</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-900">0 kr</div>
            <div className="text-sm text-gray-500">Det koster at skifte</div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator + table — main column */}
          <div className="lg:col-span-2 space-y-8">
            <PriceCalculator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Alle elleverandører 2025</h2>
                <span className="text-sm text-gray-500">Sorter ved at klikke på kolonnen</span>
              </div>
              <ProviderTable />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SpotpriceWidget />

            {/* Quick guide card */}
            <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-4">
                Sådan skifter du elleverandør
              </h3>
              <ol className="space-y-3">
                {[
                  { step: '1', text: 'Find billigste leverandør med vores beregner' },
                  { step: '2', text: 'Gå til leverandørens hjemmeside og vælg et produkt' },
                  { step: '3', text: 'Indtast dit CPR-nr. og adresse' },
                  { step: '4', text: 'Din nye leverandør klarer resten automatisk' },
                ].map((item) => (
                  <li key={item.step} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="bg-emerald-100 text-emerald-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">
                      {item.step}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ol>
              <Link
                href="/skift-el"
                className="mt-5 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-sm"
              >
                Fuld guide til skift af el
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Benefits */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
              <h3 className="font-bold text-emerald-900 mb-3">Hvorfor skifte elleverandør?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <TrendingDown size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Spar 500–2.400 kr om året
                </li>
                <li className="flex items-start gap-2">
                  <Shield size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Ingen afbrydelse af strømmen
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Tager kun 5 minutter
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  Gratis at skifte — altid
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Content section */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto prose prose-lg">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            Sammenlign elleverandører og find den billigste el i Danmark
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Danmark har et frit elmarked, hvilket betyder at du som forbruger frit kan vælge, hvem der
            leverer din strøm. Elleverandøren er den virksomhed, du betaler for selve strømsalget — den
            del der svinger i pris. Prisen på el varierer betydeligt fra leverandør til leverandør, og
            mange danskere betaler unødigt meget, fordi de aldrig har tjekket, om der er billigere
            alternativer.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Hos ElRadar har vi samlet alle de store elleverandører i Danmark på ét sted, så du nemt kan
            sammenligne priser, abonnementer, grøn strøm og binding. Vores prisberegner tager udgangspunkt
            i dit faktiske forbrug og viser dig, hvad du ville betale hos hver leverandør på et år.
          </p>
          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad koster el i 2025?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            En gennemsnitlig dansk husstand med 3.500 kWh forbrug om året betaler typisk mellem 8.000 og
            11.000 kr for selve strømsalget inkl. abonnement. Men dertil kommer nettarif, afgifter og moms,
            som udgør den største del af den samlede elregning. Den del kan du ikke påvirke ved at skifte
            leverandør — men du kan stadig spare på selve kWh-prisen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De billigste elleverandører i 2025 er typisk dem, der tilbyder spotprisbaserede produkter med
            lavt overhead. Vindstød og E.ON er konsekvent blandt de billigste, mens de store traditionelle
            selskaber som Ørsted og EWII koster lidt mere men til gengæld tilbyder stærk kundeservice og
            100 % grøn strøm.
          </p>
          <h3 className="text-xl font-bold text-emerald-900 mb-3">Fast pris eller spotpris?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Det store valg er, om du vil have en <Link href="/guide/fast-vs-variabel" className="text-emerald-600 underline">fast eller variabel (spotpris) aftale</Link>.
            Fast pris giver forudsigelighed — du ved præcis, hvad du betaler pr. kWh uanset hvad der
            sker på elmarkedet. Spotpris følger Nord Pools timepris, som kan svinge enormt — fra 10 øre om
            natten til over 3 kr i spidsbelastningsperioder om vinteren. Over et år er spotpris historisk
            set billigere for dem, der kan flytte deres forbrug til billige perioder.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Vil du have grøn strøm? Se vores{' '}
            <Link href="/groen-stroem" className="text-emerald-600 underline">guide til grøn strøm</Link>,
            hvor vi gennemgår, hvad grøn el egentlig betyder, og hvilke leverandører der tilbyder certificeret
            grøn strøm til de bedste priser.
          </p>
          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvornår skal jeg skifte?</h3>
          <p className="text-gray-700 leading-relaxed">
            Du kan skifte elleverandør når som helst — der er ingen årstider, der er bedre end andre.
            Skiftet er gratis, og du vil aldrig opleve afbrydelser i din strøm. Din nuværende leverandør
            kan have en opsigelsesperiode på op til 30 dage, men din nye leverandør håndterer typisk
            al kommunikation. Læs vores{' '}
            <Link href="/skift-el" className="text-emerald-600 underline">trin-for-trin guide til at skifte elleverandør</Link>{' '}
            for at komme godt i gang.
          </p>
        </div>
      </section>

      {/* Guide links */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Populære guider</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              href: '/billig-stroem',
              title: 'Billigste elleverandør 2025',
              desc: 'Se ranglisten over Danmarks billigste el og find den rigtige aftale til dig.',
              color: 'emerald',
            },
            {
              href: '/skift-el',
              title: 'Sådan skifter du elleverandør',
              desc: 'Komplet trin-for-trin guide. Det tager 5 minutter og er gratis.',
              color: 'amber',
            },
            {
              href: '/groen-stroem',
              title: 'Grøn strøm guide',
              desc: 'Hvad er grøn el? Hvilke leverandører tilbyder certificeret grøn strøm?',
              color: 'emerald',
            },
          ].map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-700">
                {g.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{g.desc}</p>
              <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                Læs guide <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
