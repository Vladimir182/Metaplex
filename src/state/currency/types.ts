export enum Currency {
  USD = "usd",
  EUR = "eur",
  SOL = "sol",
}
export const CURRENCY_TRANSLATE: Record<Currency, string> = {
  [Currency.SOL]: "solana",
  [Currency.USD]: "usd",
  [Currency.EUR]: "eur",
};

export interface ConversionRatePair {
  from: Currency;
  to: Currency;
  rate: number;
}
