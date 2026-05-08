import type { ClientProfile } from "@/types/user";
import type { NumerologyResult } from "@/types/matrix";

const ARCHETYPES = {
  1: {
    label: "Автономия и инициатива",
    strengths: "Ясное направление, ответственность за результат, способность начинать без внешнего разрешения.",
    tension:
      "В стрессе усиливается контроль: жёсткость к себе и другим, снижение гибкости и доверия к процессу.",
    triggers: "Ощущение потери влияния, медленные решения других, критика компетентности.",
  },
  2: {
    label: "Тонкая настройка и контакт",
    strengths: "Эмпатия, тонкое чтение атмосферы, способность сглаживать конфликты через присутствие.",
    tension:
      "Риск сливаться с чужими эмоциями: страх отвержения, гиперчуткость к паузам и недосказанности.",
    triggers: "Резкий тон, игнорирование, неопределённость в близости, ощущение «я обязан держать всё».",
  },
  3: {
    label: "Выразительность и живость",
    strengths: "Коммуникация, образность, способность находить форму для чувств и идей.",
    tension:
      "Расфокус, избегание рутины, зависимость от внешней стимуляции и признания.",
    triggers: "Скука, монотонность, давление «серьёзности», ощущение застоя.",
  },
  4: {
    label: "Структура и опора",
    strengths: "Системность, надёжность, способность строить устойчивые привычки и границы.",
    tension:
      "Застревание в контроле, страх непредсказуемости, ригидность при смене условий.",
    triggers: "Хаос, резкие изменения без объяснения, нарушение договорённостей.",
  },
  5: {
    label: "Свобода и поиск смысла в опыте",
    strengths: "Адаптивность, любопытство, способность быстро перестраивать стратегию.",
    tension:
      "Импульсивность, избегание долгих обязательств, скачки настроения при ограничениях.",
    triggers: "Перегруз правилами, ощущение «меня держат», отсутствие выбора.",
  },
  6: {
    label: "Забота и ответственность за связь",
    strengths: "Тёплая вовлечённость, верность ценностям близости, способность создавать безопасность.",
    tension:
      "Перегруз ответственностью за чужие состояния, вина, сложность с «достаточно хорошо».",
    triggers: "Конфликт в близости, просьбы без границ, ощущение, что вы «должны спасти ситуацию».",
  },
  7: {
    label: "Глубина и рефлексия",
    strengths: "Анализ, интуитивная точность, умение видеть неочевидные связи.",
    tension:
      "Эмоциональная отстранённость, изоляция, интеллектуализация вместо проживания.",
    triggers: "Поверхностный small talk навязанно, давление «быстрее решай», вторжение в личное пространство.",
  },
  8: {
    label: "Результат и влияние",
    strengths: "Стратегия, выносливость, способность держать сложные задачи и ответственность.",
    tension:
      "Эмоциональная броня, сомнение в слабости как в «слабости характера», перегруз амбициями.",
    triggers: "Бессилие, зависимость от обстоятельств, публичная уязвимость без поддержки.",
  },
  9: {
    label: "Целостность и завершение циклов",
    strengths: "Широта взгляда, зрелость, способность отпускать и интегрировать опыт.",
    tension:
      "Усталость от «на всех», размывание личных потребностей, эмоциональные провалы после перегруза.",
    triggers: "Хронический запрос помощи без взаимности, несправедливость, бессмысленная суетность.",
  },
} as const;

export function getArchetypeByNumber(value: number) {
  const key = Math.min(9, Math.max(1, value)) as keyof typeof ARCHETYPES;
  return ARCHETYPES[key];
}

export function buildPsychologicalSummary(values: number[]): string[] {
  return values.map((value) => {
    const a = getArchetypeByNumber(value);
    return `${value}: ${a.label}. ${a.strengths}`;
  });
}

/** Психологические ярлыки для внутренних кодов (без эзотерической подачи) */
export function getResourceStabilityLabel(code: number) {
  return ["опорный", "гибкий", "выразительный", "структурный", "исследовательский", "реляционный", "аналитический", "стратегический", "интегративный"][
    Math.min(8, Math.max(0, code - 1))
  ];
}

export function getClosenessPatternLabel(code: number) {
  return ["бережный контакт", "тихая близость", "игривое сближение", "предсказуемая опора", "динамика и новизна", "забота и ответственность", "интимность через смысл", "честный диалог", "целостная вовлечённость"][
    Math.min(8, Math.max(0, code - 1))
  ];
}

export function getStressAxisNarrative(n: NumerologyResult) {
  const intensity = Math.min(1, Math.abs(n.karma) / 9);
  if (intensity < 0.3) return "Сейчас внутреннее напряжение умеренное: проще замечать сигналы тела и не уходить в автоответы.";
  if (intensity < 0.55) return "Есть устойчивый фон напряжения между «надо» и «хочу»; полезны короткие паузы и явные границы.";
  return "Период повышенной чувствительности к стрессу: важно снижать перегруз и возвращать опору через сон, еду, движение и разговор.";
}

export interface PersonalityInsights {
  coreLabel: string;
  coreSummary: string;
  strengthsBlock: string;
  hiddenTension: string;
  emotionalTriggers: string;
  recurringScript: string;
  innerResource: string;
  growthFatigueCycle: string;
  relationshipsNarrative: string;
  energyCommunication: string;
  selfWorth: string;
  microInsights: string[];
  analystNote: string;
}

function goalNarrative(goal: string) {
  const g = goal.toLowerCase();
  if (g.includes("тревог") || g.includes("тревож"))
    return "Фокус на снижении фона тревоги через предсказуемость микрошагов и телесные якоря.";
  if (g.includes("отношен"))
    return "Фокус на ясности границ и честном диалоге без роли «исправителя».";
  if (g.includes("деньг") || g.includes("финанс"))
    return "Фокус на ощущении безопасности и зрелых решениях без импульсивных рывков.";
  if (g.includes("самооценк"))
    return "Фокус на опыте состоятельности в малом: подтверждения «я справляюсь» из реальных действий.";
  if (g.includes("выгор"))
    return "Фокус на восстановлении нервной системы и снятии невыносимой ответственности.";
  return "Фокус на связи запроса с повседневными триггерами, без насилия над собой и без спешки.";
}

export function buildPersonalityInsights(profile: ClientProfile): PersonalityInsights {
  const { numerology: n, goal } = profile;
  const core = getArchetypeByNumber(n.lifePath);
  const dominant = Object.entries(n.frequencies)
    .filter(([, c]) => c > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([d]) => Number(d)) as number[];

  const top = dominant[0] ?? n.lifePath;
  const second = dominant[1] ?? top;
  const accent = getArchetypeByNumber(top);

  const emptyCells = n.matrix.flat().filter((v) => v === 0).length;
  const recurringScript =
    emptyCells >= 4
      ? "Повторяется сценарий «я справлюсь сам(а)», пока ресурс не проседает, затем приходит откат в усталость или обиду."
      : "Повторяется сценарий перегруза чужими ожиданиями, если границы не проговариваются вслух.";

  const microInsights = [
    accent.triggers.split(".")[0] + ".",
    getStressAxisNarrative(n).split(".")[0] + ".",
    goalNarrative(goal).split(".")[0] + ".",
    "Вы замечательно держите сложное, но забываете разрешить себе отдых без чувства вины.",
  ];

  return {
    coreLabel: core.label,
    coreSummary: `${core.strengths} ${core.tension}`,
    strengthsBlock: `Сильная сторона профиля (${accent.label.toLowerCase()}): ${accent.strengths}`,
    hiddenTension: `Скрытое напряжение проявляется там, где ${core.tension.toLowerCase()}`,
    emotionalTriggers: `${accent.triggers} Пересекается с запросом: ${goal.toLowerCase()}.`,
    recurringScript,
    innerResource:
      "Внутренний ресурс: способность останавливаться и давать себе время на честный ответ «что для меня сейчас честно».",
    growthFatigueCycle:
      n.lifePath % 2 === 0
        ? "Цикл роста чередуется с эмоциональным истощением, если вы берёте слишком много чужой ответственности."
        : "Цикл роста активируется через действие и ясность цели, а выгорание приходит при хроническом недосыпе и сомнениях.",
    relationshipsNarrative: `В отношениях заметен паттерн «${getClosenessPatternLabel(n.loveCode)}»: важно не подменять близость функцией спасателя.`,
    energyCommunication: `В коммуникации полезна прямота без давления. Энергетический стиль ближе к «${getResourceStabilityLabel(n.moneyCode)}» регуляции: опора на предсказуемые ритуалы.`,
    selfWorth:
      "Самооценка укрепляется через маленькие завершённые шаги и внешнее зеркало, которое вы сами выбираете, а не случайный шум.",
    microInsights,
    analystNote: `Доминирующий акцент личности связан с архетипом «${accent.label}» при поддержке второго полюса «${getArchetypeByNumber(second).label}». Это не ярлык; это карта фокусов для терапии и самонаблюдения.`,
  };
}
