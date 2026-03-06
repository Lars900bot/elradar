export type Provider = {
  name: string;
  slug: string;
  pricePerKwh: number;
  monthlyFee: number;
  green: boolean | 'optional';
  greenLabel: string;
  binding: string;
  bindingMonths: number;
  url: string;
  rating: number;
  tag?: string;
  description: string;
  isSpotpris: boolean;
  spotprisOverhead?: number;
};

// Assume spotpris ~0.85 kr/kWh for calculation
export const ASSUMED_SPOTPRIS = 0.85;

export const providers: Provider[] = [
  {
    name: 'Vindstød',
    slug: 'vindstoed',
    pricePerKwh: ASSUMED_SPOTPRIS + 0.01,
    monthlyFee: 29,
    green: true,
    greenLabel: '100% vindenergi',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://vindstoed.dk',
    rating: 4.6,
    tag: 'Bedst anmeldt',
    description: 'Spotpris + 0,01 kr/kWh overhead. Kun grøn vindstrøm.',
    isSpotpris: true,
    spotprisOverhead: 0.01,
  },
  {
    name: 'E.ON',
    slug: 'eon',
    pricePerKwh: 0.28,
    monthlyFee: 35,
    green: 'optional',
    greenLabel: 'Valgfri',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://eon.dk',
    rating: 4.3,
    tag: 'Billigst fast pris',
    description: 'Fast lav pris med valgfri grøn strøm.',
    isSpotpris: false,
  },
  {
    name: 'OK',
    slug: 'ok',
    pricePerKwh: 0.27,
    monthlyFee: 39,
    green: 'optional',
    greenLabel: 'Valgfri',
    binding: '6 måneder',
    bindingMonths: 6,
    url: 'https://ok.dk',
    rating: 4.1,
    description: 'Laveste faste kWh-pris, men 6 måneders binding.',
    isSpotpris: false,
  },
  {
    name: 'Norlys',
    slug: 'norlys',
    pricePerKwh: 0.29,
    monthlyFee: 39,
    green: true,
    greenLabel: 'Grøn strøm',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://norlys.dk',
    rating: 4.5,
    tag: 'Populær',
    description: 'Stor dansk leverandør med grøn strøm og ingen binding.',
    isSpotpris: false,
  },
  {
    name: 'EWII',
    slug: 'ewii',
    pricePerKwh: 0.30,
    monthlyFee: 45,
    green: true,
    greenLabel: 'Grøn strøm',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://ewii.dk',
    rating: 4.4,
    description: 'Fynsk energiselskab med grøn strøm.',
    isSpotpris: false,
  },
  {
    name: 'NRGi',
    slug: 'nrgi',
    pricePerKwh: 0.30,
    monthlyFee: 42,
    green: 'optional',
    greenLabel: 'Valgfri',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://nrgi.dk',
    rating: 4.2,
    description: 'Andelsselskab med konkurrencedygtige priser.',
    isSpotpris: false,
  },
  {
    name: 'Ørsted',
    slug: 'orsted',
    pricePerKwh: 0.31,
    monthlyFee: 49,
    green: true,
    greenLabel: '100% grøn',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://orsted.dk',
    rating: 4.4,
    description: 'Verdens største offshore vindmølle-selskab.',
    isSpotpris: false,
  },
  {
    name: 'Radius/Clever',
    slug: 'radius-clever',
    pricePerKwh: ASSUMED_SPOTPRIS + 0.02,
    monthlyFee: 0,
    green: 'optional',
    greenLabel: 'Valgfri',
    binding: 'Ingen',
    bindingMonths: 0,
    url: 'https://radiuselnet.dk',
    rating: 4.2,
    description: 'Spotpris + 0,02 kr/kWh overhead. Intet abonnement.',
    isSpotpris: true,
    spotprisOverhead: 0.02,
  },
];

export function calcAnnualCost(provider: Provider, kwhPerYear: number): number {
  return provider.pricePerKwh * kwhPerYear + provider.monthlyFee * 12;
}

export function getSortedByPrice(kwhPerYear: number): Provider[] {
  return [...providers].sort(
    (a, b) => calcAnnualCost(a, kwhPerYear) - calcAnnualCost(b, kwhPerYear)
  );
}
