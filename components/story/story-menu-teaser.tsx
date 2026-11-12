import Link from 'next/link';
import type { CategoryView } from '@/data/menu/home';

/** Compact preview of a few real menu categories with their first dishes; each row deep-links into the full menu. */
export function StoryMenuTeaser({ categories, menuHref, label }: { categories: CategoryView[]; menuHref: string; label: string }) {
  return (
    <ul className="story-teaser" aria-label={label}>
      {categories.map((c) => (
        <li key={c.id}>
          <Link href={`${menuHref}#menu-${c.id}`} className="story-teaser-cat">{c.label}</Link>
          <ul className="story-teaser-items">
            {c.items.map((d) => (
              <li key={d.id}><span>{d.name}</span><span dir="ltr">{d.price}</span></li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
