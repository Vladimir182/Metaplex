import { ConversionRatePair, Currency } from "@metaplex/js";

export function convertCurrency(
  sol: number | null,
  rate: ConversionRatePair[] | null,
  from: Currency,
  to: Currency
) {
  if (!sol || !rate) {
    return null;
  }

  const r = rate.find((r) => r.from === from && r.to === to);

  if (!r) {
    return null;
  }

  return sol * r.rate;
}
