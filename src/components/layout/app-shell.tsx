import Link from "next/link";
import type { PropsWithChildren } from "react";

interface AppShellProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  variant?: "default" | "minimal";
  showBookCta?: boolean;
}

const navItems = [
  { href: "/dashboard", label: "Карта состояния" },
  { href: "/journal", label: "Дневник" },
  { href: "/conversation", label: "Рефлексия" },
  { href: "/therapist", label: "Специалисту" },
  { href: "/reports", label: "Сводка" },
  { href: "/book", label: "Сессия" },
];

export function AppShell({
  title,
  subtitle,
  actions,
  children,
  variant = "default",
  showBookCta,
}: AppShellProps) {
  return (
    <main className="innera-shell">
      {variant === "minimal" ? (
        <header className="innera-topbar innera-topbar--minimal">
          <div className="innera-container flex min-h-14 items-center justify-between gap-4 py-3 md:min-h-[3.5rem] md:py-0">
            <Link href="/" className="innera-display text-[1.05rem] tracking-tight text-[var(--text)]">
              INNERA
            </Link>
            <Link href="/full" className="innera-nav-link hidden text-[13px] sm:inline-flex">
              Сайт
            </Link>
          </div>
        </header>
      ) : (
        <header className="innera-topbar">
          <div className="innera-container flex min-h-14 items-center justify-between gap-4 py-3 md:min-h-[3.5rem] md:py-0">
            <div className="flex items-center gap-8">
              <Link href="/" className="innera-display text-[1.05rem] tracking-tight text-[var(--text)]">
                INNERA
              </Link>
              <nav className="hidden items-center gap-1 md:flex" aria-label="Основная навигация">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="innera-nav-link">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              {showBookCta !== false && (
                <Link href="/book" className="hidden innera-btn innera-btn-primary sm:inline-flex">
                  Записаться
                </Link>
              )}
              {actions}
            </div>
          </div>
        </header>
      )}

      {title || subtitle ? (
        <section className="innera-container innera-page-head">
          {title ? (
            <h1 className="innera-display innera-title-page max-w-[22ch] text-[var(--text)]">{title}</h1>
          ) : null}
          {subtitle ? <p className="innera-subtitle mt-5 max-w-2xl text-[var(--muted)]">{subtitle}</p> : null}
        </section>
      ) : null}

      {children}
    </main>
  );
}
