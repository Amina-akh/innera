"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loadProfile } from "@/lib/storage";
import { buildPersonalityInsights } from "@/modules/psychology/interpretations";

export default function ReportsPage() {
  const profile = useMemo(() => loadProfile(), []);

  if (!profile) {
    return (
      <AppShell title="Сводка" subtitle="Нет профиля для экспорта.">
        <section className="innera-container pb-14">
          <Card className="p-8">Сначала пройдите онбординг.</Card>
        </section>
      </AppShell>
    );
  }

  const insights = buildPersonalityInsights(profile);

  return (
    <AppShell
      title="Сводка INNERA"
      subtitle="Для печати или отправки специалисту: краткая психологическая рамка без оккультных интерпретаций."
    >
      <section className="innera-container pb-14 print:py-0">
        <Card className="p-8 md:p-10">
          <h2 className="innera-display text-2xl text-[var(--text)]">Профиль состояния</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Клиент: {profile.name}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Запрос: {profile.goal}</p>
          <hr className="my-8 border-[var(--glass-border)]" />

          <h3 className="innera-display mb-3 text-lg text-[var(--text)]">Сильные стороны и акцент</h3>
          <p className="text-sm text-[var(--muted)]">{insights.strengthsBlock}</p>

          <h3 className="innera-display mb-3 mt-8 text-lg text-[var(--text)]">Где стоит бережное исследование</h3>
          <p className="text-sm text-[var(--muted)]">
            Пустые «слои» на карте паттернов указывают на зоны, где полезны новые навыки и поддержка: не про «нехватку судьбы», а про точки роста.
          </p>

          <h3 className="innera-display mb-3 mt-8 text-lg text-[var(--text)]">Рекомендации процесса</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li>Еженедельная рефлексия в дневнике INNERA по запросу: {profile.goal}.</li>
            <li>Фиксация телесных маркеров при эмоциональных всплесках.</li>
            <li>Короткие поведенческие эксперименты с измеримым результатом.</li>
          </ul>

          <Button className="mt-10 print:hidden" onClick={() => window.print()}>
            Печать / PDF
          </Button>
        </Card>
      </section>
    </AppShell>
  );
}
