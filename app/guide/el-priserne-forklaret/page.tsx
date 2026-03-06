import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Info, Zap, TrendingDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hvad indgår i elprisen? – Elafgift, nettarif og abonnement forklaret',
  description:
    'Komplet gennemgang af hvad din elregning indeholder. Forstå elafgift, nettarif, moms, abonnement og spotpris — og hvad du kan spare på.',
};

const priceBreakdown = [
  {
    label: 'Spotpris / strømsalg',
    amount: '0,85 kr',
    pct: 22,
    color: 'bg-emerald-500',
    changeable: true,
    desc: 'Den del du betaler til din elleverandør. Svinger time for time (spotpris) eller er fastlagt for en periode (fast pris). DET ER HER DU KAN SPARE.',
  },
  {
    label: 'Elleverandørens abonnement',
    amount: '0,13 kr',
    pct: 3,
    color: 'bg-emerald-300',
    changeable: true,
    desc: 'Månedligt abonnement til leverandøren (typisk 29–49 kr/md), fordelt pr. kWh.',
  },
  {
    label: 'Elafgift',
    amount: '0,76 kr',
    pct: 20,
    color: 'bg-blue-400',
    changeable: false,
    desc: 'Statslig afgift på el. Gælder for alle og kan ikke påvirkes. Er reduceret for erhverv og visse opvarmningsformer.',
  },
  {
    label: 'PSO-bidrag',
    amount: '0,06 kr',
    pct: 2,
    color: 'bg-blue-300',
    changeable: false,
    desc: 'Betaling til støtte af vedvarende energi og kraftvarme. Reduceret kraftigt de seneste år.',
  },
  {
    label: 'Nettarif (transport)',
    amount: '0,80 kr',
    pct: 21,
    color: 'bg-purple-400',
    changeable: false,
    desc: 'Betaling til dit netselskab for transport af strøm i kablerne. Varierer på tid af døgn (tidstariffering). Afhænger af dit netområde.',
  },
  {
    label: 'Nettarif abonnement',
    amount: '0,15 kr',
    pct: 4,
    color: 'bg-purple-300',
    changeable: false,
    desc: 'Fast månedligt bidrag til dit netselskab, fordelt pr. kWh.',
  },
  {
    label: 'Moms (25%)',
    amount: '0,69 kr',
    pct: 18,
    color: 'bg-gray-400',
    changeable: false,
    desc: '25% moms på den samlede elregning inkl. alle afgifter. Dette er altid inkluderet i den samlede pris du ser på din regning.',
  },
];

const total = 3.83;

export default function ElPriserneForklaretPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-sm text-emerald-300 mb-4">Guide</div>
          <h1 className="text-4xl font-bold mb-5">Hvad indgår i elprisen?</h1>
          <p className="text-emerald-200 text-lg">
            Din elregning er mere kompliceret end den ser ud. Vi bryder den ned komponent for
            komponent og viser dig præcis, hvad du betaler for.
          </p>
        </div>
      </section>

      {/* Price breakdown visual */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Hvad koster 1 kWh el i alt?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Eksempel: Ca. {total.toFixed(2).replace('.', ',')} kr/kWh inkl. moms (gennemsnit, alle komponenter)
          </p>

          {/* Visual bar */}
          <div className="flex h-10 rounded-xl overflow-hidden mb-6">
            {priceBreakdown.map((item) => (
              <div
                key={item.label}
                style={{ width: `${item.pct}%` }}
                className={`${item.color} relative group cursor-pointer transition-opacity hover:opacity-80`}
                title={`${item.label}: ${item.amount}/kWh`}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {priceBreakdown.map((item) => (
              <div key={item.label} className="flex items-start gap-3 text-sm">
                <div className={`w-4 h-4 rounded shrink-0 mt-0.5 ${item.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">{item.label}</span>
                    {item.changeable && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">
                        Du kan spare her
                      </span>
                    )}
                  </div>
                  <div className="text-gray-500">{item.amount}/kWh · {item.pct}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed breakdown */}
        <div className="space-y-5">
          {priceBreakdown.map((item) => (
            <div
              key={item.label}
              className={`bg-white rounded-xl border p-5 ${
                item.changeable ? 'border-emerald-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-3 rounded-full h-full min-h-[2rem] shrink-0 ${item.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-gray-900">{item.label}</h3>
                    <span className="font-semibold text-emerald-900">{item.amount}/kWh</span>
                    {item.changeable && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <TrendingDown size={11} /> Du kan spare her
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-emerald-900 mb-5">Hvorfor er elregningen så høj?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Mange danskere bliver overrasket over, at selve strømsalget (det du betaler til din
            elleverandør) kun udgør <strong>ca. 25% af den samlede elregning</strong>. Resten er
            afgifter, transport og moms, som du ikke kan påvirke ved at skifte leverandør.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Den statslige elafgift alene er 76,10 øre/kWh (2025) og gælder for alle forbrugere.
            Dertil kommer 25% moms på hele beløbet. Det betyder, at selvom du finder den billigste
            elleverandør og sparer 10 øre/kWh på strømsalget, er din reelle besparelse kun ca.
            12,5 øre/kWh after moms — men det løber stadig hurtigt op over et år.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad er nettariffen?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nettariffen er betalingen til dit lokale netselskab for at transportere strøm fra
            produktionsanlæggene til dit hjem via kabler, transformatorer og el-infrastruktur.
            Dit netselskab er typisk et lokalt monopol — du kan ikke vælge dem frit som din elleverandør.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            De fleste netselskaber anvender nu <strong>tidstariffering</strong>, hvor nettariffen
            er højere i spidsbelastningstimer (typisk hverdage 17–21) og lavere om natten og i
            weekenden. Det betyder, at du kan spare penge ved at flytte forbrug til lave tider —
            det gælder uanset din elleverandøraftale.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad er elafgiften?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Elafgiften er en statslig forbrugsafgift på el. I 2025 er den 76,10 øre/kWh ekskl. moms
            for private husholdninger. Erhvervsvirksomheder kan dog få godtgjort en stor del af
            afgiften via momsafregningen.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Der er reduceret elafgift for visse formål — bl.a. for erhvervsmæssig opvarmning med
            varmepumpe. Er du erhvervskunde, bør du undersøge dine muligheder for afgiftsgodtgørelse.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad er PSO-afgiften?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            PSO (Public Service Obligation) var tidligere en afgift til støtte af vedvarende energi.
            Denne afgift er i dag kraftigt reduceret og finansieres i stigende grad over finansloven
            i stedet. I 2025 er PSO-bidraget meget lille sammenlignet med tidligere år.
          </p>

          <h3 className="text-xl font-bold text-emerald-900 mb-3">Hvad kan jeg faktisk spare på?</h3>
          <div className="space-y-3 mb-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <h4 className="font-bold text-emerald-900">Elleverandørens pris</h4>
                  <p className="text-sm text-gray-700">
                    Det mest indlysende. Skift til den billigste leverandør og spar 5–20 øre/kWh.
                    For 3.500 kWh/år svarer det til 175–700 kr/år før moms, ca. 220–875 kr inkl. moms.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <h4 className="font-bold text-emerald-900">Timing af forbrug (tidstariffering)</h4>
                  <p className="text-sm text-gray-700">
                    Flyt vaskemaskine, opvaskemaskine og elbilsopladning til billige timer.
                    Nettariffen kan variere med op til 0,50–1,00 kr/kWh mellem spidstid og lavtid.
                    Her kan der ligge en stor besparelse — uanset leverandør.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">❌</span>
                <div>
                  <h4 className="font-bold text-gray-700">Elafgift, moms og nettarif (grundbeløb)</h4>
                  <p className="text-sm text-gray-600">
                    Disse kan du ikke spare på ved at vælge en anden leverandør. Det er lovbestemte
                    afgifter og betaling til et lokalt monopol.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-2">
              <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                <strong>Pro tip:</strong> Kombiner leverandørskift med timing af forbrug og du kan
                potentielt spare 1.500–3.000 kr/år på din samlede elregning. Brug vores{' '}
                <Link href="/" className="underline text-amber-700">prisberegner</Link>{' '}
                for at se, hvad du kan spare ved at skifte leverandør.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Relaterede guider</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/', title: 'Sammenlign leverandører', desc: 'Find din billigste el' },
            { href: '/skift-el', title: 'Skift elleverandør', desc: 'Trin-for-trin guide' },
            { href: '/guide/fast-vs-variabel', title: 'Fast vs. spotpris', desc: 'Hvad er bedst?' },
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
