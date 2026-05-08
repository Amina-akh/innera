"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { generateNumerologyProfile } from "@/modules/numerology/calculator";
import { saveProfile } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const goals = [
  "Тревожность и фон напряжения",
  "Отношения и границы",
  "Стабильность и ресурс",
  "Самооценка и сомнения",
  "Выгорание и истощение",
  "Смысл и самореализация",
];

const copy = [
  {
    title: "Добро пожаловать в поле INNERA",
    body: "Мы соберём бережный снимок вашего состояния без ярлыков и катастрофизации. Данные остаются в этом браузере, пока вы сами не решите иначе: это про приватность и контроль.",
  },
  {
    title: "Как к вам обращаться",
    body: "Имя и контакт нужны, чтобы продолжить диалог в человеческом темпе, если вы захотите сопровождение или сессию.",
  },
  {
    title: "Хронология как часть портрета",
    body: "Дата рождения входит в аналитическую модель INNERA как один из опорных параметров рядом с вашим запросом и контекстом. Это не «судьба» и не эзотерика; это структура для разборчивости.",
  },
  {
    title: "Что сейчас откликается сильнее всего",
    body: "Выберите фокус, который ближе по телу и смыслу. Это помогает приоритизировать интерпретации и сделать разбор менее абстрактным.",
  },
];

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", birthDate: "", gender: "", goal: "" });

  function next() {
    setError(null);
    if (step === 1) {
      if (!form.name.trim() || !form.contact.trim()) {
        setError("Укажите имя и контакт");
        return;
      }
    }
    if (step === 2 && !form.birthDate) {
      setError("Выберите дату рождения");
      return;
    }
    if (step === 3 && !form.goal) {
      setError("Выберите запрос");
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  async function finish() {
    setError(null);
    setLoading(true);
    try {
      const numerology = generateNumerologyProfile(form.birthDate);
      saveProfile({
        id: crypto.randomUUID(),
        name: form.name.trim(),
        contact: form.contact.trim(),
        birthDate: form.birthDate,
        gender: form.gender.trim() || undefined,
        goal: form.goal,
        plan: "free",
        numerology,
        createdAt: new Date().toISOString(),
      });
      router.push("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось сохранить профиль");
      setLoading(false);
    }
  }

  return (
    <AppShell variant="minimal">
      <section className="relative innera-container pb-32 pt-8 md:pb-24">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-[1] h-[min(520px,70vh)] w-[min(100vw,920px)] -translate-x-1/2 innera-hero-bloom opacity-75" aria-hidden />

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <p className="innera-eyebrow text-[var(--muted)]">
            Immersive onboarding · шаг {Math.min(step + 1, 4)} из 4
          </p>
          <div className="h-2 min-w-[12rem] flex-1 max-w-xs overflow-hidden rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.25)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#f4c8dc] via-[#d4b4ff] to-[#a070ff]"
              style={{ boxShadow: "0 0 22px rgba(180,130,255,0.35)" }}
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="innera-card-elevated overflow-hidden p-8 shadow-[0_1px_0_rgba(255,255,255,0.09)_inset,0_36px_96px_rgba(0,0,0,0.52),0_0_80px_rgba(160,100,255,0.08)] md:p-10">
            <AnimatePresence mode="wait">
              {step < 4 ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <h1 className="innera-display text-2xl text-[var(--text)] md:text-3xl">{copy[step]?.title}</h1>
                  <p className="mt-4 text-[var(--muted)]">{copy[step]?.body}</p>

                  {step === 1 && (
                    <div className="mt-8 grid gap-4">
                      <div>
                        <label className="mb-2 block text-xs text-[var(--muted)]">Имя</label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Как вам комфортно" />
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-[var(--muted)]">Email или телефон</label>
                        <Input
                          value={form.contact}
                          onChange={(e) => setForm({ ...form, contact: e.target.value })}
                          placeholder="для связи по сессии"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs text-[var(--muted)]">Дата рождения</label>
                        <Input type="date" value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-xs text-[var(--muted)]">Гендер (по желанию)</label>
                        <Input value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} placeholder="как идентифицируете себя" />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mt-8 space-y-2">
                      {goals.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setForm({ ...form, goal: g })}
                          className={`innera-panel innera-panel--quiet w-full px-4 py-3.5 text-left text-sm ${
                            form.goal === g
                              ? "border-[rgba(244,200,220,0.45)] !bg-[rgba(244,200,220,0.1)] text-[var(--text)] shadow-[0_0_40px_rgba(180,130,255,0.12)]"
                              : "text-[var(--muted)]"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  )}

                  {error && <p className="mt-6 text-sm text-red-300/90">{error}</p>}

                  <div className="mt-10 flex flex-wrap gap-3">
                    {step > 0 && (
                      <button type="button" onClick={back} className="innera-btn innera-btn-ghost">
                        Назад
                      </button>
                    )}
                    <button type="button" onClick={next} className="innera-btn innera-btn-primary">
                      Дальше
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <p className="innera-eyebrow mb-3 text-[var(--accent)]">Завершение шага</p>
                  <h1 className="innera-display text-2xl text-[var(--text)] md:text-3xl">Собираем карту вашего состояния</h1>
                  <p className="mt-4 text-[var(--muted)]">
                    Мы строим визуальный профиль паттернов и эмоциональных акцентов как опору для рефлексии и разговора со специалистом.
                  </p>
                  {error && <p className="mt-4 text-sm text-red-300/90">{error}</p>}
                  <div className="mt-8 flex justify-center gap-3">
                    <button type="button" onClick={back} className="innera-btn innera-btn-ghost">
                      Назад
                    </button>
                    <Button type="button" disabled={loading} onClick={finish}>
                      {loading ? "Собираем…" : "Открыть карту"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
