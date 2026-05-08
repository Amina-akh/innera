"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/layout/app-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const prompts = [
  "Что у вас забирает энергию в последние дни без видимого результата?",
  "Где вы ловите себя на автоматическом ответе, который потом жалеете?",
  "Какая эмоция сегодня самая громкая и что она защищает?",
];

export default function ConversationPage() {
  const [step, setStep] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  function append() {
    const t = draft.trim();
    if (!t) return;
    setLines((prev) => [...prev, t]);
    setDraft("");
    setStep((s) => Math.min(s + 1, prompts.length));
  }

  return (
    <AppShell
      title="Рефлексия в структуре"
      subtitle="Набросок состояний для подготовки к сессии: не чат с ботом-терапевтом, а бережный каркас мысли."
    >
      <section className="innera-container grid gap-8 pb-28 lg:grid-cols-[1fr_360px]">
        <Card className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step < prompts.length ? (
              <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <p className="innera-eyebrow mb-3 text-[var(--accent)]">Вопрос {step + 1} / {prompts.length}</p>
                <p className="text-lg text-[var(--text)]">{prompts[step]}</p>
              </motion.div>
            ) : (
              <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[var(--muted)]">
                Вы собрали несколько опор для разговора со специалистом. Их можно озвучить как «заметки к сессии», без нужды формулировать идеально.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="innera-input flex-1"
              placeholder="Пару предложений откровенно для себя…"
            />
            <Button type="button" onClick={append}>
              Сохранить строку
            </Button>
          </div>

          <ul className="mt-8 space-y-3">
            {lines.map((line, i) => (
              <motion.li
                key={`${i}-${line.slice(0, 16)}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-[var(--glass-border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]"
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card className="h-fit p-6 md:p-8">
          <p className="innera-eyebrow mb-2 text-[var(--muted)]">AI-reflections</p>
          <p className="text-sm text-[var(--muted)]">
            В полной версии платформы сюда подключаются мягкие зеркалирования на базе ваших ответов без оценок и без «штрафов за чувства».
          </p>
          <p className="mt-4 text-xs text-[var(--subtle)]">Сейчас: офлайн-заметки остаются приватными в браузере (localStorage).</p>
        </Card>
      </section>
    </AppShell>
  );
}
