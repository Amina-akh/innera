"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCurrency } from "@/context/currency-context";
import { formatMoney, formatMoneyWithPeriod } from "@/lib/currency";
import {
  buildProductTelegramUrl,
  freeProducts,
  isFreeProduct,
  paidProducts,
  type DigitalProduct,
} from "@/lib/products";
import { CurrencySelect } from "@/components/ui/currency-select";
import { SiteHeader } from "@/components/layout/site-header";

function productPriceLabel(product: DigitalProduct, currency: ReturnType<typeof useCurrency>["currency"]) {
  if (isFreeProduct(product)) return "Бесплатно";
  if (product.isSubscription) return formatMoneyWithPeriod(product.price!, currency, "month");
  return formatMoney(product.price!, currency);
}

function FreeProductCard({ product, index }: { product: DigitalProduct; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="innera-surface-card flex h-full flex-col p-6 md:p-7"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--subtle)]">{product.tierLabel}</p>
      <h3 className="innera-display mt-3 text-[1.45rem] font-medium leading-[1.12] text-[var(--text)]">{product.title}</h3>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--muted)]">{product.description}</p>
      <div className="mt-6 border-t border-[var(--glass-border)] pt-6">
        <p className="innera-display text-2xl font-medium tracking-tight text-[var(--text)]">Бесплатно</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {product.previewPath ? (
            <Link
              href={product.previewPath}
              target="_blank"
              rel="noopener noreferrer"
              className="innera-btn innera-btn-primary flex-1 justify-center py-3 text-sm"
            >
              Открыть и посмотреть
            </Link>
          ) : null}
          <a
            href={buildProductTelegramUrl(product, "Бесплатно")}
            className="innera-btn innera-btn-secondary flex-1 justify-center py-3 text-sm"
          >
            Получить в Telegram
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function PaidProductCard({ product, index }: { product: DigitalProduct; index: number }) {
  const { currency } = useCurrency();
  const priceLabel = productPriceLabel(product, currency);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "innera-surface-card flex h-full flex-col p-6 md:p-7",
        product.featured ? "innera-surface-card--featured" : "",
      ].join(" ")}
    >
      {product.featured ? (
        <div className="mb-4 inline-flex w-fit items-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent-soft)]/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
          Популярный
        </div>
      ) : null}
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--subtle)]">{product.tierLabel}</p>
      <h3 className="innera-display mt-3 text-[1.45rem] font-medium leading-[1.12] text-[var(--text)]">{product.title}</h3>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[var(--muted)]">{product.description}</p>
      <p className="mt-4 text-[12px] text-[var(--subtle)]">Полный материал — после покупки. Предпросмотр недоступен.</p>
      <div className="mt-6 border-t border-[var(--glass-border)] pt-6">
        <p className="innera-display text-2xl font-medium tracking-tight text-[var(--text)]">{priceLabel}</p>
        <a
          href={buildProductTelegramUrl(product, priceLabel)}
          className="innera-btn innera-btn-primary mt-5 flex w-full justify-center py-3 text-sm"
        >
          Купить в Telegram
        </a>
      </div>
    </motion.article>
  );
}

export function ProductCatalog() {
  return (
    <div className="relative isolate overflow-x-clip">
      <SiteHeader
        navItems={[
          { href: "/", label: "Главная" },
          { href: "/book", label: "Сессия" },
          { href: "/start", label: "Карта" },
        ]}
        primaryCta={{ href: "/book", label: "Записаться" }}
        secondaryCta={{ href: "/start", label: "Войти" }}
      />

      <main>
        <section className="relative pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="innera-hero-bloom pointer-events-none absolute inset-0 -z-[1]" aria-hidden />
          <div className="innera-container">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[52ch]">
                <p className="innera-eyebrow text-[var(--accent)]">Цифровые продукты</p>
                <h1 className="innera-display innera-display--hero mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-semibold leading-[1.08]">
                  Принты и маршруты
                </h1>
                <p className="mt-5 text-[1.05rem] leading-[1.7] text-[var(--muted)]">
                  Бесплатные материалы можно открыть сразу. Платные — только через покупку в Telegram.
                </p>
              </div>
              <CurrencySelect />
            </div>

            <div className="mt-14">
              <h2 className="innera-display text-[1.35rem] font-semibold text-[var(--text)]">Бесплатно</h2>
              <p className="mt-2 text-[14px] text-[var(--muted)]">Откройте, посмотрите и сохраните как PDF.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {freeProducts.map((product, index) => (
                  <FreeProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-[var(--glass-border)] pt-14">
              <h2 className="innera-display text-[1.35rem] font-semibold text-[var(--text)]">Платные материалы</h2>
              <p className="mt-2 text-[14px] text-[var(--muted)]">
                Описание и цена. Полный доступ — после оплаты через @marQpsy.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paidProducts.map((product, index) => (
                  <PaidProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
