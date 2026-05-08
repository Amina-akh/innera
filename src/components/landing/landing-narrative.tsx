"use client";

import { motion } from "framer-motion";

const pain = [
  {
    title: "Эмоциональное выгорание",
    body: "Вы держите всё на поверхности, а внутри пустота и раздражение, которые не объяснить «логикой».",
  },
  {
    title: "Повторяющиеся сценарии",
    body: "Одни и те же отношения, решения и тупики, будто сюжет на зацикливании, а вы уже устали быть главным героем этой истории.",
  },
  {
    title: "Внутренняя тревога",
    body: "Фон не отпускает: тело напряжено, сон дробится, даже в тишине нет покоя.",
  },
  {
    title: "Потеря внутренней опоры",
    body: "Кажется, вы не знаете, кто вы «без ролей»: без должности, ожиданий и чужих голосов в голове.",
  },
];

const recognition = [
  "Возможно, вы сейчас узнаёте себя в хроническом чувстве вины, даже когда вы никому не должны.",
  "Возможно, вы давно слышите внутренний «надо», который заглушает желание.",
  "Возможно, вы умеете объяснять другим, но с собой только критика и стыд.",
  "Возможно, вам нужно не «ещё один совет», а пространство, где становится безопасно быть настоящим.",
];

const variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } };

export function LandingPainBridge() {
  return (
    <section id="recognition" className="scroll-mt-28 border-b border-[var(--glass-border)] py-[var(--space-section)]">
      <div className="innera-container">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.05 }}
          className="max-w-2xl"
        >
          <motion.p variants={variants} className="innera-eyebrow text-[var(--accent)]">
            Возможно, вы сейчас…
          </motion.p>
          <motion.h2
            variants={variants}
            className="innera-display mt-5 text-[clamp(1.65rem,3.5vw,2.35rem)] font-medium leading-[1.15] text-[var(--text)]"
          >
            Между усталостью и надеждой есть место, где боль не стыдят, а раскладывают по слоям.
          </motion.h2>
          <motion.p variants={variants} className="mt-7 text-[1.0625rem] leading-[1.75] text-[var(--muted)]">
            Это не про «слабость». Это про то, что психика долго терпит, пока не находит язык и внимание без спешки её
            «починить».
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pain.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 * i, duration: 0.45 }}
              className="innera-panel p-6"
            >
              <h3 className="text-[15px] font-medium text-[var(--text)]">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">{item.body}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="innera-panel innera-panel--xl mt-20 p-8 md:p-11"
        >
          <p className="innera-eyebrow text-[var(--muted)]">Самоузнавание</p>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {recognition.map((line) => (
              <li
                key={line.slice(0, 24)}
                className="flex gap-4 text-[15px] leading-relaxed text-[var(--muted)]"
              >
                <span className="mt-2 h-px w-6 shrink-0 bg-[var(--accent)]/50" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

export function LandingCaseStrip() {
  const cases = [
    {
      label: "Кейс · отношения и границы",
      text: "Клиентка годами соглашалась «ради мира», теряя сон. В работе всплыл сценарий примирения через самообесценивание; фокус сместился с «как угодить» на «что я реально чувствую».",
    },
    {
      label: "Кейс · тревога и контроль",
      text: "Запрос звучал как «я срываюсь на детей». Под ним оказалась не «плохая мать», а хроническое перенапряжение и стыд. Вернули телесное дыхание и ясные границы без ярлыков.",
    },
  ];
  return (
    <section className="py-[var(--space-section)]">
      <div className="innera-container">
        <p className="innera-eyebrow text-[var(--accent)]">Кейсы · кратко</p>
        <h2 className="innera-display mt-5 max-w-2xl text-[clamp(1.65rem,3.2vw,2.1rem)] font-medium leading-snug text-[var(--text)]">
          Очищенные от деталей: логика пути, не спектакль чужой боли.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cases.map((c) => (
            <article key={c.label} className="innera-panel innera-panel--xl p-8">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--subtle)]">{c.label}</p>
              <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)]">{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const stories = [
  {
    name: "Алина, 34",
    text: "Я пришла с ощущением, что «опять всё рушится». Оказалось, я путаю тревогу с правдой. После цикла я впервые за долгое время не боюсь своих чувств.",
  },
  {
    name: "Марк, 41",
    text: "Для меня это был язык психотерапии без стыда. Структура INNERA помогла сформулировать то, о чём я молчал годами.",
  },
];

export function LandingStoriesSection() {
  return (
    <section className="border-t border-[var(--glass-border)] py-[var(--space-section)]">
      <div className="innera-container">
        <p className="innera-eyebrow text-[var(--muted)]">Истории</p>
        <h2 className="innera-display mt-5 max-w-2xl text-[clamp(1.5rem,3vw,2rem)] font-medium text-[var(--text)]">
          Точки поворота в переживании себя.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {stories.map((story) => (
            <blockquote key={story.name} className="innera-panel innera-panel--xl p-8">
              <p className="text-[13px] font-medium text-[var(--text)]">{story.name}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">«{story.text}»</p>
            </blockquote>
          ))}
        </div>
        <p className="mt-10 text-center text-[13px] text-[var(--subtle)]">
          Истории обезличены и приведены с согласия · конфиденциальность как базовый контур работы
        </p>
      </div>
    </section>
  );
}

export function LandingOutcomesSection() {
  return (
    <section className="py-[var(--space-section)] pb-24 md:pb-28">
      <div className="innera-container">
        <p className="innera-eyebrow text-[var(--accent)]">После терапии</p>
        <h2 className="innera-display mt-5 max-w-2xl text-[clamp(1.65rem,3.5vw,2.35rem)] font-medium leading-[1.15] text-[var(--text)]">
          Не «исправление», а возвращение дыхания в жизнь.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-[var(--muted)]">
          Исследуем повторяющиеся сценарии и причины состояния, чтобы вернуть устойчивость и опору без пустых обещаний.
        </p>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {[
            "Меньше автоматических реакций, больше выбора в ответах.",
            "Называть чувство и не паниковать от его присутствия.",
            "Границы, которые чувствует тело.",
            "Тепло к себе, которое питает рост.",
          ].map((t) => (
            <li key={t} className="innera-panel flex gap-3 px-5 py-4 text-[15px] text-[var(--muted)]">
              <span className="text-[var(--accent)] opacity-70" aria-hidden>
                ·
              </span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <p className="innera-eyebrow mb-8 text-center text-[var(--muted)]">Доверие</p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                t: "Прозрачность формата",
                d: "Вы понимаете ход встречи без скрытых ритуалов.",
              },
              {
                t: "Психологический язык",
                d: "Рамки терапевтической культуры, без околонаучной мистики.",
              },
              {
                t: "Данные и жизнь",
                d: "Аналитика INNERA держит контекст между сессиями.",
              },
            ].map((item) => (
              <div key={item.t} className="innera-panel p-6 md:text-left">
                <p className="text-[15px] font-medium text-[var(--text)]">{item.t}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--muted)]">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingTestimonialsRibbon() {
  const quotes = [
    "Как продукт для психики: спокойно и без «магии на продажу».",
    "Интеллект подачи как в хорошей студии, а не в чат-боте.",
    "Сессия строится на моём контексте: меня услышали заранее.",
  ];
  return (
    <section className="innera-section-bleed border-y border-[var(--glass-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(140,90,220,0.06))] py-16">
      <div className="innera-container">
        <p className="innera-eyebrow mb-10 text-center text-[var(--accent)]">Отзывы</p>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {quotes.map((q) => (
            <p key={q} className="text-[15px] leading-relaxed text-[var(--muted)] md:text-left">
              «{q}»
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
