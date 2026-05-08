"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PropsWithChildren } from "react";

interface PremiumGateProps extends PropsWithChildren {
  locked?: boolean;
  href?: string;
  ctaLabel?: string;
}

export function PremiumGate({ locked, children, href = "/book", ctaLabel = "Открыть полный разбор" }: PremiumGateProps) {
  if (!locked) return <>{children}</>;

  return (
    <div className="innera-blur-locked rounded-[var(--radius-lg)] border border-[var(--glass-border)]">
      <div className="relative z-[1] p-6 opacity-[0.42]">{children}</div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="innera-eyebrow text-[var(--text)]/90">Полная аналитика</p>
        <p className="max-w-sm text-sm text-[var(--muted)]">
          Глубокий разбор сценариев, совместимости и персональных рекомендаций в сессии с специалистом или полном доступе.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href={href} className="innera-btn innera-btn-primary">
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
