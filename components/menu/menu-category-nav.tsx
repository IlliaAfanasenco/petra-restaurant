import type { MenuCategory } from '@/data/menu/types';
import type { Locale } from '@/lib/i18n';

export function MenuCategoryNav({ locale, label, categories }: { locale: Locale; label: string; categories: MenuCategory[] }) {
  return (
    <nav className="menu-nav" aria-label={label}>
      {categories.map((c) => <a key={c.id} href={`#menu-${c.id}`}>{c.name[locale]}</a>)}
    </nav>
  );
}
