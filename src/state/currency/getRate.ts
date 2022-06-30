import { loadExtraContent } from "sdk/createNft";

import { ConversionRatePair, Currency, CURRENCY_TRANSLATE } from "./types";

export async function getRate(
  from: Currency | Currency[],
  to: Currency | Currency[]
) {
  const fromArray = typeof from === "string" ? [from] : from;
  const toArray = typeof to === "string" ? [to] : to;
  const fromIds = fromArray
    .map((currency) => CURRENCY_TRANSLATE[currency])
    .join(",");
  const toIds = toArray
    .map((currency) => CURRENCY_TRANSLATE[currency])
    .join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromIds}&vs_currencies=${toIds}`;
  const data = await loadExtraContent<Record<string, Record<string, number>>>(
    url,
    true
  );

  return fromArray.reduce<ConversionRatePair[]>(
    (previousPairs, fromCurrency) => {
      return [
        ...previousPairs,
        ...toArray.map((toCurrency) => ({
          from: fromCurrency,
          to: toCurrency,
          rate:
            data?.[CURRENCY_TRANSLATE[fromCurrency]][
              CURRENCY_TRANSLATE[toCurrency]
            ] || 0,
        })),
      ];
    },
    []
  );
}
