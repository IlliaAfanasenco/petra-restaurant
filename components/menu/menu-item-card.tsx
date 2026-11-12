import { formatMenuPrice } from '@/data/menu';
import type { MenuItem } from '@/data/menu/types';
import type { Dictionary, Locale } from '@/lib/i18n';

export function MenuItemCard({ item, locale, t }: { item: MenuItem; locale: Locale; t: Dictionary }) {
  const description = item.description[locale];
  const multi = item.priceILS === null;
  return (
    <article className="menu-item">
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="menu-item-img" src={item.image} alt="" loading="lazy" />
      )}
      <div className="menu-item-body">
        <h4>{item.name[locale]}</h4>
        {description && <p>{description}</p>}
      </div>
      <div className="menu-item-price" dir="ltr">
        <span>{formatMenuPrice(item, locale)}</span>
        {multi && <small dir={locale === 'he' ? 'rtl' : 'ltr'}>{t.menu.multiPrice}</small>}
      </div>
    </article>
  );
}
