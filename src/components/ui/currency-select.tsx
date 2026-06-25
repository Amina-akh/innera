"use client";

import { CURRENCIES, CURRENCY_LABELS, type CurrencyCode } from "@/lib/currency";
import { useCurrency } from "@/context/currency-context";

type CurrencySelectProps = {
  className?: string;
  compact?: boolean;
};

export function CurrencySelect({ className = "", compact = false }: CurrencySelectProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className={`inline-flex items-center gap-2 ${className}`.trim()}>
      {!compact ? (
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--subtle)]">Валюта</span>
      ) : null}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="innera-currency-select"
        aria-label="Выбор валюты"
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {CURRENCY_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
