import type { Money } from "@/lib/currency";

export type ProductTier = "free" | "tripwire" | "core" | "core-plus" | "subscription";

export type DigitalProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tier: ProductTier;
  tierLabel: string;
  price: Money | null;
  isSubscription?: boolean;
  /** Only free products have a public preview path. */
  previewPath?: string;
  featured?: boolean;
};

export const TIER_LABELS: Record<ProductTier, string> = {
  free: "Бесплатно",
  tripwire: "Tripwire",
  core: "Core",
  "core-plus": "Core+",
  subscription: "Подписка",
};

export function isFreeProduct(product: DigitalProduct): boolean {
  return product.price === null;
}

export const freeProducts: DigitalProduct[] = [
  {
    id: "lidmagnet",
    slug: "lidmagnet",
    title: "7 промптов + маршрут",
    description: "Стартовый набор: как работать с ChatGPT без хаоса. По одному промпту на каждую тему недели.",
    tier: "free",
    tierLabel: "Лидмагнит",
    price: null,
    previewPath: "/products/free/lidmagnet.html",
    featured: true,
  },
  {
    id: "metodichka-otnosheniya",
    slug: "metodichka-otnosheniya",
    title: "Психология близких отношений",
    description: "Привязанность, границы, конфликты, красные флаги и 7-дневный практикум.",
    tier: "free",
    tierLabel: "Методичка",
    price: null,
    previewPath: "/products/free/metodichka-otnosheniya.html",
  },
];

export const paidProducts: DigitalProduct[] = [
  {
    id: "kartochki-voprosov",
    slug: "05-kartochki-voprosov",
    title: "100 + 100 вопросов",
    description: "Два набора карточек: знакомство с собой и причины тревоги. PDF для печати или телефона.",
    tier: "tripwire",
    tierLabel: "Tripwire",
    price: { amount: 690, currency: "RUB" },
  },
  {
    id: "prompty-samoterapiya",
    slug: "01-prompty-samoterapiya",
    title: "50 промптов для самотерапии",
    description: "7 разделов: самооценка, отношения, тревога, родители, поиск себя, осуждение, выгорание.",
    tier: "core",
    tierLabel: "Core",
    price: { amount: 2490, currency: "RUB" },
    featured: true,
  },
  {
    id: "navigator",
    slug: "04-navigator",
    title: "Психологический навигатор",
    description: "«Не знаю, что со мной происходит» — тест, план, упражнения и промпты по результату.",
    tier: "core",
    tierLabel: "Core",
    price: { amount: 1990, currency: "RUB" },
  },
  {
    id: "detskie-obidy",
    slug: "02-tetradi-detskie-obidy",
    title: "Детские обиды · 14 дней",
    description: "Рабочая тетрадь + GPT после каждого урока. Задания, дневник, упражнения.",
    tier: "core-plus",
    tierLabel: "Core+",
    price: { amount: 3990, currency: "RUB" },
  },
  {
    id: "nabor-roditeli",
    slug: "03-nabor-dlya-roditeley",
    title: "Что чувствует ваш подросток",
    description: "Чек-листы, скрипты разговоров, разбор конфликтов, GPT-помощник для родителей.",
    tier: "core-plus",
    tierLabel: "Core+",
    price: { amount: 3490, currency: "RUB" },
  },
  {
    id: "klub-samopomoshi",
    slug: "06-klub-samopomoshi",
    title: "Клуб самопомощи",
    description: "Каждую неделю: тема, задание, разбор, промпты для GPT. Программа первого месяца внутри.",
    tier: "subscription",
    tierLabel: "Подписка",
    price: { amount: 990, currency: "RUB" },
    isSubscription: true,
  },
];

export const digitalProducts: DigitalProduct[] = [...freeProducts, ...paidProducts];

export const TELEGRAM_USERNAME = "marQpsy";

export function buildProductTelegramUrl(product: DigitalProduct, priceLabel: string): string {
  const text = isFreeProduct(product)
    ? `Здравствуйте. Хочу получить материал «${product.title}».`
    : `Здравствуйте. Хочу купить «${product.title}» (${priceLabel}).`;
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
}
