import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, Shield, ArrowRight, ChevronRight, ExternalLink, AlertCircle, Zap } from 'lucide-react';
import { providers, calcAnnualCost, getSortedByPrice } from '@/data/providers';

export const metadata: Metadata = {
  title: 'Sådan skifter du elleverandør – Trin-for-trin guide 2025',
  description:
    'Komplet guide til at skifte elleverandør i Danmark. Det tager 5 minutter, er gratis og din strøm afbrydes aldrig. Følg vores enkle trin.',
};

const top3 = getSortedByPrice(3500).slice(0, 3);

const steps = [
  {
    num: 1,
    title: 'Find dit elforbrug',
    time: '2 minutter',
    icon: '📊',
    content: `Første skridt er at kende dit aktuelle elforbrug i kWh/år. Du finder det på:
- Din seneste elregning (det årstal der er opgjort)
- Dit netselskabs hjemmeside (f.eks. Radius, SEAS-NVE, TREFOR)
- Via app'en fra dit netselskab
En gennemsnitlig dansk husstand bruger 3.500–4.500 kWh/år. Enlige bruger typisk 1.800–2.500 kWh, mens større familier kan nå op på 6.000+ kWh/år.`,
  },
  {
    num: 2,
    title: 'Sammenlign elleverandørerne',
    time: '3 minutter',
    icon: '🔍',
    content: `Brug vores prisberegner på forsiden til at se, hvad du ville betale hos de 5 billigste leverandører med dit faktiske forbrug. Vær opmærksom på:
- kWh-pris (den der svinger mest)
- Månedligt abonnement (kan gøre en leverandør dyrere end kWh-prisen indikerer)
- Binding (undgå binding hvis du vil have fleksibilitet)
- Fast pris vs. spotpris (spotpris er billigere over tid, men kræver aktiv brug)
- Grøn strøm (koster typisk lidt ekstra)`,
  },
  {
    num: 3,
    title: 'Tilmeld dig din nye leverandør',
    time: '5–10 minutter',
    icon: '✍️',
    content: `Gå til din valgte leverandørs hjemmeside og tilmeld dig online. Du skal bruge:
- Dit CPR-nummer (til identifikation)
- Din adresse og lejlighedsnummer
- Aflæsning af din elmåler (valgfri, men anbefales for nøjagtigt afregningsgrundlag)
- Ønsket startdato (lad som regel leverandøren bestemme)
Tilmeldingen tager typisk 5–10 minutter og kan gøres helt online. Du behøver ikke ringe eller møde op nogen steder.`,
  },
  {
    num: 4,
    title: 'Din nye leverandør klarer resten',
    time: 'Automatisk',
    icon: '⚡',
    content: `Når du har tilmeldt dig, sørger din nye elleverandør for:
- At sende opsigelse til din nuværende leverandør
- At koordinere overtagelsesdatoen med netselskabet
- At sende dig en bekræftelse på mail
Du behøver ikke kontakte din nuværende leverandør. Hele processen er automatiseret og reguleret af regler fra Energistyrelsen. Overtagelse sker typisk inden for 30 dage.`,
  },
  {
    num: 5,
    title: 'Aflæs din måler på overtagelsesdagen',
    time: '2 minutter',
    icon: '📍',
    content: `På den dag, din nye leverandør overtager leveringen, skal du aflæse din elmåler. De fleste netselskaber har fjernaflæsning, og du behøver ikke gøre noget manuelt. Men tjek gerne din mail — leverandøren informerer dig.
Du vil modtage en slutafregning fra din gamle leverandør for perioden frem til overtagelsen. Herefter betaler du kun til din nye leverandør.`,
  },
];

export default function SkiftElPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-900 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-800 text-emerald-300 text-sm px-4 py-2 rounded-full mb-6">
            <Zap size={14} className="text-amber-400" />
            5 minutter · Gratis · Ingen afbrydelse
          </div>
          <h1 className="text-4xl font-bold mb-5">
            Sådan skifter du elleverandør i 2025
          </h1>
          <p className="text-emerald-200 text-lg mb-6">
            Det er nemmere end du tror. Følg vores trin-for-trin guide og skift til den billigste
            elleverandør — uden at miste en eneste kilowatt strøm.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-emerald-200">
            <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-400" /> Det koster 0 kr</span>
            <span className="flex items-center gap-1.5"><Shield size={16} className="text-emerald-400" /> Ingen afbrydelse</span>
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-emerald-400" /> Tager 5 min.</span>
          </div>
        </div>
      </section>

      {/* Time overview */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 flex flex-wrap gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-emerald-500" />
            <span><strong>Total tid:</strong> Ca. 10–15 minutter</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-emerald-500" />
            <span><strong>Overtagelse:</strong> Inden for 30 dage</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-500" />
            <span><strong>Krav:</strong> CPR-nr. + adresse + NemID/MitID</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-500" />
            <span><strong>OBS:</strong> Tjek om du har binding hos nuværende</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Trin-for-trin guide</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-emerald-200 hidden md:block" />

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                {/* Circle */}
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg z-10 relative">
                    {step.num}
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5 flex-1 shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{step.icon}</span>
                      <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium shrink-0 border border-emerald-200">
                      <Clock size={12} />
                      {step.time}
                    </span>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {step.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended providers */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">De 3 billigste elleverandører lige nu</h2>
          <p className="text-gray-500 text-sm mb-6">Beregnet for 3.500 kWh/år.</p>

          <div className="space-y-4">
            {top3.map((p, i) => (
              <div
                key={p.slug}
                className={`flex items-center gap-4 rounded-xl border p-5 ${
                  i === 0 ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 ${
                  i === 0 ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}>{i + 1}</div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.description}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xl font-bold text-emerald-900">
                    {Math.round(calcAnnualCost(p, 3500)).toLocaleString('da-DK')} kr/år
                  </div>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0"
                >
                  Skift til {p.name}
                  <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-800"
            >
              Se alle elleverandører og prisberegner
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ / Content */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Spørgsmål om at skifte elleverandør</h2>

        <div className="space-y-6">
          {[
            {
              q: 'Mister jeg strøm, når jeg skifter elleverandør?',
              a: `Nej — du mister aldrig strøm, når du skifter elleverandør. Det skyldes, at det er dit netselskab (f.eks. Radius, SEAS-NVE eller TREFOR), der ejer og driver kablerne i dit område. De er uafhængige af din elleverandør. Skiftet handler kun om, hvem du betaler for selve strømsalget — ikke om den fysiske strømleverance.`,
            },
            {
              q: 'Hvad koster det at skifte elleverandør?',
              a: `Det er fuldstændigt gratis at skifte elleverandør. Der er ingen oprettelsesgebyr, ingen administrationsomkostninger og ingen gebyrer overhovedet — hverken hos din nye eller gamle leverandør. Det er reguleret ved lov. Den eneste undtagelse er, hvis du har en aftale med binding og vælger at forlade leverandøren inden udløb — her kan der være et opsigelsesgebyr, som varierer fra leverandør til leverandør.`,
            },
            {
              q: 'Hvor lang tid tager det at skifte?',
              a: `Selve tilmeldingen tager 5–10 minutter online. Herefter håndterer din nye leverandør al kommunikation med din gamle. Overtagelse af leverancen sker typisk inden for 30 dage. Du behøver ikke gøre noget aktivt ud over at tilmelde dig.`,
            },
            {
              q: 'Hvad har jeg brug for for at skifte?',
              a: `Du skal bruge dit CPR-nummer, din adresse og postnummer. I mange tilfælde kan du logge ind med MitID for at gøre processen hurtigere. Det er valgfrit at oplyse en aktuel måleraflæsning, men det anbefales for et præcist afregningsgrundlag ved leverandørskiftet.`,
            },
            {
              q: 'Kan jeg skifte fra spotpris til fast pris?',
              a: `Ja, det kan du altid — medmindre du har en bindingsaftale. Skiftet foregår på nøjagtig samme måde som et normalt leverandørskifte. Mange vælger fast pris for forudsigelighed og skifter til spotpris i perioder med historisk lave elpriser. Vi anbefaler at læse vores guide om fast vs. variabel elpris, inden du beslutter dig.`,
            },
            {
              q: 'Hvad sker der med min gamle leverandørs binding?',
              a: `Har du en bindingsaftale med din nuværende leverandør, skal du normalt overholde opsigelsesfristen eller betale et opsigelsesgebyr. Tjek din nuværende aftale for detaljerne. Mange leverandører har dog ingen binding, og du kan skifte frit når som helst. Brug altid vores sammenligningstabel til at se, hvilke leverandører der har binding, inden du tilmelder dig.`,
            },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{faq.q}</h3>
              <p className="text-gray-700 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Klar til at skifte og spare penge?</h2>
          <p className="text-emerald-200 mb-6">
            Brug vores prisberegner og find den billigste elleverandør for dit forbrug — det tager under et minut.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-amber-400 text-emerald-900 px-6 py-3 rounded-full font-bold text-lg hover:bg-amber-300 transition-colors"
          >
            Beregn din besparelse nu
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
