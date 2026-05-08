/** Display-only approximate rate for international reference (not a live FX feed). */
const KRW_PER_USD_REF = 1350;

export function formatKrw(amount: number): string {
  const spaced = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
  return `₩${spaced}`;
}

export function approxUsdLabel(krw: number): string {
  const usd = Math.max(1, Math.round(krw / KRW_PER_USD_REF));
  return `≈ $${usd.toLocaleString("en-US")}\u00a0USD`;
}
