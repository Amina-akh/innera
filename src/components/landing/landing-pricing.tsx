"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCurrency } from "@/context/currency-context";
import { formatTherapyPrice } from "@/lib/currency-display";
import { CurrencySelect } from "@/components/ui/currency-select";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  sessions: string;
  krw: number;
  anchorKrw?: number;
  priceNote?: string;
  blurb: string;
  featured?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    id: "clarity",
    name: "Clarity Session",
    tagline: "Точка входа",
    sessions: "1 сессия",
    krw: 90_000,
    anchorKrw: 140_000,
    priceNote: "при входе в траекторию сопровождения",
    blurb:
      "Одна глубокая встреча, чтобы почувствовать темп, безопасность и рамку терапии и назвать то, что ваша система по-настоящему просит поддержать, без спешного сценария.",
    cta: "Запросить слот",
  },
  {
    id: "deep-insight",
    name: "Deep Insight",
    tagline: "Структура паттерна",
    sessions: "3 сессии",
    krw: 200_000,
    blurb:
      "Распаковываем повторяющийся сценарий и его «эмоциональную экономику»: стыд, страх, контроль. Вы выходите с картой напряжений и первой ясностью, где возвращается выбор.",
    cta: "Выбрать траекторию",
  },
  {
    id: "emotional-reset",
    name: "Emotional Reset",
    tagline: "Перекалибровка",
    sessions: "6 сессий",
    krw: 350_000,
    featured: true,
    blurb:
      "Когда «маска» стоит слишком дорого, полезна мягкая перезагрузка реактивности, сна и самоотношения через тело и чувство, а не насилие дисциплиной.",
    cta: "Начать цикл",
  },
  {
    id: "personal-transformation",
    name: "Personal Transformation",
    tagline: "Долгая дуга",
    sessions: "12–16 сессий",
    krw: 560_000,
    blurb:
      "Для запросов масштаба жизни: отношения, работа, смысл. Нужно достаточно пространства, чтобы меняться не симптомно, а по-настоящему, с преемственностью, а не с прожигом.",
    cta: "Согласовать программу",
  },
];

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  const { currency } = useCurrency();
  const cls = plan.featured ? "innera-surface-card innera-surface-card--featured" : "innera-surface-card";

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: 0.05 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`${cls} flex h-full flex-col p-7 md:p-8`}
    >
      {plan.featured ? (
        <div className="mb-5 inline-flex w-fit items-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent-soft)]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
          Часто выбирают
        </div>
      ) : null}
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--subtle)]">{plan.tagline}</p>
      <h3 className="innera-display mt-3 text-2xl font-medium text-[var(--text)] md:text-[1.6rem]">{plan.name}</h3>
      <p className="mt-2 text-[13px] text-[var(--muted)]">{plan.sessions}</p>
      <div className="mt-6 border-b border-[var(--glass-border)] pb-6">
        <p className="flex flex-wrap items-baseline gap-2">
          {plan.anchorKrw != null ? (
            <span className="innera-price-anchor-line text-lg text-[var(--muted)]">
              {formatTherapyPrice(plan.anchorKrw, currency)}
            </span>
          ) : null}
          <span className="innera-display text-3xl font-medium tracking-tight text-[var(--text)] md:text-[2rem]">
            {formatTherapyPrice(plan.krw, currency)}
          </span>
        </p>
        {plan.priceNote ? <p className="mt-1 text-xs text-[var(--subtle)]">{plan.priceNote}</p> : null}
      </div>
      <p className="mt-6 flex-1 text-[15px] leading-relaxed text-[var(--muted)]">{plan.blurb}</p>
      <Link
        href="/book"
        className={
          plan.featured
            ? "innera-btn innera-btn-primary mt-8 w-full justify-center py-3.5 text-[15px]"
            : "innera-btn innera-btn-secondary mt-8 w-full justify-center py-3.5 text-[15px]"
        }
      >
        {plan.cta}
      </Link>
    </motion.article>
  );
}

export function LandingPricing() {
  const { currency } = useCurrency();
  const anchorSession = 140_000;

  return (
    <section
      id="formats"
      className="scroll-mt-28 border-t border-[var(--glass-border)] py-[var(--space-section)]"
    >
      <div className="innera-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="innera-eyebrow text-[var(--accent)]">Форматы сопровождения</p>
            <h2 className="innera-display mt-5 text-[clamp(1.75rem,4vw,2.5rem)] font-medium leading-[1.12] text-[var(--text)]">
              Последовательность и глубина — в выбранной валюте.
            </h2>
            <p className="mt-8 text-[1.0625rem] leading-[1.7] text-[var(--muted)]">
              Каждый пакет задаёт смысловую дугу работы. Аналитический слой INNERA подключается по запросу внутри живого
              разбора.
            </p>
          </div>
          <CurrencySelect />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="innera-panel innera-panel--xl mt-12 flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:px-10"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--subtle)]">Якорь</p>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              Сессия вне программы:{" "}
              <span className="font-medium text-[var(--text)]">
                {formatTherapyPrice(anchorSession, currency)}
              </span>
            </p>
          </div>
          <p className="max-w-sm text-[13px] leading-relaxed text-[var(--subtle)] md:text-right">
            В пакете сохраняется преемственность внимания и сопровождения между встречами.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {plans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--glass-border)] pt-10 sm:flex-row">
          <p className="text-[13px] text-[var(--subtle)]">
            Intensive Support и ретейнеры по запросу · INNERA не является медицинским сервисом
          </p>
          <Link href="/products" className="innera-btn innera-btn-secondary px-6 py-3 text-sm">
            Цифровые продукты
          </Link>
        </div>
      </div>
    </section>
  );
}
