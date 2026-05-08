"use client";

import { AppShell } from "@/components/layout/app-shell";
import { JournalPanel } from "@/components/insights/journal-panel";
import { MoodStrip } from "@/components/insights/mood-strip";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FloatingBookButton } from "@/components/funnel/floating-book-button";

export default function JournalPage() {
  return (
    <AppShell
      title="Дневник и фон"
      subtitle="Короткие записи и отметки настроя без обязательной интроспекции на десять страниц."
    >
      <section className="innera-container grid gap-8 pb-28 lg:grid-cols-2">
        <MoodStrip />
        <JournalPanel />
        <Card className="p-8 lg:col-span-2">
          <p className="innera-eyebrow mb-2 text-[var(--muted)]">Связка с картой</p>
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            Сочетайте дневник с карточками инсайтов на главном экране: так проще замечать повторы и приносить конкретику на сессию.
          </p>
          <Link href="/dashboard" className="innera-btn innera-btn-secondary mt-6 inline-flex">
            Перейти к карте состояния
          </Link>
        </Card>
      </section>
      <FloatingBookButton />
    </AppShell>
  );
}
