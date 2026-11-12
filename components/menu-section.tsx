import { getMenuCategories } from '@/data/menu';
import type { Locale, Dictionary } from '@/lib/i18n';
import { MenuCategoryNav } from './menu/menu-category-nav';
import { MenuCategory } from './menu/menu-category';

export function MenuSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  const categories = getMenuCategories();
  return (
    <section id="menu" className="menu-section section-shell">
      <div className="section-head">
        <div><span className="section-kicker"><span className="small-flower">✳</span>{t.menu.eyebrow}</span><h2>{t.menu.title}</h2></div>
        <p>{t.menu.intro}</p>
      </div>
      <MenuCategoryNav locale={locale} label={t.menu.categories} categories={categories} />
      <div className="menu-categories">
        {categories.map((category) => <MenuCategory key={category.id} category={category} locale={locale} t={t} />)}
      </div>
      <p className="menu-draft-note">{t.menu.allergen}</p>
    </section>
  );
}
