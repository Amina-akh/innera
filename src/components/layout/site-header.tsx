import Link from "next/link";

export type SiteHeaderCta = { href: string; label: string };

export type SiteHeaderProps = {
  navItems: readonly { href: string; label: string }[];
  primaryCta?: SiteHeaderCta;
  secondaryCta?: SiteHeaderCta | null;
};

const defaultPrimary: SiteHeaderCta = { href: "/book", label: "Записаться" };
const defaultSecondary: SiteHeaderCta = { href: "/start", label: "Войти" };

export function SiteHeader({
  navItems,
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
}: SiteHeaderProps) {
  return (
    <header className="innera-topbar">
      <div className="innera-container flex min-h-14 items-center justify-between gap-3 py-3 md:min-h-[3.5rem] md:py-0">
        <Link href="/" className="innera-display shrink-0 text-[1.05rem] tracking-tight text-[var(--text)]">
          INNERA
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="innera-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {secondaryCta ? (
            <Link href={secondaryCta.href} className="innera-btn innera-btn-ghost text-[13px] max-sm:px-3 max-sm:py-2">
              {secondaryCta.label}
            </Link>
          ) : null}
          <Link href={primaryCta.href} className="innera-btn innera-btn-primary text-[13px] max-sm:px-3 max-sm:py-2">
            {primaryCta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}
