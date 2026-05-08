"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FloatingBookButton } from "@/components/funnel/floating-book-button";
import { loadProfile, setPlan } from "@/lib/storage";
import { buildPersonalityInsights, getArchetypeByNumber } from "@/modules/psychology/interpretations";

const faq = [
  {
    q: "Чем сессия отличается от приложения?",
    a: "Приложение помогает структурировать и удерживать внимание на паттернах. На сессии: живое замедление, контакт и корректировка под ваш темп.",
  },
];

export default function BookPage() {
  const profile = useMemo(() => loadProfile(), []);
  const insights = profile ? buildPersonalityInsights(profile) : null;
  const core = profile ? getArchetypeByNumber(profile.numerology.lifePath) : null;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ slot: "", note: "" });

  function submitDemo(e: React.FormEvent) {
    e.preventDefault();
    const username = "marQpsy";
    const parts = [
      "Здравствуйте. Хочу записаться на сессию.",
      profile?.name?.trim() ? `Имя: ${profile.name.trim()}` : null,
      profile?.goal ? `Запрос: ${profile.goal}` : null,
      form.slot ? `Удобное время: ${form.slot}` : null,
      form.note ? `Комментарий: ${form.note}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(parts.join("\n"));
    window.location.href = `https://t.me/${username}?text=${text}`;
    setSent(true);
  }

  return (
    <AppShell
      title="Сессия со специалистом"
      subtitle="Живой контакт психолога и клиента: глубина, темп и безопасность без эзотерических обещаний и без давления «купи быстрее»."
    >
      <section className="innera-container space-y-12 pb-28">
        {profile && insights && core && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-xl)] border border-[var(--glass-border)] bg-[var(--surface)] p-8 md:p-10"
          >
            <p className="innera-eyebrow text-[var(--accent)]">Ваш контекст для специалиста</p>
            <p className="innera-display mt-4 max-w-2xl text-2xl text-[var(--text)] md:text-3xl">
              {profile.name.trim()}, опорный профиль · «{core.label}».
            </p>
            <p className="mt-4 max-w-2xl text-sm text-[var(--muted)]">{insights.coreSummary.slice(0, 220)}…</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard" className="innera-btn innera-btn-secondary">
                Вернуться к карте
              </Link>
              <button
                type="button"
                className="innera-btn innera-btn-ghost text-sm"
                onClick={() => {
                  setPlan("premium");
                  window.location.href = "/dashboard";
                }}
              >
                Открыть полный разбор в приложении
              </button>
            </div>
          </motion.div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <p className="innera-eyebrow mb-3 text-[var(--muted)]">Смысл встречи</p>
            <h2 className="innera-display text-2xl text-[var(--text)]">Что происходит в терапевтическом часе</h2>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">
              <li>Находим язык для того, что повторяется и почему это всё ещё больно.</li>
              <li>Укрощаем стыд: тяжесть не умаляется, но перестаёт быть приговором.</li>
              <li>Соединяем опору INNERA с вашей реальной жизнью, а не с абстрактным «профилем».</li>
            </ul>
          </Card>

          <Card className="p-8">
            <p className="innera-eyebrow mb-3 text-[var(--muted)]">Кейсы (обезличенно)</p>
            <blockquote className="border-l-2 border-[var(--accent)] pl-5 text-sm italic text-[var(--muted)]">
              «Я думала, что снова “ломаюсь”, а оказалось, я годами носила чужую ответственность. Карта INNERA стала трезвой картой, а сессия стала местом,
              где это можно произнести вслух.»
            </blockquote>
            <blockquote className="mt-6 border-l-2 border-[var(--warm)] pl-5 text-sm italic text-[var(--muted)]">
              «Мне важно было не “ещё один тест”, а язык психологии. Здесь это ощущается бережно и дорого.»
            </blockquote>
          </Card>
        </div>

        <div>
          <p className="innera-eyebrow mb-4 text-[var(--muted)]">Отзывы</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Очень спокойный интерфейс, как хороший кабинет, а не лента с гороскопами.",
              "Наконец понятно, зачем дата рождения: как часть модели, а не как мистика.",
              "Запись прошла без давления, специалист читал мой профиль заранее, это экономит время.",
            ].map((t) => (
              <Card key={t.slice(0, 20)} className="p-6 text-sm text-[var(--muted)]">
                {t}
              </Card>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="innera-card-elevated p-8">
            <p className="innera-eyebrow mb-2 text-[var(--muted)]">Заявка</p>
            <h2 className="innera-display text-2xl text-[var(--text)]">Оставьте удобное время</h2>
            {!sent ? (
              <form className="mt-8 space-y-4" onSubmit={submitDemo}>
                <div>
                  <label className="mb-2 block text-xs text-[var(--muted)]">Предпочтительное время</label>
                  <Input value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} placeholder="Будни вечер / выходные день" required />
                </div>
                <div>
                  <label className="mb-2 block text-xs text-[var(--muted)]">Коротко о запросе</label>
                  <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Что хотите разобрать в первую очередь" />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  Написать в Telegram
                </Button>
                <p className="text-xs text-[var(--subtle)]">Откроется чат в Telegram с уже заполненным сообщением.</p>
              </form>
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-[var(--muted)]">
                Открываем Telegram. Если окно не открылось, напишите вручную: @marQpsy
              </motion.p>
            )}
          </Card>

          <div className="space-y-4">
            {faq.map((item) => (
              <Card key={item.q} className="p-6">
                <p className="text-sm font-medium text-[var(--text)]">{item.q}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FloatingBookButton />
    </AppShell>
  );
}
