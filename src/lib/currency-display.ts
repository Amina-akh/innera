import { formatMoney, type CurrencyCode } from "@/lib/currency";

export function formatKrw(amount: number): string {
  return formatMoney({ amount, currency: "KRW" }, "KRW");
}

export function formatTherapyPrice(krw: number, displayCurrency: CurrencyCode): string {
  return formatMoney({ amount: krw, currency: "KRW" }, displayCurrency);
}
