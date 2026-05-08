"use client";

import { motion } from "framer-motion";

interface InsightTickerProps {
  lines: string[];
}

export function InsightTicker({ lines }: InsightTickerProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {lines.map((line, i) => (
        <motion.div
          key={`${i}-${line.slice(0, 12)}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i }}
          className="innera-panel innera-panel--quiet px-4 py-3 text-sm text-[var(--text)]"
        >
          <span className="mr-2 inline-block bg-gradient-to-r from-[#f4c8dc] to-[#b48cff] bg-clip-text font-medium text-transparent">↗</span>
          {line}
        </motion.div>
      ))}
    </div>
  );
}
