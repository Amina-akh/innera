"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

export function LandingHero() {
  return (
    <section className="relative border-b border-[var(--glass-border)] pb-[var(--space-section)] pt-16 md:pb-28 md:pt-24">
      <div className="innera-container grid items-start gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.75fr)] lg:gap-20">
        <motion.div {...fadeUp} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
          <p className="innera-eyebrow mb-7 text-[var(--accent)]">Психотерапия · самоосознанность</p>
          <h1 className="innera-display innera-display--hero innera-hero-heading text-[clamp(2.35rem,5.75vw,3.72rem)] font-semibold text-[var(--text)]">
            Пространство, где внутреннее состояние становится{" "}
            <span className="innera-gradient-text">узнаваемым и переживаемым</span>
            <span className="text-[var(--text)]">, без эзотерики.</span>
          </h1>
          <div className="innera-hairline-spectral mt-10 max-w-md" aria-hidden />
          <p className="mt-10 max-w-xl text-[1.0625rem] leading-[1.75] text-[var(--muted)]">
            Психологическая работа с эмоциональными сценариями, конфликтами и опорой. Цифровой слой INNERA даёт
            структуру и аналитику; числовой контекст присутствует только как вспомогательный язык паттернов внутри
            живого разбора.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Link href="/start" className="innera-btn innera-btn-primary px-8 py-3.5 text-[15px]">
              Мини-профиль состояния
            </Link>
            <Link href="#formats" className="innera-btn innera-btn-secondary px-8 py-3.5 text-[15px]">
              Форматы сопровождения
            </Link>
          </div>
          <ul className="mt-16 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Ясная подача", d: "интеллектуально и без давления" },
              { t: "Глубина запроса", d: "состояния и сценарии, не быстрые рецепты" },
              { t: "Данные в службу смыслу", d: "аналитика для ясности и диалога" },
            ].map((row) => (
              <li key={row.t} className="innera-panel px-5 py-5">
                <p className="text-[14px] font-medium text-[var(--text)]">{row.t}</p>
                <p className="mt-2 text-[13px] leading-snug text-[var(--subtle)]">{row.d}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lg:sticky lg:top-28"
        >
          <div className="innera-surface-card p-8 md:p-10">
            <p className="innera-eyebrow text-[var(--muted)]">Как это ощущается</p>
            <p className="innera-display mt-6 text-[1.45rem] font-medium leading-snug text-[var(--text)] md:text-[1.55rem]">
              Спокойный темп, уважение к ритму и языку телесного опыта.
            </p>
            <p className="mt-6 text-[15px] leading-[1.7] text-[var(--muted)]">
              Без обещаний «исцеления за сессию». Есть внимание, точная диагностика повторов и мягкая работа с тем, что
              управляет реакциями.
            </p>
            <div className="my-8 h-px w-full bg-[var(--hairline)] opacity-90" />
            <p className="innera-eyebrow text-[var(--subtle)]">Последовательность</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)]">
              Состояние → сценарий → смысл → действие, без насилия над собой.
            </p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
