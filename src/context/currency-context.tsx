"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  type CurrencyCode,
  isValidCurrency,
} from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const listeners = new Set<() => void>();

function emitCurrencyChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readStoredCurrency(): CurrencyCode {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  return stored && isValidCurrency(stored) ? stored : DEFAULT_CURRENCY;
}

function getServerSnapshot(): CurrencyCode {
  return DEFAULT_CURRENCY;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(subscribe, readStoredCurrency, getServerSnapshot);

  const setCurrency = useCallback((next: CurrencyCode) => {
    localStorage.setItem(CURRENCY_STORAGE_KEY, next);
    emitCurrencyChange();
  }, []);

  const value = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
