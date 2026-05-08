"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { loadProfile } from "@/lib/storage";
import { buildPsychologicalSummary, getResourceStabilityLabel, getClosenessPatternLabel } from "@/modules/psychology/interpretations";

export default function TherapistPage() {
  const profile = useMemo(() => loadProfile(), []);

  if (!profile) {
    return (
      <AppShell title="Взгляд специалиста" subtitle="Клиент ещё не прошёл онбординг.">
        <section className="innera-container pb-14">
          <Card className="p-8">
            <p className="text-[var(--muted)]">Нет сохранённого профиля в этом браузере.</p>
            <Link href="/start" className="innera-btn innera-btn-primary mt-6 inline-flex">
              Онбординг клиента
            </Link>
          </Card>
        </section>
      </AppShell>
    );
  }

  const dominantValues = Object.entries(profile.numerology.frequencies)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([num]) => Number(num));

  return (
    <AppShell
      title="Взгляд специалиста"
      subtitle="Контекст сессии: запрос, временная модель и акценты личности без эзотерической подачи."
    >
      <section className="innera-container space-y-6 pb-16">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-8">
            <h2 className="innera-display mb-4 text-xl text-[var(--text)]">Клиент</h2>
            <p className="text-sm text-[var(--muted)]">Имя: {profile.name}</p>
            <p className="text-sm text-[var(--muted)]">Контакт: {profile.contact}</p>
            <p className="text-sm text-[var(--muted)]">Хронология: {profile.birthDate}</p>
            <p className="text-sm text-[var(--muted)]">Запрос: {profile.goal}</p>
          </Card>

          <Card className="p-8">
            <h2 className="innera-display mb-4 text-xl text-[var(--text)]">Аналитические опоры</h2>
            <p className="text-sm text-[var(--muted)]">Опорный индекс профиля: {profile.numerology.lifePath}</p>
            <p className="text-sm text-[var(--muted)]">Ось внутреннего напряжения (модель): {profile.numerology.karma}</p>
            <p className="text-sm text-[var(--muted)]">Паттерн стабильности / ресурса: «{getResourceStabilityLabel(profile.numerology.moneyCode)}»</p>
            <p className="text-sm text-[var(--muted)]">Паттерн близости: «{getClosenessPatternLabel(profile.numerology.loveCode)}»</p>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="innera-display mb-4 text-xl text-[var(--text)]">Акцентируемые архетипы</h2>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            {buildPsychologicalSummary(dominantValues).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Card>
      </section>
    </AppShell>
  );
}
