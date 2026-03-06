import type { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, ExternalLink, ArrowRight, CheckCircle, Info } from 'lucide-react';
import { providers, calcAnnualCost } from '@/data/providers';
import ProviderTable from '@/components/ProviderTable';
import StarRating from '@/components/StarRating';

export const metadata: Metadata = {
  title: 'Grøn strøm – Sammenlign grønne elleverandører 2025',
  description:
    'Find den billigste grønne elleverandør i Danmark. Sammenlign priser på grøn strøm og forstå, hvad grøn el egentlig betyder.',
};

const KWH_DEFAULT = 3500;
const greenProviders = providers.filter((p) => p.green === true);

export default function GroenStroemPage() {
  const sortedGreen = [...greenProviders].sort(
    (a, b) => calcAnnualCost(a, KWH_DEFAULT) - calcAnnualCost(b, KWH_DEFAULT)
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-300 text-sm px-4 py-2 rounded-full mb-6">
            <Leaf size={14} className="text-emerald-400 fill-emerald-400" />
            100% grøn strøm
          </div>
          <h1 className="text-4xl font-bold mb-5">
            Grøn strøm — find den billigste grønne elleverandør
          </h1>
          <p className="text-emerald-200 text-lg">
            Sammenlign alle grønne elleverandører i Danmark. Vi forklarer, hvad grøn el er,
            hvad det koster og hvilke leverandører der har certificeret grøn strøm.
          </p>
        </div>
      </section>

      {/* Green providers list */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Billigste grønne elleverandører 2025</h2>
        <p className="text-gray-500 text-sm mb-6">Sorteret efter pris for 3.500 kWh/år. Kun leverandører med reel grøn strøm.</p>

        <div className="space-y-4 mb-10">
          {sortedGreen.map((p, i) => {
            const cost = calcAnnualCost(p, KWH_DEFAULT);
            const cheapest = calcAnnualCost(sortedGreen[0], KWH_DEFAULT);
            const saving = cost - cheapest;
            return (
              <div
                key={p.slug}
                className={`flex flex-wrap items-center gap-4 bg-white rounded-2xl border p-5 shadow-sm ${
                  i === 0 ? 'border-emerald-400 ring-1 ring-emerald-100' : 'border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                  i === 0 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>{i + 1}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 text-lg">{p.name}</span>
                    <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      <Leaf size={11} className="fill-emerald-500" /> {p.greenLabel}
                    </span>
                    {i === 0 && (
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        Billigst grøn
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{p.description}</div>
                  <StarRating rating={p.rating} />
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xl font-bold text-emerald-900">
                    {Math.round(cost).toLocaleString('da-DK')} kr
                  </div>
                  <div className="text-xs text-gray-400">/år</div>
                  {i > 0 && saving > 0 && (
                    <div className="text-xs text-orange-500 font-medium">
                      +{Math.round(saving).toLocaleString('da-DK')} kr/år
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm text-gray-600 mb-1">
                    {p.isSpotpris
                      ? `Spot + ${(p.spotprisOverhead! * 100).toFixed(0)} øre/kWh`
                      : `${(p.pricePerKwh * 100).toFixed(0)} øre/kWh`}
                  </div>
                  <div className="text-sm text-gray-600">Abonnement: {p.monthlyFee > 0 ? `${p.monthlyFee} kr/md` : 'Intet'}</div>
                  <div className="text-sm text-gray-600">Binding: {p.bindingMonths > 0 ? p.binding : 'Ingen'}</div>
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="shrink-0 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Se tilbud
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>

        {/* All providers incl. optional green */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">Alle leverandører — inkl. valgfri grøn</h2>
        <p className="text-gray-500 text-sm mb-4">Visse leverandører tilbyder grøn strøm som tilvalg.</p>
        <ProviderTable />
      </section>

      {/* Content */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-5">Hvad er grøn strøm?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Grøn strøm — eller vedvarende energi — er el produceret fra vindkraft, solenergi,
            vandkraft eller biogas. I Danmark udgør vindkraft langt størstedelen af den vedvarende
            energi, og Danmark er et af verdens mest vindkraftsbaserede lande.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Men hvad vil det egentlig sige, at du køber grøn strøm? Elektroner kan ikke mærkes.
            Uanset hvad du betaler for, flyder de samme elektroner ind i dit stik. Det, du køber
            med grøn strøm, er i realiteten en <strong>Garantiovisen (GO)</strong> — et certifikat,
            der dokumenterer at 1 kWh vedvarende energi er produceret og tilføjet elnettet på dine vegne.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Garantibeviserne handles på et europæisk marked og sikrer, at den strøm du betaler for
            er produceret af vedvarende kilder. Det er et EU-system der er reguleret og troværdigt,
            selvom det er mere komplekst end at sige "jeg bruger den vind, der drejer møllerne over min by".
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-2">
              <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Dansk vs. europæisk grøn strøm</h4>
                <p className="text-sm text-amber-800">
                  Ikke alle grønne aftaler er ens. Visse leverandører bruger udelukkende <strong>dansk</strong>{' '}
                  vedvarende energi (primært vindkraft), mens andre supplerer med europæiske certifikater.
                  Vindstød og Ørsted er eksempler på leverandører med 100% dokumenteret grøn strøm fra
                  egne anlæg eller veldefinerede kilder.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Koster grøn strøm mere?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Overraskende nok er grøn strøm ikke altid dyrere. Vindstød — som leverer 100% vindenergi
            — er faktisk <strong>en af de billigste</strong> elleverandører i Danmark. Det skyldes, at de
            tilbyder ren spotpris med meget lavt overhead, og at vindmøller (afskrevet) producerer meget
            billig el.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Ørsted, som er verdens største offshore vindmølle-operatør, koster lidt mere men er stadig
            konkurrencedygtig og tilbyder 100% grøn strøm fra egne anlæg.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            For leverandører som E.ON og OK er grøn strøm et tilvalg. Du vælger selv, om du vil have
            grøn el, og betaler typisk 1–3 øre/kWh ekstra for certifikaterne.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad skal jeg vælge?</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            {[
              { q: 'Vil du have billigst mulig grøn el?', a: 'Vindstød (spotpris) eller Norlys' },
              { q: 'Vil du have dokumenteret grøn el fra egne anlæg?', a: 'Ørsted eller Vindstød' },
              { q: 'Vil du have fast pris med grøn el?', a: 'Norlys eller EWII' },
              { q: 'Vil du selv vælge?', a: 'E.ON eller OK med grønt tilvalg' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-3 text-sm">
                <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>{item.q}</strong> → {item.a}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Er grøn strøm den rigtige prioritet?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Argumenterne for og imod grøn strøm fylder meget i debatten. Fakta er, at Danmark allerede
            producerer over 50% af sit elforbrug via vindkraft, og at den grønne andel vokser år for år.
            At købe grøn strøm sender et signal til markedet og finansierer produktion af mere
            vedvarende energi.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Det gode er, at du i 2025 ikke behøver at vælge mellem billig og grøn el. Med leverandører
            som Vindstød og Norlys kan du sagtens have begge dele. Brug vores{' '}
            <Link href="/" className="text-emerald-600 underline">sammenligningstabel</Link>{' '}
            og filtrer på grøn strøm for at se dine muligheder.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Find din billigste grønne leverandør</h2>
          <p className="text-emerald-200 mb-6">Beregn præcis, hvad grøn strøm koster for dit forbrug.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-amber-400 text-emerald-900 px-6 py-3 rounded-full font-bold hover:bg-amber-300 transition-colors"
            >
              Beregn din pris <ArrowRight size={16} />
            </Link>
            <Link
              href="/skift-el"
              className="flex items-center gap-2 border border-emerald-400 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-800 transition-colors"
            >
              Sådan skifter du <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
