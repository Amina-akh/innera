export const CURRENCIES = ["USD", "EUR", "RUB", "KRW"] as const;
export type CurrencyCode = (typeof CURRENCIES)[number];

export const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  RUB: "₽ RUB",
  USD: "$ USD",
  EUR: "€ EUR",
  KRW: "₩ KRW",
};

/** Display-only reference rates (not a live FX feed). */
const RUB_PER_USD = 90;
const KRW_PER_USD = 1350;
const EUR_PER_USD = 0.92;

const TO_USD: Record<CurrencyCode, number> = {
  RUB: 1 / RUB_PER_USD,
  USD: 1,
  EUR: 1 / EUR_PER_USD,
  KRW: 1 / KRW_PER_USD,
};

export type Money = {
  amount: number;
  currency: CurrencyCode;
};

export function convertMoney(money: Money, to: CurrencyCode): number {
  const usd = money.amount * TO_USD[money.currency];
  return usd / TO_USD[to];
}

function formatNumber(value: number, currency: CurrencyCode): string {
  const rounded =
    currency === "KRW" ? Math.round(value) : currency === "RUB" ? Math.round(value) : Math.round(value * 100) / 100;

  const spaced = Math.round(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");

  switch (currency) {
    case "RUB":
      return `${spaced}\u00a0₽`;
    case "USD":
      return `$${rounded.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
    case "EUR":
      return `€${rounded.toLocaleString("de-DE", { maximumFractionDigits: 0 })}`;
    case "KRW":
      return `₩${spaced}`;
  }
}

export function formatMoney(money: Money, displayCurrency: CurrencyCode): string {
  if (money.amount === 0) {
    return displayCurrency === "RUB" ? "0\u00a0₽" : formatNumber(0, displayCurrency);
  }
  return formatNumber(convertMoney(money, displayCurrency), displayCurrency);
}

export function formatMoneyWithPeriod(
  money: Money,
  displayCurrency: CurrencyCode,
  period?: "month"
): string {
  const base = formatMoney(money, displayCurrency);
  return period === "month" ? `${base} / мес` : base;
}

export function isValidCurrency(value: string): value is CurrencyCode {
  return (CURRENCIES as readonly string[]).includes(value);
}

export const DEFAULT_CURRENCY: CurrencyCode = "USD";
export const CURRENCY_STORAGE_KEY = "innera-currency";
