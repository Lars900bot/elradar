import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowRight, ExternalLink, Leaf, AlertTriangle, TrendingDown } from 'lucide-react';
import { providers, calcAnnualCost, getSortedByPrice } from '@/data/providers';
import ProviderTable from '@/components/ProviderTable';
import PriceCalculator from '@/components/PriceCalculator';
import StarRating from '@/components/StarRating';

export const metadata: Metadata = {
  title: 'Billigste elleverandør 2025 – Sammenlign og spar',
  description:
    'Find Danmarks billigste elleverandør i 2025. Komplet rangliste og sammenligning af strømpriser. Spar op til 2.400 kr/år.',
};

const KWH_DEFAULT = 3500;
const top5 = getSortedByPrice(KWH_DEFAULT).slice(0, 5);

export default function BilligStroemPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-300 text-sm px-4 py-2 rounded-full mb-6">
            <TrendingDown size={14} className="text-amber-400" />
            Opdateret marts 2025
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Danmarks billigste elleverandør 2025
          </h1>
          <p className="text-emerald-200 text-lg">
            Vi har sammenlignet alle store elleverandørers priser for en gennemsnitlig husstand
            (3.500 kWh/år). Her er de 5 billigste — og hvad du reelt betaler om året.
          </p>
        </div>
      </section>

      {/* Top 5 quick list */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Top 5 billigste elleverandører</h2>
        <p className="text-gray-500 text-sm mb-6">Beregnet for 3.500 kWh/år. Priser inkluderer abonnement.</p>

        <div className="space-y-3">
          {top5.map((p, i) => {
            const cost = calcAnnualCost(p, KWH_DEFAULT);
            const saving = cost - calcAnnualCost(top5[0], KWH_DEFAULT);
            return (
              <div
                key={p.slug}
                className={`flex items-center gap-4 bg-white rounded-xl border p-5 shadow-sm ${
                  i === 0 ? 'border-emerald-400 ring-1 ring-emerald-200' : 'border-gray-200'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                    i === 0 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-lg">{p.name}</span>
                    {i === 0 && (
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                        Billigst
                      </span>
                    )}
                    {p.tag && i !== 0 && (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span>
                      {p.isSpotpris
                        ? `Spotpris + ${(p.spotprisOverhead! * 100).toFixed(0)} øre/kWh overhead`
                        : `${(p.pricePerKwh * 100).toFixed(0)} øre/kWh + ${p.monthlyFee} kr/md abonnement`}
                    </span>
                    {p.green === true && (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Leaf size={11} /> {p.greenLabel}
                      </span>
                    )}
                    {p.bindingMonths > 0 && (
                      <span className="flex items-center gap-1 text-orange-500">
                        <AlertTriangle size={11} /> Binding: {p.binding}
                      </span>
                    )}
                  </div>
                  <StarRating rating={p.rating} />
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-bold text-emerald-900">
                    {Math.round(cost).toLocaleString('da-DK')} kr
                  </div>
                  <div className="text-xs text-gray-400">/år</div>
                  {i > 0 && saving > 0 && (
                    <div className="text-xs text-red-500 font-medium mt-0.5">
                      +{Math.round(saving).toLocaleString('da-DK')} kr dyrere
                    </div>
                  )}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="shrink-0 flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                >
                  Gå til {p.name}
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-3">
          * Priser er vejledende. Spotpris antaget 0,85 kr/kWh. Inkluderer ikke moms og nettarif.
        </p>
      </section>

      {/* Calculator */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Beregn prisen for dit forbrug</h2>
        <p className="text-gray-500 text-sm mb-6">Justér forbruget til dit faktiske kWh-forbrug og se din individuelle besparelse.</p>
        <PriceCalculator />
      </section>

      {/* Full table */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alle elleverandører sammenlignet</h2>
        <p className="text-gray-500 text-sm mb-6">Sorter tabellen efter pris, anmeldelse, grøn strøm eller binding.</p>
        <ProviderTable />
      </section>

      {/* Content */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-5">
            Hvem er billigste elleverandør i Danmark?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Svaret afhænger af dit forbrug og om du foretrækker fast pris eller spotpris. For de fleste
            danskere er <strong>Vindstød</strong> og <strong>E.ON</strong> konsekvent blandt de billigste.
            Vindstød tilbyder spotpris med meget lavt overhead (kun 0,01 kr/kWh) og 100 % vindenergi,
            mens E.ON tilbyder den laveste faste kWh-pris kombineret med et lille abonnement på 35 kr/md.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>OK</strong> har den laveste faste enhedspris på 27 øre/kWh, men har en binding på
            6 måneder. Det er stadig et godt valg, hvis du er tryg ved at forpligte dig i et halvt år.
            Husk dog at sammenligne den samlede årsomkostning — ikke kun kWh-prisen. Et lavt abonnement
            kan gøre en leverandør billigere end en med lavere kWh-pris.
          </p>
          <h3 className="text-xl font-bold text-emerald-900 mb-3">Spotpris vs. fast pris — hvad er billigst?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Historisk set er spotprisaftaler billigere over et kalenderår sammenlignet med faste priser,
            men kun hvis du kan tilpasse dit forbrug. Kører du opvaskemaskine og vaskemaskine om natten
            eller tidligt om morgenen, kan du udnytte de meget lave natpriser. Se vores{' '}
            <Link href="/guide/fast-vs-variabel" className="text-emerald-600 underline">
              guide til fast vs. variabel elpris
            </Link>{' '}
            for en detaljeret gennemgang.
          </p>
          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad er inkluderet i prisen?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Elleverandørens pris dækker kun selve strømsalget — kWh-prisen plus et månedligt abonnement.
            Dertil kommer nettariffens betaling for transport af strøm (betalt til dit netselskab), el-afgift
            på 76 øre/kWh, PSO-afgift samt moms. Den samlede elregning er typisk 3-4 gange højere end
            leverandørens pris alene. Læs vores{' '}
            <Link href="/guide/el-priserne-forklaret" className="text-emerald-600 underline">
              forklaring af hvad der indgår i elprisen
            </Link>.
          </p>
          <h3 className="text-xl font-bold text-emerald-900 mb-3">Sådan finder du billigste el til dig</h3>
          <ol className="space-y-3 text-gray-700 mb-6">
            {[
              'Find dit seneste års elforbrug i kWh på din elregning eller på eltavlen.',
              'Indtast forbruget i vores beregner øverst på siden.',
              'Sammenlign resultater — husk at tjekke for binding og abonnementsomkostninger.',
              'Klik videre til den leverandør du vælger og tilmeld dig direkte på deres hjemmeside.',
              'Din nye leverandør håndterer opsigelse hos den gamle — du skal ikke gøre noget.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-emerald-100 text-emerald-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <h4 className="font-bold text-emerald-900 mb-2">Vidste du?</h4>
            <p className="text-sm text-gray-700">
              Over 600.000 danske husstande skifter elleverandør hvert år. Det er gratis at skifte, og du
              er aldrig uden strøm under skiftet. Langt de fleste danskere kunne spare penge ved at
              sammenligne priser minimum én gang om året.
            </p>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Relaterede guider</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/skift-el', title: 'Skift elleverandør', desc: 'Trin-for-trin guide på 5 minutter' },
            { href: '/groen-stroem', title: 'Grøn strøm', desc: 'Sammenlign grønne elleverandører' },
            { href: '/spotpris', title: 'Spotpris', desc: 'Hvad er spotpris og er det billigst?' },
          ].map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-emerald-400 hover:shadow transition-all group"
            >
              <div className="font-semibold text-gray-900 group-hover:text-emerald-700 mb-1">{g.title}</div>
              <div className="text-sm text-gray-500 mb-2">{g.desc}</div>
              <span className="text-emerald-600 text-sm flex items-center gap-1">Læs <ArrowRight size={13} /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
