"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { saveTodayMood, type MoodValue } from "@/lib/storage";

const labels: Record<MoodValue, string> = {
  1: "Тяжело",
  2: "Сложно",
  3: "Ровно",
  4: "Светлее",
  5: "Ясно",
};

export function MoodStrip() {
  const [picked, setPicked] = useState<MoodValue | null>(null);

  function pick(v: MoodValue) {
    setPicked(v);
    saveTodayMood(v);
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--surface)] p-4">
      <p className="innera-eyebrow mb-3 text-[var(--muted)]">Фон дня</p>
      <p className="mb-4 text-sm text-[var(--muted)]">Одним жестом: как вы сейчас, без объяснений.</p>
      <div className="flex flex-wrap gap-2">
        {([1, 2, 3, 4, 5] as const).map((v) => (
          <motion.button
            key={v}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => pick(v)}
            className={`rounded-full border px-3 py-2 text-xs transition-colors ${
              picked === v
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                : "border-[var(--glass-border)] text-[var(--muted)] hover:border-[var(--accent)]/40"
            }`}
          >
            {labels[v]}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
