"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadJournal, saveJournal } from "@/lib/storage";
import type { JournalEntry } from "@/types/user";

export function JournalPanel() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadJournal());
  const [text, setText] = useState("");

  const latest = useMemo(() => entries.slice(0, 3), [entries]);

  function add() {
    const t = text.trim();
    if (!t) return;
    const next: JournalEntry = { id: crypto.randomUUID(), text: t, createdAt: new Date().toISOString() };
    const list = [next, ...entries];
    setEntries(list);
    saveJournal(list);
    setText("");
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-[var(--surface)] p-4">
      <p className="innera-eyebrow mb-1 text-[var(--muted)]">Дневник состояния</p>
      <p className="mb-4 text-sm text-[var(--muted)]">Короткая запись как якорь для следующей сессии.</p>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="innera-input flex-1 text-sm"
          placeholder="Одна строка о том, что вас сейчас занимает…"
        />
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={add}
          className="innera-btn innera-btn-secondary shrink-0 px-4"
        >
          Сохранить
        </motion.button>
      </div>

      <ul className="mt-4 space-y-2">
        <AnimatePresence>
          {latest.map((e) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-[var(--muted)]"
            >
              {e.text}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
