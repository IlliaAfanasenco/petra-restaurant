import { getMenuItems, menuCatalog } from '@/data/menu';
import type { MenuCategory as Category } from '@/data/menu/types';
import type { Dictionary, Locale } from '@/lib/i18n';
import { MenuItemCard } from './menu-item-card';

export function MenuCategory({ category, locale, t }: { category: Category; locale: Locale; t: Dictionary }) {
  const items = getMenuItems(category.id);
  const extras = menuCatalog.extras.filter((g) => g.categoryId === category.id);
  const { breakfastHours, fishSideOptions } = menuCatalog.sourceNotes;
  const note =
    category.id === 'breakfast' ? { label: t.menu.breakfastHours, text: breakfastHours[locale] } :
    category.id === 'fish' ? { label: t.menu.fishSides, text: fishSideOptions[locale] } : null;
  return (
    <section id={`menu-${category.id}`} className="menu-category" aria-labelledby={`menu-${category.id}-title`}>
      <h3 id={`menu-${category.id}-title`}>{category.name[locale]}</h3>
      {note && <p className="menu-category-note"><strong>{note.label}:</strong> <bdi>{note.text}</bdi></p>}
      <div className="menu-list">
        {items.map((item) => <MenuItemCard key={item.id} item={item} locale={locale} t={t} />)}
      </div>
      {extras.map((group) => (
        <div className="menu-extras" key={group.id}>
          <h5>{group.title[locale]}{group.note ? <small> · {group.note[locale]}</small> : null}</h5>
          <ul>
            {group.options.map((o) => <li key={o.name.en}><span>{o.name[locale]}</span><span dir="ltr">+{o.priceILS} ₪</span></li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
