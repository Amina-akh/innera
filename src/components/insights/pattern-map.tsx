"use client";

import { motion } from "framer-motion";
import type { MatrixGrid as MatrixGridType } from "@/types/matrix";

const rowLabels = ["Импульс и контакт", "Опора и адаптация", "Смысл и интеграция"];
const colLabels = ["Ясность", "Гибкость", "Выражение"];

interface PatternMapProps {
  matrix: MatrixGridType;
}

function intensityClass(value: number) {
  if (value === 0) return "innera-pattern-empty";
  if (value === 1) return "innera-pattern-low";
  if (value === 2) return "innera-pattern-mid";
  return "innera-pattern-high";
}

export function PatternMap({ matrix }: PatternMapProps) {
  const flat = matrix.flat();

  return (
    <div className="space-y-4">
      <div className="hidden grid-cols-[100px_repeat(3,1fr)] gap-2 text-[10px] uppercase tracking-[0.14em] text-[var(--subtle)] md:grid">
        <span />
        {colLabels.map((c) => (
          <span key={c} className="text-center">
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-[minmax(0,88px)_1fr] gap-3 md:grid-cols-[120px_1fr]">
        <div className="flex flex-col justify-around gap-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--subtle)]">
          {rowLabels.map((r) => (
            <span key={r} className="leading-tight">
              {r}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {flat.map((value, index) => (
            <motion.div
              key={`cell-${index}`}
              className={`innera-pattern-cell ${intensityClass(value)}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.04 }}
              whileHover={{ y: -2 }}
            >
              <span className="text-[9px] text-[var(--subtle)]">слой {index + 1}</span>
              <span className="font-[family-name:var(--font-display)] text-xl font-medium tabular-nums">{value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-[var(--muted)]">
        Это карта повторяющихся акцентов: не судьба, а данные для рефлексии. Чем выше число в ячейке, тем устойчивее паттерн в этой области
        личности.
      </p>
    </div>
  );
}
