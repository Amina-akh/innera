"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { LandingHero } from "@/components/landing/landing-hero";
import {
  LandingPainBridge,
  LandingCaseStrip,
  LandingStoriesSection,
  LandingTestimonialsRibbon,
  LandingOutcomesSection,
} from "@/components/landing/landing-narrative";
import { LandingPricing } from "@/components/landing/landing-pricing";

const fade = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

export function LandingPage() {
  return (
    <div className="relative isolate overflow-x-clip">
      <div className="innera-hero-bloom pointer-events-none absolute inset-0 top-0 -z-[1] h-[min(90vh,920px)] max-h-[880px]" aria-hidden />

      <SiteHeader
        navItems={[
          { href: "#recognition", label: "Состояния" },
          { href: "#formats", label: "Форматы" },
          { href: "/products", label: "Продукты" },
          { href: "/start", label: "Старт" },
        ]}
        secondaryCta={{ href: "/start", label: "Войти" }}
        primaryCta={{ href: "/start", label: "Собрать карту" }}
      />

      <LandingHero />

      <LandingPainBridge />

      <LandingPricing />

      <LandingCaseStrip />

      <LandingStoriesSection />

      <LandingTestimonialsRibbon />

      <LandingOutcomesSection />

      <section className="innera-container pb-28 pt-12">
        <motion.div
          {...fade}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="innera-surface-card mx-auto max-w-3xl px-8 py-14 text-center md:px-16"
        >
          <p className="innera-eyebrow text-[var(--accent)]">Следующий шаг</p>
          <h2 className="innera-display mx-auto mt-5 max-w-xl text-[1.65rem] font-medium leading-tight text-[var(--text)] md:text-3xl">
            Сначала карта состояния. Затем живой диалог, если откликается.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-relaxed text-[var(--muted)]">
            Несколько минут на профиль: структура переживаний без обязательств и без мистики.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/start" className="innera-btn innera-btn-primary px-10 py-3.5 text-[15px]">
              Собрать профиль
            </Link>
            <Link href="/book" className="innera-btn innera-btn-secondary px-10 py-3.5 text-[15px]">
              Записаться
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-[var(--glass-border)] py-14 text-center">
        <p className="text-[13px] text-[var(--subtle)]">
          INNERA · digital psychology experience · не медицинский сервис · не замена экстренной помощи
        </p>
      </footer>
    </div>
  );
}
