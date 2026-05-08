"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";

export function PremiumHome() {
  return (
    <div className="relative isolate overflow-x-clip">
      <SiteHeader
        navItems={[
          { href: "#approach", label: "Подход" },
          { href: "#formats", label: "Форматы" },
          { href: "/dashboard", label: "Карта" },
        ]}
      />

      <main>
        <section className="relative pb-20 pt-14 md:pb-28 md:pt-20">
          <div className="innera-hero-bloom pointer-events-none absolute inset-0 -z-[1]" aria-hidden />
          <div className="innera-container">
            <div className="grid grid-cols-12 gap-6 md:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="col-span-12 lg:col-span-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--subtle)]">
                  Психология · структура · приватность
                </p>
                <h1 className="innera-display innera-display--hero innera-hero-heading mt-8 text-[clamp(2.2rem,4.85vw,3.75rem)]">
                  <span className="block text-[var(--text)]">Спокойная ясность</span>
                  <span className="innera-gradient-text mt-2 block pb-[0.08em] sm:mt-3">
                    в вашем темпе
                  </span>
                </h1>
                <p className="mt-6 max-w-[40ch] text-[1.0625rem] font-normal leading-[1.72] tracking-[-0.01em] text-[var(--muted)]">
                  INNERA связывает карту паттернов, заметки о состоянии и мост к живой сессии. Типографика и ритмы
                  экрана настроены на мягкую концентрацию, а ключевые данные остаются под вашим контролем.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href="/start" className="innera-btn innera-btn-primary px-8 py-3.5">
                    Собрать карту состояния
                  </Link>
                  <Link href="/book" className="innera-btn innera-btn-secondary px-8 py-3.5">
                    Премиум-консультация
                  </Link>
                </div>

                <div id="approach" className="mt-14 grid gap-4 sm:grid-cols-3">
                  {[
                    { t: "Типографика", d: "чёткая шкала заголовков и текста" },
                    { t: "Сетка", d: "12 колонок и предсказуемый ритм" },
                    { t: "Свет", d: "спектральные акценты без перегруза" },
                  ].map((item) => (
                    <div key={item.t} className="innera-panel p-5">
                      <p className="text-[0.78rem] font-semibold tracking-[0.2em] text-[var(--subtle)]">{item.t}</p>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted)]">{item.d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative border-t border-[rgba(255,255,255,0.07)] py-16 md:py-22">
          <div className="innera-container">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div className="max-w-[46ch]">
                <p className="innera-eyebrow text-[rgba(248,245,248,0.55)]">
                  Что вы получаете
                </p>
                <h2 className="innera-display mt-6 text-[clamp(1.45rem,2.4vw,2.05rem)] font-semibold leading-[1.1]">
                  Ясную картину того, что с вами происходит.
                </h2>
                <p className="mt-5 text-[1.02rem] leading-[1.7] text-[var(--muted)]">
                  Вы отмечаете состояние, видите повторяющиеся паттерны и приходите на сессию с контекстом, а не с
                  ощущением «я не знаю, с чего начать».
                </p>
              </div>

              <div className="grid w-full gap-4 sm:grid-cols-2 md:max-w-[460px]">
                {[
                  { t: "Карта состояния", d: "сводит фрагменты в понятную структуру" },
                  { t: "Мини-инсайты", d: "короткие формулировки, без перегруза" },
                  { t: "Дневник", d: "фиксирует изменения и триггеры" },
                  { t: "Переход к сессии", d: "вы приносите ясный запрос и детали" },
                ].map((item) => (
                  <div key={item.t} className="innera-panel p-5">
                    <p className="text-[0.8rem] font-semibold tracking-[0.2em] text-[var(--subtle)]">{item.t}</p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted)]">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="formats" className="py-16 md:py-22">
          <div className="innera-container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[52ch]">
                <p className="innera-eyebrow text-[rgba(248,245,248,0.55)]">Форматы сопровождения</p>
                <h2 className="innera-display mt-4 text-[clamp(1.35rem,2.3vw,2.0rem)] font-semibold leading-[1.12]">
                  Траектории в одной <span className="innera-gradient-text">световой среде.</span>
                </h2>
              </div>
              <Link href="/full" className="innera-btn innera-btn-secondary px-7 py-3.5">
                Посмотреть полную структуру
              </Link>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {[
                { name: "Clarity", note: "ясность входа", price: "90 000 KRW" },
                { name: "Deep Insight", note: "структура паттерна", price: "200 000 KRW" },
                { name: "Emotional Reset", note: "перекалибровка", price: "350 000 KRW", featured: true },
                { name: "Personal Transformation", note: "долгая дуга", price: "560 000 KRW" },
              ].map((p) => (
                <motion.div
                  key={p.name}
                  whileHover={{ y: -3 }}
                  className={[
                    p.featured ? "innera-surface-card--featured" : "",
                    "innera-surface-card rounded-[24px] border",
                  ].join(" ")}
                >
                  <div className="p-6">
                    {p.featured ? (
                      <div className="inline-flex items-center rounded-full border border-[rgba(244,200,220,0.22)] bg-[rgba(244,200,220,0.10)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text)]">
                        популярно
                      </div>
                    ) : null}
                    <p className="mt-4 text-[0.78rem] font-semibold tracking-[0.18em] text-[var(--subtle)]">
                      {p.note}
                    </p>
                    <h3 className="innera-display mt-3 text-[1.6rem] font-semibold leading-[1.05]">{p.name}</h3>
                    <p className="mt-3 text-[1.05rem] leading-relaxed text-[var(--muted)]">{p.price}</p>
                    <div className="mt-6 h-px w-full bg-[rgba(255,255,255,0.08)]" />
                    <Link href="/book" className="innera-btn innera-btn-secondary mt-6 w-full justify-center px-5 py-3 text-sm">
                      Выбрать траекторию
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

