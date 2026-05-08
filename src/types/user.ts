import type { NumerologyResult } from "@/types/matrix";

export type PlanTier = "free" | "premium";

export interface JournalEntry {
  id: string;
  text: string;
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  contact: string;
  birthDate: string;
  gender?: string;
  goal: string;
  /** Внутренний аналитический слой; не позиционируем как основу продукта */
  numerology: NumerologyResult;
  plan: PlanTier;
  createdAt: string;
}
