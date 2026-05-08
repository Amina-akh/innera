"use client";

import { motion } from "framer-motion";
import type { NumerologyResult } from "@/types/matrix";
import { getArchetypeByNumber } from "@/modules/psychology/interpretations";

export function EmotionalSpectrum({ numerology }: { numerology: NumerologyResult }) {
  const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({
    n,
    v: numerology.frequencies[n as keyof typeof numerology.frequencies],
    label: getArchetypeByNumber(n).label.split(" ")[0],
  }));
  const max = Math.max(1, ...entries.map((e) => e.v));

  return (
    <div className="space-y-4">
      <p className="innera-eyebrow text-[var(--muted)]">Распределение акцентов</p>
      <div className="flex h-40 items-end gap-1 sm:gap-1.5">
        {entries.map((e, i) => (
          <motion.div
            key={e.n}
            initial={{ height: 0 }}
            animate={{ height: `${(e.v / max) * 100}%` }}
            transition={{ delay: 0.04 * i, type: "spring", stiffness: 120, damping: 18 }}
            className="flex min-h-[6px] flex-1 flex-col justify-end rounded-t-md bg-gradient-to-t from-[var(--accent)]/25 to-[var(--warm)]/45"
            title={`${e.label}: ${e.v}`}
          />
        ))}
      </div>
      <div className="flex justify-between gap-1 text-[9px] uppercase tracking-tight text-[var(--subtle)]">
        {entries.map((e) => (
          <span key={e.n} className="flex-1 text-center">
            {e.n}
          </span>
        ))}
      </div>
    </div>
  );
}
