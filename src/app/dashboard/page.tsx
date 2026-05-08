"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { PatternMap } from "@/components/insights/pattern-map";
import { MoodStrip } from "@/components/insights/mood-strip";
import { JournalPanel } from "@/components/insights/journal-panel";
import { InsightTicker } from "@/components/insights/insight-ticker";
import { EmotionalSpectrum } from "@/components/insights/emotional-spectrum";
import { PremiumGate } from "@/components/funnel/premium-gate";
import { FloatingBookButton } from "@/components/funnel/floating-book-button";
import { StickyCtaBar } from "@/components/funnel/sticky-cta";
import { Card } from "@/components/ui/card";
import { loadProfile, setPlan } from "@/lib/storage";
import {
  buildPersonalityInsights,
  getArchetypeByNumber,
  getResourceStabilityLabel,
  getClosenessPatternLabel,
  getStressAxisNarrative,
} from "@/modules/psychology/interpretations";

function AiReflectionBlock({ text }: { text: string }) {
  return (
    <div className="innera-panel innera-panel--quiet relative overflow-hidden p-5 pl-6">
      <span
        className="absolute bottom-0 left-0 top-0 w-[3px] rounded-full bg-gradient-to-b from-[#f4c8dc] to-[#8f6dff]"
        aria-hidden
      />
      <p className="innera-eyebrow mb-3 text-[var(--muted)]">Рефлексия INNERA</p>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{text}</p>
    </div>
  );
}

export default function DashboardPage() {
  const profile = useMemo(() => loadProfile(), []);
  const insights = profile ? buildPersonalityInsights(profile) : null;
  const core = profile ? getArchetypeByNumber(profile.numerology.lifePath) : null;
  const isPremium = profile?.plan === "premium";

  if (!profile || !insights || !core) {
    return (
      <AppShell title="Карта состояния" subtitle="Профиль ещё не создан. Начните с мини-анализа.">
        <section className="innera-container pb-24">
          <Card className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <p className="text-[var(--muted)]">Здесь появится ваша авторская карта внутреннего состояния.</p>
            <Link href="/start" className="innera-btn innera-btn-primary shrink-0">
              Пройти онбординг
            </Link>
          </Card>
        </section>
      </AppShell>
    );
  }

  const freeInsights = insights.microInsights.slice(0, 3);
  const hookLines = [
    "Вы часто берёте на себя эмоциональную ответственность за других, даже когда об этом не просили.",
    getStressAxisNarrative(profile.numerology),
    "Сейчас полезно снижать шум и возвращать телу предсказуемые ритуалы сна и питания.",
  ];

  return (
    <AppShell
      title={`${profile.name.trim()}, это ваш профиль сегодня`}
      subtitle={`Запрос: ${profile.goal}. Карта построена на авторской модели INNERA для осознанности и работы со специалистом.`}
    >
      <section className="innera-container space-y-10 pb-32">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card className="innera-card-elevated p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="innera-eyebrow text-[var(--muted)]">Опорный профиль</p>
                <p className="innera-display mt-2 text-3xl text-[var(--text)]">{core.label}</p>
                <p className="mt-3 max-w-prose text-sm text-[var(--muted)]">{insights.coreSummary}</p>
              </div>
              <div className="rounded-2xl border border-[var(--glass-border)] px-5 py-3 text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--subtle)]">Индекс ясности</p>
                <p className="innera-display text-4xl text-[var(--warm)]">{profile.numerology.lifePath}</p>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <MoodStrip />
            <AiReflectionBlock
              text={`Исходя из вашей карты и запроса, фокус недели: ${profile.goal.toLowerCase().includes("тревог") ? "мягкое снижение фона тревоги через предсказуемость" : "связь между телом и границами без самокритики"}. Это не диагноз, а направление для размышления.`}
            />
          </div>
        </div>

        <div className="innera-scroll-story scroll-mt-28">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="innera-display text-2xl text-[var(--text)]">Карта паттернов</h2>
            <span className="innera-pill innera-pill--spectral">слой данных</span>
          </div>
          <Card className="p-6 md:p-8">
            <PatternMap matrix={profile.numerology.matrix} />
          </Card>
        </div>

        <div>
          <h2 className="innera-display mb-4 text-2xl text-[var(--text)]">Мини-инсайты</h2>
          <InsightTicker lines={freeInsights} />
          <p className="mt-4 text-xs text-[var(--subtle)]">
            Бесплатно: три уточнения из полной аналитики. Разбор сценариев и теней в полном доступе или на сессии.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 md:p-8">
            <h3 className="innera-display text-xl text-[var(--text)]">Эмоциональный спектр</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">Визуализация частоты акцентов по слоям модели.</p>
            <div className="mt-8">
              <EmotionalSpectrum numerology={profile.numerology} />
            </div>
          </Card>

          <Card className="innera-card-elevated p-6 md:p-8">
            <p className="innera-eyebrow mb-3 text-[var(--muted)]">Тонкие сигналы</p>
            <ul className="space-y-3 text-sm text-[var(--muted)]">
              {hookLines.map((line) => (
                <li key={line.slice(0, 24)} className="flex gap-2">
                  <span className="font-semibold text-[var(--accent)]">·</span>
                  {line}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <PremiumGate locked={!isPremium}>
          <div className="space-y-6 p-2">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <p className="innera-eyebrow text-[var(--muted)]">Сильные стороны</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{insights.strengthsBlock}</p>
              </Card>
              <Card className="p-6">
                <p className="innera-eyebrow text-[var(--muted)]">Скрытые напряжения</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{insights.hiddenTension}</p>
              </Card>
              <Card className="p-6">
                <p className="innera-eyebrow text-[var(--muted)]">Повторяющийся сценарий</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{insights.recurringScript}</p>
              </Card>
              <Card className="p-6">
                <p className="innera-eyebrow text-[var(--muted)]">Триггеры и запрос</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{insights.emotionalTriggers}</p>
              </Card>
            </div>
            <Card className="p-6 md:p-8">
              <p className="innera-eyebrow text-[var(--muted)]">Глубокий слой</p>
              <p className="mt-4 text-sm text-[var(--muted)]">{insights.analystNote}</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <p className="text-sm text-[var(--muted)]">
                  <span className="text-[var(--text)]">Ресурс и стабильность: </span>
                  паттерн «{getResourceStabilityLabel(profile.numerology.moneyCode)}»: то, как вы восстанавливаете опору.
                </p>
                <p className="text-sm text-[var(--muted)]">
                  <span className="text-[var(--text)]">Близость: </span>
                  «{getClosenessPatternLabel(profile.numerology.loveCode)}», стиль сближения без идеализации.
                </p>
                <p className="text-sm text-[var(--muted)] md:col-span-2">
                  <span className="text-[var(--text)]">Циклы роста и истощения: </span>
                  {insights.growthFatigueCycle}
                </p>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="innera-display text-xl text-[var(--text)]">Дополнительные оси</h3>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--subtle)]">Энергия и коммуникация</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{insights.energyCommunication}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--subtle)]">Отношения</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{insights.relationshipsNarrative}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-[var(--subtle)]">Самооценка</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{insights.selfWorth}</p>
                </div>
              </div>
            </Card>
          </div>
        </PremiumGate>

        <div className="grid gap-6 lg:grid-cols-2">
          <JournalPanel />
          <Card className="flex flex-col justify-center p-8 md:p-10">
            <p className="innera-eyebrow mb-2 text-[var(--muted)]">Запись</p>
            <h3 className="innera-display text-2xl text-[var(--text)]">Разбор сценария глубже с живым специалистом</h3>
            <p className="mt-4 text-sm text-[var(--muted)]">
              Мы соединяем данные карты и терапевтическую этику: вы приходите подготовленными, но не «размеченными».
            </p>
            <Link href="/book" className="innera-btn innera-btn-primary mt-8 w-fit">
              Получить персональную сессию
            </Link>
          </Card>
        </div>

        <p className="text-center text-[11px] text-[var(--subtle)]">
          <button
            type="button"
            className="underline decoration-[var(--glass-border)] underline-offset-4 hover:text-[var(--muted)]"
            onClick={() => {
              setPlan(isPremium ? "free" : "premium");
              window.location.reload();
            }}
          >
            {isPremium ? "Сбросить демо полного доступа" : "Демо: разблокировать полный разбор"}
          </button>
        </p>
      </section>

      <FloatingBookButton />
      <StickyCtaBar />
    </AppShell>
  );
}
