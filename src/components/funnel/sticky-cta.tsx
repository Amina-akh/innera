"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function StickyCtaBar() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-[55] border-t border-[var(--glass-border)] bg-[rgba(12,13,15,0.82)] px-4 py-3 backdrop-blur-xl md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 28 }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <p className="text-xs text-[var(--muted)]">Глубже в диалоге со специалистом</p>
        <Link href="/book" className="innera-btn innera-btn-primary shrink-0 px-4 py-2 text-xs">
          Записаться
        </Link>
      </div>
    </motion.div>
  );
}
